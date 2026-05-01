<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Services\Bridge\BridgeReadService;
use App\Services\CustomerResolverService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class ChatbotBridgeController extends Controller
{
    public function __construct(
        protected CustomerResolverService $resolver,
        protected BridgeReadService $bridgeReader,
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
}
