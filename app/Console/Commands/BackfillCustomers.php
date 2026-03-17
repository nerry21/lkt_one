<?php

namespace App\Console\Commands;

use App\Services\CustomerMatchingService;
use Illuminate\Console\Command;

/**
 * BackfillCustomers
 *
 * Menghubungkan booking dan booking_passengers lama ke tabel customers.
 *
 * Jalankan secara bertahap:
 *   php artisan lkt:backfill-customers --dry-run            # preview dulu
 *   php artisan lkt:backfill-customers --phase=phone        # phase 1: booking dengan phone
 *   php artisan lkt:backfill-customers --phase=name         # phase 2: sisa booking (nama saja)
 *   php artisan lkt:backfill-customers --phase=passengers   # phase 3: booking_passengers
 *   php artisan lkt:backfill-customers                      # semua phase sekaligus
 *
 * Opsi:
 *   --dry-run  : Preview tanpa menyimpan ke database
 *   --chunk=N  : Jumlah baris per batch (default: 100)
 *   --phase=X  : Jalankan hanya phase tertentu: phone|name|passengers|all (default: all)
 */
class BackfillCustomers extends Command
{
    protected $signature = 'lkt:backfill-customers
        {--dry-run : Preview tanpa menyimpan perubahan ke database}
        {--chunk=100 : Jumlah baris per batch}
        {--phase=all : Phase yang dijalankan: phone|name|passengers|all}';

    protected $description = 'Backfill customer_id ke booking dan booking_passengers lama [Tahap 3]';

    public function __construct(
        private readonly CustomerMatchingService $matcher,
    ) {
        parent::__construct();
    }

    public function handle(): int
    {
        $dryRun    = (bool) $this->option('dry-run');
        $chunkSize = max(1, (int) $this->option('chunk'));
        $phase     = strtolower(trim((string) $this->option('phase')));

        $validPhases = ['all', 'phone', 'name', 'passengers'];
        if (! in_array($phase, $validPhases, true)) {
            $this->error("Phase tidak valid: '{$phase}'. Pilihan: " . implode(', ', $validPhases));
            return self::FAILURE;
        }

        if ($dryRun) {
            $this->warn('[DRY RUN] Tidak ada perubahan yang akan disimpan ke database.');
        }

        $this->line("Phase    : <info>{$phase}</info>");
        $this->line("Chunk    : <info>{$chunkSize}</info>");
        $this->line("Mode     : <info>" . ($dryRun ? 'DRY RUN' : 'PRODUCTION') . "</info>");
        $this->newLine();

        $runPhone      = in_array($phase, ['all', 'phone'], true);
        $runName       = in_array($phase, ['all', 'name'], true);
        $runPassengers = in_array($phase, ['all', 'passengers'], true);

        $totalLinked = 0;
        $totalErrors = 0;

        // ── Phase 1: Bookings dengan phone valid ────────────────────────────
        if ($runPhone) {
            $this->info('━━━ Phase 1: Booking dengan nomor HP ━━━');
            $stats = $this->matcher->backfillBookingsByPhone($dryRun, $chunkSize);
            $this->printStats($stats, $dryRun, 'booking');
            $totalLinked += $stats['linked'];
            $totalErrors += $stats['errors'];
            $this->newLine();
        }

        // ── Phase 2: Booking tanpa phone valid (name-only) ──────────────────
        if ($runName) {
            $this->info('━━━ Phase 2: Booking tanpa HP (nama saja) ━━━');
            $this->warn('  Catatan: matching nama berisiko false positive untuk nama umum.');
            $this->warn('  Customer yang dibuat di sini memiliki identity_confidence = low.');
            $stats = $this->matcher->backfillBookingsByName($dryRun, $chunkSize);
            $this->printStats($stats, $dryRun, 'booking');
            if (isset($stats['customers_created']) && $stats['customers_created'] > 0) {
                $this->line("  Customer baru dibuat : <comment>{$stats['customers_created']}</comment>");
            }
            $totalLinked += $stats['linked'];
            $totalErrors += $stats['errors'];
            $this->newLine();
        }

        // ── Phase 3: Booking passengers ─────────────────────────────────────
        if ($runPassengers) {
            $this->info('━━━ Phase 3: Booking passengers ━━━');
            $stats = $this->matcher->backfillPassengers($dryRun, $chunkSize);
            $this->printStats($stats, $dryRun, 'passenger');
            $totalLinked += $stats['linked'];
            $totalErrors += $stats['errors'];
            $this->newLine();
        }

        // ── Summary ──────────────────────────────────────────────────────────
        $this->info('━━━ SELESAI ━━━');
        $this->table(
            ['Keterangan', 'Jumlah'],
            [
                ['Total dihubungkan', $totalLinked],
                ['Total error',       $totalErrors],
                ['Mode',              $dryRun ? 'DRY RUN (tidak disimpan)' : 'PRODUCTION (tersimpan)'],
            ],
        );

        if ($totalErrors > 0) {
            $this->warn("Ada {$totalErrors} error. Periksa log untuk detail.");
            return self::FAILURE;
        }

        if ($dryRun) {
            $this->line('');
            $this->info('Jalankan tanpa --dry-run untuk menyimpan perubahan.');
        }

        return self::SUCCESS;
    }

    /**
     * Cetak ringkasan stats dan detail baris (dry-run: maks 20 baris, production: hanya error).
     */
    private function printStats(array $stats, bool $dryRun, string $type): void
    {
        $linkedLabel = $dryRun ? 'Akan diproses' : 'Dihubungkan';
        $this->line("  Diproses     : {$stats['processed']}");
        $this->line("  Dilewati     : {$stats['skipped']}");
        $this->line("  {$linkedLabel} : " . ($dryRun ? $stats['processed'] : $stats['linked']));
        if ($stats['errors'] > 0) {
            $this->warn("  Error        : {$stats['errors']}");
        }

        $detailRows = $dryRun
            ? array_slice($stats['rows'], 0, 20)
            : array_filter($stats['rows'], fn ($r) => ($r['action'] ?? '') === 'ERROR');

        foreach ($detailRows as $row) {
            $action = $row['action'] ?? '?';
            $id     = $type === 'passenger'
                ? "passenger #{$row['passenger_id']} (booking #{$row['booking_id']})"
                : "booking #{$row['booking_id']} ({$row['booking_code']})";

            if ($action === 'DRY') {
                $name    = $row['name'] ?? '-';
                $phone   = $row['phone'] ?? '-';
                $conf    = isset($row['confidence']) ? " [{$row['confidence']}]" : '';
                $grpSize = isset($row['group_size']) && $row['group_size'] > 1 ? " (grup: {$row['group_size']})" : '';
                $this->line("    [DRY] {$id} — {$name} / {$phone}{$conf}{$grpSize}");
            } elseif ($action === 'SKIP') {
                $this->line("    [SKIP] {$id} — {$row['reason']}");
            } elseif ($action === 'ERROR') {
                $this->error("    [ERR] {$id} — {$row['reason']}");
            }
        }

        $shown = count($detailRows);
        $total = count($stats['rows']);
        if ($dryRun && $total > $shown) {
            $this->line("    ... dan " . ($total - $shown) . " baris lainnya.");
        }
    }
}
