<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payment_accounts', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('channel_type', 30);
            $table->string('provider_name');
            $table->string('account_number')->nullable();
            $table->string('account_holder')->nullable();
            $table->text('qr_content')->nullable();
            $table->text('notes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['channel_type', 'is_active']);
        });

        DB::table('payment_accounts')->insert([
            [
                'code' => 'bca_operasional',
                'channel_type' => 'transfer',
                'provider_name' => 'Bank BCA',
                'account_number' => '1110 0022 2333',
                'account_holder' => 'PT JET (JAYA EXCECUTIVE TRANSPORT)',
                'qr_content' => null,
                'notes' => 'Rekening operasional utama untuk pembayaran transfer reguler.',
                'is_active' => true,
                'sort_order' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'bni_operasional',
                'channel_type' => 'transfer',
                'provider_name' => 'Bank BNI',
                'account_number' => '2200 3344 5566',
                'account_holder' => 'PT JET (JAYA EXCECUTIVE TRANSPORT)',
                'qr_content' => null,
                'notes' => 'Rekening alternatif untuk pembayaran transfer reguler.',
                'is_active' => true,
                'sort_order' => 20,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'mandiri_operasional',
                'channel_type' => 'transfer',
                'provider_name' => 'Bank Mandiri',
                'account_number' => '3300 4455 6677',
                'account_holder' => 'PT JET (JAYA EXCECUTIVE TRANSPORT)',
                'qr_content' => null,
                'notes' => 'Rekening cadangan untuk pembayaran transfer reguler.',
                'is_active' => true,
                'sort_order' => 30,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'qris_operasional',
                'channel_type' => 'qris',
                'provider_name' => 'QRIS JET (JAYA EXCECUTIVE TRANSPORT)',
                'account_number' => 'QRIS-LKT-001',
                'account_holder' => 'PT JET (JAYA EXCECUTIVE TRANSPORT)',
                'qr_content' => 'QRIS-LKT-001|PT JET (JAYA EXCECUTIVE TRANSPORT)|PEMBAYARAN-REGULER',
                'notes' => 'Gunakan QRIS resmi perusahaan untuk menyelesaikan pembayaran digital.',
                'is_active' => true,
                'sort_order' => 40,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('payment_accounts');
    }
};
