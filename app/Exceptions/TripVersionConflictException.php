<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;
use Throwable;

/**
 * Throw saat admin coba update/delete trip dengan version yang sudah stale.
 *
 * Trigger: Optimistic lock mismatch via pattern Bug #30 — admin A dan admin B
 * edit trip yang sama bersamaan, admin A submit duluan (version bump), admin B
 * submit dengan version lama → TripService::updateWithVersionCheck() detects
 * affected_rows = 0 → throw ini.
 *
 * Consumer:
 *   - TripController (future — endpoint update/delete/swap trip)
 *   - TripRotationService (future — O1 atomic swap)
 *
 * Tidak di-raise oleh internal mutators yang legit bypass version check (mis.
 * TripService::recompactSequence system-internal renumbering).
 *
 * Reference: docs/trip-planning-design.md §3.4 (optimistic lock pattern Bug #30)
 *
 * @see \App\Services\TripService::updateWithVersionCheck() Producer
 * @see \App\Services\TripService::delete() Producer (stale version guard)
 * @see \App\Services\TripService::swap() Producer (double-sided version guard)
 */
class TripVersionConflictException extends Exception
{
    public function __construct(
        public readonly int $tripId,
        public readonly int $expectedVersion,
        public readonly ?int $currentVersion = null,
        string $message = 'Trip version conflict',
        int $code = 0,
        ?Throwable $previous = null,
    ) {
        parent::__construct($message, $code, $previous);
    }

    public function render(Request $request): SymfonyResponse
    {
        if ($request->wantsJson()) {
            return response()->json([
                'error' => 'trip_version_conflict',
                'message' => 'Data trip sudah diubah oleh admin lain. Silakan refresh dan coba lagi.',
                'trip_id' => $this->tripId,
                'expected_version' => $this->expectedVersion,
                'current_version' => $this->currentVersion,
            ], 409);
        }

        return redirect()->back()->withErrors([
            'version' => 'Data trip sudah diubah oleh admin lain. Silakan refresh dan coba lagi.',
        ]);
    }

    /**
     * 409 Conflict adalah user-facing error (race antar admin), bukan bug
     * aplikasi yang perlu alert/log.
     */
    public function report(): bool
    {
        return false;
    }
}
