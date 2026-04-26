<?php

namespace Tests\Feature\Bookings;

use App\Models\Booking;
use App\Models\Driver;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Sesi 46 PR #57 — filter cluster-aware untuk endpoint:
 *   - GET /api/bookings (filteredQuery)
 *   - PATCH /api/bookings/slot-assign (slotAssign)
 *   - GET /bookings/surat-jalan (suratJalan)
 *
 * Filter `route_via` opsional, kalau missing/invalid = no cluster constraint
 * (return semua cluster). Whitelist value mencegah SQL injection.
 */
class FilterClusterAwareTest extends TestCase
{
    use RefreshDatabase;

    public function test_filtered_query_filters_by_cluster_bangkinang(): void
    {
        $this->seedClusterBooking('RBK-BKG-001', 'BANGKINANG');
        $this->seedClusterBooking('RBK-PTP-001', 'PETAPAHAN');

        $admin = User::factory()->create(['role' => 'Admin']);

        $response = $this->actingAs($admin)
            ->getJson('/api/bookings?date=2026-04-28&route_via=BANGKINANG');

        $response->assertOk();
        $codes = collect($response->json())->pluck('booking_code')->all();
        $this->assertContains('RBK-BKG-001', $codes);
        $this->assertNotContains('RBK-PTP-001', $codes);
    }

    public function test_filtered_query_returns_all_clusters_when_filter_missing(): void
    {
        $this->seedClusterBooking('RBK-BKG-002', 'BANGKINANG');
        $this->seedClusterBooking('RBK-PTP-002', 'PETAPAHAN');

        $admin = User::factory()->create(['role' => 'Admin']);

        $response = $this->actingAs($admin)
            ->getJson('/api/bookings?date=2026-04-28');

        $response->assertOk();
        $codes = collect($response->json())->pluck('booking_code')->all();
        $this->assertContains('RBK-BKG-002', $codes);
        $this->assertContains('RBK-PTP-002', $codes);
    }

    public function test_filtered_query_ignores_invalid_cluster_value(): void
    {
        $this->seedClusterBooking('RBK-BKG-003', 'BANGKINANG');
        $this->seedClusterBooking('RBK-PTP-003', 'PETAPAHAN');

        $admin = User::factory()->create(['role' => 'Admin']);

        // Kirim cluster invalid → whitelist guard, treat as no-filter, return both
        $response = $this->actingAs($admin)
            ->getJson('/api/bookings?date=2026-04-28&route_via=INJECT--SQL');

        $response->assertOk();
        $codes = collect($response->json())->pluck('booking_code')->all();
        $this->assertContains('RBK-BKG-003', $codes);
        $this->assertContains('RBK-PTP-003', $codes);
    }

    public function test_slot_assign_filters_by_cluster(): void
    {
        $this->seedClusterBooking('RBK-SLOT-BKG', 'BANGKINANG');
        $this->seedClusterBooking('RBK-SLOT-PTP', 'PETAPAHAN');

        $admin = User::factory()->create(['role' => 'Admin']);
        $driver = Driver::factory()->create(['nama' => 'Pak Driver Cluster Test']);

        $response = $this->actingAs($admin)->patchJson('/api/bookings/slot-assign', [
            'trip_date' => '2026-04-28',
            'trip_time' => '07:00',
            'armada_index' => 1,
            'direction' => 'to_pkb',
            'route_via' => 'BANGKINANG',
            'driver_name' => 'Pak Driver Cluster Test',
            'driver_id' => $driver->id,
        ]);

        $response->assertOk();
        $response->assertJsonFragment(['updated_count' => 1]);

        // BKG booking ter-assign
        $this->assertDatabaseHas('bookings', [
            'booking_code' => 'RBK-SLOT-BKG',
            'driver_id'    => $driver->id,
        ]);

        // PTP booking TIDAK ter-assign (cluster filter aktif)
        $this->assertDatabaseHas('bookings', [
            'booking_code' => 'RBK-SLOT-PTP',
            'driver_id'    => null,
        ]);
    }

    public function test_surat_jalan_filters_by_cluster(): void
    {
        $this->seedClusterBooking('RBK-SJ-BKG', 'BANGKINANG', [
            'passenger_name' => 'Surya BKG',
        ]);
        $this->seedClusterBooking('RBK-SJ-PTP', 'PETAPAHAN', [
            'passenger_name' => 'Andi PTP',
        ]);

        $admin = User::factory()->create(['role' => 'Admin']);

        // Inspect SQL queries via query log untuk verify cluster filter aktif.
        // PDF binary content (FlateDecode-compressed) tidak feasible di-parse
        // string-match, jadi white-box query inspection adalah strategi terbaik.
        \DB::enableQueryLog();

        $response = $this->actingAs($admin)
            ->get('/dashboard/bookings/surat-jalan?date=2026-04-28&trip_time=07:00&armada_index=1&direction=to_pkb&route_via=BANGKINANG&driver_name=Driver+Test&no_pol=BM+1234+XX');

        $queries = \DB::getQueryLog();
        \DB::disableQueryLog();

        $response->assertOk();

        // Cari SELECT query ke bookings table dengan filter route_via='BANGKINANG'
        $bookingsSelectQuery = collect($queries)->first(fn ($q) =>
            str_contains($q['query'], 'select')
            && str_contains($q['query'], '`bookings`')
            && str_contains($q['query'], 'route_via')
        );

        $this->assertNotNull(
            $bookingsSelectQuery,
            'SELECT query ke bookings dengan filter route_via harus ada di query log.',
        );

        // Verify cluster value yang ke-bind = BANGKINANG
        $this->assertContains(
            'BANGKINANG',
            $bookingsSelectQuery['bindings'],
            'Binding query harus include BANGKINANG dari route_via filter.',
        );

        // Verify PETAPAHAN TIDAK ada di binding (cluster filter benar-benar
        // restrict ke BANGKINANG saja).
        $this->assertNotContains(
            'PETAPAHAN',
            $bookingsSelectQuery['bindings'],
            'Binding query TIDAK boleh include PETAPAHAN saat filter route_via=BANGKINANG.',
        );
    }

    private function seedClusterBooking(string $bookingCode, string $cluster, array $overrides = []): Booking
    {
        return Booking::factory()->create(array_merge([
            'booking_code' => $bookingCode,
            'trip_date' => '2026-04-28',
            'trip_time' => '07:00:00',
            'armada_index' => 1,
            'direction' => 'to_pkb',
            'route_via' => $cluster,
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Pekanbaru',
            'driver_id' => null,
            'driver_name' => null,
        ], $overrides));
    }
}
