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
 * Sesi 68 PR-CRM-6E + Sesi 69 PR-CRM-6F — Service untuk handle submission booking
 * dari Chatbot AI (4 kategori: Reguler, Dropping, Rental, Paket).
 *
 * Decoupled dari web session services. Designed untuk consume dari API context
 * (no session, no draft, no auth user — auth via X-Chatbot-Bridge-Key middleware).
 *
 * Strategy pattern — 4 public method, 1 per kategori. Tiap method handle field
 * requirement spesifik kategori-nya.
 *
 * Q-Strategis (3 non-Reguler): Submit-First placeholder. Booking masuk dengan
 *   total_amount=0, price_per_seat=0. Admin quote+approve di Sesi 70-71 handler.
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

    // ─── REGULER ──────────────────────────────────────────────────────────

    /**
     * Sesi 68 PR-CRM-6E (renamed from submit() in Sesi 69).
     *
     * Reguler punya fare matrix → can auto-quote total_amount.
     * Re-validates seat availability sebelum insert (Q2 hybrid pattern).
     */
    public function submitReguler(array $payload): Booking
    {
        $this->validateBaseFields($payload);
        $this->validateDirectionAndDate($payload);
        $this->validateRegulerSpecificFields($payload);

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

            $this->createPassengersFromPayload(
                $booking,
                $payload['passengers'] ?? [],
                $payload['customer_phone'],
            );

            $this->createBookingSource($booking->id, $payload, 'whatsapp');

            $this->logSubmission('Reguler', $booking, $customer, $payload);

            return $booking->fresh(['source', 'customer']);
        });
    }

    // ─── DROPPING ─────────────────────────────────────────────────────────

    /**
     * Sesi 69 PR-CRM-6F — Submit booking Dropping (full mobil dedicated).
     *
     * Field requirements:
     *   - passenger_count: auto-set 6 (semua kursi)
     *   - selected_seats: auto-set ['1A','2A','2B','3A','4A','5A']
     *   - price_per_seat: 0 (placeholder, admin quote)
     *   - total_amount: 0 (placeholder, admin quote)
     *   - dropoff_location: WAJIB (alamat tujuan lengkap)
     *   - pickup_location: WAJIB
     */
    public function submitDropping(array $payload): Booking
    {
        $this->validateBaseFields($payload);
        $this->validateDirectionAndDate($payload);

        return DB::transaction(function () use ($payload) {
            $customer = $this->resolveOrCreateCustomer(
                phone: $payload['customer_phone'],
                name: $payload['customer_name'],
            );

            $booking = new Booking();
            $booking->booking_code = $this->generateUniqueBookingCode(Booking::class, 'booking_code', 'DBK', 4);
            $booking->customer_id = $customer->id;
            $booking->category = 'Dropping';
            $booking->from_city = $payload['from_city'];
            $booking->to_city = $payload['to_city'];
            $booking->direction = $payload['direction'];
            $booking->trip_date = $payload['trip_date'];
            $booking->trip_time = $payload['trip_time'];
            $booking->booking_for = 'self';
            $booking->passenger_name = $payload['customer_name'];
            $booking->passenger_phone = $payload['customer_phone'];
            $booking->passenger_count = 6;
            $booking->pickup_location = $payload['pickup_location'];
            $booking->dropoff_location = $payload['dropoff_location'];
            $booking->selected_seats = ['1A', '2A', '2B', '3A', '4A', '5A'];
            $booking->price_per_seat = 0;
            $booking->total_amount = 0;
            $booking->payment_status = 'Belum Bayar';
            $booking->booking_status = 'Draft';
            $booking->notes = $payload['notes'] ?? null;
            $booking->save();

            $this->createPassengersFromPayload(
                $booking,
                $payload['passengers'] ?? [],
                $payload['customer_phone'],
            );

            $this->createBookingSource($booking->id, $payload, 'whatsapp');

            $this->logSubmission('Dropping', $booking, $customer, $payload);

            return $booking->fresh(['source', 'customer']);
        });
    }

    // ─── RENTAL ───────────────────────────────────────────────────────────

    /**
     * Sesi 69 PR-CRM-6F — Submit booking Rental (multi-day).
     *
     * Field requirements:
     *   - rental_end_date: WAJIB, harus setelah trip_date
     *   - passenger_count: auto-set 6 (full mobil)
     *   - trip_time: auto-set '00:00:00' (Rental tidak punya jam keberangkatan strict)
     *   - selected_seats: auto-set ['1A','2A','2B','3A','4A','5A']
     *   - price_per_seat: 0, total_amount: 0 (placeholder)
     *   - rental_pool_target/keberangkatan/kepulangan: null (admin set saat approve)
     */
    public function submitRental(array $payload): Booking
    {
        $this->validateBaseFields($payload);
        $this->validateDirectionAndDate($payload);
        $this->validateRentalEndDate($payload);

        return DB::transaction(function () use ($payload) {
            $customer = $this->resolveOrCreateCustomer(
                phone: $payload['customer_phone'],
                name: $payload['customer_name'],
            );

            $booking = new Booking();
            $booking->booking_code = $this->generateUniqueBookingCode(Booking::class, 'booking_code', 'RNT', 4);
            $booking->customer_id = $customer->id;
            $booking->category = 'Rental';
            $booking->from_city = $payload['from_city'];
            $booking->to_city = $payload['to_city'];
            $booking->direction = $payload['direction'];
            $booking->trip_date = $payload['trip_date'];
            $booking->rental_end_date = $payload['rental_end_date'];
            $booking->trip_time = '00:00:00';
            $booking->booking_for = 'self';
            $booking->passenger_name = $payload['customer_name'];
            $booking->passenger_phone = $payload['customer_phone'];
            $booking->passenger_count = 6;
            $booking->pickup_location = $payload['pickup_location'];
            $booking->dropoff_location = $payload['dropoff_location'];
            $booking->selected_seats = ['1A', '2A', '2B', '3A', '4A', '5A'];
            $booking->price_per_seat = 0;
            $booking->total_amount = 0;
            $booking->payment_status = 'Belum Bayar';
            $booking->booking_status = 'Draft';
            $booking->notes = $payload['notes'] ?? null;
            $booking->save();

            $this->createPassengersFromPayload(
                $booking,
                $payload['passengers'] ?? [],
                $payload['customer_phone'],
            );

            $this->createBookingSource($booking->id, $payload, 'whatsapp');

            $this->logSubmission('Rental', $booking, $customer, $payload);

            return $booking->fresh(['source', 'customer']);
        });
    }

    // ─── PAKET ────────────────────────────────────────────────────────────

    /**
     * Sesi 69 PR-CRM-6F — Submit booking Paket (kirim barang).
     *
     * Field requirements:
     *   - sender_name/sender_phone: pemesan (passenger_name/phone di Booking)
     *   - receiver_name/receiver_phone: penerima (di JSON notes)
     *   - sender_address/receiver_address: alamat asal/tujuan
     *   - package_size: WAJIB Kecil/Sedang/Besar (booking_for di Booking)
     *   - item_description: deskripsi barang (di JSON notes)
     *   - item_qty: opsional default 1 (passenger_count di Booking)
     *   - electronics_flag: opsional (di JSON notes)
     *   - selected_seats: ['5A'] untuk Besar, [] untuk Kecil/Sedang
     *   - price_per_seat: 0, total_amount: 0 (placeholder)
     */
    public function submitPaket(array $payload): Booking
    {
        $this->validatePaketFields($payload);
        $this->validateDirectionAndDate($payload);

        return DB::transaction(function () use ($payload) {
            $customer = $this->resolveOrCreateCustomer(
                phone: $payload['sender_phone'],
                name: $payload['sender_name'],
            );

            $packageSize = $payload['package_size'];
            $itemQty = max(1, (int) ($payload['item_qty'] ?? 1));

            $selectedSeats = ($packageSize === 'Besar') ? ['5A'] : [];

            $notesPayload = json_encode([
                'recipient_name' => $payload['receiver_name'],
                'recipient_phone' => $payload['receiver_phone'],
                'item_name' => $payload['item_description'] ?? 'Paket umum',
                'item_qty' => $itemQty,
                'package_size' => $packageSize,
                'electronics_flag' => (bool) ($payload['electronics_flag'] ?? false),
                'customer_notes' => $payload['notes'] ?? null,
            ], JSON_UNESCAPED_UNICODE);

            $booking = new Booking();
            $booking->booking_code = $this->generateUniqueBookingCode(Booking::class, 'booking_code', 'PKT', 4);
            $booking->customer_id = $customer->id;
            $booking->category = 'Paket';
            $booking->from_city = $payload['from_city'];
            $booking->to_city = $payload['to_city'];
            $booking->direction = $payload['direction'];
            $booking->trip_date = $payload['trip_date'];
            $booking->trip_time = $payload['trip_time'] ?? '09:00';
            $booking->booking_for = $packageSize;
            $booking->passenger_name = $payload['sender_name'];
            $booking->passenger_phone = $payload['sender_phone'];
            $booking->passenger_count = $itemQty;
            $booking->pickup_location = $payload['sender_address'];
            $booking->dropoff_location = $payload['receiver_address'];
            $booking->selected_seats = $selectedSeats;
            $booking->price_per_seat = 0;
            $booking->total_amount = 0;
            $booking->payment_status = 'Belum Bayar';
            $booking->booking_status = 'Draft';
            $booking->notes = $notesPayload;
            $booking->save();

            $this->createPassengersFromPayload(
                $booking,
                $payload['passengers'] ?? [],
                $payload['sender_phone'],
            );

            $this->createBookingSource($booking->id, $payload, 'whatsapp');

            $this->logSubmission('Paket', $booking, $customer, $payload);

            return $booking->fresh(['source', 'customer']);
        });
    }

    // ─── PRIVATE HELPERS ──────────────────────────────────────────────────

    private function validateBaseFields(array $payload): void
    {
        $required = [
            'customer_phone', 'customer_name',
            'from_city', 'to_city', 'direction', 'trip_date',
            'pickup_location', 'dropoff_location',
        ];
        foreach ($required as $field) {
            if (! array_key_exists($field, $payload) || $payload[$field] === null || $payload[$field] === '') {
                throw ValidationException::withMessages([
                    $field => ["{$field} wajib diisi."],
                ]);
            }
        }
    }

    private function validateRegulerSpecificFields(array $payload): void
    {
        foreach (['trip_time', 'passenger_count', 'selected_seats'] as $field) {
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
    }

    private function validateDirectionAndDate(array $payload): void
    {
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

    private function validateRentalEndDate(array $payload): void
    {
        if (empty($payload['rental_end_date'])) {
            throw ValidationException::withMessages([
                'rental_end_date' => ['rental_end_date wajib diisi untuk Rental.'],
            ]);
        }
        try {
            $start = Carbon::parse($payload['trip_date'])->startOfDay();
            $end = Carbon::parse($payload['rental_end_date'])->startOfDay();
        } catch (\Throwable $e) {
            throw ValidationException::withMessages([
                'rental_end_date' => ['Format rental_end_date tidak valid.'],
            ]);
        }
        if ($end->lessThanOrEqualTo($start)) {
            throw ValidationException::withMessages([
                'rental_end_date' => ['rental_end_date harus setelah trip_date.'],
            ]);
        }
    }

    private function validatePaketFields(array $payload): void
    {
        $required = [
            'sender_name', 'sender_phone',
            'receiver_name', 'receiver_phone',
            'sender_address', 'receiver_address',
            'package_size', 'item_description',
            'from_city', 'to_city', 'direction', 'trip_date',
        ];
        foreach ($required as $field) {
            if (! array_key_exists($field, $payload) || $payload[$field] === null || $payload[$field] === '') {
                throw ValidationException::withMessages([
                    $field => ["{$field} wajib diisi untuk Paket."],
                ]);
            }
        }
        if (! in_array($payload['package_size'], ['Kecil', 'Sedang', 'Besar'], true)) {
            throw ValidationException::withMessages([
                'package_size' => ['package_size harus Kecil/Sedang/Besar.'],
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

    private function createBookingSource(int $bookingId, array $payload, string $channel): void
    {
        BookingSource::create([
            'booking_id' => $bookingId,
            'source' => BookingSource::SOURCE_CHATBOT,
            'source_event_id' => $payload['source_event_id'] ?? null,
            'source_channel' => $channel,
            'source_meta' => $payload['source_meta'] ?? null,
        ]);
    }

    /**
     * Sesi 97 PR-BUG-B-A — Create rows di booking_passengers dari payload
     * passengers[] (optional). Backward-compatible: kalau payload kosong, no-op.
     *
     * Phone resolution:
     *   - Pnp index 0 → fallback ke $fallbackPhone kalau empty/null
     *     (customer_phone untuk Reguler/Dropping/Rental, sender_phone untuk Paket)
     *   - Pnp index 1+ → boleh null (kolom phone di booking_passengers nullable)
     *
     * Customer linking pakai pattern mirror RegularBookingPersistenceService:232-249.
     *
     * @param  array<int, array{name: string, seat_no: string, phone?: string|null}>  $passengers
     */
    protected function createPassengersFromPayload(
        Booking $booking,
        array $passengers,
        string $fallbackPhone,
    ): void {
        if (empty($passengers)) {
            return;
        }

        $rows = collect($passengers)
            ->map(function (array $p, int $i) use ($booking, $fallbackPhone): array {
                $rawPhone = trim((string) ($p['phone'] ?? ''));
                $phoneEffective = $rawPhone !== ''
                    ? $rawPhone
                    : ($i === 0 ? $fallbackPhone : null);

                $customerId = null;
                if ($phoneEffective !== null && $phoneEffective !== '') {
                    $resolved = $this->customerResolver->resolve(
                        $phoneEffective,
                        $p['name'],
                        (int) $booking->getKey(),
                    );
                    $customerId = $resolved?->id;
                }

                return [
                    'seat_no'       => $p['seat_no'],
                    'name'          => $p['name'],
                    'phone'         => $phoneEffective,
                    'ticket_status' => 'Draft',
                    'customer_id'   => $customerId,
                ];
            })
            ->values()
            ->all();

        $booking->passengers()->createMany($rows);
    }

    private function logSubmission(string $category, Booking $booking, Customer $customer, array $payload): void
    {
        Log::channel('chatbot-bridge')->info("[BookingSubmission] {$category} booking created from chatbot", [
            'booking_id' => $booking->id,
            'booking_code' => $booking->booking_code,
            'customer_id' => $customer->id,
            'event_id' => $payload['source_event_id'] ?? null,
        ]);
    }
}
