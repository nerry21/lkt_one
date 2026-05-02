<?php

declare(strict_types=1);

namespace Tests\Feature\Api;

use App\Models\Driver;
use App\Models\Mobil;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChatbotBridgeActiveMobilListTest extends TestCase
{
    use RefreshDatabase;

    private string $apiKey = 'test-bridge-key-sesi74';

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

    public function test_returns_active_mobil_with_kode_and_home_pool(): void
    {
        Mobil::factory()->create(['kode_mobil' => 'JET 01', 'home_pool' => 'PKB', 'is_active_in_trip' => true]);
        Mobil::factory()->create(['kode_mobil' => 'JET 02', 'home_pool' => 'ROHUL', 'is_active_in_trip' => true]);
        Mobil::factory()->create(['kode_mobil' => 'JET 99', 'home_pool' => 'PKB', 'is_active_in_trip' => false]);

        $response = $this->withHeaders($this->authHeaders())
            ->getJson('/api/v1/chatbot-bridge/active-mobil-list');

        $response->assertStatus(200);
        $this->assertCount(2, $response->json('data.mobil'));
        $this->assertSame('JET 01', $response->json('data.mobil.0.kode_mobil'));
        $this->assertSame('PKB', $response->json('data.mobil.0.home_pool'));
    }

    public function test_returns_active_drivers_only(): void
    {
        Driver::factory()->create(['nama' => 'Pak Aktif', 'status' => 'Active']);
        Driver::factory()->create(['nama' => 'Pak Nonaktif', 'status' => 'Inactive']);

        $response = $this->withHeaders($this->authHeaders())
            ->getJson('/api/v1/chatbot-bridge/active-mobil-list');

        $response->assertStatus(200);
        $this->assertCount(1, $response->json('data.driver'));
        $this->assertSame('Pak Aktif', $response->json('data.driver.0.nama'));
    }

    public function test_requires_bridge_api_key(): void
    {
        $response = $this->getJson('/api/v1/chatbot-bridge/active-mobil-list');

        $response->assertStatus(401);
    }
}
