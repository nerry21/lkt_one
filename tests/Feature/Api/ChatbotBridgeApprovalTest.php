<?php

declare(strict_types=1);

namespace Tests\Feature\Api;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChatbotBridgeApprovalTest extends TestCase
{
    use RefreshDatabase;

    private string $apiKey = 'test-bridge-key-sesi70';

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

    /**
     * Build a Draft booking. Adapter: tidak ada CustomerFactory; bookings.customer_id
     * nullable jadi factory langsung tanpa Customer cukup.
     *
     * @param string $codePrefix RBK | DBK | RNT | PKT
     */
    private function makeDraftBooking(string $codePrefix = 'RBK', array $overrides = []): Booking
    {
        $category = match ($codePrefix) {
            'DBK' => 'Dropping',
            'RNT' => 'Rental',
            'PKT' => 'Paket',
            default => 'Reguler',
        };
        $defaults = [
            'booking_code' => $codePrefix . '-260502-' . strtoupper(substr(bin2hex(random_bytes(2)), 0, 4)),
            'category' => $category,
            'booking_status' => 'Draft',
            'total_amount' => $codePrefix === 'RBK' ? 150000 : 0,
            'price_per_seat' => $codePrefix === 'RBK' ? 150000 : 0,
        ];
        return Booking::factory()->create(array_merge($defaults, $overrides));
    }

    public function test_approve_reguler_booking_flips_to_diproses(): void
    {
        $booking = $this->makeDraftBooking('RBK');
        $response = $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/approve",
            ['approver_identifier' => '628117598804']
        );

        $response->assertStatus(200)
            ->assertJsonPath('data.booking_status', 'Diproses');

        $this->assertDatabaseHas('bookings', [
            'booking_code' => $booking->booking_code,
            'booking_status' => 'Diproses',
        ]);
    }

    public function test_approve_dropping_with_total_amount(): void
    {
        $booking = $this->makeDraftBooking('DBK');
        $response = $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/approve",
            ['approver_identifier' => '628117598804', 'total_amount' => 800000]
        );

        $response->assertStatus(200);
        $fresh = $booking->fresh();
        $this->assertSame('Diproses', $fresh->booking_status);
        $this->assertEquals(800000, (float) $fresh->total_amount);
    }

    public function test_approve_dropping_without_total_amount_returns_422(): void
    {
        $booking = $this->makeDraftBooking('DBK');
        $response = $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/approve",
            ['approver_identifier' => '628117598804']
        );
        $response->assertStatus(422);
    }

    public function test_approve_rental_with_amount_and_per_seat(): void
    {
        $booking = $this->makeDraftBooking('RNT');
        $response = $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/approve",
            ['approver_identifier' => '628117598804', 'total_amount' => 1700000, 'price_per_seat' => 850000]
        );
        $response->assertStatus(200);
        $fresh = $booking->fresh();
        $this->assertEquals(1700000, (float) $fresh->total_amount);
        $this->assertEquals(850000, (float) $fresh->price_per_seat);
    }

    public function test_approve_paket_with_total_amount(): void
    {
        $booking = $this->makeDraftBooking('PKT');
        $response = $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/approve",
            ['approver_identifier' => '628117598804', 'total_amount' => 75000]
        );
        $response->assertStatus(200);
        $this->assertEquals(75000, (float) $booking->fresh()->total_amount);
    }

    public function test_approve_non_draft_booking_returns_422(): void
    {
        $booking = $this->makeDraftBooking('RBK', ['booking_status' => 'Diproses']);
        $response = $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/approve",
            ['approver_identifier' => '628117598804']
        );
        $response->assertStatus(422);
    }

    public function test_approve_unknown_booking_code_returns_422(): void
    {
        $response = $this->withHeaders($this->authHeaders())->postJson(
            '/api/v1/chatbot-bridge/booking/RBK-999999-ZZZZ/approve',
            ['approver_identifier' => '628117598804']
        );
        $response->assertStatus(422);
    }

    public function test_approve_records_phone_in_validation_notes(): void
    {
        $booking = $this->makeDraftBooking('RBK');
        $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/approve",
            ['approver_identifier' => '628117598804']
        );
        $fresh = $booking->fresh();
        $this->assertStringContainsString('approved by chatbot:628117598804', (string) $fresh->validation_notes);
    }

    public function test_approve_resolves_validated_by_when_user_phone_match(): void
    {
        $user = User::factory()->create(['phone' => '628117598804']);
        $booking = $this->makeDraftBooking('RBK');
        $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/approve",
            ['approver_identifier' => '628117598804']
        );
        $this->assertSame($user->id, $booking->fresh()->validated_by);
    }

    public function test_approve_validated_by_null_when_phone_not_matched(): void
    {
        $booking = $this->makeDraftBooking('RBK');
        $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/approve",
            ['approver_identifier' => '628999999999']
        );
        $this->assertNull($booking->fresh()->validated_by);
    }

    public function test_reject_draft_booking_flips_to_ditolak(): void
    {
        $booking = $this->makeDraftBooking('RBK');
        $response = $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/reject",
            ['rejecter_identifier' => '6281267975175', 'reason' => 'Mobil tidak tersedia di tanggal tersebut']
        );
        $response->assertStatus(200);
        $this->assertSame('Ditolak', $booking->fresh()->booking_status);
    }

    public function test_reject_without_reason_returns_422(): void
    {
        $booking = $this->makeDraftBooking('RBK');
        $response = $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/reject",
            ['rejecter_identifier' => '6281267975175']
        );
        $response->assertStatus(422);
    }

    public function test_reject_records_reason_in_validation_notes(): void
    {
        $booking = $this->makeDraftBooking('RBK');
        $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/reject",
            ['rejecter_identifier' => '6281267975175', 'reason' => 'Mobil rusak']
        );
        $fresh = $booking->fresh();
        $this->assertStringContainsString('rejected by chatbot:6281267975175', (string) $fresh->validation_notes);
        $this->assertStringContainsString('Mobil rusak', (string) $fresh->validation_notes);
    }

    public function test_approve_without_api_key_returns_401(): void
    {
        $booking = $this->makeDraftBooking('RBK');
        $response = $this->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/approve",
            ['approver_identifier' => '628117598804']
        );
        $response->assertStatus(401);
    }

    // -------------------------------------------------------------------------
    // Sesi 71 PR-CRM-6H — payment_method branch tests
    // -------------------------------------------------------------------------

    public function test_approve_with_payment_method_cash_flips_to_menunggu_pembayaran_cash(): void
    {
        $booking = $this->makeDraftBooking('RBK');

        $response = $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/approve",
            [
                'approver_identifier' => '628117598804',
                'payment_method' => 'cash',
            ]
        );

        $response->assertStatus(200);
        $fresh = $booking->fresh();
        $this->assertEquals('Menunggu Pembayaran Cash', $fresh->booking_status);
        $this->assertEquals('Menunggu Konfirmasi Tunai', $fresh->payment_status);
        $this->assertEquals('cash', $fresh->payment_method);
    }

    public function test_approve_default_payment_method_is_transfer(): void
    {
        $booking = $this->makeDraftBooking('RBK');

        $response = $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/approve",
            ['approver_identifier' => '628117598804']
        );

        $response->assertStatus(200);
        $fresh = $booking->fresh();
        $this->assertEquals('Diproses', $fresh->booking_status);
        $this->assertEquals('transfer', $fresh->payment_method);
    }

    public function test_approve_with_invalid_payment_method_returns_422(): void
    {
        $booking = $this->makeDraftBooking('RBK');

        $response = $this->withHeaders($this->authHeaders())->postJson(
            "/api/v1/chatbot-bridge/booking/{$booking->booking_code}/approve",
            [
                'approver_identifier' => '628117598804',
                'payment_method' => 'gopay',
            ]
        );

        $response->assertStatus(422);
    }
}
