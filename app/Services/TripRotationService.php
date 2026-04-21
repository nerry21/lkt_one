<?php

namespace App\Services;

use App\Exceptions\TripInvalidTransitionException;
use App\Models\Trip;

/**
 * Handle status transition dan gantiJam untuk trip harian — design doc §5.4.
 *
 * ARCHITECTURAL NOTE:
 * LKT One adalah sistem catatan, bukan decision engine. Semua "cascade",
 * "dipercepat", "sanksi trip terakhir", dan "promote waiting list" adalah
 * KEPUTUSAN ADMIN MANUAL yang tercermin via serangkaian method call
 * service ini. Tidak ada auto-cascade atau auto-promote.
 *
 * Methods:
 *   - markBerangkat:      scheduled → berangkat
 *   - markTidakBerangkat: scheduled → tidak_berangkat (TIDAK trigger cascade)
 *   - markTidakKeluarTrip: keluar_trip → tidak_keluar_trip (tightened Sesi 18
 *                          setelah KeluarTripService live)
 *   - gantiJam:           ubah trip_time, save original_trip_time audit trail
 *
 * Delegates to TripService::updateWithVersionCheck for all mutations
 * (optimistic lock + version bump handled there).
 */
class TripRotationService
{
    public function __construct(
        private readonly TripService $tripService,
    ) {}

    /**
     * Admin menandai trip sudah berangkat.
     *
     * Pre-condition:
     *   - Trip status = 'scheduled'
     *   - Trip trip_time != NULL (tidak boleh berangkat dari waiting list)
     *
     * @throws TripInvalidTransitionException
     * @throws \App\Exceptions\TripVersionConflictException
     */
    public function markBerangkat(int $tripId, int $expectedVersion): Trip
    {
        $trip = $this->fetchTripOrFail($tripId);

        if ($trip->status !== 'scheduled') {
            throw new TripInvalidTransitionException(
                tripId: $tripId,
                currentStatus: $trip->status,
                attemptedAction: 'markBerangkat',
                reason: 'trip harus berstatus scheduled',
            );
        }

        if ($trip->trip_time === null) {
            throw new TripInvalidTransitionException(
                tripId: $tripId,
                currentStatus: $trip->status,
                attemptedAction: 'markBerangkat',
                reason: 'trip waiting list (trip_time NULL) harus di-gantiJam ke slot dulu',
            );
        }

        return $this->tripService->updateWithVersionCheck(
            $tripId,
            $expectedVersion,
            ['status' => 'berangkat'],
        );
    }

    /**
     * Admin menandai trip tidak jadi berangkat (misal driver tidak responsif,
     * mobil kendala teknis). TIDAK trigger cascade — admin lakukan cascade
     * manual via serangkaian gantiJam untuk mobil lain.
     *
     * Pre-condition: trip status = 'scheduled'
     *
     * @throws TripInvalidTransitionException
     * @throws \App\Exceptions\TripVersionConflictException
     */
    public function markTidakBerangkat(int $tripId, int $expectedVersion): Trip
    {
        $trip = $this->fetchTripOrFail($tripId);

        if ($trip->status !== 'scheduled') {
            throw new TripInvalidTransitionException(
                tripId: $tripId,
                currentStatus: $trip->status,
                attemptedAction: 'markTidakBerangkat',
                reason: 'trip harus berstatus scheduled',
            );
        }

        return $this->tripService->updateWithVersionCheck(
            $tripId,
            $expectedVersion,
            ['status' => 'tidak_berangkat'],
        );
    }

    /**
     * Admin menandai bahwa mobil keluar_trip (dropping/rental) tidak jadi
     * berangkat (penumpang cancel, mobil kendala, dll).
     *
     * Pre-condition: trip status = 'keluar_trip' (tightened Sesi 18 setelah
     * KeluarTripService::markKeluarTrip live — sebelumnya accept 'scheduled'
     * sebagai workaround karena keluar_trip unreachable).
     *
     * @throws TripInvalidTransitionException
     * @throws \App\Exceptions\TripVersionConflictException
     */
    public function markTidakKeluarTrip(int $tripId, int $expectedVersion): Trip
    {
        $trip = $this->fetchTripOrFail($tripId);

        if ($trip->status !== 'keluar_trip') {
            throw new TripInvalidTransitionException(
                tripId: $tripId,
                currentStatus: $trip->status,
                attemptedAction: 'markTidakKeluarTrip',
                reason: 'trip harus berstatus keluar_trip (Sesi 18 tightened via KeluarTripService.markKeluarTrip)',
            );
        }

        return $this->tripService->updateWithVersionCheck(
            $tripId,
            $expectedVersion,
            ['status' => 'tidak_keluar_trip'],
        );
    }

    /**
     * Admin ubah trip_time trip (misal JET 06 dipercepat dari 07:00 ke 05:30,
     * atau JET 11 waiting list dipromote ke slot 19:00).
     *
     * Audit trail: original_trip_time disimpan dari trip_time SEBELUM update,
     * HANYA kalau original_trip_time masih NULL (first-time change). Kalau
     * sudah ada nilai di original_trip_time, jangan di-overwrite — itu
     * adalah trip_time "original" dari generate awal jadwal.
     *
     * $newTripTime dapat NULL (pindah ke waiting list) atau harus match salah
     * satu slot di TripGenerationService::SLOTS.
     *
     * Pre-condition: trip status = 'scheduled'
     *
     * Idempotent no-op: kalau $newTripTime === current $trip->trip_time,
     * return trip tanpa update apapun (no version bump, no audit trail change).
     *
     * Duplicate slot ALLOWED: rule "2 mobil 1 slot" valid di operasional
     * JET (penumpang ramai). Tidak ada slot uniqueness check.
     *
     * @throws TripInvalidTransitionException
     * @throws \App\Exceptions\TripVersionConflictException
     */
    public function gantiJam(int $tripId, ?string $newTripTime, int $expectedVersion): Trip
    {
        $trip = $this->fetchTripOrFail($tripId);

        if ($trip->status !== 'scheduled') {
            throw new TripInvalidTransitionException(
                tripId: $tripId,
                currentStatus: $trip->status,
                attemptedAction: 'gantiJam',
                reason: 'trip harus berstatus scheduled',
            );
        }

        // Validate newTripTime: NULL (waiting list) atau valid slot.
        if ($newTripTime !== null && ! in_array($newTripTime, TripGenerationService::SLOTS, true)) {
            throw new TripInvalidTransitionException(
                tripId: $tripId,
                currentStatus: $trip->status,
                attemptedAction: 'gantiJam',
                reason: "trip_time '{$newTripTime}' bukan slot valid (harus NULL atau salah satu TripGenerationService::SLOTS)",
            );
        }

        // Idempotent no-op: same value, skip.
        if ($trip->trip_time === $newTripTime) {
            return $trip;
        }

        $attributes = ['trip_time' => $newTripTime];

        // First-time audit: save original trip_time sebelum update.
        if ($trip->original_trip_time === null) {
            $attributes['original_trip_time'] = $trip->trip_time;
        }

        return $this->tripService->updateWithVersionCheck(
            $tripId,
            $expectedVersion,
            $attributes,
        );
    }

    /**
     * Fetch trip by ID atau throw ModelNotFoundException kalau tidak ada.
     */
    private function fetchTripOrFail(int $tripId): Trip
    {
        return Trip::findOrFail($tripId);
    }
}
