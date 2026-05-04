<?php

namespace App\Services\Bridge;

use App\Models\Booking;
use App\Models\BookingSource;
use App\Models\Trip;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
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

        $bookingIds = $bookings->pluck('id')->all();
        $this->logMissingWalkInFlags($bookingIds);

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
            'walk_in_count' => $this->countWalkIn($bookingIds),
            'revenue_cash' => $revenueCash,
            'revenue_transfer' => $revenueTransfer,
            'revenue_total' => $revenueCash + $revenueTransfer,
        ];
    }

    /**
     * Sesi 78 PR-CRM-6L — Log warning untuk booking yang dibuat sesudah jam
     * keberangkatan tapi flag walk_in belum ter-set.
     *
     * Sumber masalah: chatbot bisa lupa set source_meta.walk_in saat customer
     * lapor naik (post-departure). Endpoint backfill-walkin-execute bisa sapu
     * balik hasilnya.
     *
     * @param  array<int>  $bookingIds
     */
    public function logMissingWalkInFlags(array $bookingIds): void
    {
        if (empty($bookingIds)) {
            return;
        }

        $missing = DB::table('booking_sources')
            ->join('bookings', 'bookings.id', '=', 'booking_sources.booking_id')
            ->whereIn('bookings.id', $bookingIds)
            ->where(function ($q) {
                $q->whereRaw("JSON_EXTRACT(booking_sources.source_meta, '$.walk_in') IS NULL")
                    ->orWhereRaw("JSON_EXTRACT(booking_sources.source_meta, '$.walk_in') = false");
            })
            ->whereRaw("TIMESTAMPDIFF(MINUTE, CONCAT(bookings.trip_date, ' ', bookings.trip_time), bookings.created_at) > 0")
            ->select(
                'bookings.booking_code',
                'bookings.trip_date',
                DB::raw("TIMESTAMPDIFF(MINUTE, CONCAT(bookings.trip_date, ' ', bookings.trip_time), bookings.created_at) AS minutes_after")
            )
            ->get();

        foreach ($missing as $m) {
            Log::channel('chatbot-bridge')->warning('[TripRecap] walk-in flag missing pada booking retroaktif', [
                'booking_code' => $m->booking_code,
                'trip_date' => $m->trip_date,
                'minutes_after' => (int) $m->minutes_after,
            ]);
        }
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
