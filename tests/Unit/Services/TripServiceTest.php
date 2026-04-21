<?php

namespace Tests\Unit\Services;

use App\Exceptions\TripDeleteNotAllowedException;
use App\Exceptions\TripSlotConflictException;
use App\Exceptions\TripVersionConflictException;
use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use App\Models\User;
use App\Services\TripService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Test coverage TripService (Sesi 13 Fase B).
 *
 * 6 group, 18 test:
 *   - updateWithVersionCheck (4)
 *   - assertSlotAvailable (5)
 *   - assertMobilNotDoubleAssigned (2)
 *   - insertManual (2)
 *   - delete + recompaction (3)
 *   - swap (2)
 *
 * DB: hitungan_lkt_test via .env.testing. RefreshDatabase migrate:fresh 1x
 * per test run, each test wrap transaction auto-rollback.
 *
 * Reference: docs/trip-planning-design.md §3.4 (invariants), §5.2 (spec).
 */
class TripServiceTest extends TestCase
{
    use RefreshDatabase;

    protected TripService $svc;
    protected User $admin;
    protected Mobil $mobil;
    protected Mobil $mobil2;
    protected Driver $driver;
    protected Driver $driver2;

    protected function setUp(): void
    {
        parent::setUp();
        $this->svc = $this->app->make(TripService::class);
        $this->admin = User::factory()->create(['role' => 'Super Admin']);
        $this->mobil = Mobil::factory()->create();
        $this->mobil2 = Mobil::factory()->create();
        $this->driver = Driver::factory()->create();
        $this->driver2 = Driver::factory()->create();
    }

    /**
     * Default field set untuk trip — override via $overrides.
     *
     * @return array<string, mixed>
     */
    protected function makeTripFields(array $overrides = []): array
    {
        return array_merge([
            'trip_date' => '2026-04-22',
            'trip_time' => '07:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence' => 1,
            'mobil_id' => $this->mobil->id,
            'driver_id' => $this->driver->id,
            'created_by' => $this->admin->id,
        ], $overrides);
    }

    // ── Group 1: updateWithVersionCheck ─────────────────────────────────────

    public function test_update_with_version_check_succeeds_with_matching_version(): void
    {
        $trip = $this->svc->insertManual($this->makeTripFields());
        $this->assertSame(0, $trip->version);

        $updated = $this->svc->updateWithVersionCheck(
            tripId: $trip->id,
            expectedVersion: 0,
            fields: ['trip_time' => '08:00:00', 'updated_by' => $this->admin->id],
        );

        $this->assertSame(1, $updated->version);
        $this->assertSame('08:00:00', $updated->trip_time);
    }

    public function test_update_with_version_check_throws_on_stale_version(): void
    {
        $trip = $this->svc->insertManual($this->makeTripFields());

        try {
            $this->svc->updateWithVersionCheck(
                tripId: $trip->id,
                expectedVersion: 99,
                fields: ['trip_time' => '09:00:00'],
            );
            $this->fail('Expected TripVersionConflictException');
        } catch (TripVersionConflictException $e) {
            $this->assertSame($trip->id, $e->tripId);
            $this->assertSame(99, $e->expectedVersion);
            $this->assertSame(0, $e->currentVersion);
        }
    }

    public function test_update_with_version_check_increments_version(): void
    {
        $trip = $this->svc->insertManual($this->makeTripFields());

        $first = $this->svc->updateWithVersionCheck($trip->id, 0, ['sequence' => 5]);
        $this->assertSame(1, $first->version);

        $second = $this->svc->updateWithVersionCheck($trip->id, 1, ['sequence' => 9]);
        $this->assertSame(2, $second->version);
        $this->assertSame(9, $second->sequence);
    }

    public function test_update_with_version_check_with_empty_attributes_bumps_version_only(): void
    {
        $trip = $this->svc->insertManual($this->makeTripFields());
        $originalTime = $trip->trip_time;

        $updated = $this->svc->updateWithVersionCheck($trip->id, 0, []);

        $this->assertSame(1, $updated->version);
        $this->assertSame($originalTime, $updated->trip_time);
    }

    // ── Group 2: assertSlotAvailable (Invariant I1) ─────────────────────────

    public function test_assert_slot_available_passes_when_slot_empty(): void
    {
        \DB::transaction(function (): void {
            $this->svc->assertSlotAvailable('2026-04-22', '07:00:00', 'PKB_TO_ROHUL');
        });

        // Assertion lulus = tidak throw.
        $this->assertTrue(true);
    }

    public function test_assert_slot_available_throws_when_slot_taken_by_scheduled(): void
    {
        $this->svc->insertManual($this->makeTripFields());

        try {
            \DB::transaction(function (): void {
                $this->svc->assertSlotAvailable('2026-04-22', '07:00:00', 'PKB_TO_ROHUL');
            });
            $this->fail('Expected TripSlotConflictException');
        } catch (TripSlotConflictException $e) {
            $this->assertSame('slot', $e->conflictType);
            $this->assertSame('2026-04-22', $e->tripDate);
            $this->assertSame('07:00:00', $e->tripTime);
            $this->assertSame('PKB_TO_ROHUL', $e->direction);
        }
    }

    public function test_assert_slot_available_passes_when_slot_taken_by_tidak_berangkat(): void
    {
        // DP-6: tidak_berangkat status dianggap "freed" — slot boleh re-insert.
        $trip = $this->svc->insertManual($this->makeTripFields());
        Trip::query()->whereKey($trip->id)->update(['status' => 'tidak_berangkat']);

        \DB::transaction(function (): void {
            $this->svc->assertSlotAvailable('2026-04-22', '07:00:00', 'PKB_TO_ROHUL');
        });

        $this->assertTrue(true);
    }

    public function test_assert_slot_available_passes_when_slot_taken_by_tidak_keluar_trip(): void
    {
        // DP-6: tidak_keluar_trip status juga freed.
        $trip = $this->svc->insertManual($this->makeTripFields());
        Trip::query()->whereKey($trip->id)->update(['status' => 'tidak_keluar_trip']);

        \DB::transaction(function (): void {
            $this->svc->assertSlotAvailable('2026-04-22', '07:00:00', 'PKB_TO_ROHUL');
        });

        $this->assertTrue(true);
    }

    public function test_assert_slot_available_excludes_self_via_exclude_trip_id(): void
    {
        $trip = $this->svc->insertManual($this->makeTripFields());

        // Cek slot yang sama, tapi exclude trip diri sendiri — harus lulus.
        \DB::transaction(function () use ($trip): void {
            $this->svc->assertSlotAvailable(
                '2026-04-22',
                '07:00:00',
                'PKB_TO_ROHUL',
                excludeTripId: $trip->id,
            );
        });

        $this->assertTrue(true);
    }

    // ── Group 3: assertMobilNotDoubleAssigned (Invariant I2) ────────────────

    public function test_assert_mobil_passes_when_mobil_in_different_direction(): void
    {
        // Mobil sama, tanggal sama, tapi direction beda → tidak conflict.
        $this->svc->insertManual($this->makeTripFields([
            'direction' => 'PKB_TO_ROHUL',
        ]));

        \DB::transaction(function (): void {
            $this->svc->assertMobilNotDoubleAssigned(
                mobilId: $this->mobil->id,
                tripDate: '2026-04-22',
                direction: 'ROHUL_TO_PKB',
            );
        });

        $this->assertTrue(true);
    }

    public function test_assert_mobil_throws_when_mobil_already_assigned_same_direction(): void
    {
        $this->svc->insertManual($this->makeTripFields());

        try {
            \DB::transaction(function (): void {
                $this->svc->assertMobilNotDoubleAssigned(
                    mobilId: $this->mobil->id,
                    tripDate: '2026-04-22',
                    direction: 'PKB_TO_ROHUL',
                );
            });
            $this->fail('Expected TripSlotConflictException');
        } catch (TripSlotConflictException $e) {
            $this->assertSame('mobil', $e->conflictType);
            $this->assertSame($this->mobil->id, $e->mobilId);
            $this->assertSame('2026-04-22', $e->tripDate);
            $this->assertSame('PKB_TO_ROHUL', $e->direction);
            // tripTime placeholder '00:00:00' karena tidak relevant untuk mobil conflict.
            $this->assertSame('00:00:00', $e->tripTime);
        }
    }

    // ── Group 4: insertManual ───────────────────────────────────────────────

    public function test_insert_manual_creates_with_default_status_and_version(): void
    {
        $trip = $this->svc->insertManual($this->makeTripFields());

        $this->assertSame('scheduled', $trip->status);
        $this->assertSame(0, $trip->version);
        $this->assertSame($this->mobil->id, $trip->mobil_id);
        $this->assertSame($this->driver->id, $trip->driver_id);
        $this->assertSame(1, $trip->sequence);
    }

    public function test_insert_manual_throws_on_slot_conflict(): void
    {
        $this->svc->insertManual($this->makeTripFields());

        try {
            $this->svc->insertManual($this->makeTripFields([
                'mobil_id' => $this->mobil2->id,
                'driver_id' => $this->driver2->id,
                'sequence' => 2,
            ]));
            $this->fail('Expected TripSlotConflictException');
        } catch (TripSlotConflictException $e) {
            $this->assertSame('slot', $e->conflictType);
        }

        // Rollback: hanya 1 trip tersisa (yang pertama).
        $this->assertSame(1, Trip::query()->count());
    }

    // ── Group 5: delete + recompaction ──────────────────────────────────────

    public function test_delete_removes_trip_and_recompacts_sequence(): void
    {
        $trip1 = $this->svc->insertManual($this->makeTripFields([
            'trip_time' => '07:00:00',
            'sequence' => 1,
        ]));
        $trip2 = $this->svc->insertManual($this->makeTripFields([
            'trip_time' => '08:00:00',
            'sequence' => 2,
            'mobil_id' => $this->mobil2->id,
            'driver_id' => $this->driver2->id,
        ]));
        $mobil3 = Mobil::factory()->create();
        $driver3 = Driver::factory()->create();
        $trip3 = $this->svc->insertManual($this->makeTripFields([
            'trip_time' => '09:00:00',
            'sequence' => 3,
            'mobil_id' => $mobil3->id,
            'driver_id' => $driver3->id,
        ]));

        // Delete middle trip (sequence=2).
        $this->svc->delete($trip2->id, $trip2->version);

        // Verify: trip1 tetap seq=1, trip3 re-compacted ke seq=2 (bukan 3).
        $this->assertNull(Trip::query()->find($trip2->id));
        $this->assertSame(1, Trip::query()->find($trip1->id)->sequence);
        $this->assertSame(2, Trip::query()->find($trip3->id)->sequence);
    }

    public function test_delete_throws_when_status_berangkat(): void
    {
        $trip = $this->svc->insertManual($this->makeTripFields());
        Trip::query()->whereKey($trip->id)->update(['status' => 'berangkat']);

        try {
            $this->svc->delete($trip->id, 0);
            $this->fail('Expected TripDeleteNotAllowedException');
        } catch (TripDeleteNotAllowedException $e) {
            $this->assertSame($trip->id, $e->tripId);
            $this->assertSame('berangkat', $e->currentStatus);
            $this->assertStringContainsString('berangkat', $e->reason);
        }

        // Trip masih ada.
        $this->assertNotNull(Trip::query()->find($trip->id));
    }

    public function test_delete_throws_on_stale_version(): void
    {
        $trip = $this->svc->insertManual($this->makeTripFields());

        try {
            $this->svc->delete($trip->id, 99);
            $this->fail('Expected TripVersionConflictException');
        } catch (TripVersionConflictException $e) {
            $this->assertSame($trip->id, $e->tripId);
            $this->assertSame(99, $e->expectedVersion);
            $this->assertSame(0, $e->currentVersion);
        }

        $this->assertNotNull(Trip::query()->find($trip->id));
    }

    // ── Group 6: swap ───────────────────────────────────────────────────────

    public function test_swap_exchanges_mobil_and_driver_atomically(): void
    {
        $tripA = $this->svc->insertManual($this->makeTripFields([
            'trip_time' => '07:00:00',
            'sequence' => 1,
            'mobil_id' => $this->mobil->id,
            'driver_id' => $this->driver->id,
        ]));
        $tripB = $this->svc->insertManual($this->makeTripFields([
            'trip_time' => '08:00:00',
            'sequence' => 2,
            'mobil_id' => $this->mobil2->id,
            'driver_id' => $this->driver2->id,
        ]));

        $this->svc->swap($tripA->id, $tripB->id, $tripA->version, $tripB->version);

        $freshA = Trip::query()->find($tripA->id);
        $freshB = Trip::query()->find($tripB->id);

        // Mobil + driver swapped.
        $this->assertSame($this->mobil2->id, $freshA->mobil_id);
        $this->assertSame($this->driver2->id, $freshA->driver_id);
        $this->assertSame($this->mobil->id, $freshB->mobil_id);
        $this->assertSame($this->driver->id, $freshB->driver_id);

        // Slot tetap — trip_time + sequence tidak berubah.
        $this->assertSame('07:00:00', $freshA->trip_time);
        $this->assertSame(1, $freshA->sequence);
        $this->assertSame('08:00:00', $freshB->trip_time);
        $this->assertSame(2, $freshB->sequence);

        // Version kedua +1.
        $this->assertSame(1, $freshA->version);
        $this->assertSame(1, $freshB->version);
    }

    public function test_swap_throws_on_stale_version_either_side(): void
    {
        $tripA = $this->svc->insertManual($this->makeTripFields([
            'trip_time' => '07:00:00',
            'sequence' => 1,
        ]));
        $tripB = $this->svc->insertManual($this->makeTripFields([
            'trip_time' => '08:00:00',
            'sequence' => 2,
            'mobil_id' => $this->mobil2->id,
            'driver_id' => $this->driver2->id,
        ]));

        // Case A stale: version A salah, B benar.
        try {
            $this->svc->swap($tripA->id, $tripB->id, 99, $tripB->version);
            $this->fail('Expected TripVersionConflictException for stale A');
        } catch (TripVersionConflictException $e) {
            $this->assertSame($tripA->id, $e->tripId);
            $this->assertSame(99, $e->expectedVersion);
        }

        // Case B stale: version A benar, B salah.
        try {
            $this->svc->swap($tripA->id, $tripB->id, $tripA->version, 88);
            $this->fail('Expected TripVersionConflictException for stale B');
        } catch (TripVersionConflictException $e) {
            $this->assertSame($tripB->id, $e->tripId);
            $this->assertSame(88, $e->expectedVersion);
        }

        // Tidak ada swap yang terjadi.
        $freshA = Trip::query()->find($tripA->id);
        $freshB = Trip::query()->find($tripB->id);
        $this->assertSame($this->mobil->id, $freshA->mobil_id);
        $this->assertSame($this->mobil2->id, $freshB->mobil_id);
        $this->assertSame(0, $freshA->version);
        $this->assertSame(0, $freshB->version);
    }
}
