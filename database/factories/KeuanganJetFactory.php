<?php

namespace Database\Factories;

use App\Models\KeuanganJet;
use App\Models\KeuanganJetSiklus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<KeuanganJet>
 */
class KeuanganJetFactory extends Factory
{
    protected $model = KeuanganJet::class;

    public function definition(): array
    {
        $siklus = KeuanganJetSiklus::factory()->create();

        return [
            'keuangan_jet_siklus_id' => $siklus->id,
            'trip_id' => null,
            'trip_date' => $siklus->tanggal_mulai,
            'mobil_id' => $siklus->mobil_id,
            'mobil_code' => $siklus->mobil_code,
            'direction' => 'Keberangkatan',
            'trip_ke' => 1,
            'jam' => '07:00:00',
            'trip_status' => 'scheduled',
            'jenis_layanan' => 'Reguler',
            'is_jenis_overridden' => false,
            'sumber_rental' => null,
            'jumlah_penumpang' => 0,
            'total_ongkos_penumpang' => 0,
            'jumlah_paket' => 0,
            'total_ongkos_paket' => 0,
            'uang_snack' => 0,
            'persen_admin' => 15,
            'is_persen_overridden' => false,
            'basis_admin' => 0,
            'trigger_admin' => false,
            'uang_admin' => 0,
            'total_pendapatan_arah' => 0,
            'admin_paid_status' => 'belum',
        ];
    }

    public function keberangkatan(): self
    {
        return $this->state(fn () => ['direction' => 'Keberangkatan']);
    }

    public function kepulangan(): self
    {
        return $this->state(fn () => ['direction' => 'Kepulangan']);
    }

    public function rental(string $sumber = 'loket'): self
    {
        return $this->state(fn () => [
            'jenis_layanan' => 'Rental',
            'sumber_rental' => $sumber,
            'persen_admin' => $sumber === 'driver' ? 10 : 15,
        ]);
    }
}
