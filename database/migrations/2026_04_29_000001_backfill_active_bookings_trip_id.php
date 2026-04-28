<?php

use App\Models\Booking;
use App\Services\TripBookingMatcher;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * Sesi 50 PR #1 — Backfill terbatas trip_id untuk booking REGULER aktif H+0..H+7.
 *
 * Scope sengaja sempit:
 *   - category = 'Reguler' (Paket/Dropping/Rental punya path sendiri)
 *   - trip_date dari today sampai +7 hari (booking dekat keberangkatan)
 *   - booking_status IN (Confirmed, Berangkat, Selesai, Diproses,
 *     Menunggu Verifikasi Pembayaran) ATAU payment_status IN (Dibayar, Dibayar Tunai)
 *   - trip_id masih NULL (skip yang sudah ke-link dari save path PR #1)
 *
 * Linkage dilakukan via TripBookingMatcher (consistent dengan service path).
 * Pakai DB::table()->update() supaya bypass model events + cepat untuk batch.
 *
 * down(): no-op. Backfill data — tidak ada cara aman rollback tanpa
 * me-null-kan trip_id yang mungkin sudah di-edit manual setelahnya.
 */
return new class extends Migration
{
    public function up(): void
    {
        $matcher = app(TripBookingMatcher::class);

        $today = Carbon::today()->toDateString();
        $horizon = Carbon::today()->addDays(7)->toDateString();

        $totalScanned = 0;
        $linked = 0;
        $skippedNoTrip = 0;
        $skippedTripUnassigned = 0;

        Booking::query()
            ->whereNull('trip_id')
            ->where('category', 'Reguler')
            ->whereBetween('trip_date', [$today, $horizon])
            ->where(function ($q) {
                $q->whereIn('booking_status', [
                    'Confirmed',
                    'Berangkat',
                    'Selesai',
                    'Diproses',
                    'Menunggu Verifikasi Pembayaran',
                ])->orWhereIn('payment_status', ['Dibayar', 'Dibayar Tunai']);
            })
            ->orderBy('id')
            ->chunkById(200, function ($bookings) use ($matcher, &$totalScanned, &$linked, &$skippedNoTrip, &$skippedTripUnassigned) {
                foreach ($bookings as $booking) {
                    $totalScanned++;

                    $tripDate = $booking->trip_date instanceof \DateTimeInterface
                        ? $booking->trip_date->format('Y-m-d')
                        : (string) $booking->trip_date;

                    $trip = $matcher->findMatchingTrip(
                        $tripDate,
                        (string) $booking->trip_time,
                        (string) ($booking->direction ?? ''),
                        max(1, (int) ($booking->armada_index ?? 1)),
                        $booking->route_via,
                    );

                    if ($trip === null) {
                        $skippedNoTrip++;
                        continue;
                    }

                    $assignment = $matcher->extractAssignmentFromTrip($trip);

                    if ($assignment['mobil_id'] === null) {
                        // Trip exist tapi belum di-assign mobil — link trip_id saja
                        // (mobil/driver akan ter-cascade saat trip di-assign nanti).
                        $skippedTripUnassigned++;
                        DB::table('bookings')
                            ->where('id', $booking->id)
                            ->update(['trip_id' => $assignment['trip_id']]);
                        continue;
                    }

                    DB::table('bookings')
                        ->where('id', $booking->id)
                        ->update([
                            'trip_id'     => $assignment['trip_id'],
                            'mobil_id'    => $assignment['mobil_id'],
                            'driver_id'   => $assignment['driver_id'],
                            'driver_name' => $assignment['driver_name'],
                        ]);

                    $linked++;
                }
            });

        Log::info('Sesi 50 PR #1 backfill: trip_id link untuk booking Reguler aktif H+0..H+7', [
            'horizon_from'                => $today,
            'horizon_to'                  => $horizon,
            'total_scanned'               => $totalScanned,
            'linked_with_assignment'      => $linked,
            'linked_trip_only_unassigned' => $skippedTripUnassigned,
            'skipped_no_matching_trip'    => $skippedNoTrip,
        ]);
    }

    public function down(): void
    {
        // No-op: backfill data, irreversible secara aman.
    }
};
