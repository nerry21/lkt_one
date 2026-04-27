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
 *   - BANGKINANG (idx 12-17): Aliantan → Kabun → Silam → Kuok → Bangkinang → Pekanbaru
 *   - PETAPAHAN  (idx 12-15): Suram → Kasikan → Petapahan → Pekanbaru
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
            'Aliantan',       // 12
            'Kabun',          // 13
            'Silam',          // 14
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
            'Suram',          // 12
            'Kasikan',        // 13
            'Petapahan',      // 14
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
     *   resolveDirection('BANGKINANG', 'SKPD', 'Kabun')       → 'to_pkb'   (0 < 13)
     *   resolveDirection('BANGKINANG', 'Bangkinang', 'Kabun') → 'from_pkb' (16 > 13)
     *   resolveDirection('PETAPAHAN', 'Suram', 'Pekanbaru')   → 'to_pkb'   (12 < 15)
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
     *   getBookingRange('BANGKINANG', 'SKPD', 'Kabun')           → [0, 13]
     *   getBookingRange('BANGKINANG', 'Kabun', 'SKPD')           → [0, 13] (normalized)
     *   getBookingRange('BANGKINANG', 'Bangkinang', 'Aliantan')  → [12, 16] (normalized)
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
     * Sesi 48 PR #1 — Sub-Route Seat Sharing overlap detection.
     *
     * Dua booking dianggap overlap (kursi tidak bisa di-share) jika SEMUA
     * kondisi berikut terpenuhi:
     *   1. Sama route_via (cluster fisik mobil sama)
     *   2. Sama direction (to_pkb vs from_pkb beda trip)
     *   3. Range index di sequence cluster benar-benar bertabrakan secara fisik
     *
     * Algoritma overlap range klasik: max(startA, startB) < min(endA, endB)
     * Pakai `<` bukan `<=` karena titik drop-off dianggap "kursi sudah kosong"
     * di titik tersebut (penumpang turun, kursi free untuk penumpang naik di
     * titik yang sama).
     *
     * Defensive: kalau salah satu booking punya from/to yang TIDAK ada di
     * sequence cluster (bug data atau lokasi baru belum di-register), return
     * true (anggap konflik) supaya admin manual cek — fail-safe behavior.
     *
     * Example:
     *   Booking A: SKPD → Aliantan (BKG)  → range [0, 12]
     *   Booking B: Kabun → Pekanbaru (BKG) → range [13, 17]
     *   max(0,13)=13, min(12,17)=12 → 13 < 12 = FALSE → NO OVERLAP ✅
     *
     * @return bool true = overlap (kursi tidak bisa share), false = no overlap
     */
    public function bookingsOverlap(\App\Models\Booking $a, \App\Models\Booking $b): bool
    {
        // Early exit 1: Beda cluster → mustahil tabrakan kursi (mobil beda)
        if ($a->route_via !== $b->route_via) {
            return false;
        }

        // Early exit 2: Beda direction → trip beda walau cluster sama
        if ($a->direction !== $b->direction) {
            return false;
        }

        $cluster = $a->route_via;

        // Skip overlap calc kalau cluster invalid (bukan BKG/PTP)
        if (! in_array($cluster, $this->clusters(), true)) {
            return true; // defensive: anggap konflik
        }

        [$aStart, $aEnd] = $this->getBookingRange($cluster, (string) $a->from_city, (string) $a->to_city);
        [$bStart, $bEnd] = $this->getBookingRange($cluster, (string) $b->from_city, (string) $b->to_city);

        // Defensive: salah satu range invalid → anggap konflik
        if ($aStart === null || $bStart === null) {
            return true;
        }

        // Overlap range klasik
        return max($aStart, $bStart) < min($aEnd, $bEnd);
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
