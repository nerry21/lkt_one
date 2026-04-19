<?php

namespace Tests\Unit\Exceptions;

use App\Exceptions\BookingVersionConflictException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Tests\TestCase;

/**
 * Test BookingVersionConflictException render behavior dan property accessors.
 *
 * Extends Tests\TestCase (Laravel-booted) karena render() pakai response()
 * dan redirect() helpers yang butuh IoC container. Tidak touch DB (no
 * RefreshDatabase trait) — exception render adalah pure logic.
 *
 * Sibling pattern: Tests\Unit\Exceptions\SeatConflictExceptionTest.
 * Reference: docs/bug-30-design.md §6.
 */
class BookingVersionConflictExceptionTest extends TestCase
{
    public function test_render_returns_409_status_when_request_wants_json(): void
    {
        $exception = new BookingVersionConflictException(
            bookingId: 42,
            expectedVersion: 7,
        );
        $request = Request::create('/api/bookings/42', 'PUT');
        $request->headers->set('Accept', 'application/json');

        $response = $exception->render($request);

        $this->assertSame(409, $response->getStatusCode());
    }

    public function test_render_includes_booking_id_and_expected_version_in_body(): void
    {
        $exception = new BookingVersionConflictException(
            bookingId: 42,
            expectedVersion: 7,
        );
        $request = Request::create('/api/bookings/42', 'PUT');
        $request->headers->set('Accept', 'application/json');

        $body = $exception->render($request)->getData(true);

        $this->assertSame('booking_version_conflict', $body['error']);
        $this->assertSame(42, $body['booking_id']);
        $this->assertSame(7, $body['expected_version']);
        $this->assertArrayHasKey('message', $body);
        $this->assertNotEmpty($body['message']);
    }

    public function test_render_returns_redirect_back_when_request_does_not_want_json(): void
    {
        $exception = new BookingVersionConflictException(
            bookingId: 42,
            expectedVersion: 7,
        );
        $request = Request::create('/dashboard/bookings/42', 'PUT');

        $response = $exception->render($request);

        $this->assertInstanceOf(RedirectResponse::class, $response);
        $errors = session('errors');
        $this->assertNotNull($errors);
        $this->assertTrue($errors->has('version'));
        $this->assertStringContainsString('admin lain', (string) $errors->first('version'));
    }

    public function test_exception_stores_constructor_params(): void
    {
        $previous = new \RuntimeException('upstream cause');
        $exception = new BookingVersionConflictException(
            bookingId: 99,
            expectedVersion: 12,
            message: 'Custom conflict message',
            code: 1001,
            previous: $previous,
        );

        $this->assertSame(99, $exception->bookingId);
        $this->assertSame(12, $exception->expectedVersion);
        $this->assertSame('Custom conflict message', $exception->getMessage());
        $this->assertSame(1001, $exception->getCode());
        $this->assertSame($previous, $exception->getPrevious());
    }

    public function test_report_returns_false_to_skip_logging(): void
    {
        $exception = new BookingVersionConflictException(
            bookingId: 42,
            expectedVersion: 7,
        );

        $this->assertFalse($exception->report());
    }
}
