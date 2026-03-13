<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Departure;
use App\Models\Driver;
use App\Models\Mobil;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class AdminDepartureController extends Controller
{
    protected function makeDepartureCode(): string
    {
        do {
            $code = 'DEP-' . now()->format('Ymd') . '-' . Str::upper(Str::random(4));
        } while (Departure::query()->where('departure_code', $code)->exists());

        return $code;
    }

    protected function makeSuratJalanNumber(): string
    {
        $romanMonths = [
            1 => 'I',
            2 => 'II',
            3 => 'III',
            4 => 'IV',
            5 => 'V',
            6 => 'VI',
            7 => 'VII',
            8 => 'VIII',
            9 => 'IX',
            10 => 'X',
            11 => 'XI',
            12 => 'XII',
        ];

        $now = now();
        $sequence = Departure::query()
            ->whereYear('created_at', $now->year)
            ->whereMonth('created_at', $now->month)
            ->count() + 1;

        do {
            $number = str_pad((string) $sequence, 3, '0', STR_PAD_LEFT)
                . '/SJ-LKT/'
                . $romanMonths[(int) $now->format('n')]
                . '/'
                . $now->format('Y');

            $sequence++;
        } while (Departure::query()->where('surat_jalan_number', $number)->exists());

        return $number;
    }

    protected function normalizeTime(string $time): string
    {
        return strlen($time) === 5 ? $time . ':00' : substr($time, 0, 8);
    }

    public function index(): View
    {
        $departures = Departure::query()
            ->with(['driver', 'vehicle'])
            ->withCount('bookings')
            ->orderByDesc('trip_date')
            ->orderByDesc('trip_time')
            ->paginate(15);

        return view('admin.departures.index', [
            'departures' => $departures,
            'pageTitle' => 'Manifest Driver | Lancang Kuning Travelindo',
            'guardMode' => 'protected',
            'pageHeading' => 'Manifest Driver',
            'pageDescription' => 'Kelola keberangkatan, driver, armada, dan manifest penumpang',
        ]);
    }

    public function create(): View
    {
        $drivers = Driver::query()
            ->where('status', 'Active')
            ->orderBy('nama')
            ->get();

        $vehicles = Mobil::query()
            ->where('status', 'Ready')
            ->orderBy('kode_mobil')
            ->get();

        return view('admin.departures.create', [
            'drivers' => $drivers,
            'vehicles' => $vehicles,
            'pageTitle' => 'Buat Keberangkatan | Lancang Kuning Travelindo',
            'guardMode' => 'protected',
            'pageHeading' => 'Buat Keberangkatan',
            'pageDescription' => 'Tetapkan jadwal, driver, armada, dan status manifest',
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'trip_date' => ['required', 'date'],
            'trip_time' => ['required', 'date_format:H:i'],
            'from_city' => ['required', 'string', 'max:100'],
            'to_city' => ['required', 'string', 'max:100', 'different:from_city'],
            'driver_id' => ['required', 'string', 'exists:drivers,id'],
            'mobil_id' => ['required', 'string', 'exists:mobil,id'],
            'status' => ['required', 'string', Rule::in(['Draft', 'Ready', 'On Trip', 'Completed', 'Cancelled'])],
            'notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $departure = Departure::query()->create([
            'departure_code' => $this->makeDepartureCode(),
            'surat_jalan_number' => $this->makeSuratJalanNumber(),
            'surat_jalan_issued_at' => now(),
            'trip_date' => $validated['trip_date'],
            'trip_time' => $validated['trip_time'],
            'from_city' => trim($validated['from_city']),
            'to_city' => trim($validated['to_city']),
            'route_label' => trim($validated['from_city']) . ' - ' . trim($validated['to_city']),
            'driver_id' => $validated['driver_id'],
            'mobil_id' => $validated['mobil_id'],
            'status' => $validated['status'],
            'notes' => $validated['notes'] ?? null,
        ]);

        return redirect()
            ->route('admin.departures.show', $departure->id)
            ->with('success', 'Keberangkatan berhasil dibuat.');
    }

    public function show(string $id): View
    {
        $departure = Departure::query()
            ->with(['driver', 'vehicle', 'bookings.passengers.checker', 'passengers'])
            ->findOrFail($id);

        $availableBookings = Booking::query()
            ->with('passengers')
            ->where('payment_status', 'Lunas')
            ->where('ticket_status', 'Active')
            ->whereNull('departure_id')
            ->whereDate('trip_date', $departure->trip_date)
            ->where('trip_time', $this->normalizeTime((string) $departure->trip_time))
            ->where('from_city', $departure->from_city)
            ->where('to_city', $departure->to_city)
            ->orderBy('id')
            ->get();

        return view('admin.departures.show', [
            'departure' => $departure,
            'availableBookings' => $availableBookings,
            'pageTitle' => 'Detail Keberangkatan | Lancang Kuning Travelindo',
            'guardMode' => 'protected',
            'pageHeading' => 'Detail Keberangkatan',
            'pageDescription' => 'Atur manifest penumpang untuk keberangkatan ini',
        ]);
    }

    public function assignBooking(Request $request, string $id): RedirectResponse
    {
        $validated = $request->validate([
            'booking_ids' => ['required', 'array', 'min:1'],
            'booking_ids.*' => ['required', 'integer', 'exists:bookings,id'],
        ]);

        $departure = Departure::query()->findOrFail($id);

        Booking::query()
            ->whereIn('id', $validated['booking_ids'])
            ->where('payment_status', 'Lunas')
            ->where('ticket_status', 'Active')
            ->whereNull('departure_id')
            ->whereDate('trip_date', $departure->trip_date)
            ->where('trip_time', $this->normalizeTime((string) $departure->trip_time))
            ->where('from_city', $departure->from_city)
            ->where('to_city', $departure->to_city)
            ->update([
                'departure_id' => $departure->id,
            ]);

        return redirect()
            ->route('admin.departures.show', $departure->id)
            ->with('success', 'Booking berhasil dimasukkan ke manifest.');
    }

    public function removeBooking(string $id, int $bookingId): RedirectResponse
    {
        $departure = Departure::query()->findOrFail($id);

        $booking = Booking::query()
            ->where('departure_id', $departure->id)
            ->findOrFail($bookingId);

        $booking->update([
            'departure_id' => null,
        ]);

        return redirect()
            ->route('admin.departures.show', $departure->id)
            ->with('success', 'Booking berhasil dikeluarkan dari manifest.');
    }
}
