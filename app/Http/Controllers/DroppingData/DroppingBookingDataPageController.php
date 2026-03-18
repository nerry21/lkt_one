<?php

namespace App\Http\Controllers\DroppingData;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Services\DroppingBookingPersistenceService;
use App\Services\DroppingBookingService;
use App\Services\RegularBookingPaymentService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class DroppingBookingDataPageController extends Controller
{
    public function index(Request $request): View
    {
        $query = Booking::query()
            ->where('category', 'Dropping')
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

        $bookings = $query->paginate(20)->withQueryString();

        $stats = [
            'total'  => Booking::where('category', 'Dropping')->count(),
            'paid'   => Booking::where('category', 'Dropping')->whereIn('payment_status', ['Dibayar', 'Dibayar Tunai'])->count(),
            'unpaid' => Booking::where('category', 'Dropping')->where('payment_status', 'Belum Bayar')->count(),
        ];

        return view('dropping-data.index', [
            'pageTitle'       => 'Data Pemesanan Dropping | Lancang Kuning Travelindo',
            'pageScript'      => 'dropping-data/index',
            'guardMode'       => 'protected',
            'pageHeading'     => 'Data Pemesanan Dropping',
            'pageDescription' => 'Kelola seluruh data pemesanan dropping Lancang Kuning Travelindo.',
            'bookings'        => $bookings,
            'search'          => $search,
            'filterStatus'    => $filterStatus,
            'stats'           => $stats,
            'flashSuccess'    => $request->session()->get('dropping_data_success'),
            'flashError'      => $request->session()->get('dropping_data_error'),
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
            'trip_time'        => ['required', 'date_format:H:i'],
            'notes'            => ['nullable', 'string', 'max:500'],
            'payment_method'   => ['nullable', 'string', 'in:transfer,qris,cash'],
            'payment_status'   => ['nullable', 'string'],
            'booking_for'      => ['nullable', 'string', 'in:self,other'],
        ], [
            'passenger_phone.regex' => 'Nomor HP harus format Indonesia yang valid (08xxxxxxxxxx).',
            'trip_time.date_format' => 'Jam keberangkatan harus format HH:MM.',
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

            $booking = Booking::create([
                'booking_code'    => $bookingCode,
                'category'        => 'Dropping',
                'from_city'       => trim($validated['from_city']),
                'to_city'         => trim($validated['to_city']),
                'route_label'     => trim($validated['from_city']) . ' - ' . trim($validated['to_city']),
                'trip_date'       => $validated['trip_date'],
                'trip_time'       => $validated['trip_time'] . ':00',
                'booking_for'     => $validated['booking_for'] ?? 'self',
                'passenger_name'  => trim($validated['passenger_name']),
                'passenger_phone' => $phone,
                'passenger_count' => 6,
                'pickup_location' => trim($validated['pickup_location']),
                'dropoff_location'=> trim($validated['dropoff_location']),
                'selected_seats'  => ['1A', '2A', '2B', '3A', '4A', '5A'],
                'price_per_seat'  => $pricePerSeat,
                'total_amount'    => $totalAmount,
                'nominal_payment' => $isPaid ? $totalAmount : null,
                'payment_method'  => $paymentMethod,
                'payment_status'  => $paymentStatus,
                'booking_status'  => $bookingStatus,
                'ticket_status'   => $ticketStatus,
                'notes'           => $validated['notes'] ?? null,
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

        return redirect()->route('dropping-data.index')
            ->with('dropping_data_success', 'Data pemesanan dropping berhasil ditambahkan.');
    }

    public function update(Request $request, Booking $booking): RedirectResponse
    {
        abort_if($booking->category !== 'Dropping', 404);

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
            'trip_time'        => ['required', 'date_format:H:i'],
            'notes'            => ['nullable', 'string', 'max:500'],
            'payment_method'   => ['nullable', 'string', 'in:transfer,qris,cash'],
            'payment_status'   => ['nullable', 'string'],
        ], [
            'passenger_phone.regex' => 'Nomor HP harus format Indonesia yang valid.',
            'trip_time.date_format' => 'Jam keberangkatan harus format HH:MM.',
        ]);

        $phone = $this->normalizePhone((string) ($validated['passenger_phone'] ?? ''));

        DB::transaction(function () use ($booking, $validated, $phone): void {
            $paymentStatus  = $validated['payment_status'] ?? (string) ($booking->payment_status ?? 'Belum Bayar');
            $isPaid         = in_array($paymentStatus, ['Dibayar', 'Dibayar Tunai'], true);
            $pricePerSeat   = (int) $validated['price_per_seat'];
            $additionalFare = (int) ($validated['additional_fare'] ?? 0);
            $totalAmount    = $pricePerSeat + $additionalFare;

            $booking->fill([
                'from_city'       => trim($validated['from_city']),
                'to_city'         => trim($validated['to_city']),
                'route_label'     => trim($validated['from_city']) . ' - ' . trim($validated['to_city']),
                'trip_date'       => $validated['trip_date'],
                'trip_time'       => $validated['trip_time'] . ':00',
                'passenger_name'  => trim($validated['passenger_name']),
                'passenger_phone' => $phone,
                'pickup_location' => trim($validated['pickup_location']),
                'dropoff_location'=> trim($validated['dropoff_location']),
                'price_per_seat'  => $pricePerSeat,
                'total_amount'    => $totalAmount,
                'nominal_payment' => $isPaid ? $totalAmount : $booking->nominal_payment,
                'payment_method'  => $validated['payment_method'] ?? $booking->payment_method,
                'payment_status'  => $paymentStatus,
                'notes'           => $validated['notes'] ?? null,
            ]);
            $booking->save();

            $booking->passengers()->update([
                'name'  => trim($validated['passenger_name']),
                'phone' => $phone,
            ]);
        });

        return redirect()->route('dropping-data.index')
            ->with('dropping_data_success', "Data {$booking->booking_code} berhasil diperbarui.");
    }

    public function destroy(Booking $booking): RedirectResponse
    {
        abort_if($booking->category !== 'Dropping', 404);

        $code = (string) $booking->booking_code;

        DB::transaction(function () use ($booking): void {
            $booking->passengers()->delete();
            $booking->delete();
        });

        return redirect()->route('dropping-data.index')
            ->with('dropping_data_success', "Data pemesanan dropping {$code} berhasil dihapus.");
    }

    public function downloadTicket(
        Booking $booking,
        RegularBookingPaymentService $payments,
        DroppingBookingService $service,
        DroppingBookingPersistenceService $persistence,
    ): Response|RedirectResponse {
        abort_if($booking->category !== 'Dropping', 404);

        $booking    = $persistence->ensureTicketMetadata($booking);
        $ticketState = $payments->buildTicketState($booking, $service);
        $fileName   = ($ticketState['ticket_number'] !== '-' ? $ticketState['ticket_number'] : $booking->booking_code) . '.pdf';

        return Pdf::loadView('dropping-bookings.pdf.ticket', [
            'ticketState' => $ticketState,
        ])->setPaper('a4')->download($fileName);
    }

    public function downloadSuratJalan(Booking $booking): Response
    {
        abort_if($booking->category !== 'Dropping', 404);

        $logoPath   = public_path('images/lk_travel.png');
        $logoBase64 = file_exists($logoPath)
            ? 'data:image/png;base64,' . base64_encode((string) file_get_contents($logoPath))
            : null;

        return Pdf::loadView('dropping-data.pdf.surat-jalan', [
            'booking'     => $booking,
            'logo_base64' => $logoBase64,
            'tanggal'     => $booking->trip_date?->format('d F Y') ?? '-',
            'driver_name' => trim((string) ($booking->driver_name ?? '')),
        ])->setPaper('a4')->download($booking->booking_code . '-SJ.pdf');
    }

    private function generateBookingCode(): string
    {
        do {
            $code = 'DBK-' . now()->format('ymd') . '-' . Str::upper(Str::random(4));
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
