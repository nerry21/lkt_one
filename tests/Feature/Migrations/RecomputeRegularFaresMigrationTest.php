<?php

namespace Tests\Feature\Migrations;

use App\Models\Booking;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Sesi 44B PR #1B-fix — Verify migration recompute fares hanya affect
 * kategori Reguler, BUKAN Paket/Dropping/Rental.
 *
 * Bug yang difix: versi awal migration 2026_04_27_000002 tidak filter
 * category, akibatnya booking Paket akan ke-update tarifnya.
 *
 * Strategi test: instantiate migration class via require, call up() manual.
 * `migrate:refresh` tidak bisa dipakai karena migration `drop_keberangkatan_
 * and_stock_tables` punya down() yang sengaja throw RuntimeException.
 */
class RecomputeRegularFaresMigrationTest extends TestCase
{
    use RefreshDatabase;

    private function runRecomputeMigration(): void
    {
        $migration = require database_path(
            'migrations/2026_04_27_000002_recompute_existing_booking_fares.php',
        );
        $migration->up();
    }

    public function test_paket_booking_with_low_fare_is_not_recomputed(): void
    {
        // Booking Paket dengan tarif rendah (50k) — TIDAK boleh di-recompute
        // jadi 150k (tarif Reguler). Ini adalah bug yang difix di PR #1B-fix.
        $paket = Booking::factory()->create([
            'category' => 'Paket',
            'from_city' => 'Pekanbaru',
            'to_city' => 'Pasirpengaraian',
            'direction' => 'from_pkb',
            'route_via' => 'BANGKINANG',
            'price_per_seat' => 50000,
            'total_amount' => 50000,
            'passenger_count' => 1,
            'booking_status' => 'Diproses',
            'payment_status' => 'Dibayar Tunai',
        ]);

        $this->runRecomputeMigration();

        $paket->refresh();

        $this->assertSame(50000, (int) round((float) $paket->price_per_seat));
        $this->assertSame(50000, (int) round((float) $paket->total_amount));
    }

    public function test_dropping_booking_fare_is_not_recomputed(): void
    {
        $dropping = Booking::factory()->create([
            'category' => 'Dropping',
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Pekanbaru',
            'direction' => 'to_pkb',
            'route_via' => 'BANGKINANG',
            'price_per_seat' => 80000,
            'total_amount' => 480000,
            'passenger_count' => 6,
            'booking_status' => 'Selesai',
            'payment_status' => 'Dibayar',
        ]);

        $this->runRecomputeMigration();

        $dropping->refresh();

        $this->assertSame(80000, (int) round((float) $dropping->price_per_seat));
        $this->assertSame(480000, (int) round((float) $dropping->total_amount));
    }

    public function test_rental_booking_fare_is_not_recomputed(): void
    {
        $rental = Booking::factory()->create([
            'category' => 'Rental',
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Pekanbaru',
            'direction' => 'to_pkb',
            'route_via' => 'BANGKINANG',
            'price_per_seat' => 100000,
            'total_amount' => 600000,
            'passenger_count' => 6,
            'booking_status' => 'Selesai',
            'payment_status' => 'Dibayar',
        ]);

        $this->runRecomputeMigration();

        $rental->refresh();

        $this->assertSame(100000, (int) round((float) $rental->price_per_seat));
        $this->assertSame(600000, (int) round((float) $rental->total_amount));
    }

    public function test_reguler_booking_with_outdated_fare_is_recomputed(): void
    {
        // Booking Reguler dengan tarif lama (130k) — HARUS di-recompute
        // ke tarif fareMap baru (150k untuk Pasir → PKB).
        $reguler = Booking::factory()->create([
            'category' => 'Reguler',
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Pekanbaru',
            'direction' => 'to_pkb',
            'route_via' => 'BANGKINANG',
            'price_per_seat' => 130000,
            'total_amount' => 130000,
            'passenger_count' => 1,
            'booking_status' => 'Diproses',
            'payment_status' => 'Belum Bayar',
        ]);

        $this->runRecomputeMigration();

        $reguler->refresh();

        $this->assertSame(150000, (int) round((float) $reguler->price_per_seat));
        $this->assertSame(150000, (int) round((float) $reguler->total_amount));
    }

    public function test_reguler_booking_already_correct_is_not_changed(): void
    {
        // Booking Reguler yang tarifnya sudah match fareMap baru → no-op.
        $reguler = Booking::factory()->create([
            'category' => 'Reguler',
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Pekanbaru',
            'direction' => 'to_pkb',
            'route_via' => 'BANGKINANG',
            'price_per_seat' => 150000,
            'total_amount' => 150000,
            'passenger_count' => 1,
        ]);

        $this->runRecomputeMigration();

        $reguler->refresh();

        $this->assertSame(150000, (int) round((float) $reguler->price_per_seat));
        $this->assertSame(150000, (int) round((float) $reguler->total_amount));
    }
}
