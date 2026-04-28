<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Sesi 50 PR #4 — Tambah kolom dropping_pool_target ke bookings.
 *
 * Kolom: 'PKB' | 'ROHUL' | NULL.
 *   - Wajib untuk Booking dengan category='Dropping' (validasi di Form Request).
 *   - Reguler / Rental / Paket → NULL (tidak relevan).
 *
 * Tujuan: integrasi 2-arah Pemesanan Dropping ↔ Trip Planning. Saat
 * markKeluarTrip dipanggil dengan reason='dropping', pool_target diteruskan
 * dari Booking ini ke Trip.keluar_trip_pool_target.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table): void {
            $table->string('dropping_pool_target', 10)
                ->nullable()
                ->after('route_via')
                ->comment('PKB|ROHUL — hanya untuk category=Dropping. Default ROHUL.');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table): void {
            $table->dropColumn('dropping_pool_target');
        });
    }
};
