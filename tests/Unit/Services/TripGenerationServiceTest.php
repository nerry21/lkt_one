<?php

namespace Tests\Unit\Services;

use App\Exceptions\TripGenerationDriverMissingException;
use App\Exceptions\TripSlotConflictException;
use App\Models\DailyAssignmentPin;
use App\Models\DailyDriverAssignment;
use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use App\Services\TripGenerationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

/**
 * Test coverage TripGenerationService (Sesi 16 Fase C1).
 *
 * Reference: docs/trip-planning-design.md §5.3 (TripGenerationService spec).
 */
class TripGenerationServiceTest extends TestCase
{
    use RefreshDatabase;

    protected TripGenerationService $svc;

    private const TRIP_DATE = '2026-04-22';
    private const YESTERDAY = '2026-04-21';

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow('2026-04-21 14:00:00');
        $this->svc = $this->app->make(TripGenerationService::class);
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    // ── Group 1: sizing scenarios ───────────────────────────────────────────

    public function test_empty_pool_creates_no_trips(): void
    {
        $result = $this->svc->generateForDate(self::TRIP_DATE, []);

        $this->assertCount(2, $result);

        foreach ($result as $direction) {
            $this->assertSame(0, $direction['slots_filled']);
            $this->assertSame(0, $direction['waiting_list_count']);
            $this->assertSame([], $direction['trip_ids']);
        }

        $this->assertSame(0, Trip::query()->count());
    }

    public function test_pool_below_slot_count_fills_only_available_slots(): void
    {
        $mobils = [];
        $drivers = [];
        for ($i = 0; $i < 3; $i++) {
            $mobils[] = Mobil::factory()->create(['home_pool' => 'PKB']);
            $drivers[] = Driver::factory()->create();
        }

        $mapping = [
            $mobils[0]->id => $drivers[0]->id,
            $mobils[1]->id => $drivers[1]->id,
            $mobils[2]->id => $drivers[2]->id,
        ];

        $result = $this->svc->generateForDate(self::TRIP_DATE, $mapping);

        $pkb = $this->findDirectionResult($result, 'PKB_TO_ROHUL');
        $this->assertSame(3, $pkb['slots_filled']);
        $this->assertSame(0, $pkb['waiting_list_count']);
        $this->assertCount(3, $pkb['trip_ids']);

        $rohul = $this->findDirectionResult($result, 'ROHUL_TO_PKB');
        $this->assertSame(0, $rohul['slots_filled']);
        $this->assertSame(0, $rohul['waiting_list_count']);

        $tripsByseq = Trip::query()
            ->where('trip_date', self::TRIP_DATE)
            ->where('direction', 'PKB_TO_ROHUL')
            ->orderBy('sequence')
            ->get();

        $this->assertSame('05:30:00', $tripsByseq[0]->trip_time);
        $this->assertSame('07:00:00', $tripsByseq[1]->trip_time);
        $this->assertSame('09:00:00', $tripsByseq[2]->trip_time);
        $this->assertSame(1, $tripsByseq[0]->sequence);
        $this->assertSame(2, $tripsByseq[1]->sequence);
        $this->assertSame(3, $tripsByseq[2]->sequence);
    }

    public function test_pool_exact_slot_count_fills_all_slots(): void
    {
        $mapping = [];
        for ($i = 0; $i < 6; $i++) {
            $mobil = Mobil::factory()->create(['home_pool' => 'PKB']);
            $driver = Driver::factory()->create();
            $mapping[$mobil->id] = $driver->id;
        }

        $result = $this->svc->generateForDate(self::TRIP_DATE, $mapping);

        $pkb = $this->findDirectionResult($result, 'PKB_TO_ROHUL');
        $this->assertSame(6, $pkb['slots_filled']);
        $this->assertSame(0, $pkb['waiting_list_count']);
        $this->assertCount(6, $pkb['trip_ids']);

        $tripTimes = Trip::query()
            ->where('trip_date', self::TRIP_DATE)
            ->where('direction', 'PKB_TO_ROHUL')
            ->orderBy('sequence')
            ->pluck('trip_time')
            ->all();

        $this->assertSame(TripGenerationService::SLOTS, $tripTimes);
    }

    public function test_pool_above_slot_count_overflows_to_waiting_list(): void
    {
        $mapping = [];
        for ($i = 0; $i < 8; $i++) {
            $mobil = Mobil::factory()->create(['home_pool' => 'PKB']);
            $driver = Driver::factory()->create();
            $mapping[$mobil->id] = $driver->id;
        }

        $result = $this->svc->generateForDate(self::TRIP_DATE, $mapping);

        $pkb = $this->findDirectionResult($result, 'PKB_TO_ROHUL');
        $this->assertSame(6, $pkb['slots_filled']);
        $this->assertSame(2, $pkb['waiting_list_count']);
        $this->assertCount(8, $pkb['trip_ids']);

        $trips = Trip::query()
            ->where('trip_date', self::TRIP_DATE)
            ->where('direction', 'PKB_TO_ROHUL')
            ->orderBy('sequence')
            ->get();

        // Sequence 1-6 punya trip_time non-null.
        for ($i = 0; $i < 6; $i++) {
            $this->assertNotNull($trips[$i]->trip_time, "Sequence {$trips[$i]->sequence} harus punya trip_time");
            $this->assertSame($i + 1, $trips[$i]->sequence);
        }

        // Sequence 7-8 waiting list (trip_time null).
        $this->assertNull($trips[6]->trip_time);
        $this->assertNull($trips[7]->trip_time);
        $this->assertSame(7, $trips[6]->sequence);
        $this->assertSame(8, $trips[7]->sequence);
    }

    // ── Group 2: atomicity & idempotency ────────────────────────────────────

    public function test_atomic_rollback_on_second_direction_failure(): void
    {
        $mobils = [];
        $mapping = [];
        for ($i = 0; $i < 2; $i++) {
            $mobil = Mobil::factory()->create(['home_pool' => 'PKB']);
            $driver = Driver::factory()->create();
            $mobils[] = $mobil;
            $mapping[$mobil->id] = $driver->id;
        }

        // Pre-create trip di ROHUL_TO_PKB → trigger idempotency di arah ke-2.
        // Reuse $mobils[0] supaya tidak bikin Mobil baru via factory auto —
        // TripFactory default pakai Mobil::factory() yang buat mobil aktif,
        // akan bikin pre-flight driver check miss.
        $preExisting = Trip::factory()
            ->direction('ROHUL_TO_PKB')
            ->scheduled()
            ->create([
                'trip_date' => self::TRIP_DATE,
                'sequence'  => 1,
                'mobil_id'  => $mobils[0]->id,
            ]);

        try {
            $this->svc->generateForDate(self::TRIP_DATE, $mapping);
            $this->fail('Expected TripSlotConflictException');
        } catch (TripSlotConflictException $e) {
            // Expected.
        }

        // Hanya pre-existing trip yang ada — PKB_TO_ROHUL trips (dibuat sebelum
        // throw di ROHUL_TO_PKB) harus ke-rollback.
        $this->assertSame(1, Trip::query()->count());
        $this->assertTrue(Trip::query()->whereKey($preExisting->id)->exists());
        $this->assertSame(
            0,
            Trip::query()
                ->where('trip_date', self::TRIP_DATE)
                ->where('direction', 'PKB_TO_ROHUL')
                ->count(),
        );
    }

    public function test_duplicate_generate_throws_idempotency_exception(): void
    {
        $mobil = Mobil::factory()->create(['home_pool' => 'PKB']);
        $driver = Driver::factory()->create();
        $mapping = [$mobil->id => $driver->id];

        // Reuse $mobil supaya Mobil::factory() default dari TripFactory tidak
        // bikin mobil aktif baru yang meleset dari driver mapping.
        Trip::factory()
            ->direction('PKB_TO_ROHUL')
            ->scheduled()
            ->create([
                'trip_date' => self::TRIP_DATE,
                'sequence'  => 1,
                'mobil_id'  => $mobil->id,
            ]);

        $this->expectException(TripSlotConflictException::class);

        $this->svc->generateForDate(self::TRIP_DATE, $mapping);
    }

    // ── Group 3: integration with PoolStateService ──────────────────────────

    public function test_priority_order_honored_from_pool_state_service(): void
    {
        // mobilA: no trip yesterday → rank 1 (standby).
        $mobilA = Mobil::factory()->create(['home_pool' => 'PKB', 'kode_mobil' => 'BM 1111 AAA']);
        // mobilB: yesterday keluar_trip substatus=waiting_list → rank 2.
        $mobilB = Mobil::factory()->create(['home_pool' => 'PKB', 'kode_mobil' => 'BM 2222 BBB']);
        // mobilC: yesterday keluar_trip substatus=returning → rank 3.
        $mobilC = Mobil::factory()->create(['home_pool' => 'PKB', 'kode_mobil' => 'BM 3333 CCC']);

        Trip::factory()
            ->keluarTrip('waiting_list', 'PKB')
            ->create([
                'trip_date' => self::YESTERDAY,
                'mobil_id'  => $mobilB->id,
            ]);

        Trip::factory()
            ->keluarTrip('returning', 'PKB')
            ->create([
                'trip_date' => self::YESTERDAY,
                'mobil_id'  => $mobilC->id,
            ]);

        $driverA = Driver::factory()->create();
        $driverB = Driver::factory()->create();
        $driverC = Driver::factory()->create();

        $mapping = [
            $mobilA->id => $driverA->id,
            $mobilB->id => $driverB->id,
            $mobilC->id => $driverC->id,
        ];

        $this->svc->generateForDate(self::TRIP_DATE, $mapping);

        $trips = Trip::query()
            ->where('trip_date', self::TRIP_DATE)
            ->where('direction', 'PKB_TO_ROHUL')
            ->orderBy('sequence')
            ->get();

        $this->assertCount(3, $trips);
        $this->assertSame($mobilA->id, $trips[0]->mobil_id, 'Standby (rank 1) harus sequence 1');
        $this->assertSame($mobilB->id, $trips[1]->mobil_id, 'Waiting list (rank 2) harus sequence 2');
        $this->assertSame($mobilC->id, $trips[2]->mobil_id, 'Returning (rank 3) harus sequence 3');
    }

    public function test_driver_assignment_correct_from_mapping(): void
    {
        $mobilA = Mobil::factory()->create(['home_pool' => 'PKB', 'kode_mobil' => 'BM 1001 AAA']);
        $mobilB = Mobil::factory()->create(['home_pool' => 'PKB', 'kode_mobil' => 'BM 1002 BBB']);
        $driverA = Driver::factory()->create();
        $driverB = Driver::factory()->create();

        $mapping = [
            $mobilA->id => $driverA->id,
            $mobilB->id => $driverB->id,
        ];

        $this->svc->generateForDate(self::TRIP_DATE, $mapping);

        $tripForA = Trip::query()
            ->where('trip_date', self::TRIP_DATE)
            ->where('direction', 'PKB_TO_ROHUL')
            ->where('mobil_id', $mobilA->id)
            ->first();

        $tripForB = Trip::query()
            ->where('trip_date', self::TRIP_DATE)
            ->where('direction', 'PKB_TO_ROHUL')
            ->where('mobil_id', $mobilB->id)
            ->first();

        $this->assertNotNull($tripForA);
        $this->assertSame($driverA->id, $tripForA->driver_id);
        $this->assertNotNull($tripForB);
        $this->assertSame($driverB->id, $tripForB->driver_id);
    }

    // ── Group 4: driver assignment edge cases ───────────────────────────────

    public function test_inactive_mobil_in_mapping_silently_excluded(): void
    {
        $activeMobil = Mobil::factory()->create([
            'home_pool'         => 'PKB',
            'is_active_in_trip' => true,
        ]);
        $inactiveMobil = Mobil::factory()->create([
            'home_pool'         => 'PKB',
            'is_active_in_trip' => false,
        ]);
        $driverA = Driver::factory()->create();
        $driverB = Driver::factory()->create();

        $mapping = [
            $activeMobil->id   => $driverA->id,
            $inactiveMobil->id => $driverB->id,
        ];

        $result = $this->svc->generateForDate(self::TRIP_DATE, $mapping);

        $this->assertSame(1, Trip::query()->count());

        $pkb = $this->findDirectionResult($result, 'PKB_TO_ROHUL');
        $this->assertSame(1, $pkb['slots_filled']);
        $this->assertSame(0, $pkb['waiting_list_count']);

        $trip = Trip::query()->first();
        $this->assertSame($activeMobil->id, $trip->mobil_id);
    }

    public function test_missing_driver_assignment_throws_exception(): void
    {
        $mobilA = Mobil::factory()->create(['home_pool' => 'PKB']);
        $mobilB = Mobil::factory()->create(['home_pool' => 'PKB']);
        $driverA = Driver::factory()->create();

        $mapping = [$mobilA->id => $driverA->id];

        try {
            $this->svc->generateForDate(self::TRIP_DATE, $mapping);
            $this->fail('Expected TripGenerationDriverMissingException');
        } catch (TripGenerationDriverMissingException $e) {
            $this->assertEqualsCanonicalizing([$mobilB->id], $e->missingMobilIds);
        }

        $this->assertSame(0, Trip::query()->count());
    }

    // ── Group 5: Phase E4 manual pin overrides (DP-7) ───────────────────────

    public function test_pinned_trip_creates_at_specified_time(): void
    {
        // 3 active mobil ROHUL pool, 1 pinned ke 05:00 (custom time, bukan
        // member SLOTS), 2 mobil sisa auto-fill dari SLOTS standar.
        $mobilPinned = Mobil::factory()->create(['home_pool' => 'ROHUL', 'kode_mobil' => 'BM 0001 RRR']);
        $mobilA = Mobil::factory()->create(['home_pool' => 'ROHUL', 'kode_mobil' => 'BM 0002 RRR']);
        $mobilB = Mobil::factory()->create(['home_pool' => 'ROHUL', 'kode_mobil' => 'BM 0003 RRR']);
        $driverPinned = Driver::factory()->create();
        $driverA = Driver::factory()->create();
        $driverB = Driver::factory()->create();

        $assignment = DailyDriverAssignment::factory()->create([
            'date' => self::TRIP_DATE,
            'mobil_id' => $mobilPinned->id,
            'driver_id' => $driverPinned->id,
        ]);
        DailyAssignmentPin::factory()->create([
            'daily_driver_assignment_id' => $assignment->id,
            'direction' => 'ROHUL_TO_PKB',
            'trip_time' => '05:00:00',
        ]);

        $mapping = [
            $mobilPinned->id => $driverPinned->id,
            $mobilA->id => $driverA->id,
            $mobilB->id => $driverB->id,
        ];

        $this->svc->generateForDate(self::TRIP_DATE, $mapping);

        $rohulTrips = Trip::query()
            ->where('trip_date', self::TRIP_DATE)
            ->where('direction', 'ROHUL_TO_PKB')
            ->orderBy('sequence')
            ->get();

        $this->assertCount(3, $rohulTrips);
        $this->assertSame($mobilPinned->id, $rohulTrips[0]->mobil_id);
        $this->assertSame('05:00:00', $rohulTrips[0]->trip_time);
        $this->assertSame(1, $rohulTrips[0]->sequence);

        // Sisa 2 mobil dapat slot dari SLOTS standar (05:00 bukan member SLOTS,
        // jadi semua 6 slot tetap available).
        $this->assertSame('05:30:00', $rohulTrips[1]->trip_time);
        $this->assertSame('07:00:00', $rohulTrips[2]->trip_time);
    }

    public function test_two_mobils_pinned_to_same_slot_both_created(): void
    {
        // DP-2: penumpang ramai → boleh ada 2 mobil di slot pinned yang sama.
        $mobilPin1 = Mobil::factory()->create(['home_pool' => 'ROHUL', 'kode_mobil' => 'BM 1001 RRR']);
        $mobilPin2 = Mobil::factory()->create(['home_pool' => 'ROHUL', 'kode_mobil' => 'BM 1002 RRR']);
        $mobilA = Mobil::factory()->create(['home_pool' => 'ROHUL', 'kode_mobil' => 'BM 1003 RRR']);
        $mobilB = Mobil::factory()->create(['home_pool' => 'ROHUL', 'kode_mobil' => 'BM 1004 RRR']);
        $driverPin1 = Driver::factory()->create();
        $driverPin2 = Driver::factory()->create();
        $driverA = Driver::factory()->create();
        $driverB = Driver::factory()->create();

        foreach ([$mobilPin1, $mobilPin2] as $m) {
            $assignment = DailyDriverAssignment::factory()->create([
                'date' => self::TRIP_DATE,
                'mobil_id' => $m->id,
                'driver_id' => Driver::factory()->create()->id,
            ]);
            DailyAssignmentPin::factory()->create([
                'daily_driver_assignment_id' => $assignment->id,
                'direction' => 'ROHUL_TO_PKB',
                'trip_time' => '05:00:00',
            ]);
        }

        $mapping = [
            $mobilPin1->id => $driverPin1->id,
            $mobilPin2->id => $driverPin2->id,
            $mobilA->id => $driverA->id,
            $mobilB->id => $driverB->id,
        ];

        $this->svc->generateForDate(self::TRIP_DATE, $mapping);

        $rohulTrips = Trip::query()
            ->where('trip_date', self::TRIP_DATE)
            ->where('direction', 'ROHUL_TO_PKB')
            ->orderBy('sequence')
            ->get();

        $this->assertCount(4, $rohulTrips);
        $this->assertSame('05:00:00', $rohulTrips[0]->trip_time);
        $this->assertSame('05:00:00', $rohulTrips[1]->trip_time);
        $this->assertSame(1, $rohulTrips[0]->sequence);
        $this->assertSame(2, $rohulTrips[1]->sequence);
        // Sisa 2 mobil ambil dari SLOTS (05:00 bukan member SLOTS).
        $this->assertSame('05:30:00', $rohulTrips[2]->trip_time);
        $this->assertSame('07:00:00', $rohulTrips[3]->trip_time);
    }

    public function test_pinned_slot_within_standard_slots_excluded_from_auto_fill(): void
    {
        // Pin ke 07:00 (slot standar) → harus di-skip dari auto-fill supaya
        // tidak ada double-booking di 07:00.
        $mobilPinned = Mobil::factory()->create(['home_pool' => 'ROHUL', 'kode_mobil' => 'BM 2001 RRR']);
        $mobilA = Mobil::factory()->create(['home_pool' => 'ROHUL', 'kode_mobil' => 'BM 2002 RRR']);
        $mobilB = Mobil::factory()->create(['home_pool' => 'ROHUL', 'kode_mobil' => 'BM 2003 RRR']);
        $driverPinned = Driver::factory()->create();
        $driverA = Driver::factory()->create();
        $driverB = Driver::factory()->create();

        $assignment = DailyDriverAssignment::factory()->create([
            'date' => self::TRIP_DATE,
            'mobil_id' => $mobilPinned->id,
            'driver_id' => $driverPinned->id,
        ]);
        DailyAssignmentPin::factory()->create([
            'daily_driver_assignment_id' => $assignment->id,
            'direction' => 'ROHUL_TO_PKB',
            'trip_time' => '07:00:00',
        ]);

        $mapping = [
            $mobilPinned->id => $driverPinned->id,
            $mobilA->id => $driverA->id,
            $mobilB->id => $driverB->id,
        ];

        $this->svc->generateForDate(self::TRIP_DATE, $mapping);

        $rohulTrips = Trip::query()
            ->where('trip_date', self::TRIP_DATE)
            ->where('direction', 'ROHUL_TO_PKB')
            ->orderBy('sequence')
            ->get();

        $this->assertCount(3, $rohulTrips);
        $this->assertSame($mobilPinned->id, $rohulTrips[0]->mobil_id);
        $this->assertSame('07:00:00', $rohulTrips[0]->trip_time);

        // Sisa 2 mobil ambil dari SLOTS minus 07:00 → 05:30, 09:00.
        $this->assertSame('05:30:00', $rohulTrips[1]->trip_time);
        $this->assertSame('09:00:00', $rohulTrips[2]->trip_time);

        // Tidak ada double-booking di 07:00.
        $tripsAt0700 = Trip::query()
            ->where('trip_date', self::TRIP_DATE)
            ->where('direction', 'ROHUL_TO_PKB')
            ->where('trip_time', '07:00:00')
            ->count();
        $this->assertSame(1, $tripsAt0700);
    }

    public function test_pin_with_inactive_mobil_silently_skipped(): void
    {
        // Pin yang menargetkan mobil inactive harus di-drop oleh filter pass 1.
        // Auto-fill juga skip mobil inactive (prioritizedMobilList only active).
        $mobilActive = Mobil::factory()->create([
            'home_pool' => 'ROHUL',
            'kode_mobil' => 'BM 3001 RRR',
            'is_active_in_trip' => true,
        ]);
        $mobilInactive = Mobil::factory()->create([
            'home_pool' => 'ROHUL',
            'kode_mobil' => 'BM 3002 RRR',
            'is_active_in_trip' => false,
        ]);
        $driverActive = Driver::factory()->create();
        $driverInactive = Driver::factory()->create();

        $assignmentInactive = DailyDriverAssignment::factory()->create([
            'date' => self::TRIP_DATE,
            'mobil_id' => $mobilInactive->id,
            'driver_id' => $driverInactive->id,
        ]);
        DailyAssignmentPin::factory()->create([
            'daily_driver_assignment_id' => $assignmentInactive->id,
            'direction' => 'ROHUL_TO_PKB',
            'trip_time' => '05:00:00',
        ]);

        // Pre-flight di generateForDate hanya cek active mobil → mapping tanpa
        // inactive aman.
        $mapping = [
            $mobilActive->id => $driverActive->id,
        ];

        $this->svc->generateForDate(self::TRIP_DATE, $mapping);

        $rohulTrips = Trip::query()
            ->where('trip_date', self::TRIP_DATE)
            ->where('direction', 'ROHUL_TO_PKB')
            ->get();

        $this->assertCount(1, $rohulTrips);
        $this->assertSame($mobilActive->id, $rohulTrips[0]->mobil_id);
        $this->assertSame(1, $rohulTrips[0]->sequence);
        $this->assertSame('05:30:00', $rohulTrips[0]->trip_time, 'Mobil active dapat slot SLOTS standar, bukan dari pin inactive');
    }

    public function test_pin_for_other_pool_excluded_from_direction(): void
    {
        // Mobil home_pool=PKB punya pin direction=ROHUL_TO_PKB (cross-pool).
        // Pin di-drop di filter ROHUL_TO_PKB (mobil bukan ROHUL pool).
        // Mobil ini tetap dapat slot via auto-fill di arah PKB_TO_ROHUL.
        $mobil = Mobil::factory()->create(['home_pool' => 'PKB', 'kode_mobil' => 'BM 4001 PPP']);
        $driver = Driver::factory()->create();

        $assignment = DailyDriverAssignment::factory()->create([
            'date' => self::TRIP_DATE,
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
        ]);
        DailyAssignmentPin::factory()->create([
            'daily_driver_assignment_id' => $assignment->id,
            'direction' => 'ROHUL_TO_PKB',
            'trip_time' => '05:00:00',
        ]);

        $mapping = [$mobil->id => $driver->id];

        $this->svc->generateForDate(self::TRIP_DATE, $mapping);

        // ROHUL_TO_PKB: cross-pool pin di-drop, no other ROHUL mobil → 0 trips.
        $rohulTrips = Trip::query()
            ->where('trip_date', self::TRIP_DATE)
            ->where('direction', 'ROHUL_TO_PKB')
            ->count();
        $this->assertSame(0, $rohulTrips);

        // PKB_TO_ROHUL: mobil masuk auto-fill, dapat slot pertama SLOTS.
        $pkbTrips = Trip::query()
            ->where('trip_date', self::TRIP_DATE)
            ->where('direction', 'PKB_TO_ROHUL')
            ->orderBy('sequence')
            ->get();
        $this->assertCount(1, $pkbTrips);
        $this->assertSame($mobil->id, $pkbTrips[0]->mobil_id);
        $this->assertSame('05:30:00', $pkbTrips[0]->trip_time);
    }

    public function test_pin_skipped_when_mobil_dynamic_pool_differs_from_direction(): void
    {
        // Regression test PR #4 Phase E4 hotfix: pin filter harus pakai
        // poolForMobil dinamis (Pass 2-style), bukan home_pool statis.
        //
        // Skenario prod 25 April 2026: JET 01 home_pool=ROHUL, tapi sudah
        // berangkat kemarin (status=berangkat) → poolForMobil=PKB.
        // Pin ROHUL_TO_PKB di-pin oleh admin ⇒ harus DI-SKIP karena mobil
        // tidak di ROHUL pool secara fisik.

        $yesterday = Carbon::parse(self::TRIP_DATE)->subDay()->toDateString();

        $mobilDeparted = Mobil::factory()->create([
            'home_pool' => 'ROHUL',
            'kode_mobil' => 'BM 5001 RRR',
        ]);
        $driver = Driver::factory()->create();

        // Trip kemarin: berangkat dari ROHUL ke PKB → mobil sekarang di PKB
        Trip::create([
            'trip_date' => $yesterday,
            'trip_time' => '05:30:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence' => 1,
            'mobil_id' => $mobilDeparted->id,
            'driver_id' => $driver->id,
            'status' => 'berangkat',
        ]);

        // Pin ROHUL_TO_PKB di hari ini (admin tidak sadar mobil masih di PKB)
        $assignment = DailyDriverAssignment::factory()->create([
            'date' => self::TRIP_DATE,
            'mobil_id' => $mobilDeparted->id,
            'driver_id' => $driver->id,
        ]);
        DailyAssignmentPin::factory()->create([
            'daily_driver_assignment_id' => $assignment->id,
            'direction' => 'ROHUL_TO_PKB',
            'trip_time' => '05:30:00',
        ]);

        $mapping = [$mobilDeparted->id => $driver->id];

        $this->svc->generateForDate(self::TRIP_DATE, $mapping);

        // Assert: trip ROHUL_TO_PKB TIDAK ter-create (pin di-skip karena pool mismatch)
        $rohulTrips = Trip::query()
            ->where('trip_date', self::TRIP_DATE)
            ->where('direction', 'ROHUL_TO_PKB')
            ->count();
        $this->assertSame(0, $rohulTrips, 'Pin ke arah ROHUL_TO_PKB harus di-skip kalau mobil tidak di ROHUL pool');

        // Assert: trip PKB_TO_ROHUL ter-create via auto-fill (mobil di PKB)
        $pkbTrips = Trip::query()
            ->where('trip_date', self::TRIP_DATE)
            ->where('direction', 'PKB_TO_ROHUL')
            ->orderBy('sequence')
            ->get();
        $this->assertCount(1, $pkbTrips);
        $this->assertSame($mobilDeparted->id, $pkbTrips[0]->mobil_id);
        $this->assertSame('05:30:00', $pkbTrips[0]->trip_time);
    }

    // ── Helpers ─────────────────────────────────────────────────────────────

    /**
     * @param  array<int, array{direction: string, slots_filled: int, waiting_list_count: int, trip_ids: array<int, int>}>  $result
     * @return array{direction: string, slots_filled: int, waiting_list_count: int, trip_ids: array<int, int>}
     */
    private function findDirectionResult(array $result, string $direction): array
    {
        foreach ($result as $row) {
            if ($row['direction'] === $direction) {
                return $row;
            }
        }

        $this->fail("Direction {$direction} tidak ada di result");
    }
}
