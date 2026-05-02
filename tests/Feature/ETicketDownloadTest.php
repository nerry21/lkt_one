<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Booking;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Tests\TestCase;

class ETicketDownloadTest extends TestCase
{
    use RefreshDatabase;

    public function test_download_with_valid_signature_streams_pdf(): void
    {
        Storage::fake('local');
        $booking = Booking::factory()->create([
            'booking_status' => 'Diproses',
            'category' => 'Reguler',
            'ticket_pdf_path' => 'public/etickets/2026/05/sample.pdf',
        ]);
        Storage::disk('local')->put($booking->ticket_pdf_path, '%PDF-1.4 fake content');

        $signedUrl = URL::temporarySignedRoute(
            'bridge.eticket.download',
            now()->addHours(24),
            ['code' => $booking->booking_code]
        );

        $response = $this->get($signedUrl);

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'application/pdf');
    }

    public function test_download_without_signature_returns_403(): void
    {
        $booking = Booking::factory()->create([
            'booking_status' => 'Diproses',
            'category' => 'Reguler',
        ]);

        $response = $this->get("/eticket/{$booking->booking_code}/download");

        $response->assertStatus(403);
    }

    public function test_download_with_expired_signature_returns_403(): void
    {
        $booking = Booking::factory()->create([
            'booking_status' => 'Diproses',
            'category' => 'Reguler',
        ]);

        $signedUrl = URL::temporarySignedRoute(
            'bridge.eticket.download',
            now()->subHour(),
            ['code' => $booking->booking_code]
        );

        $response = $this->get($signedUrl);

        $response->assertStatus(403);
    }
}
