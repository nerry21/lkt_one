<?php

namespace App\Http\Controllers\RentalData;

use App\Exceptions\BookingVersionConflictException;
use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Driver;
use App\Models\Mobil;
use App\Services\DroppingBookingPersistenceService;
use App\Services\RentalBookingService;
use App\Services\RegularBookingPaymentService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class RentalDataPageController extends Controller
{
    public function index(Request $request): View
    {
        $query = Booking::query()
            ->where('category', 'Rental')
            ->orderByDesc('trip_date')
            ->orderByDesc('created_at');

        $search = trim((string) $request->get('search', ''));
        if ($search !== '') {
            $query->where(function ($q) use ($search): void {
                $q->where('passenger_name', 'like', "%{$search}%")
                  ->orWhere('passenger_phone', 'like', "%{$search}%")
                  ->orWhere('booking_code', 'like', "%{$search}%")
                  ->orWhere('from_city', 'like', "%{$search}%")
                  ->orWhere('to_city', 'like', "%{$search}%");
            });
        }

        $filterStatus = $request->get('status', '');
        if ($filterStatus !== '') {
            $query->where('payment_status', $filterStatus);
        }

        $bookings = $query->with(['driver', 'mobil'])->paginate(20)->withQueryString();

        $drivers = Driver::orderBy('nama')->get(['id', 'nama', 'lokasi']);
        $mobils  = Mobil::orderBy('kode_mobil')->get(['id', 'kode_mobil', 'jenis_mobil']);

        $stats = [
            'total'  => Booking::where('category', 'Rental')->count(),
            'paid'   => Booking::where('category', 'Rental')->whereIn('payment_status', ['Dibayar', 'Dibayar Tunai'])->count(),
            'unpaid' => Booking::where('category', 'Rental')->where('payment_status', 'Belum Bayar')->count(),
        ];

        return view('rental-data.index', [
            'pageTitle'       => 'Data Pemesanan Rental | JET (JAYA EXCECUTIVE TRANSPORT)',
            'pageScript'      => 'rental-data/index',
            'guardMode'       => 'protected',
            'pageHeading'     => 'Data Pemesanan Rental Mobil',
            'pageDescription' => 'Kelola seluruh data pemesanan rental mobil JET (JAYA EXCECUTIVE TRANSPORT).',
            'bookings'        => $bookings,
            'drivers'         => $drivers,
            'mobils'          => $mobils,
            'search'          => $search,
            'filterStatus'    => $filterStatus,
            'stats'           => $stats,
            'flashSuccess'    => $request->session()->get('rental_data_success'),
            'flashError'      => $request->session()->get('rental_data_error'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'passenger_name'   => ['required', 'string', 'max:100'],
            'passenger_phone'  => ['required', 'string', 'regex:/^08[1-9][0-9]{7,12}$/'],
            'from_city'        => ['required', 'string', 'max:255'],
            'to_city'          => ['required', 'string', 'max:255'],
            'pickup_location'  => ['required', 'string', 'min:5', 'max:255'],
            'dropoff_location' => ['required', 'string', 'min:5', 'max:255'],
            'price_per_seat'   => ['required', 'integer', 'min:0'],
            'additional_fare'  => ['nullable', 'integer', 'min:0'],
            'trip_date'        => ['required', 'date'],
            'rental_end_date'  => ['required', 'date', 'after_or_equal:trip_date'],
            'trip_time'        => ['required', 'date_format:H:i'],
            'return_trip_time' => ['nullable', 'date_format:H:i'],
            'notes'            => ['nullable', 'string', 'max:500'],
            'payment_method'   => ['nullable', 'string', 'in:transfer,qris,cash'],
            'payment_status'   => ['nullable', 'string'],
            'driver_id'        => ['nullable', 'uuid', 'exists:drivers,id'],
            'mobil_id'         => ['nullable', 'uuid', 'exists:mobil,id'],
        ], [
            'passenger_phone.regex'       => 'Nomor HP harus format Indonesia yang valid (08xxxxxxxxxx).',
            'trip_time.date_format'       => 'Jam keberangkatan harus format HH:MM.',
            'return_trip_time.date_format'=> 'Jam keberangkatan pulang harus format HH:MM.',
            'rental_end_date.after_or_equal' => 'Tanggal selesai harus sama atau setelah tanggal mulai.',
        ]);

        $phone = $this->normalizePhone((string) ($validated['passenger_phone'] ?? ''));

        DB::transaction(function () use ($validated, $phone): void {
            $bookingCode    = $this->generateBookingCode();
            $paymentMethod  = $validated['payment_method'] ?? null;
            $paymentStatus  = $validated['payment_status'] ?? 'Belum Bayar';
            $isPaid         = in_array($paymentStatus, ['Dibayar', 'Dibayar Tunai'], true);
            $bookingStatus  = $isPaid ? 'Aktif' : 'Draft';
            $ticketStatus   = $isPaid ? 'Aktif' : 'Draft';
            $pricePerSeat   = (int) $validated['price_per_seat'];
            $additionalFare = (int) ($validated['additional_fare'] ?? 0);
            $totalAmount    = $pricePerSeat + $additionalFare;

            $returnTripTime = isset($validated['return_trip_time']) && $validated['return_trip_time'] !== ''
                ? $validated['return_trip_time'] . ':00'
                : null;

            $booking = Booking::create([
                'booking_code'     => $bookingCode,
                'category'         => 'Rental',
                'from_city'        => trim($validated['from_city']),
                'to_city'          => trim($validated['to_city']),
                'route_label'      => trim($validated['from_city']) . ' - ' . trim($validated['to_city']),
                'trip_date'        => $validated['trip_date'],
                'trip_time'        => $validated['trip_time'] . ':00',
                'rental_end_date'  => $validated['rental_end_date'],
                'return_trip_time' => $returnTripTime,
                'booking_for'      => 'self',
                'passenger_name'   => trim($validated['passenger_name']),
                'passenger_phone'  => $phone,
                'passenger_count'  => 6,
                'pickup_location'  => trim($validated['pickup_location']),
                'dropoff_location' => trim($validated['dropoff_location']),
                'selected_seats'   => ['1A', '2A', '2B', '3A', '4A', '5A'],
                'price_per_seat'   => $pricePerSeat,
                'total_amount'     => $totalAmount,
                'nominal_payment'  => $isPaid ? $totalAmount : null,
                'payment_method'   => $paymentMethod,
                'payment_status'   => $paymentStatus,
                'booking_status'   => $bookingStatus,
                'ticket_status'    => $ticketStatus,
                'notes'            => $validated['notes'] ?? null,
                'driver_id'        => $validated['driver_id'] ?? null,
                'mobil_id'         => $validated['mobil_id'] ?? null,
            ]);

            $allSeats = ['1A', '2A', '2B', '3A', '4A', '5A'];
            $booking->passengers()->createMany(
                collect($allSeats)->map(fn (string $seat): array => [
                    'seat_no'       => $seat,
                    'name'          => trim($validated['passenger_name']),
                    'phone'         => $phone,
                    'ticket_status' => $ticketStatus,
                ])->all()
            );
        });

        return redirect()->route('rental-data.index')
            ->with('rental_data_success', 'Data pemesanan rental berhasil ditambahkan.');
    }

    public function update(Request $request, Booking $booking): RedirectResponse
    {
        abort_if($booking->category !== 'Rental', 404);

        $validated = $request->validate([
            'passenger_name'   => ['required', 'string', 'max:100'],
            'passenger_phone'  => ['required', 'string', 'regex:/^08[1-9][0-9]{7,12}$/'],
            'from_city'        => ['required', 'string', 'max:255'],
            'to_city'          => ['required', 'string', 'max:255'],
            'pickup_location'  => ['required', 'string', 'min:5', 'max:255'],
            'dropoff_location' => ['required', 'string', 'min:5', 'max:255'],
            'price_per_seat'   => ['required', 'integer', 'min:0'],
            'additional_fare'  => ['nullable', 'integer', 'min:0'],
            'trip_date'        => ['required', 'date'],
            'rental_end_date'  => ['required', 'date', 'after_or_equal:trip_date'],
            'trip_time'        => ['required', 'date_format:H:i'],
            'return_trip_time' => ['nullable', 'date_format:H:i'],
            'notes'            => ['nullable', 'string', 'max:500'],
            'payment_method'   => ['nullable', 'string', 'in:transfer,qris,cash'],
            'payment_status'   => ['nullable', 'string'],
            'driver_id'        => ['nullable', 'uuid', 'exists:drivers,id'],
            'mobil_id'         => ['nullable', 'uuid', 'exists:mobil,id'],
            'version'          => ['required', 'integer'],
        ], [
            'passenger_phone.regex'          => 'Nomor HP harus format Indonesia yang valid.',
            'trip_time.date_format'          => 'Jam keberangkatan harus format HH:MM.',
            'return_trip_time.date_format'   => 'Jam keberangkatan pulang harus format HH:MM.',
            'rental_end_date.after_or_equal' => 'Tanggal selesai harus sama atau setelah tanggal mulai.',
        ]);

        $expectedVersion = (int) $validated['version'];

        // Bug #38: optimistic lock pre-check. Mirror Api\BookingController::validatePayment.
        if ($booking->version !== $expectedVersion) {
            throw new BookingVersionConflictException($booking->id, $expectedVersion);
        }

        $phone = $this->normalizePhone((string) ($validated['passenger_phone'] ?? ''));

        DB::transaction(function () use ($booking, $validated, $phone, $expectedVersion): void {
            $paymentStatus  = $validated['payment_status'] ?? (string) ($booking->payment_status ?? 'Belum Bayar');
            $isPaid         = in_array($paymentStatus, ['Dibayar', 'Dibayar Tunai'], true);
            $pricePerSeat   = (int) $validated['price_per_seat'];
            $additionalFare = (int) ($validated['additional_fare'] ?? 0);
            $totalAmount    = $pricePerSeat + $additionalFare;

            $returnTripTime = isset($validated['return_trip_time']) && $validated['return_trip_time'] !== ''
                ? $validated['return_trip_time'] . ':00'
                : null;

            $attributes = [
                'from_city'        => trim($validated['from_city']),
                'to_city'          => trim($validated['to_city']),
                'route_label'      => trim($validated['from_city']) . ' - ' . trim($validated['to_city']),
                'trip_date'        => $validated['trip_date'],
                'trip_time'        => $validated['trip_time'] . ':00',
                'rental_end_date'  => $validated['rental_end_date'],
                'return_trip_time' => $returnTripTime,
                'passenger_name'   => trim($validated['passenger_name']),
                'passenger_phone'  => $phone,
                'pickup_location'  => trim($validated['pickup_location']),
                'dropoff_location' => trim($validated['dropoff_location']),
                'price_per_seat'   => $pricePerSeat,
                'total_amount'     => $totalAmount,
                'nominal_payment'  => $isPaid ? $totalAmount : $booking->nominal_payment,
                'payment_method'   => $validated['payment_method'] ?? $booking->payment_method,
                'payment_status'   => $paymentStatus,
                'notes'            => $validated['notes'] ?? null,
                'driver_id'        => $validated['driver_id'] ?? null,
                'mobil_id'         => $validated['mobil_id'] ?? null,
            ];

            // Atomic check-and-set (bug #38). Race guard bila admin lain bump version
            // antara pre-check dan sini. Failure rolls back passengers update juga.
            if (! $booking->updateWithVersionCheck($attributes, $expectedVersion)) {
                throw new BookingVersionConflictException($booking->id, $expectedVersion);
            }

            $booking->passengers()->update([
                'name'  => trim($validated['passenger_name']),
                'phone' => $phone,
            ]);
        });

        return redirect()->route('rental-data.index')
            ->with('rental_data_success', "Data {$booking->booking_code} berhasil diperbarui.");
    }

    public function destroy(Request $request, Booking $booking): RedirectResponse
    {
        abort_if($booking->category !== 'Rental', 404);

        // Bug #38: version wajib di query string (?version=N). Mirror DELETE API path.
        $versionRaw = $request->query('version');
        if ($versionRaw === null || ! is_numeric($versionRaw)) {
            return redirect()->route('rental-data.index')
                ->withErrors(['version' => 'Parameter version wajib dikirim.']);
        }
        $expectedVersion = (int) $versionRaw;

        $code = (string) $booking->booking_code;

        DB::transaction(function () use ($booking, $expectedVersion): void {
            // Pre-check di dalam transaction (mirror BookingManagementService::deleteBooking).
            if ($booking->version !== $expectedVersion) {
                throw new BookingVersionConflictException($booking->id, $expectedVersion);
            }

            $booking->passengers()->delete();
            $booking->delete();
        });

        return redirect()->route('rental-data.index')
            ->with('rental_data_success', "Data pemesanan rental {$code} berhasil dihapus.");
    }

    public function downloadTicket(
        Booking $booking,
        RegularBookingPaymentService $payments,
        RentalBookingService $service,
        DroppingBookingPersistenceService $persistence,
    ): Response {
        abort_if($booking->category !== 'Rental', 404);

        $booking     = $persistence->ensureTicketMetadata($booking);
        $ticketState = $payments->buildTicketState($booking, $service);

        $logoPath        = public_path('images/jet_travel.png');
        $logo64          = file_exists($logoPath) ? 'data:image/png;base64,' . base64_encode((string) file_get_contents($logoPath)) : null;
        $jasaRaharjaPath = public_path('images/logo_jasaraharja.png');
        $jasaRaharja64   = file_exists($jasaRaharjaPath) ? 'data:image/png;base64,' . base64_encode((string) file_get_contents($jasaRaharjaPath)) : null;

        $fileName = ($ticketState['ticket_number'] !== '-' ? $ticketState['ticket_number'] : $booking->booking_code) . '.pdf';

        return Pdf::loadView('dropping-data.pdf.ticket', [
            'ticketState'    => $ticketState,
            'logo64'         => $logo64,
            'jasaRaharja64'  => $jasaRaharja64,
            'ticketTypeLabel'=> 'Rental',
        ])->setPaper('a4', 'landscape')->download($fileName);
    }

    public function downloadSuratJalan(Booking $booking): Response
    {
        abort_if($booking->category !== 'Rental', 404);

        $booking->loadMissing(['driver', 'mobil']);

        $logoPath   = public_path('images/jet_travel.png');
        $logoBase64 = file_exists($logoPath)
            ? 'data:image/png;base64,' . base64_encode((string) file_get_contents($logoPath))
            : null;

        $rows = [[
            'kursi'  => '1A, 2A, 2B, 3A, 4A, 5A',
            'nama'   => (string) ($booking->passenger_name ?? ''),
            'no_hp'  => (string) ($booking->passenger_phone ?? ''),
            'jemput' => (string) ($booking->pickup_location ?? ''),
            'tujuan' => (string) ($booking->to_city ?? ''),
            'tarif'  => (int) ($booking->total_amount ?? 0),
        ]];

        while (count($rows) < 12) {
            $rows[] = ['kursi' => '', 'nama' => '', 'no_hp' => '', 'jemput' => '', 'tujuan' => '', 'tarif' => null];
        }

        return Pdf::loadView('bookings.pdf.surat-jalan', [
            'rows'        => $rows,
            'tanggal'     => $booking->trip_date?->translatedFormat('d F Y') ?? '-',
            'driver_name' => trim((string) ($booking->driver?->nama ?? $booking->driver_name ?? '')),
            'kode_mobil'  => (string) ($booking->mobil?->kode_mobil ?? ''),
            'logo_base64' => $logoBase64,
        ])->setPaper('a4', 'landscape')->download($booking->booking_code . '-SJ.pdf');
    }

    private function generateBookingCode(): string
    {
        do {
            $code = 'RNT-' . now()->format('ymd') . '-' . Str::upper(Str::random(4));
        } while (Booking::query()->where('booking_code', $code)->exists());

        return $code;
    }

    private function normalizePhone(string $phone): string
    {
        $phone = (string) preg_replace('/\D/', '', $phone);
        if (str_starts_with($phone, '62')) {
            $phone = '0' . substr($phone, 2);
        }

        return $phone;
    }
}
