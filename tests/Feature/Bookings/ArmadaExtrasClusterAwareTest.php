<?php

namespace Tests\Feature\Bookings;

use App\Models\BookingArmadaExtra;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Sesi 46 PR #57 — armada_extras endpoint cluster-aware coverage.
 *
 * Endpoint /api/bookings/armada-extras (GET + POST) di-extend supaya cluster-aware:
 *   - GET: response composite key { "HH:MM__direction__cluster": max_armada }
 *   - POST: firstOrNew composite (date, time, direction, route_via)
 *
 * Backwards-compat default (D-PR57-1): kalau request tidak kirim direction/route_via,
 * default ('to_pkb', 'BANGKINANG') dipakai supaya frontend pre-PR #58 tetap functional.
 */
class ArmadaExtrasClusterAwareTest extends TestCase
{
    use RefreshDatabase;

    public function test_armada_extras_get_returns_composite_key_format(): void
    {
        BookingArmadaExtra::create([
            'trip_date' => '2026-04-28',
            'trip_time' => '07:00',
            'direction' => 'to_pkb',
            'route_via' => 'BANGKINANG',
            'max_armada_index' => 2,
        ]);
        BookingArmadaExtra::create([
            'trip_date' => '2026-04-28',
            'trip_time' => '07:00',
            'direction' => 'to_pkb',
            'route_via' => 'PETAPAHAN',
            'max_armada_index' => 1,
        ]);
        BookingArmadaExtra::create([
            'trip_date' => '2026-04-28',
            'trip_time' => '14:00',
            'direction' => 'from_pkb',
            'route_via' => 'BANGKINANG',
            'max_armada_index' => 3,
        ]);

        $admin = User::factory()->create(['role' => 'Admin']);

        $response = $this->actingAs($admin)
            ->getJson('/api/bookings/armada-extras?date=2026-04-28');

        $response->assertOk();
        $response->assertExactJson([
            '07:00__to_pkb__BANGKINANG' => 2,
            '07:00__to_pkb__PETAPAHAN' => 1,
            '14:00__from_pkb__BANGKINANG' => 3,
        ]);
    }

    public function test_armada_extras_get_returns_empty_when_no_date(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);

        $response = $this->actingAs($admin)
            ->getJson('/api/bookings/armada-extras');

        $response->assertOk();
        $response->assertExactJson([]);
    }

    public function test_upsert_uses_backwards_compat_default_when_cluster_missing(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);

        $response = $this->actingAs($admin)
            ->postJson('/api/bookings/armada-extras', [
                'trip_date' => '2026-04-28',
                'trip_time' => '07:00',
                'armada_index' => 2,
                // Sengaja tidak kirim direction + route_via — D-PR57-1 backwards-compat
            ]);

        $response->assertOk();
        $response->assertJsonFragment([
            'max_armada_index' => 2,
            'direction'        => 'to_pkb',
            'route_via'        => 'BANGKINANG',
        ]);

        $this->assertDatabaseHas('booking_armada_extras', [
            'trip_date' => '2026-04-28',
            'trip_time' => '07:00',
            'direction' => 'to_pkb',
            'route_via' => 'BANGKINANG',
            'max_armada_index' => 2,
        ]);
    }

    public function test_upsert_creates_separate_rows_per_cluster(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);

        // BKG cluster
        $this->actingAs($admin)->postJson('/api/bookings/armada-extras', [
            'trip_date' => '2026-04-28',
            'trip_time' => '07:00',
            'direction' => 'to_pkb',
            'route_via' => 'BANGKINANG',
            'armada_index' => 2,
        ])->assertOk();

        // PTP cluster — same date+time, different cluster — harus jadi row terpisah
        $this->actingAs($admin)->postJson('/api/bookings/armada-extras', [
            'trip_date' => '2026-04-28',
            'trip_time' => '07:00',
            'direction' => 'to_pkb',
            'route_via' => 'PETAPAHAN',
            'armada_index' => 1,
        ])->assertOk();

        $this->assertSame(
            2,
            BookingArmadaExtra::query()
                ->where('trip_date', '2026-04-28')
                ->where('trip_time', '07:00')
                ->count(),
            '2 cluster di slot yang sama harus jadi 2 row terpisah (composite unique).',
        );

        $this->assertDatabaseHas('booking_armada_extras', [
            'trip_date' => '2026-04-28',
            'trip_time' => '07:00',
            'route_via' => 'BANGKINANG',
            'max_armada_index' => 2,
        ]);
        $this->assertDatabaseHas('booking_armada_extras', [
            'trip_date' => '2026-04-28',
            'trip_time' => '07:00',
            'route_via' => 'PETAPAHAN',
            'max_armada_index' => 1,
        ]);
    }

    public function test_upsert_rejects_invalid_cluster_value_with_default(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);

        // Kirim cluster invalid → silent fallback ke default BANGKINANG (whitelist guard)
        $response = $this->actingAs($admin)->postJson('/api/bookings/armada-extras', [
            'trip_date' => '2026-04-28',
            'trip_time' => '07:00',
            'direction' => 'to_pkb',
            'route_via' => 'INVALID_CLUSTER',
            'armada_index' => 2,
        ]);

        $response->assertOk();
        $response->assertJsonFragment([
            'route_via' => 'BANGKINANG', // fallback default
        ]);
    }
}
