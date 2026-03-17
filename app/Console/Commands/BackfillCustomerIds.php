<?php

namespace App\Console\Commands;

use App\Models\Booking;
use App\Services\CustomerResolverService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

/**
 * BackfillCustomerIds — DEPRECATED
 *
 * @deprecated Gunakan `lkt:backfill-customers` (BackfillCustomers.php) sebagai gantinya.
 *
 * Command ini dipertahankan untuk backward compatibility saja.
 * Menjalankan command ini akan menampilkan peringatan dan mengarahkan ke command baru.
 */
class BackfillCustomerIds extends Command
{
    protected $signature   = 'customers:backfill {--dry-run : Simulasi tanpa menyimpan perubahan}';
    protected $description = '[DEPRECATED] Gunakan lkt:backfill-customers sebagai gantinya';

    public function __construct(
        private CustomerResolverService $resolver,
    ) {
        parent::__construct();
    }

    public function handle(): int
    {
        $this->warn('⚠  Command ini DEPRECATED. Gunakan command baru:');
        $this->line('');
        $this->line('   php artisan lkt:backfill-customers --dry-run');
        $this->line('   php artisan lkt:backfill-customers');
        $this->line('');
        $this->warn('Command baru mendukung --phase=phone|name|passengers|all dan lebih aman.');
        $this->line('');

        if (! $this->confirm('Tetap lanjutkan dengan command lama? (tidak direkomendasikan)', false)) {
            return self::SUCCESS;
        }

        $isDryRun = (bool) $this->option('dry-run');

        if ($isDryRun) {
            $this->info('[DRY RUN] Tidak ada perubahan yang akan disimpan.');
        }

        // ── 1. Backfill bookings ────────────────────────────────────────────
        $this->info('Memproses bookings tanpa customer_id...');

        $bookingCount   = 0;
        $passengerCount = 0;

        Booking::query()
            ->whereNull('customer_id')
            ->with('passengers')
            ->orderBy('id')
            ->chunkById(100, function ($bookings) use ($isDryRun, &$bookingCount, &$passengerCount) {
                foreach ($bookings as $booking) {
                    $name  = trim((string) ($booking->passenger_name ?? ''));
                    $phone = trim((string) ($booking->passenger_phone ?? ''));

                    if ($name === '' && $phone === '') {
                        $this->line("  [SKIP] Booking #{$booking->id} ({$booking->booking_code}) — nama & phone kosong");
                        continue;
                    }

                    if (! $isDryRun) {
                        $customer = DB::transaction(function () use ($booking, $name, $phone) {
                            $customer = $this->resolver->resolve($phone, $name, (int) $booking->id);

                            if ($customer === null) {
                                return null;
                            }

                            // Update booking
                            DB::table('bookings')
                                ->where('id', $booking->id)
                                ->update(['customer_id' => $customer->id]);

                            return $customer;
                        });

                        if ($customer) {
                            $bookingCount++;
                            $this->line("  [OK] Booking #{$booking->id} ({$booking->booking_code}) → Customer #{$customer->id} ({$customer->display_name})");
                        }
                    } else {
                        $this->line("  [DRY] Booking #{$booking->id} ({$booking->booking_code}) → phone={$phone}, name={$name}");
                        $bookingCount++;
                    }
                }
            });

        // ── 2. Backfill booking_passengers ─────────────────────────────────
        $this->info('Memproses booking_passengers tanpa customer_id...');

        DB::table('booking_passengers')
            ->whereNull('customer_id')
            ->orderBy('id')
            ->chunkById(100, function ($rows) use ($isDryRun, &$passengerCount) {
                foreach ($rows as $row) {
                    $name  = trim((string) ($row->name ?? ''));
                    $phone = trim((string) ($row->phone ?? ''));

                    if ($name === '' && $phone === '') {
                        continue;
                    }

                    if (! $isDryRun) {
                        $customer = $this->resolver->resolve($phone, $name, (int) $row->booking_id);

                        if ($customer) {
                            DB::table('booking_passengers')
                                ->where('id', $row->id)
                                ->update(['customer_id' => $customer->id]);

                            $passengerCount++;
                        }
                    } else {
                        $passengerCount++;
                    }
                }
            });

        $this->newLine();
        $this->info("Selesai.");
        $this->table(
            ['Keterangan', 'Jumlah'],
            [
                ['Bookings diproses', $bookingCount],
                ['Booking Passengers diproses', $passengerCount],
                ['Mode', $isDryRun ? 'DRY RUN (tidak disimpan)' : 'PRODUCTION (tersimpan)'],
            ],
        );

        return self::SUCCESS;
    }
}
