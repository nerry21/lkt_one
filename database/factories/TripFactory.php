<?php

namespace Database\Factories;

use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * Factory untuk model Trip.
 *
 * Default scenario: trip regular PKB_TO_ROHUL, jam 07:00, status 'scheduled'
 * — match contoh paling umum di TripServiceTest.
 *
 * Catatan `version`: kolom `version` TIDAK masuk Trip::$fillable (lihat Trip
 * model PHPDoc — guard optimistic lock hanya via service). Factory sengaja
 * TIDAK set key 'version' di array definition — schema default(0) yang handle
 * inisialisasi. Kalau test butuh version spesifik, pakai forceFill setelah make
 * (lesson Sesi 13).
 *
 * State helpers tersedia:
 *   - ->direction('ROHUL_TO_PKB')
 *   - ->status('berangkat')
 *   - ->scheduled() / ->berangkat() / ->tidakBerangkat() / ->tidakKeluarTrip()
 *   - ->keluarTrip(string $substatus, string $poolTarget)
 *
 * @extends Factory<Trip>
 */
class TripFactory extends Factory
{
    protected $model = Trip::class;

    public function definition(): array
    {
        return [
            'trip_date'          => now()->toDateString(),
            'trip_time'          => '07:00:00',
            'direction'          => 'PKB_TO_ROHUL',
            'sequence'           => 1,
            'mobil_id'           => Mobil::factory(),
            'driver_id'          => Driver::factory(),
            'status'             => 'scheduled',
            'original_trip_time' => null,
            'created_by'         => null,
            'updated_by'         => null,
        ];
    }

    /**
     * Set direction (PKB_TO_ROHUL atau ROHUL_TO_PKB).
     */
    public function direction(string $direction): self
    {
        return $this->state(fn (array $attributes): array => [
            'direction' => $direction,
        ]);
    }

    /**
     * Set status trip (scheduled/berangkat/tidak_berangkat/keluar_trip/
     * tidak_keluar_trip/ganti_jam).
     *
     * Untuk status 'keluar_trip' pakai ->keluarTrip() karena butuh
     * substatus + pool_target sekaligus.
     */
    public function status(string $status): self
    {
        return $this->state(fn (array $attributes): array => [
            'status' => $status,
        ]);
    }

    public function scheduled(): self
    {
        return $this->state(fn (array $attributes): array => [
            'status' => 'scheduled',
        ]);
    }

    public function berangkat(): self
    {
        return $this->state(fn (array $attributes): array => [
            'status' => 'berangkat',
        ]);
    }

    public function tidakBerangkat(): self
    {
        return $this->state(fn (array $attributes): array => [
            'status' => 'tidak_berangkat',
        ]);
    }

    public function tidakKeluarTrip(): self
    {
        return $this->state(fn (array $attributes): array => [
            'status' => 'tidak_keluar_trip',
        ]);
    }

    /**
     * Set status 'keluar_trip' + substatus + pool_target + minimal kolom wajib
     * untuk lolos app-layer invariant (reason default 'dropping', start_date
     * mengikuti trip_date).
     */
    public function keluarTrip(string $substatus, string $poolTarget): self
    {
        return $this->state(fn (array $attributes): array => [
            'status'                  => 'keluar_trip',
            'keluar_trip_substatus'   => $substatus,
            'keluar_trip_pool_target' => $poolTarget,
            'keluar_trip_reason'      => 'dropping',
            'keluar_trip_start_date'  => $attributes['trip_date'] ?? now()->toDateString(),
        ]);
    }
}
