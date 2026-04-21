<?php

namespace Database\Factories;

use App\Models\Mobil;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * Factory untuk model Mobil.
 *
 * Pattern unique kode_mobil: pakai fake unique() untuk hindari collision saat
 * 1 test create banyak mobil (e.g. test recompaction sequence yang butuh 3+ trip).
 *
 * Default home_pool='PKB' untuk konsistensi test default (PKB_TO_ROHUL flow).
 * Override per test kalau butuh ROHUL: Mobil::factory()->create(['home_pool' => 'ROHUL'])
 *
 * @extends Factory<Mobil>
 */
class MobilFactory extends Factory
{
    protected $model = Mobil::class;

    public function definition(): array
    {
        return [
            'kode_mobil' => 'BM ' . fake()->unique()->numberBetween(1000, 9999) . ' ' . strtoupper(fake()->lexify('??')),
            'jenis_mobil' => fake()->randomElement(['Avanza', 'Xenia', 'Innova', 'HiAce']),
            'home_pool' => 'PKB',
            'is_active_in_trip' => true,
            'brand' => 'Toyota',
            'model' => 'Avanza',
            'seat_capacity' => 6,
            'status' => 'Ready',
        ];
    }
}
