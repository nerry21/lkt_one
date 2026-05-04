<?php

declare(strict_types=1);

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class BotControlEndpointsTest extends TestCase
{
    use RefreshDatabase;

    private string $apiKey = 'test-bridge-key-sesi78';

    protected function setUp(): void
    {
        parent::setUp();
        Cache::flush();
        config([
            'chatbot_bridge.enabled' => true,
            'chatbot_bridge.api_key' => $this->apiKey,
        ]);
    }

    private function authHeaders(): array
    {
        return ['X-Chatbot-Bridge-Key' => $this->apiKey];
    }

    public function test_bot_status_poll_returns_default_off_state(): void
    {
        $response = $this->withHeaders($this->authHeaders())
            ->getJson('/api/v1/chatbot-bridge/bot-status-poll');

        $response->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.mode', 'off')
            ->assertJsonStructure([
                'success',
                'data' => ['mode', 'whitelist', 'updated_at'],
            ]);
    }

    public function test_bot_status_set_to_whitelist_returns_updated_snapshot(): void
    {
        $response = $this->withHeaders($this->authHeaders())
            ->postJson('/api/v1/chatbot-bridge/bot-status-set', [
                'mode' => 'whitelist',
                'updated_by_phone' => '628117598804',
            ]);

        $response->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.mode', 'whitelist');

        $this->assertDatabaseHas('bot_control_settings', [
            'key' => 'bot_mode',
            'value' => 'whitelist',
            'updated_by_phone' => '628117598804',
        ]);
    }

    public function test_bot_status_set_rejects_invalid_mode(): void
    {
        $response = $this->withHeaders($this->authHeaders())
            ->postJson('/api/v1/chatbot-bridge/bot-status-set', [
                'mode' => 'banana',
            ]);

        $response->assertStatus(422);
    }

    public function test_bot_whitelist_set_persists_phones_in_order(): void
    {
        $response = $this->withHeaders($this->authHeaders())
            ->postJson('/api/v1/chatbot-bridge/bot-whitelist-set', [
                'phones' => ['628117598804', '6281267975175', '6282364210642'],
                'updated_by_phone' => '628117598804',
            ]);

        $response->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.whitelist.0', '628117598804')
            ->assertJsonPath('data.whitelist.2', '6282364210642');
    }

    public function test_bot_status_endpoints_require_api_key(): void
    {
        $this->getJson('/api/v1/chatbot-bridge/bot-status-poll')
            ->assertStatus(401);

        $this->postJson('/api/v1/chatbot-bridge/bot-status-set', ['mode' => 'off'])
            ->assertStatus(401);
    }
}
