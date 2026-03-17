<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class BookingPassenger extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'customer_id',
        'seat_no',
        'name',
        'phone',
        'ticket_status',
        'checked_in_at',
        'checked_in_by',
        'checkin_status',
        'qr_token',
        'qr_code_value',
        'scan_count',
        'loyalty_count',
        'discount_eligible',
        'eligible_discount',
        'last_scanned_at',
        'ticket_pdf_path',
    ];

    protected $casts = [
        'checked_in_at'   => 'datetime',
        'last_scanned_at' => 'datetime',
        'scan_count'      => 'integer',
        'loyalty_count'   => 'integer',
        'discount_eligible' => 'boolean',
        'eligible_discount' => 'boolean',
    ];

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function checker(): BelongsTo
    {
        return $this->belongsTo(User::class, 'checked_in_by');
    }

    /** Semua backup tiket penumpang ini */
    public function ticketBackups(): HasMany
    {
        return $this->hasMany(TicketBackup::class, 'passenger_id');
    }

    public function getSelectedSeatsAttribute(): ?string
    {
        return $this->seat_no;
    }

    public function getTicketPdfUrlAttribute(): ?string
    {
        if (! $this->ticket_pdf_path) {
            return null;
        }

        return Storage::url($this->ticket_pdf_path);
    }

    public function hasTicketPdf(): bool
    {
        return filled($this->ticket_pdf_path) && Storage::exists($this->ticket_pdf_path);
    }
}
