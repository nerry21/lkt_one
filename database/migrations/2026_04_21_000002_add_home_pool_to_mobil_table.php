<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Menambah 2 kolom ke tabel mobil untuk fitur Trip Planning:
 *
 *   home_pool (ENUM 'PKB'|'ROHUL' nullable)
 *     Bootstrap pool awal saat first-deploy Trip Planning. PoolStateService
 *     pakai nilai ini sebagai fallback kalau belum ada trip history untuk
 *     mobil tersebut (§5.4). NULL = admin belum set → mobil di-exclude
 *     dari generate jadwal harian. Setelah sistem jalan, pool derived
 *     otomatis dari trip history (kolom ini hanya "seed" hari pertama).
 *
 *   is_active_in_trip (BOOLEAN default TRUE)
 *     Flag eksplisit apakah mobil aktif di sistem Trip Planning (§2.8 E3).
 *     FALSE = mobil di-exclude dari generate (mis. service panjang, pending
 *     sold, atau retired sementara). Default TRUE supaya existing 10 mobil
 *     di prod otomatis aktif tanpa bulk update manual.
 *
 * Referensi desain: docs/trip-planning-design.md §3.5.
 *
 * Idempotent pattern (Schema::hasColumn guard) mengikuti migration
 * 2026_03_13_000004_add_manifest_fields_to_drivers_and_mobil_tables.php —
 * safe untuk re-run dan untuk environment partial state.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('mobil', function (Blueprint $table) {
            if (! Schema::hasColumn('mobil', 'home_pool')) {
                $table->enum('home_pool', ['PKB', 'ROHUL'])
                    ->nullable()
                    ->after('jenis_mobil');
            }

            if (! Schema::hasColumn('mobil', 'is_active_in_trip')) {
                $table->boolean('is_active_in_trip')
                    ->default(true)
                    ->after('home_pool');
            }
        });
    }

    public function down(): void
    {
        Schema::table('mobil', function (Blueprint $table) {
            $dropColumns = collect(['home_pool', 'is_active_in_trip'])
                ->filter(fn (string $column) => Schema::hasColumn('mobil', $column))
                ->values()
                ->all();

            if ($dropColumns !== []) {
                $table->dropColumn($dropColumns);
            }
        });
    }
};
