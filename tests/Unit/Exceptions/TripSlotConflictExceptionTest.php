<?php

namespace Tests\Unit\Exceptions;

use App\Exceptions\TripSlotConflictException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Tests\TestCase;

/**
 * Test TripSlotConflictException render behavior untuk dua kasus:
 *   - conflictType='slot' (Invariant I1)
 *   - conflictType='mobil' (Invariant I2)
 *
 * Sibling pattern: Tests\Unit\Exceptions\SeatConflictExceptionTest.
 * Reference: docs/trip-planning-design.md §3.4.
 */
class TripSlotConflictExceptionTest extends TestCase
{
    public function test_render_returns_409_status_when_request_wants_json(): void
    {
        $exception = new TripSlotConflictException(
            tripDate: '2026-04-22',
            tripTime: '07:00:00',
            direction: 'PKB_TO_ROHUL',
            conflictType: 'slot',
        );
        $request = Request::create('/api/trips', 'POST');
        $request->headers->set('Accept', 'application/json');

        $response = $exception->render($request);

        $this->assertSame(409, $response->getStatusCode());
    }

    public function test_render_includes_slot_conflict_details_in_body(): void
    {
        $exception = new TripSlotConflictException(
            tripDate: '2026-04-22',
            tripTime: '07:00:00',
            direction: 'PKB_TO_ROHUL',
            conflictType: 'slot',
        );
        $request = Request::create('/api/trips', 'POST');
        $request->headers->set('Accept', 'application/json');

        $body = $exception->render($request)->getData(true);

        $this->assertSame('trip_slot_conflict', $body['error']);
        $this->assertSame('slot', $body['conflict_type']);
        $this->assertSame('2026-04-22', $body['trip_date']);
        $this->assertSame('07:00:00', $body['trip_time']);
        $this->assertSame('PKB_TO_ROHUL', $body['direction']);
        $this->assertNull($body['mobil_id']);
        $this->assertStringContainsString('Slot 07:00:00', $body['message']);
        $this->assertStringContainsString('PKB → ROHUL', $body['message']);
    }

    public function test_render_includes_mobil_conflict_details_in_body(): void
    {
        $mobilId = '9a3b4c5d-6e7f-8a9b-0c1d-2e3f4a5b6c7d';
        $exception = new TripSlotConflictException(
            tripDate: '2026-04-22',
            tripTime: '00:00:00',
            direction: 'ROHUL_TO_PKB',
            conflictType: 'mobil',
            mobilId: $mobilId,
        );
        $request = Request::create('/api/trips', 'POST');
        $request->headers->set('Accept', 'application/json');

        $body = $exception->render($request)->getData(true);

        $this->assertSame('trip_slot_conflict', $body['error']);
        $this->assertSame('mobil', $body['conflict_type']);
        $this->assertSame($mobilId, $body['mobil_id']);
        $this->assertSame('ROHUL_TO_PKB', $body['direction']);
        $this->assertStringContainsString('Mobil sudah dijadwalkan', $body['message']);
        $this->assertStringContainsString('ROHUL → PKB', $body['message']);
    }

    public function test_render_returns_redirect_back_when_request_does_not_want_json(): void
    {
        $exception = new TripSlotConflictException(
            tripDate: '2026-04-22',
            tripTime: '07:00:00',
            direction: 'PKB_TO_ROHUL',
            conflictType: 'slot',
        );
        $request = Request::create('/dashboard/trips', 'POST');

        $response = $exception->render($request);

        $this->assertInstanceOf(RedirectResponse::class, $response);
        $errors = session('errors');
        $this->assertNotNull($errors);
        $this->assertTrue($errors->has('trip_conflict'));
        $this->assertStringContainsString('Slot', (string) $errors->first('trip_conflict'));
    }

    public function test_exception_stores_constructor_params(): void
    {
        $mobilId = '11111111-2222-3333-4444-555555555555';
        $exception = new TripSlotConflictException(
            tripDate: '2026-04-22',
            tripTime: '00:00:00',
            direction: 'PKB_TO_ROHUL',
            conflictType: 'mobil',
            mobilId: $mobilId,
        );

        $this->assertSame('2026-04-22', $exception->tripDate);
        $this->assertSame('00:00:00', $exception->tripTime);
        $this->assertSame('PKB_TO_ROHUL', $exception->direction);
        $this->assertSame('mobil', $exception->conflictType);
        $this->assertSame($mobilId, $exception->mobilId);
    }

    public function test_report_returns_false_to_skip_logging(): void
    {
        $exception = new TripSlotConflictException(
            tripDate: '2026-04-22',
            tripTime: '07:00:00',
            direction: 'PKB_TO_ROHUL',
            conflictType: 'slot',
        );

        $this->assertFalse($exception->report());
    }
}
