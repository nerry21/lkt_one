<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Sesi 50 PR #5 — Tambah field rental ke bookings.
 *
 * Kolom baru:
 *   - rental_pool_target (PKB|ROHUL|NULL): wajib untuk Booking category=Rental,
 *     diteruskan ke Trip.keluar_trip_pool_target saat markKeluarTrip rental.
 *   - rental_keberangkatan_amount: porsi ongkos rental untuk siklus Keberangkatan.
 *   - rental_kepulangan_amount: porsi ongkos rental untuk siklus Kepulangan.
 *
 * Constraint: rental_keberangkatan_amount + rental_kepulangan_amount === total_amount
 * di-enforce di controller (server-side validation), bukan DB constraint — admin
 * bisa adjust manual sebelum sum dihitung sehingga DB constraint terlalu rigid.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table): void {
            $table->string('rental_pool_target', 10)
                ->nullable()
                ->after('dropping_pool_target')
                ->comment('PKB|ROHUL — hanya untuk category=Rental.');

            $table->unsignedInteger('rental_keberangkatan_amount')
                ->nullable()
                ->after('rental_pool_target')
                ->comment('Porsi ongkos rental untuk siklus Keberangkatan (manual oleh admin).');

            $table->unsignedInteger('rental_kepulangan_amount')
                ->nullable()
                ->after('rental_keberangkatan_amount')
                ->comment('Porsi ongkos rental untuk siklus Kepulangan (manual oleh admin).');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table): void {
            $table->dropColumn([
                'rental_pool_target',
                'rental_keberangkatan_amount',
                'rental_kepulangan_amount',
            ]);
        });
    }
};
