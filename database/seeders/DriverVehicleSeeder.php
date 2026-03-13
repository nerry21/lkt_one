<?php

namespace Database\Seeders;

use App\Models\Driver;
use App\Models\Mobil;
use Illuminate\Database\Seeder;

class DriverVehicleSeeder extends Seeder
{
    public function run(): void
    {
        Driver::query()->firstOrCreate(
            ['nama' => 'Bang Anto'],
            [
                'lokasi' => 'Pekanbaru',
                'phone' => '081234567890',
                'license_number' => 'SIM-A-001',
                'status' => 'Active',
            ],
        );

        Driver::query()->firstOrCreate(
            ['nama' => 'Ade'],
            [
                'lokasi' => 'Rokan Hulu',
                'phone' => '081234567891',
                'license_number' => 'SIM-A-002',
                'status' => 'Active',
            ],
        );

        Mobil::query()->firstOrCreate(
            ['kode_mobil' => 'BM 1234 XX'],
            [
                'jenis_mobil' => 'Innova Reborn',
                'brand' => 'Toyota',
                'model' => 'Innova Reborn',
                'seat_capacity' => 6,
                'status' => 'Ready',
            ],
        );

        Mobil::query()->firstOrCreate(
            ['kode_mobil' => 'BM 5678 YY'],
            [
                'jenis_mobil' => 'Hiace',
                'brand' => 'Toyota',
                'model' => 'Hiace',
                'seat_capacity' => 12,
                'status' => 'Ready',
            ],
        );
    }
}
