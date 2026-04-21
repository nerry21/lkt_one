<?php

namespace App\Exceptions;

use RuntimeException;

/**
 * Thrown saat TripGenerationService::generateForDate dipanggil dengan
 * $driverAssignments yang tidak lengkap untuk semua mobil aktif.
 *
 * HTTP 422 Unprocessable Entity (input validation failure).
 *
 * Reference: design doc §5.3 (DP-A v + DP-B a forward case).
 */
class TripGenerationDriverMissingException extends RuntimeException
{
    /**
     * @param array<int, string> $missingMobilIds  UUIDs mobil aktif tanpa driver di mapping
     */
    public function __construct(
        public readonly array $missingMobilIds,
    ) {
        $count = count($missingMobilIds);
        parent::__construct(
            sprintf(
                'Driver assignment missing for %d active mobil: %s',
                $count,
                implode(', ', $missingMobilIds),
            )
        );
    }

    public function getStatusCode(): int
    {
        return 422;
    }
}
