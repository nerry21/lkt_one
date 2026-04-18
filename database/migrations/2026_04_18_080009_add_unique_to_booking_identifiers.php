<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Bug #13 resolution: promote invoice_number + ticket_number + qr_token dari
     * INDEX (lookup only) ke UNIQUE constraint. Close TOCTOU race window di
     * generateInvoiceNumber/generateTicketNumber/generateQrToken helpers via
     * DB-level guarantee.
     *
     * Q1=B decision: qr_token bundled untuk canonical "all booking identifiers UNIQUE"
     * scope (originally pre-existing sejak migration 2026_03_14_000013 dengan INDEX,
     * namun sama race window semantic dengan invoice_number + ticket_number).
     *
     * Q3=A decision: drop pre-existing lookup INDEX sebelum add UNIQUE. UNIQUE index
     * provides lookup behavior equivalent (MySQL query planner use UNIQUE untuk
     * B-tree lookup), jadi schema cleaner tanpa redundant index entries.
     *
     * Post-UNIQUE: concurrent generateInvoice/generateTicket/generateQrToken collision
     * raises SQLSTATE[23000] Duplicate entry instead of silent duplicate. TOCTOU retry
     * handling di 4 persistence services tracked via bug #36 (low-priority follow-up).
     *
     * PRODUCTION DEPLOY SOP:
     *   Audit duplicate rows pre-migration:
     *     SELECT invoice_number, COUNT(*) FROM bookings
     *       WHERE invoice_number IS NOT NULL AND invoice_number != ''
     *       GROUP BY invoice_number HAVING COUNT(*) > 1;
     *     (ulang untuk ticket_number, qr_token)
     *   Dedupe sebelum migrate kalau duplicate found (manual atau scripted UPDATE).
     */
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropIndex('bookings_invoice_number_lookup_index');
            $table->dropIndex('bookings_ticket_number_lookup_index');
            $table->dropIndex('bookings_qr_token_lookup_index');

            $table->unique('invoice_number');
            $table->unique('ticket_number');
            $table->unique('qr_token');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropUnique(['invoice_number']);
            $table->dropUnique(['ticket_number']);
            $table->dropUnique(['qr_token']);

            $table->index(['invoice_number'], 'bookings_invoice_number_lookup_index');
            $table->index(['ticket_number'], 'bookings_ticket_number_lookup_index');
            $table->index(['qr_token'], 'bookings_qr_token_lookup_index');
        });
    }
};
