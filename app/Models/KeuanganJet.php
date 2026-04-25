<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Child record per trip 1 arah.
 *
 * 1 row = 1 trip 1 direction (Keberangkatan ATAU Kepulangan).
 *
 * Direction mapping (Trip → KeuanganJet):
 *   Trip.direction = 'ROHUL_TO_PKB' → direction = 'Keberangkatan'
 *   Trip.direction = 'PKB_TO_ROHUL' → direction = 'Kepulangan'
 *
 * Formula (computed on Refresh):
 *   basis_admin = total_ongkos_penumpang + total_ongkos_paket  (snack TIDAK ikut)
 *   trigger_admin = (penumpang>=420k OR paket>=420k OR basis>=420k)
 *   uang_admin = trigger_admin ? basis_admin * persen_admin/100 : 0
 *   total_pendapatan_arah = basis_admin + uang_snack
 *
 * @property int $id
 * @property int $keuangan_jet_siklus_id
 * @property int|null $trip_id
 * @property \Illuminate\Support\Carbon $trip_date
 * @property string $mobil_id  UUID
 * @property string $mobil_code
 * @property 'Keberangkatan'|'Kepulangan' $direction
 * @property int $trip_ke
 * @property string $jam  HH:MM:SS
 * @property string $trip_status  snapshot Trip.status
 * @property 'Reguler'|'Dropping'|'Rental' $jenis_layanan
 * @property bool $is_jenis_overridden
 * @property 'loket'|'driver'|null $sumber_rental
 * @property int $jumlah_penumpang
 * @property string $total_ongkos_penumpang  decimal cast
 * @property int $jumlah_paket
 * @property string $total_ongkos_paket
 * @property string $uang_snack
 * @property int $persen_admin  10 atau 15
 * @property bool $is_persen_overridden
 * @property string $basis_admin
 * @property bool $trigger_admin
 * @property string $uang_admin
 * @property string $total_pendapatan_arah
 * @property 'belum'|'sudah' $admin_paid_status
 * @property \Illuminate\Support\Carbon|null $admin_paid_at
 * @property string|null $admin_paid_by
 * @property \Illuminate\Support\Carbon|null $last_refreshed_at
 * @property string|null $created_by
 * @property string|null $updated_by
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property-read KeuanganJetSiklus $siklus
 * @property-read Trip|null $trip
 * @property-read Mobil $mobil
 * @property-read User|null $adminPaidBy
 */
class KeuanganJet extends Model
{
    use HasFactory;

    protected $table = 'keuangan_jet';

    protected $fillable = [
        'keuangan_jet_siklus_id',
        'trip_id',
        'trip_date',
        'mobil_id',
        'mobil_code',
        'direction',
        'trip_ke',
        'jam',
        'trip_status',
        'jenis_layanan',
        'is_jenis_overridden',
        'sumber_rental',
        'jumlah_penumpang',
        'total_ongkos_penumpang',
        'jumlah_paket',
        'total_ongkos_paket',
        'uang_snack',
        'persen_admin',
        'is_persen_overridden',
        'basis_admin',
        'trigger_admin',
        'uang_admin',
        'total_pendapatan_arah',
        'admin_paid_status',
        'admin_paid_at',
        'admin_paid_by',
        'last_refreshed_at',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'trip_date' => 'date',
        'is_jenis_overridden' => 'boolean',
        'total_ongkos_penumpang' => 'decimal:2',
        'total_ongkos_paket' => 'decimal:2',
        'uang_snack' => 'decimal:2',
        'is_persen_overridden' => 'boolean',
        'basis_admin' => 'decimal:2',
        'trigger_admin' => 'boolean',
        'uang_admin' => 'decimal:2',
        'total_pendapatan_arah' => 'decimal:2',
        'admin_paid_at' => 'datetime',
        'last_refreshed_at' => 'datetime',
    ];

    public function siklus(): BelongsTo
    {
        return $this->belongsTo(KeuanganJetSiklus::class, 'keuangan_jet_siklus_id');
    }

    public function trip(): BelongsTo
    {
        return $this->belongsTo(Trip::class, 'trip_id');
    }

    public function mobil(): BelongsTo
    {
        return $this->belongsTo(Mobil::class, 'mobil_id');
    }

    public function adminPaidBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'admin_paid_by');
    }
}
