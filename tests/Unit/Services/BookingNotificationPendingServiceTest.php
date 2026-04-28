<?php

namespace Tests\Unit\Services;

use App\Models\Booking;
use App\Models\BookingNotificationPending;
use App\Models\Customer;
use App\Models\Driver;
use App\Models\Mobil;
use App\Services\BookingNotificationPendingService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

/**
 * Test coverage BookingNotificationPendingService (Sesi 50 PR #3).
 *
 * Stateless service — fokus test:
 *   - Compile message preview untuk 4 event type
 *   - Display value resolution (mobil → kode_mobil, driver → nama)
 *   - Phone resolution priority customer > booking
 *   - recordEventForTripBookings exclude logic
 */
class BookingNotificationPendingServiceTest extends TestCase
{
    use RefreshDatabase;

    protected BookingNotificationPendingService $svc;

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow('2026-04-30 10:00:00');
        $this->svc = $this->app->make(BookingNotificationPendingService::class);
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    public function test_records_trip_time_changed_with_compiled_message(): void
    {
        $booking = Booking::factory()->create([
            'booking_code'    => 'RBK-001',
            'passenger_name'  => 'Budi',
            'passenger_phone' => '081234567890',
            'trip_time'       => '07:00:00',
            'trip_date'       => '2026-05-01',
        ]);

        $record = $this->svc->recordEvent(
            booking:   $booking,
            eventType: BookingNotificationPendingService::EVENT_TRIP_TIME_CHANGED,
            oldValue:  '05:30:00',
            newValue:  '07:00:00',
        );

        $this->assertSame('trip_time_changed', $record->event_type);
        $this->assertSame('05:30:00', $record->old_value);
        $this->assertSame('07:00:00', $record->new_value);
        $this->assertSame('Budi', $record->passenger_name);
        $this->assertSame('081234567890', $record->passenger_phone);
        $this->assertSame('pending', $record->notification_status);
        $this->assertStringContainsString('Halo Budi', $record->notification_message);
        $this->assertStringContainsString('RBK-001', $record->notification_message);
        // Display HH:MM (strip detik)
        $this->assertStringContainsString('05:30', $record->notification_message);
        $this->assertStringContainsString('07:00', $record->notification_message);
    }

    public function test_records_mobil_changed_with_kode_mobil_lookup(): void
    {
        $oldMobil = Mobil::factory()->create(['kode_mobil' => 'JET 01']);
        $newMobil = Mobil::factory()->create(['kode_mobil' => 'JET 02']);

        $booking = Booking::factory()->create([
            'booking_code'   => 'RBK-002',
            'passenger_name' => 'Siti',
            'trip_time'      => '07:00:00',
        ]);

        $record = $this->svc->recordEvent(
            booking:   $booking,
            eventType: BookingNotificationPendingService::EVENT_MOBIL_CHANGED,
            oldValue:  $oldMobil->id,
            newValue:  $newMobil->id,
        );

        $this->assertSame('mobil_changed', $record->event_type);
        // raw value tetap UUID — display di message yang resolve ke kode_mobil
        $this->assertSame($oldMobil->id, $record->old_value);
        $this->assertSame($newMobil->id, $record->new_value);
        $this->assertStringContainsString('JET 01', $record->notification_message);
        $this->assertStringContainsString('JET 02', $record->notification_message);
        $this->assertStringContainsString('Siti', $record->notification_message);
    }

    public function test_records_driver_changed_with_driver_nama_lookup(): void
    {
        $oldDriver = Driver::factory()->create(['nama' => 'Sulaiman']);
        $newDriver = Driver::factory()->create(['nama' => 'Rusdy']);

        $booking = Booking::factory()->create([
            'booking_code'   => 'RBK-003',
            'passenger_name' => 'Andi',
            'trip_time'      => '14:00:00',
        ]);

        $record = $this->svc->recordEvent(
            booking:   $booking,
            eventType: BookingNotificationPendingService::EVENT_DRIVER_CHANGED,
            oldValue:  $oldDriver->id,
            newValue:  $newDriver->id,
        );

        $this->assertSame('driver_changed', $record->event_type);
        $this->assertStringContainsString('Sulaiman', $record->notification_message);
        $this->assertStringContainsString('Rusdy', $record->notification_message);
        $this->assertStringContainsString('Andi', $record->notification_message);
    }

    public function test_records_trip_canceled_with_full_message(): void
    {
        $booking = Booking::factory()->create([
            'booking_code'   => 'RBK-004',
            'passenger_name' => 'Maya',
            'trip_time'      => '19:00:00',
            'trip_date'      => '2026-05-05',
        ]);

        $record = $this->svc->recordEvent(
            booking:   $booking,
            eventType: BookingNotificationPendingService::EVENT_TRIP_CANCELED,
            oldValue:  'scheduled',
            newValue:  'tidak_berangkat',
        );

        $this->assertSame('trip_canceled', $record->event_type);
        $this->assertStringContainsString('DIBATALKAN', $record->notification_message);
        $this->assertStringContainsString('19:00', $record->notification_message);
        // Locale-agnostic date assertion: cek komponen tanggal terpisah.
        $this->assertStringContainsString('05', $record->notification_message);
        $this->assertStringContainsString('2026', $record->notification_message);
        $this->assertStringContainsString('RBK-004', $record->notification_message);
        $this->assertStringContainsString('Maya', $record->notification_message);
    }

    public function test_phone_resolution_priority_customer_then_booking(): void
    {
        // Booking dengan customer ter-link → phone harus pakai customer.phone_normalized
        // (E.164), bukan booking.passenger_phone (raw input).
        $customer = Customer::query()->create([
            'display_name'        => 'Pak Bos',
            'phone_normalized'    => '6281234567890',
            'phone_original'      => '081234567890',
            'identity_confidence' => 'high',
            'status'              => 'active',
        ]);

        $bookingWithCustomer = Booking::factory()->create([
            'customer_id'     => $customer->id,
            'passenger_name'  => 'Pak Bos Booking',
            'passenger_phone' => '081234567890',
            'booking_code'    => 'RBK-101',
        ]);

        $record1 = $this->svc->recordEvent(
            booking:   $bookingWithCustomer,
            eventType: BookingNotificationPendingService::EVENT_TRIP_TIME_CHANGED,
            oldValue:  '05:30:00',
            newValue:  '07:00:00',
        );

        $this->assertSame('Pak Bos', $record1->passenger_name); // customer.display_name menang
        $this->assertSame('6281234567890', $record1->passenger_phone); // E.164 menang

        // Booking tanpa customer → fallback ke passenger_phone raw input.
        $bookingWithoutCustomer = Booking::factory()->create([
            'customer_id'     => null,
            'passenger_name'  => 'Tanpa Customer',
            'passenger_phone' => '085511223344',
            'booking_code'    => 'RBK-102',
        ]);

        $record2 = $this->svc->recordEvent(
            booking:   $bookingWithoutCustomer,
            eventType: BookingNotificationPendingService::EVENT_TRIP_TIME_CHANGED,
            oldValue:  '05:30:00',
            newValue:  '07:00:00',
        );

        $this->assertSame('Tanpa Customer', $record2->passenger_name);
        $this->assertSame('085511223344', $record2->passenger_phone);
    }

    public function test_recordEventForTripBookings_excludes_self_booking_id(): void
    {
        // Create real Trip so Booking.trip_id FK passes.
        $trip = \App\Models\Trip::factory()->create();
        $tripId = $trip->id;

        $self = Booking::factory()->create([
            'trip_id'        => $tripId,
            'booking_code'   => 'RBK-SELF',
            'passenger_name' => 'Self',
            'booking_status' => 'Diproses',
        ]);
        $peer1 = Booking::factory()->create([
            'trip_id'        => $tripId,
            'booking_code'   => 'RBK-PEER1',
            'passenger_name' => 'Peer 1',
            'booking_status' => 'Diproses',
        ]);
        $peer2 = Booking::factory()->create([
            'trip_id'        => $tripId,
            'booking_code'   => 'RBK-PEER2',
            'passenger_name' => 'Peer 2',
            'booking_status' => 'Diproses',
        ]);
        // Cancelled booking — harus di-skip.
        Booking::factory()->create([
            'trip_id'        => $tripId,
            'booking_code'   => 'RBK-CANCEL',
            'passenger_name' => 'Cancelled',
            'booking_status' => 'Cancelled',
        ]);

        $count = $this->svc->recordEventForTripBookings(
            tripId:           $tripId,
            eventType:        BookingNotificationPendingService::EVENT_TRIP_TIME_CHANGED,
            oldValue:         '05:30:00',
            newValue:         '07:00:00',
            excludeBookingId: $self->id,
        );

        $this->assertSame(2, $count);

        $records = BookingNotificationPending::query()->get();
        $this->assertCount(2, $records);
        $names = $records->pluck('passenger_name')->all();
        $this->assertContains('Peer 1', $names);
        $this->assertContains('Peer 2', $names);
        $this->assertNotContains('Self', $names);
        $this->assertNotContains('Cancelled', $names);
    }
}
