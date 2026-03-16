<?php

namespace App\Http\Controllers\Bookings;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Driver;
use App\Models\Mobil;
use App\Services\BookingManagementService;
use Barryvdh\DomPDF\Facade\Pdf;
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

        // Generate QR code SVG once for the booking
        $qrSvg = null;
        if (filled($booking->qr_token)) {
            $qrValue = filled($booking->qr_code_value)
                ? $booking->qr_code_value
                : $booking->qr_token;

            $qrSvg = (string) QrCode::format('svg')
                ->size(110)
                ->margin(1)
                ->color(26, 35, 126)
                ->generate($qrValue);
        }

        // Build one ticket entry per passenger
        $tickets = $passengers->map(function ($passenger) use ($booking, $qrSvg) {
            $totalAmount    = (float) ($booking->total_amount ?? 0);
            $passengerCount = max(1, (int) ($booking->passenger_count ?? 1));
            $tarifFinal     = $passengerCount > 0 ? round($totalAmount / $passengerCount) : $totalAmount;

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
                'qr_token'       => (string) ($booking->qr_token ?? ''),
                'qr_svg'         => $qrSvg,
            ];
        });

        return view('bookings.ticket', compact('tickets', 'booking'));
    }

    public function downloadTicket(Booking $booking): \Symfony\Component\HttpFoundation\Response
    {
        $booking->loadMissing('passengers');

        $passengers = $booking->passengers->sortBy('seat_no')->values();

        // For PDF (DomPDF), generate PNG base64
        $qrPngBase64 = null;
        if (filled($booking->qr_token)) {
            $qrValue = filled($booking->qr_code_value)
                ? $booking->qr_code_value
                : $booking->qr_token;

            $pngBytes      = (string) QrCode::format('png')->size(110)->margin(1)->generate($qrValue);
            $qrPngBase64   = 'data:image/png;base64,' . base64_encode($pngBytes);
        }

        $tickets = $passengers->map(function ($passenger) use ($booking, $qrPngBase64) {
            $totalAmount    = (float) ($booking->total_amount ?? 0);
            $passengerCount = max(1, (int) ($booking->passenger_count ?? 1));
            $tarifFinal     = $passengerCount > 0 ? round($totalAmount / $passengerCount) : $totalAmount;

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
                'qr_token'        => (string) ($booking->qr_token ?? ''),
                'qr_png'          => $qrPngBase64,
            ];
        });

        $fileName = $booking->booking_code . '.pdf';

        return Pdf::loadView('bookings.pdf.ticket', [
            'tickets' => $tickets,
            'booking' => $booking,
        ])->setPaper('a4')->download($fileName);
    }
}
