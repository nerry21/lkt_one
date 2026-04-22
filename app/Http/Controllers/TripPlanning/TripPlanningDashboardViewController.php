<?php

namespace App\Http\Controllers\TripPlanning;

use App\Http\Controllers\Controller;
use App\Models\Mobil;
use App\Models\Trip;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\View\View;

/**
 * Render Blade view dashboard Trip Planning (Fase E1 Sesi 25).
 *
 * Read-only foundation: statistik per mobil + daftar trip untuk tanggal
 * tertentu. Data hydrated ke inline JSON script tag agar E2 berikutnya
 * bisa consume state tanpa refetch. Aksi tombol (berangkat, keluar trip,
 * dsb.) defer ke E2/E3.
 *
 * PP counting logic mirror TripPlanningPageController::buildStatistics (D2),
 * tetapi iterasi di sini dimulai dari seluruh Mobil aktif supaya mobil tanpa
 * trip hari ini tetap tampil di dashboard dengan 0 PP.
 */
class TripPlanningDashboardViewController extends Controller
{
    private const ACTIVE_STATUSES = ['berangkat', 'keluar_trip'];

    public function show(Request $request): View
    {
        $date = (string) $request->query('date', now()->toDateString());

        try {
            $targetDate = Carbon::parse($date)->startOfDay();
        } catch (\Throwable $e) {
            $targetDate = now()->startOfDay();
        }

        $trips = Trip::query()
            ->whereDate('trip_date', $targetDate)
            ->with(['mobil:id,kode_mobil,home_pool', 'driver:id,nama'])
            ->orderBy('direction')
            ->orderBy('sequence')
            ->get();

        $statistics = $this->computeStatistics($targetDate, $trips);

        $dashboardState = [
            'target_date' => $targetDate->toDateString(),
            'trips' => $trips->map(fn (Trip $trip) => $this->formatTripForState($trip))->all(),
            'statistics' => $statistics,
        ];

        return view('trip-planning.dashboard', [
            'pageTitle' => 'Trip Planning | JET (JAYA EXCECUTIVE TRANSPORT)',
            'pageScript' => 'trip-planning/dashboard',
            'guardMode' => 'protected',
            'pageHeading' => 'Trip Planning',
            'pageDescription' => 'Jadwal trip harian armada JET Travel',
            'targetDate' => $targetDate,
            'trips' => $trips,
            'statistics' => $statistics,
            'dashboardState' => $dashboardState,
        ]);
    }

    /**
     * Bangun statistik per mobil aktif untuk tanggal target.
     *
     * Iterasi dari seluruh Mobil aktif (bukan hanya yang punya trip) agar
     * admin bisa lihat mobil yang idle juga. PP formula mirror D2.
     *
     * @param  Collection<int, Trip>  $trips
     * @return array<int, array{mobil_id:string,mobil_code:string,home_pool:?string,pp_count:float,status_breakdown:array<string,int>}>
     */
    private function computeStatistics(Carbon $date, Collection $trips): array
    {
        $tripsByMobil = $trips->groupBy('mobil_id');

        $mobils = Mobil::query()
            ->where('is_active_in_trip', true)
            ->orderBy('kode_mobil')
            ->get();

        return $mobils->map(function (Mobil $mobil) use ($tripsByMobil) {
            $mobilTrips = $tripsByMobil->get($mobil->id, collect());

            return [
                'mobil_id' => $mobil->id,
                'mobil_code' => $mobil->kode_mobil,
                'home_pool' => $mobil->home_pool,
                'pp_count' => $this->computePp($mobilTrips),
                'status_breakdown' => $this->statusBreakdown($mobilTrips),
            ];
        })->all();
    }

    /**
     * Hitung PP (pulang-pergi) untuk 1 mobil di 1 tanggal.
     *
     * Formula mirror TripPlanningPageController::buildStatistics (D2):
     *   0.5 × count(ROHUL_TO_PKB dengan status berangkat/keluar_trip)
     *   + 0.5 × count(PKB_TO_ROHUL dengan status berangkat/keluar_trip)
     *     — hanya ditambahkan kalau ada keberangkatan ROHUL→PKB aktif.
     *
     * @param  Collection<int, Trip>  $mobilTrips
     */
    private function computePp(Collection $mobilTrips): float
    {
        $activeRohulDeparture = $mobilTrips
            ->where('direction', 'ROHUL_TO_PKB')
            ->whereIn('status', self::ACTIVE_STATUSES);

        $activePkbReturn = $mobilTrips
            ->where('direction', 'PKB_TO_ROHUL')
            ->whereIn('status', self::ACTIVE_STATUSES);

        $pp = 0.5 * $activeRohulDeparture->count();

        if ($activeRohulDeparture->isNotEmpty()) {
            $pp += 0.5 * $activePkbReturn->count();
        }

        return $pp;
    }

    /**
     * @param  Collection<int, Trip>  $mobilTrips
     * @return array<string, int>
     */
    private function statusBreakdown(Collection $mobilTrips): array
    {
        return $mobilTrips
            ->groupBy('status')
            ->map(fn ($group) => $group->count())
            ->all();
    }

    /**
     * @return array{id:int,mobil:array{id:?string,code:?string,home_pool:?string},driver:array{id:?string,name:?string},direction:string,sequence:int,trip_time:?string,status:string,keluar_trip_substatus:?string}
     */
    private function formatTripForState(Trip $trip): array
    {
        return [
            'id' => $trip->id,
            'mobil' => [
                'id' => $trip->mobil?->id,
                'code' => $trip->mobil?->kode_mobil,
                'home_pool' => $trip->mobil?->home_pool,
            ],
            'driver' => [
                'id' => $trip->driver?->id,
                'name' => $trip->driver?->nama,
            ],
            'direction' => $trip->direction,
            'sequence' => $trip->sequence,
            'trip_time' => $trip->trip_time,
            'status' => $trip->status,
            'keluar_trip_substatus' => $trip->keluar_trip_substatus,
        ];
    }
}
