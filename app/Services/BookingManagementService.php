<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\BookingPassenger;
use App\Models\BookingSeat;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Services\CustomerLoyaltyService;
use App\Services\CustomerResolverService;
use App\Services\SeatLockService;

class BookingManagementService
{
    public function __construct(
        protected RegularBookingService $regularBookingService,
        protected RegularBookingPaymentService $paymentService,
        protected CustomerResolverService $customerResolver,
        protected CustomerLoyaltyService $loyaltyService,
        protected SeatLockService $seatLockService,
    ) {
    }

    public function bookingForOptions(): array
    {
        return collect($this->regularBookingService->bookingTypes())
            ->map(fn (array $item): array => [
                'value' => $item['label'],
                'label' => $item['label'],
            ])
            ->values()
            ->all();
    }

    public function bookingForValues(): array
    {
        return array_column($this->bookingForOptions(), 'value');
    }

    public function locationOptions(): array
    {
        return $this->regularBookingService->locations();
    }

    public function departureTimeOptions(): array
    {
        return $this->regularBookingService->departureSchedules();
    }

    public function passengerCountOptions(): array
    {
        return $this->regularBookingService->passengerCounts();
    }

    public function seatOptions(): array
    {
        return collect($this->regularBookingService->seatLayout())
            ->filter(fn (array $seat): bool => $seat['kind'] === 'seat')
            ->values()
            ->all();
    }

    public function paymentMethodOptions(): array
    {
        return $this->paymentService->paymentMethods();
    }

    public function paymentMethodValues(): array
    {
        return $this->paymentService->paymentMethodValues();
    }

    public function paymentStatusOptions(): array
    {
        return [
            ['value' => 'Belum Bayar', 'label' => 'Belum Bayar'],
            ['value' => 'Menunggu Pembayaran', 'label' => 'Menunggu Pembayaran'],
            ['value' => 'Menunggu Verifikasi', 'label' => 'Menunggu Verifikasi'],
            ['value' => 'Dibayar', 'label' => 'Dibayar'],
            ['value' => 'Dibayar Tunai', 'label' => 'Dibayar Tunai'],
            ['value' => 'Lunas', 'label' => 'Lunas'],
            ['value' => 'Ditolak', 'label' => 'Ditolak'],
        ];
    }

    public function paymentStatusValues(): array
    {
        return array_column($this->paymentStatusOptions(), 'value');
    }

    public function bookingStatusOptions(): array
    {
        return [
            ['value' => 'Draft', 'label' => 'Draft'],
            ['value' => 'Menunggu Verifikasi Pembayaran', 'label' => 'Menunggu Verifikasi Pembayaran'],
            ['value' => 'Diproses', 'label' => 'Diproses'],
        ];
    }

    public function bookingStatusValues(): array
    {
        return array_column($this->bookingStatusOptions(), 'value');
    }

    public function serviceTypeOptions(): array
    {
        return [
            ['value' => 'Reguler', 'label' => 'Reguler'],
        ];
    }

    public function serviceTypeValues(): array
    {
        return array_column($this->serviceTypeOptions(), 'value');
    }

    public function transferBankAccountOptions(): array
    {
        return $this->paymentService->transferBankAccounts();
    }

    public function routeMatrix(): array
    {
        return $this->regularBookingService->routeMatrix();
    }

    public function defaultPaymentStatusForMethod(?string $method): string
    {
        $normalizedMethod = $this->normalizePaymentMethod($method);

        return match ($normalizedMethod) {
            'transfer' => 'Menunggu Pembayaran',
            'qris' => 'Dibayar',
            'cash' => 'Dibayar Tunai',
            default => 'Belum Bayar',
        };
    }

    public function defaultBookingStatusForMethod(?string $method): string
    {
        $normalizedMethod = $this->normalizePaymentMethod($method);

        return match ($normalizedMethod) {
            'transfer' => 'Menunggu Verifikasi Pembayaran',
            'qris', 'cash' => 'Diproses',
            default => 'Draft',
        };
    }

    public function filteredQuery(Request $request): Builder
    {
        $search = trim((string) $request->query('search', ''));
        $date = trim((string) $request->query('date', ''));
        $direction = trim((string) $request->query('direction', ''));

        return Booking::query()
            ->when($date !== '', fn (Builder $q) => $q->where('trip_date', $date))
            ->when($direction === 'to_pkb', fn (Builder $q) => $q->where('to_city', 'Pekanbaru'))
            ->when($direction === 'from_pkb', fn (Builder $q) => $q->where('from_city', 'Pekanbaru'))
            ->when($search !== '', function (Builder $query) use ($search) {
                $query->where(function (Builder $subQuery) use ($search) {
                    $subQuery
                        ->where('booking_code', 'like', "%{$search}%")
                        ->orWhere('invoice_number', 'like', "%{$search}%")
                        ->orWhere('ticket_number', 'like', "%{$search}%")
                        ->orWhere('passenger_name', 'like', "%{$search}%")
                        ->orWhere('passenger_phone', 'like', "%{$search}%")
                        ->orWhere('from_city', 'like', "%{$search}%")
                        ->orWhere('to_city', 'like', "%{$search}%")
                        ->orWhere('booking_status', 'like', "%{$search}%")
                        ->orWhere('payment_status', 'like', "%{$search}%")
                        ->orWhere('category', 'like', "%{$search}%");
                });
            });
    }

    public function listPayload(Booking $booking): array
    {
        return [
            'id' => $booking->getKey(),
            'booking_code' => (string) $booking->booking_code,
            'nama_pemesanan' => (string) $booking->passenger_name,
            'phone' => (string) $booking->passenger_phone,
            'from_city' => (string) $booking->from_city,
            'to_city' => (string) $booking->to_city,
            'trip_date' => $booking->trip_date?->toDateString(),
            'trip_date_label' => $booking->trip_date?->format('d M Y') ?? '-',
            'trip_time' => $booking->time ?? '-',
            'selected_seats_label' => $this->regularBookingService->selectedSeatLabels((array) ($booking->selected_seats ?? [])),
            'passenger_count' => (int) ($booking->passenger_count ?? 0),
            'category' => trim((string) ($booking->category ?? '')) !== '' ? (string) $booking->category : 'Reguler',
            'service_type' => trim((string) ($booking->category ?? '')) !== '' ? (string) $booking->category : 'Belum ditentukan',
            'total_amount' => (float) ($booking->total_amount ?? 0),
            'total_amount_formatted' => $this->regularBookingService->formatCurrency((float) ($booking->total_amount ?? 0)),
            'address_summary' => $this->addressSummary($booking),
            'pickup_location' => (string) $booking->pickup_location,
            'dropoff_location' => (string) $booking->dropoff_location,
            'booking_status' => (string) $booking->booking_status,
            'payment_status' => (string) $booking->payment_status,
            'booking_status_badge_class' => $this->statusBadgeClass((string) $booking->booking_status),
            'payment_status_badge_class' => $this->statusBadgeClass((string) $booking->payment_status),
            'driver_id' => $booking->driver_id,
            'driver_name' => trim((string) ($booking->driver_name ?? '')) !== '' ? (string) $booking->driver_name : null,
            'additional_fare_per_passenger' => max(0, (int) round((float) ($booking->total_amount ?? 0) / max(1, (int) ($booking->passenger_count ?? 1)) - (float) ($booking->price_per_seat ?? 0))),
            'selected_seats' => (array) ($booking->selected_seats ?? []),
            'pickup_location' => (string) ($booking->pickup_location ?? ''),
            'dropoff_location' => (string) ($booking->dropoff_location ?? ''),
            'departure_status' => (string) ($booking->departure_status ?? ''),
            'armada_index' => (int) ($booking->armada_index ?? 1),
            'can_edit' => true,
            'can_delete' => true,
        ];
    }

    public function detailPayload(Booking $booking): array
    {
        $booking->loadMissing('passengers');
        $selectedSeats = $this->regularBookingService->sortSeatCodes((array) ($booking->selected_seats ?? []));
        $passengers = $this->normalizePassengerPayload(
            $booking->passengers
                ->map(fn ($passenger): array => [
                    'seat_no' => (string) $passenger->seat_no,
                    'name' => (string) $passenger->name,
                    'phone' => (string) $passenger->phone,
                ])
                ->all(),
            $selectedSeats,
        );

        return array_merge($this->listPayload($booking), [
            'invoice_number' => $booking->invoice_number ?: '-',
            'ticket_number' => $booking->ticket_number ?: '-',
            'route_label' => trim((string) ($booking->route_label ?? '')) !== '' ? (string) $booking->route_label : ((string) $booking->from_city . ' - ' . (string) $booking->to_city),
            'driver_name' => trim((string) ($booking->driver_name ?? '')) !== '' ? (string) $booking->driver_name : 'Menunggu Penetapan Driver',
            'booking_for' => trim((string) ($booking->booking_for ?? '')) !== '' ? (string) $booking->booking_for : 'Untuk Diri Sendiri',
            'category' => trim((string) ($booking->category ?? '')) !== '' ? (string) $booking->category : 'Reguler',
            'trip_date_value' => $booking->trip_date?->toDateString() ?? '',
            'trip_time_value' => $booking->time ?? '',
            'selected_seats' => $selectedSeats,
            'price_per_seat' => (int) round((float) ($booking->price_per_seat ?? 0)),
            'payment_method_value' => $this->normalizePaymentMethod((string) ($booking->payment_method ?? '')),
            'bank_account_code' => $this->resolveBankAccountCode($booking),
            'passenger_count' => (int) ($booking->passenger_count ?? 0),
            'payment_method' => $this->paymentService->paymentMethodLabel($booking->payment_method),
            'created_at_label' => $booking->created_at?->format('d M Y H:i') ?? '-',
            'payment_reference' => $booking->payment_reference ?: '-',
            'notes' => (string) ($booking->notes ?? ''),
            'passengers' => $passengers,
        ]);
    }

    public function detailPagePayload(Booking $booking): array
    {
        $detail = $this->detailPayload($booking);
        $ticketState = $this->paymentService->buildTicketState($booking, $this->regularBookingService);
        $paymentAccountLabel = $booking->payment_account_bank && $booking->payment_account_number
            ? $booking->payment_account_bank . ' - ' . $booking->payment_account_number
            : 'Tidak diperlukan';

        return array_merge($detail, [
            'trip_date_label' => $booking->trip_date?->format('d M Y') ?? '-',
            'trip_time_label' => $booking->time ?? '-',
            'price_per_seat_formatted' => $this->regularBookingService->formatCurrency((float) ($booking->price_per_seat ?? 0)),
            'total_amount_formatted' => $this->regularBookingService->formatCurrency((float) ($booking->total_amount ?? 0)),
            'nominal_payment_formatted' => $this->regularBookingService->formatCurrency((float) ($booking->nominal_payment ?? $booking->total_amount ?? 0)),
            'payment_account_label' => $paymentAccountLabel,
            'qr_token' => $ticketState['qr_token'],
            'qr_code_markup' => $ticketState['qr_code_markup'],
            'qr_code_value' => $ticketState['qr_code_value'],
            'has_qr_code' => trim((string) $ticketState['qr_code_value']) !== '',
            'ticket_status' => $ticketState['ticket_status'],
            'loyalty_scan_label' => $ticketState['scan_count'] . ' / ' . $ticketState['loyalty_target'],
            'discount_status_label' => $ticketState['discount_status_label'],
            'payment_proof_url' => $booking->payment_proof_url,
            'validation_notes' => (string) ($booking->validation_notes ?? ''),
            'validated_at_label' => $booking->validated_at?->format('d M Y H:i') ?? null,
        ]);
    }

    public function createBooking(array $validated): Booking
    {
        return DB::transaction(function () use ($validated): Booking {
            $booking = new Booking();
            $booking->booking_code = $this->generateUniqueCode('booking_code', 'RBK');

            return $this->persistBooking($booking, $validated);
        });
    }

    public function updateBooking(Booking $booking, array $validated, User $actor): Booking
    {
        return DB::transaction(function () use ($booking, $validated, $actor): Booking {
            $oldSlotKey = $this->buildSlotKey($booking);
            $oldSeats = $this->normalizeSeatList((array) ($booking->selected_seats ?? []));
            $newSlotKey = $this->buildSlotKeyFromValidated($validated);
            $newSeats = $this->normalizeSeatList((array) ($validated['selected_seats'] ?? []));

            $slotChanged = $oldSlotKey !== $newSlotKey;
            $seatsChanged = $oldSeats !== $newSeats;
            $needsReLock = $slotChanged || $seatsChanged;

            if ($needsReLock && ! empty($oldSeats)) {
                $reason = sprintf(
                    'admin_update_booking_%s_by_user_%s',
                    $booking->booking_code,
                    $actor->id,
                );
                $this->seatLockService->releaseSeats($booking, $actor, $reason);
            }

            $persisted = $this->persistBooking($booking, $validated);

            if ($needsReLock && ! empty($newSeats)) {
                $paymentStatus = (string) ($validated['payment_status'] ?? $booking->payment_status);
                $isPaid = in_array($paymentStatus, ['Dibayar', 'Dibayar Tunai'], true);
                $lockType = $isPaid ? 'hard' : 'soft';
                $this->seatLockService->lockSeats(
                    $persisted,
                    [$newSlotKey],
                    $newSeats,
                    $lockType,
                );
            }

            return $persisted;
        });
    }

    public function deleteBooking(Booking $booking): void
    {
        DB::transaction(function () use ($booking): void {
            $booking->passengers()->delete();
            $booking->delete();
        });
    }

    public function paymentStatusAllowedForMethod(?string $method): array
    {
        return match ($this->normalizePaymentMethod((string) $method)) {
            'transfer' => ['Belum Bayar', 'Menunggu Pembayaran', 'Menunggu Verifikasi', 'Dibayar'],
            'qris' => ['Belum Bayar', 'Menunggu Pembayaran', 'Dibayar'],
            'cash' => ['Belum Bayar', 'Dibayar Tunai'],
            default => ['Belum Bayar'],
        };
    }

    public function normalizePassengerPayload(array $passengers, array $selectedSeats = []): array
    {
        $allowedSeatLookup = $selectedSeats === [] ? [] : array_flip($selectedSeats);
        $seatOrderLookup = $selectedSeats === [] ? [] : array_flip($selectedSeats);

        $normalizedPassengers = collect($passengers)
            ->map(fn ($passenger): array => [
                'seat_no' => trim((string) data_get($passenger, 'seat_no', '')),
                'name' => trim((string) data_get($passenger, 'name', '')),
                'phone' => $this->regularBookingService->normalizeIndonesianPhone((string) data_get($passenger, 'phone', '')),
            ])
            ->filter(function (array $passenger) use ($allowedSeatLookup): bool {
                if ($passenger['seat_no'] === '') {
                    return false;
                }

                return $allowedSeatLookup === [] || array_key_exists($passenger['seat_no'], $allowedSeatLookup);
            })
            ->unique('seat_no')
            ->values()
            ->all();

        if ($seatOrderLookup !== []) {
            usort(
                $normalizedPassengers,
                fn (array $left, array $right): int => ($seatOrderLookup[$left['seat_no']] ?? PHP_INT_MAX) <=> ($seatOrderLookup[$right['seat_no']] ?? PHP_INT_MAX),
            );
        }

        return $normalizedPassengers;
    }

    public function formOptions(): array
    {
        return [
            'booking_for_options' => $this->bookingForOptions(),
            'location_options' => $this->locationOptions(),
            'departure_time_options' => $this->departureTimeOptions(),
            'passenger_count_options' => $this->passengerCountOptions(),
            'seat_options' => $this->seatOptions(),
            'payment_method_options' => $this->paymentMethodOptions(),
            'payment_status_options' => $this->paymentStatusOptions(),
            'booking_status_options' => $this->bookingStatusOptions(),
            'service_type_options' => $this->serviceTypeOptions(),
            'transfer_bank_account_options' => $this->transferBankAccountOptions(),
            'route_matrix' => $this->routeMatrix(),
        ];
    }

    protected function persistBooking(Booking $booking, array $validated): Booking
    {
        $selectedSeats = $this->regularBookingService->sortSeatCodes((array) $validated['selected_seats']);
        $passengerCount = (int) $validated['passenger_count'];
        $pricePerSeat = $this->regularBookingService->resolveFare((string) $validated['from_city'], (string) $validated['to_city']) ?? 0;
        $additionalFare = max(0, (int) ($validated['additional_fare_per_passenger'] ?? 0));
        $totalAmount = ($pricePerSeat + $additionalFare) * $passengerCount;
        $paymentMethod = $this->normalizePaymentMethod($validated['payment_method'] ?? null);
        $paymentStatus = (string) $validated['payment_status'];
        $bookingStatus = (string) $validated['booking_status'];
        $ticketStatus = $this->ticketStatusFromPaymentStatus($paymentStatus);
        $passengers = $this->normalizePassengerPayload((array) $validated['passengers'], $selectedSeats);
        $firstPassenger = $passengers[0] ?? ['name' => 'Penumpang Utama', 'phone' => '-'];
        $requiresDocuments = $paymentMethod !== '' || $paymentStatus !== 'Belum Bayar';
        $paidStatuses = ['Dibayar', 'Dibayar Tunai'];
        $isPaid = in_array($paymentStatus, $paidStatuses, true);
        $transferAccount = $paymentMethod === 'transfer'
            ? $this->paymentService->bankAccountByCode($validated['bank_account_code'] ?? null)
            : null;
        $qrisAccount = $paymentMethod === 'qris'
            ? $this->paymentService->qrisAccount()
            : null;

        $booking->fill([
            'category' => trim((string) $validated['category']),
            'from_city' => trim((string) $validated['from_city']),
            'to_city' => trim((string) $validated['to_city']),
            'trip_date' => $validated['trip_date'],
            'trip_time' => $this->normalizeTripTime((string) $validated['trip_time']),
            'booking_for' => trim((string) $validated['booking_for']),
            'passenger_name' => $firstPassenger['name'],
            'passenger_phone' => $firstPassenger['phone'],
            'passenger_count' => $passengerCount,
            'pickup_location' => trim((string) $validated['pickup_location']),
            'dropoff_location' => trim((string) $validated['dropoff_location']),
            'selected_seats' => $selectedSeats,
            'price_per_seat' => $pricePerSeat,
            'total_amount' => $totalAmount,
            'nominal_payment' => $requiresDocuments ? $totalAmount : null,
            'route_label' => trim((string) $validated['from_city']) . ' - ' . trim((string) $validated['to_city']),
            'armada_index' => max(1, (int) ($validated['armada_index'] ?? 1)),
            'driver_name' => filled($validated['driver_name'] ?? null) ? trim((string) $validated['driver_name']) : null,
            'payment_method' => $paymentMethod !== '' ? $paymentMethod : null,
            'payment_account_bank' => $transferAccount['bank_name'] ?? $qrisAccount['provider_name'] ?? null,
            'payment_account_name' => $transferAccount['account_holder'] ?? $qrisAccount['account_holder'] ?? null,
            'payment_account_number' => $transferAccount['account_number'] ?? $qrisAccount['account_number'] ?? null,
            'payment_status' => $paymentStatus,
            'booking_status' => $bookingStatus,
            'ticket_status' => $ticketStatus,
            'paid_at' => $isPaid ? ($booking->paid_at ?? now()) : null,
            'invoice_number' => $requiresDocuments ? ($booking->invoice_number ?: $this->generateUniqueCode('invoice_number', 'INV')) : null,
            'ticket_number' => $requiresDocuments ? ($booking->ticket_number ?: $this->generateUniqueCode('ticket_number', 'ETK')) : null,
            'payment_reference' => $requiresDocuments
                ? ($booking->payment_reference ?: $this->generateUniqueCode('payment_reference', $this->paymentPrefix($paymentMethod)))
                : null,
            'notes' => trim((string) ($validated['notes'] ?? $booking->notes ?? '')),
        ]);

        $booking->qr_token = $booking->qr_token ?: $this->generateUniqueCode('qr_token', 'QRT', 6);
        $booking->qr_code_value = json_encode([
            'type' => 'regular_booking_ticket',
            'booking_code' => $booking->booking_code,
            'ticket_number' => $booking->ticket_number,
            'qr_token' => $booking->qr_token,
            'loyalty_target' => 5,
            'discount_percentage' => 50,
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?: null;

        $booking->loyalty_trip_count = max((int) ($booking->loyalty_trip_count ?? 0), 0);
        $booking->scan_count = max((int) ($booking->scan_count ?? 0), 0);
        $booking->discount_eligible = max((int) $booking->loyalty_trip_count, (int) $booking->scan_count) >= 5;

        // Resolve atau buat customer record berdasarkan data penumpang utama.
        // Jika customer belum ada, dibuat otomatis. customer_id disimpan ke booking.
        $primaryPassengerName  = trim((string) ($firstPassenger['name'] ?? ''));
        $primaryPassengerPhone = trim((string) ($firstPassenger['phone'] ?? ''));
        $customer = $this->customerResolver->resolve(
            $primaryPassengerPhone,
            $primaryPassengerName,
            // source_booking_id diisi setelah save (pakai id yang sudah ada jika update)
            $booking->exists ? (int) $booking->getKey() : null,
        );
        if ($customer !== null) {
            $booking->customer_id = $customer->id;
        }

        $booking->save();

        // Hitung ulang loyalty counter customer utama setelah booking disimpan.
        // Dijalankan di luar DB::transaction agar error loyalty tidak rollback booking.
        // CATATAN: Ini dipanggil setelah save() tapi masih di dalam transaction di
        // createBooking()/updateBooking() — jadikan fire-and-forget via try/catch.
        if ($customer !== null) {
            try {
                $this->loyaltyService->recalculateForCustomer($customer);
            } catch (\Throwable $e) {
                report($e);
            }
        }

        // Integrate SeatLockService untuk create path (Fase 1A bug #2 race condition fix).
        // Update path handled di updateBooking() wrapper (release+relock Pattern C) —
        // bug #21 RESOLVED Section M1.
        if ($booking->wasRecentlyCreated && ! empty($selectedSeats)) {
            $slot = [
                'trip_date' => $validated['trip_date'] instanceof \DateTimeInterface
                    ? $validated['trip_date']->format('Y-m-d')
                    : (string) $validated['trip_date'],
                'trip_time' => $this->normalizeTripTime((string) $validated['trip_time']),
                'from_city' => trim((string) $validated['from_city']),
                'to_city' => trim((string) $validated['to_city']),
                'armada_index' => max(1, (int) ($validated['armada_index'] ?? 1)),
            ];
            $lockType = $isPaid ? 'hard' : 'soft';
            $this->seatLockService->lockSeats($booking, [$slot], $selectedSeats, $lockType);
        }

        // Preserve QR + loyalty data for existing passengers (keyed by seat_no)
        $existingByseat = $booking->passengers->keyBy('seat_no');

        $booking->passengers()->delete();
        $booking->passengers()->createMany(
            collect($passengers)
                ->map(function (array $passenger) use ($ticketStatus, $firstPassenger, $existingByseat, $booking): array {
                    $seatNo   = $passenger['seat_no'];
                    $existing = $existingByseat->get($seatNo);

                    // Reuse the passenger's existing QR token, or generate a new one
                    $passengerQrToken = $existing?->qr_token
                        ?: $this->generatePassengerQrToken();

                    // qr_code_value = raw token (QR encodes the token directly, no JSON)
                    $passengerQrValue = $passengerQrToken;

                    // Resolve customer untuk setiap penumpang secara individual
                    $passengerName  = $passenger['name'] !== '' ? $passenger['name'] : $firstPassenger['name'];
                    $passengerPhone = $passenger['phone'] !== '' ? $passenger['phone'] : $firstPassenger['phone'];
                    $passengerCustomer = $this->customerResolver->resolve(
                        $passengerPhone,
                        $passengerName,
                        $booking->exists ? (int) $booking->getKey() : null,
                    );

                    return [
                        'seat_no'           => $seatNo,
                        'customer_id'       => $passengerCustomer?->id,
                        'name'              => $passengerName,
                        'phone'             => $passengerPhone,
                        'ticket_status'     => $ticketStatus,
                        'qr_token'          => $passengerQrToken,
                        'qr_code_value'     => $passengerQrValue,
                        'scan_count'        => (int) ($existing?->scan_count ?? 0),
                        'loyalty_count'     => (int) ($existing?->loyalty_count ?? 0),
                        'discount_eligible' => (bool) ($existing?->discount_eligible ?? false),
                        'eligible_discount' => (bool) ($existing?->eligible_discount ?? false),
                        'last_scanned_at'   => $existing?->last_scanned_at,
                    ];
                })
                ->all(),
        );

        return $booking->fresh('passengers');
    }

    private function addressSummary(Booking $booking): string
    {
        $summary = 'Jemput: ' . trim((string) ($booking->pickup_location ?? ''))
            . ' | Antar: ' . trim((string) ($booking->dropoff_location ?? ''));

        return Str::limit($summary, 110);
    }

    private function statusBadgeClass(string $status): string
    {
        if (in_array($status, ['Ditolak'], true)) {
            return 'stock-value-badge stock-value-badge-red';
        }

        return in_array($status, ['Diproses', 'Dibayar', 'Dibayar Tunai', 'Siap Terbit', 'Lunas'], true)
            ? 'stock-value-badge stock-value-badge-emerald'
            : 'stock-value-badge stock-value-badge-blue';
    }

    private function resolveBankAccountCode(Booking $booking): string
    {
        $bankName = trim((string) ($booking->payment_account_bank ?? ''));
        $accountNumber = trim((string) ($booking->payment_account_number ?? ''));

        if ($bankName === '' || $accountNumber === '') {
            return '';
        }

        $account = collect($this->paymentService->transferBankAccounts())
            ->first(fn (array $item): bool => $item['bank_name'] === $bankName && $item['account_number'] === $accountNumber);

        return $account['code'] ?? '';
    }

    private function normalizePaymentMethod(?string $method): string
    {
        return match (strtolower(trim((string) $method))) {
            'transfer' => 'transfer',
            'qris' => 'qris',
            'cash' => 'cash',
            default => '',
        };
    }

    private function normalizeTripTime(string $value): string
    {
        $trimmed = trim($value);

        return strlen($trimmed) === 5 ? $trimmed . ':00' : $trimmed;
    }

    private function ticketStatusFromPaymentStatus(string $paymentStatus): string
    {
        return match ($paymentStatus) {
            'Dibayar', 'Dibayar Tunai' => 'Siap Terbit',
            'Menunggu Verifikasi' => 'Menunggu Verifikasi Pembayaran',
            default => 'Draft',
        };
    }

    private function paymentPrefix(string $paymentMethod): string
    {
        return match ($paymentMethod) {
            'transfer' => 'TRF',
            'qris' => 'QRS',
            'cash' => 'CSH',
            default => 'PAY',
        };
    }

    private function generateUniqueCode(string $column, string $prefix, int $randomLength = 4): string
    {
        do {
            $code = $prefix . '-' . now()->format('ymd') . '-' . Str::upper(Str::random($randomLength));
        } while (Booking::query()->where($column, $code)->exists());

        return $code;
    }

    private function generatePassengerQrToken(): string
    {
        do {
            $code = 'PQR-' . now()->format('ymd') . '-' . Str::upper(Str::random(6));
        } while (BookingPassenger::query()->where('qr_token', $code)->exists());

        return $code;
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

    private function buildSlotKeyFromValidated(array $validated): array
    {
        return [
            'trip_date' => $validated['trip_date'] instanceof \DateTimeInterface
                ? $validated['trip_date']->format('Y-m-d')
                : (string) ($validated['trip_date'] ?? ''),
            'trip_time' => $this->normalizeTripTime((string) ($validated['trip_time'] ?? '')),
            'from_city' => trim((string) ($validated['from_city'] ?? '')),
            'to_city' => trim((string) ($validated['to_city'] ?? '')),
            'armada_index' => max(1, (int) ($validated['armada_index'] ?? 1)),
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
}
