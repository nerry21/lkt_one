<?php

namespace Tests\Feature;

use App\Models\Driver;
use App\Models\KeuanganJet;
use App\Models\KeuanganJetSiklus;
use App\Models\Mobil;
use App\Models\Trip;
use App\Services\KeuanganJetSyncService;
use App\Services\TripRotationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class KeuanganJetTripIntegrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_trip_generation_creates_keuangan_jet_row(): void
    {
        $mobil = Mobil::factory()->create(['kode_mobil' => 'JET 01', 'home_pool' => 'ROHUL']);
        $driver = Driver::factory()->create();
        $trip = Trip::factory()->create([
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
            'direction' => 'ROHUL_TO_PKB',
            'trip_date' => '2026-04-25',
            'trip_time' => '07:00:00',
            'status' => 'scheduled',
        ]);

        $sync = app(KeuanganJetSyncService::class);
        $row = $sync->syncTripToKeuanganJet($trip);

        $this->assertNotNull($row);
        $this->assertSame('Keberangkatan', $row->direction);
        $this->assertSame($mobil->kode_mobil, $row->mobil_code);
    }

    public function test_mark_berangkat_kepulangan_completes_siklus(): void
    {
        $mobil = Mobil::factory()->create(['kode_mobil' => 'JET 01']);
        $driver = Driver::factory()->create();

        $kbgTrip = Trip::factory()->create([
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
            'direction' => 'ROHUL_TO_PKB',
            'trip_date' => '2026-04-25',
            'trip_time' => '07:00:00',
            'status' => 'scheduled',
        ])->refresh();
        $kplTrip = Trip::factory()->create([
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
            'direction' => 'PKB_TO_ROHUL',
            'trip_date' => '2026-04-25',
            'trip_time' => '13:00:00',
            'status' => 'scheduled',
        ])->refresh();

        $sync = app(KeuanganJetSyncService::class);
        $sync->syncTripToKeuanganJet($kbgTrip);
        $sync->syncTripToKeuanganJet($kplTrip);

        $rotation = app(TripRotationService::class);
        $rotation->markBerangkat($kbgTrip->id, $kbgTrip->version);

        $siklus = KeuanganJet::where('trip_id', $kbgTrip->id)->first()->siklus;
        $this->assertSame('berjalan', $siklus->fresh()->status_siklus);

        $rotation->markBerangkat($kplTrip->id, $kplTrip->version);
        $this->assertSame('complete', $siklus->fresh()->status_siklus);
    }

    public function test_mark_berangkat_keberangkatan_does_not_complete_siklus(): void
    {
        $mobil = Mobil::factory()->create();
        $driver = Driver::factory()->create();
        $trip = Trip::factory()->create([
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
            'direction' => 'ROHUL_TO_PKB',
            'trip_date' => '2026-04-25',
            'trip_time' => '07:00:00',
            'status' => 'scheduled',
        ])->refresh();

        $sync = app(KeuanganJetSyncService::class);
        $sync->syncTripToKeuanganJet($trip);

        $rotation = app(TripRotationService::class);
        $rotation->markBerangkat($trip->id, $trip->version);

        $siklus = KeuanganJet::where('trip_id', $trip->id)->first()->siklus;
        $this->assertSame('berjalan', $siklus->fresh()->status_siklus);
    }

    public function test_orphan_kepulangan_creates_own_siklus(): void
    {
        $mobil = Mobil::factory()->create();
        $driver = Driver::factory()->create();
        $trip = Trip::factory()->create([
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
            'direction' => 'PKB_TO_ROHUL',
            'trip_date' => '2026-04-25',
            'trip_time' => '13:00:00',
            'status' => 'scheduled',
        ]);

        $sync = app(KeuanganJetSyncService::class);
        $row = $sync->syncTripToKeuanganJet($trip);

        $this->assertSame('Kepulangan', $row->direction);
        $this->assertSame('berjalan', $row->siklus->status_siklus);
        $this->assertSame(1, KeuanganJetSiklus::count());
    }

    public function test_idempotent_resync_same_trip(): void
    {
        $mobil = Mobil::factory()->create();
        $driver = Driver::factory()->create();
        $trip = Trip::factory()->create([
            'mobil_id' => $mobil->id,
            'driver_id' => $driver->id,
            'direction' => 'ROHUL_TO_PKB',
            'trip_date' => '2026-04-25',
            'trip_time' => '07:00:00',
            'status' => 'scheduled',
        ]);

        $sync = app(KeuanganJetSyncService::class);
        $row1 = $sync->syncTripToKeuanganJet($trip);
        $row2 = $sync->syncTripToKeuanganJet($trip);
        $row3 = $sync->syncTripToKeuanganJet($trip);

        $this->assertSame($row1->id, $row2->id);
        $this->assertSame($row1->id, $row3->id);
        $this->assertSame(1, KeuanganJet::count());
        $this->assertSame(1, KeuanganJetSiklus::count());
    }
}
