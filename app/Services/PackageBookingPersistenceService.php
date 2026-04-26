<?php

namespace App\Services;

use App\Exceptions\WizardBackEditOnPaidBookingException;
use App\Models\Booking;
use App\Models\User;
use App\Services\SeatLockService;
use App\Traits\GeneratesUniqueBookingCodes;
use App\Traits\NormalizesTripTime;
use Illuminate\Contracts\Session\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class PackageBookingPersistenceService
{
    use GeneratesUniqueBookingCodes;
    use NormalizesTripTime;

    public function __construct(
        private readonly SeatLockService $seatLockService,
    ) {}

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
        User $actor,
    ): Booking {
        $reviewState = $drafts->buildReviewState($draft, $service);
        $persistedBookingId = $drafts->getPersistedBookingId($session);

        $booking = DB::transaction(function () use ($persistedBookingId, $reviewState, $actor) {
            $existing = $persistedBookingId
                ? Booking::query()->find($persistedBookingId)
                : null;

            // M4 paid guard (bug #27 analog M2 #22, M3 #25): block re-invoke kalau
            // booking existing sudah terbayar. Prevent payment_status overwrite Dibayar
            // -> Belum Bayar via fill() hardcode + prevent release attempt hard-lock throw
            // (SeatLockReleaseNotAllowedException post bug #31 fix).
            if ($existing && in_array((string) $existing->payment_status, ['Dibayar', 'Dibayar Tunai'], true)) {
                throw new WizardBackEditOnPaidBookingException(
                    bookingId: (int) $existing->getKey(),
                    bookingCode: (string) $existing->booking_code,
                    category: 'Paket',
                );
            }

            // Pattern A (tuple compare + full replace) — single-day Package dengan
            // package_size dimension (BEDA dari M2 Regular 5-field, BEDA dari M3 Rental
            // multi-day range tuple). Mode Besar = 1 seat, Mode Kecil/Sedang = 0 seat.
            // 3-transition handling: T1 seat change Besar->Besar, T2 mode downgrade
            // Besar->Kecil/Sedang (release only, no relock karena Kecil/Sedang no seat),
            // T3 mode upgrade Kecil/Sedang->Besar (lock fresh, no release karena
            // Kecil/Sedang had no seat), T4 identical (no-op).
            $oldTuple = $existing ? $this->buildSlotKey($existing) : null;
            $oldSeats = $existing ? $this->normalizeSeatList((array) ($existing->selected_seats ?? [])) : [];
            $newTuple = $this->buildSlotKeyFromReviewState($reviewState);
            $newSeats = $this->normalizeSeatList((array) ($reviewState['selected_seats'] ?? []));

            $tupleChanged = $oldTuple !== null && $oldTuple !== $newTuple;
            $seatsChanged = $oldSeats !== $newSeats;
            // IMPORTANT: $existing check di $needsRelease + $needsRelock adalah LOAD-BEARING
            // (analog M1/M2/M3 pattern). Kalau remove, create path (wasRecentlyCreated=true)
            // akan TRIGGER M4 branch di samping existing create-path block -> double lockSeats
            // call -> race condition introduced. $existing null untuk create -> $needsRelock
            // false -> only create-path branch fires.
            $needsRelease = $existing && ! empty($oldSeats) && ($tupleChanged || $seatsChanged);
            $needsRelock = $existing && ! empty($newSeats) && ($tupleChanged || $seatsChanged || empty($oldSeats));

            // M4 update path release: release old locks BEFORE fill() overwrite booking fields
            // + BEFORE create-path lockSeats fires. Sequence matters (analog M2/M3).
            if ($needsRelease) {
                $reason = sprintf(
                    'wizard_review_resubmit_package_%s_by_user_%s',
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

            // Bug #26 fix: operator ?? pada line 54 original hanya catch null, bukan ''.
            // normalizeDraft di PackageBookingDraftService line 223 emit '' saat trip_date
            // missing di payload -> fallback ?? tidak trigger -> empty string propagate
            // ke $booking->fill() -> MariaDB strict reject DATE=''.
            //
            // Fix pakai filled() yang catch both null & empty string. Pattern identik
            // bug #20 Regular (commit 43ccbe7) dan bug #23 Dropping (commit 337899b),
            // framing beda: Package sudah ada attempt fallback (pakai ??), hanya operator
            // yang salah.
            //
            // Log::warning trail supaya production bug serupa tidak silent.
            if (filled($reviewState['trip_date'] ?? null)) {
                $tripDate = $reviewState['trip_date'];
            } else {
                $tripDate = now()->toDateString();
                Log::warning('Package booking persist: trip_date empty, fallback ke today', [
                    'raw_value' => $reviewState['trip_date'] ?? null,
                    'fallback' => $tripDate,
                    'context' => 'PackageBookingPersistenceService::persistDraft',
                ]);
            }

            $notes = json_encode([
                'recipient_name' => $reviewState['recipient_name'],
                'recipient_phone' => $reviewState['recipient_phone'],
                'item_name' => $reviewState['item_name'],
                'item_qty' => $reviewState['item_qty'],
                'package_size' => $reviewState['package_size'],
            ], JSON_UNESCAPED_UNICODE);

            // Sesi 44A PR #1A: resolve direction; route_via default 'BANGKINANG'.
            $bookingDirection = app(RegularBookingService::class)->resolveDirection(
                (string) $reviewState['pickup_city'],
                (string) $reviewState['destination_city'],
            );

            $booking->fill([
                'category' => 'Paket',
                'from_city' => $reviewState['pickup_city'],
                'to_city' => $reviewState['destination_city'],
                'direction' => $bookingDirection,
                'route_via' => $booking->route_via ?? 'BANGKINANG',
                'trip_date' => $tripDate,
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

            // Integrate SeatLockService untuk create path (Fase 1A bug #2 race condition fix).
            // Package 2-mode: Package Besar (requires_seat=true, 1 seat) vs Package Kecil
            // (requires_seat=false, 0 seat). Guard !empty($selected_seats) handle keduanya:
            //   Mode A: lockSeats dipanggil dengan 1 slot × 1 seat = 1 row
            //   Mode B: skip lockSeats (tidak occupy kursi, parcel di bagasi)
            //
            // Share pool Regular auto-enforced via UNIQUE constraint uk_booking_seats_active_slot:
            // category='Paket' bukan filter di booking_seats query — Package Besar seat 5A di
            // slot (trip_date, trip_time, from_city, to_city, armada_index) sama dengan Regular
            // booking 5A → UNIQUE collision → SeatConflictException. Kontrak Section D confirmed.
            //
            // persistDraft Package selalu pre-payment (status Draft, payment_status Belum Bayar),
            // jadi lockType selalu 'soft'. quickPackageStore di BookingController yang direct-
            // confirmed kemungkinan 'hard' — scope Section K, belum masuk sekarang.
            //
            // Update path (wizard back-edit) handled di M4 release+relock block — bug #27
            // RESOLVED Section M4. Paid booking re-edit blocked via
            // WizardBackEditOnPaidBookingException guard di awal closure.
            if ($booking->wasRecentlyCreated && ! empty($reviewState['selected_seats'])) {
                $slot = [
                    'trip_date' => $tripDate,
                    'trip_time' => $this->normalizeTripTime($reviewState['departure_time_value']),
                    'from_city' => $reviewState['pickup_city'],
                    'to_city' => $reviewState['destination_city'],
                    'direction' => $bookingDirection,
                    'route_via' => $booking->route_via ?? 'BANGKINANG',
                    'armada_index' => max(1, (int) ($reviewState['armada_index'] ?? 1)),
                ];
                $this->seatLockService->lockSeats(
                    $booking,
                    [$slot],
                    $reviewState['selected_seats'],
                    'soft',
                );
            }

            // M4 update path relock: only fires kalau $needsRelock (existing booking +
            // tuple/seat changed + new seats not empty). Mutually exclusive dengan
            // create-path block di atas (wasRecentlyCreated=true untuk new booking saja).
            // $existing check di $needsRelock jaminan.
            if ($needsRelock) {
                $slot = [
                    'trip_date' => $tripDate,
                    'trip_time' => $this->normalizeTripTime($reviewState['departure_time_value']),
                    'from_city' => $reviewState['pickup_city'],
                    'to_city' => $reviewState['destination_city'],
                    'direction' => $bookingDirection,
                    'route_via' => $booking->route_via ?? 'BANGKINANG',
                    'armada_index' => max(1, (int) ($reviewState['armada_index'] ?? 1)),
                ];
                $this->seatLockService->lockSeats(
                    $booking,
                    [$slot],
                    $newSeats,
                    'soft',
                );
            }

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

        // Bug #31 fix: promote soft -> hard saat pembayaran instant confirmed
        // (qris/cash). Transfer tetap soft sampai admin validatePayment action=lunas
        // (path terpisah di BookingController::validatePayment). Method promoteToHard
        // idempotent (aman even kalau sudah hard, no-op).
        if ($marksAsPaid) {
            $this->seatLockService->promoteToHard($booking);
        }

        return $booking->fresh();
    }

    private function generateBookingCode(): string
    {
        return $this->generateUniqueBookingCode(Booking::class, 'booking_code', 'PKT', 4);
    }

    private function generateInvoiceNumber(): string
    {
        return $this->generateUniqueBookingCode(Booking::class, 'invoice_number', 'SBB', 4);
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

    /**
     * Build single-day Package tuple key dari Booking existing.
     *
     * NOTE: 6-field tuple shape (trip_date, trip_time, from_city, to_city,
     * armada_index, package_size) — BEDA dari M2 Regular 5-field (no package_size),
     * BEDA dari M3 Rental tuple shape (no date range, package_size dimension).
     * Package needs package_size dimension untuk capture mode transition
     * Besar<->Kecil/Sedang sebagai "tuple changed" (T2/T3 handling).
     *
     * Field mapping Booking -> tuple:
     *   booking_for -> package_size (Booking column repurposed per Package domain).
     *
     * @return array{trip_date: string, trip_time: string, from_city: string, to_city: string, armada_index: int, package_size: string}
     */
    private function buildSlotKey(Booking $booking): array
    {
        $fromCity = trim((string) $booking->from_city);
        $toCity = trim((string) $booking->to_city);

        return [
            'trip_date' => $booking->trip_date instanceof \DateTimeInterface
                ? $booking->trip_date->format('Y-m-d')
                : (string) $booking->trip_date,
            'trip_time' => $this->normalizeTripTime((string) ($booking->trip_time ?? '')),
            'from_city' => $fromCity,
            'to_city' => $toCity,
            'direction' => $booking->direction
                ?? app(RegularBookingService::class)->resolveDirection($fromCity, $toCity),
            'route_via' => $booking->route_via ?? 'BANGKINANG',
            'armada_index' => max(1, (int) ($booking->armada_index ?? 1)),
            'package_size' => trim((string) ($booking->booking_for ?? '')),
        ];
    }

    /**
     * Build tuple key dari wizard reviewState. Shape identical dengan
     * buildSlotKey(Booking) untuk compare. Field mapping reviewState -> tuple:
     *   pickup_city -> from_city, destination_city -> to_city,
     *   departure_time_value -> trip_time (normalized HH:MM:SS).
     *
     * @return array{trip_date: string, trip_time: string, from_city: string, to_city: string, armada_index: int, package_size: string}
     */
    private function buildSlotKeyFromReviewState(array $reviewState): array
    {
        $fromCity = trim((string) ($reviewState['pickup_city'] ?? ''));
        $toCity = trim((string) ($reviewState['destination_city'] ?? ''));

        return [
            'trip_date' => filled($reviewState['trip_date'] ?? null)
                ? (string) $reviewState['trip_date']
                : now()->toDateString(),
            'trip_time' => $this->normalizeTripTime((string) ($reviewState['departure_time_value'] ?? '')),
            'from_city' => $fromCity,
            'to_city' => $toCity,
            'direction' => app(RegularBookingService::class)->resolveDirection($fromCity, $toCity),
            'route_via' => 'BANGKINANG',
            'armada_index' => max(1, (int) ($reviewState['armada_index'] ?? 1)),
            'package_size' => trim((string) ($reviewState['package_size'] ?? '')),
        ];
    }

    /**
     * Duplicate dari M2/M3 normalizeSeatList — trait/base class refactor defer
     * ke Fase 1B per bug #28 pattern.
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
