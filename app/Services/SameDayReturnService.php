<?php

namespace App\Services;

use App\Exceptions\SameDayReturnConflictException;
use App\Exceptions\TripVersionConflictException;
use App\Models\Trip;
use Illuminate\Support\Facades\DB;

/**
 * Handle Same-Day Return (SDR) lifecycle untuk Fase E5 — pattern operasional
 * JET Travel 3–4x/minggu di mana mobil ROHUL→PKB pagi di-pair dengan trip
 * balik PKB→ROHUL sore di hari yang sama (tanpa menunggu rotation besok).
 *
 * ARCHITECTURAL NOTE: LKT One = sistem catatan, admin keputusan. Service ini
 * hanya validate pre-condition dan persist. Tidak auto-promote status,
 * tidak cascade, tidak auto-rotate mobil. Admin tetap yang memutuskan kapan
 * trip SDR berangkat (via existing flow markBerangkat yang sudah ada).
 *
 * Pre-conditions (throw SameDayReturnConflictException):
 *   - origin_direction_invalid    — trip asal bukan ROHUL_TO_PKB
 *   - origin_status_invalid       — trip asal bukan scheduled/berangkat
 *   - origin_already_has_return   — trip asal sudah punya SDR pair (1-to-1 per origin)
 *   - slot_unavailable            — slot payload bukan salah satu dari 6 jam standar
 *
 * Post-conditions:
 *   - Trip baru PKB_TO_ROHUL, same_day_return=true, sequence=999 (DP-E5.D
 *     reserved marker — tidak bentrok regular 1..6)
 *   - same_day_return_origin_trip_id linked ke origin trip
 *   - driver pre-fill dari origin (DP-E5.6), override via payload optional
 *   - origin Trip version di-bump +1 via optimistic lock (Bug #30 pattern)
 *
 * Multi-origin allowed: 1 mobil bisa punya multiple SDR trips di tanggal sama
 * asal dari origin yang berbeda (DP-E5.E). Tapi 1 origin hanya bisa punya 1
 * SDR pair (DP-E5.8 idempotency).
 *
 * Reference: handoff Sesi 30 DPs E5.3 / E5.4 / E5.6 / E5.8 / E5.C / E5.D.
 *
 * @see \App\Exceptions\SameDayReturnConflictException
 */
class SameDayReturnService
{
    /**
     * Slot jam standar — mirror TripGenerationService::SLOTS supaya SDR
     * konsisten dengan jadwal regular. Service tetap guard meski FormRequest
     * juga validate di layer controller (Tahap 4) — defense in depth.
     */
    public const VALID_SLOTS = ['05:30:00', '07:00:00', '09:00:00', '13:00:00', '16:00:00', '19:00:00'];

    public function __construct(
        private readonly TripService $tripService,
        private readonly PoolStateService $poolState,
    ) {}

    /**
     * Admin trigger Same-Day Return untuk origin trip ROHUL_TO_PKB.
     *
     * Flow:
     *   1. Load origin, validate direction/status/no-existing-pair/slot.
     *   2. Version pre-check (fast-fail sebelum transaction).
     *   3. DB::transaction — Trip::create PKB_TO_ROHUL baru + bump origin
     *      version atomically (optimistic lock via updateWithVersionCheck).
     *
     * @param  array{slot: string, reason?: ?string, driver_id?: ?string, note?: ?string}  $payload
     *
     * @throws SameDayReturnConflictException  origin_direction_invalid / origin_status_invalid / origin_already_has_return / slot_unavailable
     * @throws TripVersionConflictException    origin version stale
     */
    public function createSameDayReturn(int $originTripId, int $expectedVersion, array $payload): Trip
    {
        $origin = Trip::findOrFail($originTripId);

        if ($origin->direction !== 'ROHUL_TO_PKB') {
            throw new SameDayReturnConflictException(
                originTripId: $originTripId,
                conflictType: 'origin_direction_invalid',
                mobilId: $origin->mobil_id,
            );
        }

        if (! in_array($origin->status, ['scheduled', 'berangkat'], true)) {
            throw new SameDayReturnConflictException(
                originTripId: $originTripId,
                conflictType: 'origin_status_invalid',
                mobilId: $origin->mobil_id,
            );
        }

        $hasExistingReturn = Trip::query()
            ->where('same_day_return_origin_trip_id', $originTripId)
            ->exists();

        if ($hasExistingReturn) {
            throw new SameDayReturnConflictException(
                originTripId: $originTripId,
                conflictType: 'origin_already_has_return',
                mobilId: $origin->mobil_id,
            );
        }

        $slot = $payload['slot'] ?? null;
        if (! in_array($slot, self::VALID_SLOTS, true)) {
            throw new SameDayReturnConflictException(
                originTripId: $originTripId,
                conflictType: 'slot_unavailable',
                mobilId: $origin->mobil_id,
            );
        }

        if ($origin->version !== $expectedVersion) {
            throw new TripVersionConflictException(
                tripId: $originTripId,
                expectedVersion: $expectedVersion,
                currentVersion: $origin->version,
            );
        }

        return DB::transaction(function () use ($origin, $payload, $slot, $expectedVersion): Trip {
            $newTrip = Trip::create([
                'trip_date'                      => $origin->trip_date->toDateString(),
                'trip_time'                      => $slot,
                'direction'                      => 'PKB_TO_ROHUL',
                'sequence'                       => 999,
                'mobil_id'                       => $origin->mobil_id,
                'driver_id'                      => $payload['driver_id'] ?? $origin->driver_id,
                'status'                         => 'scheduled',
                'same_day_return'                => true,
                'same_day_return_reason'         => $payload['reason'] ?? null,
                'same_day_return_origin_trip_id' => $origin->id,
            ]);

            // Bump origin version tanpa mutate kolom lain. Empty fields array
            // aman — updateWithVersionCheck selalu append `version+1` via
            // array_merge, jadi UPDATE statement tetap punya SET clause.
            $this->tripService->updateWithVersionCheck(
                $origin->id,
                $expectedVersion,
                [],
            );

            return $newTrip->refresh();
        });
    }
}
