<?php

namespace App\Services;

use App\Models\KeuanganJet;
use App\Models\KeuanganJetSiklus;
use App\Models\Mobil;
use Illuminate\Support\Carbon;

/**
 * Statistik agregat untuk widget dashboard Keuangan JET (Sesi 38 PR #4).
 *
 * Read-only service — tidak mutate data, hanya aggregate untuk display.
 *
 * Sources:
 *   - keuangan_jet_siklus (parent, 1 row per round-trip cycle)
 *   - keuangan_jet (child, 1 row per trip per direction)
 *
 * Methods:
 *   - summaryHariIniPerMobil()       → list mobil + revenue + trip count hari ini
 *   - summaryPeriode(start, end)     → totals untuk rentang tanggal
 *   - leaderboardMobil(start, end)   → top 5 mobil by revenue bersih
 *   - leaderboardDriver(start, end)  → top 5 driver by uang_driver
 */
class KeuanganJetStatsService
{
    /**
     * Summary per mobil untuk hari ini (today).
     *
     * @return array<int, array{kode_mobil: string, home_pool: string, total_kotor: float, total_bersih: float, count_trips: int, count_siklus: int, latest_status: string}>
     */
    public function summaryHariIniPerMobil(): array
    {
        $today = now()->toDateString();

        $siklusByMobil = KeuanganJetSiklus::query()
            ->whereDate('tanggal_mulai', $today)
            ->get()
            ->groupBy('mobil_id');

        $tripsByMobil = KeuanganJet::query()
            ->whereDate('trip_date', $today)
            ->selectRaw('mobil_id, COUNT(*) as trip_count, SUM(total_pendapatan_arah) as revenue')
            ->groupBy('mobil_id')
            ->get()
            ->keyBy('mobil_id');

        return Mobil::query()
            ->where('is_active_in_trip', true)
            ->orderBy('kode_mobil')
            ->get()
            ->map(function (Mobil $mobil) use ($siklusByMobil, $tripsByMobil) {
                $siklusList = $siklusByMobil->get($mobil->id, collect());
                $trips = $tripsByMobil->get($mobil->id);

                $latestStatus = $siklusList->isEmpty()
                    ? '-'
                    : (string) $siklusList->sortByDesc('updated_at')->first()->status_siklus;

                return [
                    'kode_mobil' => (string) $mobil->kode_mobil,
                    'home_pool' => (string) ($mobil->home_pool ?? '-'),
                    'total_kotor' => (float) $siklusList->sum('total_pendapatan_kotor'),
                    'total_bersih' => (float) $siklusList->sum('total_pendapatan_bersih'),
                    'count_trips' => (int) ($trips->trip_count ?? 0),
                    'count_siklus' => $siklusList->count(),
                    'latest_status' => $latestStatus,
                ];
            })
            ->values()
            ->all();
    }

    /**
     * Summary totals untuk rentang tanggal.
     *
     * @return array{total_siklus: int, count_complete: int, count_berjalan: int, count_locked: int, total_kotor: float, total_bersih: float, total_admin_potong: float, total_uang_driver: float, total_uang_mobil: float, period_start: string, period_end: string}
     */
    public function summaryPeriode(Carbon $start, Carbon $end): array
    {
        $siklusList = KeuanganJetSiklus::query()
            ->whereBetween('tanggal_mulai', [$start->toDateString(), $end->toDateString()])
            ->get();

        return [
            'total_siklus' => $siklusList->count(),
            'count_complete' => $siklusList->where('status_siklus', 'complete')->count(),
            'count_berjalan' => $siklusList->where('status_siklus', 'berjalan')->count(),
            'count_locked' => $siklusList->where('status_siklus', 'locked')->count(),
            'total_kotor' => (float) $siklusList->sum('total_pendapatan_kotor'),
            'total_bersih' => (float) $siklusList->sum('total_pendapatan_bersih'),
            'total_admin_potong' => (float) $siklusList->sum('total_admin_potong'),
            'total_uang_driver' => (float) $siklusList->sum('uang_driver'),
            'total_uang_mobil' => (float) $siklusList->sum('uang_mobil'),
            'period_start' => $start->toDateString(),
            'period_end' => $end->toDateString(),
        ];
    }

    /**
     * Top 5 mobil by total pendapatan bersih dalam rentang tanggal.
     *
     * @return array<int, array{kode_mobil: string, total_bersih: float, count_siklus: int}>
     */
    public function leaderboardMobil(Carbon $start, Carbon $end): array
    {
        return KeuanganJetSiklus::query()
            ->whereBetween('tanggal_mulai', [$start->toDateString(), $end->toDateString()])
            ->selectRaw('mobil_code, SUM(total_pendapatan_bersih) as total_bersih, COUNT(*) as count_siklus')
            ->groupBy('mobil_code')
            ->orderByDesc('total_bersih')
            ->limit(5)
            ->get()
            ->map(fn ($row) => [
                'kode_mobil' => (string) $row->mobil_code,
                'total_bersih' => (float) $row->total_bersih,
                'count_siklus' => (int) $row->count_siklus,
            ])
            ->all();
    }

    /**
     * Top 5 driver by total uang_driver dalam rentang tanggal.
     *
     * @return array<int, array{driver_name: string, total_uang_driver: float, count_siklus: int}>
     */
    public function leaderboardDriver(Carbon $start, Carbon $end): array
    {
        return KeuanganJetSiklus::query()
            ->whereBetween('tanggal_mulai', [$start->toDateString(), $end->toDateString()])
            ->whereNotNull('driver_name_actual')
            ->selectRaw('driver_name_actual, SUM(uang_driver) as total_uang_driver, COUNT(*) as count_siklus')
            ->groupBy('driver_name_actual')
            ->orderByDesc('total_uang_driver')
            ->limit(5)
            ->get()
            ->map(fn ($row) => [
                'driver_name' => (string) $row->driver_name_actual,
                'total_uang_driver' => (float) $row->total_uang_driver,
                'count_siklus' => (int) $row->count_siklus,
            ])
            ->all();
    }

    /**
     * Composite payload untuk dashboard.
     */
    public function dashboardPayload(): array
    {
        $now = now();
        $monthStart = $now->copy()->startOfMonth();
        $monthEnd = $now->copy()->endOfMonth();

        return [
            'today_per_mobil' => $this->summaryHariIniPerMobil(),
            'period_summary' => $this->summaryPeriode($monthStart, $monthEnd),
            'leaderboard_mobil' => $this->leaderboardMobil($monthStart, $monthEnd),
            'leaderboard_driver' => $this->leaderboardDriver($monthStart, $monthEnd),
        ];
    }
}
