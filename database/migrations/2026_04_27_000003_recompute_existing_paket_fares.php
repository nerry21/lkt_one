<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * Sesi 44B PR #1B-fix — Audit-trail no-op untuk kategori PAKET.
 *
 * Konteks:
 *   - Tarif Paket di JET Travel adalah MANUAL INPUT oleh admin saat booking.
 *   - Tidak ada "tarif resmi" Paket yang fixed (50k-80k bervariasi sesuai
 *     ukuran paket, kesepakatan dengan customer, promo, dll).
 *   - PackageBookingService extends RegularBookingService secara struktural,
 *     tapi fareMap inherit TIDAK dipakai — fare di-input via parameter
 *     `int $fareAmount` di PackageBookingDraftService::fromValidated.
 *   - Karena itu, recompute via fareMap akan MERUSAK data finansial Paket.
 *
 * Strategi: NO-OP. Migrasi ini cuma scan tabel + log count untuk audit trail
 * (membuktikan kita sudah pertimbangkan kategori Paket tapi sengaja skip).
 */
return new class extends Migration
{
    public function up(): void
    {
        $count = DB::table('bookings')->where('category', 'Paket')->count();

        Log::info('Sesi 44B PR #1B-fix migration: PAKET no-op (audit trail)', [
            'category' => 'Paket',
            'total_skipped' => $count,
            'reason' => 'Paket fare = manual admin input (no fareMap). Recompute would corrupt data.',
        ]);
    }

    public function down(): void
    {
        // No-op migration, no down() needed.
    }
};
