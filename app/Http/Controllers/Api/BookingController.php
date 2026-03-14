<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Booking\StoreBookingRequest;
use App\Http\Requests\Booking\UpdateBookingRequest;
use App\Models\Booking;
use App\Models\User;
use App\Services\BookingManagementService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class BookingController extends Controller
{
    public function index(Request $request, BookingManagementService $service): JsonResponse
    {
        $page = max(1, (int) $request->query('page', 1));
        $limit = max(1, (int) $request->query('limit', 10));

        $items = $service->filteredQuery($request)
            ->orderByDesc('trip_date')
            ->orderByDesc('trip_time')
            ->orderByDesc('created_at')
            ->forPage($page, $limit)
            ->get()
            ->map(fn (Booking $booking): array => $service->listPayload($booking))
            ->values();

        return response()->json($items);
    }

    public function count(Request $request, BookingManagementService $service): JsonResponse
    {
        return response()->json([
            'count' => $service->filteredQuery($request)->count(),
        ]);
    }

    public function show(Request $request, string $booking, BookingManagementService $service): JsonResponse
    {
        $this->actor($request);

        return response()->json(
            $service->detailPayload($this->findBooking($booking)),
        );
    }

    public function store(StoreBookingRequest $request, BookingManagementService $service): JsonResponse
    {
        $this->actor($request);

        $booking = $service->createBooking($request->validated());

        return response()->json($service->detailPayload($booking), 201);
    }

    public function update(UpdateBookingRequest $request, string $booking, BookingManagementService $service): JsonResponse
    {
        $this->actor($request);

        $updatedBooking = $service->updateBooking($this->findBooking($booking), $request->validated());

        return response()->json($service->detailPayload($updatedBooking));
    }

    public function destroy(Request $request, string $booking, BookingManagementService $service): JsonResponse
    {
        $this->actor($request);

        $service->deleteBooking($this->findBooking($booking));

        return response()->json([
            'message' => 'Data pemesanan berhasil dihapus',
        ]);
    }

    protected function actor(Request $request): User
    {
        $user = $request->user();

        if (! $user instanceof User) {
            throw new HttpException(403, 'Akses ditolak');
        }

        return $user;
    }

    protected function findBooking(string $id): Booking
    {
        $booking = Booking::query()->find($id);

        if (! $booking) {
            throw new HttpException(404, 'Data pemesanan tidak ditemukan');
        }

        return $booking;
    }
}
