<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Trip;

/**
 * Sesi 50 PR #2 — reverse sync direction (Booking → Trip + peer Bookings).
 *
 * Saat admin save booking via Data Pemesanan (modal admin) dengan driver_id /
 * mobil_id pilihan dropdown yang BERBEDA dari Trip current, service ini cascade
 * pilihan admin ke:
 *   1. Trip row (via TripService::updateWithVersionCheck — atomic version bump).
 *   2. Peer bookings (booking lain dengan trip_id sama, exclude booking yang
 *      sedang di-save).
 *
 * Pilihan design:
 *   - Pakai `TripService` direct (BUKAN `TripCrudService::editManual`) supaya
 *     tidak loop ke cascade Trip→Booking dari PR #1 yang akan re-cascade ke
 *     peer bookings yang sama (ujung-ujungnya idempotent tapi double-write
 *     berisiko version conflict palsu antara PR #1 dan PR #2 path).
 *   - Bulk `Booking::query()->update(...)` bypass model events untuk hindari
 *     recursion ke `BookingManagementService::persistBooking` saat peer
 *     booking ter-touch.
 *   - Invariant I2 (mobil tidak double-assigned di tanggal+arah yang sama)
 *     di-enforce sebelum update Trip — kalau admin assign mobil yang sudah
 *     dipakai trip lain di tanggal+arah yang sama, throw `TripSlotConflictException`.
 *
 * Path wizard customer (`RegularBookingPersistenceService::persistDraft`)
 * TIDAK pakai service ini — wizard tidak punya dropdown driver/mobil, behavior
 * "Trip menang" PR #1 tetap berlaku di sana.
 *
 * @see \App\Services\TripService
 * @see \App\Services\BookingManagementService::persistBooking()
 */
class BookingTripReverseSyncService
{
    public function __construct(
        private readonly TripService $tripService,
    ) {
    }

    /**
     * Cascade admin assignment (driver/mobil) ke Trip + peer bookings.
     *
     * No-op kalau `$newDriverId` dan `$newMobilId` dua-duanya sama dengan
     * Trip current — tidak ada update DB sama sekali (return early).
     *
     * @param  Trip         $trip               Trip yang mau di-cascade (sudah loaded sebelum panggil).
     * @param  string|null  $newDriverId        Driver ID baru (UUID) — bisa null kalau admin clear.
     * @param  string|null  $newMobilId         Mobil ID baru (UUID) — bisa null kalau admin clear.
     * @param  string|null  $newDriverName      Nama driver (untuk de-normalized field di booking).
     * @param  int          $excludeBookingId   ID booking yang sedang di-save (jangan ke-cascade
     *                                          karena sudah di-set langsung di persistBooking).
     * @param  string       $userId             UUID admin yang trigger (untuk audit Trip.updated_by).
     *
     * @throws \App\Exceptions\TripSlotConflictException     I2 invariant — mobil double-assign.
     * @throws \App\Exceptions\TripVersionConflictException  Race condition — Trip ter-update
     *                                                       oleh admin lain di antara load & save.
     */
    public function syncBookingAssignmentToTrip(
        Trip $trip,
        ?string $newDriverId,
        ?string $newMobilId,
        ?string $newDriverName,
        int $excludeBookingId,
        string $userId,
    ): void {
        // No-op early return: dua-duanya sama dengan Trip current.
        if ($newDriverId === $trip->driver_id && $newMobilId === $trip->mobil_id) {
            return;
        }

        // I2 invariant: mobil tidak boleh double-assigned di (trip_date, direction)
        // yang sama. Skip kalau mobil tidak berubah (no need to re-check) atau null
        // (unassign tidak melanggar I2).
        if ($newMobilId !== null && $newMobilId !== $trip->mobil_id) {
            $this->tripService->assertMobilNotDoubleAssigned(
                mobilId: $newMobilId,
                tripDate: $trip->trip_date->toDateString(),
                direction: $trip->direction,
                excludeTripId: $trip->id,
            );
        }

        $this->tripService->updateWithVersionCheck(
            tripId: $trip->id,
            expectedVersion: $trip->version,
            fields: [
                'driver_id'  => $newDriverId,
                'mobil_id'   => $newMobilId,
                'updated_by' => $userId,
            ],
        );

        // Cascade ke peer bookings. Bulk update lewat Query Builder → bypass
        // model events untuk hindari recursion ke persistBooking.
        Booking::query()
            ->where('trip_id', $trip->id)
            ->where('id', '!=', $excludeBookingId)
            ->update([
                'driver_id'   => $newDriverId,
                'mobil_id'    => $newMobilId,
                'driver_name' => $newDriverName,
            ]);
    }
}
