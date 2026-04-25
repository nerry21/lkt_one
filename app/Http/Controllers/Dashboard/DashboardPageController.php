<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Services\KeuanganJetStatsService;
use Illuminate\Contracts\View\View;

class DashboardPageController extends Controller
{
    public function index(KeuanganJetStatsService $keuanganJetStats): View
    {
        return view('dashboard.index', [
            'pageTitle' => 'Dashboard | JET (JAYA EXCECUTIVE TRANSPORT)',
            'guardMode' => 'protected',
            'pageHeading' => 'Dashboard',
            'pageDescription' => 'Ringkasan statistik dan performa armada',
            'keuanganJetStats' => $keuanganJetStats->dashboardPayload(),
        ]);
    }
}
