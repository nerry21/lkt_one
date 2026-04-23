<?php

namespace Tests\Unit\Services;

use App\Exceptions\SameDayReturnConflictException;
use App\Exceptions\TripVersionConflictException;
use App\Models\Driver;
use App\Models\Trip;
use App\Services\SameDayReturnService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

/**
 * Test coverage SameDayReturnService (Sesi 30 Fase E5 Tahap 3).
 *
 * Reference: handoff Sesi 30 DPs E5.3 / E5.4 / E5.6 / E5.8 / E5.C / E5.D.
 *
 * 13 test methods:
 *   - 4 happy path (scheduled/berangkat origin, driver override, version bump)
 *   - 5 validation failure (wrong direction/status, already paired, bad slot, version mismatch)
 *   - 2 multi-origin idempotency (1-to-N allowed, per-origin 1-to-1 enforced)
 *   - 2 edge case (mobil_id inheritance, sequence=999 marker)
 */
class SameDayReturnServiceTest extends TestCase
{
    use RefreshDatabase;

    protected SameDayReturnService $svc;

    private const TRIP_DATE = '2026-04-23';
    private const FIXED_NOW = '2026-04-23 09:00:00';
    private const VALID_SLOT = '13:00:00';

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow(self::FIXED_NOW);
        $this->svc = $this->app->make(SameDayReturnService::class);
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    // ── Group 1: Happy paths ────────────────────────────────────────────────

    public function test_createSameDayReturn_from_scheduled_origin_creates_return_trip_with_correct_fields(): void
    {
        $origin = Trip::factory()
            ->scheduled()
            ->direction('ROHUL_TO_PKB')
            ->create([
                'trip_date' => self::TRIP_DATE,
                'trip_time' => '07:00:00',
            ])
            ->refresh();

        $result = $this->svc->createSameDayReturn($origin->id, $origin->version, [
            'slot'   => self::VALID_SLOT,
            'reason' => 'coverage gap',
        ]);

        $this->assertSame('PKB_TO_ROHUL', $result->direction);
        $this->assertSame(self::VALID_SLOT, $result->trip_time);
        $this->assertSame(999, $result->sequence);
        $this->assertSame($origin->mobil_id, $result->mobil_id);
        $this->assertSame($origin->driver_id, $result->driver_id);
        $this->assertTrue($result->same_day_return);
        $this->assertSame('coverage gap', $result->same_day_return_reason);
        $this->assertSame($origin->id, $result->same_day_return_origin_trip_id);
        $this->assertSame('scheduled', $result->status);
        $this->assertSame(self::TRIP_DATE, $result->trip_date->toDateString());
    }

    public function test_createSameDayReturn_from_berangkat_origin_also_valid(): void
    {
        $origin = Trip::factory()
            ->berangkat()
            ->direction('ROHUL_TO_PKB')
            ->create([
                'trip_date' => self::TRIP_DATE,
                'trip_time' => '07:00:00',
            ])
            ->refresh();

        $result = $this->svc->createSameDayReturn($origin->id, $origin->version, [
            'slot' => self::VALID_SLOT,
        ]);

        $this->assertSame('PKB_TO_ROHUL', $result->direction);
        $this->assertTrue($result->same_day_return);
        $this->assertSame($origin->id, $result->same_day_return_origin_trip_id);
    }

    public function test_createSameDayReturn_with_custom_driver_override_uses_payload_driver(): void
    {
        $origin = Trip::factory()
            ->scheduled()
            ->direction('ROHUL_TO_PKB')
            ->create([
                'trip_date' => self::TRIP_DATE,
                'trip_time' => '07:00:00',
            ])
            ->refresh();

        $otherDriver = Driver::factory()->create();

        $result = $this->svc->createSameDayReturn($origin->id, $origin->version, [
            'slot'      => self::VALID_SLOT,
            'driver_id' => $otherDriver->id,
        ]);

        $this->assertSame($otherDriver->id, $result->driver_id);
        $this->assertNotSame($origin->driver_id, $result->driver_id);
    }

    public function test_createSameDayReturn_increments_origin_version(): void
    {
        $origin = Trip::factory()
            ->scheduled()
            ->direction('ROHUL_TO_PKB')
            ->create([
                'trip_date' => self::TRIP_DATE,
                'trip_time' => '07:00:00',
            ])
            ->refresh();

        $originalVersion = $origin->version;

        $this->svc->createSameDayReturn($origin->id, $originalVersion, [
            'slot' => self::VALID_SLOT,
        ]);

        $origin->refresh();
        $this->assertSame($originalVersion + 1, $origin->version);
    }

    // ── Group 2: Validation failures ────────────────────────────────────────

    public function test_createSameDayReturn_throws_when_origin_direction_is_PKB_TO_ROHUL(): void
    {
        $origin = Trip::factory()
            ->scheduled()
            ->direction('PKB_TO_ROHUL')
            ->create([
                'trip_date' => self::TRIP_DATE,
                'trip_time' => '07:00:00',
            ])
            ->refresh();

        $beforeCount = Trip::count();

        try {
            $this->svc->createSameDayReturn($origin->id, $origin->version, [
                'slot' => self::VALID_SLOT,
            ]);
            $this->fail('Expected SameDayReturnConflictException');
        } catch (SameDayReturnConflictException $e) {
            $this->assertSame('origin_direction_invalid', $e->conflictType);
        }

        $this->assertSame($beforeCount, Trip::count());
    }

    public function test_createSameDayReturn_throws_when_origin_status_is_tidak_berangkat(): void
    {
        $origin = Trip::factory()
            ->tidakBerangkat()
            ->direction('ROHUL_TO_PKB')
            ->create([
                'trip_date' => self::TRIP_DATE,
                'trip_time' => '07:00:00',
            ])
            ->refresh();

        try {
            $this->svc->createSameDayReturn($origin->id, $origin->version, [
                'slot' => self::VALID_SLOT,
            ]);
            $this->fail('Expected SameDayReturnConflictException');
        } catch (SameDayReturnConflictException $e) {
            $this->assertSame('origin_status_invalid', $e->conflictType);
        }
    }

    public function test_createSameDayReturn_throws_when_origin_already_has_return_pair(): void
    {
        $origin = Trip::factory()
            ->scheduled()
            ->direction('ROHUL_TO_PKB')
            ->create([
                'trip_date' => self::TRIP_DATE,
                'trip_time' => '07:00:00',
            ])
            ->refresh();

        // First call succeeds.
        $this->svc->createSameDayReturn($origin->id, $origin->version, [
            'slot' => self::VALID_SLOT,
        ]);

        $origin->refresh();

        try {
            $this->svc->createSameDayReturn($origin->id, $origin->version, [
                'slot' => '16:00:00',
            ]);
            $this->fail('Expected SameDayReturnConflictException');
        } catch (SameDayReturnConflictException $e) {
            $this->assertSame('origin_already_has_return', $e->conflictType);
        }

        $this->assertSame(1, Trip::where('same_day_return', true)->count());
    }

    public function test_createSameDayReturn_throws_when_slot_not_in_valid_list(): void
    {
        $origin = Trip::factory()
            ->scheduled()
            ->direction('ROHUL_TO_PKB')
            ->create([
                'trip_date' => self::TRIP_DATE,
                'trip_time' => '07:00:00',
            ])
            ->refresh();

        try {
            $this->svc->createSameDayReturn($origin->id, $origin->version, [
                'slot' => '20:00:00',
            ]);
            $this->fail('Expected SameDayReturnConflictException');
        } catch (SameDayReturnConflictException $e) {
            $this->assertSame('slot_unavailable', $e->conflictType);
        }
    }

    public function test_createSameDayReturn_throws_on_version_mismatch(): void
    {
        $origin = Trip::factory()
            ->scheduled()
            ->direction('ROHUL_TO_PKB')
            ->create([
                'trip_date' => self::TRIP_DATE,
                'trip_time' => '07:00:00',
            ])
            ->refresh();

        $this->expectException(TripVersionConflictException::class);
        $this->svc->createSameDayReturn($origin->id, 999, [
            'slot' => self::VALID_SLOT,
        ]);
    }

    // ── Group 3: Idempotency & multi-origin ─────────────────────────────────

    public function test_createSameDayReturn_allows_multiple_per_mobil_per_date_from_different_origins(): void
    {
        $originA = Trip::factory()
            ->scheduled()
            ->direction('ROHUL_TO_PKB')
            ->create([
                'trip_date' => self::TRIP_DATE,
                'trip_time' => '05:30:00',
                'sequence'  => 1,
            ])
            ->refresh();

        // Same mobil, same trip_date, different trip_time (origin slots distinct).
        $originB = Trip::factory()
            ->scheduled()
            ->direction('ROHUL_TO_PKB')
            ->create([
                'trip_date' => self::TRIP_DATE,
                'trip_time' => '13:00:00',
                'sequence'  => 2,
                'mobil_id'  => $originA->mobil_id,
            ])
            ->refresh();

        $returnA = $this->svc->createSameDayReturn($originA->id, $originA->version, [
            'slot' => '09:00:00',
        ]);

        $returnB = $this->svc->createSameDayReturn($originB->id, $originB->version, [
            'slot' => '19:00:00',
        ]);

        $this->assertSame(2, Trip::where('same_day_return', true)->count());
        $this->assertSame($originA->id, $returnA->same_day_return_origin_trip_id);
        $this->assertSame($originB->id, $returnB->same_day_return_origin_trip_id);
        $this->assertSame('09:00:00', $returnA->trip_time);
        $this->assertSame('19:00:00', $returnB->trip_time);
    }

    public function test_createSameDayReturn_rejects_second_attempt_on_same_origin_even_with_different_slot(): void
    {
        $origin = Trip::factory()
            ->scheduled()
            ->direction('ROHUL_TO_PKB')
            ->create([
                'trip_date' => self::TRIP_DATE,
                'trip_time' => '07:00:00',
            ])
            ->refresh();

        $this->svc->createSameDayReturn($origin->id, $origin->version, [
            'slot' => self::VALID_SLOT,
        ]);

        $origin->refresh();

        try {
            $this->svc->createSameDayReturn($origin->id, $origin->version, [
                'slot' => '19:00:00',
            ]);
            $this->fail('Expected SameDayReturnConflictException');
        } catch (SameDayReturnConflictException $e) {
            $this->assertSame('origin_already_has_return', $e->conflictType);
        }

        // Tetap 1 SDR trip (slot 13:00 yang berhasil), slot 19:00 ditolak.
        $this->assertSame(1, Trip::where('same_day_return', true)->count());
        $this->assertSame(
            self::VALID_SLOT,
            Trip::where('same_day_return', true)->value('trip_time'),
        );
    }

    // ── Group 4: Edge cases ─────────────────────────────────────────────────

    public function test_createSameDayReturn_new_trip_inherits_mobil_id_from_origin(): void
    {
        $origin = Trip::factory()
            ->scheduled()
            ->direction('ROHUL_TO_PKB')
            ->create([
                'trip_date' => self::TRIP_DATE,
                'trip_time' => '07:00:00',
            ])
            ->refresh();

        $result = $this->svc->createSameDayReturn($origin->id, $origin->version, [
            'slot' => self::VALID_SLOT,
        ]);

        $this->assertSame($origin->mobil_id, $result->mobil_id);
    }

    public function test_createSameDayReturn_sets_sequence_to_999_reserved_marker(): void
    {
        // 5 regular PKB_TO_ROHUL trips dengan sequence 1..5 (simulate batch
        // hasil TripGenerationService), masing-masing mobil berbeda supaya
        // tidak bentrok invariant I2.
        for ($i = 1; $i <= 5; $i++) {
            Trip::factory()
                ->scheduled()
                ->direction('PKB_TO_ROHUL')
                ->create([
                    'trip_date' => self::TRIP_DATE,
                    'trip_time' => sprintf('%02d:00:00', $i + 6),
                    'sequence'  => $i,
                ]);
        }

        $origin = Trip::factory()
            ->scheduled()
            ->direction('ROHUL_TO_PKB')
            ->create([
                'trip_date' => self::TRIP_DATE,
                'trip_time' => '07:00:00',
                'sequence'  => 1,
            ])
            ->refresh();

        $result = $this->svc->createSameDayReturn($origin->id, $origin->version, [
            'slot' => self::VALID_SLOT,
        ]);

        $this->assertSame(999, $result->sequence);

        // Regular PKB_TO_ROHUL sequence 1..5 tidak tersentuh (no reordering).
        $regularSequences = Trip::where('trip_date', self::TRIP_DATE)
            ->where('direction', 'PKB_TO_ROHUL')
            ->where('same_day_return', false)
            ->orderBy('sequence')
            ->pluck('sequence')
            ->all();

        $this->assertSame([1, 2, 3, 4, 5], $regularSequences);
    }
}
