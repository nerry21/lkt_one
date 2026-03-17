<?php

namespace App\Services;

class PackageBookingService extends RegularBookingService
{
    public function packageSizes(): array
    {
        return [
            [
                'value' => 'Kecil',
                'label' => 'Paket Kecil',
                'description' => 'Barang berukuran kecil (dokumen, makanan, dll). Tidak menggunakan tempat duduk.',
                'requires_seat' => false,
            ],
            [
                'value' => 'Sedang',
                'label' => 'Paket Sedang',
                'description' => 'Barang berukuran sedang (tas, koper kecil, dll). Tidak menggunakan tempat duduk.',
                'requires_seat' => false,
            ],
            [
                'value' => 'Besar',
                'label' => 'Paket Besar',
                'description' => 'Barang berukuran besar yang memerlukan tempat duduk tambahan di kendaraan.',
                'requires_seat' => true,
            ],
        ];
    }

    public function packageSizeValues(): array
    {
        return array_column($this->packageSizes(), 'value');
    }

    public function packageSizeLabel(?string $value): string
    {
        $item = collect($this->packageSizes())->firstWhere('value', trim((string) $value));
        return is_array($item) ? $item['label'] : 'Belum dipilih';
    }

    public function isSeatRequired(string $packageSize): bool
    {
        $item = collect($this->packageSizes())->firstWhere('value', trim($packageSize));
        return is_array($item) && ($item['requires_seat'] ?? false);
    }
}
