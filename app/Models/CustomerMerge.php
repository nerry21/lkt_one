<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Model CustomerMerge — Audit trail operasi merge pelanggan duplikat.
 *
 * Setiap operasi merge menghasilkan satu record di sini.
 * Record ini bersifat permanen — tidak dihapus, hanya dibaca.
 *
 * source_customer dan target_customer adalah soft references (bukan FK constraint).
 * Customer source tetap ada di DB dengan status 'merged', tidak dihapus.
 *
 * @property int         $id
 * @property int         $source_customer_id    Customer yang "dihapus" identitasnya
 * @property int         $target_customer_id    Customer yang menerima semua data
 * @property string|null $reason
 * @property int         $bookings_transferred
 * @property int         $passengers_transferred
 * @property int         $aliases_transferred
 * @property string|null $merged_by              UUID referensi users.id
 * @property \Carbon\Carbon $merged_at
 * @property array|null  $metadata
 */
class CustomerMerge extends Model
{
    use HasFactory;

    protected $fillable = [
        'source_customer_id',
        'target_customer_id',
        'reason',
        'bookings_transferred',
        'passengers_transferred',
        'aliases_transferred',
        'merged_by',
        'merged_at',
        'metadata',
    ];

    protected $casts = [
        'bookings_transferred'   => 'integer',
        'passengers_transferred' => 'integer',
        'aliases_transferred'    => 'integer',
        'merged_at'              => 'datetime',
        'metadata'               => 'array',
    ];

    // =========================================================================
    // Relations
    // =========================================================================

    /**
     * Customer yang di-merge (source — statusnya 'merged' setelah operasi).
     * withTrashed() karena customer source mungkin di-soft-delete setelah merge.
     */
    public function sourceCustomer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'source_customer_id')
            ->withTrashed();
    }

    /**
     * Customer tujuan merge (target — menerima semua data).
     */
    public function targetCustomer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'target_customer_id')
            ->withTrashed();
    }

    /**
     * Admin yang melakukan operasi merge.
     */
    public function mergedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'merged_by');
    }

    // =========================================================================
    // Helpers
    // =========================================================================

    /**
     * Summary merge dalam format yang mudah dibaca.
     */
    public function getSummaryAttribute(): string
    {
        return sprintf(
            'Merge #%d: %d bookings, %d passengers, %d aliases dipindahkan pada %s',
            $this->id,
            $this->bookings_transferred,
            $this->passengers_transferred,
            $this->aliases_transferred,
            $this->merged_at->format('d/m/Y H:i'),
        );
    }
}
