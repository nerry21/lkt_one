<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;
use Throwable;

/**
 * Sesi 44C PR #1C — Throw saat user input rute yang secara fisik mustahil
 * (e.g. Aliantan ↔ Petapahan: mobil tidak melewati keduanya).
 *
 * Trigger:
 *   - BookingUpsertRequest::after — fail-fast di FormRequest layer (errors->add)
 *   - BookingClusterService::resolveBookingCluster — defense di service layer
 *   - BookingManagementService::persistBooking — explicit guard sebelum persist
 *
 * HTTP 422 (Unprocessable Entity) — bukan 409 karena ini validation error,
 * bukan resource conflict.
 *
 * @see \App\Services\BookingClusterService
 */
class ForbiddenRouteException extends Exception
{
    public function __construct(
        public readonly string $fromCity,
        public readonly string $toCity,
        ?Throwable $previous = null,
    ) {
        parent::__construct(
            sprintf('Rute %s ↔ %s tidak tersedia (jalur fisik berbeda)', $fromCity, $toCity),
            0,
            $previous,
        );
    }

    public function render(Request $request): SymfonyResponse
    {
        if ($request->wantsJson()) {
            return response()->json([
                'error' => 'forbidden_route',
                'error_code' => 'FORBIDDEN_ROUTE',
                'message' => $this->getMessage(),
                'from_city' => $this->fromCity,
                'to_city' => $this->toCity,
            ], 422);
        }

        return redirect()->back()
            ->withInput()
            ->withErrors([
                'to_city' => $this->getMessage(),
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
