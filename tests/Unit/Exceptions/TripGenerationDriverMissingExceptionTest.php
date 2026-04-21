<?php

namespace Tests\Unit\Exceptions;

use App\Exceptions\TripGenerationDriverMissingException;
use RuntimeException;
use Tests\TestCase;

/**
 * Test TripGenerationDriverMissingException — thrown saat driver assignment
 * mapping tidak lengkap untuk mobil aktif (DP-B a forward case strict).
 *
 * Sibling pattern: Tests\Unit\Exceptions\TripSlotConflictExceptionTest.
 * Reference: docs/trip-planning-design.md §5.3.
 */
class TripGenerationDriverMissingExceptionTest extends TestCase
{
    public function test_constructor_stores_missing_mobil_ids_array(): void
    {
        $ids = ['uuid-mobil-1', 'uuid-mobil-2'];
        $e = new TripGenerationDriverMissingException($ids);

        $this->assertSame($ids, $e->missingMobilIds);
    }

    public function test_message_includes_count_and_ids(): void
    {
        $ids = ['uuid-mobil-1', 'uuid-mobil-2'];
        $e = new TripGenerationDriverMissingException($ids);

        $this->assertStringContainsString('2 active mobil', $e->getMessage());
        $this->assertStringContainsString('uuid-mobil-1', $e->getMessage());
        $this->assertStringContainsString('uuid-mobil-2', $e->getMessage());
    }

    public function test_status_code_is_422(): void
    {
        $e = new TripGenerationDriverMissingException(['uuid-mobil-1']);

        $this->assertSame(422, $e->getStatusCode());
    }

    public function test_extends_runtime_exception(): void
    {
        $e = new TripGenerationDriverMissingException([]);

        $this->assertInstanceOf(RuntimeException::class, $e);
    }
}
