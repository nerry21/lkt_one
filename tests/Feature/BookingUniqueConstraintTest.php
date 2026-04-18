<?php

namespace Tests\Feature;

use App\Models\Booking;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Bug #13 resolution regression guard: invoice_number + ticket_number + qr_token
 * harus enforce UNIQUE constraint at DB level post-Section L migration.
 *
 * Pre-fix: INDEX only (lookup perf), TOCTOU race window via
 * generateInvoiceNumber/generateTicketNumber/generateQrToken `do { ... } while (exists)`
 * loop bisa silent duplicate pada concurrent insert.
 *
 * Post-fix: SQLSTATE[23000] Duplicate entry raised as QueryException → 4 persistence
 * services' retry loop akan re-attempt generate (statistically rare, 4-char/6-char
 * random keyspace astronomically low collision di JET Travel scale).
 *
 * Scope: 3 test (one per column), inline Booking::factory() create untuk minimize
 * scaffolding (mirror M-series established pattern, no seeder overhead).
 */
class BookingUniqueConstraintTest extends TestCase
{
    use RefreshDatabase;

    public function test_invoice_number_unique_constraint_enforced(): void
    {
        Booking::factory()->create([
            'booking_code' => 'TEST-UNIQ-INV1',
            'invoice_number' => 'INV-TEST-001',
        ]);

        $this->expectException(QueryException::class);

        // Second booking dengan invoice_number identik harus trigger SQLSTATE[23000]
        Booking::factory()->create([
            'booking_code' => 'TEST-UNIQ-INV2',
            'invoice_number' => 'INV-TEST-001',
        ]);
    }

    public function test_ticket_number_unique_constraint_enforced(): void
    {
        Booking::factory()->create([
            'booking_code' => 'TEST-UNIQ-TIC1',
            'ticket_number' => 'ETK-TEST-001',
        ]);

        $this->expectException(QueryException::class);

        Booking::factory()->create([
            'booking_code' => 'TEST-UNIQ-TIC2',
            'ticket_number' => 'ETK-TEST-001',
        ]);
    }

    public function test_qr_token_unique_constraint_enforced(): void
    {
        Booking::factory()->create([
            'booking_code' => 'TEST-UNIQ-QRT1',
            'qr_token' => 'QRT-TEST-000001',
        ]);

        $this->expectException(QueryException::class);

        Booking::factory()->create([
            'booking_code' => 'TEST-UNIQ-QRT2',
            'qr_token' => 'QRT-TEST-000001',
        ]);
    }
}
