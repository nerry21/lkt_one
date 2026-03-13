<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_code')->unique();
            $table->string('category')->default('Reguler');
            $table->string('from_city');
            $table->string('to_city');
            $table->date('trip_date');
            $table->time('trip_time');
            $table->string('booking_for')->nullable();
            $table->string('passenger_name');
            $table->string('passenger_phone', 30);
            $table->unsignedInteger('passenger_count')->default(1);
            $table->string('pickup_location')->nullable();
            $table->string('dropoff_location')->nullable();
            $table->json('selected_seats')->nullable();
            $table->decimal('price_per_seat', 15, 2)->default(0);
            $table->decimal('total_amount', 15, 2)->default(0);
            $table->string('route_label')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('payment_status')->default('Belum Bayar');
            $table->string('booking_status')->default('Draft');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['category', 'trip_date', 'trip_time']);
            $table->index(['from_city', 'to_city']);
            $table->index(['payment_status']);
            $table->index(['booking_status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
