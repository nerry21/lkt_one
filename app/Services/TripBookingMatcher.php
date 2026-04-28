<?php

namespace App\Services;

use App\Models\Trip;
use App\Traits\NormalizesTripTime;
use Illuminate\Support\Facades\Log;

/**
 * Sesi 50 PR #1 — matcher Trip ↔ Booking Reguler.
 *
 * Stateless service: dari atribut booking (date/time/direction/armada_index/route_via)
 * cari Trip yang match dan extract assignment (trip_id, mobil_id, driver_id, driver_name).
 *
 * Invariant matching (I1 di docs/trip-planning-design.md §3.4):
 *   1 baris Trip = 1 (trip_date, trip_time, direction, sequence). Tidak ada UNIQUE
 *   constraint DB-level karena reordering sequence butuh swap bebas, tapi service
 *   layer maintain invariant ini.
 *
 * Cluster filter:
 *   Mobil tidak punya kolom `cluster` (lihat schema mobil — 10 kolom). Cluster routing
 *   ditentukan pada level booking via from_city/to_city/route_via di
 *   BookingClusterService. Trip-level cluster filter di-skip — disambiguasi cluster
 *   tetap di-handle di BookingManagementService::persistBooking via
 *   isClusterCompatible() guard saat insert booking baru ke slot armada yang sama.
 *
 * Status filter:
 *   Trip status tidak_berangkat dan tidak_keluar_trip TIDAK boleh di-link — trip
 *   sudah dibatalkan, link ke trip itu = data anomali.
 */
class TripBookingMatcher
{
    use NormalizesTripTime;

    /**
     * Map booking direction (to_pkb/from_pkb) ke Trip direction (ROHUL_TO_PKB/PKB_TO_ROHUL).
     * Return null kalau direction tidak dikenali.
     */
    public function mapBookingDirectionToTripDirection(string $bookingDirection): ?string
    {
        return match (strtolower(trim($bookingDirection))) {
            'to_pkb'   => 'ROHUL_TO_PKB',
            'from_pkb' => 'PKB_TO_ROHUL',
            default    => null,
        };
    }

    /**
     * Cari Trip yang match dengan slot booking.
     *
     * @param string $tripDate          Format Y-m-d
     * @param string $tripTime          HH:MM atau HH:MM:SS (auto-normalize)
     * @param string $bookingDirection  to_pkb | from_pkb
     * @param int    $armadaIndex       Index armada (>=1) — map ke trips.sequence
     * @param string|null $routeVia     BANGKINANG | PETAPAHAN — defensive future use, saat
     *                                  ini di-skip karena mobil belum punya cluster column
     */
    public function findMatchingTrip(
        string $tripDate,
        string $tripTime,
        string $bookingDirection,
        int $armadaIndex,
        ?string $routeVia = null,
    ): ?Trip {
        $tripDirection = $this->mapBookingDirectionToTripDirection($bookingDirection);

        if ($tripDirection === null) {
            return null;
        }

        $normalizedTime = $this->normalizeTripTime($tripTime);
        $sequence = max(1, $armadaIndex);

        $matches = Trip::query()
            ->where('trip_date', $tripDate)
            ->where('trip_time', $normalizedTime)
            ->where('direction', $tripDirection)
            ->where('sequence', $sequence)
            ->whereNotIn('status', ['tidak_berangkat', 'tidak_keluar_trip'])
            ->orderBy('id')
            ->get();

        if ($matches->isEmpty()) {
            return null;
        }

        if ($matches->count() > 1) {
            Log::warning('TripBookingMatcher: multiple Trip matches violate I1 invariant', [
                'trip_date'        => $tripDate,
                'trip_time'        => $normalizedTime,
                'direction'        => $tripDirection,
                'sequence'         => $sequence,
                'matched_trip_ids' => $matches->pluck('id')->all(),
            ]);
        }

        return $matches->first();
    }

    /**
     * Extract assignment (trip_id, mobil_id, driver_id, driver_name) dari Trip.
     *
     * Trip null              → semua null
     * Trip ada tanpa mobil   → trip_id ada, mobil/driver null
     * Trip ada lengkap       → semua terisi
     *
     * @return array{trip_id: int|null, mobil_id: string|null, driver_id: string|null, driver_name: string|null}
     */
    public function extractAssignmentFromTrip(?Trip $trip): array
    {
        if ($trip === null) {
            return [
                'trip_id'     => null,
                'mobil_id'    => null,
                'driver_id'   => null,
                'driver_name' => null,
            ];
        }

        $trip->loadMissing(['mobil', 'driver']);

        return [
            'trip_id'     => (int) $trip->id,
            'mobil_id'    => $trip->mobil_id ?: null,
            'driver_id'   => $trip->driver_id ?: null,
            'driver_name' => $trip->driver_id ? ($trip->driver?->nama) : null,
        ];
    }
}
