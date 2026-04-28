<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\BookingNotificationPending;
use App\Models\Driver;
use App\Models\Mobil;

/**
 * Sesi 50 PR #3 — pondasi notifikasi WhatsApp.
 *
 * Service stateless: record event saat operasional admin mengubah trip yang
 * affect penumpang (gantiJam, edit mobil/driver, mark trip dibatalkan). Belum
 * kirim otomatis ke WhatsApp Chatbot AI — admin Zizi telpon manual via UI list
 * (UI di PR berikutnya). Saat Chatbot AI ready, tinggal queue via dispatcher
 * dari record yang status='pending'.
 *
 * Snapshot strategy: passenger_name + passenger_phone disimpan saat event
 * supaya audit trail tetap akurat walau Booking ter-edit setelahnya. Old/new
 * value untuk mobil/driver di-resolve ke kode_mobil / driver.nama supaya
 * preview message langsung bisa dipakai admin tanpa lookup ulang.
 */
class BookingNotificationPendingService
{
    public const EVENT_TRIP_TIME_CHANGED = 'trip_time_changed';
    public const EVENT_MOBIL_CHANGED     = 'mobil_changed';
    public const EVENT_DRIVER_CHANGED    = 'driver_changed';
    public const EVENT_TRIP_CANCELED     = 'trip_canceled';

    /**
     * Status booking yang dianggap final/cancelled — tidak perlu notify.
     */
    private const SKIP_STATUSES = ['Cancelled', 'Ditolak'];

    /**
     * Record satu event notifikasi pending untuk 1 booking.
     *
     * Steps:
     *   1. Snapshot passenger_name + phone (prioritas customer.phone_normalized).
     *   2. Resolve old/new value untuk display (lookup kode_mobil / driver.nama
     *      kalau event mobil/driver).
     *   3. Compile preview message Bahasa Indonesia untuk admin telpon.
     *   4. Insert row, return record.
     */
    public function recordEvent(
        Booking $booking,
        string $eventType,
        ?string $oldValue,
        ?string $newValue,
        ?int $tripId = null,
    ): BookingNotificationPending {
        [$passengerName, $passengerPhone] = $this->resolvePassengerSnapshot($booking);

        $oldDisplay = $this->resolveDisplayValue($eventType, $oldValue);
        $newDisplay = $this->resolveDisplayValue($eventType, $newValue);

        $message = $this->compileMessage(
            booking:    $booking,
            eventType:  $eventType,
            name:       $passengerName ?? '',
            oldDisplay: $oldDisplay,
            newDisplay: $newDisplay,
        );

        return BookingNotificationPending::query()->create([
            'booking_id'           => $booking->id,
            'trip_id'              => $tripId ?? $booking->trip_id,
            'event_type'           => $eventType,
            'old_value'            => $oldValue,
            'new_value'            => $newValue,
            'passenger_name'       => $passengerName,
            'passenger_phone'      => $passengerPhone,
            'notification_status'  => 'pending',
            'notification_message' => $message,
        ]);
    }

    /**
     * Record event untuk semua booking yang ter-link ke 1 trip (loop wrapper).
     *
     * Skip booking dengan status 'Cancelled' / 'Ditolak'. Kalau $excludeBookingId
     * di-pass (mis. dari reverse sync PR #2 — booking yang sedang di-save sudah
     * di-handle oleh path itu), skip juga.
     *
     * @return int  Jumlah row notifikasi yang ter-create.
     */
    public function recordEventForTripBookings(
        int $tripId,
        string $eventType,
        ?string $oldValue,
        ?string $newValue,
        ?int $excludeBookingId = null,
    ): int {
        $query = Booking::query()
            ->where('trip_id', $tripId)
            ->whereNotIn('booking_status', self::SKIP_STATUSES);

        if ($excludeBookingId !== null) {
            $query->where('id', '!=', $excludeBookingId);
        }

        $count = 0;
        foreach ($query->get() as $booking) {
            $this->recordEvent(
                booking:   $booking,
                eventType: $eventType,
                oldValue:  $oldValue,
                newValue:  $newValue,
                tripId:    $tripId,
            );
            $count++;
        }

        return $count;
    }

    /**
     * Resolve identitas penumpang. Prioritas:
     *   1. customer.phone_normalized (E.164 format, paling stable)
     *   2. booking.passenger_phone (raw input — fallback kalau customer NULL)
     * Nama: customer.display_name → booking.passenger_name.
     *
     * @return array{0: string|null, 1: string|null} [name, phone]
     */
    private function resolvePassengerSnapshot(Booking $booking): array
    {
        $booking->loadMissing('customer');
        $customer = $booking->customer;

        $name = $customer?->display_name
            ?: ($booking->passenger_name !== null && trim((string) $booking->passenger_name) !== ''
                ? trim((string) $booking->passenger_name)
                : null);

        $phone = $customer?->phone_normalized
            ?: ($booking->passenger_phone !== null && trim((string) $booking->passenger_phone) !== ''
                ? trim((string) $booking->passenger_phone)
                : null);

        return [$name, $phone];
    }

    /**
     * Resolve display value untuk preview message:
     *   - mobil_changed → lookup kode_mobil
     *   - driver_changed → lookup nama
     *   - trip_time_changed → HH:MM (strip detik untuk readability)
     *   - trip_canceled → tidak relevan
     *
     * NULL aman → render '—'.
     */
    private function resolveDisplayValue(string $eventType, ?string $rawValue): string
    {
        if ($rawValue === null || $rawValue === '') {
            return '—';
        }

        return match ($eventType) {
            self::EVENT_MOBIL_CHANGED  => Mobil::query()->whereKey($rawValue)->value('kode_mobil') ?: '—',
            self::EVENT_DRIVER_CHANGED => Driver::query()->whereKey($rawValue)->value('nama')       ?: '—',
            self::EVENT_TRIP_TIME_CHANGED => strlen($rawValue) >= 5 ? substr($rawValue, 0, 5) : $rawValue,
            default => $rawValue,
        };
    }

    private function compileMessage(
        Booking $booking,
        string $eventType,
        string $name,
        string $oldDisplay,
        string $newDisplay,
    ): string {
        $code = (string) ($booking->booking_code ?? '');
        $nameSafe = $name !== '' ? $name : 'Bapak/Ibu';

        $tripTime = $booking->trip_time !== null && strlen((string) $booking->trip_time) >= 5
            ? substr((string) $booking->trip_time, 0, 5)
            : (string) $booking->trip_time;
        $tripDate = $booking->trip_date instanceof \DateTimeInterface
            ? $booking->trip_date->format('d M Y')
            : (string) $booking->trip_date;

        return match ($eventType) {
            self::EVENT_TRIP_TIME_CHANGED => sprintf(
                'Halo %s, info perubahan dari JET Travel: jam keberangkatan booking %s berubah dari %s ke %s. Mobil & driver tetap sesuai e-tiket. Mohon konfirmasi. Terima kasih.',
                $nameSafe, $code, $oldDisplay, $newDisplay,
            ),
            self::EVENT_MOBIL_CHANGED => sprintf(
                'Halo %s, info perubahan dari JET Travel: mobil untuk booking %s jam %s berubah dari %s ke %s. Driver & jam tetap sama. Mohon konfirmasi. Terima kasih.',
                $nameSafe, $code, $tripTime, $oldDisplay, $newDisplay,
            ),
            self::EVENT_DRIVER_CHANGED => sprintf(
                'Halo %s, info perubahan dari JET Travel: driver untuk booking %s jam %s berubah dari %s ke %s. Mobil & jam tetap sama. Mohon konfirmasi. Terima kasih.',
                $nameSafe, $code, $tripTime, $oldDisplay, $newDisplay,
            ),
            self::EVENT_TRIP_CANCELED => sprintf(
                'Halo %s, pengumuman dari JET Travel: trip jam %s tanggal %s DIBATALKAN. Mohon hubungi admin untuk reschedule atau refund booking %s. Mohon maaf atas ketidaknyamanan.',
                $nameSafe, $tripTime, $tripDate, $code,
            ),
            default => sprintf('Info perubahan booking %s untuk %s.', $code, $nameSafe),
        };
    }
}
