<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Menambahkan kolom customer identity dan PDF backup ke tabel bookings.
 *
 * Kolom yang ditambahkan:
 * - customer_id          : FK ke customers (nullable — backward compatible dengan data lama)
 * - ticket_pdf_path      : path file PDF E-Ticket di storage
 * - ticket_pdf_disk      : nama disk storage (local, s3, dll)
 * - ticket_pdf_generated_at : kapan PDF terakhir di-generate
 *
 * PENTING:
 * - Semua kolom nullable → data booking lama tetap valid tanpa perubahan
 * - customer_id: nullOnDelete agar booking tidak terpengaruh jika customer di-soft-delete
 * - Kolom passenger_name dan passenger_phone TIDAK dihapus (backward compatibility)
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {

            // customer_id setelah kolom id (posisi logis sebagai FK utama)
            // Tidak menggunakan constrained() langsung karena MySQL tidak support
            // menambahkan FK dengan posisi 'after' di semua versi — pakai addColumn dulu
            $table->foreignId('customer_id')
                ->nullable()
                ->after('id')
                ->constrained('customers')
                ->nullOnDelete();

            // ── PDF Backup Fields ──────────────────────────────────────────────
            // Path relatif dari storage disk (contoh: public/etickets/2026/03/RBK-260317-ABCD.pdf)
            $table->string('ticket_pdf_path', 500)
                ->nullable()
                ->after('ticket_issued_at');

            // Nama disk storage Laravel (default: 'local', bisa juga 's3', 'ftp', dll)
            $table->string('ticket_pdf_disk', 30)
                ->nullable()
                ->default('local')
                ->after('ticket_pdf_path');

            // Timestamp kapan PDF terakhir di-generate / disimpan
            $table->timestamp('ticket_pdf_generated_at')
                ->nullable()
                ->after('ticket_pdf_disk');

            // ── Indexes ────────────────────────────────────────────────────────
            $table->index('customer_id', 'bookings_customer_id_index');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Hapus FK constraint terlebih dahulu sebelum drop column
            $table->dropForeign(['customer_id']);
            $table->dropIndex('bookings_customer_id_index');

            $table->dropColumn([
                'customer_id',
                'ticket_pdf_path',
                'ticket_pdf_disk',
                'ticket_pdf_generated_at',
            ]);
        });
    }
};
