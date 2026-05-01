<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Sesi 68 PR-CRM-6E — Booking source tracking table.
 *
 * Tabel terpisah untuk track asal-usul booking (manual/chatbot/wa_legacy)
 * dengan metadata extra (event_uuid dari webhook, dll). Pendekatan tabel
 * terpisah dipilih agar tabel `bookings` tetap rapi dan audit trail kaya.
 *
 * Backfill: semua booking existing auto-tag 'manual'.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('booking_sources', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('booking_id')
                ->unique()
                ->constrained('bookings')
                ->cascadeOnDelete()
                ->comment('1-to-1 dengan booking. Cascade delete kalau booking dihapus.');

            $table->enum('source', ['manual', 'chatbot', 'wa_legacy'])
                ->default('manual')
                ->comment('Asal-usul booking. manual=admin web, chatbot=bot WA, wa_legacy=WA manual mode lama.');

            $table->string('source_event_id', 64)
                ->nullable()
                ->comment('UUID/event ID untuk traceback (mis. event_uuid dari webhook chatbot).');

            $table->string('source_channel', 32)
                ->nullable()
                ->comment('Channel detail (mis. whatsapp, web_form, mobile_app).');

            $table->json('source_meta')
                ->nullable()
                ->comment('Metadata bebas (conversation_id, agent_id, dll).');

            $table->timestamps();

            $table->index('source');
            $table->index('source_event_id');
        });

        DB::statement("
            INSERT INTO booking_sources (booking_id, source, created_at, updated_at)
            SELECT id, 'manual', NOW(), NOW() FROM bookings
            WHERE id NOT IN (SELECT booking_id FROM booking_sources)
        ");
    }

    public function down(): void
    {
        Schema::dropIfExists('booking_sources');
    }
};
