<?php

namespace Tests\Unit\Services;

use App\Exceptions\WizardBackEditOnPaidBookingException;
use App\Models\Booking;
use App\Models\BookingSeat;
use App\Models\User;
use App\Services\DroppingBookingDraftService;
use App\Services\DroppingBookingPersistenceService;
use App\Services\DroppingBookingService;
use App\Services\RegularBookingPaymentService;
use App\Services\SeatLockService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Smoke coverage DroppingBookingPersistenceService::persistDraft update path
 * (Section M5: bug #34 wizard back-edit bypass) + bug #32 PREVENTIVE fallback.
 *
 * 6 test case:
 *   - Create path regression guard (1)
 *   - Pattern A no-op identical (1)
 *   - Slot change release+relock (1)
 *   - Paid booking guard throws (1)
 *   - Bug #32 fallback passes actor (1)
 *   - Reason format verify (1)
 *
 * Test bypass controller + FormRequest — invoke persistDraft() langsung dengan
 * fresh session + draft array yang mirror wizard contract.
 *
 * Dropping specifics:
 *   - Fixed 6-seat full armada (`'1A','2A','2B','3A','4A','5A'`) hardcoded di
 *     DroppingBookingDraftService::normalizeDraft line 205
 *   - passenger_count hardcoded 6
 *   - Category = 'Dropping'
 *   - 5-field tuple (no package_size dimension — single-variant passenger group)
 *   - Reason format: wizard_review_resubmit_dropping_{code}_by_user_{id}
 *   - Customer integration present (Regular-like, unlike Package)
 */
class DroppingBookingPersistenceServiceTest extends TestCase
{
    use RefreshDatabase;

    protected DroppingBookingPersistenceService $svc;
    protected SeatLockService $lockSvc;
    protected DroppingBookingService $droppingSvc;
    protected DroppingBookingDraftService $draftSvc;
    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->svc = $this->app->make(DroppingBookingPersistenceService::class);
        $this->lockSvc = $this->app->make(SeatLockService::class);
        $this->droppingSvc = $this->app->make(DroppingBookingService::class);
        $this->draftSvc = $this->app->make(DroppingBookingDraftService::class);
        $this->admin = User::factory()->create(['role' => 'Super Admin']);
    }

    protected function draftPayload(array $overrides = []): array
    {
        return array_merge([
            'trip_date' => '2026-04-20',
            'booking_type' => 'self',
            'pickup_location' => 'Pekanbaru',
            'destination_location' => 'Pasirpengaraian',
            'departure_time' => '05:30',
            'fare_amount' => 1200000,
            'additional_fare' => 0,
            'pickup_address' => 'Jl. Sudirman No. 123 Pekanbaru',
            'dropoff_address' => 'Jl. Pattimura No. 12 Pasirpengaraian',
            'armada_index' => 1,
            'passengers' => [
                ['seat_no' => '1A', 'name' => 'Budi', 'phone' => '081234567890'],
                ['seat_no' => '2A', 'name' => 'Budi', 'phone' => '081234567890'],
                ['seat_no' => '2B', 'name' => 'Budi', 'phone' => '081234567890'],
                ['seat_no' => '3A', 'name' => 'Budi', 'phone' => '081234567890'],
                ['seat_no' => '4A', 'name' => 'Budi', 'phone' => '081234567890'],
                ['seat_no' => '5A', 'name' => 'Budi', 'phone' => '081234567890'],
            ],
        ], $overrides);
    }

    protected function freshSession(): \Illuminate\Contracts\Session\Session
    {
        return $this->app['session']->driver();
    }

    // ── Create path regression guard ───────────────────────────────────────

    public function test_persistDraft_create_path_works_baseline(): void
    {
        $session = $this->freshSession();
        $draft = $this->draftPayload();

        $booking = $this->svc->persistDraft($session, $draft, $this->droppingSvc, $this->draftSvc, $this->admin);

        $this->assertSame('Dropping', $booking->category);
        $this->assertSame(6, (int) $booking->passenger_count);

        // Create path: wasRecentlyCreated branch fires, locks 6 seat soft
        $active = BookingSeat::query()->where('booking_id', $booking->id)->active()->get();
        $this->assertCount(6, $active);
        $this->assertEqualsCanonicalizing(
            ['1A', '2A', '2B', '3A', '4A', '5A'],
            $active->pluck('seat_number')->all(),
        );
        $this->assertTrue($active->every(fn (BookingSeat $r): bool => $r->lock_type === 'soft'));
        $this->assertTrue($active->every(fn (BookingSeat $r): bool => $r->lock_released_at === null));
    }

    // ── Pattern A no-op (slot + seat identical) ───────────────────────────

    public function test_persistDraft_no_op_when_slot_identical(): void
    {
        $session = $this->freshSession();
        $draft = $this->draftPayload();

        $first = $this->svc->persistDraft($session, $draft, $this->droppingSvc, $this->draftSvc, $this->admin);
        $this->assertSame(6, BookingSeat::query()->where('booking_id', $first->id)->active()->count());

        // Re-invoke dengan draft identical — tuple + seats same, needsRelease=false, needsRelock=false
        $second = $this->svc->persistDraft($session, $draft, $this->droppingSvc, $this->draftSvc, $this->admin);

        $this->assertSame($first->id, $second->id);

        // booking_seats state unchanged: no released rows, same 6 active rows
        $rows = BookingSeat::query()->where('booking_id', $first->id)->get();
        $this->assertCount(6, $rows);
        $this->assertTrue($rows->every(fn (BookingSeat $r): bool => $r->lock_released_at === null));
    }

    // ── Slot change release+relock (trip_date change) ─────────────────────

    public function test_persistDraft_slot_change_releases_and_relocks(): void
    {
        $session = $this->freshSession();
        $first = $this->svc->persistDraft(
            $session,
            $this->draftPayload(),
            $this->droppingSvc,
            $this->draftSvc,
            $this->admin,
        );
        $this->assertSame(6, BookingSeat::query()->where('booking_id', $first->id)->active()->count());

        // Slot change: trip_date 2026-04-20 -> 2026-04-25 (tuple changed)
        $this->svc->persistDraft(
            $session,
            $this->draftPayload(['trip_date' => '2026-04-25']),
            $this->droppingSvc,
            $this->draftSvc,
            $this->admin,
        );

        // Old 6 rows released (dates 2026-04-20)
        $oldSlotRows = BookingSeat::query()
            ->where('booking_id', $first->id)
            ->where('trip_date', '2026-04-20')
            ->get();
        $this->assertCount(6, $oldSlotRows);
        $this->assertTrue($oldSlotRows->every(fn (BookingSeat $r): bool => $r->lock_released_at !== null));
        $this->assertTrue($oldSlotRows->every(fn (BookingSeat $r): bool => $r->lock_released_by === $this->admin->id));

        // New 6 rows active (dates 2026-04-25)
        $newSlotRows = BookingSeat::query()
            ->where('booking_id', $first->id)
            ->where('trip_date', '2026-04-25')
            ->active()
            ->get();
        $this->assertCount(6, $newSlotRows);
        $this->assertEqualsCanonicalizing(
            ['1A', '2A', '2B', '3A', '4A', '5A'],
            $newSlotRows->pluck('seat_number')->all(),
        );
        $this->assertTrue($newSlotRows->every(fn (BookingSeat $r): bool => $r->lock_type === 'soft'));
    }

    // ── Paid booking guard (category='Dropping') ──────────────────────────

    public function test_persistDraft_re_invoke_throws_WizardBackEditOnPaidBookingException_when_paid(): void
    {
        $session = $this->freshSession();
        $booking = $this->svc->persistDraft(
            $session,
            $this->draftPayload(),
            $this->droppingSvc,
            $this->draftSvc,
            $this->admin,
        );

        // Simulate payment confirmation
        $booking->update(['payment_status' => 'Dibayar']);

        try {
            $this->svc->persistDraft(
                $session,
                $this->draftPayload(['trip_date' => '2026-04-25']),   // attempt slot change
                $this->droppingSvc,
                $this->draftSvc,
                $this->admin,
            );
            $this->fail('Expected WizardBackEditOnPaidBookingException');
        } catch (WizardBackEditOnPaidBookingException $e) {
            $this->assertSame($booking->id, $e->bookingId);
            $this->assertSame($booking->booking_code, $e->bookingCode);
            $this->assertSame('Dropping', $e->category);
        }

        // Transaction rollback: payment_status masih Dibayar, seats original preserved
        $preserved = Booking::query()->find($booking->id);
        $this->assertSame('Dibayar', $preserved->payment_status);

        $active = BookingSeat::query()->where('booking_id', $booking->id)->active()->get();
        $this->assertCount(6, $active);
    }

    // ── Bug #32 PREVENTIVE regression guard ────────────────────────────────

    public function test_persistPaymentSelection_fallback_to_persistDraft_passes_actor_when_session_lost(): void
    {
        // Pre-condition: fresh session TANPA persistedBookingId (simulate session expire
        // / user direct-navigate ke payment without going through review step).
        // Pre-fix (bug #32 PREVENTIVE): fallback $this->persistDraft(...) call dengan 4 arg
        // post-M5 signature change would cause TypeError karena M5 add User $actor sebagai
        // 5th required positional. Post-fix (M5 atomic bundle): $actor di-propagate ke fallback.
        $session = $this->freshSession();
        $draft = $this->draftPayload();

        $paymentData = ['payment_method' => 'cash', 'bank_account_code' => null];
        $paymentSvc = $this->app->make(RegularBookingPaymentService::class);

        $booking = $this->svc->persistPaymentSelection(
            $session,
            $draft,
            $paymentData,
            $this->droppingSvc,
            $this->draftSvc,
            $paymentSvc,
            $this->admin,
        );

        // Post-fix: booking created via fallback persistDraft create path
        $this->assertNotNull($booking);
        $this->assertSame('Dropping', $booking->category);
        // 6 active booking_seats rows (create path lockSeats fires via wasRecentlyCreated)
        $this->assertSame(6, BookingSeat::query()->where('booking_id', $booking->id)->active()->count());
    }

    // ── Reason string format verify (Dropping variant) ─────────────────────

    public function test_persistDraft_re_invoke_actor_recorded_in_lock_release_reason_format_dropping(): void
    {
        $session = $this->freshSession();
        $first = $this->svc->persistDraft(
            $session,
            $this->draftPayload(),
            $this->droppingSvc,
            $this->draftSvc,
            $this->admin,
        );

        // Slot change untuk trigger release
        $this->svc->persistDraft(
            $session,
            $this->draftPayload(['trip_date' => '2026-04-25']),
            $this->droppingSvc,
            $this->draftSvc,
            $this->admin,
        );

        $released = BookingSeat::query()
            ->where('booking_id', $first->id)
            ->whereNotNull('lock_released_at')
            ->first();

        $this->assertNotNull($released);
        $expectedPrefix = sprintf(
            'wizard_review_resubmit_dropping_%s_by_user_',
            $first->booking_code,
        );
        $this->assertStringStartsWith($expectedPrefix, (string) $released->lock_release_reason);
        $this->assertStringEndsWith($this->admin->id, (string) $released->lock_release_reason);
    }

    // ── Bug #31: promoteToHard activation ─────────────────────────────────

    public function test_persistPaymentSelection_cash_promotes_seats_to_hard(): void
    {
        $session = $this->freshSession();
        $draft = $this->draftPayload();
        $paymentData = ['payment_method' => 'cash', 'bank_account_code' => null];
        $paymentSvc = $this->app->make(RegularBookingPaymentService::class);

        $booking = $this->svc->persistPaymentSelection(
            $session,
            $draft,
            $paymentData,
            $this->droppingSvc,
            $this->draftSvc,
            $paymentSvc,
            $this->admin,
        );

        $this->assertSame('Dibayar Tunai', $booking->payment_status);

        $active = BookingSeat::query()->where('booking_id', $booking->id)->active()->get();
        $this->assertSame(6, $active->count());
        $this->assertTrue(
            $active->every(fn (BookingSeat $r): bool => $r->lock_type === 'hard'),
            'All 6 Dropping seats must be promoted to hard after cash payment (bug #31 fix).',
        );
    }

    public function test_persistPaymentSelection_transfer_keeps_seats_soft(): void
    {
        $session = $this->freshSession();
        $draft = $this->draftPayload();
        $paymentData = ['payment_method' => 'transfer', 'bank_account_code' => null];
        $paymentSvc = $this->app->make(RegularBookingPaymentService::class);

        $booking = $this->svc->persistPaymentSelection(
            $session,
            $draft,
            $paymentData,
            $this->droppingSvc,
            $this->draftSvc,
            $paymentSvc,
            $this->admin,
        );

        $this->assertSame('Menunggu Verifikasi', $booking->payment_status);

        $active = BookingSeat::query()->where('booking_id', $booking->id)->active()->get();
        $this->assertSame(6, $active->count());
        $this->assertTrue(
            $active->every(fn (BookingSeat $r): bool => $r->lock_type === 'soft'),
            'Transfer payment must NOT promote to hard (defer ke admin verification, bug #31 scope).',
        );
    }
}
