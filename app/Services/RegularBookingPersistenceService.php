<?php

namespace App\Services;

use App\Exceptions\WizardBackEditOnPaidBookingException;
use App\Models\Booking;
use App\Models\Customer;
use App\Models\User;
use App\Services\CustomerLoyaltyService;
use App\Services\SeatLockService;
use App\Traits\GeneratesUniqueBookingCodes;
use App\Traits\NormalizesTripTime;
use Illuminate\Contracts\Session\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class RegularBookingPersistenceService
{
    use GeneratesUniqueBookingCodes;
    use NormalizesTripTime;

    public function __construct(
        private readonly CustomerResolverService $customerResolver,
        private readonly CustomerLoyaltyService  $loyaltyService,
        private readonly SeatLockService         $seatLockService,
    ) {}

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
        User $actor,
    ): Booking {
        $reviewState = $drafts->buildReviewState($draft, $service);
        $persistedBookingId = $drafts->getPersistedBookingId($session);

        $booking = DB::transaction(function () use ($persistedBookingId, $reviewState, $actor): Booking {
            $existing = $persistedBookingId
                ? Booking::query()->find($persistedBookingId)
                : null;

            // M2 guard (bug #22): block re-invoke kalau booking existing sudah terbayar.
            // Prevent payment_status overwrite Dibayar -> Belum Bayar (existing quirk di
            // fill() line yang hardcode 'payment_status' => 'Belum Bayar') + prevent
            // release attempt yang bakal throw SeatLockReleaseNotAllowedException juga
            // (hard lock guard post bug #31 fix).
            if ($existing && in_array((string) $existing->payment_status, ['Dibayar', 'Dibayar Tunai'], true)) {
                throw new WizardBackEditOnPaidBookingException(
                    bookingId: (int) $existing->getKey(),
                    bookingCode: (string) $existing->booking_code,
                    category: 'Regular',
                );
            }

            // Pattern C compare — capture old slot+seats SEBELUM fill() overwrite booking fields
            $oldSlotKey = $existing ? $this->buildSlotKey($existing) : null;
            $oldSeats = $existing ? $this->normalizeSeatList((array) ($existing->selected_seats ?? [])) : [];
            $newSlotKey = $this->buildSlotKeyFromReviewState($reviewState);
            $newSeats = $this->normalizeSeatList((array) ($reviewState['selected_seats'] ?? []));

            $slotChanged = $oldSlotKey !== null && $oldSlotKey !== $newSlotKey;
            $seatsChanged = $oldSeats !== $newSeats;
            // IMPORTANT: $existing check di $needsReLock adalah LOAD-BEARING.
            // Kalau remove, create path (wasRecentlyCreated=true) akan TRIGGER M2 branch
            // di samping Section G branch -> DOUBLE lockSeats call -> race condition
            // introduced. $existing null untuk create -> $needsReLock false -> only
            // Section G branch fires.
            $needsReLock = $existing && ($slotChanged || $seatsChanged);

            // M2 update path release: release old locks BEFORE fill() overwrite booking fields
            // + BEFORE Section G lockSeats fires. Sequence matters.
            if ($needsReLock && ! empty($oldSeats)) {
                $reason = sprintf(
                    'wizard_review_resubmit_regular_%s_by_user_%s',
                    $existing->booking_code,
                    $actor->id,
                );
                $this->seatLockService->releaseSeats($existing, $actor, $reason);
            }

            if (! $existing) {
                $booking = new Booking();
                $booking->booking_code = $this->generateBookingCode();
            } else {
                $booking = $existing;
            }

            $primaryPassenger = $reviewState['passengers'][0] ?? [
                'name' => 'Penumpang Utama',
                'phone' => '-',
            ];

            // Bug #20 fix: filled() catch both null & empty string. Null-coalesce ??
            // tidak catch '' yang dihasilkan normalizeDraft saat trip_date missing di
            // session/payload. Fallback ke today konsisten dengan buildFormState line 87.
            // Log::warning trail supaya production bug serupa tidak silent.
            if (filled($reviewState['trip_date'] ?? null)) {
                $tripDate = $reviewState['trip_date'];
            } else {
                $tripDate = now()->toDateString();
                Log::warning('Regular booking persist: trip_date empty, fallback ke today', [
                    'raw_value' => $reviewState['trip_date'] ?? null,
                    'fallback' => $tripDate,
                    'context' => 'RegularBookingPersistenceService::persistDraft',
                ]);
            }

            $booking->fill([
                'category' => 'Reguler',
                'from_city' => $reviewState['pickup_location'],
                'to_city' => $reviewState['destination_location'],
                'trip_date' => $tripDate,
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
                'armada_index' => max(1, (int) ($reviewState['armada_index'] ?? 1)),
                'payment_status' => 'Belum Bayar',
                'booking_status' => 'Draft',
                'ticket_status' => 'Draft',
                'notes' => 'Draft regular booking dari dashboard. Tahap pembayaran dan e-ticket akan dilanjutkan pada alur berikutnya.',
            ]);

            $booking->save();

            // Resolve customer dari penumpang utama dan set ke booking
            $primaryPassenger = $reviewState['passengers'][0] ?? [];
            $primaryCustomer = $this->customerResolver->resolve(
                $primaryPassenger['phone'] ?? null,
                $primaryPassenger['name'] ?? '',
                (int) $booking->getKey(),
            );
            if ($primaryCustomer !== null) {
                $booking->customer_id = $primaryCustomer->id;
                $booking->saveQuietly();
            }

            // Integrate SeatLockService untuk create path (Fase 1A bug #2 race condition fix).
            // persistDraft selalu pre-payment (status Draft, payment_status Belum Bayar),
            // jadi lockType selalu 'soft'. promoteToHard dipanggil saat payment confirmation
            // (scope persistPaymentSelection — lihat bug #31 untuk promote gap).
            //
            // Update path (wizard back-edit) handled di release+relock block M2 di atas/bawah —
            // bug #22 RESOLVED Section M2. Paid booking re-edit blocked via
            // WizardBackEditOnPaidBookingException guard di awal closure.
            if ($booking->wasRecentlyCreated && ! empty($reviewState['selected_seats'])) {
                $slot = [
                    'trip_date' => $tripDate,
                    'trip_time' => $this->normalizeTripTime($reviewState['departure_time_value']),
                    'from_city' => $reviewState['pickup_location'],
                    'to_city' => $reviewState['destination_location'],
                    'armada_index' => max(1, (int) ($reviewState['armada_index'] ?? 1)),
                ];
                $this->seatLockService->lockSeats(
                    $booking,
                    [$slot],
                    $reviewState['selected_seats'],
                    'soft',
                );
            }

            // M2 update path relock: only fires kalau $needsReLock (existing booking +
            // slot/seat changed). Mutually exclusive dengan create-path Section G branch
            // di atas (wasRecentlyCreated=true untuk new booking saja).
            if ($needsReLock && ! empty($newSeats)) {
                $this->seatLockService->lockSeats(
                    $booking,
                    [$newSlotKey],
                    $newSeats,
                    'soft',
                );
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
                            'seat_no'      => $passenger['seat_no'],
                            'name'         => $passenger['name'],
                            'phone'        => $passenger['phone'],
                            'ticket_status'=> 'Draft',
                            'customer_id'  => $customer?->id,
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
        RegularBookingService $service,
        RegularBookingDraftService $drafts,
        RegularBookingPaymentService $payments,
        User $actor,
    ): Booking {
        $booking = $this->currentDraftBooking($session, $drafts)
            ?? $this->persistDraft($session, $draft, $service, $drafts, $actor);

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

        // Bug #31 fix: promote soft -> hard saat pembayaran instant confirmed
        // (qris/cash). Transfer tetap soft sampai admin validatePayment action=lunas
        // (path terpisah di BookingController::validatePayment). Method promoteToHard
        // idempotent (aman even kalau sudah hard, no-op).
        if ($marksAsPaid) {
            $this->seatLockService->promoteToHard($booking);
        }

        // Hitung ulang loyalty customer saat pembayaran dikonfirmasi.
        // booking_status berubah ke Diproses / Menunggu Verifikasi → trip count berubah.
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

    /**
     * Hitung ulang loyalty customer yang terkait dengan booking ini.
     * Dijalankan fire-and-forget — error tidak memblokir alur booking.
     */
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
        return $this->generateUniqueBookingCode(Booking::class, 'booking_code', 'RBK', 4);
    }

    private function buildSlotKey(Booking $booking): array
    {
        return [
            'trip_date' => $booking->trip_date instanceof \DateTimeInterface
                ? $booking->trip_date->format('Y-m-d')
                : (string) $booking->trip_date,
            'trip_time' => $this->normalizeTripTime((string) $booking->trip_time),
            'from_city' => trim((string) $booking->from_city),
            'to_city' => trim((string) $booking->to_city),
            'armada_index' => max(1, (int) ($booking->armada_index ?? 1)),
        ];
    }

    private function buildSlotKeyFromReviewState(array $reviewState): array
    {
        return [
            'trip_date' => filled($reviewState['trip_date'] ?? null)
                ? (string) $reviewState['trip_date']
                : now()->toDateString(),
            'trip_time' => $this->normalizeTripTime((string) ($reviewState['departure_time_value'] ?? '')),
            'from_city' => trim((string) ($reviewState['pickup_location'] ?? '')),
            'to_city' => trim((string) ($reviewState['destination_location'] ?? '')),
            'armada_index' => max(1, (int) ($reviewState['armada_index'] ?? 1)),
        ];
    }

    private function normalizeSeatList(array $seats): array
    {
        $clean = array_values(array_unique(array_map(
            fn ($s): string => trim((string) $s),
            $seats,
        )));
        sort($clean);

        return $clean;
    }

    private function generateInvoiceNumber(): string
    {
        return $this->generateUniqueBookingCode(Booking::class, 'invoice_number', 'INV', 4);
    }

    private function generateTicketNumber(): string
    {
        return $this->generateUniqueBookingCode(Booking::class, 'ticket_number', 'ETK', 4);
    }

    private function generateQrToken(): string
    {
        return $this->generateUniqueBookingCode(Booking::class, 'qr_token', 'QRT', 6);
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
