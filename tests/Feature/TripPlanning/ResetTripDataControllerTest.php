<?php

namespace Tests\Feature\TripPlanning;

use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use App\Models\TripDataResetLog;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

/**
 * Feature test untuk ResetTripDataController (Feature E5 PR #5).
 *
 * Coverage: route → controller → service via HTTP, termasuk middleware
 * (jwt.auth + admin.role:admin atau :super), FormRequest validation,
 * audit log creation.
 */
class ResetTripDataControllerTest extends TestCase
{
    use RefreshDatabase;

    private const TODAY = '2026-04-26';

    protected User $admin;
    protected User $superAdmin;
    protected User $nonAdmin;
    protected Mobil $mobil;
    protected Driver $driver;

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow(self::TODAY.' 09:00:00');

        $this->admin = User::factory()->create(['role' => 'Admin']);
        $this->superAdmin = User::factory()->create(['role' => 'Super Admin']);
        $this->nonAdmin = User::factory()->create(['role' => 'User']);
        $this->mobil = Mobil::factory()->create();
        $this->driver = Driver::factory()->create();
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    private function makeScheduledTrip(string $date = self::TODAY): Trip
    {
        return Trip::factory()->create([
            'trip_date' => $date,
            'trip_time' => '07:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence' => 1,
            'mobil_id' => $this->mobil->id,
            'driver_id' => $this->driver->id,
            'status' => 'scheduled',
        ]);
    }

    public function test_unauthenticated_user_gets_401_for_reset_today(): void
    {
        $this->postJson('/api/trip-planning/reset/today', ['date' => self::TODAY])
            ->assertStatus(401);
    }

    public function test_non_admin_gets_403_for_reset_today(): void
    {
        $this->actingAs($this->nonAdmin)
            ->postJson('/api/trip-planning/reset/today', ['date' => self::TODAY])
            ->assertStatus(403);
    }

    public function test_admin_can_reset_today_with_200(): void
    {
        $trip = $this->makeScheduledTrip();

        $this->actingAs($this->admin)
            ->postJson('/api/trip-planning/reset/today', ['date' => self::TODAY])
            ->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('summary.trips_deleted', 1);

        $this->assertDatabaseMissing('trips', ['id' => $trip->id]);
    }

    public function test_admin_gets_403_for_reset_all(): void
    {
        // Admin biasa TIDAK boleh reset all (super only).
        $this->actingAs($this->admin)
            ->postJson('/api/trip-planning/reset/all')
            ->assertStatus(403);
    }

    public function test_super_admin_can_reset_all_with_200(): void
    {
        $trip = $this->makeScheduledTrip();

        $this->actingAs($this->superAdmin)
            ->postJson('/api/trip-planning/reset/all')
            ->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('summary.trips_deleted', 1);

        $this->assertDatabaseMissing('trips', ['id' => $trip->id]);

        // Audit log scope=all dengan snapshot non-null.
        $log = TripDataResetLog::query()->where('scope', 'all')->latest()->first();
        $this->assertNotNull($log);
        $this->assertNotNull($log->snapshot);
    }

    public function test_reset_today_validates_date_format_422(): void
    {
        $this->actingAs($this->admin)
            ->postJson('/api/trip-planning/reset/today', ['date' => 'not-a-date'])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['date']);
    }

    public function test_reset_today_creates_audit_log_with_correct_summary(): void
    {
        $this->makeScheduledTrip();

        $this->actingAs($this->admin)
            ->postJson('/api/trip-planning/reset/today', ['date' => self::TODAY])
            ->assertStatus(200);

        $log = TripDataResetLog::query()->latest()->first();
        $this->assertNotNull($log);
        $this->assertSame('today', $log->scope);
        $this->assertSame(self::TODAY, $log->target_date->toDateString());
        $this->assertSame($this->admin->id, $log->user_id);
        $this->assertNull($log->snapshot, 'Reset Hari Ini lightweight — no snapshot');
        $this->assertSame(1, $log->summary['trips_deleted']);
        $this->assertArrayHasKey('assignments_pins_cleared', $log->summary);
        $this->assertArrayHasKey('keuangan_jet_deleted', $log->summary);
        $this->assertArrayHasKey('keuangan_jet_siklus_deleted', $log->summary);
        $this->assertArrayHasKey('bookings_unlinked', $log->summary);
    }
}
