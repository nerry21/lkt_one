<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Services\Bridge\BridgeBookingApprovalService;
use App\Services\Bridge\BridgeBookingSubmissionService;
use App\Services\Bridge\BridgeETicketService;
use App\Services\Bridge\BridgePaymentVerificationService;
use App\Services\Bridge\BridgeReadService;
use App\Services\CustomerResolverService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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
        ]);

        try {
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
}
