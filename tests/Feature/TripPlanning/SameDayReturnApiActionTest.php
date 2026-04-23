<?php

namespace Tests\Feature\TripPlanning;

use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

/**
 * Feature tests untuk endpoint Same-Day Return (Fase E5 Tahap 4 Sesi 30).
 *
 * Coverage scope:
 *   - Web + api mirror route both work (lesson #26 mirror pattern)
 *   - Happy path (scheduled origin ROHUL→PKB → PKB→ROHUL SDR trip created)
 *   - Driver override via payload
 *   - FormRequest validation (422 untuk slot format/list mismatch)
 *   - Service-layer precondition (409 untuk origin direction/already-paired)
 *   - Auth guards (non-admin 403, unauth 401)
 *
 * Business logic coverage ada di SameDayReturnServiceTest (Tahap 3 unit).
 * File ini fokus HTTP boundary: routing, middleware, FormRequest, response shape.
 */
class SameDayReturnApiActionTest extends TestCase
{
    use RefreshDatabase;

    private const DATE = '2026-04-23';

    protected User $admin;
    protected User $nonAdmin;
    protected Mobil $mobil;
    protected Driver $driver;

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow('2026-04-23 09:00:00');

        $this->admin = User::factory()->create(['role' => 'Admin']);
        $this->nonAdmin = User::factory()->create(['role' => 'User']);
        $this->mobil = Mobil::factory()->create();
        $this->driver = Driver::factory()->create();
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    private function makeScheduledRohulTrip(): Trip
    {
        return Trip::factory()->create([
            'mobil_id'  => $this->mobil->id,
            'driver_id' => $this->driver->id,
            'trip_date' => self::DATE,
            'trip_time' => '05:30:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence'  => 1,
            'status'    => 'scheduled',
        ])->refresh();
    }

    // ── Group 1: Happy paths ────────────────────────────────────────────────

    public function test_admin_can_create_same_day_return_via_api_mirror_route(): void
    {
        $trip = $this->makeScheduledRohulTrip();

        $this->actingAs($this->admin)
            ->postJson("/api/trip-planning/trips/{$trip->id}/same-day-return", [
                'slot' => '13:00:00',
                'reason' => 'coverage gap',
            ])
            ->assertStatus(200)
            ->assertJsonPath('message', 'Same-day return trip created')
            ->assertJsonPath('trip.direction', 'PKB_TO_ROHUL')
            ->assertJsonPath('trip.trip_time', '13:00:00')
            ->assertJsonPath('trip.sequence', 999)
            ->assertJsonPath('trip.same_day_return', true)
            ->assertJsonPath('trip.same_day_return_reason', 'coverage gap')
            ->assertJsonPath('trip.same_day_return_origin_trip_id', $trip->id)
            ->assertJsonPath('trip.mobil.id', $this->mobil->id);

        $this->assertDatabaseHas('trips', [
            'same_day_return_origin_trip_id' => $trip->id,
            'same_day_return' => true,
            'direction' => 'PKB_TO_ROHUL',
            'trip_time' => '13:00:00',
            'sequence' => 999,
        ]);
    }

    public function test_admin_can_create_same_day_return_via_web_route(): void
    {
        $trip = $this->makeScheduledRohulTrip();

        $this->actingAs($this->admin)
            ->postJson("/dashboard/trip-planning/trips/{$trip->id}/same-day-return", [
                'slot' => '13:00:00',
                'reason' => 'coverage gap',
            ])
            ->assertStatus(200)
            ->assertJsonPath('trip.direction', 'PKB_TO_ROHUL')
            ->assertJsonPath('trip.trip_time', '13:00:00')
            ->assertJsonPath('trip.sequence', 999)
            ->assertJsonPath('trip.same_day_return', true);
    }

    public function test_admin_can_override_driver_in_same_day_return_payload(): void
    {
        $trip = $this->makeScheduledRohulTrip();
        $otherDriver = Driver::factory()->create();

        $this->actingAs($this->admin)
            ->postJson("/api/trip-planning/trips/{$trip->id}/same-day-return", [
                'slot' => '13:00:00',
                'driver_id' => $otherDriver->id,
            ])
            ->assertStatus(200)
            ->assertJsonPath('trip.driver.id', $otherDriver->id);

        // Pastikan TIDAK pakai driver origin.
        $this->assertNotSame($this->driver->id, $otherDriver->id);
    }

    // ── Group 2: Validation failures ────────────────────────────────────────

    public function test_same_day_return_returns_422_for_invalid_slot_format(): void
    {
        $trip = $this->makeScheduledRohulTrip();

        $this->actingAs($this->admin)
            ->postJson("/api/trip-planning/trips/{$trip->id}/same-day-return", [
                'slot' => '25:99:00',
            ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['slot']);

        // No SDR trip created.
        $this->assertSame(0, Trip::where('same_day_return', true)->count());
    }

    public function test_same_day_return_returns_409_when_origin_direction_is_pkb_to_rohul(): void
    {
        $trip = Trip::factory()->create([
            'mobil_id'  => $this->mobil->id,
            'driver_id' => $this->driver->id,
            'trip_date' => self::DATE,
            'trip_time' => '05:30:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence'  => 1,
            'status'    => 'scheduled',
        ])->refresh();

        $this->actingAs($this->admin)
            ->postJson("/api/trip-planning/trips/{$trip->id}/same-day-return", [
                'slot' => '13:00:00',
            ])
            ->assertStatus(409)
            ->assertJsonPath('error', 'same_day_return_conflict')
            ->assertJsonPath('conflict_type', 'origin_direction_invalid')
            ->assertJsonPath('origin_trip_id', $trip->id);
    }

    public function test_same_day_return_returns_409_when_origin_already_has_return_pair(): void
    {
        $trip = $this->makeScheduledRohulTrip();

        // First call succeeds.
        $this->actingAs($this->admin)
            ->postJson("/api/trip-planning/trips/{$trip->id}/same-day-return", [
                'slot' => '13:00:00',
            ])
            ->assertStatus(200);

        // Second call rejected: already paired.
        $this->actingAs($this->admin)
            ->postJson("/api/trip-planning/trips/{$trip->id}/same-day-return", [
                'slot' => '16:00:00',
            ])
            ->assertStatus(409)
            ->assertJsonPath('error', 'same_day_return_conflict')
            ->assertJsonPath('conflict_type', 'origin_already_has_return');

        $this->assertSame(1, Trip::where('same_day_return', true)->count());
    }

    // ── Group 3: Auth guards ────────────────────────────────────────────────

    public function test_non_admin_forbidden_from_same_day_return(): void
    {
        $trip = $this->makeScheduledRohulTrip();

        $this->actingAs($this->nonAdmin)
            ->postJson("/api/trip-planning/trips/{$trip->id}/same-day-return", [
                'slot' => '13:00:00',
            ])
            ->assertStatus(403);
    }

    public function test_unauthenticated_same_day_return_returns_401(): void
    {
        $trip = $this->makeScheduledRohulTrip();

        $this->postJson("/api/trip-planning/trips/{$trip->id}/same-day-return", [
            'slot' => '13:00:00',
        ])->assertStatus(401);
    }
}
