<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;
use Throwable;

/**
 * Throw saat insert/update trip melanggar invariant slot atau mobil occupancy.
 *
 * Trigger:
 *   - Invariant I1 (slot uniqueness): TripService::assertSlotAvailable() detect
 *     existing trip dengan (trip_date, trip_time, direction) yang sama dan
 *     status NOT IN ('tidak_berangkat', 'tidak_keluar_trip').
 *   - Invariant I2 (mobil single-assign): TripService::assertMobilNotDoubleAssigned()
 *     detect mobil sudah dijadwalkan di (trip_date, direction) yang sama.
 *
 * Discriminator `conflictType` membedakan dua kasus supaya UI bisa render pesan
 * dan action yang berbeda (reassign slot vs pilih mobil lain).
 *
 * Consumer:
 *   - TripController (future — insert manual, update, keluar trip flow)
 *
 * Reference: docs/trip-planning-design.md §3.4 invariants I1 & I2
 *
 * @see \App\Services\TripService
 */
class TripSlotConflictException extends Exception
{
    public function __construct(
        public readonly string $tripDate,
        public readonly string $tripTime,
        public readonly string $direction,
        public readonly string $conflictType,
        public readonly ?string $mobilId = null,
        string $message = 'Trip slot/mobil conflict',
        int $code = 0,
        ?Throwable $previous = null,
    ) {
        parent::__construct($message, $code, $previous);
    }

    public function render(Request $request): SymfonyResponse
    {
        $userMessage = $this->buildUserMessage();

        if ($request->wantsJson()) {
            return response()->json([
                'error' => 'trip_slot_conflict',
                'conflict_type' => $this->conflictType,
                'message' => $userMessage,
                'trip_date' => $this->tripDate,
                'trip_time' => $this->tripTime,
                'direction' => $this->direction,
                'mobil_id' => $this->mobilId,
            ], 409);
        }

        return redirect()->back()->withErrors([
            'trip_conflict' => $userMessage,
        ]);
    }

    /**
     * 409 Conflict adalah user-facing error (double-book slot/mobil); jangan
     * log sebagai bug.
     */
    public function report(): bool
    {
        return false;
    }

    /**
     * Pesan Indonesian untuk admin — beda antara slot conflict vs mobil conflict.
     */
    private function buildUserMessage(): string
    {
        $pretty = $this->direction === 'PKB_TO_ROHUL' ? 'PKB → ROHUL' : 'ROHUL → PKB';

        if ($this->conflictType === 'mobil') {
            return sprintf(
                'Mobil sudah dijadwalkan pada %s arah %s.',
                $this->tripDate,
                $pretty,
            );
        }

        return sprintf(
            'Slot %s %s pada %s sudah terisi oleh trip lain.',
            $this->tripTime,
            $pretty,
            $this->tripDate,
        );
    }
}
