<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('trip_data_reset_logs', function (Blueprint $table) {
            $table->id();
            $table->enum('scope', ['today', 'all']);
            $table->date('target_date')->nullable()
                ->comment('NULL kalau scope=all, filled kalau scope=today');
            $table->uuid('user_id');
            $table->json('snapshot')->nullable()
                ->comment('JSON dump rows yang dihapus (untuk scope=all). Skip kalau scope=today.');
            $table->json('summary')
                ->comment('Counts per tabel: {pins: N, assignments: N, trips: N, keuangan_jet: N, keuangan_jet_siklus: N}');
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->restrictOnDelete();

            $table->index(['scope', 'target_date'], 'idx_trip_reset_logs_scope_date');
            $table->index('user_id', 'idx_trip_reset_logs_user');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trip_data_reset_logs');
    }
};
