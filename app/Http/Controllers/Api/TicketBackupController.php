<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\TicketBackup;
use App\Models\User;
use App\Services\TicketBackupService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * TicketBackupController (API)
 *
 * Endpoint untuk manajemen arsip permanen PDF E-Ticket.
 * Semua endpoint dilindungi middleware jwt.auth + admin.role:admin.
 *
 * Endpoint:
 *   GET  /api/bookings/{booking}/ticket-backups              — list semua backup
 *   POST /api/bookings/{booking}/ticket-backups              — trigger generate backup baru
 *   GET  /api/bookings/{booking}/ticket-backups/latest/download — download backup terbaru
 *   GET  /api/bookings/{booking}/ticket-backups/{backup}/download — download backup spesifik
 *   GET  /api/bookings/{booking}/ticket-backups/{backup}/verify  — verifikasi integritas file
 */
class TicketBackupController extends Controller
{
    public function __construct(
        private readonly TicketBackupService $backupService,
    ) {}

    // =========================================================================
    // List backups
    // =========================================================================

    /**
     * GET /api/bookings/{booking}/ticket-backups
     *
     * Daftar semua backup (booking + passenger) untuk satu booking,
     * diurutkan dari terbaru.
     */
    public function index(Request $request, string $booking): JsonResponse
    {
        $this->actor($request);

        $b       = $this->findBooking($booking);
        $backups = $this->backupService->bookingBackups($b);

        return response()->json([
            'booking_code' => $b->booking_code,
            'count'        => $backups->count(),
            'backups'      => $backups->map(fn (TicketBackup $tb): array => $this->backupItem($tb)),
        ]);
    }

    // =========================================================================
    // Generate backup baru
    // =========================================================================

    /**
     * POST /api/bookings/{booking}/ticket-backups
     *
     * Trigger generate dan simpan backup baru (booking-level).
     * Setiap panggilan menghasilkan versi baru — histori lama tetap ada.
     *
     * Response 201: backup baru berhasil dibuat
     */
    public function store(Request $request, string $booking): JsonResponse
    {
        $actor = $this->actor($request);
        $b     = $this->findBooking($booking);

        $backup = $this->backupService->backupBookingTicket($b, $actor);

        return response()->json([
            'message' => 'Backup E-Ticket berhasil dibuat.',
            'backup'  => $this->backupItem($backup),
        ], 201);
    }

    // =========================================================================
    // Download
    // =========================================================================

    /**
     * GET /api/bookings/{booking}/ticket-backups/latest/download
     *
     * Download backup terbaru (booking-level).
     * Jika belum ada backup → generate dulu, lalu download.
     */
    public function downloadLatest(Request $request, string $booking): StreamedResponse
    {
        $actor  = $this->actor($request);
        $b      = $this->findBooking($booking);
        $backup = $this->backupService->ensureBookingBackup($b, $actor);

        return $this->streamBackupResponse($backup);
    }

    /**
     * GET /api/bookings/{booking}/ticket-backups/{backup}/download
     *
     * Download backup spesifik berdasarkan ID backup.
     * Memvalidasi bahwa backup ini milik booking yang dimaksud.
     */
    public function download(Request $request, string $booking, string $backup): StreamedResponse
    {
        $this->actor($request);

        $b  = $this->findBooking($booking);
        $tb = $this->findBackup($backup, $b);

        return $this->streamBackupResponse($tb);
    }

    // =========================================================================
    // Verify integritas
    // =========================================================================

    /**
     * GET /api/bookings/{booking}/ticket-backups/{backup}/verify
     *
     * Verifikasi integritas file backup dengan mengecek SHA-256 hash.
     * Berguna untuk audit — memastikan file tidak dimodifikasi sejak di-backup.
     */
    public function verify(Request $request, string $booking, string $backup): JsonResponse
    {
        $this->actor($request);

        $b  = $this->findBooking($booking);
        $tb = $this->findBackup($backup, $b);

        $fileExists = $tb->fileExists();
        $isIntact   = $fileExists && $tb->verifyIntegrity();

        return response()->json([
            'backup_id'    => $tb->id,
            'booking_code' => $tb->booking_code,
            'version'      => $tb->version,
            'file_exists'  => $fileExists,
            'hash_stored'  => $tb->file_hash,
            'is_intact'    => $isIntact,
            'status'       => match (true) {
                ! $fileExists => 'FILE_MISSING',
                $isIntact     => 'OK',
                default       => 'HASH_MISMATCH',
            },
        ]);
    }

    // =========================================================================
    // Private helpers
    // =========================================================================

    private function streamBackupResponse(TicketBackup $backup): StreamedResponse
    {
        if (! $backup->fileExists()) {
            throw new HttpException(404, 'File backup tidak ditemukan di storage.');
        }

        $content  = $this->backupService->streamBackup($backup);
        $filename = $this->backupService->downloadFilename($backup);

        return response()->streamDownload(
            callback: function () use ($content): void {
                echo $content;
            },
            name:    $filename,
            headers: [
                'Content-Type'        => 'application/pdf',
                'Content-Length'      => strlen($content),
                'Content-Disposition' => 'attachment; filename="' . $filename . '"',
                'Cache-Control'       => 'no-store, no-cache',
                'Pragma'              => 'no-cache',
            ],
        );
    }

    private function backupItem(TicketBackup $tb): array
    {
        return [
            'id'             => $tb->id,
            'backup_type'    => $tb->backup_type,
            'version'        => $tb->version,
            'booking_code'   => $tb->booking_code,
            'ticket_number'  => $tb->ticket_number,
            'passenger_name' => $tb->passenger_name,
            'file_path'      => $tb->file_path,
            'disk'           => $tb->disk,
            'file_hash'      => $tb->file_hash,
            'file_size_bytes'=> $tb->file_size_bytes,
            'file_exists'    => $tb->fileExists(),
            'backed_up_at'   => $tb->backed_up_at?->toDateTimeString(),
            'issued_at'      => $tb->issued_at?->toDateTimeString(),
            'label'          => $tb->label,
            'download_url'   => url("/api/bookings/{$tb->booking_id}/ticket-backups/{$tb->id}/download"),
            'verify_url'     => url("/api/bookings/{$tb->booking_id}/ticket-backups/{$tb->id}/verify"),
        ];
    }

    private function findBooking(string $id): Booking
    {
        $booking = Booking::query()->find($id);

        if (! $booking instanceof Booking) {
            throw new HttpException(404, 'Data booking tidak ditemukan.');
        }

        return $booking;
    }

    private function findBackup(string $id, Booking $booking): TicketBackup
    {
        $tb = TicketBackup::query()
            ->where('id', $id)
            ->where('booking_id', $booking->id)
            ->first();

        if (! $tb instanceof TicketBackup) {
            throw new HttpException(404, 'Backup tidak ditemukan untuk booking ini.');
        }

        return $tb;
    }

    private function actor(Request $request): User
    {
        $user = $request->user();

        if (! $user instanceof User) {
            throw new HttpException(403, 'Akses ditolak.');
        }

        return $user;
    }
}
