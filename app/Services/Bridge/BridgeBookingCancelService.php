<?php

declare(strict_types=1);

namespace App\Services\Bridge;

use App\Exceptions\SeatConflictException;
use App\Models\Booking;
use App\Models\Trip;
use App\Services\BookingNotificationPendingService;
use App\Services\TripGenerationService;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

/**
 * Sesi 76 PR-CRM-6K3 — Cancel + reschedule booking via Bridge dari Chatbot.
 *
 * cancelBooking: flag booking_status='Dibatalkan' dengan cancellation_reason.
 * rescheduleBooking: pindah booking ke slot lain hari yang sama, validate seat.
 *
 * Re-use:
 *   - BookingNotificationPendingService untuk record event notif individual
 *   - Booking::query()->whereKey()->update() pattern (Sesi 13 lesson — version
 *     tidak di fillable, mutasi via atomic check-and-set di Booking model).
 */
class BridgeBookingCancelService
{
    public const REASON_CANCELLED_BY_ADMIN = 'cancelled_by_admin';
    public const REASON_NO_SHOW_FINAL = 'no_show_final';

    public const VALID_REASONS = [
        self::REASON_CANCELLED_BY_ADMIN,
        self::REASON_NO_SHOW_FINAL,
    ];

    public const CANCELLABLE_STATUSES = ['Diproses', 'Dibayar', 'Menunggu Pembayaran Cash'];

    public function __construct(
        private readonly BookingNotificationPendingService $notificationPending,
    ) {}

    public function cancelBooking(string $bookingCode, string $cancellationReason): Booking
    {
        if (! in_array($cancellationReason, self::VALID_REASONS, true)) {
            throw ValidationException::withMessages([
                'cancellation_reason' => [sprintf(
                    "cancellation_reason '%s' tidak valid (harus salah satu dari: %s).",
                    $cancellationReason,
                    implode(', ', self::VALID_REASONS),
                )],
            ]);
        }

        return DB::transaction(function () use ($bookingCode, $cancellationReason): Booking {
            $booking = Booking::query()
                ->where('booking_code', $bookingCode)
                ->lockForUpdate()
                ->first();

            if ($booking === null) {
                throw ValidationException::withMessages([
                    'booking_code' => ["Booking dengan kode {$bookingCode} tidak ditemukan."],
                ]);
            }

            if (! in_array($booking->booking_status, self::CANCELLABLE_STATUSES, true)) {
                throw ValidationException::withMessages([
                    'booking_status' => [sprintf(
                        "Booking %s status '%s' tidak bisa dibatalkan (hanya dari status: %s).",
                        $bookingCode,
                        $booking->booking_status,
                        implode(', ', self::CANCELLABLE_STATUSES),
                    )],
                ]);
            }

            $booking->booking_status = 'Dibatalkan';
            $booking->cancellation_reason = $cancellationReason;
            $booking->save();

            return $booking->fresh();
        });
    }

    /**
     * @return array{booking: Booking, old_trip_time: string|null, new_trip_time: string}
     */
    public function rescheduleBooking(string $bookingCode, string $newTripTime, ?string $newSeat = null): array
    {
        $normalized = $this->normalizeTripTime($newTripTime);

        if (! in_array($normalized, TripGenerationService::SLOTS, true)) {
            throw ValidationException::withMessages([
                'new_trip_time' => [sprintf(
                    "new_trip_time '%s' bukan slot valid (harus: %s).",
                    $newTripTime,
                    implode(', ', TripGenerationService::SLOTS),
                )],
            ]);
        }

        return DB::transaction(function () use ($bookingCode, $normalized, $newSeat): array {
            $booking = Booking::query()
                ->where('booking_code', $bookingCode)
                ->lockForUpdate()
                ->first();

            if ($booking === null) {
                throw ValidationException::withMessages([
                    'booking_code' => ["Booking dengan kode {$bookingCode} tidak ditemukan."],
                ]);
            }

            if (! in_array($booking->booking_status, self::CANCELLABLE_STATUSES, true)) {
                throw ValidationException::withMessages([
                    'booking_status' => [sprintf(
                        "Booking %s status '%s' tidak bisa di-reschedule.",
                        $bookingCode,
                        $booking->booking_status,
                    )],
                ]);
            }

            $oldTripTime = (string) $booking->trip_time;
            $tripDate = optional($booking->trip_date)->toDateString() ?? (string) $booking->trip_date;
            $bookingDirection = (string) $booking->direction;
            $tripDirection = $this->mapBookingDirectionToTrip($bookingDirection);

            $targetTrip = $tripDirection !== null ? Trip::query()
                ->where('trip_date', $tripDate)
                ->where('trip_time', $normalized)
                ->where('direction', $tripDirection)
                ->where('status', 'scheduled')
                ->orderBy('sequence')
                ->first() : null;

            $existingSeats = is_array($booking->selected_seats)
                ? array_values($booking->selected_seats)
                : [];
            $requestedSeat = $newSeat !== null
                ? strtoupper(trim($newSeat))
                : ($existingSeats[0] ?? null);

            if ($requestedSeat === null || $requestedSeat === '') {
                throw ValidationException::withMessages([
                    'new_seat' => ['Booking tanpa selected_seats existing wajib provide new_seat.'],
                ]);
            }

            $occupied = $this->getOccupiedSeatsInSlot($tripDate, $normalized, $bookingDirection, $booking->id);

            if (in_array($requestedSeat, $occupied, true)) {
                throw new SeatConflictException(
                    conflicts: [[
                        'date' => $tripDate,
                        'time' => $normalized,
                        'seat' => $requestedSeat,
                        'booking_id' => $booking->id,
                    ]],
                    message: sprintf("Kursi %s di slot %s sudah dipakai.", $requestedSeat, $normalized),
                );
            }

            $newSeats = $newSeat !== null ? [$requestedSeat] : $existingSeats;

            $updateData = [
                'trip_time' => $normalized,
                'selected_seats' => json_encode($newSeats),
            ];

            if ($targetTrip !== null) {
                $updateData['trip_id'] = $targetTrip->id;
            }

            Booking::query()->whereKey($booking->id)->update($updateData);

            return [
                'booking' => $booking->fresh(),
                'old_trip_time' => $oldTripTime,
                'new_trip_time' => $normalized,
            ];
        });
    }

    /**
     * Map Booking.direction (to_pkb/from_pkb) ke Trip.direction
     * (ROHUL_TO_PKB/PKB_TO_ROHUL).
     */
    private function mapBookingDirectionToTrip(string $bookingDirection): ?string
    {
        return match ($bookingDirection) {
            'to_pkb' => 'ROHUL_TO_PKB',
            'from_pkb' => 'PKB_TO_ROHUL',
            default => null,
        };
    }

    private function normalizeTripTime(string $tripTime): string
    {
        $trimmed = trim($tripTime);
        if (preg_match('/^\d{2}:\d{2}$/', $trimmed)) {
            return $trimmed . ':00';
        }
        return $trimmed;
    }

    /**
     * Hitung kursi yang sudah dipakai di slot target — exclude booking yang
     * sedang di-reschedule (supaya seat-nya sendiri tidak count sebagai occupied).
     *
     * @return array<int, string>
     */
    private function getOccupiedSeatsInSlot(string $tripDate, string $tripTime, string $direction, int $excludeBookingId): array
    {
        $bookings = Booking::query()
            ->where('trip_date', $tripDate)
            ->where('trip_time', $tripTime)
            ->where('direction', $direction)
            ->whereIn('booking_status', self::CANCELLABLE_STATUSES)
            ->where('id', '!=', $excludeBookingId)
            ->get(['id', 'selected_seats']);

        $occupied = [];
        foreach ($bookings as $b) {
            $seats = is_array($b->selected_seats) ? $b->selected_seats : [];
            foreach ($seats as $s) {
                $occupied[] = strtoupper((string) $s);
            }
        }

        return array_values(array_unique($occupied));
    }
}
