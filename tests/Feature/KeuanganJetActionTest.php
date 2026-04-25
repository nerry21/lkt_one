<?php

namespace Tests\Feature;

use App\Models\Driver;
use App\Models\KeuanganJet;
use App\Models\KeuanganJetSiklus;
use App\Models\Mobil;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class KeuanganJetActionTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create(['role' => 'Admin']);
    }

    private function makeSiklus(string $status = 'berjalan'): KeuanganJetSiklus
    {
        $mobil = Mobil::factory()->create();
        $driver = Driver::factory()->create();
        return KeuanganJetSiklus::factory()->create([
            'mobil_id' => $mobil->id,
            'mobil_code' => $mobil->kode_mobil,
            'driver_id_planned' => $driver->id,
            'driver_id_actual' => $driver->id,
            'driver_name_actual' => $driver->nama,
            'status_siklus' => $status,
        ]);
    }

    public function test_non_admin_blocked_from_refresh(): void
    {
        $siklus = $this->makeSiklus();
        $user = User::factory()->create(['role' => 'User']);
        $response = $this->actingAs($user)->postJson("/dashboard/keuangan-jet/{$siklus->id}/refresh");
        $this->assertContains($response->status(), [302, 403]);
    }

    public function test_admin_can_refresh_siklus(): void
    {
        $siklus = $this->makeSiklus();
        KeuanganJet::factory()->create(['keuangan_jet_siklus_id' => $siklus->id]);

        $response = $this->actingAs($this->admin())
            ->postJson("/dashboard/keuangan-jet/{$siklus->id}/refresh");
        $response->assertOk();
        $response->assertJson(['siklus_id' => $siklus->id]);
    }

    public function test_refresh_blocked_when_siklus_locked(): void
    {
        $siklus = $this->makeSiklus('locked');
        $response = $this->actingAs($this->admin())
            ->postJson("/dashboard/keuangan-jet/{$siklus->id}/refresh");
        $response->assertStatus(423);
    }

    public function test_admin_can_update_biaya_operasional(): void
    {
        $siklus = $this->makeSiklus();
        $response = $this->actingAs($this->admin())
            ->postJson("/dashboard/keuangan-jet/{$siklus->id}/biaya", [
                'uang_jalan' => 200000,
                'biaya_kurir' => 50000,
                'biaya_cuci_mobil' => 30000,
            ]);
        $response->assertOk();
        $this->assertSame('200000.00', $siklus->fresh()->uang_jalan);
    }

    public function test_biaya_validation_rejects_negative(): void
    {
        $siklus = $this->makeSiklus();
        $response = $this->actingAs($this->admin())
            ->postJson("/dashboard/keuangan-jet/{$siklus->id}/biaya", [
                'uang_jalan' => -100,
                'biaya_kurir' => 0,
                'biaya_cuci_mobil' => 0,
            ]);
        $response->assertStatus(422);
    }

    public function test_admin_can_override_driver(): void
    {
        $siklus = $this->makeSiklus();
        $newDriver = Driver::factory()->create(['nama' => 'New Driver']);

        $response = $this->actingAs($this->admin())
            ->postJson("/dashboard/keuangan-jet/{$siklus->id}/driver-override", [
                'driver_id' => $newDriver->id,
            ]);
        $response->assertOk();
        $fresh = $siklus->fresh();
        $this->assertSame($newDriver->id, $fresh->driver_id_actual);
        $this->assertSame('New Driver', $fresh->driver_name_actual);
        $this->assertTrue((bool) $fresh->is_driver_overridden);
    }

    public function test_mark_driver_paid_locks_siklus(): void
    {
        $siklus = $this->makeSiklus('complete');
        $response = $this->actingAs($this->admin())
            ->postJson("/dashboard/keuangan-jet/{$siklus->id}/driver-paid", [
                'confirm' => true,
            ]);
        $response->assertOk();
        $fresh = $siklus->fresh();
        $this->assertSame('locked', $fresh->status_siklus);
        $this->assertSame('sudah', $fresh->driver_paid_status);
    }

    public function test_mark_driver_paid_rejected_when_not_complete(): void
    {
        $siklus = $this->makeSiklus('berjalan');
        $response = $this->actingAs($this->admin())
            ->postJson("/dashboard/keuangan-jet/{$siklus->id}/driver-paid", [
                'confirm' => true,
            ]);
        $response->assertStatus(422);
    }

    public function test_update_row_jenis_layanan(): void
    {
        $siklus = $this->makeSiklus();
        $row = KeuanganJet::factory()->create([
            'keuangan_jet_siklus_id' => $siklus->id,
            'jenis_layanan' => 'Reguler',
        ]);

        $response = $this->actingAs($this->admin())
            ->postJson("/dashboard/keuangan-jet/jet/{$row->id}", [
                'jenis_layanan' => 'Rental',
                'sumber_rental' => 'driver',
                'persen_admin' => 10,
                'uang_snack' => 5000,
            ]);
        $response->assertOk();
        $fresh = $row->fresh();
        $this->assertSame('Rental', $fresh->jenis_layanan);
        $this->assertSame('driver', $fresh->sumber_rental);
        $this->assertSame(10, $fresh->persen_admin);
    }

    public function test_update_row_rental_without_sumber_rejected(): void
    {
        $siklus = $this->makeSiklus();
        $row = KeuanganJet::factory()->create(['keuangan_jet_siklus_id' => $siklus->id]);

        $response = $this->actingAs($this->admin())
            ->postJson("/dashboard/keuangan-jet/jet/{$row->id}", [
                'jenis_layanan' => 'Rental',
                'sumber_rental' => null,
                'persen_admin' => 15,
                'uang_snack' => 0,
            ]);
        $response->assertStatus(422);
    }

    public function test_update_row_blocked_when_admin_paid(): void
    {
        $siklus = $this->makeSiklus();
        $row = KeuanganJet::factory()->create([
            'keuangan_jet_siklus_id' => $siklus->id,
            'admin_paid_status' => 'sudah',
        ]);
        $response = $this->actingAs($this->admin())
            ->postJson("/dashboard/keuangan-jet/jet/{$row->id}", [
                'jenis_layanan' => 'Reguler',
                'persen_admin' => 15,
                'uang_snack' => 0,
            ]);
        $response->assertStatus(423);
    }

    public function test_admin_can_mark_admin_paid_per_row(): void
    {
        $siklus = $this->makeSiklus();
        $row = KeuanganJet::factory()->create(['keuangan_jet_siklus_id' => $siklus->id]);

        $response = $this->actingAs($this->admin())
            ->postJson("/dashboard/keuangan-jet/jet/{$row->id}/admin-paid", [
                'confirm' => true,
            ]);
        $response->assertOk();
        $this->assertSame('sudah', $row->fresh()->admin_paid_status);
    }
}
