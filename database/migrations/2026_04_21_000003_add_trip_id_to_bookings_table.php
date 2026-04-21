<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Menambah kolom trip_id (FK nullable ke trips.id) ke tabel bookings.
 *
 * PENTING — kolom ini TIDAK dipopulate di Fase A. Ini purely schema-ready
 * untuk Tahap Lanjut (Fase B/C) di mana booking regular akan ter-assign ke
 * Trip spesifik (bukan cuma departure_id legacy). Existing ~120 booking di
 * prod akan punya trip_id = NULL — aman, tidak break booking flow karena
 * logic booking saat ini masih resolve via (trip_date, trip_time, mobil_id)
 * lewat tabel departures lama.
 *
 * ON DELETE SET NULL — kalau trip di-delete (jarang, biasanya status
 * 'tidak_berangkat' lebih tepat), booking tidak ikut hilang. Booking tetap
 * ada sebagai record historis, trip_id jadi NULL.
 *
 * Referensi desain: docs/trip-planning-design.md §3.6.
 *
 * Idempotent pattern (Schema::hasColumn guard) mengikuti A2 + migration
 * 2026_03_13_000004_add_manifest_fields_to_drivers_and_mobil_tables.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            if (! Schema::hasColumn('bookings', 'trip_id')) {
                $table->foreignId('trip_id')
                    ->nullable()
                    ->after('armada_index')
                    ->constrained('trips')
                    ->nullOnDelete();
            }
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            if (Schema::hasColumn('bookings', 'trip_id')) {
                // Drop FK constraint dulu sebelum drop column — MySQL butuh
                // ini eksplisit. constrained() generate nama default
                // bookings_trip_id_foreign.
                $table->dropForeign(['trip_id']);
                $table->dropColumn('trip_id');
            }
        });
    }
};
