<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Audit log untuk operasi reset Trip Planning data.
 *
 * Setiap klik tombol "Reset Hari Ini" atau "Reset Semua" mencatat 1 row
 * dengan summary count + (kalau scope=all) JSON snapshot data sebelum
 * dihapus untuk fallback restore manual via DBA.
 *
 * @property string $scope                'today'|'all'
 * @property \Illuminate\Support\Carbon|null $target_date  NULL kalau scope=all
 * @property string $user_id              UUID
 * @property array|null $snapshot         JSON dump (scope=all only)
 * @property array $summary               Counts per tabel
 */
class TripDataResetLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'scope',
        'target_date',
        'user_id',
        'snapshot',
        'summary',
    ];

    protected $casts = [
        'target_date' => 'date',
        'snapshot' => 'array',
        'summary' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
