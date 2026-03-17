<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\BookingPassenger;
use App\Models\TicketBackup;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

/**
 * TicketBackupService
 *
 * Bertanggung jawab untuk arsip permanen PDF E-Ticket.
 *
 * Perbedaan dengan ETicketPdfService:
 * - ETicketPdfService  : mengelola file "aktif" di public disk untuk akses user
 * - TicketBackupService: mengelola arsip VERSIONED di private disk (local) untuk audit
 *
 * Arsitektur penyimpanan:
 * - Disk  : local (storage/app/) — TIDAK aksesibel via URL publik
 * - Path  : e_tickets/{year}/{month}/{booking_code}_v{N}_{timestamp}.pdf
 * - Setiap generate ulang → versi baru, file lama TIDAK dihapus
 * - Hash SHA-256 disimpan untuk verifikasi integritas file
 *
 * Semua operasi write dijalankan dalam DB::transaction.
 * File disimpan KE DISK dulu, baru record DB dibuat.
 * Jika DB insert gagal → file tidak orphan (tidak dilacak, bisa dibersihkan kemudian).
 *
 * ASUMSI: Disk 'local' adalah default disk (storage/app/).
 * ASUMSI: View 'pdf.eticket' sudah tersedia dan bisa di-render oleh ETicketPdfService.
 */
class TicketBackupService
{
    private const BACKUP_DISK = 'local';

    public function __construct(
        private readonly ETicketPdfService $pdfService,
    ) {}

    // =========================================================================
    // Backup — Booking Level
    // =========================================================================

    /**
     * Generate PDF booking dan simpan ke arsip permanen.
     *
     * Setiap panggilan menghasilkan versi baru (v1, v2, v3, ...).
     * Versi sebelumnya TIDAK dihapus — semua histori dipertahankan.
     *
     * @param  Booking    $booking       Booking yang akan di-backup
     * @param  User|null  $generatedBy   User yang men-trigger (null = sistem/cron)
     * @return TicketBackup  Record backup yang baru dibuat
     */
    public function backupBookingTicket(Booking $booking, ?User $generatedBy = null): TicketBackup
    {
        $pdfBytes = $this->pdfService->renderBookingPdf($booking);
        $version  = $this->nextBookingVersion($booking);
        $filePath = $this->buildPath(
            bookingCode: $booking->booking_code,
            type:        'booking',
            seatNo:      null,
            version:     $version,
            booking:     $booking,
        );

        return DB::transaction(function () use ($booking, $pdfBytes, $version, $filePath, $generatedBy): TicketBackup {
            // Simpan file fisik ke private storage
            Storage::disk(self::BACKUP_DISK)->put($filePath, $pdfBytes);

            $hash     = hash('sha256', $pdfBytes);
            $fileSize = strlen($pdfBytes);

            $backup = TicketBackup::create([
                'booking_id'      => $booking->id,
                'passenger_id'    => null,
                'customer_id'     => $booking->customer_id,
                'booking_code'    => (string) $booking->booking_code,
                'ticket_number'   => $booking->ticket_number,
                'invoice_number'  => $booking->invoice_number,
                'passenger_name'  => (string) ($booking->passenger_name ?? 'Penumpang Utama'),
                'backup_type'     => 'booking',
                'file_path'       => $filePath,
                'disk'            => self::BACKUP_DISK,
                'file_hash'       => $hash,
                'file_size_bytes' => $fileSize,
                'version'         => $version,
                'issued_at'       => $booking->ticket_issued_at,
                'backed_up_at'    => now(),
                'generated_by'    => $generatedBy?->id,
            ]);

            // Catat waktu backup terakhir di booking (tanpa memicu event booking)
            $booking->ticket_pdf_generated_at = now();
            $booking->saveQuietly();

            return $backup;
        });
    }

    /**
     * Pastikan backup booking sudah ada.
     * Jika backup terbaru sudah ada DAN file fisiknya masih ada → kembalikan backup itu.
     * Jika tidak ada atau file hilang → generate baru.
     *
     * Berguna untuk "lazy backup" — tidak generate ulang jika tidak perlu.
     */
    public function ensureBookingBackup(Booking $booking, ?User $generatedBy = null): TicketBackup
    {
        $latest = $this->latestBookingBackup($booking);

        if ($latest !== null && $latest->fileExists()) {
            return $latest;
        }

        return $this->backupBookingTicket($booking, $generatedBy);
    }

    // =========================================================================
    // Backup — Passenger Level
    // =========================================================================

    /**
     * Generate PDF per-penumpang dan simpan ke arsip permanen.
     *
     * ASUMSI: View 'pdf.eticket_passenger' tersedia.
     * Jika view belum dibuat, panggilan ini akan throw exception dari DomPDF.
     * Gunakan backupBookingTicket() sebagai alternatif jika view belum ada.
     *
     * @param  BookingPassenger  $passenger
     * @param  User|null         $generatedBy
     * @return TicketBackup
     */
    public function backupPassengerTicket(BookingPassenger $passenger, ?User $generatedBy = null): TicketBackup
    {
        $passenger->loadMissing('booking');
        $booking = $passenger->booking;

        // Gunakan ETicketPdfService::generatePassengerTicket() tapi ambil bytes-nya
        // Karena renderPassengerPdf() perlu dibuat terpisah, kita gunakan approach langsung.
        // Fallback ke booking-level PDF jika passenger view belum ada.
        $pdfBytes = $this->renderPassengerPdfBytes($passenger, $booking);

        $version  = $this->nextPassengerVersion($passenger);
        $filePath = $this->buildPath(
            bookingCode: $booking->booking_code,
            type:        'passenger',
            seatNo:      $passenger->seat_no,
            version:     $version,
            booking:     $booking,
        );

        return DB::transaction(function () use ($booking, $passenger, $pdfBytes, $version, $filePath, $generatedBy): TicketBackup {
            Storage::disk(self::BACKUP_DISK)->put($filePath, $pdfBytes);

            $hash     = hash('sha256', $pdfBytes);
            $fileSize = strlen($pdfBytes);

            $backup = TicketBackup::create([
                'booking_id'      => $booking->id,
                'passenger_id'    => $passenger->id,
                'customer_id'     => $passenger->customer_id,
                'booking_code'    => (string) $booking->booking_code,
                'ticket_number'   => $booking->ticket_number,
                'invoice_number'  => $booking->invoice_number,
                'passenger_name'  => (string) ($passenger->name ?? 'Penumpang'),
                'backup_type'     => 'passenger',
                'file_path'       => $filePath,
                'disk'            => self::BACKUP_DISK,
                'file_hash'       => $hash,
                'file_size_bytes' => $fileSize,
                'version'         => $version,
                'issued_at'       => $booking->ticket_issued_at,
                'backed_up_at'    => now(),
                'generated_by'    => $generatedBy?->id,
            ]);

            return $backup;
        });
    }

    // =========================================================================
    // Query
    // =========================================================================

    /**
     * Backup terbaru (booking-level) untuk suatu booking.
     */
    public function latestBookingBackup(Booking $booking): ?TicketBackup
    {
        return TicketBackup::query()
            ->where('booking_id', $booking->id)
            ->where('backup_type', 'booking')
            ->orderByDesc('backed_up_at')
            ->first();
    }

    /**
     * Semua backup (booking-level + passenger-level) untuk suatu booking,
     * diurutkan dari yang terbaru.
     */
    public function bookingBackups(Booking $booking): Collection
    {
        return TicketBackup::query()
            ->where('booking_id', $booking->id)
            ->orderByDesc('backed_up_at')
            ->get();
    }

    /**
     * Semua backup per-penumpang untuk suatu passenger record.
     */
    public function passengerBackups(BookingPassenger $passenger): Collection
    {
        return TicketBackup::query()
            ->where('passenger_id', $passenger->id)
            ->orderByDesc('backed_up_at')
            ->get();
    }

    // =========================================================================
    // Download / Stream
    // =========================================================================

    /**
     * Ambil konten raw bytes dari backup.
     * Throws \RuntimeException jika file tidak ditemukan.
     */
    public function streamBackup(TicketBackup $backup): string
    {
        return $backup->getContent();
    }

    /**
     * Nama file yang direkomendasikan saat download backup ke browser.
     *
     * Contoh: "ETK-260317-ABCD_v2.pdf"
     */
    public function downloadFilename(TicketBackup $backup): string
    {
        $code = preg_replace('/[^A-Za-z0-9\-_]/', '', (string) $backup->booking_code);

        if ($backup->backup_type === 'passenger') {
            $passenger = $backup->passenger;
            $seatNo    = $passenger ? preg_replace('/[^A-Za-z0-9\-_]/', '', (string) $passenger->seat_no) : 'noSeat';

            return "{$code}_seat_{$seatNo}_v{$backup->version}.pdf";
        }

        return "{$code}_v{$backup->version}.pdf";
    }

    // =========================================================================
    // Private
    // =========================================================================

    private function nextBookingVersion(Booking $booking): int
    {
        $latest = TicketBackup::query()
            ->where('booking_id', $booking->id)
            ->where('backup_type', 'booking')
            ->max('version');

        return (int) ($latest ?? 0) + 1;
    }

    private function nextPassengerVersion(BookingPassenger $passenger): int
    {
        $latest = TicketBackup::query()
            ->where('passenger_id', $passenger->id)
            ->where('backup_type', 'passenger')
            ->max('version');

        return (int) ($latest ?? 0) + 1;
    }

    /**
     * Bangun path file backup.
     *
     * Format: e_tickets/{year}/{month}/{booking_code}_v{N}_{timestamp}.pdf
     * Passenger: e_tickets/{year}/{month}/{booking_code}_seat_{seatNo}_v{N}_{timestamp}.pdf
     *
     * Timestamp disertakan agar tidak ada nama file yang sama meskipun versi sama.
     */
    private function buildPath(
        string   $bookingCode,
        string   $type,
        ?string  $seatNo,
        int      $version,
        Booking  $booking,
    ): string {
        $year     = $booking->trip_date?->format('Y') ?? now()->format('Y');
        $month    = $booking->trip_date?->format('m') ?? now()->format('m');
        $safeCode = preg_replace('/[^A-Za-z0-9\-_]/', '', $bookingCode);
        $ts       = now()->format('YmdHis');

        if ($type === 'passenger' && $seatNo !== null) {
            $safeSeat = preg_replace('/[^A-Za-z0-9\-_]/', '', $seatNo);

            return "e_tickets/{$year}/{$month}/{$safeCode}_seat_{$safeSeat}_v{$version}_{$ts}.pdf";
        }

        return "e_tickets/{$year}/{$month}/{$safeCode}_v{$version}_{$ts}.pdf";
    }

    /**
     * Render PDF penumpang ke raw bytes.
     *
     * Jika view 'pdf.eticket_passenger' tersedia, gunakan itu.
     * Jika tidak, fallback ke renderBookingPdf() sebagai pengganti sementara.
     */
    private function renderPassengerPdfBytes(BookingPassenger $passenger, Booking $booking): string
    {
        if (view()->exists('pdf.eticket_passenger')) {
            return \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.eticket_passenger', [
                'booking'      => $booking,
                'passenger'    => $passenger,
                'generated_at' => now()->format('d/m/Y H:i'),
            ])
            ->setPaper('a6', 'portrait')
            ->setOption('defaultFont', 'sans-serif')
            ->setOption('isHtml5ParserEnabled', true)
            ->setOption('isRemoteEnabled', false)
            ->output();
        }

        // Fallback: gunakan format booking-level jika view passenger belum ada
        return $this->pdfService->renderBookingPdf($booking);
    }
}
