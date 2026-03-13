<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\BookingPassenger;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class RegulerBookingController extends Controller
{
    protected function regulerStops(): array
    {
        return [
            ['key' => 'Rokan Hulu', 'label' => 'Rokan Hulu'],
            ['key' => 'Pekanbaru', 'label' => 'Pekanbaru'],
            ['key' => 'Ujung Batu', 'label' => 'Ujung Batu'],
            ['key' => 'Pasir Pengaraian', 'label' => 'Pasir Pengaraian'],
            ['key' => 'Bangkinang', 'label' => 'Bangkinang'],
        ];
    }

    protected function regulerTariffs(): array
    {
        return [
            'Rokan Hulu|Pekanbaru' => 150000,
            'Pekanbaru|Rokan Hulu' => 150000,
            'Ujung Batu|Pekanbaru' => 130000,
            'Pekanbaru|Ujung Batu' => 130000,
            'Pasir Pengaraian|Pekanbaru' => 150000,
            'Pekanbaru|Pasir Pengaraian' => 150000,
            'Bangkinang|Pekanbaru' => 80000,
            'Pekanbaru|Bangkinang' => 80000,
        ];
    }

    protected function allSeats(): array
    {
        return ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    }

    protected function normalizeSeat(string $seat): string
    {
        return Str::upper(trim($seat));
    }

    protected function normalizeTime(string $time): string
    {
        return strlen($time) === 5 ? $time . ':00' : $time;
    }

    protected function routeKey(string $from, string $to): string
    {
        return trim($from) . '|' . trim($to);
    }

    protected function resolvePricePerSeat(string $from, string $to): int
    {
        $tariffs = $this->regulerTariffs();
        $key = $this->routeKey($from, $to);

        return (int) ($tariffs[$key] ?? 0);
    }

    protected function makeBookingCode(): string
    {
        do {
            $code = 'LKT-' . now()->format('Ymd') . '-' . Str::upper(Str::random(5));
        } while (Booking::query()->where('booking_code', $code)->exists());

        return $code;
    }

    protected function formatBookingPayload(Booking $booking): array
    {
        return [
            'id' => $booking->id,
            'bookingId' => $booking->id,
            'bookingCode' => $booking->booking_code,
            'category' => $booking->category,
            'from' => $booking->from_city,
            'to' => $booking->to_city,
            'date' => $booking->trip_date?->format('Y-m-d'),
            'time' => $booking->trip_time ? substr((string) $booking->trip_time, 0, 5) : null,
            'bookingFor' => $booking->booking_for,
            'passengerName' => $booking->passenger_name,
            'passengerPhone' => $booking->passenger_phone,
            'passengerCount' => (int) $booking->passenger_count,
            'pickupLocation' => $booking->pickup_location,
            'dropoffLocation' => $booking->dropoff_location,
            'selectedSeats' => $booking->selected_seats ?? [],
            'pricePerSeat' => (float) $booking->price_per_seat,
            'totalAmount' => (float) $booking->total_amount,
            'routeLabel' => $booking->route_label,
            'paymentMethod' => $booking->payment_method,
            'paymentStatus' => $booking->payment_status,
            'bookingStatus' => $booking->booking_status,
            'passengers' => $booking->passengers->map(function (BookingPassenger $item) {
                return [
                    'id' => $item->id,
                    'seat' => $item->seat_no,
                    'selectedSeats' => $item->seat_no,
                    'name' => $item->name,
                    'phone' => $item->phone,
                    'ticketStatus' => $item->ticket_status,
                ];
            })->values(),
        ];
    }

    protected function formatPassengersPayload(Booking $booking): array
    {
        return $booking->passengers->map(function (BookingPassenger $item) use ($booking) {
            return [
                'id' => $item->id,
                'bookingId' => $booking->id,
                'bookingCode' => $booking->booking_code,
                'name' => $item->name,
                'phone' => $item->phone,
                'seat' => $item->seat_no,
                'selectedSeats' => $item->seat_no,
                'ticketStatus' => $item->ticket_status,
            ];
        })->values()->all();
    }

    public function stops(): JsonResponse
    {
        return response()->json($this->regulerStops());
    }

    public function seats(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'from' => ['required', 'string', 'max:100'],
            'to' => ['required', 'string', 'max:100'],
            'date' => ['required', 'date'],
            'time' => ['required', 'date_format:H:i'],
        ]);

        $tripTime = $this->normalizeTime($validated['time']);

        $bookedSeats = BookingPassenger::query()
            ->whereHas('booking', function ($query) use ($validated, $tripTime) {
                $query->where('category', 'Reguler')
                    ->where('from_city', trim($validated['from']))
                    ->where('to_city', trim($validated['to']))
                    ->whereDate('trip_date', $validated['date'])
                    ->where('trip_time', $tripTime)
                    ->whereNotIn('booking_status', ['Cancelled'])
                    ->whereNotIn('payment_status', ['Ditolak']);
            })
            ->pluck('seat_no')
            ->filter()
            ->map(fn (?string $seat) => $this->normalizeSeat((string) $seat))
            ->values()
            ->all();

        $result = collect($this->allSeats())->map(function (string $seat) use ($bookedSeats) {
            $isBooked = in_array($seat, $bookedSeats, true);

            return [
                'id' => $seat,
                'seat' => $seat,
                'label' => $seat,
                'available' => ! $isBooked,
                'status' => $isBooked ? 'booked' : 'available',
            ];
        })->values();

        return response()->json($result);
    }

    public function quote(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'category' => ['nullable', 'string'],
            'from' => ['required', 'string', 'max:100'],
            'to' => ['required', 'string', 'max:100', 'different:from'],
            'date' => ['required', 'date'],
            'time' => ['required', 'date_format:H:i'],
            'selectedSeats' => ['required', 'array', 'min:1', 'max:6'],
            'selectedSeats.*' => ['required', 'string', 'max:10'],
            'passengerCount' => ['nullable', 'integer', 'min:1', 'max:6'],
        ]);

        $selectedSeats = collect($validated['selectedSeats'])
            ->map(fn (string $seat) => $this->normalizeSeat($seat))
            ->unique()
            ->values()
            ->all();

        $pricePerSeat = $this->resolvePricePerSeat($validated['from'], $validated['to']);

        if ($pricePerSeat <= 0) {
            return response()->json([
                'message' => 'Tarif untuk rute ini belum tersedia.',
            ], 422);
        }

        return response()->json([
            'category' => 'Reguler',
            'route' => trim($validated['from']) . ' - ' . trim($validated['to']),
            'pricePerSeat' => $pricePerSeat,
            'passengerCount' => count($selectedSeats),
            'total' => $pricePerSeat * count($selectedSeats),
            'selectedSeats' => $selectedSeats,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'category' => ['nullable', 'string'],
            'from' => ['required', 'string', 'max:100'],
            'to' => ['required', 'string', 'max:100', 'different:from'],
            'date' => ['required', 'date'],
            'time' => ['required', 'date_format:H:i'],
            'bookingFor' => ['nullable', 'string', Rule::in(['self', 'other'])],
            'passengerName' => ['required', 'string', 'max:150'],
            'passengerPhone' => ['required', 'string', 'max:30'],
            'pickupLocation' => ['nullable', 'string', 'max:255'],
            'dropoffLocation' => ['nullable', 'string', 'max:255'],
            'selectedSeats' => ['required', 'array', 'min:1', 'max:6'],
            'selectedSeats.*' => ['required', 'string', 'max:10'],
            'passengers' => ['required', 'array', 'min:1', 'max:6'],
            'passengers.*.seat' => ['required', 'string', 'max:10'],
            'passengers.*.name' => ['required', 'string', 'max:150'],
            'passengers.*.phone' => ['nullable', 'string', 'max:30'],
        ]);

        $selectedSeats = collect($validated['selectedSeats'])
            ->map(fn (string $seat) => $this->normalizeSeat($seat))
            ->unique()
            ->values();

        if ($selectedSeats->count() !== count($validated['selectedSeats'])) {
            return response()->json([
                'message' => 'Seat duplikat tidak diperbolehkan.',
            ], 422);
        }

        if ($selectedSeats->diff($this->allSeats())->isNotEmpty()) {
            return response()->json([
                'message' => 'Ada seat yang tidak valid.',
            ], 422);
        }

        $passengers = collect($validated['passengers'])->map(function (array $item) {
            return [
                'seat' => $this->normalizeSeat($item['seat']),
                'name' => trim($item['name']),
                'phone' => trim((string) ($item['phone'] ?? '')),
            ];
        });

        if ($passengers->count() !== $selectedSeats->count()) {
            return response()->json([
                'message' => 'Jumlah penumpang harus sama dengan jumlah seat.',
            ], 422);
        }

        $passengerSeatList = $passengers->pluck('seat')->unique()->values();

        if ($passengerSeatList->count() !== $selectedSeats->count()) {
            return response()->json([
                'message' => 'Seat penumpang tidak boleh duplikat.',
            ], 422);
        }

        if ($passengerSeatList->sort()->values()->all() !== $selectedSeats->sort()->values()->all()) {
            return response()->json([
                'message' => 'Seat penumpang harus sama dengan seat yang dipilih.',
            ], 422);
        }

        $pricePerSeat = $this->resolvePricePerSeat($validated['from'], $validated['to']);

        if ($pricePerSeat <= 0) {
            return response()->json([
                'message' => 'Tarif untuk rute ini belum tersedia.',
            ], 422);
        }

        $tripTime = $this->normalizeTime($validated['time']);

        $alreadyBooked = BookingPassenger::query()
            ->whereHas('booking', function ($query) use ($validated, $tripTime) {
                $query->where('category', 'Reguler')
                    ->where('from_city', trim($validated['from']))
                    ->where('to_city', trim($validated['to']))
                    ->whereDate('trip_date', $validated['date'])
                    ->where('trip_time', $tripTime)
                    ->whereNotIn('booking_status', ['Cancelled'])
                    ->whereNotIn('payment_status', ['Ditolak']);
            })
            ->pluck('seat_no')
            ->map(fn (?string $seat) => $this->normalizeSeat((string) $seat))
            ->all();

        $conflictSeats = $selectedSeats
            ->filter(fn (string $seat) => in_array($seat, $alreadyBooked, true))
            ->values();

        if ($conflictSeats->isNotEmpty()) {
            return response()->json([
                'message' => 'Seat sudah dibooking: ' . $conflictSeats->implode(', '),
                'conflictSeats' => $conflictSeats->all(),
            ], 422);
        }

        $totalAmount = $pricePerSeat * $selectedSeats->count();

        $booking = DB::transaction(function () use ($validated, $selectedSeats, $passengers, $pricePerSeat, $totalAmount, $tripTime) {
            $booking = Booking::query()->create([
                'booking_code' => $this->makeBookingCode(),
                'category' => 'Reguler',
                'from_city' => trim($validated['from']),
                'to_city' => trim($validated['to']),
                'trip_date' => $validated['date'],
                'trip_time' => $tripTime,
                'booking_for' => $validated['bookingFor'] ?? 'self',
                'passenger_name' => trim($validated['passengerName']),
                'passenger_phone' => trim($validated['passengerPhone']),
                'passenger_count' => $selectedSeats->count(),
                'pickup_location' => trim((string) ($validated['pickupLocation'] ?? '')),
                'dropoff_location' => trim((string) ($validated['dropoffLocation'] ?? '')),
                'selected_seats' => $selectedSeats->all(),
                'price_per_seat' => $pricePerSeat,
                'total_amount' => $totalAmount,
                'route_label' => trim($validated['from']) . ' - ' . trim($validated['to']),
                'payment_status' => 'Belum Bayar',
                'booking_status' => 'Confirmed',
            ]);

            foreach ($passengers as $passenger) {
                BookingPassenger::query()->create([
                    'booking_id' => $booking->id,
                    'seat_no' => $passenger['seat'],
                    'name' => $passenger['name'],
                    'phone' => $passenger['phone'],
                    'ticket_status' => 'Draft',
                ]);
            }

            return $booking->load('passengers');
        });

        return response()->json([
            'message' => 'Booking reguler berhasil dibuat.',
            'bookingId' => $booking->id,
            'bookingCode' => $booking->booking_code,
            'category' => $booking->category,
            'route' => $booking->route_label,
            'pricePerSeat' => (float) $booking->price_per_seat,
            'passengerCount' => (int) $booking->passenger_count,
            'total' => (float) $booking->total_amount,
            'paymentStatus' => $booking->payment_status,
            'paymentMethod' => $booking->payment_method,
            'selectedSeats' => $booking->selected_seats,
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $booking = Booking::query()->with('passengers')->findOrFail($id);

        return response()->json($this->formatBookingPayload($booking));
    }

    public function passengers(int $id): JsonResponse
    {
        $booking = Booking::query()->with('passengers')->findOrFail($id);

        return response()->json($this->formatPassengersPayload($booking));
    }
}
