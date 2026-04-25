<?php

namespace App\Http\Controllers\KeuanganJet;

use App\Http\Controllers\Controller;
use App\Models\KeuanganJetSiklus;
use App\Models\Mobil;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\View\View;

/**
 * Page controller untuk Data Keuangan JET — read-only listing + detail.
 *
 * Sesi 38 PR #3A: read-only foundation. Edit forms + JS interaction defer
 * ke PR #3B. Sub-endpoints (refresh, biaya, payout) defer ke PR #3B.
 *
 * Middleware: jwt.auth (outer dashboard group) + admin.role:admin (inner
 * group via routes/web.php pattern).
 *
 * Endpoints:
 *   GET /dashboard/keuangan-jet?date=YYYY-MM-DD&mobil_id=...
 *   GET /dashboard/keuangan-jet/{siklus}
 */
class KeuanganJetPageController extends Controller
{
    /**
     * List page — semua siklus, filter by tanggal_mulai range + mobil.
     */
    public function index(Request $request): View
    {
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');
        $mobilId = $request->query('mobil_id');

        try {
            $start = $startDate ? Carbon::parse($startDate)->startOfDay() : now()->subDays(7)->startOfDay();
            $end = $endDate ? Carbon::parse($endDate)->endOfDay() : now()->endOfDay();
        } catch (\Throwable $e) {
            $start = now()->subDays(7)->startOfDay();
            $end = now()->endOfDay();
        }

        $query = KeuanganJetSiklus::query()
            ->whereBetween('tanggal_mulai', [$start->toDateString(), $end->toDateString()])
            ->with(['driverActual:id,nama', 'mobil:id,kode_mobil,home_pool', 'keuanganJets'])
            ->orderBy('tanggal_mulai', 'desc')
            ->orderBy('mobil_code');

        if (! empty($mobilId)) {
            $query->where('mobil_id', $mobilId);
        }

        $siklusList = $query->get();

        $mobilList = Mobil::query()
            ->where('is_active_in_trip', true)
            ->orderBy('kode_mobil')
            ->get(['id', 'kode_mobil', 'home_pool']);

        $totalKotor = (float) $siklusList->sum('total_pendapatan_kotor');
        $totalBersih = (float) $siklusList->sum('total_pendapatan_bersih');
        $totalAdmin = (float) $siklusList->sum('total_admin_potong');
        $countComplete = $siklusList->where('status_siklus', 'complete')->count();
        $countBerjalan = $siklusList->where('status_siklus', 'berjalan')->count();
        $countLocked = $siklusList->where('status_siklus', 'locked')->count();

        return view('keuangan-jet.index', [
            'siklusList' => $siklusList,
            'mobilList' => $mobilList,
            'startDate' => $start,
            'endDate' => $end,
            'mobilIdFilter' => $mobilId,
            'stats' => [
                'total_kotor' => $totalKotor,
                'total_bersih' => $totalBersih,
                'total_admin' => $totalAdmin,
                'count_complete' => $countComplete,
                'count_berjalan' => $countBerjalan,
                'count_locked' => $countLocked,
                'count_total' => $siklusList->count(),
            ],
        ]);
    }

    /**
     * Detail page — single siklus dengan child rows + payout info.
     */
    public function show(KeuanganJetSiklus $siklus): View
    {
        $siklus->load([
            'mobil:id,kode_mobil,home_pool',
            'driverPlanned:id,nama',
            'driverActual:id,nama',
            'completedBy:id,nama',
            'driverPaidBy:id,nama',
            'keuanganJets' => function ($q) {
                $q->orderBy('jam')->with(['adminPaidBy:id,nama', 'trip:id,status,version']);
            },
        ]);

        return view('keuangan-jet.siklus-detail', [
            'siklus' => $siklus,
        ]);
    }
}
