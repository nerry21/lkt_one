<?php

declare(strict_types=1);

namespace Tests\Unit\Services\Bridge;

use App\Models\DailyAssignmentPin;
use App\Models\DailyDriverAssignment;
use App\Models\Driver;
use App\Models\Mobil;
use App\Models\User;
use App\Services\Bridge\BridgeTripPlanningService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BridgeTripPlanningServiceTest extends TestCase
{
    use RefreshDatabase;

    private BridgeTripPlanningService $service;
    private string $userId;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new BridgeTripPlanningService();
        $this->userId = (string) User::factory()->create(['role' => 'Super Admin'])->id;
    }

    public function test_setup_creates_daily_driver_assignments_for_all_mobil(): void
    {
        $m1 = Mobil::factory()->create(['kode_mobil' => 'JET 01', 'is_active_in_trip' => true]);
        $m2 = Mobil::factory()->create(['kode_mobil' => 'JET 02', 'is_active_in_trip' => true]);
        $d1 = Driver::factory()->create(['nama' => 'Pak Joni']);
        $d2 = Driver::factory()->create(['nama' => 'Pak Sulaiman']);

        $result = $this->service->setup('2026-05-04', [
            ['mobil_id' => $m1->id, 'driver_id' => $d1->id, 'pool_override' => null, 'is_skipped' => false],
            ['mobil_id' => $m2->id, 'driver_id' => $d2->id, 'pool_override' => null, 'is_skipped' => false],
        ], $this->userId);

        $this->assertSame('2026-05-04', $result['date']);
        $this->assertSame(2, $result['assignments_count']);
        $this->assertSame(0, $result['skipped_count']);
        $this->assertSame(0, $result['pins_count']);
        $this->assertSame(2, DailyDriverAssignment::count());
    }

    public function test_setup_handles_skipped_mobil_correctly(): void
    {
        $m1 = Mobil::factory()->create(['kode_mobil' => 'JET 01']);
        $m2 = Mobil::factory()->create(['kode_mobil' => 'JET 02']);
        $d1 = Driver::factory()->create();

        // Pre-existing assignment for m2 — should be deleted by skip
        DailyDriverAssignment::factory()->create([
            'date' => '2026-05-04',
            'mobil_id' => $m2->id,
            'driver_id' => $d1->id,
        ]);

        $result = $this->service->setup('2026-05-04', [
            ['mobil_id' => $m1->id, 'driver_id' => $d1->id, 'pool_override' => null, 'is_skipped' => false],
            ['mobil_id' => $m2->id, 'driver_id' => null, 'pool_override' => null, 'is_skipped' => true],
        ], $this->userId);

        $this->assertSame(1, $result['assignments_count']);
        $this->assertSame(1, $result['skipped_count']);
        $this->assertDatabaseMissing('daily_driver_assignments', [
            'date' => '2026-05-04',
            'mobil_id' => $m2->id,
        ]);
    }

    public function test_setup_creates_pin_when_pool_override_specified(): void
    {
        $m1 = Mobil::factory()->create();
        $d1 = Driver::factory()->create();

        $result = $this->service->setup('2026-05-04', [
            ['mobil_id' => $m1->id, 'driver_id' => $d1->id, 'pool_override' => 'PKB', 'is_skipped' => false],
        ], $this->userId);

        $this->assertSame(1, $result['pins_count']);
        $assignment = DailyDriverAssignment::query()
            ->where('date', '2026-05-04')
            ->where('mobil_id', $m1->id)
            ->first();
        $this->assertDatabaseHas('daily_assignment_pins', [
            'daily_driver_assignment_id' => $assignment->id,
            'direction' => 'PKB_TO_ROHUL',
            'loket_origin' => 'PKB',
        ]);
    }

    public function test_setup_idempotent_on_repeat_call(): void
    {
        $m1 = Mobil::factory()->create();
        $d1 = Driver::factory()->create();
        $d2 = Driver::factory()->create();

        $this->service->setup('2026-05-04', [
            ['mobil_id' => $m1->id, 'driver_id' => $d1->id, 'pool_override' => null, 'is_skipped' => false],
        ], $this->userId);

        // Repeat with different driver
        $this->service->setup('2026-05-04', [
            ['mobil_id' => $m1->id, 'driver_id' => $d2->id, 'pool_override' => null, 'is_skipped' => false],
        ], $this->userId);

        $this->assertSame(1, DailyDriverAssignment::count());
        $assignment = DailyDriverAssignment::first();
        $this->assertSame($d2->id, $assignment->driver_id);
    }

    public function test_setup_throws_when_driver_id_missing_for_non_skipped(): void
    {
        $m1 = Mobil::factory()->create();

        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessageMatches('/driver_id required/');

        $this->service->setup('2026-05-04', [
            ['mobil_id' => $m1->id, 'driver_id' => null, 'pool_override' => null, 'is_skipped' => false],
        ], $this->userId);
    }

    public function test_status_returns_assignments_and_trips_count(): void
    {
        $m1 = Mobil::factory()->create();
        $d1 = Driver::factory()->create();

        DailyDriverAssignment::factory()->create([
            'date' => '2026-05-04',
            'mobil_id' => $m1->id,
            'driver_id' => $d1->id,
        ]);

        $status = $this->service->status('2026-05-04');

        $this->assertSame('2026-05-04', $status['date']);
        $this->assertSame(1, $status['assignments_count']);
        $this->assertSame(0, $status['trips_count']);
        $this->assertNull($status['cutover_status']);
        $this->assertSame([], $status['trips']);
    }

    public function test_get_active_mobil_and_driver_list_filters_correctly(): void
    {
        Mobil::factory()->create(['kode_mobil' => 'JET 01', 'is_active_in_trip' => true]);
        Mobil::factory()->create(['kode_mobil' => 'JET 02', 'is_active_in_trip' => true]);
        Mobil::factory()->create(['kode_mobil' => 'JET 99', 'is_active_in_trip' => false]);

        Driver::factory()->create(['nama' => 'Pak Aktif', 'status' => 'Active']);
        Driver::factory()->create(['nama' => 'Pak Tidak', 'status' => 'Inactive']);

        $list = $this->service->getActiveMobilAndDriverList();

        $this->assertCount(2, $list['mobil']);
        $this->assertSame('JET 01', $list['mobil'][0]['kode_mobil']);
        $this->assertSame('JET 02', $list['mobil'][1]['kode_mobil']);

        $this->assertCount(1, $list['driver']);
        $this->assertSame('Pak Aktif', $list['driver'][0]['nama']);
    }
}
