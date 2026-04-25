<?php

namespace Tests\Unit\Services;

use App\Models\KeuanganJetSiklus;
use App\Models\Mobil;
use App\Services\KeuanganJetStatsService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class KeuanganJetStatsServiceTest extends TestCase
{
    use RefreshDatabase;

    private function service(): KeuanganJetStatsService
    {
        return app(KeuanganJetStatsService::class);
    }

    public function test_summary_hari_ini_returns_empty_when_no_siklus_today(): void
    {
        Mobil::factory()->create();

        $result = $this->service()->summaryHariIniPerMobil();

        // Mobil aktif tetap muncul tapi count_siklus 0
        $this->assertGreaterThanOrEqual(1, count($result));
        foreach ($result as $row) {
            $this->assertSame(0, $row['count_siklus']);
            $this->assertSame(0.0, $row['total_kotor']);
            $this->assertSame('-', $row['latest_status']);
        }
    }

    public function test_summary_hari_ini_includes_today_siklus(): void
    {
        $mobil = Mobil::factory()->create(['kode_mobil' => 'JET TEST']);
        KeuanganJetSiklus::factory()->create([
            'mobil_id' => $mobil->id,
            'mobil_code' => 'JET TEST',
            'tanggal_mulai' => now()->toDateString(),
            'total_pendapatan_kotor' => 500000,
            'total_pendapatan_bersih' => 350000,
            'status_siklus' => 'berjalan',
        ]);

        $result = $this->service()->summaryHariIniPerMobil();
        $jetRow = collect($result)->firstWhere('kode_mobil', 'JET TEST');

        $this->assertNotNull($jetRow);
        $this->assertSame(500000.0, $jetRow['total_kotor']);
        $this->assertSame(350000.0, $jetRow['total_bersih']);
        $this->assertSame(1, $jetRow['count_siklus']);
        $this->assertSame('berjalan', $jetRow['latest_status']);
    }

    public function test_summary_periode_aggregates_correctly(): void
    {
        $mobil = Mobil::factory()->create();
        KeuanganJetSiklus::factory()->count(3)->create([
            'mobil_id' => $mobil->id,
            'tanggal_mulai' => now()->toDateString(),
            'total_pendapatan_kotor' => 100000,
            'total_pendapatan_bersih' => 70000,
            'uang_driver' => 21000,
            'status_siklus' => 'complete',
        ]);

        $result = $this->service()->summaryPeriode(now()->startOfMonth(), now()->endOfMonth());

        $this->assertSame(3, $result['total_siklus']);
        $this->assertSame(3, $result['count_complete']);
        $this->assertSame(0, $result['count_berjalan']);
        $this->assertSame(300000.0, $result['total_kotor']);
        $this->assertSame(210000.0, $result['total_bersih']);
        $this->assertSame(63000.0, $result['total_uang_driver']);
    }

    public function test_summary_periode_excludes_outside_range(): void
    {
        $mobil = Mobil::factory()->create();
        KeuanganJetSiklus::factory()->create([
            'mobil_id' => $mobil->id,
            'tanggal_mulai' => now()->subMonths(2)->toDateString(),
            'total_pendapatan_kotor' => 999999,
        ]);

        $result = $this->service()->summaryPeriode(now()->startOfMonth(), now()->endOfMonth());

        $this->assertSame(0, $result['total_siklus']);
        $this->assertSame(0.0, $result['total_kotor']);
    }

    public function test_leaderboard_mobil_orders_by_revenue_desc(): void
    {
        $mobilA = Mobil::factory()->create(['kode_mobil' => 'JET A']);
        $mobilB = Mobil::factory()->create(['kode_mobil' => 'JET B']);

        KeuanganJetSiklus::factory()->create([
            'mobil_id' => $mobilA->id,
            'mobil_code' => 'JET A',
            'tanggal_mulai' => now()->toDateString(),
            'total_pendapatan_bersih' => 100000,
        ]);
        KeuanganJetSiklus::factory()->create([
            'mobil_id' => $mobilB->id,
            'mobil_code' => 'JET B',
            'tanggal_mulai' => now()->toDateString(),
            'total_pendapatan_bersih' => 500000,
        ]);

        $result = $this->service()->leaderboardMobil(now()->startOfMonth(), now()->endOfMonth());

        $this->assertCount(2, $result);
        $this->assertSame('JET B', $result[0]['kode_mobil']);
        $this->assertSame(500000.0, $result[0]['total_bersih']);
        $this->assertSame('JET A', $result[1]['kode_mobil']);
    }

    public function test_leaderboard_mobil_limits_to_5(): void
    {
        $mobilList = Mobil::factory()->count(7)->create();
        foreach ($mobilList as $idx => $m) {
            KeuanganJetSiklus::factory()->create([
                'mobil_id' => $m->id,
                'mobil_code' => $m->kode_mobil,
                'tanggal_mulai' => now()->toDateString(),
                'total_pendapatan_bersih' => 1000 * ($idx + 1),
            ]);
        }

        $result = $this->service()->leaderboardMobil(now()->startOfMonth(), now()->endOfMonth());
        $this->assertCount(5, $result);
    }

    public function test_leaderboard_driver_aggregates_by_name(): void
    {
        $mobil = Mobil::factory()->create();
        KeuanganJetSiklus::factory()->count(2)->create([
            'mobil_id' => $mobil->id,
            'tanggal_mulai' => now()->toDateString(),
            'driver_name_actual' => 'Pak Budi',
            'uang_driver' => 50000,
        ]);
        KeuanganJetSiklus::factory()->create([
            'mobil_id' => $mobil->id,
            'tanggal_mulai' => now()->toDateString(),
            'driver_name_actual' => 'Pak Joko',
            'uang_driver' => 30000,
        ]);

        $result = $this->service()->leaderboardDriver(now()->startOfMonth(), now()->endOfMonth());

        $this->assertCount(2, $result);
        $this->assertSame('Pak Budi', $result[0]['driver_name']);
        $this->assertSame(100000.0, $result[0]['total_uang_driver']);
        $this->assertSame(2, $result[0]['count_siklus']);
    }

    public function test_dashboard_payload_returns_all_keys(): void
    {
        $result = $this->service()->dashboardPayload();

        $this->assertArrayHasKey('today_per_mobil', $result);
        $this->assertArrayHasKey('period_summary', $result);
        $this->assertArrayHasKey('leaderboard_mobil', $result);
        $this->assertArrayHasKey('leaderboard_driver', $result);
    }
}
