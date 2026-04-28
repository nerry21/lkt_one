<?php

namespace App\Services;

use App\Exceptions\TripEditNotAllowedException;
use App\Models\Booking;
use App\Models\Trip;
use Illuminate\Support\Facades\DB;

/**
 * Trip Manual CRUD service — wrapper layer untuk admin panel Trip Planning.
 *
 * Delegasi ke TripService untuk business logic + invariant guards (I1 slot, I2 mobil,
 * optimistic lock, UNDELETABLE_STATUSES). Tambah:
 *   - Auto-assign sequence saat create kalau tidak diprovide
 *   - Status guard untuk edit (mirror UNDELETABLE_STATUSES dari delete)
 *   - countLinkedBookings untuk WARN modal frontend
 *
 * Reference:
 *   - DP-E5-1: Trip status berangkat/keluar_trip TIDAK BISA Edit/Delete
 *   - DP-E5-3: Create max H+30 hari (validasi di FormRequest)
 *   - DP-E5-4: Sequence auto-assign, admin bisa override
 *   - DP-E5-7: Pakai versioning untuk edit + delete
 */
class TripCrudService
{
    /**
     * Status yang tidak boleh diedit (mirror UNDELETABLE_STATUSES dari TripService).
     */
    private const UNEDITABLE_STATUSES = ['berangkat', 'keluar_trip'];

    public function __construct(
        private readonly TripService $tripService,
    ) {}

    /**
     * Create trip manual.
     *
     * @param  array<string, mixed>  $payload
     *         Required: trip_date, trip_time, direction, mobil_id, driver_id
     *         Optional: sequence (auto-assign kalau tidak ada)
     * @param  string  $userId  UUID admin yang create
     * @throws \App\Exceptions\TripSlotConflictException
     */
    public function createManual(array $payload, string $userId): Trip
    {
        if (! isset($payload['sequence'])) {
            $payload['sequence'] = $this->nextSequence(
                $payload['trip_date'],
                $payload['direction'],
            );
        }

        $payload['created_by'] = $userId;
        $payload['updated_by'] = $userId;

        return $this->tripService->insertManual($payload);
    }

    /**
     * Edit trip manual dengan optimistic locking + status guard + invariant pre-check.
     *
     * Status guard: tidak boleh edit kalau status berangkat/keluar_trip (DP-E5-1).
     * Invariant pre-check: kalau slot key (date, time, direction) atau mobil berubah,
     * panggil assertSlotAvailable + assertMobilNotDoubleAssigned dengan exclude trip
     * sendiri.
     *
     * @param  array<string, mixed>  $payload  Field yang mau diupdate (selain version)
     * @throws \App\Exceptions\TripEditNotAllowedException   Status berangkat/keluar_trip
     * @throws \App\Exceptions\TripVersionConflictException  Version stale
     * @throws \App\Exceptions\TripSlotConflictException     Slot/mobil conflict
     */
    public function editManual(int $tripId, int $expectedVersion, array $payload, string $userId): Trip
    {
        return DB::transaction(function () use ($tripId, $expectedVersion, $payload, $userId): Trip {
            /** @var Trip $trip */
            $trip = Trip::query()->lockForUpdate()->findOrFail($tripId);

            // Guard #1: status check
            if (in_array($trip->status, self::UNEDITABLE_STATUSES, true)) {
                throw new TripEditNotAllowedException(
                    tripId: $tripId,
                    currentStatus: $trip->status,
                );
            }

            // Resolve effective new values (untuk invariant check)
            $newDate = $payload['trip_date'] ?? $trip->trip_date->toDateString();
            $newTime = $payload['trip_time'] ?? $trip->trip_time;
            $newDirection = $payload['direction'] ?? $trip->direction;
            $newMobil = $payload['mobil_id'] ?? $trip->mobil_id;

            $slotChanged = $newDate !== $trip->trip_date->toDateString()
                || $newTime !== $trip->trip_time
                || $newDirection !== $trip->direction;

            if ($slotChanged && $newTime !== null) {
                $this->tripService->assertSlotAvailable($newDate, $newTime, $newDirection, $tripId);
            }

            $mobilContextChanged = $newMobil !== $trip->mobil_id
                || $newDirection !== $trip->direction
                || $newDate !== $trip->trip_date->toDateString();

            if ($mobilContextChanged) {
                $this->tripService->assertMobilNotDoubleAssigned($newMobil, $newDate, $newDirection, $tripId);
            }

            $payload['updated_by'] = $userId;

            $updated = $this->tripService->updateWithVersionCheck($tripId, $expectedVersion, $payload);

            // Sesi 50 PR #1: cascade update linked Bookings saat mobil_id atau driver_id
            // berubah. Bulk update via Query Builder bypass model events untuk hindari
            // recursion + performance. Booking::trip_id terisi saat booking save match
            // ke trip ini (TripBookingMatcher) atau via backfill migration.
            $mobilChanged = array_key_exists('mobil_id', $payload) && $payload['mobil_id'] !== $trip->mobil_id;
            $driverChanged = array_key_exists('driver_id', $payload) && $payload['driver_id'] !== $trip->driver_id;

            if ($mobilChanged || $driverChanged) {
                $updated->loadMissing('driver');
                Booking::query()
                    ->where('trip_id', $updated->id)
                    ->update([
                        'mobil_id'    => $updated->mobil_id,
                        'driver_id'   => $updated->driver_id,
                        'driver_name' => $updated->driver?->nama,
                    ]);
            }

            return $updated;
        });
    }

    /**
     * Delete trip manual.
     *
     * Delegasi langsung ke TripService::delete yang sudah punya:
     *   - Optimistic lock (version check)
     *   - UNDELETABLE_STATUSES guard
     *   - Recompact sequence post-delete
     *   - FK nullOnDelete cascade ke bookings + keuangan_jet (DB-level)
     *
     * @throws \App\Exceptions\TripVersionConflictException
     * @throws \App\Exceptions\TripDeleteNotAllowedException
     */
    public function deleteManual(int $tripId, int $expectedVersion, string $userId): void
    {
        // userId currently unused (delete row hilang, tidak ada updated_by).
        // Kalau future butuh audit log, bisa dispatch event di sini.
        $this->tripService->delete($tripId, $expectedVersion);
    }

    /**
     * Hitung jumlah booking ter-link ke trip — untuk WARN modal di UI (DP-E5-6).
     */
    public function countLinkedBookings(int $tripId): int
    {
        return Booking::query()->where('trip_id', $tripId)->count();
    }

    /**
     * Hitung sequence berikutnya untuk slot (date, direction).
     * Skip status excluded (tidak_berangkat/tidak_keluar_trip) — sequence
     * hanya counting trip yang masih occupy slot.
     */
    private function nextSequence(string $tripDate, string $direction): int
    {
        $maxSequence = Trip::query()
            ->where('trip_date', $tripDate)
            ->where('direction', $direction)
            ->whereNotIn('status', ['tidak_berangkat', 'tidak_keluar_trip'])
            ->max('sequence');

        return ((int) ($maxSequence ?? 0)) + 1;
    }
}
