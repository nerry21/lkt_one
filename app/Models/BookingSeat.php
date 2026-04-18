<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Representasi 1 kursi yang di-lock oleh 1 booking pada 1 slot trip.
 *
 * Konvensi armada_index adalah 1-indexed:
 *   - armada utama = 1
 *   - armada tambahan = 2, 3, ... (via BookingArmadaExtra)
 * Default `1` konsisten dengan bookings.armada_index (verified via DESCRIBE 2026-04-17).
 *
 * Kolom `active_slot_key` adalah PERSISTENT generated column di DB — read-only dari sisi
 * aplikasi. Jangan assign manual (tidak di fillable). Expression:
 *   CASE WHEN lock_released_at IS NULL
 *        THEN CONCAT_WS('|', trip_date, trip_time, from_city, to_city, armada_index, seat_number)
 *        ELSE NULL END
 * Ini yang enforce UNIQUE constraint untuk locking mechanism — duplicate aktif = SQLSTATE 23000.
 *
 * Referensi: docs/audit-findings.md bug #2 (race condition) dan #5 (validasi availability).
 *
 * @property int $id
 * @property int $booking_id
 * @property \Illuminate\Support\Carbon $trip_date
 * @property string $trip_time       Format HH:MM:SS
 * @property string $from_city
 * @property string $to_city
 * @property int $armada_index       1-indexed (1=utama, 2+=tambahan)
 * @property string $seat_number     e.g. '1A', '2B'
 * @property 'soft'|'hard' $lock_type
 * @property \Illuminate\Support\Carbon|null $lock_released_at
 * @property string|null $lock_released_by  UUID
 * @property string|null $lock_release_reason
 * @property-read string|null $active_slot_key Generated column — read-only
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property-read Booking $booking
 * @property-read User|null $releasedBy
 */
class BookingSeat extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'trip_date',
        'trip_time',
        'from_city',
        'to_city',
        'armada_index',
        'seat_number',
        'lock_type',
        'lock_released_at',
        'lock_released_by',
        'lock_release_reason',
    ];

    protected function casts(): array
    {
        return [
            'trip_date' => 'date',
            'trip_time' => 'string',
            'armada_index' => 'integer',
            'lock_released_at' => 'datetime',
        ];
    }

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    public function releasedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'lock_released_by');
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->whereNull('lock_released_at');
    }

    public function scopeReleased(Builder $query): Builder
    {
        return $query->whereNotNull('lock_released_at');
    }

    public function scopeSoftLocks(Builder $query): Builder
    {
        return $query->where('lock_type', 'soft');
    }

    public function scopeHardLocks(Builder $query): Builder
    {
        return $query->where('lock_type', 'hard');
    }
}
