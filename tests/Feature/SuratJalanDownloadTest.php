<?php

declare(strict_types=1);

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Tests\TestCase;

class SuratJalanDownloadTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('local');
    }

    public function test_unsigned_request_returns_403(): void
    {
        $response = $this->get('/surat-jalan/2026-05-04/05-30/pasirpengaraian/download');
        $response->assertStatus(403);
    }

    public function test_signed_request_returns_pdf(): void
    {
        $signedUrl = URL::temporarySignedRoute(
            'bridge.surat-jalan.download',
            now()->addHours(24),
            [
                'trip_date' => '2026-05-04',
                'trip_time' => '05-30',
                'from_city_slug' => 'pasirpengaraian',
            ],
        );

        $response = $this->get($signedUrl);

        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'application/pdf');
    }

    public function test_invalid_trip_date_returns_400(): void
    {
        $signedUrl = URL::temporarySignedRoute(
            'bridge.surat-jalan.download',
            now()->addHours(24),
            [
                'trip_date' => 'not-a-date',
                'trip_time' => '05-30',
                'from_city_slug' => 'pasirpengaraian',
            ],
        );

        $response = $this->get($signedUrl);
        $response->assertStatus(400);
        $response->assertJson(['error' => 'invalid_trip_date']);
    }

    public function test_invalid_trip_time_format_returns_400(): void
    {
        $signedUrl = URL::temporarySignedRoute(
            'bridge.surat-jalan.download',
            now()->addHours(24),
            [
                'trip_date' => '2026-05-04',
                'trip_time' => 'bad',
                'from_city_slug' => 'pasirpengaraian',
            ],
        );

        $response = $this->get($signedUrl);
        $response->assertStatus(400);
        $response->assertJson(['error' => 'invalid_trip_time']);
    }
}
