<?php

namespace Tests\Feature\Jobs;

use App\Jobs\DispatchBookingWebhookJob;
use App\Models\Booking;
use App\Models\Mobil;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\Request as ClientRequest;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class DispatchBookingWebhookJobTest extends TestCase
{
    use RefreshDatabase;

    protected string $secret = 'test-bridge-secret-sesi-66';
    protected string $url = 'https://chatbot.test/webhook/lkt-booking';

    protected function setUp(): void
    {
        parent::setUp();
        config([
            'chatbot_bridge.api_key' => $this->secret,
            'chatbot_bridge.webhook_enabled' => true,
            'chatbot_bridge.webhook_url' => $this->url,
            'chatbot_bridge.webhook_timeout' => 5,
        ]);
    }

    /**
     * Build Booking tanpa fire observer dispatch (supaya test Job class TIDAK
     * ke-trigger dispatch dari observer side; kita ingin uji Job::handle()
     * in isolation). Temporarily disable webhook flag — observer short-circuits.
     * Tidak pakai Model::withoutEvents() karena akan kill saving() hook yang
     * auto-resolve direction (kalau di-skip, MySQL reject NULL).
     */
    private function makeBookingQuiet(array $overrides = []): Booking
    {
        $original = config('chatbot_bridge.webhook_enabled');
        config(['chatbot_bridge.webhook_enabled' => false]);
        try {
            return Booking::factory()->create($overrides);
        } finally {
            config(['chatbot_bridge.webhook_enabled' => $original]);
        }
    }

    public function test_dispatch_skipped_when_webhook_disabled(): void
    {
        config(['chatbot_bridge.webhook_enabled' => false]);
        Http::fake();

        $job = DispatchBookingWebhookJob::fromBooking($this->makeBookingQuiet());
        $job->handle();

        Http::assertNothingSent();
    }

    public function test_dispatch_sends_post_with_required_headers(): void
    {
        Http::fake([
            $this->url => Http::response(['status' => 'accepted'], 201),
        ]);

        $job = DispatchBookingWebhookJob::fromBooking($this->makeBookingQuiet());
        $job->handle();

        Http::assertSent(function (ClientRequest $request) use ($job) {
            $this->assertSame($this->url, $request->url());
            $this->assertSame('POST', $request->method());

            $this->assertSame($this->secret, $request->header('X-Chatbot-Bridge-Key')[0] ?? null);
            $this->assertSame($job->eventId, $request->header('X-Event-Id')[0] ?? null);

            $sig = $request->header('X-Webhook-Signature')[0] ?? '';
            $this->assertStringStartsWith('sha256=', $sig);

            $ts = $request->header('X-Webhook-Timestamp')[0] ?? '';
            $this->assertTrue(ctype_digit($ts), 'timestamp must be numeric epoch');
            $this->assertTrue(abs(time() - (int) $ts) < 60, 'timestamp must be recent');

            $expected = 'sha256=' . hash_hmac('sha256', $ts . '.' . $request->body(), $this->secret);
            $this->assertSame($expected, $sig, 'HMAC signature must match timestamp + body');

            return true;
        });
    }

    public function test_payload_envelope_uses_honest_schema(): void
    {
        Http::fake([
            $this->url => Http::response([], 201),
        ]);

        $booking = $this->makeBookingQuiet([
            'category' => 'Dropping',
            'from_city' => 'Pekanbaru',
            'to_city' => 'Pasirpengaraian',
            'passenger_count' => 3,
            'dropoff_location' => 'Jl. Pelajar No. 12',
        ]);

        $job = DispatchBookingWebhookJob::fromBooking($booking);
        $job->handle();

        Http::assertSent(function (ClientRequest $request) use ($booking, $job) {
            $body = json_decode($request->body(), true);
            $this->assertSame($job->eventId, $body['event_id']);
            $this->assertSame('booking.created', $body['event_type']);
            $this->assertArrayHasKey('occurred_at', $body);

            $data = $body['data'];
            $this->assertSame($booking->id, $data['booking_id']);
            $this->assertSame('Dropping', $data['category']);
            $this->assertSame('Pekanbaru', $data['from_city']);
            $this->assertSame('Pasirpengaraian', $data['to_city']);
            $this->assertSame(3, $data['passenger_count']);
            $this->assertSame('Jl. Pelajar No. 12', $data['dropoff_location']);
            $this->assertArrayHasKey('booking_status', $data);
            $this->assertArrayHasKey('departure_status', $data);
            $this->assertArrayHasKey('ticket_status', $data);
            $this->assertArrayHasKey('selected_seats', $data);
            return true;
        });
    }

    /**
     * Sesi 73 PR-CRM-6J — payload extension: 4 field baru (payment_method,
     * customer_id, mobil_kode, driver_name) untuk projection table di Chatbot.
     */
    public function test_payload_includes_sesi73_projection_fields(): void
    {
        Http::fake([
            $this->url => Http::response([], 201),
        ]);

        $mobil = Mobil::factory()->create(['kode_mobil' => 'JET 07']);

        $booking = $this->makeBookingQuiet([
            'category' => 'Reguler',
            'payment_method' => 'cash',
            'mobil_id' => $mobil->id,
            'driver_name' => 'Pak Joni',
        ]);

        $job = DispatchBookingWebhookJob::fromBooking($booking);
        $job->handle();

        Http::assertSent(function (ClientRequest $request): bool {
            $body = json_decode($request->body(), true);
            $data = $body['data'];

            $this->assertArrayHasKey('payment_method', $data);
            $this->assertArrayHasKey('customer_id', $data);
            $this->assertArrayHasKey('mobil_kode', $data);
            $this->assertArrayHasKey('driver_name', $data);

            $this->assertSame('cash', $data['payment_method']);
            $this->assertSame('JET 07', $data['mobil_kode']);
            $this->assertSame('Pak Joni', $data['driver_name']);

            return true;
        });
    }

    public function test_5xx_response_throws_to_trigger_retry(): void
    {
        Http::fake([
            $this->url => Http::response('upstream down', 503),
        ]);

        $job = DispatchBookingWebhookJob::fromBooking($this->makeBookingQuiet());

        $this->expectException(\RuntimeException::class);
        $this->expectExceptionMessage('Webhook retryable failure: HTTP 503');
        $job->handle();
    }

    public function test_429_response_throws_to_trigger_retry(): void
    {
        Http::fake([
            $this->url => Http::response('rate limited', 429),
        ]);

        $job = DispatchBookingWebhookJob::fromBooking($this->makeBookingQuiet());

        $this->expectException(\RuntimeException::class);
        $job->handle();
    }

    public function test_4xx_response_does_not_throw(): void
    {
        Http::fake([
            $this->url => Http::response(['error' => 'bad envelope'], 400),
        ]);

        $job = DispatchBookingWebhookJob::fromBooking($this->makeBookingQuiet());

        // Should not throw — 4xx (selain 408/429) = final, no retry
        $job->handle();
        $this->assertTrue(true);
    }

    public function test_skips_when_url_or_key_missing(): void
    {
        config([
            'chatbot_bridge.webhook_url' => '',
            'chatbot_bridge.api_key' => '',
        ]);
        Http::fake();

        $job = DispatchBookingWebhookJob::fromBooking($this->makeBookingQuiet());
        $job->handle();

        Http::assertNothingSent();
    }

    public function test_observer_does_not_dispatch_when_webhook_disabled(): void
    {
        config(['chatbot_bridge.webhook_enabled' => false]);
        Http::fake();

        Booking::factory()->create();

        // Sync queue, jadi kalau dispatch fired pasti hit Http::fake
        Http::assertNothingSent();
    }

    public function test_observer_dispatches_on_booking_created(): void
    {
        Http::fake([
            $this->url => Http::response([], 201),
        ]);

        Booking::factory()->create();

        Http::assertSentCount(1);
    }
}
