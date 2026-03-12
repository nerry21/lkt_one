<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('keberangkatan')) {
            return;
        }

        Schema::table('keberangkatan', function (Blueprint $table) {
            if (! Schema::hasColumn('keberangkatan', 'jumlah_snack')) {
                $table->integer('jumlah_snack')->default(0);
            }

            if (! Schema::hasColumn('keberangkatan', 'jumlah_air_mineral')) {
                $table->integer('jumlah_air_mineral')->default(0);
            }
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('keberangkatan')) {
            return;
        }

        Schema::table('keberangkatan', function (Blueprint $table) {
            if (Schema::hasColumn('keberangkatan', 'jumlah_snack')) {
                $table->dropColumn('jumlah_snack');
            }

            if (Schema::hasColumn('keberangkatan', 'jumlah_air_mineral')) {
                $table->dropColumn('jumlah_air_mineral');
            }
        });
    }
};
