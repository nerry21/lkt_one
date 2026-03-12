<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('drivers') || ! Schema::hasTable('mobil') || ! Schema::hasTable('keberangkatan')) {
            return;
        }

        $hasData = DB::table('drivers')->count() > 0
            || DB::table('mobil')->count() > 0
            || DB::table('keberangkatan')->count() > 0;

        if ($hasData) {
            return;
        }

        DB::statement('PRAGMA foreign_keys = OFF');

        Schema::dropIfExists('keberangkatan');
        Schema::dropIfExists('drivers');
        Schema::dropIfExists('mobil');

        Schema::create('drivers', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('nama');
            $table->string('lokasi');
            $table->timestampTz('created_at')->nullable();
        });

        Schema::create('mobil', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('kode_mobil');
            $table->string('jenis_mobil');
            $table->timestampTz('created_at')->nullable();
        });

        Schema::create('keberangkatan', function (Blueprint $table) {
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

        DB::statement('PRAGMA foreign_keys = ON');
    }

    public function down(): void
    {
        // No-op.
    }
};
