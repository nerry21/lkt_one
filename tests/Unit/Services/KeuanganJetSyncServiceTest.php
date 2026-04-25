<?php

namespace Tests\Unit\Services;

use App\Models\Booking;
use App\Models\Driver;
use App\Models\KeuanganJet;
use App\Models\KeuanganJetSiklus;
use App\Models\Mobil;
use App\Models\Trip;
use App\Services\KeuanganJetSyncService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class KeuanganJetSyncServiceTest extends TestCase
{
    use RefreshDatabase;

    private KeuanganJetSyncService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = app(KeuanganJetSyncService::class);
    }

    private function makeTrip(string $direction = 'ROHUL_TO_PKB'): Trip
    {
        $mobil = Mobil::factory()->create(['kode_mobil' => 'JET 01']);
        $driver = Driver::factory()->create(['nama' => 'Driver A']);
        return Trip::factory()->create([
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
            'direction' => $direction,
            'trip_date' => '2026-04-25',
            'trip_time' => '07:00:00',
            'status' => 'scheduled',
        ]);
    }

    public function test_sync_keberangkatan_creates_new_siklus(): void
    {
        $trip = $this->makeTrip('ROHUL_TO_PKB');
        $row = $this->service->syncTripToKeuanganJet($trip);
        $this->assertSame('Keberangkatan', $row->direction);
        $this->assertSame('berjalan', $row->siklus->status_siklus);
        $this->assertSame(1, $row->trip_ke);
    }

    public function test_sync_kepulangan_pairs_to_existing_siklus(): void
    {
        $kbgTrip = $this->makeTrip('ROHUL_TO_PKB');
        $kbgRow = $this->service->syncTripToKeuanganJet($kbgTrip);

        $kplTrip = Trip::factory()->create([
            'mobil_id' => $kbgTrip->mobil_id,
            'driver_id' => $kbgTrip->driver_id,
            'direction' => 'PKB_TO_ROHUL',
            'trip_date' => '2026-04-25',
            'trip_time' => '13:00:00',
            'status' => 'scheduled',
        ]);
        $kplRow = $this->service->syncTripToKeuanganJet($kplTrip);

        $this->assertSame($kbgRow->keuangan_jet_siklus_id, $kplRow->keuangan_jet_siklus_id);
        $this->assertSame('Kepulangan', $kplRow->direction);
        $this->assertSame(2, $kplRow->trip_ke);
    }

    public function test_sync_idempotent_same_trip(): void
    {
        $trip = $this->makeTrip();
        $row1 = $this->service->syncTripToKeuanganJet($trip);
        $row2 = $this->service->syncTripToKeuanganJet($trip);
        $this->assertSame($row1->id, $row2->id);
        $this->assertSame(1, KeuanganJet::count());
    }

    public function test_refresh_pulls_booking_data(): void
    {
        $trip = $this->makeTrip();
        $row = $this->service->syncTripToKeuanganJet($trip);

        Booking::factory()->count(3)->create([
            'trip_id' => $trip->id,
            'category' => 'Reguler',
            'total_amount' => 100000,
        ]);
        Booking::factory()->create([
            'trip_id' => $trip->id,
            'category' => 'Paket',
            'total_amount' => 50000,
        ]);

        $refreshed = $this->service->refreshFromBookings($row->fresh());
        $this->assertSame(3, $refreshed->jumlah_penumpang);
        $this->assertSame('300000.00', $refreshed->total_ongkos_penumpang);
        $this->assertSame(1, $refreshed->jumlah_paket);
        $this->assertSame('50000.00', $refreshed->total_ongkos_paket);
    }

    public function test_recompute_below_threshold_no_admin(): void
    {
        $trip = $this->makeTrip();
        $row = $this->service->syncTripToKeuanganJet($trip);
        $row->update([
            'total_ongkos_penumpang' => 200_000,
            'total_ongkos_paket' => 100_000,
        ]);
        $recomputed = $this->service->recomputeFormula($row->fresh());
        $this->assertFalse((bool) $recomputed->trigger_admin);
        $this->assertSame('0.00', $recomputed->uang_admin);
        $this->assertSame('300000.00', $recomputed->basis_admin);
    }

    public function test_recompute_at_threshold_triggers_admin(): void
    {
        $trip = $this->makeTrip();
        $row = $this->service->syncTripToKeuanganJet($trip);
        $row->update([
            'total_ongkos_penumpang' => 420_000,
            'total_ongkos_paket' => 0,
            'persen_admin' => 15,
        ]);
        $recomputed = $this->service->recomputeFormula($row->fresh());
        $this->assertTrue((bool) $recomputed->trigger_admin);
        $this->assertSame('63000.00', $recomputed->uang_admin);
    }

    public function test_recompute_paket_only_triggers_admin(): void
    {
        $trip = $this->makeTrip();
        $row = $this->service->syncTripToKeuanganJet($trip);
        $row->update([
            'total_ongkos_penumpang' => 0,
            'total_ongkos_paket' => 500_000,
            'persen_admin' => 15,
        ]);
        $recomputed = $this->service->recomputeFormula($row->fresh());
        $this->assertTrue((bool) $recomputed->trigger_admin);
        $this->assertSame('75000.00', $recomputed->uang_admin);
    }

    public function test_recompute_snack_excluded_from_basis(): void
    {
        $trip = $this->makeTrip();
        $row = $this->service->syncTripToKeuanganJet($trip);
        $row->update([
            'total_ongkos_penumpang' => 200_000,
            'uang_snack' => 50_000,
        ]);
        $recomputed = $this->service->recomputeFormula($row->fresh());
        $this->assertSame('200000.00', $recomputed->basis_admin);
        $this->assertSame('250000.00', $recomputed->total_pendapatan_arah);
    }

    public function test_complete_siklus_triggers_aggregate(): void
    {
        $kbgTrip = $this->makeTrip('ROHUL_TO_PKB');
        $kbgRow = $this->service->syncTripToKeuanganJet($kbgTrip);
        $kbgRow->update(['total_ongkos_penumpang' => 500_000, 'persen_admin' => 15]);
        $this->service->recomputeFormula($kbgRow->fresh());

        $kplTrip = Trip::factory()->create([
            'mobil_id' => $kbgTrip->mobil_id,
            'driver_id' => $kbgTrip->driver_id,
            'direction' => 'PKB_TO_ROHUL',
            'trip_date' => '2026-04-25',
            'trip_time' => '13:00:00',
            'status' => 'scheduled',
        ]);
        $kplRow = $this->service->syncTripToKeuanganJet($kplTrip);
        $kplRow->update(['total_ongkos_penumpang' => 600_000, 'persen_admin' => 15]);
        $this->service->recomputeFormula($kplRow->fresh());

        $siklus = KeuanganJetSiklus::find($kbgRow->keuangan_jet_siklus_id);
        $siklus->update(['uang_jalan' => 100_000, 'biaya_kurir' => 20_000, 'biaya_cuci_mobil' => 30_000]);

        $completed = $this->service->completeSiklus($siklus->fresh(), 'regular_return');
        $this->assertSame('complete', $completed->status_siklus);
        $this->assertSame('500000.00', $completed->total_revenue_kbg);
        $this->assertSame('600000.00', $completed->total_revenue_kpl);
        $this->assertSame('1100000.00', $completed->total_pendapatan_kotor);
        $this->assertSame('75000.00', $completed->total_uang_admin_kbg);
        $this->assertSame('90000.00', $completed->total_uang_admin_kpl);
        $this->assertSame('165000.00', $completed->total_admin_potong);
        $this->assertSame('150000.00', $completed->total_operasional);
        $this->assertSame('785000.00', $completed->total_pendapatan_bersih);
        $this->assertSame('235500.00', $completed->uang_driver);
        $this->assertSame('549500.00', $completed->uang_mobil);
    }

    public function test_complete_siklus_locked_no_unlock(): void
    {
        $siklus = KeuanganJetSiklus::factory()->locked()->create();
        $result = $this->service->completeSiklus($siklus, 'manual');
        $this->assertSame('locked', $result->status_siklus);
    }

    public function test_aggregate_berjalan_resets_to_zero(): void
    {
        $siklus = KeuanganJetSiklus::factory()->create([
            'status_siklus' => 'berjalan',
            'total_pendapatan_kotor' => 999_999,
            'uang_driver' => 100_000,
        ]);
        $aggregated = $this->service->aggregateSiklus($siklus);
        $this->assertSame('0.00', $aggregated->total_pendapatan_kotor);
        $this->assertSame('0.00', $aggregated->uang_driver);
    }
}
