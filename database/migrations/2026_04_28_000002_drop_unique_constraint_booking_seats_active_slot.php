<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * Sesi 48 PR #3 — Drop UNIQUE constraint untuk Sub-Route Seat Sharing.
 *
 * Background:
 * UNIQUE KEY `uk_booking_seats_active_slot` di kolom generated `active_slot_key`
 * enforce satu row aktif per (date, time, direction, route_via, armada, seat).
 * Constraint ini block sub-route sharing yang valid:
 *   - Booking #1: SKPD→Tandun, kursi 2A
 *   - Booking #2: Aliantan→Bangkinang, kursi 2A (range disjoint, valid share)
 *
 * Generated column TIDAK BISA enforce range overlap secara matematis (point
 * lookup vs range comparison). Application layer (SeatLockService) sekarang
 * handle overlap detection via RouteSequenceService::bookingsOverlap().
 *
 * Concurrency safety: DB::transaction + lockForUpdate() di SeatLockService
 * acquire gap lock di idx_booking_seats_slot_active untuk serialize concurrent
 * INSERT — race condition tetap covered di application layer.
 *
 * Generated column `active_slot_key` SENGAJA TIDAK di-drop (audit trail value
 * + historical compat untuk debugging). Hanya UNIQUE KEY-nya yang di-drop.
 */
return new class extends Migration
{
    public function up(): void
    {
        // DDL di luar transaction (implicit commit di MariaDB DDL).
        DB::statement('ALTER TABLE booking_seats DROP INDEX uk_booking_seats_active_slot');
    }

    public function down(): void
    {
        // Restore UNIQUE constraint kalau rollback diperlukan.
        // CAUTION: rollback akan FAIL kalau ada existing sub-route share
        // booking di table — admin harus cleanup duplicate active rows manual.
        DB::statement('ALTER TABLE booking_seats ADD UNIQUE KEY uk_booking_seats_active_slot (active_slot_key)');
    }
};
