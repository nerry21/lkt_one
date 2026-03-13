<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Departure extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'departure_code',
        'surat_jalan_number',
        'surat_jalan_issued_at',
        'trip_date',
        'trip_time',
        'from_city',
        'to_city',
        'route_label',
        'driver_id',
        'mobil_id',
        'status',
        'notes',
    ];

    protected $casts = [
        'trip_date' => 'date',
        'surat_jalan_issued_at' => 'datetime',
    ];

    public function driver(): BelongsTo
    {
        return $this->belongsTo(Driver::class);
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Mobil::class, 'mobil_id');
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    public function passengers(): HasManyThrough
    {
        return $this->hasManyThrough(
            BookingPassenger::class,
            Booking::class,
            'departure_id',
            'booking_id',
            'id',
            'id',
        );
    }
}
