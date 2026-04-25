<?php

namespace Database\Factories;

use App\Models\DailyDriverAssignment;
use App\Models\Driver;
use App\Models\Mobil;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<DailyDriverAssignment>
 */
class DailyDriverAssignmentFactory extends Factory
{
    protected $model = DailyDriverAssignment::class;

    public function definition(): array
    {
        return [
            'date' => now()->addDay()->toDateString(),
            'mobil_id' => Mobil::factory(),
            'driver_id' => Driver::factory(),
        ];
    }
}
