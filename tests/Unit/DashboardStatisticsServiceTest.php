<?php

namespace Tests\Unit;

use App\Models\Driver;
use App\Models\Keberangkatan;
use App\Models\Mobil;
use App\Services\DashboardStatisticsService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardStatisticsServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_mobil_revenue_includes_all_registered_vehicles_and_total_passengers(): void
    {
        $driver = Driver::query()->create([
            'nama' => 'Driver Dashboard',
            'lokasi' => 'Pekanbaru',
        ]);

        $mobil01 = Mobil::query()->create([
            'kode_mobil' => 'LK 01',
            'jenis_mobil' => 'Hiace',
        ]);

        $mobil02 = Mobil::query()->create([
            'kode_mobil' => 'LK 02',
            'jenis_mobil' => 'Elf',
        ]);

        $mobil03 = Mobil::query()->create([
            'kode_mobil' => 'LK 03',
            'jenis_mobil' => 'Hiace Premio',
        ]);

        Keberangkatan::query()->create([
            'tanggal' => '2026-03-01',
            'kode_mobil' => $mobil01->kode_mobil,
            'driver_id' => $driver->id,
            'driver_nama' => $driver->nama,
            'jumlah_penumpang' => 8,
            'tarif_penumpang' => 800000,
            'jumlah_paket' => 1,
            'uang_paket' => 50000,
            'trip_ke' => 1,
        ]);

        Keberangkatan::query()->create([
            'tanggal' => '2026-03-02',
            'kode_mobil' => $mobil01->kode_mobil,
            'driver_id' => $driver->id,
            'driver_nama' => $driver->nama,
            'jumlah_penumpang' => 5,
            'tarif_penumpang' => 500000,
            'jumlah_paket' => 0,
            'uang_paket' => 0,
            'trip_ke' => 2,
        ]);

        Keberangkatan::query()->create([
            'tanggal' => '2026-03-03',
            'kode_mobil' => $mobil02->kode_mobil,
            'driver_id' => $driver->id,
            'driver_nama' => $driver->nama,
            'jumlah_penumpang' => 4,
            'tarif_penumpang' => 400000,
            'jumlah_paket' => 0,
            'uang_paket' => 0,
            'trip_ke' => 1,
        ]);

        $mobilRevenue = collect(app(DashboardStatisticsService::class)->mobilRevenue())
            ->keyBy('kode_mobil');

        $this->assertCount(3, $mobilRevenue);
        $this->assertSame(2, $mobilRevenue[$mobil01->kode_mobil]['total_trips']);
        $this->assertSame(13, $mobilRevenue[$mobil01->kode_mobil]['total_penumpang']);
        $this->assertSame(1, $mobilRevenue[$mobil02->kode_mobil]['total_trips']);
        $this->assertSame(4, $mobilRevenue[$mobil02->kode_mobil]['total_penumpang']);
        $this->assertSame(0, $mobilRevenue[$mobil03->kode_mobil]['total_trips']);
        $this->assertSame(0, $mobilRevenue[$mobil03->kode_mobil]['total_penumpang']);
        $this->assertSame(0.0, $mobilRevenue[$mobil03->kode_mobil]['total_uang_bersih']);
    }
}
