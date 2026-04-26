<?php

namespace App\Http\Controllers\TripPlanning;

use App\Http\Controllers\Controller;
use App\Http\Requests\TripPlanning\ResetTripDataRequest;
use App\Services\TripPlanning\ResetTripDataService;
use Illuminate\Http\JsonResponse;

/**
 * Endpoints untuk reset Trip Planning data.
 *
 * Routes (di routes/api.php + routes/web.php mirror):
 *   POST /trip-planning/reset/today    body: {date}    middleware: admin
 *   POST /trip-planning/reset/all      body: {}        middleware: super admin
 */
class ResetTripDataController extends Controller
{
    public function __construct(
        private readonly ResetTripDataService $service,
    ) {}

    public function resetToday(ResetTripDataRequest $request): JsonResponse
    {
        $userId = $request->user()->id;
        $date = $request->validated('date');

        $summary = $this->service->resetForDate($date, $userId);

        return response()->json([
            'success' => true,
            'message' => 'Data trip planning untuk tanggal '.$date.' berhasil di-reset.',
            'summary' => $summary,
        ]);
    }

    public function resetAll(ResetTripDataRequest $request): JsonResponse
    {
        $userId = $request->user()->id;

        $summary = $this->service->resetAll($userId);

        return response()->json([
            'success' => true,
            'message' => 'Semua data trip planning berhasil di-reset.',
            'summary' => $summary,
        ]);
    }
}
