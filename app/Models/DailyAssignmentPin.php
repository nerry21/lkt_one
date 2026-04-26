<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Pin trip_time + direction manual untuk daily_driver_assignment (Phase E4 DP-7).
 *
 * Tabel terpisah dari daily_driver_assignments: 0-2 row per assignment (max 1
 * pin per direction). Presence of row = pinned, absence = scheduler bebas pilih.
 */
class DailyAssignmentPin extends Model
{
    use HasFactory;

    protected $fillable = [
        'daily_driver_assignment_id',
        'direction',
        'trip_time',
        'loket_origin',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'trip_time' => 'string',
        'loket_origin' => 'string',
    ];

    public function assignment(): BelongsTo
    {
        return $this->belongsTo(DailyDriverAssignment::class, 'daily_driver_assignment_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
