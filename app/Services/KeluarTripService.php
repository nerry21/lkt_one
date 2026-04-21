<?php

namespace App\Services;

use App\Exceptions\TripInvalidTransitionException;
use App\Models\Trip;
use Illuminate\Support\Carbon;

/**
 * Handle Keluar Trip lifecycle untuk Dropping + Rental — design doc §5.5.
 *
 * ARCHITECTURAL NOTE: LKT One = sistem catatan. Semua sub-status transition
 * triggered by explicit admin action. TIDAK ada auto-promotion, auto-transition,
 * atau scheduler-based state change.
 *
 * Lifecycle (all manual):
 *   scheduled
 *     ↓ markKeluarTrip (payload: reason, note, pool_target, planned_end_date)
 *   keluar_trip (out)
 *     ↓ markWaitingList (saat driver telepon "sudah di pool")
 *   keluar_trip (waiting_list)    ← pool_entered_at=now() auto-set
 *     ↓ markReturning (admin putuskan "besok masuk jadwal")
 *   keluar_trip (returning)
 *     ↓ TripGenerationService generate jadwal besok (priority tier 3, already Sesi 14)
 *   scheduled baru
 *
 * Scope: Dropping + Rental only. "Alasan Tertentu" handled via
 * Mobil::is_active_in_trip toggle (separate mechanism).
 *
 * Reason-specific validation:
 *   - rental: planned_end_date WAJIB (min 2 hari kontrak, disepakati upfront).
 *   - dropping: planned_end_date optional (admin tidak tahu di awal).
 */
class KeluarTripService
{
    private const VALID_REASONS_IN_SCOPE = ['dropping', 'rental'];
    private const VALID_POOLS = ['PKB', 'ROHUL'];

    public function __construct(
        private readonly TripService $tripService,
    ) {}

    /**
     * Admin menandai trip sebagai keluar_trip dengan sub-status 'out'.
     *
     * @param  array{reason: string, pool_target: string, note?: ?string, planned_end_date?: ?string}  $payload
     *
     * Pre-conditions:
     *   - Trip status = 'scheduled'
     *   - reason ∈ {'dropping', 'rental'} (DP: 'other' handled via is_active_in_trip toggle)
     *   - pool_target ∈ {'PKB', 'ROHUL'}
     *   - Untuk reason='rental': planned_end_date WAJIB ada (format Y-m-d)
     *
     * Side effects:
     *   - status: 'scheduled' → 'keluar_trip'
     *   - keluar_trip_substatus: null → 'out'
     *   - keluar_trip_reason: set dari payload
     *   - keluar_trip_note: set dari payload (atau null)
     *   - keluar_trip_pool_target: set dari payload
     *   - keluar_trip_start_date: set ke today
     *   - keluar_trip_planned_end_date: set dari payload (null kalau dropping tanpa input)
     *
     * @throws TripInvalidTransitionException
     * @throws \App\Exceptions\TripVersionConflictException
     */
    public function markKeluarTrip(int $tripId, int $expectedVersion, array $payload): Trip
    {
        $trip = Trip::findOrFail($tripId);

        // Validate status precondition.
        if ($trip->status !== 'scheduled') {
            throw new TripInvalidTransitionException(
                tripId: $tripId,
                currentStatus: $trip->status,
                attemptedAction: 'markKeluarTrip',
                reason: 'trip harus berstatus scheduled',
            );
        }

        // Validate reason.
        $reason = $payload['reason'] ?? null;
        if (! in_array($reason, self::VALID_REASONS_IN_SCOPE, true)) {
            throw new TripInvalidTransitionException(
                tripId: $tripId,
                currentStatus: $trip->status,
                attemptedAction: 'markKeluarTrip',
                reason: sprintf(
                    "reason '%s' tidak valid. KeluarTripService scope = dropping|rental. ".
                    "'other' / alasan internal handled via Mobil::is_active_in_trip toggle.",
                    $reason ?? 'null',
                ),
            );
        }

        // Validate pool_target.
        $poolTarget = $payload['pool_target'] ?? null;
        if (! in_array($poolTarget, self::VALID_POOLS, true)) {
            throw new TripInvalidTransitionException(
                tripId: $tripId,
                currentStatus: $trip->status,
                attemptedAction: 'markKeluarTrip',
                reason: "pool_target harus 'PKB' atau 'ROHUL', got: ".($poolTarget ?? 'null'),
            );
        }

        // Rental-specific: planned_end_date WAJIB.
        $plannedEndDate = $payload['planned_end_date'] ?? null;
        if ($reason === 'rental' && $plannedEndDate === null) {
            throw new TripInvalidTransitionException(
                tripId: $tripId,
                currentStatus: $trip->status,
                attemptedAction: 'markKeluarTrip',
                reason: 'rental wajib punya planned_end_date (minimum 2 hari kontrak disepakati)',
            );
        }

        return $this->tripService->updateWithVersionCheck(
            $tripId,
            $expectedVersion,
            [
                'status'                       => 'keluar_trip',
                'keluar_trip_substatus'        => 'out',
                'keluar_trip_reason'           => $reason,
                'keluar_trip_note'             => $payload['note'] ?? null,
                'keluar_trip_pool_target'      => $poolTarget,
                'keluar_trip_start_date'       => Carbon::today()->toDateString(),
                'keluar_trip_planned_end_date' => $plannedEndDate,
            ],
        );
    }

    /**
     * Admin menandai mobil sudah kembali ke pool (driver telepon).
     * Sub-status out → waiting_list. Auto-set keluar_trip_pool_entered_at=now() (DP-3).
     *
     * Pre-conditions:
     *   - Trip status = 'keluar_trip'
     *   - Trip keluar_trip_substatus = 'out'
     *
     * @throws TripInvalidTransitionException
     * @throws \App\Exceptions\TripVersionConflictException
     */
    public function markWaitingList(int $tripId, int $expectedVersion): Trip
    {
        $trip = Trip::findOrFail($tripId);

        if ($trip->status !== 'keluar_trip' || $trip->keluar_trip_substatus !== 'out') {
            throw new TripInvalidTransitionException(
                tripId: $tripId,
                currentStatus: $this->formatCurrentState($trip),
                attemptedAction: 'markWaitingList',
                reason: 'harus berstatus keluar_trip dengan sub-status out',
            );
        }

        return $this->tripService->updateWithVersionCheck(
            $tripId,
            $expectedVersion,
            [
                'keluar_trip_substatus'       => 'waiting_list',
                'keluar_trip_pool_entered_at' => Carbon::now(),
            ],
        );
    }

    /**
     * Admin menandai mobil siap masuk jadwal besok (decision manual).
     * Sub-status waiting_list → returning.
     *
     * Per DP-4: actual_end_date TIDAK di-set di sini. Actual end derived dari
     * pool_entered_at saat markWaitingList — itu moment mobil benar-benar kembali
     * fisik. markReturning cuma keputusan admin "besok masuk jadwal", bukan
     * event fisik.
     *
     * Pre-conditions:
     *   - Trip status = 'keluar_trip'
     *   - Trip keluar_trip_substatus = 'waiting_list'
     *
     * @throws TripInvalidTransitionException
     * @throws \App\Exceptions\TripVersionConflictException
     */
    public function markReturning(int $tripId, int $expectedVersion): Trip
    {
        $trip = Trip::findOrFail($tripId);

        if ($trip->status !== 'keluar_trip' || $trip->keluar_trip_substatus !== 'waiting_list') {
            throw new TripInvalidTransitionException(
                tripId: $tripId,
                currentStatus: $this->formatCurrentState($trip),
                attemptedAction: 'markReturning',
                reason: 'harus berstatus keluar_trip dengan sub-status waiting_list',
            );
        }

        return $this->tripService->updateWithVersionCheck(
            $tripId,
            $expectedVersion,
            [
                'keluar_trip_substatus' => 'returning',
            ],
        );
    }

    /**
     * Format current state as "status:substatus" untuk exception reason (DP-2).
     * Consistent combined-state format when throwing TripInvalidTransitionException
     * for substatus-related errors.
     */
    private function formatCurrentState(Trip $trip): string
    {
        if ($trip->status === 'keluar_trip' && $trip->keluar_trip_substatus !== null) {
            return $trip->status.':'.$trip->keluar_trip_substatus;
        }

        return $trip->status;
    }
}
