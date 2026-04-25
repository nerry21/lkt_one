<?php

namespace App\Http\Controllers\TripPlanning;

use App\Http\Controllers\Controller;
use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use App\Services\TripStatsService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\View\View;

/**
 * Render Blade view dashboard Trip Planning (Fase E1 Sesi 25).
 *
 * Read-only foundation: statistik per mobil + daftar trip untuk tanggal
 * tertentu. Data hydrated ke inline JSON script tag agar E2 berikutnya
 * bisa consume state tanpa refetch. Aksi tombol (berangkat, keluar trip,
 * dsb.) defer ke E2/E3.
 *
 * Per-mobil statistics delegated ke TripStatsService (Fase E5d Sesi 32),
 * shape identik dengan API refetch payload supaya dashboard konsisten antara
 * initial load dan post-action refetch.
 */
class TripPlanningDashboardViewController extends Controller
{
    public function __construct(
        private readonly TripStatsService $tripStatsService,
    ) {}

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

        // Fase E5 guard: scan SDR pair trips di collection yang sama untuk build
        // lookup set origin IDs yang sudah paired. Single pass, zero extra query.
        // Consumed by formatTripForState untuk set flag has_same_day_return_pair.
        $pairedOriginIds = $trips
            ->whereNotNull('same_day_return_origin_trip_id')
            ->pluck('same_day_return_origin_trip_id')
            ->map(fn ($id) => (int) $id)
            ->all();

        $drivers = Driver::query()
            ->orderBy('nama')
            ->get(['id', 'nama']);

        // Fase E5 PR #2: dropdown source untuk modal Edit Trip — mobil hanya yang
        // aktif di trip planning (filter is_active_in_trip), driver semua.
        $mobilList = Mobil::query()
            ->where('is_active_in_trip', true)
            ->orderBy('kode_mobil')
            ->get(['id', 'kode_mobil']);

        $driverList = $drivers;

        $statistics = $this->tripStatsService->buildPerMobilStats($trips);

        $dashboardState = [
            'target_date' => $targetDate->toDateString(),
            'trips' => $trips->map(fn (Trip $trip) => $this->formatTripForState($trip, $pairedOriginIds))->all(),
            'statistics' => $statistics,
            'drivers' => $drivers,
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
            'pairedOriginIds' => $pairedOriginIds,
            'mobilList' => $mobilList,
            'driverList' => $driverList,
        ]);
    }

    /**
     * @param  array<int, int>  $pairedOriginIds  Lookup list dari origin trip IDs
     *   yang sudah punya SDR pair di tanggal yang sama. Digunakan untuk compute
     *   `has_same_day_return_pair` flag (Fase E5 guard post-pair visibility).
     *
     * @return array{id:int,mobil:array{id:?string,code:?string,home_pool:?string},driver:array{id:?string,name:?string},direction:string,sequence:int,trip_time:?string,status:string,keluar_trip_substatus:?string,same_day_return_origin_trip_id:?int,has_same_day_return_pair:bool}
     */
    private function formatTripForState(Trip $trip, array $pairedOriginIds = []): array
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
            // Fase E5: consumed by dashboard.js renderActionButtons untuk hide tombol
            // "Pulang Hari Ini" di origin trip yang sudah punya SDR pair. Field ini
            // nullable FK — null = belum paired, int value = id trip asal.
            'same_day_return_origin_trip_id' => $trip->same_day_return_origin_trip_id,
            // Fase E5 guard: TRUE jika trip ini adalah origin ROHUL→PKB yang sudah
            // punya SDR pair di collection tanggal yang sama. Consumed by dashboard.js
            // renderActionButtons sebagai guard visibility utama tombol "Pulang Hari
            // Ini". Berbeda dari same_day_return_origin_trip_id (yang di-set di SDR
            // pair trip, bukan origin).
            'has_same_day_return_pair' => in_array((int) $trip->id, $pairedOriginIds, true),
        ];
    }
}
