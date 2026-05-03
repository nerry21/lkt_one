<?php

declare(strict_types=1);

namespace Tests\Unit\Services\Bridge;

use App\Exceptions\SeatConflictException;
use App\Models\Booking;
use App\Models\Trip;
use App\Services\Bridge\BridgeBookingCancelService;
use App\Services\BookingNotificationPendingService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Validation\ValidationException;
use Mockery;
use Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;
use Tests\TestCase;

class BridgeBookingCancelServiceTest extends TestCase
{
    use MockeryPHPUnitIntegration;
    use RefreshDatabase;

    private function makeService(): BridgeBookingCancelService
    {
        $notif = Mockery::mock(BookingNotificationPendingService::class)->shouldIgnoreMissing();
        return new BridgeBookingCancelService($notif);
    }

    // ── cancelBooking ──────────────────────────────────────────────────

    public function test_cancel_with_cancelled_by_admin_reason_succeeds(): void
    {
        $booking = Booking::factory()->create([
            'booking_code' => 'JET-CANCEL-1',
            'booking_status' => 'Diproses',
        ]);

        $service = $this->makeService();
        $result = $service->cancelBooking('JET-CANCEL-1', 'cancelled_by_admin');

        $this->assertSame('Dibatalkan', $result->booking_status);
        $this->assertSame('cancelled_by_admin', $result->cancellation_reason);
    }

    public function test_cancel_with_no_show_final_reason_succeeds(): void
    {
        Booking::factory()->create([
            'booking_code' => 'JET-CANCEL-2',
            'booking_status' => 'Dibayar',
        ]);

        $service = $this->makeService();
        $result = $service->cancelBooking('JET-CANCEL-2', 'no_show_final');

        $this->assertSame('Dibatalkan', $result->booking_status);
        $this->assertSame('no_show_final', $result->cancellation_reason);
    }

    public function test_cancel_with_invalid_reason_throws(): void
    {
        Booking::factory()->create([
            'booking_code' => 'JET-CANCEL-3',
            'booking_status' => 'Diproses',
        ]);

        $service = $this->makeService();
        $this->expectException(ValidationException::class);
        $service->cancelBooking('JET-CANCEL-3', 'random_reason');
    }

    public function test_cancel_already_in_draft_throws(): void
    {
        Booking::factory()->create([
            'booking_code' => 'JET-CANCEL-4',
            'booking_status' => 'Draft',
        ]);

        $service = $this->makeService();
        $this->expectException(ValidationException::class);
        $service->cancelBooking('JET-CANCEL-4', 'cancelled_by_admin');
    }

    public function test_cancel_unknown_booking_code_throws(): void
    {
        $service = $this->makeService();
        $this->expectException(ValidationException::class);
        $service->cancelBooking('JET-NOT-EXIST', 'cancelled_by_admin');
    }

    // ── rescheduleBooking ──────────────────────────────────────────────

    public function test_reschedule_to_valid_slot_seat_available_succeeds(): void
    {
        Booking::factory()->create([
            'booking_code' => 'JET-RES-1',
            'booking_status' => 'Diproses',
            'trip_date' => '2026-05-04',
            'trip_time' => '07:00:00',
            'direction' => 'to_pkb',
            'selected_seats' => ['3A'],
        ]);

        $service = $this->makeService();
        $result = $service->rescheduleBooking('JET-RES-1', '09:00');

        $this->assertSame('07:00:00', $result['old_trip_time']);
        $this->assertSame('09:00:00', $result['new_trip_time']);
        $this->assertSame('09:00:00', $result['booking']->trip_time);
    }

    public function test_reschedule_with_seat_conflict_throws_seat_conflict_exception(): void
    {
        Booking::factory()->create([
            'booking_code' => 'JET-RES-2-MOVING',
            'booking_status' => 'Diproses',
            'trip_date' => '2026-05-04',
            'trip_time' => '07:00:00',
            'direction' => 'to_pkb',
            'selected_seats' => ['3A'],
        ]);
        Booking::factory()->create([
            'booking_code' => 'JET-RES-2-OCCUPIER',
            'booking_status' => 'Diproses',
            'trip_date' => '2026-05-04',
            'trip_time' => '09:00:00',
            'direction' => 'to_pkb',
            'selected_seats' => ['3A'],
        ]);

        $service = $this->makeService();
        $this->expectException(SeatConflictException::class);
        $service->rescheduleBooking('JET-RES-2-MOVING', '09:00');
    }

    public function test_reschedule_with_explicit_new_seat_updates_selected_seats(): void
    {
        Booking::factory()->create([
            'booking_code' => 'JET-RES-3',
            'booking_status' => 'Diproses',
            'trip_date' => '2026-05-04',
            'trip_time' => '07:00:00',
            'direction' => 'to_pkb',
            'selected_seats' => ['3A'],
        ]);

        $service = $this->makeService();
        $result = $service->rescheduleBooking('JET-RES-3', '09:00', '4A');

        $this->assertSame(['4A'], $result['booking']->selected_seats);
    }

    public function test_reschedule_to_invalid_slot_throws(): void
    {
        Booking::factory()->create([
            'booking_code' => 'JET-RES-4',
            'booking_status' => 'Diproses',
            'trip_date' => '2026-05-04',
            'trip_time' => '07:00:00',
            'direction' => 'to_pkb',
        ]);

        $service = $this->makeService();
        $this->expectException(ValidationException::class);
        $service->rescheduleBooking('JET-RES-4', '08:30'); // not in SLOTS
    }

    public function test_reschedule_links_to_existing_trip_id(): void
    {
        $mobil = \App\Models\Mobil::factory()->create();
        $driver = \App\Models\Driver::factory()->create();
        $trip = Trip::factory()->create([
            'trip_date' => '2026-05-04',
            'trip_time' => '13:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'status' => 'scheduled',
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
        ]);

        Booking::factory()->create([
            'booking_code' => 'JET-RES-5',
            'booking_status' => 'Diproses',
            'trip_date' => '2026-05-04',
            'trip_time' => '07:00:00',
            'direction' => 'to_pkb',
            'selected_seats' => ['1A'],
        ]);

        $service = $this->makeService();
        $result = $service->rescheduleBooking('JET-RES-5', '13:00');

        $this->assertSame($trip->id, $result['booking']->trip_id);
    }
}
