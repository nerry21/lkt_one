<?php

declare(strict_types=1);

namespace Tests\Feature\Api;

use App\Models\DailyDriverAssignment;
use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use App\Models\TripCutoverLog;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChatbotBridgeTripPlanningStatusTest extends TestCase
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

    public function test_status_returns_zero_when_no_assignments(): void
    {
        $response = $this->withHeaders($this->authHeaders())
            ->getJson('/api/v1/chatbot-bridge/trip-planning/status?target_date=2026-05-04');

        $response->assertStatus(200);
        $this->assertSame(0, $response->json('data.assignments_count'));
        $this->assertSame(0, $response->json('data.trips_count'));
        $this->assertNull($response->json('data.cutover_status'));
    }

    public function test_status_returns_assignments_count_after_setup(): void
    {
        $m1 = Mobil::factory()->create();
        $d1 = Driver::factory()->create();

        DailyDriverAssignment::factory()->create([
            'date' => '2026-05-04',
            'mobil_id' => $m1->id,
            'driver_id' => $d1->id,
        ]);

        $response = $this->withHeaders($this->authHeaders())
            ->getJson('/api/v1/chatbot-bridge/trip-planning/status?target_date=2026-05-04');

        $response->assertStatus(200);
        $this->assertSame(1, $response->json('data.assignments_count'));
    }

    public function test_status_includes_trips_after_cutover(): void
    {
        $m1 = Mobil::factory()->create(['kode_mobil' => 'JET 01']);
        $d1 = Driver::factory()->create(['nama' => 'Pak Joni']);

        Trip::factory()->create([
            'trip_date' => '2026-05-04',
            'trip_time' => '05:30:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence' => 1,
            'mobil_id' => $m1->id,
            'driver_id' => $d1->id,
            'status' => 'scheduled',
        ]);

        TripCutoverLog::create([
            'target_date' => '2026-05-04',
            'status' => TripCutoverLog::STATUS_SUCCESS,
            'trigger_source' => TripCutoverLog::TRIGGER_SCHEDULER,
            'started_at' => now()->subMinute(),
            'finished_at' => now(),
        ]);

        $response = $this->withHeaders($this->authHeaders())
            ->getJson('/api/v1/chatbot-bridge/trip-planning/status?target_date=2026-05-04');

        $response->assertStatus(200);
        $this->assertSame(1, $response->json('data.trips_count'));
        $this->assertSame('success', $response->json('data.cutover_status'));
        $this->assertSame('JET 01', $response->json('data.trips.0.mobil_kode'));
        $this->assertSame('Pak Joni', $response->json('data.trips.0.driver_name'));
        $this->assertSame('Keberangkatan', $response->json('data.trips.0.direction_label'));
    }

    public function test_status_validates_target_date_format(): void
    {
        $response = $this->withHeaders($this->authHeaders())
            ->getJson('/api/v1/chatbot-bridge/trip-planning/status?target_date=invalid');

        $response->assertStatus(422);
    }
}
