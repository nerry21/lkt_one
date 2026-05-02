<?php

declare(strict_types=1);

namespace Tests\Feature\Api;

use App\Models\Booking;
use App\Services\ETicketPdfService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;
use Tests\TestCase;

class ChatbotBridgeETicketTest extends TestCase
{
    use MockeryPHPUnitIntegration;
    use RefreshDatabase;

    private string $apiKey = 'test-bridge-key-sesi71';

    protected function setUp(): void
    {
        parent::setUp();
        config([
            'chatbot_bridge.enabled' => true,
            'chatbot_bridge.api_key' => $this->apiKey,
        ]);

        // Mock ETicketPdfService — Sesi 71 tests verify bridge wiring + signed URL,
        // bukan PDF rendering content (covered separately oleh existing unit tests).
        $stub = Mockery::mock(ETicketPdfService::class);
        $stub->shouldReceive('generateAndStore')
            ->andReturnUsing(function (Booking $booking): string {
                $path = 'public/etickets/2026/05/' . $booking->booking_code . '.pdf';
                $booking->ticket_pdf_path = $path;
                $booking->saveQuietly();
                return $path;
            });
        $stub->shouldReceive('exists')->andReturn(true);
        $this->app->instance(ETicketPdfService::class, $stub);
    }

    private function authHeaders(): array
    {
        return ['X-Chatbot-Bridge-Key' => $this->apiKey];
    }

    public function test_eticket_generate_diproses_booking_returns_signed_url(): void
    {
        $booking = Booking::factory()->create([
            'booking_status' => 'Diproses',
            'category' => 'Reguler',
            'total_amount' => 800000,
        ]);

        $response = $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/eticket/generate"
        );

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => ['booking_code', 'pdf_path', 'download_url', 'expires_at'],
        ]);
        $this->assertStringContainsString('signature=', (string) $response->json('data.download_url'));

        $fresh = $booking->fresh();
        $this->assertNotNull($fresh->ticket_pdf_path);
        $this->assertNotNull($fresh->ticket_pdf_generated_at);
        $this->assertSame('issued', $fresh->ticket_status);
    }

    public function test_eticket_generate_draft_booking_returns_422(): void
    {
        $booking = Booking::factory()->create([
            'booking_status' => 'Draft',
            'category' => 'Reguler',
        ]);

        $response = $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/eticket/generate"
        );

        $response->assertStatus(422);
    }

    public function test_eticket_generate_unknown_code_returns_422(): void
    {
        $response = $this->withHeaders($this->authHeaders())->postJson(
            '/api/v1/chatbot-bridge/booking/RBK-999999-XXXX/eticket/generate'
        );

        $response->assertStatus(422);
    }
}
