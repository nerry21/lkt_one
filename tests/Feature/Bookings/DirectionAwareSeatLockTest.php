<?php

namespace Tests\Feature\Bookings;

use App\Models\Booking;
use App\Models\User;
use App\Services\SeatLockService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Sesi 44A PR #1A — Bug fix direction-aware seat lock.
 *
 * Verify slot fisik mobil tidak lagi strict (from_city, to_city), tapi pakai
 * (direction, route_via, armada_index). Bug rhie reproduction: booking lintas
 * titik berbeda di mobil sama akan saling block kursi.
 */
class DirectionAwareSeatLockTest extends TestCase
{
    use RefreshDatabase;

    public function test_simpang_d_and_pasirpengaraian_to_pkb_share_seat_lock(): void
    {
        // Reproduksi bug rhie: 2 booking ke PKB dari titik berbeda di slot/armada sama
        // → kursi 2A bentrok benar setelah PR #1A.
        $admin = User::factory()->create(['role' => 'Admin']);

        $existing = Booking::factory()->create([
            'category' => 'Reguler',
            'from_city' => 'Simpang D',
            'to_city' => 'Pekanbaru',
            'trip_date' => '2026-04-27',
            'trip_time' => '16:00:00',
            'armada_index' => 1,
            'selected_seats' => ['2A'],
            'direction' => 'to_pkb',
            'route_via' => 'BANGKINANG',
        ]);

        $seatLockService = app(SeatLockService::class);
        $seatLockService->lockSeats($existing, [[
            'trip_date' => '2026-04-27',
            'trip_time' => '16:00:00',
            'from_city' => 'Simpang D',
            'to_city' => 'Pekanbaru',
            'direction' => 'to_pkb',
            'route_via' => 'BANGKINANG',
            'armada_index' => 1,
        ]], ['2A'], 'soft');

        // API call: occupied_seats untuk Pasirpengaraian → PKB di slot sama
        $response = $this->actingAs($admin)
            ->getJson('/api/bookings/occupied-seats?' . http_build_query([
                'trip_date' => '2026-04-27',
                'trip_time' => '16:00:00',
                'from_city' => 'Pasirpengaraian',
                'to_city' => 'Pekanbaru',
                'armada_index' => 1,
            ]));

        // Bug fix: 2A HARUS muncul sebagai occupied (sebelum PR #1A return [] karena
        // filter strict from_city='Pasirpengaraian' tidak match Simpang D booking).
        $response->assertOk()
            ->assertJson(['occupied_seats' => ['2A']]);
    }

    public function test_armada_2_isolated_seat_lock_from_armada_1(): void
    {
        // Dua armada terpisah → seat lock independent
        $admin = User::factory()->create(['role' => 'Admin']);

        $existing = Booking::factory()->create([
            'category' => 'Reguler',
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Pekanbaru',
            'trip_date' => '2026-04-27',
            'trip_time' => '16:00:00',
            'armada_index' => 1,
            'selected_seats' => ['2A'],
            'direction' => 'to_pkb',
            'route_via' => 'BANGKINANG',
        ]);

        $seatLockService = app(SeatLockService::class);
        $seatLockService->lockSeats($existing, [[
            'trip_date' => '2026-04-27',
            'trip_time' => '16:00:00',
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Pekanbaru',
            'direction' => 'to_pkb',
            'route_via' => 'BANGKINANG',
            'armada_index' => 1,
        ]], ['2A'], 'soft');

        // Query occupied seats untuk armada_index=2 → 2A harus available
        $response = $this->actingAs($admin)
            ->getJson('/api/bookings/occupied-seats?' . http_build_query([
                'trip_date' => '2026-04-27',
                'trip_time' => '16:00:00',
                'from_city' => 'Pasirpengaraian',
                'to_city' => 'Pekanbaru',
                'armada_index' => 2,
            ]));

        $response->assertOk()
            ->assertJson(['occupied_seats' => []]);
    }

    public function test_opposite_direction_isolated_seat_lock(): void
    {
        // direction berlawanan (to_pkb vs from_pkb) di slot/armada sama →
        // mobil fisik berbeda, seat lock independent.
        $admin = User::factory()->create(['role' => 'Admin']);

        $existing = Booking::factory()->create([
            'category' => 'Reguler',
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Pekanbaru',
            'trip_date' => '2026-04-27',
            'trip_time' => '16:00:00',
            'armada_index' => 1,
            'selected_seats' => ['2A'],
            'direction' => 'to_pkb',
            'route_via' => 'BANGKINANG',
        ]);

        $seatLockService = app(SeatLockService::class);
        $seatLockService->lockSeats($existing, [[
            'trip_date' => '2026-04-27',
            'trip_time' => '16:00:00',
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Pekanbaru',
            'direction' => 'to_pkb',
            'route_via' => 'BANGKINANG',
            'armada_index' => 1,
        ]], ['2A'], 'soft');

        // Booking arah berlawanan: Pekanbaru → Pasirpengaraian
        $response = $this->actingAs($admin)
            ->getJson('/api/bookings/occupied-seats?' . http_build_query([
                'trip_date' => '2026-04-27',
                'trip_time' => '16:00:00',
                'from_city' => 'Pekanbaru',
                'to_city' => 'Pasirpengaraian',
                'armada_index' => 1,
            ]));

        $response->assertOk()
            ->assertJson(['occupied_seats' => []]);
    }

    public function test_double_book_same_slot_same_direction_throws_seat_conflict(): void
    {
        // Dua booking coba book kursi sama di slot/direction/armada sama → conflict
        $first = Booking::factory()->create([
            'category' => 'Reguler',
            'from_city' => 'Simpang D',
            'to_city' => 'Pekanbaru',
            'trip_date' => '2026-04-27',
            'trip_time' => '16:00:00',
            'armada_index' => 1,
            'selected_seats' => ['2A'],
            'direction' => 'to_pkb',
            'route_via' => 'BANGKINANG',
        ]);

        $seatLockService = app(SeatLockService::class);
        $seatLockService->lockSeats($first, [[
            'trip_date' => '2026-04-27',
            'trip_time' => '16:00:00',
            'from_city' => 'Simpang D',
            'to_city' => 'Pekanbaru',
            'direction' => 'to_pkb',
            'route_via' => 'BANGKINANG',
            'armada_index' => 1,
        ]], ['2A'], 'soft');

        // Booking kedua coba book 2A sama
        $second = Booking::factory()->create([
            'category' => 'Reguler',
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Pekanbaru',
            'trip_date' => '2026-04-27',
            'trip_time' => '16:00:00',
            'armada_index' => 1,
            'selected_seats' => ['2A'],
            'direction' => 'to_pkb',
            'route_via' => 'BANGKINANG',
        ]);

        $this->expectException(\App\Exceptions\SeatConflictException::class);

        $seatLockService->lockSeats($second, [[
            'trip_date' => '2026-04-27',
            'trip_time' => '16:00:00',
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Pekanbaru',
            'direction' => 'to_pkb',
            'route_via' => 'BANGKINANG',
            'armada_index' => 1,
        ]], ['2A'], 'soft');
    }
}
