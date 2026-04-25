@extends('layouts.dashboard')

@section('content')
    <section class="keuangan-jet-page animate-fade-in" data-keuangan-jet-page>
        <section class="keuangan-jet-page-header">
            <div class="keuangan-jet-page-copy">
                <h1>Data Keuangan JET</h1>
                <p>Rekap pendapatan dan bagi hasil per mobil per siklus round-trip.</p>
            </div>
        </section>

        {{-- Filter form --}}
        <section class="keuangan-jet-filter-bar">
            <form method="GET" action="{{ route('keuangan-jet.index') }}" class="keuangan-jet-filter-form">
                <div class="keuangan-jet-filter-field">
                    <label for="filter-start-date">Dari Tanggal</label>
                    <input
                        type="date"
                        id="filter-start-date"
                        name="start_date"
                        value="{{ $startDate->toDateString() }}"
                    />
                </div>
                <div class="keuangan-jet-filter-field">
                    <label for="filter-end-date">Sampai Tanggal</label>
                    <input
                        type="date"
                        id="filter-end-date"
                        name="end_date"
                        value="{{ $endDate->toDateString() }}"
                    />
                </div>
                <div class="keuangan-jet-filter-field">
                    <label for="filter-mobil">Mobil</label>
                    <select id="filter-mobil" name="mobil_id">
                        <option value="">Semua Mobil</option>
                        @foreach ($mobilList as $mobil)
                            <option value="{{ $mobil->id }}" @selected($mobilIdFilter === $mobil->id)>
                                {{ $mobil->kode_mobil }} ({{ $mobil->home_pool }})
                            </option>
                        @endforeach
                    </select>
                </div>
                <div class="keuangan-jet-filter-actions">
                    <button type="submit" class="keuangan-jet-primary-button">Terapkan Filter</button>
                </div>
            </form>
        </section>

        {{-- Stats summary cards --}}
        <section class="keuangan-jet-stats-grid">
            <div class="keuangan-jet-stat-card">
                <span class="keuangan-jet-stat-label">Total Siklus</span>
                <span class="keuangan-jet-stat-value">{{ $stats['count_total'] }}</span>
                <span class="keuangan-jet-stat-detail">
                    {{ $stats['count_complete'] }} complete, {{ $stats['count_berjalan'] }} berjalan, {{ $stats['count_locked'] }} locked
                </span>
            </div>
            <div class="keuangan-jet-stat-card">
                <span class="keuangan-jet-stat-label">Total Pendapatan Kotor</span>
                <span class="keuangan-jet-stat-value">Rp {{ number_format($stats['total_kotor'], 0, ',', '.') }}</span>
            </div>
            <div class="keuangan-jet-stat-card">
                <span class="keuangan-jet-stat-label">Total Pendapatan Bersih</span>
                <span class="keuangan-jet-stat-value">Rp {{ number_format($stats['total_bersih'], 0, ',', '.') }}</span>
            </div>
            <div class="keuangan-jet-stat-card">
                <span class="keuangan-jet-stat-label">Total Potongan Admin</span>
                <span class="keuangan-jet-stat-value">Rp {{ number_format($stats['total_admin'], 0, ',', '.') }}</span>
            </div>
        </section>

        {{-- Siklus table --}}
        <section class="keuangan-jet-table-section">
            @if ($siklusList->isEmpty())
                <div class="keuangan-jet-empty-state">
                    <p>Belum ada data Keuangan JET dalam rentang tanggal ini.</p>
                    <p class="keuangan-jet-empty-state-hint">Data otomatis dibuat saat trip di-generate atau di-mark berangkat di Trip Planning.</p>
                </div>
            @else
                <div class="keuangan-jet-table-wrapper">
                    <table class="keuangan-jet-table" data-testid="keuangan-jet-siklus-table">
                        <thead>
                            <tr>
                                <th>Tanggal Mulai</th>
                                <th>Mobil</th>
                                <th>Driver</th>
                                <th>Status</th>
                                <th>Pendapatan Kotor</th>
                                <th>Pendapatan Bersih</th>
                                <th>Bagi Hasil Driver (30%)</th>
                                <th>Bayar Driver</th>
                                <th>Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($siklusList as $siklus)
                                <tr data-testid="siklus-row-{{ $siklus->id }}">
                                    <td>
                                        {{ \Illuminate\Support\Carbon::parse($siklus->tanggal_mulai)->format('d M Y') }}
                                        @if ($siklus->tanggal_selesai)
                                            <br/><small>s/d {{ \Illuminate\Support\Carbon::parse($siklus->tanggal_selesai)->format('d M Y') }}</small>
                                        @endif
                                    </td>
                                    <td>
                                        <strong>{{ $siklus->mobil_code }}</strong>
                                        <br/><small>{{ $siklus->mobil?->home_pool ?? '-' }}</small>
                                    </td>
                                    <td>
                                        {{ $siklus->driver_name_actual }}
                                        @if ($siklus->is_driver_overridden)
                                            <span class="keuangan-jet-badge keuangan-jet-badge-amber">OVERRIDE</span>
                                        @endif
                                    </td>
                                    <td>
                                        <span class="keuangan-jet-status-pill keuangan-jet-status-{{ $siklus->status_siklus }}">
                                            {{ ucfirst($siklus->status_siklus) }}
                                        </span>
                                    </td>
                                    <td>Rp {{ number_format((float) $siklus->total_pendapatan_kotor, 0, ',', '.') }}</td>
                                    <td>Rp {{ number_format((float) $siklus->total_pendapatan_bersih, 0, ',', '.') }}</td>
                                    <td>Rp {{ number_format((float) $siklus->uang_driver, 0, ',', '.') }}</td>
                                    <td>
                                        <span class="keuangan-jet-payout-pill keuangan-jet-payout-{{ $siklus->driver_paid_status }}">
                                            {{ $siklus->driver_paid_status === 'sudah' ? 'Sudah Dibayar' : 'Belum Dibayar' }}
                                        </span>
                                    </td>
                                    <td>
                                        <a href="{{ route('keuangan-jet.show', $siklus->id) }}" class="keuangan-jet-link-button">
                                            Lihat Detail
                                        </a>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            @endif
        </section>
    </section>
@endsection
