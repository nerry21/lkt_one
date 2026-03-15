<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('keberangkatan')) {
            Schema::table('keberangkatan', function (Blueprint $table) {
                if (! Schema::hasColumn('keberangkatan', 'pengembalian_snack')) {
                    $table->integer('pengembalian_snack')->default(0)->after('jumlah_snack');
                }
            });
        }

        if (Schema::hasTable('stock')) {
            Schema::table('stock', function (Blueprint $table) {
                if (! Schema::hasColumn('stock', 'pengembalian_snack')) {
                    $table->integer('pengembalian_snack')->default(0)->after('terpakai_snack');
                }
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('keberangkatan') && Schema::hasColumn('keberangkatan', 'pengembalian_snack')) {
            Schema::table('keberangkatan', function (Blueprint $table) {
                $table->dropColumn('pengembalian_snack');
            });
        }

        if (Schema::hasTable('stock') && Schema::hasColumn('stock', 'pengembalian_snack')) {
            Schema::table('stock', function (Blueprint $table) {
                $table->dropColumn('pengembalian_snack');
            });
        }
    }
};
