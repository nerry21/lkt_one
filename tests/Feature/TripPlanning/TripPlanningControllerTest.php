<?php

namespace Tests\Feature\TripPlanning;

use App\Models\DailyDriverAssignment;
use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

/**
 * Feature tests for TripPlanningPageController (Sesi 22 Fase D2).
 *
 * Endpoints:
 *   GET  /dashboard/trip-planning/dashboard?date=...
 *   GET  /dashboard/trip-planning/trips?date=...&direction=...&status=...
 *   POST /dashboard/trip-planning/generate
 */
class TripPlanningControllerTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;
    protected Mobil $mobil1;
    protected Mobil $mobil2;
    protected Driver $driver1;
    protected Driver $driver2;

    private const DATE = '2026-04-23';

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow('2026-04-22 14:00:00');

        $this->admin = User::factory()->create(['role' => 'Admin']);
        $this->mobil1 = Mobil::factory()->create();
        $this->mobil2 = Mobil::factory()->create();
        $this->driver1 = Driver::factory()->create();
        $this->driver2 = Driver::factory()->create();
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    // ── Group 1: Auth (2 tests) ────────────────────────────────────────────

    public function test_unauthenticated_cannot_access_dashboard(): void
    {
        $this->getJson('/dashboard/trip-planning/dashboard?date='.self::DATE)
            ->assertStatus(401);
    }

    public function test_admin_can_access_dashboard(): void
    {
        $this->actingAs($this->admin)
            ->getJson('/dashboard/trip-planning/dashboard?date='.self::DATE)
            ->assertStatus(200)
            ->assertJsonStructure([
                'date',
                'statistics' => [
                    'per_mobil',
                    'total_berangkat',
                    'total_tidak_berangkat',
                    'total_keluar_trip',
                    'total_scheduled',
                ],
                'trips_pkb_to_rohul',
                'trips_rohul_to_pkb',
                'assignments_tomorrow',
            ]);
    }

    // ── Group 2: PP counting (5 tests) ─────────────────────────────────────

    public function test_pp_normal_round_trip_is_1_pp(): void
    {
        $this->createTrip($this->mobil1->id, $this->driver1->id, 'ROHUL_TO_PKB', '05:30:00', 1, 'berangkat');
        $this->createTrip($this->mobil1->id, $this->driver1->id, 'PKB_TO_ROHUL', '16:00:00', 1, 'berangkat');

        $response = $this->actingAs($this->admin)
            ->getJson('/dashboard/trip-planning/dashboard?date='.self::DATE);

        $this->assertSame(1.0, $this->findPpCount($response, $this->mobil1->id));
    }

    public function test_pp_morning_only_is_half_pp(): void
    {
        $this->createTrip($this->mobil1->id, $this->driver1->id, 'ROHUL_TO_PKB', '05:30:00', 1, 'berangkat');
        $this->createTrip($this->mobil1->id, $this->driver1->id, 'PKB_TO_ROHUL', '16:00:00', 1, 'scheduled');

        $response = $this->actingAs($this->admin)
            ->getJson('/dashboard/trip-planning/dashboard?date='.self::DATE);

        $this->assertSame(0.5, $this->findPpCount($response, $this->mobil1->id));
    }

    public function test_pp_both_tidak_berangkat_is_zero_pp(): void
    {
        $this->createTrip($this->mobil1->id, $this->driver1->id, 'ROHUL_TO_PKB', '05:30:00', 1, 'tidak_berangkat');
        $this->createTrip($this->mobil1->id, $this->driver1->id, 'PKB_TO_ROHUL', '16:00:00', 1, 'tidak_berangkat');

        $response = $this->actingAs($this->admin)
            ->getJson('/dashboard/trip-planning/dashboard?date='.self::DATE);

        $this->assertSame(0.0, $this->findPpCount($response, $this->mobil1->id));
    }

    public function test_pp_dropping_from_rohul_is_half_pp(): void
    {
        // ROHUL→PKB with status keluar_trip = active start, no return yet.
        $this->createTrip($this->mobil1->id, $this->driver1->id, 'ROHUL_TO_PKB', '05:30:00', 1, 'keluar_trip');

        $response = $this->actingAs($this->admin)
            ->getJson('/dashboard/trip-planning/dashboard?date='.self::DATE);

        $this->assertSame(0.5, $this->findPpCount($response, $this->mobil1->id));
    }

    public function test_pp_pkb_start_without_rohul_origin_is_zero_pp(): void
    {
        // PKB→ROHUL berangkat, no ROHUL→PKB same day.
        // Rule: start must be from ROHUL. 0 PP.
        $this->createTrip($this->mobil1->id, $this->driver1->id, 'PKB_TO_ROHUL', '05:30:00', 1, 'berangkat');

        $response = $this->actingAs($this->admin)
            ->getJson('/dashboard/trip-planning/dashboard?date='.self::DATE);

        $this->assertSame(0.0, $this->findPpCount($response, $this->mobil1->id));
    }

    // ── Group 3: Trip shape (2 tests) ──────────────────────────────────────

    public function test_trip_shape_includes_mobil_driver_and_null_keluar_detail(): void
    {
        $this->createTrip($this->mobil1->id, $this->driver1->id, 'ROHUL_TO_PKB', '05:30:00', 1, 'scheduled');

        $response = $this->actingAs($this->admin)
            ->getJson('/dashboard/trip-planning/dashboard?date='.self::DATE);

        $trip = $response->json('trips_rohul_to_pkb.0');
        $this->assertArrayHasKey('mobil', $trip);
        $this->assertArrayHasKey('driver', $trip);
        $this->assertArrayHasKey('version', $trip);
        $this->assertNull($trip['keluar_trip_detail']);
        $this->assertSame($this->mobil1->kode_mobil, $trip['mobil']['kode_mobil']);
    }

    public function test_trip_shape_includes_keluar_trip_detail_when_status_keluar_trip(): void
    {
        $trip = $this->createTrip($this->mobil1->id, $this->driver1->id, 'ROHUL_TO_PKB', '05:30:00', 1, 'keluar_trip');
        $trip->update([
            'keluar_trip_substatus' => 'out',
            'keluar_trip_reason' => 'dropping',
            'keluar_trip_pool_target' => 'ROHUL',
            'keluar_trip_start_date' => self::DATE,
        ]);

        $response = $this->actingAs($this->admin)
            ->getJson('/dashboard/trip-planning/dashboard?date='.self::DATE);

        $tripJson = $response->json('trips_rohul_to_pkb.0');
        $this->assertNotNull($tripJson['keluar_trip_detail']);
        $this->assertSame('out', $tripJson['keluar_trip_detail']['substatus']);
        $this->assertSame('dropping', $tripJson['keluar_trip_detail']['reason']);
    }

    // ── Group 4: Trips list filter + pagination (3 tests) ──────────────────

    public function test_trips_list_filters_by_direction(): void
    {
        $this->createTrip($this->mobil1->id, $this->driver1->id, 'ROHUL_TO_PKB', '05:30:00', 1, 'scheduled');
        $this->createTrip($this->mobil2->id, $this->driver2->id, 'PKB_TO_ROHUL', '05:30:00', 1, 'scheduled');

        $response = $this->actingAs($this->admin)
            ->getJson('/dashboard/trip-planning/trips?date='.self::DATE.'&direction=ROHUL_TO_PKB');

        $response->assertStatus(200);
        $this->assertCount(1, $response->json('data'));
        $this->assertSame('ROHUL_TO_PKB', $response->json('data.0.direction'));
    }

    public function test_trips_list_filters_by_status(): void
    {
        $this->createTrip($this->mobil1->id, $this->driver1->id, 'ROHUL_TO_PKB', '05:30:00', 1, 'berangkat');
        $this->createTrip($this->mobil2->id, $this->driver2->id, 'ROHUL_TO_PKB', '07:00:00', 2, 'scheduled');

        $response = $this->actingAs($this->admin)
            ->getJson('/dashboard/trip-planning/trips?date='.self::DATE.'&status=berangkat');

        $response->assertStatus(200);
        $this->assertCount(1, $response->json('data'));
        $this->assertSame('berangkat', $response->json('data.0.status'));
    }

    public function test_trips_list_pagination_meta(): void
    {
        foreach (range(1, 5) as $i) {
            $this->createTrip($this->mobil1->id, $this->driver1->id, 'ROHUL_TO_PKB', '05:30:00', $i, 'scheduled');
        }

        $response = $this->actingAs($this->admin)
            ->getJson('/dashboard/trip-planning/trips?date='.self::DATE.'&per_page=2');

        $response->assertStatus(200);
        $this->assertCount(2, $response->json('data'));
        $this->assertSame(5, $response->json('meta.total'));
        $this->assertSame(2, $response->json('meta.per_page'));
        $this->assertSame(3, $response->json('meta.last_page'));
    }

    // ── Group 5: Generate endpoint (3 tests) ───────────────────────────────

    public function test_generate_rejects_past_date(): void
    {
        $this->actingAs($this->admin)
            ->postJson('/dashboard/trip-planning/generate', ['date' => '2020-01-01'])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['date']);
    }

    public function test_generate_returns_driver_missing_error_when_no_assignments(): void
    {
        // No daily_driver_assignments for target date — expect 422 with error_code.
        $this->actingAs($this->admin)
            ->postJson('/dashboard/trip-planning/generate', ['date' => self::DATE])
            ->assertStatus(422)
            ->assertJsonPath('error_code', 'TRIP_GENERATION_DRIVER_MISSING');
    }

    public function test_generate_succeeds_with_full_driver_assignments(): void
    {
        // Assign driver1 to all mobil for target date.
        foreach (Mobil::all() as $m) {
            DailyDriverAssignment::create([
                'date' => self::DATE,
                'mobil_id' => $m->id,
                'driver_id' => $this->driver1->id,
                'created_by' => $this->admin->id,
                'updated_by' => $this->admin->id,
            ]);
        }

        $response = $this->actingAs($this->admin)
            ->postJson('/dashboard/trip-planning/generate', ['date' => self::DATE]);

        $response->assertStatus(200);
        $this->assertGreaterThan(0, Trip::where('trip_date', self::DATE)->count());
    }

    // ── Helpers ────────────────────────────────────────────────────────────

    private function createTrip(
        string $mobilId, string $driverId,
        string $direction, ?string $time, int $sequence, string $status
    ): Trip {
        return Trip::factory()->create([
            'mobil_id' => $mobilId,
            'driver_id' => $driverId,
            'trip_date' => self::DATE,
            'direction' => $direction,
            'trip_time' => $time,
            'sequence' => $sequence,
            'status' => $status,
        ])->refresh();
    }

    private function findPpCount($response, string $mobilId): float
    {
        $stats = $response->json('statistics.per_mobil');
        foreach ($stats as $s) {
            if ($s['mobil_id'] === $mobilId) {
                return (float) $s['pp_count'];
            }
        }
        return 0.0;
    }
}
