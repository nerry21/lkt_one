<?php

namespace Tests\Feature\Bookings;

use App\Models\PaymentAccount;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Sesi 44D PR #1D — Feature test admin Reguler booking dashboard:
 *   - Tarif null tidak lagi diblock — admin save dengan price_per_seat=0
 *   - route_via wajib kalau rute ambigu (HUB+ambigu, dua-duanya ambigu)
 *   - route_via optional kalau rute fixed (cluster ter-resolve dari lokasi)
 *   - Backend permissive untuk payment status Dibayar tarif Rp 0
 *     (warning hanya di JS frontend)
 */
class RegularBookingRouteViaValidationTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['role' => 'Super Admin']);
    }

    private function bookingPayload(array $overrides = []): array
    {
        $transferAccount = PaymentAccount::query()
            ->where('channel_type', 'transfer')
            ->orderBy('sort_order')
            ->first();

        return array_merge([
            'booking_for' => 'Untuk Diri Sendiri',
            'category' => 'Reguler',
            'from_city' => 'Aliantan',
            'to_city' => 'Pekanbaru',
            'trip_date' => now()->addDay()->toDateString(),
            'trip_time' => '07:00',
            'passenger_count' => 1,
            'driver_name' => '',
            'pickup_location' => 'Jl. Aliantan Test 123 Pekanbaru',
            'dropoff_location' => 'Jl. Pekanbaru Test 456 Pekanbaru',
            'selected_seats' => ['1A'],
            'passengers' => [[
                'seat_no' => '1A',
                'name' => 'Budi Santoso',
                'phone' => '081234567890',
            ]],
            'payment_method' => '',
            'payment_status' => 'Belum Bayar',
            'booking_status' => 'Draft',
            'bank_account_code' => $transferAccount?->code ?? '',
            'notes' => '',
            'route_via' => 'BANGKINANG',
        ], $overrides);
    }

    public function test_save_booking_dengan_tarif_null_diizinkan_admin(): void
    {
        // Pasir↔Silam: Pasir ambigu, Silam BANGKINANG fixed → cluster resolve
        // dari Silam, route_via tidak wajib. Tarif tidak terdaftar di matrix
        // → simpan dengan price_per_seat=0 (banner UI sudah notify admin).
        $payload = $this->bookingPayload([
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Silam',
            'pickup_location' => 'Jl. Pasir Test 12 Pasirpengaraian',
            'dropoff_location' => 'Jl. Silam Test 34 Silam',
            'route_via' => 'BANGKINANG',
        ]);

        $response = $this->actingAs($this->admin())->postJson('/api/bookings', $payload);

        $response->assertCreated();
        $this->assertDatabaseHas('bookings', [
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Silam',
            'price_per_seat' => 0,
        ]);
    }

    public function test_save_booking_route_via_kosong_kalau_ambigu_ditolak(): void
    {
        // Pasir↔PKB: Pasir ambigu + PKB HUB → route_via wajib dipilih.
        $payload = $this->bookingPayload([
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Pekanbaru',
            'pickup_location' => 'Jl. Pasir Test 12 Pasirpengaraian',
            'dropoff_location' => 'Jl. Pekanbaru Test 99 Pekanbaru',
            'route_via' => '',
        ]);

        $this->actingAs($this->admin())
            ->postJson('/api/bookings', $payload)
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'route_via' => 'Jalur mobil wajib dipilih untuk rute ini.',
            ]);
    }

    public function test_save_booking_route_via_kosong_kalau_fixed_diterima(): void
    {
        // Aliantan↔PKB: Aliantan BANGKINANG fixed + PKB HUB → cluster
        // ter-resolve dari Aliantan, route_via tidak wajib (auto-resolve).
        $payload = $this->bookingPayload([
            'from_city' => 'Aliantan',
            'to_city' => 'Pekanbaru',
            'route_via' => '',
        ]);

        $this->actingAs($this->admin())
            ->postJson('/api/bookings', $payload)
            ->assertCreated();
    }

    public function test_payment_transition_dibayar_tarif_rp0_tidak_diblock_backend(): void
    {
        // Backend permissive: payment_status=Dibayar Tunai dengan tarif Rp 0
        // tidak diblock di server. Warning dialog hanya di JS frontend.
        $payload = $this->bookingPayload([
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Silam',
            'pickup_location' => 'Jl. Pasir Test 12 Pasirpengaraian',
            'dropoff_location' => 'Jl. Silam Test 34 Silam',
            'route_via' => 'BANGKINANG',
            'payment_method' => 'cash',
            'payment_status' => 'Dibayar Tunai',
            'booking_status' => 'Diproses',
        ]);

        $response = $this->actingAs($this->admin())->postJson('/api/bookings', $payload);

        $response->assertCreated();
        $this->assertDatabaseHas('bookings', [
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Silam',
            'price_per_seat' => 0,
            'payment_status' => 'Dibayar Tunai',
        ]);
    }

    public function test_save_booking_forbidden_route_ditolak(): void
    {
        // Aliantan (BANGKINANG fixed) ↔ Petapahan (PETAPAHAN fixed) → forbidden.
        $payload = $this->bookingPayload([
            'from_city' => 'Aliantan',
            'to_city' => 'Petapahan',
            'pickup_location' => 'Jl. Aliantan Test 12 Aliantan',
            'dropoff_location' => 'Jl. Petapahan Test 34 Petapahan',
            'route_via' => 'BANGKINANG',
        ]);

        $this->actingAs($this->admin())
            ->postJson('/api/bookings', $payload)
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'to_city' => 'Rute Aliantan ↔ Petapahan tidak tersedia karena cabang fisik berbeda.',
            ]);
    }
}
