<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * Sesi 44B PR #1B-fix — Audit-trail no-op untuk kategori RENTAL.
 *
 * Konteks:
 *   - Rental = sewa mobil 6 kursi multi-day untuk customer.
 *   - Tarif Rental di JET Travel adalah MANUAL INPUT oleh admin sesuai
 *     negosiasi (per hari × jumlah hari × promo, semuanya negotiated).
 *   - RentalBookingService extends DroppingBookingService secara struktural,
 *     tidak ada fareMap khusus.
 *   - Recompute via fareMap (dari RegularBookingService) akan MERUSAK data
 *     finansial Rental.
 *
 * Strategi: NO-OP dengan logging count untuk audit trail.
 */
return new class extends Migration
{
    public function up(): void
    {
        $count = DB::table('bookings')->where('category', 'Rental')->count();

        Log::info('Sesi 44B PR #1B-fix migration: RENTAL no-op (audit trail)', [
            'category' => 'Rental',
            'total_skipped' => $count,
            'reason' => 'Rental fare = manual admin input (multi-day, negotiated per day rate). Recompute would corrupt data.',
        ]);
    }

    public function down(): void
    {
        // No-op migration, no down() needed.
    }
};
