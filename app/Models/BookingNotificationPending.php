<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Sesi 50 PR #3 — record event notifikasi pending untuk penumpang.
 *
 * Lifecycle:
 *   1. Service operational (TripRotationService::gantiJam, TripCrudService::editManual,
 *      BookingTripReverseSyncService) record event → row baru status='pending'.
 *   2. Admin Zizi buka UI list (PR berikutnya), telepon penumpang manual, klik
 *      "Mark Sent" → status='sent_manual', notified_at + notified_by terisi.
 *   3. Saat Chatbot AI WA ready, queue dispatcher pickup row pending → kirim WA
 *      otomatis (di luar scope PR #3).
 *
 * @property int $id
 * @property int $booking_id
 * @property int|null $trip_id
 * @property string $event_type
 * @property string|null $old_value
 * @property string|null $new_value
 * @property string|null $passenger_name
 * @property string|null $passenger_phone
 * @property string $notification_status
 * @property \Illuminate\Support\Carbon|null $notified_at
 * @property string|null $notified_by
 * @property string|null $notification_message
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 */
class BookingNotificationPending extends Model
{
    protected $table = 'booking_notifications_pending';

    protected $fillable = [
        'booking_id',
        'trip_id',
        'event_type',
        'old_value',
        'new_value',
        'passenger_name',
        'passenger_phone',
        'notification_status',
        'notified_at',
        'notified_by',
        'notification_message',
    ];

    protected $casts = [
        'notified_at' => 'datetime',
    ];

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    public function trip(): BelongsTo
    {
        return $this->belongsTo(Trip::class);
    }

    public function notifiedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'notified_by');
    }
}
