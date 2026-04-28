<?php

namespace App\Http\Controllers\KeuanganJet;

use App\Http\Controllers\Controller;
use App\Http\Requests\KeuanganJet\MarkAdminPaidRequest;
use App\Http\Requests\KeuanganJet\MarkDriverPaidRequest;
use App\Http\Requests\KeuanganJet\OverrideDriverRequest;
use App\Http\Requests\KeuanganJet\UpdateBiayaOperasionalRequest;
use App\Http\Requests\KeuanganJet\UpdateKeuanganJetRowRequest;
use App\Models\Driver;
use App\Models\KeuanganJet;
use App\Models\KeuanganJetSiklus;
use App\Models\Mobil;
use App\Services\KeuanganJetSyncService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\View\View;

/**
 * Page controller Data Keuangan JET — read + edit.
 *
 * PR #3A: GET index + show (read-only).
 * PR #3B: 6 POST endpoints (refresh, biaya, driver-paid, driver-override,
 *         jet-update, jet-admin-paid) + JS dropdown chaining.
 *
 * Lock-on-paid logic (Sesi 38 design Q9 lock):
 *   - Siklus status='locked' (driver_paid_status='sudah') → semua POST endpoint
 *     reject 423 Locked.
 *   - keuangan_jet row admin_paid_status='sudah' → reject jet-update 423.
 *
 * Middleware: jwt.auth + admin.role:admin (via routes/web.php).
 */
class KeuanganJetPageController extends Controller
{
    public function __construct(
        private readonly KeuanganJetSyncService $sync,
    ) {}

    /**
     * List page — semua siklus, filter by tanggal_mulai range + mobil.
     */
    public function index(Request $request): View
    {
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');
        $mobilId = $request->query('mobil_id');
        $jenisLayanan = $request->query('jenis_layanan');

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

        // Sesi 50 PR #6 — filter siklus by jenis_layanan child rows.
        if (! empty($jenisLayanan) && in_array($jenisLayanan, ['Reguler', 'Dropping', 'Rental'], true)) {
            $query->whereHas('keuanganJets', function ($q) use ($jenisLayanan) {
                $q->where('jenis_layanan', $jenisLayanan);
            });
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
            'jenisLayanan' => $jenisLayanan,
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
     * Detail page — single siklus dengan child rows + payout info + edit forms (PR #3B).
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

        $driverList = Driver::query()
            ->where('status', 'Active')
            ->orderBy('nama')
            ->get(['id', 'nama']);

        return view('keuangan-jet.siklus-detail', [
            'siklus' => $siklus,
            'driverList' => $driverList,
            'pageScript' => 'keuangan-jet/siklus-detail',
            'pageTitle' => 'Detail Keuangan JET | JET',
            'guardMode' => 'protected',
        ]);
    }

    /**
     * POST /dashboard/keuangan-jet/{siklus}/refresh
     * Recompute formula computed-only untuk semua keuangan_jet rows + aggregate siklus.
     * Preserve manual entry.
     */
    public function refresh(KeuanganJetSiklus $siklus): JsonResponse
    {
        if ($siklus->status_siklus === 'locked') {
            return response()->json([
                'message' => 'Siklus sudah locked (driver paid). Tidak bisa refresh.',
            ], 423);
        }

        $siklus->keuanganJets->each(function (KeuanganJet $row) {
            $this->sync->refreshFromBookings($row);
        });

        $this->sync->aggregateSiklus($siklus->fresh());

        return response()->json([
            'message' => 'Data refreshed dari Bookings + formula recomputed.',
            'siklus_id' => $siklus->id,
        ]);
    }

    /**
     * POST /dashboard/keuangan-jet/{siklus}/biaya
     * Update biaya operasional manual + re-aggregate.
     */
    public function updateBiaya(UpdateBiayaOperasionalRequest $request, KeuanganJetSiklus $siklus): JsonResponse
    {
        if ($siklus->status_siklus === 'locked') {
            return response()->json(['message' => 'Siklus locked.'], 423);
        }

        $siklus->update([
            'uang_jalan' => $request->validated('uang_jalan'),
            'biaya_kurir' => $request->validated('biaya_kurir'),
            'biaya_cuci_mobil' => $request->validated('biaya_cuci_mobil'),
            'updated_by' => $request->user()?->id,
        ]);

        $this->sync->aggregateSiklus($siklus->fresh());

        return response()->json([
            'message' => 'Biaya operasional updated.',
            'siklus_id' => $siklus->id,
        ]);
    }

    /**
     * POST /dashboard/keuangan-jet/{siklus}/driver-paid
     * Mark driver sudah dibayar → status_siklus = 'locked' (irreversible).
     */
    public function markDriverPaid(MarkDriverPaidRequest $request, KeuanganJetSiklus $siklus): JsonResponse
    {
        if ($siklus->driver_paid_status === 'sudah') {
            return response()->json(['message' => 'Driver sudah dibayar sebelumnya.'], 422);
        }

        if ($siklus->status_siklus !== 'complete') {
            return response()->json([
                'message' => 'Siklus harus status complete untuk mark driver paid.',
            ], 422);
        }

        $siklus->update([
            'driver_paid_status' => 'sudah',
            'driver_paid_at' => now(),
            'driver_paid_by' => $request->user()?->id,
            'status_siklus' => 'locked',
            'updated_by' => $request->user()?->id,
        ]);

        return response()->json([
            'message' => 'Driver marked as paid. Siklus is now locked.',
            'siklus_id' => $siklus->id,
        ]);
    }

    /**
     * POST /dashboard/keuangan-jet/{siklus}/driver-override
     * Override driver actual (read-only di Trip Planning).
     */
    public function overrideDriver(OverrideDriverRequest $request, KeuanganJetSiklus $siklus): JsonResponse
    {
        if ($siklus->status_siklus === 'locked') {
            return response()->json(['message' => 'Siklus locked.'], 423);
        }

        $newDriver = Driver::findOrFail($request->validated('driver_id'));
        $isOverridden = $newDriver->id !== $siklus->driver_id_planned;

        $siklus->update([
            'driver_id_actual' => $newDriver->id,
            'driver_name_actual' => $newDriver->nama,
            'is_driver_overridden' => $isOverridden,
            'updated_by' => $request->user()?->id,
        ]);

        return response()->json([
            'message' => 'Driver actual updated.',
            'siklus_id' => $siklus->id,
            'driver_name_actual' => $newDriver->nama,
            'is_overridden' => $isOverridden,
        ]);
    }

    /**
     * POST /dashboard/keuangan-jet/jet/{row}
     * Update keuangan_jet row detail (jenis_layanan, sumber_rental, persen_admin,
     * uang_snack) + recompute formula.
     */
    public function updateRow(UpdateKeuanganJetRowRequest $request, KeuanganJet $row): JsonResponse
    {
        if ($row->siklus->status_siklus === 'locked') {
            return response()->json(['message' => 'Siklus locked.'], 423);
        }

        if ($row->admin_paid_status === 'sudah') {
            return response()->json(['message' => 'Admin sudah dibayar untuk row ini.'], 423);
        }

        $row->update([
            'jenis_layanan' => $request->validated('jenis_layanan'),
            'is_jenis_overridden' => true,
            'sumber_rental' => $request->validated('sumber_rental'),
            'persen_admin' => $request->validated('persen_admin'),
            'is_persen_overridden' => true,
            'uang_snack' => $request->validated('uang_snack'),
            'updated_by' => $request->user()?->id,
        ]);

        $this->sync->recomputeFormula($row->fresh());
        $this->sync->aggregateSiklus($row->siklus);

        return response()->json([
            'message' => 'Keuangan JET row updated + formula recomputed.',
            'row_id' => $row->id,
        ]);
    }

    /**
     * POST /dashboard/keuangan-jet/jet/{row}/admin-paid
     * Mark admin sudah dibayar untuk 1 keuangan_jet row.
     */
    public function markAdminPaid(MarkAdminPaidRequest $request, KeuanganJet $row): JsonResponse
    {
        if ($row->admin_paid_status === 'sudah') {
            return response()->json(['message' => 'Admin sudah dibayar sebelumnya.'], 422);
        }

        $row->update([
            'admin_paid_status' => 'sudah',
            'admin_paid_at' => now(),
            'admin_paid_by' => $request->user()?->id,
            'updated_by' => $request->user()?->id,
        ]);

        return response()->json([
            'message' => 'Admin marked as paid.',
            'row_id' => $row->id,
        ]);
    }
}
