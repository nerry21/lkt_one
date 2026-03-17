<?php

namespace App\Services;

use App\Models\CustomerAlias;
use Illuminate\Support\Facades\DB;

/**
 * CustomerMatchingService
 *
 * Bertanggung jawab untuk operasi backfill batch:
 * 1. Menghubungkan booking lama (tanpa customer_id) ke Customer record berdasarkan phone.
 * 2. Menghubungkan booking lama tanpa phone ke Customer berdasarkan nama (konservatif).
 * 3. Menghubungkan booking_passengers lama ke Customer.
 *
 * Perbedaan dengan CustomerResolverService:
 * - CustomerResolverService : per-booking, real-time, satu transaksi
 * - CustomerMatchingService : batch, grouping dulu baru link, untuk backfill massal
 *
 * PENTING: Semua operasi write dijalankan dalam DB::transaction per grup/baris.
 * Method ini TIDAK memanipulasi data diluar customer_id linkage.
 */
class CustomerMatchingService
{
    public function __construct(
        private readonly CustomerResolverService $resolver,
    ) {}

    // =========================================================================
    // Phase 1 — Booking dengan phone
    // =========================================================================

    /**
     * Backfill booking yang punya passenger_phone ke Customer berdasarkan phone.
     *
     * CustomerResolverService sudah handle dedup otomatis:
     * booking dengan phone yang sama akan ter-link ke Customer yang sama
     * karena phone_normalized UNIQUE di tabel customers.
     *
     * @return array{processed: int, skipped: int, linked: int, errors: int, rows: array}
     */
    public function backfillBookingsByPhone(bool $dryRun = false, int $chunkSize = 100): array
    {
        $stats = ['processed' => 0, 'skipped' => 0, 'linked' => 0, 'errors' => 0, 'rows' => []];

        DB::table('bookings')
            ->whereNull('customer_id')
            ->whereNotNull('passenger_phone')
            ->where('passenger_phone', '!=', '')
            ->orderBy('id')
            ->chunkById($chunkSize, function ($bookings) use ($dryRun, &$stats) {
                foreach ($bookings as $booking) {
                    $phone = trim((string) ($booking->passenger_phone ?? ''));
                    $name  = trim((string) ($booking->passenger_name ?? ''));

                    $normalizedPhone = $this->resolver->normalizePhone($phone);

                    if ($normalizedPhone === null) {
                        $stats['skipped']++;
                        $stats['rows'][] = [
                            'action'       => 'SKIP',
                            'booking_id'   => $booking->id,
                            'booking_code' => $booking->booking_code,
                            'reason'       => "phone tidak valid: {$phone}",
                        ];
                        continue;
                    }

                    $stats['processed']++;

                    if ($dryRun) {
                        $stats['rows'][] = [
                            'action'       => 'DRY',
                            'booking_id'   => $booking->id,
                            'booking_code' => $booking->booking_code,
                            'name'         => $name,
                            'phone'        => $normalizedPhone,
                        ];
                        continue;
                    }

                    try {
                        $customer = DB::transaction(function () use ($booking, $phone, $name) {
                            $customer = $this->resolver->resolve($phone, $name, (int) $booking->id);

                            if ($customer === null) {
                                return null;
                            }

                            DB::table('bookings')
                                ->where('id', $booking->id)
                                ->whereNull('customer_id')
                                ->update(['customer_id' => $customer->id]);

                            return $customer;
                        });

                        if ($customer !== null) {
                            $stats['linked']++;
                            $stats['rows'][] = [
                                'action'        => 'OK',
                                'booking_id'    => $booking->id,
                                'booking_code'  => $booking->booking_code,
                                'customer_id'   => $customer->id,
                                'customer_code' => $customer->customer_code,
                            ];
                        }
                    } catch (\Throwable $e) {
                        $stats['errors']++;
                        $stats['rows'][] = [
                            'action'       => 'ERROR',
                            'booking_id'   => $booking->id,
                            'booking_code' => $booking->booking_code,
                            'reason'       => $e->getMessage(),
                        ];
                    }
                }
            });

        return $stats;
    }

    // =========================================================================
    // Phase 2 — Booking tanpa phone valid (name-only, konservatif)
    // =========================================================================

    /**
     * Backfill booking yang MASIH belum punya customer_id setelah phase 1.
     *
     * Strategi KONSERVATIF:
     * - Booking dengan phone valid yang masih belum ter-link: resolve per phone
     * - Booking tanpa phone valid: group by exact normalized name → 1 Customer per grup
     *
     * Risiko: nama umum (mis. "BUDI") akan di-merge ke 1 Customer padahal beda orang.
     * Ini disengaja — hasilnya bisa di-correct via merge UI nanti.
     * Customer yang dibuat di sini memiliki identity_confidence = 'low'.
     *
     * ASUMSI: Total booking tanpa customer_id tidak melebihi 50.000 baris.
     * Untuk dataset lebih besar, jalankan dengan --phase=name secara bertahap.
     *
     * @return array{processed: int, skipped: int, linked: int, customers_created: int, errors: int, rows: array}
     */
    public function backfillBookingsByName(bool $dryRun = false, int $chunkSize = 100): array
    {
        $stats = [
            'processed'        => 0,
            'skipped'          => 0,
            'linked'           => 0,
            'customers_created'=> 0,
            'errors'           => 0,
            'rows'             => [],
        ];

        // Load semua booking yang masih belum ter-link
        $remaining = DB::table('bookings')
            ->whereNull('customer_id')
            ->select('id', 'booking_code', 'passenger_name', 'passenger_phone')
            ->orderBy('id')
            ->limit(50_000)
            ->get();

        if ($remaining->isEmpty()) {
            return $stats;
        }

        // Pisahkan ke dua kategori: phone-valid vs name-only
        // phone-valid → group by phone (catch sisa dari phase 1)
        // name-only   → group by normalized name
        $phoneGroups = [];
        $nameGroups  = [];

        foreach ($remaining as $row) {
            $name  = trim((string) ($row->passenger_name ?? ''));
            $phone = trim((string) ($row->passenger_phone ?? ''));

            if ($name === '' && $phone === '') {
                $stats['skipped']++;
                continue;
            }

            $normalizedPhone = $phone !== '' ? $this->resolver->normalizePhone($phone) : null;

            if ($normalizedPhone !== null) {
                $phoneGroups[$normalizedPhone][] = $row;
            } else {
                $normalizedName = CustomerAlias::normalize($name);
                if ($normalizedName === '') {
                    $stats['skipped']++;
                    continue;
                }
                $nameGroups[$normalizedName][] = $row;
            }
        }

        // ── Proses grup phone (catch sisa) ────────────────────────────────
        foreach ($phoneGroups as $normalizedPhone => $rows) {
            $representativeRow = $rows[0];
            $displayName = $this->pickLongestName($rows);
            $stats['processed'] += count($rows);

            if ($dryRun) {
                foreach ($rows as $row) {
                    $stats['rows'][] = [
                        'action'       => 'DRY',
                        'booking_id'   => $row->id,
                        'booking_code' => $row->booking_code,
                        'name'         => $row->passenger_name,
                        'phone'        => $normalizedPhone,
                        'group_size'   => count($rows),
                    ];
                }
                continue;
            }

            try {
                $result = DB::transaction(function () use ($rows, $normalizedPhone, $displayName, $representativeRow) {
                    $customer = $this->resolver->resolve(
                        $normalizedPhone,
                        $displayName,
                        (int) $representativeRow->id,
                    );

                    if ($customer === null) {
                        return null;
                    }

                    $bookingIds = array_column((array) $rows, 'id');
                    DB::table('bookings')
                        ->whereIn('id', $bookingIds)
                        ->whereNull('customer_id')
                        ->update(['customer_id' => $customer->id]);

                    // Rekam alias untuk semua variasi nama dalam grup
                    foreach ($rows as $row) {
                        $rowName = trim((string) ($row->passenger_name ?? ''));
                        if ($rowName !== '' && $rowName !== $displayName) {
                            $this->resolver->recordNameAlias($customer, $rowName, (int) $row->id);
                        }
                    }

                    return $customer;
                });

                if ($result !== null) {
                    $stats['linked'] += count($rows);
                }
            } catch (\Throwable $e) {
                $stats['errors'] += count($rows);
                $stats['rows'][] = [
                    'action'       => 'ERROR',
                    'booking_id'   => $representativeRow->id,
                    'booking_code' => $representativeRow->booking_code,
                    'reason'       => $e->getMessage(),
                ];
            }
        }

        // ── Proses grup nama (konservatif) ────────────────────────────────
        foreach ($nameGroups as $normalizedName => $rows) {
            $representativeRow = $rows[0];
            $displayName = $this->pickLongestName($rows);
            $stats['processed'] += count($rows);

            if ($dryRun) {
                foreach ($rows as $row) {
                    $stats['rows'][] = [
                        'action'       => 'DRY',
                        'booking_id'   => $row->id,
                        'booking_code' => $row->booking_code,
                        'name'         => $row->passenger_name,
                        'phone'        => null,
                        'group_size'   => count($rows),
                        'confidence'   => 'low',
                    ];
                }
                continue;
            }

            try {
                $result = DB::transaction(function () use ($rows, $displayName, $representativeRow) {
                    // resolve dengan phone=null → identity_confidence='low'
                    $customer = $this->resolver->resolve(null, $displayName, (int) $representativeRow->id);

                    if ($customer === null) {
                        return null;
                    }

                    $bookingIds = array_column((array) $rows, 'id');
                    DB::table('bookings')
                        ->whereIn('id', $bookingIds)
                        ->whereNull('customer_id')
                        ->update(['customer_id' => $customer->id]);

                    // Rekam alias untuk semua variasi nama dalam grup
                    foreach ($rows as $row) {
                        $rowName = trim((string) ($row->passenger_name ?? ''));
                        if ($rowName !== '' && $rowName !== $displayName) {
                            $this->resolver->recordNameAlias($customer, $rowName, (int) $row->id);
                        }
                    }

                    return $customer;
                });

                if ($result !== null) {
                    $stats['linked'] += count($rows);
                    $stats['customers_created']++;
                }
            } catch (\Throwable $e) {
                $stats['errors'] += count($rows);
                $stats['rows'][] = [
                    'action'       => 'ERROR',
                    'booking_id'   => $representativeRow->id,
                    'booking_code' => $representativeRow->booking_code,
                    'reason'       => $e->getMessage(),
                ];
            }
        }

        return $stats;
    }

    // =========================================================================
    // Phase 3 — booking_passengers
    // =========================================================================

    /**
     * Backfill booking_passengers yang belum punya customer_id.
     *
     * Resolve per penumpang berdasarkan name + phone penumpang.
     * Jika penumpang ini adalah penumpang utama, akan ter-link ke Customer yang sama
     * dengan booking induknya (karena resolve() mengembalikan customer yang sama
     * untuk phone yang sama).
     *
     * @return array{processed: int, skipped: int, linked: int, errors: int, rows: array}
     */
    public function backfillPassengers(bool $dryRun = false, int $chunkSize = 100): array
    {
        $stats = ['processed' => 0, 'skipped' => 0, 'linked' => 0, 'errors' => 0, 'rows' => []];

        DB::table('booking_passengers')
            ->whereNull('customer_id')
            ->orderBy('id')
            ->chunkById($chunkSize, function ($rows) use ($dryRun, &$stats) {
                foreach ($rows as $row) {
                    $name  = trim((string) ($row->name ?? ''));
                    $phone = trim((string) ($row->phone ?? ''));

                    if ($name === '' && $phone === '') {
                        $stats['skipped']++;
                        continue;
                    }

                    $stats['processed']++;

                    if ($dryRun) {
                        $stats['rows'][] = [
                            'action'       => 'DRY',
                            'passenger_id' => $row->id,
                            'booking_id'   => $row->booking_id,
                            'name'         => $name,
                            'phone'        => $phone,
                        ];
                        continue;
                    }

                    try {
                        $customer = DB::transaction(function () use ($row, $name, $phone) {
                            $customer = $this->resolver->resolve($phone, $name, (int) $row->booking_id);

                            if ($customer === null) {
                                return null;
                            }

                            DB::table('booking_passengers')
                                ->where('id', $row->id)
                                ->whereNull('customer_id')
                                ->update(['customer_id' => $customer->id]);

                            return $customer;
                        });

                        if ($customer !== null) {
                            $stats['linked']++;
                        }
                    } catch (\Throwable $e) {
                        $stats['errors']++;
                        $stats['rows'][] = [
                            'action'       => 'ERROR',
                            'passenger_id' => $row->id,
                            'booking_id'   => $row->booking_id,
                            'reason'       => $e->getMessage(),
                        ];
                    }
                }
            });

        return $stats;
    }

    // =========================================================================
    // Private helpers
    // =========================================================================

    /**
     * Pilih nama terpanjang dari sekumpulan booking rows (heuristik: nama lebih panjang = lebih lengkap).
     */
    private function pickLongestName(array $rows): string
    {
        $longest = '';
        foreach ($rows as $row) {
            $name = trim((string) ($row->passenger_name ?? ''));
            if (mb_strlen($name) > mb_strlen($longest)) {
                $longest = $name;
            }
        }
        return $longest !== '' ? $longest : 'Pelanggan Tanpa Nama';
    }
}
