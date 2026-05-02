<?php

declare(strict_types=1);

namespace Tests\Feature\Api;

use App\Models\Booking;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ChatbotBridgeSuratJalanTest extends TestCase
{
    use RefreshDatabase;

    private string $apiKey = 'test-bridge-key-sesi73';

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('local');
        config([
            'chatbot_bridge.enabled' => true,
            'chatbot_bridge.api_key' => $this->apiKey,
        ]);
    }

    private function authHeaders(): array
    {
        return ['X-Chatbot-Bridge-Key' => $this->apiKey];
    }

    public function test_generate_returns_signed_url_with_24h_expiry(): void
    {
        Booking::factory()->create([
            'category' => 'Reguler',
            'from_city' => 'Pasirpengaraian',
            'trip_date' => '2026-05-04',
            'trip_time' => '05:30:00',
            'booking_status' => 'Diproses',
            'total_amount' => 170000,
        ]);

        $response = $this->withHeaders($this->authHeaders())->postJson(
            '/api/v1/chatbot-bridge/surat-jalan/generate',
            [
                'trip_date' => '2026-05-04',
                'trip_time' => '05:30',
                'from_city' => 'Pasirpengaraian',
            ],
        );

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => ['trip_date', 'trip_time', 'from_city', 'download_url', 'expires_at'],
        ]);
        $this->assertStringContainsString('signature=', (string) $response->json('data.download_url'));
        $this->assertStringContainsString('/surat-jalan/2026-05-04/05-30/pasirpengaraian/download', (string) $response->json('data.download_url'));
    }

    public function test_generate_validates_required_fields(): void
    {
        $response = $this->withHeaders($this->authHeaders())->postJson(
            '/api/v1/chatbot-bridge/surat-jalan/generate',
            ['trip_date' => '2026-05-04'],
        );

        $response->assertStatus(422);
    }

    public function test_generate_without_api_key_returns_401(): void
    {
        $response = $this->postJson(
            '/api/v1/chatbot-bridge/surat-jalan/generate',
            [
                'trip_date' => '2026-05-04',
                'trip_time' => '05:30',
                'from_city' => 'Pasirpengaraian',
            ],
        );

        $response->assertStatus(401);
    }

    public function test_generate_creates_pdf_in_storage(): void
    {
        Booking::factory()->create([
            'category' => 'Reguler',
            'from_city' => 'Pasirpengaraian',
            'trip_date' => '2026-05-04',
            'trip_time' => '05:30:00',
            'booking_status' => 'Diproses',
        ]);

        $response = $this->withHeaders($this->authHeaders())->postJson(
            '/api/v1/chatbot-bridge/surat-jalan/generate',
            [
                'trip_date' => '2026-05-04',
                'trip_time' => '05:30',
                'from_city' => 'Pasirpengaraian',
            ],
        );

        $response->assertStatus(200);
        Storage::assertExists('surat-jalan/2026/05/sj-2026-05-04_05-30_pasirpengaraian.pdf');
    }
}
