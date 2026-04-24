<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Audit snapshot booking row sebelum delete (bug #42).
 *
 * Capture version + full row JSON + passengers JSON saat DELETE dipanggil
 * (integrasi Sesi B). Tujuan: forensic "apa version terakhir booking X saat
 * dihapus?" + potential restore manual via raw SQL (NO Artisan command per
 * design decision Sesi 36).
 *
 * Soft reference ke booking (booking_id index, no FK): booking row sudah
 * dihapus saat backup dibuat. Integrity dijaga application-level via snapshot
 * kolom denormalisasi (booking_code, final_version).
 *
 * Konsumsi: SQL query manual. Contoh forensic query:
 *   SELECT booking_code, final_version, snapshot, deleted_at
 *   FROM booking_level_backups
 *   WHERE booking_code = 'DBK-260418-XXXX';
 *
 * Contoh restore manual (copy-paste, sesuaikan ID):
 *   INSERT INTO bookings (booking_code, passenger_name, ...)
 *   SELECT JSON_EXTRACT(snapshot, '$.booking_code'), ...
 *   FROM booking_level_backups WHERE id = <backup_id>;
 *
 * @see docs/audit-findings.md bug #42
 */
class BookingLevelBackup extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'booking_code',
        'final_version',
        'snapshot',
        'passengers_snapshot',
        'deleted_by',
        'deleted_at',
        'reason',
    ];

    protected $casts = [
        'booking_id' => 'integer',
        'final_version' => 'integer',
        'snapshot' => 'array',
        'passengers_snapshot' => 'array',
        'deleted_at' => 'datetime',
    ];

    public function deletedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'deleted_by');
    }
}
