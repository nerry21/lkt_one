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

        // SDR pair trip PKB → ROHUL yang point ke origin.
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

        // PRIMARY assertion: tombol "Pulang Hari Ini" TIDAK ter-render di origin
        // yang sudah paired. Ini adalah guard yang proper (bukan cuma assert
        // field ter-expose di serializer).
        $response->assertDontSee('btn-same-day-return-'.$originTrip->id, false);

        // Secondary assertion: flag has_same_day_return_pair=true ter-expose
        // di inline state untuk origin, supaya JS renderActionButtons consume.
        $response->assertSee('"has_same_day_return_pair":true', false);
    }

    public function test_has_same_day_return_pair_flag_false_for_unpaired_origin(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $mobil = Mobil::factory()->create([
            'kode_mobil' => 'JET 04',
            'home_pool' => 'ROHUL',
            'is_active_in_trip' => true,
        ]);
        $driver = Driver::factory()->create(['nama' => 'Pak Edi']);

        // Origin trip ROHUL → PKB scheduled, BELUM punya SDR pair.
        Trip::query()->create([
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
        // Flag harus false — trip belum punya pair, tombol SHOULD visible.
        $response->assertSee('"has_same_day_return_pair":false', false);
        $response->assertSee('btn-same-day-return-', false);
    }

    public function test_dashboard_shows_two_column_layout_with_keberangkatan_and_kepulangan_headers(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);

        $response = $this->actingAs($admin)->get('/dashboard/trip-planning?date=2026-04-25');

        $response->assertOk()
            ->assertSee('Keberangkatan')
            ->assertSee('Kepulangan')
            ->assertSee('ROHUL → PKB', false)
            ->assertSee('PKB → ROHUL', false)
            ->assertSee('trip-planning-column-keberangkatan', false)
            ->assertSee('trip-planning-column-kepulangan', false);
    }

    public function test_rohul_to_pkb_trip_appears_in_keberangkatan_column(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $mobil = Mobil::factory()->create(['kode_mobil' => 'JET TEST', 'is_active_in_trip' => true]);
        $driver = Driver::factory()->create(['nama' => 'Pak Test']);

        Trip::query()->create([
            'trip_date' => '2026-04-25',
            'trip_time' => '07:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence' => 1,
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
            'status' => 'scheduled',
        ]);

        $response = $this->actingAs($admin)->get('/dashboard/trip-planning?date=2026-04-25');

        $response->assertOk()
            ->assertSee('trip-planning-trips-table-keberangkatan', false)
            ->assertSee('JET TEST')
            ->assertSee('Pak Test');

        // Pastikan tidak muncul di kolom kepulangan (via empty state).
        $this->assertStringContainsString('empty-state-kepulangan', $response->getContent());
    }

    public function test_pkb_to_rohul_trip_appears_in_kepulangan_column(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $mobil = Mobil::factory()->create(['kode_mobil' => 'JET BACK', 'is_active_in_trip' => true]);
        $driver = Driver::factory()->create(['nama' => 'Pak Back']);

        Trip::query()->create([
            'trip_date' => '2026-04-25',
            'trip_time' => '13:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence' => 1,
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
            'status' => 'scheduled',
        ]);

        $response = $this->actingAs($admin)->get('/dashboard/trip-planning?date=2026-04-25');

        $response->assertOk()
            ->assertSee('trip-planning-trips-table-kepulangan', false)
            ->assertSee('JET BACK')
            ->assertSee('Pak Back');

        $this->assertStringContainsString('empty-state-keberangkatan', $response->getContent());
    }

    public function test_empty_state_shown_for_keberangkatan_column_when_no_rohul_to_pkb_trips(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $mobil = Mobil::factory()->create(['is_active_in_trip' => true]);
        $driver = Driver::factory()->create();

        // Hanya PKB_TO_ROHUL trip.
        Trip::query()->create([
            'trip_date' => '2026-04-25',
            'trip_time' => '16:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence' => 1,
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
            'status' => 'scheduled',
        ]);

        $response = $this->actingAs($admin)->get('/dashboard/trip-planning?date=2026-04-25');

        $response->assertOk()
            ->assertSee('Belum ada trip Keberangkatan')
            ->assertSee('empty-state-keberangkatan', false);
    }

    public function test_dashboard_counter_has_testid_span_reflecting_trip_count(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $mobil = Mobil::factory()->create(['is_active_in_trip' => true]);
        $driver = Driver::factory()->create();

        // Buat 3 trip — counter harus baca 3.
        Trip::query()->create([
            'trip_date' => '2026-04-25',
            'trip_time' => '05:30:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence' => 1,
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
            'status' => 'scheduled',
        ]);
        Trip::query()->create([
            'trip_date' => '2026-04-25',
            'trip_time' => '09:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence' => 2,
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
            'status' => 'scheduled',
        ]);
        Trip::query()->create([
            'trip_date' => '2026-04-25',
            'trip_time' => '16:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence' => 1,
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
            'status' => 'scheduled',
        ]);

        $response = $this->actingAs($admin)->get('/dashboard/trip-planning?date=2026-04-25');

        $response->assertOk()
            ->assertSee('data-testid="trip-planning-trip-counter">3</span>', false);
    }

    public function test_keberangkatan_trips_sorted_by_time_asc_with_null_time_last(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $mobil1 = Mobil::factory()->create(['kode_mobil' => 'JET AA', 'is_active_in_trip' => true]);
        $mobil2 = Mobil::factory()->create(['kode_mobil' => 'JET BB', 'is_active_in_trip' => true]);
        $mobil3 = Mobil::factory()->create(['kode_mobil' => 'JET CC', 'is_active_in_trip' => true]);
        $driver = Driver::factory()->create();

        // Trip tanpa jam (null) — harus paling bawah.
        Trip::query()->create([
            'trip_date' => '2026-04-25',
            'trip_time' => null,
            'direction' => 'ROHUL_TO_PKB',
            'sequence' => 1,
            'mobil_id' => $mobil1->id,
            'driver_id' => $driver->id,
            'status' => 'scheduled',
        ]);

        // Trip jam 09:00.
        Trip::query()->create([
            'trip_date' => '2026-04-25',
            'trip_time' => '09:00:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence' => 2,
            'mobil_id' => $mobil2->id,
            'driver_id' => $driver->id,
            'status' => 'scheduled',
        ]);

        // Trip jam 05:30 — harus paling atas.
        Trip::query()->create([
            'trip_date' => '2026-04-25',
            'trip_time' => '05:30:00',
            'direction' => 'ROHUL_TO_PKB',
            'sequence' => 3,
            'mobil_id' => $mobil3->id,
            'driver_id' => $driver->id,
            'status' => 'scheduled',
        ]);

        $response = $this->actingAs($admin)->get('/dashboard/trip-planning?date=2026-04-25');
        $content = $response->getContent();

        // Scope pencarian ke dalam tabel Keberangkatan — konten sebelumnya
        // (JSON state, stats grid) juga memuat kode_mobil sehingga `strpos`
        // dari awal string akan mismatch.
        $tableAnchor = strpos($content, 'trip-planning-trips-table-keberangkatan');
        $this->assertNotFalse($tableAnchor, 'Tabel keberangkatan harus ter-render');
        $tableSection = substr($content, $tableAnchor);

        $posCC = strpos($tableSection, 'JET CC'); // 05:30 — first
        $posBB = strpos($tableSection, 'JET BB'); // 09:00 — middle
        $posAA = strpos($tableSection, 'JET AA'); // null — last

        $this->assertNotFalse($posCC);
        $this->assertNotFalse($posBB);
        $this->assertNotFalse($posAA);
        $this->assertLessThan($posBB, $posCC, 'Trip 05:30 harus di atas trip 09:00');
        $this->assertLessThan($posAA, $posBB, 'Trip 09:00 harus di atas trip null (waiting)');
    }
}
