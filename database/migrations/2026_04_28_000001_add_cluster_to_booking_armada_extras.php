<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Sesi 46 PR #56 (Sub-Phase B.0) — Cluster-aware booking_armada_extras.
 *
 * Skenario X (locked di Sesi 45): armada di-counter independen per cluster.
 *   - Slot fisik = (trip_date, trip_time, direction, route_via, armada_index)
 *   - Mobil BKG #1 dan Mobil PTP #1 di slot waktu sama = 2 mobil paralel
 *
 * Tabel booking_armada_extras pre-PR ini:
 *   - Kolom: (id, trip_date, trip_time, max_armada_index, timestamps)
 *   - Unique: (trip_date, trip_time)
 *   - Ekspresi slot: 1 baris per (date, time) = max armada cross-cluster
 *
 * Tabel post-PR ini:
 *   - + direction, route_via columns
 *   - Drop unique (trip_date, trip_time)
 *   - Add unique (trip_date, trip_time, direction, route_via)
 *   - Backfill: direction='to_pkb' route_via='BANGKINANG' (default cluster Sesi 44A)
 *
 * Pasangan PR ini hanya ubah schema. Update controller (armadaExtras +
 * upsertArmadaExtra) ditangani di PR #57 (Sub-Phase B.1).
 *
 * @see database/migrations/2026_04_27_000001_add_direction_and_route_via_to_bookings.php
 *      Pola yang sama (nullable add → backfill → NOT NULL change).
 */
return new class extends Migration
{
    public function up(): void
    {
        // Step 1: Tambah kolom nullable dulu (untuk backfill existing data)
        Schema::table('booking_armada_extras', function (Blueprint $table) {
            $table->string('direction', 10)->nullable()->after('trip_time');
            $table->string('route_via', 20)->nullable()->after('direction');
        });

        // Step 2: Backfill existing rows
        // Default: direction='to_pkb', route_via='BANGKINANG'
        // Alasan: konsisten dengan backfill bookings di PR #1A Sesi 44A.
        // Admin revisi manual via UI nanti kalau memang ada slot historis PETAPAHAN
        // (per keputusan D5 Sesi 46 — biarkan apa adanya, tidak ada data review otomatis).
        DB::table('booking_armada_extras')
            ->whereNull('direction')
            ->update([
                'direction' => 'to_pkb',
                'route_via' => 'BANGKINANG',
            ]);

        // Step 3: Lock columns NOT NULL setelah backfill
        Schema::table('booking_armada_extras', function (Blueprint $table) {
            $table->string('direction', 10)->nullable(false)->change();
            $table->string('route_via', 20)->nullable(false)->change();
        });

        // Step 4: Drop unique key lama, tambah unique key composite cluster-aware
        // CRITICAL: DDL di luar DB::transaction (lessons Sesi 38 — implicit commit issue)
        // dropUnique pakai array kolom (Laravel auto-resolve nama index)
        Schema::table('booking_armada_extras', function (Blueprint $table) {
            $table->dropUnique(['trip_date', 'trip_time']);
        });

        Schema::table('booking_armada_extras', function (Blueprint $table) {
            $table->unique(
                ['trip_date', 'trip_time', 'direction', 'route_via'],
                'booking_armada_extras_slot_unique'
            );
        });
    }

    public function down(): void
    {
        // Reverse order untuk safe rollback

        // Step 4 reverse: drop unique baru, restore unique lama
        Schema::table('booking_armada_extras', function (Blueprint $table) {
            $table->dropUnique('booking_armada_extras_slot_unique');
        });

        Schema::table('booking_armada_extras', function (Blueprint $table) {
            $table->unique(['trip_date', 'trip_time']);
        });

        // Step 1-3 reverse: drop kolom (data ikut hilang, sesuai semantic down)
        Schema::table('booking_armada_extras', function (Blueprint $table) {
            $table->dropColumn(['direction', 'route_via']);
        });
    }
};
