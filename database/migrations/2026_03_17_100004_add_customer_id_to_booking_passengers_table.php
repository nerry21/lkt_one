<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Menambahkan customer_id ke tabel booking_passengers.
 *
 * Setiap penumpang individu dalam booking dapat dihubungkan ke satu customer record.
 * Nullable untuk backward compatibility — data lama tidak terpengaruh.
 *
 * Catatan:
 * - Kolom name dan phone pada booking_passengers TIDAK dihapus
 * - customer_id diisi oleh CustomerResolverService saat booking dibuat/diperbarui
 * - nullOnDelete: jika customer di-soft-delete, FK di sini menjadi NULL (data tetap aman)
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('booking_passengers', function (Blueprint $table) {
            $table->foreignId('customer_id')
                ->nullable()
                ->after('booking_id')
                ->constrained('customers')
                ->nullOnDelete();

            $table->index('customer_id', 'booking_passengers_customer_id_index');
        });
    }

    public function down(): void
    {
        Schema::table('booking_passengers', function (Blueprint $table) {
            $table->dropForeign(['customer_id']);
            $table->dropIndex('booking_passengers_customer_id_index');
            $table->dropColumn('customer_id');
        });
    }
};
