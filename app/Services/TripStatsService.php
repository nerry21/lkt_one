<?php

namespace App\Services;

use App\Models\Mobil;
use App\Models\Trip;
use Illuminate\Support\Collection;

/**
 * Single source of truth untuk per-mobil statistics di dashboard Trip Planning
 * (Fase E5d Sesi 32).
 *
 * Sebelum refactor ini, shape per_mobil berbeda antara initial page load
 * (TripPlanningDashboardViewController::computeStatistics) dan post-action
 * refetch (TripPlanningPageController::buildStatistics). Refetch hanya loop
 * mobil yang punya trip, missing mobil_code/home_pool/status_breakdown.
 * Akibatnya stats card kosong setelah SDR create / status change.
 *
 * Sekarang kedua controller delegate ke service ini — shape selalu flat array
 * per-mobil aktif lengkap dengan status_breakdown dan home_pool, terurut oleh
 * kode_mobil ASC.
 */
class TripStatsService
{
    public function __construct(
        private readonly TripService $tripService,
    ) {}

    /**
     * Bangun per-mobil statistics untuk tanggal target. Iterasi dari SEMUA
     * mobil aktif (bukan hanya yang punya trip), supaya dashboard konsisten
     * antara initial load dan post-action refetch.
     *
     * @param  Collection<int, Trip>  $trips         Trip collection untuk tanggal target
     * @param  Collection<int, Mobil>|null  $activeMobils  Injectable untuk test. Kalau null, auto-fetch dari DB.
     * @return array<int, array{mobil_id:string,mobil_code:string,home_pool:?string,pp_count:float,status_breakdown:array<string,int>}>
     */
    public function buildPerMobilStats(Collection $trips, ?Collection $activeMobils = null): array
    {
        $tripsByMobil = $trips->groupBy('mobil_id');

        $mobils = $activeMobils ?? Mobil::query()
            ->where('is_active_in_trip', true)
            ->orderBy('kode_mobil')
            ->get();

        return $mobils->map(function (Mobil $mobil) use ($tripsByMobil) {
            $mobilTrips = $tripsByMobil->get($mobil->id, collect());

            return [
                'mobil_id' => $mobil->id,
                'mobil_code' => $mobil->kode_mobil,
                'home_pool' => $mobil->home_pool,
                'pp_count' => $this->tripService->computePpForMobil($mobilTrips),
                'status_breakdown' => $this->statusBreakdown($mobilTrips),
            ];
        })->all();
    }

    /**
     * @param  Collection<int, Trip>  $mobilTrips
     * @return array<string, int>
     */
    public function statusBreakdown(Collection $mobilTrips): array
    {
        return $mobilTrips
            ->groupBy('status')
            ->map(fn ($group) => $group->count())
            ->all();
    }
}
