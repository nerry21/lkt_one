<?php

declare(strict_types=1);

namespace Tests\Unit\Services;

use App\Models\Booking;
use App\Models\Driver;
use App\Models\Mobil;
use App\Services\SuratJalanPdfService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class SuratJalanPdfServiceTest extends TestCase
{
    use RefreshDatabase;

    private SuratJalanPdfService $service;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('local');
        $this->service = new SuratJalanPdfService();
    }

    public function test_buildTripKey_canonical_format(): void
    {
        $key = $this->service->buildTripKey('2026-05-04', '05:30:00', 'Pasirpengaraian');
        $this->assertSame('2026-05-04_05-30_pasirpengaraian', $key);

        $keyTwo = $this->service->buildTripKey('2026-05-04', '13:00', 'Pekanbaru');
        $this->assertSame('2026-05-04_13-00_pekanbaru', $keyTwo);
    }

    public function test_generateAndStore_creates_file_at_expected_path(): void
    {
        $path = $this->service->generateAndStore('2026-05-04', '05:30:00', 'Pasirpengaraian');

        $this->assertSame('surat-jalan/2026/05/sj-2026-05-04_05-30_pasirpengaraian.pdf', $path);
        Storage::assertExists($path);
    }

    public function test_renderPdf_returns_non_empty_bytes(): void
    {
        $mobil = Mobil::factory()->create(['kode_mobil' => 'JET 01']);
        $driver = Driver::factory()->create(['nama' => 'Pak Joni']);

        Booking::factory()->create([
            'category' => 'Reguler',
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Pekanbaru',
            'trip_date' => '2026-05-04',
            'trip_time' => '05:30:00',
            'booking_status' => 'Diproses',
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
            'driver_name' => 'Pak Joni',
            'selected_seats' => ['1A'],
            'total_amount' => 170000,
        ]);

        $bytes = $this->service->renderPdf('2026-05-04', '05:30:00', 'Pasirpengaraian');

        $this->assertNotEmpty($bytes);
        $this->assertStringStartsWith('%PDF-', $bytes);
    }

    public function test_renderPdf_with_zero_bookings_renders_empty_table(): void
    {
        $bytes = $this->service->renderPdf('2026-05-04', '05:30:00', 'Pasirpengaraian');

        $this->assertNotEmpty($bytes);
        $this->assertStringStartsWith('%PDF-', $bytes);
    }

    public function test_streamContent_regenerates_if_missing(): void
    {
        $this->assertFalse($this->service->exists('2026-05-04', '05:30:00', 'Pasirpengaraian'));

        $content = $this->service->streamContent('2026-05-04', '05:30:00', 'Pasirpengaraian');

        $this->assertNotEmpty($content);
        $this->assertTrue($this->service->exists('2026-05-04', '05:30:00', 'Pasirpengaraian'));
    }

    public function test_exists_returns_false_initially(): void
    {
        $this->assertFalse($this->service->exists('2026-05-04', '05:30:00', 'Pasirpengaraian'));
    }
}
