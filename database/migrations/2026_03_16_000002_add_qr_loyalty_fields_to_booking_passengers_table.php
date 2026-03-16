<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('booking_passengers', function (Blueprint $table): void {
            $table->string('qr_token')->nullable()->unique()->after('checkin_status');
            $table->text('qr_code_value')->nullable()->after('qr_token');
            $table->unsignedSmallInteger('scan_count')->default(0)->after('qr_code_value');
            $table->unsignedSmallInteger('loyalty_count')->default(0)->after('scan_count');
            $table->boolean('discount_eligible')->default(false)->after('loyalty_count');
            $table->boolean('eligible_discount')->default(false)->after('discount_eligible');
            $table->timestamp('last_scanned_at')->nullable()->after('eligible_discount');

            $table->index(['qr_token']);
        });
    }

    public function down(): void
    {
        Schema::table('booking_passengers', function (Blueprint $table): void {
            $table->dropIndex(['qr_token']);
            $table->dropColumn([
                'qr_token', 'qr_code_value', 'scan_count', 'loyalty_count',
                'discount_eligible', 'eligible_discount', 'last_scanned_at',
            ]);
        });
    }
};
