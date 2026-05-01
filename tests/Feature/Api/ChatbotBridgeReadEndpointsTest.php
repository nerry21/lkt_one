<?php

namespace Tests\Feature\Api;

use App\Models\Booking;
use App\Models\Customer;
use App\Models\Trip;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChatbotBridgeReadEndpointsTest extends TestCase
{
    use RefreshDatabase;

    protected string $apiKey = 'test-bridge-secret-sesi-67';

    protected function setUp(): void
    {
        parent::setUp();
        config([
            'chatbot_bridge.enabled' => true,
            'chatbot_bridge.api_key' => $this->apiKey,
        ]);
    }

    private function authedGet(string $url)
    {
        return $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->getJson($url);
    }

    // -------------------------------------------------------------------------
    // Auth
    // -------------------------------------------------------------------------

    public function test_seat_availability_requires_api_key(): void
    {
        $response = $this->getJson('/api/v1/chatbot-bridge/seat-availability?trip_date=2026-05-10&direction=PKB_TO_ROHUL');

        $response->assertStatus(401);
    }

    // -------------------------------------------------------------------------
    // Seat Availability
    // -------------------------------------------------------------------------

    public function test_seat_availability_returns_ok_with_valid_params(): void
    {
        Trip::factory()->scheduled()->direction('PKB_TO_ROHUL')->create([
            'trip_date' => '2026-05-10',
            'trip_time' => '07:00:00',
        ]);
        Trip::factory()->scheduled()->direction('PKB_TO_ROHUL')->create([
            'trip_date' => '2026-05-10',
            'trip_time' => '09:00:00',
        ]);

        $response = $this->authedGet('/api/v1/chatbot-bridge/seat-availability?trip_date=2026-05-10&direction=PKB_TO_ROHUL');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => ['trip_id', 'trip_time', 'mobil_plat', 'route_via', 'occupied_seats', 'available_count', 'total_count'],
                ],
                'meta' => ['count'],
            ])
            ->assertJsonPath('meta.count', 2);

        // Verify sort by trip_time ascending
        $times = collect($response->json('data'))->pluck('trip_time')->all();
        $this->assertSame(['07:00', '09:00'], $times);
    }

    public function test_seat_availability_validates_required_trip_date(): void
    {
        $response = $this->authedGet('/api/v1/chatbot-bridge/seat-availability?direction=PKB_TO_ROHUL');

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['trip_date']);
    }

    public function test_seat_availability_validates_direction_enum(): void
    {
        $response = $this->authedGet('/api/v1/chatbot-bridge/seat-availability?trip_date=2026-05-10&direction=INVALID');

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['direction']);
    }

    public function test_seat_availability_filters_by_trip_time_when_provided(): void
    {
        Trip::factory()->scheduled()->direction('PKB_TO_ROHUL')->create([
            'trip_date' => '2026-05-10',
            'trip_time' => '07:00:00',
        ]);
        Trip::factory()->scheduled()->direction('PKB_TO_ROHUL')->create([
            'trip_date' => '2026-05-10',
            'trip_time' => '09:00:00',
        ]);

        $response = $this->authedGet('/api/v1/chatbot-bridge/seat-availability?trip_date=2026-05-10&direction=PKB_TO_ROHUL&trip_time=07:00');

        $response->assertStatus(200)
            ->assertJsonPath('meta.count', 1)
            ->assertJsonPath('data.0.trip_time', '07:00');
    }

    public function test_seat_availability_returns_total_count_from_mobil_capacity(): void
    {
        $trip = Trip::factory()->scheduled()->direction('PKB_TO_ROHUL')->create([
            'trip_date' => '2026-05-10',
            'trip_time' => '07:00:00',
        ]);
        $trip->mobil->update(['seat_capacity' => 6]);

        $response = $this->authedGet('/api/v1/chatbot-bridge/seat-availability?trip_date=2026-05-10&direction=PKB_TO_ROHUL');

        $response->assertStatus(200)
            ->assertJsonPath('data.0.total_count', 6)
            ->assertJsonPath('data.0.available_count', 6);
    }

    // -------------------------------------------------------------------------
    // Fare
    // -------------------------------------------------------------------------

    public function test_fare_returns_pricing_for_reguler(): void
    {
        $response = $this->authedGet('/api/v1/chatbot-bridge/fare?from_city=Pekanbaru&to_city=Pasirpengaraian&category=Reguler');

        $response->assertStatus(200)
            ->assertJson([
                'data' => [
                    'from_city' => 'Pekanbaru',
                    'to_city' => 'Pasirpengaraian',
                    'category' => 'Reguler',
                    'price' => 150000,
                    'unit' => 'per_seat',
                    'currency' => 'IDR',
                ],
            ]);
    }

    public function test_fare_returns_422_for_rental_no_lookup(): void
    {
        $response = $this->authedGet('/api/v1/chatbot-bridge/fare?from_city=Pekanbaru&to_city=Pasirpengaraian&category=Rental');

        $response->assertStatus(422)
            ->assertJson(['code' => 'FARE_LOOKUP_FAILED']);
    }

    public function test_fare_validates_category_enum(): void
    {
        $response = $this->authedGet('/api/v1/chatbot-bridge/fare?from_city=Pekanbaru&to_city=Pasirpengaraian&category=Random');

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['category']);
    }

    public function test_fare_returns_422_for_invalid_route(): void
    {
        $response = $this->authedGet('/api/v1/chatbot-bridge/fare?from_city=Atlantis&to_city=Mars&category=Reguler');

        $response->assertStatus(422)
            ->assertJson(['code' => 'FARE_LOOKUP_FAILED']);
    }

    // -------------------------------------------------------------------------
    // Route List
    // -------------------------------------------------------------------------

    public function test_route_list_returns_2_clusters(): void
    {
        $response = $this->authedGet('/api/v1/chatbot-bridge/route');

        $response->assertStatus(200)
            ->assertJsonCount(2, 'data');
    }

    public function test_route_list_includes_bangkinang_and_petapahan(): void
    {
        $response = $this->authedGet('/api/v1/chatbot-bridge/route');

        $clusters = collect($response->json('data'))->pluck('route_via')->all();
        $this->assertContains('BANGKINANG', $clusters);
        $this->assertContains('PETAPAHAN', $clusters);

        // Verify Pekanbaru appears in stops for both clusters
        foreach ($response->json('data') as $route) {
            $this->assertContains('Pekanbaru', $route['stops']);
            $this->assertSame(['PKB_TO_ROHUL', 'ROHUL_TO_PKB'], $route['directions']);
        }
    }

    // -------------------------------------------------------------------------
    // Customer Detail
    // -------------------------------------------------------------------------

    public function test_customer_detail_returns_aggregate_for_existing_customer(): void
    {
        $customer = Customer::create([
            'phone_normalized' => '628111222333',
            'phone_original' => '08111222333',
            'display_name' => 'Bu Test',
        ]);

        Booking::factory()->count(3)->create([
            'customer_id' => $customer->id,
            'category' => 'Reguler',
        ]);

        $response = $this->authedGet('/api/v1/chatbot-bridge/customer/detail?phone=08111222333');

        $response->assertStatus(200)
            ->assertJsonPath('data.phone_normalized', '628111222333')
            ->assertJsonPath('data.profile.customer_id', $customer->id)
            ->assertJsonPath('data.profile.display_name', 'Bu Test')
            ->assertJsonPath('data.profile.total_bookings', 3)
            ->assertJsonPath('data.profile.favorite_category', 'Reguler');
    }

    public function test_customer_detail_returns_empty_recent_bookings_for_unknown_phone(): void
    {
        $response = $this->authedGet('/api/v1/chatbot-bridge/customer/detail?phone=08999999999');

        $response->assertStatus(200)
            ->assertJsonPath('data.profile', null)
            ->assertJsonPath('data.recent_bookings', []);
    }

    public function test_customer_detail_limits_recent_to_5(): void
    {
        $customer = Customer::create([
            'phone_normalized' => '628222333444',
            'phone_original' => '08222333444',
            'display_name' => 'Bu Banyak',
        ]);

        Booking::factory()->count(8)->create(['customer_id' => $customer->id]);

        $response = $this->authedGet('/api/v1/chatbot-bridge/customer/detail?phone=08222333444');

        $response->assertStatus(200)
            ->assertJsonPath('data.profile.total_bookings', 8)
            ->assertJsonCount(5, 'data.recent_bookings');
    }

    public function test_customer_detail_validates_phone(): void
    {
        $response = $this->authedGet('/api/v1/chatbot-bridge/customer/detail');

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['phone']);
    }

    // -------------------------------------------------------------------------
    // Departure List
    // -------------------------------------------------------------------------

    public function test_departure_list_returns_active_trips_for_date(): void
    {
        Trip::factory()->scheduled()->direction('ROHUL_TO_PKB')->create([
            'trip_date' => '2026-05-10',
            'trip_time' => '06:00:00',
        ]);
        Trip::factory()->scheduled()->direction('ROHUL_TO_PKB')->create([
            'trip_date' => '2026-05-10',
            'trip_time' => '08:00:00',
        ]);

        $response = $this->authedGet('/api/v1/chatbot-bridge/departure-list?trip_date=2026-05-10&direction=ROHUL_TO_PKB');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => ['trip_id', 'trip_time', 'mobil_plat', 'route_via', 'driver_name', 'available_seats_count'],
                ],
                'meta' => ['trip_date', 'direction', 'count'],
            ])
            ->assertJsonPath('meta.count', 2)
            ->assertJsonPath('meta.trip_date', '2026-05-10')
            ->assertJsonPath('meta.direction', 'ROHUL_TO_PKB');
    }

    public function test_departure_list_validates_required_params(): void
    {
        $response = $this->authedGet('/api/v1/chatbot-bridge/departure-list');

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['trip_date', 'direction']);
    }

    public function test_departure_list_filters_by_direction(): void
    {
        Trip::factory()->scheduled()->direction('PKB_TO_ROHUL')->create([
            'trip_date' => '2026-05-10',
            'trip_time' => '06:00:00',
        ]);
        Trip::factory()->scheduled()->direction('ROHUL_TO_PKB')->create([
            'trip_date' => '2026-05-10',
            'trip_time' => '08:00:00',
        ]);

        $response = $this->authedGet('/api/v1/chatbot-bridge/departure-list?trip_date=2026-05-10&direction=PKB_TO_ROHUL');

        $response->assertStatus(200)
            ->assertJsonPath('meta.count', 1)
            ->assertJsonPath('data.0.trip_time', '06:00');
    }
}
