<?php

declare(strict_types=1);

namespace Tests\Feature\Api;

use App\Models\Booking;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChatbotBridgePaymentVerificationTest extends TestCase
{
    use RefreshDatabase;

    private string $apiKey = 'test-bridge-key-sesi71';

    protected function setUp(): void
    {
        parent::setUp();
        config([
            'chatbot_bridge.enabled' => true,
            'chatbot_bridge.api_key' => $this->apiKey,
        ]);
    }

    private function authHeaders(): array
    {
        return ['X-Chatbot-Bridge-Key' => $this->apiKey];
    }

    private function makeBookingDiproses(array $overrides = []): Booking
    {
        $defaults = [
            'booking_status' => 'Diproses',
            'payment_status' => 'Menunggu Verifikasi',
            'payment_method' => 'transfer',
            'category' => 'Reguler',
            'total_amount' => 800000,
        ];
        return Booking::factory()->create(array_merge($defaults, $overrides));
    }

    public function test_verify_transfer_success_with_matching_amount(): void
    {
        $booking = $this->makeBookingDiproses();

        $response = $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/verify-payment",
            [
                'verifier_identifier' => '628117598804',
                'amount' => 800000,
            ]
        );

        $response->assertStatus(200);
        $this->assertEquals('Dibayar', $booking->fresh()->payment_status);
    }

    public function test_verify_transfer_amount_mismatch_returns_422(): void
    {
        $booking = $this->makeBookingDiproses();

        $response = $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/verify-payment",
            [
                'verifier_identifier' => '628117598804',
                'amount' => 700000,
            ]
        );

        $response->assertStatus(422);
    }

    public function test_verify_transfer_without_amount_passes(): void
    {
        $booking = $this->makeBookingDiproses();

        $response = $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/verify-payment",
            ['verifier_identifier' => '628117598804']
        );

        $response->assertStatus(200);
    }

    public function test_verify_transfer_on_non_diproses_returns_422(): void
    {
        $booking = $this->makeBookingDiproses(['booking_status' => 'Draft']);

        $response = $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/verify-payment",
            ['verifier_identifier' => '628117598804']
        );

        $response->assertStatus(422);
    }

    public function test_verify_transfer_on_cash_booking_returns_422(): void
    {
        $booking = $this->makeBookingDiproses([
            'payment_method' => 'cash',
            'booking_status' => 'Menunggu Pembayaran Cash',
        ]);

        $response = $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/verify-payment",
            ['verifier_identifier' => '628117598804']
        );

        $response->assertStatus(422);
    }

    public function test_confirm_cash_paid_flips_to_diproses_and_dibayar_tunai(): void
    {
        $booking = $this->makeBookingDiproses([
            'booking_status' => 'Menunggu Pembayaran Cash',
            'payment_status' => 'Menunggu Konfirmasi Tunai',
            'payment_method' => 'cash',
        ]);

        $response = $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/confirm-cash",
            [
                'confirmer_identifier' => '6281267975175',
                'paid' => true,
            ]
        );

        $response->assertStatus(200);
        $fresh = $booking->fresh();
        $this->assertEquals('Diproses', $fresh->booking_status);
        $this->assertEquals('Dibayar Tunai', $fresh->payment_status);
    }

    public function test_confirm_cash_unpaid_keeps_status(): void
    {
        $booking = $this->makeBookingDiproses([
            'booking_status' => 'Menunggu Pembayaran Cash',
            'payment_status' => 'Menunggu Konfirmasi Tunai',
            'payment_method' => 'cash',
        ]);

        $response = $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/confirm-cash",
            [
                'confirmer_identifier' => '6281267975175',
                'paid' => false,
            ]
        );

        $response->assertStatus(200);
        $this->assertEquals('Menunggu Pembayaran Cash', $booking->fresh()->booking_status);
    }

    public function test_confirm_cash_on_transfer_booking_returns_422(): void
    {
        $booking = $this->makeBookingDiproses();

        $response = $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/confirm-cash",
            ['confirmer_identifier' => '6281267975175', 'paid' => true]
        );

        $response->assertStatus(422);
    }
}
