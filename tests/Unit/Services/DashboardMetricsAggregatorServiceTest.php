<?php

declare(strict_types=1);

namespace Tests\Unit\Services;

use App\Models\Booking;
use App\Models\BookingSource;
use App\Models\DashboardDailyMetric;
use App\Models\Trip;
use App\Services\DashboardMetricsAggregatorService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class DashboardMetricsAggregatorServiceTest extends TestCase
{
    use RefreshDatabase;

    private function makeService(): DashboardMetricsAggregatorService
    {
        return new DashboardMetricsAggregatorService();
    }

    public function test_computes_current_day_passenger_inquiry_stats_from_cache_or_zero(): void
    {
        $stats = $this->makeService()->getCurrentDayStats();

        // Belum ada cache → defaultnya 0/0/0%.
        $this->assertSame(0, $stats['passenger_inquiry']['response_rate_pct']);
        $this->assertSame(0, $stats['passenger_inquiry']['sent_count']);
        $this->assertSame(0, $stats['passenger_inquiry']['responded_count']);
    }

    public function test_reads_passenger_inquiry_from_cache_when_present(): void
    {
        DashboardDailyMetric::create([
            'metric_date' => Carbon::today()->toDateString(),
            'metric_type' => DashboardDailyMetric::TYPE_PASSENGER_INQUIRY_RESPONSE_RATE,
            'metric_value' => 92,
            'metric_meta' => ['sent_count' => 13, 'responded_count' => 12],
        ]);

        $stats = $this->makeService()->getCurrentDayStats();

        $this->assertSame(92, $stats['passenger_inquiry']['response_rate_pct']);
        $this->assertSame(13, $stats['passenger_inquiry']['sent_count']);
        $this->assertSame(12, $stats['passenger_inquiry']['responded_count']);
    }

    public function test_computes_cascade_reschedule_count_from_cancelled_bookings_today(): void
    {
        Booking::factory()->create([
            'booking_status' => 'Dibatalkan',
            'cancellation_reason' => 'cancelled_by_admin',
            'updated_at' => Carbon::now(),
        ]);
        Booking::factory()->create([
            'booking_status' => 'Dibatalkan',
            'cancellation_reason' => 'no_show_final',
            'updated_at' => Carbon::now(),
        ]);

        // Cancelled kemarin tidak masuk hari ini.
        Booking::factory()->create([
            'booking_status' => 'Dibatalkan',
            'cancellation_reason' => 'cancelled_by_admin',
            'updated_at' => Carbon::now()->subDay(),
        ]);

        // Walk-in hari ini.
        $b = Booking::factory()->create();
        BookingSource::create([
            'booking_id' => $b->id,
            'source' => BookingSource::SOURCE_CHATBOT,
            'source_meta' => ['walk_in' => true],
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        $stats = $this->makeService()->getCurrentDayStats();

        $this->assertSame(2, $stats['cascade_reschedule']['cancel_count']);
        $this->assertSame(1, $stats['cascade_reschedule']['walk_in_count']);
    }

    public function test_returns_bridge_health_with_28_endpoints_total(): void
    {
        $health = $this->makeService()->getBridgeHealthStatus();

        $this->assertSame(28, $health['total_endpoints']);
        $this->assertSame(28, $health['healthy_count']);
        $this->assertSame('healthy', $health['overall_status']);
        $this->assertNotEmpty($health['last_check_at']);
    }

    public function test_returns_worker_status_mati_sengaja_for_sesi_77(): void
    {
        $status = $this->makeService()->getWorkerQueueStatus();

        $this->assertSame('mati_sengaja', $status['status']);
        $this->assertNull($status['last_seen_at']);
        $this->assertSame(0, $status['pending_jobs']);
        $this->assertStringContainsString('Sesi 78', $status['note']);
    }

    public function test_returns_trend_7d_with_correct_labels_and_datasets(): void
    {
        $trend = $this->makeService()->getTrend7Days();

        $this->assertCount(7, $trend['labels']);
        $this->assertCount(3, $trend['datasets']);

        $names = array_column($trend['datasets'], 'name');
        $this->assertContains('Total Trips', $names);
        $this->assertContains('Revenue (Rb)', $names);
        $this->assertContains('Inquiry Response %', $names);

        foreach ($trend['datasets'] as $ds) {
            $this->assertCount(7, $ds['values']);
        }
    }

    public function test_trend_7d_reads_values_from_dashboard_daily_metrics_cache(): void
    {
        $today = Carbon::today();

        DashboardDailyMetric::create([
            'metric_date' => $today->toDateString(),
            'metric_type' => DashboardDailyMetric::TYPE_TRIPS_TOTAL,
            'metric_value' => 14,
        ]);
        DashboardDailyMetric::create([
            'metric_date' => $today->copy()->subDay()->toDateString(),
            'metric_type' => DashboardDailyMetric::TYPE_TRIPS_TOTAL,
            'metric_value' => 12,
        ]);

        $trend = $this->makeService()->getTrend7Days();

        $tripsDataset = collect($trend['datasets'])->firstWhere('name', 'Total Trips');
        $values = $tripsDataset['values'];

        $this->assertSame(12, $values[5]);
        $this->assertSame(14, $values[6]);
        $this->assertSame(0, $values[0]);
    }

    public function test_refreshes_today_metrics_idempotently(): void
    {
        Trip::factory()->create(['trip_date' => Carbon::today()->toDateString(), 'status' => 'scheduled']);
        Booking::factory()->create([
            'trip_date' => Carbon::today()->toDateString(),
            'payment_status' => 'Dibayar',
            'total_amount' => 250000,
        ]);

        $svc = $this->makeService();
        $svc->refreshTodayMetrics();
        $svc->refreshTodayMetrics();

        $this->assertSame(
            1,
            DashboardDailyMetric::query()
                ->where('metric_date', Carbon::today()->toDateString())
                ->where('metric_type', DashboardDailyMetric::TYPE_TRIPS_TOTAL)
                ->count(),
        );
        $this->assertSame(
            1,
            DashboardDailyMetric::query()
                ->where('metric_date', Carbon::today()->toDateString())
                ->where('metric_type', DashboardDailyMetric::TYPE_REVENUE_TOTAL)
                ->count(),
        );
    }
}
