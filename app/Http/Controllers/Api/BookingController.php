<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\BookingVersionConflictException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Booking\StoreBookingRequest;
use App\Http\Requests\Booking\StoreQuickPackageBookingRequest;
use App\Http\Requests\Booking\UpdateBookingRequest;
use App\Http\Requests\Booking\UpdateQuickPackageBookingRequest;
use App\Models\Booking;
use App\Models\BookingArmadaExtra;
use App\Models\User;
use App\Services\BookingManagementService;
use App\Services\CustomerLoyaltyService;
use App\Services\CustomerResolverService;
use App\Services\PackageBookingService;
use App\Services\RegularBookingPaymentService;
use App\Services\SeatLockService;
use App\Traits\NormalizesTripTime;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class BookingController extends Controller
{
    use NormalizesTripTime;

    public function index(Request $request, BookingManagementService $service): JsonResponse
    {
        $page = max(1, (int) $request->query('page', 1));
        $limit = max(1, (int) $request->query('limit', 10));

        $items = $service->filteredQuery($request)
            ->orderByDesc('trip_date')
            ->orderByDesc('trip_time')
            ->orderByDesc('created_at')
            ->forPage($page, $limit)
            ->get()
            ->map(fn (Booking $booking): array => $service->listPayload($booking))
            ->values();

        return response()->json($items);
    }

    public function count(Request $request, BookingManagementService $service): JsonResponse
    {
        return response()->json([
            'count' => $service->filteredQuery($request)->count(),
        ]);
    }

    public function show(Request $request, string $booking, BookingManagementService $service): JsonResponse
    {
        $this->actor($request);

        return response()->json(
            $service->detailPayload($this->findBooking($booking)),
        );
    }

    public function store(StoreBookingRequest $request, BookingManagementService $service): JsonResponse
    {
        $this->actor($request);

        $booking = $service->createBooking($request->validated());

        return response()->json($service->detailPayload($booking), 201);
    }

    public function update(UpdateBookingRequest $request, string $booking, BookingManagementService $service): JsonResponse
    {
        $actor = $this->actor($request);
        $validated = $request->validated();
        $expectedVersion = (int) $validated['version'];

        $updatedBooking = $service->updateBooking(
            $this->findBooking($booking),
            $validated,
            $actor,
            $expectedVersion,
        );

        return response()->json($service->detailPayload($updatedBooking));
    }

    public function occupiedSeats(Request $request): JsonResponse
    {
        $tripDate  = trim((string) $request->query('trip_date', ''));
        $tripTime  = trim((string) $request->query('trip_time', ''));
        $excludeId = trim((string) $request->query('exclude_id', ''));
        $fromCity  = trim((string) $request->query('from_city', ''));
        $toCity    = trim((string) $request->query('to_city', ''));
        $armadaIndex = max(1, (int) $request->query('armada_index', 1));

        // Bug #47b: defensive — required filter trip_date+trip_time DAN route
        // (from_city + to_city). Tanpa route, query agregat semua booking lintas
        // rute fisik berbeda menyebabkan contamination antar rute. Frontend
        // bookings/index.js sudah skip call kalau route empty, ini double-guard.
        if ($tripDate === '' || $tripTime === '' || $fromCity === '' || $toCity === '') {
            return response()->json(['occupied_seats' => []]);
        }

        // Sesi 44A PR #1A: filter slot fisik mobil pakai (date, time, direction, armada_index)
        // — bukan (date, time, from_city, to_city). Booking dari Simpang D dan Pasirpengaraian
        // sama-sama direction=to_pkb di mobil sama akan saling block kursi.
        // route_via belum di-filter di PR #1A (default semua BANGKINANG); PR #1C aktifkan.
        $regularBookingService = app(\App\Services\RegularBookingService::class);
        $direction = $regularBookingService->resolveDirection($fromCity, $toCity);

        $timePrefix = strlen($tripTime) >= 5 ? substr($tripTime, 0, 5) : $tripTime;

        $occupied = Booking::query()
            ->where('trip_date', $tripDate)
            ->where('trip_time', 'like', $timePrefix . '%')
            // Treat NULL armada_index as armada 1 (backward-compat for records created before migration)
            ->where(function ($q) use ($armadaIndex): void {
                $q->where('armada_index', $armadaIndex);
                if ($armadaIndex === 1) {
                    $q->orWhereNull('armada_index');
                }
            })
            ->where('direction', $direction)
            ->when($excludeId !== '', fn ($q) => $q->where('id', '!=', $excludeId))
            ->get()
            ->flatMap(fn (Booking $b) => (array) ($b->selected_seats ?? []))
            ->unique()
            ->values()
            ->all();

        return response()->json(['occupied_seats' => $occupied]);
    }

    public function validatePayment(Request $request, string $booking, SeatLockService $seatLockService): JsonResponse
    {
        $user   = $this->actor($request);
        $record = $this->findBooking($booking);

        $action = trim((string) $request->input('action', ''));
        $notes  = trim((string) $request->input('validation_notes', ''));

        $allowed = ['lunas', 'belum_lunas', 'ditolak'];
        if (! in_array($action, $allowed, true)) {
            return response()->json(['message' => 'Aksi validasi tidak valid'], 422);
        }

        // Guard: version required in request body (bug #30, PATCH carries body).
        $versionRaw = $request->input('version');
        if ($versionRaw === null || ! is_numeric($versionRaw)) {
            return response()->json([
                'error' => 'version_required',
                'message' => 'Parameter version wajib dikirim.',
            ], 422);
        }
        $expectedVersion = (int) $versionRaw;

        $updates = match ($action) {
            'lunas'       => ['payment_status' => 'Dibayar',   'booking_status' => 'Diproses', 'paid_at' => now()],
            'belum_lunas' => ['payment_status' => 'Belum Bayar', 'booking_status' => 'Draft',  'paid_at' => null],
            'ditolak'     => ['payment_status' => 'Ditolak',   'booking_status' => 'Draft',    'paid_at' => null],
        };

        // Atomic check-and-set replacement for fill()->save() (bug #30, design §7.4).
        // Single UPDATE with WHERE id = ? AND version = ? — elegant, no DB::transaction needed.
        $success = $record->updateWithVersionCheck(array_merge($updates, [
            'validated_by'     => $user->id,
            'validated_at'     => now(),
            'validation_notes' => $notes !== '' ? $notes : null,
        ]), $expectedVersion);

        if (! $success) {
            throw new BookingVersionConflictException($record->id, $expectedVersion);
        }

        // Bug #31 fix: admin transfer verification path — promote soft -> hard
        // saat admin konfirmasi payment lunas (unconditional, promoteToHard idempotent).
        // Wizard path handle qris/cash promote via $marksAsPaid conditional di
        // {Regular,Dropping,Rental,Package}BookingPersistenceService::persistPaymentSelection.
        // Admin lunas = explicit commitment → locks jadi hard (refund flow required).
        if ($action === 'lunas') {
            $seatLockService->promoteToHard($record);
        }

        // Saat pembayaran dikonfirmasi lunas → pastikan customer record ada dan
        // hitung ulang loyalty (total_trip_count) agar Data Pelanggan langsung update.
        if ($action === 'lunas') {
            try {
                $resolver = app(CustomerResolverService::class);
                $loyalty  = app(CustomerLoyaltyService::class);

                // Pastikan customer_id sudah terisi — resolve jika belum ada
                if (! $record->customer_id) {
                    $customer = $resolver->resolve(
                        $record->passenger_phone,
                        (string) ($record->passenger_name ?? ''),
                        (int) $record->id,
                    );
                    if ($customer) {
                        $record->customer_id = $customer->id;
                        $record->saveQuietly();
                    }
                }

                if ($record->customer_id) {
                    $customer = $record->customer_id instanceof \App\Models\Customer
                        ? $record->customer_id
                        : \App\Models\Customer::find($record->customer_id);

                    if ($customer) {
                        $loyalty->recalculateForCustomer($customer);
                    }
                }
            } catch (\Throwable $e) {
                report($e); // Jangan block response ke frontend
            }
        }

        return response()->json([
            'message' => match ($action) {
                'lunas'       => 'Pembayaran dikonfirmasi lunas',
                'belum_lunas' => 'Status dikembalikan ke belum bayar',
                'ditolak'     => 'Pembayaran ditolak',
            },
            'payment_status' => $record->payment_status,
            'booking_status' => $record->booking_status,
        ]);
    }

    public function updateDepartureStatus(Request $request, string $booking): JsonResponse
    {
        $this->actor($request);

        $record = $this->findBooking($booking);
        $status = trim((string) $request->input('departure_status', ''));

        $allowed = ['Berangkat', 'Tidak Berangkat', 'Di Oper', ''];

        if (! in_array($status, $allowed, true)) {
            return response()->json(['message' => 'Status keberangkatan tidak valid'], 422);
        }

        // Guard: version required in request body (bug #30, PATCH carries body).
        $versionRaw = $request->input('version');
        if ($versionRaw === null || ! is_numeric($versionRaw)) {
            return response()->json([
                'error' => 'version_required',
                'message' => 'Parameter version wajib dikirim.',
            ], 422);
        }
        $expectedVersion = (int) $versionRaw;

        // Atomic check-and-set replacement for $record->update() (bug #30, design §7.4).
        // Single UPDATE with WHERE id = ? AND version = ? — elegant, no DB::transaction needed.
        $success = $record->updateWithVersionCheck(
            ['departure_status' => $status !== '' ? $status : null],
            $expectedVersion,
        );

        if (! $success) {
            throw new BookingVersionConflictException($record->id, $expectedVersion);
        }

        return response()->json(['message' => 'Status keberangkatan berhasil diperbarui', 'departure_status' => $status]);
    }

    public function slotAssign(Request $request, BookingManagementService $service): JsonResponse
    {
        $this->actor($request);

        $tripDate = trim((string) $request->input('trip_date', ''));
        $tripTime = trim((string) $request->input('trip_time', ''));
        $direction = trim((string) $request->input('direction', ''));
        // Sesi 46 PR #57: cluster-aware filter. Empty/invalid = no cluster constraint.
        $routeVia = strtoupper(trim((string) $request->input('route_via', '')));
        $routeViaFilter = in_array($routeVia, ['BANGKINANG', 'PETAPAHAN'], true) ? $routeVia : null;
        $driverName = trim((string) $request->input('driver_name', ''));
        $driverId = $request->input('driver_id') ?: null;
        $armadaIndex = max(1, (int) $request->input('armada_index', 1));

        if ($tripDate === '' || $tripTime === '') {
            return response()->json(['message' => 'trip_date dan trip_time wajib diisi'], 422);
        }

        $timePrefix = strlen($tripTime) >= 5 ? substr($tripTime, 0, 5) : $tripTime;

        $updatedCount = DB::transaction(function () use (
            $tripDate, $timePrefix, $armadaIndex, $direction, $routeViaFilter, $driverName, $driverId,
        ): int {
            // Bug #37 — pessimistic batch lock: prevent concurrent admin race during
            // bulk slot reassignment. lockForUpdate holds row locks until COMMIT,
            // blocking concurrent transactions from mutating same rows.
            $query = Booking::query()
                ->where('trip_date', $tripDate)
                ->where('trip_time', 'like', $timePrefix . '%')
                ->where('armada_index', $armadaIndex);

            if ($direction === 'to_pkb') {
                $query->where('direction', 'to_pkb');
            } elseif ($direction === 'from_pkb') {
                $query->where('direction', 'from_pkb');
            }

            // Sesi 46 PR #57: cluster filter (D-PR57-1 backwards-compat).
            if ($routeViaFilter !== null) {
                $query->where('route_via', $routeViaFilter);
            }

            // Acquire row locks for matching set. lockForUpdate() on SELECT ensures
            // subsequent UPDATE in same transaction is atomic vs concurrent admin.
            $ids = $query->lockForUpdate()->pluck('id');

            if ($ids->isEmpty()) {
                return 0;
            }

            return Booking::query()
                ->whereIn('id', $ids)
                ->update([
                    'driver_name' => $driverName !== '' ? $driverName : null,
                    'driver_id' => $driverId,
                ]);
        });

        return response()->json([
            'message' => 'Driver berhasil diperbarui pada slot keberangkatan',
            'updated_count' => $updatedCount,
        ]);
    }

    public function armadaExtras(Request $request): JsonResponse
    {
        $date = trim((string) $request->query('date', ''));

        if ($date === '') {
            return response()->json([]);
        }

        // Sesi 46 PR #57: response cluster-aware composite key.
        // Format: { "HH:MM__DIRECTION__CLUSTER": max_armada_index, ... }
        // Mirror pola slotKey di JS state (D-PR57-2).
        // Backwards-compat: existing rows (semua direction='to_pkb' route_via='BANGKINANG'
        // post-backfill PR #56) tetap return composite key.
        $extras = BookingArmadaExtra::query()
            ->where('trip_date', $date)
            ->get()
            ->mapWithKeys(fn (BookingArmadaExtra $e) => [
                sprintf(
                    '%s__%s__%s',
                    $e->trip_time,
                    $e->direction ?? 'to_pkb',
                    $e->route_via ?? 'BANGKINANG',
                ) => $e->max_armada_index,
            ]);

        return response()->json($extras);
    }

    public function upsertArmadaExtra(Request $request): JsonResponse
    {
        $this->actor($request);

        $tripDate    = trim((string) $request->input('trip_date', ''));
        $tripTime    = trim((string) $request->input('trip_time', ''));
        $armadaIndex = max(1, (int) $request->input('armada_index', 1));

        // Sesi 46 PR #57: cluster-aware composite key untuk firstOrNew.
        // Backwards-compat default: kalau frontend belum kirim direction/route_via
        // (PR #58 belum deploy), default ke ('to_pkb', 'BANGKINANG'). Ini konsisten
        // dengan pola backfill Sesi 44A PR #1A + PR #56.
        // Whitelist value untuk reject input invalid (e.g. typo client).
        $direction = trim((string) $request->input('direction', ''));
        $direction = in_array($direction, ['to_pkb', 'from_pkb'], true) ? $direction : 'to_pkb';

        $routeVia = strtoupper(trim((string) $request->input('route_via', '')));
        $routeVia = in_array($routeVia, ['BANGKINANG', 'PETAPAHAN'], true) ? $routeVia : 'BANGKINANG';

        if ($tripDate === '' || $tripTime === '') {
            return response()->json(['message' => 'trip_date dan trip_time wajib diisi'], 422);
        }

        $extra = BookingArmadaExtra::query()
            ->firstOrNew([
                'trip_date' => $tripDate,
                'trip_time' => $tripTime,
                'direction' => $direction,
                'route_via' => $routeVia,
            ]);

        if ($armadaIndex > ($extra->max_armada_index ?? 0)) {
            $extra->max_armada_index = $armadaIndex;
            $extra->save();
        }

        return response()->json([
            'max_armada_index' => $extra->max_armada_index,
            'direction'        => $extra->direction,
            'route_via'        => $extra->route_via,
        ]);
    }

    public function quickPackageStore(
        StoreQuickPackageBookingRequest $request,
        PackageBookingService $packageService,
        RegularBookingPaymentService $payments,
        SeatLockService $seatLockService,
    ): JsonResponse {
        // Auth check OUTSIDE wrap - fail early sebelum open transaction
        $this->actor($request);
        $v = $request->validated();

        // Pure compute OUTSIDE wrap - no DB mutation, no state read
        $fareAmount     = (int) $v['fare_amount'];
        $additionalFare = (int) ($v['additional_fare'] ?? 0);
        $itemQty        = (int) ($v['item_qty'] ?? 1);
        $totalAmount    = ($fareAmount + $additionalFare) * $itemQty;
        $paymentMethod  = (string) ($v['payment_method'] ?? '');
        $paymentStatus  = (string) $v['payment_status'];
        $paidStatuses   = ['Dibayar', 'Dibayar Tunai'];
        $isPaid         = in_array($paymentStatus, $paidStatuses, true);
        $requiresDocs   = $paymentMethod !== '' || $paymentStatus !== 'Belum Bayar';

        $bankAccount = $paymentMethod === 'transfer'
            ? $payments->bankAccountByCode($v['bank_account_code'] ?? null)
            : null;

        $notes = json_encode([
            'recipient_name'  => trim((string) ($v['recipient_name'] ?? '')),
            'recipient_phone' => trim((string) ($v['recipient_phone'] ?? '')),
            'item_name'       => trim((string) ($v['item_name'] ?? '')),
            'item_qty'        => $itemQty,
            'package_size'    => trim((string) ($v['package_size'] ?? '')),
        ], JSON_UNESCAPED_UNICODE);

        // Extract slot-key fields ONCE untuk reuse di fill() + lockSeats slot build.
        // Konsisten value kedua usage (prevent subtle mismatch kalau source re-evaluated).
        $tripDate    = (string) $v['trip_date'];
        $tripTime    = $this->normalizeTripTime((string) $v['trip_time']);
        $fromCity    = trim((string) $v['from_city']);
        $toCity      = trim((string) $v['to_city']);
        $armadaIndex = max(1, (int) ($v['armada_index'] ?? 1));

        $selectedSeats = (trim((string) ($v['package_size'] ?? '')) === 'Besar'
            && trim((string) ($v['seat_code'] ?? '')) !== '')
            ? [trim((string) $v['seat_code'])]
            : [];

        // Wrap DB mutation + state-dependent lookup (code generation + save + lockSeats).
        // Bug #6 fix: tanpa wrap, error post-save = booking orphan tanpa rollback.
        // Section K1 integration: lockSeats('hard'/'soft') conditional $isPaid -
        //   isPaid=true (Diproses/Aktif): 'hard' (commitment immediate, refund butuh release)
        //   isPaid=false (Draft/Draft): 'soft' (analog Section J persistDraft)
        // Share pool Regular auto-enforced via UNIQUE uk_booking_seats_active_slot
        // (category='Paket' bukan filter di booking_seats query).
        $booking = DB::transaction(function () use (
            $v, $fareAmount, $totalAmount, $itemQty, $paymentMethod, $paymentStatus,
            $isPaid, $bankAccount, $notes, $requiresDocs, $seatLockService,
            $tripDate, $tripTime, $fromCity, $toCity, $armadaIndex, $selectedSeats
        ): Booking {
            $bookingCode = $this->generateUniquePackageCode('booking_code', 'PKT');

            $booking = new Booking();
            $booking->booking_code = $bookingCode;
            $booking->fill([
                'category'               => 'Paket',
                'from_city'              => $fromCity,
                'to_city'                => $toCity,
                // Sesi 46 PR #58b: cluster-aware route_via untuk Package form.
                // Source: validated input (D-PR58b-2). Kalau null, Booking saving
                // event auto-resolve dari from_city/to_city via BookingClusterService
                // (pattern Sesi 44A PR #1A). Cluster ambigu lokasi → admin pilih
                // explicit di form dropdown.
                'route_via'              => $v['route_via'] ?? null,
                // Sesi 47 Fix #2: driver_id + mobil_id dari form modal Package.
                'driver_id'              => $v['driver_id'] ?? null,
                'mobil_id'               => $v['mobil_id'] ?? null,
                'trip_date'              => $tripDate,
                'trip_time'              => $tripTime,
                'booking_for'            => trim((string) $v['package_size']),
                'passenger_name'         => trim((string) $v['sender_name']),
                'passenger_phone'        => trim((string) ($v['sender_phone'] ?? '')),
                'passenger_count'        => $itemQty,
                'pickup_location'        => trim((string) $v['sender_address']),
                'dropoff_location'       => trim((string) $v['recipient_address']),
                'selected_seats'         => $selectedSeats,
                'price_per_seat'         => $fareAmount,
                'total_amount'           => $totalAmount,
                'nominal_payment'        => $requiresDocs ? $totalAmount : null,
                'route_label'            => $fromCity . ' - ' . $toCity,
                'armada_index'           => $armadaIndex,
                'payment_method'         => $paymentMethod !== '' ? $paymentMethod : null,
                'payment_account_bank'   => $bankAccount['bank_name'] ?? null,
                'payment_account_name'   => $bankAccount['account_holder'] ?? null,
                'payment_account_number' => $bankAccount['account_number'] ?? null,
                'payment_status'         => $paymentStatus,
                'booking_status'         => $isPaid ? 'Diproses' : 'Draft',
                'ticket_status'          => $isPaid ? 'Aktif' : 'Draft',
                'paid_at'                => $isPaid ? now() : null,
                'invoice_number'         => $requiresDocs ? $this->generateUniquePackageCode('invoice_number', 'SBB') : null,
                'notes'                  => $notes,
            ]);
            $booking->save();

            // SeatLockService integration (Section K1 + bug #2 race condition fix).
            // 2-mode guard konsisten Section J: Besar+seat_code non-empty → 1 seat lock,
            // Kecil/Sedang atau Besar tanpa seat_code → skip (parcel di bagasi).
            if (! empty($selectedSeats)) {
                $slot = [
                    'trip_date'    => $tripDate,
                    'trip_time'    => $tripTime,
                    'from_city'    => $fromCity,
                    'to_city'      => $toCity,
                    'armada_index' => $armadaIndex,
                ];
                $seatLockService->lockSeats(
                    $booking,
                    [$slot],
                    $selectedSeats,
                    $isPaid ? 'hard' : 'soft',
                );
            }

            return $booking;
        });

        // Response build OUTSIDE wrap - booking already committed, pure compute
        return response()->json([
            'id'                   => $booking->getKey(),
            'booking_code'         => $booking->booking_code,
            'invoice_number'       => $booking->invoice_number ?? '-',
            'invoice_download_url' => '/dashboard/bookings/' . $booking->getKey() . '/surat-bukti',
        ], 201);
    }

    public function quickPackageUpdate(
        UpdateQuickPackageBookingRequest $request,
        string $booking,
        PackageBookingService $packageService,
        RegularBookingPaymentService $payments,
        SeatLockService $seatLockService,
    ): JsonResponse {
        $actor = $this->actor($request);
        $v = $request->validated();

        // Load + category guard - fail fast before any mutation
        $record = $this->findBooking($booking);
        if ($record->category !== 'Paket') {
            return response()->json([
                'message' => 'Endpoint ini hanya untuk booking Paket.',
            ], 422);
        }

        $expectedVersion = (int) $v['version'];

        // Pure compute OUTSIDE wrap - no DB mutation
        $fareAmount     = (int) $v['fare_amount'];
        $additionalFare = (int) ($v['additional_fare'] ?? 0);
        $itemQty        = (int) ($v['item_qty'] ?? 1);
        $totalAmount    = ($fareAmount + $additionalFare) * $itemQty;
        $paymentMethod  = (string) ($v['payment_method'] ?? '');
        $paymentStatus  = (string) $v['payment_status'];
        $paidStatuses   = ['Dibayar', 'Dibayar Tunai'];
        $isPaid         = in_array($paymentStatus, $paidStatuses, true);
        $requiresDocs   = $paymentMethod !== '' || $paymentStatus !== 'Belum Bayar';

        $bankAccount = $paymentMethod === 'transfer'
            ? $payments->bankAccountByCode($v['bank_account_code'] ?? null)
            : null;

        $notes = json_encode([
            'recipient_name'  => trim((string) ($v['recipient_name'] ?? '')),
            'recipient_phone' => trim((string) ($v['recipient_phone'] ?? '')),
            'item_name'       => trim((string) ($v['item_name'] ?? '')),
            'item_qty'        => $itemQty,
            'package_size'    => trim((string) ($v['package_size'] ?? '')),
        ], JSON_UNESCAPED_UNICODE);

        $tripDate    = (string) $v['trip_date'];
        $tripTime    = $this->normalizeTripTime((string) $v['trip_time']);
        $fromCity    = trim((string) $v['from_city']);
        $toCity      = trim((string) $v['to_city']);
        $armadaIndex = max(1, (int) ($v['armada_index'] ?? 1));

        $newSelectedSeats = (trim((string) ($v['package_size'] ?? '')) === 'Besar'
            && trim((string) ($v['seat_code'] ?? '')) !== '')
            ? [trim((string) $v['seat_code'])]
            : [];

        // Wrap DB mutation (adopts BookingManagementService::updateBooking pattern):
        //   1. Pre-check version (fail fast)
        //   2. Release old seat lock if slot/seat changed
        //   3. Persist via fill()+save()
        //   4. Acquire new seat lock if needed
        //   5. Atomic version bump (catches concurrent writer between pre-check and here)
        $updatedBooking = DB::transaction(function () use (
            $record, $v, $actor, $fareAmount, $totalAmount, $itemQty, $paymentMethod, $paymentStatus,
            $isPaid, $bankAccount, $notes, $requiresDocs, $seatLockService,
            $tripDate, $tripTime, $fromCity, $toCity, $armadaIndex,
            $newSelectedSeats, $expectedVersion
        ): Booking {
            // STEP 1: Optimistic lock gate (bug #30 pattern) - fail fast on stale read.
            if ($record->version !== $expectedVersion) {
                throw new BookingVersionConflictException($record->id, $expectedVersion);
            }

            // STEP 2: Compute slot/seat deltas for re-lock decision
            $oldSelectedSeats = (array) ($record->selected_seats ?? []);
            $oldSlotSignature = implode('|', [
                (string) $record->trip_date?->toDateString(),
                (string) $record->trip_time,
                (string) $record->from_city,
                (string) $record->to_city,
                (int) ($record->armada_index ?? 1),
            ]);
            $newSlotSignature = implode('|', [$tripDate, $tripTime, $fromCity, $toCity, $armadaIndex]);
            $slotChanged  = $oldSlotSignature !== $newSlotSignature;
            $seatsChanged = $oldSelectedSeats !== $newSelectedSeats;
            $needsReLock  = $slotChanged || $seatsChanged;

            // STEP 3: Release old seat lock if slot/seat changed
            if ($needsReLock && ! empty($oldSelectedSeats)) {
                $reason = sprintf(
                    'admin_update_package_%s_by_user_%s',
                    $record->booking_code,
                    $actor->id,
                );
                $seatLockService->releaseSeats($record, $actor, $reason);
            }

            // STEP 4: Persist update via fill()+save() (mirror quickPackageStore fill pattern)
            $record->fill([
                'from_city'              => $fromCity,
                'to_city'                => $toCity,
                // Sesi 46 PR #58b: cluster-aware route_via — symmetric quickPackageStore.
                'route_via'              => $v['route_via'] ?? null,
                // Sesi 47 Fix #2: driver_id + mobil_id update Package symmetric store.
                'driver_id'              => $v['driver_id'] ?? null,
                'mobil_id'               => $v['mobil_id'] ?? null,
                'trip_date'              => $tripDate,
                'trip_time'              => $tripTime,
                'booking_for'            => trim((string) $v['package_size']),
                'passenger_name'         => trim((string) $v['sender_name']),
                'passenger_phone'        => trim((string) ($v['sender_phone'] ?? '')),
                'passenger_count'        => $itemQty,
                'pickup_location'        => trim((string) $v['sender_address']),
                'dropoff_location'       => trim((string) $v['recipient_address']),
                'selected_seats'         => $newSelectedSeats,
                'price_per_seat'         => $fareAmount,
                'total_amount'           => $totalAmount,
                'nominal_payment'        => $requiresDocs ? $totalAmount : null,
                'route_label'            => $fromCity . ' - ' . $toCity,
                'armada_index'           => $armadaIndex,
                'payment_method'         => $paymentMethod !== '' ? $paymentMethod : null,
                'payment_account_bank'   => $bankAccount['bank_name'] ?? null,
                'payment_account_name'   => $bankAccount['account_holder'] ?? null,
                'payment_account_number' => $bankAccount['account_number'] ?? null,
                'payment_status'         => $paymentStatus,
                'booking_status'         => $isPaid ? 'Diproses' : 'Draft',
                'ticket_status'          => $isPaid ? 'Aktif' : 'Draft',
                'paid_at'                => $isPaid ? now() : ($record->paid_at ?? null),
                'notes'                  => $notes,
                'invoice_number'         => $record->invoice_number
                    ?: ($requiresDocs ? $this->generateUniquePackageCode('invoice_number', 'SBB') : null),
            ]);
            $record->save();

            // STEP 5: Acquire new seat lock if needed
            if ($needsReLock && ! empty($newSelectedSeats)) {
                $slot = [
                    'trip_date'    => $tripDate,
                    'trip_time'    => $tripTime,
                    'from_city'    => $fromCity,
                    'to_city'      => $toCity,
                    'armada_index' => $armadaIndex,
                ];
                $seatLockService->lockSeats(
                    $record,
                    [$slot],
                    $newSelectedSeats,
                    $isPaid ? 'hard' : 'soft',
                );
            }

            // STEP 6: Atomic version bump (bug #30 pattern - catch concurrent writer
            // that slipped in between pre-check and save).
            if (! $record->updateWithVersionCheck([], $expectedVersion)) {
                throw new BookingVersionConflictException($record->id, $expectedVersion);
            }

            return $record;
        });

        return response()->json([
            'id'                   => $updatedBooking->getKey(),
            'booking_code'         => $updatedBooking->booking_code,
            'invoice_number'       => $updatedBooking->invoice_number ?? '-',
            'invoice_download_url' => '/dashboard/bookings/' . $updatedBooking->getKey() . '/surat-bukti',
            'version'              => $updatedBooking->version,
        ]);
    }

    public function downloadPackageInvoiceById(
        Request $request,
        string $booking,
        PackageBookingService $packageService,
        RegularBookingPaymentService $payments,
    ): Response {
        $record = $this->findBooking($booking);

        $notes = [];
        if ($record->notes) {
            $decoded = json_decode($record->notes, true);
            if (is_array($decoded)) {
                $notes = $decoded;
            }
        }

        $transactionDate = $record->paid_at ?? $record->updated_at ?? $record->created_at;

        $invoiceState = [
            'booking_code'            => $record->booking_code,
            'invoice_number'          => $record->invoice_number ?: '-',
            'payment_reference'       => $record->payment_reference ?: '-',
            'payment_method'          => $payments->paymentMethodLabel($record->payment_method),
            'payment_status'          => (string) $record->payment_status,
            'booking_status'          => (string) $record->booking_status,
            'from_city'               => (string) $record->from_city,
            'to_city'                 => (string) $record->to_city,
            'route_label'             => (string) $record->route_label,
            'trip_date'               => $record->trip_date?->format('d M Y') ?? '-',
            'trip_time'               => $record->time ?? '-',
            'sender_name'             => (string) $record->passenger_name,
            'sender_phone'            => (string) $record->passenger_phone,
            'sender_address'          => (string) $record->pickup_location,
            'recipient_name'          => (string) ($notes['recipient_name'] ?? '-'),
            'recipient_phone'         => (string) ($notes['recipient_phone'] ?? '-'),
            'recipient_address'       => (string) $record->dropoff_location,
            'item_name'               => (string) ($notes['item_name'] ?? '-'),
            'item_qty'                => (int) ($notes['item_qty'] ?? $record->passenger_count ?? 1),
            'package_size'            => (string) ($notes['package_size'] ?? $record->booking_for ?? '-'),
            'package_size_label'      => $packageService->packageSizeLabel((string) ($notes['package_size'] ?? $record->booking_for ?? '')),
            'selected_seats_label'    => $packageService->selectedSeatLabels((array) ($record->selected_seats ?? [])),
            'fare_amount_formatted'   => $packageService->formatCurrency((int) ($record->price_per_seat ?? 0)),
            'total_amount_formatted'  => $packageService->formatCurrency((int) ($record->total_amount ?? 0)),
            'nominal_payment_formatted' => $packageService->formatCurrency((int) round((float) ($record->nominal_payment ?? 0))),
            'payment_account_label'   => $record->payment_account_bank && $record->payment_account_number
                ? $record->payment_account_bank . ' - ' . $record->payment_account_number
                : 'Tidak diperlukan',
            'transaction_date_label'  => $transactionDate?->format('d M Y H:i') ?? '-',
        ];

        $fileName = ($invoiceState['invoice_number'] !== '-' ? $invoiceState['invoice_number'] : $record->booking_code) . '.pdf';

        return Pdf::loadView('package-bookings.pdf.invoice', [
            'invoiceState' => $invoiceState,
        ])->setPaper('a4', 'landscape')->download($fileName);
    }

    private function generateUniquePackageCode(string $column, string $prefix): string
    {
        do {
            $code = $prefix . '-' . now()->format('ymd') . '-' . Str::upper(Str::random(4));
        } while (Booking::query()->where($column, $code)->exists());

        return $code;
    }

    public function destroy(Request $request, string $booking, BookingManagementService $service): JsonResponse
    {
        $actor = $this->actor($request);

        // Guard: version required via query string (bug #30 Q2 decision — ?version=N).
        $versionRaw = $request->query('version');
        if ($versionRaw === null || ! is_numeric($versionRaw)) {
            return response()->json([
                'error' => 'version_required',
                'message' => 'Parameter version wajib dikirim (query string).',
            ], 422);
        }
        $expectedVersion = (int) $versionRaw;

        $service->deleteBooking($this->findBooking($booking), $actor, $expectedVersion);

        return response()->json([
            'message' => 'Data pemesanan berhasil dihapus',
        ]);
    }

    protected function actor(Request $request): User
    {
        $user = $request->user();

        if (! $user instanceof User) {
            throw new HttpException(403, 'Akses ditolak');
        }

        return $user;
    }

    protected function findBooking(string $id): Booking
    {
        $booking = Booking::query()->find($id);

        if (! $booking) {
            throw new HttpException(404, 'Data pemesanan tidak ditemukan');
        }

        return $booking;
    }
}
