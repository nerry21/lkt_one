<?php

namespace Tests\Feature\Api;

use App\Models\Booking;
use App\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class ChatbotBridgeBookingSubmissionTest extends TestCase
{
    use RefreshDatabase;

    private string $apiKey = 'test-bridge-key-sesi68';
    private string $endpoint = '/api/v1/chatbot-bridge/booking/reguler';

    protected function setUp(): void
    {
        parent::setUp();
        config([
            'chatbot_bridge.enabled' => true,
            'chatbot_bridge.api_key' => $this->apiKey,
        ]);
    }

    private function defaultPayload(array $overrides = []): array
    {
        return array_merge([
            'customer_phone' => '628123456789',
            'customer_name' => 'Budi Test',
            'trip_date' => now()->addDays(2)->format('Y-m-d'),
            'trip_time' => '09:00',
            'direction' => 'to_pkb',
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Pekanbaru',
            'passenger_count' => 2,
            'selected_seats' => ['1A', '1B'],
            'pickup_location' => 'Jl. Mawar No. 12, Pasirpengaraian',
            'dropoff_location' => 'Jl. Sudirman No. 99, Pekanbaru',
            'source_event_id' => 'evt-test-001',
        ], $overrides);
    }

    public function test_unauthorized_request_returns_401(): void
    {
        $response = $this->postJson($this->endpoint, $this->defaultPayload());
        $response->assertStatus(401);
    }

    public function test_valid_request_creates_booking_with_draft_status(): void
    {
        $response = $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $this->defaultPayload());

        $response->assertStatus(201)
            ->assertJsonStructure([
                'success',
                'booking' => ['id', 'booking_code', 'booking_status', 'source', 'price_per_seat', 'total_amount'],
                'customer' => ['id', 'display_name'],
            ])
            ->assertJsonPath('booking.booking_status', 'Draft')
            ->assertJsonPath('booking.payment_status', 'Belum Bayar')
            ->assertJsonPath('booking.source', 'chatbot')
            ->assertJsonPath('booking.price_per_seat', 150000)
            ->assertJsonPath('booking.total_amount', 300000);
    }

    public function test_booking_source_record_created(): void
    {
        $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $this->defaultPayload());

        $booking = Booking::latest('id')->first();
        $this->assertNotNull($booking);
        $this->assertDatabaseHas('booking_sources', [
            'booking_id' => $booking->id,
            'source' => 'chatbot',
            'source_event_id' => 'evt-test-001',
            'source_channel' => 'whatsapp',
        ]);
    }

    public function test_customer_auto_created_if_not_exists(): void
    {
        $this->assertDatabaseMissing('customers', ['phone_normalized' => '628123456789']);

        $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $this->defaultPayload());

        $this->assertDatabaseHas('customers', [
            'phone_normalized' => '628123456789',
            'display_name' => 'Budi Test',
        ]);
    }

    public function test_existing_customer_reused(): void
    {
        $existing = Customer::create([
            'display_name' => 'Existing Customer',
            'phone_normalized' => '628123456789',
            'phone_original' => '628123456789',
            'status' => 'active',
        ]);

        $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $this->defaultPayload());

        $booking = Booking::latest('id')->first();
        $this->assertEquals($existing->id, $booking->customer_id);
        $this->assertEquals(1, Customer::where('phone_normalized', '628123456789')->count());
    }

    public function test_passenger_count_must_match_seats_count(): void
    {
        $payload = $this->defaultPayload([
            'passenger_count' => 3,
            'selected_seats' => ['1A', '1B'],
        ]);

        $response = $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $payload);

        $response->assertStatus(422)
            ->assertJsonPath('error', 'validation_failed');
    }

    public function test_invalid_phone_returns_422(): void
    {
        $payload = $this->defaultPayload(['customer_phone' => 'abc']);
        $response = $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $payload);

        $response->assertStatus(422);
    }

    public function test_past_trip_date_rejected(): void
    {
        $payload = $this->defaultPayload(['trip_date' => now()->subDays(1)->format('Y-m-d')]);
        $response = $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $payload);

        $response->assertStatus(422);
    }

    public function test_invalid_direction_rejected(): void
    {
        $payload = $this->defaultPayload(['direction' => 'invalid']);
        $response = $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $payload);

        $response->assertStatus(422);
    }

    public function test_unknown_route_returns_validation_error(): void
    {
        $payload = $this->defaultPayload([
            'from_city' => 'Atlantis',
            'to_city' => 'Wakanda',
        ]);
        $response = $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $payload);

        $response->assertStatus(422)
            ->assertJsonPath('error', 'validation_failed');
    }

    public function test_booking_isFromChatbot_helper(): void
    {
        $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $this->defaultPayload());

        $booking = Booking::with('source')->latest('id')->first();
        $this->assertTrue($booking->isFromChatbot());
    }

    public function test_booking_sources_table_exists(): void
    {
        $this->assertTrue(Schema::hasTable('booking_sources'));
        $this->assertTrue(Schema::hasColumn('booking_sources', 'source'));
        $this->assertTrue(Schema::hasColumn('booking_sources', 'source_event_id'));
        $this->assertTrue(Schema::hasColumn('booking_sources', 'source_channel'));
        $this->assertTrue(Schema::hasColumn('booking_sources', 'source_meta'));
    }
}
