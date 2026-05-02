<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Services\ETicketPdfService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Sesi 71 PR-CRM-6H — Public e-tiket download via signed URL.
 *
 * Route: GET /eticket/{code}/download (signed)
 * Auth: signed URL Laravel (signature query param + expires)
 * Middleware: signed (Laravel built-in)
 */
class ETicketDownloadController extends Controller
{
    public function __construct(
        private readonly ETicketPdfService $pdfService,
    ) {}

    public function download(Request $request, string $code): Response
    {
        $booking = Booking::query()
            ->where('booking_code', $code)
            ->first();

        if (! $booking) {
            return response()->json(['error' => 'not_found'], 404);
        }

        if (! $this->pdfService->exists($booking)) {
            return response()->json(['error' => 'pdf_not_generated'], 404);
        }

        $content = $this->pdfService->streamContent($booking);
        $filename = sprintf('eticket-%s.pdf', $booking->booking_code);

        return response($content, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => sprintf('inline; filename="%s"', $filename),
            'Cache-Control' => 'private, max-age=3600',
        ]);
    }
}
