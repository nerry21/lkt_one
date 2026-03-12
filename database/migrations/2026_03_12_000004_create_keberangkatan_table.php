<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('keberangkatan', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('tanggal');
            $table->string('hari');
            $table->string('bulan');
            $table->string('tahun');
            $table->string('kode_mobil');
            $table->uuid('driver_id');
            $table->string('driver_nama');
            $table->integer('jumlah_penumpang');
            $table->integer('tarif_penumpang');
            $table->integer('jumlah_uang_penumpang');
            $table->integer('jumlah_paket');
            $table->integer('uang_paket');
            $table->decimal('uang_pc', 15, 2);
            $table->decimal('uang_bersih', 15, 2);
            $table->integer('trip_ke');
            $table->timestampTz('created_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('keberangkatan');
    }
};
