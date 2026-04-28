<?php

namespace Tests\Feature;

use App\Models\KeuanganJet;
use App\Models\KeuanganJetSiklus;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

/**
 * Feature test Sesi 50 PR #6 — filter Jenis Layanan di /dashboard/keuangan-jet.
 *
 * Coverage: query parameter `jenis_layanan` filter siklus list berdasarkan
 * keuangan_jet child rows yang match.
 */
class KeuanganJetFilterTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow('2026-05-05 10:00:00');
        $this->admin = User::factory()->create(['role' => 'Admin']);
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    /**
     * Buat siklus + 1 keuangan_jet row dengan jenis_layanan tertentu.
     * tanggal_mulai dalam 7 hari terakhir supaya masuk default filter.
     */
    private function makeSiklusWithJenis(string $jenisLayanan, string $mobilCode): KeuanganJetSiklus
    {
        $siklus = KeuanganJetSiklus::factory()->create([
            'tanggal_mulai' => now()->subDay()->toDateString(),
            'mobil_code'    => $mobilCode,
            'status_siklus' => 'berjalan',
        ]);

        KeuanganJet::factory()->create([
            'keuangan_jet_siklus_id' => $siklus->id,
            'mobil_id'               => $siklus->mobil_id,
            'mobil_code'             => $siklus->mobil_code,
            'jenis_layanan'          => $jenisLayanan,
        ]);

        return $siklus;
    }

    public function test_index_filters_by_jenis_layanan_reguler(): void
    {
        $regulerSiklus  = $this->makeSiklusWithJenis('Reguler', 'JET 01');
        $droppingSiklus = $this->makeSiklusWithJenis('Dropping', 'JET 02');
        $rentalSiklus   = $this->makeSiklusWithJenis('Rental', 'JET 03');

        $response = $this->actingAs($this->admin)
            ->get(route('keuangan-jet.index', ['jenis_layanan' => 'Reguler']));

        $response->assertOk();
        $siklusList = $response->viewData('siklusList');
        $ids = $siklusList->pluck('id')->all();

        $this->assertContains($regulerSiklus->id, $ids);
        $this->assertNotContains($droppingSiklus->id, $ids);
        $this->assertNotContains($rentalSiklus->id, $ids);
    }

    public function test_index_filters_by_jenis_layanan_rental(): void
    {
        $regulerSiklus = $this->makeSiklusWithJenis('Reguler', 'JET 01');
        $rentalSiklus  = $this->makeSiklusWithJenis('Rental', 'JET 02');

        $response = $this->actingAs($this->admin)
            ->get(route('keuangan-jet.index', ['jenis_layanan' => 'Rental']));

        $response->assertOk();
        $siklusList = $response->viewData('siklusList');
        $ids = $siklusList->pluck('id')->all();

        $this->assertContains($rentalSiklus->id, $ids);
        $this->assertNotContains($regulerSiklus->id, $ids);
    }

    public function test_index_returns_all_when_no_jenis_layanan_filter(): void
    {
        $regulerSiklus  = $this->makeSiklusWithJenis('Reguler', 'JET 01');
        $droppingSiklus = $this->makeSiklusWithJenis('Dropping', 'JET 02');
        $rentalSiklus   = $this->makeSiklusWithJenis('Rental', 'JET 03');

        $response = $this->actingAs($this->admin)
            ->get(route('keuangan-jet.index'));

        $response->assertOk();
        $siklusList = $response->viewData('siklusList');
        $ids = $siklusList->pluck('id')->all();

        $this->assertContains($regulerSiklus->id, $ids);
        $this->assertContains($droppingSiklus->id, $ids);
        $this->assertContains($rentalSiklus->id, $ids);
    }
}
