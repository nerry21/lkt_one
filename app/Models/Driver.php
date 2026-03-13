<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Driver extends Model
{
    use HasFactory;
    use HasUuids;

    public const UPDATED_AT = null;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'nama',
        'lokasi',
        'phone',
        'license_number',
        'status',
        'created_at',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'immutable_datetime',
        ];
    }

    public function keberangkatan(): HasMany
    {
        return $this->hasMany(Keberangkatan::class, 'driver_id', 'id');
    }

    public function departures(): HasMany
    {
        return $this->hasMany(Departure::class, 'driver_id', 'id');
    }

    public function getNameAttribute(): string
    {
        return $this->nama;
    }
}
