<?php

namespace App\Services;

use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;

class RegularBookingDraftService
{
    public const SESSION_KEY = 'regular_booking.information';
    public const PERSISTED_BOOKING_ID_SESSION_KEY = 'regular_booking.persisted_booking_id';

    public function store(Session $session, array $draft): void
    {
        $session->put(self::SESSION_KEY, $this->normalizeDraft($draft));
    }

    public function get(Session $session): array
    {
        $draft = $session->get(self::SESSION_KEY, []);

        if (! is_array($draft) || $draft === []) {
            return [];
        }

        return $this->normalizeDraft($draft);
    }

    public function has(Session $session): bool
    {
        return $this->get($session) !== [];
    }

    public function storePersistedBookingId(Session $session, int $bookingId): void
    {
        $session->put(self::PERSISTED_BOOKING_ID_SESSION_KEY, $bookingId);
    }

    public function getPersistedBookingId(Session $session): ?int
    {
        $bookingId = $session->get(self::PERSISTED_BOOKING_ID_SESSION_KEY);

        return is_numeric($bookingId) ? (int) $bookingId : null;
    }

    public function fromValidated(array $validated, int $fareAmount, int $additionalFarePerPassenger = 0): array
    {
        return $this->normalizeDraft([
            'trip_date' => $validated['trip_date'],
            'booking_type' => $validated['booking_type'],
            'pickup_location' => $validated['pickup_location'],
            'destination_location' => $validated['destination_location'],
            'departure_time' => $validated['departure_time'],
            'passenger_count' => (int) $validated['passenger_count'],
            'additional_fare_per_passenger' => $additionalFarePerPassenger,
            'pickup_address' => $validated['pickup_address'],
            'dropoff_address' => $validated['dropoff_address'],
            'fare_amount' => $fareAmount,
        ]);
    }

    public function storeSeatSelection(Session $session, array $seatCodes, RegularBookingService $service): void
    {
        $draft = $this->get($session);
        $allowedSeatCodes = $service->availableSeatCodesForPassengerCount((int) ($draft['passenger_count'] ?? 0));
        $draft['selected_seats'] = $service->sortSeatCodes($seatCodes, $allowedSeatCodes);
        $draft['passengers'] = collect($draft['passengers'] ?? [])
            ->filter(fn (array $passenger): bool => in_array($passenger['seat_no'] ?? '', $draft['selected_seats'], true))
            ->values()
            ->all();

        $this->store($session, $draft);
    }

    public function storePassengers(Session $session, array $passengers, RegularBookingService $service): void
    {
        $draft = $this->get($session);
        $allowedSeatCodes = $service->availableSeatCodesForPassengerCount((int) ($draft['passenger_count'] ?? 0));
        $draft['passengers'] = $this->normalizePassengers($passengers, $service->sortSeatCodes($draft['selected_seats'] ?? [], $allowedSeatCodes), $service);

        $this->store($session, $draft);
    }

    public function buildFormState(Request $request, array $draft, RegularBookingService $service): array
    {
        $state = [
            'trip_date' => (string) $request->old('trip_date', $draft['trip_date'] ?? now()->toDateString()),
            'booking_type' => (string) $request->old('booking_type', $draft['booking_type'] ?? 'self'),
            'pickup_location' => (string) $request->old('pickup_location', $draft['pickup_location'] ?? ''),
            'destination_location' => (string) $request->old('destination_location', $draft['destination_location'] ?? ''),
            'departure_time' => (string) $request->old('departure_time', $draft['departure_time'] ?? ''),
            'passenger_count' => (int) $request->old('passenger_count', $draft['passenger_count'] ?? 1),
            'additional_fare_per_passenger' => max((int) $request->old('additional_fare_per_passenger', $draft['additional_fare_per_passenger'] ?? 0), 0),
            'pickup_address' => (string) $request->old('pickup_address', $draft['pickup_address'] ?? ''),
            'dropoff_address' => (string) $request->old('dropoff_address', $draft['dropoff_address'] ?? ''),
        ];

        $state['passenger_count'] = max(min($state['passenger_count'], 6), 1);
        $state['fare_amount'] = $service->resolveFare($state['pickup_location'], $state['destination_location'])
            ?? ($draft['fare_amount'] ?? null);
        $state['estimated_total_amount'] = is_int($state['fare_amount'])
            ? ($state['fare_amount'] + $state['additional_fare_per_passenger']) * $state['passenger_count']
            : null;
        $state['fare_amount_formatted'] = is_int($state['fare_amount']) && $state['fare_amount'] > 0
            ? $service->formatCurrency($state['fare_amount'])
            : '';
        $state['estimated_total_formatted'] = is_int($state['estimated_total_amount']) && $state['estimated_total_amount'] > 0
            ? $service->formatCurrency($state['estimated_total_amount'])
            : '';

        return $state;
    }

    public function buildSummary(array $draft, RegularBookingService $service): array
    {
        $normalizedDraft = $this->normalizeDraft($draft);
        $allowedSeatCodes = $service->availableSeatCodesForPassengerCount($normalizedDraft['passenger_count']);
        $selectedSeatCodes = $service->sortSeatCodes($normalizedDraft['selected_seats'], $allowedSeatCodes);
        $fareAmount = $normalizedDraft['fare_amount'];
        $additionalFarePerPassenger = $normalizedDraft['additional_fare_per_passenger'];
        $estimatedTotal = $fareAmount > 0
            ? ($fareAmount + $additionalFarePerPassenger) * max($normalizedDraft['passenger_count'], 1)
            : null;

        return [
            'booking_type' => $service->bookingTypeLabel($normalizedDraft['booking_type']),
            'route' => $normalizedDraft['pickup_location'] !== '' && $normalizedDraft['destination_location'] !== ''
                ? $normalizedDraft['pickup_location'] . ' - ' . $normalizedDraft['destination_location']
                : 'Belum dipilih',
            'departure_time' => $service->departureScheduleLabel($normalizedDraft['departure_time']),
            'passenger_count' => $service->passengerCountLabel($normalizedDraft['passenger_count']),
            'fare_amount' => $fareAmount > 0
                ? $service->formatCurrency($fareAmount)
                : 'Belum tersedia',
            'additional_fare_per_passenger' => $additionalFarePerPassenger > 0
                ? $service->formatCurrency($additionalFarePerPassenger)
                : 'Tidak ada',
            'selected_seats' => $service->selectedSeatLabels($selectedSeatCodes),
            'estimated_total' => is_int($estimatedTotal) && $estimatedTotal > 0
                ? $service->formatCurrency($estimatedTotal)
                : 'Belum tersedia',
        ];
    }

    public function buildSeatSelectionState(Request $request, array $draft, RegularBookingService $service): array
    {
        $normalizedDraft = $this->normalizeDraft($draft);
        $requiredSeatCount = max((int) ($normalizedDraft['passenger_count'] ?? 0), 0);
        $allowedSeatCodes = $service->availableSeatCodesForPassengerCount($requiredSeatCount);
        $selectedSeats = $request->old('seat_codes', $normalizedDraft['selected_seats'] ?? []);
        $selectedSeatCodes = $service->sortSeatCodes(is_array($selectedSeats) ? $selectedSeats : [$selectedSeats], $allowedSeatCodes);
        $selectedCount = count($selectedSeatCodes);

        return [
            'selected_seats' => $selectedSeatCodes,
            'selected_count' => $selectedCount,
            'required_seat_count' => $requiredSeatCount,
            'remaining_seat_count' => max($requiredSeatCount - $selectedCount, 0),
            'selected_seats_label' => $service->selectedSeatLabels($selectedSeatCodes),
            'shows_optional_seat' => $requiredSeatCount >= 6,
            'can_continue' => $requiredSeatCount > 0 && $selectedCount === $requiredSeatCount,
        ];
    }

    public function buildPassengerFormState(Request $request, array $draft, RegularBookingService $service): array
    {
        $normalizedDraft = $this->normalizeDraft($draft);
        $allowedSeatCodes = $service->availableSeatCodesForPassengerCount($normalizedDraft['passenger_count']);
        $selectedSeatCodes = $service->sortSeatCodes($normalizedDraft['selected_seats'], $allowedSeatCodes);
        $oldPassengers = $request->old('passengers');

        $sourcePassengers = is_array($oldPassengers)
            ? $this->normalizePassengers($oldPassengers, $selectedSeatCodes, $service)
            : $this->normalizePassengers($normalizedDraft['passengers'], $selectedSeatCodes, $service);

        $passengerMap = collect($sourcePassengers)
            ->keyBy('seat_no');

        $passengerForms = collect($selectedSeatCodes)
            ->values()
            ->map(function (string $seatCode, int $index) use ($passengerMap): array {
                $passenger = $passengerMap->get($seatCode, []);

                return [
                    'index' => $index,
                    'seat_no' => $seatCode,
                    'name' => (string) ($passenger['name'] ?? ''),
                    'phone' => (string) ($passenger['phone'] ?? ''),
                ];
            })
            ->all();

        return [
            'forms' => $passengerForms,
            'selected_seats' => $selectedSeatCodes,
            'required_count' => count($selectedSeatCodes),
            'filled_count' => collect($passengerForms)
                ->filter(fn (array $passenger): bool => $passenger['name'] !== '' && $passenger['phone'] !== '')
                ->count(),
        ];
    }

    public function hasCompleteSeatSelection(array $draft, RegularBookingService $service): bool
    {
        $normalizedDraft = $this->normalizeDraft($draft);
        $requiredSeatCount = max((int) ($normalizedDraft['passenger_count'] ?? 0), 0);
        $allowedSeatCodes = $service->availableSeatCodesForPassengerCount($requiredSeatCount);
        $selectedSeatCount = count($service->sortSeatCodes($normalizedDraft['selected_seats'], $allowedSeatCodes));

        return $requiredSeatCount > 0 && $selectedSeatCount === $requiredSeatCount;
    }

    public function hasCompleteInformation(array $draft, RegularBookingService $service): bool
    {
        $normalizedDraft = $this->normalizeDraft($draft);

        return in_array($normalizedDraft['booking_type'], $service->bookingTypeValues(), true)
            && in_array($normalizedDraft['pickup_location'], $service->locations(), true)
            && in_array($normalizedDraft['destination_location'], $service->locations(), true)
            && $normalizedDraft['pickup_location'] !== $normalizedDraft['destination_location']
            && in_array($normalizedDraft['departure_time'], $service->departureScheduleValues(), true)
            && $normalizedDraft['passenger_count'] >= 1
            && $normalizedDraft['passenger_count'] <= 6
            && $normalizedDraft['pickup_address'] !== ''
            && $normalizedDraft['dropoff_address'] !== ''
            && $normalizedDraft['fare_amount'] > 0;
    }

    public function hasCompletePassengerData(array $draft, RegularBookingService $service): bool
    {
        $normalizedDraft = $this->normalizeDraft($draft);
        $allowedSeatCodes = $service->availableSeatCodesForPassengerCount($normalizedDraft['passenger_count']);
        $selectedSeatCodes = $service->sortSeatCodes($normalizedDraft['selected_seats'], $allowedSeatCodes);
        $normalizedPassengers = $this->normalizePassengers($normalizedDraft['passengers'], $selectedSeatCodes, $service);

        if (count($selectedSeatCodes) === 0 || count($normalizedPassengers) !== count($selectedSeatCodes)) {
            return false;
        }

        return collect($normalizedPassengers)->every(fn (array $passenger): bool => $passenger['name'] !== '' && $passenger['phone'] !== '');
    }

    public function buildReviewState(array $draft, RegularBookingService $service): array
    {
        $normalizedDraft = $this->normalizeDraft($draft);
        $allowedSeatCodes = $service->availableSeatCodesForPassengerCount($normalizedDraft['passenger_count']);
        $selectedSeatCodes = $service->sortSeatCodes($normalizedDraft['selected_seats'], $allowedSeatCodes);
        $passengers = $this->normalizePassengers($normalizedDraft['passengers'], $selectedSeatCodes, $service);
        $fareAmount = $normalizedDraft['fare_amount'];
        $additionalFarePerPassenger = $normalizedDraft['additional_fare_per_passenger'];
        $totalAmount = $fareAmount > 0 ? ($fareAmount + $additionalFarePerPassenger) * max($normalizedDraft['passenger_count'], 1) : 0;

        return [
            'trip_date' => $normalizedDraft['trip_date'],
            'booking_type' => $service->bookingTypeLabel($normalizedDraft['booking_type']),
            'pickup_location' => $normalizedDraft['pickup_location'],
            'destination_location' => $normalizedDraft['destination_location'],
            'departure_time' => $service->departureScheduleLabel($normalizedDraft['departure_time']),
            'departure_time_value' => $normalizedDraft['departure_time'],
            'passenger_count' => $normalizedDraft['passenger_count'],
            'passenger_count_label' => $service->passengerCountLabel($normalizedDraft['passenger_count']),
            'pickup_address' => $normalizedDraft['pickup_address'],
            'dropoff_address' => $normalizedDraft['dropoff_address'],
            'fare_amount' => $fareAmount,
            'fare_amount_formatted' => $service->formatCurrency($fareAmount),
            'additional_fare_per_passenger' => $additionalFarePerPassenger,
            'additional_fare_per_passenger_formatted' => $additionalFarePerPassenger > 0 ? $service->formatCurrency($additionalFarePerPassenger) : null,
            'total_amount' => $totalAmount,
            'total_amount_formatted' => $service->formatCurrency($totalAmount),
            'route_label' => $normalizedDraft['pickup_location'] . ' - ' . $normalizedDraft['destination_location'],
            'selected_seats' => $selectedSeatCodes,
            'selected_seats_label' => $service->selectedSeatLabels($selectedSeatCodes),
            'passengers' => $passengers,
        ];
    }

    private function normalizeDraft(array $draft): array
    {
        return [
            'trip_date' => trim((string) ($draft['trip_date'] ?? '')),
            'booking_type' => trim((string) ($draft['booking_type'] ?? '')),
            'pickup_location' => trim((string) ($draft['pickup_location'] ?? '')),
            'destination_location' => trim((string) ($draft['destination_location'] ?? '')),
            'departure_time' => trim((string) ($draft['departure_time'] ?? '')),
            'passenger_count' => max(min((int) ($draft['passenger_count'] ?? 0), 6), 0),
            'pickup_address' => trim((string) ($draft['pickup_address'] ?? '')),
            'dropoff_address' => trim((string) ($draft['dropoff_address'] ?? '')),
            'fare_amount' => max((int) ($draft['fare_amount'] ?? 0), 0),
            'additional_fare_per_passenger' => max((int) ($draft['additional_fare_per_passenger'] ?? 0), 0),
            'selected_seats' => collect($draft['selected_seats'] ?? [])
                ->map(fn ($seatCode): string => trim((string) $seatCode))
                ->filter(fn (string $seatCode): bool => $seatCode !== '')
                ->unique()
                ->values()
                ->all(),
            'passengers' => collect($draft['passengers'] ?? [])
                ->map(fn ($passenger): array => [
                    'seat_no' => trim((string) data_get($passenger, 'seat_no', '')),
                    'name' => trim((string) data_get($passenger, 'name', '')),
                    'phone' => trim((string) data_get($passenger, 'phone', '')),
                ])
                ->filter(fn (array $passenger): bool => $passenger['seat_no'] !== '')
                ->values()
                ->all(),
        ];
    }

    private function normalizePassengers(array $passengers, array $selectedSeatCodes, RegularBookingService $service): array
    {
        $allowedSeatLookup = array_flip($selectedSeatCodes);
        $seatOrderLookup = array_flip($selectedSeatCodes);

        $normalizedPassengers = collect($passengers)
            ->map(fn ($passenger): array => [
                'seat_no' => trim((string) data_get($passenger, 'seat_no', '')),
                'name' => trim((string) data_get($passenger, 'name', '')),
                'phone' => $service->normalizeIndonesianPhone((string) data_get($passenger, 'phone', '')),
            ])
            ->filter(fn (array $passenger): bool => $passenger['seat_no'] !== '' && array_key_exists($passenger['seat_no'], $allowedSeatLookup))
            ->unique('seat_no')
            ->values()
            ->all();

        usort(
            $normalizedPassengers,
            fn (array $left, array $right): int => ($seatOrderLookup[$left['seat_no']] ?? PHP_INT_MAX) <=> ($seatOrderLookup[$right['seat_no']] ?? PHP_INT_MAX),
        );

        return $normalizedPassengers;
    }
}
