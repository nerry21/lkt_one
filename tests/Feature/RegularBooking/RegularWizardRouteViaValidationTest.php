<?php

namespace Tests\Feature\RegularBooking;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Sesi 44D PR #1D — Feature test customer Regular booking wizard step 1
 * (Informasi Pemesanan):
 *   - Tarif null tidak lagi diblock — draft tersimpan dengan fare_amount=0
 *   - route_via wajib kalau rute ambigu
 *   - Forbidden route check tetap ditolak
 */
class RegularWizardRouteViaValidationTest extends TestCase
{
    use RefreshDatabase;

    private function customer(): User
    {
        return User::factory()->create();
    }

    private function infoPayload(array $overrides = []): array
    {
        return array_merge([
            'trip_date' => now()->addDay()->toDateString(),
            'booking_type' => 'self',
            'pickup_location' => 'Aliantan',
            'destination_location' => 'Pekanbaru',
            'departure_time' => '07:00',
            'passenger_count' => 1,
            'pickup_address' => 'Jl. Aliantan Test 12 Aliantan',
            'dropoff_address' => 'Jl. Pekanbaru Test 34 Pekanbaru',
            'additional_fare_per_passenger' => 0,
            'route_via' => 'BANGKINANG',
        ], $overrides);
    }

    public function test_information_store_dengan_tarif_null_diizinkan(): void
    {
        // Pasir↔Silam: Pasir ambigu, Silam BANGKINANG fixed → cluster ter-resolve
        // dari Silam, route_via tidak wajib. Tarif tidak terdaftar di matrix
        // → draft tersimpan dengan fare_amount=0 dan customer lanjut ke seats.
        $payload = $this->infoPayload([
            'pickup_location' => 'Pasirpengaraian',
            'destination_location' => 'Silam',
            'pickup_address' => 'Jl. Pasir Permai Nomor 12',
            'dropoff_address' => 'Jl. Silam Indah Nomor 34',
            'route_via' => 'BANGKINANG',
        ]);

        $this->actingAs($this->customer())
            ->post('/dashboard/regular-bookings/information', $payload)
            ->assertRedirect('/dashboard/regular-bookings/seats')
            ->assertSessionHas('regular_booking.information.fare_amount', 0)
            ->assertSessionHas('regular_booking.information.pickup_location', 'Pasirpengaraian');
    }

    public function test_information_store_route_via_wajib_kalau_ambigu(): void
    {
        // Pasir↔PKB: Pasir ambigu + PKB HUB → route_via wajib dipilih.
        $payload = $this->infoPayload([
            'pickup_location' => 'Pasirpengaraian',
            'destination_location' => 'Pekanbaru',
            'pickup_address' => 'Jl. Pasir Permai Nomor 12',
            'dropoff_address' => 'Jl. Pekanbaru Test 34',
            'route_via' => '',
        ]);

        $this->from('/dashboard/regular-bookings')
            ->actingAs($this->customer())
            ->post('/dashboard/regular-bookings/information', $payload)
            ->assertRedirect('/dashboard/regular-bookings')
            ->assertSessionHasErrors([
                'route_via' => 'Jalur mobil wajib dipilih untuk rute ini.',
            ]);
    }

    public function test_information_store_forbidden_route_ditolak(): void
    {
        // Aliantan (BANGKINANG fixed) ↔ Petapahan (PETAPAHAN fixed) → forbidden.
        $payload = $this->infoPayload([
            'pickup_location' => 'Aliantan',
            'destination_location' => 'Petapahan',
            'pickup_address' => 'Jl. Aliantan Test 12 Aliantan',
            'dropoff_address' => 'Jl. Petapahan Test 34 Petapahan',
            'route_via' => 'BANGKINANG',
        ]);

        $this->from('/dashboard/regular-bookings')
            ->actingAs($this->customer())
            ->post('/dashboard/regular-bookings/information', $payload)
            ->assertRedirect('/dashboard/regular-bookings')
            ->assertSessionHasErrors([
                'destination_location' => 'Rute Aliantan ↔ Petapahan tidak tersedia karena cabang fisik berbeda.',
            ]);
    }

    public function test_information_store_route_via_diterima_kalau_fixed(): void
    {
        // Aliantan↔PKB: Aliantan BANGKINANG fixed + PKB HUB → cluster
        // ter-resolve dari Aliantan, route_via tidak wajib (auto-resolve).
        $payload = $this->infoPayload([
            'pickup_location' => 'Aliantan',
            'destination_location' => 'Pekanbaru',
            'route_via' => '',
        ]);

        $this->actingAs($this->customer())
            ->post('/dashboard/regular-bookings/information', $payload)
            ->assertRedirect('/dashboard/regular-bookings/seats');
    }
}
