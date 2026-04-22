<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('trip_cutover_logs', function (Blueprint $table) {
            $table->id();
            $table->date('target_date')->index();
            // 4 status: success | failed | idempotent_skip | missing_assignments
            $table->string('status', 32);
            // scheduler (auto 21:00 WIB) atau manual (admin backfill via --date)
            $table->string('trigger_source', 32);
            $table->unsignedTinyInteger('retry_count')->default(0);
            $table->text('error_message')->nullable();
            // Context JSON: missing_mobil_ids, generation_result summary, exception_class, dst.
            $table->json('context')->nullable();
            $table->timestamp('started_at');
            $table->timestamp('finished_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('trip_cutover_logs');
    }
};
