<?php

namespace Tests\Unit\Services;

use App\Exceptions\WizardBackEditOnPaidBookingException;
use App\Models\Booking;
use App\Models\BookingSeat;
use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use App\Models\User;
use App\Services\RegularBookingDraftService;
use App\Services\RegularBookingPersistenceService;
use App\Services\RegularBookingService;
use App\Services\SeatLockService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Smoke coverage RegularBookingPersistenceService::persistDraft update path
 * (Section M2: bug #22 wizard re-invoke bypass).
 *
 * 6 test case:
 *   - Pattern C no-op (1)
 *   - Re-invoke seat change release+relock (1)
 *   - Re-invoke slot change release+relock (1)
 *   - Re-invoke paid booking guard throws (1)
 *   - Create path unaffected regression (1)
 *   - Reason string format verify (1)
 *
 * Test bypass controller & Form Request — invoke persistDraft() langsung dengan
 * session state + draft array yang mirror wizard flow.
 */
class RegularBookingPersistenceServiceTest extends TestCase
{
    use RefreshDatabase;

    protected RegularBookingPersistenceService $svc;
    protected SeatLockService $lockSvc;
    protected RegularBookingService $regularSvc;
    protected RegularBookingDraftService $draftSvc;
    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->svc = $this->app->make(RegularBookingPersistenceService::class);
        $this->lockSvc = $this->app->make(SeatLockService::class);
        $this->regularSvc = $this->app->make(RegularBookingService::class);
        $this->draftSvc = $this->app->make(RegularBookingDraftService::class);
        $this->admin = User::factory()->create(['role' => 'Super Admin']);
    }

    protected function draftPayload(array $overrides = []): array
    {
        return array_merge([
            'trip_date' => '2026-04-20',
            'booking_type' => 'self',
            'pickup_location' => 'SKPD',
            'destination_location' => 'Pekanbaru',
            'departure_time' => '05:30',
            'passenger_count' => 2,
            'pickup_address' => 'Jl. Sudirman No. 123 Pekanbaru',
            'dropoff_address' => 'Terminal Pekanbaru Kota',
            'fare_amount' => 150000,
            'additional_fare_per_passenger' => 0,
            'armada_index' => 1,
            'selected_seats' => ['1A', '2A'],
            'passengers' => [
                ['seat_no' => '1A', 'name' => 'Budi', 'phone' => '081234567890'],
                ['seat_no' => '2A', 'name' => 'Siti', 'phone' => '081234567891'],
            ],
        ], $overrides);
    }

    protected function freshSession(): \Illuminate\Contracts\Session\Session
    {
        return $this->app['session']->driver();
    }

    // ── Create path regression guard ───────────────────────────────────────

    public function test_persistDraft_create_path_unaffected_by_m2_changes(): void
    {
        $session = $this->freshSession();
        $draft = $this->draftPayload();

        $booking = $this->svc->persistDraft($session, $draft, $this->regularSvc, $this->draftSvc, $this->admin);

        // Create path: Section G wasRecentlyCreated branch fires, locks 2 seats soft
        $active = BookingSeat::query()->where('booking_id', $booking->id)->active()->get();
        $this->assertCount(2, $active);
        $this->assertEqualsCanonicalizing(['1A', '2A'], $active->pluck('seat_number')->all());
        $this->assertTrue($active->every(fn (BookingSeat $r): bool => $r->lock_type === 'soft'));
        $this->assertTrue($active->every(fn (BookingSeat $r): bool => $r->lock_released_at === null));
    }

    // ── Pattern C no-op ────────────────────────────────────────────────────

    public function test_persistDraft_no_op_when_review_state_identical(): void
    {
        $session = $this->freshSession();
        $draft = $this->draftPayload();

        $first = $this->svc->persistDraft($session, $draft, $this->regularSvc, $this->draftSvc, $this->admin);
        $this->assertSame(2, BookingSeat::query()->where('booking_id', $first->id)->active()->count());

        // Re-invoke dengan draft identical — Pattern C detect no change, skip release+relock
        $second = $this->svc->persistDraft($session, $draft, $this->regularSvc, $this->draftSvc, $this->admin);

        $this->assertSame($first->id, $second->id);

        // booking_seats state unchanged: no released rows, same 2 active rows
        $rows = BookingSeat::query()->where('booking_id', $first->id)->get();
        $this->assertCount(2, $rows);
        $this->assertTrue($rows->every(fn (BookingSeat $r): bool => $r->lock_released_at === null));
    }

    // ── Re-invoke with seat change ─────────────────────────────────────────

    public function test_persistDraft_re_invoke_with_seat_change_releases_and_relocks_soft(): void
    {
        $session = $this->freshSession();
        $first = $this->svc->persistDraft(
            $session,
            $this->draftPayload(),
            $this->regularSvc,
            $this->draftSvc,
            $this->admin,
        );

        $draftChanged = $this->draftPayload([
            'selected_seats' => ['3A', '4A'],
            'passengers' => [
                ['seat_no' => '3A', 'name' => 'Budi', 'phone' => '081234567890'],
                ['seat_no' => '4A', 'name' => 'Siti', 'phone' => '081234567891'],
            ],
        ]);

        $this->svc->persistDraft($session, $draftChanged, $this->regularSvc, $this->draftSvc, $this->admin);

        // Old rows released
        $released = BookingSeat::query()
            ->where('booking_id', $first->id)
            ->whereIn('seat_number', ['1A', '2A'])
            ->get();
        $this->assertCount(2, $released);
        $this->assertTrue($released->every(fn (BookingSeat $r): bool => $r->lock_released_at !== null));
        $this->assertTrue($released->every(fn (BookingSeat $r): bool => $r->lock_released_by === $this->admin->id));

        // New rows active + soft
        $active = BookingSeat::query()->where('booking_id', $first->id)->active()->get();
        $this->assertCount(2, $active);
        $this->assertEqualsCanonicalizing(['3A', '4A'], $active->pluck('seat_number')->all());
        $this->assertTrue($active->every(fn (BookingSeat $r): bool => $r->lock_type === 'soft'));
    }

    // ── Re-invoke with slot change ─────────────────────────────────────────

    public function test_persistDraft_re_invoke_with_slot_change_releases_and_relocks_soft(): void
    {
        $session = $this->freshSession();
        $first = $this->svc->persistDraft(
            $session,
            $this->draftPayload(),
            $this->regularSvc,
            $this->draftSvc,
            $this->admin,
        );

        $draftChanged = $this->draftPayload(['trip_date' => '2026-04-25']);

        $this->svc->persistDraft($session, $draftChanged, $this->regularSvc, $this->draftSvc, $this->admin);

        // Old slot rows released
        $oldSlotRows = BookingSeat::query()
            ->where('booking_id', $first->id)
            ->where('trip_date', '2026-04-20')
            ->get();
        $this->assertCount(2, $oldSlotRows);
        $this->assertTrue($oldSlotRows->every(fn (BookingSeat $r): bool => $r->lock_released_at !== null));

        // New slot rows active
        $newSlotRows = BookingSeat::query()
            ->where('booking_id', $first->id)
            ->where('trip_date', '2026-04-25')
            ->active()
            ->get();
        $this->assertCount(2, $newSlotRows);
        $this->assertEqualsCanonicalizing(['1A', '2A'], $newSlotRows->pluck('seat_number')->all());
    }

    // ── Re-invoke paid booking guard ───────────────────────────────────────

    public function test_persistDraft_re_invoke_throws_WizardBackEditOnPaidBookingException_when_booking_paid(): void
    {
        $session = $this->freshSession();
        $booking = $this->svc->persistDraft(
            $session,
            $this->draftPayload(),
            $this->regularSvc,
            $this->draftSvc,
            $this->admin,
        );

        // Simulate payment confirmation: booking ditandai Dibayar
        $booking->update(['payment_status' => 'Dibayar']);

        $draftChanged = $this->draftPayload([
            'selected_seats' => ['3A', '4A'],
            'passengers' => [
                ['seat_no' => '3A', 'name' => 'Budi', 'phone' => '081234567890'],
                ['seat_no' => '4A', 'name' => 'Siti', 'phone' => '081234567891'],
            ],
        ]);

        try {
            $this->svc->persistDraft($session, $draftChanged, $this->regularSvc, $this->draftSvc, $this->admin);
            $this->fail('Expected WizardBackEditOnPaidBookingException');
        } catch (WizardBackEditOnPaidBookingException $e) {
            $this->assertSame($booking->id, $e->bookingId);
            $this->assertSame($booking->booking_code, $e->bookingCode);
            $this->assertSame('Regular', $e->category);
        }

        // Transaction rollback: booking state preserved (payment_status masih Dibayar,
        // seats [1A,2A] masih active, no release markers)
        $preserved = Booking::query()->find($booking->id);
        $this->assertSame('Dibayar', $preserved->payment_status);

        $active = BookingSeat::query()->where('booking_id', $booking->id)->active()->get();
        $this->assertCount(2, $active);
        $this->assertEqualsCanonicalizing(['1A', '2A'], $active->pluck('seat_number')->all());
    }

    // ── Reason string format verify ────────────────────────────────────────

    public function test_persistDraft_re_invoke_actor_recorded_in_lock_release_reason(): void
    {
        $session = $this->freshSession();
        $first = $this->svc->persistDraft(
            $session,
            $this->draftPayload(),
            $this->regularSvc,
            $this->draftSvc,
            $this->admin,
        );

        $draftChanged = $this->draftPayload([
            'selected_seats' => ['3A', '4A'],
            'passengers' => [
                ['seat_no' => '3A', 'name' => 'Budi', 'phone' => '081234567890'],
                ['seat_no' => '4A', 'name' => 'Siti', 'phone' => '081234567891'],
            ],
        ]);

        $this->svc->persistDraft($session, $draftChanged, $this->regularSvc, $this->draftSvc, $this->admin);

        $released = BookingSeat::query()
            ->where('booking_id', $first->id)
            ->whereIn('seat_number', ['1A', '2A'])
            ->first();

        $this->assertNotNull($released);
        $expectedPrefix = sprintf(
            'wizard_review_resubmit_regular_%s_by_user_',
            $first->booking_code,
        );
        $this->assertStringStartsWith($expectedPrefix, (string) $released->lock_release_reason);
        $this->assertStringEndsWith($this->admin->id, (string) $released->lock_release_reason);
    }

    // ── Bug #32 retroactive regression guard (M3) ─────────────────────────

    public function test_persistPaymentSelection_fallback_to_persistDraft_passes_actor_when_session_lost(): void
    {
        // Pre-condition: fresh session TANPA persistedBookingId (simulate session expire
        // / user direct-navigate ke payment without going through review step).
        // Pre-fix (bug #32): fallback $this->persistDraft(...) call dengan 4 arg causes
        // TypeError karena M2 f8a6b3a add User $actor sebagai 5th required positional.
        // Post-fix (M3 atomic dengan bug #25): $actor di-propagate ke fallback.
        $session = $this->freshSession();
        $draft = $this->draftPayload();

        $paymentData = ['payment_method' => 'cash', 'bank_account_code' => null];
        $paymentSvc = $this->app->make(\App\Services\RegularBookingPaymentService::class);

        $booking = $this->svc->persistPaymentSelection(
            $session,
            $draft,
            $paymentData,
            $this->regularSvc,
            $this->draftSvc,
            $paymentSvc,
            $this->admin,
        );

        // Post-fix: booking created via fallback persistDraft create path (Section G)
        $this->assertNotNull($booking);
        $this->assertSame('Reguler', $booking->category);
        // 2 active booking_seats rows (create path lockSeats fires via wasRecentlyCreated)
        $this->assertSame(2, BookingSeat::query()->where('booking_id', $booking->id)->active()->count());
    }

    // ── Bug #31: promoteToHard activation ─────────────────────────────────

    public function test_persistPaymentSelection_cash_promotes_seats_to_hard(): void
    {
        $session = $this->freshSession();
        $draft = $this->draftPayload();
        $paymentData = ['payment_method' => 'cash', 'bank_account_code' => null];
        $paymentSvc = $this->app->make(\App\Services\RegularBookingPaymentService::class);

        $booking = $this->svc->persistPaymentSelection(
            $session,
            $draft,
            $paymentData,
            $this->regularSvc,
            $this->draftSvc,
            $paymentSvc,
            $this->admin,
        );

        $this->assertSame('Dibayar Tunai', $booking->payment_status);

        $active = BookingSeat::query()->where('booking_id', $booking->id)->active()->get();
        $this->assertSame(2, $active->count());
        $this->assertTrue(
            $active->every(fn (BookingSeat $r): bool => $r->lock_type === 'hard'),
            'All active seats must be promoted to hard after cash payment (bug #31 fix).',
        );
    }

    public function test_persistPaymentSelection_transfer_keeps_seats_soft(): void
    {
        $session = $this->freshSession();
        $draft = $this->draftPayload();
        $paymentData = ['payment_method' => 'transfer', 'bank_account_code' => null];
        $paymentSvc = $this->app->make(\App\Services\RegularBookingPaymentService::class);

        $booking = $this->svc->persistPaymentSelection(
            $session,
            $draft,
            $paymentData,
            $this->regularSvc,
            $this->draftSvc,
            $paymentSvc,
            $this->admin,
        );

        // Transfer pending admin verification → payment_status='Menunggu Verifikasi',
        // marksAsPaid=false → seats stay soft sampai admin validatePayment action=lunas.
        $this->assertSame('Menunggu Verifikasi', $booking->payment_status);

        $active = BookingSeat::query()->where('booking_id', $booking->id)->active()->get();
        $this->assertSame(2, $active->count());
        $this->assertTrue(
            $active->every(fn (BookingSeat $r): bool => $r->lock_type === 'soft'),
            'Transfer payment must NOT promote to hard (defer ke admin verification, bug #31 scope).',
        );
    }

    // ── Sesi 50 PR #1: TripBookingMatcher auto-link integration ────────────

    public function test_persistDraft_auto_links_trip_id_when_matching_trip_exists(): void
    {
        $mobil = Mobil::factory()->create();
        $driver = Driver::factory()->create(['nama' => 'Pak Heri']);

        // Trip match: 2026-04-20 05:30 ROHUL_TO_PKB sequence=1 (SKPD→PKB / armada_index=1)
        $trip = Trip::factory()->create([
            'trip_date' => '2026-04-20',
            'trip_time' => '05:30:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence'  => 1,
            'mobil_id'  => $mobil->id,
            'driver_id' => $driver->id,
            'status'    => 'scheduled',
        ]);

        $session = $this->freshSession();
        $booking = $this->svc->persistDraft($session, $this->draftPayload(), $this->regularSvc, $this->draftSvc, $this->admin);

        $this->assertSame($trip->id, $booking->trip_id);
        $this->assertSame($mobil->id, $booking->mobil_id);
        $this->assertSame($driver->id, $booking->driver_id);
        $this->assertSame('Pak Heri', $booking->driver_name);
    }

    public function test_persistDraft_leaves_trip_id_null_when_no_matching_trip(): void
    {
        // Trip ada tapi sequence beda → tidak match, semua field null.
        $mobil = Mobil::factory()->create();
        $driver = Driver::factory()->create();
        Trip::factory()->create([
            'trip_date' => '2026-04-20',
            'trip_time' => '05:30:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence'  => 9,
            'mobil_id'  => $mobil->id,
            'driver_id' => $driver->id,
            'status'    => 'scheduled',
        ]);

        $session = $this->freshSession();
        $booking = $this->svc->persistDraft($session, $this->draftPayload(), $this->regularSvc, $this->draftSvc, $this->admin);

        $this->assertNull($booking->trip_id);
        $this->assertNull($booking->mobil_id);
        $this->assertNull($booking->driver_id);
        $this->assertNull($booking->driver_name);
    }

    public function test_persistDraft_skips_trip_with_status_tidak_berangkat(): void
    {
        $mobil = Mobil::factory()->create();
        $driver = Driver::factory()->create(['nama' => 'Pak Joko']);

        Trip::factory()->tidakBerangkat()->create([
            'trip_date' => '2026-04-20',
            'trip_time' => '05:30:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence'  => 1,
            'mobil_id'  => $mobil->id,
            'driver_id' => $driver->id,
        ]);

        $session = $this->freshSession();
        $booking = $this->svc->persistDraft($session, $this->draftPayload(), $this->regularSvc, $this->draftSvc, $this->admin);

        // Trip cancelled tidak boleh di-link.
        $this->assertNull($booking->trip_id);
        $this->assertNull($booking->mobil_id);
        $this->assertNull($booking->driver_id);
        $this->assertNull($booking->driver_name);
    }
}
