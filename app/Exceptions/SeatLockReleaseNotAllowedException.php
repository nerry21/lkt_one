<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

/**
 * Throw saat admin coba release hard-locked seats.
 *
 * Trigger condition:
 *   - SeatLockService::releaseSeats() mendeteksi >=1 row booking_seats dengan
 *     lock_type = 'hard' untuk booking yang di-request
 *
 * Aturan bisnis (Fase 1A):
 *   - Hard lock = booking sudah terbayar penuh (cash confirmed / transfer+QRIS verified)
 *   - Release hard lock butuh proses refund khusus (belum di-implement Fase 1A)
 *   - Admin UI harus guard ini di frontend, tapi backend enforce sebagai safety net
 *
 * Consumer:
 *   - BookingController::releaseSeats() (endpoint PATCH /api/bookings/{id}/release-seats)
 *
 * Reference: docs/audit-findings.md bug #2 (race condition handling aturan bisnis).
 *
 * @see \App\Services\SeatLockService::releaseSeats() Producer
 */
class SeatLockReleaseNotAllowedException extends Exception
{
    /**
     * @param array<int, string> $hardLockedSeats Seat numbers yang masih hard-lock
     */
    public function __construct(
        public readonly int $bookingId,
        public readonly array $hardLockedSeats,
        string $message = 'Cannot release hard-locked seats',
        int $code = 0,
        ?Throwable $previous = null,
    ) {
        parent::__construct($message, $code, $previous);
    }

    public function render(Request $request): JsonResponse
    {
        return response()->json([
            'error' => 'lock_release_not_allowed',
            'message' => 'Kursi sudah terbayar (hard lock) — butuh proses refund untuk release',
            'booking_id' => $this->bookingId,
            'hard_locked_seats' => array_values($this->hardLockedSeats),
        ], 403);
    }

    /**
     * Sama seperti SeatConflictException — 403 Forbidden adalah user-facing
     * error karena admin action ditolak sesuai aturan bisnis, bukan bug aplikasi.
     */
    public function report(): bool
    {
        return false;
    }
}
