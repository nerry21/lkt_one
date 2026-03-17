<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

/**
 * Model TicketBackup — Backup permanen PDF E-Ticket.
 *
 * Setiap PDF yang berhasil di-generate dan disimpan ke storage dicatat di sini.
 * Record bersifat permanen — tidak dihapus meski booking/passenger dihapus.
 *
 * Tipe backup:
 * - 'booking'   : satu PDF untuk seluruh booking (semua penumpang)
 * - 'passenger' : satu PDF per penumpang individual
 *
 * @property int         $id
 * @property int         $booking_id
 * @property int|null    $passenger_id
 * @property int|null    $customer_id
 * @property string      $booking_code
 * @property string|null $ticket_number
 * @property string|null $invoice_number
 * @property string      $passenger_name
 * @property string      $backup_type       booking|passenger
 * @property string      $file_path
 * @property string      $disk
 * @property string|null $file_hash         SHA-256
 * @property int|null    $file_size_bytes
 * @property int         $version
 * @property \Carbon\Carbon|null $issued_at
 * @property \Carbon\Carbon      $backed_up_at
 * @property string|null $generated_by      UUID referensi users.id
 */
class TicketBackup extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'passenger_id',
        'customer_id',
        'booking_code',
        'ticket_number',
        'invoice_number',
        'passenger_name',
        'backup_type',
        'file_path',
        'disk',
        'file_hash',
        'file_size_bytes',
        'version',
        'issued_at',
        'backed_up_at',
        'generated_by',
    ];

    protected $casts = [
        'file_size_bytes' => 'integer',
        'version'         => 'integer',
        'issued_at'       => 'datetime',
        'backed_up_at'    => 'datetime',
    ];

    // =========================================================================
    // Relations
    //
    // Menggunakan soft references — relasi mungkin null jika data asal dihapus.
    // =========================================================================

    /**
     * Booking terkait (mungkin null jika booking sudah dihapus).
     */
    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    /**
     * BookingPassenger terkait (null untuk backup level booking).
     */
    public function passenger(): BelongsTo
    {
        return $this->belongsTo(BookingPassenger::class, 'passenger_id');
    }

    /**
     * Customer terkait.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class)->withTrashed();
    }

    /**
     * User yang men-trigger generate PDF.
     */
    public function generatedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'generated_by');
    }

    // =========================================================================
    // Helpers
    // =========================================================================

    /**
     * Apakah file fisik masih ada di storage.
     */
    public function fileExists(): bool
    {
        return Storage::disk($this->disk)->exists($this->file_path);
    }

    /**
     * URL publik file (jika disk mendukung public URL).
     */
    public function getFileUrlAttribute(): ?string
    {
        if (! $this->file_path) {
            return null;
        }

        return Storage::disk($this->disk)->url($this->file_path);
    }

    /**
     * Verifikasi integritas file dengan menghitung ulang SHA-256.
     * Returns true jika hash cocok, false jika file berubah atau tidak ada.
     */
    public function verifyIntegrity(): bool
    {
        if (blank($this->file_hash)) {
            return false;
        }

        if (! $this->fileExists()) {
            return false;
        }

        $content     = Storage::disk($this->disk)->get($this->file_path);
        $currentHash = hash('sha256', $content ?? '');

        return hash_equals($this->file_hash, $currentHash);
    }

    /**
     * Ambil konten file sebagai string (untuk streaming).
     *
     * @throws \RuntimeException jika file tidak ditemukan
     */
    public function getContent(): string
    {
        if (! $this->fileExists()) {
            throw new \RuntimeException(
                "File backup tidak ditemukan: {$this->file_path} (disk: {$this->disk})"
            );
        }

        return Storage::disk($this->disk)->get($this->file_path) ?? '';
    }

    /**
     * Label ringkas untuk display.
     */
    public function getLabelAttribute(): string
    {
        $type = $this->backup_type === 'passenger' ? "Penumpang ({$this->passenger_name})" : 'Booking';

        return "[{$this->booking_code}] {$type} — v{$this->version} — {$this->backed_up_at->format('d/m/Y H:i')}";
    }
}
