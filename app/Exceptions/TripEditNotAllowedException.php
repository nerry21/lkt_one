<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Throwable;

/**
 * Throw saat admin coba edit trip dengan status yang tidak boleh diedit.
 *
 * Trigger: TripCrudService::editManual() detect status IN ('berangkat', 'keluar_trip')
 * — trip yang sudah berangkat atau sedang dalam mode keluar trip tidak boleh
 * diedit langsung untuk menjaga audit trail (sesuai prinsip LKT One = audit system).
 *
 * Consumer:
 *   - TripCrudController::update()
 *
 * @see \App\Services\TripCrudService::editManual() Producer
 */
class TripEditNotAllowedException extends Exception
{
    public function __construct(
        public readonly int $tripId,
        public readonly string $currentStatus,
        string $message = 'Cannot edit trip',
        int $code = 0,
        ?Throwable $previous = null,
    ) {
        parent::__construct($message, $code, $previous);
    }

    public function render(Request $request): JsonResponse
    {
        return response()->json([
            'error' => 'trip_edit_not_allowed',
            'message' => "Trip dengan status '{$this->currentStatus}' tidak bisa diedit (sudah berangkat/keluar trip).",
            'trip_id' => $this->tripId,
            'current_status' => $this->currentStatus,
        ], 403);
    }

    public function report(): bool
    {
        return false;
    }
}
