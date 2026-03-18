<?php

namespace App\Services;

use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;

class DroppingBookingDraftService
{
    public const SESSION_KEY = 'dropping_booking.information';
    public const PERSISTED_BOOKING_ID_SESSION_KEY = 'dropping_booking.persisted_booking_id';

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

    public function fromValidated(array $validated, int $fareAmount, int $additionalFare = 0): array
    {
        return $this->normalizeDraft([
            'trip_date'        => $validated['trip_date'],
            'booking_type'     => $validated['booking_type'],
            'pickup_location'  => $validated['pickup_location'],
            'destination_location' => $validated['destination_location'],
            'departure_time'   => $validated['departure_time'],
            'fare_amount'      => $fareAmount,
            'additional_fare'  => $additionalFare,
            'pickup_address'   => $validated['pickup_address'],
            'dropoff_address'  => $validated['dropoff_address'],
        ]);
    }

    public function storePassengers(Session $session, string $name, string $phone, DroppingBookingService $service): void
    {
        $draft = $this->get($session);
        $allSeatCodes = $service->allSeatCodes();

        $draft['passengers'] = collect($allSeatCodes)
            ->map(fn (string $seatCode): array => [
                'seat_no' => $seatCode,
                'name'    => trim($name),
                'phone'   => $service->normalizeIndonesianPhone($phone),
            ])
            ->all();

        $this->store($session, $draft);
    }

    public function buildFormState(Request $request, array $draft, DroppingBookingService $service): array
    {
        $fareAmount     = (int) $request->old('fare_amount', $draft['fare_amount'] ?? 0);
        $additionalFare = max((int) $request->old('additional_fare', $draft['additional_fare'] ?? 0), 0);
        $total          = $fareAmount + $additionalFare;

        return [
            'trip_date'             => (string) $request->old('trip_date', $draft['trip_date'] ?? now()->toDateString()),
            'booking_type'          => (string) $request->old('booking_type', $draft['booking_type'] ?? 'self'),
            'pickup_location'       => (string) $request->old('pickup_location', $draft['pickup_location'] ?? ''),
            'destination_location'  => (string) $request->old('destination_location', $draft['destination_location'] ?? ''),
            'departure_time'        => (string) $request->old('departure_time', $draft['departure_time'] ?? ''),
            'fare_amount'           => $fareAmount,
            'fare_amount_formatted' => $fareAmount > 0 ? $service->formatCurrency($fareAmount) : '',
            'additional_fare'       => $additionalFare,
            'estimated_total_formatted' => $total > 0 ? $service->formatCurrency($total) : '',
            'pickup_address'        => (string) $request->old('pickup_address', $draft['pickup_address'] ?? ''),
            'dropoff_address'       => (string) $request->old('dropoff_address', $draft['dropoff_address'] ?? ''),
        ];
    }

    public function buildSummary(array $draft, DroppingBookingService $service): array
    {
        $normalizedDraft = $this->normalizeDraft($draft);
        $fareAmount      = $normalizedDraft['fare_amount'];
        $additionalFare  = $normalizedDraft['additional_fare'];
        $estimatedTotal  = $fareAmount + $additionalFare;

        return [
            'booking_type'   => $service->bookingTypeLabel($normalizedDraft['booking_type']),
            'route'          => $normalizedDraft['pickup_location'] !== '' && $normalizedDraft['destination_location'] !== ''
                ? $normalizedDraft['pickup_location'] . ' → ' . $normalizedDraft['destination_location']
                : 'Belum diisi',
            'departure_time' => $normalizedDraft['departure_time'] !== ''
                ? $normalizedDraft['departure_time'] . ' WIB'
                : 'Belum diisi',
            'passenger_count'   => '6 Penumpang (Semua Kursi)',
            'fare_amount'       => $fareAmount > 0 ? $service->formatCurrency($fareAmount) : 'Belum diisi',
            'additional_fare'   => $additionalFare > 0 ? $service->formatCurrency($additionalFare) : 'Tidak ada',
            'selected_seats'    => $service->selectedDroppingSeatLabels(),
            'estimated_total'   => $estimatedTotal > 0 ? $service->formatCurrency($estimatedTotal) : 'Belum tersedia',
        ];
    }

    public function buildPassengerFormState(Request $request, array $draft, DroppingBookingService $service): array
    {
        $firstPassenger = ($draft['passengers'] ?? [])[0] ?? [];

        $name  = (string) $request->old('passenger_name', $firstPassenger['name'] ?? '');
        $phone = (string) $request->old('passenger_phone', $firstPassenger['phone'] ?? '');
        $filled = ($name !== '' && $phone !== '') ? 6 : 0;

        return [
            'name'          => $name,
            'phone'         => $phone,
            'required_count'=> 6,
            'filled_count'  => $filled,
        ];
    }

    public function buildReviewState(array $draft, DroppingBookingService $service): array
    {
        $normalizedDraft = $this->normalizeDraft($draft);
        $allSeatCodes    = $service->allSeatCodes();
        $passengers      = $this->normalizePassengers($normalizedDraft['passengers'], $allSeatCodes, $service);
        $fareAmount      = $normalizedDraft['fare_amount'];
        $additionalFare  = $normalizedDraft['additional_fare'];
        $totalAmount     = $fareAmount + $additionalFare;

        return [
            'trip_date'              => $normalizedDraft['trip_date'],
            'booking_type'           => $service->bookingTypeLabel($normalizedDraft['booking_type']),
            'pickup_location'        => $normalizedDraft['pickup_location'],
            'destination_location'   => $normalizedDraft['destination_location'],
            'departure_time'         => $normalizedDraft['departure_time'] . ' WIB',
            'departure_time_value'   => $normalizedDraft['departure_time'],
            'passenger_count'        => 6,
            'passenger_count_label'  => $service->droppingPassengerCountLabel(),
            'pickup_address'         => $normalizedDraft['pickup_address'],
            'dropoff_address'        => $normalizedDraft['dropoff_address'],
            'fare_amount'            => $fareAmount,
            'fare_amount_formatted'  => $service->formatCurrency($fareAmount),
            'additional_fare'        => $additionalFare,
            'additional_fare_formatted' => $additionalFare > 0 ? $service->formatCurrency($additionalFare) : null,
            'total_amount'           => $totalAmount,
            'total_amount_formatted' => $service->formatCurrency($totalAmount),
            'route_label'            => $normalizedDraft['pickup_location'] . ' - ' . $normalizedDraft['destination_location'],
            'selected_seats'         => $allSeatCodes,
            'selected_seats_label'   => $service->selectedDroppingSeatLabels(),
            'passengers'             => $passengers,
            'armada_index'           => $normalizedDraft['armada_index'],
        ];
    }

    public function hasCompleteInformation(array $draft, DroppingBookingService $service): bool
    {
        $d = $this->normalizeDraft($draft);

        return in_array($d['booking_type'], $service->bookingTypeValues(), true)
            && $d['pickup_location'] !== ''
            && $d['destination_location'] !== ''
            && $d['pickup_location'] !== $d['destination_location']
            && $d['departure_time'] !== ''
            && $d['pickup_address'] !== ''
            && $d['dropoff_address'] !== '';
    }

    public function hasCompletePassengerData(array $draft, DroppingBookingService $service): bool
    {
        $d = $this->normalizeDraft($draft);
        $first = $d['passengers'][0] ?? [];

        return ($first['name'] ?? '') !== '' && ($first['phone'] ?? '') !== '';
    }

    private function normalizeDraft(array $draft): array
    {
        return [
            'trip_date'                    => trim((string) ($draft['trip_date'] ?? '')),
            'booking_type'                 => trim((string) ($draft['booking_type'] ?? '')),
            'pickup_location'              => trim((string) ($draft['pickup_location'] ?? '')),
            'destination_location'         => trim((string) ($draft['destination_location'] ?? '')),
            'departure_time'               => trim((string) ($draft['departure_time'] ?? '')),
            'fare_amount'     => max((int) ($draft['fare_amount'] ?? 0), 0),
            'additional_fare' => max((int) ($draft['additional_fare'] ?? 0), 0),
            'pickup_address'               => trim((string) ($draft['pickup_address'] ?? '')),
            'dropoff_address'              => trim((string) ($draft['dropoff_address'] ?? '')),
            'armada_index'                 => max(1, (int) ($draft['armada_index'] ?? 1)),
            'selected_seats'               => ['1A', '2A', '2B', '3A', '4A', '5A'],
            'passengers'                   => collect($draft['passengers'] ?? [])
                ->map(fn ($p): array => [
                    'seat_no' => trim((string) data_get($p, 'seat_no', '')),
                    'name'    => trim((string) data_get($p, 'name', '')),
                    'phone'   => trim((string) data_get($p, 'phone', '')),
                ])
                ->filter(fn (array $p): bool => $p['seat_no'] !== '')
                ->values()
                ->all(),
        ];
    }

    private function normalizePassengers(array $passengers, array $allSeatCodes, DroppingBookingService $service): array
    {
        $allowedLookup = array_flip($allSeatCodes);
        $orderLookup   = array_flip($allSeatCodes);

        $normalized = collect($passengers)
            ->map(fn ($p): array => [
                'seat_no' => trim((string) data_get($p, 'seat_no', '')),
                'name'    => trim((string) data_get($p, 'name', '')),
                'phone'   => $service->normalizeIndonesianPhone((string) data_get($p, 'phone', '')),
            ])
            ->filter(fn (array $p): bool => $p['seat_no'] !== '' && array_key_exists($p['seat_no'], $allowedLookup))
            ->unique('seat_no')
            ->values()
            ->all();

        usort(
            $normalized,
            fn (array $a, array $b): int => ($orderLookup[$a['seat_no']] ?? PHP_INT_MAX) <=> ($orderLookup[$b['seat_no']] ?? PHP_INT_MAX),
        );

        return $normalized;
    }
}
