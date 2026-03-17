<?php

namespace App\Services;

use App\Models\Booking;
use Illuminate\Contracts\Session\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PackageBookingPersistenceService
{
    public function currentDraftBooking(Session $session, PackageBookingDraftService $drafts): ?Booking
    {
        $bookingId = $drafts->getPersistedBookingId($session);

        if (! $bookingId) {
            return null;
        }

        return Booking::query()->find($bookingId);
    }

    public function persistDraft(
        Session $session,
        array $draft,
        PackageBookingService $service,
        PackageBookingDraftService $drafts,
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

            $notes = json_encode([
                'recipient_name' => $reviewState['recipient_name'],
                'recipient_phone' => $reviewState['recipient_phone'],
                'item_name' => $reviewState['item_name'],
                'item_qty' => $reviewState['item_qty'],
                'package_size' => $reviewState['package_size'],
            ], JSON_UNESCAPED_UNICODE);

            $booking->fill([
                'category' => 'Paket',
                'from_city' => $reviewState['pickup_city'],
                'to_city' => $reviewState['destination_city'],
                'trip_date' => $reviewState['trip_date'] ?? now()->toDateString(),
                'trip_time' => $this->normalizeTripTime($reviewState['departure_time_value']),
                'booking_for' => $reviewState['package_size'],
                'passenger_name' => $reviewState['sender_name'],
                'passenger_phone' => $reviewState['sender_phone'],
                'passenger_count' => $reviewState['item_qty'],
                'pickup_location' => $reviewState['sender_address'],
                'dropoff_location' => $reviewState['recipient_address'],
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
                'armada_index' => max(1, (int) ($reviewState['armada_index'] ?? 1)),
                'payment_status' => 'Belum Bayar',
                'booking_status' => 'Draft',
                'ticket_status' => 'Draft',
                'notes' => $notes,
            ]);

            $booking->save();

            return $booking->fresh();
        });

        $drafts->storePersistedBookingId($session, (int) $booking->getKey());

        return $booking;
    }

    public function persistPaymentSelection(
        Session $session,
        array $draft,
        array $paymentData,
        PackageBookingService $service,
        PackageBookingDraftService $drafts,
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
        $invoiceNumber = $booking->invoice_number ?: $this->generateInvoiceNumber();

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
            'invoice_number' => $invoiceNumber,
            'ticket_status' => $payments->ticketStatusForPaymentMethod($paymentMethod),
        ]);

        $booking->save();

        return $booking->fresh();
    }

    private function generateBookingCode(): string
    {
        do {
            $bookingCode = 'PKT-' . now()->format('ymd') . '-' . Str::upper(Str::random(4));
        } while (Booking::query()->where('booking_code', $bookingCode)->exists());

        return $bookingCode;
    }

    private function generateInvoiceNumber(): string
    {
        do {
            $invoiceNumber = 'SBB-' . now()->format('ymd') . '-' . Str::upper(Str::random(4));
        } while (Booking::query()->where('invoice_number', $invoiceNumber)->exists());

        return $invoiceNumber;
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

    private function normalizeTripTime(string $value): string
    {
        return strlen($value) === 5 ? $value . ':00' : $value;
    }
}
