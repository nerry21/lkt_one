<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;
use Throwable;

/**
 * Throw saat trigger Same-Day Return (Fase E5) melanggar pre-condition
 * terhadap trip asal atau slot target.
 *
 * Trigger points:
 *   - SameDayReturnService::createSameDayReturn() validate pre-conditions:
 *       * origin_direction_invalid — trip asal bukan ROHUL → PKB
 *       * origin_status_invalid    — trip asal belum scheduled/berangkat
 *       * origin_already_has_return — trip asal sudah punya SDR pair
 *       * slot_unavailable          — slot jam target tidak tersedia
 *
 * Discriminator `conflictType` membedakan 4 kasus supaya UI admin bisa render
 * pesan dan action berbeda (pilih trip asal lain vs tunggu status vs slot lain).
 *
 * Consumer:
 *   - SameDayReturnController (future — endpoint POST /trips/{id}/same-day-return)
 *
 * Reference: handoff Sesi 30 DP-E5.11 (exception contract).
 *
 * @see \App\Services\SameDayReturnService
 */
class SameDayReturnConflictException extends Exception
{
    public function __construct(
        public readonly int $originTripId,
        public readonly string $conflictType,
        public readonly ?string $mobilId = null,
        string $message = 'Same-day return conflict',
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
                'error' => 'same_day_return_conflict',
                'conflict_type' => $this->conflictType,
                'message' => $userMessage,
                'origin_trip_id' => $this->originTripId,
                'mobil_id' => $this->mobilId,
            ], 409);
        }

        return redirect()->back()->withErrors([
            'trip_conflict' => $userMessage,
        ]);
    }

    /**
     * 409 Conflict adalah user-facing error (pre-condition SDR gagal); jangan
     * log sebagai bug.
     */
    public function report(): bool
    {
        return false;
    }

    /**
     * Pesan Indonesian untuk admin — beda per conflictType supaya admin tahu
     * action yang harus dilakukan.
     */
    private function buildUserMessage(): string
    {
        return match ($this->conflictType) {
            'origin_direction_invalid'   => 'Trip asal harus arah ROHUL → PKB.',
            'origin_status_invalid'      => 'Trip asal harus berstatus scheduled atau berangkat.',
            'origin_already_has_return'  => 'Trip asal sudah punya same-day return pair.',
            'slot_unavailable'           => 'Slot yang dipilih tidak tersedia.',
            default                      => 'Same-day return conflict tidak dikenal.',
        };
    }
}
