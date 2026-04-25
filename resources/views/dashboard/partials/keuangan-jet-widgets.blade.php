{{-- ════════════════════════════════════════════════════════════
     Sesi 38 PR #4 — Widget Dashboard Keuangan JET
     Paralel dengan widget keberangkatan legacy (drop di PR #5)
     ════════════════════════════════════════════════════════════ --}}

@php
    $kjStats = $keuanganJetStats ?? null;
@endphp

@if ($kjStats)
    <section class="dashboard-keuangan-jet-section" data-testid="dashboard-keuangan-jet-section">
        <header class="dashboard-keuangan-jet-section-header">
            <div>
                <h2>Keuangan JET — Bulan Ini</h2>
                <p>Ringkasan revenue + bagi hasil sistem baru ({{ \Illuminate\Support\Carbon::parse($kjStats['period_summary']['period_start'])->format('d M') }} — {{ \Illuminate\Support\Carbon::parse($kjStats['period_summary']['period_end'])->format('d M Y') }})</p>
            </div>
            <a href="{{ route('keuangan-jet.index') }}" class="dashboard-keuangan-jet-link">
                Lihat Semua →
            </a>
        </header>

        {{-- Stat cards: 4 metrics period summary --}}
        <div class="dashboard-keuangan-jet-stats-grid">
            <article class="dashboard-keuangan-jet-stat-card">
                <span class="dashboard-keuangan-jet-stat-label">Total Siklus</span>
                <span class="dashboard-keuangan-jet-stat-value">{{ $kjStats['period_summary']['total_siklus'] }}</span>
                <span class="dashboard-keuangan-jet-stat-detail">
                    {{ $kjStats['period_summary']['count_complete'] }} complete · {{ $kjStats['period_summary']['count_berjalan'] }} berjalan · {{ $kjStats['period_summary']['count_locked'] }} locked
                </span>
            </article>
            <article class="dashboard-keuangan-jet-stat-card">
                <span class="dashboard-keuangan-jet-stat-label">Total Pendapatan Kotor</span>
                <span class="dashboard-keuangan-jet-stat-value">Rp {{ number_format((float) $kjStats['period_summary']['total_kotor'], 0, ',', '.') }}</span>
            </article>
            <article class="dashboard-keuangan-jet-stat-card">
                <span class="dashboard-keuangan-jet-stat-label">Total Pendapatan Bersih</span>
                <span class="dashboard-keuangan-jet-stat-value">Rp {{ number_format((float) $kjStats['period_summary']['total_bersih'], 0, ',', '.') }}</span>
            </article>
            <article class="dashboard-keuangan-jet-stat-card dashboard-keuangan-jet-stat-card-driver">
                <span class="dashboard-keuangan-jet-stat-label">Total Uang Driver</span>
                <span class="dashboard-keuangan-jet-stat-value">Rp {{ number_format((float) $kjStats['period_summary']['total_uang_driver'], 0, ',', '.') }}</span>
            </article>
        </div>

        {{-- Today per mobil --}}
        <article class="dashboard-keuangan-jet-panel">
            <header class="dashboard-keuangan-jet-panel-header">
                <h3>Aktivitas Hari Ini per Mobil</h3>
                <p>{{ now()->format('l, d M Y') }}</p>
            </header>
            @if (empty($kjStats['today_per_mobil']))
                <p class="dashboard-keuangan-jet-empty">Belum ada aktivitas mobil hari ini.</p>
            @else
                <div class="dashboard-keuangan-jet-table-wrapper">
                    <table class="dashboard-keuangan-jet-table">
                        <thead>
                            <tr>
                                <th>Mobil</th>
                                <th>Pool</th>
                                <th>Trip</th>
                                <th>Siklus</th>
                                <th>Status</th>
                                <th>Pendapatan Kotor</th>
                                <th>Pendapatan Bersih</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($kjStats['today_per_mobil'] as $mobil)
                                <tr>
                                    <td><strong>{{ $mobil['kode_mobil'] }}</strong></td>
                                    <td>{{ $mobil['home_pool'] }}</td>
                                    <td>{{ $mobil['count_trips'] }}</td>
                                    <td>{{ $mobil['count_siklus'] }}</td>
                                    <td>
                                        @if ($mobil['latest_status'] === '-')
                                            <span class="dashboard-keuangan-jet-pill-muted">-</span>
                                        @else
                                            <span class="dashboard-keuangan-jet-pill dashboard-keuangan-jet-pill-{{ $mobil['latest_status'] }}">{{ ucfirst($mobil['latest_status']) }}</span>
                                        @endif
                                    </td>
                                    <td>Rp {{ number_format($mobil['total_kotor'], 0, ',', '.') }}</td>
                                    <td>Rp {{ number_format($mobil['total_bersih'], 0, ',', '.') }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            @endif
        </article>

        {{-- Dual leaderboard: mobil + driver --}}
        <div class="dashboard-keuangan-jet-leaderboard-grid">
            <article class="dashboard-keuangan-jet-panel">
                <header class="dashboard-keuangan-jet-panel-header">
                    <h3>🏆 Leaderboard Mobil — Bulan Ini</h3>
                    <p>Top 5 by pendapatan bersih</p>
                </header>
                @if (empty($kjStats['leaderboard_mobil']))
                    <p class="dashboard-keuangan-jet-empty">Belum ada data.</p>
                @else
                    <ol class="dashboard-keuangan-jet-leaderboard">
                        @foreach ($kjStats['leaderboard_mobil'] as $idx => $entry)
                            <li class="dashboard-keuangan-jet-leaderboard-item">
                                <span class="dashboard-keuangan-jet-leaderboard-rank">{{ $idx + 1 }}</span>
                                <div class="dashboard-keuangan-jet-leaderboard-body">
                                    <strong>{{ $entry['kode_mobil'] }}</strong>
                                    <small>{{ $entry['count_siklus'] }} siklus</small>
                                </div>
                                <span class="dashboard-keuangan-jet-leaderboard-value">Rp {{ number_format($entry['total_bersih'], 0, ',', '.') }}</span>
                            </li>
                        @endforeach
                    </ol>
                @endif
            </article>

            <article class="dashboard-keuangan-jet-panel">
                <header class="dashboard-keuangan-jet-panel-header">
                    <h3>👤 Leaderboard Driver — Bulan Ini</h3>
                    <p>Top 5 by total uang driver</p>
                </header>
                @if (empty($kjStats['leaderboard_driver']))
                    <p class="dashboard-keuangan-jet-empty">Belum ada data.</p>
                @else
                    <ol class="dashboard-keuangan-jet-leaderboard">
                        @foreach ($kjStats['leaderboard_driver'] as $idx => $entry)
                            <li class="dashboard-keuangan-jet-leaderboard-item">
                                <span class="dashboard-keuangan-jet-leaderboard-rank">{{ $idx + 1 }}</span>
                                <div class="dashboard-keuangan-jet-leaderboard-body">
                                    <strong>{{ $entry['driver_name'] }}</strong>
                                    <small>{{ $entry['count_siklus'] }} siklus</small>
                                </div>
                                <span class="dashboard-keuangan-jet-leaderboard-value">Rp {{ number_format($entry['total_uang_driver'], 0, ',', '.') }}</span>
                            </li>
                        @endforeach
                    </ol>
                @endif
            </article>
        </div>
    </section>
@endif
