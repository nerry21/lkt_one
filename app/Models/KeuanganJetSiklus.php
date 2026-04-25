<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Parent record per round-trip cycle.
 *
 * 1 siklus = 1 mobil 1 round-trip (bisa span multi-day).
 *
 * Status lifecycle:
 *   berjalan → complete → locked
 *
 * Bagi hasil 30/70 computed saat status_siklus = 'complete'.
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon $tanggal_mulai
 * @property \Illuminate\Support\Carbon|null $tanggal_selesai
 * @property string $mobil_id  UUID
 * @property string $mobil_code  e.g. "JET 01"
 * @property string|null $driver_id_planned  UUID (read-only dari Trip Planning)
 * @property string $driver_id_actual  UUID (override-able)
 * @property string $driver_name_actual
 * @property bool $is_driver_overridden
 * @property string $uang_jalan  decimal cast
 * @property string $biaya_kurir
 * @property string $biaya_cuci_mobil
 * @property string $total_revenue_kbg
 * @property string $total_revenue_kpl
 * @property string $total_uang_admin_kbg
 * @property string $total_uang_admin_kpl
 * @property string $total_pendapatan_kotor
 * @property string $total_admin_potong
 * @property string $total_operasional
 * @property string $total_pendapatan_bersih
 * @property string $uang_driver  30%
 * @property string $uang_mobil  70%
 * @property 'berjalan'|'complete'|'locked' $status_siklus
 * @property \Illuminate\Support\Carbon|null $completed_at
 * @property string|null $completed_by  UUID
 * @property 'regular_return'|'same_day_return'|'manual'|null $completed_via
 * @property 'belum'|'sudah' $driver_paid_status
 * @property \Illuminate\Support\Carbon|null $driver_paid_at
 * @property string|null $driver_paid_by
 * @property \Illuminate\Support\Carbon|null $last_refreshed_at
 * @property string|null $created_by
 * @property string|null $updated_by
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property-read Mobil $mobil
 * @property-read Driver|null $driverPlanned
 * @property-read Driver $driverActual
 * @property-read User|null $completedBy
 * @property-read User|null $driverPaidBy
 * @property-read \Illuminate\Database\Eloquent\Collection<int, KeuanganJet> $keuanganJets
 */
class KeuanganJetSiklus extends Model
{
    use HasFactory;

    protected $table = 'keuangan_jet_siklus';

    protected $fillable = [
        'tanggal_mulai',
        'tanggal_selesai',
        'mobil_id',
        'mobil_code',
        'driver_id_planned',
        'driver_id_actual',
        'driver_name_actual',
        'is_driver_overridden',
        'uang_jalan',
        'biaya_kurir',
        'biaya_cuci_mobil',
        'total_revenue_kbg',
        'total_revenue_kpl',
        'total_uang_admin_kbg',
        'total_uang_admin_kpl',
        'total_pendapatan_kotor',
        'total_admin_potong',
        'total_operasional',
        'total_pendapatan_bersih',
        'uang_driver',
        'uang_mobil',
        'status_siklus',
        'completed_at',
        'completed_by',
        'completed_via',
        'driver_paid_status',
        'driver_paid_at',
        'driver_paid_by',
        'last_refreshed_at',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'tanggal_mulai' => 'date',
        'tanggal_selesai' => 'date',
        'is_driver_overridden' => 'boolean',
        'uang_jalan' => 'decimal:2',
        'biaya_kurir' => 'decimal:2',
        'biaya_cuci_mobil' => 'decimal:2',
        'total_revenue_kbg' => 'decimal:2',
        'total_revenue_kpl' => 'decimal:2',
        'total_uang_admin_kbg' => 'decimal:2',
        'total_uang_admin_kpl' => 'decimal:2',
        'total_pendapatan_kotor' => 'decimal:2',
        'total_admin_potong' => 'decimal:2',
        'total_operasional' => 'decimal:2',
        'total_pendapatan_bersih' => 'decimal:2',
        'uang_driver' => 'decimal:2',
        'uang_mobil' => 'decimal:2',
        'completed_at' => 'datetime',
        'driver_paid_at' => 'datetime',
        'last_refreshed_at' => 'datetime',
    ];

    public function mobil(): BelongsTo
    {
        return $this->belongsTo(Mobil::class, 'mobil_id');
    }

    public function driverPlanned(): BelongsTo
    {
        return $this->belongsTo(Driver::class, 'driver_id_planned');
    }

    public function driverActual(): BelongsTo
    {
        return $this->belongsTo(Driver::class, 'driver_id_actual');
    }

    public function completedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'completed_by');
    }

    public function driverPaidBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'driver_paid_by');
    }

    public function keuanganJets(): HasMany
    {
        return $this->hasMany(KeuanganJet::class, 'keuangan_jet_siklus_id');
    }

    public function scopeBerjalan($query)
    {
        return $query->where('status_siklus', 'berjalan');
    }

    public function scopeForMobil($query, string $mobilId)
    {
        return $query->where('mobil_id', $mobilId);
    }

    public function scopeActiveForMobil($query, string $mobilId)
    {
        return $query->where('mobil_id', $mobilId)
            ->where('status_siklus', 'berjalan');
    }
}
