<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Driver;
use App\Models\Keberangkatan;
use App\Models\Mobil;
use App\Services\TransportCalculationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class SeedController extends Controller
{
    public function __construct(
        protected TransportCalculationService $calculationService,
    ) {
    }

    public function store(): JsonResponse
    {
        DB::transaction(function () {
            Driver::query()->delete();
            Mobil::query()->delete();
            Keberangkatan::query()->delete();
            $jamKeberangkatanOptions = array_keys(Keberangkatan::JAM_KEBERANGKATAN_OPTIONS);
            $tipeLayananOptions = Keberangkatan::TIPE_LAYANAN_OPTIONS;

            $drivers = collect([
                ['nama' => 'Ahmad Rizki', 'lokasi' => 'Pekanbaru'],
                ['nama' => 'Budi Santoso', 'lokasi' => 'Duri'],
                ['nama' => 'Cahyo Pratama', 'lokasi' => 'Dumai'],
                ['nama' => 'Dedi Kurniawan', 'lokasi' => 'Bengkalis'],
                ['nama' => 'Eko Saputra', 'lokasi' => 'Siak'],
            ])->map(fn (array $item) => Driver::query()->create($item));

            $mobilList = collect([
                ['kode_mobil' => 'PB-001', 'jenis_mobil' => 'Hiace'],
                ['kode_mobil' => 'PB-002', 'jenis_mobil' => 'Reborn'],
                ['kode_mobil' => 'PB-003', 'jenis_mobil' => 'Hiace'],
                ['kode_mobil' => 'PB-004', 'jenis_mobil' => 'Reborn'],
                ['kode_mobil' => 'PB-005', 'jenis_mobil' => 'Hiace'],
            ])->map(fn (array $item) => Mobil::query()->create($item));

            $dates = [
                '2024-01-05', '2024-01-12', '2024-01-19', '2024-01-26',
                '2024-02-02', '2024-02-09', '2024-02-16', '2024-02-23',
                '2024-03-01', '2024-03-08', '2024-03-15', '2024-03-22',
                '2024-04-05', '2024-04-12', '2024-04-19', '2024-04-26',
                '2024-05-03', '2024-05-10', '2024-05-17', '2024-05-24',
            ];

            foreach ($dates as $index => $tanggal) {
                $driver = $drivers->random();
                $mobil = $mobilList->random();
                $jumlahPenumpang = rand(5, 15);
                $tarifPenumpang = [150000, 175000, 200000, 250000][array_rand([150000, 175000, 200000, 250000])];
                $jumlahPaket = rand(0, 10);
                $uangPaket = $jumlahPaket * [25000, 30000, 35000][array_rand([25000, 30000, 35000])];
                $jamKeberangkatan = $jamKeberangkatanOptions[array_rand($jamKeberangkatanOptions)];
                $tipeLayanan = $tipeLayananOptions[array_rand($tipeLayananOptions)];
                $calculated = $this->calculationService->calculate($jumlahPenumpang, $tarifPenumpang, $uangPaket);

                Keberangkatan::query()->create(array_merge(
                    $this->calculationService->dateParts($tanggal),
                    $calculated,
                    [
                        'tanggal' => $tanggal,
                        'jam_keberangkatan' => $jamKeberangkatan,
                        'tipe_layanan' => $tipeLayanan,
                        'kode_mobil' => $mobil->kode_mobil,
                        'driver_id' => $driver->id,
                        'driver_nama' => $driver->nama,
                        'jumlah_penumpang' => $jumlahPenumpang,
                        'tarif_penumpang' => $tarifPenumpang,
                        'jumlah_paket' => $jumlahPaket,
                        'uang_paket' => $uangPaket,
                        'trip_ke' => ($index % 3) + 1,
                    ],
                ));
            }
        });

        return response()->json([
            'message' => 'Data dummy berhasil dibuat',
            'drivers' => Driver::query()->count(),
            'mobil' => Mobil::query()->count(),
            'keberangkatan' => Keberangkatan::query()->count(),
        ]);
    }
}
