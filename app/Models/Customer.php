<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Model Customer — Identitas pelanggan yang stabil.
 *
 * Identifier utama: phone_normalized (E.164: 628xxx)
 * Kode publik: customer_code (CUST-000001) — digenerate via booted() created event
 *
 * @property int         $id
 * @property string|null $customer_code        Format CUST-000001
 * @property string      $display_name         Nama tampilan terbaik
 * @property string|null $phone_normalized     Format E.164 (628xxx)
 * @property string|null $phone_original       Format asli saat input
 * @property string|null $email
 * @property string      $identity_confidence  high|medium|low
 * @property string      $status               active|merged|inactive
 * @property int         $total_trip_count
 * @property int         $lifetime_scan_count
 * @property bool        $discount_eligible
 * @property string|null $notes
 * @property int|null    $merged_into_id
 * @property string|null $merged_by            UUID referensi users.id
 */
class Customer extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'customer_code',
        'display_name',
        'phone_normalized',
        'phone_original',
        'email',
        'identity_confidence',
        'status',
        'total_trip_count',
        'lifetime_scan_count',
        'discount_eligible',
        'notes',
        'merged_into_id',
        'merged_at',
        'merged_by',
    ];

    protected $casts = [
        'total_trip_count'    => 'integer',
        'lifetime_scan_count' => 'integer',
        'discount_eligible'   => 'boolean',
        'merged_at'           => 'datetime',
        'deleted_at'          => 'datetime',
    ];

    // =========================================================================
    // Booted — Generate customer_code otomatis setelah INSERT
    // =========================================================================

    protected static function booted(): void
    {
        /**
         * Setelah INSERT, set customer_code menggunakan ID yang sudah ada.
         * Format: CUST-000001 (zero-padded 6 digit minimum)
         *
         * Mengapa aman dari race condition:
         * - ID sudah di-assign oleh DB engine sebelum event ini dipanggil
         * - Setiap ID unik → setiap customer_code unik
         * - saveQuietly() tidak memicu event booted lagi (mencegah loop)
         */
        static::created(function (Customer $customer): void {
            if (blank($customer->customer_code)) {
                $customer->customer_code = 'CUST-' . str_pad((string) $customer->id, 6, '0', STR_PAD_LEFT);
                $customer->saveQuietly();
            }
        });
    }

    // =========================================================================
    // Relations
    // =========================================================================

    /** Semua alias nama pelanggan ini */
    public function aliases(): HasMany
    {
        return $this->hasMany(CustomerAlias::class);
    }

    /** Semua booking yang terhubung ke pelanggan ini */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /** Semua booking_passengers yang terhubung ke pelanggan ini */
    public function passengerRecords(): HasMany
    {
        return $this->hasMany(BookingPassenger::class);
    }

    /** Semua backup tiket pelanggan ini (lintas booking) */
    public function ticketBackups(): HasMany
    {
        return $this->hasMany(TicketBackup::class);
    }

    /** Customer tujuan jika customer ini sudah di-merge */
    public function mergedInto(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'merged_into_id');
    }

    /** Daftar customer yang di-merge ke dalam customer ini */
    public function mergedFrom(): HasMany
    {
        return $this->hasMany(Customer::class, 'merged_into_id');
    }

    /** Admin yang melakukan merge */
    public function mergedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'merged_by');
    }

    /** Riwayat operasi merge yang melibatkan customer ini sebagai source */
    public function mergesAsSource(): HasMany
    {
        return $this->hasMany(CustomerMerge::class, 'source_customer_id');
    }

    /** Riwayat operasi merge yang melibatkan customer ini sebagai target */
    public function mergesAsTarget(): HasMany
    {
        return $this->hasMany(CustomerMerge::class, 'target_customer_id');
    }

    // =========================================================================
    // Scopes
    // =========================================================================

    /** Hanya customer aktif */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', 'active');
    }

    /** Hanya customer yang belum di-merge */
    public function scopeNotMerged(Builder $query): Builder
    {
        return $query->whereNull('merged_into_id')->where('status', '!=', 'merged');
    }

    /** Customer dengan HP yang diketahui */
    public function scopeWithPhone(Builder $query): Builder
    {
        return $query->whereNotNull('phone_normalized');
    }

    /** Search berdasarkan nama atau HP */
    public function scopeSearch(Builder $query, string $term): Builder
    {
        $normalized = mb_strtolower(trim($term));

        return $query->where(function (Builder $q) use ($term, $normalized): void {
            $q->where('display_name', 'like', "%{$term}%")
              ->orWhere('phone_normalized', 'like', "%{$term}%")
              ->orWhere('phone_original', 'like', "%{$term}%")
              ->orWhere('customer_code', 'like', "%{$term}%")
              ->orWhere('email', 'like', "%{$term}%")
              ->orWhereHas('aliases', function (Builder $aliasQ) use ($normalized): void {
                  $aliasQ->where('alias_name_normalized', 'like', "%{$normalized}%");
              });
        });
    }

    // =========================================================================
    // Helpers
    // =========================================================================

    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    public function isMerged(): bool
    {
        return $this->status === 'merged' || $this->merged_into_id !== null;
    }

    public function isInactive(): bool
    {
        return $this->status === 'inactive';
    }

    /**
     * Resolve ke customer canonical — ikuti rantai merge jika ada.
     * Mencegah infinite loop dengan max depth.
     */
    public function canonical(int $maxDepth = 10): static
    {
        $current = $this;
        $depth   = 0;

        while ($current->isMerged() && $current->merged_into_id !== null && $depth < $maxDepth) {
            $next = $current->mergedInto()->withTrashed()->first();

            if ($next === null || $next->id === $current->id) {
                break;
            }

            $current = $next;
            $depth++;
        }

        return $current;
    }

    /**
     * Semua nama yang dikenal untuk pelanggan ini (display_name + alias).
     *
     * @return string[]
     */
    public function allKnownNames(): array
    {
        $this->loadMissing('aliases');

        $aliasNames = $this->aliases->pluck('alias_name')->toArray();

        return array_values(array_unique(array_merge([$this->display_name], $aliasNames)));
    }

    /**
     * Hitung ulang total_trip_count dari booking aktif dan simpan.
     * Hanya hitung booking yang bukan Draft/Batal/Cancelled.
     *
     * @return int  Jumlah trip yang dihitung
     */
    public function recalculateTripCount(): int
    {
        $count = $this->bookings()
            ->whereNotIn('booking_status', ['Draft', 'Batal', 'Cancelled'])
            ->count();

        $this->total_trip_count  = $count;
        $this->discount_eligible = $count >= 5;
        $this->saveQuietly();

        return $count;
    }

    /**
     * Format customer_code atau fallback ke ID jika belum terset.
     */
    public function getCodeLabelAttribute(): string
    {
        return $this->customer_code ?? ('CUST-' . str_pad((string) $this->id, 6, '0', STR_PAD_LEFT));
    }

    /**
     * Label ringkas untuk keperluan dropdown/display:
     * "Budi Santoso (CUST-000001 | 628123456789)"
     */
    public function getDisplayLabelAttribute(): string
    {
        $parts = [$this->display_name, '(' . $this->code_label];

        if ($this->phone_normalized) {
            $parts[] = '| ' . $this->phone_normalized . ')';
        } else {
            $parts[] = ')';
        }

        return implode(' ', $parts);
    }
}
