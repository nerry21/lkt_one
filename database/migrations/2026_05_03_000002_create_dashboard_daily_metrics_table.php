<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Sesi 77 PR-CRM-6K4 — Tabel cache aggregation untuk grafik trend 7 hari.
 *
 * 1 row = 1 tanggal × 1 metric_type. Refresh harian via dispatcher atau
 * on-demand saat dashboard dimuat (DashboardMetricsAggregatorService).
 *
 * metric_type yang dikenal:
 *   - 'trips_total'
 *   - 'revenue_total'
 *   - 'passenger_inquiry_response_rate'
 *   - 'cascade_reschedule_count'
 *
 * UNIQUE(metric_date, metric_type) — 1 nilai per (tanggal, metric).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dashboard_daily_metrics', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->date('metric_date');
            $table->string('metric_type', 60);
            $table->decimal('metric_value', 15, 2)->default(0);
            $table->json('metric_meta')->nullable();
            $table->timestamp('computed_at')->useCurrent();
            $table->timestamps();

            $table->unique(['metric_date', 'metric_type'], 'uk_dashboard_metrics_date_type');
            $table->index('metric_date', 'idx_dashboard_metrics_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dashboard_daily_metrics');
    }
};
