<?php

namespace Tests\Unit\Services;

use App\Exceptions\ForbiddenRouteException;
use App\Services\BookingClusterService;
use InvalidArgumentException;
use Tests\TestCase;

/**
 * Sesi 44C PR #1C — Unit test BookingClusterService.
 *
 * Coverage:
 *   - clusterForLocation (5 cluster categories: BANGKINANG fixed, PETAPAHAN fixed,
 *     HUB Pekanbaru, AMBIGU 12 lokasi, unknown)
 *   - resolveBookingCluster (HUB transparency, ambigu fallback, fixed cluster pickup,
 *     forbidden mixed fixed, PKB→PKB invalid)
 *   - isForbiddenRoute (15 forbidden pairs bidirectional, allowed routes false)
 *   - isClusterCompatible (HUB fleksibel, sama cluster OK, beda cluster CONFLICT)
 */
class BookingClusterServiceTest extends TestCase
{
    private BookingClusterService $svc;

    protected function setUp(): void
    {
        parent::setUp();
        $this->svc = new BookingClusterService();
    }

    public function test_cluster_for_location_returns_bangkinang_for_fixed_locations(): void
    {
        foreach (['Bangkinang', 'Aliantan', 'Kabun', 'Kuok', 'Silam'] as $loc) {
            $this->assertSame(
                BookingClusterService::CLUSTER_BANGKINANG,
                $this->svc->clusterForLocation($loc),
                "Lokasi $loc harus return BANGKINANG",
            );
        }
    }

    public function test_cluster_for_location_returns_petapahan_for_fixed_locations(): void
    {
        foreach (['Petapahan', 'Suram', 'Kasikan'] as $loc) {
            $this->assertSame(
                BookingClusterService::CLUSTER_PETAPAHAN,
                $this->svc->clusterForLocation($loc),
                "Lokasi $loc harus return PETAPAHAN",
            );
        }
    }

    public function test_cluster_for_location_returns_hub_for_pekanbaru(): void
    {
        $this->assertSame(
            BookingClusterService::CLUSTER_HUB,
            $this->svc->clusterForLocation('Pekanbaru'),
        );
    }

    public function test_cluster_for_location_returns_null_for_ambigu_locations(): void
    {
        $ambigu = [
            'Tandun', 'Ujung Batu', 'Pasirpengaraian', 'Rambah Samo',
            'SKPA', 'SKPB', 'SKPD', 'Simpang D', 'SKPC',
            'Simpang Kumu', 'Muara Rumbai', 'Surau Tinggi',
        ];

        foreach ($ambigu as $loc) {
            $this->assertNull(
                $this->svc->clusterForLocation($loc),
                "Lokasi $loc harus return null (ambigu)",
            );
        }
    }

    public function test_cluster_for_location_returns_null_for_unknown_location(): void
    {
        $this->assertNull($this->svc->clusterForLocation('Bumi Datar'));
        $this->assertNull($this->svc->clusterForLocation('Random'));
        $this->assertNull($this->svc->clusterForLocation(''));
    }

    public function test_cluster_for_location_trims_whitespace(): void
    {
        $this->assertSame(
            BookingClusterService::CLUSTER_BANGKINANG,
            $this->svc->clusterForLocation('  Aliantan  '),
        );
    }

    public function test_resolve_booking_cluster_picks_bangkinang_when_fixed_origin(): void
    {
        $this->assertSame(
            BookingClusterService::CLUSTER_BANGKINANG,
            $this->svc->resolveBookingCluster('Aliantan', 'Pekanbaru', null),
        );
    }

    public function test_resolve_booking_cluster_picks_petapahan_when_fixed_origin(): void
    {
        $this->assertSame(
            BookingClusterService::CLUSTER_PETAPAHAN,
            $this->svc->resolveBookingCluster('Petapahan', 'Pekanbaru', null),
        );
    }

    public function test_resolve_booking_cluster_uses_route_via_for_ambigu_to_hub(): void
    {
        $this->assertSame(
            BookingClusterService::CLUSTER_BANGKINANG,
            $this->svc->resolveBookingCluster('Pasirpengaraian', 'Pekanbaru', 'BANGKINANG'),
        );

        $this->assertSame(
            BookingClusterService::CLUSTER_PETAPAHAN,
            $this->svc->resolveBookingCluster('Pasirpengaraian', 'Pekanbaru', 'PETAPAHAN'),
        );
    }

    public function test_resolve_booking_cluster_uses_route_via_for_both_ambigu(): void
    {
        $this->assertSame(
            BookingClusterService::CLUSTER_BANGKINANG,
            $this->svc->resolveBookingCluster('Pasirpengaraian', 'Tandun', null),
            'Default fallback BANGKINANG saat route_via null',
        );

        $this->assertSame(
            BookingClusterService::CLUSTER_PETAPAHAN,
            $this->svc->resolveBookingCluster('Pasirpengaraian', 'Tandun', 'PETAPAHAN'),
        );
    }

    public function test_resolve_booking_cluster_throws_for_pkb_to_pkb(): void
    {
        $this->expectException(InvalidArgumentException::class);
        $this->svc->resolveBookingCluster('Pekanbaru', 'Pekanbaru', null);
    }

    public function test_resolve_booking_cluster_throws_forbidden_for_mixed_fixed_clusters(): void
    {
        $this->expectException(ForbiddenRouteException::class);
        $this->svc->resolveBookingCluster('Aliantan', 'Petapahan', null);
    }

    public function test_resolve_booking_cluster_normalizes_route_via_case(): void
    {
        $this->assertSame(
            BookingClusterService::CLUSTER_PETAPAHAN,
            $this->svc->resolveBookingCluster('Pasirpengaraian', 'Pekanbaru', 'petapahan'),
        );

        $this->assertSame(
            BookingClusterService::CLUSTER_BANGKINANG,
            $this->svc->resolveBookingCluster('Pasirpengaraian', 'Pekanbaru', '  bangkinang  '),
        );
    }

    public function test_resolve_booking_cluster_invalid_route_via_falls_back_bangkinang(): void
    {
        $this->assertSame(
            BookingClusterService::CLUSTER_BANGKINANG,
            $this->svc->resolveBookingCluster('Pasirpengaraian', 'Pekanbaru', 'INVALID'),
        );
    }

    public function test_is_forbidden_route_true_for_each_known_pair(): void
    {
        $forbiddenPairs = [
            ['Bangkinang', 'Petapahan'], ['Bangkinang', 'Suram'], ['Bangkinang', 'Kasikan'],
            ['Aliantan', 'Petapahan'], ['Aliantan', 'Suram'], ['Aliantan', 'Kasikan'],
            ['Kabun', 'Petapahan'], ['Kabun', 'Suram'], ['Kabun', 'Kasikan'],
            ['Kuok', 'Petapahan'], ['Kuok', 'Suram'], ['Kuok', 'Kasikan'],
            ['Silam', 'Petapahan'], ['Silam', 'Suram'], ['Silam', 'Kasikan'],
        ];

        foreach ($forbiddenPairs as [$from, $to]) {
            $this->assertTrue(
                $this->svc->isForbiddenRoute($from, $to),
                "Pair $from ↔ $to harus forbidden",
            );
        }
    }

    public function test_is_forbidden_route_bidirectional(): void
    {
        $this->assertTrue($this->svc->isForbiddenRoute('Aliantan', 'Petapahan'));
        $this->assertTrue($this->svc->isForbiddenRoute('Petapahan', 'Aliantan'));
        $this->assertTrue($this->svc->isForbiddenRoute('Silam', 'Kasikan'));
        $this->assertTrue($this->svc->isForbiddenRoute('Kasikan', 'Silam'));
    }

    public function test_is_forbidden_route_false_for_allowed_routes(): void
    {
        // Same cluster
        $this->assertFalse($this->svc->isForbiddenRoute('Aliantan', 'Bangkinang'));
        // To/from HUB
        $this->assertFalse($this->svc->isForbiddenRoute('Aliantan', 'Pekanbaru'));
        $this->assertFalse($this->svc->isForbiddenRoute('Pekanbaru', 'Petapahan'));
        // Ambigu involved (not in forbidden list)
        $this->assertFalse($this->svc->isForbiddenRoute('Pasirpengaraian', 'Aliantan'));
        $this->assertFalse($this->svc->isForbiddenRoute('Pasirpengaraian', 'Petapahan'));
        $this->assertFalse($this->svc->isForbiddenRoute('Pasirpengaraian', 'Tandun'));
    }

    public function test_is_forbidden_route_trims_whitespace(): void
    {
        $this->assertTrue($this->svc->isForbiddenRoute('  Aliantan  ', 'Petapahan'));
    }

    public function test_is_cluster_compatible_same_cluster_ok(): void
    {
        $this->assertTrue($this->svc->isClusterCompatible(
            [BookingClusterService::CLUSTER_BANGKINANG],
            BookingClusterService::CLUSTER_BANGKINANG,
        ));
    }

    public function test_is_cluster_compatible_different_cluster_conflict(): void
    {
        $this->assertFalse($this->svc->isClusterCompatible(
            [BookingClusterService::CLUSTER_BANGKINANG],
            BookingClusterService::CLUSTER_PETAPAHAN,
        ));
    }

    public function test_is_cluster_compatible_hub_only_existing_auto_allow(): void
    {
        // HUB-only existing → boleh accept apapun cluster baru
        $this->assertTrue($this->svc->isClusterCompatible(
            [BookingClusterService::CLUSTER_HUB, BookingClusterService::CLUSTER_HUB],
            BookingClusterService::CLUSTER_BANGKINANG,
        ));

        $this->assertTrue($this->svc->isClusterCompatible(
            [BookingClusterService::CLUSTER_HUB],
            BookingClusterService::CLUSTER_PETAPAHAN,
        ));
    }

    public function test_is_cluster_compatible_mixed_hub_and_fixed_same_ok(): void
    {
        // HUB-only di-skip, kalau remaining cluster sama dengan baru = OK
        $this->assertTrue($this->svc->isClusterCompatible(
            [BookingClusterService::CLUSTER_HUB, BookingClusterService::CLUSTER_BANGKINANG],
            BookingClusterService::CLUSTER_BANGKINANG,
        ));
    }

    public function test_is_cluster_compatible_mixed_hub_and_fixed_different_conflict(): void
    {
        $this->assertFalse($this->svc->isClusterCompatible(
            [BookingClusterService::CLUSTER_HUB, BookingClusterService::CLUSTER_BANGKINANG],
            BookingClusterService::CLUSTER_PETAPAHAN,
        ));
    }

    public function test_is_cluster_compatible_empty_existing_ok(): void
    {
        $this->assertTrue($this->svc->isClusterCompatible(
            [],
            BookingClusterService::CLUSTER_BANGKINANG,
        ));
    }

    /**
     * Sesi 44D PR #1D: locationClusterMap getter exposes 21 lokasi ke frontend.
     */
    public function test_location_cluster_map_returns_full_map(): void
    {
        $map = $this->svc->locationClusterMap();

        $this->assertArrayHasKey('Pekanbaru', $map);
        $this->assertSame(BookingClusterService::CLUSTER_HUB, $map['Pekanbaru']);
        $this->assertSame(BookingClusterService::CLUSTER_BANGKINANG, $map['Bangkinang']);
        $this->assertSame(BookingClusterService::CLUSTER_BANGKINANG, $map['Aliantan']);
        $this->assertSame(BookingClusterService::CLUSTER_PETAPAHAN, $map['Petapahan']);
        $this->assertSame(BookingClusterService::CLUSTER_PETAPAHAN, $map['Suram']);
        $this->assertNull($map['Tandun']);
        $this->assertNull($map['Pasirpengaraian']);
        $this->assertCount(21, $map, '1 HUB + 5 BANGKINANG + 3 PETAPAHAN + 12 ambigu = 21');
    }

    /**
     * Sesi 44D PR #1D: forbiddenPairs getter exposes 15 pasang ke frontend.
     */
    public function test_forbidden_pairs_returns_15_pairs(): void
    {
        $pairs = $this->svc->forbiddenPairs();

        $this->assertCount(15, $pairs);
        $this->assertContains(['Bangkinang', 'Petapahan'], $pairs);
        $this->assertContains(['Aliantan', 'Petapahan'], $pairs);
        $this->assertContains(['Silam', 'Kasikan'], $pairs);
        $this->assertContains(['Kuok', 'Suram'], $pairs);
    }
}
