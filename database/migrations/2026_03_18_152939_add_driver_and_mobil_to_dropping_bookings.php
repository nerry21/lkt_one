<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            if (! Schema::hasColumn('bookings', 'mobil_id')) {
                $table->foreignUuid('mobil_id')
                    ->nullable()
                    ->after('driver_id')
                    ->constrained('mobil')
                    ->nullOnDelete();
            }
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            if (Schema::hasColumn('bookings', 'mobil_id')) {
                $table->dropForeign(['mobil_id']);
                $table->dropColumn('mobil_id');
            }
        });
    }
};
