<?php

namespace App\Exceptions;

use RuntimeException;

/**
 * Thrown ketika admin melakukan state transition yang tidak valid untuk trip.
 *
 * Contoh: markBerangkat pada trip yang status-nya sudah 'berangkat',
 * gantiJam pada trip yang sudah 'berangkat', markTidakBerangkat pada
 * trip yang status-nya 'keluar_trip', dll.
 *
 * HTTP 409 Conflict (state conflict).
 *
 * Reference: design doc §5.4 (TripRotationService).
 */
class TripInvalidTransitionException extends RuntimeException
{
    public function __construct(
        public readonly int $tripId,
        public readonly string $currentStatus,
        public readonly string $attemptedAction,
        public readonly string $reason,
    ) {
        parent::__construct(
            sprintf(
                'Cannot %s on trip #%d (current status: %s): %s',
                $attemptedAction,
                $tripId,
                $currentStatus,
                $reason,
            )
        );
    }

    public function getStatusCode(): int
    {
        return 409;
    }
}
