{{-- Sesi 77 PR-CRM-6K4 — System Health Widgets --}}
@php
    $shStats = $systemHealthStats ?? null;
@endphp

@if ($shStats)
    <section class="dashboard-system-health-section" data-testid="dashboard-system-health-section">
        <header class="dashboard-section-header">
            <div>
                <h2>Kesehatan Sistem — Hari Ini</h2>
                <p>Status real-time chatbot, bridge API, dan worker queue</p>
            </div>
        </header>

        <div class="dashboard-system-health-grid">
            <article class="dashboard-stat-card" data-testid="widget-passenger-inquiry">
                <span class="dashboard-stat-icon">📞</span>
                <span class="dashboard-stat-label">Penumpang Inquiry</span>
                <span class="dashboard-stat-value">{{ $shStats['passenger_inquiry']['response_rate_pct'] }}%</span>
                <span class="dashboard-stat-detail">
                    {{ $shStats['passenger_inquiry']['responded_count'] }} dari {{ $shStats['passenger_inquiry']['sent_count'] }} trip
                </span>
            </article>

            <article class="dashboard-stat-card" data-testid="widget-cascade-reschedule">
                <span class="dashboard-stat-icon">🔄</span>
                <span class="dashboard-stat-label">Cascade Reschedule</span>
                <span class="dashboard-stat-value">{{ $shStats['cascade_reschedule']['cancel_count'] + $shStats['cascade_reschedule']['walk_in_count'] }}</span>
                <span class="dashboard-stat-detail">
                    {{ $shStats['cascade_reschedule']['cancel_count'] }} cancel · {{ $shStats['cascade_reschedule']['walk_in_count'] }} walk-in
                </span>
            </article>

            <article class="dashboard-stat-card dashboard-stat-card--{{ $shStats['bridge_health']['overall_status'] }}" data-testid="widget-bridge-health">
                <span class="dashboard-stat-icon">🌉</span>
                <span class="dashboard-stat-label">Bridge API Health</span>
                <span class="dashboard-stat-value">{{ $shStats['bridge_health']['healthy_count'] }}/{{ $shStats['bridge_health']['total_endpoints'] }}</span>
                <span class="dashboard-stat-detail">
                    Status: {{ ucfirst($shStats['bridge_health']['overall_status']) }}
                </span>
            </article>

            <article class="dashboard-stat-card dashboard-stat-card--{{ $shStats['worker']['status'] === 'running' ? 'healthy' : 'warning' }}" data-testid="widget-worker-status">
                <span class="dashboard-stat-icon">🔧</span>
                <span class="dashboard-stat-label">Worker Queue</span>
                <span class="dashboard-stat-value">
                    @if ($shStats['worker']['status'] === 'mati_sengaja')
                        ⛔ MATI
                    @elseif ($shStats['worker']['status'] === 'running')
                        ✅ JALAN
                    @else
                        ⚠️ ERROR
                    @endif
                </span>
                <span class="dashboard-stat-detail">{{ $shStats['worker']['note'] ?? '-' }}</span>
            </article>
        </div>
    </section>
@endif
