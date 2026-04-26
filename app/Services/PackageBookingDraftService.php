<?php

namespace App\Services;

use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;

class PackageBookingDraftService
{
    public const SESSION_KEY = 'package_booking.information';
    public const PERSISTED_BOOKING_ID_SESSION_KEY = 'package_booking.persisted_booking_id';

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

    public function fromValidated(array $validated, int $fareAmount, int $additionalFare): array
    {
        return $this->normalizeDraft([
            'trip_date' => $validated['trip_date'],
            'departure_time' => $validated['departure_time'],
            'pickup_city' => $validated['pickup_city'],
            'destination_city' => $validated['destination_city'],
            'sender_name' => $validated['sender_name'],
            'sender_phone' => $validated['sender_phone'],
            'sender_address' => $validated['sender_address'],
            'recipient_name' => $validated['recipient_name'],
            'recipient_phone' => $validated['recipient_phone'],
            'recipient_address' => $validated['recipient_address'],
            'item_name' => $validated['item_name'],
            'item_qty' => (int) ($validated['item_qty'] ?? 1),
            'fare_amount' => $fareAmount,
            'additional_fare' => $additionalFare,
            'package_size' => '',
            'selected_seats' => [],
            'armada_index' => 1,
            'route_via' => $validated['route_via'] ?? null,
        ]);
    }

    public function storePackageSelection(Session $session, string $packageSize, array $seatCodes, PackageBookingService $service): void
    {
        $draft = $this->get($session);
        $draft['package_size'] = $packageSize;

        if ($service->isSeatRequired($packageSize)) {
            $draft['selected_seats'] = $service->sortSeatCodes($seatCodes);
        } else {
            $draft['selected_seats'] = [];
        }

        $this->store($session, $draft);
    }

    public function buildFormState(Request $request, array $draft, PackageBookingService $service): array
    {
        return [
            'trip_date' => (string) $request->old('trip_date', $draft['trip_date'] ?? now()->toDateString()),
            'departure_time' => (string) $request->old('departure_time', $draft['departure_time'] ?? ''),
            'pickup_city' => (string) $request->old('pickup_city', $draft['pickup_city'] ?? ''),
            'destination_city' => (string) $request->old('destination_city', $draft['destination_city'] ?? ''),
            'sender_name' => (string) $request->old('sender_name', $draft['sender_name'] ?? ''),
            'sender_phone' => (string) $request->old('sender_phone', $draft['sender_phone'] ?? ''),
            'sender_address' => (string) $request->old('sender_address', $draft['sender_address'] ?? ''),
            'recipient_name' => (string) $request->old('recipient_name', $draft['recipient_name'] ?? ''),
            'recipient_phone' => (string) $request->old('recipient_phone', $draft['recipient_phone'] ?? ''),
            'recipient_address' => (string) $request->old('recipient_address', $draft['recipient_address'] ?? ''),
            'item_name' => (string) $request->old('item_name', $draft['item_name'] ?? ''),
            'item_qty' => max(1, (int) $request->old('item_qty', $draft['item_qty'] ?? 1)),
            'fare_amount' => max(0, (int) $request->old('fare_amount', $draft['fare_amount'] ?? 0)),
            'additional_fare' => max(0, (int) $request->old('additional_fare', $draft['additional_fare'] ?? 0)),
            'route_via' => (string) $request->old('route_via', $draft['route_via'] ?? ''),
        ];
    }

    public function buildPackageSelectionState(Request $request, array $draft, PackageBookingService $service): array
    {
        $normalizedDraft = $this->normalizeDraft($draft);
        $packageSize = (string) $request->old('package_size', $normalizedDraft['package_size'] ?? '');
        $requiresSeat = $packageSize !== '' && $service->isSeatRequired($packageSize);
        $selectedSeats = $request->old('seat_codes', $normalizedDraft['selected_seats'] ?? []);
        $selectedSeatCodes = $requiresSeat
            ? $service->sortSeatCodes(is_array($selectedSeats) ? $selectedSeats : [$selectedSeats])
            : [];

        return [
            'package_size' => $packageSize,
            'requires_seat' => $requiresSeat,
            'selected_seats' => $selectedSeatCodes,
            'selected_count' => count($selectedSeatCodes),
            'selected_seats_label' => $service->selectedSeatLabels($selectedSeatCodes),
            'can_continue' => $packageSize !== '' && (! $requiresSeat || count($selectedSeatCodes) === 1),
        ];
    }

    public function buildSummary(array $draft, PackageBookingService $service): array
    {
        $normalizedDraft = $this->normalizeDraft($draft);
        $fareAmount = $normalizedDraft['fare_amount'];
        $additionalFare = $normalizedDraft['additional_fare'];
        $totalAmount = $fareAmount + $additionalFare;

        return [
            'route' => $normalizedDraft['pickup_city'] !== '' && $normalizedDraft['destination_city'] !== ''
                ? $normalizedDraft['pickup_city'] . ' - ' . $normalizedDraft['destination_city']
                : 'Belum dipilih',
            'departure_time' => $service->departureScheduleLabel($normalizedDraft['departure_time']),
            'sender_name' => $normalizedDraft['sender_name'] ?: 'Belum diisi',
            'recipient_name' => $normalizedDraft['recipient_name'] ?: 'Belum diisi',
            'item_name' => $normalizedDraft['item_name'] ?: 'Belum diisi',
            'item_qty' => $normalizedDraft['item_qty'],
            'package_size' => $normalizedDraft['package_size'] !== ''
                ? $service->packageSizeLabel($normalizedDraft['package_size'])
                : 'Belum dipilih',
            'fare_amount' => $fareAmount > 0 ? $service->formatCurrency($fareAmount) : 'Belum diisi',
            'additional_fare' => $additionalFare > 0 ? $service->formatCurrency($additionalFare) : 'Tidak ada',
            'total_amount' => $totalAmount > 0 ? $service->formatCurrency($totalAmount) : 'Belum tersedia',
            'selected_seats' => $service->selectedSeatLabels($normalizedDraft['selected_seats']),
        ];
    }

    public function buildReviewState(array $draft, PackageBookingService $service): array
    {
        $normalizedDraft = $this->normalizeDraft($draft);
        $fareAmount = $normalizedDraft['fare_amount'];
        $additionalFare = $normalizedDraft['additional_fare'];
        $totalAmount = $fareAmount + $additionalFare;

        return [
            'trip_date' => $normalizedDraft['trip_date'],
            'departure_time' => $service->departureScheduleLabel($normalizedDraft['departure_time']),
            'departure_time_value' => $normalizedDraft['departure_time'],
            'pickup_city' => $normalizedDraft['pickup_city'],
            'destination_city' => $normalizedDraft['destination_city'],
            'route_label' => $normalizedDraft['pickup_city'] . ' - ' . $normalizedDraft['destination_city'],
            'sender_name' => $normalizedDraft['sender_name'],
            'sender_phone' => $normalizedDraft['sender_phone'],
            'sender_address' => $normalizedDraft['sender_address'],
            'recipient_name' => $normalizedDraft['recipient_name'],
            'recipient_phone' => $normalizedDraft['recipient_phone'],
            'recipient_address' => $normalizedDraft['recipient_address'],
            'item_name' => $normalizedDraft['item_name'],
            'item_qty' => $normalizedDraft['item_qty'],
            'package_size' => $normalizedDraft['package_size'],
            'package_size_label' => $service->packageSizeLabel($normalizedDraft['package_size']),
            'requires_seat' => $service->isSeatRequired($normalizedDraft['package_size']),
            'selected_seats' => $normalizedDraft['selected_seats'],
            'selected_seats_label' => $service->selectedSeatLabels($normalizedDraft['selected_seats']),
            'fare_amount' => $fareAmount,
            'fare_amount_formatted' => $service->formatCurrency($fareAmount),
            'additional_fare' => $additionalFare,
            'additional_fare_formatted' => $additionalFare > 0 ? $service->formatCurrency($additionalFare) : null,
            'total_amount' => $totalAmount,
            'total_amount_formatted' => $service->formatCurrency($totalAmount),
            'armada_index' => $normalizedDraft['armada_index'],
            'route_via' => $normalizedDraft['route_via'],
        ];
    }

    public function hasCompleteInformation(array $draft, PackageBookingService $service): bool
    {
        $normalizedDraft = $this->normalizeDraft($draft);

        return in_array($normalizedDraft['pickup_city'], $service->locations(), true)
            && in_array($normalizedDraft['destination_city'], $service->locations(), true)
            && $normalizedDraft['pickup_city'] !== $normalizedDraft['destination_city']
            && in_array($normalizedDraft['departure_time'], $service->departureScheduleValues(), true)
            && $normalizedDraft['trip_date'] !== ''
            && $normalizedDraft['sender_name'] !== ''
            && $normalizedDraft['sender_address'] !== ''
            && $normalizedDraft['recipient_name'] !== ''
            && $normalizedDraft['recipient_address'] !== ''
            && $normalizedDraft['item_name'] !== ''
            && $normalizedDraft['item_qty'] >= 1
            && $normalizedDraft['fare_amount'] > 0;
    }

    public function hasCompletePackageSelection(array $draft, PackageBookingService $service): bool
    {
        $normalizedDraft = $this->normalizeDraft($draft);
        $packageSize = $normalizedDraft['package_size'];

        if (! in_array($packageSize, $service->packageSizeValues(), true)) {
            return false;
        }

        if ($service->isSeatRequired($packageSize)) {
            return count($normalizedDraft['selected_seats']) === 1;
        }

        return true;
    }

    private function normalizeDraft(array $draft): array
    {
        $rawRouteVia = $draft['route_via'] ?? null;
        $normalizedRouteVia = is_string($rawRouteVia) && $rawRouteVia !== ''
            ? strtoupper(trim($rawRouteVia))
            : null;

        return [
            'trip_date' => trim((string) ($draft['trip_date'] ?? '')),
            'departure_time' => trim((string) ($draft['departure_time'] ?? '')),
            'pickup_city' => trim((string) ($draft['pickup_city'] ?? '')),
            'destination_city' => trim((string) ($draft['destination_city'] ?? '')),
            'sender_name' => trim((string) ($draft['sender_name'] ?? '')),
            'sender_phone' => trim((string) ($draft['sender_phone'] ?? '')),
            'sender_address' => trim((string) ($draft['sender_address'] ?? '')),
            'recipient_name' => trim((string) ($draft['recipient_name'] ?? '')),
            'recipient_phone' => trim((string) ($draft['recipient_phone'] ?? '')),
            'recipient_address' => trim((string) ($draft['recipient_address'] ?? '')),
            'item_name' => trim((string) ($draft['item_name'] ?? '')),
            'item_qty' => max(1, (int) ($draft['item_qty'] ?? 1)),
            'fare_amount' => max(0, (int) ($draft['fare_amount'] ?? 0)),
            'additional_fare' => max(0, (int) ($draft['additional_fare'] ?? 0)),
            'package_size' => trim((string) ($draft['package_size'] ?? '')),
            'armada_index' => max(1, (int) ($draft['armada_index'] ?? 1)),
            'route_via' => $normalizedRouteVia,
            'selected_seats' => collect($draft['selected_seats'] ?? [])
                ->map(fn ($seatCode): string => trim((string) $seatCode))
                ->filter(fn (string $seatCode): bool => $seatCode !== '')
                ->unique()
                ->values()
                ->all(),
        ];
    }
}
