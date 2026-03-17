<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\CustomerAlias;
use App\Models\CustomerMerge;
use App\Models\User;
use Illuminate\Support\Facades\DB;

/**
 * CustomerMergeService
 *
 * Menggabungkan dua customer duplikat menjadi satu identitas.
 *
 * Proses merge:
 * 1. Semua booking dari customer "source" dipindah ke customer "target".
 * 2. Semua booking_passengers dari customer "source" dipindah ke customer "target".
 * 3. Semua alias nama dari "source" disalin ke "target".
 * 4. Customer "source" ditandai sebagai merged (status = 'merged').
 * 5. Loyalty count di-recalculate untuk customer "target".
 * 6. Satu record CustomerMerge dibuat sebagai audit trail.
 *
 * Proses TIDAK bisa dibatalkan. Gunakan dengan hati-hati.
 */
class CustomerMergeService
{
    /**
     * Merge customer "source" ke dalam customer "target".
     *
     * @param  Customer     $source    Customer yang akan dihapus identitasnya
     * @param  Customer     $target    Customer yang menjadi pemilik akhir semua data
     * @param  User|null    $mergedBy  User admin yang melakukan merge
     * @param  string|null  $reason    Alasan merge (opsional, untuk audit trail)
     * @return array  Summary hasil merge
     *
     * @throws \RuntimeException jika salah satu customer sudah di-merge sebelumnya
     */
    public function merge(Customer $source, Customer $target, ?User $mergedBy = null, ?string $reason = null): array
    {
        if ($source->id === $target->id) {
            throw new \RuntimeException('Source dan target customer tidak boleh sama.');
        }

        if ($source->isMerged()) {
            throw new \RuntimeException("Customer source (ID: {$source->id}) sudah di-merge sebelumnya.");
        }

        if ($target->isMerged()) {
            throw new \RuntimeException("Customer target (ID: {$target->id}) sudah di-merge, tidak bisa menjadi target.");
        }

        return DB::transaction(function () use ($source, $target, $mergedBy, $reason): array {
            $mergedAt = now();

            // 1. Pindahkan semua booking
            $bookingsMoved = DB::table('bookings')
                ->where('customer_id', $source->id)
                ->update(['customer_id' => $target->id]);

            // 2. Pindahkan semua booking_passengers
            $passengersMoved = DB::table('booking_passengers')
                ->where('customer_id', $source->id)
                ->update(['customer_id' => $target->id]);

            // 3. Salin alias nama dari source ke target (idempotent)
            $aliasesCopied = $this->mergeAliases($source, $target);

            // 4. Pastikan nama display source tersimpan sebagai alias di target
            $this->ensureDisplayNameAsAlias($source, $target);

            // 5. Tandai source sebagai merged
            $source->update([
                'status'         => 'merged',
                'merged_into_id' => $target->id,
                'merged_at'      => $mergedAt,
                'merged_by'      => $mergedBy?->id,
            ]);

            // 6. Recalculate loyalty target
            $newTripCount = $target->recalculateTripCount();

            // 7. Catat audit trail ke tabel customer_merges
            CustomerMerge::create([
                'source_customer_id'     => $source->id,
                'target_customer_id'     => $target->id,
                'reason'                 => $reason,
                'bookings_transferred'   => $bookingsMoved,
                'passengers_transferred' => $passengersMoved,
                'aliases_transferred'    => $aliasesCopied,
                'merged_by'              => $mergedBy?->id,
                'merged_at'              => $mergedAt,
                'metadata'               => [
                    'source_display_name'   => $source->display_name,
                    'source_phone'          => $source->phone_normalized,
                    'target_display_name'   => $target->display_name,
                    'target_phone'          => $target->phone_normalized,
                    'new_trip_count'        => $newTripCount,
                ],
            ]);

            return [
                'source_id'        => $source->id,
                'target_id'        => $target->id,
                'bookings_moved'   => $bookingsMoved,
                'passengers_moved' => $passengersMoved,
                'aliases_copied'   => $aliasesCopied,
                'new_trip_count'   => $newTripCount,
                'merged_at'        => $mergedAt->toDateTimeString(),
            ];
        });
    }

    /**
     * Cari pasangan customer yang mungkin duplikat berdasarkan:
     * - Nomor telepon sama (setelah normalisasi) — confidence: high
     * - Nama alias yang sama di customer berbeda — confidence: medium
     *
     * @return array  Array of ['customer_a', 'customer_b', 'reason', 'confidence']
     */
    public function findPotentialDuplicates(): array
    {
        $duplicates = [];

        // Duplikat berdasarkan phone_normalized sama (seharusnya sudah unik via UNIQUE constraint,
        // tapi bisa terjadi jika constraint di-bypass saat backfill manual)
        $phoneGroups = Customer::query()
            ->active()
            ->notMerged()
            ->whereNotNull('phone_normalized')
            ->select('phone_normalized', DB::raw('COUNT(*) as count'), DB::raw('GROUP_CONCAT(id ORDER BY id) as ids'))
            ->groupBy('phone_normalized')
            ->having('count', '>', 1)
            ->get();

        foreach ($phoneGroups as $group) {
            $ids       = explode(',', (string) $group->ids);
            $customers = Customer::query()->whereIn('id', $ids)->get();

            foreach ($customers as $i => $customerA) {
                foreach ($customers->slice($i + 1) as $customerB) {
                    $duplicates[] = [
                        'customer_a'   => $customerA,
                        'customer_b'   => $customerB,
                        'reason'       => 'phone_match',
                        'matched_value'=> $group->phone_normalized,
                        'confidence'   => 'high',
                    ];
                }
            }
        }

        // Duplikat berdasarkan alias_name_normalized yang sama di customer berbeda
        $aliasGroups = CustomerAlias::query()
            ->select(
                'alias_name_normalized',
                DB::raw('COUNT(DISTINCT customer_id) as count'),
                DB::raw('GROUP_CONCAT(DISTINCT customer_id ORDER BY customer_id) as customer_ids'),
            )
            ->groupBy('alias_name_normalized')
            ->having('count', '>', 1)
            ->get();

        foreach ($aliasGroups as $group) {
            $ids       = explode(',', (string) $group->customer_ids);
            $customers = Customer::query()
                ->active()
                ->notMerged()
                ->whereIn('id', $ids)
                ->get();

            if ($customers->count() < 2) {
                continue;
            }

            foreach ($customers as $i => $customerA) {
                foreach ($customers->slice($i + 1) as $customerB) {
                    $duplicates[] = [
                        'customer_a'    => $customerA,
                        'customer_b'    => $customerB,
                        'reason'        => 'name_alias_match',
                        'matched_value' => $group->alias_name_normalized,
                        'confidence'    => 'medium',
                    ];
                }
            }
        }

        return $duplicates;
    }

    // =========================================================================
    // Preview (baca saja, tidak mengubah data)
    // =========================================================================

    /**
     * Preview apa yang akan terjadi jika source di-merge ke target.
     *
     * Tidak ada data yang diubah — aman dipanggil berkali-kali.
     *
     * @return array{
     *   source: array,
     *   target: array,
     *   bookings_to_move: int,
     *   passengers_to_move: int,
     *   aliases_to_add: string[],
     *   warnings: string[],
     *   is_safe: bool,
     *   validation_errors: string[],
     * }
     */
    public function previewMerge(Customer $source, Customer $target): array
    {
        $validationErrors = [];

        if ($source->id === $target->id) {
            $validationErrors[] = 'Source dan target customer tidak boleh sama.';
        }

        if ($source->isMerged()) {
            $validationErrors[] = "Customer source (ID: {$source->id}) sudah di-merge sebelumnya — tidak bisa menjadi source.";
        }

        if ($target->isMerged()) {
            $validationErrors[] = "Customer target (ID: {$target->id}) sudah di-merge — tidak bisa menjadi target.";
        }

        // Hitung data yang akan dipindah
        $bookingsToMove   = DB::table('bookings')
            ->where('customer_id', $source->id)
            ->count();

        $passengersToMove = DB::table('booking_passengers')
            ->where('customer_id', $source->id)
            ->count();

        // Alias yang akan ditambahkan ke target (yang belum ada di target)
        $source->loadMissing('aliases');
        $target->loadMissing('aliases');

        $targetNormalizedNames = $target->aliases->pluck('alias_name_normalized')->flip();

        $aliasesToAdd = $source->aliases
            ->filter(fn (CustomerAlias $alias): bool => ! $targetNormalizedNames->has($alias->alias_name_normalized))
            ->pluck('alias_name')
            ->values()
            ->toArray();

        // Cek display_name source juga
        $sourceDisplayNorm = CustomerAlias::normalize($source->display_name);
        if ($sourceDisplayNorm !== '' && ! $targetNormalizedNames->has($sourceDisplayNorm)) {
            $aliasesToAdd[] = $source->display_name;
        }
        $aliasesToAdd = array_values(array_unique($aliasesToAdd));

        // Peringatan (warning) — tidak memblokir merge, tapi perlu diperhatikan admin
        $warnings = [];

        if ($source->phone_normalized
            && $target->phone_normalized
            && $source->phone_normalized !== $target->phone_normalized
        ) {
            $warnings[] = "Nomor HP berbeda: source={$source->phone_normalized}, target={$target->phone_normalized}. Pastikan ini orang yang sama.";
        }

        if ($source->identity_confidence === 'high' && $target->identity_confidence !== 'high') {
            $warnings[] = "Source memiliki identity_confidence=high namun target={$target->identity_confidence}. Pertimbangkan untuk menjadikan source sebagai target.";
        }

        if ($bookingsToMove > 30) {
            $warnings[] = "Merge ini akan memindahkan {$bookingsToMove} booking sekaligus. Pastikan kedua customer benar-benar orang yang sama.";
        }

        if ($source->identity_confidence === 'low' && $target->identity_confidence === 'low') {
            $warnings[] = "Kedua customer memiliki identity_confidence=low (tanpa nomor HP). Risiko false merge lebih tinggi.";
        }

        return [
            'source'             => $this->customerSummary($source),
            'target'             => $this->customerSummary($target),
            'bookings_to_move'   => $bookingsToMove,
            'passengers_to_move' => $passengersToMove,
            'aliases_to_add'     => $aliasesToAdd,
            'warnings'           => $warnings,
            'is_safe'            => count($warnings) === 0,
            'validation_errors'  => $validationErrors,
        ];
    }

    /**
     * Ringkasan data customer untuk response API / preview.
     */
    public function customerSummary(Customer $customer): array
    {
        return [
            'id'                  => $customer->id,
            'customer_code'       => $customer->customer_code,
            'display_name'        => $customer->display_name,
            'phone_normalized'    => $customer->phone_normalized,
            'phone_original'      => $customer->phone_original,
            'status'              => $customer->status,
            'identity_confidence' => $customer->identity_confidence,
            'total_trip_count'    => $customer->total_trip_count,
            'discount_eligible'   => $customer->discount_eligible,
            'all_known_names'     => $customer->allKnownNames(),
        ];
    }

    // =========================================================================
    // Private
    // =========================================================================

    /**
     * Salin semua alias nama dari source ke target (skip jika sudah ada).
     * Menggunakan CustomerAlias::upsertForCustomer untuk idempotency.
     */
    private function mergeAliases(Customer $source, Customer $target): int
    {
        $source->loadMissing('aliases');
        $count = 0;

        foreach ($source->aliases as $alias) {
            $exists = CustomerAlias::query()
                ->where('customer_id', $target->id)
                ->where('alias_name_normalized', $alias->alias_name_normalized)
                ->exists();

            if (! $exists) {
                CustomerAlias::create([
                    'customer_id'           => $target->id,
                    'alias_name'            => $alias->alias_name,
                    'alias_name_normalized' => $alias->alias_name_normalized,
                    'source'                => 'merge',
                    'source_booking_id'     => $alias->source_booking_id,
                    'source_passenger_id'   => $alias->source_passenger_id,
                ]);
                $count++;
            }
        }

        return $count;
    }

    /**
     * Pastikan display_name dari source tersimpan sebagai alias di target.
     * Digunakan agar nama lama source tetap bisa dicari setelah merge.
     */
    private function ensureDisplayNameAsAlias(Customer $source, Customer $target): void
    {
        $normalized = CustomerAlias::normalize($source->display_name);

        if ($normalized === '') {
            return;
        }

        CustomerAlias::updateOrCreate(
            [
                'customer_id'           => $target->id,
                'alias_name_normalized' => $normalized,
            ],
            [
                'alias_name' => $source->display_name,
                'source'     => 'merge',
            ],
        );
    }
}
