<?php

namespace App\Services;

use Carbon\CarbonImmutable;

class TransportCalculationService
{
    public function calculate(int $jumlahPenumpang, int $tarifPenumpang, int $uangPaket): array
    {
        $jumlahUangPenumpang = $tarifPenumpang;
        $total = $jumlahUangPenumpang + $uangPaket;

        return [
            'jumlah_uang_penumpang' => $jumlahUangPenumpang,
            'uang_pc' => $total * 0.15,
            'uang_bersih' => $total * 0.85,
        ];
    }

    public function dateParts(string $tanggal): array
    {
        $date = CarbonImmutable::parse($tanggal);

        return [
            'hari' => ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'][$date->dayOfWeekIso - 1],
            'bulan' => ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'][$date->month - 1],
            'tahun' => (string) $date->year,
        ];
    }
}
