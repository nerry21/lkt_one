<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Audit trail untuk ProcessTripCutoverCommand (Fase D4 Sesi 24).
 *
 * 1 row per run attempt (scheduler atau manual). Query by target_date untuk
 * debug scheduler reliability; status konstanta below discriminate outcome.
 */
class TripCutoverLog extends Model
{
    protected $table = 'trip_cutover_logs';

    protected $fillable = [
        'target_date',
        'status',
        'trigger_source',
        'retry_count',
        'error_message',
        'context',
        'started_at',
        'finished_at',
    ];

    protected $casts = [
        'target_date' => 'date',
        'retry_count' => 'integer',
        'context' => 'array',
        'started_at' => 'datetime',
        'finished_at' => 'datetime',
    ];

    public const STATUS_SUCCESS = 'success';
    public const STATUS_FAILED = 'failed';
    public const STATUS_IDEMPOTENT_SKIP = 'idempotent_skip';
    public const STATUS_MISSING_ASSIGNMENTS = 'missing_assignments';

    public const TRIGGER_SCHEDULER = 'scheduler';
    public const TRIGGER_MANUAL = 'manual';
}
