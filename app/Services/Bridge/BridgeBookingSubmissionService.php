<?php

namespace App\Services\Bridge;

use App\Models\Booking;
use App\Models\BookingSource;
use App\Models\Customer;
use App\Services\CustomerResolverService;
use App\Services\RegularBookingService;
use App\Traits\GeneratesUniqueBookingCodes;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

/**
 * Sesi 68 PR-CRM-6E — Service untuk handle submission booking Reguler dari Chatbot AI.
 *
 * Decoupled dari RegularBookingPersistenceService yang tightly coupled ke Session
 * web admin. Service ini designed untuk consume dari API context (no session, no
 * draft, no auth user — auth via X-Chatbot-Bridge-Key middleware).
 *
 * Flow:
 *   1. Validate payload (8-field flow customer)
 *   2. Resolve/create Customer (firstOrCreate by phone_normalized)
 *   3. Validate seat availability (re-check after Q2 hybrid pattern)
 *   4. Validate fare (Reguler-only via RegularBookingService::resolveFare)
 *   5. Create Booking with booking_status='Draft', payment_status='Belum Bayar'
 *   6. Create BookingSource with source='chatbot' + event_uuid
 *   7. Return booking with relationships loaded
 */
class BridgeBookingSubmissionService
{
    use GeneratesUniqueBookingCodes;

    public function __construct(
        protected CustomerResolverService $customerResolver,
        protected RegularBookingService $regularBookingService,
        protected BridgeReadService $bridgeReader,
    ) {
    }

    /**
     * @param array{
     *   customer_phone: string,
     *   customer_name: string,
     *   trip_date: string,
     *   trip_time: string,
     *   direction: string,
     *   from_city: string,
     *   to_city: string,
     *   passenger_count: int,
     *   selected_seats: array<string>,
     *   pickup_location: string,
     *   dropoff_location: string,
     *   notes?: string|null,
     *   source_event_id?: string|null,
     *   source_meta?: array|null,
     * } $payload
     */
    public function submit(array $payload): Booking
    {
        $this->validateBusinessRules($payload);

        return DB::transaction(function () use ($payload) {
            $customer = $this->resolveOrCreateCustomer(
                phone: $payload['customer_phone'],
                name: $payload['customer_name'],
            );

            $this->revalidateSeatAvailability($payload);

            $fare = $this->regularBookingService->resolveFare(
                $payload['from_city'],
                $payload['to_city']
            );
            if ($fare === null) {
                throw ValidationException::withMessages([
                    'route' => ["Fare matrix tidak ditemukan untuk rute {$payload['from_city']} → {$payload['to_city']}. Hanya kategori Reguler yang dapat di-quote otomatis."],
                ]);
            }

            $passengerCount = (int) $payload['passenger_count'];
            $seats = $payload['selected_seats'];
            $totalAmount = $fare * $passengerCount;

            $booking = new Booking();
            $booking->booking_code = $this->generateUniqueBookingCode(Booking::class, 'booking_code', 'RBK', 4);
            $booking->customer_id = $customer->id;
            $booking->category = 'Reguler';
            $booking->from_city = $payload['from_city'];
            $booking->to_city = $payload['to_city'];
            $booking->direction = $payload['direction'];
            $booking->trip_date = $payload['trip_date'];
            $booking->trip_time = $payload['trip_time'];
            $booking->booking_for = 'self';
            $booking->passenger_name = $payload['customer_name'];
            $booking->passenger_phone = $payload['customer_phone'];
            $booking->passenger_count = $passengerCount;
            $booking->pickup_location = $payload['pickup_location'];
            $booking->dropoff_location = $payload['dropoff_location'];
            $booking->selected_seats = $seats;
            $booking->price_per_seat = $fare;
            $booking->total_amount = $totalAmount;
            $booking->payment_status = 'Belum Bayar';
            $booking->booking_status = 'Draft';
            $booking->notes = $payload['notes'] ?? null;
            $booking->save();

            BookingSource::create([
                'booking_id' => $booking->id,
                'source' => BookingSource::SOURCE_CHATBOT,
                'source_event_id' => $payload['source_event_id'] ?? null,
                'source_channel' => 'whatsapp',
                'source_meta' => $payload['source_meta'] ?? null,
            ]);

            Log::channel('chatbot-bridge')->info('[BookingSubmission] booking created from chatbot', [
                'booking_id' => $booking->id,
                'booking_code' => $booking->booking_code,
                'customer_id' => $customer->id,
                'phone' => $payload['customer_phone'],
                'event_id' => $payload['source_event_id'] ?? null,
            ]);

            return $booking->fresh(['source', 'customer']);
        });
    }

    private function validateBusinessRules(array $payload): void
    {
        $required = [
            'customer_phone', 'customer_name',
            'trip_date', 'trip_time', 'direction',
            'from_city', 'to_city', 'passenger_count',
            'selected_seats', 'pickup_location', 'dropoff_location',
        ];
        foreach ($required as $field) {
            if (! array_key_exists($field, $payload) || $payload[$field] === null || $payload[$field] === '') {
                throw ValidationException::withMessages([
                    $field => ["{$field} wajib diisi."],
                ]);
            }
        }

        if (count($payload['selected_seats']) !== (int) $payload['passenger_count']) {
            throw ValidationException::withMessages([
                'selected_seats' => ['Jumlah seat dipilih harus sama dengan passenger_count.'],
            ]);
        }

        if (! in_array($payload['direction'], ['to_pkb', 'from_pkb'], true)) {
            throw ValidationException::withMessages([
                'direction' => ['direction harus to_pkb atau from_pkb.'],
            ]);
        }

        try {
            $tripDate = Carbon::parse($payload['trip_date'])->startOfDay();
        } catch (\Throwable $e) {
            throw ValidationException::withMessages([
                'trip_date' => ['Format trip_date tidak valid (gunakan YYYY-MM-DD).'],
            ]);
        }
        if ($tripDate->isBefore(Carbon::today())) {
            throw ValidationException::withMessages([
                'trip_date' => ['trip_date tidak boleh di masa lalu.'],
            ]);
        }
    }

    private function resolveOrCreateCustomer(string $phone, string $name): Customer
    {
        $normalized = $this->customerResolver->normalizePhone($phone);
        if ($normalized === null) {
            throw ValidationException::withMessages([
                'customer_phone' => ['Format nomor HP tidak valid.'],
            ]);
        }

        $customer = Customer::query()
            ->where('phone_normalized', $normalized)
            ->whereNull('merged_into_id')
            ->first();

        if ($customer === null) {
            $customer = Customer::create([
                'display_name' => $name,
                'phone_normalized' => $normalized,
                'phone_original' => $phone,
                'status' => 'active',
            ]);
        }

        return $customer;
    }

    private function revalidateSeatAvailability(array $payload): void
    {
        $tripDirection = $payload['direction'] === 'to_pkb' ? 'ROHUL_TO_PKB' : 'PKB_TO_ROHUL';

        $availability = $this->bridgeReader->getSeatAvailability(
            tripDate: $payload['trip_date'],
            direction: $tripDirection,
            tripTime: $payload['trip_time'],
        );

        $occupiedAtTime = [];
        foreach ($availability as $entry) {
            if (($entry['trip_time'] ?? null) === $payload['trip_time']) {
                $occupiedAtTime = $entry['occupied_seats'] ?? [];
                break;
            }
        }

        $conflict = array_intersect($payload['selected_seats'], $occupiedAtTime);
        if (! empty($conflict)) {
            throw ValidationException::withMessages([
                'selected_seats' => [
                    'Seat berikut sudah dibooking customer lain: ' . implode(', ', $conflict)
                    . '. Mohon pilih seat lain.',
                ],
            ]);
        }
    }
}
