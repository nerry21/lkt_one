<?php

namespace Tests\Unit\Services;

use App\Models\Mobil;
use App\Models\Trip;
use App\Services\PoolStateService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use InvalidArgumentException;
use Tests\TestCase;

/**
 * Test coverage PoolStateService (Sesi 14 Fase B2).
 *
 * 3 group, 11 test:
 *   - poolForMobil (6) — derive city dari trip history + fallback home_pool
 *   - prioritizedMobilList (3) — pool filter, active filter, priority ordering
 *   - findDualPoolViolations (2) — detect conflict + healthy empty state
 *
 * Reference: docs/trip-planning-design.md §5.6 (derived pool state spec).
 */
class PoolStateServiceTest extends TestCase
{
    use RefreshDatabase;

    protected PoolStateService $svc;

    /**
     * Fixed test dates — hindari "now()" drift antar assertion.
     */
    private const TODAY = '2026-04-21';
    private const YESTERDAY = '2026-04-20';
    private const TOMORROW = '2026-04-22';
    private const TWO_DAYS_AGO = '2026-04-19';

    protected function setUp(): void
    {
        parent::setUp();
        $this->svc = $this->app->make(PoolStateService::class);
    }

    // ── Group 1: poolForMobil ───────────────────────────────────────────────

    public function test_poolForMobil_returns_destination_when_status_berangkat(): void
    {
        $mobil = Mobil::factory()->create(['home_pool' => 'PKB']);
        Trip::factory()
            ->berangkat()
            ->direction('PKB_TO_ROHUL')
            ->create([
                'trip_date' => self::YESTERDAY,
                'mobil_id'  => $mobil->id,
            ]);

        $this->assertSame('ROHUL', $this->svc->poolForMobil($mobil->id, self::TODAY));
    }

    public function test_poolForMobil_returns_origin_when_status_tidak_keluar_trip(): void
    {
        $mobil = Mobil::factory()->create(['home_pool' => 'ROHUL']);
        Trip::factory()
            ->tidakKeluarTrip()
            ->direction('ROHUL_TO_PKB')
            ->create([
                'trip_date' => self::YESTERDAY,
                'mobil_id'  => $mobil->id,
            ]);

        // Direction ROHUL_TO_PKB + tidak_keluar_trip → tetap di origin = ROHUL.
        $this->assertSame('ROHUL', $this->svc->poolForMobil($mobil->id, self::TODAY));
    }

    public function test_poolForMobil_returns_pool_target_when_keluar_trip_returning(): void
    {
        $mobil = Mobil::factory()->create(['home_pool' => 'PKB']);
        Trip::factory()
            ->keluarTrip('returning', 'ROHUL')
            ->direction('PKB_TO_ROHUL')
            ->create([
                'trip_date' => self::TWO_DAYS_AGO,
                'mobil_id'  => $mobil->id,
            ]);

        $this->assertSame('ROHUL', $this->svc->poolForMobil($mobil->id, self::TODAY));
    }

    public function test_poolForMobil_falls_back_to_home_pool_when_no_trip_history(): void
    {
        $mobil = Mobil::factory()->create(['home_pool' => 'PKB']);

        $this->assertSame('PKB', $this->svc->poolForMobil($mobil->id, self::TODAY));
    }

    public function test_poolForMobil_returns_null_when_no_trip_and_home_pool_null(): void
    {
        $mobil = Mobil::factory()->create(['home_pool' => null]);

        $this->assertNull($this->svc->poolForMobil($mobil->id, self::TODAY));
    }

    public function test_poolForMobil_excludes_trips_after_query_date(): void
    {
        $mobil = Mobil::factory()->create(['home_pool' => 'ROHUL']);
        // Trip besok (setelah query date) — HARUS di-ignore.
        Trip::factory()
            ->berangkat()
            ->direction('PKB_TO_ROHUL')
            ->create([
                'trip_date' => self::TOMORROW,
                'mobil_id'  => $mobil->id,
            ]);

        // Karena trip di-ignore, fallback ke home_pool = ROHUL.
        $this->assertSame('ROHUL', $this->svc->poolForMobil($mobil->id, self::TODAY));
    }

    // ── Group 2: prioritizedMobilList ───────────────────────────────────────

    public function test_prioritizedMobilList_returns_only_mobil_in_requested_pool(): void
    {
        $mobilA = Mobil::factory()->create(['home_pool' => 'PKB']);
        $mobilB = Mobil::factory()->create(['home_pool' => 'ROHUL']);

        $result = $this->svc->prioritizedMobilList('PKB', self::TODAY);

        $this->assertCount(1, $result);
        $this->assertSame($mobilA->id, $result->first()->id);
        $this->assertNotContains($mobilB->id, $result->pluck('id')->all());
    }

    public function test_prioritizedMobilList_excludes_inactive_mobil(): void
    {
        $mobilA = Mobil::factory()->create([
            'home_pool'         => 'PKB',
            'is_active_in_trip' => true,
        ]);
        $mobilB = Mobil::factory()->create([
            'home_pool'         => 'PKB',
            'is_active_in_trip' => false,
        ]);

        $result = $this->svc->prioritizedMobilList('PKB', self::TODAY);

        $this->assertCount(1, $result);
        $this->assertSame($mobilA->id, $result->first()->id);
    }

    public function test_prioritizedMobilList_orders_standby_before_waiting_list_before_returning(): void
    {
        $mobilA = Mobil::factory()->create(['home_pool' => 'PKB']);
        $mobilB = Mobil::factory()->create(['home_pool' => 'PKB']);
        $mobilC = Mobil::factory()->create(['home_pool' => 'PKB']);

        // mobilB: kemarin keluar_trip substatus=waiting_list, pool_target=PKB.
        Trip::factory()
            ->keluarTrip('waiting_list', 'PKB')
            ->create([
                'trip_date' => self::YESTERDAY,
                'mobil_id'  => $mobilB->id,
            ]);

        // mobilC: kemarin keluar_trip substatus=returning, pool_target=PKB.
        Trip::factory()
            ->keluarTrip('returning', 'PKB')
            ->create([
                'trip_date' => self::YESTERDAY,
                'mobil_id'  => $mobilC->id,
            ]);

        $result = $this->svc->prioritizedMobilList('PKB', self::TODAY);

        $this->assertCount(3, $result);

        $ordered = $result->pluck('id')->all();
        $this->assertSame($mobilA->id, $ordered[0], 'Standby (rank=1) harus pertama');
        $this->assertSame($mobilB->id, $ordered[1], 'Waiting list (rank=2) harus kedua');
        $this->assertSame($mobilC->id, $ordered[2], 'Returning (rank=3) harus ketiga');

        // Verifikasi transient attribute tertempel.
        $this->assertSame(1, $result[0]->pool_priority_rank);
        $this->assertSame(2, $result[1]->pool_priority_rank);
        $this->assertSame(3, $result[2]->pool_priority_rank);
    }

    // ── Group 3: findDualPoolViolations ─────────────────────────────────────

    public function test_findDualPoolViolations_detects_mobil_with_conflicting_directions_same_date(): void
    {
        $mobil = Mobil::factory()->create(['home_pool' => 'PKB']);

        $tripA = Trip::factory()
            ->scheduled()
            ->direction('PKB_TO_ROHUL')
            ->create([
                'trip_date' => self::TODAY,
                'sequence'  => 1,
                'mobil_id'  => $mobil->id,
            ]);

        $tripB = Trip::factory()
            ->scheduled()
            ->direction('ROHUL_TO_PKB')
            ->create([
                'trip_date' => self::TODAY,
                'sequence'  => 1,
                'mobil_id'  => $mobil->id,
            ]);

        $violations = $this->svc->findDualPoolViolations(self::TODAY);

        $this->assertCount(1, $violations);
        $violation = $violations->first();
        $this->assertSame($mobil->id, $violation['mobil_id']);
        $this->assertEqualsCanonicalizing(
            [$tripA->id, $tripB->id],
            $violation['trip_ids'],
        );
    }

    public function test_findDualPoolViolations_returns_empty_when_state_is_healthy(): void
    {
        $mobilA = Mobil::factory()->create(['home_pool' => 'PKB']);
        $mobilB = Mobil::factory()->create(['home_pool' => 'PKB']);
        $mobilC = Mobil::factory()->create(['home_pool' => 'ROHUL']);

        // 3 mobil masing-masing 1 trip — tidak ada mobil yang punya ≥2 trip,
        // jadi tidak ada konflik yang bisa ter-deteksi.
        Trip::factory()->scheduled()->direction('PKB_TO_ROHUL')->create([
            'trip_date' => self::TODAY,
            'sequence'  => 1,
            'mobil_id'  => $mobilA->id,
        ]);
        Trip::factory()->scheduled()->direction('PKB_TO_ROHUL')->create([
            'trip_date' => self::TODAY,
            'sequence'  => 2,
            'mobil_id'  => $mobilB->id,
        ]);
        Trip::factory()->scheduled()->direction('ROHUL_TO_PKB')->create([
            'trip_date' => self::TODAY,
            'sequence'  => 1,
            'mobil_id'  => $mobilC->id,
        ]);

        $violations = $this->svc->findDualPoolViolations(self::TODAY);

        $this->assertTrue($violations->isEmpty());
    }
}
