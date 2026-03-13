<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('booking_passengers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')
                ->constrained('bookings')
                ->cascadeOnDelete();
            $table->string('seat_no', 10)->nullable();
            $table->string('name');
            $table->string('phone', 30)->nullable();
            $table->string('ticket_status')->default('Draft');
            $table->timestamps();

            $table->index(['booking_id']);
            $table->index(['seat_no']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('booking_passengers');
    }
};
