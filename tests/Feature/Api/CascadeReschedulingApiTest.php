<?php

declare(strict_types=1);

namespace Tests\Feature\Api;

use App\Models\Booking;
use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CascadeReschedulingApiTest extends TestCase
{
    use RefreshDatabase;

    private string $apiKey = 'test-bridge-key-sesi76';

    protected function setUp(): void
    {
        parent::setUp();
        config([
            'chatbot_bridge.enabled' => true,
            'chatbot_bridge.api_key' => $this->apiKey,
        ]);
        User::factory()->create(['role' => 'Super Admin']);
    }

    private function authHeaders(): array
    {
        return ['X-Chatbot-Bridge-Key' => $this->apiKey];
    }

    public function test_booking_cancel_with_valid_reason_returns_200(): void
    {
        Booking::factory()->create([
            'booking_code' => 'JET-API-CAN-1',
            'booking_status' => 'Diproses',
        ]);

        $response = $this->withHeaders($this->authHeaders())->postJson(
            '/api/v1/chatbot-bridge/booking/JET-API-CAN-1/cancel',
            ['cancellation_reason' => 'cancelled_by_admin'],
        );

        $response->assertStatus(200);
        $response->assertJson(['success' => true]);
        $this->assertSame('Dibatalkan', Booking::where('booking_code', 'JET-API-CAN-1')->first()->booking_status);
    }

    public function test_booking_cancel_with_invalid_reason_returns_422(): void
    {
        Booking::factory()->create([
            'booking_code' => 'JET-API-CAN-2',
            'booking_status' => 'Diproses',
        ]);

        $response = $this->withHeaders($this->authHeaders())->postJson(
            '/api/v1/chatbot-bridge/booking/JET-API-CAN-2/cancel',
            ['cancellation_reason' => 'random_reason'],
        );

        $response->assertStatus(422);
    }

    public function test_booking_reschedule_to_valid_slot_returns_200(): void
    {
        Booking::factory()->create([
            'booking_code' => 'JET-API-RES-1',
            'booking_status' => 'Diproses',
            'trip_date' => '2026-05-04',
            'trip_time' => '07:00:00',
            'direction' => 'to_pkb',
            'selected_seats' => ['3A'],
        ]);

        $response = $this->withHeaders($this->authHeaders())->postJson(
            '/api/v1/chatbot-bridge/booking/JET-API-RES-1/reschedule',
            ['new_trip_time' => '09:00'],
        );

        $response->assertStatus(200);
        $response->assertJsonPath('new_trip_time', '09:00:00');
        $response->assertJsonPath('old_trip_time', '07:00:00');
    }

    public function test_booking_reschedule_seat_conflict_returns_409(): void
    {
        Booking::factory()->create([
            'booking_code' => 'JET-API-RES-MOVING',
            'booking_status' => 'Diproses',
            'trip_date' => '2026-05-04',
            'trip_time' => '07:00:00',
            'direction' => 'to_pkb',
            'selected_seats' => ['3A'],
        ]);
        Booking::factory()->create([
            'booking_code' => 'JET-API-RES-OCCUPIER',
            'booking_status' => 'Diproses',
            'trip_date' => '2026-05-04',
            'trip_time' => '09:00:00',
            'direction' => 'to_pkb',
            'selected_seats' => ['3A'],
        ]);

        $response = $this->withHeaders($this->authHeaders())->postJson(
            '/api/v1/chatbot-bridge/booking/JET-API-RES-MOVING/reschedule',
            ['new_trip_time' => '09:00'],
        );

        $response->assertStatus(409);
        $response->assertJsonPath('error', 'seat_conflict');
    }

    public function test_trip_mark_tidak_berangkat_returns_200(): void
    {
        $mobil = Mobil::factory()->create();
        $driver = Driver::factory()->create();
        $trip = Trip::factory()->create([
            'trip_date' => '2026-05-04',
            'trip_time' => '07:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'status' => 'scheduled',
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
        ]);
        Booking::factory()->create([
            'booking_status' => 'Diproses',
            'trip_id' => $trip->id,
        ]);

        $response = $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/trip/{$trip->id}/mark-tidak-berangkat",
            [],
        );

        $response->assertStatus(200);
        $response->assertJson(['success' => true, 'status' => 'tidak_berangkat']);
        $response->assertJsonPath('affected_bookings_count', 1);
    }

    public function test_available_slots_today_returns_sorted_list(): void
    {
        $mobil = Mobil::factory()->create();
        $driver = Driver::factory()->create();
        $sourceTrip = Trip::factory()->create([
            'trip_date' => '2026-05-04',
            'trip_time' => '07:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'status' => 'scheduled',
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
        ]);
        Trip::factory()->create([
            'trip_date' => '2026-05-04',
            'trip_time' => '09:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'status' => 'scheduled',
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
        ]);
        Trip::factory()->create([
            'trip_date' => '2026-05-04',
            'trip_time' => '13:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'status' => 'scheduled',
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
        ]);

        $response = $this->withHeaders($this->authHeaders())->getJson(
            "/api/v1/chatbot-bridge/trip/{$sourceTrip->id}/available-slots-today",
        );

        $response->assertStatus(200);
        $response->assertJsonCount(2, 'available_slots');
        $this->assertSame('09:00:00', $response->json('available_slots.0.trip_time'));
        $this->assertSame('13:00:00', $response->json('available_slots.1.trip_time'));
    }

    public function test_endpoints_require_bridge_key(): void
    {
        Booking::factory()->create([
            'booking_code' => 'JET-API-AUTH-1',
            'booking_status' => 'Diproses',
        ]);

        $response = $this->postJson(
            '/api/v1/chatbot-bridge/booking/JET-API-AUTH-1/cancel',
            ['cancellation_reason' => 'cancelled_by_admin'],
        );

        $response->assertStatus(401);
    }
}
