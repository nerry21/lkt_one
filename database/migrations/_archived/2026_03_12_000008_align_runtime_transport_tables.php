<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement('PRAGMA foreign_keys = OFF');

        if ($this->needsDriversAlignment()) {
            $this->rebuildDriversTable();
        }

        if ($this->needsMobilAlignment()) {
            $this->rebuildMobilTable();
        }

        if ($this->needsKeberangkatanAlignment()) {
            $this->rebuildKeberangkatanTable();
        }

        DB::statement('PRAGMA foreign_keys = ON');
    }

    public function down(): void
    {
        // Skipped intentionally: previous runtime schema was inconsistent with the active models.
    }

    private function needsDriversAlignment(): bool
    {
        return str_contains($this->tableSql('drivers'), '"id" integer');
    }

    private function needsMobilAlignment(): bool
    {
        return str_contains($this->tableSql('mobil'), '"id" integer');
    }

    private function needsKeberangkatanAlignment(): bool
    {
        $sql = $this->tableSql('keberangkatan');

        return str_contains($sql, '"id" integer')
            || str_contains($sql, 'jam_keberangkatan')
            || str_contains($sql, 'biaya_snack')
            || str_contains($sql, 'biaya_air_mineral');
    }

    private function tableSql(string $table): string
    {
        $row = DB::selectOne("select sql from sqlite_master where type = 'table' and name = ?", [$table]);

        return strtolower((string) ($row->sql ?? ''));
    }

    private function rebuildDriversTable(): void
    {
        Schema::dropIfExists('drivers_temp');

        Schema::create('drivers_temp', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('nama');
            $table->string('lokasi');
            $table->timestampTz('created_at')->nullable();
        });

        DB::statement("
            INSERT INTO drivers_temp (id, nama, lokasi, created_at)
            SELECT CAST(id AS TEXT), nama, lokasi, created_at
            FROM drivers
        ");

        Schema::drop('drivers');
        Schema::rename('drivers_temp', 'drivers');
    }

    private function rebuildMobilTable(): void
    {
        Schema::dropIfExists('mobil_temp');

        Schema::create('mobil_temp', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('kode_mobil');
            $table->string('jenis_mobil');
            $table->timestampTz('created_at')->nullable();
        });

        DB::statement("
            INSERT INTO mobil_temp (id, kode_mobil, jenis_mobil, created_at)
            SELECT CAST(id AS TEXT), kode_mobil, jenis_mobil, created_at
            FROM mobil
        ");

        Schema::drop('mobil');
        Schema::rename('mobil_temp', 'mobil');
    }

    private function rebuildKeberangkatanTable(): void
    {
        Schema::dropIfExists('keberangkatan_temp');

        Schema::create('keberangkatan_temp', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('tanggal');
            $table->string('hari');
            $table->string('bulan');
            $table->string('tahun');
            $table->string('kode_mobil');
            $table->string('driver_id');
            $table->string('driver_nama');
            $table->integer('jumlah_penumpang')->default(0);
            $table->integer('tarif_penumpang')->default(0);
            $table->integer('jumlah_uang_penumpang')->default(0);
            $table->integer('jumlah_paket')->default(0);
            $table->integer('uang_paket')->default(0);
            $table->integer('jumlah_snack')->default(0);
            $table->integer('jumlah_air_mineral')->default(0);
            $table->decimal('uang_pc', 15, 2)->default(0);
            $table->decimal('uang_bersih', 15, 2)->default(0);
            $table->integer('trip_ke')->default(1);
            $table->timestampTz('created_at')->nullable();
        });

        DB::statement("
            INSERT INTO keberangkatan_temp (
                id, tanggal, hari, bulan, tahun, kode_mobil, driver_id, driver_nama,
                jumlah_penumpang, tarif_penumpang, jumlah_uang_penumpang, jumlah_paket,
                uang_paket, jumlah_snack, jumlah_air_mineral, uang_pc, uang_bersih, trip_ke, created_at
            )
            SELECT
                CAST(id AS TEXT),
                CAST(tanggal AS TEXT),
                hari,
                bulan,
                tahun,
                kode_mobil,
                CAST(driver_id AS TEXT),
                driver_nama,
                COALESCE(jumlah_penumpang, 0),
                COALESCE(tarif_penumpang, 0),
                COALESCE(jumlah_uang_penumpang, 0),
                COALESCE(jumlah_paket, 0),
                COALESCE(uang_paket, 0),
                COALESCE(jumlah_snack, 0),
                COALESCE(jumlah_air_mineral, 0),
                COALESCE(uang_pc, 0),
                COALESCE(uang_bersih, 0),
                COALESCE(trip_ke, 1),
                created_at
            FROM keberangkatan
        ");

        Schema::drop('keberangkatan');
        Schema::rename('keberangkatan_temp', 'keberangkatan');
    }
};
