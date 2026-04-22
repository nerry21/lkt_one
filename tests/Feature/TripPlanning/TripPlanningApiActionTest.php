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
 * Smoke tests untuk mirror route trip planning di routes/api.php (Fase E2 Sesi 26).
 *
 * Endpoint /api/trip-planning/* adalah mirror dari /dashboard/trip-planning/*
 * (sama controller, beda prefix). Test ini memastikan:
 *   - Route API ter-register dengan controller + middleware yang benar
 *   - Admin auth via session + Accept: application/json flow normal
 *   - Middleware admin.role:admin aktif (non-admin → 403)
 *   - Auth guard aktif (tanpa auth → 401 untuk JSON request)
 *
 * Business logic coverage sudah di TripPlanningControllerActionTest (D3).
 */
class TripPlanningApiActionTest extends TestCase
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
        Carbon::setTestNow('2026-04-22 14:00:00');

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

    private function makeScheduledTrip(): Trip
    {
        return Trip::factory()->create([
            'mobil_id' => $this->mobil->id,
            'driver_id' => $this->driver->id,
            'trip_date' => self::DATE,
            'trip_time' => '05:30:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence' => 1,
            'status' => 'scheduled',
        ])->refresh();
    }

    public function test_admin_can_mark_berangkat_via_api_mirror_route(): void
    {
        $trip = $this->makeScheduledTrip();

        $this->actingAs($this->admin)
            ->patchJson("/api/trip-planning/trips/{$trip->id}/berangkat")
            ->assertStatus(200)
            ->assertJsonPath('trip.status', 'berangkat')
            ->assertJsonPath('trip.mobil.id', $this->mobil->id);
    }

    public function test_admin_can_fetch_dashboard_via_api_mirror_route(): void
    {
        $this->actingAs($this->admin)
            ->getJson('/api/trip-planning/dashboard?date='.self::DATE)
            ->assertStatus(200)
            ->assertJsonStructure([
                'date',
                'statistics',
                'trips_pkb_to_rohul',
                'trips_rohul_to_pkb',
                'assignments_tomorrow',
            ]);
    }

    public function test_non_admin_forbidden_from_api_action(): void
    {
        $trip = $this->makeScheduledTrip();

        $this->actingAs($this->nonAdmin)
            ->patchJson("/api/trip-planning/trips/{$trip->id}/berangkat")
            ->assertStatus(403);
    }

    public function test_unauthenticated_api_action_returns_401(): void
    {
        $trip = $this->makeScheduledTrip();

        $this->patchJson("/api/trip-planning/trips/{$trip->id}/berangkat")
            ->assertStatus(401);
    }

    public function test_admin_can_ganti_jam_via_api_mirror_route(): void
    {
        $trip = $this->makeScheduledTrip();

        $this->actingAs($this->admin)
            ->patchJson("/api/trip-planning/trips/{$trip->id}/ganti-jam", [
                'new_trip_time' => '07:00:00',
            ])
            ->assertStatus(200)
            ->assertJsonPath('trip.trip_time', '07:00:00')
            ->assertJsonPath('trip.original_trip_time', '05:30:00');
    }

    public function test_ganti_jam_rejects_invalid_slot_via_api_mirror_route(): void
    {
        $trip = $this->makeScheduledTrip();

        $this->actingAs($this->admin)
            ->patchJson("/api/trip-planning/trips/{$trip->id}/ganti-jam", [
                'new_trip_time' => '08:00:00',
            ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['new_trip_time']);
    }
}
