<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('bookings')) {
            Schema::table('bookings', function (Blueprint $table) {
                if (! Schema::hasColumn('bookings', 'driver_id')) {
                    $table->foreignUuid('driver_id')
                        ->nullable()
                        ->after('driver_name')
                        ->constrained('drivers')
                        ->nullOnDelete();
                }

                if (! Schema::hasColumn('bookings', 'loyalty_count')) {
                    $table->unsignedInteger('loyalty_count')
                        ->default(0)
                        ->after('scan_count');
                }

                if (! Schema::hasColumn('bookings', 'eligible_discount')) {
                    $table->boolean('eligible_discount')
                        ->default(false)
                        ->after('discount_eligible');
                }
            });

            Schema::table('bookings', function (Blueprint $table) {
                $table->index(['invoice_number'], 'bookings_invoice_number_lookup_index');
                $table->index(['ticket_number'], 'bookings_ticket_number_lookup_index');
                $table->index(['qr_token'], 'bookings_qr_token_lookup_index');
            });

            DB::table('bookings')
                ->select(['id', 'loyalty_trip_count', 'scan_count', 'discount_eligible'])
                ->orderBy('id')
                ->chunkById(100, function ($bookings): void {
                    foreach ($bookings as $booking) {
                        $loyaltyCount = max(
                            (int) ($booking->loyalty_trip_count ?? 0),
                            (int) ($booking->scan_count ?? 0),
                        );

                        DB::table('bookings')
                            ->where('id', $booking->id)
                            ->update([
                                'loyalty_count' => $loyaltyCount,
                                'eligible_discount' => (bool) ($booking->discount_eligible ?? false) || $loyaltyCount >= 5,
                            ]);
                    }
                });
        }

        if (Schema::hasTable('booking_passengers')) {
            Schema::table('booking_passengers', function (Blueprint $table) {
                $table->index(['booking_id', 'seat_no'], 'booking_passengers_booking_seat_lookup_index');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('booking_passengers')) {
            Schema::table('booking_passengers', function (Blueprint $table) {
                $table->dropIndex('booking_passengers_booking_seat_lookup_index');
            });
        }

        if (Schema::hasTable('bookings')) {
            Schema::table('bookings', function (Blueprint $table) {
                $table->dropIndex('bookings_invoice_number_lookup_index');
                $table->dropIndex('bookings_ticket_number_lookup_index');
                $table->dropIndex('bookings_qr_token_lookup_index');
            });

            Schema::table('bookings', function (Blueprint $table) {
                if (Schema::hasColumn('bookings', 'driver_id')) {
                    $table->dropForeign(['driver_id']);
                    $table->dropColumn('driver_id');
                }

                if (Schema::hasColumn('bookings', 'loyalty_count')) {
                    $table->dropColumn('loyalty_count');
                }

                if (Schema::hasColumn('bookings', 'eligible_discount')) {
                    $table->dropColumn('eligible_discount');
                }
            });
        }
    }
};
