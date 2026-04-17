<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\BookingSeat;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BookingSeat>
 */
class BookingSeatFactory extends Factory
{
    public function definition(): array
    {
        return [
            'booking_id' => Booking::factory(),
            'trip_date' => '2026-04-20',
            'trip_time' => '05:00:00',
            'from_city' => 'Pekanbaru',
            'to_city' => 'Pasirpengaraian',
            'armada_index' => 1,
            'seat_number' => fake()->randomElement(['1A', '2A', '2B', '3A', '4A', '5A']),
            'lock_type' => 'soft',
            'lock_released_at' => null,
            'lock_released_by' => null,
            'lock_release_reason' => null,
        ];
    }

    public function hardLocked(): static
    {
        return $this->state(['lock_type' => 'hard']);
    }

    public function released(User $by, string $reason = 'Test release'): static
    {
        return $this->state([
            'lock_released_at' => now(),
            'lock_released_by' => $by->id,
            'lock_release_reason' => $reason,
        ]);
    }
}
