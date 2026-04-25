<?php

namespace App\Http\Controllers\TripPlanning;

use App\Http\Controllers\Controller;
use App\Http\Requests\TripPlanning\CreateTripManualRequest;
use App\Http\Requests\TripPlanning\DeleteTripManualRequest;
use App\Http\Requests\TripPlanning\EditTripManualRequest;
use App\Services\TripCrudService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Arr;

/**
 * Trip Manual CRUD endpoints — Feature E5.
 *
 * Thin controller — semua business logic + invariant + optimistic lock di
 * TripCrudService → TripService. Exception self-render (TripSlotConflict /
 * TripVersion / TripEdit/Delete-NotAllowed) — controller TIDAK try-catch.
 *
 * Routes (di routes/api.php + routes/web.php mirror):
 *   POST   /api/trip-planning/trips                       (store)
 *   PUT    /api/trip-planning/trips/{trip}                (update)
 *   DELETE /api/trip-planning/trips/{trip}                (destroy)
 *   GET    /api/trip-planning/trips/{trip}/bookings-count (bookingsCount)
 */
class TripCrudController extends Controller
{
    public function __construct(
        private readonly TripCrudService $tripCrudService,
    ) {}

    public function store(CreateTripManualRequest $request): JsonResponse
    {
        $trip = $this->tripCrudService->createManual(
            $request->validated(),
            $request->user()->id,
        );

        return response()->json([
            'success' => true,
            'message' => 'Trip berhasil dibuat.',
            'data' => $trip->load(['mobil', 'driver']),
        ], 201);
    }

    public function update(EditTripManualRequest $request, int $trip): JsonResponse
    {
        $payload = Arr::except($request->validated(), ['version']);
        $version = (int) $request->validated('version');

        $updated = $this->tripCrudService->editManual(
            $trip,
            $version,
            $payload,
            $request->user()->id,
        );

        return response()->json([
            'success' => true,
            'message' => 'Trip berhasil diupdate.',
            'data' => $updated->load(['mobil', 'driver']),
        ]);
    }

    public function destroy(DeleteTripManualRequest $request, int $trip): JsonResponse
    {
        $this->tripCrudService->deleteManual(
            $trip,
            (int) $request->validated('version'),
            $request->user()->id,
        );

        return response()->json([
            'success' => true,
            'message' => 'Trip berhasil dihapus.',
        ]);
    }

    public function bookingsCount(int $trip): JsonResponse
    {
        return response()->json([
            'trip_id' => $trip,
            'bookings_count' => $this->tripCrudService->countLinkedBookings($trip),
        ]);
    }
}
