<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;
use Throwable;

/**
 * Throw saat user re-submit wizard review untuk booking yang sudah terbayar.
 *
 * Trigger condition:
 *   - *BookingPersistenceService::persistDraft detect booking existing dengan
 *     payment_status IN ['Dibayar', 'Dibayar Tunai']
 *   - User navigate back ke review step + re-submit
 *
 * Generic untuk semua wizard category (Regular M2, Rental M3, Package M4 future).
 * Constructor accept $category untuk response context.
 *
 * Dual render:
 *   - wantsJson() true → HTTP 409 JSON (API consumer)
 *   - wantsJson() false → redirect()->back() dengan flash error key
 *     'wizard_back_edit_blocked' (Blade wizard)
 *
 * Reference: docs/audit-findings.md bug #22 (Regular), #25 (Rental), #27 (Package).
 *
 * @see \App\Services\RegularBookingPersistenceService::persistDraft() Producer (M2)
 */
class WizardBackEditOnPaidBookingException extends Exception
{
    public function __construct(
        public readonly int $bookingId,
        public readonly string $bookingCode,
        public readonly string $category,
        string $message = '',
        int $code = 0,
        ?Throwable $previous = null,
    ) {
        parent::__construct(
            $message !== '' ? $message : 'Booking sudah terbayar, tidak bisa edit di wizard',
            $code,
            $previous,
        );
    }

    public function render(Request $request): SymfonyResponse
    {
        if ($request->wantsJson()) {
            return response()->json([
                'error' => 'wizard_back_edit_paid_blocked',
                'message' => 'Booking sudah terbayar, tidak bisa edit di wizard review',
                'booking_id' => $this->bookingId,
                'booking_code' => $this->bookingCode,
                'category' => $this->category,
            ], 409);
        }

        return redirect()->back()->withErrors([
            'wizard_back_edit_blocked' => 'Booking sudah terbayar, tidak bisa edit di wizard. Silakan gunakan endpoint admin untuk perubahan.',
        ]);
    }

    /**
     * Sama seperti SeatConflictException — user-facing business rule,
     * bukan bug aplikasi yang perlu alert.
     */
    public function report(): bool
    {
        return false;
    }
}
