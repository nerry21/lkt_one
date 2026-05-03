<?php

declare(strict_types=1);

namespace Tests\Unit\Services\Bridge;

use App\Exceptions\TripInvalidTransitionException;
use App\Models\Booking;
use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use App\Services\Bridge\BridgeTripActionService;
use App\Services\TripRotationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BridgeTripActionServiceTest extends TestCase
{
    use RefreshDatabase;

    private function makeService(): BridgeTripActionService
    {
        return new BridgeTripActionService(app(TripRotationService::class));
    }

    public function test_mark_trip_tidak_berangkat_succeeds(): void
    {
        $mobil = Mobil::factory()->create();
        $driver = Driver::factory()->create();
        $trip = Trip::factory()->create([
            'trip_date' => '2026-05-04',
            'trip_time' => '07:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'status' => 'scheduled',
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
        ]);

        $service = $this->makeService();
        $result = $service->markTripTidakBerangkat($trip->id);

        $this->assertSame('tidak_berangkat', $result->status);
    }

    public function test_mark_trip_tidak_berangkat_when_not_scheduled_throws(): void
    {
        $mobil = Mobil::factory()->create();
        $driver = Driver::factory()->create();
        $trip = Trip::factory()->create([
            'trip_date' => '2026-05-04',
            'trip_time' => '07:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'status' => 'berangkat',
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
        ]);

        $service = $this->makeService();
        $this->expectException(TripInvalidTransitionException::class);
        $service->markTripTidakBerangkat($trip->id);
    }

    public function test_get_available_slots_today_returns_sorted_list(): void
    {
        $mobil = Mobil::factory()->create();
        $driver = Driver::factory()->create();

        $trip1 = Trip::factory()->create([
            'trip_date' => '2026-05-04',
            'trip_time' => '13:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'status' => 'scheduled',
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
        ]);
        $trip2 = Trip::factory()->create([
            'trip_date' => '2026-05-04',
            'trip_time' => '09:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'status' => 'scheduled',
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
        ]);
        $excludeTrip = Trip::factory()->create([
            'trip_date' => '2026-05-04',
            'trip_time' => '07:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'status' => 'scheduled',
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
        ]);

        $service = $this->makeService();
        $result = $service->getAvailableSlotsToday('2026-05-04', 'ROHUL_TO_PKB', $excludeTrip->id);

        $this->assertCount(2, $result);
        $this->assertSame('09:00:00', $result[0]['trip_time']);
        $this->assertSame('13:00:00', $result[1]['trip_time']);
    }

    public function test_get_available_slots_excludes_source_trip(): void
    {
        $mobil = Mobil::factory()->create();
        $driver = Driver::factory()->create();
        $trip = Trip::factory()->create([
            'trip_date' => '2026-05-04',
            'trip_time' => '07:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'status' => 'scheduled',
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
        ]);

        $service = $this->makeService();
        $result = $service->getAvailableSlotsToday('2026-05-04', 'ROHUL_TO_PKB', $trip->id);

        $this->assertEmpty($result);
    }

    public function test_get_available_slots_filters_occupied_seats(): void
    {
        $mobil = Mobil::factory()->create();
        $driver = Driver::factory()->create();
        $trip = Trip::factory()->create([
            'trip_date' => '2026-05-04',
            'trip_time' => '13:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'status' => 'scheduled',
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
        ]);
        Booking::factory()->create([
            'trip_date' => '2026-05-04',
            'trip_time' => '13:00:00',
            'direction' => 'to_pkb',
            'booking_status' => 'Diproses',
            'selected_seats' => ['1A', '2A'],
        ]);

        $service = $this->makeService();
        $result = $service->getAvailableSlotsToday('2026-05-04', 'ROHUL_TO_PKB', 99999);

        $this->assertCount(1, $result);
        $this->assertNotContains('1A', $result[0]['available_seats']);
        $this->assertNotContains('2A', $result[0]['available_seats']);
        $this->assertContains('3A', $result[0]['available_seats']);
    }

    public function test_get_available_slots_returns_empty_when_no_other_trips(): void
    {
        $service = $this->makeService();
        $result = $service->getAvailableSlotsToday('2026-05-04', 'ROHUL_TO_PKB', 99999);

        $this->assertEmpty($result);
    }
}
