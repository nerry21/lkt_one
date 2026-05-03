<?php

declare(strict_types=1);

namespace App\Services\Bridge;

use App\Models\Booking;
use App\Models\Trip;
use App\Services\TripRotationService;

/**
 * Sesi 76 PR-CRM-6K3 — Trip-level action wrapper untuk Chatbot bridge.
 *
 * markTripTidakBerangkat: wrap TripRotationService::markTidakBerangkat dengan
 *   auto-fetch expectedVersion (chatbot context tidak punya version).
 *
 * getAvailableSlotsToday: list trip lain di tanggal yang sama untuk reschedule
 *   pilihan ke-2 (pindah ke trip lain hari ini).
 */
class BridgeTripActionService
{
    public const ACTIVE_BOOKING_STATUSES = ['Diproses', 'Dibayar', 'Menunggu Pembayaran Cash'];
    public const SEAT_LAYOUT = ['1A', '2A', '2B', '3A', '4A', '5A'];
    public const TOTAL_CAPACITY = 6;

    public function __construct(
        private readonly TripRotationService $tripRotation,
    ) {}

    public function markTripTidakBerangkat(int $tripId, ?int $expectedVersion = null): Trip
    {
        if ($expectedVersion === null) {
            $trip = Trip::query()->findOrFail($tripId);
            $expectedVersion = (int) ($trip->version ?? 0);
        }

        return $this->tripRotation->markTidakBerangkat($tripId, $expectedVersion);
    }

    /**
     * @return array<int, array{
     *   trip_id: int,
     *   trip_time: string,
     *   available_seats: array<int, string>,
     *   total_capacity: int,
     *   mobil_kode: string|null,
     *   driver_name: string|null,
     * }>
     */
    public function getAvailableSlotsToday(string $tripDate, string $direction, int $excludeTripId): array
    {
        $trips = Trip::query()
            ->with(['mobil', 'driver'])
            ->where('trip_date', $tripDate)
            ->where('direction', $direction)
            ->where('id', '!=', $excludeTripId)
            ->where('status', 'scheduled')
            ->orderBy('trip_time')
            ->orderBy('sequence')
            ->get();

        $bookingDirection = $this->mapTripDirectionToBooking($direction);

        $result = [];
        foreach ($trips as $trip) {
            $occupied = $this->occupiedSeatsForTrip($trip, $bookingDirection);
            $available = array_values(array_diff(self::SEAT_LAYOUT, $occupied));

            $result[] = [
                'trip_id' => $trip->id,
                'trip_time' => (string) $trip->trip_time,
                'available_seats' => $available,
                'total_capacity' => self::TOTAL_CAPACITY,
                'mobil_kode' => optional($trip->mobil)->kode_mobil,
                'driver_name' => optional($trip->driver)->nama,
            ];
        }

        return $result;
    }

    /**
     * @return array<int, string>
     */
    private function occupiedSeatsForTrip(Trip $trip, ?string $bookingDirection): array
    {
        $query = Booking::query()
            ->where('trip_date', $trip->trip_date)
            ->where('trip_time', $trip->trip_time)
            ->whereIn('booking_status', self::ACTIVE_BOOKING_STATUSES);

        if ($bookingDirection !== null) {
            $query->where('direction', $bookingDirection);
        }

        $bookings = $query->get(['selected_seats']);

        $occupied = [];
        foreach ($bookings as $b) {
            $seats = is_array($b->selected_seats) ? $b->selected_seats : [];
            foreach ($seats as $s) {
                $occupied[] = strtoupper((string) $s);
            }
        }

        return array_values(array_unique($occupied));
    }

    private function mapTripDirectionToBooking(string $tripDirection): ?string
    {
        return match ($tripDirection) {
            'ROHUL_TO_PKB' => 'to_pkb',
            'PKB_TO_ROHUL' => 'from_pkb',
            default => null,
        };
    }
}
