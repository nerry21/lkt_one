<?php

namespace Tests\Feature;

use App\Models\KeuanganJet;
use App\Models\KeuanganJetSiklus;
use App\Models\Mobil;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Feature test untuk halaman read-only Keuangan JET (PR #3A).
 *
 * Coverage: auth guard + render + filter + render with data.
 */
class KeuanganJetPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_redirected_to_login(): void
    {
        $response = $this->get('/dashboard/keuangan-jet');
        $response->assertRedirect(route('login'));
    }

    public function test_non_admin_user_blocked_by_role_middleware(): void
    {
        $user = User::factory()->create(['role' => 'User']);
        $response = $this->actingAs($user)->get('/dashboard/keuangan-jet');
        $this->assertContains($response->status(), [302, 403]);
    }

    public function test_admin_can_access_index_page(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $response = $this->actingAs($admin)->get('/dashboard/keuangan-jet');
        $response->assertOk();
        $response->assertSee('Data Keuangan JET');
    }

    public function test_index_renders_siklus_rows(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $mobil = Mobil::factory()->create(['kode_mobil' => 'JET 99']);
        $siklus = KeuanganJetSiklus::factory()->create([
            'mobil_id' => $mobil->id,
            'mobil_code' => 'JET 99',
            'tanggal_mulai' => now()->toDateString(),
        ]);
        KeuanganJet::factory()->keberangkatan()->create([
            'keuangan_jet_siklus_id' => $siklus->id,
            'mobil_id' => $mobil->id,
            'mobil_code' => 'JET 99',
        ]);

        $response = $this->actingAs($admin)->get('/dashboard/keuangan-jet');
        $response->assertOk();
        $response->assertSee('JET 99');
        $response->assertSee('Berjalan');
    }

    public function test_admin_can_access_siklus_detail_page(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $siklus = KeuanganJetSiklus::factory()->create();
        $response = $this->actingAs($admin)->get('/dashboard/keuangan-jet/' . $siklus->id);
        $response->assertOk();
        $response->assertSee('Detail Siklus #' . $siklus->id);
        $response->assertSee('Bagi Hasil Driver');
    }

    public function test_index_filter_by_mobil_id(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $mobilA = Mobil::factory()->create(['kode_mobil' => 'JET A']);
        $mobilB = Mobil::factory()->create(['kode_mobil' => 'JET B']);

        $siklusA = KeuanganJetSiklus::factory()->create([
            'mobil_id' => $mobilA->id,
            'mobil_code' => 'JET A',
            'tanggal_mulai' => now()->toDateString(),
        ]);
        $siklusB = KeuanganJetSiklus::factory()->create([
            'mobil_id' => $mobilB->id,
            'mobil_code' => 'JET B',
            'tanggal_mulai' => now()->toDateString(),
        ]);

        $response = $this->actingAs($admin)->get('/dashboard/keuangan-jet?mobil_id=' . $mobilA->id);
        $response->assertOk();
        // Both kode_mobil appear in the filter dropdown options; assert on the
        // siklus row testid instead to verify table contents only.
        $response->assertSee('siklus-row-' . $siklusA->id, false);
        $response->assertDontSee('siklus-row-' . $siklusB->id, false);
    }
}
