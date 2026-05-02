<?php

namespace Tests\Feature\Api;

use App\Models\Booking;
use App\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChatbotBridgePaketSubmissionTest extends TestCase
{
    use RefreshDatabase;

    private string $apiKey = 'test-bridge-key-sesi69-paket';
    private string $endpoint = '/api/v1/chatbot-bridge/booking/paket';

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
            'sender_name' => 'Pengirim Budi',
            'sender_phone' => '628123456792',
            'receiver_name' => 'Penerima Citra',
            'receiver_phone' => '628987654321',
            'sender_address' => 'Jl. Mawar 12, Pasirpengaraian',
            'receiver_address' => 'Jl. Sudirman 99, Pekanbaru',
            'package_size' => 'Besar',
            'item_description' => 'Paket dokumen + barang elektronik',
            'item_qty' => 2,
            'electronics_flag' => true,
            'trip_date' => now()->addDays(2)->format('Y-m-d'),
            'trip_time' => '09:00',
            'direction' => 'to_pkb',
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Pekanbaru',
            'source_event_id' => 'evt-paket-001',
        ], $overrides);
    }

    public function test_unauthorized_request_returns_401(): void
    {
        $response = $this->postJson($this->endpoint, $this->defaultPayload());
        $response->assertStatus(401);
    }

    public function test_paket_besar_creates_booking_with_seat_5a(): void
    {
        $response = $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $this->defaultPayload());

        $response->assertStatus(201)
            ->assertJsonPath('booking.category', 'Paket')
            ->assertJsonPath('booking.booking_status', 'Draft')
            ->assertJsonPath('booking.total_amount', 0);

        $this->assertSame(['5A'], $response->json('booking.selected_seats'));

        $booking = Booking::latest('id')->first();
        $this->assertSame('Besar', $booking->booking_for);
    }

    public function test_paket_kecil_creates_booking_with_no_seats(): void
    {
        $response = $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $this->defaultPayload(['package_size' => 'Kecil']));

        $response->assertStatus(201);
        $this->assertSame([], $response->json('booking.selected_seats'));

        $booking = Booking::latest('id')->first();
        $this->assertSame('Kecil', $booking->booking_for);
    }

    public function test_paket_sedang_creates_booking_with_no_seats(): void
    {
        $response = $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $this->defaultPayload(['package_size' => 'Sedang']));

        $response->assertStatus(201);
        $this->assertSame([], $response->json('booking.selected_seats'));
    }

    public function test_notes_contains_recipient_and_item_metadata_json(): void
    {
        $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $this->defaultPayload());

        $booking = Booking::latest('id')->first();
        $notesData = json_decode((string) $booking->notes, true);

        $this->assertSame('Penerima Citra', $notesData['recipient_name']);
        $this->assertSame('628987654321', $notesData['recipient_phone']);
        $this->assertSame('Paket dokumen + barang elektronik', $notesData['item_name']);
        $this->assertSame(2, $notesData['item_qty']);
        $this->assertSame('Besar', $notesData['package_size']);
        $this->assertTrue($notesData['electronics_flag']);
    }

    public function test_invalid_package_size_rejected(): void
    {
        $payload = $this->defaultPayload(['package_size' => 'Jumbo']);
        $response = $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $payload);

        $response->assertStatus(422);
    }

    public function test_passenger_name_equals_sender_name(): void
    {
        $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $this->defaultPayload());

        $booking = Booking::latest('id')->first();
        $this->assertSame('Pengirim Budi', $booking->passenger_name);
        $this->assertSame('628123456792', $booking->passenger_phone);
    }

    public function test_customer_resolved_from_sender_phone(): void
    {
        $this->assertDatabaseMissing('customers', ['phone_normalized' => '628123456792']);

        $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $this->defaultPayload());

        $this->assertDatabaseHas('customers', [
            'phone_normalized' => '628123456792',
            'display_name' => 'Pengirim Budi',
        ]);
    }

    public function test_booking_code_uses_pkt_prefix(): void
    {
        $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->postJson($this->endpoint, $this->defaultPayload());

        $booking = Booking::latest('id')->first();
        $this->assertStringStartsWith('PKT-', $booking->booking_code);
    }
}
