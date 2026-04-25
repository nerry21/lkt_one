<?php

namespace Tests\Unit\Models;

use App\Models\DailyAssignmentPin;
use App\Models\DailyDriverAssignment;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Unit tests untuk DailyAssignmentPin model (Phase E4 PR #1).
 *
 * Coverage:
 * - Create dengan valid attributes (fillable + cast trip_time → string)
 * - Relasi belongsTo assignment resolves
 * - UNIQUE (daily_driver_assignment_id, direction) constraint enforced
 * - Cascade delete dari parent assignment menghapus pins-nya
 * - Factory states outbound/return menghasilkan direction yang benar
 */
class DailyAssignmentPinTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_can_be_created_with_valid_attributes(): void
    {
        $assignment = DailyDriverAssignment::factory()->create();

        $pin = DailyAssignmentPin::create([
            'daily_driver_assignment_id' => $assignment->id,
            'direction' => 'ROHUL_TO_PKB',
            'trip_time' => '05:30:00',
        ]);

        $fresh = $pin->fresh();

        $this->assertSame($assignment->id, $fresh->daily_driver_assignment_id);
        $this->assertSame('ROHUL_TO_PKB', $fresh->direction);
        $this->assertSame('05:30:00', $fresh->trip_time);
    }

    public function test_it_belongs_to_a_daily_driver_assignment(): void
    {
        $assignment = DailyDriverAssignment::factory()->create();
        $pin = DailyAssignmentPin::factory()->create([
            'daily_driver_assignment_id' => $assignment->id,
        ]);

        $resolved = $pin->assignment;

        $this->assertNotNull($resolved);
        $this->assertSame($assignment->id, $resolved->id);
        $this->assertSame($assignment->mobil_id, $resolved->mobil_id);
    }

    public function test_unique_constraint_prevents_duplicate_direction_per_assignment(): void
    {
        $assignment = DailyDriverAssignment::factory()->create();

        DailyAssignmentPin::create([
            'daily_driver_assignment_id' => $assignment->id,
            'direction' => 'ROHUL_TO_PKB',
            'trip_time' => '05:30:00',
        ]);

        $this->expectException(QueryException::class);

        DailyAssignmentPin::create([
            'daily_driver_assignment_id' => $assignment->id,
            'direction' => 'ROHUL_TO_PKB',
            'trip_time' => '07:00:00',
        ]);
    }

    public function test_cascade_delete_from_parent_assignment_removes_pins(): void
    {
        $assignment = DailyDriverAssignment::factory()->create();
        DailyAssignmentPin::factory()->outbound()->create([
            'daily_driver_assignment_id' => $assignment->id,
        ]);
        DailyAssignmentPin::factory()->return()->create([
            'daily_driver_assignment_id' => $assignment->id,
        ]);

        $this->assertSame(2, DailyAssignmentPin::count());

        $assignment->delete();

        $this->assertSame(0, DailyAssignmentPin::count());
    }

    public function test_factory_outbound_and_return_states_produce_correct_direction(): void
    {
        $assignment = DailyDriverAssignment::factory()->create();

        $outbound = DailyAssignmentPin::factory()->outbound('05:30:00')->create([
            'daily_driver_assignment_id' => $assignment->id,
        ]);
        $return = DailyAssignmentPin::factory()->return('13:00:00')->create([
            'daily_driver_assignment_id' => $assignment->id,
        ]);

        $this->assertSame('ROHUL_TO_PKB', $outbound->direction);
        $this->assertSame('05:30:00', $outbound->trip_time);
        $this->assertSame('PKB_TO_ROHUL', $return->direction);
        $this->assertSame('13:00:00', $return->trip_time);
    }
}
