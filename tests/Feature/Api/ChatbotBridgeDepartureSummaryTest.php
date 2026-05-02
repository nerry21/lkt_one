<?php

declare(strict_types=1);

namespace Tests\Feature\Api;

use App\Models\Booking;
use App\Models\Driver;
use App\Models\Mobil;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChatbotBridgeDepartureSummaryTest extends TestCase
{
    use RefreshDatabase;

    private string $apiKey = 'test-bridge-key-sesi73';

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

    public function test_summary_returns_aggregated_passengers(): void
    {
        $mobil = Mobil::factory()->create(['kode_mobil' => 'JET 01']);
        $driver = Driver::factory()->create(['nama' => 'Pak Joni']);

        Booking::factory()->count(3)->create([
            'category' => 'Reguler',
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Pekanbaru',
            'trip_date' => '2026-05-04',
            'trip_time' => '05:30:00',
            'booking_status' => 'Dibayar',
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
            'driver_name' => 'Pak Joni',
            'total_amount' => 170000,
        ]);

        $response = $this->withHeaders($this->authHeaders())->getJson(
            '/api/v1/chatbot-bridge/departure-summary?trip_date=2026-05-04&trip_time=05:30&from_city=Pasirpengaraian',
        );

        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                'trip_date' => '2026-05-04',
                'trip_time' => '05:30',
                'from_city' => 'Pasirpengaraian',
                'to_city' => 'Pekanbaru',
                'mobil_kode' => 'JET 01',
                'driver_name' => 'Pak Joni',
                'passenger_count' => 3,
                'total_revenue' => 510000,
            ],
        ]);
        $this->assertCount(3, $response->json('data.passengers'));
    }

    public function test_summary_filters_by_trip_date_time_from_city(): void
    {
        Booking::factory()->create([
            'category' => 'Reguler',
            'from_city' => 'Pasirpengaraian',
            'trip_date' => '2026-05-04',
            'trip_time' => '05:30:00',
            'booking_status' => 'Diproses',
        ]);
        Booking::factory()->create([
            'category' => 'Reguler',
            'from_city' => 'Pekanbaru',
            'trip_date' => '2026-05-04',
            'trip_time' => '07:00:00',
            'booking_status' => 'Diproses',
        ]);

        $response = $this->withHeaders($this->authHeaders())->getJson(
            '/api/v1/chatbot-bridge/departure-summary?trip_date=2026-05-04&trip_time=05:30&from_city=Pasirpengaraian',
        );

        $response->assertStatus(200);
        $this->assertSame(1, $response->json('data.passenger_count'));
    }

    public function test_summary_excludes_cancelled_bookings(): void
    {
        Booking::factory()->create([
            'category' => 'Reguler',
            'from_city' => 'Pasirpengaraian',
            'trip_date' => '2026-05-04',
            'trip_time' => '05:30:00',
            'booking_status' => 'Diproses',
        ]);
        Booking::factory()->create([
            'category' => 'Reguler',
            'from_city' => 'Pasirpengaraian',
            'trip_date' => '2026-05-04',
            'trip_time' => '05:30:00',
            'booking_status' => 'Cancelled',
        ]);

        $response = $this->withHeaders($this->authHeaders())->getJson(
            '/api/v1/chatbot-bridge/departure-summary?trip_date=2026-05-04&trip_time=05:30&from_city=Pasirpengaraian',
        );

        $response->assertStatus(200);
        $this->assertSame(1, $response->json('data.passenger_count'));
    }

    public function test_summary_includes_only_diproses_dibayar(): void
    {
        Booking::factory()->create([
            'category' => 'Reguler',
            'from_city' => 'Pasirpengaraian',
            'trip_date' => '2026-05-04',
            'trip_time' => '05:30:00',
            'booking_status' => 'Diproses',
        ]);
        Booking::factory()->create([
            'category' => 'Reguler',
            'from_city' => 'Pasirpengaraian',
            'trip_date' => '2026-05-04',
            'trip_time' => '05:30:00',
            'booking_status' => 'Dibayar',
        ]);
        Booking::factory()->create([
            'category' => 'Reguler',
            'from_city' => 'Pasirpengaraian',
            'trip_date' => '2026-05-04',
            'trip_time' => '05:30:00',
            'booking_status' => 'Draft',
        ]);

        $response = $this->withHeaders($this->authHeaders())->getJson(
            '/api/v1/chatbot-bridge/departure-summary?trip_date=2026-05-04&trip_time=05:30&from_city=Pasirpengaraian',
        );

        $response->assertStatus(200);
        $this->assertSame(2, $response->json('data.passenger_count'));
    }

    public function test_summary_returns_empty_passengers_when_no_match(): void
    {
        $response = $this->withHeaders($this->authHeaders())->getJson(
            '/api/v1/chatbot-bridge/departure-summary?trip_date=2026-05-04&trip_time=05:30&from_city=Pasirpengaraian',
        );

        $response->assertStatus(200);
        $this->assertSame(0, $response->json('data.passenger_count'));
        $this->assertSame(0, $response->json('data.total_revenue'));
        $this->assertSame([], $response->json('data.passengers'));
    }
}
