<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Customer;
use Illuminate\Support\Facades\DB;

/**
 * CustomerLoyaltyService
 *
 * Pengelolaan loyalty pelanggan berbasis customer_id (bukan nama/HP).
 *
 * Aturan bisnis:
 * - Setiap LOYALTY_THRESHOLD perjalanan valid → pelanggan eligible diskon DISCOUNT_PERCENTAGE%
 * - "Perjalanan valid" = booking dengan customer_id = $customer->id
 *   dan booking_status TIDAK termasuk INVALID_STATUSES
 * - lifetime_scan_count = total scan QR sepanjang waktu (tidak di-reset)
 * - discount_eligible = total_trip_count >= LOYALTY_THRESHOLD
 *
 * Semua operasi write pakai DB query langsung (saveQuietly/DB::table) —
 * tidak memicu Eloquent events agar tidak ada side effects.
 */
class CustomerLoyaltyService
{
    public const LOYALTY_THRESHOLD    = 5;
    public const DISCOUNT_PERCENTAGE  = 50;
    public const INVALID_STATUSES     = ['Draft', 'Batal', 'Cancelled'];

    // =========================================================================
    // Per-customer recalculation
    // =========================================================================

    /**
     * Hitung ulang loyalty counter untuk satu customer dan simpan ke DB.
     *
     * Mengambil jumlah booking valid (customer_id match, status bukan invalid),
     * update total_trip_count dan discount_eligible, kembalikan summary.
     *
     * @return array{
     *   customer_id: int,
     *   total_trip_count: int,
     *   discount_eligible: bool,
     *   changed: bool
     * }
     */
    public function recalculateForCustomer(Customer $customer): array
    {
        $count = Booking::query()
            ->where('customer_id', $customer->id)
            ->whereNotIn('booking_status', self::INVALID_STATUSES)
            ->count();

        $eligible = $count >= self::LOYALTY_THRESHOLD;

        $changed = $customer->total_trip_count !== $count
            || $customer->discount_eligible !== $eligible;

        if ($changed) {
            DB::table('customers')
                ->where('id', $customer->id)
                ->update([
                    'total_trip_count'  => $count,
                    'discount_eligible' => $eligible,
                    'updated_at'        => now(),
                ]);

            $customer->total_trip_count  = $count;
            $customer->discount_eligible = $eligible;
        }

        return [
            'customer_id'      => $customer->id,
            'total_trip_count' => $count,
            'discount_eligible'=> $eligible,
            'changed'          => $changed,
        ];
    }

    /**
     * Hitung ulang loyalty untuk SEMUA customer aktif (bukan merged/inactive).
     *
     * Diproses dalam chunks untuk menghindari memory exhaustion.
     * Optional callback $onProgress(int $processed, int $total) dipanggil setiap chunk.
     *
     * @param  callable|null  $onProgress  fn(int $processed, int $total): void
     * @return array{processed: int, updated: int, errors: int}
     */
    public function recalculateAll(?callable $onProgress = null): array
    {
        $total     = Customer::query()->active()->notMerged()->count();
        $processed = 0;
        $updated   = 0;
        $errors    = 0;

        Customer::query()
            ->active()
            ->notMerged()
            ->orderBy('id')
            ->chunk(100, function ($customers) use (&$processed, &$updated, &$errors, $total, $onProgress): void {
                foreach ($customers as $customer) {
                    try {
                        $result = $this->recalculateForCustomer($customer);
                        if ($result['changed']) {
                            $updated++;
                        }
                    } catch (\Throwable $e) {
                        $errors++;
                        report($e);
                    }
                    $processed++;
                }

                if ($onProgress !== null) {
                    ($onProgress)($processed, $total);
                }
            });

        return [
            'processed' => $processed,
            'updated'   => $updated,
            'errors'    => $errors,
        ];
    }

    // =========================================================================
    // Read-only status
    // =========================================================================

    /**
     * Status loyalty lengkap untuk satu customer — hanya baca, tidak menulis.
     *
     * @return array{
     *   customer_id: int,
     *   total_trip_count: int,
     *   lifetime_scan_count: int,
     *   discount_eligible: bool,
     *   loyalty_threshold: int,
     *   discount_percentage: int,
     *   trips_until_eligible: int,
     *   status_label: string,
     *   discount_label: string
     * }
     */
    public function loyaltyStatus(Customer $customer): array
    {
        $count    = (int) $customer->total_trip_count;
        $eligible = (bool) $customer->discount_eligible;
        $remaining = max(0, self::LOYALTY_THRESHOLD - $count);

        $statusLabel = $eligible
            ? 'Eligible Diskon ' . self::DISCOUNT_PERCENTAGE . '%'
            : ($count === 0
                ? 'Belum ada perjalanan'
                : $count . ' / ' . self::LOYALTY_THRESHOLD . ' perjalanan');

        $discountLabel = $eligible
            ? 'Diskon ' . self::DISCOUNT_PERCENTAGE . '% tersedia'
            : 'Butuh ' . $remaining . ' perjalanan lagi';

        return [
            'customer_id'          => $customer->id,
            'total_trip_count'     => $count,
            'lifetime_scan_count'  => (int) $customer->lifetime_scan_count,
            'discount_eligible'    => $eligible,
            'loyalty_threshold'    => self::LOYALTY_THRESHOLD,
            'discount_percentage'  => self::DISCOUNT_PERCENTAGE,
            'trips_until_eligible' => $remaining,
            'status_label'         => $statusLabel,
            'discount_label'       => $discountLabel,
        ];
    }

    // =========================================================================
    // Scan
    // =========================================================================

    /**
     * Catat 1 scan QR ke lifetime_scan_count pelanggan.
     *
     * Menggunakan DB::table()->increment() agar atomic — aman dari race condition.
     * Tidak memvalidasi apakah sudah scan sebelumnya — validasi ada di QrScanController.
     */
    public function applyScanToCustomer(Customer $customer): void
    {
        DB::table('customers')
            ->where('id', $customer->id)
            ->increment('lifetime_scan_count');

        $customer->lifetime_scan_count = (int) $customer->lifetime_scan_count + 1;
    }

    // =========================================================================
    // Trip history
    // =========================================================================

    /**
     * Riwayat perjalanan terpaginasi untuk satu customer.
     *
     * Hanya booking dengan status valid (bukan INVALID_STATUSES).
     *
     * @return array{
     *   data: array[],
     *   total: int,
     *   page: int,
     *   limit: int,
     *   last_page: int
     * }
     */
    public function tripHistory(Customer $customer, int $page = 1, int $limit = 15): array
    {
        $page  = max(1, $page);
        $limit = max(1, min(100, $limit));

        $query = Booking::query()
            ->where('customer_id', $customer->id)
            ->whereNotIn('booking_status', self::INVALID_STATUSES)
            ->orderByDesc('trip_date')
            ->orderByDesc('created_at');

        $total    = (clone $query)->count();
        $lastPage = (int) ceil($total / $limit);

        $rows = $query->offset(($page - 1) * $limit)->limit($limit)->get([
            'id',
            'booking_code',
            'from_city',
            'to_city',
            'trip_date',
            'trip_time',
            'booking_status',
            'payment_status',
            'total_amount',
            'passenger_count',
            'created_at',
        ]);

        $data = $rows->map(function (Booking $b): array {
            $pc    = max(1, (int) ($b->passenger_count ?? 1));
            $tarif = round((float) ($b->total_amount ?? 0) / $pc);

            return [
                'id'             => $b->id,
                'booking_code'   => $b->booking_code,
                'from_city'      => $b->from_city,
                'to_city'        => $b->to_city,
                'trip_date'      => $b->trip_date?->toDateString() ?? '-',
                'trip_date_label'=> $b->trip_date?->translatedFormat('d M Y') ?? '-',
                'trip_time'      => $b->trip_time ? substr((string) $b->trip_time, 0, 5) : '-',
                'booking_status' => $b->booking_status,
                'payment_status' => $b->payment_status,
                'tarif_label'    => 'Rp ' . number_format($tarif, 0, ',', '.'),
            ];
        })->all();

        return [
            'data'      => $data,
            'total'     => $total,
            'page'      => $page,
            'limit'     => $limit,
            'last_page' => max(1, $lastPage),
        ];
    }
}
