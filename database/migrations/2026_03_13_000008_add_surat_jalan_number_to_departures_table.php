<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('departures', function (Blueprint $table) {
            $table->string('surat_jalan_number')->nullable()->after('departure_code');
            $table->timestamp('surat_jalan_issued_at')->nullable()->after('surat_jalan_number');

            $table->index(['surat_jalan_number']);
        });
    }

    public function down(): void
    {
        Schema::table('departures', function (Blueprint $table) {
            $table->dropIndex(['surat_jalan_number']);
            $table->dropColumn([
                'surat_jalan_number',
                'surat_jalan_issued_at',
            ]);
        });
    }
};
