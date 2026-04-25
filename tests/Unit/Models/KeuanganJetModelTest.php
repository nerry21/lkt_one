<?php

namespace Tests\Unit\Models;

use App\Models\KeuanganJet;
use App\Models\KeuanganJetSiklus;
use App\Models\Mobil;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class KeuanganJetModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_siklus_belongs_to_mobil(): void
    {
        $siklus = KeuanganJetSiklus::factory()->create();
        $this->assertInstanceOf(Mobil::class, $siklus->mobil);
        $this->assertSame($siklus->mobil_id, $siklus->mobil->id);
    }

    public function test_siklus_has_many_keuangan_jets(): void
    {
        $siklus = KeuanganJetSiklus::factory()->create();
        KeuanganJet::factory()->count(2)->create([
            'keuangan_jet_siklus_id' => $siklus->id,
        ]);
        $this->assertCount(2, $siklus->fresh()->keuanganJets);
    }

    public function test_siklus_decimal_casts(): void
    {
        $siklus = KeuanganJetSiklus::factory()->create([
            'uang_driver' => 100000.50,
            'uang_mobil' => 233334.50,
        ]);
        $this->assertSame('100000.50', $siklus->uang_driver);
        $this->assertSame('233334.50', $siklus->uang_mobil);
    }

    public function test_siklus_status_default_berjalan(): void
    {
        $siklus = KeuanganJetSiklus::factory()->create();
        $this->assertSame('berjalan', $siklus->status_siklus);
        $this->assertSame('belum', $siklus->driver_paid_status);
    }

    public function test_siklus_complete_state(): void
    {
        $siklus = KeuanganJetSiklus::factory()->complete()->create();
        $this->assertSame('complete', $siklus->status_siklus);
        $this->assertNotNull($siklus->completed_at);
    }

    public function test_keuangan_jet_belongs_to_siklus(): void
    {
        $row = KeuanganJet::factory()->create();
        $this->assertInstanceOf(KeuanganJetSiklus::class, $row->siklus);
    }

    public function test_keuangan_jet_direction_enum(): void
    {
        $kbg = KeuanganJet::factory()->keberangkatan()->create();
        $kpl = KeuanganJet::factory()->kepulangan()->create();
        $this->assertSame('Keberangkatan', $kbg->direction);
        $this->assertSame('Kepulangan', $kpl->direction);
    }

    public function test_keuangan_jet_rental_loket_persen_15(): void
    {
        $row = KeuanganJet::factory()->rental('loket')->create();
        $this->assertSame('Rental', $row->jenis_layanan);
        $this->assertSame('loket', $row->sumber_rental);
        $this->assertSame(15, $row->persen_admin);
    }

    public function test_keuangan_jet_rental_driver_persen_10(): void
    {
        $row = KeuanganJet::factory()->rental('driver')->create();
        $this->assertSame('Rental', $row->jenis_layanan);
        $this->assertSame('driver', $row->sumber_rental);
        $this->assertSame(10, $row->persen_admin);
    }

    public function test_keuangan_jet_cascade_delete_from_siklus(): void
    {
        $siklus = KeuanganJetSiklus::factory()->create();
        $row = KeuanganJet::factory()->create(['keuangan_jet_siklus_id' => $siklus->id]);
        $siklus->delete();
        $this->assertNull(KeuanganJet::find($row->id));
    }

    public function test_keuangan_jet_unique_trip_id(): void
    {
        $trip = Trip::factory()->create();
        KeuanganJet::factory()->create(['trip_id' => $trip->id]);

        $this->expectException(\Illuminate\Database\QueryException::class);
        KeuanganJet::factory()->create(['trip_id' => $trip->id]);
    }
}
