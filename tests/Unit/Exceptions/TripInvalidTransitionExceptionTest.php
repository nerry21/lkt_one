<?php

namespace Tests\Unit\Exceptions;

use App\Exceptions\TripInvalidTransitionException;
use RuntimeException;
use Tests\TestCase;

/**
 * Test TripInvalidTransitionException — thrown saat admin melakukan state
 * transition yang tidak valid (markBerangkat pada trip sudah berangkat,
 * gantiJam pada trip non-scheduled, dll).
 *
 * Reference: docs/trip-planning-design.md §5.4.
 */
class TripInvalidTransitionExceptionTest extends TestCase
{
    public function test_constructor_stores_all_properties(): void
    {
        $e = new TripInvalidTransitionException(
            tripId: 5,
            currentStatus: 'berangkat',
            attemptedAction: 'markBerangkat',
            reason: 'trip sudah berangkat',
        );

        $this->assertSame(5, $e->tripId);
        $this->assertSame('berangkat', $e->currentStatus);
        $this->assertSame('markBerangkat', $e->attemptedAction);
        $this->assertSame('trip sudah berangkat', $e->reason);
    }

    public function test_message_format(): void
    {
        $e = new TripInvalidTransitionException(
            tripId: 5,
            currentStatus: 'berangkat',
            attemptedAction: 'markBerangkat',
            reason: 'trip sudah berangkat',
        );

        $msg = $e->getMessage();
        $this->assertStringContainsString('markBerangkat', $msg);
        $this->assertStringContainsString('#5', $msg);
        $this->assertStringContainsString('berangkat', $msg);
    }

    public function test_status_code_is_409(): void
    {
        $e = new TripInvalidTransitionException(1, 'scheduled', 'x', 'y');
        $this->assertSame(409, $e->getStatusCode());
    }

    public function test_extends_runtime_exception(): void
    {
        $e = new TripInvalidTransitionException(1, 'scheduled', 'x', 'y');
        $this->assertInstanceOf(RuntimeException::class, $e);
    }
}
