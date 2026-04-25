<?php

namespace Tests\Unit\Services;

use App\Exceptions\TripEditNotAllowedException;
use App\Exceptions\TripSlotConflictException;
use App\Exceptions\TripVersionConflictException;
use App\Models\Booking;
use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use App\Models\User;
use App\Services\TripCrudService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

/**
 * Test coverage TripCrudService (Feature E5 PR #1).
 *
 * Wrapper service di atas TripService — fokus test:
 *   - createManual auto-sequence + delegasi ke TripService::insertManual
 *   - editManual status guard (UNEDITABLE_STATUSES) + invariant pre-check + version
 *   - countLinkedBookings
 *
 * Logic invariant inti (assertSlotAvailable, assertMobilNotDoubleAssigned,
 * updateWithVersionCheck) sudah dicover di TripServiceTest — di sini cukup
 * verifikasi delegasi & wrapper-specific behaviour.
 */
class TripCrudServiceTest extends TestCase
{
    use RefreshDatabase;

    protected TripCrudService $svc;
    protected User $admin;
    protected Mobil $mobil;
    protected Mobil $mobil2;
    protected Driver $driver;
    protected Driver $driver2;

    private const TRIP_DATE = '2026-04-22';

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow('2026-04-21 14:00:00');
        $this->svc = $this->app->make(TripCrudService::class);
        $this->admin = User::factory()->create(['role' => 'Admin']);
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
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '07:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'mobil_id' => $this->mobil->id,
            'driver_id' => $this->driver->id,
        ], $overrides);
    }

    // ── createManual ────────────────────────────────────────────────────────

    public function test_create_manual_assigns_next_sequence_when_not_provided(): void
    {
        // Seed 1 trip existing dengan sequence=1 → next harus 2.
        Trip::factory()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence' => 1,
            'mobil_id' => $this->mobil2->id,
            'driver_id' => $this->driver2->id,
            'status' => 'scheduled',
        ]);

        $trip = $this->svc->createManual($this->basePayload(), $this->admin->id);

        $this->assertSame(2, $trip->sequence);
        $this->assertSame($this->admin->id, $trip->created_by);
        $this->assertSame($this->admin->id, $trip->updated_by);
        $this->assertSame('scheduled', $trip->status);
    }

    public function test_create_manual_uses_provided_sequence_when_given(): void
    {
        $trip = $this->svc->createManual(
            $this->basePayload(['sequence' => 7]),
            $this->admin->id,
        );

        $this->assertSame(7, $trip->sequence);
    }

    public function test_create_manual_throws_slot_conflict_when_slot_occupied(): void
    {
        // Seed trip di slot yang sama → insertManual harus throw.
        Trip::factory()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '07:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence' => 1,
            'mobil_id' => $this->mobil2->id,
            'driver_id' => $this->driver2->id,
            'status' => 'scheduled',
        ]);

        $this->expectException(TripSlotConflictException::class);
        $this->svc->createManual($this->basePayload(), $this->admin->id);
    }

    public function test_create_manual_throws_mobil_conflict_when_mobil_double_assigned(): void
    {
        // Mobil sudah ada di tanggal+arah yang sama (jam beda) → harus throw.
        Trip::factory()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence' => 1,
            'mobil_id' => $this->mobil->id,
            'driver_id' => $this->driver->id,
            'status' => 'scheduled',
        ]);

        try {
            $this->svc->createManual($this->basePayload(), $this->admin->id);
            $this->fail('Expected TripSlotConflictException with conflictType=mobil');
        } catch (TripSlotConflictException $e) {
            $this->assertSame('mobil', $e->conflictType);
        }
    }

    // ── editManual ──────────────────────────────────────────────────────────

    public function test_edit_manual_succeeds_with_correct_version_and_increments_version(): void
    {
        $trip = $this->svc->createManual($this->basePayload(), $this->admin->id);
        $this->assertSame(0, $trip->version);

        $updated = $this->svc->editManual(
            tripId: $trip->id,
            expectedVersion: 0,
            payload: ['trip_time' => '08:00:00'],
            userId: $this->admin->id,
        );

        $this->assertSame('08:00:00', $updated->trip_time);
        $this->assertSame(1, $updated->version);
        $this->assertSame($this->admin->id, $updated->updated_by);
    }

    public function test_edit_manual_throws_version_conflict_when_stale(): void
    {
        $trip = $this->svc->createManual($this->basePayload(), $this->admin->id);

        $this->expectException(TripVersionConflictException::class);
        $this->svc->editManual(
            tripId: $trip->id,
            expectedVersion: 99,
            payload: ['trip_time' => '08:00:00'],
            userId: $this->admin->id,
        );
    }

    public function test_edit_manual_throws_edit_not_allowed_when_status_berangkat(): void
    {
        $trip = Trip::factory()->berangkat()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '07:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence' => 1,
            'mobil_id' => $this->mobil->id,
            'driver_id' => $this->driver->id,
        ]);

        try {
            $this->svc->editManual(
                tripId: $trip->id,
                expectedVersion: 0,
                payload: ['trip_time' => '08:00:00'],
                userId: $this->admin->id,
            );
            $this->fail('Expected TripEditNotAllowedException');
        } catch (TripEditNotAllowedException $e) {
            $this->assertSame($trip->id, $e->tripId);
            $this->assertSame('berangkat', $e->currentStatus);
        }
    }

    public function test_edit_manual_throws_edit_not_allowed_when_status_keluar_trip(): void
    {
        $trip = Trip::factory()->keluarTrip('out', 'ROHUL')->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '07:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence' => 1,
            'mobil_id' => $this->mobil->id,
            'driver_id' => $this->driver->id,
        ]);

        $this->expectException(TripEditNotAllowedException::class);
        $this->svc->editManual(
            tripId: $trip->id,
            expectedVersion: 0,
            payload: ['trip_time' => '08:00:00'],
            userId: $this->admin->id,
        );
    }

    public function test_edit_manual_validates_slot_invariant_when_slot_changed(): void
    {
        // Trip A di slot 07:00:00.
        $tripA = $this->svc->createManual($this->basePayload(), $this->admin->id);

        // Trip B di slot 08:00:00 (mobil2).
        $this->svc->createManual($this->basePayload([
            'trip_time' => '08:00:00',
            'mobil_id' => $this->mobil2->id,
            'driver_id' => $this->driver2->id,
        ]), $this->admin->id);

        // Edit trip A pindah ke slot 08:00:00 → conflict dengan trip B.
        try {
            $this->svc->editManual(
                tripId: $tripA->id,
                expectedVersion: 0,
                payload: ['trip_time' => '08:00:00'],
                userId: $this->admin->id,
            );
            $this->fail('Expected TripSlotConflictException slot');
        } catch (TripSlotConflictException $e) {
            $this->assertSame('slot', $e->conflictType);
        }
    }

    // ── countLinkedBookings ─────────────────────────────────────────────────

    public function test_count_linked_bookings_returns_correct_count(): void
    {
        $trip = $this->svc->createManual($this->basePayload(), $this->admin->id);

        $this->assertSame(0, $this->svc->countLinkedBookings($trip->id));

        Booking::factory()->count(3)->create(['trip_id' => $trip->id]);

        $this->assertSame(3, $this->svc->countLinkedBookings($trip->id));
    }
}
