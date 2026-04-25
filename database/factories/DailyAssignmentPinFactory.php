<?php

namespace Database\Factories;

use App\Models\DailyAssignmentPin;
use App\Models\DailyDriverAssignment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<DailyAssignmentPin>
 */
class DailyAssignmentPinFactory extends Factory
{
    protected $model = DailyAssignmentPin::class;

    public function definition(): array
    {
        return [
            'daily_driver_assignment_id' => DailyDriverAssignment::factory(),
            'direction' => 'ROHUL_TO_PKB',
            'trip_time' => '05:30:00',
        ];
    }

    public function outbound(string $time = '05:30:00'): static
    {
        return $this->state(['direction' => 'ROHUL_TO_PKB', 'trip_time' => $time]);
    }

    public function return(string $time = '13:00:00'): static
    {
        return $this->state(['direction' => 'PKB_TO_ROHUL', 'trip_time' => $time]);
    }
}
