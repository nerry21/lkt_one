<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Representasi 1 slot trip (keberangkatan aktual) atau 1 entry pool (waiting list).
 *
 * PK bigint auto-increment (TIDAK pakai HasUuids) — trips adalah sumber data
 * operasional harian dengan volume tinggi dan urutan yang penting; bigint lebih
 * hemat index + natural untuk sequencing.
 *
 * Kolom `version` TIDAK di $fillable — mutasi hanya lewat atomic check-and-set
 * di TripService::updateWithVersionCheck() (pattern Bug #30, lihat Booking model).
 *
 * Referensi desain: docs/trip-planning-design.md §3.2 (schema),
 *                   docs/trip-planning-design.md §3.4 (invariants).
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon $trip_date
 * @property string|null $trip_time            HH:MM:SS — NULL = waiting list
 * @property 'PKB_TO_ROHUL'|'ROHUL_TO_PKB' $direction
 * @property int $sequence
 * @property string $mobil_id                  UUID
 * @property string $driver_id                 UUID
 * @property 'scheduled'|'berangkat'|'tidak_berangkat'|'keluar_trip'|'tidak_keluar_trip'|'ganti_jam' $status
 * @property 'dropping'|'rental'|'other'|null $keluar_trip_reason
 * @property string|null $keluar_trip_note
 * @property 'out'|'waiting_list'|'returning'|null $keluar_trip_substatus
 * @property 'PKB'|'ROHUL'|null $keluar_trip_pool_target
 * @property \Illuminate\Support\Carbon|null $keluar_trip_start_date
 * @property \Illuminate\Support\Carbon|null $keluar_trip_planned_end_date
 * @property \Illuminate\Support\Carbon|null $keluar_trip_actual_end_date
 * @property \Illuminate\Support\Carbon|null $keluar_trip_pool_entered_at
 * @property string|null $original_trip_time
 * @property bool $same_day_return
 * @property string|null $same_day_return_reason
 * @property int|null $same_day_return_origin_trip_id
 * @property int $version
 * @property string|null $created_by           UUID
 * @property string|null $updated_by           UUID
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property-read Mobil $mobil
 * @property-read Driver $driver
 * @property-read User|null $creator
 * @property-read User|null $updater
 */
class Trip extends Model
{
    use HasFactory;

    protected $table = 'trips';

    protected $fillable = [
        'trip_date',
        'trip_time',
        'direction',
        'sequence',
        'mobil_id',
        'driver_id',
        'status',
        'keluar_trip_reason',
        'keluar_trip_note',
        'keluar_trip_substatus',
        'keluar_trip_pool_target',
        'keluar_trip_start_date',
        'keluar_trip_planned_end_date',
        'keluar_trip_actual_end_date',
        'keluar_trip_pool_entered_at',
        'original_trip_time',
        'same_day_return',
        'same_day_return_reason',
        'same_day_return_origin_trip_id',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'trip_date'                    => 'date',
        'keluar_trip_start_date'       => 'date',
        'keluar_trip_planned_end_date' => 'date',
        'keluar_trip_actual_end_date'  => 'date',
        'keluar_trip_pool_entered_at'  => 'datetime',
        'sequence'                     => 'integer',
        'version'                      => 'integer',
        'same_day_return'                  => 'boolean',
        'same_day_return_origin_trip_id'   => 'integer',
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

    /**
     * Trip ROHUL→PKB asal untuk trip PKB→ROHUL same-day return.
     * Null kalau trip ini BUKAN same-day return (regular generated trip).
     */
    public function originTrip(): BelongsTo
    {
        return $this->belongsTo(Trip::class, 'same_day_return_origin_trip_id');
    }

    /**
     * Trip dengan status final (sudah dieksekusi atau dibatalkan).
     * Tidak termasuk 'scheduled' (belum final) dan 'ganti_jam' (status intermediate).
     */
    public function scopeWithFinalStatus($query)
    {
        return $query->whereIn('status', [
            'berangkat',
            'tidak_berangkat',
            'tidak_keluar_trip',
            'keluar_trip',
        ]);
    }

    /** Trip yang masih scheduled (baseline, belum dieksekusi). */
    public function scopeScheduled($query)
    {
        return $query->where('status', 'scheduled');
    }

    /** True kalau row ini entry pool / waiting list (belum dapat slot jam). */
    public function isWaitingList(): bool
    {
        return $this->trip_time === null;
    }

    /** True kalau trip sedang dalam mode keluar trip (dropping/rental/other). */
    public function isKeluarTrip(): bool
    {
        return $this->status === 'keluar_trip';
    }
}
