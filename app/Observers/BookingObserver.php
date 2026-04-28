<?php

namespace App\Observers;

use App\Models\Booking;
use App\Models\KeuanganJet;
use App\Services\KeuanganJetSyncService;
use Illuminate\Support\Facades\Log;

/**
 * Sesi 50 PR #6 — Realtime KeuanganJet sync trigger.
 *
 * Saat Booking save/delete (semua kategori: Reguler, Paket, Dropping, Rental),
 * refresh KeuanganJet row yang link ke trip_id. Untuk Bu Bos & Zizi melihat
 * angka real-time tanpa manual klik refresh.
 *
 * Defensive: catch exception supaya booking save flow TIDAK ke-block kalau
 * sync error (mis. row keuangan_jet belum exist, formula recompute fail).
 *
 * Tidak menyebabkan recursion: refreshFromBookings cuma update KeuanganJet,
 * tidak touch Booking.
 */
class BookingObserver
{
    public function __construct(
        private readonly KeuanganJetSyncService $sync,
    ) {}

    public function saved(Booking $booking): void
    {
        $this->refreshKeuanganForTrip(
            bookingId: $booking->id,
            newTripId: $booking->trip_id,
            oldTripId: $booking->getOriginal('trip_id'),
        );
    }

    public function deleted(Booking $booking): void
    {
        $this->refreshKeuanganForTrip(
            bookingId: $booking->id,
            newTripId: null,
            oldTripId: $booking->trip_id,
        );
    }

    /**
     * Refresh KeuanganJet rows yang link ke trip_id terdampak.
     *
     * Handle 2 case:
     *   - Booking di-update → trip_id berubah (re-link). Refresh both old & new.
     *   - Booking di-create/delete → cuma trip_id current (atau old saat delete).
     */
    private function refreshKeuanganForTrip(?int $bookingId, ?int $newTripId, ?int $oldTripId): void
    {
        $tripIds = array_unique(array_filter(
            [$newTripId, $oldTripId],
            fn ($v) => $v !== null,
        ));

        foreach ($tripIds as $tripId) {
            $rows = KeuanganJet::query()->where('trip_id', $tripId)->get();
            foreach ($rows as $row) {
                try {
                    $this->sync->refreshFromBookings($row);
                } catch (\Throwable $e) {
                    Log::warning('BookingObserver refreshFromBookings failed', [
                        'booking_id' => $bookingId,
                        'trip_id'    => $tripId,
                        'row_id'     => $row->id,
                        'error'      => $e->getMessage(),
                    ]);
                }
            }
        }
    }
}
