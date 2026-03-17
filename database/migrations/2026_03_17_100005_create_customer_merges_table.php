<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Membuat tabel customer_merges sebagai audit trail operasi merge pelanggan.
 *
 * Setiap kali dua customer duplikat digabung, satu record dibuat di sini.
 * Record ini TIDAK PERNAH dihapus — permanen sebagai bukti operasi.
 *
 * Desain FK:
 * - source_customer_id dan target_customer_id adalah SOFT REFERENCE (bukan FK constraint keras)
 *   Alasan: source customer tetap ada di DB dengan status 'merged' — tidak dihapus.
 *   Jika dibuat FK constraint, ON DELETE CASCADE akan merusak audit trail.
 *   Integritas dijaga di application layer (CustomerMergeService).
 *
 * - merged_by adalah foreignUuid karena users.id bertipe UUID.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customer_merges', function (Blueprint $table) {

            $table->id();

            // ── Referensi Customer (Soft Reference — tanpa FK constraint) ──────
            // source: customer yang "dihapus" identitasnya (status = 'merged')
            $table->unsignedBigInteger('source_customer_id');
            // target: customer yang menerima semua data dari source
            $table->unsignedBigInteger('target_customer_id');

            // ── Alasan Merge ───────────────────────────────────────────────────
            $table->text('reason')->nullable();

            // ── Summary Transfer ───────────────────────────────────────────────
            // Dicatat saat merge dilakukan untuk keperluan audit
            $table->unsignedInteger('bookings_transferred')->default(0);
            $table->unsignedInteger('passengers_transferred')->default(0);
            $table->unsignedInteger('aliases_transferred')->default(0);

            // ── Operator ───────────────────────────────────────────────────────
            // foreignUuid karena users.id bertipe UUID
            $table->foreignUuid('merged_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            // Timestamp wajib — kapan merge dilakukan
            $table->timestamp('merged_at');

            // ── Metadata JSON ──────────────────────────────────────────────────
            // Snapshot data sebelum merge, informasi diagnostik tambahan
            // Contoh: {"source_phone": "...", "target_phone": "...", "trigger": "admin_manual"}
            $table->json('metadata')->nullable();

            $table->timestamps();

            // ── Indexes ────────────────────────────────────────────────────────
            $table->index('source_customer_id');
            $table->index('target_customer_id');
            $table->index('merged_by');
            $table->index('merged_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customer_merges');
    }
};
