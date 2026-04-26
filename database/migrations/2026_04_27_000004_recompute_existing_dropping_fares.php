<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * Sesi 44B PR #1B-fix — Audit-trail no-op untuk kategori DROPPING.
 *
 * Konteks:
 *   - Dropping = charter mobil 6 kursi penuh untuk 1 customer/grup.
 *   - Tarif Dropping di JET Travel adalah MANUAL INPUT oleh admin sesuai
 *     negosiasi dengan customer (harga premium karena exclusive use).
 *   - Tidak ada fareMap Dropping — DroppingBookingDraftService terima
 *     parameter `int $fareAmount` manual.
 *   - Karena itu, recompute via fareMap (dari RegularBookingService) akan
 *     MERUSAK data finansial Dropping.
 *
 * Strategi: NO-OP dengan logging count untuk audit trail.
 */
return new class extends Migration
{
    public function up(): void
    {
        $count = DB::table('bookings')->where('category', 'Dropping')->count();

        Log::info('Sesi 44B PR #1B-fix migration: DROPPING no-op (audit trail)', [
            'category' => 'Dropping',
            'total_skipped' => $count,
            'reason' => 'Dropping fare = manual admin input (charter exclusive, negotiated). Recompute would corrupt data.',
        ]);
    }

    public function down(): void
    {
        // No-op migration, no down() needed.
    }
};
