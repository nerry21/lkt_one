<?php

namespace App\Http\Controllers\Bookings;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\BookingPassenger;
use App\Models\Driver;
use App\Models\Mobil;
use App\Services\BookingManagementService;
use App\Services\PackageBookingService;
use App\Services\RegularBookingPaymentService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Contracts\View\View;

class BookingPageController extends Controller
{
    public function index(BookingManagementService $service): View
    {
        $canManageBookings = auth()->user()?->isAdmin() ?? false;

        return view('bookings.index', [
            'pageTitle' => 'Data Penumpang | Lancang Kuning Travelindo',
            'pageScript' => 'bookings/index',
            'guardMode' => 'protected',
            'pageHeading' => 'Data Penumpang',
            'pageDescription' => 'Pantau dan kelola penumpang per jadwal keberangkatan dari dashboard admin',
            'formOptions' => $canManageBookings ? $service->formOptions() : [],
            'canManageBookings' => $canManageBookings,
            'drivers' => $canManageBookings ? Driver::query()->orderBy('nama')->get(['id', 'nama', 'lokasi'])->toArray() : [],
            'mobils' => $canManageBookings ? Mobil::query()->orderBy('created_at')->get(['id', 'kode_mobil', 'jenis_mobil'])->toArray() : [],
        ]);
    }

    public function show(Booking $booking, BookingManagementService $service): View
    {
        return view('bookings.show', [
            'pageTitle' => 'Detail Pemesanan | Lancang Kuning Travelindo',
            'pageScript' => '',
            'guardMode' => 'protected',
            'pageHeading' => 'Detail Pemesanan',
            'pageDescription' => 'Informasi lengkap pemesanan yang dipilih dari dashboard admin',
            'detail' => $service->detailPagePayload($booking),
        ]);
    }

    public function ticket(Booking $booking): \Illuminate\Contracts\View\View
    {
        $booking->loadMissing('passengers');

        $selectedSeats = (array) ($booking->selected_seats ?? []);
        $passengers    = $booking->passengers->sortBy('seat_no')->values();

        // Build one ticket entry per passenger, using each passenger's own QR code
        $tickets = $passengers->map(function ($passenger) use ($booking) {
            $totalAmount    = (float) ($booking->total_amount ?? 0);
            $passengerCount = max(1, (int) ($booking->passenger_count ?? 1));
            $tarifFinal     = $passengerCount > 0 ? round($totalAmount / $passengerCount) : $totalAmount;

            // Ensure passenger has a QR token (generate+save if missing)
            $passengerQrToken = $this->ensurePassengerQrToken($passenger, $booking);

            // Generate per-passenger QR SVG — encode raw token only (no JSON)
            $passengerQrSvg = null;
            if (filled($passengerQrToken)) {
                $passengerQrSvg = (string) QrCode::format('svg')
                    ->size(110)
                    ->margin(1)
                    ->color(26, 35, 126)
                    ->generate($passengerQrToken);
            }

            return [
                'booking_code'   => (string) $booking->booking_code,
                'passenger_name' => (string) $passenger->name,
                'passenger_phone'=> (string) $passenger->phone,
                'seat_no'        => (string) $passenger->seat_no,
                'from_city'      => (string) $booking->from_city,
                'to_city'        => (string) $booking->to_city,
                'trip_date'      => $booking->trip_date?->translatedFormat('d F Y') ?? '-',
                'trip_time'      => (string) ($booking->trip_time ?? '-'),
                'tarif'          => 'Rp ' . number_format($tarifFinal, 0, ',', '.'),
                'uang_muka'      => 'Rp 0',
                'sisa'           => 'Rp 0',
                'purchase_date'  => $booking->created_at?->translatedFormat('d F Y') ?? '-',
                'all_seats'      => (array) ($booking->selected_seats ?? []),
                'qr_token'       => $passengerQrToken,
                'qr_svg'         => $passengerQrSvg,
            ];
        });

        return view('bookings.ticket', compact('tickets', 'booking'));
    }

    public function downloadTicket(Booking $booking): \Symfony\Component\HttpFoundation\Response
    {
        $booking->loadMissing('passengers');

        $passengers = $booking->passengers->sortBy('seat_no')->values();

        $tickets = $passengers->map(function ($passenger) use ($booking) {
            $totalAmount    = (float) ($booking->total_amount ?? 0);
            $passengerCount = max(1, (int) ($booking->passenger_count ?? 1));
            $tarifFinal     = $passengerCount > 0 ? round($totalAmount / $passengerCount) : $totalAmount;

            // Ensure passenger has a QR token (generate+save if missing)
            $passengerQrToken = $this->ensurePassengerQrToken($passenger, $booking);

            // For PDF (DomPDF), generate per-passenger PNG base64 — encode raw token only
            $qrPngBase64 = null;
            if (filled($passengerQrToken)) {
                $pngBytes    = (string) QrCode::format('png')->size(110)->margin(1)->generate($passengerQrToken);
                $qrPngBase64 = 'data:image/png;base64,' . base64_encode($pngBytes);
            }

            return [
                'booking_code'    => (string) $booking->booking_code,
                'passenger_name'  => (string) $passenger->name,
                'passenger_phone' => (string) $passenger->phone,
                'seat_no'         => (string) $passenger->seat_no,
                'from_city'       => (string) $booking->from_city,
                'to_city'         => (string) $booking->to_city,
                'trip_date'       => $booking->trip_date?->translatedFormat('d F Y') ?? '-',
                'trip_time'       => (string) ($booking->trip_time ?? '-'),
                'tarif'           => 'Rp ' . number_format($tarifFinal, 0, ',', '.'),
                'uang_muka'       => 'Rp 0',
                'sisa'            => 'Rp 0',
                'purchase_date'   => $booking->created_at?->translatedFormat('d F Y') ?? '-',
                'all_seats'       => (array) ($booking->selected_seats ?? []),
                'qr_token'        => $passengerQrToken,
                'qr_png'          => $qrPngBase64,
            ];
        });

        $fileName = $booking->booking_code . '.pdf';

        return Pdf::loadView('bookings.pdf.ticket', [
            'tickets' => $tickets,
            'booking' => $booking,
        ])->setPaper('a4')->download($fileName);
    }

    public function downloadSuratBukti(
        Booking $booking,
        PackageBookingService $packageService,
        RegularBookingPaymentService $payments,
    ): \Symfony\Component\HttpFoundation\Response {
        $notes = [];
        if ($booking->notes) {
            $decoded = json_decode($booking->notes, true);
            if (is_array($decoded)) {
                $notes = $decoded;
            }
        }

        $transactionDate = $booking->paid_at ?? $booking->updated_at ?? $booking->created_at;

        $invoiceState = [
            'booking_code'            => $booking->booking_code,
            'invoice_number'          => $booking->invoice_number ?: '-',
            'payment_reference'       => $booking->payment_reference ?: '-',
            'payment_method'          => $payments->paymentMethodLabel($booking->payment_method),
            'payment_status'          => (string) $booking->payment_status,
            'booking_status'          => (string) $booking->booking_status,
            'from_city'               => (string) $booking->from_city,
            'to_city'                 => (string) $booking->to_city,
            'route_label'             => (string) $booking->route_label,
            'trip_date'               => $booking->trip_date?->format('d M Y') ?? '-',
            'trip_time'               => $booking->time ?? '-',
            'sender_name'             => (string) $booking->passenger_name,
            'sender_phone'            => (string) $booking->passenger_phone,
            'sender_address'          => (string) $booking->pickup_location,
            'recipient_name'          => (string) ($notes['recipient_name'] ?? '-'),
            'recipient_phone'         => (string) ($notes['recipient_phone'] ?? '-'),
            'recipient_address'       => (string) $booking->dropoff_location,
            'item_name'               => (string) ($notes['item_name'] ?? '-'),
            'item_qty'                => (int) ($notes['item_qty'] ?? $booking->passenger_count ?? 1),
            'package_size'            => (string) ($notes['package_size'] ?? $booking->booking_for ?? '-'),
            'package_size_label'      => $packageService->packageSizeLabel((string) ($notes['package_size'] ?? $booking->booking_for ?? '')),
            'selected_seats_label'    => $packageService->selectedSeatLabels((array) ($booking->selected_seats ?? [])),
            'fare_amount_formatted'   => $packageService->formatCurrency((int) ($booking->price_per_seat ?? 0)),
            'total_amount_formatted'  => $packageService->formatCurrency((int) ($booking->total_amount ?? 0)),
            'nominal_payment_formatted' => $packageService->formatCurrency((int) round((float) ($booking->nominal_payment ?? 0))),
            'payment_account_label'   => $booking->payment_account_bank && $booking->payment_account_number
                ? $booking->payment_account_bank . ' - ' . $booking->payment_account_number
                : 'Tidak diperlukan',
            'transaction_date_label'  => $transactionDate?->format('d M Y H:i') ?? '-',
        ];

        $fileName = ($invoiceState['invoice_number'] !== '-' ? $invoiceState['invoice_number'] : $booking->booking_code) . '.pdf';

        return Pdf::loadView('package-bookings.pdf.invoice', [
            'invoiceState' => $invoiceState,
        ])->setPaper('a4', 'landscape')->download($fileName);
    }

    public function suratJalan(Request $request): \Symfony\Component\HttpFoundation\Response
    {
        $date        = trim((string) $request->query('date', ''));
        $tripTime    = trim((string) $request->query('trip_time', ''));
        $armadaIndex = max(1, (int) $request->query('armada_index', 1));
        $direction   = trim((string) $request->query('direction', ''));
        $driverName  = trim((string) $request->query('driver_name', ''));
        $noPol       = trim((string) $request->query('no_pol', ''));

        $timePrefix = strlen($tripTime) >= 5 ? substr($tripTime, 0, 5) : $tripTime;

        $bookings = Booking::query()
            ->when($date !== '', fn ($q) => $q->where('trip_date', $date))
            ->when($timePrefix !== '', fn ($q) => $q->where('trip_time', 'like', $timePrefix . '%'))
            ->when($direction === 'to_pkb', fn ($q) => $q->where('to_city', 'Pekanbaru'))
            ->when($direction === 'from_pkb', fn ($q) => $q->where('from_city', 'Pekanbaru'))
            ->where(function ($q) use ($armadaIndex) {
                $q->where('armada_index', $armadaIndex);
                if ($armadaIndex === 1) {
                    $q->orWhereNull('armada_index');
                }
            })
            ->with('passengers')
            ->orderBy('created_at')
            ->get();

        $passengerRows = [];
        $packageRows   = [];

        foreach ($bookings as $booking) {
            // Build a seat→passenger map from BookingPassenger records (if any)
            $passengerBySeat = $booking->passengers
                ->keyBy('seat_no')
                ->map(fn ($p) => ['nama' => (string) $p->name, 'no_hp' => (string) $p->phone]);

            $seats = (array) ($booking->selected_seats ?? []);

            // Final tarif per seat = total_amount / passenger_count (includes additional fare)
            $passengerCount = max(1, (int) ($booking->passenger_count ?? 1));
            $tarifFinal     = round((float) ($booking->total_amount ?? 0) / $passengerCount);

            $isPackage = ($booking->category ?? '') === 'Paket';
            $notes     = $isPackage ? (array) json_decode((string) ($booking->notes ?? ''), true) : [];
            $namaDisplay = $isPackage
                ? (string) ($notes['item_name'] ?? $booking->passenger_name ?? '')
                : (string) ($booking->passenger_name ?? '');

            if (empty($seats)) {
                $row = [
                    'kursi' => '-',
                    'nama'  => $namaDisplay,
                    'no_hp' => (string) ($booking->passenger_phone ?? ''),
                    'jemput'=> (string) ($booking->pickup_location ?? ''),
                    'tujuan'=> (string) ($booking->dropoff_location ?? ''),
                    'tarif' => $tarifFinal,
                ];
                if ($isPackage) {
                    $packageRows[] = $row;
                } else {
                    $passengerRows[] = $row;
                }
            } else {
                foreach ($seats as $seatCode) {
                    $pData = $passengerBySeat->get($seatCode);
                    $row = [
                        'kursi' => (string) $seatCode,
                        'nama'  => $isPackage ? $namaDisplay : ($pData['nama'] ?? (string) ($booking->passenger_name ?? '')),
                        'no_hp' => $pData['no_hp'] ?? (string) ($booking->passenger_phone ?? ''),
                        'jemput'=> (string) ($booking->pickup_location ?? ''),
                        'tujuan'=> (string) ($booking->dropoff_location ?? ''),
                        'tarif' => $tarifFinal,
                    ];
                    if ($isPackage) {
                        $packageRows[] = $row;
                    } else {
                        $passengerRows[] = $row;
                    }
                }
            }
        }

        // Passengers first, then packages
        $rows = array_merge($passengerRows, $packageRows);

        // Minimum 12 rows — pad with empty rows if needed
        while (count($rows) < 12) {
            $rows[] = ['kursi' => '', 'nama' => '', 'no_hp' => '', 'jemput' => '', 'tujuan' => '', 'tarif' => null];
        }

        // If driver_name not passed via query, try to get it from bookings
        if ($driverName === '') {
            $driverName = $bookings->first(fn ($b) => filled($b->driver_name))?->driver_name ?? '';
        }

        $tanggal = $date !== '' ? \Carbon\Carbon::parse($date)->translatedFormat('d F Y') : '-';

        $logoPath = public_path('images/lk_travel.png');
        $logoBase64 = file_exists($logoPath)
            ? 'data:image/png;base64,' . base64_encode(file_get_contents($logoPath))
            : null;

        $fileName = 'surat-jalan-' . ($date ?: now()->format('Y-m-d')) . '-' . str_replace(':', '', $timePrefix ?: '0000') . '.pdf';

        return Pdf::loadView('bookings.pdf.surat-jalan', [
            'rows'        => $rows,
            'tanggal'     => $tanggal,
            'driver_name' => $driverName ?: '',
            'kode_mobil'  => $noPol ?: '',
            'logo_base64' => $logoBase64,
        ])->setPaper('a4', 'landscape')->download($fileName);
    }

    private function ensurePassengerQrToken(BookingPassenger $passenger, Booking $booking): string
    {
        if (filled($passenger->qr_token)) {
            return (string) $passenger->qr_token;
        }

        // Generate a unique token
        do {
            $token = 'PQR-' . now()->format('ymd') . '-' . Str::upper(Str::random(6));
        } while (BookingPassenger::query()->where('qr_token', $token)->exists());

        BookingPassenger::query()->where('id', $passenger->id)->update([
            'qr_token' => $token,
        ]);

        $passenger->qr_token = $token;

        return $token;
    }
}
