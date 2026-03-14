<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_code',
        'invoice_number',
        'ticket_number',
        'qr_token',
        'qr_code_value',
        'category',
        'from_city',
        'to_city',
        'trip_date',
        'trip_time',
        'booking_for',
        'passenger_name',
        'passenger_phone',
        'passenger_count',
        'pickup_location',
        'dropoff_location',
        'selected_seats',
        'price_per_seat',
        'total_amount',
        'nominal_payment',
        'route_label',
        'driver_name',
        'driver_id',
        'payment_method',
        'payment_reference',
        'payment_proof_path',
        'payment_account_bank',
        'payment_account_name',
        'payment_account_number',
        'paid_at',
        'payment_status',
        'validated_by',
        'validated_at',
        'validation_notes',
        'ticket_issued_at',
        'ticket_status',
        'loyalty_trip_count',
        'scan_count',
        'loyalty_count',
        'discount_eligible',
        'eligible_discount',
        'departure_id',
        'booking_status',
        'notes',
    ];

    protected $casts = [
        'trip_date' => 'date',
        'selected_seats' => 'array',
        'price_per_seat' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'nominal_payment' => 'decimal:2',
        'paid_at' => 'datetime',
        'validated_at' => 'datetime',
        'ticket_issued_at' => 'datetime',
        'loyalty_count' => 'integer',
        'discount_eligible' => 'boolean',
        'eligible_discount' => 'boolean',
    ];

    protected static function booted(): void
    {
        static::saving(function (Booking $booking): void {
            $loyaltyCount = max(
                (int) ($booking->loyalty_count ?? 0),
                (int) ($booking->loyalty_trip_count ?? 0),
                (int) ($booking->scan_count ?? 0),
            );

            $eligibleDiscount = (bool) ($booking->eligible_discount ?? $booking->discount_eligible ?? false)
                || $loyaltyCount >= 5;

            $booking->loyalty_count = $loyaltyCount;
            $booking->eligible_discount = $eligibleDiscount;
            $booking->discount_eligible = $eligibleDiscount;

            if (filled($booking->driver_id) && blank($booking->driver_name)) {
                $booking->driver_name = optional($booking->driver()->first())->nama;
            }

            if (blank($booking->driver_id) && blank($booking->driver_name)) {
                $booking->driver_name = null;
            }
        });
    }

    public function passengers(): HasMany
    {
        return $this->hasMany(BookingPassenger::class);
    }

    public function driver(): BelongsTo
    {
        return $this->belongsTo(Driver::class);
    }

    public function validator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'validated_by');
    }

    public function departure(): BelongsTo
    {
        return $this->belongsTo(Departure::class);
    }

    public function getFromAttribute(): string
    {
        return $this->from_city;
    }

    public function getToAttribute(): string
    {
        return $this->to_city;
    }

    public function getDateAttribute(): ?string
    {
        return $this->trip_date?->format('Y-m-d');
    }

    public function getTimeAttribute(): ?string
    {
        return $this->trip_time ? substr((string) $this->trip_time, 0, 5) : null;
    }

    public function getPaymentProofUrlAttribute(): ?string
    {
        if (! $this->payment_proof_path) {
            return null;
        }

        return asset('storage/' . ltrim($this->payment_proof_path, '/'));
    }

    public function getNomorBookingAttribute(): string
    {
        return (string) ($this->booking_code ?? '');
    }

    public function getNomorInvoiceAttribute(): ?string
    {
        return $this->invoice_number;
    }

    public function getNomorTiketAttribute(): ?string
    {
        return $this->ticket_number;
    }

    public function getStatusBookingAttribute(): string
    {
        return (string) ($this->attributes['booking_status'] ?? '');
    }

    public function getStatusPembayaranAttribute(): string
    {
        return (string) ($this->attributes['payment_status'] ?? '');
    }

    public function getMetodePembayaranAttribute(): ?string
    {
        return $this->payment_method ? Str::lower((string) $this->payment_method) : null;
    }

    public function getNominalPembayaranAttribute(): float
    {
        return (float) ($this->nominal_payment ?? 0);
    }

    public function getNamaDriverAttribute(): ?string
    {
        return $this->driver_name;
    }
}
