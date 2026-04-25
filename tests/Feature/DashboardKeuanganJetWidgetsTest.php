<?php

namespace Tests\Feature;

use App\Models\KeuanganJetSiklus;
use App\Models\Mobil;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardKeuanganJetWidgetsTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_renders_keuangan_jet_section(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $response = $this->actingAs($admin)->get('/dashboard');
        $response->assertOk();
        $response->assertSee('Keuangan JET — Bulan Ini');
        $response->assertSee('Aktivitas Hari Ini per Mobil');
        $response->assertSee('Leaderboard Mobil', false);
        $response->assertSee('Leaderboard Driver', false);
    }

    public function test_dashboard_widgets_show_today_data(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $mobil = Mobil::factory()->create(['kode_mobil' => 'JET 99']);
        KeuanganJetSiklus::factory()->create([
            'mobil_id' => $mobil->id,
            'mobil_code' => 'JET 99',
            'tanggal_mulai' => now()->toDateString(),
            'total_pendapatan_kotor' => 500000,
            'total_pendapatan_bersih' => 350000,
        ]);

        $response = $this->actingAs($admin)->get('/dashboard');
        $response->assertOk();
        $response->assertSee('JET 99');
        $response->assertSee('500.000');
        $response->assertSee('350.000');
    }

    public function test_dashboard_widgets_show_leaderboard(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $mobil = Mobil::factory()->create(['kode_mobil' => 'JET LEADER']);
        KeuanganJetSiklus::factory()->create([
            'mobil_id' => $mobil->id,
            'mobil_code' => 'JET LEADER',
            'tanggal_mulai' => now()->toDateString(),
            'total_pendapatan_bersih' => 1000000,
            'driver_name_actual' => 'Pak Top',
            'uang_driver' => 300000,
        ]);

        $response = $this->actingAs($admin)->get('/dashboard');
        $response->assertOk();
        $response->assertSee('JET LEADER');
        $response->assertSee('Pak Top');
    }

    public function test_dashboard_widgets_handle_empty_state(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        // No siklus data created
        $response = $this->actingAs($admin)->get('/dashboard');
        $response->assertOk();
        $response->assertSee('Keuangan JET — Bulan Ini');
        // Empty state messages should appear
        $response->assertSeeText('Belum ada');
    }
}
