<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Trip;
use App\Services\TripRotationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

/**
 * Sesi 50 PR #3 — Sub-feature 2 verify: e-tiket otomatis akurat post cascade.
 *
 * E-tiket regular booking render `trip_time` dari Booking field (bukan Trip).
 * Setelah PR #3 cascade `Trip.trip_time → Booking.trip_time` saat gantiJam,
 * e-tiket otomatis tampil jam baru tanpa regenerate logic atau view template
 * change. Test ini guard regression behavior tersebut.
 */
class ETicketTripTimeAccuracyTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow('2026-04-30 10:00:00');
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    public function test_eticket_displays_updated_trip_time_after_gantiJam(): void
    {
        $trip = Trip::factory()->scheduled()->create([
            'trip_date' => '2026-05-02',
            'trip_time' => '05:30:00',
            'sequence'  => 1,
        ])->refresh();

        $booking = Booking::factory()->create([
            'trip_id'        => $trip->id,
            'trip_date'      => '2026-05-02',
            'trip_time'      => '05:30:00',
            'booking_code'   => 'RBK-ETK-01',
            'ticket_number'  => 'ETK-001',
            'invoice_number' => 'INV-001',
            'passenger_name' => 'Budi',
            'booking_status' => 'Diproses',
            'payment_status' => 'Dibayar Tunai',
        ]);

        // Pre-cascade: e-tiket tampil 05:30.
        $htmlBefore = view('pdf.eticket', [
            'booking'      => $booking->fresh(['passengers']),
            'passengers'   => $booking->passengers,
            'generated_at' => '30/04/2026 10:00',
        ])->render();
        $this->assertStringContainsString('Pukul 05:30', $htmlBefore);

        // Admin gantiJam → cascade ke Booking.trip_time.
        $rotation = $this->app->make(TripRotationService::class);
        $rotation->gantiJam($trip->id, '07:00:00', $trip->version);

        $bookingAfter = $booking->fresh(['passengers']);
        $this->assertSame('07:00:00', $bookingAfter->trip_time);

        // Post-cascade: e-tiket tampil 07:00 (otomatis akurat, no regenerate).
        $htmlAfter = view('pdf.eticket', [
            'booking'      => $bookingAfter,
            'passengers'   => $bookingAfter->passengers,
            'generated_at' => '30/04/2026 10:00',
        ])->render();
        $this->assertStringContainsString('Pukul 07:00', $htmlAfter);
        $this->assertStringNotContainsString('Pukul 05:30', $htmlAfter);
    }
}
