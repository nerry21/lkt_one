<?php

namespace Tests\Feature;

use App\Models\Driver;
use App\Models\Keberangkatan;
use App\Models\Mobil;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_shows_trip_and_passenger_totals_per_vehicle(): void
    {
        $this->actingAs(User::factory()->create());

        $driver = Driver::query()->create([
            'nama' => 'Driver Dashboard',
            'lokasi' => 'Pekanbaru',
        ]);

        $mobil = Mobil::query()->create([
            'kode_mobil' => 'LK 01',
            'jenis_mobil' => 'Hiace',
        ]);

        Keberangkatan::query()->create([
            'tanggal' => '2026-03-01',
            'kode_mobil' => $mobil->kode_mobil,
            'driver_id' => $driver->id,
            'driver_nama' => $driver->nama,
            'jumlah_penumpang' => 7,
            'tarif_penumpang' => 700000,
            'jumlah_paket' => 0,
            'uang_paket' => 0,
            'trip_ke' => 1,
        ]);

        $this->get('/dashboard')
            ->assertOk()
            ->assertSee('Total pendapatan bersih dan total penumpang berdasarkan kode mobil')
            ->assertSee('1 trip')
            ->assertSee('7 penumpang');
    }
}
