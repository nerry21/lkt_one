<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

/**
 * Web-path optimistic lock coverage untuk Dropping edit paths (bug #38).
 *
 * Sibling untuk BookingVersionConflictHttpTest (4 API paths, bug #30 phase 2).
 * Web form submits via PUT / DELETE dengan @method() spoof, version dikirim
 * sebagai hidden input (update) atau query string ?version=N (destroy).
 *
 * Exception `BookingVersionConflictException` render dual-mode:
 *   - wantsJson() → 409 JSON
 *   - else → redirect()->back()->withErrors(['version' => ...])
 *
 * Cover 4 scenario: PUT stale, PUT happy, DELETE stale, DELETE happy.
 */
class DroppingDataVersionConflictHttpTest extends TestCase
{
    use RefreshDatabase;

    public function test_put_update_returns_redirect_with_error_when_version_stale(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $booking = $this->makeDroppingBooking();
        $staleVersion = $booking->version;

        // Concurrent out-of-band bump.
        DB::table('bookings')->where('id', $booking->id)->update(['version' => 5]);

        $response = $this->actingAs($admin)
            ->from(route('dropping-data.index'))
            ->put('/dashboard/dropping-data/' . $booking->id, $this->basePutPayload([
                'version' => $staleVersion,
                'passenger_name' => 'Nama Baru Attempt',
            ]));

        $response->assertRedirect(route('dropping-data.index'));
        $response->assertSessionHasErrors(['version']);

        // DB-unchanged proof: passenger_name harus tetap original, version stay 5.
        $fresh = $booking->fresh();
        $this->assertNotSame('Nama Baru Attempt', $fresh->passenger_name);
        $this->assertSame(5, $fresh->version);
    }

    public function test_put_update_succeeds_with_matching_version(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $booking = $this->makeDroppingBooking();
        $currentVersion = $booking->version;

        $response = $this->actingAs($admin)
            ->from(route('dropping-data.index'))
            ->put('/dashboard/dropping-data/' . $booking->id, $this->basePutPayload([
                'version' => $currentVersion,
                'passenger_name' => 'Nama Updated',
            ]));

        $response->assertRedirect(route('dropping-data.index'));
        $response->assertSessionHasNoErrors();

        $fresh = $booking->fresh();
        $this->assertSame('Nama Updated', $fresh->passenger_name);
        $this->assertSame($currentVersion + 1, $fresh->version);
    }

    public function test_delete_returns_redirect_with_error_when_version_stale(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $booking = $this->makeDroppingBooking();
        $staleVersion = $booking->version;

        DB::table('bookings')->where('id', $booking->id)->update(['version' => 5]);

        $response = $this->actingAs($admin)
            ->from(route('dropping-data.index'))
            ->delete('/dashboard/dropping-data/' . $booking->id . '?version=' . $staleVersion);

        $response->assertRedirect(route('dropping-data.index'));
        $response->assertSessionHasErrors(['version']);

        // DB-unchanged proof: booking row tetap exists.
        $this->assertDatabaseHas('bookings', ['id' => $booking->id]);
    }

    public function test_delete_succeeds_with_matching_version(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $booking = $this->makeDroppingBooking();
        $currentVersion = $booking->version;

        $response = $this->actingAs($admin)
            ->from(route('dropping-data.index'))
            ->delete('/dashboard/dropping-data/' . $booking->id . '?version=' . $currentVersion);

        $response->assertRedirect(route('dropping-data.index'));
        $response->assertSessionHasNoErrors();

        $this->assertDatabaseMissing('bookings', ['id' => $booking->id]);
    }

    private function makeDroppingBooking(array $overrides = []): Booking
    {
        return Booking::factory()->create(array_merge([
            'category' => 'Dropping',
            'passenger_name' => 'Pak Awal',
            'passenger_phone' => '081234567890',
            'from_city' => 'Pekanbaru',
            'to_city' => 'Pasirpengaraian',
            'pickup_location' => 'Jl. Tuanku Tambusai No. 12 Pekanbaru',
            'dropoff_location' => 'Jl. Sudirman No. 8 Pasirpengaraian',
            'trip_date' => now()->addDay()->toDateString(),
            'trip_time' => '07:00:00',
            'price_per_seat' => 500000,
            'total_amount' => 500000,
            'passenger_count' => 6,
            'selected_seats' => ['1A', '2A', '2B', '3A', '4A', '5A'],
        ], $overrides));
    }

    /**
     * Minimal PUT payload untuk Dropping update — hanya field required dari
     * $request->validate() rules. Override merges last.
     */
    private function basePutPayload(array $overrides = []): array
    {
        return array_merge([
            'passenger_name' => 'Pak Awal',
            'passenger_phone' => '081234567890',
            'from_city' => 'Pekanbaru',
            'to_city' => 'Pasirpengaraian',
            'pickup_location' => 'Jl. Tuanku Tambusai No. 12 Pekanbaru',
            'dropoff_location' => 'Jl. Sudirman No. 8 Pasirpengaraian',
            'price_per_seat' => 500000,
            'additional_fare' => 0,
            'trip_date' => now()->addDay()->toDateString(),
            'trip_time' => '07:00',
            'notes' => null,
            'payment_method' => null,
            'payment_status' => 'Belum Bayar',
            'driver_id' => null,
            'mobil_id' => null,
            'version' => 0,
        ], $overrides);
    }
}
