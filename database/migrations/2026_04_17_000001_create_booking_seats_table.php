<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Membuat tabel booking_seats untuk menyelesaikan race condition seat booking.
 *
 * Referensi bug: docs/audit-findings.md #2, #5, #6, #8 (partial), #9.
 *
 * Locking mechanism — MariaDB "poor man's partial index" pattern:
 *   - Kolom virtual PERSISTENT `active_slot_key` berisi concatenated slot key
 *     saat row aktif (lock_released_at IS NULL), dan NULL saat row released.
 *   - UNIQUE KEY di `active_slot_key` enforce satu row aktif per kombinasi
 *     (trip_date, trip_time, from_city, to_city, armada_index, seat_number).
 *   - Released rows punya NULL → tidak bentrok dengan booking baru (MariaDB
 *     UNIQUE treat NULL sebagai non-equal).
 *   - Row tidak pernah hard-delete → audit trail via lock_released_at/by/reason.
 *
 * Lock type:
 *   - 'soft' = booking pending payment (cash belum dibayar / transfer belum verified).
 *     Admin bisa release via PATCH /api/bookings/{id}/release-seats.
 *   - 'hard' = booking sudah lunas. Admin tidak bisa release (butuh refund flow).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('booking_seats', function (Blueprint $table) {
            $table->id();

            // FK ke bookings — cascade: kalau booking dihapus, semua seat ikut.
            $table->foreignId('booking_id')
                ->constrained('bookings')
                ->cascadeOnDelete();

            $table->date('trip_date');

            // trip_time: format HH:MM:00 dienforce di application layer (mutator
            // Booking + SeatLockService), BUKAN via DB CHECK constraint.
            // Alasan: MariaDB 10.4 CHECK enforcement flaky dengan Laravel
            // introspection; lebih reliable di PHP side.
            $table->time('trip_time');

            $table->string('from_city', 100);
            $table->string('to_city', 100);

            // armada_index 1-indexed: armada utama=1, armada tambahan=2,3,...
            // Konsisten dengan bookings.armada_index default (verified via DESCRIBE 2026-04-17).
            $table->unsignedTinyInteger('armada_index')->default(1);

            // '1A', '2B', dst. 5 char cukup untuk layout 6-seat + angka 2-digit.
            $table->string('seat_number', 5);

            $table->enum('lock_type', ['soft', 'hard'])->default('soft');

            // NULL = row aktif (seat masih terkunci). Non-null = released.
            $table->timestamp('lock_released_at')->nullable();

            // FK ke users (UUID) — nullable karena row awal tidak punya releaser.
            // ON DELETE SET NULL: kalau admin user dihapus, audit tetap ada.
            $table->foreignUuid('lock_released_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->string('lock_release_reason', 255)->nullable();

            $table->timestamps();

            // Composite index untuk query occupiedSeats:
            //   WHERE trip_date=? AND trip_time=? AND from_city=? AND to_city=?
            //         AND armada_index=? AND lock_released_at IS NULL
            // Kolom lock_released_at di akhir supaya equality predicate slot
            // bisa pakai index range scan, lalu IS NULL filter efisien di leaf.
            $table->index(
                ['trip_date', 'trip_time', 'from_city', 'to_city', 'armada_index', 'lock_released_at'],
                'idx_booking_seats_slot_active'
            );
        });

        // Generated column PERSISTENT + UNIQUE key via raw SQL.
        //
        // Alasan pakai DB::statement (bukan Laravel Blueprint ->storedAs):
        //   1. Laravel ->storedAs() menghasilkan keyword STORED (MySQL), bukan
        //      PERSISTENT (MariaDB native). MariaDB accept STORED sebagai alias,
        //      tapi eksplisit lebih safe.
        //   2. CHARACTER SET ascii COLLATE ascii_bin tidak natural di Blueprint
        //      untuk generated column — DB::statement lebih bersih.
        //   3. active_slot_key semantically ASCII-only (hasil CONCAT_WS dari
        //      DATE/TIME/VARCHAR). Pakai ascii charset save index space (255 byte
        //      vs 1020 byte utf8mb4) + bypass InnoDB key length issue.
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
    }

    public function down(): void
    {
        // Schema::dropIfExists drop FK + generated column + indexes secara otomatis.
        Schema::dropIfExists('booking_seats');
    }
};
