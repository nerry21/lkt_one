<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Audit trail snapshot booking state pre-delete (bug #42).
 *
 * Setiap kali booking dihapus via admin action (4 DELETE endpoint: 2 API + 2
 * web, integrasi Sesi B), snapshot full row + passengers disimpan sebelum
 * delete fisik. Tujuan: forensic "apa version + state terakhir saat dihapus?"
 * + restore manual via raw SQL (tidak ada Artisan command — design decision
 * Sesi 36: middle ground restore).
 *
 * Soft reference ke bookings (no FK): booking row sudah dihapus saat backup
 * record dibuat. Integrity dijaga application-level via snapshot kolom
 * denormalisasi (booking_code, final_version).
 *
 * Retention: forever (no auto-prune per design decision Sesi 36). Bu Bos
 * tidak request pruning. Disk cost negligible: ~1 KB/record × rare delete.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('booking_level_backups', function (Blueprint $table) {
            $table->id();

            // Soft reference — booking row sudah hilang saat record dibuat.
            $table->unsignedBigInteger('booking_id')->index();
            $table->string('booking_code', 50)->index();

            // Version state saat delete (bug #42 inti).
            $table->unsignedInteger('final_version');

            // Snapshot full row sebagai JSON (LONGTEXT untuk MariaDB 11.8 safety).
            $table->longText('snapshot')
                ->comment('Full booking row JSON pre-delete');

            // Snapshot passengers array (LONGTEXT JSON, nullable — rental booking
            // tidak punya passengers relation).
            $table->longText('passengers_snapshot')
                ->nullable()
                ->comment('Full passengers array JSON pre-delete');

            // Metadata operator. User pakai UUID (HasUuids trait), jadi pakai
            // foreignUuid dengan constrained('users').
            $table->foreignUuid('deleted_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();
            $table->timestamp('deleted_at')->index();

            // Reason free-text (nullable — admin UI di Sesi B boleh kasih input
            // atau skip dengan null).
            $table->text('reason')->nullable();

            $table->timestamps();

            $table->index(['booking_id', 'final_version']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('booking_level_backups');
    }
};
