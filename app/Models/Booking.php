<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_code',
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
        'route_label',
        'payment_method',
        'payment_proof_path',
        'paid_at',
        'payment_status',
        'validated_by',
        'validated_at',
        'validation_notes',
        'ticket_issued_at',
        'ticket_status',
        'departure_id',
        'booking_status',
        'notes',
    ];

    protected $casts = [
        'trip_date' => 'date',
        'selected_seats' => 'array',
        'price_per_seat' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'paid_at' => 'datetime',
        'validated_at' => 'datetime',
        'ticket_issued_at' => 'datetime',
    ];

    public function passengers(): HasMany
    {
        return $this->hasMany(BookingPassenger::class);
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
}
