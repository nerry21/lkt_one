<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Menambah 3 kolom ke tabel trips untuk fitur Same-Day Return (Fase E5):
 *
 *   same_day_return (BOOLEAN default FALSE, indexed)
 *     Marker flag: TRUE kalau trip PKB→ROHUL ini hasil dari trigger
 *     same-day return dari trip ROHUL→PKB di hari yang sama. Di-index
 *     single-column karena audit query Fase F akan WHERE filter pada
 *     kolom ini (count per bulan, ratio same-day vs regular, dsb).
 *
 *   same_day_return_reason (VARCHAR(64) nullable)
 *     Freeform Indonesian reason text dari admin Zizi saat trigger
 *     same-day return. Contoh: "penumpang pulang kembali hari ini",
 *     "request driver", dst. NULL = regular generated trip (non-SDR).
 *
 *   same_day_return_origin_trip_id (FK trips.id nullable, nullOnDelete)
 *     Link kembali ke trip asal ROHUL→PKB yang memicu same-day return
 *     ini. Constraint nullOnDelete: kalau origin trip hard-deleted,
 *     flag di-clear otomatis (bukan block) — defensive terhadap origin
 *     deletion yang rare tapi harus tidak orphan reference.
 *
 * Referensi desain: handoff Sesi 30 DP-E5.1 (schema foundation).
 *
 * Idempotent pattern (Schema::hasColumn + Schema::hasIndex guard) mengikuti
 * migration 2026_04_21_000002_add_home_pool_to_mobil_table.php — safe untuk
 * re-run dan untuk environment partial state. DDL di luar DB::transaction
 * karena MySQL auto-implicit-commit per ALTER TABLE (lesson #7 handoff).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('trips', function (Blueprint $table) {
            if (! Schema::hasColumn('trips', 'same_day_return')) {
                // Marker flag: audit query Fase F akan filter via WHERE same_day_return=TRUE.
                $table->boolean('same_day_return')
                    ->default(false)
                    ->after('original_trip_time');
            }

            if (! Schema::hasColumn('trips', 'same_day_return_reason')) {
                // Freeform Indonesian reason text (audit trail kenapa SDR di-trigger).
                $table->string('same_day_return_reason', 64)
                    ->nullable()
                    ->after('same_day_return');
            }

            if (! Schema::hasColumn('trips', 'same_day_return_origin_trip_id')) {
                // FK ke trip asal ROHUL→PKB; nullOnDelete supaya tidak orphan
                // kalau origin trip hard-deleted (rare tapi defensif).
                $table->foreignId('same_day_return_origin_trip_id')
                    ->nullable()
                    ->after('same_day_return_reason')
                    ->constrained('trips')
                    ->nullOnDelete();
            }
        });

        // Index single-column untuk audit query WHERE same_day_return=TRUE.
        // Bukan composite — filter utama hanya by flag ini, date range via
        // existing index pada trip_date.
        if (! Schema::hasIndex('trips', 'trips_same_day_return_index')) {
            Schema::table('trips', function (Blueprint $table) {
                $table->index('same_day_return', 'trips_same_day_return_index');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasIndex('trips', 'trips_same_day_return_index')) {
            Schema::table('trips', function (Blueprint $table) {
                $table->dropIndex('trips_same_day_return_index');
            });
        }

        Schema::table('trips', function (Blueprint $table) {
            // FK constraint harus di-drop sebelum kolomnya di-drop (MySQL).
            if (Schema::hasColumn('trips', 'same_day_return_origin_trip_id')) {
                $table->dropForeign(['same_day_return_origin_trip_id']);
            }

            $dropColumns = collect([
                'same_day_return_origin_trip_id',
                'same_day_return_reason',
                'same_day_return',
            ])
                ->filter(fn (string $column) => Schema::hasColumn('trips', $column))
                ->values()
                ->all();

            if ($dropColumns !== []) {
                $table->dropColumn($dropColumns);
            }
        });
    }
};
