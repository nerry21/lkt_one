<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Daily driver-to-mobil assignment untuk trip scheduler (Sesi 24).
 *
 * Admin input target date (besok atau hari ini untuk retry), pasangkan setiap
 * mobil aktif dengan driver yang akan operate. Scheduler 21:00 WIB baca tabel
 * ini untuk `date = besok` lalu pass ke TripGenerationService.
 *
 * Lihat design doc §6 (Fase D) + diskusi discovery Sesi 20.
 */
class DailyDriverAssignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'mobil_id',
        'driver_id',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function mobil(): BelongsTo
    {
        return $this->belongsTo(Mobil::class);
    }

    public function driver(): BelongsTo
    {
        return $this->belongsTo(Driver::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function pins(): HasMany
    {
        return $this->hasMany(DailyAssignmentPin::class, 'daily_driver_assignment_id');
    }
}
