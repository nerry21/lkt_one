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
 * Feature test Sesi 50 PR #4 — DroppingBookingDataPageController integration.
 *
 * Coverage:
 *   - 409 saat mobil double-assign (modal swap konfirmasi).
 *   - 302 redirect saat confirm_swap=1 + replacement_mobil_id.
 *   - 302 redirect saat tidak ada konflik + Trip auto-link + markKeluarTrip dropping.
 */
class DroppingDataConflictModalTest extends TestCase
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
            'passenger_name'       => 'Bu Bos',
            'passenger_phone'      => '081234567890',
            'from_city'            => 'Pasirpengaraian',
            'to_city'              => 'Pekanbaru',
            'pickup_location'      => 'Jl. Test No. 1, Pasirpengaraian',
            'dropoff_location'     => 'Jl. Test No. 2, Pekanbaru',
            'price_per_seat'       => 600000,
            'trip_date'            => '2026-05-05',
            'trip_time'            => '07:00',
            'dropping_pool_target' => 'ROHUL',
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

        // Active regular passenger di Trip A → trigger conflict.
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
            ->postJson(route('dropping-data.store'), $this->basePayload([
                'mobil_id'  => $this->mobilA->id,
                'driver_id' => $this->driverA->id,
            ]));

        $response->assertStatus(409);
        $response->assertJsonPath('conflict_type', 'mobil_double_assign');
        $response->assertJsonPath('peer_count', 1);
        $response->assertJsonStructure([
            'conflict_type',
            'message',
            'trip_id',
            'mobil_id',
            'mobil_kode',
            'peer_bookings',
            'available_replacement_mobils',
        ]);

        $this->assertSame(0, Booking::query()->where('category', 'Dropping')->count(),
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
            ->post(route('dropping-data.store'), $this->basePayload([
                'mobil_id'             => $this->mobilA->id,
                'driver_id'            => $this->driverA->id,
                'confirm_swap'         => '1',
                'replacement_mobil_id' => $this->mobilB->id,
            ]));

        $response->assertRedirect(route('dropping-data.index'));
        $response->assertSessionHas('dropping_data_success');

        $tripA->refresh();
        $tripB->refresh();
        $peer->refresh();

        // Trip A swapped + sekarang keluar_trip dropping.
        $this->assertSame('keluar_trip', $tripA->status);
        $this->assertSame('dropping', $tripA->keluar_trip_reason);
        $this->assertSame($this->mobilB->id, $tripA->mobil_id);
        $this->assertSame($this->mobilA->id, $tripB->mobil_id);

        // Peer cascade ke mobil pengganti.
        $this->assertSame($this->mobilB->id, $peer->mobil_id);

        // Dropping booking admin ter-create + linked ke Trip A.
        $dropping = Booking::query()
            ->where('category', 'Dropping')
            ->where('passenger_name', 'Bu Bos')
            ->first();
        $this->assertNotNull($dropping);
        $this->assertSame($tripA->id, $dropping->trip_id);
        $this->assertSame('ROHUL', $dropping->dropping_pool_target);
    }

    public function test_store_links_trip_id_and_keluar_trip_dropping_when_no_conflict(): void
    {
        // Trip A scheduled, mobil_id = mobilA, BELUM ada penumpang reguler.
        $trip = Trip::factory()->scheduled()->create([
            'trip_date' => '2026-05-05',
            'trip_time' => '07:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence'  => 1,
            'mobil_id'  => $this->mobilA->id,
            'driver_id' => $this->driverA->id,
        ])->refresh();

        $response = $this->actingAs($this->admin)
            ->post(route('dropping-data.store'), $this->basePayload([
                'mobil_id'  => $this->mobilA->id,
                'driver_id' => $this->driverA->id,
            ]));

        $response->assertRedirect(route('dropping-data.index'));

        $trip->refresh();
        $this->assertSame('keluar_trip', $trip->status);
        $this->assertSame('dropping', $trip->keluar_trip_reason);
        $this->assertSame('ROHUL', $trip->keluar_trip_pool_target);

        // Booking dropping admin (passenger_name='Bu Bos') harus linked ke trip.
        // Auto-create draft (passenger_name='TBD') dari KeluarTripService punya
        // idempotent guard — kalau booking admin sudah linked saat markKeluarTrip
        // jalan, draft tidak duplicate.
        $linkedDropping = Booking::query()
            ->where('category', 'Dropping')
            ->where('trip_id', $trip->id)
            ->where('passenger_name', 'Bu Bos')
            ->first();
        $this->assertNotNull($linkedDropping, 'Booking dropping admin harus linked ke Trip.');
        $this->assertSame('ROHUL', $linkedDropping->dropping_pool_target);
    }
}
