<?php

declare(strict_types=1);

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Sesi 78 PR-CRM-6L — Smoke tests untuk backfill walk-in endpoints.
 *
 * Endpoint return empty/zero sampai Bagian B (Chatbot AI) live dan customer
 * mulai booking via T-1jam inquiry yang populate source_meta.origin field.
 * Test ini verifikasi struktur response valid walaupun database kosong.
 */
class BackfillEndpointsTest extends TestCase
{
    use RefreshDatabase;

    private string $apiKey = 'test-bridge-key-sesi78-backfill';

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

    public function test_backfill_walkin_preview_returns_valid_empty_structure(): void
    {
        $response = $this->withHeaders($this->authHeaders())
            ->getJson('/api/v1/chatbot-bridge/backfill-walkin-preview');

        $response->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.total', 0)
            ->assertJsonStructure([
                'success',
                'data' => ['candidates', 'total'],
            ]);

        $this->assertIsArray($response->json('data.candidates'));
        $this->assertSame([], $response->json('data.candidates'));
    }

    public function test_backfill_walkin_execute_returns_zero_when_nothing_to_update(): void
    {
        $response = $this->withHeaders($this->authHeaders())
            ->postJson('/api/v1/chatbot-bridge/backfill-walkin-execute', []);

        $response->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.updated_count', 0);
    }
}
