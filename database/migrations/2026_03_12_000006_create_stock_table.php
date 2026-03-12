<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('stock')) {
            return;
        }

        Schema::create('stock', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('tanggal')->unique();
            $table->string('hari');
            $table->string('bulan');
            $table->string('tahun');
            $table->integer('total_stock_snack')->default(0);
            $table->integer('total_stock_air_mineral')->default(0);
            $table->integer('terpakai_snack')->default(0);
            $table->integer('terpakai_air_mineral')->default(0);
            $table->integer('sisa_stock_snack')->default(0);
            $table->integer('sisa_stock_air_mineral')->default(0);
            $table->bigInteger('nilai_total')->default(0);
            $table->bigInteger('sisa_nilai_total')->default(0);
            $table->string('keterangan')->nullable();
            $table->timestampTz('created_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stock');
    }
};
