<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Sesi 44A PR #1A — Direction-aware seat lock + schema front-loaded for PR #1C.
 *
 * Slot fisik mobil = (trip_date, trip_time, direction, route_via, armada_index, seat_number).
 *
 * Field baru:
 *   - direction: 'to_pkb' | 'from_pkb' — arah perjalanan mobil
 *   - route_via: 'BANGKINANG' | 'PETAPAHAN' — jalur fisik mobil melewati cabang mana.
 *     Default 'BANGKINANG' di PR #1A (semua existing booking di-set BANGKINANG).
 *     PR #1C nanti akan tambah validation forbidden routes + admin pilih via UI.
 *
 * Bug yang difix: sebelum PR ini, slot fisik = (date, time, from_city, to_city, armada_index)
 *   menyebabkan kursi 2A bisa dipesan oleh "Simpang D→PKB" DAN "Pasirpengaraian→PKB" di
 *   slot/mobil yang sama (data corruption double-book). Setelah PR ini, slot fisik =
 *   (date, time, direction, route_via, armada_index, seat) — kedua booking di atas sama-sama
 *   direction=to_pkb, route_via=BANGKINANG (default), kursi 2A bentrok benar.
 *
 * UNIQUE composite di active_slot_key di-revisi: drop from_city+to_city, ganti dengan
 * direction+route_via. Pattern PERSISTENT virtual column + ascii charset match existing.
 */
return new class extends Migration
{
    public function up(): void
    {
        // Step 1: Add columns nullable dulu (untuk backfill existing data sebelum NOT NULL)
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('direction', 10)->nullable()->after('to_city');
            $table->string('route_via', 20)->nullable()->after('direction');
        });

        Schema::table('booking_seats', function (Blueprint $table) {
            $table->string('direction', 10)->nullable()->after('to_city');
            $table->string('route_via', 20)->nullable()->after('direction');
        });

        // Step 2: Backfill bookings existing
        // direction: dari to_city/from_city
        // route_via: default 'BANGKINANG' (PR #1A baseline; admin revisi via UI di PR #1D)
        DB::table('bookings')
            ->whereNull('direction')
            ->where('to_city', 'Pekanbaru')
            ->update(['direction' => 'to_pkb', 'route_via' => 'BANGKINANG']);

        DB::table('bookings')
            ->whereNull('direction')
            ->where('from_city', 'Pekanbaru')
            ->update(['direction' => 'from_pkb', 'route_via' => 'BANGKINANG']);

        // Edge case: keduanya non-PKB (inter-titik) — pre-PR1A jarang/tidak ada,
        // tapi defensive default ke to_pkb (admin nanti revisi).
        DB::table('bookings')
            ->whereNull('direction')
            ->update(['direction' => 'to_pkb', 'route_via' => 'BANGKINANG']);

        // Step 3: Backfill booking_seats existing (sync dari parent booking via JOIN)
        DB::statement("
            UPDATE booking_seats bs
            INNER JOIN bookings b ON bs.booking_id = b.id
            SET bs.direction = b.direction,
                bs.route_via = b.route_via
            WHERE bs.direction IS NULL OR bs.route_via IS NULL
        ");

        // Step 4: Lock columns NOT NULL setelah backfill
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('direction', 10)->nullable(false)->change();
            $table->string('route_via', 20)->nullable(false)->change();
        });

        Schema::table('booking_seats', function (Blueprint $table) {
            $table->string('direction', 10)->nullable(false)->change();
            $table->string('route_via', 20)->nullable(false)->change();
        });

        // Step 5: Drop UNIQUE constraint + virtual column lama (yang include from_city+to_city)
        // dan re-create dengan (direction, route_via). DDL outside Schema closure (DDL trigger
        // implicit commit — pattern existing).
        DB::statement('ALTER TABLE booking_seats DROP INDEX uk_booking_seats_active_slot');
        DB::statement('ALTER TABLE booking_seats DROP COLUMN active_slot_key');

        // Re-create dengan composition baru: (trip_date, trip_time, direction, route_via, armada_index, seat_number)
        DB::statement("
            ALTER TABLE booking_seats
            ADD COLUMN active_slot_key VARCHAR(255)
                CHARACTER SET ascii COLLATE ascii_bin
                AS (
                    CASE
                        WHEN lock_released_at IS NULL
                        THEN CONCAT_WS('|', trip_date, trip_time, direction, route_via, armada_index, seat_number)
                        ELSE NULL
                    END
                ) PERSISTENT,
            ADD UNIQUE KEY uk_booking_seats_active_slot (active_slot_key)
        ");

        // Step 6: Update composite index untuk getOccupiedSeats query
        DB::statement('ALTER TABLE booking_seats DROP INDEX idx_booking_seats_slot_active');
        DB::statement("
            CREATE INDEX idx_booking_seats_slot_active
            ON booking_seats (trip_date, trip_time, direction, route_via, armada_index, lock_released_at)
        ");
    }

    public function down(): void
    {
        // Reverse: drop new constraint+index, restore old
        DB::statement('ALTER TABLE booking_seats DROP INDEX uk_booking_seats_active_slot');
        DB::statement('ALTER TABLE booking_seats DROP COLUMN active_slot_key');
        DB::statement('ALTER TABLE booking_seats DROP INDEX idx_booking_seats_slot_active');

        // Restore old virtual column dengan from_city+to_city
        DB::statement("
            ALTER TABLE booking_seats
            ADD COLUMN active_slot_key VARCHAR(255)
                CHARACTER SET ascii COLLATE ascii_bin
                AS (
                    CASE
                        WHEN lock_released_at IS NULL
                        THEN CONCAT_WS('|', trip_date, trip_time, from_city, to_city, armada_index, seat_number)
                        ELSE NULL
                    END
                ) PERSISTENT,
            ADD UNIQUE KEY uk_booking_seats_active_slot (active_slot_key)
        ");

        DB::statement("
            CREATE INDEX idx_booking_seats_slot_active
            ON booking_seats (trip_date, trip_time, from_city, to_city, armada_index, lock_released_at)
        ");

        // Drop columns
        Schema::table('booking_seats', function (Blueprint $table) {
            $table->dropColumn(['direction', 'route_via']);
        });

        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn(['direction', 'route_via']);
        });
    }
};
