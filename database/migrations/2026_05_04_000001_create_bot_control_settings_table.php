<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Sesi 78 PR-CRM-6L — Bot control settings (kill switch + whitelist mode).
 *
 * Tabel key-value sederhana untuk simpan state kontrol bot WhatsApp.
 * Default state setelah migrate: bot_mode='off' (matikan total) — Pak Nerry
 * akan flip manual ke 'whitelist' lewat tombol dashboard saat cutover live.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bot_control_settings', function (Blueprint $table): void {
            $table->id();
            $table->string('key', 64)->unique()->index();
            $table->string('value', 1024)->nullable();
            $table->json('meta')->nullable();
            $table->string('updated_by_phone', 32)->nullable();
            $table->timestamps();
        });

        DB::table('bot_control_settings')->insert([
            [
                'key' => 'bot_mode',
                'value' => 'off',
                'meta' => json_encode(['allowed_modes' => ['off', 'whitelist', 'live_public']]),
                'updated_by_phone' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'whitelist_phones',
                'value' => '628117598804,6281267975175,6282364210642',
                'meta' => json_encode(['note' => 'Active during whitelist mode only']),
                'updated_by_phone' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('bot_control_settings');
    }
};
