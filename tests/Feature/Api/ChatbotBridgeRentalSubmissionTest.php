<?php

namespace Tests\Feature\Api;

use App\Models\Booking;
use App\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChatbotBridgeRentalSubmissionTest extends TestCase
{
    use RefreshDatabase;

    private string $apiKey = 'test-bridge-key-sesi69-rental';
    private string $endpoint = '/api/v1/chatbot-bridge/booking/rental';

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
        $start = now()->addDays(5);
        $end = now()->addDays(8);

        return array_merge([
            'customer_phone' => '628123456791',
            'customer_name' => 'Bu Sari',
            'trip_date' => $start->format('Y-m-d'),
            'rental_end_date' => $end->format('Y-m-d'),
            'direction' => 'from_pkb',
            'from_city' => 'Pekanbaru',
            'to_city' => 'Pasirpengaraian',
            'pickup_location' => 'Hotel Aryaduta, Pekanbaru',
            'dropoff_location' => 'Pasirpengaraian',
            'source_event_id' => 'evt-rental-001',
        ], $overrides);
    }

    public function test_unauthorized_request_returns_401(): void
    {
        $response = $this->postJson($this->endpoint, $this->defaultPayload());
        $response->assertStatus(401);
    }

    public function test_valid_request_creates_rental_booking_with_end_date(): void
    {
        $start = now()->addDays(5)->format('Y-m-d');
        $end = now()->addDays(8)->format('Y-m-d');

        $response = $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $this->defaultPayload());

        $response->assertStatus(201)
            ->assertJsonPath('booking.category', 'Rental')
            ->assertJsonPath('booking.booking_status', 'Draft')
            ->assertJsonPath('booking.payment_status', 'Belum Bayar')
            ->assertJsonPath('booking.passenger_count', 6)
            ->assertJsonPath('booking.total_amount', 0)
            ->assertJsonPath('booking.trip_date', $start)
            ->assertJsonPath('booking.rental_end_date', $end);
    }

    public function test_trip_time_auto_set_to_midnight(): void
    {
        $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $this->defaultPayload());

        $booking = Booking::latest('id')->first();
        $this->assertSame('00:00:00', (string) $booking->trip_time);
    }

    public function test_rental_end_date_must_be_after_trip_date(): void
    {
        $payload = $this->defaultPayload([
            'trip_date' => now()->addDays(5)->format('Y-m-d'),
            'rental_end_date' => now()->addDays(5)->format('Y-m-d'),
        ]);

        $response = $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $payload);

        $response->assertStatus(422);
    }

    public function test_rental_end_date_required(): void
    {
        $payload = $this->defaultPayload();
        unset($payload['rental_end_date']);

        $response = $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['rental_end_date']);
    }

    public function test_booking_code_uses_rnt_prefix(): void
    {
        $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $this->defaultPayload());

        $booking = Booking::latest('id')->first();
        $this->assertStringStartsWith('RNT-', $booking->booking_code);
        $this->assertSame('Rental', $booking->category);
    }

    public function test_customer_auto_created(): void
    {
        $this->assertDatabaseMissing('customers', ['phone_normalized' => '628123456791']);

        $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $this->defaultPayload());

        $this->assertDatabaseHas('customers', [
            'phone_normalized' => '628123456791',
            'display_name' => 'Bu Sari',
        ]);
    }

    public function test_booking_source_record_created(): void
    {
        $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $this->defaultPayload());

        $booking = Booking::latest('id')->first();
        $this->assertDatabaseHas('booking_sources', [
            'booking_id' => $booking->id,
            'source' => 'chatbot',
            'source_event_id' => 'evt-rental-001',
        ]);
    }
}
