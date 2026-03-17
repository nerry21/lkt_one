<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\CustomerAlias;
use Illuminate\Support\Facades\DB;

/**
 * CustomerResolverService
 *
 * Bertanggung jawab untuk:
 * 1. Mencari customer existing berdasarkan phone_normalized.
 * 2. Membuat customer baru jika belum ada.
 * 3. Menyimpan alias nama baru jika nama berbeda dari yang tersimpan.
 * 4. Mengembalikan customer yang valid untuk disimpan ke booking.
 *
 * Dipanggil setiap kali booking dibuat atau diperbarui.
 * Semua operasi dijalankan dalam DB transaction.
 */
class CustomerResolverService
{
    /**
     * Resolve atau buat customer berdasarkan nomor telepon dan nama.
     *
     * @param  string|null  $phone           Nomor HP (akan dinormalisasi)
     * @param  string       $name            Nama pelanggan
     * @param  int|null     $sourceBookingId ID booking (untuk alias audit trail)
     * @return Customer|null  Null jika phone dan name keduanya kosong/invalid
     */
    public function resolve(?string $phone, string $name, ?int $sourceBookingId = null): ?Customer
    {
        $normalizedPhone = $this->normalizePhone($phone);
        $originalPhone   = trim((string) $phone) ?: null;
        $cleanName       = trim($name);

        // Tidak bisa identifikasi jika keduanya kosong
        if ($normalizedPhone === null && $cleanName === '') {
            return null;
        }

        return DB::transaction(function () use ($normalizedPhone, $originalPhone, $cleanName, $sourceBookingId): Customer {
            $customer = $this->findByPhone($normalizedPhone);

            if ($customer === null) {
                $customer = $this->createCustomer($normalizedPhone, $originalPhone, $cleanName);
            }

            // Rekam alias nama setiap kali ada variasi baru
            if ($cleanName !== '') {
                $this->recordNameAlias($customer, $cleanName, $sourceBookingId);
            }

            return $customer;
        });
    }

    /**
     * Cari customer aktif berdasarkan phone_normalized.
     * Otomatis ikuti rantai merge ke customer canonical.
     */
    public function findByPhone(?string $phone): ?Customer
    {
        $normalizedPhone = $this->normalizePhone($phone);

        if ($normalizedPhone === null) {
            return null;
        }

        $customer = Customer::query()
            ->where('phone_normalized', $normalizedPhone)
            ->first();

        // Jika sudah di-merge, ikuti ke canonical
        return $customer?->canonical();
    }

    /**
     * Normalisasi nomor telepon Indonesia ke format E.164 tanpa plus (628xxx).
     *
     * Rules:
     * - Hapus semua karakter selain angka
     * - Konversi 08xx → 628xx
     * - Hanya terima nomor yang diawali 62
     * - Minimal 10 digit (628xx + 6 digit)
     *
     * Returns null jika tidak valid atau kosong.
     */
    public function normalizePhone(?string $phone): ?string
    {
        $cleaned = preg_replace('/[^0-9]/', '', (string) $phone) ?? '';

        if (strlen($cleaned) < 9) {
            return null;
        }

        // 08xx → 628xx
        if (str_starts_with($cleaned, '0')) {
            $cleaned = '62' . substr($cleaned, 1);
        }

        // Pastikan dimulai dengan 62
        if (! str_starts_with($cleaned, '62')) {
            return null;
        }

        // Panjang wajar nomor Indonesia: 10–15 digit
        if (strlen($cleaned) < 10 || strlen($cleaned) > 15) {
            return null;
        }

        return $cleaned;
    }

    /**
     * Rekam alias nama untuk customer (idempotent via updateOrCreate).
     *
     * Jika nama baru lebih panjang dari display_name saat ini,
     * update display_name (heuristik: nama lebih panjang = lebih lengkap).
     */
    public function recordNameAlias(Customer $customer, string $name, ?int $sourceBookingId = null): void
    {
        $normalized = CustomerAlias::normalize($name);

        if ($normalized === '') {
            return;
        }

        CustomerAlias::upsertForCustomer(
            customer: $customer,
            name: $name,
            source: $sourceBookingId !== null ? 'booking' : 'manual',
            sourceBookingId: $sourceBookingId,
        );

        // Heuristik update display_name: nama lebih panjang = lebih lengkap
        if (mb_strlen($name) > mb_strlen((string) $customer->display_name)) {
            $customer->display_name = $name;
            $customer->saveQuietly();
        }
    }

    // =========================================================================
    // Private
    // =========================================================================

    private function createCustomer(?string $normalizedPhone, ?string $originalPhone, string $name): Customer
    {
        return Customer::create([
            'phone_normalized'    => $normalizedPhone,
            'phone_original'      => $originalPhone,
            'display_name'        => $name !== '' ? $name : 'Pelanggan Tanpa Nama',
            'status'              => 'active',
            'identity_confidence' => $normalizedPhone !== null ? 'medium' : 'low',
        ]);
    }
}
