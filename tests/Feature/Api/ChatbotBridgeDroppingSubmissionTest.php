<?php

namespace Tests\Feature\Api;

use App\Models\Booking;
use App\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChatbotBridgeDroppingSubmissionTest extends TestCase
{
    use RefreshDatabase;

    private string $apiKey = 'test-bridge-key-sesi69-dropping';
    private string $endpoint = '/api/v1/chatbot-bridge/booking/dropping';

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
            'customer_phone' => '628123456790',
            'customer_name' => 'Pak Andi',
            'trip_date' => now()->addDays(3)->format('Y-m-d'),
            'trip_time' => '07:00',
            'direction' => 'to_pkb',
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Pekanbaru',
            'pickup_location' => 'Jl. Melati 5, Pasirpengaraian',
            'dropoff_location' => 'Bandara SSK II, Pekanbaru',
            'source_event_id' => 'evt-dropping-001',
        ], $overrides);
    }

    public function test_unauthorized_request_returns_401(): void
    {
        $response = $this->postJson($this->endpoint, $this->defaultPayload());
        $response->assertStatus(401);
    }

    public function test_valid_request_creates_dropping_booking_with_full_mobil_seats(): void
    {
        $response = $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $this->defaultPayload());

        $response->assertStatus(201)
            ->assertJsonPath('booking.category', 'Dropping')
            ->assertJsonPath('booking.booking_status', 'Draft')
            ->assertJsonPath('booking.payment_status', 'Belum Bayar')
            ->assertJsonPath('booking.passenger_count', 6)
            ->assertJsonPath('booking.total_amount', 0)
            ->assertJsonPath('booking.price_per_seat', 0)
            ->assertJsonPath('booking.source', 'chatbot');

        $this->assertSame(
            ['1A', '2A', '2B', '3A', '4A', '5A'],
            $response->json('booking.selected_seats'),
        );
    }

    public function test_booking_code_uses_dbk_prefix(): void
    {
        $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $this->defaultPayload());

        $booking = Booking::latest('id')->first();
        $this->assertNotNull($booking);
        $this->assertStringStartsWith('DBK-', $booking->booking_code);
        $this->assertSame('Dropping', $booking->category);
    }

    public function test_booking_source_record_created_with_chatbot_tag(): void
    {
        $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $this->defaultPayload());

        $booking = Booking::latest('id')->first();
        $this->assertDatabaseHas('booking_sources', [
            'booking_id' => $booking->id,
            'source' => 'chatbot',
            'source_event_id' => 'evt-dropping-001',
            'source_channel' => 'whatsapp',
        ]);
    }

    public function test_customer_auto_created(): void
    {
        $this->assertDatabaseMissing('customers', ['phone_normalized' => '628123456790']);

        $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $this->defaultPayload());

        $this->assertDatabaseHas('customers', [
            'phone_normalized' => '628123456790',
            'display_name' => 'Pak Andi',
        ]);
    }

    public function test_existing_customer_reused(): void
    {
        $existing = Customer::create([
            'display_name' => 'Andi Lama',
            'phone_normalized' => '628123456790',
            'phone_original' => '628123456790',
            'status' => 'active',
        ]);

        $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $this->defaultPayload());

        $booking = Booking::latest('id')->first();
        $this->assertEquals($existing->id, $booking->customer_id);
    }

    public function test_past_trip_date_rejected(): void
    {
        $payload = $this->defaultPayload(['trip_date' => now()->subDay()->format('Y-m-d')]);
        $response = $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $payload);

        $response->assertStatus(422);
    }

    public function test_invalid_direction_rejected(): void
    {
        $payload = $this->defaultPayload(['direction' => 'sideways']);
        $response = $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $payload);

        $response->assertStatus(422);
    }
}
