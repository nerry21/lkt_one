<?php

namespace Tests\Unit\Services;

use App\Models\Booking;
use App\Models\BookingNotificationPending;
use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use App\Services\RentalTripIntegrationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

/**
 * Test coverage Sesi 50 PR #5 — RentalTripIntegrationService.
 *
 * Mirror struktur DroppingTripIntegrationServiceTest dengan focus rental
 * quirks: planned_end_date, rental_pool_target, rental amounts.
 */
class RentalTripIntegrationServiceTest extends TestCase
{
    use RefreshDatabase;

    private RentalTripIntegrationService $svc;

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow('2026-05-01 10:00:00');
        $this->svc = $this->app->make(RentalTripIntegrationService::class);
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    private function setupMatchingTrip(string $tripDate, string $tripTime): array
    {
        $mobil  = Mobil::factory()->create(['is_active_in_trip' => true]);
        $driver = Driver::factory()->create();
        $trip   = Trip::factory()->scheduled()->create([
            'trip_date' => $tripDate,
            'trip_time' => $tripTime,
            'direction' => 'ROHUL_TO_PKB',
            'sequence'  => 1,
            'mobil_id'  => $mobil->id,
            'driver_id' => $driver->id,
        ])->refresh();

        return [$mobil, $driver, $trip];
    }

    // ── detectMobilConflict ───────────────────────────────────────────────────

    public function test_detectMobilConflict_returns_true_when_mobil_has_active_regular_passengers(): void
    {
        [$mobil, , $trip] = $this->setupMatchingTrip('2026-05-05', '07:00:00');

        Booking::factory()->create([
            'category'       => 'Reguler',
            'trip_id'        => $trip->id,
            'mobil_id'       => $mobil->id,
            'trip_date'      => '2026-05-05',
            'trip_time'      => '07:00:00',
            'direction'      => 'to_pkb',
            'booking_status' => 'Aktif',
        ]);

        $result = $this->svc->detectMobilConflict(
            mobilId: $mobil->id,
            tripDate: '2026-05-05',
            tripTime: '07:00',
            bookingDirection: 'to_pkb',
        );

        $this->assertTrue($result['hasConflict']);
        $this->assertSame(1, $result['peerBookingsCount']);
        $this->assertSame($trip->id, $result['conflictingTrip']->id);
    }

    public function test_detectMobilConflict_returns_false_when_mobil_has_no_passengers(): void
    {
        [$mobil] = $this->setupMatchingTrip('2026-05-05', '07:00:00');

        $result = $this->svc->detectMobilConflict(
            mobilId: $mobil->id,
            tripDate: '2026-05-05',
            tripTime: '07:00',
            bookingDirection: 'to_pkb',
        );

        $this->assertFalse($result['hasConflict']);
    }

    public function test_detectMobilConflict_returns_available_replacement_mobils(): void
    {
        [$mobil, , $trip] = $this->setupMatchingTrip('2026-05-05', '07:00:00');

        Booking::factory()->create([
            'category'       => 'Reguler',
            'trip_id'        => $trip->id,
            'mobil_id'       => $mobil->id,
            'trip_date'      => '2026-05-05',
            'trip_time'      => '07:00:00',
            'direction'      => 'to_pkb',
            'booking_status' => 'Aktif',
        ]);

        Mobil::factory()->count(2)->create(['is_active_in_trip' => true]);
        Mobil::factory()->create(['is_active_in_trip' => false]);

        $result = $this->svc->detectMobilConflict(
            mobilId: $mobil->id,
            tripDate: '2026-05-05',
            tripTime: '07:00',
            bookingDirection: 'to_pkb',
        );

        $this->assertTrue($result['hasConflict']);
        $this->assertSame(2, $result['availableReplacementMobils']->count());
    }

    // ── executeSwapAndRentalLink ──────────────────────────────────────────────

    public function test_executeSwapAndRentalLink_swaps_mobil_and_keluar_trip_rental(): void
    {
        [$mobilA, , $tripA] = $this->setupMatchingTrip('2026-05-05', '07:00:00');

        $mobilB  = Mobil::factory()->create(['is_active_in_trip' => true]);
        $driverB = Driver::factory()->create();
        $tripB   = Trip::factory()->scheduled()->create([
            'trip_date' => '2026-05-05',
            'trip_time' => '08:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence'  => 2,
            'mobil_id'  => $mobilB->id,
            'driver_id' => $driverB->id,
        ])->refresh();

        $peer = Booking::factory()->create([
            'category'       => 'Reguler',
            'trip_id'        => $tripA->id,
            'mobil_id'       => $mobilA->id,
            'trip_date'      => '2026-05-05',
            'trip_time'      => '07:00:00',
            'direction'      => 'to_pkb',
            'booking_status' => 'Aktif',
        ]);

        $rentalBooking = Booking::factory()->create([
            'category'                    => 'Rental',
            'mobil_id'                    => $mobilA->id,
            'trip_date'                   => '2026-05-05',
            'trip_time'                   => '07:00:00',
            'rental_end_date'             => '2026-05-07',
            'direction'                   => 'to_pkb',
            'rental_pool_target'          => 'ROHUL',
            'rental_keberangkatan_amount' => 500000,
            'rental_kepulangan_amount'    => 500000,
            'booking_status'              => 'Aktif',
        ]);

        $this->svc->executeSwapAndRentalLink(
            rentalBooking: $rentalBooking,
            conflictingTrip: $tripA,
            replacementMobilId: $mobilB->id,
            poolTarget: 'ROHUL',
            plannedEndDate: '2026-05-07',
        );

        $tripA->refresh();
        $tripB->refresh();
        $peer->refresh();
        $rentalBooking->refresh();

        $this->assertSame('keluar_trip', $tripA->status);
        $this->assertSame('rental', $tripA->keluar_trip_reason);
        $this->assertSame($mobilB->id, $tripA->mobil_id);
        $this->assertSame($mobilA->id, $tripB->mobil_id);
        $this->assertSame($mobilB->id, $peer->mobil_id);
        $this->assertSame($tripA->id, $rentalBooking->trip_id);
    }

    public function test_executeSwapAndRentalLink_passes_planned_end_date_to_keluar_trip(): void
    {
        [$mobilA, , $tripA] = $this->setupMatchingTrip('2026-05-05', '07:00:00');

        $rentalBooking = Booking::factory()->create([
            'category'                    => 'Rental',
            'mobil_id'                    => $mobilA->id,
            'trip_date'                   => '2026-05-05',
            'trip_time'                   => '07:00:00',
            'rental_end_date'             => '2026-05-08',
            'direction'                   => 'to_pkb',
            'rental_pool_target'          => 'PKB',
            'rental_keberangkatan_amount' => 600000,
            'rental_kepulangan_amount'    => 400000,
            'booking_status'              => 'Aktif',
        ]);

        // Tanpa replacement mobil — direct markKeluarTrip rental.
        $this->svc->executeSwapAndRentalLink(
            rentalBooking: $rentalBooking,
            conflictingTrip: $tripA,
            replacementMobilId: null,
            poolTarget: 'PKB',
            plannedEndDate: '2026-05-08',
        );

        $tripA->refresh();
        $this->assertSame('keluar_trip', $tripA->status);
        $this->assertSame('rental', $tripA->keluar_trip_reason);
        $this->assertSame('PKB', $tripA->keluar_trip_pool_target);
        $this->assertSame('2026-05-08', $tripA->keluar_trip_planned_end_date->toDateString());
    }

    public function test_executeSwapAndRentalLink_records_notification_for_peers(): void
    {
        [$mobilA, , $tripA] = $this->setupMatchingTrip('2026-05-05', '07:00:00');

        $mobilB = Mobil::factory()->create(['is_active_in_trip' => true]);
        Trip::factory()->scheduled()->create([
            'trip_date' => '2026-05-05',
            'trip_time' => '08:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence'  => 2,
            'mobil_id'  => $mobilB->id,
        ])->refresh();

        Booking::factory()->create([
            'category'       => 'Reguler',
            'trip_id'        => $tripA->id,
            'mobil_id'       => $mobilA->id,
            'trip_date'      => '2026-05-05',
            'trip_time'      => '07:00:00',
            'direction'      => 'to_pkb',
            'booking_status' => 'Aktif',
        ]);

        $rentalBooking = Booking::factory()->create([
            'category'                    => 'Rental',
            'mobil_id'                    => $mobilA->id,
            'trip_date'                   => '2026-05-05',
            'trip_time'                   => '07:00:00',
            'rental_end_date'             => '2026-05-07',
            'direction'                   => 'to_pkb',
            'rental_pool_target'          => 'ROHUL',
            'rental_keberangkatan_amount' => 500000,
            'rental_kepulangan_amount'    => 500000,
            'booking_status'              => 'Aktif',
        ]);

        $this->svc->executeSwapAndRentalLink(
            rentalBooking: $rentalBooking,
            conflictingTrip: $tripA,
            replacementMobilId: $mobilB->id,
            poolTarget: 'ROHUL',
            plannedEndDate: '2026-05-07',
        );

        $count = BookingNotificationPending::query()
            ->where('event_type', 'mobil_changed')
            ->count();

        $this->assertGreaterThanOrEqual(1, $count);
    }

    // ── createDraftRentalForKeluarTrip ────────────────────────────────────────

    public function test_createDraftRentalForKeluarTrip_idempotent_returns_existing(): void
    {
        $trip = Trip::factory()->keluarTrip('out', 'ROHUL')->create([
            'trip_date' => '2026-05-05',
            'trip_time' => '07:00:00',
            'keluar_trip_reason'           => 'rental',
            'keluar_trip_planned_end_date' => '2026-05-07',
        ])->refresh();

        $first  = $this->svc->createDraftRentalForKeluarTrip($trip);
        $second = $this->svc->createDraftRentalForKeluarTrip($trip);

        $this->assertSame($first->id, $second->id);
        $this->assertSame(1, Booking::query()
            ->where('trip_id', $trip->id)
            ->where('category', 'Rental')
            ->count(),
        );
    }

    public function test_createDraftRentalForKeluarTrip_links_trip_id_and_inherits_planned_end_date(): void
    {
        $mobil  = Mobil::factory()->create();
        $driver = Driver::factory()->create();
        $trip   = Trip::factory()->keluarTrip('out', 'PKB')->create([
            'trip_date' => '2026-05-06',
            'trip_time' => '08:30:00',
            'mobil_id'  => $mobil->id,
            'driver_id' => $driver->id,
            'keluar_trip_reason'           => 'rental',
            'keluar_trip_planned_end_date' => '2026-05-09',
        ])->refresh();

        $booking = $this->svc->createDraftRentalForKeluarTrip($trip);

        $this->assertSame('Rental', $booking->category);
        $this->assertSame('Draft', $booking->booking_status);
        $this->assertSame($trip->id, $booking->trip_id);
        $this->assertSame($mobil->id, $booking->mobil_id);
        $this->assertSame($driver->id, $booking->driver_id);
        $this->assertSame('PKB', $booking->rental_pool_target);
        $this->assertSame('2026-05-09', $booking->rental_end_date->toDateString());
        $this->assertNull($booking->rental_keberangkatan_amount);
        $this->assertNull($booking->rental_kepulangan_amount);
        $this->assertStringStartsWith('RNT-', $booking->booking_code);
    }
}
