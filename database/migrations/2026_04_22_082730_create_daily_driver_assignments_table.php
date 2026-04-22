<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('daily_driver_assignments', function (Blueprint $table) {
            $table->id();
            $table->date('date')->index();
            // Mobil, Driver, dan User di codebase ini semuanya pakai UUID PK (HasUuids).
            $table->uuid('mobil_id');
            $table->uuid('driver_id');
            $table->uuid('created_by')->nullable();
            $table->uuid('updated_by')->nullable();
            $table->timestamps();

            // Satu assignment per (mobil, date) — last write wins via upsert di controller.
            $table->unique(['date', 'mobil_id'], 'daily_driver_assignments_date_mobil_unique');

            // Tabel mobil bernama tunggal `mobil` (lihat App\Models\Mobil::$table).
            $table->foreign('mobil_id')
                ->references('id')->on('mobil')
                ->cascadeOnDelete();

            $table->foreign('driver_id')
                ->references('id')->on('drivers')
                ->cascadeOnDelete();

            $table->foreign('created_by')
                ->references('id')->on('users')
                ->nullOnDelete();

            $table->foreign('updated_by')
                ->references('id')->on('users')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('daily_driver_assignments');
    }
};
