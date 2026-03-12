<?php

namespace App\Http\Controllers;

use App\Models\Driver;
use App\Models\Keberangkatan;
use App\Models\Mobil;
use App\Models\Stock;
use App\Models\User;
use App\Services\TransportService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function index(): View
    {
        $stats = [
            'total_uang_bersih' => (float) Keberangkatan::sum('uang_bersih'),
            'total_uang_pc' => (float) Keberangkatan::sum('uang_pc'),
            'total_keberangkatan' => Keberangkatan::count(),
            'total_penumpang' => (int) Keberangkatan::sum('jumlah_penumpang'),
            'total_drivers' => Driver::count(),
            'total_mobil' => Mobil::count(),
            'total_users' => User::count(),
            'total_paket' => (int) Keberangkatan::sum('jumlah_paket'),
        ];

        $revenueChart = Keberangkatan::query()
            ->orderBy('tanggal')
            ->get(['tanggal', 'uang_bersih', 'uang_pc', 'jumlah_penumpang'])
            ->groupBy(fn (Keberangkatan $item) => $item->tanggal->format('Y-m'))
            ->map(function (Collection $items, string $bulan) {
                return (object) [
                    'bulan' => $bulan,
                    'uang_bersih' => (float) $items->sum('uang_bersih'),
                    'uang_pc' => (float) $items->sum('uang_pc'),
                    'penumpang' => (int) $items->sum('jumlah_penumpang'),
                ];
            })
            ->values();

        if ($revenueChart->count() > 12) {
            $revenueChart = $revenueChart->slice(-12)->values();
        }

        $mobilRevenue = Keberangkatan::query()
            ->selectRaw('kode_mobil, SUM(uang_bersih) as total_uang_bersih, COUNT(*) as total_trips')
            ->groupBy('kode_mobil')
            ->orderByDesc('total_uang_bersih')
            ->get();

        return view('dashboard.index', compact('stats', 'revenueChart', 'mobilRevenue'));
    }

    public function seed(TransportService $service): RedirectResponse
    {
        DB::transaction(function () use ($service) {
            Keberangkatan::query()->delete();
            Driver::query()->delete();
            Mobil::query()->delete();
            Stock::query()->delete();

            $drivers = collect([
                ['nama' => 'Ahmad Rizki', 'lokasi' => 'Pekanbaru'],
                ['nama' => 'Budi Santoso', 'lokasi' => 'Duri'],
                ['nama' => 'Cahyo Pratama', 'lokasi' => 'Dumai'],
                ['nama' => 'Dedi Kurniawan', 'lokasi' => 'Bengkalis'],
                ['nama' => 'Eko Saputra', 'lokasi' => 'Siak'],
            ])->map(fn ($item) => Driver::create($item));

            $mobil = collect([
                ['kode_mobil' => 'PB-001', 'jenis_mobil' => 'Hiace'],
                ['kode_mobil' => 'PB-002', 'jenis_mobil' => 'Reborn'],
                ['kode_mobil' => 'PB-003', 'jenis_mobil' => 'Hiace'],
                ['kode_mobil' => 'PB-004', 'jenis_mobil' => 'Reborn'],
                ['kode_mobil' => 'PB-005', 'jenis_mobil' => 'Hiace'],
            ])->map(fn ($item) => Mobil::create($item));

            $dates = [
                '2024-01-05', '2024-01-12', '2024-01-19', '2024-01-26', '2024-02-02',
                '2024-02-09', '2024-02-16', '2024-02-23', '2024-03-01', '2024-03-08',
                '2024-03-15', '2024-03-22', '2024-04-05', '2024-04-12', '2024-04-19',
                '2024-04-26', '2024-05-03', '2024-05-10', '2024-05-17', '2024-05-24',
            ];

            foreach ($dates as $i => $tanggal) {
                $driver = $drivers->random();
                $armada = $mobil->random();
                $jumlahPaket = rand(0, 10);
                $payload = [
                    'tanggal' => $tanggal,
                    'jam_keberangkatan' => '08:00',
                    'jam_label' => 'Jam Pagi 08:00 WIB',
                    'tipe_layanan' => ['Reguler', 'Dropping', 'Rental'][array_rand(['Reguler', 'Dropping', 'Rental'])],
                    'kode_mobil' => $armada->kode_mobil,
                    'driver_id' => $driver->id,
                    'driver_nama' => $driver->nama,
                    'jumlah_penumpang' => rand(5, 15),
                    'tarif_penumpang' => [150000, 175000, 200000, 250000][array_rand([150000, 175000, 200000, 250000])],
                    'jumlah_paket' => $jumlahPaket,
                    'uang_paket' => $jumlahPaket * [25000, 30000, 35000][array_rand([25000, 30000, 35000])],
                    'jumlah_snack' => rand(0, 6),
                    'jumlah_air_mineral' => rand(0, 6),
                    'trip_ke' => ($i % 3) + 1,
                ];

                Keberangkatan::create(array_merge(
                    $payload,
                    $service->tanggalMeta($tanggal),
                    $service->hitungKeuangan($payload),
                ));
            }

            foreach (['2024-01-05', '2024-02-02', '2024-03-01', '2024-04-05', '2024-05-03'] as $tanggal) {
                Stock::create(array_merge(
                    $service->tanggalMeta($tanggal),
                    [
                        'tanggal' => $tanggal,
                        'total_stock_snack' => rand(60, 120),
                        'total_stock_air_mineral' => rand(60, 120),
                        'harga_snack' => TransportService::HARGA_SNACK,
                        'harga_air_mineral' => TransportService::HARGA_AIR,
                        'keterangan' => 'Seed data dummy',
                    ],
                ));
            }

            $service->sinkronkanStock();
        });

        return back()->with('success', 'Data dummy berhasil dibuat.');
    }
}
