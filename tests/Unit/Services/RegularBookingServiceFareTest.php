<?php

namespace Tests\Unit\Services;

use App\Services\RegularBookingService;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

/**
 * Unit test fareMap + locations Sesi 44B PR #1B.
 *
 * Verify tarif final + 6 lokasi baru tersedia di sistem.
 */
class RegularBookingServiceFareTest extends TestCase
{
    private RegularBookingService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = app(RegularBookingService::class);
    }

    public function test_locations_include_six_new_locations(): void
    {
        $locations = $this->service->locations();

        // 6 lokasi baru harus ada
        $this->assertContains('Rambah Samo', $locations);
        $this->assertContains('SKPA', $locations);
        $this->assertContains('SKPB', $locations);
        $this->assertContains('Silam', $locations);
        $this->assertContains('Kasikan', $locations);
        $this->assertContains('Kuok', $locations);

        // Locations existing tetap ada (regression guard)
        $this->assertContains('Pasirpengaraian', $locations);
        $this->assertContains('Pekanbaru', $locations);
        $this->assertContains('Bangkinang', $locations);
    }

    #[DataProvider('sharedOriginsToPkbProvider')]
    public function test_shared_origins_to_pkb_fare_is_150k(string $origin): void
    {
        $this->assertSame(150000, $this->service->resolveFare($origin, 'Pekanbaru'));
        $this->assertSame(150000, $this->service->resolveFare('Pekanbaru', $origin));
    }

    public static function sharedOriginsToPkbProvider(): array
    {
        return [
            ['SKPD'],
            ['Simpang D'],
            ['SKPC'],
            ['Simpang Kumu'],
            ['Muara Rumbai'],
            ['Surau Tinggi'],
            ['Pasirpengaraian'],
            ['Rambah Samo'],
            ['SKPA'],
            ['SKPB'],
        ];
    }

    #[DataProvider('singleFareToPkbProvider')]
    public function test_single_fare_locations_to_pkb(string $origin, int $expected): void
    {
        $this->assertSame($expected, $this->service->resolveFare($origin, 'Pekanbaru'));
        $this->assertSame($expected, $this->service->resolveFare('Pekanbaru', $origin));
    }

    public static function singleFareToPkbProvider(): array
    {
        return [
            'Bangkinang' => ['Bangkinang', 100000],
            'Kuok' => ['Kuok', 100000],
            'Petapahan' => ['Petapahan', 100000],
            'Aliantan' => ['Aliantan', 120000],
            'Kabun' => ['Kabun', 120000],
            'Kasikan' => ['Kasikan', 120000],
            'Silam' => ['Silam', 120000],
            'Suram' => ['Suram', 120000],
            'Tandun' => ['Tandun', 120000],
            'Ujung Batu' => ['Ujung Batu', 130000],
        ];
    }

    public function test_inter_titik_special_fares(): void
    {
        // Tarif khusus existing
        $this->assertSame(50000, $this->service->resolveFare('Ujung Batu', 'Pasirpengaraian'));
        $this->assertSame(50000, $this->service->resolveFare('Pasirpengaraian', 'Ujung Batu'));

        $this->assertSame(100000, $this->service->resolveFare('Tandun', 'Pasirpengaraian'));
        $this->assertSame(100000, $this->service->resolveFare('Pasirpengaraian', 'Tandun'));

        $this->assertSame(120000, $this->service->resolveFare('Kabun', 'Pasirpengaraian'));
        $this->assertSame(120000, $this->service->resolveFare('Pasirpengaraian', 'Kabun'));
    }

    public function test_shared_origin_to_branch_locations(): void
    {
        // Sharedorigins di sub-area Pasir → cabang BANGKINANG
        $this->assertSame(130000, $this->service->resolveFare('Pasirpengaraian', 'Bangkinang'));
        $this->assertSame(120000, $this->service->resolveFare('Pasirpengaraian', 'Aliantan'));

        // Sharedorigins → cabang PETAPAHAN
        $this->assertSame(130000, $this->service->resolveFare('Pasirpengaraian', 'Petapahan'));
        $this->assertSame(120000, $this->service->resolveFare('Pasirpengaraian', 'Suram'));

        // Locations baru (Rambah Samo, SKPA) harus juga apply tarif sama
        $this->assertSame(130000, $this->service->resolveFare('Rambah Samo', 'Bangkinang'));
        $this->assertSame(150000, $this->service->resolveFare('SKPA', 'Pekanbaru'));
        $this->assertSame(120000, $this->service->resolveFare('SKPB', 'Aliantan'));
    }

    public function test_unknown_route_returns_null(): void
    {
        // Rute yang tidak ada di fareMap → null (admin manual handle / banner PR #1D)
        $this->assertNull($this->service->resolveFare('Bangkinang', 'Petapahan'));
        $this->assertNull($this->service->resolveFare('Aliantan', 'Suram'));
        $this->assertNull($this->service->resolveFare('Kuok', 'Kasikan'));

        // Rute yang tidak eksplisit di-confirm tarifnya → null (defensive)
        $this->assertNull($this->service->resolveFare('Pasirpengaraian', 'Silam'));
        $this->assertNull($this->service->resolveFare('Pasirpengaraian', 'Kuok'));
        $this->assertNull($this->service->resolveFare('Pasirpengaraian', 'Kasikan'));
    }
}
