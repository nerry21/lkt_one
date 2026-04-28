<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Mobil;
use App\Models\Trip;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * Sesi 50 PR #4 — Pemesanan Dropping ↔ Trip Planning integration.
 *
 * Filosofi: 2-arah sync simetris.
 *   - Pemesanan Dropping save → Trip yang match auto-markKeluarTrip dropping.
 *   - Trip markKeluarTrip dropping → auto-create draft Booking Dropping.
 *
 * Konflik mobil dengan penumpang reguler aktif → modal konfirmasi swap (admin
 * awareness). Jangan auto-resolve tanpa konfirmasi karena affect penumpang
 * reguler — admin pegang keputusan via dropdown mobil pengganti di modal.
 *
 * Stateless service. Caller WAJIB sudah validate payload (controller layer).
 */
class DroppingTripIntegrationService
{
    public function __construct(
        private readonly TripBookingMatcher $tripBookingMatcher,
        private readonly TripService $tripService,
        private readonly BookingNotificationPendingService $notificationPendingService,
    ) {}

    /**
     * Detect konflik mobil: cek ada booking reguler aktif di
     * (trip_date, trip_time, direction, mobil_id) yang sama.
     *
     * Return data lengkap untuk modal konfirmasi swap di frontend.
     *
     * @param  string       $mobilId            UUID mobil yang dipilih admin.
     * @param  string       $tripDate           Y-m-d.
     * @param  string       $tripTime           HH:MM atau HH:MM:SS.
     * @param  string       $bookingDirection   to_pkb | from_pkb.
     * @param  int          $armadaIndex        sequence (>= 1).
     * @param  int|null     $excludeBookingId   ID booking yang sedang di-update (skip self).
     *
     * @return array{
     *   hasConflict: bool,
     *   conflictingTrip: ?Trip,
     *   peerBookingsCount: int,
     *   peerBookings: Collection,
     *   availableReplacementMobils: Collection,
     * }
     */
    public function detectMobilConflict(
        string $mobilId,
        string $tripDate,
        string $tripTime,
        string $bookingDirection,
        int $armadaIndex = 1,
        ?int $excludeBookingId = null,
    ): array {
        $emptyResult = [
            'hasConflict'                => false,
            'conflictingTrip'            => null,
            'peerBookingsCount'          => 0,
            'peerBookings'               => collect(),
            'availableReplacementMobils' => collect(),
        ];

        $trip = $this->tripBookingMatcher->findMatchingTrip(
            tripDate: $tripDate,
            tripTime: $tripTime,
            bookingDirection: $bookingDirection,
            armadaIndex: $armadaIndex,
        );

        if ($trip === null || $trip->status !== 'scheduled') {
            return $emptyResult;
        }

        // Trip yang ditemukan harus pakai mobil yang sama dengan yang dipilih admin —
        // kalau Trip pakai mobil X tapi admin pilih mobil Y, tidak ada konflik di Trip
        // X (admin pilih Y). Konflik baru muncul kalau Trip yang match di slot/mobil
        // yang admin pilih ada penumpang reguler aktif.
        if ($trip->mobil_id !== $mobilId) {
            return $emptyResult;
        }

        $peerQuery = Booking::query()
            ->where('trip_id', $trip->id)
            ->where('category', 'Reguler')
            ->whereNotIn('booking_status', ['Cancelled', 'Draft', 'Ditolak']);

        if ($excludeBookingId !== null) {
            $peerQuery->where('id', '!=', $excludeBookingId);
        }

        $peerBookings = $peerQuery->get();

        if ($peerBookings->isEmpty()) {
            return $emptyResult;
        }

        $tripDirection = $this->tripBookingMatcher->mapBookingDirectionToTripDirection($bookingDirection);

        $occupiedMobilIds = Trip::query()
            ->where('trip_date', $tripDate)
            ->where('direction', $tripDirection)
            ->whereNotIn('status', ['tidak_berangkat', 'tidak_keluar_trip'])
            ->pluck('mobil_id')
            ->filter()
            ->all();

        $availableReplacementMobils = Mobil::query()
            ->where('id', '!=', $mobilId)
            ->where('is_active_in_trip', true)
            ->whereNotIn('id', $occupiedMobilIds)
            ->orderBy('kode_mobil')
            ->get(['id', 'kode_mobil', 'jenis_mobil']);

        return [
            'hasConflict'                => true,
            'conflictingTrip'            => $trip,
            'peerBookingsCount'          => $peerBookings->count(),
            'peerBookings'               => $peerBookings,
            'availableReplacementMobils' => $availableReplacementMobils,
        ];
    }

    /**
     * Eksekusi swap mobil + link Booking Dropping ke Trip yang sekarang keluar_trip.
     *
     * Skenario:
     *   1. $replacementMobilId NULL → langsung markKeluarTrip $conflictingTrip
     *      dropping. Penumpang peer otomatis ikut Trip yang sekarang keluar_trip
     *      — admin sudah aware via modal warning.
     *   2. $replacementMobilId ADA + ada Trip lain yang pakai mobil pengganti di
     *      tanggal+arah sama → swap mobil_id (TripService::swap), cascade peer
     *      bookings ke Trip baru, lalu markKeluarTrip Trip mobilLama dropping.
     *   3. $replacementMobilId ADA + tidak ada Trip lain yang pakai mobil pengganti
     *      → assign mobil pengganti ke Trip mobilLama (cascade peer), lalu
     *      markKeluarTrip Trip mobilLama dropping. Tapi case ini secara semantik
     *      aneh karena trip mobilLama yang akan jadi keluar_trip tapi peer pindah
     *      ke trip lain — sebenarnya simpler: just update peer bookings.mobil_id
     *      ke replacement (peer butuh trip baru), lalu markKeluarTrip Trip mobilLama.
     *      Tapi tanpa Trip baru, peer booking jadi orphan di Trip yang keluar_trip.
     *      → Solusi: kalau tidak ada Trip mobil pengganti yang tersedia, kita
     *        treat sebagai skenario 1 (admin-aware: peer ikut trip yang keluar_trip).
     *
     * Notifikasi peer bookings (mobil_changed) di-record via
     * BookingNotificationPendingService.
     *
     * Pada akhir, $droppingBooking.trip_id di-set ke $conflictingTrip->id supaya
     * Booking Dropping linked ke Trip yang sekarang keluar_trip dropping.
     *
     * @param  Booking      $droppingBooking
     * @param  Trip         $conflictingTrip       Trip mobilLama (yang ada peers).
     * @param  string|null  $replacementMobilId    UUID mobil pengganti, null = no swap.
     * @param  string       $poolTarget            'PKB' | 'ROHUL'.
     * @param  string|null  $userId                UUID admin yang trigger (untuk audit).
     */
    public function executeSwapAndDroppingLink(
        Booking $droppingBooking,
        Trip $conflictingTrip,
        ?string $replacementMobilId,
        string $poolTarget,
        ?string $userId = null,
    ): void {
        DB::transaction(function () use ($droppingBooking, $conflictingTrip, $replacementMobilId, $poolTarget, $userId): void {
            $oldMobilId = $conflictingTrip->mobil_id;

            $tripForKeluar = $conflictingTrip->fresh();

            if ($replacementMobilId !== null && $replacementMobilId !== $oldMobilId) {
                $replacementTrip = Trip::query()
                    ->where('trip_date', $conflictingTrip->trip_date->toDateString())
                    ->where('direction', $conflictingTrip->direction)
                    ->where('mobil_id', $replacementMobilId)
                    ->whereNotIn('status', ['tidak_berangkat', 'tidak_keluar_trip'])
                    ->where('id', '!=', $conflictingTrip->id)
                    ->lockForUpdate()
                    ->first();

                $newDriverId   = null;
                $newDriverName = null;

                if ($replacementTrip !== null) {
                    // Skenario 2: swap mobil + driver antara Trip lama & Trip pengganti.
                    $this->tripService->swap(
                        tripAId: $conflictingTrip->id,
                        tripBId: $replacementTrip->id,
                        versionA: $conflictingTrip->version,
                        versionB: $replacementTrip->version,
                    );

                    $newDriverId   = $replacementTrip->driver_id;
                    $newDriverName = $replacementTrip->driver?->nama;

                    // Refresh trip untuk dapat version baru sebelum markKeluarTrip.
                    $tripForKeluar = Trip::findOrFail($conflictingTrip->id);
                } else {
                    // Skenario 3 fallback: tidak ada Trip pengganti available, treat
                    // sebagai skenario 1 (admin sudah aware via modal). Peer ikut
                    // Trip yang akan keluar_trip — tetap notify supaya admin telpon.
                    $replacementMobilId = $oldMobilId;
                }

                // Cascade peer bookings ke mobil/driver pengganti (bypass model events).
                if ($replacementMobilId !== $oldMobilId) {
                    Booking::query()
                        ->where('trip_id', $conflictingTrip->id)
                        ->where('category', 'Reguler')
                        ->whereNotIn('booking_status', ['Cancelled', 'Draft', 'Ditolak'])
                        ->update([
                            'mobil_id'    => $replacementMobilId,
                            'driver_id'   => $newDriverId,
                            'driver_name' => $newDriverName,
                        ]);

                    // Notif mobil_changed untuk peer bookings.
                    $this->notificationPendingService->recordEventForTripBookings(
                        tripId: $conflictingTrip->id,
                        eventType: BookingNotificationPendingService::EVENT_MOBIL_CHANGED,
                        oldValue: $oldMobilId,
                        newValue: $replacementMobilId,
                        excludeBookingId: $droppingBooking->id,
                    );
                }
            }

            // markKeluarTrip Trip mobilLama (yang sekarang sudah swap atau masih lama).
            // Pakai lazy resolve via app() untuk avoid circular dependency dengan
            // KeluarTripService — KeluarTripService inject TripService, dan kita
            // inject TripService juga. Resolve KeluarTripService di sini supaya
            // tidak ada constructor cycle.
            /** @var KeluarTripService $keluarTripService */
            $keluarTripService = app(KeluarTripService::class);
            $keluarTripService->markKeluarTrip(
                tripId: $tripForKeluar->id,
                expectedVersion: $tripForKeluar->version,
                payload: [
                    'reason'      => 'dropping',
                    'pool_target' => $poolTarget,
                    'note'        => 'Auto dari Pemesanan Dropping ' . ($droppingBooking->booking_code ?? ''),
                ],
            );

            // Link Booking Dropping ke Trip yang sekarang keluar_trip.
            $droppingBooking->trip_id = $conflictingTrip->id;
            $droppingBooking->save();
        });
    }

    /**
     * Auto-create draft Booking Dropping saat Trip set Keluar Trip Dropping
     * (callback dari KeluarTripService::markKeluarTrip reason=dropping).
     *
     * Idempotent: kalau sudah ada Booking Dropping (status Draft) yang link ke
     * trip ini, return existing tanpa create baru. Admin bisa retry markKeluarTrip
     * (flow rare tapi defensive) tanpa dapat duplicate booking.
     *
     * Field minimal: trip_id, mobil_id, driver_id, driver_name, trip_date, trip_time,
     * dropping_pool_target, category='Dropping', booking_status='Draft', notes.
     * Customer fields (nama, telp, alamat) di-set placeholder 'TBD' supaya admin
     * dipaksa lengkapi via Pemesanan Dropping (klik edit).
     */
    public function createDraftDroppingForKeluarTrip(Trip $trip, ?string $userId = null): Booking
    {
        // Defensive: pastikan trip benar-benar dalam mode keluar_trip dropping.
        if ($trip->status !== 'keluar_trip' || $trip->keluar_trip_reason !== 'dropping') {
            throw new \LogicException(
                'createDraftDroppingForKeluarTrip butuh trip status=keluar_trip + reason=dropping. '
                . 'Got status='.$trip->status.', reason='.($trip->keluar_trip_reason ?? 'null'),
            );
        }

        // Idempotent guard: cek Draft existing yang link ke trip ini.
        $existing = Booking::query()
            ->where('trip_id', $trip->id)
            ->where('category', 'Dropping')
            ->where('booking_status', 'Draft')
            ->first();

        if ($existing !== null) {
            return $existing;
        }

        $trip->loadMissing('driver');

        $direction = $trip->direction === 'ROHUL_TO_PKB' ? 'to_pkb' : 'from_pkb';
        $poolTarget = $trip->keluar_trip_pool_target ?? 'ROHUL';

        return Booking::create([
            'booking_code'         => $this->generateDraftBookingCode(),
            'category'             => 'Dropping',
            'trip_id'              => $trip->id,
            'mobil_id'             => $trip->mobil_id,
            'driver_id'            => $trip->driver_id,
            'driver_name'          => $trip->driver?->nama,
            'trip_date'            => $trip->trip_date->toDateString(),
            'trip_time'            => $trip->trip_time,
            'direction'            => $direction,
            'route_via'            => 'BANGKINANG',
            'dropping_pool_target' => $poolTarget,
            'passenger_count'      => 6,
            'selected_seats'       => ['1A', '2A', '2B', '3A', '4A', '5A'],
            'price_per_seat'       => 0,
            'total_amount'         => 0,
            'passenger_name'       => 'TBD',
            'passenger_phone'      => '0000000000',
            'from_city'            => 'TBD',
            'to_city'              => 'TBD',
            'pickup_location'      => 'TBD',
            'dropoff_location'     => 'TBD',
            'route_label'          => 'TBD - TBD',
            'booking_status'       => 'Draft',
            'payment_status'       => 'Belum Bayar',
            'ticket_status'        => 'Draft',
            'booking_for'          => 'self',
            'notes'                => 'Draft auto dari Trip Planning Keluar Trip Dropping. '
                                    . 'Lengkapi data customer via Pemesanan Dropping.',
        ]);
    }

    private function generateDraftBookingCode(): string
    {
        do {
            $code = 'DBK-' . Carbon::now()->format('ymd') . '-' . Str::upper(Str::random(4));
        } while (Booking::query()->where('booking_code', $code)->exists());

        return $code;
    }
}
