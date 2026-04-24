<?php

namespace Tests\Feature\TripPlanning;

use App\Models\DailyDriverAssignment;
use App\Models\Driver;
use App\Models\Mobil;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Feature tests for DailyDriverAssignmentPageController (Sesi 21 Fase D1).
 *
 * Endpoints (migrated ke /api/ prefix di Fase E4 Sesi 29):
 *   GET /api/trip-planning/assignments?date=YYYY-MM-DD
 *   PUT /api/trip-planning/assignments
 *
 * Auth: jwt.auth + admin.role:admin (Admin OR Super Admin).
 */
class DailyDriverAssignmentControllerTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;
    protected User $superAdmin;
    protected Mobil $mobil1;
    protected Mobil $mobil2;
    protected Driver $driver1;
    protected Driver $driver2;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::factory()->create(['role' => 'Admin']);
        $this->superAdmin = User::factory()->create(['role' => 'Super Admin']);
        $this->mobil1 = Mobil::factory()->create();
        $this->mobil2 = Mobil::factory()->create();
        $this->driver1 = Driver::factory()->create();
        $this->driver2 = Driver::factory()->create();
    }

    // ── Group 1: Auth + authorization ─────────────────────────────────────

    public function test_unauthenticated_cannot_access_index(): void
    {
        $date = now()->addDay()->toDateString();

        $this->getJson("/api/trip-planning/assignments?date={$date}")
            ->assertStatus(401);
    }

    public function test_non_admin_user_cannot_access_upsert(): void
    {
        $nonAdmin = User::factory()->create(['role' => 'User']);

        $this->actingAs($nonAdmin)
            ->putJson('/api/trip-planning/assignments', [
                'date' => now()->addDay()->toDateString(),
                'assignments' => [
                    ['mobil_id' => $this->mobil1->id, 'driver_id' => $this->driver1->id],
                ],
            ])
            ->assertStatus(403);
    }

    public function test_super_admin_can_access_upsert(): void
    {
        $this->actingAs($this->superAdmin)
            ->putJson('/api/trip-planning/assignments', [
                'date' => now()->addDay()->toDateString(),
                'assignments' => [
                    ['mobil_id' => $this->mobil1->id, 'driver_id' => $this->driver1->id],
                ],
            ])
            ->assertStatus(200);

        $this->assertDatabaseHas('daily_driver_assignments', [
            'mobil_id' => $this->mobil1->id,
            'driver_id' => $this->driver1->id,
        ]);
    }

    // ── Group 2: index ─────────────────────────────────────────────────────

    public function test_index_returns_assignments_for_date(): void
    {
        $date = now()->addDay()->toDateString();

        DailyDriverAssignment::create([
            'date' => $date,
            'mobil_id' => $this->mobil1->id,
            'driver_id' => $this->driver1->id,
            'created_by' => $this->admin->id,
            'updated_by' => $this->admin->id,
        ]);

        $this->actingAs($this->admin)
            ->getJson("/api/trip-planning/assignments?date={$date}")
            ->assertStatus(200)
            ->assertJsonPath('date', $date)
            ->assertJsonCount(1, 'assignments');
    }

    public function test_index_returns_empty_for_date_with_no_assignments(): void
    {
        $this->actingAs($this->admin)
            ->getJson('/api/trip-planning/assignments?date=2026-12-31')
            ->assertStatus(200)
            ->assertJsonCount(0, 'assignments');
    }

    // ── Group 3: upsert validation ─────────────────────────────────────────

    public function test_upsert_rejects_past_date(): void
    {
        $this->actingAs($this->admin)
            ->putJson('/api/trip-planning/assignments', [
                'date' => '2020-01-01',
                'assignments' => [
                    ['mobil_id' => $this->mobil1->id, 'driver_id' => $this->driver1->id],
                ],
            ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['date']);
    }

    public function test_upsert_rejects_empty_assignments(): void
    {
        $this->actingAs($this->admin)
            ->putJson('/api/trip-planning/assignments', [
                'date' => now()->addDay()->toDateString(),
                'assignments' => [],
            ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['assignments']);
    }

    public function test_upsert_rejects_nonexistent_mobil(): void
    {
        $this->actingAs($this->admin)
            ->putJson('/api/trip-planning/assignments', [
                'date' => now()->addDay()->toDateString(),
                'assignments' => [
                    [
                        'mobil_id' => '00000000-0000-0000-0000-000000000000',
                        'driver_id' => $this->driver1->id,
                    ],
                ],
            ])
            ->assertStatus(422);
    }

    public function test_upsert_rejects_nonexistent_driver(): void
    {
        $this->actingAs($this->admin)
            ->putJson('/api/trip-planning/assignments', [
                'date' => now()->addDay()->toDateString(),
                'assignments' => [
                    [
                        'mobil_id' => $this->mobil1->id,
                        'driver_id' => '00000000-0000-0000-0000-000000000000',
                    ],
                ],
            ])
            ->assertStatus(422);
    }

    public function test_upsert_rejects_duplicate_mobil_in_payload(): void
    {
        $this->actingAs($this->admin)
            ->putJson('/api/trip-planning/assignments', [
                'date' => now()->addDay()->toDateString(),
                'assignments' => [
                    ['mobil_id' => $this->mobil1->id, 'driver_id' => $this->driver1->id],
                    ['mobil_id' => $this->mobil1->id, 'driver_id' => $this->driver2->id],
                ],
            ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['assignments']);
    }

    // ── Group 4: upsert happy path ─────────────────────────────────────────

    public function test_upsert_creates_new_assignments_with_audit_fields(): void
    {
        $this->actingAs($this->admin)
            ->putJson('/api/trip-planning/assignments', [
                'date' => now()->addDay()->toDateString(),
                'assignments' => [
                    ['mobil_id' => $this->mobil1->id, 'driver_id' => $this->driver1->id],
                    ['mobil_id' => $this->mobil2->id, 'driver_id' => $this->driver2->id],
                ],
            ])
            ->assertStatus(200)
            ->assertJsonPath('count', 2);

        $this->assertDatabaseHas('daily_driver_assignments', [
            'mobil_id' => $this->mobil1->id,
            'driver_id' => $this->driver1->id,
            'created_by' => $this->admin->id,
            'updated_by' => $this->admin->id,
        ]);

        $this->assertDatabaseHas('daily_driver_assignments', [
            'mobil_id' => $this->mobil2->id,
            'driver_id' => $this->driver2->id,
            'created_by' => $this->admin->id,
            'updated_by' => $this->admin->id,
        ]);
    }

    public function test_upsert_updates_existing_assignment_last_write_wins(): void
    {
        $date = now()->addDay()->toDateString();

        // Seed first assignment by admin.
        DailyDriverAssignment::create([
            'date' => $date,
            'mobil_id' => $this->mobil1->id,
            'driver_id' => $this->driver1->id,
            'created_by' => $this->admin->id,
            'updated_by' => $this->admin->id,
        ]);

        // Super admin updates — driver_id changes, created_by stays, updated_by changes.
        $this->actingAs($this->superAdmin)
            ->putJson('/api/trip-planning/assignments', [
                'date' => $date,
                'assignments' => [
                    ['mobil_id' => $this->mobil1->id, 'driver_id' => $this->driver2->id],
                ],
            ])
            ->assertStatus(200);

        $this->assertDatabaseHas('daily_driver_assignments', [
            'mobil_id' => $this->mobil1->id,
            'driver_id' => $this->driver2->id,
            'created_by' => $this->admin->id,
            'updated_by' => $this->superAdmin->id,
        ]);

        $this->assertEquals(1, DailyDriverAssignment::count());
    }
}
