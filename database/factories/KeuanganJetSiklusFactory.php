<?php

namespace Database\Factories;

use App\Models\Driver;
use App\Models\KeuanganJetSiklus;
use App\Models\Mobil;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<KeuanganJetSiklus>
 */
class KeuanganJetSiklusFactory extends Factory
{
    protected $model = KeuanganJetSiklus::class;

    public function definition(): array
    {
        $mobil = Mobil::factory()->create();
        $driver = Driver::factory()->create();

        return [
            'tanggal_mulai' => now()->toDateString(),
            'tanggal_selesai' => null,
            'mobil_id' => $mobil->id,
            'mobil_code' => $mobil->code ?? 'JET 01',
            'driver_id_planned' => $driver->id,
            'driver_id_actual' => $driver->id,
            'driver_name_actual' => $driver->name ?? 'Test Driver',
            'is_driver_overridden' => false,
            'uang_jalan' => 0,
            'biaya_kurir' => 0,
            'biaya_cuci_mobil' => 0,
            'total_revenue_kbg' => 0,
            'total_revenue_kpl' => 0,
            'total_uang_admin_kbg' => 0,
            'total_uang_admin_kpl' => 0,
            'total_pendapatan_kotor' => 0,
            'total_admin_potong' => 0,
            'total_operasional' => 0,
            'total_pendapatan_bersih' => 0,
            'uang_driver' => 0,
            'uang_mobil' => 0,
            'status_siklus' => 'berjalan',
            'driver_paid_status' => 'belum',
        ];
    }

    public function complete(): self
    {
        return $this->state(fn () => [
            'status_siklus' => 'complete',
            'completed_at' => now(),
            'completed_via' => 'regular_return',
            'tanggal_selesai' => now()->toDateString(),
        ]);
    }

    public function locked(): self
    {
        return $this->state(fn () => [
            'status_siklus' => 'locked',
            'driver_paid_status' => 'sudah',
            'driver_paid_at' => now(),
        ]);
    }
}
