@extends('layouts.dashboard')

@php
    $formatPp = static fn ($value): string => number_format((float) $value, 1, ',', '.');
    $directionLabels = [
        'ROHUL_TO_PKB' => 'ROHUL → PKB',
        'PKB_TO_ROHUL' => 'PKB → ROHUL',
    ];
@endphp

@section('content')
    <section class="dashboard-page animate-fade-in" data-trip-planning-page>
        <script id="trip-planning-initial-state" type="application/json">@json($dashboardState)</script>

        <div data-trip-planning-content>
            <section class="dashboard-page-header">
                <div class="dashboard-page-copy">
                    <h1>Trip Planning</h1>
                    <p>Jadwal trip harian armada JET Travel — {{ $targetDate->format('d M Y') }}</p>
                </div>

                <div class="dashboard-page-actions">
                    <form method="GET" action="{{ route('trip-planning.dashboard.view') }}" class="dashboard-inline-form">
                        <label for="trip-planning-date-picker" class="sr-only">Tanggal</label>
                        <input
                            type="date"
                            id="trip-planning-date-picker"
                            name="date"
                            value="{{ $targetDate->toDateString() }}"
                            class="dashboard-date-input"
                            data-testid="trip-planning-date-picker"
                        />
                        <button type="submit" class="dashboard-ghost-button" data-testid="trip-planning-filter-btn">
                            <span>Tampilkan</span>
                        </button>
                    </form>
                </div>
            </section>

            <section class="dashboard-stats-grid" data-testid="trip-planning-stats-grid">
                @forelse ($statistics as $stat)
                    <article
                        class="dashboard-stat-card dashboard-stat-card--emerald"
                        data-testid="mobil-stat-{{ $stat['mobil_code'] }}"
                    >
                        <span class="dashboard-stat-orb dashboard-stat-orb--emerald" aria-hidden="true"></span>

                        <div class="dashboard-stat-card-body">
                            <div class="dashboard-stat-copy">
                                <p class="dashboard-stat-label">
                                    {{ $stat['mobil_code'] }}
                                    @if (! empty($stat['home_pool']))
                                        <span class="trip-planning-pool-tag">{{ $stat['home_pool'] }}</span>
                                    @endif
                                </p>
                                <p class="dashboard-stat-value" data-mobil-pp="{{ $stat['mobil_id'] }}">
                                    {{ $formatPp($stat['pp_count']) }} PP
                                </p>

                                <div class="trip-planning-status-breakdown">
                                    @forelse ($stat['status_breakdown'] as $status => $count)
                                        <span class="trip-planning-status-badge trip-planning-status-badge--{{ $status }}">
                                            {{ $status }}: {{ $count }}
                                        </span>
                                    @empty
                                        <span class="trip-planning-status-breakdown-empty">Belum ada trip</span>
                                    @endforelse
                                </div>
                            </div>
                        </div>
                    </article>
                @empty
                    <div class="dashboard-empty-state dashboard-empty-state--block">
                        Belum ada mobil aktif di sistem Trip Planning
                    </div>
                @endforelse
            </section>

            <section class="dashboard-panel-card" data-testid="trip-planning-trips-panel">
                <div class="dashboard-panel-head">
                    <div>
                        <h3>Daftar Trip</h3>
                        <p>{{ count($trips) }} trip terjadwal untuk {{ $targetDate->format('d M Y') }}</p>
                    </div>
                </div>

                @if (count($trips) === 0)
                    <div class="dashboard-empty-state dashboard-empty-state--block">
                        Belum ada trip terjadwal untuk tanggal ini
                    </div>
                @else
                    <div class="trip-planning-trips-table-wrap">
                        <table class="trip-planning-trips-table" data-testid="trip-planning-trips-table">
                            <thead>
                                <tr>
                                    <th>Mobil</th>
                                    <th>Driver</th>
                                    <th>Arah</th>
                                    <th>Jam</th>
                                    <th>Seq</th>
                                    <th>Status</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($trips as $trip)
                                    <tr data-trip-id="{{ $trip->id }}" data-testid="trip-row-{{ $trip->id }}">
                                        <td>{{ $trip->mobil?->kode_mobil ?? '-' }}</td>
                                        <td>{{ $trip->driver?->nama ?? '-' }}</td>
                                        <td>
                                            <span class="trip-planning-direction-badge trip-planning-direction-badge--{{ strtolower(str_replace('_', '-', $trip->direction)) }}">
                                                {{ $directionLabels[$trip->direction] ?? $trip->direction }}
                                            </span>
                                        </td>
                                        <td>{{ $trip->trip_time ?? '(waiting)' }}</td>
                                        <td>{{ $trip->sequence }}</td>
                                        <td>
                                            <span class="trip-planning-status-badge trip-planning-status-badge--{{ $trip->status }}">
                                                {{ $trip->status }}
                                                @if ($trip->keluar_trip_substatus)
                                                    · {{ $trip->keluar_trip_substatus }}
                                                @endif
                                            </span>
                                        </td>
                                        <td class="trip-planning-actions-cell">
                                            <div class="trip-planning-action-group" data-trip-actions>
                                                @if ($trip->status === 'scheduled' && $trip->trip_time !== null)
                                                    <button type="button"
                                                            class="trip-planning-action-btn trip-planning-action-btn--success"
                                                            data-action="berangkat"
                                                            data-trip-id="{{ $trip->id }}"
                                                            data-testid="btn-berangkat-{{ $trip->id }}">
                                                        Berangkat
                                                    </button>
                                                @endif

                                                @if ($trip->status === 'scheduled')
                                                    <button type="button"
                                                            class="trip-planning-action-btn trip-planning-action-btn--danger"
                                                            data-action="tidak-berangkat"
                                                            data-trip-id="{{ $trip->id }}"
                                                            data-testid="btn-tidak-berangkat-{{ $trip->id }}">
                                                        Tidak Berangkat
                                                    </button>
                                                @endif

                                                @if ($trip->status === 'keluar_trip' && $trip->keluar_trip_substatus === 'out')
                                                    <button type="button"
                                                            class="trip-planning-action-btn trip-planning-action-btn--neutral"
                                                            data-action="waiting-list"
                                                            data-trip-id="{{ $trip->id }}"
                                                            data-testid="btn-waiting-list-{{ $trip->id }}">
                                                        Waiting List
                                                    </button>
                                                    <button type="button"
                                                            class="trip-planning-action-btn trip-planning-action-btn--neutral"
                                                            data-action="tidak-keluar-trip"
                                                            data-trip-id="{{ $trip->id }}"
                                                            data-testid="btn-tidak-keluar-trip-{{ $trip->id }}">
                                                        Tidak Keluar Trip
                                                    </button>
                                                @endif

                                                @if ($trip->status === 'keluar_trip' && $trip->keluar_trip_substatus === 'waiting_list')
                                                    <button type="button"
                                                            class="trip-planning-action-btn trip-planning-action-btn--success"
                                                            data-action="returning"
                                                            data-trip-id="{{ $trip->id }}"
                                                            data-testid="btn-returning-{{ $trip->id }}">
                                                        Returning
                                                    </button>
                                                @endif
                                                {{-- keluar-trip + ganti-jam (modal form actions) defer ke Fase E3 --}}
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                @endif
            </section>
        </div>
    </section>
@endsection
