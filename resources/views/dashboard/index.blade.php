@extends('layouts.dashboard')

@php
    $formatCurrency = static fn ($value): string => 'Rp ' . number_format((float) $value, 0, ',', '.');
    $formatNumber = static fn ($value): string => number_format((float) $value, 0, ',', '.');
@endphp

@section('content')
    <section class="dashboard-page animate-fade-in" data-dashboard-page>
        <script id="dashboard-initial-state" type="application/json">@json($dashboardState)</script>

        <div class="dashboard-loading-screen" data-dashboard-loading hidden>
            <div class="dashboard-loading-spinner" aria-hidden="true"></div>
            <p>Memuat data...</p>
        </div>

        <div data-dashboard-content>
            <section class="dashboard-page-header">
                <div class="dashboard-page-copy">
                    <h1>Dashboard</h1>
                    <p>Ringkasan statistik dan performa armada</p>
                </div>

                <div class="dashboard-page-actions">
                    <a
                        class="dashboard-ghost-button"
                        href="{{ route('booking.reguler') }}"
                        data-testid="booking-dashboard-btn"
                    >
                        <span class="dashboard-button-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M12 3L19 7V17L12 21L5 17V7L12 3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                                <path d="M12 12L19 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 12L5 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 12V21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            </svg>
                        </span>
                        <span>Booking Reguler</span>
                    </a>

                    @if (auth()->user()?->isAdmin())
                        <a
                            class="dashboard-ghost-button"
                            href="{{ route('admin.departures.index') }}"
                            data-testid="manifest-dashboard-btn"
                        >
                            <span class="dashboard-button-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M8 4H16C18.7614 4 21 6.23858 21 9V15C21 16.1046 20.1046 17 19 17H5C3.89543 17 3 16.1046 3 15V9C3 6.23858 5.23858 4 8 4Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M7 17L6 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                    <path d="M17 17L18 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                    <path d="M7 13H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
                                    <path d="M17 13H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
                                    <path d="M6 9H18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                </svg>
                            </span>
                            <span>Manifest Driver</span>
                        </a>
                    @endif

                    <a
                        class="dashboard-primary-button"
                        href="{{ route('stock.index') }}"
                        data-testid="stock-dashboard-btn"
                    >
                        <span class="dashboard-button-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M12 3L19 7V17L12 21L5 17V7L12 3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                                <path d="M12 12L19 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 12L5 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12 12V21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            </svg>
                        </span>
                        <span>Stok Snack & Air Mineral</span>
                    </a>

                    <button
                        class="dashboard-ghost-button"
                        id="dashboard-refresh-btn"
                        type="button"
                        data-dashboard-refresh
                        data-testid="refresh-dashboard-btn"
                    >
                        <span class="dashboard-button-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M20 11C20 6.58172 16.4183 3 12 3C8.36458 3 5.29507 5.42794 4.32642 8.74996" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                <path d="M4 4V9H9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M4 13C4 17.4183 7.58172 21 12 21C15.6354 21 18.7049 18.5721 19.6736 15.25" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                <path d="M20 20V15H15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </span>
                        <span data-button-label>Refresh</span>
                    </button>
                </div>
            </section>

            <section class="dashboard-stats-grid">
                @foreach ($statCards as $card)
                    <article class="dashboard-stat-card dashboard-stat-card--{{ $card['color'] }}" data-testid="{{ $card['testid'] }}">
                        <span class="dashboard-stat-orb dashboard-stat-orb--{{ $card['color'] }}" aria-hidden="true"></span>

                        <div class="dashboard-stat-card-body">
                            <div class="dashboard-stat-copy">
                                <p class="dashboard-stat-label">{{ $card['title'] }}</p>
                                <p class="dashboard-stat-value" data-stat="{{ $card['key'] }}">
                                    {{ $card['format'] === 'currency' ? $formatCurrency($card['value']) : $formatNumber($card['value']) }}
                                </p>

                                <div class="dashboard-stat-trend {{ $card['trend_up'] ? 'is-positive' : 'is-negative' }}">
                                    <span class="dashboard-stat-trend-icon" aria-hidden="true">
                                        @if ($card['trend_up'])
                                            <svg viewBox="0 0 24 24" fill="none">
                                                <path d="M7 17L17 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                                <path d="M10 7H17V14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        @else
                                            <svg viewBox="0 0 24 24" fill="none">
                                                <path d="M7 7L17 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                                <path d="M17 10V17H10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        @endif
                                    </span>
                                    <span>{{ $card['trend'] }}</span>
                                </div>
                            </div>

                            <div class="dashboard-stat-icon dashboard-stat-icon--{{ $card['color'] }}" aria-hidden="true">
                                @switch($card['icon'])
                                    @case('dollar-sign')
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <path d="M12 2V22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                            <path d="M17 6.5C17 4.567 14.7614 3 12 3C9.23858 3 7 4.567 7 6.5C7 8.433 9.23858 10 12 10C14.7614 10 17 11.567 17 13.5C17 15.433 14.7614 17 12 17C9.23858 17 7 15.433 7 13.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                        </svg>
                                        @break
                                    @case('trending-up')
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M14 7H21V14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        @break
                                    @case('bus')
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <path d="M8 4H16C18.7614 4 21 6.23858 21 9V15C21 16.1046 20.1046 17 19 17H5C3.89543 17 3 16.1046 3 15V9C3 6.23858 5.23858 4 8 4Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M7 17L6 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                            <path d="M17 17L18 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                            <path d="M7 13H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
                                            <path d="M17 13H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
                                            <path d="M6 9H18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                        </svg>
                                        @break
                                    @case('users')
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <path d="M16 21V19C16 17.3431 14.6569 16 13 16H7C5.34315 16 4 17.3431 4 19V21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                            <circle cx="10" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/>
                                            <path d="M20 21V19C20 17.5978 19.0344 16.4215 17.7324 16.0996" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                            <path d="M14.5 4.23408C15.9658 4.86569 17 6.32446 17 8.02487C17 9.72529 15.9658 11.1841 14.5 11.8157" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                        </svg>
                                        @break
                                    @case('car')
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <path d="M5 14L6.6 9.2C6.8728 8.3816 7.6387 7.83 8.5014 7.83H15.4986C16.3613 7.83 17.1272 8.3816 17.4 9.2L19 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M4 14H20V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V14Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                                            <path d="M7 16H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
                                            <path d="M17 16H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
                                        </svg>
                                        @break
                                @endswitch
                            </div>
                        </div>
                    </article>
                @endforeach
            </section>

            <section class="dashboard-chart-grid">
                <article class="dashboard-panel-card" data-testid="revenue-chart-card">
                    <div class="dashboard-panel-head">
                        <div>
                            <h3>Grafik Pendapatan</h3>
                            <p>Pendapatan bersih dan Uang PC per bulan</p>
                        </div>
                    </div>

                    <div class="dashboard-chart-stage">
                        <canvas id="dashboard-revenue-chart" height="300" @if (count($revenueData) === 0) hidden @endif></canvas>
                        <div class="dashboard-empty-state" id="dashboard-revenue-empty" @if (count($revenueData) > 0) hidden @endif>
                            Belum ada data keberangkatan
                        </div>
                    </div>
                </article>

                <article class="dashboard-panel-card" data-testid="passenger-chart-card">
                    <div class="dashboard-panel-head">
                        <div>
                            <h3>Jumlah Penumpang</h3>
                            <p>Total penumpang per bulan</p>
                        </div>
                    </div>

                    <div class="dashboard-chart-stage">
                        <canvas id="dashboard-passenger-chart" height="300" @if (count($revenueData) === 0) hidden @endif></canvas>
                        <div class="dashboard-empty-state" id="dashboard-passenger-empty" @if (count($revenueData) > 0) hidden @endif>
                            Belum ada data keberangkatan
                        </div>
                    </div>
                </article>
            </section>

            <section class="dashboard-panel-card" data-testid="mobil-revenue-card">
                <div class="dashboard-panel-head">
                    <div>
                        <h3>Pendapatan per Mobil</h3>
                        <p>Total pendapatan bersih berdasarkan kode mobil</p>
                    </div>
                </div>

                <div class="dashboard-mobil-grid" id="dashboard-mobil-content" @if (count($mobilRevenue) === 0) hidden @endif>
                    <div class="dashboard-chart-stage dashboard-chart-stage--compact">
                        <canvas id="dashboard-mobil-chart" height="300"></canvas>
                    </div>

                    <div class="dashboard-mobil-list" id="dashboard-mobil-list">
                        @foreach ($mobilRevenue as $item)
                            @php
                                $color = $mobilRevenueColors[$loop->index % count($mobilRevenueColors)];
                            @endphp
                            <div class="dashboard-mobil-item">
                                <div class="dashboard-mobil-meta">
                                    <span class="dashboard-mobil-dot" style="background-color: {{ $color }}"></span>
                                    <div>
                                        <p class="dashboard-mobil-code">{{ $item['kode_mobil'] }}</p>
                                        <p class="dashboard-mobil-trips">{{ $formatNumber($item['total_trips']) }} trip</p>
                                    </div>
                                </div>
                                <p class="dashboard-mobil-value">{{ $formatCurrency($item['total_uang_bersih']) }}</p>
                            </div>
                        @endforeach
                    </div>
                </div>

                <div class="dashboard-empty-state dashboard-empty-state--block" id="dashboard-mobil-empty" @if (count($mobilRevenue) > 0) hidden @endif>
                    Belum ada data pendapatan per mobil
                </div>
            </section>
        </div>
    </section>
@endsection
