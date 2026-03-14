<?php

namespace App\Services;

use App\Models\Booking;
use Illuminate\Contracts\Session\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RegularBookingPersistenceService
{
    public function currentDraftBooking(Session $session, RegularBookingDraftService $drafts): ?Booking
    {
        $bookingId = $drafts->getPersistedBookingId($session);

        if (! $bookingId) {
            return null;
        }

        return Booking::query()
            ->with('passengers')
            ->find($bookingId);
    }

    public function persistDraft(
        Session $session,
        array $draft,
        RegularBookingService $service,
        RegularBookingDraftService $drafts,
    ): Booking {
        $reviewState = $drafts->buildReviewState($draft, $service);
        $persistedBookingId = $drafts->getPersistedBookingId($session);

        $booking = DB::transaction(function () use ($persistedBookingId, $reviewState) {
            $booking = $persistedBookingId
                ? Booking::query()->find($persistedBookingId)
                : null;

            if (! $booking) {
                $booking = new Booking();
                $booking->booking_code = $this->generateBookingCode();
            }

            $primaryPassenger = $reviewState['passengers'][0] ?? [
                'name' => 'Penumpang Utama',
                'phone' => '-',
            ];

            $booking->fill([
                'category' => 'Reguler',
                'from_city' => $reviewState['pickup_location'],
                'to_city' => $reviewState['destination_location'],
                // Skema booking mewajibkan trip_date, sementara alur regular booking saat ini baru menangkap jam keberangkatan.
                'trip_date' => now()->toDateString(),
                'trip_time' => $this->normalizeTripTime($reviewState['departure_time_value']),
                'booking_for' => $reviewState['booking_type'],
                'passenger_name' => $primaryPassenger['name'],
                'passenger_phone' => $primaryPassenger['phone'],
                'passenger_count' => $reviewState['passenger_count'],
                'pickup_location' => $reviewState['pickup_address'],
                'dropoff_location' => $reviewState['dropoff_address'],
                'selected_seats' => $reviewState['selected_seats'],
                'price_per_seat' => $reviewState['fare_amount'],
                'total_amount' => $reviewState['total_amount'],
                'nominal_payment' => null,
                'route_label' => $reviewState['route_label'],
                'driver_name' => null,
                'payment_method' => null,
                'payment_account_bank' => null,
                'payment_account_name' => null,
                'payment_account_number' => null,
                'payment_status' => 'Belum Bayar',
                'booking_status' => 'Draft',
                'ticket_status' => 'Draft',
                'notes' => 'Draft regular booking dari dashboard. Tahap pembayaran dan e-ticket akan dilanjutkan pada alur berikutnya.',
            ]);

            $booking->save();

            $booking->passengers()->delete();
            $booking->passengers()->createMany(
                collect($reviewState['passengers'])
                    ->map(fn (array $passenger): array => [
                        'seat_no' => $passenger['seat_no'],
                        'name' => $passenger['name'],
                        'phone' => $passenger['phone'],
                        'ticket_status' => 'Draft',
                    ])
                    ->all(),
            );

            return $booking->fresh('passengers');
        });

        $drafts->storePersistedBookingId($session, (int) $booking->getKey());

        return $booking;
    }

    public function persistPaymentSelection(
        Session $session,
        array $draft,
        array $paymentData,
        RegularBookingService $service,
        RegularBookingDraftService $drafts,
        RegularBookingPaymentService $payments,
    ): Booking {
        $booking = $this->currentDraftBooking($session, $drafts)
            ?? $this->persistDraft($session, $draft, $service, $drafts);

        $bankAccount = $paymentData['payment_method'] === 'transfer'
            ? $payments->bankAccountByCode($paymentData['bank_account_code'] ?? null)
            : null;

        $booking->fill([
            'payment_method' => $paymentData['payment_method'],
            'payment_account_bank' => $bankAccount['bank_name'] ?? null,
            'payment_account_name' => $bankAccount['account_holder'] ?? null,
            'payment_account_number' => $bankAccount['account_number'] ?? null,
            'nominal_payment' => $booking->total_amount,
            'payment_status' => $payments->pendingPaymentStatus(),
            'booking_status' => $payments->pendingPaymentStatus(),
            'notes' => $this->buildPaymentNotes($paymentData['payment_method'], $bankAccount),
        ]);

        $booking->save();

        return $booking->fresh('passengers');
    }

    private function generateBookingCode(): string
    {
        do {
            $bookingCode = 'RBK-' . now()->format('ymd') . '-' . Str::upper(Str::random(4));
        } while (Booking::query()->where('booking_code', $bookingCode)->exists());

        return $bookingCode;
    }

    private function normalizeTripTime(string $value): string
    {
        return strlen($value) === 5 ? $value . ':00' : $value;
    }

    private function buildPaymentNotes(string $paymentMethod, ?array $bankAccount): string
    {
        if ($paymentMethod === 'transfer' && $bankAccount) {
            return "Pembayaran menunggu transfer ke {$bankAccount['bank_name']} {$bankAccount['account_number']} a.n. {$bankAccount['account_holder']}.";
        }

        if ($paymentMethod === 'qris') {
            return 'Pembayaran menunggu proses QRIS pada tahap lanjutan.';
        }

        return "Pembayaran tunai dipilih. Tahap konfirmasi kasir akan dilanjutkan pada alur berikutnya.";
    }
}
