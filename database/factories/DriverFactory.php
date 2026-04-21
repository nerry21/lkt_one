<?php

namespace Database\Factories;

use App\Models\Driver;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * Factory untuk model Driver.
 *
 * Default lokasi='Pekanbaru' untuk konsistensi default test scenario.
 *
 * @extends Factory<Driver>
 */
class DriverFactory extends Factory
{
    protected $model = Driver::class;

    public function definition(): array
    {
        return [
            'nama' => fake()->name('male'),
            'lokasi' => 'Pekanbaru',
            'phone' => fake()->numerify('08##########'),
            'license_number' => 'B' . fake()->unique()->numberBetween(1000000, 9999999),
            'status' => 'Active',
        ];
    }
}
