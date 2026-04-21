<?php

namespace Tests\Unit\Services;

use App\Exceptions\TripGenerationDriverMissingException;
use App\Exceptions\TripSlotConflictException;
use App\Models\Driver;
use App\Models\Keberangkatan;
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

    // ── Group 5: coupling invariant ─────────────────────────────────────────

    public function test_slots_constant_matches_keberangkatan_options_with_seconds_suffix(): void
    {
        $expected = array_map(
            fn (string $key): string => $key . ':00',
            array_keys(Keberangkatan::JAM_KEBERANGKATAN_OPTIONS),
        );

        $this->assertSame($expected, TripGenerationService::SLOTS);
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
