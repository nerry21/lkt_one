<?php

namespace Tests\Unit\Services;

use App\Services\RouteSequenceService;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

/**
 * Sesi 47 Fix #4 — Test RouteSequenceService.
 *
 * Cover:
 * - getIndex() untuk semua titik kedua cluster
 * - resolveDirection() forward (to_pkb) skenario
 * - resolveDirection() backward (from_pkb) skenario — INCLUDING bug Nerry
 * - resolveDirection() fallback untuk city tidak di sequence
 * - getBookingRange() normalize ascending
 * - Cluster mismatch (PETAPAHAN sequence cari Bangkinang)
 */
class RouteSequenceServiceTest extends TestCase
{
    private RouteSequenceService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new RouteSequenceService();
    }

    #[Test]
    public function get_index_returns_correct_value_for_bangkinang_cluster(): void
    {
        $this->assertSame(0, $this->service->getIndex('BANGKINANG', 'SKPD'));
        $this->assertSame(7, $this->service->getIndex('BANGKINANG', 'Rambah Samo'));
        $this->assertSame(11, $this->service->getIndex('BANGKINANG', 'Tandun'));
        $this->assertSame(13, $this->service->getIndex('BANGKINANG', 'Kabun'));
        $this->assertSame(16, $this->service->getIndex('BANGKINANG', 'Bangkinang'));
        $this->assertSame(17, $this->service->getIndex('BANGKINANG', 'Pekanbaru'));
    }

    #[Test]
    public function get_index_returns_correct_value_for_petapahan_cluster(): void
    {
        $this->assertSame(0, $this->service->getIndex('PETAPAHAN', 'SKPD'));
        $this->assertSame(11, $this->service->getIndex('PETAPAHAN', 'Tandun'));
        $this->assertSame(14, $this->service->getIndex('PETAPAHAN', 'Petapahan'));
        $this->assertSame(12, $this->service->getIndex('PETAPAHAN', 'Suram'));
        $this->assertSame(15, $this->service->getIndex('PETAPAHAN', 'Pekanbaru'));
    }

    #[Test]
    public function get_index_returns_null_for_city_not_in_cluster(): void
    {
        // Bangkinang tidak ada di cluster PETAPAHAN
        $this->assertNull($this->service->getIndex('PETAPAHAN', 'Bangkinang'));
        // Petapahan tidak ada di cluster BANGKINANG
        $this->assertNull($this->service->getIndex('BANGKINANG', 'Petapahan'));
    }

    #[Test]
    public function get_index_returns_null_for_unknown_city(): void
    {
        $this->assertNull($this->service->getIndex('BANGKINANG', 'Jakarta'));
    }

    #[Test]
    public function get_index_returns_null_for_invalid_cluster(): void
    {
        $this->assertNull($this->service->getIndex('INVALID', 'SKPD'));
    }

    #[Test]
    public function resolve_direction_forward_to_pkb(): void
    {
        // SKPD (0) → Pekanbaru (17): to_pkb
        $this->assertSame('to_pkb', $this->service->resolveDirection('BANGKINANG', 'SKPD', 'Pekanbaru'));
        // SKPD (0) → Kabun (13): to_pkb
        $this->assertSame('to_pkb', $this->service->resolveDirection('BANGKINANG', 'SKPD', 'Kabun'));
        // Tandun (11) → Bangkinang (16): to_pkb
        $this->assertSame('to_pkb', $this->service->resolveDirection('BANGKINANG', 'Tandun', 'Bangkinang'));
    }

    #[Test]
    public function resolve_direction_backward_from_pkb(): void
    {
        // Pekanbaru (17) → SKPD (0): from_pkb
        $this->assertSame('from_pkb', $this->service->resolveDirection('BANGKINANG', 'Pekanbaru', 'SKPD'));
        // Bangkinang (16) → Kabun (13): from_pkb (BUG NERRY FIX)
        $this->assertSame('from_pkb', $this->service->resolveDirection('BANGKINANG', 'Bangkinang', 'Kabun'));
        // Suram (12) → Tandun (11) di PETAPAHAN: from_pkb
        $this->assertSame('from_pkb', $this->service->resolveDirection('PETAPAHAN', 'Suram', 'Tandun'));
    }

    #[Test]
    public function resolve_direction_fallback_for_city_not_in_sequence(): void
    {
        // Jakarta tidak ada → fallback logic lama
        $this->assertSame('to_pkb', $this->service->resolveDirection('BANGKINANG', 'Jakarta', 'Pekanbaru'));
        $this->assertSame('from_pkb', $this->service->resolveDirection('BANGKINANG', 'Pekanbaru', 'Jakarta'));
        // Both unknown → default to_pkb
        $this->assertSame('to_pkb', $this->service->resolveDirection('BANGKINANG', 'Jakarta', 'Bandung'));
    }

    #[Test]
    public function resolve_direction_for_petapahan_cluster(): void
    {
        // Petapahan (14) → Pekanbaru (15): to_pkb
        $this->assertSame('to_pkb', $this->service->resolveDirection('PETAPAHAN', 'Petapahan', 'Pekanbaru'));
        // Pekanbaru (15) → Suram (12): from_pkb
        $this->assertSame('from_pkb', $this->service->resolveDirection('PETAPAHAN', 'Pekanbaru', 'Suram'));
    }

    #[Test]
    public function get_booking_range_normalize_ascending(): void
    {
        // SKPD → Kabun: [0, 13]
        $this->assertSame([0, 13], $this->service->getBookingRange('BANGKINANG', 'SKPD', 'Kabun'));
        // Kabun → SKPD (reverse): [0, 13] (normalized)
        $this->assertSame([0, 13], $this->service->getBookingRange('BANGKINANG', 'Kabun', 'SKPD'));
        // Bangkinang → Aliantan: [12, 16] (normalized)
        $this->assertSame([12, 16], $this->service->getBookingRange('BANGKINANG', 'Bangkinang', 'Aliantan'));
    }

    #[Test]
    public function get_booking_range_returns_nulls_for_invalid(): void
    {
        $this->assertSame([null, null], $this->service->getBookingRange('BANGKINANG', 'Jakarta', 'Bandung'));
        $this->assertSame([null, null], $this->service->getBookingRange('PETAPAHAN', 'Bangkinang', 'Pekanbaru'));
    }

    #[Test]
    public function clusters_returns_both_valid_clusters(): void
    {
        $clusters = $this->service->clusters();
        $this->assertCount(2, $clusters);
        $this->assertContains('BANGKINANG', $clusters);
        $this->assertContains('PETAPAHAN', $clusters);
    }

    #[Test]
    public function bangkinang_sequence_has_18_points(): void
    {
        // Verify sequence integrity
        $this->assertCount(18, RouteSequenceService::SEQUENCES['BANGKINANG']);
    }

    #[Test]
    public function petapahan_sequence_has_16_points(): void
    {
        $this->assertCount(16, RouteSequenceService::SEQUENCES['PETAPAHAN']);
    }

    /**
     * Sesi 48 PR #1 — bookingsOverlap() test helper.
     */
    private function makeBooking(string $cluster, string $from, string $to, string $direction): \App\Models\Booking
    {
        $b = new \App\Models\Booking();
        $b->route_via = $cluster;
        $b->from_city = $from;
        $b->to_city = $to;
        $b->direction = $direction;

        return $b;
    }

    #[Test]
    public function overlap_returns_false_when_clusters_differ(): void
    {
        $a = $this->makeBooking('BANGKINANG', 'SKPD', 'Pekanbaru', 'to_pkb');
        $b = $this->makeBooking('PETAPAHAN', 'SKPD', 'Pekanbaru', 'to_pkb');

        $this->assertFalse($this->service->bookingsOverlap($a, $b));
    }

    #[Test]
    public function overlap_returns_false_when_directions_differ(): void
    {
        $a = $this->makeBooking('BANGKINANG', 'SKPD', 'Pekanbaru', 'to_pkb');
        $b = $this->makeBooking('BANGKINANG', 'Pekanbaru', 'SKPD', 'from_pkb');

        $this->assertFalse($this->service->bookingsOverlap($a, $b));
    }

    #[Test]
    public function overlap_returns_false_for_disjoint_ranges_skpd_aliantan_vs_kabun_pekanbaru(): void
    {
        // SKPD→Aliantan [0,12] vs Kabun→Pekanbaru [13,17]
        // max(0,13)=13, min(12,17)=12 → 13<12=false
        $a = $this->makeBooking('BANGKINANG', 'SKPD', 'Aliantan', 'to_pkb');
        $b = $this->makeBooking('BANGKINANG', 'Kabun', 'Pekanbaru', 'to_pkb');

        $this->assertFalse($this->service->bookingsOverlap($a, $b));
    }

    #[Test]
    public function overlap_returns_false_when_ranges_touch_at_dropoff_point(): void
    {
        // SKPD→Aliantan [0,12] vs Aliantan→Pekanbaru [12,17]
        // max(0,12)=12, min(12,17)=12 → 12<12=false (drop-off point dianggap kursi kosong)
        $a = $this->makeBooking('BANGKINANG', 'SKPD', 'Aliantan', 'to_pkb');
        $b = $this->makeBooking('BANGKINANG', 'Aliantan', 'Pekanbaru', 'to_pkb');

        $this->assertFalse($this->service->bookingsOverlap($a, $b));
    }

    #[Test]
    public function overlap_returns_true_for_partial_overlap_tandun_aliantan_vs_skpd_kabun(): void
    {
        // Tandun→Aliantan [11,12] vs SKPD→Kabun [0,13]
        // max(0,11)=11, min(13,12)=12 → 11<12=true
        $a = $this->makeBooking('BANGKINANG', 'Tandun', 'Aliantan', 'to_pkb');
        $b = $this->makeBooking('BANGKINANG', 'SKPD', 'Kabun', 'to_pkb');

        $this->assertTrue($this->service->bookingsOverlap($a, $b));
    }

    #[Test]
    public function overlap_returns_true_when_one_range_contains_the_other(): void
    {
        // SKPD→Pekanbaru [0,17] contains Aliantan→Kabun [12,13]
        // max(0,12)=12, min(17,13)=13 → 12<13=true
        $a = $this->makeBooking('BANGKINANG', 'SKPD', 'Pekanbaru', 'to_pkb');
        $b = $this->makeBooking('BANGKINANG', 'Aliantan', 'Kabun', 'to_pkb');

        $this->assertTrue($this->service->bookingsOverlap($a, $b));
    }

    #[Test]
    public function overlap_returns_true_for_identical_routes(): void
    {
        // Both SKPD→Pekanbaru [0,17]
        // max(0,0)=0, min(17,17)=17 → 0<17=true
        $a = $this->makeBooking('BANGKINANG', 'SKPD', 'Pekanbaru', 'to_pkb');
        $b = $this->makeBooking('BANGKINANG', 'SKPD', 'Pekanbaru', 'to_pkb');

        $this->assertTrue($this->service->bookingsOverlap($a, $b));
    }

    #[Test]
    public function overlap_returns_true_for_reversed_identical_routes_same_direction(): void
    {
        // A: SKPD→Pekanbaru, B: Pekanbaru→SKPD, both direction=to_pkb (sanity check
        // getBookingRange normalize ke [0,17] dua-duanya — overlap tetap true)
        $a = $this->makeBooking('BANGKINANG', 'SKPD', 'Pekanbaru', 'to_pkb');
        $b = $this->makeBooking('BANGKINANG', 'Pekanbaru', 'SKPD', 'to_pkb');

        $this->assertTrue($this->service->bookingsOverlap($a, $b));
    }

    #[Test]
    public function overlap_returns_true_when_invalid_city_in_either_booking_defensive(): void
    {
        // from_city='Jakarta' → getBookingRange null → defensive return true
        $a = $this->makeBooking('BANGKINANG', 'Jakarta', 'Pekanbaru', 'to_pkb');
        $b = $this->makeBooking('BANGKINANG', 'SKPD', 'Pekanbaru', 'to_pkb');

        $this->assertTrue($this->service->bookingsOverlap($a, $b));
    }

    #[Test]
    public function overlap_returns_true_when_cluster_invalid(): void
    {
        // route_via='UNKNOWN' (bukan BKG/PTP) → defensive return true
        $a = $this->makeBooking('UNKNOWN', 'SKPD', 'Pekanbaru', 'to_pkb');
        $b = $this->makeBooking('UNKNOWN', 'SKPD', 'Pekanbaru', 'to_pkb');

        $this->assertTrue($this->service->bookingsOverlap($a, $b));
    }

    #[Test]
    public function overlap_works_for_petapahan_cluster_disjoint(): void
    {
        // SKPD→Suram [0,12] vs Petapahan→Pekanbaru [14,15]
        // max(0,14)=14, min(12,15)=12 → 14<12=false
        $a = $this->makeBooking('PETAPAHAN', 'SKPD', 'Suram', 'to_pkb');
        $b = $this->makeBooking('PETAPAHAN', 'Petapahan', 'Pekanbaru', 'to_pkb');

        $this->assertFalse($this->service->bookingsOverlap($a, $b));
    }

    #[Test]
    public function overlap_works_for_petapahan_cluster_overlap_at_kasikan(): void
    {
        // SKPD→Petapahan [0,14] vs Suram→Pekanbaru [12,15]
        // max(0,12)=12, min(14,15)=14 → 12<14=true
        $a = $this->makeBooking('PETAPAHAN', 'SKPD', 'Petapahan', 'to_pkb');
        $b = $this->makeBooking('PETAPAHAN', 'Suram', 'Pekanbaru', 'to_pkb');

        $this->assertTrue($this->service->bookingsOverlap($a, $b));
    }
}
