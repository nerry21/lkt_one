<?php

namespace Tests\Feature\TripPlanning;

use App\Models\Booking;
use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

/**
 * Feature test untuk TripCrudController (Feature E5 PR #1).
 *
 * Coverage: route → controller → service end-to-end via HTTP, termasuk
 * middleware (jwt.auth + admin.role:admin), FormRequest validation,
 * exception self-render (TripSlotConflict 409, TripVersion 409,
 * TripEditNotAllowed 403, TripDeleteNotAllowed 403).
 *
 * Endpoint coverage:
 *   POST   /api/trip-planning/trips                       (store)
 *   PUT    /api/trip-planning/trips/{trip}                (update)
 *   DELETE /api/trip-planning/trips/{trip}?version=N      (destroy)
 *   GET    /api/trip-planning/trips/{trip}/bookings-count (bookingsCount)
 */
class TripCrudControllerTest extends TestCase
{
    use RefreshDatabase;

    private const TODAY = '2026-04-22';
    private const TOMORROW = '2026-04-23';
    private const FAR_FUTURE = '2026-06-30'; // > H+30

    protected User $admin;
    protected User $nonAdmin;
    protected Mobil $mobil;
    protected Mobil $mobil2;
    protected Driver $driver;
    protected Driver $driver2;

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow(self::TODAY.' 09:00:00');

        $this->admin = User::factory()->create(['role' => 'Admin']);
        $this->nonAdmin = User::factory()->create(['role' => 'User']);
        $this->mobil = Mobil::factory()->create();
        $this->mobil2 = Mobil::factory()->create();
        $this->driver = Driver::factory()->create();
        $this->driver2 = Driver::factory()->create();
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    /**
     * @return array<string, mixed>
     */
    private function basePayload(array $overrides = []): array
    {
        return array_merge([
            'trip_date' => self::TOMORROW,
            'trip_time' => '07:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'mobil_id' => $this->mobil->id,
            'driver_id' => $this->driver->id,
        ], $overrides);
    }

    private function makeScheduledTrip(array $overrides = []): Trip
    {
        return Trip::factory()->create(array_merge([
            'trip_date' => self::TOMORROW,
            'trip_time' => '07:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence' => 1,
            'mobil_id' => $this->mobil->id,
            'driver_id' => $this->driver->id,
            'status' => 'scheduled',
        ], $overrides))->refresh();
    }

    // ── Auth & role ─────────────────────────────────────────────────────────

    public function test_unauthenticated_user_gets_401(): void
    {
        $this->postJson('/api/trip-planning/trips', $this->basePayload())
            ->assertStatus(401);
    }

    public function test_non_admin_gets_403(): void
    {
        $this->actingAs($this->nonAdmin)
            ->postJson('/api/trip-planning/trips', $this->basePayload())
            ->assertStatus(403);
    }

    // ── store ───────────────────────────────────────────────────────────────

    public function test_store_creates_trip_with_201(): void
    {
        $response = $this->actingAs($this->admin)
            ->postJson('/api/trip-planning/trips', $this->basePayload())
            ->assertStatus(201)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.status', 'scheduled')
            ->assertJsonPath('data.trip_time', '07:00:00')
            ->assertJsonPath('data.direction', 'PKB_TO_ROHUL')
            ->assertJsonPath('data.mobil.id', $this->mobil->id)
            ->assertJsonPath('data.driver.id', $this->driver->id);

        $this->assertDatabaseHas('trips', [
            'id' => $response->json('data.id'),
            'trip_date' => self::TOMORROW,
            'trip_time' => '07:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'mobil_id' => $this->mobil->id,
            'created_by' => $this->admin->id,
            'status' => 'scheduled',
            'sequence' => 1,
        ]);
    }

    public function test_store_returns_409_on_slot_conflict(): void
    {
        $this->makeScheduledTrip([
            'mobil_id' => $this->mobil2->id,
            'driver_id' => $this->driver2->id,
        ]);

        $this->actingAs($this->admin)
            ->postJson('/api/trip-planning/trips', $this->basePayload())
            ->assertStatus(409)
            ->assertJsonPath('error', 'trip_slot_conflict');
    }

    public function test_store_returns_422_when_trip_date_beyond_30_days(): void
    {
        $this->actingAs($this->admin)
            ->postJson('/api/trip-planning/trips', $this->basePayload([
                'trip_date' => self::FAR_FUTURE,
            ]))
            ->assertStatus(422)
            ->assertJsonValidationErrors(['trip_date']);
    }

    public function test_store_returns_422_when_trip_date_in_past(): void
    {
        $this->actingAs($this->admin)
            ->postJson('/api/trip-planning/trips', $this->basePayload([
                'trip_date' => '2026-04-21', // yesterday
            ]))
            ->assertStatus(422)
            ->assertJsonValidationErrors(['trip_date']);
    }

    // ── update ──────────────────────────────────────────────────────────────

    public function test_update_returns_200_with_correct_version_and_increments_version(): void
    {
        $trip = $this->makeScheduledTrip();
        $this->assertSame(0, $trip->version);

        $this->actingAs($this->admin)
            ->putJson("/api/trip-planning/trips/{$trip->id}", [
                'version' => 0,
                'trip_time' => '08:00:00',
            ])
            ->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.trip_time', '08:00:00')
            ->assertJsonPath('data.version', 1);

        $this->assertDatabaseHas('trips', [
            'id' => $trip->id,
            'trip_time' => '08:00:00',
            'version' => 1,
            'updated_by' => $this->admin->id,
        ]);
    }

    public function test_update_returns_409_on_version_conflict(): void
    {
        $trip = $this->makeScheduledTrip();

        $this->actingAs($this->admin)
            ->putJson("/api/trip-planning/trips/{$trip->id}", [
                'version' => 99, // stale
                'trip_time' => '08:00:00',
            ])
            ->assertStatus(409)
            ->assertJsonPath('error', 'trip_version_conflict');
    }

    public function test_update_returns_403_when_status_berangkat(): void
    {
        $trip = Trip::factory()->berangkat()->create([
            'trip_date' => self::TOMORROW,
            'trip_time' => '07:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence' => 1,
            'mobil_id' => $this->mobil->id,
            'driver_id' => $this->driver->id,
        ]);

        $this->actingAs($this->admin)
            ->putJson("/api/trip-planning/trips/{$trip->id}", [
                'version' => 0,
                'trip_time' => '08:00:00',
            ])
            ->assertStatus(403)
            ->assertJsonPath('error', 'trip_edit_not_allowed')
            ->assertJsonPath('current_status', 'berangkat');
    }

    // ── destroy ─────────────────────────────────────────────────────────────

    public function test_destroy_returns_200_when_no_bookings(): void
    {
        $trip = $this->makeScheduledTrip();

        $this->actingAs($this->admin)
            ->deleteJson("/api/trip-planning/trips/{$trip->id}?version=0")
            ->assertStatus(200)
            ->assertJsonPath('success', true);

        $this->assertDatabaseMissing('trips', ['id' => $trip->id]);
    }

    public function test_destroy_returns_409_on_version_conflict(): void
    {
        $trip = $this->makeScheduledTrip();

        $this->actingAs($this->admin)
            ->deleteJson("/api/trip-planning/trips/{$trip->id}?version=99")
            ->assertStatus(409)
            ->assertJsonPath('error', 'trip_version_conflict');

        $this->assertDatabaseHas('trips', ['id' => $trip->id]);
    }

    public function test_destroy_returns_403_when_status_berangkat(): void
    {
        $trip = Trip::factory()->berangkat()->create([
            'trip_date' => self::TOMORROW,
            'trip_time' => '07:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence' => 1,
            'mobil_id' => $this->mobil->id,
            'driver_id' => $this->driver->id,
        ]);

        $this->actingAs($this->admin)
            ->deleteJson("/api/trip-planning/trips/{$trip->id}?version=0")
            ->assertStatus(403)
            ->assertJsonPath('error', 'trip_delete_not_allowed');

        $this->assertDatabaseHas('trips', ['id' => $trip->id]);
    }

    // ── bookingsCount ───────────────────────────────────────────────────────

    public function test_bookings_count_returns_correct_count(): void
    {
        $trip = $this->makeScheduledTrip();
        Booking::factory()->count(2)->create(['trip_id' => $trip->id]);

        $this->actingAs($this->admin)
            ->getJson("/api/trip-planning/trips/{$trip->id}/bookings-count")
            ->assertStatus(200)
            ->assertJsonPath('trip_id', $trip->id)
            ->assertJsonPath('bookings_count', 2);
    }
}
