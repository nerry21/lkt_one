<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('daily_assignment_pins', function (Blueprint $table) {
            // E5 PR #4: loket override per pin.
            // NULL = fallback ke poolForMobil() dinamis (backward compatible).
            // Filled = admin eksplisit override.
            //
            // loket_origin = dari mana mobil berangkat hari ini (untuk pin direction)
            // — untuk Pin Outbound (ROHUL_TO_PKB) → loket_origin biasanya 'ROHUL'
            // — untuk Pin Return (PKB_TO_ROHUL) → loket_origin biasanya 'PKB'
            // Tapi admin bisa override (mis. mobil home_pool=ROHUL nginep di PKB).
            if (! Schema::hasColumn('daily_assignment_pins', 'loket_origin')) {
                $table->enum('loket_origin', ['PKB', 'ROHUL'])
                    ->nullable()
                    ->after('trip_time')
                    ->comment('E5 PR4: Override poolForMobil. NULL=fallback dinamis.');
            }
        });
    }

    public function down(): void
    {
        Schema::table('daily_assignment_pins', function (Blueprint $table) {
            if (Schema::hasColumn('daily_assignment_pins', 'loket_origin')) {
                $table->dropColumn('loket_origin');
            }
        });
    }
};
