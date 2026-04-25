<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Tabel keuangan_jet_siklus = parent record per round-trip cycle.
 *
 * 1 row = 1 mobil 1 siklus (bisa span multi-day, e.g. Senin berangkat
 * ROHUL→PKB, Rabu pulang PKB→ROHUL = 1 siklus). Trigger complete saat
 * trip Kepulangan di-mark berangkat (regular markBerangkat) atau
 * Same-Day Return ditrigger.
 *
 * Status:
 *   - berjalan : kepulangan belum di-mark berangkat → bagi hasil belum compute
 *   - complete : kepulangan sudah di-mark berangkat → bagi hasil computed
 *   - locked   : driver_paid_status = sudah → no edit allowed
 *
 * Driver override: driver_id_planned dari Trip Planning (read-only),
 * driver_id_actual override-able. is_driver_overridden flag = true kalau
 * planned != actual.
 *
 * Bagi hasil: 30% driver / 70% mobil (dari total_pendapatan_bersih).
 * Operasional (uang_jalan + biaya_kurir + biaya_cuci_mobil) manual entry
 * per siklus.
 *
 * NO UNIQUE(mobil_id, tanggal_mulai) — 1 mobil bisa punya multi siklus
 * di tanggal sama (e.g., morning round + afternoon round = 2 siklus).
 *
 * Reference: docs/keuangan-jet-design.md (TBD created di PR #2 atau #3).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('keuangan_jet_siklus', function (Blueprint $table) {
            $table->bigIncrements('id');

            // Cycle window
            $table->date('tanggal_mulai');
            $table->date('tanggal_selesai')->nullable();

            // Mobil & driver
            $table->uuid('mobil_id');
            $table->string('mobil_code', 20);
            $table->uuid('driver_id_planned')->nullable();
            $table->uuid('driver_id_actual');
            $table->string('driver_name_actual', 100);
            $table->boolean('is_driver_overridden')->default(false);

            // Manual entry biaya operasional
            $table->decimal('uang_jalan', 15, 2)->default(0);
            $table->decimal('biaya_kurir', 15, 2)->default(0);
            $table->decimal('biaya_cuci_mobil', 15, 2)->default(0);

            // Computed aggregates
            $table->decimal('total_revenue_kbg', 15, 2)->default(0);
            $table->decimal('total_revenue_kpl', 15, 2)->default(0);
            $table->decimal('total_uang_admin_kbg', 15, 2)->default(0);
            $table->decimal('total_uang_admin_kpl', 15, 2)->default(0);
            $table->decimal('total_pendapatan_kotor', 15, 2)->default(0);
            $table->decimal('total_admin_potong', 15, 2)->default(0);
            $table->decimal('total_operasional', 15, 2)->default(0);
            $table->decimal('total_pendapatan_bersih', 15, 2)->default(0);
            $table->decimal('uang_driver', 15, 2)->default(0);
            $table->decimal('uang_mobil', 15, 2)->default(0);

            // Status
            $table->enum('status_siklus', ['berjalan', 'complete', 'locked'])->default('berjalan');

            // Trigger metadata
            $table->timestamp('completed_at')->nullable();
            $table->uuid('completed_by')->nullable();
            $table->enum('completed_via', ['regular_return', 'same_day_return', 'manual'])->nullable();

            // Driver payout tracking
            $table->enum('driver_paid_status', ['belum', 'sudah'])->default('belum');
            $table->timestamp('driver_paid_at')->nullable();
            $table->uuid('driver_paid_by')->nullable();

            // Audit
            $table->timestamp('last_refreshed_at')->nullable();
            $table->uuid('created_by')->nullable();
            $table->uuid('updated_by')->nullable();
            $table->timestamps();

            // Indexes
            $table->index('tanggal_mulai', 'idx_keuangan_siklus_mulai');
            $table->index('tanggal_selesai', 'idx_keuangan_siklus_selesai');
            $table->index(['mobil_id', 'tanggal_mulai'], 'idx_keuangan_siklus_mobil');
            $table->index('status_siklus', 'idx_keuangan_siklus_status');
            $table->index('driver_id_actual', 'idx_keuangan_siklus_driver_actual');

            // Foreign keys (DDL OUTSIDE transaction — handled by Laravel migration runner)
            $table->foreign('mobil_id', 'fk_keuangan_siklus_mobil')
                ->references('id')->on('mobil')->restrictOnDelete();
            $table->foreign('driver_id_planned', 'fk_keuangan_siklus_driver_planned')
                ->references('id')->on('drivers')->nullOnDelete();
            $table->foreign('driver_id_actual', 'fk_keuangan_siklus_driver_actual')
                ->references('id')->on('drivers')->restrictOnDelete();
            $table->foreign('driver_paid_by', 'fk_keuangan_siklus_paid_by')
                ->references('id')->on('users')->nullOnDelete();
            $table->foreign('completed_by', 'fk_keuangan_siklus_completed_by')
                ->references('id')->on('users')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('keuangan_jet_siklus');
    }
};
