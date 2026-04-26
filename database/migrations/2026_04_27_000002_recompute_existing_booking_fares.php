<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * Sesi 44B PR #1B (REVISED PR #1B-fix) — Recompute REGULER booking total_amount
 * sesuai fareMap baru.
 *
 * VERSI INI ADALAH HASIL FIX DARI BUG SESI 44B PR #1B AWAL:
 *   - Versi awal tidak filter category, akibatnya 31 booking Paket akan
 *     dirusak (tarif Paket 50k-80k dipaksa jadi 150k tarif Reguler).
 *   - Versi ini: filter `category = 'Reguler'`. Hanya kategori Reguler
 *     yang punya fareMap auto-resolve. Paket/Dropping/Rental = manual input.
 *
 * Strategi:
 *   - Iterate booking dengan category='Reguler' yang from_city + to_city
 *     ada di fareMap.
 *   - Compute correct fare via RegularBookingService::resolveFare.
 *   - Compute additional_fare historis: total_amount/passenger_count - price_per_seat.
 *   - Update price_per_seat = correct_fare. Update total_amount =
 *     (correct_fare + additional_fare) * passenger_count.
 *   - SKIP booking yang correct_fare=null (rute tidak ada di fareMap).
 *   - SKIP booking yang sudah match fareMap baru (no-op).
 *
 * Migration data tidak punya `down()` — historical record tidak di-rollback.
 *
 * 3 migrasi terpisah untuk kategori lain (no-op tapi logging untuk audit):
 *   - 2026_04_27_000003_recompute_existing_paket_fares.php
 *   - 2026_04_27_000004_recompute_existing_dropping_fares.php
 *   - 2026_04_27_000005_recompute_existing_rental_fares.php
 */
return new class extends Migration
{
    public function up(): void
    {
        $service = app(\App\Services\RegularBookingService::class);

        $totalScanned = 0;
        $updated = 0;
        $skippedNoChange = 0;
        $skippedNoFare = 0;
        $totalDiff = 0;

        DB::table('bookings')
            ->where('category', 'Reguler')
            ->select('id', 'from_city', 'to_city', 'price_per_seat', 'total_amount', 'passenger_count')
            ->orderBy('id')
            ->chunk(200, function ($bookings) use ($service, &$totalScanned, &$updated, &$skippedNoChange, &$skippedNoFare, &$totalDiff) {
                foreach ($bookings as $b) {
                    $totalScanned++;

                    $correctFare = $service->resolveFare(
                        (string) $b->from_city,
                        (string) $b->to_city,
                    );

                    if ($correctFare === null) {
                        $skippedNoFare++;
                        continue;
                    }

                    $currentFare = (int) round((float) $b->price_per_seat);
                    $passengerCount = max(1, (int) $b->passenger_count);
                    $currentTotal = (int) round((float) $b->total_amount);

                    if ($currentFare === $correctFare) {
                        $skippedNoChange++;
                        continue;
                    }

                    $impliedAdditional = max(0, (int) round(($currentTotal / $passengerCount) - $currentFare));
                    $newTotal = ($correctFare + $impliedAdditional) * $passengerCount;

                    DB::table('bookings')
                        ->where('id', $b->id)
                        ->update([
                            'price_per_seat' => $correctFare,
                            'total_amount' => $newTotal,
                        ]);

                    $updated++;
                    $totalDiff += ($newTotal - $currentTotal);
                }
            });

        Log::info('Sesi 44B PR #1B-fix migration data: recompute REGULER booking fares', [
            'category' => 'Reguler',
            'total_scanned' => $totalScanned,
            'updated' => $updated,
            'skipped_no_change' => $skippedNoChange,
            'skipped_no_fare_in_map' => $skippedNoFare,
            'total_amount_difference_idr' => $totalDiff,
        ]);
    }

    public function down(): void
    {
        // Migration data — historical record tidak di-rollback untuk safety.
    }
};
