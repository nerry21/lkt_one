<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;
use Throwable;

/**
 * Throw saat double-book seat terdeteksi di SeatLockService.
 *
 * Trigger condition:
 *   - MySQL SQLSTATE 23000 (Integrity constraint violation / 1062 Duplicate entry)
 *     pada UNIQUE KEY uk_booking_seats_active_slot (Section A migration)
 *   - Manual detection oleh SeatLockService saat pre-check lockForUpdate
 *
 * Consumer:
 *   - BookingController (Section F-K) — auto-render ke HTTP 409 via render() method
 *   - Section D SeatLockService catches underlying QueryException, wraps jadi
 *     exception ini via $previous, supaya caller dapat info konflik spesifik
 *
 * Chained exception:
 *   Throw dengan $previous = QueryException original supaya stack trace ke MySQL
 *   error tetap ter-preserve untuk debugging/log.
 *
 * Reference: docs/audit-findings.md bug #2 (race condition) dan #5 (validasi availability).
 *
 * @see \App\Services\SeatLockService::lockSeats() Producer
 *
 * Example:
 *   try {
 *       DB::table('booking_seats')->insert([...]);
 *   } catch (QueryException $e) {
 *       if ($e->getCode() === '23000') {
 *           throw new SeatConflictException(
 *               conflicts: [['date' => '2026-04-20', 'time' => '05:00:00', 'seat' => '1A', 'booking_id' => 123]],
 *               previous: $e,
 *           );
 *       }
 *   }
 */
class SeatConflictException extends Exception
{
    /**
     * @param array<int, array{date: string, time: string, seat: string, booking_id: int}> $conflicts
     */
    public function __construct(
        public readonly array $conflicts,
        string $message = 'Seat conflict detected',
        int $code = 0,
        ?Throwable $previous = null,
    ) {
        parent::__construct($message, $code, $previous);
    }

    public function render(Request $request): SymfonyResponse
    {
        if ($request->wantsJson()) {
            return response()->json([
                'error' => 'seat_conflict',
                'message' => 'Satu atau lebih kursi sudah dibooking oleh customer lain',
                'conflicts' => array_map(
                    fn (array $c): array => [
                        'date' => $c['date'] ?? null,
                        'time' => $c['time'] ?? null,
                        'seat' => $c['seat'] ?? null,
                        'booking_id' => $c['booking_id'] ?? null,
                    ],
                    $this->conflicts,
                ),
            ], 409);
        }

        $conflictSeats = implode(', ', array_filter(array_column($this->conflicts, 'seat')));

        return redirect()->back()->withErrors([
            'wizard_seat_conflict' => sprintf(
                'Kursi %s sudah dibooking customer lain. Silakan pilih kursi lain.',
                $conflictSeats !== '' ? $conflictSeats : 'yang dipilih',
            ),
        ]);
    }

    /**
     * Jangan log exception ini — 409 Conflict adalah user-facing error,
     * bukan bug aplikasi yang perlu alert.
     *
     * Kalau butuh observability untuk business metric seat conflicts (misal
     * track frequency di dashboard ops), gunakan event dispatcher di render(),
     * BUKAN hapus report() false.
     */
    public function report(): bool
    {
        return false;
    }
}
