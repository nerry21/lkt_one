<?php

namespace Database\Factories;

use App\Models\Booking;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * Factory minimal untuk Booking — 13 field wajib dari 68 fillable.
 *
 * Spelling ENUM/string values dikonfirmasi via grep di app/Services/*Persistence*.php
 * (verified 2026-04-17):
 *   - category = 'Reguler'      (source: BookingManagementService:108)
 *   - payment_status = 'Belum Bayar' (source: RegularBookingPersistenceService:79)
 *   - booking_status = 'Draft'   (source: 4 persistDraft() methods)
 *
 * Field lain dari 68 fillable tetap nullable/default. Consumer test yang butuh field
 * spesifik (payment_method, driver_id, dll) tinggal ->state([...]).
 *
 * @extends Factory<Booking>
 */
class BookingFactory extends Factory
{
    public function definition(): array
    {
        return [
            'booking_code' => 'TEST-' . Str::upper(Str::random(8)),
            'category' => 'Reguler',
            'from_city' => 'Pekanbaru',
            'to_city' => 'Pasirpengaraian',
            'direction' => 'from_pkb',
            'route_via' => 'BANGKINANG',
            'trip_date' => '2026-04-20',
            'trip_time' => '05:00:00',
            'passenger_name' => fake()->name(),
            'passenger_phone' => fake()->numerify('08##########'),
            'passenger_count' => 1,
            'armada_index' => 1,
            'selected_seats' => ['1A'],
            'price_per_seat' => 100000,
            'total_amount' => 100000,
            'payment_status' => 'Belum Bayar',
            'booking_status' => 'Draft',
        ];
    }

    /**
     * Factory lifecycle hooks.
     *
     * afterCreating: reload booking from DB to populate columns excluded
     * from $fillable (like 'version' for optimistic locking per bug #30).
     * DB defaults apply on INSERT but model's in-memory attribute stays
     * null without explicit refresh.
     */
    public function configure(): static
    {
        return $this->afterCreating(function (Booking $booking) {
            $booking->refresh();
        });
    }
}
