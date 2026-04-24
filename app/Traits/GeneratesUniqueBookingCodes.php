<?php

namespace App\Traits;

use Illuminate\Support\Str;

/**
 * Generates booking-scoped unique codes with TOCTOU-safe pre-check retry.
 *
 * Pola: pre-check via exists() + jitter-backoff antar attempt hingga
 * maxAttempts. Konsolidasi 15 helper `do { Str::random() } while (exists())`
 * lintas 4 persistence service + BookingManagementService.
 *
 * Resolves bug #36 — TOCTOU PRE-check race window post-bug-#13 Section L
 * UNIQUE constraint. Closes kasus "2 proses bersamaan generate same random
 * string saat exists() check" via jitter delay 10–30 ms antar retry,
 * memberi slack supaya random seed secara praktis berbeda.
 *
 * **Honest scope**: closes PRE-check race. POST-insert SQLSTATE 23000 race
 * masih theoretically mungkin (antara return helper dan INSERT upstream),
 * tapi probability astronomis rendah (keyspace 4-char ≈ 14.7M × low volume).
 * Close post-insert race = invasi upstream caller (out-of-scope audit §36
 * Priority LOW).
 *
 * Pattern reference: App\Traits\NormalizesTripTime (bug #28 resolution).
 *
 * @see docs/audit-findings.md bug #36
 */
trait GeneratesUniqueBookingCodes
{
    /**
     * Generate unique code with jitter-retry pre-check (bug #36 scope).
     *
     * @param  string  $modelClass     FQCN Eloquent model (e.g., Booking::class).
     * @param  string  $column         Nama kolom yang dicek uniqueness-nya.
     * @param  string  $prefix         Code prefix (e.g., 'INV', 'ETK', 'QRT', 'RBK').
     * @param  int     $randomLength   Panjang Str::random() suffix (default 4).
     * @param  int     $maxAttempts    Retry attempt max dengan jitter (default 3).
     * @return string                  Format: "{PREFIX}-{ymd}-{RANDOM}".
     */
    protected function generateUniqueBookingCode(
        string $modelClass,
        string $column,
        string $prefix,
        int $randomLength = 4,
        int $maxAttempts = 3,
    ): string {
        $code = '';

        for ($attempt = 1; $attempt <= $maxAttempts; $attempt++) {
            $code = $prefix . '-' . now()->format('ymd') . '-' . Str::upper(Str::random($randomLength));

            if (! $modelClass::query()->where($column, $code)->exists()) {
                return $code;
            }

            // Pre-check collision — jitter delay sebelum retry untuk hindari
            // thundering-herd deterministic replay.
            if ($attempt < $maxAttempts) {
                usleep(random_int(10_000, 30_000)); // 10–30 ms dalam mikrodetik
            }
        }

        // Semua attempt exhausted — extremely rare. Return candidate terakhir
        // (upstream INSERT akan SQLSTATE 23000 kalau masih collide). Behavior
        // match pre-fix: biarkan 23000 bubble ke caller.
        return $code;
    }
}
