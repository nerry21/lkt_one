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
        return Keberangkatan::query()
            ->get()
            ->groupBy('kode_mobil')
            ->map(function (Collection $items, string $kodeMobil) {
                return [
                    'kode_mobil' => $kodeMobil,
                    'total_uang_bersih' => (float) $items->sum('uang_bersih'),
                    'total_trips' => $items->count(),
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
