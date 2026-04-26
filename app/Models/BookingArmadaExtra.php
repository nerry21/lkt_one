<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookingArmadaExtra extends Model
{
    protected $table = 'booking_armada_extras';

    protected $fillable = [
        'trip_date',
        'trip_time',
        'direction',
        'route_via',
        'max_armada_index',
    ];

    protected $casts = [
        'trip_date' => 'date',
        'max_armada_index' => 'integer',
    ];
}
