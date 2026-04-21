<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Migrate data jam keberangkatan dari schedule lama ke schedule baru di
 * semua tabel yang menyimpan trip_time.
 *
 * Referensi: docs/trip-planning-design.md §4.4 (migration script) dan §4.6
 * (deploy runbook).
 *
 * Mapping deterministik (one-to-one, no ambiguity):
 *   '05:00:00' → '05:30:00'
 *   '08:00:00' → '07:00:00'
 *   '10:00:00' → '09:00:00'
 *   '14:00:00' → '13:00:00'
 *   '16:00:00', '19:00:00' — TIDAK BERUBAH
 *
 * Plus untuk format string (di tabel keberangkatan dan booking_armada_extras
 * yang pakai VARCHAR/string):
 *   '05:00' → '05:30'
 *   '08:00' → '07:00'
 *   '10:00' → '09:00'
 *   '14:00' → '13:00'
 *
 * 6 kolom di 5 tabel ter-affect:
 *   - bookings.trip_time (TIME)
 *   - bookings.return_trip_time (TIME nullable, untuk rental round-trip)
 *   - booking_seats.trip_time (TIME) — generated column active_slot_key
 *     PERSISTENT akan auto re-compute oleh MariaDB
 *   - booking_armada_extras.trip_time (string(8))
 *   - keberangkatan.jam_keberangkatan (string + default value 'XX:XX')
 *   - departures.trip_time (TIME)
 *
 * SAFETY DESIGN:
 *
 * 1. Pre-flight conflict check WAJIB jalan SEBELUM UPDATE.
 *    Jika ada booking lama jam '08:00' di tanggal yang sama dengan booking
 *    baru jam '07:00' (skenario seharusnya tidak terjadi karena LKT One UI
 *    + chatbot tidak terkoneksi, tapi defense-in-depth), UPDATE akan trigger
 *    UNIQUE constraint violation di booking_seats.active_slot_key.
 *    Pre-flight detect ini sebelum UPDATE jalan, abort dengan error message
 *    detail.
 *
 * 2. Wrap dalam DB::transaction — semua UPDATE atomic. Jika satu fail,
 *    rollback semua. Mencegah partial migration state yang corrupt.
 *
 * 3. Pakai DB::statement RAW SQL — bypass Eloquent + mutator (Keberangkatan
 *    model punya saving() mutator yang fallback ke DEFAULT kalau jam tidak
 *    match JAM_KEBERANGKATAN_OPTIONS). Direct UPDATE table aman karena tidak
 *    trigger model events.
 *
 * 4. Default value di kolom keberangkatan.jam_keberangkatan juga di-update
 *    via ALTER COLUMN — supaya insert future tanpa explicit jam pakai default
 *    baru ('07:00').
 *
 * 5. Down() tersedia untuk rollback — reverse mapping. Catatan: kalau setelah
 *    A7 deploy ada booking baru dengan jam baru, rollback akan corrupt mereka
 *    (jam '07:00' jadi '08:00' yang hilang context). Hanya safe untuk
 *    rollback dalam window pendek post-deploy sebelum traffic baru masuk.
 *
 * 6. ALTER TABLE (DDL) WAJIB di luar DB::transaction(). MySQL/MariaDB DDL
 *    trigger implicit commit yang meng-close transaction yang sedang aktif —
 *    kalau ALTER di dalam closure, Laravel akan dapat PDOException
 *    "There is no active transaction" saat coba PDO::commit() di akhir.
 *    Pattern correct: UPDATE data dalam transaction, DDL setelah transaction
 *    selesai. Berlaku untuk up() dan down().
 */
return new class extends Migration
{
    /**
     * Forward mapping: jam lama → jam baru (format TIME 'HH:MM:SS').
     *
     * @var array<string, string>
     */
    private array $forwardMapping = [
        '05:00:00' => '05:30:00',
        '08:00:00' => '07:00:00',
        '10:00:00' => '09:00:00',
        '14:00:00' => '13:00:00',
    ];

    /**
     * Forward mapping format string ('HH:MM') untuk kolom VARCHAR.
     *
     * @var array<string, string>
     */
    private array $forwardMappingShort = [
        '05:00' => '05:30',
        '08:00' => '07:00',
        '10:00' => '09:00',
        '14:00' => '13:00',
    ];

    public function up(): void
    {
        // Step 1 — Pre-flight conflict check.
        // Detect potential UNIQUE constraint violation di booking_seats setelah UPDATE.
        $this->assertNoConflict();

        // Step 2 — Atomic UPDATE semua kolom dalam 1 transaction.
        DB::transaction(function (): void {
            $this->updateBookingsTripTime();
            $this->updateBookingsReturnTripTime();
            $this->updateBookingSeatsTripTime();
            $this->updateBookingArmadaExtrasTripTime();
            $this->updateKeberangkatanJam();
            $this->updateDeparturesTripTime();
        });

        // Step 3 — DDL untuk update default value WAJIB di luar transaction.
        //
        // MySQL/MariaDB DDL statement (ALTER TABLE) trigger implicit commit
        // yang meng-close transaction yang sedang aktif. Kalau ALTER di dalam
        // closure DB::transaction(), Laravel akan PDO::commit() di akhir
        // closure dan dapat PDOException "There is no active transaction".
        //
        // Pattern correct: DDL outside transaction (idiomatic MySQL migration).
        // Reference: https://dev.mysql.com/doc/refman/8.0/en/implicit-commit.html
        $this->updateKeberangkatanDefault();
    }

    public function down(): void
    {
        // Reverse mapping untuk rollback.
        // PERINGATAN: hanya safe dalam window pendek post-deploy (sebelum
        // booking baru dengan jam baru masuk). Jangan rollback setelah
        // production traffic resume.
        DB::transaction(function (): void {
            $reverseMapping = array_flip($this->forwardMapping);
            $reverseMappingShort = array_flip($this->forwardMappingShort);

            foreach ($reverseMapping as $newTime => $oldTime) {
                DB::table('bookings')
                    ->where('trip_time', $newTime)
                    ->update(['trip_time' => $oldTime]);

                DB::table('bookings')
                    ->where('return_trip_time', $newTime)
                    ->update(['return_trip_time' => $oldTime]);

                DB::table('booking_seats')
                    ->where('trip_time', $newTime)
                    ->update(['trip_time' => $oldTime]);

                DB::table('departures')
                    ->where('trip_time', $newTime)
                    ->update(['trip_time' => $oldTime]);
            }

            foreach ($reverseMappingShort as $newTime => $oldTime) {
                DB::table('booking_armada_extras')
                    ->where('trip_time', $newTime)
                    ->update(['trip_time' => $oldTime]);

                DB::table('keberangkatan')
                    ->where('jam_keberangkatan', $newTime)
                    ->update(['jam_keberangkatan' => $oldTime]);
            }
        });

        // DDL revert default value — di luar transaction (sama alasan dengan up()).
        DB::statement("ALTER TABLE keberangkatan MODIFY COLUMN jam_keberangkatan VARCHAR(255) NOT NULL DEFAULT '08:00'");
    }

    /**
     * Step 1: Pre-flight check — abort jika ada potential conflict di booking_seats.
     */
    private function assertNoConflict(): void
    {
        if (! Schema::hasTable('booking_seats')) {
            return;
        }

        $conflicts = [];

        foreach ($this->forwardMapping as $oldTime => $newTime) {
            $rows = DB::select("
                SELECT
                    bs_old.trip_date,
                    bs_old.trip_time AS old_time,
                    bs_new.trip_time AS new_time,
                    bs_old.from_city,
                    bs_old.to_city,
                    bs_old.armada_index,
                    bs_old.seat_number,
                    bs_old.booking_id AS old_booking_id,
                    bs_new.booking_id AS new_booking_id
                FROM booking_seats bs_old
                INNER JOIN booking_seats bs_new
                    ON bs_old.trip_date = bs_new.trip_date
                    AND bs_old.from_city = bs_new.from_city
                    AND bs_old.to_city = bs_new.to_city
                    AND bs_old.armada_index = bs_new.armada_index
                    AND bs_old.seat_number = bs_new.seat_number
                WHERE bs_old.trip_time = ?
                AND bs_new.trip_time = ?
                AND bs_old.lock_released_at IS NULL
                AND bs_new.lock_released_at IS NULL
            ", [$oldTime, $newTime]);

            foreach ($rows as $row) {
                $conflicts[] = sprintf(
                    'tanggal=%s seat=%s armada=%d kota=%s→%s | booking_lama_jam_%s id=%d ↔ booking_baru_jam_%s id=%d',
                    $row->trip_date,
                    $row->seat_number,
                    $row->armada_index,
                    $row->from_city,
                    $row->to_city,
                    $row->old_time,
                    $row->old_booking_id,
                    $row->new_time,
                    $row->new_booking_id,
                );
            }
        }

        if ($conflicts !== []) {
            $count = count($conflicts);
            $detail = implode("\n  - ", $conflicts);
            throw new \RuntimeException(
                "PRE-FLIGHT CONFLICT CHECK FAILED: Ditemukan {$count} potential UNIQUE violation\n"
                . "di booking_seats setelah UPDATE jam lama → jam baru.\n\n"
                . "Detail konflik:\n  - {$detail}\n\n"
                . "Migration di-abort. Resolve manual conflict ini terlebih dahulu sebelum deploy."
            );
        }
    }

    private function updateBookingsTripTime(): void
    {
        foreach ($this->forwardMapping as $oldTime => $newTime) {
            DB::table('bookings')
                ->where('trip_time', $oldTime)
                ->update(['trip_time' => $newTime]);
        }
    }

    private function updateBookingsReturnTripTime(): void
    {
        foreach ($this->forwardMapping as $oldTime => $newTime) {
            DB::table('bookings')
                ->where('return_trip_time', $oldTime)
                ->update(['return_trip_time' => $newTime]);
        }
    }

    private function updateBookingSeatsTripTime(): void
    {
        if (! Schema::hasTable('booking_seats')) {
            return;
        }

        foreach ($this->forwardMapping as $oldTime => $newTime) {
            DB::table('booking_seats')
                ->where('trip_time', $oldTime)
                ->update(['trip_time' => $newTime]);
        }
    }

    private function updateBookingArmadaExtrasTripTime(): void
    {
        if (! Schema::hasTable('booking_armada_extras')) {
            return;
        }

        foreach ($this->forwardMappingShort as $oldTime => $newTime) {
            DB::table('booking_armada_extras')
                ->where('trip_time', $oldTime)
                ->update(['trip_time' => $newTime]);
        }
    }

    private function updateKeberangkatanJam(): void
    {
        foreach ($this->forwardMappingShort as $oldTime => $newTime) {
            DB::table('keberangkatan')
                ->where('jam_keberangkatan', $oldTime)
                ->update(['jam_keberangkatan' => $newTime]);
        }
    }

    private function updateDeparturesTripTime(): void
    {
        if (! Schema::hasTable('departures')) {
            return;
        }

        foreach ($this->forwardMapping as $oldTime => $newTime) {
            DB::table('departures')
                ->where('trip_time', $oldTime)
                ->update(['trip_time' => $newTime]);
        }
    }

    private function updateKeberangkatanDefault(): void
    {
        DB::statement("ALTER TABLE keberangkatan MODIFY COLUMN jam_keberangkatan VARCHAR(255) NOT NULL DEFAULT '07:00'");
    }
};
