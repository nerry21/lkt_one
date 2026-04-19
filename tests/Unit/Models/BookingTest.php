<?php

namespace Tests\Unit\Models;

use App\Models\Booking;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

/**
 * Unit tests for Booking::updateWithVersionCheck() — bug #30 atomic
 * check-and-set primitive backing optimistic locking across all 4 admin
 * mutation endpoints.
 *
 * Method semantic verified:
 * - Atomic UPDATE bookings SET version=?+1, [attrs...] WHERE id=? AND version=?
 * - Returns true if 1 row affected (version match), false otherwise
 * - On success: in-memory version bumped, attributes propagated via
 *   setAttribute(), syncOriginal() called (model marked clean)
 * - On failure: zero in-memory mutation, model state unchanged
 *
 * Coverage targets:
 * - Happy path (matching version)
 * - Conflict path (stale version)
 * - Empty attributes (version-only bump, design §10 pattern)
 * - Multi-attribute propagation
 * - Atomic semantic (sequential calls first-wins)
 */
class BookingTest extends TestCase
{
    use RefreshDatabase;

    public function test_updateWithVersionCheck_succeeds_with_matching_version(): void
    {
        $booking = Booking::factory()->create();
        $this->assertSame(0, $booking->version, 'Fresh booking should have version=0 from DB default');

        $result = $booking->updateWithVersionCheck(
            ['payment_status' => 'Dibayar'],
            0,
        );

        $this->assertTrue($result, 'updateWithVersionCheck should return true on version match');
        $this->assertSame(1, $booking->version, 'In-memory version should be incremented to 1');
        $this->assertSame('Dibayar', $booking->payment_status, 'In-memory attribute should reflect new value');

        // Verify DB persisted state
        $fresh = $booking->fresh();
        $this->assertSame(1, $fresh->version, 'DB version should be 1 post-update');
        $this->assertSame('Dibayar', $fresh->payment_status, 'DB payment_status should be Dibayar');
    }

    public function test_updateWithVersionCheck_returns_false_on_stale_version(): void
    {
        $booking = Booking::factory()->create();
        $this->assertSame(0, $booking->version);

        // Simulate concurrent writer bumping version to 5 via direct DB write
        DB::table('bookings')->where('id', $booking->id)->update(['version' => 5]);

        // Caller has stale expectedVersion=0
        $result = $booking->updateWithVersionCheck(
            ['payment_status' => 'Dibayar'],
            0,
        );

        $this->assertFalse($result, 'updateWithVersionCheck should return false on version mismatch');

        // In-memory state should NOT be mutated
        $this->assertSame(0, $booking->version, 'In-memory version should NOT be touched on failure');
        $this->assertNotSame('Dibayar', $booking->payment_status, 'In-memory attributes should NOT be set on failure');

        // DB state should be unchanged from concurrent write
        $fresh = $booking->fresh();
        $this->assertSame(5, $fresh->version, 'DB version should remain at concurrent writer value');
    }

    public function test_updateWithVersionCheck_with_empty_attributes_bumps_version_only(): void
    {
        $booking = Booking::factory()->create();
        $originalPaymentStatus = $booking->payment_status;
        $originalBookingStatus = $booking->booking_status;

        $result = $booking->updateWithVersionCheck([], 0);

        $this->assertTrue($result, 'Empty attributes call should still succeed (version-only update)');
        $this->assertSame(1, $booking->version, 'Version should be bumped even with empty attributes');

        // Other columns should be unchanged
        $fresh = $booking->fresh();
        $this->assertSame(1, $fresh->version);
        $this->assertSame($originalPaymentStatus, $fresh->payment_status, 'Other columns should be untouched');
        $this->assertSame($originalBookingStatus, $fresh->booking_status);
    }

    public function test_updateWithVersionCheck_propagates_multiple_attributes_to_memory(): void
    {
        $booking = Booking::factory()->create();

        $result = $booking->updateWithVersionCheck(
            [
                'payment_status' => 'Dibayar',
                'booking_status' => 'Diproses',
                'notes' => 'Test note from updateWithVersionCheck',
            ],
            0,
        );

        $this->assertTrue($result);

        // In-memory state reflects all 3 new values
        $this->assertSame('Dibayar', $booking->payment_status);
        $this->assertSame('Diproses', $booking->booking_status);
        $this->assertSame('Test note from updateWithVersionCheck', $booking->notes);
        $this->assertSame(1, $booking->version);

        // DB persisted
        $fresh = $booking->fresh();
        $this->assertSame('Dibayar', $fresh->payment_status);
        $this->assertSame('Diproses', $fresh->booking_status);
        $this->assertSame('Test note from updateWithVersionCheck', $fresh->notes);
        $this->assertSame(1, $fresh->version);
    }

    public function test_updateWithVersionCheck_atomic_first_wins_on_concurrent_calls(): void
    {
        $booking = Booking::factory()->create();
        $this->assertSame(0, $booking->version);

        // Simulate 2 concurrent admins both holding expectedVersion=0
        // Re-fetch fresh instances to mimic 2 separate request contexts
        $bookingA = Booking::find($booking->id);
        $bookingB = Booking::find($booking->id);

        $resultA = $bookingA->updateWithVersionCheck(['payment_status' => 'Dibayar'], 0);
        $resultB = $bookingB->updateWithVersionCheck(['payment_status' => 'Ditolak'], 0);

        $this->assertTrue($resultA, 'First call should win (atomic UPDATE matched)');
        $this->assertFalse($resultB, 'Second call should fail (version no longer 0)');

        // DB reflects winner only
        $fresh = $booking->fresh();
        $this->assertSame(1, $fresh->version, 'Version bumped exactly once');
        $this->assertSame('Dibayar', $fresh->payment_status, 'First writer wins');
    }
}
