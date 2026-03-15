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
                'trip_date' => $reviewState['trip_date'] ?? now()->toDateString(),
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

        $previousPaymentMethod = (string) ($booking->payment_method ?? '');
        $bankAccount = $paymentData['payment_method'] === 'transfer'
            ? $payments->bankAccountByCode($paymentData['bank_account_code'] ?? null)
            : null;
        $paymentMethod = (string) $paymentData['payment_method'];
        $marksAsPaid = $payments->marksPaymentAsPaid($paymentMethod);
        $shouldRefreshPaymentReference = trim((string) ($booking->payment_reference ?? '')) === ''
            || $previousPaymentMethod !== $paymentMethod;
        $paymentReference = $shouldRefreshPaymentReference
            ? $this->generatePaymentReference($paymentMethod)
            : (string) $booking->payment_reference;
        $ticketNumber = $booking->ticket_number ?: $this->generateTicketNumber();
        $qrToken = $booking->qr_token ?: $this->generateQrToken();
        $scanCount = max((int) ($booking->scan_count ?? 0), 0);
        $loyaltyTripCount = max((int) ($booking->loyalty_trip_count ?? 0), 0);

        $booking->fill([
            'payment_method' => $paymentMethod,
            'payment_reference' => $paymentReference,
            'payment_account_bank' => $bankAccount['bank_name'] ?? null,
            'payment_account_name' => $bankAccount['account_holder'] ?? null,
            'payment_account_number' => $bankAccount['account_number'] ?? null,
            'nominal_payment' => $booking->total_amount,
            'payment_status' => $payments->paymentStatusForMethod($paymentMethod),
            'booking_status' => $payments->bookingStatusForPaymentMethod($paymentMethod),
            'paid_at' => $marksAsPaid ? now() : null,
            'invoice_number' => $booking->invoice_number ?: $this->generateInvoiceNumber(),
            'ticket_number' => $ticketNumber,
            'qr_token' => $qrToken,
            'qr_code_value' => $this->buildQrCodeValue($booking->booking_code, $ticketNumber, $qrToken),
            'ticket_status' => $payments->ticketStatusForPaymentMethod($paymentMethod),
            'loyalty_trip_count' => $loyaltyTripCount,
            'scan_count' => $scanCount,
            'discount_eligible' => $this->isDiscountEligible($scanCount, $loyaltyTripCount),
            'notes' => $this->buildPaymentNotes($paymentMethod, $paymentReference, $bankAccount),
        ]);

        $booking->save();

        return $booking->fresh('passengers');
    }

    public function ensureTicketMetadata(Booking $booking): Booking
    {
        $ticketNumber = trim((string) ($booking->ticket_number ?? '')) !== ''
            ? (string) $booking->ticket_number
            : $this->generateTicketNumber();
        $qrToken = trim((string) ($booking->qr_token ?? '')) !== ''
            ? (string) $booking->qr_token
            : $this->generateQrToken();
        $scanCount = max((int) ($booking->scan_count ?? 0), 0);
        $loyaltyTripCount = max((int) ($booking->loyalty_trip_count ?? 0), 0);

        $booking->fill([
            'ticket_number' => $ticketNumber,
            'qr_token' => $qrToken,
            'qr_code_value' => $this->buildQrCodeValue($booking->booking_code, $ticketNumber, $qrToken),
            'loyalty_trip_count' => $loyaltyTripCount,
            'scan_count' => $scanCount,
            'discount_eligible' => $this->isDiscountEligible($scanCount, $loyaltyTripCount),
        ]);

        if ($booking->isDirty([
            'ticket_number',
            'qr_token',
            'qr_code_value',
            'loyalty_trip_count',
            'scan_count',
            'discount_eligible',
        ])) {
            $booking->save();
        }

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

    private function generateInvoiceNumber(): string
    {
        do {
            $invoiceNumber = 'INV-' . now()->format('ymd') . '-' . Str::upper(Str::random(4));
        } while (Booking::query()->where('invoice_number', $invoiceNumber)->exists());

        return $invoiceNumber;
    }

    private function generateTicketNumber(): string
    {
        do {
            $ticketNumber = 'ETK-' . now()->format('ymd') . '-' . Str::upper(Str::random(4));
        } while (Booking::query()->where('ticket_number', $ticketNumber)->exists());

        return $ticketNumber;
    }

    private function generateQrToken(): string
    {
        do {
            $qrToken = 'QRT-' . now()->format('ymd') . '-' . Str::upper(Str::random(6));
        } while (Booking::query()->where('qr_token', $qrToken)->exists());

        return $qrToken;
    }

    private function generatePaymentReference(string $paymentMethod): string
    {
        $prefix = match ($paymentMethod) {
            'transfer' => 'TRF',
            'qris' => 'QRS',
            'cash' => 'CSH',
            default => 'PAY',
        };

        do {
            $paymentReference = $prefix . '-' . now()->format('ymd') . '-' . Str::upper(Str::random(4));
        } while (Booking::query()->where('payment_reference', $paymentReference)->exists());

        return $paymentReference;
    }

    private function buildPaymentNotes(string $paymentMethod, string $paymentReference, ?array $bankAccount): string
    {
        if ($paymentMethod === 'transfer' && $bankAccount) {
            return "Pembayaran transfer sudah dicatat dengan referensi {$paymentReference}. Menunggu verifikasi untuk rekening {$bankAccount['bank_name']} {$bankAccount['account_number']} a.n. {$bankAccount['account_holder']}.";
        }

        if ($paymentMethod === 'qris') {
            return "Pembayaran QRIS sudah dicatat dengan referensi {$paymentReference} dan ditandai dibayar. Booking siap dilanjutkan ke proses berikutnya.";
        }

        return "Pembayaran tunai dipilih dengan referensi {$paymentReference} dan langsung ditandai sebagai dibayar tunai. Booking siap dilanjutkan ke proses berikutnya.";
    }

    private function buildQrCodeValue(string $bookingCode, string $ticketNumber, string $qrToken): string
    {
        $payload = [
            'type' => 'regular_booking_ticket',
            'booking_code' => $bookingCode,
            'ticket_number' => $ticketNumber,
            'qr_token' => $qrToken,
            'loyalty_target' => 5,
            'discount_percentage' => 50,
        ];

        return json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)
            ?: "regular_booking_ticket|{$bookingCode}|{$ticketNumber}|{$qrToken}";
    }

    private function isDiscountEligible(int $scanCount, int $loyaltyTripCount): bool
    {
        return max($scanCount, $loyaltyTripCount) >= 5;
    }
}
