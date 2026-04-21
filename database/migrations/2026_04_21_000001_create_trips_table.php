<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Membuat tabel trips sebagai foundation fitur Trip Planning.
 *
 * Satu row trips = 1 slot keberangkatan aktual (mobil + driver + arah + tanggal +
 * jam) yang akan / sudah berjalan, atau entry pool (menunggu slot jam). Terpisah
 * dari tabel `keberangkatan` lama (jadwal legacy) — trips menjadi sumber otoritatif
 * untuk daily board ops (Bu Bos / Admin Zizi) dan lifecycle keluar trip (dropping,
 * rental, other).
 *
 * Referensi desain: docs/trip-planning-design.md §3.2 (schema DDL),
 *                   docs/trip-planning-design.md §3.3 (index strategy),
 *                   docs/trip-planning-design.md §3.4 (invariants).
 *
 * CATATAN ENFORCEMENT INVARIANT:
 *   Invariants per §3.4 (mis. "8 field keluar_trip_* WAJIB NULL jika status !=
 *   'keluar_trip'", "keluar_trip_substatus='returning' butuh actual_end_date
 *   terisi", "sequence unik per (trip_date, direction)") TIDAK di-enforce via DB
 *   CHECK constraint. Alasan konsisten dengan keputusan booking_seats (2026-04-17):
 *   MariaDB 10.4 CHECK enforcement flaky terhadap Laravel introspection; lebih
 *   reliable di-enforce di TripService + model observer (app layer).
 *
 *   Unique constraint (trip_date, direction, sequence) juga SENGAJA tidak ditaruh
 *   di DB — reordering sequence (drag & drop board) butuh swap yang lebih bebas;
 *   TripService akan jaga konsistensi via transaction.
 *
 * Optimistic locking `version` mengikuti pattern Bug #30 (bookings.version) —
 * 4.3B range cukup, tidak perlu index (selalu di-query via PK).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('trips', function (Blueprint $table) {
            $table->id();

            $table->date('trip_date');

            // NULL = waiting list entry (mobil sudah di pool, slot jam belum
            // di-assign). Board UI render kolom khusus untuk trip_time IS NULL.
            $table->time('trip_time')->nullable();

            // Arah trip — enum fixed, perubahan value harus via migration baru.
            $table->enum('direction', ['PKB_TO_ROHUL', 'ROHUL_TO_PKB']);

            // Urutan 1,2,3,... dalam (trip_date, direction). UNIQUE sengaja tidak
            // ditaruh di DB (lihat catatan di atas).
            $table->unsignedSmallInteger('sequence');

            // FK ke mobil (UUID) — RESTRICT: mobil masih dipakai di trip aktif
            // tidak boleh dihapus (harus retire dulu).
            $table->foreignUuid('mobil_id')
                ->constrained('mobil')
                ->restrictOnDelete();

            // FK ke drivers (UUID) — RESTRICT: sama alasan.
            $table->foreignUuid('driver_id')
                ->constrained('drivers')
                ->restrictOnDelete();

            // Status lifecycle trip:
            //   scheduled         — baseline, belum eksekusi
            //   berangkat         — trip regular berangkat sesuai plan
            //   tidak_berangkat   — trip regular dibatalkan
            //   keluar_trip       — masuk mode dropping/rental/other (multi-hari)
            //   tidak_keluar_trip — dibatalkan dari mode keluar_trip
            //   ganti_jam         — trip_time diganti dari original_trip_time
            $table->enum('status', [
                'scheduled',
                'berangkat',
                'tidak_berangkat',
                'keluar_trip',
                'tidak_keluar_trip',
                'ganti_jam',
            ])->default('scheduled');

            // ===== 8 field Keluar Trip (hanya terisi saat status='keluar_trip') =====
            // Invariant: semua NULL kalau status != 'keluar_trip'. Enforce di app layer.

            $table->enum('keluar_trip_reason', ['dropping', 'rental', 'other'])->nullable();
            $table->text('keluar_trip_note')->nullable();

            // Substatus lifecycle keluar_trip:
            //   out           — mobil sedang keluar (dari pool asal)
            //   waiting_list  — sudah tiba di pool tujuan, menunggu slot balik
            //   returning     — sudah di-assign slot balik / sudah balik (actual_end_date terisi)
            $table->enum('keluar_trip_substatus', ['out', 'waiting_list', 'returning'])->nullable();

            // Target pool saat keluar trip (tujuan mobil).
            $table->enum('keluar_trip_pool_target', ['PKB', 'ROHUL'])->nullable();

            $table->date('keluar_trip_start_date')->nullable();

            // NULL = Alur B (manual close, tidak ada target tanggal balik).
            $table->date('keluar_trip_planned_end_date')->nullable();

            $table->date('keluar_trip_actual_end_date')->nullable();

            // Timestamp saat mobil masuk pool tujuan (untuk rekonsiliasi waiting list).
            $table->timestamp('keluar_trip_pool_entered_at')->nullable();

            // ===== Ganti Jam =====
            // original_trip_time menyimpan trip_time sebelum ganti (untuk undo, R8).
            // NULL kalau trip belum pernah ganti jam.
            $table->time('original_trip_time')->nullable();

            // ===== Optimistic locking (pattern Bug #30) =====
            $table->unsignedInteger('version')->default(0);

            // ===== Audit =====
            // SET NULL kalau user dihapus — jangan lost trip record.
            $table->foreignUuid('created_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->foreignUuid('updated_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamps();

            // ===== Index strategy (§3.3) =====

            // Daily board view: tampilkan semua trip per tanggal + arah, urutkan
            // by sequence. Hit untuk rendering board utama.
            $table->index(
                ['trip_date', 'direction', 'sequence'],
                'idx_trips_daily_view'
            );

            // Lookup mobil: "mobil X lagi trip apa hari Y arah apa?" — dipakai
            // saat assign mobil baru + deteksi konflik booking.
            $table->index(
                ['mobil_id', 'trip_date', 'direction'],
                'idx_trips_mobil_daily'
            );

            // Monitoring keluar trip aktif: cari trip yang status='keluar_trip'
            // dengan substatus tertentu dan planned_end_date mendekati hari ini.
            $table->index(
                ['status', 'keluar_trip_substatus', 'keluar_trip_planned_end_date'],
                'idx_trips_active_keluar'
            );

            // Rekonsiliasi pool: cari trip aktif per tanggal + status untuk cross-
            // check mobil yang ada di pool target.
            $table->index(
                ['trip_date', 'status', 'mobil_id'],
                'idx_trips_pool_recon'
            );
        });
    }

    public function down(): void
    {
        // Schema::dropIfExists drop FK + indexes secara otomatis.
        Schema::dropIfExists('trips');
    }
};
