<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Services\DroppingBookingPersistenceService;
use App\Services\DroppingBookingService;
use App\Services\RegularBookingPaymentService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Symfony\Component\HttpFoundation\Response;

/**
 * Public download controller — no authentication required.
 *
 * Routes use booking_code (opaque identifier) instead of database ID,
 * and are served under /unduh/ instead of /dashboard/.
 */
class PublicDownloadController extends Controller
{
    /**
     * GET /unduh/sj/{code}
     * Download Surat Jalan (Dropping) — public.
     */
    public function suratJalan(string $code): Response
    {
        $booking = Booking::where('booking_code', $code)
            ->where('category', 'Dropping')
            ->firstOrFail();

        $booking->loadMissing(['driver', 'mobil']);

        $logoPath   = public_path('images/lk_travel.png');
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

    /**
     * GET /unduh/tiket/{code}
     * Download E-Tiket Dropping (dari Data Pemesanan Dropping) — public.
     */
    public function tiketDropping(
        string $code,
        RegularBookingPaymentService $payments,
        DroppingBookingService $service,
        DroppingBookingPersistenceService $persistence,
    ): Response {
        $booking = Booking::where('booking_code', $code)
            ->where('category', 'Dropping')
            ->firstOrFail();

        $booking     = $persistence->ensureTicketMetadata($booking);
        $ticketState = $payments->buildTicketState($booking, $service);

        $logoPath        = public_path('images/lk_travel.png');
        $logo64          = file_exists($logoPath)
            ? 'data:image/png;base64,' . base64_encode((string) file_get_contents($logoPath))
            : null;
        $jasaRaharjaPath = public_path('images/logo_jasaraharja.png');
        $jasaRaharja64   = file_exists($jasaRaharjaPath)
            ? 'data:image/png;base64,' . base64_encode((string) file_get_contents($jasaRaharjaPath))
            : null;

        $fileName = ($ticketState['ticket_number'] !== '-' ? $ticketState['ticket_number'] : $booking->booking_code) . '.pdf';

        return Pdf::loadView('dropping-data.pdf.ticket', [
            'ticketState'   => $ticketState,
            'logo64'        => $logo64,
            'jasaRaharja64' => $jasaRaharja64,
        ])->setPaper('a4', 'landscape')->download($fileName);
    }

    /**
     * GET /unduh/tiket-reguler/{code}
     * Download E-Tiket Reguler (dari Data Pemesanan Reguler) — public.
     */
    public function tiketReguler(string $code): Response
    {
        $booking = Booking::where('booking_code', $code)
            ->where('category', 'Reguler')
            ->firstOrFail();

        $booking->loadMissing('passengers');

        $passengers     = $booking->passengers->sortBy('seat_no')->values();
        $totalAmount    = (float) ($booking->total_amount ?? 0);
        $passengerCount = max(1, (int) ($booking->passenger_count ?? 1));
        $tarifFinal     = $passengerCount > 0 ? round($totalAmount / $passengerCount) : $totalAmount;

        if ($passengers->count() <= 1) {
            $passenger        = $passengers->first();
            $passengerQrToken = $passenger?->qr_token ?? '';
            $qrPngBase64      = filled($passengerQrToken)
                ? 'data:image/png;base64,' . base64_encode((string) QrCode::format('png')->size(110)->margin(1)->generate($passengerQrToken))
                : null;

            $ticket = [
                'booking_code'    => (string) $booking->booking_code,
                'passenger_name'  => $passenger ? (string) $passenger->name : '',
                'passenger_phone' => $passenger ? (string) $passenger->phone : '',
                'seat_no'         => $passenger ? (string) $passenger->seat_no : '',
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

            return Pdf::loadView('bookings.pdf.ticket', [
                'tickets' => collect([$ticket]),
                'booking' => $booking,
            ])->setPaper('a4')->download($booking->booking_code . '.pdf');
        }

        // Multiple passengers → ZIP
        $tmpZip = tempnam(sys_get_temp_dir(), 'tiket_') . '.zip';
        $zip    = new \ZipArchive();
        $zip->open($tmpZip, \ZipArchive::CREATE | \ZipArchive::OVERWRITE);

        foreach ($passengers as $passenger) {
            $passengerQrToken = $passenger->qr_token ?? '';
            $qrPngBase64      = filled($passengerQrToken)
                ? 'data:image/png;base64,' . base64_encode((string) QrCode::format('png')->size(110)->margin(1)->generate($passengerQrToken))
                : null;

            $ticket = [
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

            $pdfContent = Pdf::loadView('bookings.pdf.ticket', [
                'tickets' => collect([$ticket]),
                'booking' => $booking,
            ])->setPaper('a4')->output();

            $seatLabel = preg_replace('/[^A-Za-z0-9]/', '', (string) $passenger->seat_no);
            $zip->addFromString($booking->booking_code . '-Kursi' . $seatLabel . '.pdf', $pdfContent);
        }

        $zip->close();
        $zipContents = (string) file_get_contents($tmpZip);
        @unlink($tmpZip);

        return response($zipContents, 200, [
            'Content-Type'        => 'application/zip',
            'Content-Disposition' => 'attachment; filename="' . $booking->booking_code . '-tiket.zip"',
            'Content-Length'      => strlen($zipContents),
        ]);
    }
}
