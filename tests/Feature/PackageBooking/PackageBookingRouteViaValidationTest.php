<?php

namespace Tests\Feature\PackageBooking;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Sesi 44D PR #1D — Feature test customer Package booking wizard step 1
 * (Informasi Pengiriman):
 *   - route_via wajib kalau rute ambigu (HUB+ambigu, dua-duanya ambigu)
 *   - route_via optional kalau rute fixed (auto-resolve dari lokasi)
 *   - Forbidden route check ditolak
 */
class PackageBookingRouteViaValidationTest extends TestCase
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
            'departure_time' => '07:00',
            'pickup_city' => 'Aliantan',
            'destination_city' => 'Pekanbaru',
            'sender_name' => 'Pengirim Default',
            'sender_phone' => '081234567890',
            'sender_address' => 'Jl. Pengirim 123 Aliantan',
            'recipient_name' => 'Penerima Default',
            'recipient_phone' => '081234567891',
            'recipient_address' => 'Jl. Penerima 456 Pekanbaru',
            'item_name' => 'Dokumen',
            'item_qty' => 1,
            'fare_amount' => 50000,
            'additional_fare' => 0,
            'route_via' => 'BANGKINANG',
        ], $overrides);
    }

    public function test_information_store_route_via_wajib_kalau_ambigu(): void
    {
        // Pasir↔PKB: Pasir ambigu + PKB HUB → route_via wajib dipilih.
        $payload = $this->infoPayload([
            'pickup_city' => 'Pasirpengaraian',
            'destination_city' => 'Pekanbaru',
            'sender_address' => 'Jl. Pasir Permai 12',
            'recipient_address' => 'Jl. Pekanbaru 34',
            'route_via' => '',
        ]);

        $this->from('/dashboard/package-bookings')
            ->actingAs($this->customer())
            ->post('/dashboard/package-bookings/information', $payload)
            ->assertRedirect('/dashboard/package-bookings')
            ->assertSessionHasErrors([
                'route_via' => 'Jalur mobil wajib dipilih untuk rute ini.',
            ]);
    }

    public function test_information_store_forbidden_route_ditolak(): void
    {
        // Aliantan (BANGKINANG fixed) ↔ Petapahan (PETAPAHAN fixed) → forbidden.
        $payload = $this->infoPayload([
            'pickup_city' => 'Aliantan',
            'destination_city' => 'Petapahan',
            'sender_address' => 'Jl. Aliantan 12',
            'recipient_address' => 'Jl. Petapahan 34',
            'route_via' => 'BANGKINANG',
        ]);

        $this->from('/dashboard/package-bookings')
            ->actingAs($this->customer())
            ->post('/dashboard/package-bookings/information', $payload)
            ->assertRedirect('/dashboard/package-bookings')
            ->assertSessionHasErrors([
                'destination_city' => 'Rute Aliantan ↔ Petapahan tidak tersedia karena cabang fisik berbeda.',
            ]);
    }

    public function test_information_store_route_via_diterima_kalau_fixed(): void
    {
        // Aliantan↔PKB: Aliantan BANGKINANG fixed + PKB HUB → cluster
        // ter-resolve dari Aliantan, route_via tidak wajib (auto-resolve).
        $payload = $this->infoPayload([
            'pickup_city' => 'Aliantan',
            'destination_city' => 'Pekanbaru',
            'route_via' => '',
        ]);

        $this->actingAs($this->customer())
            ->post('/dashboard/package-bookings/information', $payload)
            ->assertRedirect('/dashboard/package-bookings/package');
    }

    public function test_information_store_route_via_propagated_ke_draft(): void
    {
        // Verify route_via dari payload tersimpan di session draft supaya
        // persistence layer bisa baca dari reviewState['route_via'].
        $payload = $this->infoPayload([
            'pickup_city' => 'Pasirpengaraian',
            'destination_city' => 'Silam',
            'sender_address' => 'Jl. Pasir Permai 12',
            'recipient_address' => 'Jl. Silam Indah 34',
            'route_via' => 'BANGKINANG',
        ]);

        $this->actingAs($this->customer())
            ->post('/dashboard/package-bookings/information', $payload)
            ->assertRedirect('/dashboard/package-bookings/package')
            ->assertSessionHas('package_booking.information.route_via', 'BANGKINANG');
    }
}
