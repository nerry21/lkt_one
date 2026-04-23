<?php

namespace Tests\Feature\TripPlanning;

use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

/**
 * Smoke tests untuk TripPlanningDashboardViewController (Fase E1 Sesi 25).
 *
 * Cakupan:
 *   - Admin dapat mengakses view & melihat label utama.
 *   - Guest tanpa auth diredirect ke /login (web request, non-JSON).
 *   - Initial state JSON script tag ter-render dengan target_date benar.
 *   - Mobil aktif tampil walaupun belum ada trip hari ini.
 */
class TripPlanningDashboardViewTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow('2026-04-22 10:00:00');
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    public function test_admin_can_access_trip_planning_dashboard_view(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $mobil = Mobil::factory()->create([
            'kode_mobil' => 'JET 01',
            'home_pool' => 'ROHUL',
            'is_active_in_trip' => true,
        ]);
        $driver = Driver::factory()->create(['nama' => 'Pak Bambang']);

        Trip::query()->create([
            'trip_date' => '2026-04-22',
            'trip_time' => '06:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence' => 1,
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
            'status' => 'scheduled',
        ]);

        $response = $this->actingAs($admin)
            ->get('/dashboard/trip-planning?date=2026-04-22');

        $response->assertOk()
            ->assertSee('Trip Planning')
            ->assertSee('Jadwal trip harian')
            ->assertSee('JET 01')
            ->assertSee('Pak Bambang')
            ->assertSee('trip-planning-initial-state', false);
    }

    public function test_unauthenticated_user_redirected_to_login(): void
    {
        $response = $this->get('/dashboard/trip-planning');

        $response->assertRedirect(route('login'));
    }

    public function test_active_mobil_appears_even_without_trips(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        Mobil::factory()->create([
            'kode_mobil' => 'JET 99',
            'home_pool' => 'PKB',
            'is_active_in_trip' => true,
        ]);

        $this->actingAs($admin)
            ->get('/dashboard/trip-planning?date=2026-04-22')
            ->assertOk()
            ->assertSee('JET 99')
            ->assertSee('Belum ada trip');
    }

    public function test_dashboard_state_includes_drivers_list(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        Driver::factory()->create(['nama' => 'Pak Ahmad']);
        Driver::factory()->create(['nama' => 'Pak Budi']);

        $response = $this->actingAs($admin)->get('/dashboard/trip-planning?date=2026-04-22');

        $response->assertOk();
        // Driver names harus muncul di inline JSON state untuk di-consume modal SDR.
        $response->assertSee('Pak Ahmad', false);
        $response->assertSee('Pak Budi', false);
    }

    public function test_same_day_return_button_visible_for_eligible_trip(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $mobil = Mobil::factory()->create([
            'kode_mobil' => 'JET 01',
            'home_pool' => 'ROHUL',
            'is_active_in_trip' => true,
        ]);
        $driver = Driver::factory()->create(['nama' => 'Pak Ahmad']);

        $trip = Trip::query()->create([
            'trip_date' => '2026-04-22',
            'trip_time' => '07:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence' => 1,
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
            'status' => 'scheduled',
        ]);

        $response = $this->actingAs($admin)->get('/dashboard/trip-planning?date=2026-04-22');

        $response->assertOk();
        $response->assertSee('Pulang Hari Ini');
        $response->assertSee('btn-same-day-return-'.$trip->id, false);
    }

    public function test_same_day_return_button_hidden_for_pkb_to_rohul_trip(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $mobil = Mobil::factory()->create([
            'kode_mobil' => 'JET 02',
            'home_pool' => 'PKB',
            'is_active_in_trip' => true,
        ]);
        $driver = Driver::factory()->create(['nama' => 'Pak Chandra']);

        $trip = Trip::query()->create([
            'trip_date' => '2026-04-22',
            'trip_time' => '13:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence' => 1,
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
            'status' => 'scheduled',
        ]);

        $response = $this->actingAs($admin)->get('/dashboard/trip-planning?date=2026-04-22');

        $response->assertOk();
        // Button row action tidak muncul untuk PKB→ROHUL trip.
        $response->assertDontSee('btn-same-day-return-'.$trip->id, false);
    }

    public function test_same_day_return_button_hidden_when_origin_already_paired(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $mobil = Mobil::factory()->create([
            'kode_mobil' => 'JET 03',
            'home_pool' => 'ROHUL',
            'is_active_in_trip' => true,
        ]);
        $driver = Driver::factory()->create(['nama' => 'Pak Doni']);

        // Origin trip ROHUL → PKB scheduled.
        $originTrip = Trip::query()->create([
            'trip_date' => '2026-04-22',
            'trip_time' => '07:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence' => 1,
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
            'status' => 'scheduled',
        ]);

        // SDR pair trip PKB → ROHUL yang point ke origin via same_day_return_origin_trip_id.
        // Sequence=999 = marker ad-hoc SDR (lesson #38 handoff Sesi 30).
        Trip::query()->create([
            'trip_date' => '2026-04-22',
            'trip_time' => '13:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence' => 999,
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
            'status' => 'scheduled',
            'same_day_return' => true,
            'same_day_return_origin_trip_id' => $originTrip->id,
        ]);

        $response = $this->actingAs($admin)->get('/dashboard/trip-planning?date=2026-04-22');

        $response->assertOk();
        // Primary guard: field same_day_return_origin_trip_id HARUS ter-expose di inline
        // JSON state (formatTripForState). Tanpa field ini, dashboard.js renderActionButtons
        // evaluate undefined → truthy negation → tombol always shown = UX bug.
        // Kalau developer masa depan accidentally hapus field dari serializer, test ini fail.
        $response->assertSee('"same_day_return_origin_trip_id":'.$originTrip->id, false);
    }
}
