<?php

namespace Tests\Unit\Services;

use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use App\Services\TripService;
use App\Services\TripStatsService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Test coverage TripStatsService (Fase E5d Sesi 32).
 *
 * Service baru sebagai single source of truth untuk per-mobil statistics
 * dashboard Trip Planning. Dipanggil oleh initial page load controller
 * (TripPlanningDashboardViewController) dan API refetch controller
 * (TripPlanningPageController::buildStatistics). Shape output harus
 * identik di kedua call site.
 */
class TripStatsServiceTest extends TestCase
{
    use RefreshDatabase;

    protected TripStatsService $svc;
    protected Driver $driver;

    private const DATE = '2026-04-25';

    protected function setUp(): void
    {
        parent::setUp();
        $this->svc = $this->app->make(TripStatsService::class);
        $this->driver = Driver::factory()->create();
    }

    public function test_build_per_mobil_stats_includes_all_active_mobils_even_without_trips(): void
    {
        $mobil1 = Mobil::factory()->create(['kode_mobil' => 'JET 01', 'is_active_in_trip' => true]);
        $mobil2 = Mobil::factory()->create(['kode_mobil' => 'JET 02', 'is_active_in_trip' => true]);
        $mobil3 = Mobil::factory()->create(['kode_mobil' => 'JET 03', 'is_active_in_trip' => true]);

        // Hanya mobil1 yang punya trip hari ini.
        $tripMobil1 = Trip::factory()->create([
            'mobil_id' => $mobil1->id,
            'driver_id' => $this->driver->id,
            'trip_date' => self::DATE,
            'direction' => 'ROHUL_TO_PKB',
            'trip_time' => '07:00:00',
            'sequence' => 1,
            'status' => 'scheduled',
        ]);

        $trips = Trip::query()->where('trip_date', self::DATE)->get();
        $result = $this->svc->buildPerMobilStats($trips);

        $this->assertCount(3, $result);

        $byMobilId = collect($result)->keyBy('mobil_id');
        // 'scheduled' bukan ACTIVE_STATUS (lihat TripService::ACTIVE_STATUSES),
        // jadi PP tetap 0.0 walau trip ter-create. status_breakdown tetap ikut
        // counted supaya card UI bisa show "scheduled: 1" badge.
        $this->assertSame(0.0, $byMobilId[$mobil1->id]['pp_count']);
        $this->assertSame(['scheduled' => 1], $byMobilId[$mobil1->id]['status_breakdown']);

        $this->assertSame(0.0, $byMobilId[$mobil2->id]['pp_count']);
        $this->assertSame([], $byMobilId[$mobil2->id]['status_breakdown']);

        $this->assertSame(0.0, $byMobilId[$mobil3->id]['pp_count']);
        $this->assertSame([], $byMobilId[$mobil3->id]['status_breakdown']);
    }

    public function test_build_per_mobil_stats_excludes_inactive_mobils(): void
    {
        Mobil::factory()->create(['kode_mobil' => 'JET ACTIVE', 'is_active_in_trip' => true]);
        Mobil::factory()->create(['kode_mobil' => 'JET INACTIVE', 'is_active_in_trip' => false]);

        $trips = collect();
        $result = $this->svc->buildPerMobilStats($trips);

        $this->assertCount(1, $result);
        $this->assertSame('JET ACTIVE', $result[0]['mobil_code']);
    }

    public function test_status_breakdown_groups_by_status(): void
    {
        $mobil = Mobil::factory()->create(['kode_mobil' => 'JET MIX', 'is_active_in_trip' => true]);

        $baseAttrs = [
            'mobil_id' => $mobil->id,
            'driver_id' => $this->driver->id,
            'trip_date' => self::DATE,
            'direction' => 'ROHUL_TO_PKB',
        ];

        Trip::factory()->create($baseAttrs + ['trip_time' => '05:30:00', 'sequence' => 1, 'status' => 'scheduled']);
        Trip::factory()->create($baseAttrs + ['trip_time' => '07:00:00', 'sequence' => 2, 'status' => 'scheduled']);
        Trip::factory()->create($baseAttrs + ['trip_time' => '09:00:00', 'sequence' => 3, 'status' => 'berangkat']);
        Trip::factory()->create($baseAttrs + ['trip_time' => '13:00:00', 'sequence' => 4, 'status' => 'keluar_trip']);

        $trips = Trip::query()->where('trip_date', self::DATE)->get();
        $result = $this->svc->buildPerMobilStats($trips);

        $this->assertCount(1, $result);
        $this->assertSame(
            ['scheduled' => 2, 'berangkat' => 1, 'keluar_trip' => 1],
            $result[0]['status_breakdown'],
        );
    }

    public function test_pp_count_delegated_to_trip_service(): void
    {
        $mobil = Mobil::factory()->create(['is_active_in_trip' => true]);

        // Pulang-pergi lengkap: 1 PP (0.5 origin + 0.5 return).
        Trip::factory()->create([
            'mobil_id' => $mobil->id,
            'driver_id' => $this->driver->id,
            'trip_date' => self::DATE,
            'direction' => 'ROHUL_TO_PKB',
            'trip_time' => '05:30:00',
            'sequence' => 1,
            'status' => 'berangkat',
        ]);
        Trip::factory()->create([
            'mobil_id' => $mobil->id,
            'driver_id' => $this->driver->id,
            'trip_date' => self::DATE,
            'direction' => 'PKB_TO_ROHUL',
            'trip_time' => '16:00:00',
            'sequence' => 1,
            'status' => 'berangkat',
        ]);

        $trips = Trip::query()->where('trip_date', self::DATE)->get();
        $result = $this->svc->buildPerMobilStats($trips);

        $this->assertCount(1, $result);

        // Sanity check: PP value dari service match TripService::computePpForMobil direct call.
        $tripService = $this->app->make(TripService::class);
        $expected = $tripService->computePpForMobil($trips->where('mobil_id', $mobil->id));

        $this->assertSame($expected, $result[0]['pp_count']);
        $this->assertSame(1.0, $result[0]['pp_count']);
    }

    public function test_ordering_by_kode_mobil_ascending(): void
    {
        // Create unordered.
        Mobil::factory()->create(['kode_mobil' => 'JET Z', 'is_active_in_trip' => true]);
        Mobil::factory()->create(['kode_mobil' => 'JET A', 'is_active_in_trip' => true]);
        Mobil::factory()->create(['kode_mobil' => 'JET M', 'is_active_in_trip' => true]);

        $trips = collect();
        $result = $this->svc->buildPerMobilStats($trips);

        $codes = array_column($result, 'mobil_code');
        $this->assertSame(['JET A', 'JET M', 'JET Z'], $codes);
    }
}
