<?php

namespace Tests\Unit\Services;

use App\Exceptions\WizardBackEditOnPaidBookingException;
use App\Models\Booking;
use App\Models\BookingSeat;
use App\Models\User;
use App\Services\PackageBookingDraftService;
use App\Services\PackageBookingPersistenceService;
use App\Services\PackageBookingService;
use App\Services\RegularBookingPaymentService;
use App\Services\SeatLockService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Smoke coverage PackageBookingPersistenceService::persistDraft update path
 * (Section M4: bug #27 wizard back-edit bypass) + bug #32 PREVENTIVE fallback.
 *
 * 9 test case:
 *   - Create path regression guard Mode Besar (1)
 *   - Pattern A no-op identical Besar + Kecil (2)
 *   - T1 seat change Besar->Besar release+relock (1)
 *   - T2 mode downgrade Besar->Kecil release only (1)
 *   - T3 mode upgrade Kecil->Besar lock fresh (1)
 *   - Paid booking guard throws (1)
 *   - Bug #32 fallback passes actor (1)
 *   - Reason format verify (1)
 *
 * Test bypass controller + FormRequest — invoke persistDraft() langsung dengan
 * fresh session + draft array yang mirror wizard contract.
 *
 * Package specifics:
 *   - 2-mode: Besar (requires 1 seat) vs Kecil/Sedang (no seat, parcel di bagasi)
 *   - 6-field tuple (trip_date, trip_time, from_city, to_city, armada_index,
 *     package_size) — package_size dimension capture mode transition T2/T3
 *   - Category = 'Paket'
 *   - Reason format: wizard_review_resubmit_package_{code}_by_user_{id}
 *   - Zero Customer integration per DR-1 (parcel sender ≠ passenger loyalty)
 */
class PackageBookingPersistenceServiceTest extends TestCase
{
    use RefreshDatabase;

    protected PackageBookingPersistenceService $svc;
    protected SeatLockService $lockSvc;
    protected PackageBookingService $packageSvc;
    protected PackageBookingDraftService $draftSvc;
    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->svc = $this->app->make(PackageBookingPersistenceService::class);
        $this->lockSvc = $this->app->make(SeatLockService::class);
        $this->packageSvc = $this->app->make(PackageBookingService::class);
        $this->draftSvc = $this->app->make(PackageBookingDraftService::class);
        $this->admin = User::factory()->create(['role' => 'Super Admin']);
    }

    protected function draftPayload(array $overrides = []): array
    {
        return array_merge([
            'trip_date' => '2026-04-20',
            'departure_time' => '05:30',
            'pickup_city' => 'Pekanbaru',
            'destination_city' => 'Pasirpengaraian',
            'sender_name' => 'Budi Pengirim',
            'sender_phone' => '081234567890',
            'sender_address' => 'Jl. Sudirman No. 123 Pekanbaru',
            'recipient_name' => 'Siti Penerima',
            'recipient_phone' => '081234567891',
            'recipient_address' => 'Jl. Pattimura No. 12 Pasirpengaraian',
            'item_name' => 'Dokumen penting',
            'item_qty' => 1,
            'fare_amount' => 50000,
            'additional_fare' => 0,
            'package_size' => 'Besar',
            'selected_seats' => ['5A'],
            'armada_index' => 1,
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
        $draft = $this->draftPayload();   // Besar + 5A

        $booking = $this->svc->persistDraft($session, $draft, $this->packageSvc, $this->draftSvc, $this->admin);

        $this->assertSame('Paket', $booking->category);
        $this->assertSame('Besar', $booking->booking_for);

        // Create path: wasRecentlyCreated branch fires, locks 1 seat soft
        $active = BookingSeat::query()->where('booking_id', $booking->id)->active()->get();
        $this->assertCount(1, $active);
        $this->assertSame('5A', $active->first()->seat_number);
        $this->assertSame('soft', $active->first()->lock_type);
        $this->assertNull($active->first()->lock_released_at);
    }

    // ── Pattern A no-op (T4 identical, Besar + Kecil variants) ────────────

    public function test_persistDraft_no_op_when_mode_besar_and_seat_identical(): void
    {
        $session = $this->freshSession();
        $draft = $this->draftPayload();   // Besar + 5A

        $first = $this->svc->persistDraft($session, $draft, $this->packageSvc, $this->draftSvc, $this->admin);
        $this->assertSame(1, BookingSeat::query()->where('booking_id', $first->id)->active()->count());

        // Re-invoke dengan draft identical — tuple + seat same, needsRelease=false, needsRelock=false
        $second = $this->svc->persistDraft($session, $draft, $this->packageSvc, $this->draftSvc, $this->admin);

        $this->assertSame($first->id, $second->id);

        // booking_seats state unchanged: no released rows, same 1 active row
        $rows = BookingSeat::query()->where('booking_id', $first->id)->get();
        $this->assertCount(1, $rows);
        $this->assertNull($rows->first()->lock_released_at);
    }

    public function test_persistDraft_no_op_when_mode_kecil_unchanged(): void
    {
        $session = $this->freshSession();
        $draft = $this->draftPayload([
            'package_size' => 'Kecil',
            'selected_seats' => [],
        ]);

        $first = $this->svc->persistDraft($session, $draft, $this->packageSvc, $this->draftSvc, $this->admin);

        // Mode Kecil: wasRecentlyCreated branch skipped (selected_seats empty), zero lock rows
        $this->assertSame(0, BookingSeat::query()->where('booking_id', $first->id)->count());
        $this->assertSame('Kecil', $first->booking_for);

        // Re-invoke identical — needsRelease=false (oldSeats empty), needsRelock=false (newSeats empty)
        $second = $this->svc->persistDraft($session, $draft, $this->packageSvc, $this->draftSvc, $this->admin);

        $this->assertSame($first->id, $second->id);
        $this->assertSame(0, BookingSeat::query()->where('booking_id', $first->id)->count());
    }

    // ── T1 seat change Besar->Besar (tuple same except seat, release+relock) ─

    public function test_persistDraft_T1_seat_change_besar_releases_and_relocks(): void
    {
        $session = $this->freshSession();
        $first = $this->svc->persistDraft(
            $session,
            $this->draftPayload(),   // Besar + 5A
            $this->packageSvc,
            $this->draftSvc,
            $this->admin,
        );
        $this->assertSame(1, BookingSeat::query()->where('booking_id', $first->id)->active()->count());

        // T1: Besar + 5A -> Besar + 4A (seat only change, mode preserved)
        $this->svc->persistDraft(
            $session,
            $this->draftPayload(['selected_seats' => ['4A']]),
            $this->packageSvc,
            $this->draftSvc,
            $this->admin,
        );

        // Old row released
        $released = BookingSeat::query()
            ->where('booking_id', $first->id)
            ->where('seat_number', '5A')
            ->first();
        $this->assertNotNull($released);
        $this->assertNotNull($released->lock_released_at);
        $this->assertSame($this->admin->id, $released->lock_released_by);

        // New row active + soft
        $active = BookingSeat::query()->where('booking_id', $first->id)->active()->get();
        $this->assertCount(1, $active);
        $this->assertSame('4A', $active->first()->seat_number);
        $this->assertSame('soft', $active->first()->lock_type);
    }

    // ── T2 mode downgrade Besar->Kecil (release only, no relock) ──────────

    public function test_persistDraft_T2_mode_downgrade_besar_to_kecil_releases_only(): void
    {
        $session = $this->freshSession();
        $first = $this->svc->persistDraft(
            $session,
            $this->draftPayload(),   // Besar + 5A
            $this->packageSvc,
            $this->draftSvc,
            $this->admin,
        );
        $this->assertSame(1, BookingSeat::query()->where('booking_id', $first->id)->active()->count());

        // T2: Besar + 5A -> Kecil + [] (mode downgrade, parcel di bagasi)
        $this->svc->persistDraft(
            $session,
            $this->draftPayload([
                'package_size' => 'Kecil',
                'selected_seats' => [],
            ]),
            $this->packageSvc,
            $this->draftSvc,
            $this->admin,
        );

        // Old 5A released
        $released = BookingSeat::query()
            ->where('booking_id', $first->id)
            ->where('seat_number', '5A')
            ->first();
        $this->assertNotNull($released);
        $this->assertNotNull($released->lock_released_at);

        // Zero active rows (relock skipped karena newSeats empty)
        $active = BookingSeat::query()->where('booking_id', $first->id)->active()->get();
        $this->assertCount(0, $active);

        // Booking booking_for switched ke Kecil
        $preserved = Booking::query()->find($first->id);
        $this->assertSame('Kecil', $preserved->booking_for);
    }

    // ── T3 mode upgrade Kecil->Besar (lock fresh, no release) ─────────────

    public function test_persistDraft_T3_mode_upgrade_kecil_to_besar_locks_fresh(): void
    {
        $session = $this->freshSession();
        $first = $this->svc->persistDraft(
            $session,
            $this->draftPayload([
                'package_size' => 'Kecil',
                'selected_seats' => [],
            ]),
            $this->packageSvc,
            $this->draftSvc,
            $this->admin,
        );
        $this->assertSame(0, BookingSeat::query()->where('booking_id', $first->id)->count());

        // T3: Kecil + [] -> Besar + 5A (mode upgrade, allocate fresh seat)
        $this->svc->persistDraft(
            $session,
            $this->draftPayload(),   // Besar + 5A (default)
            $this->packageSvc,
            $this->draftSvc,
            $this->admin,
        );

        // Zero released rows (oldSeats was empty, nothing to release)
        $released = BookingSeat::query()
            ->where('booking_id', $first->id)
            ->whereNotNull('lock_released_at')
            ->get();
        $this->assertCount(0, $released);

        // New 5A active + soft
        $active = BookingSeat::query()->where('booking_id', $first->id)->active()->get();
        $this->assertCount(1, $active);
        $this->assertSame('5A', $active->first()->seat_number);
        $this->assertSame('soft', $active->first()->lock_type);

        // Booking booking_for switched ke Besar
        $preserved = Booking::query()->find($first->id);
        $this->assertSame('Besar', $preserved->booking_for);
    }

    // ── Paid booking guard (category='Paket') ─────────────────────────────

    public function test_persistDraft_re_invoke_throws_WizardBackEditOnPaidBookingException_when_paid(): void
    {
        $session = $this->freshSession();
        $booking = $this->svc->persistDraft(
            $session,
            $this->draftPayload(),   // Besar + 5A
            $this->packageSvc,
            $this->draftSvc,
            $this->admin,
        );

        // Simulate payment confirmation: booking ditandai Dibayar
        $booking->update(['payment_status' => 'Dibayar']);

        try {
            $this->svc->persistDraft(
                $session,
                $this->draftPayload(['selected_seats' => ['4A']]),   // attempt seat change
                $this->packageSvc,
                $this->draftSvc,
                $this->admin,
            );
            $this->fail('Expected WizardBackEditOnPaidBookingException');
        } catch (WizardBackEditOnPaidBookingException $e) {
            $this->assertSame($booking->id, $e->bookingId);
            $this->assertSame($booking->booking_code, $e->bookingCode);
            $this->assertSame('Paket', $e->category);
        }

        // Transaction rollback: payment_status masih Dibayar, 5A masih active
        $preserved = Booking::query()->find($booking->id);
        $this->assertSame('Dibayar', $preserved->payment_status);

        $active = BookingSeat::query()->where('booking_id', $booking->id)->active()->get();
        $this->assertCount(1, $active);
        $this->assertSame('5A', $active->first()->seat_number);
    }

    // ── Bug #32 PREVENTIVE regression guard ────────────────────────────────

    public function test_persistPaymentSelection_fallback_to_persistDraft_passes_actor_when_session_lost(): void
    {
        // Pre-condition: fresh session TANPA persistedBookingId (simulate session expire
        // / user direct-navigate ke payment without going through review step).
        // Pre-fix (bug #32 PREVENTIVE): fallback $this->persistDraft(...) call dengan 4 arg
        // post-M4 signature change would cause TypeError karena M4 add User $actor sebagai
        // 5th required positional. Post-fix (M4 atomic bundle): $actor di-propagate ke fallback.
        $session = $this->freshSession();
        $draft = $this->draftPayload();

        $paymentData = ['payment_method' => 'cash', 'bank_account_code' => null];
        $paymentSvc = $this->app->make(RegularBookingPaymentService::class);

        $booking = $this->svc->persistPaymentSelection(
            $session,
            $draft,
            $paymentData,
            $this->packageSvc,
            $this->draftSvc,
            $paymentSvc,
            $this->admin,
        );

        // Post-fix: booking created via fallback persistDraft create path
        $this->assertNotNull($booking);
        $this->assertSame('Paket', $booking->category);
        // 1 active booking_seats row (Besar create path lockSeats fires via wasRecentlyCreated)
        $this->assertSame(1, BookingSeat::query()->where('booking_id', $booking->id)->active()->count());
    }

    // ── Reason string format verify (Package variant) ──────────────────────

    public function test_persistDraft_re_invoke_actor_recorded_in_lock_release_reason_format_package(): void
    {
        $session = $this->freshSession();
        $first = $this->svc->persistDraft(
            $session,
            $this->draftPayload(),   // Besar + 5A
            $this->packageSvc,
            $this->draftSvc,
            $this->admin,
        );

        // T1 seat change supaya trigger release
        $this->svc->persistDraft(
            $session,
            $this->draftPayload(['selected_seats' => ['4A']]),
            $this->packageSvc,
            $this->draftSvc,
            $this->admin,
        );

        $released = BookingSeat::query()
            ->where('booking_id', $first->id)
            ->where('seat_number', '5A')
            ->first();

        $this->assertNotNull($released);
        $expectedPrefix = sprintf(
            'wizard_review_resubmit_package_%s_by_user_',
            $first->booking_code,
        );
        $this->assertStringStartsWith($expectedPrefix, (string) $released->lock_release_reason);
        $this->assertStringEndsWith($this->admin->id, (string) $released->lock_release_reason);
    }

    // ── Bug #31: promoteToHard activation ─────────────────────────────────

    public function test_persistPaymentSelection_cash_promotes_seats_to_hard(): void
    {
        $session = $this->freshSession();
        $draft = $this->draftPayload();   // Besar + 5A (1 seat)
        $paymentData = ['payment_method' => 'cash', 'bank_account_code' => null];
        $paymentSvc = $this->app->make(RegularBookingPaymentService::class);

        $booking = $this->svc->persistPaymentSelection(
            $session,
            $draft,
            $paymentData,
            $this->packageSvc,
            $this->draftSvc,
            $paymentSvc,
            $this->admin,
        );

        $this->assertSame('Dibayar Tunai', $booking->payment_status);

        $active = BookingSeat::query()->where('booking_id', $booking->id)->active()->get();
        $this->assertSame(1, $active->count());
        $this->assertTrue(
            $active->every(fn (BookingSeat $r): bool => $r->lock_type === 'hard'),
            'Package Besar seat must be promoted to hard after cash payment (bug #31 fix).',
        );
    }

    public function test_persistPaymentSelection_transfer_keeps_seats_soft(): void
    {
        $session = $this->freshSession();
        $draft = $this->draftPayload();   // Besar + 5A
        $paymentData = ['payment_method' => 'transfer', 'bank_account_code' => null];
        $paymentSvc = $this->app->make(RegularBookingPaymentService::class);

        $booking = $this->svc->persistPaymentSelection(
            $session,
            $draft,
            $paymentData,
            $this->packageSvc,
            $this->draftSvc,
            $paymentSvc,
            $this->admin,
        );

        $this->assertSame('Menunggu Verifikasi', $booking->payment_status);

        $active = BookingSeat::query()->where('booking_id', $booking->id)->active()->get();
        $this->assertSame(1, $active->count());
        $this->assertTrue(
            $active->every(fn (BookingSeat $r): bool => $r->lock_type === 'soft'),
            'Transfer payment must NOT promote to hard (defer ke admin verification, bug #31 scope).',
        );
    }
}
