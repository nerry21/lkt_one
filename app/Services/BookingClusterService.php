<?php

namespace App\Services;

use App\Exceptions\ForbiddenRouteException;
use InvalidArgumentException;

/**
 * Sesi 44C PR #1C — Cluster routing service untuk JET Travel.
 *
 * JET punya 2 cabang fisik dari Pekanbaru:
 *   - BANGKINANG: PKB ↔ Bangkinang ↔ Aliantan ↔ Kabun ↔ Kuok ↔ Silam
 *   - PETAPAHAN:  PKB ↔ Petapahan ↔ Suram ↔ Kasikan
 *
 * Lokasi sub-area Pasir + Tandun + Ujung Batu = AMBIGU (bisa kedua jalur).
 * Cluster mereka ditentukan oleh `route_via` admin saat input booking.
 *
 * 1 mobil fisik = 1 jalur. Booking BANGKINANG dan PETAPAHAN tidak bisa
 * coexist di slot armada yang sama → throw RouteClusterConflictException.
 *
 * Forbidden routes: 15 pasang bidirectional kombinasi cabang berbeda
 * (e.g. Aliantan ↔ Petapahan secara fisik mustahil, mobil tidak lewat keduanya).
 *
 * Stateless service. Tidak ada DB query di service ini — pure mapping logic.
 * Cluster mix validation yang touch DB ada di BookingManagementService caller.
 *
 * @see \App\Exceptions\ForbiddenRouteException Trigger HTTP 422 di FormRequest+Service
 * @see \App\Exceptions\RouteClusterConflictException Trigger HTTP 422 di Service
 */
class BookingClusterService
{
    public const CLUSTER_BANGKINANG = 'BANGKINANG';
    public const CLUSTER_PETAPAHAN = 'PETAPAHAN';
    public const CLUSTER_HUB = 'HUB';

    /**
     * Lokasi → cluster fixed. null = ambigu (resolve via routeVia caller).
     */
    private const LOCATION_CLUSTER_MAP = [
        'Pekanbaru'       => self::CLUSTER_HUB,

        // BANGKINANG fixed (5)
        'Bangkinang'      => self::CLUSTER_BANGKINANG,
        'Aliantan'        => self::CLUSTER_BANGKINANG,
        'Kabun'           => self::CLUSTER_BANGKINANG,
        'Kuok'            => self::CLUSTER_BANGKINANG,
        'Silam'           => self::CLUSTER_BANGKINANG,

        // PETAPAHAN fixed (3)
        'Petapahan'       => self::CLUSTER_PETAPAHAN,
        'Suram'           => self::CLUSTER_PETAPAHAN,
        'Kasikan'         => self::CLUSTER_PETAPAHAN,

        // AMBIGU (12) — null sengaja, caller resolve via routeVia
        'Tandun'          => null,
        'Ujung Batu'      => null,
        'SKPD'            => null,
        'Simpang D'       => null,
        'SKPC'            => null,
        'Simpang Kumu'    => null,
        'Muara Rumbai'    => null,
        'Surau Tinggi'    => null,
        'Pasirpengaraian' => null,
        'Rambah Samo'     => null,
        'SKPA'            => null,
        'SKPB'            => null,
    ];

    /**
     * Forbidden route pairs (BANGKINANG-fixed × PETAPAHAN-fixed).
     * 15 pasang bidirectional. Encode satu arah, helper sort untuk bidirectional check.
     *
     * @var array<int, array{0: string, 1: string}>
     */
    private const FORBIDDEN_PAIRS = [
        ['Bangkinang', 'Petapahan'],
        ['Bangkinang', 'Suram'],
        ['Bangkinang', 'Kasikan'],
        ['Aliantan', 'Petapahan'],
        ['Aliantan', 'Suram'],
        ['Aliantan', 'Kasikan'],
        ['Kabun', 'Petapahan'],
        ['Kabun', 'Suram'],
        ['Kabun', 'Kasikan'],
        ['Kuok', 'Petapahan'],
        ['Kuok', 'Suram'],
        ['Kuok', 'Kasikan'],
        ['Silam', 'Petapahan'],
        ['Silam', 'Suram'],
        ['Silam', 'Kasikan'],
    ];

    /**
     * Resolve cluster fisik untuk satu lokasi.
     * Return null kalau lokasi ambigu (caller harus resolve via routeVia)
     * atau lokasi tidak terdaftar.
     */
    public function clusterForLocation(string $location): ?string
    {
        $normalized = trim($location);

        if (! array_key_exists($normalized, self::LOCATION_CLUSTER_MAP)) {
            return null;
        }

        return self::LOCATION_CLUSTER_MAP[$normalized];
    }

    /**
     * Resolve cluster booking dari kombinasi from + to + routeVia.
     *
     * Behavior:
     *   - Kalau salah satu sisi punya cluster fixed (non-HUB) → return cluster itu
     *   - Kalau dua-duanya HUB → InvalidArgumentException (impossible: PKB→PKB)
     *   - Kalau dua-duanya ambigu/null → return $routeVia (BANGKINANG fallback kalau invalid)
     *   - Kalau dua-duanya fixed berbeda (mis. Aliantan + Petapahan) → throw ForbiddenRouteException
     *     (caller idealnya sudah catch di isForbiddenRoute, tapi defense)
     *
     * @throws InvalidArgumentException PKB→PKB
     * @throws ForbiddenRouteException Mixed fixed clusters
     */
    public function resolveBookingCluster(
        string $fromCity,
        string $toCity,
        ?string $routeVia,
    ): string {
        $fromCluster = $this->clusterForLocation($fromCity);
        $toCluster = $this->clusterForLocation($toCity);

        // Edge: PKB ↔ PKB impossible
        if ($fromCluster === self::CLUSTER_HUB && $toCluster === self::CLUSTER_HUB) {
            throw new InvalidArgumentException(
                sprintf('from=%s, to=%s: kota asal sama dengan tujuan', $fromCity, $toCity),
            );
        }

        // Defense: kalau dua-duanya cluster fixed berbeda (bukan HUB) → forbidden
        if (
            $fromCluster !== null && $toCluster !== null
            && $fromCluster !== self::CLUSTER_HUB && $toCluster !== self::CLUSTER_HUB
            && $fromCluster !== $toCluster
        ) {
            throw new ForbiddenRouteException(
                fromCity: $fromCity,
                toCity: $toCity,
            );
        }

        // Pick non-HUB cluster kalau ada (HUB transparan, just connector)
        foreach ([$fromCluster, $toCluster] as $cluster) {
            if ($cluster !== null && $cluster !== self::CLUSTER_HUB) {
                return $cluster;
            }
        }

        // Both ambigu/null OR one HUB + one ambigu → cluster ditentukan routeVia.
        $normalized = strtoupper(trim((string) $routeVia));

        return in_array($normalized, [self::CLUSTER_BANGKINANG, self::CLUSTER_PETAPAHAN], true)
            ? $normalized
            : self::CLUSTER_BANGKINANG;
    }

    /**
     * Cek apakah pair (from, to) ada di forbidden list.
     * Bidirectional via sort.
     */
    public function isForbiddenRoute(string $fromCity, string $toCity): bool
    {
        $pair = [trim($fromCity), trim($toCity)];
        sort($pair);

        foreach (self::FORBIDDEN_PAIRS as $forbidden) {
            $sortedForbidden = $forbidden;
            sort($sortedForbidden);

            if ($pair === $sortedForbidden) {
                return true;
            }
        }

        return false;
    }

    /**
     * Helper untuk caller validation: cek apakah cluster booking baru compatible
     * dengan existing clusters di slot armada.
     *
     * Rules:
     *   - HUB-only existing → auto-allow (HUB fleksibel)
     *   - Existing cluster sama dengan baru → OK
     *   - Existing cluster beda dengan baru → CONFLICT
     *
     * @param  array<int, string>  $existingClusters Resolved clusters dari booking existing
     */
    public function isClusterCompatible(array $existingClusters, string $newCluster): bool
    {
        foreach ($existingClusters as $existing) {
            // HUB transparan, tidak commit slot ke jalur tertentu
            if ($existing === self::CLUSTER_HUB) {
                continue;
            }

            if ($existing !== $newCluster) {
                return false;
            }
        }

        return true;
    }
}
