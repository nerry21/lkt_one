<?php

declare(strict_types=1);

namespace Tests\Feature\Api;

use App\Models\DailyDriverAssignment;
use App\Models\Driver;
use App\Models\Mobil;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChatbotBridgeTripPlanningSetupTest extends TestCase
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
        // System user untuk audit trail (Super Admin enum value with space)
        User::factory()->create(['role' => 'Super Admin']);
    }

    private function authHeaders(): array
    {
        return ['X-Chatbot-Bridge-Key' => $this->apiKey];
    }

    public function test_setup_with_valid_payload_returns_assignments_count(): void
    {
        $m1 = Mobil::factory()->create(['kode_mobil' => 'JET 01']);
        $d1 = Driver::factory()->create();

        $response = $this->withHeaders($this->authHeaders())->postJson(
            '/api/v1/chatbot-bridge/trip-planning/setup',
            [
                'target_date' => '2026-05-04',
                'assignments' => [
                    ['mobil_id' => $m1->id, 'driver_id' => $d1->id, 'is_skipped' => false],
                ],
            ],
        );

        $response->assertStatus(200);
        $response->assertJsonStructure(['data' => ['date', 'assignments_count', 'skipped_count', 'pins_count']]);
        $this->assertSame(1, $response->json('data.assignments_count'));
    }

    public function test_setup_validates_required_fields(): void
    {
        $response = $this->withHeaders($this->authHeaders())->postJson(
            '/api/v1/chatbot-bridge/trip-planning/setup',
            ['target_date' => '2026-05-04'],
        );

        $response->assertStatus(422);
    }

    public function test_setup_handles_skipped_mobil(): void
    {
        $m1 = Mobil::factory()->create(['kode_mobil' => 'JET 01']);
        $m2 = Mobil::factory()->create(['kode_mobil' => 'JET 02']);
        $d1 = Driver::factory()->create();

        $response = $this->withHeaders($this->authHeaders())->postJson(
            '/api/v1/chatbot-bridge/trip-planning/setup',
            [
                'target_date' => '2026-05-04',
                'assignments' => [
                    ['mobil_id' => $m1->id, 'driver_id' => $d1->id, 'is_skipped' => false],
                    ['mobil_id' => $m2->id, 'is_skipped' => true],
                ],
            ],
        );

        $response->assertStatus(200);
        $this->assertSame(1, $response->json('data.assignments_count'));
        $this->assertSame(1, $response->json('data.skipped_count'));
    }

    public function test_setup_creates_pin_for_pool_override(): void
    {
        $m1 = Mobil::factory()->create();
        $d1 = Driver::factory()->create();

        $response = $this->withHeaders($this->authHeaders())->postJson(
            '/api/v1/chatbot-bridge/trip-planning/setup',
            [
                'target_date' => '2026-05-04',
                'assignments' => [
                    ['mobil_id' => $m1->id, 'driver_id' => $d1->id, 'pool_override' => 'PKB', 'is_skipped' => false],
                ],
            ],
        );

        $response->assertStatus(200);
        $this->assertSame(1, $response->json('data.pins_count'));
        $this->assertDatabaseHas('daily_assignment_pins', [
            'direction' => 'PKB_TO_ROHUL',
            'loket_origin' => 'PKB',
        ]);
    }

    public function test_setup_requires_bridge_api_key(): void
    {
        $response = $this->postJson('/api/v1/chatbot-bridge/trip-planning/setup', [
            'target_date' => '2026-05-04',
            'assignments' => [['mobil_id' => 'x', 'is_skipped' => true]],
        ]);

        $response->assertStatus(401);
    }
}
