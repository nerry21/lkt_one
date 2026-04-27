<?php

namespace App\Services;

/**
 * Sesi 47 Fix #4 — Route Sequence Service untuk JET Travel.
 *
 * Service ini define rute fisik mobil JET sebagai sequence ordered titik
 * pickup/dropoff, untuk 2 cluster: BANGKINANG (18 titik) dan PETAPAHAN (16 titik).
 *
 * Common prefix 12 titik (SKPD → Tandun) — kedua cluster identik dari Loket Rokan
 * Hulu sampai Tandun, lalu divergence:
 *   - BANGKINANG (idx 12-17): Silam → Aliantan → Kabun → Kuok → Bangkinang → Pekanbaru
 *   - PETAPAHAN  (idx 12-15): Petapahan → Kasikan → Suram → Pekanbaru
 *
 * Direction Logic:
 *   - to_pkb   = MAJU = "ke Pekanbaru" (index naik 0 → max)
 *   - from_pkb = BALIK = "pulang dari Pekanbaru" (index turun max → 0)
 *
 * Foundation untuk Sesi 48+ Sub-Route Seat Sharing (overlap detection):
 *   - getBookingRange() already exposed, tinggal add bookingsOverlap() di Sesi 48
 *
 * Stateless, no DB query — pure mapping logic.
 *
 * @see \App\Services\RegularBookingService::resolveDirection() Caller
 * @see \App\Http\Controllers\Api\BookingController::occupiedSeats() Caller
 */
class RouteSequenceService
{
    public const CLUSTER_BANGKINANG = 'BANGKINANG';
    public const CLUSTER_PETAPAHAN = 'PETAPAHAN';

    /**
     * Sequence rute fisik per cluster. Index naik = arah ke Pekanbaru (to_pkb).
     */
    public const SEQUENCES = [
        self::CLUSTER_BANGKINANG => [
            'SKPD',           // 0
            'Simpang D',      // 1
            'SKPC',           // 2
            'Simpang Kumu',   // 3
            'Muara Rumbai',   // 4
            'Surau Tinggi',   // 5
            'Pasirpengaraian',// 6
            'Rambah Samo',    // 7
            'SKPA',           // 8
            'SKPB',           // 9
            'Ujung Batu',     // 10
            'Tandun',         // 11
            'Silam',          // 12
            'Aliantan',       // 13
            'Kabun',          // 14
            'Kuok',           // 15
            'Bangkinang',     // 16
            'Pekanbaru',      // 17
        ],
        self::CLUSTER_PETAPAHAN => [
            'SKPD',           // 0
            'Simpang D',      // 1
            'SKPC',           // 2
            'Simpang Kumu',   // 3
            'Muara Rumbai',   // 4
            'Surau Tinggi',   // 5
            'Pasirpengaraian',// 6
            'Rambah Samo',    // 7
            'SKPA',           // 8
            'SKPB',           // 9
            'Ujung Batu',     // 10
            'Tandun',         // 11
            'Petapahan',      // 12
            'Kasikan',        // 13
            'Suram',          // 14
            'Pekanbaru',      // 15
        ],
    ];

    /**
     * Get index dari titik di sequence cluster tertentu.
     *
     * @param  string  $cluster  'BANGKINANG' | 'PETAPAHAN'
     * @param  string  $city     Nama lokasi
     * @return int|null          Index 0-17/15, atau null kalau tidak ditemukan
     */
    public function getIndex(string $cluster, string $city): ?int
    {
        $cluster = strtoupper(trim($cluster));
        $sequence = self::SEQUENCES[$cluster] ?? null;

        if ($sequence === null) {
            return null;
        }

        $idx = array_search($city, $sequence, true);

        return $idx === false ? null : $idx;
    }

    /**
     * Resolve direction berdasarkan posisi from/to di sequence.
     *
     * Algoritma:
     *   1. Lookup index from + to di sequence cluster
     *   2. Index naik (from < to) = to_pkb (MAJU ke Pekanbaru)
     *   3. Index turun (from > to) = from_pkb (BALIK pulang dari Pekanbaru)
     *   4. Fallback ke logic lama kalau city tidak di sequence (backward compat)
     *
     * Example:
     *   resolveDirection('BANGKINANG', 'SKPD', 'Kabun')       → 'to_pkb'   (0 < 14)
     *   resolveDirection('BANGKINANG', 'Bangkinang', 'Kabun') → 'from_pkb' (16 > 14)
     *   resolveDirection('PETAPAHAN', 'Suram', 'Pekanbaru')   → 'to_pkb'   (14 < 15)
     *
     * @param  string  $cluster   'BANGKINANG' | 'PETAPAHAN'
     * @param  string  $fromCity  Kota asal
     * @param  string  $toCity    Kota tujuan
     * @return string             'to_pkb' | 'from_pkb'
     */
    public function resolveDirection(string $cluster, string $fromCity, string $toCity): string
    {
        $fromIdx = $this->getIndex($cluster, $fromCity);
        $toIdx = $this->getIndex($cluster, $toCity);

        if ($fromIdx !== null && $toIdx !== null) {
            return $fromIdx < $toIdx ? 'to_pkb' : 'from_pkb';
        }

        // Fallback: backward-compat dengan logic lama untuk rute tidak di sequence
        return match (true) {
            $toCity === 'Pekanbaru' => 'to_pkb',
            $fromCity === 'Pekanbaru' => 'from_pkb',
            default => 'to_pkb',
        };
    }

    /**
     * Get booking range [start, end] normalized ascending dari sequence index.
     * Foundation untuk Sesi 48+ Sub-Route Seat Sharing overlap detection.
     *
     * Example:
     *   getBookingRange('BANGKINANG', 'SKPD', 'Kabun')           → [0, 14]
     *   getBookingRange('BANGKINANG', 'Kabun', 'SKPD')           → [0, 14] (normalized)
     *   getBookingRange('BANGKINANG', 'Bangkinang', 'Aliantan')  → [13, 16] (normalized)
     *
     * @return array{0: int|null, 1: int|null}  [start, end] atau [null, null] kalau invalid
     */
    public function getBookingRange(string $cluster, string $fromCity, string $toCity): array
    {
        $fromIdx = $this->getIndex($cluster, $fromCity);
        $toIdx = $this->getIndex($cluster, $toCity);

        if ($fromIdx === null || $toIdx === null) {
            return [null, null];
        }

        return $fromIdx < $toIdx ? [$fromIdx, $toIdx] : [$toIdx, $fromIdx];
    }

    /**
     * Get list valid clusters yang support service ini.
     *
     * @return array<int, string>
     */
    public function clusters(): array
    {
        return array_keys(self::SEQUENCES);
    }
}
