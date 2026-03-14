<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('invoice_number')->nullable()->after('booking_code');
            $table->string('ticket_number')->nullable()->after('invoice_number');
            $table->string('qr_token')->nullable()->after('ticket_number');
            $table->text('qr_code_value')->nullable()->after('qr_token');
            $table->string('driver_name')->nullable()->after('route_label');
            $table->string('payment_account_bank')->nullable()->after('payment_proof_path');
            $table->string('payment_account_name')->nullable()->after('payment_account_bank');
            $table->string('payment_account_number')->nullable()->after('payment_account_name');
            $table->decimal('nominal_payment', 15, 2)->nullable()->after('total_amount');
            $table->unsignedInteger('loyalty_trip_count')->default(0)->after('ticket_status');
            $table->unsignedInteger('scan_count')->default(0)->after('loyalty_trip_count');
            $table->boolean('discount_eligible')->default(false)->after('scan_count');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn([
                'invoice_number',
                'ticket_number',
                'qr_token',
                'qr_code_value',
                'driver_name',
                'payment_account_bank',
                'payment_account_name',
                'payment_account_number',
                'nominal_payment',
                'loyalty_trip_count',
                'scan_count',
                'discount_eligible',
            ]);
        });
    }
};
