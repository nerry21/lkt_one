<?php

namespace App\Services\Bridge;

use App\Models\Booking;
use App\Models\BookingSource;
use App\Models\Trip;
use Illuminate\Support\Facades\DB;
use RuntimeException;

/**
 * Sesi 77 PR-CRM-6K4 — Aggregate data Post-Recap T+1 jam untuk satu trip.
 *
 * Cluster routing: hanya return `cluster` ('ROHUL' | 'PKB'). Resolusi
 * cluster → phone numbers ada di Chatbot side (PostRecapDispatcherService
 * pakai env JET_ADMIN_PHONES + JET_APPROVER_PHONES).
 *
 * Walk-in detection: COUNT booking_sources di mana
 * source_meta->'walk_in' = true (konvensi Sesi 77, di-set oleh
 * PostDepartureCheckConversationService di Chatbot saat menyimpan
 * walk-in baru — Sesi 78 cutover).
 */
class TripRecapDataService
{
    /**
     * Status booking yang dihitung "berangkat" (terkonfirmasi + tidak dibatalkan).
     */
    public const ACTIVE_STATUSES = ['Diproses', 'Dibayar', 'Menunggu Pembayaran Cash'];

    /**
     * Ringkasan singkat untuk header WA.
     *
     * @return array{
     *   trip_id:int,
     *   trip_date:string,
     *   trip_time:string|null,
     *   direction:string,
     *   cluster:string,
     *   mobil_code:string|null,
     *   driver_name:string|null,
     *   is_cancelled:bool,
     *   passenger_count_berangkat:int,
     *   passenger_count_cancelled:int,
     *   walk_in_count:int,
     *   revenue_cash:int,
     *   revenue_transfer:int,
     *   revenue_total:int,
     * }
     */
    public function getRecapData(int $tripId): array
    {
        $trip = Trip::query()
            ->with(['mobil', 'driver'])
            ->find($tripId);

        if (! $trip) {
            throw new RuntimeException("Trip dengan id {$tripId} tidak ditemukan.");
        }

        $bookings = Booking::query()
            ->where('trip_id', $tripId)
            ->get();

        $isCancelled = $trip->status === 'tidak_berangkat';

        $activeBookings = $bookings->whereIn('booking_status', self::ACTIVE_STATUSES);
        $cancelledBookings = $bookings->where('booking_status', 'Dibatalkan')
            ->whereNotNull('cancellation_reason');

        $cashBookings = $activeBookings
            ->where('payment_method', 'cash')
            ->where('payment_status', 'Dibayar');
        $transferBookings = $activeBookings
            ->where('payment_method', 'transfer')
            ->where('payment_status', 'Dibayar');

        $revenueCash = (int) $cashBookings->sum(fn ($b) => (float) $b->total_amount);
        $revenueTransfer = (int) $transferBookings->sum(fn ($b) => (float) $b->total_amount);

        return [
            'trip_id' => (int) $trip->id,
            'trip_date' => $trip->trip_date?->toDateString() ?? (string) $trip->trip_date,
            'trip_time' => $trip->trip_time,
            'direction' => (string) $trip->direction,
            'cluster' => $this->resolveCluster((string) $trip->direction),
            'mobil_code' => $trip->mobil?->kode_mobil,
            'driver_name' => $trip->driver?->nama,
            'is_cancelled' => $isCancelled,
            'passenger_count_berangkat' => $activeBookings->count(),
            'passenger_count_cancelled' => $cancelledBookings->count(),
            'walk_in_count' => $this->countWalkIn($bookings->pluck('id')->all()),
            'revenue_cash' => $revenueCash,
            'revenue_transfer' => $revenueTransfer,
            'revenue_total' => $revenueCash + $revenueTransfer,
        ];
    }

    /**
     * Detail lengkap untuk balasan "DETAIL" — extend recapData + per-passenger.
     *
     * @return array<string,mixed>
     */
    public function getDetailData(int $tripId): array
    {
        $base = $this->getRecapData($tripId);

        $bookings = Booking::query()
            ->where('trip_id', $tripId)
            ->orderBy('created_at')
            ->get();

        $walkInBookingIds = $this->walkInBookingIds($bookings->pluck('id')->all());

        $passengers = $bookings
            ->whereIn('booking_status', self::ACTIVE_STATUSES)
            ->map(function (Booking $b) use ($walkInBookingIds) {
                $seats = is_array($b->selected_seats) ? $b->selected_seats : [];
                return [
                    'booking_code' => $b->booking_code,
                    'name' => $b->passenger_name,
                    'phone' => $b->passenger_phone,
                    'seat' => $seats[0] ?? null,
                    'seats' => $seats,
                    'category' => $b->category,
                    'amount' => (int) $b->total_amount,
                    'status' => $b->payment_status,
                    'payment_method' => $b->payment_method,
                    'is_walk_in' => in_array((int) $b->id, $walkInBookingIds, true),
                ];
            })
            ->values()
            ->all();

        $cancellations = $bookings
            ->where('booking_status', 'Dibatalkan')
            ->whereNotNull('cancellation_reason')
            ->map(function (Booking $b) {
                return [
                    'booking_code' => $b->booking_code,
                    'name' => $b->passenger_name,
                    'reason' => $b->cancellation_reason,
                ];
            })
            ->values()
            ->all();

        $cashTrxCount = $bookings
            ->whereIn('booking_status', self::ACTIVE_STATUSES)
            ->where('payment_method', 'cash')
            ->where('payment_status', 'Dibayar')
            ->count();

        $transferTrxCount = $bookings
            ->whereIn('booking_status', self::ACTIVE_STATUSES)
            ->where('payment_method', 'transfer')
            ->where('payment_status', 'Dibayar')
            ->count();

        $seatsOccupied = collect($passengers)->reduce(
            fn (int $carry, array $p) => $carry + max(1, count($p['seats'])),
            0,
        );

        return array_merge($base, [
            'passengers' => $passengers,
            'cancellations' => $cancellations,
            'seats_occupied' => $seatsOccupied,
            'seats_total' => 6,
            'cash_trx_count' => $cashTrxCount,
            'transfer_trx_count' => $transferTrxCount,
        ]);
    }

    private function resolveCluster(string $direction): string
    {
        return $direction === 'ROHUL_TO_PKB' ? 'ROHUL' : 'PKB';
    }

    /**
     * @param array<int> $bookingIds
     */
    private function countWalkIn(array $bookingIds): int
    {
        if (empty($bookingIds)) {
            return 0;
        }

        // TODO Sesi 78 — verify konvensi walk_in flag saat
        // PostDepartureCheckConversationService selesai save. Backfill mungkin
        // diperlukan untuk walk-in yang sudah masuk dengan flag belum ter-set.
        return BookingSource::query()
            ->whereIn('booking_id', $bookingIds)
            ->where('source_meta->walk_in', true)
            ->count();
    }

    /**
     * @param array<int> $bookingIds
     * @return array<int>
     */
    private function walkInBookingIds(array $bookingIds): array
    {
        if (empty($bookingIds)) {
            return [];
        }

        return BookingSource::query()
            ->whereIn('booking_id', $bookingIds)
            ->where('source_meta->walk_in', true)
            ->pluck('booking_id')
            ->map(fn ($id) => (int) $id)
            ->all();
    }
}
