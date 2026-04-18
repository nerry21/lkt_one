<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Bug #35 data migration: align legacy payment_status 'Lunas' → canonical 'Dibayar'.
     *
     * Context: admin validatePayment action='lunas' previously wrote payment_status='Lunas'
     * (legacy term), sedangkan wizard M2-M5 paid guards + dashboard aggregation pakai
     * canonical ['Dibayar', 'Dibayar Tunai']. Post bug #35 fix, admin path unified ke 'Dibayar'.
     * Migration ini sweep existing data supaya konsisten dengan convention baru.
     *
     * Idempotent — safe untuk re-run. Kalau zero rows match, UPDATE no-op.
     */
    public function up(): void
    {
        DB::table('bookings')
            ->where('payment_status', 'Lunas')
            ->update(['payment_status' => 'Dibayar']);
    }

    public function down(): void
    {
        // No-op: 'Lunas' semantic retired per bug #35 Candidate A.
        // Down migration intentional no-op untuk prevent reintroduction of legacy value.
        // Reversibility provided via git revert of this migration file.
    }
};
