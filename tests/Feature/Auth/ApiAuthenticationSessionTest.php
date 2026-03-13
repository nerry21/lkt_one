<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiAuthenticationSessionTest extends TestCase
{
    use RefreshDatabase;

    public function test_api_login_also_authenticates_web_session_for_dashboard_routes(): void
    {
        $user = User::factory()->create([
            'role' => 'Admin',
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response->assertOk();
        $this->assertAuthenticatedAs($user);

        $this->get('/dashboard')
            ->assertOk()
            ->assertSee('Dashboard');
    }

    public function test_api_logout_clears_web_session(): void
    {
        $user = User::factory()->create([
            'role' => 'Admin',
        ]);

        $loginResponse = $this->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $token = (string) $loginResponse->json('access_token');

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/auth/logout')
            ->assertOk()
            ->assertJson([
                'message' => 'Logout berhasil',
            ]);

        $this->assertGuest();
    }
}
