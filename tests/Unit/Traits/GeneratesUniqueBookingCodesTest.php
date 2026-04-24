<?php

namespace Tests\Unit\Traits;

use App\Models\Booking;
use App\Models\BookingPassenger;
use App\Traits\GeneratesUniqueBookingCodes;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Unit test coverage App\Traits\GeneratesUniqueBookingCodes (bug #36).
 *
 * Trait konsolidasi 15 helper duplikat `do { Str::random() } while (exists())`
 * lintas 4 persistence service + BookingManagementService. Test via anonymous
 * class fixture supaya trait bisa di-exercise tanpa instantiate service
 * concrete (service constructor butuh banyak dependency DI).
 */
class GeneratesUniqueBookingCodesTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Fixture: anonymous class yang pakai trait + expose protected method
     * sebagai public untuk invocation dari test.
     */
    private function newFixture(): object
    {
        return new class {
            use GeneratesUniqueBookingCodes;

            public function callGenerate(
                string $modelClass,
                string $column,
                string $prefix,
                int $randomLength = 4,
                int $maxAttempts = 3,
            ): string {
                return $this->generateUniqueBookingCode($modelClass, $column, $prefix, $randomLength, $maxAttempts);
            }
        };
    }

    public function test_generates_code_with_correct_format_and_prefix(): void
    {
        $fixture = $this->newFixture();
        $code = $fixture->callGenerate(Booking::class, 'booking_code', 'RBK', 4);

        $this->assertMatchesRegularExpression('/^RBK-\d{6}-[A-Z0-9]{4}$/', $code);
    }

    public function test_generates_unique_code_when_existing_row_present(): void
    {
        // Seed booking dengan known code; trait Str::random() non-deterministic,
        // jadi kita assert generated code != existing + masih valid format.
        $existing = Booking::factory()->create(['booking_code' => 'RBK-260424-EXIS']);

        $fixture = $this->newFixture();
        $code = $fixture->callGenerate(Booking::class, 'booking_code', 'RBK', 4);

        $this->assertNotSame($existing->booking_code, $code);
        $this->assertMatchesRegularExpression('/^RBK-\d{6}-[A-Z0-9]{4}$/', $code);
    }

    public function test_honors_random_length_parameter(): void
    {
        $fixture = $this->newFixture();
        $code4 = $fixture->callGenerate(Booking::class, 'booking_code', 'RBK', 4);
        $code6 = $fixture->callGenerate(Booking::class, 'qr_token', 'QRT', 6);

        $suffix4 = substr($code4, strrpos($code4, '-') + 1);
        $suffix6 = substr($code6, strrpos($code6, '-') + 1);

        $this->assertSame(4, strlen($suffix4));
        $this->assertSame(6, strlen($suffix6));
    }

    public function test_works_for_booking_passenger_model(): void
    {
        $fixture = $this->newFixture();
        $code = $fixture->callGenerate(BookingPassenger::class, 'qr_token', 'PQR', 6);

        $this->assertMatchesRegularExpression('/^PQR-\d{6}-[A-Z0-9]{6}$/', $code);
    }
}
