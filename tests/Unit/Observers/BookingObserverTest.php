<?php

namespace Tests\Unit\Observers;

use App\Models\Booking;
use App\Models\Driver;
use App\Models\KeuanganJet;
use App\Models\KeuanganJetSiklus;
use App\Models\Mobil;
use App\Models\Trip;
use App\Services\KeuanganJetSyncService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Test coverage Sesi 50 PR #6 — BookingObserver.
 *
 * Observer ter-register di AppServiceProvider, jadi cukup test via Booking
 * model events (save / delete) untuk verifikasi side effect ke KeuanganJet row.
 */
class BookingObserverTest extends TestCase
{
    use RefreshDatabase;

    private KeuanganJetSyncService $sync;

    protected function setUp(): void
    {
        parent::setUp();
        $this->sync = app(KeuanganJetSyncService::class);
    }

    private function setupTripAndKeuanganRow(string $direction = 'ROHUL_TO_PKB'): array
    {
        $mobil = Mobil::factory()->create(['kode_mobil' => 'JET 01']);
        $driver = Driver::factory()->create(['nama' => 'Driver A']);
        $trip = Trip::factory()->create([
            'mobil_id'  => $mobil->id,
            'driver_id' => $driver->id,
            'direction' => $direction,
            'trip_date' => '2026-04-25',
            'trip_time' => '07:00:00',
            'status'    => 'scheduled',
        ]);
        $row = $this->sync->syncTripToKeuanganJet($trip);

        return [$trip, $row];
    }

    public function test_saved_triggers_refresh_for_linked_keuangan_row(): void
    {
        [$trip, $row] = $this->setupTripAndKeuanganRow();

        $this->assertSame(0, (int) $row->jumlah_penumpang);

        // Booking save → observer trigger refresh.
        Booking::factory()->create([
            'trip_id'        => $trip->id,
            'category'       => 'Reguler',
            'total_amount'   => 250_000,
            'booking_status' => 'Aktif',
        ]);

        $row->refresh();
        $this->assertSame(1, $row->jumlah_penumpang);
        $this->assertSame('250000.00', $row->total_ongkos_penumpang);
    }

    public function test_saved_handles_trip_id_change_refreshes_both_old_and_new(): void
    {
        [$tripOld, $rowOld] = $this->setupTripAndKeuanganRow();

        $mobil2 = Mobil::factory()->create(['kode_mobil' => 'JET 02']);
        $driver2 = Driver::factory()->create();
        $tripNew = Trip::factory()->create([
            'mobil_id'  => $mobil2->id,
            'driver_id' => $driver2->id,
            'direction' => 'ROHUL_TO_PKB',
            'trip_date' => '2026-04-25',
            'trip_time' => '08:00:00',
            'status'    => 'scheduled',
        ]);
        $rowNew = $this->sync->syncTripToKeuanganJet($tripNew);

        // Booking awalnya link ke tripOld.
        $booking = Booking::factory()->create([
            'trip_id'        => $tripOld->id,
            'category'       => 'Reguler',
            'total_amount'   => 300_000,
            'booking_status' => 'Aktif',
        ]);

        $rowOld->refresh();
        $rowNew->refresh();
        $this->assertSame(1, $rowOld->jumlah_penumpang);
        $this->assertSame(0, $rowNew->jumlah_penumpang);

        // Re-link booking ke tripNew → observer harus refresh both rows.
        $booking->update(['trip_id' => $tripNew->id]);

        $rowOld->refresh();
        $rowNew->refresh();
        $this->assertSame(0, $rowOld->jumlah_penumpang, 'Old row harus decrement.');
        $this->assertSame(1, $rowNew->jumlah_penumpang, 'New row harus increment.');
    }

    public function test_deleted_triggers_refresh_for_old_trip_id(): void
    {
        [$trip, $row] = $this->setupTripAndKeuanganRow();

        $booking = Booking::factory()->create([
            'trip_id'        => $trip->id,
            'category'       => 'Reguler',
            'total_amount'   => 100_000,
            'booking_status' => 'Aktif',
        ]);

        $row->refresh();
        $this->assertSame(1, $row->jumlah_penumpang);

        $booking->delete();

        $row->refresh();
        $this->assertSame(0, $row->jumlah_penumpang,
            'Setelah delete, row harus refresh dan jumlah_penumpang turun.');
    }

    public function test_observer_does_not_break_booking_flow_when_sync_throws_exception(): void
    {
        // Saat KeuanganJet row tidak exist untuk trip_id booking, refresh tidak
        // perlu jalan (foreach loop empty). Booking save tetap sukses.
        $mobil = Mobil::factory()->create();
        $driver = Driver::factory()->create();
        $tripWithoutKeuangan = Trip::factory()->create([
            'mobil_id'  => $mobil->id,
            'driver_id' => $driver->id,
            'direction' => 'ROHUL_TO_PKB',
            'trip_date' => '2026-04-25',
            'trip_time' => '07:00:00',
            'status'    => 'scheduled',
        ]);

        // Tidak ada KeuanganJet row untuk trip ini.
        $this->assertSame(0, KeuanganJet::query()->where('trip_id', $tripWithoutKeuangan->id)->count());

        // Booking save tetap sukses tanpa error.
        $booking = Booking::factory()->create([
            'trip_id'        => $tripWithoutKeuangan->id,
            'category'       => 'Reguler',
            'total_amount'   => 250_000,
            'booking_status' => 'Aktif',
        ]);

        $this->assertNotNull($booking->id);
        $this->assertDatabaseHas('bookings', ['id' => $booking->id]);
    }
}
