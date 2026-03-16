<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('booking_armada_extras', function (Blueprint $table): void {
            $table->id();
            $table->date('trip_date');
            $table->string('trip_time', 8);
            $table->unsignedTinyInteger('max_armada_index')->default(1);
            $table->timestamps();

            $table->unique(['trip_date', 'trip_time']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('booking_armada_extras');
    }
};
