<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

/**
 * Throw saat admin coba delete trip dengan status yang tidak boleh dihapus.
 *
 * Trigger: TripService::delete() detect status IN ('berangkat', 'keluar_trip')
 * — trip yang sudah berangkat atau sedang dalam mode keluar trip tidak boleh
 * dihapus langsung (harus ditutup via flow khusus terlebih dulu).
 *
 * Consumer:
 *   - TripController (future — endpoint DELETE /api/trips/{id})
 *
 * JSON-only response (tidak ada redirect-back fallback) — operasi delete
 * selalu dari admin API, tidak dari form submission klasik.
 *
 * @see \App\Services\TripService::delete() Producer
 */
class TripDeleteNotAllowedException extends Exception
{
    public function __construct(
        public readonly int $tripId,
        public readonly string $currentStatus,
        public readonly string $reason,
        string $message = 'Cannot delete trip',
        int $code = 0,
        ?Throwable $previous = null,
    ) {
        parent::__construct($message, $code, $previous);
    }

    public function render(Request $request): JsonResponse
    {
        return response()->json([
            'error' => 'trip_delete_not_allowed',
            'message' => 'Trip ini tidak boleh dihapus karena ' . $this->reason . '.',
            'trip_id' => $this->tripId,
            'current_status' => $this->currentStatus,
            'reason' => $this->reason,
        ], 403);
    }

    /**
     * 403 Forbidden = aturan bisnis, bukan bug aplikasi.
     */
    public function report(): bool
    {
        return false;
    }
}
