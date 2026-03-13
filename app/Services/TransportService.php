<?php

namespace App\Services;

use App\Models\Keberangkatan;
use App\Models\Stock;
use Carbon\Carbon;

class TransportService
{
    public const HARGA_SNACK = 3000;
    public const HARGA_AIR = 2000;

    public function tanggalMeta(string $tanggal): array
    {
        $date = Carbon::parse($tanggal);

        return [
            'hari' => ['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu'][$date->dayOfWeekIso - 1],
            'bulan' => ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'][$date->month - 1],
            'tahun' => (string) $date->year,
        ];
    }

    public function hitungKeuangan(array $data): array
    {
        $jumlahUangPenumpang = (int) ($data['tarif_penumpang'] ?? 0);
        $biayaSnack = ((int) ($data['jumlah_snack'] ?? 0)) * self::HARGA_SNACK;
        $biayaAir = ((int) ($data['jumlah_air_mineral'] ?? 0)) * self::HARGA_AIR;
        $total = $jumlahUangPenumpang + ((int) ($data['uang_paket'] ?? 0)) + $biayaSnack + $biayaAir;

        return [
            'jumlah_uang_penumpang' => $jumlahUangPenumpang,
            'biaya_snack' => $biayaSnack,
            'biaya_air_mineral' => $biayaAir,
            'uang_pc' => round($total * 0.15, 2),
            'uang_bersih' => round($total * 0.85, 2),
        ];
    }

    public function sinkronkanStock(?string $tanggal = null): void
    {
        $query = Stock::query();
        if ($tanggal) {
            $query->whereDate('tanggal', $tanggal);
        }

        $query->get()->each(function (Stock $stock) {
            $pemakaian = Keberangkatan::whereDate('tanggal', $stock->tanggal)
                ->selectRaw('COALESCE(SUM(jumlah_snack),0) as snack, COALESCE(SUM(jumlah_air_mineral),0) as air')
                ->first();

            $stock->terpakai_snack = (int) ($pemakaian->snack ?? 0);
            $stock->terpakai_air_mineral = (int) ($pemakaian->air ?? 0);
            $stock->sisa_stock_snack = max(0, (int) $stock->total_stock_snack - (int) $stock->terpakai_snack);
            $stock->sisa_stock_air_mineral = max(0, (int) $stock->total_stock_air_mineral - (int) $stock->terpakai_air_mineral);
            $stock->nilai_total_snack = (int) $stock->total_stock_snack * (int) $stock->harga_snack;
            $stock->nilai_total_air_mineral = (int) $stock->total_stock_air_mineral * (int) $stock->harga_air_mineral;
            $stock->nilai_total = $stock->nilai_total_snack + $stock->nilai_total_air_mineral;
            $stock->sisa_nilai_snack = (int) $stock->sisa_stock_snack * (int) $stock->harga_snack;
            $stock->sisa_nilai_air = (int) $stock->sisa_stock_air_mineral * (int) $stock->harga_air_mineral;
            $stock->sisa_nilai_total = $stock->sisa_nilai_snack + $stock->sisa_nilai_air;
            $stock->save();
        });
    }
}
