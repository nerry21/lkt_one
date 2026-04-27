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
        $this->assertSame(14, $this->service->getIndex('BANGKINANG', 'Kabun'));
        $this->assertSame(16, $this->service->getIndex('BANGKINANG', 'Bangkinang'));
        $this->assertSame(17, $this->service->getIndex('BANGKINANG', 'Pekanbaru'));
    }

    #[Test]
    public function get_index_returns_correct_value_for_petapahan_cluster(): void
    {
        $this->assertSame(0, $this->service->getIndex('PETAPAHAN', 'SKPD'));
        $this->assertSame(11, $this->service->getIndex('PETAPAHAN', 'Tandun'));
        $this->assertSame(12, $this->service->getIndex('PETAPAHAN', 'Petapahan'));
        $this->assertSame(14, $this->service->getIndex('PETAPAHAN', 'Suram'));
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
        // SKPD (0) → Kabun (14): to_pkb
        $this->assertSame('to_pkb', $this->service->resolveDirection('BANGKINANG', 'SKPD', 'Kabun'));
        // Tandun (11) → Bangkinang (16): to_pkb
        $this->assertSame('to_pkb', $this->service->resolveDirection('BANGKINANG', 'Tandun', 'Bangkinang'));
    }

    #[Test]
    public function resolve_direction_backward_from_pkb(): void
    {
        // Pekanbaru (17) → SKPD (0): from_pkb
        $this->assertSame('from_pkb', $this->service->resolveDirection('BANGKINANG', 'Pekanbaru', 'SKPD'));
        // Bangkinang (16) → Kabun (14): from_pkb (BUG NERRY FIX)
        $this->assertSame('from_pkb', $this->service->resolveDirection('BANGKINANG', 'Bangkinang', 'Kabun'));
        // Suram (14) → Tandun (11) di PETAPAHAN: from_pkb
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
        // Petapahan (12) → Pekanbaru (15): to_pkb
        $this->assertSame('to_pkb', $this->service->resolveDirection('PETAPAHAN', 'Petapahan', 'Pekanbaru'));
        // Pekanbaru (15) → Suram (14): from_pkb
        $this->assertSame('from_pkb', $this->service->resolveDirection('PETAPAHAN', 'Pekanbaru', 'Suram'));
    }

    #[Test]
    public function get_booking_range_normalize_ascending(): void
    {
        // SKPD → Kabun: [0, 14]
        $this->assertSame([0, 14], $this->service->getBookingRange('BANGKINANG', 'SKPD', 'Kabun'));
        // Kabun → SKPD (reverse): [0, 14] (normalized)
        $this->assertSame([0, 14], $this->service->getBookingRange('BANGKINANG', 'Kabun', 'SKPD'));
        // Bangkinang → Aliantan: [13, 16] (normalized)
        $this->assertSame([13, 16], $this->service->getBookingRange('BANGKINANG', 'Bangkinang', 'Aliantan'));
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
}
