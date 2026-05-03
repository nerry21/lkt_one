<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\DashboardDailyMetric;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class DashboardSystemHealthWidgetsTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_renders_4_system_health_widgets(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);

        $response = $this->actingAs($admin)->get('/dashboard');

        $response->assertOk();
        $response->assertSee('data-testid="dashboard-system-health-section"', false);
        $response->assertSee('data-testid="widget-passenger-inquiry"', false);
        $response->assertSee('data-testid="widget-cascade-reschedule"', false);
        $response->assertSee('data-testid="widget-bridge-health"', false);
        $response->assertSee('data-testid="widget-worker-status"', false);
    }

    public function test_dashboard_displays_trend_7d_canvas(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);

        $response = $this->actingAs($admin)->get('/dashboard');

        $response->assertOk();
        $response->assertSee('data-testid="dashboard-trend-section"', false);
        $response->assertSee('data-testid="dashboard-trend-chart"', false);
        $response->assertSee('id="dashboard-trend-chart"', false);
    }

    public function test_dashboard_includes_passenger_inquiry_response_rate_section(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        DashboardDailyMetric::create([
            'metric_date' => Carbon::today()->toDateString(),
            'metric_type' => DashboardDailyMetric::TYPE_PASSENGER_INQUIRY_RESPONSE_RATE,
            'metric_value' => 88,
            'metric_meta' => ['sent_count' => 10, 'responded_count' => 9],
        ]);

        $response = $this->actingAs($admin)->get('/dashboard');

        $response->assertOk();
        $response->assertSee('Penumpang Inquiry');
        $response->assertSee('88%');
        $response->assertSee('9 dari 10 trip');
    }

    public function test_dashboard_includes_worker_status_indicator_mati(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);

        $response = $this->actingAs($admin)->get('/dashboard');

        $response->assertOk();
        $response->assertSee('Worker Queue');
        $response->assertSee('MATI');
    }

    public function test_dashboard_includes_bridge_health_28_endpoints(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);

        $response = $this->actingAs($admin)->get('/dashboard');

        $response->assertOk();
        $response->assertSee('Bridge API Health');
        $response->assertSee('28/28');
    }

    public function test_dashboard_renders_trend_chart_section_header(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);

        $response = $this->actingAs($admin)->get('/dashboard');

        $response->assertOk();
        $response->assertSee('Tren 7 Hari');
        $response->assertSee('Kesehatan Sistem — Hari Ini', false);
    }
}
