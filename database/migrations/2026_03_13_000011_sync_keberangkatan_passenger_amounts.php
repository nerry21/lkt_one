<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('keberangkatan')) {
            return;
        }

        DB::table('keberangkatan')
            ->select(['id', 'tarif_penumpang', 'uang_paket'])
            ->orderBy('id')
            ->get()
            ->each(function (object $item): void {
                $jumlahUangPenumpang = (int) ($item->tarif_penumpang ?? 0);
                $total = $jumlahUangPenumpang + (int) ($item->uang_paket ?? 0);

                DB::table('keberangkatan')
                    ->where('id', $item->id)
                    ->update([
                        'jumlah_uang_penumpang' => $jumlahUangPenumpang,
                        'uang_pc' => $total * 0.15,
                        'uang_bersih' => $total * 0.85,
                    ]);
            });
    }

    public function down(): void
    {
        // No-op because previous values were derived from an incorrect formula.
    }
};
