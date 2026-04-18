<?php

namespace App\Traits;

/**
 * Normalizes trip time input to canonical HH:MM:SS format.
 *
 * Handles:
 * - Empty input → '00:00:00' (defensive fallback)
 * - 'HH:MM' → 'HH:MM:SS' (auto-append :00)
 * - 'HH:MM:SS' → pass through
 * - Padded input (e.g., ' 08:00 ') → trim-first then normalize
 *
 * Resolves bug #28 — previously 6 private helper duplicates with variance
 * between trim-first (2 services) and no-trim (4 services).
 *
 * @see docs/audit-findings.md bug #28
 */
trait NormalizesTripTime
{
    /**
     * Normalize trip_time string to canonical 'HH:MM:SS' format.
     *
     * @param string|null $value Raw trip_time input, may be null/empty/padded.
     * @return string Canonical 'HH:MM:SS' form. Returns '00:00:00' for empty input.
     */
    protected function normalizeTripTime(?string $value): string
    {
        $trimmed = trim((string) $value);

        if ($trimmed === '') {
            return '00:00:00';
        }

        return strlen($trimmed) === 5 ? $trimmed . ':00' : $trimmed;
    }
}
