<?php

namespace Tests\Unit\Exceptions;

use App\Exceptions\TripDeleteNotAllowedException;
use Illuminate\Http\Request;
use Tests\TestCase;

/**
 * Test TripDeleteNotAllowedException render behavior.
 *
 * JSON-only (403) — tidak ada redirect-back fallback karena operasi delete
 * selalu dari API admin, bukan form submission klasik.
 *
 * Sibling pattern: Tests\Unit\Exceptions\SeatLockReleaseNotAllowedExceptionTest.
 */
class TripDeleteNotAllowedExceptionTest extends TestCase
{
    public function test_render_returns_403_status(): void
    {
        $exception = new TripDeleteNotAllowedException(
            tripId: 10,
            currentStatus: 'berangkat',
            reason: 'trip sudah berangkat',
        );
        $response = $exception->render(
            Request::create('/api/trips/10', 'DELETE'),
        );

        $this->assertSame(403, $response->getStatusCode());
    }

    public function test_render_includes_trip_id_status_and_reason(): void
    {
        $exception = new TripDeleteNotAllowedException(
            tripId: 42,
            currentStatus: 'keluar_trip',
            reason: 'trip sedang dalam mode keluar trip (close dulu via menu Keluar Trip)',
        );
        $body = $exception->render(
            Request::create('/api/trips/42', 'DELETE'),
        )->getData(true);

        $this->assertSame('trip_delete_not_allowed', $body['error']);
        $this->assertSame(42, $body['trip_id']);
        $this->assertSame('keluar_trip', $body['current_status']);
        $this->assertSame(
            'trip sedang dalam mode keluar trip (close dulu via menu Keluar Trip)',
            $body['reason'],
        );
        $this->assertStringContainsString('tidak boleh dihapus', $body['message']);
        $this->assertStringContainsString('keluar trip', $body['message']);
    }

    public function test_exception_stores_constructor_params(): void
    {
        $previous = new \RuntimeException('upstream cause');
        $exception = new TripDeleteNotAllowedException(
            tripId: 99,
            currentStatus: 'berangkat',
            reason: 'trip sudah berangkat',
            message: 'Custom message',
            code: 2001,
            previous: $previous,
        );

        $this->assertSame(99, $exception->tripId);
        $this->assertSame('berangkat', $exception->currentStatus);
        $this->assertSame('trip sudah berangkat', $exception->reason);
        $this->assertSame('Custom message', $exception->getMessage());
        $this->assertSame(2001, $exception->getCode());
        $this->assertSame($previous, $exception->getPrevious());
    }

    public function test_report_returns_false_to_skip_logging(): void
    {
        $exception = new TripDeleteNotAllowedException(
            tripId: 10,
            currentStatus: 'berangkat',
            reason: 'trip sudah berangkat',
        );

        $this->assertFalse($exception->report());
    }
}
