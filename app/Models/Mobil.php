<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Mobil extends Model
{
    use HasFactory;
    use HasUuids;

    public const UPDATED_AT = null;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $table = 'mobil';

    protected $fillable = [
        'kode_mobil',
        'jenis_mobil',
        'home_pool',
        'is_active_in_trip',
        'brand',
        'model',
        'seat_capacity',
        'status',
        'created_at',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'immutable_datetime',
            'is_active_in_trip' => 'boolean',
        ];
    }

    public function keberangkatan(): HasMany
    {
        return $this->hasMany(Keberangkatan::class, 'kode_mobil', 'kode_mobil');
    }

    public function departures(): HasMany
    {
        return $this->hasMany(Departure::class, 'mobil_id', 'id');
    }

    public function trips(): HasMany
    {
        return $this->hasMany(Trip::class, 'mobil_id', 'id');
    }

    public function getPlateNumberAttribute(): string
    {
        return $this->kode_mobil;
    }

    public function getFullNameAttribute(): string
    {
        $name = trim(implode(' ', array_filter([
            $this->brand,
            $this->model,
        ])));

        return $name !== '' ? $name : (string) $this->jenis_mobil;
    }
}
