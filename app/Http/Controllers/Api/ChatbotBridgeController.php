<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Services\CustomerResolverService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ChatbotBridgeController extends Controller
{
    public function __construct(protected CustomerResolverService $resolver)
    {
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
}
