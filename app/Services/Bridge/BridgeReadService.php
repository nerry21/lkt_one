<?php

namespace App\Services\Bridge;

use App\Models\Booking;
use App\Models\Customer;
use App\Models\Trip;
use App\Services\RegularBookingService;
use App\Services\RouteSequenceService;
use App\Services\SeatLockService;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

/**
 * Sesi 67 PR-CRM-6D — Read-side helper untuk Chatbot AI bridge.
 *
 * Decouple ChatbotBridgeController dari logic kompleks query/aggregate.
 * Stateless dependencies via constructor; method pure (no side effects).
 *
 * Vocab catatan:
 *   - Trip.direction      = 'PKB_TO_ROHUL' | 'ROHUL_TO_PKB' (uppercase, snake)
 *   - Booking.direction   = 'to_pkb' | 'from_pkb'           (lowercase, snake)
 *   - RouteSequenceService pakai vocab Booking.
 * Method di sini terima vocab Trip (sesuai API spec PR-CRM-6D Q1).
 *
 * Pricing reality:
 *   - Reguler: pakai RegularBookingService::resolveFare() (matrix existing).
 *   - Dropping/Rental/Paket: tidak ada fixed-rate di codebase — total_amount
 *     di-input admin per booking. Throw InvalidArgumentException dengan
 *     pesan jelas supaya caller (Chatbot) bisa fallback ke "tanya admin".
 */
class BridgeReadService
{
    public function __construct(
        protected SeatLockService $seatLock,
        protected RegularBookingService $regularBooking,
    ) {
    }

    /**
     * Translate Trip.direction (Chatbot vocab) → Booking.direction (LKT internal).
     */
    private static function tripDirectionToBookingDirection(string $tripDirection): string
    {
        return match ($tripDirection) {
            'PKB_TO_ROHUL' => 'from_pkb',
            'ROHUL_TO_PKB' => 'to_pkb',
            default => throw new \InvalidArgumentException("Unknown direction: {$tripDirection}"),
        };
    }

    /**
     * Trip aktif untuk tanggal+arah (+optional jam), dengan info kursi tersedia.
     *
     * Karena Trip TIDAK simpan route_via/armada_index (Booking-side fields),
     * occupied seat dihitung dari distinct (route_via, armada_index, from_city,
     * to_city) yang tercatat di booking.trip_id = trip ini. Trip tanpa booking
     * sama sekali → occupied = empty, available = mobil.seat_capacity.
     *
     * @return array<int, array{
     *   trip_id: int,
     *   trip_time: string,
     *   mobil_plat: string,
     *   route_via: string|null,
     *   occupied_seats: array<int, string>,
     *   available_count: int,
     *   total_count: int
     * }>
     */
    /**
     * Sesi 99 PR-N5a — Fallback query: ambil occupied seats dari booking_seats
     * langsung saat Trip schedule belum ada untuk tanggal+jam tersebut.
     *
     * Customer chatbot bisa book booking masa depan (H+1, H+2) sebelum admin
     * generate Trip schedule. Tanpa fallback ini, getSeatAvailability return
     * empty → chatbot kira kursi semua kosong → false UX.
     *
     * Default slot resolution match dengan PR-N4 submitReguler defaults:
     *   route_via='BANGKINANG', armada_index=1.
     * from_city/to_city default ke endpoint route (mayoritas customer chatbot):
     *   PKB_TO_ROHUL → from='Pekanbaru', to='Pasirpengaraian'
     *   ROHUL_TO_PKB → from='Pasirpengaraian', to='Pekanbaru'
     *
     * @return array<int, array{
     *   trip_id: null,
     *   trip_time: string,
     *   mobil_plat: string,
     *   route_via: string,
     *   occupied_seats: array<int, string>,
     *   available_count: int,
     *   total_count: int
     * }>
     */
    protected function getOccupiedSeatsFallback(string $tripDate, string $direction, string $tripTime): array
    {
        $bookingDirection = self::tripDirectionToBookingDirection($direction);

        // Default endpoint route untuk fallback (mayoritas booking chatbot reguler).
        if ($bookingDirection === 'to_pkb') {
            $fromCity = 'Pasirpengaraian';
            $toCity = 'Pekanbaru';
        } else {
            $fromCity = 'Pekanbaru';
            $toCity = 'Pasirpengaraian';
        }

        $occupied = $this->seatLock->getOccupiedSeats([
            'trip_date'    => $tripDate,
            'trip_time'    => $tripTime,
            'direction'    => $bookingDirection,
            'route_via'    => 'BANGKINANG',
            'armada_index' => 1,
            'from_city'    => $fromCity,
            'to_city'      => $toCity,
        ]);

        $occupiedList = $occupied->toArray();
        sort($occupiedList);

        // Total seats default 6 (capacity mobil JET standard) — kalau booking lain
        // pakai armada_index berbeda atau cluster lain, fallback ini tidak akan
        // tahu (limitation accepted, edge-case rare untuk MVP).
        $totalSeats = 6;

        return [[
            'trip_id'         => null,
            'trip_time'       => substr($tripTime, 0, 5),
            'mobil_plat'      => '',
            'route_via'       => 'BANGKINANG',
            'occupied_seats'  => $occupiedList,
            'available_count' => max(0, $totalSeats - count($occupiedList)),
            'total_count'     => $totalSeats,
        ]];
    }

    public function getSeatAvailability(string $tripDate, string $direction, ?string $tripTime = null): array
    {
        $query = Trip::query()
            ->scheduled()
            ->where('trip_date', $tripDate)
            ->where('direction', $direction)
            ->with(['mobil']);

        if ($tripTime !== null) {
            $query->where('trip_time', $this->normalizeTime($tripTime));
        }

        $trips = $query->orderBy('trip_time')->get();

        // Sesi 99 PR-N5a: fallback path saat Trip schedule belum ada.
        // Caller wajib specify tripTime supaya fallback bisa query slot specific.
        // Tanpa tripTime kita tidak bisa tebak slot mana yg dimaksud → return [].
        if ($trips->isEmpty() && $tripTime !== null) {
            return $this->getOccupiedSeatsFallback(
                tripDate: $tripDate,
                direction: $direction,
                tripTime: $this->normalizeTime($tripTime),
            );
        }

        $bookingDirection = self::tripDirectionToBookingDirection($direction);

        return $trips->map(function (Trip $trip) use ($bookingDirection): array {
            $totalSeats = (int) ($trip->mobil?->seat_capacity ?? 0);

            // Cari distinct slot mobil (route_via, armada_index, from_city, to_city)
            // dari bookings yang link ke trip ini. 1 trip biasanya 1 slot mobil
            // tapi defensive cover edge-case multi-armada.
            $bookingSlots = Booking::query()
                ->where('trip_id', $trip->id)
                ->select(['route_via', 'armada_index', 'from_city', 'to_city'])
                ->distinct()
                ->get();

            $occupiedSeats = [];
            $routeVia = null;

            foreach ($bookingSlots as $slot) {
                $routeVia = $routeVia ?? $slot->route_via;

                $occupied = $this->seatLock->getOccupiedSeats([
                    'trip_date' => $trip->trip_date->toDateString(),
                    'trip_time' => (string) $trip->trip_time,
                    'direction' => $bookingDirection,
                    'route_via' => (string) ($slot->route_via ?? 'BANGKINANG'),
                    'armada_index' => (int) ($slot->armada_index ?? 1),
                    'from_city' => (string) $slot->from_city,
                    'to_city' => (string) $slot->to_city,
                ]);

                foreach ($occupied as $seatNumber) {
                    $occupiedSeats[$seatNumber] = true;
                }
            }

            $occupiedList = array_keys($occupiedSeats);
            sort($occupiedList);

            return [
                'trip_id' => (int) $trip->id,
                'trip_time' => substr((string) $trip->trip_time, 0, 5),
                'mobil_plat' => (string) ($trip->mobil?->kode_mobil ?? ''),
                'route_via' => $routeVia,
                'occupied_seats' => $occupiedList,
                'available_count' => max(0, $totalSeats - count($occupiedList)),
                'total_count' => $totalSeats,
            ];
        })->all();
    }

    /**
     * Lookup harga per kategori. Reguler pakai matrix; non-reguler tidak ada
     * fixed-rate (admin-input per booking). Throw exception bila tidak ditemukan.
     *
     * @return array{from_city: string, to_city: string, category: string, price: int, unit: string, currency: string}
     */
    public function getFare(string $fromCity, string $toCity, string $category): array
    {
        if ($category === 'Reguler') {
            $price = $this->regularBooking->resolveFare($fromCity, $toCity);
            if ($price === null) {
                throw new \InvalidArgumentException(
                    "Tarif Reguler tidak ditemukan untuk rute {$fromCity} → {$toCity}."
                );
            }

            return [
                'from_city' => $fromCity,
                'to_city' => $toCity,
                'category' => $category,
                'price' => (int) $price,
                'unit' => 'per_seat',
                'currency' => 'IDR',
            ];
        }

        if (in_array($category, ['Dropping', 'Rental', 'Paket'], true)) {
            throw new \InvalidArgumentException(
                "Tarif kategori {$category} tidak ada di lookup table — total_amount " .
                "di-input admin per booking. Hubungi admin untuk quote."
            );
        }

        throw new \InvalidArgumentException("Kategori tidak dikenal: {$category}");
    }

    /**
     * Daftar route aktif (cluster + stops) dari RouteSequenceService.
     *
     * @return array<int, array{route_via: string, stops: array<int, string>, directions: array<int, string>}>
     */
    public function listActiveRoutes(): array
    {
        $directions = ['PKB_TO_ROHUL', 'ROHUL_TO_PKB'];

        $result = [];
        foreach (RouteSequenceService::SEQUENCES as $cluster => $stops) {
            $result[] = [
                'route_via' => $cluster,
                'stops' => $stops,
                'directions' => $directions,
            ];
        }
        return $result;
    }

    /**
     * Detail customer berdasarkan phone (normalized). Aggregate + recent 5 bookings.
     *
     * @return array{
     *   phone_normalized: string,
     *   profile: array{
     *     customer_id: int,
     *     customer_code: string|null,
     *     display_name: string|null,
     *     total_bookings: int,
     *     first_booking_at: string|null,
     *     last_booking_at: string|null,
     *     favorite_category: string|null
     *   }|null,
     *   recent_bookings: array<int, array<string, mixed>>
     * }
     */
    public function getCustomerDetail(string $phoneNormalized): array
    {
        $customer = Customer::query()
            ->where('phone_normalized', $phoneNormalized)
            ->whereNull('merged_into_id')
            ->first();

        if ($customer === null) {
            return [
                'phone_normalized' => $phoneNormalized,
                'profile' => null,
                'recent_bookings' => [],
            ];
        }

        $bookings = Booking::query()
            ->where('customer_id', $customer->id)
            ->orderByDesc('created_at')
            ->get([
                'id', 'booking_code', 'category', 'from_city', 'to_city',
                'trip_date', 'trip_time', 'total_amount', 'booking_status',
                'created_at',
            ]);

        $totalBookings = $bookings->count();
        $firstBooking = $bookings->last(); // ASC by created_at = oldest at end after orderByDesc
        $lastBooking = $bookings->first();
        $favoriteCategory = $this->modeOfCategory($bookings);

        return [
            'phone_normalized' => $phoneNormalized,
            'profile' => [
                'customer_id' => (int) $customer->id,
                'customer_code' => $customer->customer_code,
                'display_name' => $customer->display_name,
                'total_bookings' => $totalBookings,
                'first_booking_at' => optional($firstBooking?->created_at)->toIso8601String(),
                'last_booking_at' => optional($lastBooking?->created_at)->toIso8601String(),
                'favorite_category' => $favoriteCategory,
            ],
            'recent_bookings' => $bookings->take(5)->map(fn (Booking $b): array => [
                'id' => (int) $b->id,
                'booking_code' => $b->booking_code,
                'category' => $b->category,
                'from_city' => $b->from_city,
                'to_city' => $b->to_city,
                'trip_date' => optional($b->trip_date)->toDateString(),
                'trip_time' => $b->trip_time ? substr((string) $b->trip_time, 0, 5) : null,
                'total_amount' => $b->total_amount,
                'booking_status' => $b->booking_status,
                'created_at' => optional($b->created_at)->toIso8601String(),
            ])->values()->all(),
        ];
    }

    /**
     * Daftar keberangkatan (Trip scheduled) untuk tanggal+arah.
     *
     * @return array<int, array{
     *   trip_id: int,
     *   trip_time: string,
     *   mobil_plat: string,
     *   route_via: string|null,
     *   driver_name: string|null,
     *   available_seats_count: int
     * }>
     */
    public function listDepartures(string $tripDate, string $direction): array
    {
        $trips = Trip::query()
            ->scheduled()
            ->where('trip_date', $tripDate)
            ->where('direction', $direction)
            ->with(['mobil', 'driver'])
            ->orderBy('trip_time')
            ->get();

        $bookingDirection = self::tripDirectionToBookingDirection($direction);

        return $trips->map(function (Trip $trip) use ($bookingDirection): array {
            $totalSeats = (int) ($trip->mobil?->seat_capacity ?? 0);

            $firstSlot = Booking::query()
                ->where('trip_id', $trip->id)
                ->select(['route_via', 'armada_index', 'from_city', 'to_city'])
                ->first();

            $occupiedCount = 0;
            $routeVia = null;
            if ($firstSlot !== null) {
                $routeVia = $firstSlot->route_via;
                $occupied = $this->seatLock->getOccupiedSeats([
                    'trip_date' => $trip->trip_date->toDateString(),
                    'trip_time' => (string) $trip->trip_time,
                    'direction' => $bookingDirection,
                    'route_via' => (string) ($firstSlot->route_via ?? 'BANGKINANG'),
                    'armada_index' => (int) ($firstSlot->armada_index ?? 1),
                    'from_city' => (string) $firstSlot->from_city,
                    'to_city' => (string) $firstSlot->to_city,
                ]);
                $occupiedCount = $occupied->count();
            }

            return [
                'trip_id' => (int) $trip->id,
                'trip_time' => substr((string) $trip->trip_time, 0, 5),
                'mobil_plat' => (string) ($trip->mobil?->kode_mobil ?? ''),
                'route_via' => $routeVia,
                'driver_name' => $trip->driver?->nama,
                'available_seats_count' => max(0, $totalSeats - $occupiedCount),
            ];
        })->all();
    }

    /**
     * Pilih kategori paling sering muncul di bookings list (mode statistik).
     *
     * @param  Collection<int, Booking>  $bookings
     */
    private function modeOfCategory(Collection $bookings): ?string
    {
        if ($bookings->isEmpty()) {
            return null;
        }
        $counts = $bookings->countBy(fn (Booking $b): string => (string) ($b->category ?? '?'));
        return $counts->sortDesc()->keys()->first();
    }

    /**
     * Normalize "07:00" → "07:00:00" supaya match Trip.trip_time format DB.
     */
    private function normalizeTime(string $time): string
    {
        $time = trim($time);
        if (preg_match('/^\d{2}:\d{2}$/', $time)) {
            return $time . ':00';
        }
        return $time;
    }
}
