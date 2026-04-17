<?php

namespace Tests\Unit\Services;

use App\Exceptions\SeatConflictException;
use App\Exceptions\SeatLockReleaseNotAllowedException;
use App\Models\Booking;
use App\Models\BookingSeat;
use App\Models\User;
use App\Services\SeatLockService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

/**
 * Test coverage SeatLockService (Section D).
 *
 * 16 test case:
 *   - Happy path & basic locking (5)
 *   - State transitions (3)
 *   - Release guard (1)
 *   - Rental multi-day edge cases (3)
 *   - getOccupiedSeats coverage (4)
 *
 * Concurrency race test (isUniqueViolation fallback path) deferred ke Section N
 * (Windows pcntl_fork absent; genuine concurrent hanya reliable via HTTP
 * integration test).
 *
 * DB: hitungan_lkt_test via .env.testing. RefreshDatabase migrate:fresh 1x
 * per test run, each test wrap transaction auto-rollback.
 */
class SeatLockServiceTest extends TestCase
{
    use RefreshDatabase;

    protected SeatLockService $svc;
    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        $this->svc = $this->app->make(SeatLockService::class);
        $this->admin = User::factory()->create(['role' => 'Super Admin']);
    }

    protected function defaultSlot(
        string $date = '2026-04-20',
        string $time = '05:00:00',
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

    /**
     * Create Booking aligned dengan slot data untuk konsistensi.
     * Override factory default selected_seats=['1A'] jadi [] supaya test
     * assertion cache sync crisp (hindari pre-existing cache collision).
     */
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
        ]);
    }

    // ── Happy path & basic locking ──────────────────────────────────────────

    public function test_lock_single_seat_soft_lock(): void
    {
        $b = $this->makeBookingForSlot();
        $locked = $this->svc->lockSeats($b, [$this->defaultSlot()], ['1A']);

        $this->assertCount(1, $locked);
        $row = BookingSeat::query()->first();
        $this->assertSame('soft', $row->lock_type);
        $this->assertStringContainsString('|1A', (string) $row->active_slot_key);
    }

    public function test_lock_multiple_seats_soft_lock(): void
    {
        $b = $this->makeBookingForSlot();
        $locked = $this->svc->lockSeats($b, [$this->defaultSlot()], ['1A', '2A', '3A', '4A']);

        $this->assertCount(4, $locked);
        $this->assertSame(4, BookingSeat::query()->softLocks()->count());
    }

    public function test_lock_hard_directly(): void
    {
        $b = $this->makeBookingForSlot();
        $this->svc->lockSeats($b, [$this->defaultSlot()], ['1A', '2A'], 'hard');

        $this->assertSame(2, BookingSeat::query()->hardLocks()->count());
        $this->assertSame(0, BookingSeat::query()->softLocks()->count());
    }

    public function test_lock_conflict_throws_exception(): void
    {
        $b1 = $this->makeBookingForSlot();
        $this->svc->lockSeats($b1, [$this->defaultSlot()], ['1A']);

        $b2 = $this->makeBookingForSlot();
        try {
            $this->svc->lockSeats($b2, [$this->defaultSlot()], ['1A', '2A']);
            $this->fail('Expected SeatConflictException');
        } catch (SeatConflictException $e) {
            $this->assertCount(1, $e->conflicts);
            $this->assertSame('1A', $e->conflicts[0]['seat']);
            $this->assertSame($b1->id, $e->conflicts[0]['booking_id']);
        }

        // Transaction rollback: b2 tidak leave partial state
        $this->assertSame(0, BookingSeat::query()->where('booking_id', $b2->id)->count());
    }

    public function test_selected_seats_cache_synced(): void
    {
        $b = $this->makeBookingForSlot();
        $this->svc->lockSeats($b, [$this->defaultSlot()], ['2A', '3A', '1A']);

        // Preserves input order (implementation: array_values(array_unique(...)))
        $this->assertSame(['2A', '3A', '1A'], $b->fresh()->selected_seats);
    }

    // ── State transitions ──────────────────────────────────────────────────

    public function test_promote_soft_to_hard(): void
    {
        $b = $this->makeBookingForSlot();
        $this->svc->lockSeats($b, [$this->defaultSlot()], ['1A', '2A']);

        $count = $this->svc->promoteToHard($b);

        $this->assertSame(2, $count);
        $this->assertSame(2, BookingSeat::query()->hardLocks()->count());
    }

    public function test_promote_idempotent(): void
    {
        $b = $this->makeBookingForSlot();
        $this->svc->lockSeats($b, [$this->defaultSlot()], ['1A', '2A']);
        $this->svc->promoteToHard($b);

        // Second call: all already hard, scope softLocks() filter nothing
        $count = $this->svc->promoteToHard($b);

        $this->assertSame(0, $count);
    }

    public function test_release_soft_lock_succeeds(): void
    {
        $b = $this->makeBookingForSlot();
        $this->svc->lockSeats($b, [$this->defaultSlot()], ['1A', '2A']);

        $released = $this->svc->releaseSeats($b, $this->admin, 'test');
        $this->assertSame(2, $released);

        $row = BookingSeat::query()->where('booking_id', $b->id)->first();
        $this->assertNotNull($row->lock_released_at);
        $this->assertInstanceOf(Carbon::class, $row->lock_released_at);
        $this->assertTrue($row->lock_released_at->lessThanOrEqualTo(now()));
        $this->assertSame($this->admin->id, $row->lock_released_by);
        $this->assertSame('test', $row->lock_release_reason);
        $this->assertNull($row->active_slot_key); // generated re-compute
        $this->assertSame([], $b->fresh()->selected_seats); // cache cleared
    }

    // ── Release guard ──────────────────────────────────────────────────────

    public function test_release_hard_lock_fails(): void
    {
        $b = $this->makeBookingForSlot();
        $this->svc->lockSeats($b, [$this->defaultSlot()], ['1A', '2A'], 'hard');

        try {
            $this->svc->releaseSeats($b, $this->admin, 'try');
            $this->fail('Expected SeatLockReleaseNotAllowedException');
        } catch (SeatLockReleaseNotAllowedException $e) {
            $this->assertSame($b->id, $e->bookingId);
            $sorted = $e->hardLockedSeats;
            sort($sorted);
            $this->assertSame(['1A', '2A'], $sorted);
        }

        // No UPDATE leak: no row with lock_released_at populated
        $this->assertSame(0, BookingSeat::query()->whereNotNull('lock_released_at')->count());
    }

    // ── Rental multi-day edge cases ────────────────────────────────────────

    public function test_rental_multi_day_locks_all_dates(): void
    {
        $b = $this->makeBookingForSlot();
        $slots = [
            $this->defaultSlot('2026-04-20'),
            $this->defaultSlot('2026-04-21'),
            $this->defaultSlot('2026-04-22'),
        ];
        $seats = ['1A', '2A', '2B', '3A', '4A', '5A'];

        $this->svc->lockSeats($b, $slots, $seats);

        // 3 days × 6 seats = 18 rows
        $this->assertSame(18, BookingSeat::query()->where('booking_id', $b->id)->count());
    }

    public function test_rental_conflict_reports_specific_date(): void
    {
        // Blocker: 1 booking lock seat '1A' di hari ke-2
        $blocker = $this->makeBookingForSlot(['trip_date' => '2026-04-21']);
        $this->svc->lockSeats($blocker, [$this->defaultSlot('2026-04-21')], ['1A']);

        // Rental 3 hari — akan conflict di hari ke-2
        $b = $this->makeBookingForSlot();
        $slots = [
            $this->defaultSlot('2026-04-20'),
            $this->defaultSlot('2026-04-21'),
            $this->defaultSlot('2026-04-22'),
        ];
        $seats = ['1A', '2A', '2B', '3A', '4A', '5A'];

        try {
            $this->svc->lockSeats($b, $slots, $seats);
            $this->fail('Expected SeatConflictException');
        } catch (SeatConflictException $e) {
            $dates = array_column($e->conflicts, 'date');
            $this->assertContains('2026-04-21', $dates);

            $conflictSeats = array_column($e->conflicts, 'seat');
            $this->assertContains('1A', $conflictSeats);

            // Count bound: minimal 1 (blocker), max 6 (blocker only 1A × 1 hari;
            // kalau pre-check over-fetch dari slot tidak di-request, test fail)
            $this->assertGreaterThanOrEqual(1, count($e->conflicts));
            $this->assertLessThanOrEqual(6, count($e->conflicts));
        }

        // No partial: rental booking tidak tinggalkan row
        $this->assertSame(0, BookingSeat::query()->where('booking_id', $b->id)->count());
    }

    public function test_released_seat_can_be_booked_again(): void
    {
        $b1 = $this->makeBookingForSlot();
        $this->svc->lockSeats($b1, [$this->defaultSlot()], ['1A']);
        $this->svc->releaseSeats($b1, $this->admin, 'cancel');

        // active_slot_key = NULL setelah release, slot available
        $b2 = $this->makeBookingForSlot();
        $locked = $this->svc->lockSeats($b2, [$this->defaultSlot()], ['1A']);

        $this->assertCount(1, $locked);
    }

    // ── getOccupiedSeats coverage ──────────────────────────────────────────

    public function test_get_occupied_seats_happy_path(): void
    {
        $b = $this->makeBookingForSlot();
        $this->svc->lockSeats($b, [$this->defaultSlot()], ['1A', '2A'], 'hard');

        $occupied = $this->svc->getOccupiedSeats($this->defaultSlot());

        $this->assertSame(['1A', '2A'], $occupied->sort()->values()->all());
    }

    public function test_get_occupied_seats_exclude_booking_id(): void
    {
        $b = $this->makeBookingForSlot();
        $this->svc->lockSeats($b, [$this->defaultSlot()], ['1A']);

        $occupied = $this->svc->getOccupiedSeats($this->defaultSlot(), $b->id);

        $this->assertTrue($occupied->isEmpty());
    }

    public function test_get_occupied_seats_ignores_released(): void
    {
        $b = $this->makeBookingForSlot();
        $this->svc->lockSeats($b, [$this->defaultSlot()], ['1A', '2A']);

        // Manual release seat 1A via DB (bypass service untuk test query filter)
        BookingSeat::query()
            ->where('seat_number', '1A')
            ->update([
                'lock_released_at' => now(),
                'lock_released_by' => $this->admin->id,
                'lock_release_reason' => 'direct test',
            ]);

        // Verify generated column active_slot_key re-compute ke NULL on UPDATE
        $releasedRow = BookingSeat::query()->where('seat_number', '1A')->first();
        $this->assertNull($releasedRow->active_slot_key);

        $occupied = $this->svc->getOccupiedSeats($this->defaultSlot());

        $this->assertSame(['2A'], $occupied->all());
    }

    public function test_get_occupied_seats_slot_isolation(): void
    {
        $b1 = $this->makeBookingForSlot();
        $this->svc->lockSeats($b1, [$this->defaultSlot('2026-04-20', '05:00:00')], ['1A', '2A']);

        $b2 = $this->makeBookingForSlot(['trip_time' => '06:00:00']);
        $this->svc->lockSeats($b2, [$this->defaultSlot('2026-04-20', '06:00:00')], ['3A']);

        $slotA = $this->svc->getOccupiedSeats($this->defaultSlot('2026-04-20', '05:00:00'));
        $slotB = $this->svc->getOccupiedSeats($this->defaultSlot('2026-04-20', '06:00:00'));

        $this->assertSame(['1A', '2A'], $slotA->sort()->values()->all());
        $this->assertSame(['3A'], $slotB->all());
    }
}
