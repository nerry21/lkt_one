<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('daily_assignment_pins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('daily_driver_assignment_id')
                ->constrained('daily_driver_assignments')
                ->cascadeOnDelete();
            // Presence of row = pinned. Direction wajib pair dengan trip_time.
            $table->enum('direction', ['PKB_TO_ROHUL', 'ROHUL_TO_PKB']);
            $table->time('trip_time');
            // User id pakai UUID di codebase ini (lihat App\Models\User::HasUuids).
            $table->uuid('created_by')->nullable();
            $table->uuid('updated_by')->nullable();
            $table->timestamps();

            // 1 mobil max 1 pin per arah per hari (DP-3).
            $table->unique(
                ['daily_driver_assignment_id', 'direction'],
                'daily_assignment_pins_assignment_direction_unique'
            );

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
        Schema::dropIfExists('daily_assignment_pins');
    }
};
