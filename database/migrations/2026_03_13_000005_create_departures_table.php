<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('departures', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('departure_code')->unique();
            $table->date('trip_date');
            $table->time('trip_time');
            $table->string('from_city');
            $table->string('to_city');
            $table->string('route_label')->nullable();
            $table->foreignUuid('driver_id')->constrained('drivers')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreignUuid('mobil_id')->constrained('mobil')->cascadeOnUpdate()->restrictOnDelete();
            $table->string('status')->default('Draft');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['trip_date', 'trip_time']);
            $table->index(['from_city', 'to_city']);
            $table->index(['status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('departures');
    }
};
