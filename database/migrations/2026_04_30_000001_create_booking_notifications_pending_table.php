<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Sesi 50 PR #3 — pondasi notifikasi WhatsApp.
 *
 * Tabel record event saat operasional admin mengubah trip yang affect penumpang
 * (gantiJam, edit mobil/driver, mark trip dibatalkan). Belum kirim otomatis ke
 * WhatsApp Chatbot AI — admin Zizi telpon manual via UI list di PR berikutnya.
 *
 * Saat Chatbot AI ready, queue dispatcher tinggal pickup row dengan
 * notification_status='pending' lalu mark 'sent_manual' atau 'skipped'.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('booking_notifications_pending', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->foreignId('booking_id')
                ->constrained('bookings')
                ->cascadeOnDelete();

            // Snapshot trip_id saat event — audit trail tetap walau Booking unlink.
            $table->unsignedBigInteger('trip_id')->nullable();

            $table->string('event_type', 40)
                ->comment('trip_time_changed | mobil_changed | driver_changed | trip_canceled');

            $table->string('old_value', 255)->nullable()
                ->comment('Snapshot before — trip_time HH:MM:SS, mobil_id UUID, driver_id UUID');
            $table->string('new_value', 255)->nullable()
                ->comment('Snapshot after — NULL kalau trip_canceled');

            // Snapshot identitas penumpang saat event (hindari stale kalau Booking edit).
            $table->string('passenger_name', 150)->nullable();
            $table->string('passenger_phone', 30)->nullable()
                ->comment('Prioritas: customer.phone_normalized → fallback Booking.passenger_phone');

            $table->string('notification_status', 20)->default('pending')
                ->comment('pending | sent_manual | skipped');
            $table->timestamp('notified_at')->nullable();
            $table->uuid('notified_by')->nullable();

            $table->text('notification_message')->nullable()
                ->comment('Compiled message preview untuk admin saat telpon manual');

            $table->timestamps();

            $table->index(['notification_status', 'created_at'], 'idx_booking_notif_pending_status_created');

            $table->foreign('notified_by')
                ->references('id')->on('users')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('booking_notifications_pending');
    }
};
