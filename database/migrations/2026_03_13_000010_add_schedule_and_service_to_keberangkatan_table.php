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

        Schema::table('keberangkatan', function (Blueprint $table): void {
            if (! Schema::hasColumn('keberangkatan', 'jam_keberangkatan')) {
                $table->string('jam_keberangkatan')->default('08:00');
            }

            if (! Schema::hasColumn('keberangkatan', 'tipe_layanan')) {
                $table->string('tipe_layanan')->default('Reguler');
            }
        });
    }

    public function down(): void
    {
        if (! Schema::hasTable('keberangkatan')) {
            return;
        }

        $columns = [];

        if (Schema::hasColumn('keberangkatan', 'jam_keberangkatan')) {
            $columns[] = 'jam_keberangkatan';
        }

        if (Schema::hasColumn('keberangkatan', 'tipe_layanan')) {
            $columns[] = 'tipe_layanan';
        }

        if ($columns === []) {
            return;
        }

        Schema::table('keberangkatan', function (Blueprint $table) use ($columns): void {
            $table->dropColumn($columns);
        });
    }
};
