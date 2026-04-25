<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Sesi 40 PR #5D — Atomic destructive drop tabel legacy Keberangkatan + Stock.
     *
     * Refactor Data Keuangan JET → Keuangan JET sole source.
     * Data historical preserved via:
     *   - CSV backup: ~/backups/lkt-deploy/csv-keberangkatan-*.csv
     *   - CSV backup: ~/backups/lkt-deploy/csv-stock-*.csv
     *   - Full DB backup: ~/backups/lkt-deploy/predeploy-keuangan-jet-pr5d-fullDB-*.sql
     *
     * Order: stock dropped sebelum keberangkatan (no FK constraint, tapi defensive
     * order kalau-kalau ada FK silent).
     */
    public function up(): void
    {
        Schema::dropIfExists('stock');
        Schema::dropIfExists('keberangkatan');
    }

    /**
     * Down direction NOT supported — data sudah hilang permanently.
     * Restore via CSV backup + manual schema recreation.
     */
    public function down(): void
    {
        throw new \RuntimeException(
            'PR #5D drop is irreversible. Restore via CSV backup + manual schema recreation.'
        );
    }
};
