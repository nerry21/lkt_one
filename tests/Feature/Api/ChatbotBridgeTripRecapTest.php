<?php

declare(strict_types=1);

namespace Tests\Feature\Api;

use App\Models\Booking;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChatbotBridgeTripRecapTest extends TestCase
{
    use RefreshDatabase;

    private string $apiKey = 'test-bridge-key-sesi77';

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

    public function test_trip_recap_data_returns_200_for_valid_trip_id(): void
    {
        $trip = Trip::factory()->create(['direction' => 'PKB_TO_ROHUL']);

        $response = $this->withHeaders($this->authHeaders())
            ->getJson('/api/v1/chatbot-bridge/trip-recap-data?trip_id=' . $trip->id);

        $response->assertStatus(200);
        $response->assertJsonPath('data.trip_id', $trip->id);
        $response->assertJsonPath('data.cluster', 'PKB');
    }

    public function test_trip_recap_data_returns_422_for_missing_trip_id(): void
    {
        $response = $this->withHeaders($this->authHeaders())
            ->getJson('/api/v1/chatbot-bridge/trip-recap-data');

        $response->assertStatus(422);
    }

    public function test_trip_recap_data_returns_404_for_unknown_trip_id(): void
    {
        $response = $this->withHeaders($this->authHeaders())
            ->getJson('/api/v1/chatbot-bridge/trip-recap-data?trip_id=99999');

        $response->assertStatus(404);
        $response->assertJsonPath('error', 'trip_not_found');
    }

    public function test_trip_recap_data_requires_api_key(): void
    {
        $trip = Trip::factory()->create();

        $response = $this->getJson('/api/v1/chatbot-bridge/trip-recap-data?trip_id=' . $trip->id);

        $response->assertStatus(401);
    }

    public function test_trip_recap_data_response_has_correct_shape(): void
    {
        $trip = Trip::factory()->create(['direction' => 'ROHUL_TO_PKB']);
        Booking::factory()->create([
            'trip_id' => $trip->id,
            'booking_status' => 'Dibayar',
            'payment_status' => 'Dibayar',
            'payment_method' => 'cash',
            'total_amount' => 130000,
        ]);

        $response = $this->withHeaders($this->authHeaders())
            ->getJson('/api/v1/chatbot-bridge/trip-recap-data?trip_id=' . $trip->id);

        $response->assertStatus(200)->assertJsonStructure([
            'data' => [
                'trip_id',
                'trip_date',
                'trip_time',
                'direction',
                'cluster',
                'mobil_code',
                'driver_name',
                'is_cancelled',
                'passenger_count_berangkat',
                'passenger_count_cancelled',
                'walk_in_count',
                'revenue_cash',
                'revenue_transfer',
                'revenue_total',
            ],
        ]);

        $response->assertJsonPath('data.cluster', 'ROHUL');
        $response->assertJsonPath('data.passenger_count_berangkat', 1);
        $response->assertJsonPath('data.revenue_cash', 130000);
    }

    public function test_trip_recap_detail_returns_passengers_array(): void
    {
        $trip = Trip::factory()->create();
        Booking::factory()->create([
            'trip_id' => $trip->id,
            'passenger_name' => 'Pak Andi',
            'booking_status' => 'Dibayar',
            'selected_seats' => ['1A'],
        ]);

        $response = $this->withHeaders($this->authHeaders())
            ->getJson('/api/v1/chatbot-bridge/trip-recap-detail?trip_id=' . $trip->id);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'passengers',
                'cancellations',
                'seats_occupied',
                'seats_total',
                'cash_trx_count',
                'transfer_trx_count',
            ],
        ]);
        $response->assertJsonPath('data.passengers.0.name', 'Pak Andi');
    }

    public function test_dashboard_trend_7d_returns_labels_and_datasets(): void
    {
        $response = $this->withHeaders($this->authHeaders())
            ->getJson('/api/v1/chatbot-bridge/dashboard-trend-7d');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => ['labels', 'datasets'],
        ]);
        $response->assertJsonCount(7, 'data.labels');
        $response->assertJsonCount(3, 'data.datasets');
    }

    public function test_dashboard_trend_7d_requires_api_key(): void
    {
        $response = $this->getJson('/api/v1/chatbot-bridge/dashboard-trend-7d');

        $response->assertStatus(401);
    }
}
