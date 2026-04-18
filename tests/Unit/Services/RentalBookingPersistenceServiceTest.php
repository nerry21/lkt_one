<?php

namespace Tests\Unit\Services;

use App\Exceptions\WizardBackEditOnPaidBookingException;
use App\Models\Booking;
use App\Models\BookingSeat;
use App\Models\User;
use App\Services\RentalBookingDraftService;
use App\Services\RentalBookingPersistenceService;
use App\Services\RentalBookingService;
use App\Services\SeatLockService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Smoke coverage RentalBookingPersistenceService::persistDraft update path
 * (Section M3: bug #25 wizard back-edit bypass) + multi-day edge cases.
 *
 * 7 test case:
 *   - Create path regression guard untuk expandRangeToSlots refactor (1)
 *   - Pattern A no-op identical (1)
 *   - Range extend / shift / shrink release+relock (3)
 *   - Paid booking guard throws (1)
 *   - Reason format verify (1)
 *
 * Test bypass controller + FormRequest — invoke persistDraft() langsung dengan
 * fresh session + draft array yang mirror wizard contract.
 *
 * Rental specifics:
 *   - trip_time hardcoded '00:00:00' di service
 *   - passenger_count hardcoded 6 (full armada reserve)
 *   - selected_seats hardcoded ['1A','2A','2B','3A','4A','5A'] oleh draft normalizeDraft
 *   - Multi-day: N hari × 6 seat = N×6 booking_seats row per booking
 */
class RentalBookingPersistenceServiceTest extends TestCase
{
    use RefreshDatabase;

    protected RentalBookingPersistenceService $svc;
    protected SeatLockService $lockSvc;
    protected RentalBookingService $rentalSvc;
    protected RentalBookingDraftService $draftSvc;
    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->svc = $this->app->make(RentalBookingPersistenceService::class);
        $this->lockSvc = $this->app->make(SeatLockService::class);
        $this->rentalSvc = $this->app->make(RentalBookingService::class);
        $this->draftSvc = $this->app->make(RentalBookingDraftService::class);
        $this->admin = User::factory()->create(['role' => 'Super Admin']);
    }

    protected function draftPayload(array $overrides = []): array
    {
        return array_merge([
            'rental_start_date' => '2026-04-20',
            'rental_end_date' => '2026-04-22',   // default 3 hari
            'booking_type' => 'self',
            'pickup_location' => 'Pekanbaru',
            'destination_location' => 'Pasirpengaraian',
            'pickup_address' => 'Jl. Sudirman No. 123 Pekanbaru',
            'dropoff_address' => 'Jl. Pattimura No. 12 Pasirpengaraian',
            'fare_amount' => 1500000,
            'additional_fare' => 0,
            'armada_index' => 1,
            'passengers' => [
                ['seat_no' => '1A', 'name' => 'Budi', 'phone' => '081234567890'],
            ],
        ], $overrides);
    }

    protected function freshSession(): \Illuminate\Contracts\Session\Session
    {
        return $this->app['session']->driver();
    }

    // ── Create path regression guard ───────────────────────────────────────

    public function test_persistDraft_create_path_unaffected_by_m3_changes(): void
    {
        $session = $this->freshSession();
        $draft = $this->draftPayload();   // 3-hari range (20, 21, 22)

        $booking = $this->svc->persistDraft($session, $draft, $this->rentalSvc, $this->draftSvc, $this->admin);

        // Create path: Section I wasRecentlyCreated branch fires via expandRangeToSlots helper
        // 3 hari × 6 seat = 18 active soft rows
        $active = BookingSeat::query()->where('booking_id', $booking->id)->active()->get();
        $this->assertCount(18, $active);
        $this->assertTrue($active->every(fn (BookingSeat $r): bool => $r->lock_type === 'soft'));
        $this->assertTrue($active->every(fn (BookingSeat $r): bool => $r->lock_released_at === null));

        // Verify date range cover 3 hari
        $dates = $active->pluck('trip_date')->map(fn ($d) => $d->toDateString())->unique()->sort()->values()->all();
        $this->assertSame(['2026-04-20', '2026-04-21', '2026-04-22'], $dates);
    }

    // ── Pattern A no-op ───────────────────────────────────────────────────

    public function test_persistDraft_no_op_when_range_and_seats_identical(): void
    {
        $session = $this->freshSession();
        $draft = $this->draftPayload();

        $first = $this->svc->persistDraft($session, $draft, $this->rentalSvc, $this->draftSvc, $this->admin);
        $this->assertSame(18, BookingSeat::query()->where('booking_id', $first->id)->active()->count());

        // Re-invoke dengan draft identical — Pattern A detect no change, skip release+relock
        $second = $this->svc->persistDraft($session, $draft, $this->rentalSvc, $this->draftSvc, $this->admin);

        $this->assertSame($first->id, $second->id);

        // booking_seats state unchanged: no released rows, same 18 active rows
        $rows = BookingSeat::query()->where('booking_id', $first->id)->get();
        $this->assertCount(18, $rows);
        $this->assertTrue($rows->every(fn (BookingSeat $r): bool => $r->lock_released_at === null));
    }

    // ── Range extend (3 hari -> 5 hari) ────────────────────────────────────

    public function test_persistDraft_re_invoke_range_extend_releases_and_relocks_soft(): void
    {
        $session = $this->freshSession();
        $first = $this->svc->persistDraft(
            $session,
            $this->draftPayload(),   // 20-22 (3 hari)
            $this->rentalSvc,
            $this->draftSvc,
            $this->admin,
        );
        $this->assertSame(18, BookingSeat::query()->where('booking_id', $first->id)->active()->count());

        // Re-invoke dengan extended range 20-24 (5 hari)
        $this->svc->persistDraft(
            $session,
            $this->draftPayload(['rental_end_date' => '2026-04-24']),
            $this->rentalSvc,
            $this->draftSvc,
            $this->admin,
        );

        // Old 18 rows released
        $released = BookingSeat::query()
            ->where('booking_id', $first->id)
            ->whereNotNull('lock_released_at')
            ->get();
        $this->assertCount(18, $released);
        $this->assertTrue($released->every(fn (BookingSeat $r): bool => $r->lock_released_by === $this->admin->id));

        // New 30 rows (5 hari × 6 seat) active + soft
        $active = BookingSeat::query()->where('booking_id', $first->id)->active()->get();
        $this->assertCount(30, $active);
        $this->assertTrue($active->every(fn (BookingSeat $r): bool => $r->lock_type === 'soft'));
    }

    // ── Range shift (20-22 -> 25-27, zero overlap) ────────────────────────

    public function test_persistDraft_re_invoke_range_shift_releases_and_relocks_soft(): void
    {
        $session = $this->freshSession();
        $first = $this->svc->persistDraft(
            $session,
            $this->draftPayload(),   // 20-22
            $this->rentalSvc,
            $this->draftSvc,
            $this->admin,
        );

        // Shift ke range baru zero overlap
        $this->svc->persistDraft(
            $session,
            $this->draftPayload([
                'rental_start_date' => '2026-04-25',
                'rental_end_date' => '2026-04-27',
            ]),
            $this->rentalSvc,
            $this->draftSvc,
            $this->admin,
        );

        // Old rows released (dates 20-22)
        $oldSlotRows = BookingSeat::query()
            ->where('booking_id', $first->id)
            ->whereIn('trip_date', ['2026-04-20', '2026-04-21', '2026-04-22'])
            ->get();
        $this->assertCount(18, $oldSlotRows);
        $this->assertTrue($oldSlotRows->every(fn (BookingSeat $r): bool => $r->lock_released_at !== null));

        // New rows active (dates 25-27)
        $newSlotRows = BookingSeat::query()
            ->where('booking_id', $first->id)
            ->active()
            ->get();
        $this->assertCount(18, $newSlotRows);
        $dates = $newSlotRows->pluck('trip_date')->map(fn ($d) => $d->toDateString())->unique()->sort()->values()->all();
        $this->assertSame(['2026-04-25', '2026-04-26', '2026-04-27'], $dates);
    }

    // ── Range shrink (5 hari -> 3 hari) ────────────────────────────────────

    public function test_persistDraft_re_invoke_range_shrink_releases_and_relocks_soft(): void
    {
        $session = $this->freshSession();
        $first = $this->svc->persistDraft(
            $session,
            $this->draftPayload(['rental_end_date' => '2026-04-24']),   // 5 hari
            $this->rentalSvc,
            $this->draftSvc,
            $this->admin,
        );
        $this->assertSame(30, BookingSeat::query()->where('booking_id', $first->id)->active()->count());

        // Shrink ke 3 hari
        $this->svc->persistDraft(
            $session,
            $this->draftPayload(),   // default 3 hari (20-22)
            $this->rentalSvc,
            $this->draftSvc,
            $this->admin,
        );

        // Old 30 rows released
        $released = BookingSeat::query()
            ->where('booking_id', $first->id)
            ->whereNotNull('lock_released_at')
            ->get();
        $this->assertCount(30, $released);

        // New 18 rows (3 hari × 6 seat) active
        $active = BookingSeat::query()->where('booking_id', $first->id)->active()->get();
        $this->assertCount(18, $active);
    }

    // ── Paid booking guard ─────────────────────────────────────────────────

    public function test_persistDraft_re_invoke_throws_WizardBackEditOnPaidBookingException_when_booking_paid(): void
    {
        $session = $this->freshSession();
        $booking = $this->svc->persistDraft(
            $session,
            $this->draftPayload(),
            $this->rentalSvc,
            $this->draftSvc,
            $this->admin,
        );

        // Simulate payment confirmation: booking ditandai Dibayar
        $booking->update(['payment_status' => 'Dibayar']);

        try {
            $this->svc->persistDraft(
                $session,
                $this->draftPayload(['rental_end_date' => '2026-04-24']),   // change range
                $this->rentalSvc,
                $this->draftSvc,
                $this->admin,
            );
            $this->fail('Expected WizardBackEditOnPaidBookingException');
        } catch (WizardBackEditOnPaidBookingException $e) {
            $this->assertSame($booking->id, $e->bookingId);
            $this->assertSame($booking->booking_code, $e->bookingCode);
            $this->assertSame('Rental', $e->category);
        }

        // Transaction rollback: payment_status masih Dibayar, seats active
        $preserved = Booking::query()->find($booking->id);
        $this->assertSame('Dibayar', $preserved->payment_status);

        $active = BookingSeat::query()->where('booking_id', $booking->id)->active()->get();
        $this->assertCount(18, $active);   // 3 hari × 6 seat original preserved
    }

    // ── Reason string format verify ────────────────────────────────────────

    public function test_persistDraft_re_invoke_actor_recorded_in_lock_release_reason_format_rental(): void
    {
        $session = $this->freshSession();
        $first = $this->svc->persistDraft(
            $session,
            $this->draftPayload(),
            $this->rentalSvc,
            $this->draftSvc,
            $this->admin,
        );

        $this->svc->persistDraft(
            $session,
            $this->draftPayload(['rental_end_date' => '2026-04-24']),   // extend
            $this->rentalSvc,
            $this->draftSvc,
            $this->admin,
        );

        $released = BookingSeat::query()
            ->where('booking_id', $first->id)
            ->whereNotNull('lock_released_at')
            ->first();

        $this->assertNotNull($released);
        $expectedPrefix = sprintf(
            'wizard_review_resubmit_rental_%s_by_user_',
            $first->booking_code,
        );
        $this->assertStringStartsWith($expectedPrefix, (string) $released->lock_release_reason);
        $this->assertStringEndsWith($this->admin->id, (string) $released->lock_release_reason);
    }

    // ── Bug #31: promoteToHard activation ─────────────────────────────────

    public function test_persistPaymentSelection_cash_promotes_seats_to_hard(): void
    {
        $session = $this->freshSession();
        $draft = $this->draftPayload();   // 3-hari × 6 seat = 18 rows
        $paymentData = ['payment_method' => 'cash', 'bank_account_code' => null];
        $paymentSvc = $this->app->make(\App\Services\RegularBookingPaymentService::class);

        $booking = $this->svc->persistPaymentSelection(
            $session,
            $draft,
            $paymentData,
            $this->rentalSvc,
            $this->draftSvc,
            $paymentSvc,
            $this->admin,
        );

        $this->assertSame('Dibayar Tunai', $booking->payment_status);

        $active = BookingSeat::query()->where('booking_id', $booking->id)->active()->get();
        $this->assertSame(18, $active->count());
        $this->assertTrue(
            $active->every(fn (BookingSeat $r): bool => $r->lock_type === 'hard'),
            'All 18 multi-day Rental seats must be promoted to hard after cash payment (bug #31 fix).',
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
            $this->rentalSvc,
            $this->draftSvc,
            $paymentSvc,
            $this->admin,
        );

        $this->assertSame('Menunggu Verifikasi', $booking->payment_status);

        $active = BookingSeat::query()->where('booking_id', $booking->id)->active()->get();
        $this->assertSame(18, $active->count());
        $this->assertTrue(
            $active->every(fn (BookingSeat $r): bool => $r->lock_type === 'soft'),
            'Transfer payment must NOT promote to hard (defer ke admin verification, bug #31 scope).',
        );
    }
}
