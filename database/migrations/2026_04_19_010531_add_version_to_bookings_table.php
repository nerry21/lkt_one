<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Add optimistic locking version column to bookings table (bug #30 Phase 2).
 *
 * - unsignedInteger (4.3B range sufficient, smaller than bigInt)
 * - default 0, NOT NULL — existing rows auto-initialize
 * - Placed after return_trip_time (last column in current schema)
 * - No index — version always queried with primary key (bookings.id)
 *
 * Usage pattern (see docs/bug-30-design.md §3):
 *   UPDATE bookings SET ..., version = version + 1
 *   WHERE id = ? AND version = ?   (atomic check-and-set)
 *
 * Refs: docs/bug-30-design.md (commit e73d59f)
 * Refs: docs/audit-findings.md:911 (original bug #30 registration)
 */
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->unsignedInteger('version')
                ->default(0)
                ->after('return_trip_time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn('version');
        });
    }
};
