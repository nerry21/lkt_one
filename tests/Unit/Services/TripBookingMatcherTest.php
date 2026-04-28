<?php

namespace Tests\Unit\Services;

use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use App\Services\TripBookingMatcher;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

/**
 * Test coverage TripBookingMatcher (Sesi 50 PR #1).
 *
 * Matcher = stateless service. Test fokus:
 *   - Direction mapping booking ↔ trip
 *   - Trip time normalisasi (HH:MM auto-pad ke HH:MM:SS)
 *   - Status filter (skip tidak_berangkat / tidak_keluar_trip)
 *   - extractAssignmentFromTrip null-handling untuk Trip null + Trip belum di-assign
 */
class TripBookingMatcherTest extends TestCase
{
    use RefreshDatabase;

    protected TripBookingMatcher $matcher;
    protected Mobil $mobil;
    protected Driver $driver;

    private const TRIP_DATE = '2026-04-22';

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow('2026-04-21 14:00:00');
        $this->matcher = $this->app->make(TripBookingMatcher::class);
        $this->mobil = Mobil::factory()->create();
        $this->driver = Driver::factory()->create();
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    public function test_find_matching_trip_returns_trip_when_exact_match(): void
    {
        $trip = Trip::factory()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '07:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence'  => 1,
            'mobil_id'  => $this->mobil->id,
            'driver_id' => $this->driver->id,
            'status'    => 'scheduled',
        ]);

        $result = $this->matcher->findMatchingTrip(
            tripDate: self::TRIP_DATE,
            tripTime: '07:00:00',
            bookingDirection: 'from_pkb',
            armadaIndex: 1,
            routeVia: 'BANGKINANG',
        );

        $this->assertNotNull($result);
        $this->assertSame($trip->id, $result->id);
    }

    public function test_find_matching_trip_returns_match_when_route_via_provided(): void
    {
        // Cluster filter currently skipped (mobil tidak punya kolom cluster).
        // Test ini guard regression: routeVia argument tidak boleh exclude trip valid.
        $trip = Trip::factory()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '07:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence'  => 1,
            'mobil_id'  => $this->mobil->id,
            'driver_id' => $this->driver->id,
            'status'    => 'scheduled',
        ]);

        $result = $this->matcher->findMatchingTrip(
            tripDate: self::TRIP_DATE,
            tripTime: '07:00:00',
            bookingDirection: 'from_pkb',
            armadaIndex: 1,
            routeVia: 'PETAPAHAN',
        );

        $this->assertNotNull($result);
        $this->assertSame($trip->id, $result->id);
    }

    public function test_find_matching_trip_returns_null_when_sequence_not_match(): void
    {
        Trip::factory()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '07:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence'  => 2,
            'mobil_id'  => $this->mobil->id,
            'driver_id' => $this->driver->id,
            'status'    => 'scheduled',
        ]);

        $result = $this->matcher->findMatchingTrip(
            tripDate: self::TRIP_DATE,
            tripTime: '07:00:00',
            bookingDirection: 'from_pkb',
            armadaIndex: 1,
            routeVia: null,
        );

        $this->assertNull($result);
    }

    public function test_find_matching_trip_skips_status_tidak_berangkat_and_tidak_keluar_trip(): void
    {
        Trip::factory()->tidakBerangkat()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '07:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence'  => 1,
            'mobil_id'  => $this->mobil->id,
            'driver_id' => $this->driver->id,
        ]);

        $resultA = $this->matcher->findMatchingTrip(
            tripDate: self::TRIP_DATE,
            tripTime: '07:00:00',
            bookingDirection: 'from_pkb',
            armadaIndex: 1,
            routeVia: null,
        );
        $this->assertNull($resultA);

        Trip::factory()->tidakKeluarTrip()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '08:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence'  => 1,
            'mobil_id'  => Mobil::factory()->create()->id,
            'driver_id' => Driver::factory()->create()->id,
        ]);

        $resultB = $this->matcher->findMatchingTrip(
            tripDate: self::TRIP_DATE,
            tripTime: '08:00:00',
            bookingDirection: 'from_pkb',
            armadaIndex: 1,
            routeVia: null,
        );
        $this->assertNull($resultB);
    }

    public function test_find_matching_trip_normalizes_HH_MM_input_to_HH_MM_SS(): void
    {
        $trip = Trip::factory()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence'  => 1,
            'mobil_id'  => $this->mobil->id,
            'driver_id' => $this->driver->id,
            'status'    => 'scheduled',
        ]);

        $result = $this->matcher->findMatchingTrip(
            tripDate: self::TRIP_DATE,
            tripTime: '05:30',
            bookingDirection: 'to_pkb',
            armadaIndex: 1,
            routeVia: null,
        );

        $this->assertNotNull($result);
        $this->assertSame($trip->id, $result->id);
    }

    public function test_direction_mapping_to_pkb_matches_ROHUL_TO_PKB_and_from_pkb_matches_PKB_TO_ROHUL(): void
    {
        $rohulToPkb = Trip::factory()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '07:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence'  => 1,
            'mobil_id'  => $this->mobil->id,
            'driver_id' => $this->driver->id,
            'status'    => 'scheduled',
        ]);

        $pkbToRohul = Trip::factory()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '07:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence'  => 1,
            'mobil_id'  => Mobil::factory()->create()->id,
            'driver_id' => Driver::factory()->create()->id,
            'status'    => 'scheduled',
        ]);

        $a = $this->matcher->findMatchingTrip(self::TRIP_DATE, '07:00:00', 'to_pkb', 1, null);
        $b = $this->matcher->findMatchingTrip(self::TRIP_DATE, '07:00:00', 'from_pkb', 1, null);

        $this->assertSame($rohulToPkb->id, $a?->id);
        $this->assertSame($pkbToRohul->id, $b?->id);
    }

    public function test_extract_assignment_from_trip_returns_all_null_when_trip_null(): void
    {
        $assignment = $this->matcher->extractAssignmentFromTrip(null);

        $this->assertSame([
            'trip_id'     => null,
            'mobil_id'    => null,
            'driver_id'   => null,
            'driver_name' => null,
        ], $assignment);
    }

    public function test_extract_assignment_from_trip_with_mobil_unassigned_returns_trip_id_only(): void
    {
        // Trip schema saat ini NOT NULL untuk mobil_id+driver_id, tapi extractAssignment
        // defensive untuk skenario future (Trip placeholder belum di-assign). Test ini
        // konstruksi Trip in-memory dengan mobil_id null untuk verify defensive path.
        $trip = new Trip();
        $trip->id = 12345;
        $trip->trip_date = self::TRIP_DATE;
        $trip->trip_time = '07:00:00';
        $trip->direction = 'PKB_TO_ROHUL';
        $trip->sequence = 1;
        $trip->mobil_id = null;
        $trip->driver_id = null;
        $trip->status = 'scheduled';

        $assignment = $this->matcher->extractAssignmentFromTrip($trip);

        $this->assertSame(12345, $assignment['trip_id']);
        $this->assertNull($assignment['mobil_id']);
        $this->assertNull($assignment['driver_id']);
        $this->assertNull($assignment['driver_name']);
    }
}
