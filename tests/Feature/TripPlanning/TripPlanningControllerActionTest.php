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
 * Feature tests for Fase D3 Sesi 23 — 7 PATCH action endpoints in
 * TripPlanningPageController.
 *
 * Coverage per endpoint: happy path + invalid transition (409) +
 * unauthorized (403) + extras for validation where applicable.
 *
 * Auth: jwt.auth + admin.role:admin.
 */
class TripPlanningControllerActionTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;
    protected User $nonAdmin;
    protected Mobil $mobil;
    protected Driver $driver;

    private const DATE = '2026-04-23';

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

    private function makeTrip(string $status = 'scheduled', array $overrides = []): Trip
    {
        return Trip::factory()->create(array_merge([
            'mobil_id' => $this->mobil->id,
            'driver_id' => $this->driver->id,
            'trip_date' => self::DATE,
            'trip_time' => '05:30:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence' => 1,
            'status' => $status,
        ], $overrides))->refresh();
    }

    private function makeKeluarTrip(string $substatus): Trip
    {
        return $this->makeTrip('keluar_trip', [
            'keluar_trip_substatus' => $substatus,
            'keluar_trip_reason' => 'dropping',
            'keluar_trip_pool_target' => 'ROHUL',
            'keluar_trip_start_date' => self::DATE,
        ]);
    }

    // ── markBerangkat (4 tests) ────────────────────────────────────────────

    public function test_mark_berangkat_happy_path(): void
    {
        $trip = $this->makeTrip('scheduled');

        $response = $this->actingAs($this->admin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/berangkat");

        $response->assertStatus(200)
            ->assertJsonPath('message', 'Trip marked as berangkat')
            ->assertJsonPath('trip.status', 'berangkat')
            ->assertJsonPath('trip.mobil.id', $this->mobil->id)
            ->assertJsonPath('trip.driver.id', $this->driver->id);
    }

    public function test_mark_berangkat_invalid_transition_returns_409(): void
    {
        $trip = $this->makeTrip('berangkat');

        $this->actingAs($this->admin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/berangkat")
            ->assertStatus(409)
            ->assertJsonPath('error_code', 'TRIP_INVALID_TRANSITION')
            ->assertJsonPath('current_status', 'berangkat')
            ->assertJsonPath('attempted_action', 'markBerangkat');
    }

    public function test_mark_berangkat_rejected_on_waiting_list_trip(): void
    {
        // trip_time=null = waiting list, service tolak markBerangkat.
        $trip = $this->makeTrip('scheduled', ['trip_time' => null, 'sequence' => 7]);

        $this->actingAs($this->admin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/berangkat")
            ->assertStatus(409)
            ->assertJsonPath('error_code', 'TRIP_INVALID_TRANSITION');
    }

    public function test_mark_berangkat_unauthorized_non_admin_returns_403(): void
    {
        $trip = $this->makeTrip('scheduled');

        $this->actingAs($this->nonAdmin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/berangkat")
            ->assertStatus(403);
    }

    public function test_mark_berangkat_not_found_returns_404(): void
    {
        $this->actingAs($this->admin)
            ->patchJson('/dashboard/trip-planning/trips/999999/berangkat')
            ->assertStatus(404);
    }

    // ── markTidakBerangkat (3 tests) ───────────────────────────────────────

    public function test_mark_tidak_berangkat_happy_path(): void
    {
        $trip = $this->makeTrip('scheduled');

        $this->actingAs($this->admin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/tidak-berangkat")
            ->assertStatus(200)
            ->assertJsonPath('message', 'Trip marked as tidak berangkat')
            ->assertJsonPath('trip.status', 'tidak_berangkat');
    }

    public function test_mark_tidak_berangkat_invalid_transition_returns_409(): void
    {
        $trip = $this->makeTrip('berangkat');

        $this->actingAs($this->admin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/tidak-berangkat")
            ->assertStatus(409)
            ->assertJsonPath('error_code', 'TRIP_INVALID_TRANSITION');
    }

    public function test_mark_tidak_berangkat_unauthorized_returns_403(): void
    {
        $trip = $this->makeTrip('scheduled');

        $this->actingAs($this->nonAdmin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/tidak-berangkat")
            ->assertStatus(403);
    }

    // ── markKeluarTrip (4 tests) ───────────────────────────────────────────

    public function test_mark_keluar_trip_happy_path(): void
    {
        $trip = $this->makeTrip('scheduled');

        $response = $this->actingAs($this->admin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/keluar-trip", [
                'reason' => 'dropping',
                'pool_target' => 'ROHUL',
                'note' => 'Penumpang VIP',
            ]);

        $response->assertStatus(200)
            ->assertJsonPath('message', 'Trip marked as keluar trip')
            ->assertJsonPath('trip.status', 'keluar_trip')
            ->assertJsonPath('trip.keluar_trip_substatus', 'out')
            ->assertJsonPath('trip.keluar_trip_reason', 'dropping')
            ->assertJsonPath('trip.keluar_trip_pool_target', 'ROHUL');
    }

    public function test_mark_keluar_trip_invalid_transition_returns_409(): void
    {
        $trip = $this->makeTrip('berangkat');

        $this->actingAs($this->admin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/keluar-trip", [
                'reason' => 'dropping',
                'pool_target' => 'ROHUL',
            ])
            ->assertStatus(409)
            ->assertJsonPath('error_code', 'TRIP_INVALID_TRANSITION');
    }

    public function test_mark_keluar_trip_validation_rejects_missing_reason(): void
    {
        $trip = $this->makeTrip('scheduled');

        $this->actingAs($this->admin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/keluar-trip", [
                'pool_target' => 'ROHUL',
            ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['reason']);
    }

    public function test_mark_keluar_trip_unauthorized_returns_403(): void
    {
        $trip = $this->makeTrip('scheduled');

        $this->actingAs($this->nonAdmin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/keluar-trip", [
                'reason' => 'dropping',
                'pool_target' => 'ROHUL',
            ])
            ->assertStatus(403);
    }

    // ── markWaitingList (3 tests) ──────────────────────────────────────────

    public function test_mark_waiting_list_happy_path(): void
    {
        $trip = $this->makeKeluarTrip('out');

        $this->actingAs($this->admin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/waiting-list")
            ->assertStatus(200)
            ->assertJsonPath('message', 'Trip moved to waiting list')
            ->assertJsonPath('trip.keluar_trip_substatus', 'waiting_list');
    }

    public function test_mark_waiting_list_invalid_transition_returns_409(): void
    {
        $trip = $this->makeTrip('scheduled');

        $this->actingAs($this->admin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/waiting-list")
            ->assertStatus(409)
            ->assertJsonPath('error_code', 'TRIP_INVALID_TRANSITION');
    }

    public function test_mark_waiting_list_unauthorized_returns_403(): void
    {
        $trip = $this->makeKeluarTrip('out');

        $this->actingAs($this->nonAdmin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/waiting-list")
            ->assertStatus(403);
    }

    // ── markReturning (3 tests) ────────────────────────────────────────────

    public function test_mark_returning_happy_path(): void
    {
        $trip = $this->makeKeluarTrip('waiting_list');

        $this->actingAs($this->admin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/returning")
            ->assertStatus(200)
            ->assertJsonPath('message', 'Trip set to returning')
            ->assertJsonPath('trip.keluar_trip_substatus', 'returning');
    }

    public function test_mark_returning_invalid_transition_returns_409(): void
    {
        // keluar_trip:out — bukan waiting_list, harus 409.
        $trip = $this->makeKeluarTrip('out');

        $this->actingAs($this->admin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/returning")
            ->assertStatus(409)
            ->assertJsonPath('error_code', 'TRIP_INVALID_TRANSITION');
    }

    public function test_mark_returning_unauthorized_returns_403(): void
    {
        $trip = $this->makeKeluarTrip('waiting_list');

        $this->actingAs($this->nonAdmin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/returning")
            ->assertStatus(403);
    }

    // ── markTidakKeluarTrip (3 tests) ──────────────────────────────────────

    public function test_mark_tidak_keluar_trip_happy_path(): void
    {
        $trip = $this->makeKeluarTrip('out');

        $this->actingAs($this->admin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/tidak-keluar-trip")
            ->assertStatus(200)
            ->assertJsonPath('message', 'Trip marked as tidak keluar trip')
            ->assertJsonPath('trip.status', 'tidak_keluar_trip');
    }

    public function test_mark_tidak_keluar_trip_invalid_transition_returns_409(): void
    {
        // Sesi 18 tightened: hanya keluar_trip → tidak_keluar_trip. scheduled rejected.
        $trip = $this->makeTrip('scheduled');

        $this->actingAs($this->admin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/tidak-keluar-trip")
            ->assertStatus(409)
            ->assertJsonPath('error_code', 'TRIP_INVALID_TRANSITION');
    }

    public function test_mark_tidak_keluar_trip_unauthorized_returns_403(): void
    {
        $trip = $this->makeKeluarTrip('out');

        $this->actingAs($this->nonAdmin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/tidak-keluar-trip")
            ->assertStatus(403);
    }

    // ── gantiJam (4 tests) ─────────────────────────────────────────────────

    public function test_ganti_jam_happy_path_populates_original_trip_time(): void
    {
        $trip = $this->makeTrip('scheduled', ['trip_time' => '05:30:00']);

        $response = $this->actingAs($this->admin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/ganti-jam", [
                'new_trip_time' => '07:00:00',
            ]);

        $response->assertStatus(200)
            ->assertJsonPath('message', 'Trip time updated')
            ->assertJsonPath('trip.trip_time', '07:00:00')
            ->assertJsonPath('trip.original_trip_time', '05:30:00');
    }

    public function test_ganti_jam_rejects_invalid_time_format(): void
    {
        $trip = $this->makeTrip('scheduled');

        $this->actingAs($this->admin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/ganti-jam", [
                'new_trip_time' => '25:99:00',
            ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['new_trip_time']);
    }

    public function test_ganti_jam_rejects_time_not_in_slot_list(): void
    {
        $trip = $this->makeTrip('scheduled');

        $this->actingAs($this->admin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/ganti-jam", [
                'new_trip_time' => '08:00:00',
            ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['new_trip_time']);
    }

    public function test_ganti_jam_unauthorized_returns_403(): void
    {
        $trip = $this->makeTrip('scheduled');

        $this->actingAs($this->nonAdmin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/ganti-jam", [
                'new_trip_time' => '07:00:00',
            ])
            ->assertStatus(403);
    }

    // ── Compound: full keluar_trip lifecycle end-to-end (1 test) ──────────

    public function test_full_keluar_trip_lifecycle_scheduled_to_returning(): void
    {
        $trip = $this->makeTrip('scheduled');

        // Step 1: scheduled → keluar_trip(out)
        $this->actingAs($this->admin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/keluar-trip", [
                'reason' => 'dropping',
                'pool_target' => 'ROHUL',
            ])
            ->assertStatus(200)
            ->assertJsonPath('trip.status', 'keluar_trip')
            ->assertJsonPath('trip.keluar_trip_substatus', 'out');

        // Step 2: out → waiting_list (auto-sets pool_entered_at)
        $this->actingAs($this->admin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/waiting-list")
            ->assertStatus(200)
            ->assertJsonPath('trip.keluar_trip_substatus', 'waiting_list');

        // Step 3: waiting_list → returning
        $this->actingAs($this->admin)
            ->patchJson("/dashboard/trip-planning/trips/{$trip->id}/returning")
            ->assertStatus(200)
            ->assertJsonPath('trip.keluar_trip_substatus', 'returning');
    }
}
