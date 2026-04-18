<?php

namespace App\Services;

use App\Exceptions\WizardBackEditOnPaidBookingException;
use App\Models\Booking;
use App\Models\Customer;
use App\Models\User;
use App\Services\SeatLockService;
use Carbon\CarbonPeriod;
use Illuminate\Contracts\Session\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class RentalBookingPersistenceService
{
    public function __construct(
        private readonly CustomerResolverService $customerResolver,
        private readonly CustomerLoyaltyService  $loyaltyService,
        private readonly SeatLockService         $seatLockService,
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
        User $actor,
    ): Booking {
        $reviewState        = $drafts->buildReviewState($draft, $service);
        $persistedBookingId = $drafts->getPersistedBookingId($session);

        $booking = DB::transaction(function () use ($persistedBookingId, $reviewState, $actor): Booking {
            $existing = $persistedBookingId
                ? Booking::query()->find($persistedBookingId)
                : null;

            // M3 guard (bug #25 analog M2 bug #22): block re-invoke kalau booking existing
            // sudah terbayar. Prevent payment_status overwrite Dibayar -> Belum Bayar via
            // fill() hardcode + prevent release attempt hard-lock throw.
            if ($existing && in_array((string) $existing->payment_status, ['Dibayar', 'Dibayar Tunai'], true)) {
                throw new WizardBackEditOnPaidBookingException(
                    bookingId: (int) $existing->getKey(),
                    bookingCode: (string) $existing->booking_code,
                    category: 'Rental',
                );
            }

            // Pattern A (tuple compare + full replace). Multi-day rental: compare 5-field
            // range tuple (start, end, from, to, armada) + normalized seat set. Identical
            // -> no-op. Different -> full release all N×6 rows + full lock new N'×6 rows.
            // Trade-off: wasteful untuk partial change tapi reuses SeatLockService tanpa
            // mod — partial-efficient variant (Pendekatan B) defer ke future section.
            $oldRangeKey = $existing ? $this->buildSlotKey($existing) : null;
            $oldSeats = $existing ? $this->normalizeSeatList((array) ($existing->selected_seats ?? [])) : [];
            $newRangeKey = $this->buildSlotKeyFromReviewState($reviewState);
            $newSeats = $this->normalizeSeatList((array) ($reviewState['selected_seats'] ?? []));

            $rangeChanged = $oldRangeKey !== null && $oldRangeKey !== $newRangeKey;
            $seatsChanged = $oldSeats !== $newSeats;
            // IMPORTANT: $existing check di $needsReLock adalah LOAD-BEARING (analog M2 M1).
            // Kalau remove, create path (wasRecentlyCreated=true) akan TRIGGER M3 branch di
            // samping Section I create-path branch -> double lockSeats call -> race condition.
            $needsReLock = $existing && ($rangeChanged || $seatsChanged);

            if ($needsReLock && ! empty($oldSeats)) {
                $reason = sprintf(
                    'wizard_review_resubmit_rental_%s_by_user_%s',
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

            // Integrate SeatLockService untuk create path (Fase 1A bug #2 race condition fix).
            // Rental multi-hari: cartesian N hari × 6 seat = N×M row di booking_seats.
            // Caller bertanggung jawab expand date range per kontrak SeatLockService
            // Section D (4 public method locked — tidak boleh tambah expandDateRange helper).
            //
            // Single lockSeats() call dengan N pre-built slot = 1 atomic DB::transaction
            // di SeatLockService (bukan N panggilan = N transaksi terpisah). Kalau konflik
            // di hari manapun dalam range, rollback penuh — tidak ada partial-commit state.
            //
            // CarbonPeriod::create($start, $end) inclusive both endpoints by default.
            // Rental 1 hari (start == end) = 1 slot. Rental 3 hari = 3 slot × 6 seat = 18 row.
            //
            // persistDraft Rental selalu pre-payment (status Draft, payment_status Belum Bayar),
            // jadi lockType selalu 'soft'. promoteToHard dipanggil saat payment confirmation
            // (scope persistPaymentSelection — belum masuk Section F promote logic).
            //
            // 6 seat di-lock sesuai aturan bisnis Rental (armada di-reserve penuh per hari).
            // Source 6 seat: $reviewState['selected_seats'] dari RentalBookingDraftService
            // line 170 via $service->allSeatCodes() — identik pattern Dropping.
            //
            // Update path (wizard back-edit) handled di release+relock block M3 di atas/bawah
            // — bug #25 RESOLVED Section M3 via Pattern A (tuple compare full replace).
            // Paid booking re-edit blocked via WizardBackEditOnPaidBookingException guard di
            // awal closure.
            if ($booking->wasRecentlyCreated && ! empty($reviewState['selected_seats'])) {
                $slots = $this->expandRangeToSlots(
                    $tripDate,
                    $endDate,
                    $reviewState['pickup_location'],
                    $reviewState['destination_location'],
                    max(1, (int) ($reviewState['armada_index'] ?? 1)),
                );

                if (! empty($slots)) {
                    $this->seatLockService->lockSeats(
                        $booking,
                        $slots,
                        $reviewState['selected_seats'],
                        'soft',
                    );
                }
            }

            // M3 update path relock: only fires kalau $needsReLock (existing + range/seat
            // changed). Mutually exclusive dengan Section I create-path branch di atas
            // (wasRecentlyCreated=true untuk new booking saja). $existing check di
            // $needsReLock jaminan.
            if ($needsReLock && ! empty($newSeats)) {
                $slots = $this->expandRangeToSlots(
                    $tripDate,
                    $endDate,
                    $reviewState['pickup_location'],
                    $reviewState['destination_location'],
                    max(1, (int) ($reviewState['armada_index'] ?? 1)),
                );

                if (! empty($slots)) {
                    $this->seatLockService->lockSeats(
                        $booking,
                        $slots,
                        $newSeats,
                        'soft',
                    );
                }
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

    /**
     * Build multi-day range tuple key dari Booking existing.
     *
     * NOTE: TUPLE shape (rental_start_date, rental_end_date, from_city, to_city, armada_index)
     * — BEDA dari M1/M2 Regular/Dropping/Package single-slot key (trip_date, trip_time,
     * from_city, to_city, armada_index). Multi-day rental needs DATE RANGE dimension
     * untuk capture start+end, bukan single trip_date.
     *
     * @return array{rental_start_date: string, rental_end_date: string, from_city: string, to_city: string, armada_index: int}
     */
    private function buildSlotKey(Booking $booking): array
    {
        return [
            'rental_start_date' => $booking->trip_date instanceof \DateTimeInterface
                ? $booking->trip_date->format('Y-m-d')
                : (string) $booking->trip_date,
            'rental_end_date' => $booking->rental_end_date instanceof \DateTimeInterface
                ? $booking->rental_end_date->format('Y-m-d')
                : (string) $booking->rental_end_date,
            'from_city' => trim((string) $booking->from_city),
            'to_city' => trim((string) $booking->to_city),
            'armada_index' => max(1, (int) ($booking->armada_index ?? 1)),
        ];
    }

    /**
     * Build range tuple key dari wizard reviewState. Shape identical dengan
     * buildSlotKey(Booking) untuk compare.
     *
     * 1-day rental edge case: kalau rental_end_date kosong, fallback ke rental_start_date
     * supaya tuple invariant end >= start terjaga + identical detect preserved.
     *
     * @return array{rental_start_date: string, rental_end_date: string, from_city: string, to_city: string, armada_index: int}
     */
    private function buildSlotKeyFromReviewState(array $reviewState): array
    {
        $start = filled($reviewState['rental_start_date'] ?? null)
            ? (string) $reviewState['rental_start_date']
            : now()->toDateString();
        $end = filled($reviewState['rental_end_date'] ?? null)
            ? (string) $reviewState['rental_end_date']
            : $start;

        return [
            'rental_start_date' => $start,
            'rental_end_date' => $end,
            'from_city' => trim((string) ($reviewState['pickup_location'] ?? '')),
            'to_city' => trim((string) ($reviewState['destination_location'] ?? '')),
            'armada_index' => max(1, (int) ($reviewState['armada_index'] ?? 1)),
        ];
    }

    /**
     * Duplicate dari M1/M2 normalizeSeatList — trait/base class refactor defer ke Fase 1B
     * per bug #28 pattern.
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

    /**
     * Expand multi-day range ke array of slot keys (cartesian N hari × 6 seat = N×6 row
     * saat lock). Refactor dari inline CarbonPeriod loop Section I commit 2bfcbac
     * (line 158-166) ke helper. Behavior identical — regression guard via Test 1
     * di RentalBookingPersistenceServiceTest.
     *
     * @return array<int, array{trip_date: string, trip_time: string, from_city: string, to_city: string, armada_index: int}>
     */
    private function expandRangeToSlots(
        string $startDate,
        string $endDate,
        string $fromCity,
        string $toCity,
        int $armadaIndex,
    ): array {
        $slots = [];
        foreach (CarbonPeriod::create($startDate, $endDate) as $date) {
            $slots[] = [
                'trip_date' => $date->toDateString(),
                'trip_time' => '00:00:00',
                'from_city' => $fromCity,
                'to_city' => $toCity,
                'armada_index' => $armadaIndex,
            ];
        }

        return $slots;
    }
}
