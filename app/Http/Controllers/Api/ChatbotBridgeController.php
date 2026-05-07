<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Exceptions\SeatConflictException;
use App\Models\Trip;
use App\Services\Bridge\BridgeBookingApprovalService;
use App\Services\Bridge\BridgeBookingCancelService;
use App\Services\Bridge\BridgeBookingSubmissionService;
use App\Services\Bridge\BridgeETicketService;
use App\Services\Bridge\BridgePaymentVerificationService;
use App\Services\Bridge\BridgeReadService;
use App\Services\Bridge\BridgeTripActionService;
use App\Services\Bridge\TripRecapDataService;
use App\Services\CustomerResolverService;
use App\Services\DashboardMetricsAggregatorService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
use Illuminate\Validation\ValidationException;

class ChatbotBridgeController extends Controller
{
    public function __construct(
        protected CustomerResolverService $resolver,
        protected BridgeReadService $bridgeReader,
        protected BridgeBookingSubmissionService $submissionService,
        protected BridgeBookingApprovalService $approvalService,
        protected BridgePaymentVerificationService $paymentService,
        protected BridgeETicketService $eticketService,
        protected BridgeBookingCancelService $cancelService,
        protected BridgeTripActionService $tripActionService,
    ) {
    }

    public function health(): JsonResponse
    {
        return response()->json([
            'status' => 'ok',
            'service' => 'lkt-one',
            'version' => '1.0',
            'timestamp' => Carbon::now()->toIso8601String(),
        ]);
    }

    public function customerLookup(Request $request): JsonResponse
    {
        $data = $request->validate([
            'phone' => 'required|string|min:9|max:20',
        ]);

        $normalized = $this->resolver->normalizePhone($data['phone']);

        if ($normalized === null) {
            return response()->json([
                'error' => 'invalid_phone',
                'code' => 'PHONE_NORMALIZE_FAILED',
                'phone_provided' => $data['phone'],
            ], 422);
        }

        $customer = Customer::query()
            ->where('phone_normalized', $normalized)
            ->whereNull('merged_into_id')
            ->first();

        if ($customer === null) {
            return response()->json([
                'found' => false,
                'phone_normalized' => $normalized,
            ]);
        }

        return response()->json([
            'found' => true,
            'phone_normalized' => $normalized,
            'customer' => [
                'id' => $customer->id,
                'customer_code' => $customer->customer_code,
                'display_name' => $customer->display_name,
                'phone_normalized' => $customer->phone_normalized,
                'phone_original' => $customer->phone_original,
                'total_trip_count' => (int) $customer->total_trip_count,
                'discount_eligible' => (bool) $customer->discount_eligible,
                'status' => $customer->status,
            ],
        ]);
    }

    // -------------------------------------------------------------------------
    // Sesi 67 PR-CRM-6D — Read endpoints untuk Chatbot AI
    // -------------------------------------------------------------------------

    public function seatAvailability(Request $request): JsonResponse
    {
        $data = $request->validate([
            'trip_date' => 'required|date_format:Y-m-d',
            'direction' => 'required|in:PKB_TO_ROHUL,ROHUL_TO_PKB',
            'trip_time' => 'nullable|date_format:H:i',
        ]);

        $rows = $this->bridgeReader->getSeatAvailability(
            $data['trip_date'],
            $data['direction'],
            $data['trip_time'] ?? null,
        );

        Log::channel('chatbot-bridge')->info('seat-availability', [
            'trip_date' => $data['trip_date'],
            'direction' => $data['direction'],
            'trip_time' => $data['trip_time'] ?? null,
            'count' => count($rows),
        ]);

        return response()->json([
            'data' => $rows,
            'meta' => ['count' => count($rows)],
        ]);
    }

    public function fareLookup(Request $request): JsonResponse
    {
        $data = $request->validate([
            'from_city' => 'required|string|max:100',
            'to_city' => 'required|string|max:100',
            'category' => 'required|in:Reguler,Dropping,Rental,Paket',
        ]);

        try {
            $fare = $this->bridgeReader->getFare(
                $data['from_city'],
                $data['to_city'],
                $data['category'],
            );
        } catch (\InvalidArgumentException $e) {
            Log::channel('chatbot-bridge')->info('fare lookup miss', [
                'from_city' => $data['from_city'],
                'to_city' => $data['to_city'],
                'category' => $data['category'],
                'reason' => $e->getMessage(),
            ]);

            return response()->json([
                'error' => 'fare_not_found',
                'code' => 'FARE_LOOKUP_FAILED',
                'message' => $e->getMessage(),
            ], 422);
        }

        Log::channel('chatbot-bridge')->info('fare lookup hit', [
            'from_city' => $data['from_city'],
            'to_city' => $data['to_city'],
            'category' => $data['category'],
        ]);

        return response()->json(['data' => $fare]);
    }

    public function routeList(): JsonResponse
    {
        $routes = $this->bridgeReader->listActiveRoutes();

        Log::channel('chatbot-bridge')->info('route list', ['count' => count($routes)]);

        return response()->json(['data' => $routes]);
    }

    public function customerDetail(Request $request): JsonResponse
    {
        $data = $request->validate([
            'phone' => 'required|string|min:9|max:20',
        ]);

        $normalized = $this->resolver->normalizePhone($data['phone']);
        if ($normalized === null) {
            return response()->json([
                'error' => 'invalid_phone',
                'code' => 'PHONE_NORMALIZE_FAILED',
                'phone_provided' => $data['phone'],
            ], 422);
        }

        $detail = $this->bridgeReader->getCustomerDetail($normalized);

        Log::channel('chatbot-bridge')->info('customer detail', [
            'phone_normalized' => $normalized,
            'profile_found' => $detail['profile'] !== null,
            'recent_count' => count($detail['recent_bookings']),
        ]);

        return response()->json(['data' => $detail]);
    }

    public function departureList(Request $request): JsonResponse
    {
        $data = $request->validate([
            'trip_date' => 'required|date_format:Y-m-d',
            'direction' => 'required|in:PKB_TO_ROHUL,ROHUL_TO_PKB',
        ]);

        $rows = $this->bridgeReader->listDepartures($data['trip_date'], $data['direction']);

        Log::channel('chatbot-bridge')->info('departure list', [
            'trip_date' => $data['trip_date'],
            'direction' => $data['direction'],
            'count' => count($rows),
        ]);

        return response()->json([
            'data' => $rows,
            'meta' => [
                'trip_date' => $data['trip_date'],
                'direction' => $data['direction'],
                'count' => count($rows),
            ],
        ]);
    }

    // -------------------------------------------------------------------------
    // Sesi 68 PR-CRM-6E + Sesi 69 PR-CRM-6F — Submission endpoints untuk Chatbot AI
    // -------------------------------------------------------------------------

    /**
     * Submit booking Reguler dari Chatbot AI.
     *
     * POST /api/v1/chatbot-bridge/booking/reguler
     * (renamed Sesi 69 dari /booking/create — explicit per kategori)
     *
     * Booking masuk dengan status Draft + tag source=chatbot, butuh approve
     * admin (Sesi 70-71 handler).
     */
    public function bookingCreateReguler(Request $request): JsonResponse
    {
        $data = $request->validate([
            'customer_phone' => 'required|string|min:9|max:20',
            'customer_name' => 'required|string|min:2|max:100',
            'trip_date' => 'required|date_format:Y-m-d',
            'trip_time' => 'required|string',
            'direction' => 'required|in:to_pkb,from_pkb',
            'from_city' => 'required|string|max:100',
            'to_city' => 'required|string|max:100',
            'passenger_count' => 'required|integer|min:1|max:14',
            'selected_seats' => 'required|array|min:1|max:14',
            'selected_seats.*' => 'string|max:5',
            'pickup_location' => 'required|string|max:255',
            'dropoff_location' => 'required|string|max:255',
            'notes' => 'nullable|string|max:1000',
            'source_event_id' => 'nullable|string|max:64',
            'source_meta' => 'nullable|array',
            'passengers' => 'sometimes|array',
            'passengers.*.name' => 'required_with:passengers|string|max:100',
            'passengers.*.seat_no' => 'required_with:passengers|string|max:10',
            'passengers.*.phone' => 'nullable|string|max:30',
        ]);

        try {
            if (! empty($data['passengers'])) {
                $this->validateRegulerPassengersConsistency($data);
            }

            $booking = $this->submissionService->submitReguler($data);
            return $this->buildBookingResponse(
                $booking,
                'Booking Reguler berhasil dibuat dengan status Draft. Menunggu approval admin.',
            );
        } catch (ValidationException $e) {
            return response()->json(['error' => 'validation_failed', 'messages' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return $this->logAndReturn500($e, $data, 'Reguler');
        }
    }

    /**
     * Submit booking Dropping (full mobil dedicated, harga di-quote admin).
     *
     * POST /api/v1/chatbot-bridge/booking/dropping
     */
    public function bookingCreateDropping(Request $request): JsonResponse
    {
        $data = $request->validate([
            'customer_phone' => 'required|string|min:9|max:20',
            'customer_name' => 'required|string|min:2|max:100',
            'trip_date' => 'required|date_format:Y-m-d',
            'trip_time' => 'required|string',
            'direction' => 'required|in:to_pkb,from_pkb',
            'from_city' => 'required|string|max:100',
            'to_city' => 'required|string|max:100',
            'pickup_location' => 'required|string|max:255',
            'dropoff_location' => 'required|string|max:255',
            'notes' => 'nullable|string|max:1000',
            'source_event_id' => 'nullable|string|max:64',
            'source_meta' => 'nullable|array',
            'passengers' => 'sometimes|array',
            'passengers.*.name' => 'required_with:passengers|string|max:100',
            'passengers.*.seat_no' => 'required_with:passengers|string|max:10',
            'passengers.*.phone' => 'nullable|string|max:30',
        ]);

        try {
            $booking = $this->submissionService->submitDropping($data);
            return $this->buildBookingResponse(
                $booking,
                'Booking Dropping berhasil dibuat dengan status Draft. Admin akan quote harga + konfirmasi.',
            );
        } catch (ValidationException $e) {
            return response()->json(['error' => 'validation_failed', 'messages' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return $this->logAndReturn500($e, $data, 'Dropping');
        }
    }

    /**
     * Submit booking Rental (multi-day, harga di-quote admin).
     *
     * POST /api/v1/chatbot-bridge/booking/rental
     */
    public function bookingCreateRental(Request $request): JsonResponse
    {
        $data = $request->validate([
            'customer_phone' => 'required|string|min:9|max:20',
            'customer_name' => 'required|string|min:2|max:100',
            'trip_date' => 'required|date_format:Y-m-d',
            'rental_end_date' => 'required|date_format:Y-m-d|after:trip_date',
            'direction' => 'required|in:to_pkb,from_pkb',
            'from_city' => 'required|string|max:100',
            'to_city' => 'required|string|max:100',
            'pickup_location' => 'required|string|max:255',
            'dropoff_location' => 'required|string|max:255',
            'notes' => 'nullable|string|max:1000',
            'source_event_id' => 'nullable|string|max:64',
            'source_meta' => 'nullable|array',
            'passengers' => 'sometimes|array',
            'passengers.*.name' => 'required_with:passengers|string|max:100',
            'passengers.*.seat_no' => 'required_with:passengers|string|max:10',
            'passengers.*.phone' => 'nullable|string|max:30',
        ]);

        try {
            $booking = $this->submissionService->submitRental($data);
            return $this->buildBookingResponse(
                $booking,
                'Booking Rental berhasil dibuat dengan status Draft. Admin akan quote harga + konfirmasi.',
            );
        } catch (ValidationException $e) {
            return response()->json(['error' => 'validation_failed', 'messages' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return $this->logAndReturn500($e, $data, 'Rental');
        }
    }

    /**
     * Submit booking Paket (kirim barang, harga di-quote admin).
     *
     * POST /api/v1/chatbot-bridge/booking/paket
     */
    public function bookingCreatePaket(Request $request): JsonResponse
    {
        $data = $request->validate([
            'sender_name' => 'required|string|min:2|max:100',
            'sender_phone' => 'required|string|min:9|max:20',
            'receiver_name' => 'required|string|min:2|max:100',
            'receiver_phone' => 'required|string|min:9|max:20',
            'sender_address' => 'required|string|max:255',
            'receiver_address' => 'required|string|max:255',
            'package_size' => 'required|in:Kecil,Sedang,Besar',
            'item_description' => 'required|string|max:500',
            'item_qty' => 'nullable|integer|min:1|max:50',
            'electronics_flag' => 'nullable|boolean',
            'trip_date' => 'required|date_format:Y-m-d',
            'trip_time' => 'nullable|string',
            'direction' => 'required|in:to_pkb,from_pkb',
            'from_city' => 'required|string|max:100',
            'to_city' => 'required|string|max:100',
            'notes' => 'nullable|string|max:1000',
            'source_event_id' => 'nullable|string|max:64',
            'source_meta' => 'nullable|array',
            'passengers' => 'sometimes|array',
            'passengers.*.name' => 'required_with:passengers|string|max:100',
            'passengers.*.seat_no' => 'required_with:passengers|string|max:10',
            'passengers.*.phone' => 'nullable|string|max:30',
        ]);

        try {
            $booking = $this->submissionService->submitPaket($data);
            return $this->buildBookingResponse(
                $booking,
                'Booking Paket berhasil dibuat dengan status Draft. Admin akan quote harga + konfirmasi.',
            );
        } catch (ValidationException $e) {
            return response()->json(['error' => 'validation_failed', 'messages' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return $this->logAndReturn500($e, $data, 'Paket');
        }
    }

    // -------------------------------------------------------------------------
    // Sesi 70 PR-CRM-6G — Approve/Reject endpoints untuk Chatbot AI
    // -------------------------------------------------------------------------

    /**
     * Approve booking yang masih Draft.
     *
     * POST /api/v1/chatbot-bridge/booking/{code}/approve
     */
    public function bookingApprove(Request $request, string $code): JsonResponse
    {
        $data = $request->validate([
            'approver_identifier' => 'required|string|min:8|max:64',
            'total_amount' => 'nullable|numeric|min:0',
            'price_per_seat' => 'nullable|numeric|min:0',
            'payment_method' => 'nullable|string|in:transfer,cash',
            'notes' => 'nullable|string|max:1000',
        ]);

        try {
            $booking = $this->approvalService->approve($code, $data);
            return $this->buildUpdatedBookingResponse($booking, 'Booking berhasil di-approve.');
        } catch (ValidationException $e) {
            return response()->json(['error' => 'validation_failed', 'messages' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return $this->logAndReturn500($e, ['booking_code' => $code] + $data, 'Approve');
        }
    }

    /**
     * Reject booking yang masih Draft.
     *
     * POST /api/v1/chatbot-bridge/booking/{code}/reject
     */
    public function bookingReject(Request $request, string $code): JsonResponse
    {
        $data = $request->validate([
            'rejecter_identifier' => 'required|string|min:8|max:64',
            'reason' => 'required|string|min:3|max:1000',
        ]);

        try {
            $booking = $this->approvalService->reject($code, $data);
            return $this->buildUpdatedBookingResponse($booking, 'Booking berhasil di-reject.');
        } catch (ValidationException $e) {
            return response()->json(['error' => 'validation_failed', 'messages' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return $this->logAndReturn500($e, ['booking_code' => $code] + $data, 'Reject');
        }
    }

    // -------------------------------------------------------------------------
    // Sesi 71 PR-CRM-6H — Payment verification + e-tiket generation
    // -------------------------------------------------------------------------

    /**
     * Verify pembayaran transfer dari customer.
     *
     * POST /api/v1/chatbot-bridge/booking/{code}/verify-payment
     */
    public function verifyPayment(Request $request, string $code): JsonResponse
    {
        $data = $request->validate([
            'verifier_identifier' => 'required|string|min:8|max:64',
            'amount' => 'nullable|numeric|min:0',
            'reference' => 'nullable|string|max:255',
            'notes' => 'nullable|string|max:1000',
        ]);

        try {
            $booking = $this->paymentService->verifyTransfer($code, $data);
            return $this->buildUpdatedBookingResponse($booking, 'Pembayaran transfer berhasil di-verify.');
        } catch (ValidationException $e) {
            return response()->json(['error' => 'validation_failed', 'messages' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return $this->logAndReturn500($e, ['booking_code' => $code] + $data, 'VerifyPayment');
        }
    }

    /**
     * Confirm/deny cash payment dari admin (post-departure).
     *
     * POST /api/v1/chatbot-bridge/booking/{code}/confirm-cash
     */
    public function confirmCash(Request $request, string $code): JsonResponse
    {
        $data = $request->validate([
            'confirmer_identifier' => 'required|string|min:8|max:64',
            'paid' => 'required|boolean',
            'amount' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string|max:1000',
        ]);

        try {
            $booking = $this->paymentService->confirmCashPayment($code, $data);
            $message = $data['paid']
                ? 'Cash payment berhasil dikonfirmasi (PAID).'
                : 'Cash payment dilaporkan UNPAID, akan retry reminder.';
            return $this->buildUpdatedBookingResponse($booking, $message);
        } catch (ValidationException $e) {
            return response()->json(['error' => 'validation_failed', 'messages' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return $this->logAndReturn500($e, ['booking_code' => $code] + $data, 'ConfirmCash');
        }
    }

    /**
     * Generate e-tiket PDF + return signed URL untuk download.
     *
     * POST /api/v1/chatbot-bridge/booking/{code}/eticket/generate
     */
    public function eticketGenerate(Request $request, string $code): JsonResponse
    {
        try {
            $booking = \App\Models\Booking::query()
                ->where('booking_code', $code)
                ->first();

            if (! $booking) {
                return response()->json([
                    'error' => 'validation_failed',
                    'messages' => ['booking_code' => ["Booking dengan kode {$code} tidak ditemukan."]],
                ], 422);
            }

            $result = $this->eticketService->generate($booking);

            return response()->json([
                'success' => true,
                'data' => $result,
                'message' => 'E-tiket berhasil dibuat.',
            ], 200);
        } catch (ValidationException $e) {
            return response()->json(['error' => 'validation_failed', 'messages' => $e->errors()], 422);
        } catch (\Throwable $e) {
            return $this->logAndReturn500($e, ['booking_code' => $code], 'ETicketGenerate');
        }
    }

    // -------------------------------------------------------------------------
    // Sesi 73 PR-CRM-6J — Per-keberangkatan summary + Surat Jalan PDF
    // -------------------------------------------------------------------------

    /**
     * GET /api/v1/chatbot-bridge/departure-summary
     *
     * Aggregate confirmed booking untuk satu (trip_date, trip_time, from_city)
     * cluster — dipakai DepartureSummaryDispatcherService di Chatbot side.
     */
    public function departureSummary(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'trip_date' => ['required', 'date_format:Y-m-d'],
            'trip_time' => ['required', 'regex:/^\d{2}:\d{2}$/'],
            'from_city' => ['required', 'string', 'max:100'],
        ]);

        $bookings = \App\Models\Booking::query()
            ->where('trip_date', $validated['trip_date'])
            ->where('trip_time', 'like', $validated['trip_time'] . '%')
            ->where('from_city', $validated['from_city'])
            ->whereIn('booking_status', ['Diproses', 'Dibayar'])
            ->with(['mobil', 'driver'])
            ->orderBy('created_at')
            ->get();

        $first = $bookings->first();

        return response()->json([
            'data' => [
                'trip_date' => $validated['trip_date'],
                'trip_time' => $validated['trip_time'],
                'from_city' => $validated['from_city'],
                'to_city' => optional($first)->to_city,
                'mobil_kode' => optional(optional($first)->mobil)->kode_mobil,
                'driver_name' => optional($first)->driver_name,
                'passenger_count' => $bookings->count(),
                'total_revenue' => (int) $bookings->sum('total_amount'),
                'passengers' => $bookings->map(function ($b) {
                    return [
                        'booking_code' => $b->booking_code,
                        'passenger_name' => $b->passenger_name,
                        'passenger_phone' => $b->passenger_phone,
                        'seats' => $b->selected_seats,
                        'pickup_location' => $b->pickup_location,
                        'dropoff_location' => $b->dropoff_location,
                        'payment_method' => $b->payment_method,
                        'payment_status' => $b->payment_status,
                        'booking_status' => $b->booking_status,
                        'total_amount' => (int) $b->total_amount,
                    ];
                })->all(),
            ],
        ]);
    }

    /**
     * POST /api/v1/chatbot-bridge/surat-jalan/generate
     *
     * Body: { trip_date, trip_time, from_city }
     * Generate manifest PDF + return signed URL (24h TTL).
     */
    public function suratJalanGenerate(Request $request, \App\Services\SuratJalanPdfService $pdfService): JsonResponse
    {
        $validated = $request->validate([
            'trip_date' => ['required', 'date_format:Y-m-d'],
            'trip_time' => ['required', 'regex:/^\d{2}:\d{2}$/'],
            'from_city' => ['required', 'string', 'max:100'],
        ]);

        $tripTimeNormal = $validated['trip_time'] . ':00';

        try {
            $pdfService->generateAndStore(
                $validated['trip_date'],
                $tripTimeNormal,
                $validated['from_city'],
            );
        } catch (\Throwable $e) {
            Log::channel('chatbot-bridge')->error('Surat jalan generate failed', [
                'error' => $e->getMessage(),
                'payload' => $validated,
            ]);
            return response()->json(['error' => 'generate_failed', 'message' => $e->getMessage()], 500);
        }

        $citySlug = strtolower(str_replace(' ', '-', $validated['from_city']));
        $tripTimeSlug = str_replace(':', '-', $validated['trip_time']);

        $signedUrl = URL::temporarySignedRoute(
            'bridge.surat-jalan.download',
            now()->addHours(24),
            [
                'trip_date' => $validated['trip_date'],
                'trip_time' => $tripTimeSlug,
                'from_city_slug' => $citySlug,
            ],
        );

        return response()->json([
            'data' => [
                'trip_date' => $validated['trip_date'],
                'trip_time' => $validated['trip_time'],
                'from_city' => $validated['from_city'],
                'download_url' => $signedUrl,
                'expires_at' => now()->addHours(24)->toIso8601String(),
            ],
        ]);
    }

    // -------------------------------------------------------------------------
    // Sesi 74 PR-CRM-6K1 — Trip Planning Setup H-1 dari Chatbot
    // -------------------------------------------------------------------------

    /**
     * GET /api/v1/chatbot-bridge/active-mobil-list
     */
    public function activeMobilList(\App\Services\Bridge\BridgeTripPlanningService $tripPlanning): JsonResponse
    {
        return response()->json([
            'data' => $tripPlanning->getActiveMobilAndDriverList(),
        ]);
    }

    /**
     * POST /api/v1/chatbot-bridge/trip-planning/setup
     */
    public function tripPlanningSetup(
        Request $request,
        \App\Services\Bridge\BridgeTripPlanningService $tripPlanning,
    ): JsonResponse {
        $validated = $request->validate([
            'target_date' => ['required', 'date_format:Y-m-d'],
            'assignments' => ['required', 'array', 'min:1'],
            'assignments.*.mobil_id' => ['required', 'string'],
            'assignments.*.driver_id' => ['nullable', 'string'],
            'assignments.*.pool_override' => ['nullable', 'string', 'in:PKB,ROHUL'],
            'assignments.*.is_skipped' => ['nullable', 'boolean'],
        ]);

        $systemUserId = $this->resolveSystemUserId();

        try {
            $result = $tripPlanning->setup(
                $validated['target_date'],
                $validated['assignments'],
                $systemUserId,
            );

            return response()->json(['data' => $result]);
        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'error' => 'invalid_input',
                'message' => $e->getMessage(),
            ], 422);
        } catch (\Throwable $e) {
            Log::channel('chatbot-bridge')->error('Trip planning setup failed', [
                'error' => $e->getMessage(),
                'payload' => $validated,
            ]);
            return response()->json([
                'error' => 'setup_failed',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * GET /api/v1/chatbot-bridge/trip-planning/status?target_date=YYYY-MM-DD
     */
    public function tripPlanningStatus(
        Request $request,
        \App\Services\Bridge\BridgeTripPlanningService $tripPlanning,
    ): JsonResponse {
        $validated = $request->validate([
            'target_date' => ['required', 'date_format:Y-m-d'],
        ]);

        return response()->json([
            'data' => $tripPlanning->status($validated['target_date']),
        ]);
    }

    // -------------------------------------------------------------------------
    // Sesi 76 PR-CRM-6K3 — Cascade reschedule T+30min endpoints
    // -------------------------------------------------------------------------

    public function bookingCancel(Request $request, string $code): JsonResponse
    {
        $data = $request->validate([
            'cancellation_reason' => 'required|in:cancelled_by_admin,no_show_final',
            'source_event_id' => 'nullable|string|max:64',
            'source_meta' => 'nullable|array',
        ]);

        try {
            $booking = $this->cancelService->cancelBooking($code, $data['cancellation_reason']);
            return response()->json([
                'success' => true,
                'booking' => $this->bookingPayload($booking) + [
                    'cancellation_reason' => $booking->cancellation_reason,
                ],
                'message' => 'Booking berhasil dibatalkan.',
            ]);
        } catch (ValidationException $e) {
            throw $e;
        } catch (\Throwable $e) {
            return $this->logAndReturn500($e, $data, 'BookingCancel');
        }
    }

    public function bookingReschedule(Request $request, string $code): JsonResponse
    {
        $data = $request->validate([
            'new_trip_time' => 'required|string',
            'new_seat' => 'nullable|string|max:5',
            'source_event_id' => 'nullable|string|max:64',
            'source_meta' => 'nullable|array',
        ]);

        try {
            $result = $this->cancelService->rescheduleBooking(
                $code,
                $data['new_trip_time'],
                $data['new_seat'] ?? null,
            );

            return response()->json([
                'success' => true,
                'booking' => $this->bookingPayload($result['booking']),
                'old_trip_time' => $result['old_trip_time'],
                'new_trip_time' => $result['new_trip_time'],
            ]);
        } catch (SeatConflictException $e) {
            $first = $e->conflicts[0] ?? [];
            $tripDate = (string) ($first['date'] ?? '');
            $direction = (string) $request->input('source_meta.direction_trip', '');

            $availableSeats = [];
            if ($tripDate !== '' && $direction !== '') {
                $slots = $this->tripActionService->getAvailableSlotsToday($tripDate, $direction, 0);
                foreach ($slots as $slot) {
                    if ($slot['trip_time'] === ($first['time'] ?? null)) {
                        $availableSeats = $slot['available_seats'];
                        break;
                    }
                }
            }

            return response()->json([
                'error' => 'seat_conflict',
                'message' => $e->getMessage(),
                'conflicts' => $e->conflicts,
                'available_seats' => $availableSeats,
            ], 409);
        } catch (ValidationException $e) {
            throw $e;
        } catch (\Throwable $e) {
            return $this->logAndReturn500($e, $data, 'BookingReschedule');
        }
    }

    public function tripMarkTidakBerangkat(Request $request, int $tripId): JsonResponse
    {
        $data = $request->validate([
            'source_event_id' => 'nullable|string|max:64',
            'source_meta' => 'nullable|array',
        ]);

        try {
            $trip = $this->tripActionService->markTripTidakBerangkat($tripId);

            $affectedCount = \App\Models\Booking::query()
                ->where('trip_id', $tripId)
                ->whereIn('booking_status', BridgeBookingCancelService::CANCELLABLE_STATUSES)
                ->count();

            return response()->json([
                'success' => true,
                'trip_id' => $trip->id,
                'status' => $trip->status,
                'affected_bookings_count' => $affectedCount,
            ]);
        } catch (\App\Exceptions\TripInvalidTransitionException $e) {
            return response()->json([
                'error' => 'invalid_transition',
                'message' => $e->getMessage(),
            ], 422);
        } catch (\Throwable $e) {
            return $this->logAndReturn500($e, $data, 'TripTidakBerangkat');
        }
    }

    public function tripAvailableSlotsToday(Request $request, int $tripId): JsonResponse
    {
        try {
            $trip = Trip::query()->findOrFail($tripId);
            $slots = $this->tripActionService->getAvailableSlotsToday(
                optional($trip->trip_date)->toDateString() ?? (string) $trip->trip_date,
                (string) $trip->direction,
                $tripId,
            );

            return response()->json([
                'trip_date' => optional($trip->trip_date)->toDateString() ?? (string) $trip->trip_date,
                'direction' => $trip->direction,
                'available_slots' => $slots,
            ]);
        } catch (\Throwable $e) {
            return $this->logAndReturn500($e, [], 'AvailableSlotsToday');
        }
    }

    // -------------------------------------------------------------------------
    // Sesi 77 PR-CRM-6K4 — Post-Recap T+1 jam + Dashboard trend 7 hari
    // -------------------------------------------------------------------------

    /**
     * GET /api/v1/chatbot-bridge/trip-recap-data?trip_id=X
     *
     * Ringkasan singkat untuk header WA. Return juga `cluster` (ROHUL/PKB) —
     * Chatbot side resolve cluster → phone numbers via env JET_ADMIN_PHONES +
     * JET_APPROVER_PHONES.
     */
    public function tripRecapData(Request $request, TripRecapDataService $service): JsonResponse
    {
        $request->validate(['trip_id' => 'required|integer']);

        try {
            return response()->json([
                'data' => $service->getRecapData((int) $request->query('trip_id')),
            ]);
        } catch (\RuntimeException $e) {
            return response()->json([
                'error' => 'trip_not_found',
                'message' => $e->getMessage(),
            ], 404);
        } catch (\Throwable $e) {
            return $this->logAndReturn500($e, ['trip_id' => $request->query('trip_id')], 'TripRecapData');
        }
    }

    /**
     * GET /api/v1/chatbot-bridge/trip-recap-detail?trip_id=X
     *
     * Detail lengkap (passengers + cancellations + cash/transfer breakdown)
     * untuk balasan "DETAIL" di Chatbot.
     */
    public function tripRecapDetail(Request $request, TripRecapDataService $service): JsonResponse
    {
        $request->validate(['trip_id' => 'required|integer']);

        try {
            return response()->json([
                'data' => $service->getDetailData((int) $request->query('trip_id')),
            ]);
        } catch (\RuntimeException $e) {
            return response()->json([
                'error' => 'trip_not_found',
                'message' => $e->getMessage(),
            ], 404);
        } catch (\Throwable $e) {
            return $this->logAndReturn500($e, ['trip_id' => $request->query('trip_id')], 'TripRecapDetail');
        }
    }

    /**
     * GET /api/v1/chatbot-bridge/dashboard-trend-7d
     *
     * Cache aggregation 7 hari untuk grafik dashboard. Pakai data dari
     * dashboard_daily_metrics; kalau belum ada untuk tanggal tertentu, isi 0.
     */
    public function dashboardTrend7d(DashboardMetricsAggregatorService $service): JsonResponse
    {
        return response()->json([
            'data' => $service->getTrend7Days(),
        ]);
    }

    /**
     * Resolve system user ID untuk audit trail Chatbot operations.
     * Pakai Super Admin pertama yang aktif. Reality finding: User role enum
     * value = 'Super Admin' (with space, capital), bukan 'super_admin'.
     */
    private function resolveSystemUserId(): string
    {
        $user = \App\Models\User::query()
            ->where('role', 'Super Admin')
            ->orderBy('created_at')
            ->first();

        if (! $user) {
            $user = \App\Models\User::query()->orderBy('created_at')->first();
        }

        if (! $user) {
            throw new \RuntimeException('No user found for system audit trail');
        }

        return (string) $user->id;
    }

    private function buildBookingResponse(\App\Models\Booking $booking, string $message): JsonResponse
    {
        return response()->json([
            'success' => true,
            'booking' => $this->bookingPayload($booking),
            'customer' => [
                'id' => $booking->customer?->id,
                'display_name' => $booking->customer?->display_name,
                'phone_normalized' => $booking->customer?->phone_normalized,
            ],
            'message' => $message,
        ], 201);
    }

    /**
     * Sesi 70 — response untuk update (approve/reject). 200 OK, wrapper 'data'
     * supaya konsisten dengan gaya read endpoint dan beda dengan create (201/'booking').
     */
    private function buildUpdatedBookingResponse(\App\Models\Booking $booking, string $message): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $this->bookingPayload($booking) + [
                'validated_at' => $booking->validated_at?->toIso8601String(),
                'validated_by' => $booking->validated_by,
                'validation_notes' => $booking->validation_notes,
            ],
            'customer' => [
                'id' => $booking->customer?->id,
                'display_name' => $booking->customer?->display_name,
                'phone_normalized' => $booking->customer?->phone_normalized,
            ],
            'message' => $message,
        ], 200);
    }

    private function bookingPayload(\App\Models\Booking $booking): array
    {
        return [
            'id' => $booking->id,
            'booking_code' => $booking->booking_code,
            'category' => $booking->category,
            'trip_date' => $booking->trip_date?->format('Y-m-d'),
            'trip_time' => $booking->trip_time,
            'rental_end_date' => $booking->rental_end_date?->format('Y-m-d'),
            'from_city' => $booking->from_city,
            'to_city' => $booking->to_city,
            'passenger_count' => (int) $booking->passenger_count,
            'selected_seats' => $booking->selected_seats,
            'price_per_seat' => (int) $booking->price_per_seat,
            'total_amount' => (int) $booking->total_amount,
            'pickup_location' => $booking->pickup_location,
            'dropoff_location' => $booking->dropoff_location,
            'booking_status' => $booking->booking_status,
            'payment_status' => $booking->payment_status,
            'payment_method' => $booking->payment_method,
            'source' => $booking->source?->source,
            'created_at' => $booking->created_at?->toIso8601String(),
        ];
    }

    /**
     * Sesi 97 PR-BUG-B-A — Cross-validation strict untuk Reguler passengers[]:
     *   1. Count match passenger_count
     *   2. Setiap seat_no harus exist di selected_seats[]
     *   3. Distinct seat_no antar passengers
     *
     * Reguler-only (Dropping/Rental/Paket: skip — loose, future-proof).
     */
    protected function validateRegulerPassengersConsistency(array $data): void
    {
        $passengers = $data['passengers'];
        $passengerCount = (int) $data['passenger_count'];
        $selectedSeats = (array) $data['selected_seats'];

        if (count($passengers) !== $passengerCount) {
            throw ValidationException::withMessages([
                'passengers' => [
                    'Jumlah passengers (' . count($passengers) . ') harus sama dengan passenger_count (' . $passengerCount . ').',
                ],
            ]);
        }

        $passengerSeats = array_column($passengers, 'seat_no');

        if (count($passengerSeats) !== count(array_unique($passengerSeats))) {
            throw ValidationException::withMessages([
                'passengers' => ['Setiap passenger harus punya seat_no yang unik (no duplicate).'],
            ]);
        }

        $diff = array_diff($passengerSeats, $selectedSeats);
        if (! empty($diff)) {
            throw ValidationException::withMessages([
                'passengers' => [
                    'seat_no passenger harus subset selected_seats. Tidak valid: ' . implode(', ', $diff),
                ],
            ]);
        }
    }

    private function logAndReturn500(\Throwable $e, array $payload, string $category): JsonResponse
    {
        Log::channel('chatbot-bridge')->error("[BookingSubmission] {$category} failed", [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
            'payload' => $payload,
        ]);
        return response()->json([
            'error' => 'submission_failed',
            'message' => "Gagal membuat booking {$category}. Silakan coba lagi atau hubungi admin.",
        ], 500);
    }

    // =========================================================================
    // Sesi 78 PR-CRM-6L — Bot control (kill switch + whitelist) endpoints
    // -------------------------------------------------------------------------
    // Dipanggil oleh:
    //   - Chatbot AI worker (poll /bot-status-poll setiap 30 detik)
    //   - Dashboard LKT (set mode via tombol)
    // =========================================================================

    /**
     * GET /api/v1/chatbot-bridge/bot-status-poll
     */
    public function botStatusPoll(\App\Services\BotControl\BotControlService $service): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $service->snapshot(),
        ]);
    }

    /**
     * POST /api/v1/chatbot-bridge/bot-status-set
     */
    public function botStatusSet(
        Request $request,
        \App\Services\BotControl\BotControlService $service,
    ): JsonResponse {
        $validated = $request->validate([
            'mode' => 'required|string|in:off,whitelist,live_public',
            'updated_by_phone' => 'nullable|string|max:32',
        ]);

        $service->setMode($validated['mode'], $validated['updated_by_phone'] ?? null);

        return response()->json([
            'success' => true,
            'data' => $service->snapshot(),
        ]);
    }

    /**
     * POST /api/v1/chatbot-bridge/bot-whitelist-set
     */
    public function botWhitelistSet(
        Request $request,
        \App\Services\BotControl\BotControlService $service,
    ): JsonResponse {
        $validated = $request->validate([
            'phones' => 'required|array',
            'phones.*' => 'string|max:32',
            'updated_by_phone' => 'nullable|string|max:32',
        ]);

        $service->setWhitelist($validated['phones'], $validated['updated_by_phone'] ?? null);

        return response()->json([
            'success' => true,
            'data' => $service->snapshot(),
        ]);
    }

    /**
     * GET /api/v1/chatbot-bridge/backfill-walkin-preview
     *
     * Daftar booking yang punya source_meta.origin = 'passenger_inquiry_t1jam'
     * tapi created_at > scheduled_departure (terbukti walk-in retroaktif).
     *
     * CATATAN: Endpoint return empty array sampai Bagian B (Chatbot AI) live
     * dan customer booking via T-1jam inquiry mulai populate
     * source_meta.origin field. Tidak ada breaking change, behavior empty
     * adalah expected.
     */
    public function backfillWalkinPreview(): JsonResponse
    {
        $candidates = DB::table('booking_sources')
            ->join('bookings', 'bookings.id', '=', 'booking_sources.booking_id')
            ->whereRaw("JSON_EXTRACT(booking_sources.source_meta, '$.origin') = 'passenger_inquiry_t1jam'")
            ->where(function ($q) {
                $q->whereRaw("JSON_EXTRACT(booking_sources.source_meta, '$.walk_in') IS NULL")
                    ->orWhereRaw("JSON_EXTRACT(booking_sources.source_meta, '$.walk_in') = false");
            })
            ->whereRaw("TIMESTAMPDIFF(MINUTE, CONCAT(bookings.trip_date, ' ', bookings.trip_time), bookings.created_at) > 0")
            ->select(
                'bookings.booking_code',
                'bookings.trip_date',
                'bookings.trip_time',
                'bookings.created_at',
                DB::raw("TIMESTAMPDIFF(MINUTE, CONCAT(bookings.trip_date, ' ', bookings.trip_time), bookings.created_at) AS minutes_after_departure")
            )
            ->orderByDesc('bookings.created_at')
            ->limit(200)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'candidates' => $candidates,
                'total' => $candidates->count(),
            ],
        ]);
    }

    /**
     * POST /api/v1/chatbot-bridge/backfill-walkin-execute
     *
     * Set source_meta.walk_in=true untuk booking yang match kriteria preview.
     *
     * CATATAN: Endpoint return updated_count=0 sampai Bagian B (Chatbot AI) live
     * dan customer booking via T-1jam inquiry mulai populate
     * source_meta.origin field. Tidak ada breaking change, behavior empty
     * adalah expected.
     */
    public function backfillWalkinExecute(): JsonResponse
    {
        $rows = DB::table('booking_sources')
            ->join('bookings', 'bookings.id', '=', 'booking_sources.booking_id')
            ->whereRaw("JSON_EXTRACT(booking_sources.source_meta, '$.origin') = 'passenger_inquiry_t1jam'")
            ->where(function ($q) {
                $q->whereRaw("JSON_EXTRACT(booking_sources.source_meta, '$.walk_in') IS NULL")
                    ->orWhereRaw("JSON_EXTRACT(booking_sources.source_meta, '$.walk_in') = false");
            })
            ->whereRaw("TIMESTAMPDIFF(MINUTE, CONCAT(bookings.trip_date, ' ', bookings.trip_time), bookings.created_at) > 0")
            ->select('booking_sources.id', 'booking_sources.source_meta')
            ->get();

        $updated = 0;
        foreach ($rows as $row) {
            $meta = json_decode((string) $row->source_meta, true) ?? [];
            $meta['walk_in'] = true;
            $meta['backfilled_at'] = now()->toIso8601String();

            DB::table('booking_sources')
                ->where('id', $row->id)
                ->update(['source_meta' => json_encode($meta), 'updated_at' => now()]);
            $updated++;
        }

        Log::channel('chatbot-bridge')->info('[BackfillWalkin] executed', ['updated_count' => $updated]);

        return response()->json([
            'success' => true,
            'data' => ['updated_count' => $updated],
        ]);
    }
}
