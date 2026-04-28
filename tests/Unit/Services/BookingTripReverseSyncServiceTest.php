<?php

namespace Tests\Unit\Services;

use App\Exceptions\TripSlotConflictException;
use App\Exceptions\TripVersionConflictException;
use App\Models\Booking;
use App\Models\BookingNotificationPending;
use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use App\Models\User;
use App\Services\BookingTripReverseSyncService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

/**
 * Test coverage BookingTripReverseSyncService (Sesi 50 PR #2).
 *
 * Stateless service — fokus test:
 *   - Cascade driver/mobil change ke Trip + peer bookings (excluding self)
 *   - No-op kalau driver+mobil sama dengan Trip current
 *   - Throw TripSlotConflictException (I2 invariant — mobil double-assign)
 *   - Throw TripVersionConflictException (race condition — version stale)
 */
class BookingTripReverseSyncServiceTest extends TestCase
{
    use RefreshDatabase;

    protected BookingTripReverseSyncService $svc;
    protected User $admin;
    protected Mobil $mobilA;
    protected Mobil $mobilB;
    protected Driver $driverA;
    protected Driver $driverB;

    private const TRIP_DATE = '2026-04-25';

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow('2026-04-24 14:00:00');
        $this->svc = $this->app->make(BookingTripReverseSyncService::class);
        $this->admin = User::factory()->create(['role' => 'Admin']);
        $this->mobilA = Mobil::factory()->create();
        $this->mobilB = Mobil::factory()->create();
        $this->driverA = Driver::factory()->create(['nama' => 'Driver A']);
        $this->driverB = Driver::factory()->create(['nama' => 'Driver B']);
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    private function makeTrip(array $overrides = []): Trip
    {
        $trip = Trip::factory()->create(array_merge([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '07:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence'  => 1,
            'mobil_id'  => $this->mobilA->id,
            'driver_id' => $this->driverA->id,
            'status'    => 'scheduled',
        ], $overrides));

        // version tidak di $fillable Trip — refresh untuk load default 0 dari DB.
        return $trip->refresh();
    }

    public function test_syncs_driver_change_to_trip_and_peer_bookings(): void
    {
        $trip = $this->makeTrip();

        // Booking 100 = booking yang sedang di-save (excluded dari cascade peer).
        $selfBooking = Booking::factory()->create([
            'trip_id'     => $trip->id,
            'mobil_id'    => $this->mobilA->id,
            'driver_id'   => $this->driverA->id,
            'driver_name' => 'Driver A',
        ]);

        // Booking 200, 201 = peer bookings → harus ke-cascade.
        $peer1 = Booking::factory()->create([
            'trip_id'     => $trip->id,
            'mobil_id'    => $this->mobilA->id,
            'driver_id'   => $this->driverA->id,
            'driver_name' => 'Driver A',
        ]);
        $peer2 = Booking::factory()->create([
            'trip_id'     => $trip->id,
            'mobil_id'    => $this->mobilA->id,
            'driver_id'   => $this->driverA->id,
            'driver_name' => 'Driver A',
        ]);

        $this->svc->syncBookingAssignmentToTrip(
            trip:             $trip,
            newDriverId:      $this->driverB->id,
            newMobilId:       $this->mobilA->id,
            newDriverName:    'Driver B',
            excludeBookingId: $selfBooking->id,
            userId:           $this->admin->id,
        );

        $trip->refresh();
        $this->assertSame($this->driverB->id, $trip->driver_id);
        $this->assertSame($this->mobilA->id, $trip->mobil_id);
        $this->assertSame(1, $trip->version);
        $this->assertSame($this->admin->id, $trip->updated_by);

        // Peer bookings ter-cascade.
        $peer1->refresh();
        $peer2->refresh();
        $this->assertSame($this->driverB->id, $peer1->driver_id);
        $this->assertSame('Driver B', $peer1->driver_name);
        $this->assertSame($this->driverB->id, $peer2->driver_id);
        $this->assertSame('Driver B', $peer2->driver_name);

        // Self booking TIDAK ter-touch dari path ini.
        $selfBooking->refresh();
        $this->assertSame($this->driverA->id, $selfBooking->driver_id);
        $this->assertSame('Driver A', $selfBooking->driver_name);
    }

    public function test_syncs_mobil_change_to_trip_and_peer_bookings(): void
    {
        $trip = $this->makeTrip();

        $selfBooking = Booking::factory()->create([
            'trip_id'  => $trip->id,
            'mobil_id' => $this->mobilA->id,
        ]);

        $peer = Booking::factory()->create([
            'trip_id'     => $trip->id,
            'mobil_id'    => $this->mobilA->id,
            'driver_id'   => $this->driverA->id,
            'driver_name' => 'Driver A',
        ]);

        $this->svc->syncBookingAssignmentToTrip(
            trip:             $trip,
            newDriverId:      $this->driverA->id,
            newMobilId:       $this->mobilB->id,
            newDriverName:    'Driver A',
            excludeBookingId: $selfBooking->id,
            userId:           $this->admin->id,
        );

        $trip->refresh();
        $this->assertSame($this->mobilB->id, $trip->mobil_id);
        $this->assertSame($this->driverA->id, $trip->driver_id);
        $this->assertSame(1, $trip->version);

        $peer->refresh();
        $this->assertSame($this->mobilB->id, $peer->mobil_id);
        $this->assertSame($this->driverA->id, $peer->driver_id);
    }

    public function test_no_op_when_driver_and_mobil_unchanged(): void
    {
        $trip = $this->makeTrip();
        $originalVersion = $trip->version;

        DB::enableQueryLog();
        $this->svc->syncBookingAssignmentToTrip(
            trip:             $trip,
            newDriverId:      $this->driverA->id, // SAMA dengan trip current
            newMobilId:       $this->mobilA->id,  // SAMA dengan trip current
            newDriverName:    'Driver A',
            excludeBookingId: 9999,
            userId:           $this->admin->id,
        );
        $queries = DB::getQueryLog();
        DB::disableQueryLog();

        // Tidak ada UPDATE/INSERT/DELETE statement — semua query harus 0.
        $mutationQueries = array_filter($queries, function (array $entry): bool {
            $sql = strtolower((string) ($entry['query'] ?? ''));

            return str_starts_with($sql, 'update')
                || str_starts_with($sql, 'insert')
                || str_starts_with($sql, 'delete');
        });
        $this->assertCount(0, $mutationQueries, 'No-op path harus tidak generate UPDATE/INSERT/DELETE.');

        // Trip version tidak naik.
        $trip->refresh();
        $this->assertSame($originalVersion, $trip->version);
    }

    public function test_throws_TripSlotConflictException_on_mobil_double_assign(): void
    {
        // Trip 1 pakai mobilA. Trip 2 pakai mobilB di tanggal+arah yang sama.
        // Coba sync trip 1 ke mobilB → harus throw karena mobilB sudah dipakai trip 2.
        $trip1 = $this->makeTrip([
            'trip_time' => '07:00:00',
            'sequence'  => 1,
            'mobil_id'  => $this->mobilA->id,
        ]);
        Trip::factory()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '08:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence'  => 2,
            'mobil_id'  => $this->mobilB->id,
            'driver_id' => $this->driverB->id,
            'status'    => 'scheduled',
        ]);

        try {
            $this->svc->syncBookingAssignmentToTrip(
                trip:             $trip1,
                newDriverId:      $this->driverA->id,
                newMobilId:       $this->mobilB->id, // Conflict!
                newDriverName:    'Driver A',
                excludeBookingId: 9999,
                userId:           $this->admin->id,
            );
            $this->fail('Expected TripSlotConflictException with conflictType=mobil');
        } catch (TripSlotConflictException $e) {
            $this->assertSame('mobil', $e->conflictType);
            $this->assertSame($this->mobilB->id, $e->mobilId);
        }

        // Trip 1 tidak ter-update.
        $trip1->refresh();
        $this->assertSame($this->mobilA->id, $trip1->mobil_id);
    }

    public function test_throws_TripVersionConflictException_on_stale_trip_version(): void
    {
        $trip = $this->makeTrip();

        // Simulate concurrent admin update — bump version di DB tanpa lewat service,
        // tapi instance $trip masih punya version lama.
        DB::table('trips')->where('id', $trip->id)->update(['version' => 5]);

        // $trip->version masih 0 (instance stale).
        $this->assertSame(0, $trip->version);

        $this->expectException(TripVersionConflictException::class);

        $this->svc->syncBookingAssignmentToTrip(
            trip:             $trip,
            newDriverId:      $this->driverB->id,
            newMobilId:       $this->mobilA->id,
            newDriverName:    'Driver B',
            excludeBookingId: 9999,
            userId:           $this->admin->id,
        );
    }

    // ── Sesi 50 PR #3: notif foundation untuk peer bookings ─────────────────

    public function test_reverse_sync_creates_mobil_changed_notification_for_peers_only(): void
    {
        $trip = $this->makeTrip();

        $self = Booking::factory()->create([
            'trip_id'        => $trip->id,
            'mobil_id'       => $this->mobilA->id,
            'booking_status' => 'Diproses',
        ]);
        $peer1 = Booking::factory()->create([
            'trip_id'        => $trip->id,
            'mobil_id'       => $this->mobilA->id,
            'booking_status' => 'Diproses',
        ]);
        $peer2 = Booking::factory()->create([
            'trip_id'        => $trip->id,
            'mobil_id'       => $this->mobilA->id,
            'booking_status' => 'Diproses',
        ]);

        $this->svc->syncBookingAssignmentToTrip(
            trip:             $trip,
            newDriverId:      $this->driverA->id,
            newMobilId:       $this->mobilB->id,
            newDriverName:    'Driver A',
            excludeBookingId: $self->id,
            userId:           $this->admin->id,
        );

        $records = BookingNotificationPending::query()
            ->where('event_type', 'mobil_changed')
            ->get();

        // Hanya 2 peer (self exclude).
        $this->assertCount(2, $records);
        $bookingIds = $records->pluck('booking_id')->all();
        $this->assertContains($peer1->id, $bookingIds);
        $this->assertContains($peer2->id, $bookingIds);
        $this->assertNotContains($self->id, $bookingIds);
    }

    public function test_reverse_sync_no_notification_when_no_change(): void
    {
        $trip = $this->makeTrip();

        Booking::factory()->create([
            'trip_id'        => $trip->id,
            'mobil_id'       => $this->mobilA->id,
            'booking_status' => 'Diproses',
        ]);

        $this->svc->syncBookingAssignmentToTrip(
            trip:             $trip,
            newDriverId:      $this->driverA->id, // SAMA dengan trip
            newMobilId:       $this->mobilA->id,  // SAMA dengan trip
            newDriverName:    'Driver A',
            excludeBookingId: 9999,
            userId:           $this->admin->id,
        );

        $this->assertSame(0, BookingNotificationPending::query()->count());
    }
}
