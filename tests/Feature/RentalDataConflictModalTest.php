<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

/**
 * Feature test Sesi 50 PR #5 — RentalDataPageController integration.
 *
 * Coverage:
 *   - 409 saat mobil double-assign (modal swap konfirmasi).
 *   - 302 redirect saat confirm_swap=1 + replacement_mobil_id.
 *   - 302 redirect saat tidak ada konflik + Trip auto-link + markKeluarTrip rental.
 *   - 422 saat split amounts tidak sum ke total.
 */
class RentalDataConflictModalTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;
    private Mobil $mobilA;
    private Mobil $mobilB;
    private Driver $driverA;
    private Driver $driverB;

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow('2026-05-01 10:00:00');

        $this->admin = User::factory()->create(['role' => 'Admin']);
        $this->mobilA  = Mobil::factory()->create(['is_active_in_trip' => true]);
        $this->mobilB  = Mobil::factory()->create(['is_active_in_trip' => true]);
        $this->driverA = Driver::factory()->create();
        $this->driverB = Driver::factory()->create();
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    private function basePayload(array $overrides = []): array
    {
        return array_merge([
            'passenger_name'              => 'Bu Bos',
            'passenger_phone'             => '081234567890',
            'from_city'                   => 'Pasirpengaraian',
            'to_city'                     => 'Pekanbaru',
            'pickup_location'             => 'Jl. Test No. 1, Pasirpengaraian',
            'dropoff_location'            => 'Jl. Test No. 2, Pekanbaru',
            'price_per_seat'              => 1000000,
            'additional_fare'             => 0,
            'trip_date'                   => '2026-05-05',
            'rental_end_date'             => '2026-05-07',
            'trip_time'                   => '07:00',
            'rental_pool_target'          => 'ROHUL',
            'rental_keberangkatan_amount' => 500000,
            'rental_kepulangan_amount'    => 500000,
        ], $overrides);
    }

    public function test_store_returns_409_when_mobil_conflict_without_confirm_swap_flag(): void
    {
        $trip = Trip::factory()->scheduled()->create([
            'trip_date' => '2026-05-05',
            'trip_time' => '07:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence'  => 1,
            'mobil_id'  => $this->mobilA->id,
            'driver_id' => $this->driverA->id,
        ])->refresh();

        Booking::factory()->create([
            'category'       => 'Reguler',
            'trip_id'        => $trip->id,
            'mobil_id'       => $this->mobilA->id,
            'trip_date'      => '2026-05-05',
            'trip_time'      => '07:00:00',
            'direction'      => 'to_pkb',
            'booking_status' => 'Aktif',
        ]);

        $response = $this->actingAs($this->admin)
            ->postJson(route('rental-data.store'), $this->basePayload([
                'mobil_id'  => $this->mobilA->id,
                'driver_id' => $this->driverA->id,
            ]));

        $response->assertStatus(409);
        $response->assertJsonPath('conflict_type', 'mobil_double_assign');
        $response->assertJsonPath('peer_count', 1);
        $response->assertJsonStructure([
            'conflict_type', 'message', 'trip_id', 'mobil_id', 'mobil_kode',
            'peer_bookings', 'available_replacement_mobils',
        ]);

        $this->assertSame(0, Booking::query()->where('category', 'Rental')->count(),
            'Booking belum boleh ter-create sebelum admin confirm swap.');
    }

    public function test_store_proceeds_when_confirm_swap_with_replacement_mobil(): void
    {
        $tripA = Trip::factory()->scheduled()->create([
            'trip_date' => '2026-05-05',
            'trip_time' => '07:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence'  => 1,
            'mobil_id'  => $this->mobilA->id,
            'driver_id' => $this->driverA->id,
        ])->refresh();

        $tripB = Trip::factory()->scheduled()->create([
            'trip_date' => '2026-05-05',
            'trip_time' => '08:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence'  => 2,
            'mobil_id'  => $this->mobilB->id,
            'driver_id' => $this->driverB->id,
        ])->refresh();

        $peer = Booking::factory()->create([
            'category'       => 'Reguler',
            'trip_id'        => $tripA->id,
            'mobil_id'       => $this->mobilA->id,
            'trip_date'      => '2026-05-05',
            'trip_time'      => '07:00:00',
            'direction'      => 'to_pkb',
            'booking_status' => 'Aktif',
        ]);

        $response = $this->actingAs($this->admin)
            ->post(route('rental-data.store'), $this->basePayload([
                'mobil_id'             => $this->mobilA->id,
                'driver_id'            => $this->driverA->id,
                'confirm_swap'         => '1',
                'replacement_mobil_id' => $this->mobilB->id,
            ]));

        $response->assertRedirect(route('rental-data.index'));
        $response->assertSessionHas('rental_data_success');

        $tripA->refresh();
        $tripB->refresh();
        $peer->refresh();

        $this->assertSame('keluar_trip', $tripA->status);
        $this->assertSame('rental', $tripA->keluar_trip_reason);
        $this->assertSame('2026-05-07', $tripA->keluar_trip_planned_end_date->toDateString());
        $this->assertSame($this->mobilB->id, $tripA->mobil_id);
        $this->assertSame($this->mobilA->id, $tripB->mobil_id);
        $this->assertSame($this->mobilB->id, $peer->mobil_id);

        $rental = Booking::query()
            ->where('category', 'Rental')
            ->where('passenger_name', 'Bu Bos')
            ->first();
        $this->assertNotNull($rental);
        $this->assertSame($tripA->id, $rental->trip_id);
        $this->assertSame('ROHUL', $rental->rental_pool_target);
        $this->assertSame(500000, $rental->rental_keberangkatan_amount);
        $this->assertSame(500000, $rental->rental_kepulangan_amount);
    }

    public function test_store_links_trip_id_and_keluar_trip_rental_when_no_conflict(): void
    {
        $trip = Trip::factory()->scheduled()->create([
            'trip_date' => '2026-05-05',
            'trip_time' => '07:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence'  => 1,
            'mobil_id'  => $this->mobilA->id,
            'driver_id' => $this->driverA->id,
        ])->refresh();

        $response = $this->actingAs($this->admin)
            ->post(route('rental-data.store'), $this->basePayload([
                'mobil_id'  => $this->mobilA->id,
                'driver_id' => $this->driverA->id,
            ]));

        $response->assertRedirect(route('rental-data.index'));

        $trip->refresh();
        $this->assertSame('keluar_trip', $trip->status);
        $this->assertSame('rental', $trip->keluar_trip_reason);
        $this->assertSame('ROHUL', $trip->keluar_trip_pool_target);
        $this->assertSame('2026-05-07', $trip->keluar_trip_planned_end_date->toDateString());

        $rental = Booking::query()
            ->where('category', 'Rental')
            ->where('passenger_name', 'Bu Bos')
            ->where('trip_id', $trip->id)
            ->first();
        $this->assertNotNull($rental, 'Booking rental admin harus linked ke Trip.');
        $this->assertSame(500000, $rental->rental_keberangkatan_amount);
    }

    public function test_store_validation_fails_when_split_amounts_do_not_sum_to_total(): void
    {
        $response = $this->actingAs($this->admin)
            ->post(route('rental-data.store'), $this->basePayload([
                'price_per_seat'              => 1000000,
                'additional_fare'             => 0,
                'rental_keberangkatan_amount' => 300000,
                'rental_kepulangan_amount'    => 600000,  // sum 900000 != 1000000
            ]));

        $response->assertSessionHasErrors('rental_keberangkatan_amount');
        $this->assertSame(0, Booking::query()->where('category', 'Rental')->count(),
            'Booking tidak boleh ter-create kalau sum porsi tidak match total.');
    }
}
