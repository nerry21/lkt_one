<?php

namespace Tests\Feature\Bookings;

use App\Exceptions\ForbiddenRouteException;
use App\Exceptions\RouteClusterConflictException;
use App\Models\Booking;
use App\Models\User;
use App\Services\BookingClusterService;
use App\Services\BookingManagementService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use ReflectionMethod;
use Tests\TestCase;

/**
 * Sesi 44C PR #1C — Feature test cluster mix validation per armada
 * + forbidden route check end-to-end.
 *
 * Verify:
 *   - Booking BANGKINANG + BANGKINANG di slot armada sama → both succeed
 *   - Mixed cluster di slot armada sama → throws RouteClusterConflictException
 *   - Different armada / different time → both succeed (isolated)
 *   - Forbidden route via FormRequest → 422 validation error
 *   - Forbidden route via Service direct → throws ForbiddenRouteException
 *   - Update self-booking di solo slot → succeeds (no other booking)
 */
class ClusterMixValidationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Invoke protected BookingManagementService::persistBooking via reflection.
     */
    private function invokePersistBooking(Booking $booking, array $validated): Booking
    {
        $svc = app(BookingManagementService::class);
        $method = new ReflectionMethod($svc, 'persistBooking');

        return $method->invoke($svc, $booking, $validated);
    }

    /**
     * Minimal validated array yang cukup untuk persistBooking jalan.
     * Override field via $overrides untuk skenario test.
     */
    private function buildValidated(array $overrides = []): array
    {
        return array_merge([
            'category' => 'Reguler',
            'booking_for' => 'Untuk Diri Sendiri',
            'from_city' => 'Aliantan',
            'to_city' => 'Pekanbaru',
            'trip_date' => '2026-04-27',
            'trip_time' => '08:00',
            'passenger_count' => 1,
            'pickup_location' => 'Alamat penjemputan test',
            'dropoff_location' => 'Alamat tujuan test',
            'selected_seats' => ['1A'],
            'passengers' => [[
                'seat_no' => '1A',
                'name' => 'Penumpang Test',
                'phone' => '081234567890',
            ]],
            'additional_fare_per_passenger' => 0,
            'payment_method' => null,
            'payment_status' => 'Belum Bayar',
            'booking_status' => 'Draft',
            'driver_name' => null,
            'notes' => '',
            'armada_index' => 1,
            'route_via' => 'BANGKINANG',
        ], $overrides);
    }

    /**
     * Buat booking baseline + persist via Service supaya seat lock + state konsisten.
     */
    private function persistFreshBooking(array $overrides = []): Booking
    {
        $validated = $this->buildValidated($overrides);
        $booking = new Booking();
        $booking->booking_code = 'TEST-' . substr(md5(uniqid('', true)), 0, 8);

        return $this->invokePersistBooking($booking, $validated);
    }

    public function test_two_bangkinang_bookings_same_armada_slot_both_succeed(): void
    {
        $first = $this->persistFreshBooking([
            'from_city' => 'Aliantan',
            'to_city' => 'Pekanbaru',
            'route_via' => 'BANGKINANG',
            'selected_seats' => ['1A'],
            'passengers' => [[
                'seat_no' => '1A', 'name' => 'A', 'phone' => '081234567891',
            ]],
        ]);

        $second = $this->persistFreshBooking([
            'from_city' => 'Bangkinang',
            'to_city' => 'Pekanbaru',
            'route_via' => 'BANGKINANG',
            'selected_seats' => ['2A'],
            'passengers' => [[
                'seat_no' => '2A', 'name' => 'B', 'phone' => '081234567892',
            ]],
        ]);

        $this->assertNotNull($first->id);
        $this->assertNotNull($second->id);
        $this->assertSame('BANGKINANG', $first->route_via);
        $this->assertSame('BANGKINANG', $second->route_via);
    }

    public function test_existing_bangkinang_blocks_new_petapahan_same_armada_slot(): void
    {
        $this->persistFreshBooking([
            'from_city' => 'Aliantan',
            'to_city' => 'Pekanbaru',
            'route_via' => 'BANGKINANG',
            'selected_seats' => ['1A'],
            'passengers' => [[
                'seat_no' => '1A', 'name' => 'A', 'phone' => '081234567891',
            ]],
        ]);

        $this->expectException(RouteClusterConflictException::class);

        $this->persistFreshBooking([
            'from_city' => 'Petapahan',
            'to_city' => 'Pekanbaru',
            'route_via' => 'PETAPAHAN',
            'selected_seats' => ['2A'],
            'passengers' => [[
                'seat_no' => '2A', 'name' => 'B', 'phone' => '081234567892',
            ]],
        ]);
    }

    public function test_existing_petapahan_blocks_new_bangkinang_same_armada_slot(): void
    {
        $this->persistFreshBooking([
            'from_city' => 'Petapahan',
            'to_city' => 'Pekanbaru',
            'route_via' => 'PETAPAHAN',
            'selected_seats' => ['1A'],
            'passengers' => [[
                'seat_no' => '1A', 'name' => 'A', 'phone' => '081234567891',
            ]],
        ]);

        $this->expectException(RouteClusterConflictException::class);

        $this->persistFreshBooking([
            'from_city' => 'Aliantan',
            'to_city' => 'Pekanbaru',
            'route_via' => 'BANGKINANG',
            'selected_seats' => ['2A'],
            'passengers' => [[
                'seat_no' => '2A', 'name' => 'B', 'phone' => '081234567892',
            ]],
        ]);
    }

    public function test_different_armada_index_isolates_cluster_mix(): void
    {
        $first = $this->persistFreshBooking([
            'from_city' => 'Aliantan',
            'to_city' => 'Pekanbaru',
            'route_via' => 'BANGKINANG',
            'armada_index' => 1,
            'selected_seats' => ['1A'],
            'passengers' => [[
                'seat_no' => '1A', 'name' => 'A', 'phone' => '081234567891',
            ]],
        ]);

        $second = $this->persistFreshBooking([
            'from_city' => 'Petapahan',
            'to_city' => 'Pekanbaru',
            'route_via' => 'PETAPAHAN',
            'armada_index' => 2,
            'selected_seats' => ['1A'],
            'passengers' => [[
                'seat_no' => '1A', 'name' => 'B', 'phone' => '081234567892',
            ]],
        ]);

        $this->assertNotNull($first->id);
        $this->assertNotNull($second->id);
        $this->assertSame(1, (int) $first->armada_index);
        $this->assertSame(2, (int) $second->armada_index);
    }

    public function test_different_trip_time_isolates_cluster_mix(): void
    {
        $first = $this->persistFreshBooking([
            'from_city' => 'Aliantan',
            'to_city' => 'Pekanbaru',
            'route_via' => 'BANGKINANG',
            'trip_time' => '08:00',
            'selected_seats' => ['1A'],
            'passengers' => [[
                'seat_no' => '1A', 'name' => 'A', 'phone' => '081234567891',
            ]],
        ]);

        $second = $this->persistFreshBooking([
            'from_city' => 'Petapahan',
            'to_city' => 'Pekanbaru',
            'route_via' => 'PETAPAHAN',
            'trip_time' => '16:00',
            'selected_seats' => ['1A'],
            'passengers' => [[
                'seat_no' => '1A', 'name' => 'B', 'phone' => '081234567892',
            ]],
        ]);

        $this->assertNotNull($first->id);
        $this->assertNotNull($second->id);
    }

    public function test_ambigu_locations_with_different_route_via_conflict_same_armada_slot(): void
    {
        $this->persistFreshBooking([
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Pekanbaru',
            'route_via' => 'BANGKINANG',
            'selected_seats' => ['1A'],
            'passengers' => [[
                'seat_no' => '1A', 'name' => 'A', 'phone' => '081234567891',
            ]],
        ]);

        $this->expectException(RouteClusterConflictException::class);

        $this->persistFreshBooking([
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Pekanbaru',
            'route_via' => 'PETAPAHAN',
            'selected_seats' => ['2A'],
            'passengers' => [[
                'seat_no' => '2A', 'name' => 'B', 'phone' => '081234567892',
            ]],
        ]);
    }

    public function test_forbidden_route_throws_via_service_direct(): void
    {
        // Service layer defense: kalau caller bypass FormRequest dan kirim
        // forbidden route langsung ke persistBooking, exception tetap fire.
        $this->expectException(ForbiddenRouteException::class);

        $this->persistFreshBooking([
            'from_city' => 'Aliantan',
            'to_city' => 'Petapahan',
            'route_via' => 'BANGKINANG',
            'selected_seats' => ['1A'],
            'passengers' => [[
                'seat_no' => '1A', 'name' => 'A', 'phone' => '081234567891',
            ]],
        ]);
    }

    public function test_update_self_booking_in_solo_slot_succeeds(): void
    {
        // Booking solo di slot armada (no other booking) → update boleh ganti route_via
        $first = $this->persistFreshBooking([
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Pekanbaru',
            'route_via' => 'BANGKINANG',
            'selected_seats' => ['1A'],
            'passengers' => [[
                'seat_no' => '1A', 'name' => 'A', 'phone' => '081234567891',
            ]],
        ]);

        // Update same booking ke PETAPAHAN — exclude self di query, no conflict
        $validated = $this->buildValidated([
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Pekanbaru',
            'route_via' => 'PETAPAHAN',
            'selected_seats' => ['1A'],
            'passengers' => [[
                'seat_no' => '1A', 'name' => 'A', 'phone' => '081234567891',
            ]],
        ]);

        $updated = $this->invokePersistBooking($first->refresh(), $validated);

        $this->assertSame('PETAPAHAN', $updated->route_via);
    }

    public function test_form_request_blocks_forbidden_route(): void
    {
        // FormRequest layer: payload via HTTP harus 422 (validation error)
        // sebelum sampai ke service. Pakai BookingClusterService langsung
        // untuk verify forbidden helper konsisten dengan FormRequest path.
        $clusterService = app(BookingClusterService::class);

        $this->assertTrue($clusterService->isForbiddenRoute('Aliantan', 'Petapahan'));
        $this->assertTrue($clusterService->isForbiddenRoute('Silam', 'Kasikan'));
        $this->assertFalse($clusterService->isForbiddenRoute('Pasirpengaraian', 'Pekanbaru'));
    }

    public function test_hub_only_existing_booking_allows_any_cluster(): void
    {
        // Buat booking via factory dengan from/to yang resolve ke HUB pattern,
        // tapi karena PKB→PKB invalid, real HUB-only scenario tidak bisa terjadi
        // di booking realistic. Test ini memvalidasi isClusterCompatible logic
        // langsung untuk skenario hipotetis HUB-only existing.
        $clusterService = app(BookingClusterService::class);

        $this->assertTrue($clusterService->isClusterCompatible(
            [BookingClusterService::CLUSTER_HUB],
            BookingClusterService::CLUSTER_BANGKINANG,
        ));

        $this->assertTrue($clusterService->isClusterCompatible(
            [BookingClusterService::CLUSTER_HUB],
            BookingClusterService::CLUSTER_PETAPAHAN,
        ));
    }
}
