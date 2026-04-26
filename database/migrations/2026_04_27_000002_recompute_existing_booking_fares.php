<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * Sesi 44B PR #1B — Recompute existing booking total_amount sesuai fareMap baru.
 *
 * Konteks:
 *   - PR #1B update fareMap dengan tarif final.
 *   - Beberapa booking existing dibuat sebelum tarif final → price_per_seat /
 *     total_amount mungkin tidak match fareMap baru.
 *   - Decision Sesi 44B: update SEMUA existing (termasuk Selesai/Dibayar) ke
 *     tarif baru. Audit-trail trade-off: laporan keuangan akan tampil angka baru.
 *
 * Strategi:
 *   - Iterate booking dengan from_city + to_city yang ada di fareMap.
 *   - Compute correct fare via RegularBookingService::resolveFare.
 *   - Compute additional_fare historis: total_amount/passenger_count - price_per_seat
 *     (preserve di hasil baru kalau positive).
 *   - Update price_per_seat = correct_fare. Update total_amount =
 *     (correct_fare + additional_fare) * passenger_count.
 *   - SKIP booking yang correct_fare=null (rute tidak ada di fareMap — manual).
 *   - SKIP booking yang sudah match fareMap baru (no-op).
 *
 * Migration data tidak punya `down()` — historical record tidak di-rollback
 * untuk safety audit-trail.
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

                    // Compute additional_fare_per_passenger historis (kalau ada).
                    // Formula original: total_amount = (price_per_seat + additional) * passenger_count
                    // → additional = total_amount/passenger_count - price_per_seat
                    $impliedAdditional = (int) round(($currentTotal / $passengerCount) - $currentFare);
                    $impliedAdditional = max(0, $impliedAdditional);

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

        Log::info('Sesi 44B PR #1B migration data: recompute booking fares', [
            'total_scanned' => $totalScanned,
            'updated' => $updated,
            'skipped_no_change' => $skippedNoChange,
            'skipped_no_fare_in_map' => $skippedNoFare,
            'total_amount_difference_idr' => $totalDiff,
        ]);
    }

    public function down(): void
    {
        // Migration data — historical record tidak di-rollback untuk safety
        // audit-trail. Kalau perlu revert, pakai backup tabel manual.
    }
};
