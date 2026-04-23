<?php

namespace Tests\Feature\TripPlanning;

use App\Models\DailyDriverAssignment;
use App\Models\Driver;
use App\Models\Mobil;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

/**
 * Feature tests untuk AssignmentsDashboardViewController (Fase E4 Sesi 29).
 *
 * Endpoint: GET /dashboard/trip-planning/assignments[?date=YYYY-MM-DD]
 * Return: Blade view (HTML) dengan inline JSON state untuk hydration JS.
 */
class AssignmentsDashboardViewTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow('2026-04-23 10:00:00');

        $this->admin = User::factory()->create(['role' => 'Admin']);
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    public function test_guest_cannot_access_assignments_view(): void
    {
        $this->get('/dashboard/trip-planning/assignments')
            ->assertStatus(302);
    }

    public function test_admin_can_view_assignments_page_default_tomorrow(): void
    {
        Mobil::factory()->create(['kode_mobil' => 'BM 1234 AA', 'home_pool' => 'PKB']);
        Driver::factory()->create(['nama' => 'Driver Satu']);

        $tomorrow = Carbon::tomorrow()->toDateString();

        $this->actingAs($this->admin)
            ->get('/dashboard/trip-planning/assignments')
            ->assertStatus(200)
            ->assertSee('assignments-initial-state', escape: false)
            ->assertSee($tomorrow, escape: false)
            ->assertSee('Atur Assignments', escape: false);
    }

    public function test_admin_can_view_assignments_page_with_date_query(): void
    {
        $targetDate = Carbon::today()->addDays(3)->toDateString();
        $mobil = Mobil::factory()->create(['home_pool' => 'ROHUL']);
        $driver = Driver::factory()->create();

        DailyDriverAssignment::create([
            'date' => $targetDate,
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
            'created_by' => $this->admin->id,
            'updated_by' => $this->admin->id,
        ]);

        $response = $this->actingAs($this->admin)
            ->get('/dashboard/trip-planning/assignments?date='.$targetDate)
            ->assertStatus(200);

        $response->assertSee($targetDate, escape: false);
        $response->assertSee($mobil->id, escape: false);
        $response->assertSee($driver->id, escape: false);
    }
}
