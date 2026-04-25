<?php

namespace Tests\Unit\Services;

use App\Helpers\KeuanganJetDirectionMapper;
use InvalidArgumentException;
use Tests\TestCase;

class KeuanganJetDirectionMapperTest extends TestCase
{
    public function test_rohul_to_pkb_maps_to_keberangkatan(): void
    {
        $this->assertSame('Keberangkatan', KeuanganJetDirectionMapper::fromTripDirection('ROHUL_TO_PKB'));
    }

    public function test_pkb_to_rohul_maps_to_kepulangan(): void
    {
        $this->assertSame('Kepulangan', KeuanganJetDirectionMapper::fromTripDirection('PKB_TO_ROHUL'));
    }

    public function test_invalid_direction_throws(): void
    {
        $this->expectException(InvalidArgumentException::class);
        KeuanganJetDirectionMapper::fromTripDirection('INVALID');
    }

    public function test_is_kepulangan_helper(): void
    {
        $this->assertTrue(KeuanganJetDirectionMapper::isKepulangan('PKB_TO_ROHUL'));
        $this->assertFalse(KeuanganJetDirectionMapper::isKepulangan('ROHUL_TO_PKB'));
        $this->assertTrue(KeuanganJetDirectionMapper::isKeberangkatan('ROHUL_TO_PKB'));
    }
}
