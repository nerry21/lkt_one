<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class Seat2bRoleBasedTest extends TestCase
{
    use RefreshDatabase;

    public function test_non_admin_sees_2b_visible_but_locked_at_picker(): void
    {
        $this->actingAs(User::factory()->create());

        $this->withSession([
            'regular_booking.information' => $this->makeDraft(['passenger_count' => 3]),
        ])->get('/dashboard/regular-bookings/seats')
            ->assertOk()
            ->assertSee('data-seat-code="2B"', false)
            ->assertSee('is-admin-only-locked', false)
            ->assertSee('data-role-level="locked"', false);
    }

    public function test_non_admin_submit_with_2b_rejected_with_role_error(): void
    {
        $this->actingAs(User::factory()->create());

        $this->from('/dashboard/regular-bookings/seats')
            ->withSession([
                'regular_booking.information' => $this->makeDraft(['passenger_count' => 3]),
            ])->post('/dashboard/regular-bookings/seats', [
                'seat_codes' => ['1A', '2B', '3A'],
            ])
            ->assertRedirect('/dashboard/regular-bookings/seats')
            ->assertSessionHasErrors([
                'seat_codes' => 'Kursi 2B hanya dapat dipilih oleh Admin atau Super Admin.',
            ]);
    }

    public function test_admin_can_select_2b_at_passenger_count_below_six(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $this->actingAs($admin);

        $response = $this->withSession([
            'regular_booking.information' => $this->makeDraft(['passenger_count' => 3]),
        ])->post('/dashboard/regular-bookings/seats', [
            'seat_codes' => ['1A', '2A', '2B'],
        ]);

        $response->assertRedirect('/dashboard/regular-bookings/passengers');
        $response->assertSessionHasNoErrors();
    }

    public function test_super_admin_can_select_2b_at_passenger_count_two(): void
    {
        $superAdmin = User::factory()->create(['role' => 'Super Admin']);
        $this->actingAs($superAdmin);

        $response = $this->withSession([
            'regular_booking.information' => $this->makeDraft(['passenger_count' => 2]),
        ])->post('/dashboard/regular-bookings/seats', [
            'seat_codes' => ['1A', '2B'],
        ]);

        $response->assertRedirect('/dashboard/regular-bookings/passengers');
        $response->assertSessionHasNoErrors();
    }

    private function makeDraft(array $overrides = []): array
    {
        return array_merge([
            'booking_type' => 'self',
            'pickup_location' => 'SKPD',
            'destination_location' => 'Pekanbaru',
            'departure_time' => '07:00',
            'passenger_count' => 3,
            'pickup_address' => 'Jl. Tuanku Tambusai No. 12 Pekanbaru',
            'dropoff_address' => 'Jl. Sudirman No. 8 Pekanbaru',
            'fare_amount' => 150000,
            'selected_seats' => [],
            'passengers' => [],
        ], $overrides);
    }
}
