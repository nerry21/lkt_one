<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Mobil;
use App\Models\Trip;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * Sesi 50 PR #5 — Pemesanan Rental ↔ Trip Planning integration.
 *
 * Mirror pattern DroppingTripIntegrationService (PR #4) dengan quirks Rental:
 *   - planned_end_date WAJIB (multi-day rental, minimum 2 hari).
 *   - rental_end_date di Booking sumbernya admin, diteruskan ke
 *     Trip.keluar_trip_planned_end_date saat markKeluarTrip.
 *   - Pembagian ongkos Keberangkatan/Kepulangan diisi MANUAL oleh admin di form
 *     (sesuai filosofi Sesi 50 K-6 — sistem tidak auto-split untuk hindari
 *     mismatch dengan kebijakan bagi hasil yang admin atur kasus per kasus).
 *
 * Sengaja TIDAK extract shared parent class dengan Dropping — quirks beda yang
 * bisa diverge di masa depan, premature abstraction harms readability.
 *
 * Konflik mobil dengan penumpang reguler aktif → modal konfirmasi swap (admin
 * awareness). Jangan auto-resolve tanpa konfirmasi karena affect penumpang
 * reguler — admin pegang keputusan via dropdown mobil pengganti di modal.
 *
 * Stateless service. Caller WAJIB sudah validate payload (controller layer).
 */
class RentalTripIntegrationService
{
    public function __construct(
        private readonly TripBookingMatcher $tripBookingMatcher,
        private readonly TripService $tripService,
        private readonly BookingNotificationPendingService $notificationPendingService,
    ) {}

    /**
     * Detect konflik mobil — sama logic dengan DroppingTripIntegrationService::detectMobilConflict.
     *
     * @return array{
     *   hasConflict: bool,
     *   conflictingTrip: ?Trip,
     *   peerBookingsCount: int,
     *   peerBookings: \Illuminate\Support\Collection,
     *   availableReplacementMobils: \Illuminate\Support\Collection,
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
     * Eksekusi swap mobil + markKeluarTrip rental + link Booking ke Trip.
     *
     * Beda dari Dropping: rental WAJIB pass planned_end_date.
     *
     * Skenario swap sama dengan Dropping (PR #4):
     *   1. $replacementMobilId NULL → langsung markKeluarTrip rental.
     *   2. $replacementMobilId ada + Trip pengganti exists → swap A↔B + cascade
     *      peer + markKeluarTrip Trip A rental.
     *   3. $replacementMobilId ada + Trip pengganti tidak ada → fallback ke
     *      skenario 1 (admin awareness via modal).
     */
    public function executeSwapAndRentalLink(
        Booking $rentalBooking,
        Trip $conflictingTrip,
        ?string $replacementMobilId,
        string $poolTarget,
        string $plannedEndDate,
        ?string $userId = null,
    ): void {
        DB::transaction(function () use (
            $rentalBooking, $conflictingTrip, $replacementMobilId, $poolTarget, $plannedEndDate, $userId,
        ): void {
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
                    $this->tripService->swap(
                        tripAId: $conflictingTrip->id,
                        tripBId: $replacementTrip->id,
                        versionA: $conflictingTrip->version,
                        versionB: $replacementTrip->version,
                    );

                    $newDriverId   = $replacementTrip->driver_id;
                    $newDriverName = $replacementTrip->driver?->nama;

                    $tripForKeluar = Trip::findOrFail($conflictingTrip->id);
                } else {
                    // Fallback: tidak ada Trip pengganti, peer ikut Trip yang akan keluar_trip.
                    $replacementMobilId = $oldMobilId;
                }

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

                    $this->notificationPendingService->recordEventForTripBookings(
                        tripId: $conflictingTrip->id,
                        eventType: BookingNotificationPendingService::EVENT_MOBIL_CHANGED,
                        oldValue: $oldMobilId,
                        newValue: $replacementMobilId,
                        excludeBookingId: $rentalBooking->id,
                    );
                }
            }

            // Lazy resolve KeluarTripService (avoid circular dep).
            /** @var KeluarTripService $keluarTripService */
            $keluarTripService = app(KeluarTripService::class);
            $keluarTripService->markKeluarTrip(
                tripId: $tripForKeluar->id,
                expectedVersion: $tripForKeluar->version,
                payload: [
                    'reason'           => 'rental',
                    'pool_target'      => $poolTarget,
                    'planned_end_date' => $plannedEndDate,
                    'note'             => 'Auto dari Pemesanan Rental ' . ($rentalBooking->booking_code ?? ''),
                ],
            );

            $rentalBooking->trip_id = $conflictingTrip->id;
            $rentalBooking->save();
        });
    }

    /**
     * Auto-create draft Booking Rental saat Trip set Keluar Trip Rental
     * (callback dari KeluarTripService::markKeluarTrip reason=rental).
     *
     * Idempotent: kalau sudah ada Booking Rental Draft yang link ke trip ini,
     * return existing tanpa create baru.
     *
     * Field tambahan vs Dropping:
     *   - rental_end_date   = trip.keluar_trip_planned_end_date
     *   - rental_pool_target= trip.keluar_trip_pool_target
     *   - rental_keberangkatan_amount + rental_kepulangan_amount = NULL (admin
     *     lengkapi nanti via Pemesanan Rental).
     */
    public function createDraftRentalForKeluarTrip(Trip $trip, ?string $userId = null): Booking
    {
        if ($trip->status !== 'keluar_trip' || $trip->keluar_trip_reason !== 'rental') {
            throw new \LogicException(
                'createDraftRentalForKeluarTrip butuh trip status=keluar_trip + reason=rental. '
                . 'Got status='.$trip->status.', reason='.($trip->keluar_trip_reason ?? 'null'),
            );
        }

        $existing = Booking::query()
            ->where('trip_id', $trip->id)
            ->where('category', 'Rental')
            ->where('booking_status', 'Draft')
            ->first();

        if ($existing !== null) {
            return $existing;
        }

        $trip->loadMissing('driver');

        $direction = $trip->direction === 'ROHUL_TO_PKB' ? 'to_pkb' : 'from_pkb';
        $poolTarget = $trip->keluar_trip_pool_target ?? 'ROHUL';
        $plannedEnd = $trip->keluar_trip_planned_end_date?->toDateString();

        return Booking::create([
            'booking_code'        => $this->generateDraftBookingCode(),
            'category'            => 'Rental',
            'trip_id'             => $trip->id,
            'mobil_id'            => $trip->mobil_id,
            'driver_id'           => $trip->driver_id,
            'driver_name'         => $trip->driver?->nama,
            'trip_date'           => $trip->trip_date->toDateString(),
            'trip_time'           => $trip->trip_time,
            'rental_end_date'     => $plannedEnd,
            'direction'           => $direction,
            'route_via'           => 'BANGKINANG',
            'rental_pool_target'  => $poolTarget,
            'rental_keberangkatan_amount' => null,
            'rental_kepulangan_amount'    => null,
            'passenger_count'     => 6,
            'selected_seats'      => ['1A', '2A', '2B', '3A', '4A', '5A'],
            'price_per_seat'      => 0,
            'total_amount'        => 0,
            'passenger_name'      => 'TBD',
            'passenger_phone'     => '0000000000',
            'from_city'           => 'TBD',
            'to_city'             => 'TBD',
            'pickup_location'     => 'TBD',
            'dropoff_location'    => 'TBD',
            'route_label'         => 'TBD - TBD',
            'booking_status'      => 'Draft',
            'payment_status'      => 'Belum Bayar',
            'ticket_status'       => 'Draft',
            'booking_for'         => 'self',
            'notes'               => 'Draft auto dari Trip Planning Keluar Trip Rental. '
                                   . 'Lengkapi data customer + porsi Keberangkatan/Kepulangan via Pemesanan Rental.',
        ]);
    }

    private function generateDraftBookingCode(): string
    {
        do {
            $code = 'RNT-' . Carbon::now()->format('ymd') . '-' . Str::upper(Str::random(4));
        } while (Booking::query()->where('booking_code', $code)->exists());

        return $code;
    }
}
