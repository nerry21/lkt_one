<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Booking\StoreBookingRequest;
use App\Http\Requests\Booking\UpdateBookingRequest;
use App\Models\Booking;
use App\Models\BookingArmadaExtra;
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

    public function occupiedSeats(Request $request): JsonResponse
    {
        $tripDate  = trim((string) $request->query('trip_date', ''));
        $tripTime  = trim((string) $request->query('trip_time', ''));
        $excludeId = trim((string) $request->query('exclude_id', ''));
        $fromCity  = trim((string) $request->query('from_city', ''));
        $toCity    = trim((string) $request->query('to_city', ''));
        $armadaIndex = max(1, (int) $request->query('armada_index', 1));

        if ($tripDate === '' || $tripTime === '') {
            return response()->json(['occupied_seats' => []]);
        }

        $timePrefix = strlen($tripTime) >= 5 ? substr($tripTime, 0, 5) : $tripTime;

        $occupied = Booking::query()
            ->where('trip_date', $tripDate)
            ->where('trip_time', 'like', $timePrefix . '%')
            // Treat NULL armada_index as armada 1 (backward-compat for records created before migration)
            ->where(function ($q) use ($armadaIndex): void {
                $q->where('armada_index', $armadaIndex);
                if ($armadaIndex === 1) {
                    $q->orWhereNull('armada_index');
                }
            })
            // Filter by route direction so different physical routes don't share seat availability
            ->when($fromCity !== '', fn ($q) => $q->where('from_city', $fromCity))
            ->when($toCity !== '', fn ($q) => $q->where('to_city', $toCity))
            ->when($excludeId !== '', fn ($q) => $q->where('id', '!=', $excludeId))
            ->get()
            ->flatMap(fn (Booking $b) => (array) ($b->selected_seats ?? []))
            ->unique()
            ->values()
            ->all();

        return response()->json(['occupied_seats' => $occupied]);
    }

    public function validatePayment(Request $request, string $booking): JsonResponse
    {
        $user   = $this->actor($request);
        $record = $this->findBooking($booking);

        $action = trim((string) $request->input('action', ''));
        $notes  = trim((string) $request->input('validation_notes', ''));

        $allowed = ['lunas', 'belum_lunas', 'ditolak'];
        if (! in_array($action, $allowed, true)) {
            return response()->json(['message' => 'Aksi validasi tidak valid'], 422);
        }

        $updates = match ($action) {
            'lunas'       => ['payment_status' => 'Lunas',     'booking_status' => 'Diproses', 'paid_at' => now()],
            'belum_lunas' => ['payment_status' => 'Belum Bayar', 'booking_status' => 'Draft',  'paid_at' => null],
            'ditolak'     => ['payment_status' => 'Ditolak',   'booking_status' => 'Draft',    'paid_at' => null],
        };

        $record->fill(array_merge($updates, [
            'validated_by'     => $user->id,
            'validated_at'     => now(),
            'validation_notes' => $notes !== '' ? $notes : null,
        ]))->save();

        return response()->json([
            'message' => match ($action) {
                'lunas'       => 'Pembayaran dikonfirmasi lunas',
                'belum_lunas' => 'Status dikembalikan ke belum bayar',
                'ditolak'     => 'Pembayaran ditolak',
            },
            'payment_status' => $record->payment_status,
            'booking_status' => $record->booking_status,
        ]);
    }

    public function updateDepartureStatus(Request $request, string $booking): JsonResponse
    {
        $this->actor($request);

        $record = $this->findBooking($booking);
        $status = trim((string) $request->input('departure_status', ''));

        $allowed = ['Berangkat', 'Tidak Berangkat', 'Di Oper', ''];

        if (! in_array($status, $allowed, true)) {
            return response()->json(['message' => 'Status keberangkatan tidak valid'], 422);
        }

        $record->update(['departure_status' => $status !== '' ? $status : null]);

        return response()->json(['message' => 'Status keberangkatan berhasil diperbarui', 'departure_status' => $status]);
    }

    public function slotAssign(Request $request, BookingManagementService $service): JsonResponse
    {
        $this->actor($request);

        $tripDate = trim((string) $request->input('trip_date', ''));
        $tripTime = trim((string) $request->input('trip_time', ''));
        $direction = trim((string) $request->input('direction', ''));
        $driverName = trim((string) $request->input('driver_name', ''));
        $driverId = $request->input('driver_id') ?: null;
        $armadaIndex = max(1, (int) $request->input('armada_index', 1));

        if ($tripDate === '' || $tripTime === '') {
            return response()->json(['message' => 'trip_date dan trip_time wajib diisi'], 422);
        }

        $timePrefix = strlen($tripTime) >= 5 ? substr($tripTime, 0, 5) : $tripTime;

        $query = Booking::query()
            ->where('trip_date', $tripDate)
            ->where('trip_time', 'like', $timePrefix . '%')
            ->where('armada_index', $armadaIndex);

        if ($direction === 'to_pkb') {
            $query->where('to_city', 'Pekanbaru');
        } elseif ($direction === 'from_pkb') {
            $query->where('from_city', 'Pekanbaru');
        }

        $query->update([
            'driver_name' => $driverName !== '' ? $driverName : null,
            'driver_id' => $driverId,
        ]);

        return response()->json(['message' => 'Driver berhasil diperbarui pada slot keberangkatan']);
    }

    public function armadaExtras(Request $request): JsonResponse
    {
        $date = trim((string) $request->query('date', ''));

        if ($date === '') {
            return response()->json([]);
        }

        $extras = BookingArmadaExtra::query()
            ->where('trip_date', $date)
            ->get()
            ->mapWithKeys(fn (BookingArmadaExtra $e) => [
                $e->trip_time => $e->max_armada_index,
            ]);

        return response()->json($extras);
    }

    public function upsertArmadaExtra(Request $request): JsonResponse
    {
        $this->actor($request);

        $tripDate  = trim((string) $request->input('trip_date', ''));
        $tripTime  = trim((string) $request->input('trip_time', ''));
        $armadaIndex = max(1, (int) $request->input('armada_index', 1));

        if ($tripDate === '' || $tripTime === '') {
            return response()->json(['message' => 'trip_date dan trip_time wajib diisi'], 422);
        }

        $extra = BookingArmadaExtra::query()
            ->firstOrNew(['trip_date' => $tripDate, 'trip_time' => $tripTime]);

        if ($armadaIndex > ($extra->max_armada_index ?? 0)) {
            $extra->max_armada_index = $armadaIndex;
            $extra->save();
        }

        return response()->json(['max_armada_index' => $extra->max_armada_index]);
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
