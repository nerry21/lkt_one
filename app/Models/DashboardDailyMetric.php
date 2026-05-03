<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Sesi 77 PR-CRM-6K4 — Cache aggregation per (tanggal, metric_type) untuk
 * grafik trend 7 hari di dashboard.
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon $metric_date
 * @property string $metric_type
 * @property string $metric_value
 * @property array|null $metric_meta
 * @property \Illuminate\Support\Carbon $computed_at
 */
class DashboardDailyMetric extends Model
{
    use HasFactory;

    public const TYPE_TRIPS_TOTAL = 'trips_total';
    public const TYPE_REVENUE_TOTAL = 'revenue_total';
    public const TYPE_PASSENGER_INQUIRY_RESPONSE_RATE = 'passenger_inquiry_response_rate';
    public const TYPE_CASCADE_RESCHEDULE_COUNT = 'cascade_reschedule_count';

    protected $table = 'dashboard_daily_metrics';

    protected $fillable = [
        'metric_date',
        'metric_type',
        'metric_value',
        'metric_meta',
        'computed_at',
    ];

    protected $casts = [
        'metric_date' => 'date',
        'metric_value' => 'decimal:2',
        'metric_meta' => 'array',
        'computed_at' => 'datetime',
    ];
}
