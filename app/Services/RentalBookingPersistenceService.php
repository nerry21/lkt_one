<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Customer;
use Illuminate\Contracts\Session\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class RentalBookingPersistenceService
{
    public function __construct(
        private readonly CustomerResolverService $customerResolver,
        private readonly CustomerLoyaltyService  $loyaltyService,
    ) {}

    public function currentDraftBooking(Session $session, RentalBookingDraftService $drafts): ?Booking
    {
        $bookingId = $drafts->getPersistedBookingId($session);

        if (! $bookingId) {
            return null;
        }

        return Booking::query()->with('passengers')->find($bookingId);
    }

    public function persistDraft(
        Session $session,
        array $draft,
        RentalBookingService $service,
        RentalBookingDraftService $drafts,
    ): Booking {
        $reviewState        = $drafts->buildReviewState($draft, $service);
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
                'name'  => 'Pemesan Utama',
                'phone' => '-',
            ];

            // Bug #24 fix: filled() catch both null & empty string. Null-coalesce ??
            // tidak catch '' yang dihasilkan normalizeDraft saat date field missing di
            // session/payload. Fallback pattern identik bug #20 Regular (commit 43ccbe7)
            // dan bug #23 Dropping (commit 337899b), dengan nuansa khas Rental:
            //   - rental_start_date fallback ke today
            //   - rental_end_date fallback ke rental_start_date (POST-fallback) agar
            //     invariant end >= start tetap terjaga tanpa enforce manual
            // Log::warning trail supaya production bug serupa tidak silent.
            if (filled($reviewState['rental_start_date'] ?? null)) {
                $tripDate = $reviewState['rental_start_date'];
            } else {
                $tripDate = now()->toDateString();
                Log::warning('Rental booking persist: rental_start_date empty, fallback ke today', [
                    'raw_value' => $reviewState['rental_start_date'] ?? null,
                    'fallback' => $tripDate,
                    'context' => 'RentalBookingPersistenceService::persistDraft',
                ]);
            }

            if (filled($reviewState['rental_end_date'] ?? null)) {
                $endDate = $reviewState['rental_end_date'];
            } else {
                $endDate = $tripDate;
                Log::warning('Rental booking persist: rental_end_date empty, fallback ke rental_start_date', [
                    'raw_value' => $reviewState['rental_end_date'] ?? null,
                    'fallback' => $endDate,
                    'context' => 'RentalBookingPersistenceService::persistDraft',
                ]);
            }

            $booking->fill([
                'category'         => 'Rental',
                'from_city'        => $reviewState['pickup_location'],
                'to_city'          => $reviewState['destination_location'],
                'trip_date'        => $tripDate,
                'rental_end_date'  => $endDate,
                'trip_time'        => '00:00:00',
                'booking_for'      => $reviewState['booking_type'],
                'passenger_name'   => $primaryPassenger['name'],
                'passenger_phone'  => $primaryPassenger['phone'],
                'passenger_count'  => 6,
                'pickup_location'  => $reviewState['pickup_address'],
                'dropoff_location' => $reviewState['dropoff_address'],
                'selected_seats'   => $reviewState['selected_seats'],
                'price_per_seat'   => $reviewState['fare_amount'],
                'total_amount'     => $reviewState['total_amount'],
                'nominal_payment'  => null,
                'route_label'      => $reviewState['route_label'],
                'driver_name'      => null,
                'payment_method'   => null,
                'payment_account_bank'   => null,
                'payment_account_name'   => null,
                'payment_account_number' => null,
                'armada_index'     => max(1, (int) ($reviewState['armada_index'] ?? 1)),
                'payment_status'   => 'Belum Bayar',
                'booking_status'   => 'Draft',
                'ticket_status'    => 'Draft',
                'notes'            => 'Draft rental mobil dari dashboard. Semua kursi dipesan (1A, 2A, 2B, 3A, 4A, 5A). Periode rental: ' . $tripDate . ' s/d ' . $endDate . '.',
            ]);

            $booking->save();

            $primaryCustomer = $this->customerResolver->resolve(
                $primaryPassenger['phone'] ?? null,
                $primaryPassenger['name'] ?? '',
                (int) $booking->getKey(),
            );
            if ($primaryCustomer !== null) {
                $booking->customer_id = $primaryCustomer->id;
                $booking->saveQuietly();
            }

            $booking->passengers()->delete();
            $booking->passengers()->createMany(
                collect($reviewState['passengers'])
                    ->map(function (array $passenger) use ($booking): array {
                        $customer = $this->customerResolver->resolve(
                            $passenger['phone'] ?? null,
                            $passenger['name'] ?? '',
                            (int) $booking->getKey(),
                        );

                        return [
                            'seat_no'       => $passenger['seat_no'],
                            'name'          => $passenger['name'],
                            'phone'         => $passenger['phone'],
                            'ticket_status' => 'Draft',
                            'customer_id'   => $customer?->id,
                        ];
                    })
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
        RentalBookingService $service,
        RentalBookingDraftService $drafts,
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
        $shouldRefreshReference = trim((string) ($booking->payment_reference ?? '')) === ''
            || $previousPaymentMethod !== $paymentMethod;
        $paymentReference = $shouldRefreshReference
            ? $this->generatePaymentReference($paymentMethod)
            : (string) $booking->payment_reference;
        $ticketNumber = $booking->ticket_number ?: $this->generateTicketNumber();
        $qrToken      = $booking->qr_token ?: $this->generateQrToken();
        $scanCount     = max((int) ($booking->scan_count ?? 0), 0);
        $loyaltyTripCount = max((int) ($booking->loyalty_trip_count ?? 0), 0);

        $booking->fill([
            'payment_method'          => $paymentMethod,
            'payment_reference'       => $paymentReference,
            'payment_account_bank'    => $bankAccount['bank_name'] ?? null,
            'payment_account_name'    => $bankAccount['account_holder'] ?? null,
            'payment_account_number'  => $bankAccount['account_number'] ?? null,
            'nominal_payment'         => $booking->total_amount,
            'payment_status'          => $payments->paymentStatusForMethod($paymentMethod),
            'booking_status'          => $payments->bookingStatusForPaymentMethod($paymentMethod),
            'paid_at'                 => $marksAsPaid ? now() : null,
            'invoice_number'          => $booking->invoice_number ?: $this->generateInvoiceNumber(),
            'ticket_number'           => $ticketNumber,
            'qr_token'                => $qrToken,
            'qr_code_value'           => $this->buildQrCodeValue($booking->booking_code, $ticketNumber, $qrToken),
            'ticket_status'           => $payments->ticketStatusForPaymentMethod($paymentMethod),
            'loyalty_trip_count'      => $loyaltyTripCount,
            'scan_count'              => $scanCount,
            'discount_eligible'       => $this->isDiscountEligible($scanCount, $loyaltyTripCount),
        ]);

        $booking->save();

        $this->recalculateCustomerLoyalty($booking);

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
            'ticket_number'     => $ticketNumber,
            'qr_token'          => $qrToken,
            'qr_code_value'     => $this->buildQrCodeValue($booking->booking_code, $ticketNumber, $qrToken),
            'loyalty_trip_count'=> $loyaltyTripCount,
            'scan_count'        => $scanCount,
            'discount_eligible' => $this->isDiscountEligible($scanCount, $loyaltyTripCount),
        ]);

        if ($booking->isDirty(['ticket_number', 'qr_token', 'qr_code_value', 'loyalty_trip_count', 'scan_count', 'discount_eligible'])) {
            $booking->save();
        }

        return $booking->fresh('passengers');
    }

    private function recalculateCustomerLoyalty(Booking $booking): void
    {
        if (! $booking->customer_id) {
            return;
        }

        try {
            $customer = Customer::find($booking->customer_id);
            if ($customer instanceof Customer) {
                $this->loyaltyService->recalculateForCustomer($customer);
            }
        } catch (\Throwable $e) {
            report($e);
        }
    }

    private function generateBookingCode(): string
    {
        do {
            $code = 'RNT-' . now()->format('ymd') . '-' . Str::upper(Str::random(4));
        } while (Booking::query()->where('booking_code', $code)->exists());

        return $code;
    }

    private function generateInvoiceNumber(): string
    {
        do {
            $num = 'INV-' . now()->format('ymd') . '-' . Str::upper(Str::random(4));
        } while (Booking::query()->where('invoice_number', $num)->exists());

        return $num;
    }

    private function generateTicketNumber(): string
    {
        do {
            $num = 'ETK-' . now()->format('ymd') . '-' . Str::upper(Str::random(4));
        } while (Booking::query()->where('ticket_number', $num)->exists());

        return $num;
    }

    private function generateQrToken(): string
    {
        do {
            $token = 'QRT-' . now()->format('ymd') . '-' . Str::upper(Str::random(6));
        } while (Booking::query()->where('qr_token', $token)->exists());

        return $token;
    }

    private function generatePaymentReference(string $paymentMethod): string
    {
        $prefix = match ($paymentMethod) {
            'transfer' => 'TRF',
            'qris'     => 'QRS',
            'cash'     => 'CSH',
            default    => 'PAY',
        };

        do {
            $ref = $prefix . '-' . now()->format('ymd') . '-' . Str::upper(Str::random(4));
        } while (Booking::query()->where('payment_reference', $ref)->exists());

        return $ref;
    }

    private function buildQrCodeValue(string $bookingCode, string $ticketNumber, string $qrToken): string
    {
        $payload = [
            'type'                => 'rental_booking_ticket',
            'booking_code'        => $bookingCode,
            'ticket_number'       => $ticketNumber,
            'qr_token'            => $qrToken,
            'loyalty_target'      => 5,
            'discount_percentage' => 50,
        ];

        return json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)
            ?: "rental_booking_ticket|{$bookingCode}|{$ticketNumber}|{$qrToken}";
    }

    private function isDiscountEligible(int $scanCount, int $loyaltyTripCount): bool
    {
        return max($scanCount, $loyaltyTripCount) >= 5;
    }
}
