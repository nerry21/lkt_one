<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Membuat tabel customer_aliases.
 *
 * Menyimpan semua variasi nama yang pernah digunakan oleh customer yang sama.
 *
 * Kegunaan:
 * - Deteksi duplikat pelanggan berdasarkan nama mirip
 * - Riwayat koreksi nama (audit trail)
 * - Pencarian fuzzy nama pelanggan
 * - Sumber data untuk merge kandidat duplikat
 *
 * Desain:
 * - UNIQUE (customer_id, alias_name_normalized): satu alias tidak muncul 2x per customer
 * - INDEX (alias_name_normalized): untuk cross-customer search dan deteksi duplikat
 * - source_booking_id dan source_passenger_id: soft reference (tanpa FK constraint)
 *   alasannya: booking/passenger bisa dihapus, alias harus tetap ada untuk audit
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customer_aliases', function (Blueprint $table) {

            $table->id();

            // Relasi ke customers — cascade delete: jika customer dihapus, alias ikut terhapus
            $table->foreignId('customer_id')
                ->constrained('customers')
                ->cascadeOnDelete();

            // Nama asli seperti diinput (case-preserved, whitespace original)
            $table->string('alias_name', 255);

            // Versi normalisasi untuk matching: lowercase, trim, single-space
            // Contoh: "  BUDI Santoso  " → "budi santoso"
            $table->string('alias_name_normalized', 255);

            // Apakah ini nama tampilan utama saat ini
            // Hanya 1 alias per customer yang boleh is_primary = true
            $table->boolean('is_primary')->default(false);

            // Asal data alias — untuk audit trail
            // booking  = berasal dari data booking (otomatis)
            // manual   = diinput/koreksi manual oleh admin
            // import   = dari proses import data
            // merge    = disalin dari customer lain saat proses merge
            $table->enum('source', ['booking', 'manual', 'import', 'merge'])->default('booking');

            // Soft reference ke sumber data (tidak FK constraint untuk fleksibilitas)
            // Booking/passenger boleh dihapus; alias tetap sebagai catatan historis
            $table->unsignedBigInteger('source_booking_id')->nullable();
            $table->unsignedBigInteger('source_passenger_id')->nullable();

            $table->timestamps();

            // UNIQUE: 1 alias_name_normalized tidak muncul 2x untuk customer yang sama
            $table->unique(['customer_id', 'alias_name_normalized'], 'customer_aliases_unique_per_customer');

            // INDEX untuk cross-customer search dan deteksi duplikat
            $table->index('alias_name_normalized', 'customer_aliases_name_normalized_index');
            $table->index('customer_id');
            $table->index('source_booking_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customer_aliases');
    }
};
