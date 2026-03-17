<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Membuat tabel customers sebagai fondasi identitas pelanggan yang stabil.
 *
 * Prinsip desain:
 * - Identitas utama: phone_normalized (E.164: 628xxx). Nullable untuk pelanggan tanpa HP.
 * - customer_code (CUST-000001) diisi via Model booted() event setelah insert — bukan di migration.
 * - Nama hanya bersifat display, bukan identifier.
 * - Soft delete: pelanggan tidak pernah dihapus permanen, hanya di-nonaktifkan.
 * - Merge: satu customer bisa di-merge ke customer lain (self-referential FK).
 *
 * Kompatibilitas: MySQL 5.7+ / MariaDB 10.3+ / Laravel 10+
 * Catatan MySQL: UNIQUE pada nullable column → setiap NULL dianggap berbeda (aman).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {

            // ── Primary Key ────────────────────────────────────────────────────
            $table->id(); // bigint auto-increment

            // ── Kode Publik (diisi via Model booted event setelah INSERT) ──────
            // Nullable agar INSERT pertama bisa sukses sebelum code di-set.
            // Format: CUST-000001 (zero-padded dari ID)
            $table->string('customer_code', 20)->nullable()->unique();

            // ── Identitas Tampilan ─────────────────────────────────────────────
            $table->string('display_name', 255);

            // ── Nomor Telepon (primary identifier) ────────────────────────────
            // phone_normalized: format E.164 tanpa +, contoh: 628123456789
            // Nullable: ada pelanggan walk-in tanpa HP (identifikasi lewat nama saja)
            // UNIQUE: MySQL/MariaDB treat NULL as distinct — aman untuk multiple null
            $table->string('phone_normalized', 20)->nullable()->unique();
            // phone_original: format asli saat pertama kali diinput (audit trail)
            $table->string('phone_original', 30)->nullable();

            // ── Kontak Tambahan ────────────────────────────────────────────────
            $table->string('email', 255)->nullable();

            // ── Kepercayaan Identitas ──────────────────────────────────────────
            // high   = nomor HP telah dikonfirmasi / terverifikasi secara manual
            // medium = phone match dari data booking (default sistem)
            // low    = nama-only, tanpa nomor HP (risiko duplikat tertinggi)
            $table->enum('identity_confidence', ['high', 'medium', 'low'])->default('medium');

            // ── Status Pelanggan ───────────────────────────────────────────────
            // active  = pelanggan aktif
            // merged  = sudah digabung ke pelanggan lain (lihat merged_into_id)
            // inactive = dinonaktifkan secara manual
            $table->enum('status', ['active', 'merged', 'inactive'])->default('active');

            // ── Statistik Loyalty (cached, di-recalculate via command) ─────────
            $table->unsignedInteger('total_trip_count')->default(0);
            $table->unsignedInteger('lifetime_scan_count')->default(0);
            $table->boolean('discount_eligible')->default(false);

            // ── Catatan Admin ──────────────────────────────────────────────────
            $table->text('notes')->nullable();

            // ── Merge / Deduplication ──────────────────────────────────────────
            // Self-referential: jika customer ini di-merge ke customer lain
            $table->foreignId('merged_into_id')
                ->nullable()
                ->constrained('customers')
                ->nullOnDelete();

            $table->timestamp('merged_at')->nullable();

            // merged_by referensi users.id yang bertipe UUID
            $table->foreignUuid('merged_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            // ── Timestamps & Soft Delete ───────────────────────────────────────
            $table->timestamps();
            $table->softDeletes(); // deleted_at — customer tidak pernah dihapus permanen

            // ── Indexes ────────────────────────────────────────────────────────
            $table->index('status');
            $table->index('email');
            $table->index('identity_confidence');
            $table->index('merged_into_id');
            // phone_normalized dan customer_code sudah ada UNIQUE index otomatis
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
