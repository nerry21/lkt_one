<?php

namespace App\Http\Controllers\TripPlanning;

use App\Exceptions\TripGenerationDriverMissingException;
use App\Http\Controllers\Controller;
use App\Http\Requests\TripPlanning\GenerateTripRequest;
use App\Models\DailyDriverAssignment;
use App\Models\Trip;
use App\Services\TripGenerationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

/**
 * Dashboard endpoints untuk Trip Planning admin UI (Fase D2 Sesi 22).
 *
 * Thin HTTP adapter — all business logic delegated to services already in main.
 *
 * Endpoints:
 *   GET  /dashboard/trip-planning/dashboard?date=YYYY-MM-DD
 *   GET  /dashboard/trip-planning/trips?date=...&direction=...&status=...&page=N&per_page=M
 *   POST /dashboard/trip-planning/generate     (body: {date})
 *
 * Middleware: jwt.auth + admin.role:admin.
 */
class TripPlanningPageController extends Controller
{
    private const ACTIVE_STATUSES = ['berangkat', 'keluar_trip'];

    public function __construct(
        private readonly TripGenerationService $tripGeneration,
    ) {}

    /**
     * Composite initial-load response.
     *
     * Shape:
     *   {
     *     date, statistics: {per_mobil[], totals},
     *     trips_pkb_to_rohul[], trips_rohul_to_pkb[],
     *     assignments_tomorrow[]
     *   }
     */
    public function dashboard(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'date' => ['required', 'date'],
        ]);

        $date = $validated['date'];
        $tomorrow = Carbon::parse($date)->addDay()->toDateString();

        $trips = Trip::query()
            ->where('trip_date', $date)
            ->with(['mobil:id,kode_mobil,home_pool', 'driver:id,nama'])
            ->orderBy('direction')
            ->orderBy('sequence')
            ->get();

        return response()->json([
            'date' => $date,
            'statistics' => $this->buildStatistics($trips),
            'trips_pkb_to_rohul' => $trips
                ->where('direction', 'PKB_TO_ROHUL')
                ->map(fn ($t) => $this->summarizeTrip($t))
                ->values(),
            'trips_rohul_to_pkb' => $trips
                ->where('direction', 'ROHUL_TO_PKB')
                ->map(fn ($t) => $this->summarizeTrip($t))
                ->values(),
            'assignments_tomorrow' => $this->fetchAssignments($tomorrow),
        ]);
    }

    /**
     * Filtered trip list with pagination. For user-triggered filter/pagination
     * after initial dashboard load.
     */
    public function trips(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'date' => ['required', 'date'],
            'direction' => ['nullable', 'string', 'in:PKB_TO_ROHUL,ROHUL_TO_PKB'],
            'status' => ['nullable', 'string', 'in:scheduled,berangkat,tidak_berangkat,keluar_trip,tidak_keluar_trip'],
            'page' => ['nullable', 'integer', 'min:1'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
        ]);

        $query = Trip::query()
            ->where('trip_date', $validated['date'])
            ->with(['mobil:id,kode_mobil,home_pool', 'driver:id,nama']);

        if (! empty($validated['direction'])) {
            $query->where('direction', $validated['direction']);
        }

        if (! empty($validated['status'])) {
            $query->where('status', $validated['status']);
        }

        $perPage = $validated['per_page'] ?? 20;
        $paginated = $query
            ->orderBy('direction')
            ->orderBy('sequence')
            ->paginate($perPage);

        return response()->json([
            'data' => $paginated->getCollection()
                ->map(fn ($t) => $this->summarizeTrip($t))
                ->values(),
            'meta' => [
                'current_page' => $paginated->currentPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
                'last_page' => $paginated->lastPage(),
            ],
        ]);
    }

    /**
     * Manual trigger TripGenerationService (scheduler fallback or admin regenerate).
     *
     * Fetches driver mapping from daily_driver_assignments for the target date.
     * Propagates TripGenerationDriverMissingException as 422 with error_code +
     * details per Sesi 20 DP-8 (custom-extended Laravel format).
     */
    public function generate(GenerateTripRequest $request): JsonResponse
    {
        $date = $request->validated('date');

        $assignments = DailyDriverAssignment::query()
            ->where('date', $date)
            ->pluck('driver_id', 'mobil_id')
            ->toArray();

        try {
            $result = $this->tripGeneration->generateForDate($date, $assignments);
        } catch (TripGenerationDriverMissingException $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'error_code' => 'TRIP_GENERATION_DRIVER_MISSING',
                'details' => [
                    'date' => $date,
                    'missing_mobil_ids' => $e->missingMobilIds,
                ],
            ], 422);
        }

        return response()->json([
            'date' => $date,
            'result' => $result,
        ]);
    }

    /**
     * PP counting per mobil per date. 1 PP = pulang-pergi starting dari ROHUL.
     * Formula:
     *   0.5 × count(ROHUL_TO_PKB with berangkat/keluar_trip)
     * + 0.5 × count(PKB_TO_ROHUL with berangkat/keluar_trip AND matching
     *               ROHUL_TO_PKB active same day same mobil)
     */
    private function buildStatistics($trips): array
    {
        $perMobilStats = [];

        foreach ($trips->groupBy('mobil_id') as $mobilId => $mobilTrips) {
            $mobil = $mobilTrips->first()->mobil;

            $activeRohulDeparture = $mobilTrips
                ->where('direction', 'ROHUL_TO_PKB')
                ->whereIn('status', self::ACTIVE_STATUSES);

            $activePkbReturn = $mobilTrips
                ->where('direction', 'PKB_TO_ROHUL')
                ->whereIn('status', self::ACTIVE_STATUSES);

            $ppCount = 0.5 * $activeRohulDeparture->count();

            if ($activeRohulDeparture->isNotEmpty()) {
                $ppCount += 0.5 * $activePkbReturn->count();
            }

            $perMobilStats[] = [
                'mobil_id' => $mobilId,
                'kode_mobil' => $mobil?->kode_mobil ?? 'unknown',
                'pp_count' => $ppCount,
            ];
        }

        return [
            'per_mobil' => $perMobilStats,
            'total_berangkat' => $trips->where('status', 'berangkat')->count(),
            'total_tidak_berangkat' => $trips->where('status', 'tidak_berangkat')->count(),
            'total_keluar_trip' => $trips->where('status', 'keluar_trip')->count(),
            'total_tidak_keluar_trip' => $trips->where('status', 'tidak_keluar_trip')->count(),
            'total_scheduled' => $trips->where('status', 'scheduled')->count(),
        ];
    }

    private function summarizeTrip(Trip $trip): array
    {
        $keluarTripDetail = null;
        if ($trip->status === 'keluar_trip') {
            $keluarTripDetail = [
                'substatus' => $trip->keluar_trip_substatus,
                'reason' => $trip->keluar_trip_reason,
                'note' => $trip->keluar_trip_note,
                'pool_target' => $trip->keluar_trip_pool_target,
                'start_date' => $trip->keluar_trip_start_date?->toDateString(),
                'planned_end_date' => $trip->keluar_trip_planned_end_date?->toDateString(),
                'pool_entered_at' => $trip->keluar_trip_pool_entered_at?->toDateTimeString(),
            ];
        }

        return [
            'id' => $trip->id,
            'version' => $trip->version,
            'trip_date' => $trip->trip_date?->toDateString(),
            'trip_time' => $trip->trip_time,
            'direction' => $trip->direction,
            'sequence' => $trip->sequence,
            'status' => $trip->status,
            'original_trip_time' => $trip->original_trip_time,
            'mobil' => $trip->mobil ? [
                'id' => $trip->mobil->id,
                'kode_mobil' => $trip->mobil->kode_mobil,
            ] : null,
            'driver' => $trip->driver ? [
                'id' => $trip->driver->id,
                'nama' => $trip->driver->nama,
            ] : null,
            'keluar_trip_detail' => $keluarTripDetail,
        ];
    }

    private function fetchAssignments(string $date): array
    {
        return DailyDriverAssignment::query()
            ->where('date', $date)
            ->with(['mobil:id,kode_mobil,home_pool', 'driver:id,nama'])
            ->get()
            ->map(fn ($a) => [
                'mobil_id' => $a->mobil_id,
                'driver_id' => $a->driver_id,
                'kode_mobil' => $a->mobil?->kode_mobil,
                'driver_nama' => $a->driver?->nama,
            ])
            ->toArray();
    }
}
