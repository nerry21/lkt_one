<?php

namespace Tests\Unit\Traits;

use App\Traits\NormalizesTripTime;
use Tests\TestCase;

class NormalizesTripTimeTest extends TestCase
{
    private object $subject;

    protected function setUp(): void
    {
        parent::setUp();

        $this->subject = new class {
            use NormalizesTripTime;

            public function normalize(?string $value): string
            {
                return $this->normalizeTripTime($value);
            }
        };
    }

    public function test_empty_string_returns_fallback(): void
    {
        $this->assertSame('00:00:00', $this->subject->normalize(''));
    }

    public function test_null_returns_fallback(): void
    {
        $this->assertSame('00:00:00', $this->subject->normalize(null));
    }

    public function test_whitespace_only_returns_fallback(): void
    {
        $this->assertSame('00:00:00', $this->subject->normalize('   '));
    }

    public function test_length_5_hhmm_appends_seconds(): void
    {
        $this->assertSame('08:00:00', $this->subject->normalize('08:00'));
    }

    public function test_length_8_hhmmss_passes_through(): void
    {
        $this->assertSame('08:00:00', $this->subject->normalize('08:00:00'));
    }

    public function test_padded_hhmm_trimmed_and_normalized(): void
    {
        $this->assertSame('08:00:00', $this->subject->normalize(' 08:00 '));
    }

    public function test_padded_hhmmss_trimmed_and_normalized(): void
    {
        $this->assertSame('08:00:00', $this->subject->normalize(' 08:00:00 '));
    }

    public function test_non_standard_length_passes_through(): void
    {
        // '8:00' length 4, not length 5 — passes through without modification
        $this->assertSame('8:00', $this->subject->normalize('8:00'));
    }

    public function test_length_7_passes_through(): void
    {
        // '8:00:00' length 7 — passes through (not length 5)
        $this->assertSame('8:00:00', $this->subject->normalize('8:00:00'));
    }
}
