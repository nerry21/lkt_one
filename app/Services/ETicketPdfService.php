<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\BookingPassenger;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

/**
 * ETicketPdfService
 *
 * Bertanggung jawab untuk:
 * 1. Generate PDF E-Ticket dari Booking.
 * 2. Menyimpan PDF secara permanen ke storage.
 * 3. Memperbarui kolom ticket_pdf_path di booking.
 * 4. Memberikan akses download/stream PDF yang sudah tersimpan.
 *
 * PDF disimpan di: storage/app/public/etickets/{year}/{month}/{booking_code}.pdf
 * URL publik: /storage/etickets/{year}/{month}/{booking_code}.pdf
 */
class ETicketPdfService
{
    /**
     * Generate dan simpan PDF E-Ticket untuk booking.
     * Jika PDF sudah ada, akan di-overwrite dengan yang terbaru.
     *
     * @return string  Path file yang tersimpan (relatif dari storage disk)
     */
    public function generateAndStore(Booking $booking): string
    {
        $booking->loadMissing(['passengers', 'driver', 'departure']);

        $pdfPath = $this->buildPdfPath($booking->booking_code, $booking->trip_date?->format('Y'), $booking->trip_date?->format('m'));

        $pdf = Pdf::loadView('pdf.eticket', [
            'booking'    => $booking,
            'passengers' => $booking->passengers,
            'generated_at' => now()->format('d/m/Y H:i'),
        ])
        ->setPaper('a5', 'portrait')
        ->setOption('defaultFont', 'sans-serif')
        ->setOption('isHtml5ParserEnabled', true)
        ->setOption('isRemoteEnabled', false);

        // Simpan ke storage/app/public/etickets/...
        Storage::put($pdfPath, $pdf->output());

        // Update path di database.
        //
        // Bug #30 internal mutator policy (design §10): use saveQuietly to
        // bypass booted() saving listener + version check. PDF generation is
        // a consequential side effect of ticket issuance, not competing edit.
        $booking->ticket_pdf_path = $pdfPath;
        $booking->saveQuietly();

        return $pdfPath;
    }

    /**
     * Generate dan simpan PDF E-Ticket per-penumpang.
     * Berguna untuk sistem multi-seat dimana setiap penumpang punya tiket terpisah.
     *
     * @return string  Path file yang tersimpan
     */
    public function generatePassengerTicket(BookingPassenger $passenger): string
    {
        $passenger->loadMissing('booking.driver');
        $booking = $passenger->booking;

        $filename = $this->buildPassengerPdfPath(
            $booking->booking_code,
            $passenger->seat_no ?? 'noSeat',
            $booking->trip_date?->format('Y'),
            $booking->trip_date?->format('m'),
        );

        $pdf = Pdf::loadView('pdf.eticket_passenger', [
            'booking'      => $booking,
            'passenger'    => $passenger,
            'generated_at' => now()->format('d/m/Y H:i'),
        ])
        ->setPaper('a6', 'portrait')
        ->setOption('defaultFont', 'sans-serif')
        ->setOption('isHtml5ParserEnabled', true)
        ->setOption('isRemoteEnabled', false);

        Storage::put($filename, $pdf->output());

        $passenger->ticket_pdf_path = $filename;
        $passenger->save();

        return $filename;
    }

    /**
     * Ambil konten PDF untuk streaming ke browser.
     * Throws \RuntimeException jika file tidak ditemukan.
     */
    public function streamContent(Booking $booking): string
    {
        if (! $booking->ticket_pdf_path || ! Storage::exists($booking->ticket_pdf_path)) {
            throw new \RuntimeException("PDF E-Ticket belum tersedia untuk booking: {$booking->booking_code}");
        }

        return Storage::get($booking->ticket_pdf_path) ?? '';
    }

    /**
     * Cek apakah PDF sudah ada di storage (tidak perlu generate ulang).
     */
    public function exists(Booking $booking): bool
    {
        return $booking->hasTicketPdf();
    }

    /**
     * Generate PDF on-the-fly tanpa disimpan (untuk preview).
     *
     * @return \Barryvdh\DomPDF\PDF
     */
    public function preview(Booking $booking)
    {
        $booking->loadMissing(['passengers', 'driver', 'departure']);

        return Pdf::loadView('pdf.eticket', [
            'booking'      => $booking,
            'passengers'   => $booking->passengers,
            'generated_at' => now()->format('d/m/Y H:i'),
        ])
        ->setPaper('a5', 'portrait')
        ->setOption('defaultFont', 'sans-serif')
        ->setOption('isHtml5ParserEnabled', true)
        ->setOption('isRemoteEnabled', false);
    }

    /**
     * Render PDF booking ke string bytes (tanpa menyimpan ke disk).
     * Digunakan oleh TicketBackupService untuk membuat salinan arsip.
     *
     * @return string  Raw PDF bytes
     */
    public function renderBookingPdf(Booking $booking): string
    {
        $booking->loadMissing(['passengers', 'driver', 'departure']);

        return Pdf::loadView('pdf.eticket', [
            'booking'      => $booking,
            'passengers'   => $booking->passengers,
            'generated_at' => now()->format('d/m/Y H:i'),
        ])
        ->setPaper('a5', 'portrait')
        ->setOption('defaultFont', 'sans-serif')
        ->setOption('isHtml5ParserEnabled', true)
        ->setOption('isRemoteEnabled', false)
        ->output();
    }

    /**
     * Hapus PDF dari storage (misalnya saat booking dibatalkan).
     */
    public function delete(Booking $booking): void
    {
        if ($booking->ticket_pdf_path && Storage::exists($booking->ticket_pdf_path)) {
            Storage::delete($booking->ticket_pdf_path);
        }

        $booking->ticket_pdf_path = null;
        // Bug #30 internal mutator policy (design §10): saveQuietly bypass.
        $booking->saveQuietly();
    }

    // =========================================================================
    // Private
    // =========================================================================

    private function buildPdfPath(string $bookingCode, ?string $year, ?string $month): string
    {
        $year  = $year  ?? now()->format('Y');
        $month = $month ?? now()->format('m');

        // Sanitize booking code untuk nama file
        $safeCode = preg_replace('/[^A-Za-z0-9\-_]/', '', $bookingCode);

        return "public/etickets/{$year}/{$month}/{$safeCode}.pdf";
    }

    private function buildPassengerPdfPath(string $bookingCode, string $seatNo, ?string $year, ?string $month): string
    {
        $year     = $year  ?? now()->format('Y');
        $month    = $month ?? now()->format('m');
        $safeCode = preg_replace('/[^A-Za-z0-9\-_]/', '', $bookingCode);
        $safeSeat = preg_replace('/[^A-Za-z0-9\-_]/', '', $seatNo);

        return "public/etickets/{$year}/{$month}/{$safeCode}_seat_{$safeSeat}.pdf";
    }
}
