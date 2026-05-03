<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\DashboardDailyMetric;
use App\Models\Trip;
use Carbon\CarbonImmutable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

/**
 * Sesi 77 PR-CRM-6K4 — Aggregate metrik dashboard system health + trend.
 *
 * Sumber data:
 *   - Cascade reschedule: bookings.cancellation_reason (Sesi 76)
 *   - Trips total: trips dengan status final
 *   - Revenue: SUM total_amount bookings Dibayar
 *   - Passenger inquiry response rate: dashboard_daily_metrics cache (
 *     populate via cron Chatbot ke endpoint LKT — Sesi 78 cutover)
 *
 * Bridge health + worker status: hardcoded MVP, akan diisi dari log/marker
 * file di Sesi 78.
 */
class DashboardMetricsAggregatorService
{
    public const TOTAL_BRIDGE_ENDPOINTS = 28;

    /**
     * @return array{
     *   passenger_inquiry: array{response_rate_pct:int, sent_count:int, responded_count:int},
     *   cascade_reschedule: array{cancel_count:int, walk_in_count:int}
     * }
     */
    public function getCurrentDayStats(): array
    {
        return [
            'passenger_inquiry' => $this->getPassengerInquiryStatsToday(),
            'cascade_reschedule' => $this->getCascadeRescheduleStatsToday(),
        ];
    }

    /**
     * @return array{
     *   total_endpoints:int,
     *   healthy_count:int,
     *   last_check_at:string,
     *   overall_status:string
     * }
     */
    public function getBridgeHealthStatus(): array
    {
        // MVP: hardcoded all-healthy. Sesi 78+ ganti dengan ping-loop ke
        // log channel chatbot-bridge atau in-process route check.
        return [
            'total_endpoints' => self::TOTAL_BRIDGE_ENDPOINTS,
            'healthy_count' => self::TOTAL_BRIDGE_ENDPOINTS,
            'last_check_at' => Carbon::now()->toIso8601String(),
            'overall_status' => 'healthy',
        ];
    }

    /**
     * @return array{
     *   status:string,
     *   last_seen_at:string|null,
     *   pending_jobs:int,
     *   note:string
     * }
     */
    public function getWorkerQueueStatus(): array
    {
        // Sesi 77 — worker queue dimatikan sengaja sampai Sesi 78 cutover.
        return [
            'status' => 'mati_sengaja',
            'last_seen_at' => null,
            'pending_jobs' => 0,
            'note' => 'Worker queue dimatikan sengaja sampai Sesi 78 cutover.',
        ];
    }

    /**
     * Trend 7 hari: 6 hari ke belakang + hari ini. Read dari cache table.
     * Kalau cache kosong untuk tanggal tertentu, isi 0.
     *
     * @return array{
     *   labels:array<string>,
     *   datasets:array<array{name:string,values:array<int>}>
     * }
     */
    public function getTrend7Days(): array
    {
        $end = CarbonImmutable::now()->startOfDay();
        $start = $end->subDays(6);

        $labels = [];
        $dates = [];
        for ($d = $start; $d <= $end; $d = $d->addDay()) {
            $labels[] = $d->format('d/m');
            $dates[] = $d->toDateString();
        }

        $rows = DashboardDailyMetric::query()
            ->whereBetween('metric_date', [$start->toDateString(), $end->toDateString()])
            ->get()
            ->groupBy(['metric_type', fn ($r) => $r->metric_date->toDateString()]);

        $tripsValues = $this->seriesFor($rows, DashboardDailyMetric::TYPE_TRIPS_TOTAL, $dates);
        $revenueValues = $this->seriesFor(
            $rows,
            DashboardDailyMetric::TYPE_REVENUE_TOTAL,
            $dates,
            divisor: 1000, // tampilkan dalam ribuan
        );
        $inquiryValues = $this->seriesFor(
            $rows,
            DashboardDailyMetric::TYPE_PASSENGER_INQUIRY_RESPONSE_RATE,
            $dates,
        );

        return [
            'labels' => $labels,
            'datasets' => [
                ['name' => 'Total Trips', 'values' => $tripsValues],
                ['name' => 'Revenue (Rb)', 'values' => $revenueValues],
                ['name' => 'Inquiry Response %', 'values' => $inquiryValues],
            ],
        ];
    }

    /**
     * Recompute & upsert metric untuk hari ini. Idempoten — call N kali
     * tetap menghasilkan 1 row per (metric_date, metric_type).
     */
    public function refreshTodayMetrics(): void
    {
        $today = CarbonImmutable::now()->startOfDay()->toDateString();

        $tripsTotal = Trip::query()
            ->whereDate('trip_date', $today)
            ->whereIn('status', ['scheduled', 'berangkat', 'tidak_berangkat', 'keluar_trip'])
            ->count();

        $revenueTotal = (int) Booking::query()
            ->whereDate('trip_date', $today)
            ->where('payment_status', 'Dibayar')
            ->sum('total_amount');

        $cascade = $this->getCascadeRescheduleStatsToday();
        $cascadeCount = $cascade['cancel_count'] + $cascade['walk_in_count'];

        $this->upsertMetric($today, DashboardDailyMetric::TYPE_TRIPS_TOTAL, $tripsTotal);
        $this->upsertMetric($today, DashboardDailyMetric::TYPE_REVENUE_TOTAL, $revenueTotal);
        $this->upsertMetric(
            $today,
            DashboardDailyMetric::TYPE_CASCADE_RESCHEDULE_COUNT,
            $cascadeCount,
        );
    }

    private function upsertMetric(string $date, string $type, int|float $value): void
    {
        DashboardDailyMetric::query()->updateOrCreate(
            ['metric_date' => $date, 'metric_type' => $type],
            [
                'metric_value' => $value,
                'computed_at' => Carbon::now(),
            ],
        );
    }

    /**
     * @return array{response_rate_pct:int, sent_count:int, responded_count:int}
     */
    private function getPassengerInquiryStatsToday(): array
    {
        // TODO Sesi 78 — populate via Chatbot push ke dashboard_daily_metrics
        // (sent + responded di-track di Chatbot side, push harian).
        $today = CarbonImmutable::now()->startOfDay()->toDateString();

        $row = DashboardDailyMetric::query()
            ->where('metric_date', $today)
            ->where('metric_type', DashboardDailyMetric::TYPE_PASSENGER_INQUIRY_RESPONSE_RATE)
            ->first();

        if ($row === null) {
            return ['response_rate_pct' => 0, 'sent_count' => 0, 'responded_count' => 0];
        }

        $meta = $row->metric_meta ?? [];
        return [
            'response_rate_pct' => (int) $row->metric_value,
            'sent_count' => (int) ($meta['sent_count'] ?? 0),
            'responded_count' => (int) ($meta['responded_count'] ?? 0),
        ];
    }

    /**
     * @return array{cancel_count:int, walk_in_count:int}
     */
    private function getCascadeRescheduleStatsToday(): array
    {
        $today = CarbonImmutable::now()->startOfDay();
        $tomorrow = $today->addDay();

        $cancelCount = Booking::query()
            ->whereNotNull('cancellation_reason')
            ->whereBetween('updated_at', [$today, $tomorrow])
            ->count();

        $walkInCount = DB::table('booking_sources')
            ->where('source_meta->walk_in', true)
            ->whereBetween('created_at', [$today, $tomorrow])
            ->count();

        return [
            'cancel_count' => $cancelCount,
            'walk_in_count' => $walkInCount,
        ];
    }

    /**
     * @param \Illuminate\Support\Collection<string,\Illuminate\Support\Collection<string,\Illuminate\Support\Collection<int,DashboardDailyMetric>>> $grouped
     * @param array<string> $dates
     * @return array<int>
     */
    private function seriesFor(
        \Illuminate\Support\Collection $grouped,
        string $metricType,
        array $dates,
        int $divisor = 1,
    ): array {
        $perDate = $grouped->get($metricType, collect());

        $out = [];
        foreach ($dates as $date) {
            $row = $perDate->get($date)?->first();
            $value = $row !== null ? (int) ((float) $row->metric_value / $divisor) : 0;
            $out[] = $value;
        }
        return $out;
    }
}
