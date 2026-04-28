<?php

namespace Tests\Unit\Services;

use App\Exceptions\SeatLockReleaseNotAllowedException;
use App\Models\Booking;
use App\Models\BookingSeat;
use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use App\Models\User;
use App\Services\BookingManagementService;
use App\Services\SeatLockService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Smoke coverage BookingManagementService update + delete seat lock flow
 * (Section M1: bug #21 + bug #29).
 *
 * 6 test case:
 *   - updateBooking Pattern C no-op (1)
 *   - updateBooking seat/slot change soft release+relock (2)
 *   - updateBooking hard lock guard (1)
 *   - deleteBooking soft lock release + cascade delete (1)
 *   - deleteBooking hard lock guard (1)
 *
 * Comprehensive coverage defer ke Section L. Test ini minimal regression guard
 * untuk update+delete path seat lock integration.
 */
class BookingManagementServiceTest extends TestCase
{
    use RefreshDatabase;

    protected BookingManagementService $svc;
    protected SeatLockService $lockSvc;
    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->svc = $this->app->make(BookingManagementService::class);
        $this->lockSvc = $this->app->make(SeatLockService::class);
        $this->admin = User::factory()->create(['role' => 'Super Admin']);
    }

    protected function defaultSlot(
        string $date = '2026-04-20',
        string $time = '05:30:00',
        int $armada = 1,
    ): array {
        return [
            'trip_date' => $date,
            'trip_time' => $time,
            'from_city' => 'Pekanbaru',
            'to_city' => 'Pasirpengaraian',
            'armada_index' => $armada,
        ];
    }

    protected function makeBookingForSlot(array $slotOverrides = []): Booking
    {
        $slot = array_merge($this->defaultSlot(), $slotOverrides);

        return Booking::factory()->create([
            'trip_date' => $slot['trip_date'],
            'trip_time' => $slot['trip_time'],
            'from_city' => $slot['from_city'],
            'to_city' => $slot['to_city'],
            'armada_index' => $slot['armada_index'],
            'selected_seats' => [],
            'passenger_count' => 2,
        ]);
    }

    protected function validatedPayload(array $overrides = []): array
    {
        return array_merge([
            'booking_for' => 'Untuk Diri Sendiri',
            'from_city' => 'Pekanbaru',
            'to_city' => 'Pasirpengaraian',
            'trip_date' => '2026-04-20',
            'trip_time' => '05:30:00',
            'passenger_count' => 2,
            'pickup_location' => 'Jl. Sudirman No. 123 Pekanbaru',
            'dropoff_location' => 'Terminal Pasirpengaraian Kota',
            'selected_seats' => ['1A', '2A'],
            'passengers' => [
                ['seat_no' => '1A', 'name' => 'Budi', 'phone' => '081234567890'],
                ['seat_no' => '2A', 'name' => 'Siti', 'phone' => '081234567891'],
            ],
            'category' => 'Reguler',
            'payment_method' => null,
            'payment_status' => 'Belum Bayar',
            'booking_status' => 'Draft',
            'notes' => '',
            'armada_index' => 1,
            'additional_fare_per_passenger' => 0,
            'driver_name' => null,
            'bank_account_code' => null,
        ], $overrides);
    }

    // ── updateBooking Pattern C ─────────────────────────────────────────────

    public function test_updateBooking_no_op_when_slot_and_seats_identical(): void
    {
        $booking = $this->makeBookingForSlot();
        $this->lockSvc->lockSeats($booking, [$this->defaultSlot()], ['1A', '2A']);

        $this->assertSame(2, BookingSeat::query()->where('booking_id', $booking->id)->active()->count());

        $payload = $this->validatedPayload(['notes' => 'Update hanya notes, seat+slot identical']);
        $this->svc->updateBooking($booking->fresh(), $payload, $this->admin, $booking->fresh()->version);

        // No new rows, no released rows — booking_seats state unchanged.
        $rows = BookingSeat::query()->where('booking_id', $booking->id)->get();
        $this->assertCount(2, $rows);
        $this->assertTrue($rows->every(fn (BookingSeat $r): bool => $r->lock_released_at === null));
        $this->assertSame('Update hanya notes, seat+slot identical', $booking->fresh()->notes);
    }

    public function test_updateBooking_seat_change_releases_and_relocks_soft(): void
    {
        $booking = $this->makeBookingForSlot();
        $this->lockSvc->lockSeats($booking, [$this->defaultSlot()], ['1A', '2A']);

        $payload = $this->validatedPayload([
            'selected_seats' => ['3A', '4A'],
            'passengers' => [
                ['seat_no' => '3A', 'name' => 'Budi', 'phone' => '081234567890'],
                ['seat_no' => '4A', 'name' => 'Siti', 'phone' => '081234567891'],
            ],
        ]);
        $this->svc->updateBooking($booking->fresh(), $payload, $this->admin, $booking->fresh()->version);

        // Old rows released dengan audit fields.
        $released = BookingSeat::query()
            ->where('booking_id', $booking->id)
            ->whereIn('seat_number', ['1A', '2A'])
            ->get();
        $this->assertCount(2, $released);
        $this->assertTrue($released->every(fn (BookingSeat $r): bool => $r->lock_released_at !== null));
        $this->assertTrue($released->every(fn (BookingSeat $r): bool => $r->lock_released_by === $this->admin->id));
        $this->assertTrue($released->every(fn (BookingSeat $r): bool => str_starts_with(
            (string) $r->lock_release_reason,
            'admin_update_booking_',
        )));

        // New rows active + soft untuk [3A, 4A].
        $active = BookingSeat::query()
            ->where('booking_id', $booking->id)
            ->active()
            ->get();
        $this->assertCount(2, $active);
        $this->assertEqualsCanonicalizing(['3A', '4A'], $active->pluck('seat_number')->all());
        $this->assertTrue($active->every(fn (BookingSeat $r): bool => $r->lock_type === 'soft'));
    }

    public function test_updateBooking_slot_change_releases_and_relocks_soft(): void
    {
        $booking = $this->makeBookingForSlot();
        $this->lockSvc->lockSeats($booking, [$this->defaultSlot()], ['1A', '2A']);

        $payload = $this->validatedPayload([
            'trip_date' => '2026-04-25',
        ]);
        $this->svc->updateBooking($booking->fresh(), $payload, $this->admin, $booking->fresh()->version);

        // Old slot rows released.
        $oldSlotRows = BookingSeat::query()
            ->where('booking_id', $booking->id)
            ->where('trip_date', '2026-04-20')
            ->get();
        $this->assertCount(2, $oldSlotRows);
        $this->assertTrue($oldSlotRows->every(fn (BookingSeat $r): bool => $r->lock_released_at !== null));

        // New slot rows active.
        $newSlotRows = BookingSeat::query()
            ->where('booking_id', $booking->id)
            ->where('trip_date', '2026-04-25')
            ->active()
            ->get();
        $this->assertCount(2, $newSlotRows);
        $this->assertEqualsCanonicalizing(['1A', '2A'], $newSlotRows->pluck('seat_number')->all());
    }

    public function test_updateBooking_seat_change_with_hard_lock_throws_exception(): void
    {
        $booking = $this->makeBookingForSlot();
        // Production flow: soft lock saat create, promote ke hard saat payment confirmed.
        $this->lockSvc->lockSeats($booking, [$this->defaultSlot()], ['1A', '2A']);
        $this->lockSvc->promoteToHard($booking);

        $this->assertSame(2, BookingSeat::query()
            ->where('booking_id', $booking->id)
            ->active()
            ->hardLocks()
            ->count());

        $payload = $this->validatedPayload([
            'selected_seats' => ['3A', '4A'],
            'passengers' => [
                ['seat_no' => '3A', 'name' => 'Budi', 'phone' => '081234567890'],
                ['seat_no' => '4A', 'name' => 'Siti', 'phone' => '081234567891'],
            ],
        ]);

        try {
            $this->svc->updateBooking($booking->fresh(), $payload, $this->admin, $booking->fresh()->version);
            $this->fail('Expected SeatLockReleaseNotAllowedException');
        } catch (SeatLockReleaseNotAllowedException $e) {
            $this->assertSame($booking->id, $e->bookingId);
            $this->assertEqualsCanonicalizing(['1A', '2A'], $e->hardLockedSeats);
        }

        // Transaction rollback: booking state unchanged.
        $hardLocked = BookingSeat::query()
            ->where('booking_id', $booking->id)
            ->active()
            ->hardLocks()
            ->get();
        $this->assertCount(2, $hardLocked);
        $this->assertEqualsCanonicalizing(['1A', '2A'], $hardLocked->pluck('seat_number')->all());
    }

    // ── deleteBooking ───────────────────────────────────────────────────────

    public function test_deleteBooking_soft_lock_cascades_rows_and_deletes_booking(): void
    {
        $booking = $this->makeBookingForSlot();
        $this->lockSvc->lockSeats($booking, [$this->defaultSlot()], ['1A', '2A']);

        $bookingId = $booking->id;

        $this->svc->deleteBooking($booking->fresh(), $this->admin, $booking->fresh()->version);

        // Booking row gone.
        $this->assertNull(Booking::query()->find($bookingId));

        // booking_seats rows cascade-deleted (FK cascadeOnDelete) — audit trail loss
        // by design, per Section M1 Option A decision.
        $this->assertSame(0, BookingSeat::query()->where('booking_id', $bookingId)->count());
    }

    public function test_deleteBooking_hard_lock_throws_exception_and_preserves_state(): void
    {
        $booking = $this->makeBookingForSlot();
        $this->lockSvc->lockSeats($booking, [$this->defaultSlot()], ['1A', '2A']);
        $this->lockSvc->promoteToHard($booking);

        $bookingId = $booking->id;

        try {
            $this->svc->deleteBooking($booking->fresh(), $this->admin, $booking->fresh()->version);
            $this->fail('Expected SeatLockReleaseNotAllowedException');
        } catch (SeatLockReleaseNotAllowedException $e) {
            $this->assertSame($bookingId, $e->bookingId);
            $this->assertEqualsCanonicalizing(['1A', '2A'], $e->hardLockedSeats);
        }

        // Transaction rollback: booking + booking_seats tetap utuh, hard lock unchanged.
        $this->assertNotNull(Booking::query()->find($bookingId));
        $active = BookingSeat::query()
            ->where('booking_id', $bookingId)
            ->active()
            ->hardLocks()
            ->get();
        $this->assertCount(2, $active);
        $this->assertEqualsCanonicalizing(['1A', '2A'], $active->pluck('seat_number')->all());
    }

    // ── Sesi 50 PR #2: reverse sync admin assignment → Trip + peer bookings ───

    private function makeMatchingTrip(array $overrides = []): Trip
    {
        $trip = Trip::factory()->create(array_merge([
            'trip_date' => '2026-04-20',
            'trip_time' => '05:30:00',
            // direction Pekanbaru → Pasirpengaraian = from_pkb = PKB_TO_ROHUL
            'direction' => 'PKB_TO_ROHUL',
            'sequence'  => 1,
            'status'    => 'scheduled',
        ], $overrides));

        // version tidak di $fillable Trip — refresh untuk load default 0 dari DB.
        return $trip->refresh();
    }

    public function test_admin_driver_selection_overrides_trip_and_cascades(): void
    {
        $this->actingAs($this->admin);

        $mobil = Mobil::factory()->create();
        $driverOriginal = Driver::factory()->create(['nama' => 'Sulaiman']);
        $driverNew = Driver::factory()->create(['nama' => 'Rusdy']);

        $trip = $this->makeMatchingTrip([
            'mobil_id'  => $mobil->id,
            'driver_id' => $driverOriginal->id,
        ]);

        $payload = $this->validatedPayload([
            'driver_id'   => $driverNew->id,
            'driver_name' => 'Rusdy',
            // mobil_id null — admin tidak override mobil, tetap pakai Trip's mobil.
        ]);

        $booking = $this->svc->createBooking($payload);

        $this->assertSame($trip->id, $booking->trip_id);
        $this->assertSame($driverNew->id, $booking->driver_id);
        $this->assertSame($mobil->id, $booking->mobil_id);
        $this->assertSame('Rusdy', $booking->driver_name);

        $trip->refresh();
        $this->assertSame($driverNew->id, $trip->driver_id);
        $this->assertSame($mobil->id, $trip->mobil_id);
        $this->assertSame(1, $trip->version);
    }

    public function test_admin_mobil_selection_overrides_trip_and_cascades_to_peers(): void
    {
        $this->actingAs($this->admin);

        $mobilOriginal = Mobil::factory()->create();
        $mobilNew = Mobil::factory()->create();
        $driver = Driver::factory()->create(['nama' => 'Sulaiman']);

        $trip = $this->makeMatchingTrip([
            'mobil_id'  => $mobilOriginal->id,
            'driver_id' => $driver->id,
        ]);

        // 2 peer bookings yang sudah ter-link ke trip ini.
        $peer1 = Booking::factory()->create([
            'trip_id'     => $trip->id,
            'mobil_id'    => $mobilOriginal->id,
            'driver_id'   => $driver->id,
            'driver_name' => 'Sulaiman',
            'selected_seats' => ['3A'],
        ]);
        $peer2 = Booking::factory()->create([
            'trip_id'     => $trip->id,
            'mobil_id'    => $mobilOriginal->id,
            'driver_id'   => $driver->id,
            'driver_name' => 'Sulaiman',
            'selected_seats' => ['4A'],
        ]);

        $payload = $this->validatedPayload([
            'mobil_id'    => $mobilNew->id,
            'driver_id'   => $driver->id,
            'driver_name' => 'Sulaiman',
        ]);

        $booking = $this->svc->createBooking($payload);

        $this->assertSame($trip->id, $booking->trip_id);
        $this->assertSame($mobilNew->id, $booking->mobil_id);

        $trip->refresh();
        $this->assertSame($mobilNew->id, $trip->mobil_id);
        $this->assertSame(1, $trip->version);

        $peer1->refresh();
        $peer2->refresh();
        $this->assertSame($mobilNew->id, $peer1->mobil_id);
        $this->assertSame($mobilNew->id, $peer2->mobil_id);
    }

    public function test_no_cascade_when_admin_input_matches_trip(): void
    {
        $mobil = Mobil::factory()->create();
        $driver = Driver::factory()->create(['nama' => 'Sulaiman']);

        $trip = $this->makeMatchingTrip([
            'mobil_id'  => $mobil->id,
            'driver_id' => $driver->id,
        ]);
        $originalVersion = $trip->version;

        $payload = $this->validatedPayload([
            'driver_id'   => $driver->id,   // SAMA dengan trip
            'mobil_id'    => $mobil->id,    // SAMA dengan trip
            'driver_name' => 'Sulaiman',
        ]);

        $booking = $this->svc->createBooking($payload);

        $this->assertSame($trip->id, $booking->trip_id);
        $this->assertSame($driver->id, $booking->driver_id);
        $this->assertSame($mobil->id, $booking->mobil_id);

        // Trip TIDAK ter-update (version tidak naik) — cascade di-skip.
        $trip->refresh();
        $this->assertSame($originalVersion, $trip->version);
    }

    public function test_falls_back_to_trip_when_admin_input_null(): void
    {
        $mobil = Mobil::factory()->create();
        $driver = Driver::factory()->create(['nama' => 'Sulaiman']);

        $trip = $this->makeMatchingTrip([
            'mobil_id'  => $mobil->id,
            'driver_id' => $driver->id,
        ]);
        $originalVersion = $trip->version;

        // Admin TIDAK isi driver_id/mobil_id (null) — booking harus inherit
        // dari Trip, dan Trip TIDAK boleh ter-update karena tidak ada override.
        $payload = $this->validatedPayload([
            // driver_id, mobil_id, driver_name semuanya tidak diisi (null/absent).
        ]);

        $booking = $this->svc->createBooking($payload);

        $this->assertSame($trip->id, $booking->trip_id);
        $this->assertSame($driver->id, $booking->driver_id);
        $this->assertSame($mobil->id, $booking->mobil_id);
        $this->assertSame('Sulaiman', $booking->driver_name);

        // Trip tidak ter-update (no admin override → no cascade).
        $trip->refresh();
        $this->assertSame($originalVersion, $trip->version);
    }
}
