<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Model CustomerAlias — Alias / variasi nama pelanggan.
 *
 * Setiap variasi nama yang pernah digunakan oleh customer disimpan di sini.
 * Digunakan untuk deteksi duplikat, pencarian fuzzy, dan audit historis.
 *
 * @property int         $id
 * @property int         $customer_id
 * @property string      $alias_name             Nama asli seperti diinput
 * @property string      $alias_name_normalized  Lowercase trimmed untuk matching
 * @property bool        $is_primary             Apakah ini nama tampilan utama
 * @property string      $source                 booking|manual|import|merge
 * @property int|null    $source_booking_id
 * @property int|null    $source_passenger_id
 */
class CustomerAlias extends Model
{
    use HasFactory;

    /**
     * Nama tabel eksplisit.
     * File migration membuat tabel 'customer_aliases'.
     */
    protected $table = 'customer_aliases';

    protected $fillable = [
        'customer_id',
        'alias_name',
        'alias_name_normalized',
        'is_primary',
        'source',
        'source_booking_id',
        'source_passenger_id',
    ];

    protected $casts = [
        'is_primary'          => 'boolean',
        'source_booking_id'   => 'integer',
        'source_passenger_id' => 'integer',
    ];

    // =========================================================================
    // Relations
    // =========================================================================

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    // =========================================================================
    // Static Helpers
    // =========================================================================

    /**
     * Normalisasi nama untuk kolom alias_name_normalized.
     *
     * Rules:
     * - Trim whitespace di awal/akhir
     * - Collapse multiple whitespace menjadi satu spasi
     * - Lowercase semua karakter (mbstring-safe)
     *
     * Contoh: "  BUDI  Santoso  " → "budi santoso"
     */
    public static function normalize(string $name): string
    {
        $cleaned = preg_replace('/\s+/', ' ', $name) ?? $name;

        return mb_strtolower(trim($cleaned));
    }

    /**
     * Buat alias record baru (idempotent — tidak duplikat per customer).
     *
     * @param  Customer  $customer
     * @param  string    $name            Nama asli
     * @param  string    $source          booking|manual|import|merge
     * @param  int|null  $sourceBookingId
     * @param  int|null  $sourcePassengerId
     * @return static
     */
    public static function upsertForCustomer(
        Customer $customer,
        string $name,
        string $source = 'booking',
        ?int $sourceBookingId = null,
        ?int $sourcePassengerId = null,
    ): static {
        $normalized = static::normalize($name);

        if ($normalized === '') {
            // Nama kosong tidak disimpan — kembalikan dummy untuk chaining
            return new static();
        }

        return static::updateOrCreate(
            [
                'customer_id'          => $customer->id,
                'alias_name_normalized' => $normalized,
            ],
            [
                'alias_name'           => $name,
                'source'               => $source,
                'source_booking_id'    => $sourceBookingId,
                'source_passenger_id'  => $sourcePassengerId,
            ],
        );
    }
}
