<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Bug #40 Opsi C — explicit jwt.auth guard pada outer /dashboard group.
 *
 * Scope authentication-only, BUKAN blanket admin. 15 controller implement
 * "locked view" pattern via isAdmin() conditional render, dan test existing
 * (BookingManagementPageTest::test_non_admin_cannot_access_booking_management_api)
 * encode product intent: non-admin GET /dashboard/bookings → 200 + locked
 * message. Role hardening tetap per inner group (bookings.show line 82,
 * /trip-planning/* line 128).
 *
 * Cover 3 jalur: guest → redirect login, authenticated non-admin → 200
 * (locked view masih berfungsi di controller), admin → 200.
 */
class DashboardMiddlewareGuardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_redirected_to_login_when_hitting_dashboard_home(): void
    {
        $response = $this->get('/dashboard');

        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_non_admin_can_access_dashboard_home(): void
    {
        // Bug #40 Opsi C: outer middleware hanya jwt.auth (no blanket admin).
        // Non-admin authenticated user BOLEH land di GET routes — locked view
        // di-render oleh controller (pattern graceful degradation). Admin-only
        // rejection terjadi di inner groups via explicit admin.role:admin.
        $user = User::factory()->create(['role' => 'User']);

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertStatus(200);
    }

    public function test_authenticated_admin_can_access_dashboard_home(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);

        $response = $this->actingAs($admin)->get('/dashboard');

        $response->assertStatus(200);
    }
}
