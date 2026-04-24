<?php

namespace App\Services;

use App\Exceptions\WizardBackEditOnPaidBookingException;
use App\Models\Booking;
use App\Models\Customer;
use App\Models\User;
use App\Services\SeatLockService;
use App\Traits\GeneratesUniqueBookingCodes;
use App\Traits\NormalizesTripTime;
use Illuminate\Contracts\Session\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class DroppingBookingPersistenceService
{
    use GeneratesUniqueBookingCodes;
    use NormalizesTripTime;

    public function __construct(
        private readonly CustomerResolverService $customerResolver,
        private readonly CustomerLoyaltyService  $loyaltyService,
        private readonly SeatLockService         $seatLockService,
    ) {}

    public function currentDraftBooking(Session $session, DroppingBookingDraftService $drafts): ?Booking
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
        DroppingBookingService $service,
        DroppingBookingDraftService $drafts,
        User $actor,
    ): Booking {
        $reviewState = $drafts->buildReviewState($draft, $service);
        $persistedBookingId = $drafts->getPersistedBookingId($session);

        $booking = DB::transaction(function () use ($persistedBookingId, $reviewState, $actor) {
            $existing = $persistedBookingId
                ? Booking::query()->find($persistedBookingId)
                : null;

            // M5 paid guard (bug #34 analog M2 #22, M3 #25, M4 #27): block re-invoke
            // kalau booking existing sudah terbayar. Prevent payment_status overwrite
            // Dibayar -> Belum Bayar via fill() hardcode + prevent release attempt
            // hard-lock throw (SeatLockReleaseNotAllowedException post bug #31 fix).
            if ($existing && in_array((string) $existing->payment_status, ['Dibayar', 'Dibayar Tunai'], true)) {
                throw new WizardBackEditOnPaidBookingException(
                    bookingId: (int) $existing->getKey(),
                    bookingCode: (string) $existing->booking_code,
                    category: 'Dropping',
                );
            }

            // Pattern A (tuple compare + full replace) — single-day Dropping dengan
            // 5-field tuple (trip_date, trip_time, from_city, to_city, armada_index).
            // Analog M2 Regular tuple shape, BEDA dari M4 Package 6-field (no
            // package_size dimension karena Dropping single-variant passenger group).
            // Seat hardcoded 6 full armada (1A, 2A, 2B, 3A, 4A, 5A), jadi seat change
            // transition TIDAK APPLICABLE — hanya slot change scenario. $seatsChanged
            // defensive check retained future-proof kalau variant future diperkenalkan.
            $oldTuple = $existing ? $this->buildSlotKey($existing) : null;
            $oldSeats = $existing ? $this->normalizeSeatList((array) ($existing->selected_seats ?? [])) : [];
            $newTuple = $this->buildSlotKeyFromReviewState($reviewState);
            $newSeats = $this->normalizeSeatList((array) ($reviewState['selected_seats'] ?? []));

            $tupleChanged = $oldTuple !== null && $oldTuple !== $newTuple;
            $seatsChanged = $oldSeats !== $newSeats;
            // IMPORTANT: $existing check di $needsRelease + $needsRelock adalah
            // LOAD-BEARING (analog M1/M2/M3/M4 pattern). Kalau remove, create path
            // (wasRecentlyCreated=true) akan TRIGGER M5 branch di samping existing
            // create-path block -> double lockSeats call -> race condition. $existing
            // null untuk create -> $needsRelock false -> only create-path branch fires.
            $needsRelease = $existing && ! empty($oldSeats) && ($tupleChanged || $seatsChanged);
            $needsRelock = $existing && ! empty($newSeats) && ($tupleChanged || $seatsChanged || empty($oldSeats));

            // M5 update path release: release old locks BEFORE fill() overwrite booking fields
            // + BEFORE create-path lockSeats fires. Sequence matters (analog M2/M3/M4).
            if ($needsRelease) {
                $reason = sprintf(
                    'wizard_review_resubmit_dropping_%s_by_user_%s',
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
                'name'  => 'Penumpang Utama',
                'phone' => '-',
            ];

            // Bug #23 fix: filled() catch both null & empty string. Null-coalesce ??
            // tidak catch '' yang dihasilkan normalizeDraft saat trip_date missing di
            // session/payload. Fallback ke today konsisten dengan Regular Section G (bug #20).
            // Log::warning trail supaya production bug serupa tidak silent.
            if (filled($reviewState['trip_date'] ?? null)) {
                $tripDate = $reviewState['trip_date'];
            } else {
                $tripDate = now()->toDateString();
                Log::warning('Dropping booking persist: trip_date empty, fallback ke today', [
                    'raw_value' => $reviewState['trip_date'] ?? null,
                    'fallback' => $tripDate,
                    'context' => 'DroppingBookingPersistenceService::persistDraft',
                ]);
            }

            $booking->fill([
                'category'        => 'Dropping',
                'from_city'       => $reviewState['pickup_location'],
                'to_city'         => $reviewState['destination_location'],
                'trip_date'       => $tripDate,
                'trip_time'       => $this->normalizeTripTime($reviewState['departure_time_value']),
                'booking_for'     => $reviewState['booking_type'],
                'passenger_name'  => $primaryPassenger['name'],
                'passenger_phone' => $primaryPassenger['phone'],
                'passenger_count' => 6,
                'pickup_location' => $reviewState['pickup_address'],
                'dropoff_location'=> $reviewState['dropoff_address'],
                'selected_seats'  => $reviewState['selected_seats'],
                'price_per_seat'  => $reviewState['fare_amount'],
                'total_amount'    => $reviewState['total_amount'],
                'nominal_payment' => null,
                'route_label'     => $reviewState['route_label'],
                'driver_name'     => null,
                'payment_method'  => null,
                'payment_account_bank'  => null,
                'payment_account_name'  => null,
                'payment_account_number'=> null,
                'armada_index'    => max(1, (int) ($reviewState['armada_index'] ?? 1)),
                'payment_status'  => 'Belum Bayar',
                'booking_status'  => 'Draft',
                'ticket_status'   => 'Draft',
                'notes'           => 'Draft dropping booking dari dashboard. Semua kursi dipesan (1A, 2A, 2B, 3A, 4A, 5A). Tahap pembayaran dan e-ticket akan dilanjutkan pada alur berikutnya.',
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

            // Integrate SeatLockService untuk create path (Fase 1A bug #2 race condition fix).
            // persistDraft Dropping selalu pre-payment (status Draft, payment_status Belum Bayar),
            // jadi lockType selalu 'soft'. promoteToHard dipanggil saat payment confirmation
            // (scope persistPaymentSelection — belum masuk Section F promote logic).
            //
            // 6 seat di-lock sesuai aturan bisnis Dropping (armada di-reserve penuh).
            // Source 6 seat: $reviewState['selected_seats'] di-set oleh DroppingBookingDraftService
            // line 164 via $service->allSeatCodes() — array 6 kursi standar.
            //
            // Update path (wizard back-edit) handled di M5 release+relock block — bug #34
            // RESOLVED Section M5. Paid booking re-edit blocked via
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

            // M5 update path relock: only fires kalau $needsRelock (existing booking +
            // tuple/seat changed + new seats not empty). Mutually exclusive dengan
            // create-path block di atas (wasRecentlyCreated=true untuk new booking saja).
            // $existing check di $needsRelock jaminan.
            if ($needsRelock) {
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
        DroppingBookingService $service,
        DroppingBookingDraftService $drafts,
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
            'payment_method'         => $paymentMethod,
            'payment_reference'      => $paymentReference,
            'payment_account_bank'   => $bankAccount['bank_name'] ?? null,
            'payment_account_name'   => $bankAccount['account_holder'] ?? null,
            'payment_account_number' => $bankAccount['account_number'] ?? null,
            'nominal_payment'        => $booking->total_amount,
            'payment_status'         => $payments->paymentStatusForMethod($paymentMethod),
            'booking_status'         => $payments->bookingStatusForPaymentMethod($paymentMethod),
            'paid_at'                => $marksAsPaid ? now() : null,
            'invoice_number'         => $booking->invoice_number ?: $this->generateInvoiceNumber(),
            'ticket_number'          => $ticketNumber,
            'qr_token'               => $qrToken,
            'qr_code_value'          => $this->buildQrCodeValue($booking->booking_code, $ticketNumber, $qrToken),
            'ticket_status'          => $payments->ticketStatusForPaymentMethod($paymentMethod),
            'loyalty_trip_count'     => $loyaltyTripCount,
            'scan_count'             => $scanCount,
            'discount_eligible'      => $this->isDiscountEligible($scanCount, $loyaltyTripCount),
        ]);

        $booking->save();

        // Bug #31 fix: promote soft -> hard saat pembayaran instant confirmed
        // (qris/cash). Transfer tetap soft sampai admin validatePayment action=lunas
        // (path terpisah di BookingController::validatePayment). Method promoteToHard
        // idempotent (aman even kalau sudah hard, no-op).
        if ($marksAsPaid) {
            $this->seatLockService->promoteToHard($booking);
        }

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
            'ticket_number'    => $ticketNumber,
            'qr_token'         => $qrToken,
            'qr_code_value'    => $this->buildQrCodeValue($booking->booking_code, $ticketNumber, $qrToken),
            'loyalty_trip_count'=> $loyaltyTripCount,
            'scan_count'       => $scanCount,
            'discount_eligible'=> $this->isDiscountEligible($scanCount, $loyaltyTripCount),
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
        return $this->generateUniqueBookingCode(Booking::class, 'booking_code', 'DBK', 4);
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
            'type'                => 'dropping_booking_ticket',
            'booking_code'        => $bookingCode,
            'ticket_number'       => $ticketNumber,
            'qr_token'            => $qrToken,
            'loyalty_target'      => 5,
            'discount_percentage' => 50,
        ];

        return json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)
            ?: "dropping_booking_ticket|{$bookingCode}|{$ticketNumber}|{$qrToken}";
    }

    private function isDiscountEligible(int $scanCount, int $loyaltyTripCount): bool
    {
        return max($scanCount, $loyaltyTripCount) >= 5;
    }

    /**
     * Build single-day Dropping tuple key dari Booking existing.
     *
     * NOTE: 5-field tuple shape (trip_date, trip_time, from_city, to_city,
     * armada_index) — analog M2 Regular tuple shape, BEDA dari M4 Package
     * 6-field (no package_size dimension karena Dropping single-variant
     * passenger group dengan hardcoded 6-seat full armada reservation).
     * Slot change only scenario (seat change N/A karena seats hardcoded).
     *
     * @return array{trip_date: string, trip_time: string, from_city: string, to_city: string, armada_index: int}
     */
    private function buildSlotKey(Booking $booking): array
    {
        return [
            'trip_date' => $booking->trip_date instanceof \DateTimeInterface
                ? $booking->trip_date->format('Y-m-d')
                : (string) $booking->trip_date,
            'trip_time' => $this->normalizeTripTime((string) ($booking->trip_time ?? '')),
            'from_city' => trim((string) $booking->from_city),
            'to_city' => trim((string) $booking->to_city),
            'armada_index' => max(1, (int) ($booking->armada_index ?? 1)),
        ];
    }

    /**
     * Build tuple key dari wizard reviewState. Shape identical dengan
     * buildSlotKey(Booking) untuk compare. Field mapping reviewState -> tuple:
     *   pickup_location -> from_city, destination_location -> to_city,
     *   departure_time_value -> trip_time (normalized HH:MM:SS).
     *
     * @return array{trip_date: string, trip_time: string, from_city: string, to_city: string, armada_index: int}
     */
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

    /**
     * Duplicate dari M2/M3/M4 normalizeSeatList — trait/base class refactor
     * defer ke Fase 1B per bug #28 pattern. Defensive retained meskipun
     * Dropping hardcoded 6-seat array (future-proof kalau variant diperkenalkan).
     */
    private function normalizeSeatList(array $seats): array
    {
        $clean = array_values(array_unique(array_map(
            fn ($s): string => trim((string) $s),
            $seats,
        )));
        sort($clean);

        return $clean;
    }
}
