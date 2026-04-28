<?php

namespace Tests\Unit\Services;

use App\Models\Booking;
use App\Models\BookingNotificationPending;
use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use App\Services\DroppingTripIntegrationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

/**
 * Test coverage Sesi 50 PR #4 — DroppingTripIntegrationService.
 *
 * Konvensi: gunakan Trip::factory()->scheduled() untuk Trip default scheduled,
 * keluarTrip() untuk Trip yang sudah dropping, dan eksplisit specify mobil/driver
 * via state() supaya cross-reference dengan Booking deterministic.
 */
class DroppingTripIntegrationServiceTest extends TestCase
{
    use RefreshDatabase;

    private DroppingTripIntegrationService $svc;

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow('2026-05-01 10:00:00');
        $this->svc = $this->app->make(DroppingTripIntegrationService::class);
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
            armadaIndex: 1,
        );

        $this->assertTrue($result['hasConflict']);
        $this->assertNotNull($result['conflictingTrip']);
        $this->assertSame($trip->id, $result['conflictingTrip']->id);
        $this->assertSame(1, $result['peerBookingsCount']);
    }

    public function test_detectMobilConflict_returns_false_when_mobil_has_no_passengers(): void
    {
        [$mobil] = $this->setupMatchingTrip('2026-05-05', '07:00:00');

        $result = $this->svc->detectMobilConflict(
            mobilId: $mobil->id,
            tripDate: '2026-05-05',
            tripTime: '07:00',
            bookingDirection: 'to_pkb',
            armadaIndex: 1,
        );

        $this->assertFalse($result['hasConflict']);
        $this->assertNull($result['conflictingTrip']);
        $this->assertSame(0, $result['peerBookingsCount']);
    }

    public function test_detectMobilConflict_returns_false_when_mobil_only_has_draft_or_cancelled(): void
    {
        [$mobil, , $trip] = $this->setupMatchingTrip('2026-05-05', '07:00:00');

        Booking::factory()->create([
            'category'       => 'Reguler',
            'trip_id'        => $trip->id,
            'mobil_id'       => $mobil->id,
            'trip_date'      => '2026-05-05',
            'trip_time'      => '07:00:00',
            'direction'      => 'to_pkb',
            'booking_status' => 'Draft',
        ]);
        Booking::factory()->create([
            'category'       => 'Reguler',
            'trip_id'        => $trip->id,
            'mobil_id'       => $mobil->id,
            'trip_date'      => '2026-05-05',
            'trip_time'      => '07:00:00',
            'direction'      => 'to_pkb',
            'booking_status' => 'Cancelled',
        ]);

        $result = $this->svc->detectMobilConflict(
            mobilId: $mobil->id,
            tripDate: '2026-05-05',
            tripTime: '07:00',
            bookingDirection: 'to_pkb',
            armadaIndex: 1,
        );

        $this->assertFalse($result['hasConflict']);
    }

    public function test_detectMobilConflict_returns_available_replacement_mobils(): void
    {
        [$mobil, , $trip] = $this->setupMatchingTrip('2026-05-05', '07:00:00');

        // Active regular passenger to trigger conflict.
        Booking::factory()->create([
            'category'       => 'Reguler',
            'trip_id'        => $trip->id,
            'mobil_id'       => $mobil->id,
            'trip_date'      => '2026-05-05',
            'trip_time'      => '07:00:00',
            'direction'      => 'to_pkb',
            'booking_status' => 'Aktif',
        ]);

        // 2 mobil idle (active_in_trip=true, tidak punya Trip di tanggal+arah).
        Mobil::factory()->count(2)->create(['is_active_in_trip' => true]);

        // 1 mobil yang already assigned ke Trip lain di tanggal+arah sama (excluded).
        $busyMobil = Mobil::factory()->create(['is_active_in_trip' => true]);
        Trip::factory()->scheduled()->create([
            'trip_date' => '2026-05-05',
            'trip_time' => '08:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence'  => 2,
            'mobil_id'  => $busyMobil->id,
        ]);

        // 1 mobil inactive (excluded).
        Mobil::factory()->create(['is_active_in_trip' => false]);

        $result = $this->svc->detectMobilConflict(
            mobilId: $mobil->id,
            tripDate: '2026-05-05',
            tripTime: '07:00',
            bookingDirection: 'to_pkb',
            armadaIndex: 1,
        );

        $this->assertTrue($result['hasConflict']);
        // Hanya 2 idle mobil yang tersedia (busy + inactive di-exclude, mobil
        // konflik sendiri di-exclude). Driver mobil sendiri juga di-exclude.
        $this->assertSame(2, $result['availableReplacementMobils']->count());

        $availableIds = $result['availableReplacementMobils']->pluck('id')->all();
        $this->assertNotContains($mobil->id, $availableIds);
        $this->assertNotContains($busyMobil->id, $availableIds);
    }

    // ── executeSwapAndDroppingLink ────────────────────────────────────────────

    public function test_executeSwapAndDroppingLink_swaps_mobil_and_keluar_trip_dropping(): void
    {
        [$mobilA, , $tripA] = $this->setupMatchingTrip('2026-05-05', '07:00:00');

        // Trip B di slot lain, mobil B available untuk swap.
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

        // Peer booking reguler di Trip A.
        $peer = Booking::factory()->create([
            'category'       => 'Reguler',
            'trip_id'        => $tripA->id,
            'mobil_id'       => $mobilA->id,
            'trip_date'      => '2026-05-05',
            'trip_time'      => '07:00:00',
            'direction'      => 'to_pkb',
            'booking_status' => 'Aktif',
        ]);

        // Booking dropping yang sedang di-save (sudah di-create di controller).
        $droppingBooking = Booking::factory()->create([
            'category'             => 'Dropping',
            'mobil_id'             => $mobilA->id,
            'trip_date'            => '2026-05-05',
            'trip_time'            => '07:00:00',
            'direction'            => 'to_pkb',
            'dropping_pool_target' => 'ROHUL',
            'booking_status'       => 'Aktif',
        ]);

        $this->svc->executeSwapAndDroppingLink(
            droppingBooking: $droppingBooking,
            conflictingTrip: $tripA,
            replacementMobilId: $mobilB->id,
            poolTarget: 'ROHUL',
        );

        $tripA->refresh();
        $tripB->refresh();
        $peer->refresh();
        $droppingBooking->refresh();

        // Trip A sekarang keluar_trip dropping, mobil_id = mobilA (swap dari B → A).
        // Setelah swap A↔B: Trip A.mobil_id = mobilB, Trip B.mobil_id = mobilA.
        $this->assertSame('keluar_trip', $tripA->status);
        $this->assertSame('dropping', $tripA->keluar_trip_reason);
        $this->assertSame($mobilB->id, $tripA->mobil_id);
        $this->assertSame($mobilA->id, $tripB->mobil_id);

        // Peer booking ikut mobil pengganti (mobilB).
        $this->assertSame($mobilB->id, $peer->mobil_id);

        // Booking Dropping linked ke Trip A.
        $this->assertSame($tripA->id, $droppingBooking->trip_id);
    }

    public function test_executeSwapAndDroppingLink_records_notification_for_peers(): void
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

        $droppingBooking = Booking::factory()->create([
            'category'             => 'Dropping',
            'mobil_id'             => $mobilA->id,
            'trip_date'            => '2026-05-05',
            'trip_time'            => '07:00:00',
            'direction'            => 'to_pkb',
            'dropping_pool_target' => 'ROHUL',
            'booking_status'       => 'Aktif',
        ]);

        $this->svc->executeSwapAndDroppingLink(
            droppingBooking: $droppingBooking,
            conflictingTrip: $tripA,
            replacementMobilId: $mobilB->id,
            poolTarget: 'ROHUL',
        );

        $notifs = BookingNotificationPending::query()
            ->where('event_type', 'mobil_changed')
            ->get();

        $this->assertGreaterThanOrEqual(1, $notifs->count(),
            'Peer booking harus dapat notif mobil_changed.');
    }

    // ── createDraftDroppingForKeluarTrip ──────────────────────────────────────

    public function test_createDraftDroppingForKeluarTrip_idempotent_returns_existing(): void
    {
        $trip = Trip::factory()->keluarTrip('out', 'ROHUL')->create([
            'trip_date' => '2026-05-05',
            'trip_time' => '07:00:00',
        ])->refresh();

        $first  = $this->svc->createDraftDroppingForKeluarTrip($trip);
        $second = $this->svc->createDraftDroppingForKeluarTrip($trip);

        $this->assertSame($first->id, $second->id, 'Idempotent: panggilan kedua return existing.');
        $this->assertSame(1, Booking::query()
            ->where('trip_id', $trip->id)
            ->where('category', 'Dropping')
            ->count(),
        );
    }

    public function test_createDraftDroppingForKeluarTrip_links_trip_id_and_inherits_mobil_driver(): void
    {
        $mobil  = Mobil::factory()->create();
        $driver = Driver::factory()->create();
        $trip   = Trip::factory()->keluarTrip('out', 'ROHUL')->create([
            'trip_date' => '2026-05-06',
            'trip_time' => '08:30:00',
            'mobil_id'  => $mobil->id,
            'driver_id' => $driver->id,
        ])->refresh();

        $booking = $this->svc->createDraftDroppingForKeluarTrip($trip);

        $this->assertSame('Dropping', $booking->category);
        $this->assertSame('Draft', $booking->booking_status);
        $this->assertSame($trip->id, $booking->trip_id);
        $this->assertSame($mobil->id, $booking->mobil_id);
        $this->assertSame($driver->id, $booking->driver_id);
        $this->assertSame($driver->nama, $booking->driver_name);
        $this->assertSame('ROHUL', $booking->dropping_pool_target);
        $this->assertSame('TBD', $booking->passenger_name);
        $this->assertStringStartsWith('DBK-', $booking->booking_code);
    }
}
