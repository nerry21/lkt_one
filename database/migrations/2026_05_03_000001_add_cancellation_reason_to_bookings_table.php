<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Sesi 76 PR-CRM-6K3 — Tambah cancellation_reason untuk track cancel context.
     *
     * Values:
     *   - 'cancelled_by_admin' = batal hari ini, mungkin rebook lagi nanti
     *   - 'no_show_final' = batal sama sekali, tidak akan rebook untuk trip ini
     *   - NULL = belum cancel atau cancel sebelum Sesi 76
     */
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('cancellation_reason', 50)->nullable()->after('booking_status');
            $table->index('cancellation_reason', 'bookings_cancel_reason_idx');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropIndex('bookings_cancel_reason_idx');
            $table->dropColumn('cancellation_reason');
        });
    }
};
