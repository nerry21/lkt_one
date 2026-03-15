<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Stock extends Model
{
    use HasFactory;
    use HasUuids;

    public const UPDATED_AT = null;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $table = 'stock';

    protected $fillable = [
        'tanggal',
        'hari',
        'bulan',
        'tahun',
        'total_stock_snack',
        'total_stock_air_mineral',
        'terpakai_snack',
        'pengembalian_snack',
        'terpakai_air_mineral',
        'sisa_stock_snack',
        'sisa_stock_air_mineral',
        'nilai_total',
        'sisa_nilai_total',
        'keterangan',
        'created_at',
    ];

    protected function casts(): array
    {
        return [
            'total_stock_snack' => 'integer',
            'total_stock_air_mineral' => 'integer',
            'terpakai_snack' => 'integer',
            'pengembalian_snack' => 'integer',
            'terpakai_air_mineral' => 'integer',
            'sisa_stock_snack' => 'integer',
            'sisa_stock_air_mineral' => 'integer',
            'nilai_total' => 'integer',
            'sisa_nilai_total' => 'integer',
            'created_at' => 'immutable_datetime',
        ];
    }

    public function keberangkatan(): HasMany
    {
        return $this->hasMany(Keberangkatan::class, 'tanggal', 'tanggal');
    }
}
