<?php

namespace App\Http\Controllers\Bookings;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\BookingPassenger;
use App\Models\Driver;
use App\Models\Mobil;
use App\Services\BookingManagementService;
use Barryvdh\DomPDF\Facade\Pdf;
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
