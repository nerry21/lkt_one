<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Membuat tabel ticket_backups untuk backup permanen PDF E-Ticket.
 *
 * Setiap PDF yang pernah di-generate dan disimpan dicatat di sini.
 * Record ini tidak pernah dihapus — bukti bahwa tiket pernah diterbitkan.
 *
 * Tipe backup:
 * - booking   : satu PDF untuk seluruh booking (semua penumpang)
 * - passenger : satu PDF per penumpang individual
 *
 * Versioning:
 * - Setiap kali tiket diterbitkan ulang, version di-increment
 * - Versi terbaru bisa diidentifikasi dari backed_up_at terbaru per booking_id
 *
 * Desain FK (Soft References):
 * - booking_id, passenger_id, customer_id: TANPA constraint FK keras
 *   Alasan: backup harus tetap ada meskipun booking/passenger/customer dihapus
 *   Integritas dijaga di application layer
 * - generated_by: foreignUuid karena users.id bertipe UUID
 *   Nullable jika trigger oleh system/cron (bukan user)
 *
 * Integrity:
 * - file_hash (SHA-256): memungkinkan verifikasi bahwa file tidak diubah/corrupt
 * - UNIQUE (file_path): satu path = satu backup record
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ticket_backups', function (Blueprint $table) {

            $table->id();

            // ── Referensi Sumber (Soft References) ────────────────────────────
            // booking_id wajib — setiap backup selalu terikat ke booking
            $table->unsignedBigInteger('booking_id');
            // passenger_id opsional: null = backup level booking, isi = backup per penumpang
            $table->unsignedBigInteger('passenger_id')->nullable();
            // customer_id opsional: untuk query riwayat tiket per pelanggan
            $table->unsignedBigInteger('customer_id')->nullable();

            // ── Snapshot Identitas saat Backup ────────────────────────────────
            // Disimpan sebagai snapshot agar tetap valid meski data asli berubah
            $table->string('booking_code', 50);
            $table->string('ticket_number', 50)->nullable();
            $table->string('invoice_number', 50)->nullable();
            $table->string('passenger_name', 255); // Nama utama booking atau nama penumpang

            // ── Tipe Backup ───────────────────────────────────────────────────
            $table->enum('backup_type', ['booking', 'passenger']);

            // ── File Storage ──────────────────────────────────────────────────
            // Path relatif dari root disk storage
            // Contoh: public/etickets/2026/03/RBK-260317-ABCD.pdf
            $table->string('file_path', 500);

            // Nama disk storage (local, s3, ftp, dll) — default 'local'
            $table->string('disk', 30)->default('local');

            // SHA-256 checksum untuk verifikasi integritas file
            $table->string('file_hash', 64)->nullable();

            // Ukuran file dalam bytes (untuk monitoring storage)
            $table->unsignedInteger('file_size_bytes')->nullable();

            // ── Versioning ────────────────────────────────────────────────────
            // Increment setiap kali tiket yang sama diterbitkan ulang
            $table->unsignedSmallInteger('version')->default(1);

            // ── Timestamps Tiket ──────────────────────────────────────────────
            // issued_at: kapan tiket DITERBITKAN (dari bookings.ticket_issued_at)
            $table->timestamp('issued_at')->nullable();
            // backed_up_at: kapan PDF di-generate dan disimpan ke storage
            $table->timestamp('backed_up_at');

            // ── Operator ──────────────────────────────────────────────────────
            // foreignUuid karena users.id bertipe UUID
            // Nullable: boleh diisi system/cron (bukan user login)
            $table->foreignUuid('generated_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamps();

            // ── Constraints & Indexes ──────────────────────────────────────────
            $table->unique('file_path');       // 1 path = 1 record backup
            $table->index('booking_id');
            $table->index('passenger_id');
            $table->index('customer_id');
            $table->index('ticket_number');
            $table->index('backed_up_at');
            $table->index(['booking_id', 'backup_type', 'version']); // Untuk cari versi terbaru
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ticket_backups');
    }
};
