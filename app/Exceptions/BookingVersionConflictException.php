<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;
use Throwable;

/**
 * Throw saat admin coba update booking dengan version yang sudah stale.
 *
 * Trigger: Optimistic lock mismatch — admin A dan admin B edit booking yang sama
 * bersamaan, admin A submit duluan (version bump), admin B submit dengan version
 * lama → WHERE id = ? AND version = ? tidak match → 0 rows affected → throw ini.
 *
 * Business rule: Atomic check-and-set via Booking::updateWithVersionCheck() pada
 * admin-initiated mutation paths (4 API endpoints per bug #30 scope).
 *
 * Consumer: Api\BookingController::update / ::destroy / ::validatePayment /
 * ::updateDepartureStatus dan BookingManagementService::updateBooking.
 *
 * Tidak di-raise oleh internal service mutators (SeatLockService, ETicketPdfService,
 * TicketBackupService, CustomerMerge/MatchingService) karena mereka bypass via
 * saveQuietly() per design doc §10 policy.
 *
 * Reference: docs/bug-30-design.md §6
 * Reference: docs/audit-findings.md:911 (bug #30 registration)
 */
class BookingVersionConflictException extends Exception
{
    public function __construct(
        public readonly int $bookingId,
        public readonly int $expectedVersion,
        string $message = 'Data booking telah diubah oleh admin lain. Silakan refresh dan coba lagi.',
        int $code = 0,
        ?Throwable $previous = null,
    ) {
        parent::__construct($message, $code, $previous);
    }

    public function render(Request $request): SymfonyResponse
    {
        if ($request->wantsJson()) {
            return response()->json([
                'error' => 'booking_version_conflict',
                'message' => $this->getMessage(),
                'booking_id' => $this->bookingId,
                'expected_version' => $this->expectedVersion,
            ], 409);
        }

        return redirect()->back()->withErrors([
            'version' => $this->getMessage(),
        ]);
    }

    public function report(): bool
    {
        return false;
    }
}
