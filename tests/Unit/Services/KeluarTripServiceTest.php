<?php

namespace Tests\Unit\Services;

use App\Exceptions\TripInvalidTransitionException;
use App\Exceptions\TripVersionConflictException;
use App\Models\Trip;
use App\Services\KeluarTripService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

/**
 * Test coverage KeluarTripService (Sesi 18 Fase C3).
 *
 * Reference: docs/trip-planning-design.md §5.5.
 *
 * Note: Trip::factory()->create()->refresh() pattern — version hydrate dari DB
 * (lesson Sesi 17).
 */
class KeluarTripServiceTest extends TestCase
{
    use RefreshDatabase;

    protected KeluarTripService $svc;

    private const TRIP_DATE = '2026-04-22';
    private const FIXED_NOW = '2026-04-21 14:00:00';
    private const FIXED_TODAY = '2026-04-21';

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow(self::FIXED_NOW);
        $this->svc = $this->app->make(KeluarTripService::class);
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    // ── Group 1: markKeluarTrip happy paths ─────────────────────────────────

    public function test_markKeluarTrip_dropping_transitions_scheduled_to_out_without_planned_end_date(): void
    {
        $trip = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $result = $this->svc->markKeluarTrip($trip->id, $trip->version, [
            'reason'      => 'dropping',
            'pool_target' => 'ROHUL',
            'note'        => 'Ke Duri',
        ]);

        $this->assertSame('keluar_trip', $result->status);
        $this->assertSame('out', $result->keluar_trip_substatus);
        $this->assertSame('dropping', $result->keluar_trip_reason);
        $this->assertSame('Ke Duri', $result->keluar_trip_note);
        $this->assertSame('ROHUL', $result->keluar_trip_pool_target);
        $this->assertSame(self::FIXED_TODAY, $result->keluar_trip_start_date->toDateString());
        $this->assertNull($result->keluar_trip_planned_end_date);
    }

    public function test_markKeluarTrip_rental_transitions_scheduled_to_out_with_planned_end_date(): void
    {
        $trip = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $result = $this->svc->markKeluarTrip($trip->id, $trip->version, [
            'reason'           => 'rental',
            'pool_target'      => 'PKB',
            'planned_end_date' => '2026-04-24',
        ]);

        $this->assertSame('keluar_trip', $result->status);
        $this->assertSame('out', $result->keluar_trip_substatus);
        $this->assertSame('rental', $result->keluar_trip_reason);
        $this->assertSame('2026-04-24', $result->keluar_trip_planned_end_date->toDateString());
    }

    public function test_markKeluarTrip_sets_start_date_to_today(): void
    {
        $trip = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $result = $this->svc->markKeluarTrip($trip->id, $trip->version, [
            'reason'      => 'dropping',
            'pool_target' => 'PKB',
        ]);

        $this->assertSame(self::FIXED_TODAY, $result->keluar_trip_start_date->toDateString());
    }

    // ── Group 2: markKeluarTrip validation errors ───────────────────────────

    public function test_markKeluarTrip_throws_when_status_not_scheduled(): void
    {
        $trip = Trip::factory()->berangkat()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $this->expectException(TripInvalidTransitionException::class);
        $this->svc->markKeluarTrip($trip->id, $trip->version, [
            'reason'      => 'dropping',
            'pool_target' => 'PKB',
        ]);
    }

    public function test_markKeluarTrip_throws_when_reason_is_other(): void
    {
        $trip = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $this->expectException(TripInvalidTransitionException::class);
        $this->expectExceptionMessage('dropping|rental');
        $this->svc->markKeluarTrip($trip->id, $trip->version, [
            'reason'      => 'other',
            'pool_target' => 'PKB',
        ]);
    }

    public function test_markKeluarTrip_throws_when_reason_is_invalid(): void
    {
        $trip = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $this->expectException(TripInvalidTransitionException::class);
        $this->svc->markKeluarTrip($trip->id, $trip->version, [
            'reason'      => 'invalid_value',
            'pool_target' => 'PKB',
        ]);
    }

    public function test_markKeluarTrip_throws_when_pool_target_invalid(): void
    {
        $trip = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $this->expectException(TripInvalidTransitionException::class);
        $this->svc->markKeluarTrip($trip->id, $trip->version, [
            'reason'      => 'dropping',
            'pool_target' => 'INVALID',
        ]);
    }

    public function test_markKeluarTrip_throws_when_rental_without_planned_end_date(): void
    {
        $trip = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $this->expectException(TripInvalidTransitionException::class);
        $this->expectExceptionMessage('rental wajib punya planned_end_date');
        $this->svc->markKeluarTrip($trip->id, $trip->version, [
            'reason'      => 'rental',
            'pool_target' => 'PKB',
        ]);
    }

    // ── Group 3: markWaitingList ────────────────────────────────────────────

    public function test_markWaitingList_transitions_out_to_waiting_list_and_sets_pool_entered_at(): void
    {
        $trip = Trip::factory()->keluarTrip('out', 'PKB')->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $result = $this->svc->markWaitingList($trip->id, $trip->version);

        $this->assertSame('waiting_list', $result->keluar_trip_substatus);
        $this->assertNotNull($result->keluar_trip_pool_entered_at);
        $this->assertSame(self::FIXED_NOW, $result->keluar_trip_pool_entered_at->toDateTimeString());
    }

    public function test_markWaitingList_throws_when_status_not_keluar_trip(): void
    {
        $trip = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $this->expectException(TripInvalidTransitionException::class);
        $this->svc->markWaitingList($trip->id, $trip->version);
    }

    public function test_markWaitingList_throws_when_substatus_not_out(): void
    {
        $trip = Trip::factory()->keluarTrip('returning', 'PKB')->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $this->expectException(TripInvalidTransitionException::class);
        $this->expectExceptionMessage('harus berstatus keluar_trip dengan sub-status out');
        $this->svc->markWaitingList($trip->id, $trip->version);
    }

    public function test_markWaitingList_throws_on_version_mismatch(): void
    {
        $trip = Trip::factory()->keluarTrip('out', 'PKB')->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $this->expectException(TripVersionConflictException::class);
        $this->svc->markWaitingList($trip->id, $trip->version + 99);
    }

    // ── Group 4: markReturning ──────────────────────────────────────────────

    public function test_markReturning_transitions_waiting_list_to_returning(): void
    {
        $trip = Trip::factory()->keluarTrip('waiting_list', 'PKB')->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $result = $this->svc->markReturning($trip->id, $trip->version);

        $this->assertSame('returning', $result->keluar_trip_substatus);
    }

    public function test_markReturning_does_not_set_actual_end_date(): void
    {
        $trip = Trip::factory()->keluarTrip('waiting_list', 'PKB')->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $result = $this->svc->markReturning($trip->id, $trip->version);

        // DP-4: actual end derived from pool_entered_at, not set here.
        $this->assertNull($result->keluar_trip_actual_end_date);
    }

    public function test_markReturning_throws_when_substatus_not_waiting_list(): void
    {
        $trip = Trip::factory()->keluarTrip('out', 'PKB')->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $this->expectException(TripInvalidTransitionException::class);
        $this->svc->markReturning($trip->id, $trip->version);
    }

    public function test_markReturning_throws_when_status_not_keluar_trip(): void
    {
        $trip = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $this->expectException(TripInvalidTransitionException::class);
        $this->svc->markReturning($trip->id, $trip->version);
    }

    // ── Group 5: Integration — Full Lifecycle ───────────────────────────────

    public function test_full_lifecycle_scheduled_to_returning_then_ready_for_generation(): void
    {
        $trip = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        // scheduled → keluar_trip(out)
        $trip = $this->svc->markKeluarTrip($trip->id, $trip->version, [
            'reason'      => 'dropping',
            'pool_target' => 'ROHUL',
            'note'        => 'Ke Duri',
        ]);
        $this->assertSame('keluar_trip', $trip->status);
        $this->assertSame('out', $trip->keluar_trip_substatus);

        // out → waiting_list (auto pool_entered_at)
        $trip = $this->svc->markWaitingList($trip->id, $trip->version);
        $this->assertSame('waiting_list', $trip->keluar_trip_substatus);
        $this->assertNotNull($trip->keluar_trip_pool_entered_at);

        // waiting_list → returning
        $trip = $this->svc->markReturning($trip->id, $trip->version);

        // Final state verification.
        $this->assertSame('keluar_trip', $trip->status);
        $this->assertSame('returning', $trip->keluar_trip_substatus);
        $this->assertNotNull($trip->keluar_trip_pool_entered_at);
        $this->assertNull($trip->keluar_trip_actual_end_date, 'DP-4: actual_end_date NOT set by markReturning');
        $this->assertSame(self::FIXED_TODAY, $trip->keluar_trip_start_date->toDateString());
        $this->assertSame('dropping', $trip->keluar_trip_reason);
    }

    // ── Group 6: Edge ───────────────────────────────────────────────────────

    public function test_markKeluarTrip_throws_model_not_found_for_nonexistent_trip(): void
    {
        $this->expectException(ModelNotFoundException::class);
        $this->svc->markKeluarTrip(999999, 0, [
            'reason'      => 'dropping',
            'pool_target' => 'PKB',
        ]);
    }
}
