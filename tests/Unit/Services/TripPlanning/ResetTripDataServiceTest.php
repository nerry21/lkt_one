<?php

namespace Tests\Unit\Services\TripPlanning;

use App\Models\Booking;
use App\Models\DailyAssignmentPin;
use App\Models\DailyDriverAssignment;
use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use App\Models\TripDataResetLog;
use App\Models\User;
use App\Services\TripPlanning\ResetTripDataService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

/**
 * Unit test untuk ResetTripDataService (Feature E5 PR #5).
 *
 * Coverage:
 *   - resetForDate scoped per-tanggal (no JSON snapshot)
 *   - resetAll lintas tanggal (DENGAN JSON snapshot)
 *   - Trip historis (berangkat / keluar_trip) tidak ikut dihapus
 *   - Pin di-clear, assignment row TIDAK dihapus
 *   - Bookings.trip_id di-NULL
 *   - Audit log entry tercatat dengan summary
 */
class ResetTripDataServiceTest extends TestCase
{
    use RefreshDatabase;

    protected ResetTripDataService $svc;
    protected User $admin;
    protected Mobil $mobil;
    protected Driver $driver;

    private const TODAY = '2026-04-26';
    private const TOMORROW = '2026-04-27';

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow('2026-04-26 09:00:00');
        $this->svc = $this->app->make(ResetTripDataService::class);
        $this->admin = User::factory()->create(['role' => 'Admin']);
        $this->mobil = Mobil::factory()->create();
        $this->driver = Driver::factory()->create();
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    private function makeTripFor(string $date, string $status, string $time = '07:00:00'): Trip
    {
        return Trip::factory()->create([
            'trip_date' => $date,
            'trip_time' => $time,
            'direction' => 'PKB_TO_ROHUL',
            'sequence' => 1,
            'mobil_id' => $this->mobil->id,
            'driver_id' => $this->driver->id,
            'status' => $status,
        ]);
    }

    public function test_reset_for_date_deletes_only_scheduled_trips_for_target_date(): void
    {
        $tripScheduled = $this->makeTripFor(self::TODAY, 'scheduled');
        $tripScheduledOtherDay = $this->makeTripFor(self::TOMORROW, 'scheduled', '08:00:00');

        $summary = $this->svc->resetForDate(self::TODAY, $this->admin->id);

        $this->assertSame(1, $summary['trips_deleted']);
        $this->assertDatabaseMissing('trips', ['id' => $tripScheduled->id]);
        // Trip di tanggal lain tidak ter-touched.
        $this->assertDatabaseHas('trips', ['id' => $tripScheduledOtherDay->id]);
    }

    public function test_reset_for_date_keeps_berangkat_and_keluar_trip_status_intact(): void
    {
        $tripBerangkat = $this->makeTripFor(self::TODAY, 'berangkat', '05:30:00');
        $tripKeluar = Trip::factory()->keluarTrip('out', 'PKB')->create([
            'trip_date' => self::TODAY,
            'trip_time' => '13:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence' => 2,
            'mobil_id' => $this->mobil->id,
            'driver_id' => Driver::factory()->create()->id,
        ]);
        $tripScheduled = $this->makeTripFor(self::TODAY, 'scheduled', '16:00:00');

        $summary = $this->svc->resetForDate(self::TODAY, $this->admin->id);

        $this->assertSame(1, $summary['trips_deleted']);
        // Historis trip TETAP ADA.
        $this->assertDatabaseHas('trips', ['id' => $tripBerangkat->id, 'status' => 'berangkat']);
        $this->assertDatabaseHas('trips', ['id' => $tripKeluar->id, 'status' => 'keluar_trip']);
        // Scheduled trip dihapus.
        $this->assertDatabaseMissing('trips', ['id' => $tripScheduled->id]);
    }

    public function test_reset_for_date_clears_pins_only_for_target_date_assignments(): void
    {
        $assignmentToday = DailyDriverAssignment::factory()->create([
            'date' => self::TODAY,
            'mobil_id' => $this->mobil->id,
            'driver_id' => $this->driver->id,
        ]);
        DailyAssignmentPin::factory()->create([
            'daily_driver_assignment_id' => $assignmentToday->id,
            'direction' => 'ROHUL_TO_PKB',
            'trip_time' => '05:30:00',
        ]);

        $assignmentTomorrow = DailyDriverAssignment::factory()->create([
            'date' => self::TOMORROW,
            'mobil_id' => $this->mobil->id,
            'driver_id' => Driver::factory()->create()->id,
        ]);
        DailyAssignmentPin::factory()->create([
            'daily_driver_assignment_id' => $assignmentTomorrow->id,
            'direction' => 'PKB_TO_ROHUL',
            'trip_time' => '13:00:00',
        ]);

        $summary = $this->svc->resetForDate(self::TODAY, $this->admin->id);

        $this->assertSame(1, $summary['assignments_pins_cleared']);

        // Pin tanggal hari ini hilang, pin besok tetap.
        $this->assertSame(0, DailyAssignmentPin::where('daily_driver_assignment_id', $assignmentToday->id)->count());
        $this->assertSame(1, DailyAssignmentPin::where('daily_driver_assignment_id', $assignmentTomorrow->id)->count());

        // Assignment row TIDAK dihapus (driver-mobil mapping tetap).
        $this->assertDatabaseHas('daily_driver_assignments', ['id' => $assignmentToday->id]);
        $this->assertDatabaseHas('daily_driver_assignments', ['id' => $assignmentTomorrow->id]);
    }

    public function test_reset_for_date_unlinks_bookings_trip_id(): void
    {
        $trip = $this->makeTripFor(self::TODAY, 'scheduled');
        $booking = Booking::factory()->create(['trip_id' => $trip->id]);

        $summary = $this->svc->resetForDate(self::TODAY, $this->admin->id);

        $this->assertSame(1, $summary['bookings_unlinked']);
        $this->assertDatabaseHas('bookings', ['id' => $booking->id, 'trip_id' => null]);
    }

    public function test_reset_for_date_creates_audit_log_entry(): void
    {
        $this->makeTripFor(self::TODAY, 'scheduled');

        $this->svc->resetForDate(self::TODAY, $this->admin->id);

        $log = TripDataResetLog::query()->latest()->first();
        $this->assertNotNull($log);
        $this->assertSame('today', $log->scope);
        $this->assertSame(self::TODAY, $log->target_date->toDateString());
        $this->assertSame($this->admin->id, $log->user_id);
        $this->assertNull($log->snapshot);
        $this->assertSame(1, $log->summary['trips_deleted']);
    }

    public function test_reset_all_deletes_scheduled_trips_across_dates_and_creates_snapshot(): void
    {
        $tripToday = $this->makeTripFor(self::TODAY, 'scheduled');
        $tripTomorrow = $this->makeTripFor(self::TOMORROW, 'scheduled', '08:00:00');
        $tripBerangkat = $this->makeTripFor('2026-04-25', 'berangkat', '05:30:00');

        $summary = $this->svc->resetAll($this->admin->id);

        $this->assertSame(2, $summary['trips_deleted']);
        $this->assertDatabaseMissing('trips', ['id' => $tripToday->id]);
        $this->assertDatabaseMissing('trips', ['id' => $tripTomorrow->id]);
        // Trip historis TETAP.
        $this->assertDatabaseHas('trips', ['id' => $tripBerangkat->id]);

        $log = TripDataResetLog::query()->latest()->first();
        $this->assertNotNull($log);
        $this->assertSame('all', $log->scope);
        $this->assertNull($log->target_date);
        $this->assertNotNull($log->snapshot, 'Reset Semua harus simpan JSON snapshot');
        $this->assertArrayHasKey('trips', $log->snapshot);
        $this->assertCount(2, $log->snapshot['trips'], 'Snapshot harus include 2 trip yang dihapus');
        $this->assertArrayHasKey('taken_at', $log->snapshot);
    }
}
