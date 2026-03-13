<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Departure;
use Barryvdh\DomPDF\Facade\Pdf;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Symfony\Component\HttpFoundation\Response;

class PdfDocumentController extends Controller
{
    public function eticket(string $id): Response
    {
        $booking = Booking::query()
            ->with(['passengers', 'departure.driver', 'departure.vehicle'])
            ->findOrFail($id);

        abort_if($booking->ticket_status !== 'Active', 404);

        $qrSvg = base64_encode(
            QrCode::format('svg')
                ->size(120)
                ->generate(route('booking.eticket', $booking->id))
        );

        $pdf = Pdf::loadView('pdf.eticket', [
            'booking' => $booking,
            'qrSvg' => $qrSvg,
        ])->setPaper('a4', 'portrait');

        return $pdf->stream('eticket-' . $booking->booking_code . '.pdf');
    }

    public function suratJalan(string $departureId): Response
    {
        $departure = Departure::query()
            ->with(['driver', 'vehicle', 'bookings.passengers'])
            ->findOrFail($departureId);

        $pdf = Pdf::loadView('pdf.surat-jalan', [
            'departure' => $departure,
        ])->setPaper('a4', 'portrait');

        return $pdf->stream('surat-jalan-' . $departure->departure_code . '.pdf');
    }
}
