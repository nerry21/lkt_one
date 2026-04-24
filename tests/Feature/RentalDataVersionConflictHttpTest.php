<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

/**
 * Web-path optimistic lock coverage untuk Rental edit paths (bug #38).
 *
 * Sibling untuk DroppingDataVersionConflictHttpTest + BookingVersionConflictHttpTest.
 * Cover 4 scenario: PUT stale, PUT happy, DELETE stale, DELETE happy.
 */
class RentalDataVersionConflictHttpTest extends TestCase
{
    use RefreshDatabase;

    public function test_put_update_returns_redirect_with_error_when_version_stale(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $booking = $this->makeRentalBooking();
        $staleVersion = $booking->version;

        DB::table('bookings')->where('id', $booking->id)->update(['version' => 5]);

        $response = $this->actingAs($admin)
            ->from(route('rental-data.index'))
            ->put('/dashboard/rental-data/' . $booking->id, $this->basePutPayload([
                'version' => $staleVersion,
                'passenger_name' => 'Nama Baru Attempt',
            ]));

        $response->assertRedirect(route('rental-data.index'));
        $response->assertSessionHasErrors(['version']);

        $fresh = $booking->fresh();
        $this->assertNotSame('Nama Baru Attempt', $fresh->passenger_name);
        $this->assertSame(5, $fresh->version);
    }

    public function test_put_update_succeeds_with_matching_version(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $booking = $this->makeRentalBooking();
        $currentVersion = $booking->version;

        $response = $this->actingAs($admin)
            ->from(route('rental-data.index'))
            ->put('/dashboard/rental-data/' . $booking->id, $this->basePutPayload([
                'version' => $currentVersion,
                'passenger_name' => 'Nama Updated',
            ]));

        $response->assertRedirect(route('rental-data.index'));
        $response->assertSessionHasNoErrors();

        $fresh = $booking->fresh();
        $this->assertSame('Nama Updated', $fresh->passenger_name);
        $this->assertSame($currentVersion + 1, $fresh->version);
    }

    public function test_delete_returns_redirect_with_error_when_version_stale(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $booking = $this->makeRentalBooking();
        $staleVersion = $booking->version;

        DB::table('bookings')->where('id', $booking->id)->update(['version' => 5]);

        $response = $this->actingAs($admin)
            ->from(route('rental-data.index'))
            ->delete('/dashboard/rental-data/' . $booking->id . '?version=' . $staleVersion);

        $response->assertRedirect(route('rental-data.index'));
        $response->assertSessionHasErrors(['version']);

        $this->assertDatabaseHas('bookings', ['id' => $booking->id]);
    }

    public function test_delete_succeeds_with_matching_version(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $booking = $this->makeRentalBooking();
        $currentVersion = $booking->version;

        $response = $this->actingAs($admin)
            ->from(route('rental-data.index'))
            ->delete('/dashboard/rental-data/' . $booking->id . '?version=' . $currentVersion);

        $response->assertRedirect(route('rental-data.index'));
        $response->assertSessionHasNoErrors();

        $this->assertDatabaseMissing('bookings', ['id' => $booking->id]);
    }

    private function makeRentalBooking(array $overrides = []): Booking
    {
        $tripDate = now()->addDay()->toDateString();
        $rentalEnd = now()->addDays(3)->toDateString();

        return Booking::factory()->create(array_merge([
            'category' => 'Rental',
            'passenger_name' => 'Pak Awal',
            'passenger_phone' => '081234567890',
            'from_city' => 'Pekanbaru',
            'to_city' => 'Pasirpengaraian',
            'pickup_location' => 'Jl. Tuanku Tambusai No. 12 Pekanbaru',
            'dropoff_location' => 'Jl. Sudirman No. 8 Pasirpengaraian',
            'trip_date' => $tripDate,
            'rental_end_date' => $rentalEnd,
            'trip_time' => '07:00:00',
            'price_per_seat' => 2000000,
            'total_amount' => 2000000,
            'passenger_count' => 6,
            'selected_seats' => ['1A', '2A', '2B', '3A', '4A', '5A'],
        ], $overrides));
    }

    private function basePutPayload(array $overrides = []): array
    {
        return array_merge([
            'passenger_name' => 'Pak Awal',
            'passenger_phone' => '081234567890',
            'from_city' => 'Pekanbaru',
            'to_city' => 'Pasirpengaraian',
            'pickup_location' => 'Jl. Tuanku Tambusai No. 12 Pekanbaru',
            'dropoff_location' => 'Jl. Sudirman No. 8 Pasirpengaraian',
            'price_per_seat' => 2000000,
            'additional_fare' => 0,
            'trip_date' => now()->addDay()->toDateString(),
            'rental_end_date' => now()->addDays(3)->toDateString(),
            'trip_time' => '07:00',
            'return_trip_time' => null,
            'notes' => null,
            'payment_method' => null,
            'payment_status' => 'Belum Bayar',
            'driver_id' => null,
            'mobil_id' => null,
            'version' => 0,
        ], $overrides);
    }
}
