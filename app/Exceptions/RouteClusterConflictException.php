<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;
use Throwable;

/**
 * Sesi 44C PR #1C — Throw saat slot armada sudah commit ke 1 cluster
 * (mis. BANGKINANG) dan booking baru coba submit cluster lain (mis. PETAPAHAN).
 *
 * Skenario:
 *   - Slot (2026-04-27, 08:00, to_pkb, armada=1) sudah ada booking Aliantan→PKB (BANGKINANG)
 *   - Admin coba input booking Petapahan→PKB (PETAPAHAN) di slot armada yang sama
 *   - Mobil fisik tidak bisa lewat 2 jalur → THROW
 *
 * Trigger:
 *   - BookingManagementService::persistBooking — sebelum save() + lockSeats()
 *
 * Resolution untuk admin: pilih `armada_index` lain ATAU ganti `route_via`.
 *
 * HTTP 422 (validation error, not race condition).
 */
class RouteClusterConflictException extends Exception
{
    /**
     * @param  array<int, int|string>  $conflictingBookings Booking IDs/codes yang jadi cause
     */
    public function __construct(
        public readonly string $existingCluster,
        public readonly string $attemptedCluster,
        public readonly array $conflictingBookings,
        public readonly string $tripDate,
        public readonly string $tripTime,
        public readonly int $armadaIndex,
        ?Throwable $previous = null,
    ) {
        parent::__construct(
            sprintf(
                'Slot armada %d (%s %s) sudah commit ke jalur %s. Booking baru jalur %s tidak bisa di-mix.',
                $armadaIndex,
                $tripDate,
                $tripTime,
                $existingCluster,
                $attemptedCluster,
            ),
            0,
            $previous,
        );
    }

    public function render(Request $request): SymfonyResponse
    {
        if ($request->wantsJson()) {
            return response()->json([
                'error' => 'route_cluster_conflict',
                'error_code' => 'ROUTE_CLUSTER_CONFLICT',
                'message' => $this->getMessage(),
                'existing_cluster' => $this->existingCluster,
                'attempted_cluster' => $this->attemptedCluster,
                'conflicting_bookings' => $this->conflictingBookings,
                'trip_date' => $this->tripDate,
                'trip_time' => $this->tripTime,
                'armada_index' => $this->armadaIndex,
                'hint' => 'Pilih armada_index lain atau ganti route_via untuk match cluster armada existing.',
            ], 422);
        }

        return redirect()->back()
            ->withInput()
            ->withErrors([
                'armada_index' => $this->getMessage(),
            ]);
    }

    /**
     * User-facing validation error — bukan bug aplikasi.
     */
    public function report(): bool
    {
        return false;
    }
}
