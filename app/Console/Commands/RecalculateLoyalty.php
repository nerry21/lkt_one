<?php

namespace App\Console\Commands;

use App\Models\Customer;
use App\Services\CustomerLoyaltyService;
use Illuminate\Console\Command;

/**
 * lkt:recalculate-loyalty
 *
 * Hitung ulang total_trip_count dan discount_eligible untuk customer(s).
 *
 * Penggunaan:
 *   php artisan lkt:recalculate-loyalty               # semua customer aktif
 *   php artisan lkt:recalculate-loyalty --customer=42  # satu customer spesifik
 *   php artisan lkt:recalculate-loyalty --dry-run      # preview tanpa menulis
 */
class RecalculateLoyalty extends Command
{
    protected $signature = 'lkt:recalculate-loyalty
        {--customer= : ID customer spesifik (opsional)}
        {--dry-run   : Preview hitungan tanpa menyimpan ke database}';

    protected $description = 'Hitung ulang loyalty (total_trip_count, discount_eligible) untuk semua customer atau customer tertentu';

    public function handle(CustomerLoyaltyService $loyaltyService): int
    {
        $isDryRun    = (bool) $this->option('dry-run');
        $customerId  = $this->option('customer');

        if ($isDryRun) {
            $this->info('[DRY RUN] Tidak ada perubahan yang akan disimpan.');
        }

        // ── Satu customer spesifik ──────────────────────────────────────────
        if ($customerId !== null) {
            return $this->handleSingle((int) $customerId, $loyaltyService, $isDryRun);
        }

        // ── Semua customer aktif ────────────────────────────────────────────
        return $this->handleAll($loyaltyService, $isDryRun);
    }

    // =========================================================================
    // Private
    // =========================================================================

    private function handleSingle(int $id, CustomerLoyaltyService $loyaltyService, bool $isDryRun): int
    {
        $customer = Customer::query()->find($id);

        if ($customer === null) {
            $this->error("Customer dengan ID {$id} tidak ditemukan.");
            return self::FAILURE;
        }

        if ($isDryRun) {
            $count    = \App\Models\Booking::query()
                ->where('customer_id', $customer->id)
                ->whereNotIn('booking_status', CustomerLoyaltyService::INVALID_STATUSES)
                ->count();

            $eligible = $count >= CustomerLoyaltyService::LOYALTY_THRESHOLD;

            $this->line("Customer #{$customer->id} — {$customer->display_name}");
            $this->line("  Sekarang : total_trip_count={$customer->total_trip_count}, discount_eligible=" . ($customer->discount_eligible ? 'true' : 'false'));
            $this->line("  Setelah  : total_trip_count={$count}, discount_eligible=" . ($eligible ? 'true' : 'false'));

            return self::SUCCESS;
        }

        $result = $loyaltyService->recalculateForCustomer($customer);

        $status = $result['changed'] ? '<fg=green>DIPERBARUI</>' : '<fg=yellow>TIDAK BERUBAH</>';
        $this->line("Customer #{$customer->id} — {$customer->display_name}: {$status} (trip={$result['total_trip_count']}, eligible=" . ($result['discount_eligible'] ? 'true' : 'false') . ')');

        return self::SUCCESS;
    }

    private function handleAll(CustomerLoyaltyService $loyaltyService, bool $isDryRun): int
    {
        $total = Customer::query()->active()->notMerged()->count();

        if ($total === 0) {
            $this->info('Tidak ada customer aktif yang ditemukan.');
            return self::SUCCESS;
        }

        $this->info("Memproses {$total} customer...");

        if ($isDryRun) {
            $this->previewAll($total);
            return self::SUCCESS;
        }

        $bar = $this->output->createProgressBar($total);
        $bar->start();

        $result = $loyaltyService->recalculateAll(function (int $processed) use ($bar): void {
            $bar->setProgress($processed);
        });

        $bar->finish();
        $this->newLine();

        $this->info("Selesai. Diproses: {$result['processed']} | Diperbarui: {$result['updated']} | Error: {$result['errors']}");

        if ($result['errors'] > 0) {
            $this->warn("Ada {$result['errors']} error. Periksa log untuk detail.");
            return self::FAILURE;
        }

        return self::SUCCESS;
    }

    private function previewAll(int $total): void
    {
        $willChange = 0;

        Customer::query()
            ->active()
            ->notMerged()
            ->orderBy('id')
            ->chunk(100, function ($customers) use (&$willChange): void {
                foreach ($customers as $customer) {
                    $count    = \App\Models\Booking::query()
                        ->where('customer_id', $customer->id)
                        ->whereNotIn('booking_status', CustomerLoyaltyService::INVALID_STATUSES)
                        ->count();

                    $eligible = $count >= CustomerLoyaltyService::LOYALTY_THRESHOLD;

                    $changed = $customer->total_trip_count !== $count
                        || $customer->discount_eligible !== $eligible;

                    if ($changed) {
                        $willChange++;
                        $this->line("  #{$customer->id} {$customer->display_name}: trip {$customer->total_trip_count}→{$count}, eligible " . ($customer->discount_eligible ? 'true' : 'false') . '→' . ($eligible ? 'true' : 'false'));
                    }
                }
            });

        $this->info("Total dari {$total} customer, {$willChange} akan diperbarui.");
    }
}
