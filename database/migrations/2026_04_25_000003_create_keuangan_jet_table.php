<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Tabel keuangan_jet = child per trip per direction.
 *
 * 1 row = 1 trip 1 arah (Keberangkatan ATAU Kepulangan, bukan keduanya).
 * Linked ke keuangan_jet_siklus via keuangan_jet_siklus_id (CASCADE delete).
 *
 * Direction mapping (Trip → KeuanganJet):
 *   Trip.direction = 'ROHUL_TO_PKB' → direction = 'Keberangkatan'
 *   Trip.direction = 'PKB_TO_ROHUL' → direction = 'Kepulangan'
 *
 * Auto-populated dari Bookings (refresh-able via tombol Refresh):
 *   jumlah_penumpang  = COUNT bookings WHERE category='Reguler'
 *   total_ongkos_penumpang = SUM total_amount WHERE category='Reguler'
 *   jumlah_paket      = COUNT bookings WHERE category='Paket'
 *   total_ongkos_paket= SUM total_amount WHERE category='Paket'
 *
 * Manual entry: uang_snack, persen_admin, jenis_layanan, sumber_rental.
 *
 * Computed (auto-recalc on Refresh):
 *   basis_admin = total_ongkos_penumpang + total_ongkos_paket  (snack TIDAK ikut)
 *   trigger_admin = (penumpang>=420k OR paket>=420k OR basis>=420k)
 *   uang_admin = trigger_admin ? basis_admin * persen_admin/100 : 0
 *   total_pendapatan_arah = basis_admin + uang_snack
 *
 * Persen admin auto-default by jenis_layanan:
 *   Reguler / Dropping     → 15
 *   Rental + sumber=loket  → 15
 *   Rental + sumber=driver → 10
 *
 * UNIQUE(trip_id) — 1 trip = max 1 row keuangan_jet (prevent duplicate).
 *
 * Reference: docs/keuangan-jet-design.md (TBD).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('keuangan_jet', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('keuangan_jet_siklus_id');

            // Trip reference
            $table->unsignedBigInteger('trip_id')->nullable();
            $table->date('trip_date');
            $table->uuid('mobil_id');
            $table->string('mobil_code', 20);
            $table->enum('direction', ['Keberangkatan', 'Kepulangan']);
            $table->unsignedTinyInteger('trip_ke');
            $table->time('jam');
            $table->string('trip_status', 30);

            // Jenis Layanan & sumber rental
            $table->enum('jenis_layanan', ['Reguler', 'Dropping', 'Rental'])->default('Reguler');
            $table->boolean('is_jenis_overridden')->default(false);
            $table->enum('sumber_rental', ['loket', 'driver'])->nullable();

            // Auto-populated
            $table->unsignedSmallInteger('jumlah_penumpang')->default(0);
            $table->decimal('total_ongkos_penumpang', 15, 2)->default(0);
            $table->unsignedSmallInteger('jumlah_paket')->default(0);
            $table->decimal('total_ongkos_paket', 15, 2)->default(0);

            // Manual entry
            $table->decimal('uang_snack', 15, 2)->default(0);
            $table->unsignedTinyInteger('persen_admin')->default(15);
            $table->boolean('is_persen_overridden')->default(false);

            // Computed
            $table->decimal('basis_admin', 15, 2)->default(0);
            $table->boolean('trigger_admin')->default(false);
            $table->decimal('uang_admin', 15, 2)->default(0);
            $table->decimal('total_pendapatan_arah', 15, 2)->default(0);

            // Admin payout tracking
            $table->enum('admin_paid_status', ['belum', 'sudah'])->default('belum');
            $table->timestamp('admin_paid_at')->nullable();
            $table->uuid('admin_paid_by')->nullable();

            // Audit
            $table->timestamp('last_refreshed_at')->nullable();
            $table->uuid('created_by')->nullable();
            $table->uuid('updated_by')->nullable();
            $table->timestamps();

            // Indexes
            $table->unique('trip_id', 'uk_keuangan_jet_trip');
            $table->index('keuangan_jet_siklus_id', 'idx_keuangan_jet_siklus');
            $table->index(['trip_date', 'mobil_id'], 'idx_keuangan_jet_date_mobil');
            $table->index('direction', 'idx_keuangan_jet_direction');

            // Foreign keys
            $table->foreign('keuangan_jet_siklus_id', 'fk_keuangan_jet_siklus')
                ->references('id')->on('keuangan_jet_siklus')->cascadeOnDelete();
            $table->foreign('trip_id', 'fk_keuangan_jet_trip')
                ->references('id')->on('trips')->nullOnDelete();
            $table->foreign('mobil_id', 'fk_keuangan_jet_mobil')
                ->references('id')->on('mobil')->restrictOnDelete();
            $table->foreign('admin_paid_by', 'fk_keuangan_jet_admin_paid_by')
                ->references('id')->on('users')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('keuangan_jet');
    }
};
