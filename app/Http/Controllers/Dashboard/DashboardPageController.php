<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Services\BotControl\BotControlService;
use App\Services\DashboardMetricsAggregatorService;
use App\Services\KeuanganJetStatsService;
use Illuminate\Contracts\View\View;

class DashboardPageController extends Controller
{
    public function index(
        KeuanganJetStatsService $keuanganJetStats,
        DashboardMetricsAggregatorService $metrics,
        BotControlService $botControl,
    ): View {
        $current = $metrics->getCurrentDayStats();

        $systemHealthStats = [
            'passenger_inquiry' => $current['passenger_inquiry'],
            'cascade_reschedule' => $current['cascade_reschedule'],
            'bridge_health' => $metrics->getBridgeHealthStatus(),
            'worker' => $metrics->getWorkerQueueStatus(),
        ];

        return view('dashboard.index', [
            'pageTitle' => 'Dashboard | JET (JAYA EXCECUTIVE TRANSPORT)',
            'guardMode' => 'protected',
            'pageHeading' => 'Dashboard',
            'pageDescription' => 'Ringkasan statistik dan performa armada',
            'keuanganJetStats' => $keuanganJetStats->dashboardPayload(),
            'systemHealthStats' => $systemHealthStats,
            'trend7d' => $metrics->getTrend7Days(),
            'botStatus' => $botControl->snapshot(),
        ]);
    }
}
