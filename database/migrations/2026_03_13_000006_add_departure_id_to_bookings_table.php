<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->foreignUuid('departure_id')
                ->nullable()
                ->after('ticket_status')
                ->constrained('departures')
                ->nullOnDelete();

            $table->index(['departure_id']);
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropForeign(['departure_id']);
            $table->dropIndex(['departure_id']);
            $table->dropColumn('departure_id');
        });
    }
};
