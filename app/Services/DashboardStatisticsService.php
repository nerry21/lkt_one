<?php

namespace App\Services;

use App\Models\Driver;
use App\Models\Keberangkatan;
use App\Models\Mobil;
use Illuminate\Support\Collection;

class DashboardStatisticsService
{
    public function summary(): array
    {
        return [
            'total_drivers' => Driver::query()->count(),
            'total_mobil' => Mobil::query()->count(),
            'total_keberangkatan' => Keberangkatan::query()->count(),
            'total_uang_pc' => (float) Keberangkatan::query()->sum('uang_pc'),
            'total_uang_bersih' => (float) Keberangkatan::query()->sum('uang_bersih'),
            'total_penumpang' => (int) Keberangkatan::query()->sum('jumlah_penumpang'),
            'total_paket' => (int) Keberangkatan::query()->sum('jumlah_paket'),
        ];
    }

    public function revenueChart(): array
    {
        return Keberangkatan::query()
            ->orderBy('tanggal')
            ->get()
            ->groupBy(fn (Keberangkatan $item) => substr((string) $item->tanggal, 0, 7))
            ->map(function (Collection $items, string $month) {
                return [
                    'bulan' => $month,
                    'uang_bersih' => (float) $items->sum('uang_bersih'),
                    'uang_pc' => (float) $items->sum('uang_pc'),
                    'penumpang' => (int) $items->sum('jumlah_penumpang'),
                ];
            })
            ->take(12)
            ->values()
            ->all();
    }

    public function mobilRevenue(): array
    {
        $revenueByMobil = Keberangkatan::query()
            ->selectRaw('kode_mobil, SUM(uang_bersih) as total_uang_bersih, COUNT(*) as total_trips, SUM(jumlah_penumpang) as total_penumpang')
            ->groupBy('kode_mobil')
            ->get()
            ->keyBy('kode_mobil');

        return Mobil::query()
            ->orderBy('kode_mobil')
            ->get()
            ->map(function (Mobil $mobil) use ($revenueByMobil) {
                $summary = $revenueByMobil->get($mobil->kode_mobil);

                return [
                    'kode_mobil' => $mobil->kode_mobil,
                    'total_uang_bersih' => (float) ($summary->total_uang_bersih ?? 0),
                    'total_trips' => (int) ($summary->total_trips ?? 0),
                    'total_penumpang' => (int) ($summary->total_penumpang ?? 0),
                ];
            })
            ->sortByDesc('total_uang_bersih')
            ->values()
            ->all();
    }

    public function payload(): array
    {
        return [
            'stats' => $this->summary(),
            'revenueData' => $this->revenueChart(),
            'mobilRevenue' => $this->mobilRevenue(),
        ];
    }
}
