<?php

declare(strict_types=1);

namespace App\Services\Bridge;

use App\Models\Booking;
use App\Services\ETicketPdfService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
use Illuminate\Validation\ValidationException;

/**
 * Sesi 71 PR-CRM-6H — E-tiket PDF bridge service.
 *
 * Wrapper di sekitar ETicketPdfService existing, dengan:
 *   - Permission check (booking_status harus eligible — Diproses)
 *   - Generate signed URL (24 jam expire) untuk download
 *   - Audit trail di Log
 *
 * REUSE: ETicketPdfService::generateAndStore() yang existing — JANGAN duplicate logic.
 */
class BridgeETicketService
{
    private const ELIGIBLE_STATUSES = ['Diproses'];
    private const SIGNED_URL_TTL_HOURS = 24;

    public function __construct(
        private readonly ETicketPdfService $pdfService,
    ) {}

    /**
     * @return array{
     *     booking_code: string,
     *     pdf_path: string,
     *     download_url: string,
     *     expires_at: string,
     * }
     */
    public function generate(Booking $booking): array
    {
        if (! in_array($booking->booking_status, self::ELIGIBLE_STATUSES, true)) {
            throw ValidationException::withMessages([
                'booking_status' => [
                    sprintf(
                        'Booking %s belum eligible untuk e-tiket (status: %s). Hanya status "Diproses" yang bisa generate e-tiket.',
                        $booking->booking_code,
                        $booking->booking_status
                    ),
                ],
            ]);
        }

        // Reuse existing service — sets ticket_pdf_path via saveQuietly()
        $pdfPath = $this->pdfService->generateAndStore($booking);

        // Tracking fields not handled by generateAndStore — set them here.
        // ticket_status default 'Draft' di migration; flip ke 'issued' saat first generate.
        $booking->ticket_pdf_disk = config('filesystems.default', 'local');
        $booking->ticket_pdf_generated_at = Carbon::now();
        if ($booking->ticket_status === null || $booking->ticket_status === '' || $booking->ticket_status === 'Draft') {
            $booking->ticket_status = 'issued';
            $booking->ticket_issued_at = Carbon::now();
        }
        $booking->saveQuietly();

        $expiresAt = Carbon::now()->addHours(self::SIGNED_URL_TTL_HOURS);
        $downloadUrl = URL::temporarySignedRoute(
            'bridge.eticket.download',
            $expiresAt,
            ['code' => $booking->booking_code],
        );

        Log::channel('chatbot-bridge')->info('E-tiket generated', [
            'booking_code' => $booking->booking_code,
            'pdf_path' => $pdfPath,
            'expires_at' => $expiresAt->toIso8601String(),
        ]);

        return [
            'booking_code' => $booking->booking_code,
            'pdf_path' => $pdfPath,
            'download_url' => $downloadUrl,
            'expires_at' => $expiresAt->toIso8601String(),
        ];
    }
}
