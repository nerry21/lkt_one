<?php

namespace Tests\Unit\Exceptions;

use App\Exceptions\SeatLockReleaseNotAllowedException;
use Illuminate\Http\Request;
use Tests\TestCase;

/**
 * Test SeatLockReleaseNotAllowedException render behavior + property accessors.
 *
 * Extends Tests\TestCase sama alasan seperti SeatConflictExceptionTest.
 */
class SeatLockReleaseNotAllowedExceptionTest extends TestCase
{
    public function test_render_returns_403_status(): void
    {
        $exception = new SeatLockReleaseNotAllowedException(
            bookingId: 1,
            hardLockedSeats: [],
        );
        $response = $exception->render(Request::create('/api/bookings/1/release-seats', 'PATCH'));

        $this->assertSame(403, $response->getStatusCode());
    }

    public function test_render_includes_booking_id_and_seats(): void
    {
        $exception = new SeatLockReleaseNotAllowedException(
            bookingId: 42,
            hardLockedSeats: ['1A', '2B', '3A'],
        );
        $body = $exception->render(Request::create('/api/bookings/42/release-seats', 'PATCH'))->getData(true);

        $this->assertSame('lock_release_not_allowed', $body['error']);
        $this->assertSame(42, $body['booking_id']);
        $this->assertSame(['1A', '2B', '3A'], $body['hard_locked_seats']);
    }

    public function test_exception_stores_booking_id_property(): void
    {
        $exception = new SeatLockReleaseNotAllowedException(
            bookingId: 99,
            hardLockedSeats: ['5A'],
        );

        $this->assertSame(99, $exception->bookingId);
        $this->assertSame(['5A'], $exception->hardLockedSeats);
    }
}
