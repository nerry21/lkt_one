<?php

namespace App\Helpers;

use InvalidArgumentException;

/**
 * Mapper bidirectional Trip.direction ↔ KeuanganJet.direction.
 *
 * Domain decision (Sesi 38 design lock):
 *   ROHUL adalah home base JET Travel (Pasirpengaraian = ibu kota Rohul).
 *   - ROHUL_TO_PKB = Keberangkatan (out from home base)
 *   - PKB_TO_ROHUL = Kepulangan (back to home base)
 *
 * Pure helper — stateless, no DI, no DB access. Pakai static method untuk
 * convenience di service layer dan controller.
 */
final class KeuanganJetDirectionMapper
{
    /**
     * Trip.direction → KeuanganJet.direction
     *
     * @throws InvalidArgumentException kalau direction tidak valid
     */
    public static function fromTripDirection(string $tripDirection): string
    {
        return match ($tripDirection) {
            'ROHUL_TO_PKB' => 'Keberangkatan',
            'PKB_TO_ROHUL' => 'Kepulangan',
            default => throw new InvalidArgumentException(
                "Trip direction '{$tripDirection}' tidak dikenali. Expected 'ROHUL_TO_PKB' atau 'PKB_TO_ROHUL'."
            ),
        };
    }

    /**
     * KeuanganJet.direction → Trip.direction (reverse mapping)
     */
    public static function toTripDirection(string $keuanganDirection): string
    {
        return match ($keuanganDirection) {
            'Keberangkatan' => 'ROHUL_TO_PKB',
            'Kepulangan' => 'PKB_TO_ROHUL',
            default => throw new InvalidArgumentException(
                "Keuangan direction '{$keuanganDirection}' tidak dikenali."
            ),
        };
    }

    /**
     * Cek apakah trip direction = Kepulangan (untuk trigger siklus complete logic).
     */
    public static function isKepulangan(string $tripDirection): bool
    {
        return $tripDirection === 'PKB_TO_ROHUL';
    }

    /**
     * Cek apakah trip direction = Keberangkatan.
     */
    public static function isKeberangkatan(string $tripDirection): bool
    {
        return $tripDirection === 'ROHUL_TO_PKB';
    }
}
