<?php

namespace Tests\Unit\Exceptions;

use App\Exceptions\SeatConflictException;
use Illuminate\Http\Request;
use Tests\TestCase;

/**
 * Test SeatConflictException render behavior dan property accessors.
 *
 * Extends Tests\TestCase (Laravel-booted) karena render() pakai response()
 * helper yang butuh IoC container. Tidak touch DB (no RefreshDatabase trait).
 */
class SeatConflictExceptionTest extends TestCase
{
    public function test_render_returns_409_status(): void
    {
        $exception = new SeatConflictException(conflicts: []);
        $request = Request::create('/api/bookings', 'POST');
        $request->headers->set('Accept', 'application/json');
        $response = $exception->render($request);

        $this->assertSame(409, $response->getStatusCode());
    }

    public function test_render_includes_conflicts_in_body(): void
    {
        $conflicts = [
            ['date' => '2026-04-20', 'time' => '05:00:00', 'seat' => '1A', 'booking_id' => 123],
            ['date' => '2026-04-20', 'time' => '05:00:00', 'seat' => '2A', 'booking_id' => 124],
        ];
        $exception = new SeatConflictException(conflicts: $conflicts);
        $request = Request::create('/api/bookings', 'POST');
        $request->headers->set('Accept', 'application/json');
        $body = $exception->render($request)->getData(true);

        $this->assertSame('seat_conflict', $body['error']);
        $this->assertCount(2, $body['conflicts']);
        $this->assertSame('1A', $body['conflicts'][0]['seat']);
        $this->assertSame('05:00:00', $body['conflicts'][0]['time']);
        $this->assertSame('2026-04-20', $body['conflicts'][0]['date']);
        $this->assertSame(124, $body['conflicts'][1]['booking_id']);
    }

    public function test_render_returns_redirect_back_when_request_does_not_want_json(): void
    {
        $conflicts = [
            ['date' => '2026-04-20', 'time' => '05:00:00', 'seat' => '1A', 'booking_id' => 123],
            ['date' => '2026-04-20', 'time' => '05:00:00', 'seat' => '2A', 'booking_id' => 124],
        ];
        $exception = new SeatConflictException(conflicts: $conflicts);
        $request = Request::create('/dashboard/regular-bookings/review', 'POST');

        $response = $exception->render($request);

        $this->assertInstanceOf(\Illuminate\Http\RedirectResponse::class, $response);
        $errors = session('errors');
        $this->assertNotNull($errors);
        $this->assertTrue($errors->has('wizard_seat_conflict'));
        $this->assertStringContainsString('1A', (string) $errors->first('wizard_seat_conflict'));
        $this->assertStringContainsString('2A', (string) $errors->first('wizard_seat_conflict'));
    }

    /**
     * NOTE: Pakai \RuntimeException sebagai stand-in QueryException untuk simplicity.
     * Instantiate QueryException langsung butuh PDO args verbose, dan scope test ini
     * hanya verify referential identity via getPrevious() — tidak matter class apa.
     * Section D akan test actual QueryException handling (SQLSTATE 23000 detection)
     * dengan mock atau real DB trigger via SeatLockService.
     */
    public function test_exception_preserves_previous(): void
    {
        $previous = new \RuntimeException('SQLSTATE[23000]: Integrity constraint violation');
        $exception = new SeatConflictException(
            conflicts: [['date' => '2026-04-20', 'time' => '05:00:00', 'seat' => '1A', 'booking_id' => 99]],
            previous: $previous,
        );

        $this->assertSame($previous, $exception->getPrevious());
    }
}
