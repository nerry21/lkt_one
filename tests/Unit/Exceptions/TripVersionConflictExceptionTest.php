<?php

namespace Tests\Unit\Exceptions;

use App\Exceptions\TripVersionConflictException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Tests\TestCase;

/**
 * Test TripVersionConflictException render behavior dan property accessors.
 *
 * Extends Tests\TestCase (Laravel-booted) karena render() pakai response() dan
 * redirect() helpers yang butuh IoC container. Tidak touch DB (no
 * RefreshDatabase trait) — exception render adalah pure logic.
 *
 * Sibling pattern: Tests\Unit\Exceptions\BookingVersionConflictExceptionTest.
 * Reference: docs/trip-planning-design.md §3.4.
 */
class TripVersionConflictExceptionTest extends TestCase
{
    public function test_render_returns_409_status_when_request_wants_json(): void
    {
        $exception = new TripVersionConflictException(
            tripId: 10,
            expectedVersion: 3,
        );
        $request = Request::create('/api/trips/10', 'PUT');
        $request->headers->set('Accept', 'application/json');

        $response = $exception->render($request);

        $this->assertSame(409, $response->getStatusCode());
    }

    public function test_render_includes_trip_id_and_expected_version_in_body(): void
    {
        $exception = new TripVersionConflictException(
            tripId: 10,
            expectedVersion: 3,
            currentVersion: 5,
        );
        $request = Request::create('/api/trips/10', 'PUT');
        $request->headers->set('Accept', 'application/json');

        $body = $exception->render($request)->getData(true);

        $this->assertSame('trip_version_conflict', $body['error']);
        $this->assertSame(10, $body['trip_id']);
        $this->assertSame(3, $body['expected_version']);
        $this->assertSame(5, $body['current_version']);
        $this->assertArrayHasKey('message', $body);
        $this->assertStringContainsString('admin lain', $body['message']);
    }

    public function test_render_returns_redirect_back_when_request_does_not_want_json(): void
    {
        $exception = new TripVersionConflictException(
            tripId: 10,
            expectedVersion: 3,
        );
        $request = Request::create('/dashboard/trips/10', 'PUT');

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
        $exception = new TripVersionConflictException(
            tripId: 99,
            expectedVersion: 12,
            currentVersion: 14,
            message: 'Custom conflict message',
            code: 1001,
            previous: $previous,
        );

        $this->assertSame(99, $exception->tripId);
        $this->assertSame(12, $exception->expectedVersion);
        $this->assertSame(14, $exception->currentVersion);
        $this->assertSame('Custom conflict message', $exception->getMessage());
        $this->assertSame(1001, $exception->getCode());
        $this->assertSame($previous, $exception->getPrevious());
    }

    public function test_render_with_null_current_version(): void
    {
        $exception = new TripVersionConflictException(
            tripId: 10,
            expectedVersion: 3,
        );
        $request = Request::create('/api/trips/10', 'PUT');
        $request->headers->set('Accept', 'application/json');

        $body = $exception->render($request)->getData(true);

        $this->assertNull($body['current_version']);
    }

    public function test_report_returns_false_to_skip_logging(): void
    {
        $exception = new TripVersionConflictException(
            tripId: 10,
            expectedVersion: 3,
        );

        $this->assertFalse($exception->report());
    }
}
