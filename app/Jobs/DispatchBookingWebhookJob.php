<?php

namespace App\Jobs;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

/**
 * Sesi 66 PR-CRM-6C — Dispatch booking event ke Chatbot AI webhook.
 *
 * Trigger: BookingObserver::created() (semua kategori Reguler/Dropping/Rental/Paket).
 * Auth: dual layer — X-Chatbot-Bridge-Key (shared secret) + X-Webhook-Signature
 *   (HMAC SHA256 of timestamp + body, secret = same key).
 * Retry: 3× exponential backoff (60s → 300s → 900s). Failed permanen → failed_jobs.
 * Idempotency: event_id UUID v4 di-generate sekali, dedup di Chatbot side via
 *   UNIQUE constraint.
 *
 * Honest schema: payload mirror Booking model field-for-field tanpa rename.
 * Mapping ke vocab Chatbot (mis. service_type) di-defer ke projection layer
 * Sesi 67+. Kirim 3 status field (booking/departure/ticket) sebagai snapshot.
 */
class DispatchBookingWebhookJob implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    public int $tries = 3;
    public array $backoff = [60, 300, 900];

    /**
     * @param  array<string, mixed>  $payload
     */
    public function __construct(
        public readonly string $eventId,
        public readonly string $eventType,
        public readonly array $payload,
        public readonly string $occurredAt,
    ) {
    }

    public static function fromBooking(Booking $booking, string $eventType = 'booking.created'): self
    {
        return new self(
            eventId: (string) Str::uuid(),
            eventType: $eventType,
            payload: self::buildPayload($booking),
            occurredAt: Carbon::now()->toIso8601String(),
        );
    }

    public function handle(): void
    {
        if (! (bool) config('chatbot_bridge.webhook_enabled', false)) {
            Log::channel('chatbot-bridge')->info('Webhook dispatch skipped (disabled)', [
                'event_id' => $this->eventId,
            ]);
            return;
        }

        $url = (string) config('chatbot_bridge.webhook_url');
        $secret = (string) config('chatbot_bridge.api_key');

        if ($url === '' || $secret === '') {
            Log::channel('chatbot-bridge')->error('Webhook config missing (url or api_key)', [
                'event_id' => $this->eventId,
            ]);
            return;
        }

        $body = json_encode([
            'event_id' => $this->eventId,
            'event_type' => $this->eventType,
            'occurred_at' => $this->occurredAt,
            'data' => $this->payload,
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        $timestamp = (string) Carbon::now()->timestamp;
        $signature = hash_hmac('sha256', $timestamp . '.' . $body, $secret);

        $response = Http::timeout((int) config('chatbot_bridge.webhook_timeout', 10))
            ->withHeaders([
                'Content-Type' => 'application/json',
                'X-Chatbot-Bridge-Key' => $secret,
                'X-Webhook-Signature' => 'sha256=' . $signature,
                'X-Webhook-Timestamp' => $timestamp,
                'X-Event-Id' => $this->eventId,
            ])
            ->withBody($body, 'application/json')
            ->post($url);

        Log::channel('chatbot-bridge')->info('Webhook dispatched', [
            'event_id' => $this->eventId,
            'event_type' => $this->eventType,
            'status' => $response->status(),
            'attempt' => $this->attempts(),
        ]);

        if ($response->status() >= 500 || in_array($response->status(), [408, 429], true)) {
            throw new \RuntimeException("Webhook retryable failure: HTTP {$response->status()}");
        }

        if ($response->failed()) {
            Log::channel('chatbot-bridge')->warning('Webhook 4xx final', [
                'event_id' => $this->eventId,
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
        }
    }

    public function failed(\Throwable $exception): void
    {
        Log::channel('chatbot-bridge')->error('Webhook job failed permanently', [
            'event_id' => $this->eventId,
            'error' => $exception->getMessage(),
        ]);
    }

    /**
     * Honest schema — mirror Booking model fields. Rename ke vocab Chatbot
     * (mis. service_type, fare) DEFERRED ke projection layer Sesi 67+.
     *
     * @return array<string, mixed>
     */
    private static function buildPayload(Booking $booking): array
    {
        $booking->loadMissing(['mobil']);

        return [
            'booking_id' => $booking->id,
            'booking_code' => $booking->booking_code,
            'category' => $booking->category,
            'from_city' => $booking->from_city,
            'to_city' => $booking->to_city,
            'direction' => $booking->direction,
            'passenger_name' => $booking->passenger_name,
            'passenger_phone' => $booking->passenger_phone,
            'passenger_count' => $booking->passenger_count,
            'pickup_location' => $booking->pickup_location,
            'dropoff_location' => $booking->dropoff_location,
            'trip_date' => optional($booking->trip_date)->toDateString(),
            'trip_time' => $booking->trip_time,
            'selected_seats' => $booking->selected_seats,
            'total_amount' => $booking->total_amount,
            'payment_method' => $booking->payment_method,
            'payment_status' => $booking->payment_status,
            'booking_status' => $booking->booking_status,
            'departure_status' => $booking->departure_status,
            'ticket_status' => $booking->ticket_status,
            'customer_id' => $booking->customer_id,
            'mobil_kode' => optional($booking->mobil)->kode_mobil,
            'driver_name' => $booking->driver_name,
            'created_at' => optional($booking->created_at)->toIso8601String(),
        ];
    }
}
