<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $booking_id
 * @property string $source
 * @property string|null $source_event_id
 * @property string|null $source_channel
 * @property array|null $source_meta
 */
class BookingSource extends Model
{
    use HasFactory;

    public const SOURCE_MANUAL = 'manual';
    public const SOURCE_CHATBOT = 'chatbot';
    public const SOURCE_WA_LEGACY = 'wa_legacy';

    public const VALID_SOURCES = [
        self::SOURCE_MANUAL,
        self::SOURCE_CHATBOT,
        self::SOURCE_WA_LEGACY,
    ];

    protected $fillable = [
        'booking_id',
        'source',
        'source_event_id',
        'source_channel',
        'source_meta',
    ];

    protected $casts = [
        'source_meta' => 'array',
    ];

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    public function isFromChatbot(): bool
    {
        return $this->source === self::SOURCE_CHATBOT;
    }
}
