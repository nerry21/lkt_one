<?php

namespace Tests\Feature\Api;

use App\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChatbotBridgeTest extends TestCase
{
    use RefreshDatabase;

    protected string $apiKey = 'test-bridge-secret-key-sesi-64';

    protected function setUp(): void
    {
        parent::setUp();
        config([
            'chatbot_bridge.enabled' => true,
            'chatbot_bridge.api_key' => $this->apiKey,
        ]);
    }

    public function test_health_endpoint_requires_api_key(): void
    {
        $response = $this->getJson('/api/v1/chatbot-bridge/health');

        $response->assertStatus(401)
            ->assertJson(['code' => 'INVALID_API_KEY']);
    }

    public function test_health_endpoint_rejects_wrong_api_key(): void
    {
        $response = $this->withHeaders(['X-Chatbot-Bridge-Key' => 'wrong-key'])
            ->getJson('/api/v1/chatbot-bridge/health');

        $response->assertStatus(401);
    }

    public function test_health_endpoint_succeeds_with_valid_key(): void
    {
        $response = $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->getJson('/api/v1/chatbot-bridge/health');

        $response->assertStatus(200)
            ->assertJsonStructure(['status', 'service', 'version', 'timestamp'])
            ->assertJson(['status' => 'ok', 'service' => 'lkt-one']);

        $this->assertNotEmpty($response->headers->get('X-Bridge-Request-Id'));
    }

    public function test_customer_lookup_requires_phone_param(): void
    {
        $response = $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->getJson('/api/v1/chatbot-bridge/customer/lookup');

        $response->assertStatus(422);
    }

    public function test_customer_lookup_returns_not_found_when_phone_unregistered(): void
    {
        $response = $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->getJson('/api/v1/chatbot-bridge/customer/lookup?phone=628999999999');

        $response->assertStatus(200)
            ->assertJson(['found' => false]);
    }

    public function test_customer_lookup_returns_payload_when_phone_matches(): void
    {
        $customer = Customer::create([
            'phone_normalized' => '628111222333',
            'phone_original' => '08111222333',
            'display_name' => 'Test Customer',
        ]);

        $response = $this->withHeaders(['X-Chatbot-Bridge-Key' => $this->apiKey])
            ->getJson('/api/v1/chatbot-bridge/customer/lookup?phone=08111222333');

        $response->assertStatus(200)
            ->assertJson([
                'found' => true,
                'phone_normalized' => '628111222333',
                'customer' => [
                    'id' => $customer->id,
                    'display_name' => 'Test Customer',
                    'phone_normalized' => '628111222333',
                    'phone_original' => '08111222333',
                ],
            ])
            ->assertJsonMissingPath('customer.email')
            ->assertJsonMissingPath('customer.notes')
            ->assertJsonMissingPath('customer.merged_into_id');
    }
}
