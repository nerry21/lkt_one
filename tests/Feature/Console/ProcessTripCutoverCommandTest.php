<?php

namespace Tests\Feature\Console;

use App\Models\DailyDriverAssignment;
use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use App\Models\TripCutoverLog;
use App\Models\User;
use App\Services\TripGenerationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use RuntimeException;
use Tests\TestCase;

/**
 * Feature tests ProcessTripCutoverCommand (Fase D4 Sesi 24).
 *
 * Skenario:
 *   1. Happy: assignments ada → generate + log success
 *   2. Missing: no assignments → abort + log missing_assignments
 *   3. Idempotent: rerun same date → log idempotent_skip, exit 0
 *   4. Manual: --date arg → trigger_source=manual
 *   5. Retry exhausted: stub always fail → log failed retry_count=3
 *   6. Retry success: stub fail 1x then success → log success retry_count=1
 */
class ProcessTripCutoverCommandTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;
    private Mobil $mobil;
    private Driver $driver;

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow('2026-04-22 21:00:00');

        $this->admin = User::factory()->create(['role' => 'Admin']);
        $this->mobil = Mobil::factory()->create(['is_active_in_trip' => true, 'home_pool' => 'PKB']);
        $this->driver = Driver::factory()->create();
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    private function assignDriver(string $date): void
    {
        DailyDriverAssignment::create([
            'date' => $date,
            'mobil_id' => $this->mobil->id,
            'driver_id' => $this->driver->id,
            'created_by' => $this->admin->id,
            'updated_by' => $this->admin->id,
        ]);
    }

    public function test_cutover_generates_trips_and_logs_success_for_tomorrow(): void
    {
        $tomorrow = '2026-04-23';
        $this->assignDriver($tomorrow);

        $this->artisan('trips:cutover')->assertSuccessful();

        $this->assertDatabaseHas('trip_cutover_logs', [
            'target_date' => $tomorrow,
            'status' => TripCutoverLog::STATUS_SUCCESS,
            'trigger_source' => TripCutoverLog::TRIGGER_SCHEDULER,
            'retry_count' => 0,
        ]);

        $this->assertTrue(Trip::where('trip_date', $tomorrow)->exists());
    }

    public function test_cutover_aborts_when_no_driver_assignments_exist(): void
    {
        $tomorrow = '2026-04-23';

        $this->artisan('trips:cutover')->assertFailed();

        $this->assertDatabaseHas('trip_cutover_logs', [
            'target_date' => $tomorrow,
            'status' => TripCutoverLog::STATUS_MISSING_ASSIGNMENTS,
            'trigger_source' => TripCutoverLog::TRIGGER_SCHEDULER,
        ]);

        $this->assertFalse(Trip::where('trip_date', $tomorrow)->exists());
    }

    public function test_cutover_is_idempotent_on_rerun_same_date(): void
    {
        $tomorrow = '2026-04-23';
        $this->assignDriver($tomorrow);

        // First run: success
        $this->artisan('trips:cutover')->assertSuccessful();

        // Second run: trips already exist → idempotent_skip
        $this->artisan('trips:cutover')->assertSuccessful();

        $this->assertSame(
            2,
            TripCutoverLog::where('target_date', $tomorrow)->count()
        );
        $this->assertDatabaseHas('trip_cutover_logs', [
            'target_date' => $tomorrow,
            'status' => TripCutoverLog::STATUS_IDEMPOTENT_SKIP,
        ]);
    }

    public function test_cutover_accepts_date_option_for_manual_backfill(): void
    {
        $targetDate = '2026-04-30';
        $this->assignDriver($targetDate);

        $this->artisan('trips:cutover', ['--date' => $targetDate])
            ->assertSuccessful();

        $this->assertDatabaseHas('trip_cutover_logs', [
            'target_date' => $targetDate,
            'status' => TripCutoverLog::STATUS_SUCCESS,
            'trigger_source' => TripCutoverLog::TRIGGER_MANUAL,
        ]);
    }

    public function test_cutover_logs_failure_after_retry_exhausted(): void
    {
        $tomorrow = '2026-04-23';
        $this->assignDriver($tomorrow);

        // Stub extends concrete class (constructor type-hint requires it);
        // skip parent __construct so PoolStateService dep tidak perlu.
        $this->app->instance(TripGenerationService::class, new class extends TripGenerationService {
            public function __construct()
            {
                // intentionally skip parent — generateForDate override tidak butuh deps
            }

            public function generateForDate(string $tripDate, array $driverAssignments): array
            {
                throw new RuntimeException('Simulated persistent failure');
            }
        });

        $this->artisan('trips:cutover')->assertFailed();

        $this->assertDatabaseHas('trip_cutover_logs', [
            'target_date' => $tomorrow,
            'status' => TripCutoverLog::STATUS_FAILED,
            'retry_count' => 3,
        ]);

        $log = TripCutoverLog::where('target_date', $tomorrow)->first();
        $this->assertStringContainsString('Simulated persistent failure', $log->error_message);
    }

    public function test_cutover_recovers_via_retry_on_transient_failure(): void
    {
        $tomorrow = '2026-04-23';
        $this->assignDriver($tomorrow);

        // Resolve real service before overriding binding.
        $real = $this->app->make(TripGenerationService::class);

        // Stub: throw once, then delegate to real.
        $this->app->instance(TripGenerationService::class, new class($real) extends TripGenerationService {
            private int $callCount = 0;

            public function __construct(private TripGenerationService $real)
            {
                // intentionally skip parent — we delegate to $real
            }

            public function generateForDate(string $tripDate, array $driverAssignments): array
            {
                $this->callCount++;
                if ($this->callCount === 1) {
                    throw new RuntimeException('Transient error');
                }
                return $this->real->generateForDate($tripDate, $driverAssignments);
            }
        });

        $this->artisan('trips:cutover')->assertSuccessful();

        $this->assertDatabaseHas('trip_cutover_logs', [
            'target_date' => $tomorrow,
            'status' => TripCutoverLog::STATUS_SUCCESS,
            'retry_count' => 1,
        ]);
    }
}
