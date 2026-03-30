<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Services\DashboardStatisticsService;
use Illuminate\Contracts\View\View;

class DashboardPageController extends Controller
{
    public function index(DashboardStatisticsService $statistics): View
    {
        $payload = $statistics->payload();

        return view('dashboard.index', [
            'pageTitle' => 'Dashboard | JET (JAYA EXCECUTIVE TRANSPORT)',
            'pageScript' => 'dashboard/index',
            'guardMode' => 'protected',
            'pageHeading' => 'Dashboard',
            'pageDescription' => 'Ringkasan statistik dan performa armada',
            'stats' => $payload['stats'],
            'revenueData' => $payload['revenueData'],
            'mobilRevenue' => $payload['mobilRevenue'],
            'dashboardState' => $payload,
            'statCards' => $this->statCards($payload['stats']),
            'mobilRevenueColors' => ['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0'],
        ]);
    }

    private function statCards(array $stats): array
    {
        return [
            [
                'key' => 'total_uang_bersih',
                'title' => 'Total Pendapatan Bersih',
                'value' => $stats['total_uang_bersih'] ?? 0,
                'format' => 'currency',
                'icon' => 'dollar-sign',
                'color' => 'emerald',
                'trend' => '+12.5%',
                'trend_up' => true,
                'testid' => 'stat-card-total-pendapatan-bersih',
            ],
            [
                'key' => 'total_uang_pc',
                'title' => 'Uang PC (15%)',
                'value' => $stats['total_uang_pc'] ?? 0,
                'format' => 'currency',
                'icon' => 'trending-up',
                'color' => 'amber',
                'trend' => '+8.2%',
                'trend_up' => true,
                'testid' => 'stat-card-uang-pc-(15%)',
            ],
            [
                'key' => 'total_keberangkatan',
                'title' => 'Total Keberangkatan',
                'value' => $stats['total_keberangkatan'] ?? 0,
                'format' => 'number',
                'icon' => 'bus',
                'color' => 'blue',
                'trend' => '+15 trip',
                'trend_up' => true,
                'testid' => 'stat-card-total-keberangkatan',
            ],
            [
                'key' => 'total_penumpang',
                'title' => 'Total Penumpang',
                'value' => $stats['total_penumpang'] ?? 0,
                'format' => 'number',
                'icon' => 'users',
                'color' => 'purple',
                'trend' => '+120 orang',
                'trend_up' => true,
                'testid' => 'stat-card-total-penumpang',
            ],
            [
                'key' => 'total_drivers',
                'title' => 'Total Driver',
                'value' => $stats['total_drivers'] ?? 0,
                'format' => 'number',
                'icon' => 'users',
                'color' => 'teal',
                'trend' => 'Aktif',
                'trend_up' => true,
                'testid' => 'stat-card-total-driver',
            ],
            [
                'key' => 'total_mobil',
                'title' => 'Total Mobil',
                'value' => $stats['total_mobil'] ?? 0,
                'format' => 'number',
                'icon' => 'car',
                'color' => 'indigo',
                'trend' => 'Operasional',
                'trend_up' => true,
                'testid' => 'stat-card-total-mobil',
            ],
        ];
    }
}
