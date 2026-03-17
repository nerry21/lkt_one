<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('customer_surveys', function (Blueprint $table): void {
            $table->string('driver_id')->nullable()->after('name');
            $table->string('kode_mobil')->nullable()->after('driver_id');
        });
    }

    public function down(): void
    {
        Schema::table('customer_surveys', function (Blueprint $table): void {
            $table->dropColumn(['driver_id', 'kode_mobil']);
        });
    }
};
