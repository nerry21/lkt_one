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
                    <a href="{{ route('trip-planning.assignments.view', ['date' => $targetDate->toDateString()]) }}"
                       class="dashboard-ghost-button"
                       data-testid="trip-planning-atur-assignments-btn">
                        Atur Assignments
                    </a>
                    <button type="button"
                            class="dashboard-primary-button"
                            data-action="open-generate-trips-modal"
                            data-testid="trip-planning-generate-trips-btn">
                        Generate Trips
                    </button>
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

                                                @if ($trip->status === 'scheduled')
                                                    <button type="button"
                                                            class="trip-planning-action-btn trip-planning-action-btn--neutral"
                                                            data-action="open-ganti-jam-modal"
                                                            data-trip-id="{{ $trip->id }}"
                                                            data-trip-time="{{ $trip->trip_time ?? '' }}"
                                                            data-testid="btn-ganti-jam-{{ $trip->id }}">
                                                        Ganti Jam
                                                    </button>
                                                    <button type="button"
                                                            class="trip-planning-action-btn trip-planning-action-btn--danger"
                                                            data-action="open-keluar-trip-modal"
                                                            data-trip-id="{{ $trip->id }}"
                                                            data-mobil-home-pool="{{ $trip->mobil->home_pool ?? '' }}"
                                                            data-testid="btn-keluar-trip-{{ $trip->id }}">
                                                        Keluar Trip
                                                    </button>
                                                @endif
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

        <div class="modal-shell" id="trip-planning-generate-trips-modal" hidden>
            <div class="modal-backdrop" data-modal-close="trip-planning-generate-trips-modal"></div>

            <div class="modal-card modal-card-compact">
                <div class="modal-head">
                    <div>
                        <h3>Generate Trips</h3>
                        <p class="trip-planning-modal-subtitle">
                            Scheduler biasanya generate otomatis jam 21:00 WIB. Gunakan ini hanya untuk manual trigger / re-run.
                        </p>
                    </div>
                    <button type="button" class="modal-close" data-modal-close="trip-planning-generate-trips-modal" aria-label="Tutup">
                        &times;
                    </button>
                </div>

                <div class="trip-planning-generate-modal-body">
                    <p>Generate trips untuk <strong>{{ $targetDate->translatedFormat('l, d F Y') }}</strong>?</p>
                    <p class="trip-planning-generate-modal-hint">
                        Trips akan dibuat berdasarkan assignment yang sudah tersimpan. Pastikan semua mobil aktif punya driver di halaman Assignments.
                    </p>
                </div>

                <div class="modal-actions">
                    <button type="button" class="dashboard-ghost-button" data-modal-close="trip-planning-generate-trips-modal">
                        Batal
                    </button>
                    <button type="button"
                            class="dashboard-primary-button"
                            id="trip-planning-generate-trips-confirm"
                            data-action="confirm-generate-trips"
                            data-testid="btn-confirm-generate-trips">
                        Generate
                    </button>
                </div>
            </div>
        </div>

        <div class="modal-shell" id="trip-planning-ganti-jam-modal" hidden>
            <div class="modal-backdrop" data-modal-close="trip-planning-ganti-jam-modal"></div>

            <div class="modal-card">
                <div class="modal-head">
                    <div>
                        <h3>Ganti Jam Trip</h3>
                        <p class="trip-planning-modal-subtitle" id="trip-planning-ganti-jam-subtitle">
                            Pilih slot baru untuk trip ini.
                        </p>
                    </div>
                    <button type="button" class="modal-close" data-modal-close="trip-planning-ganti-jam-modal" aria-label="Tutup">
                        &times;
                    </button>
                </div>

                <form id="trip-planning-ganti-jam-form" class="modal-form" data-testid="trip-planning-ganti-jam-form">
                    <input type="hidden" id="trip-planning-ganti-jam-trip-id" value="">

                    <div>
                        <label>Jam saat ini</label>
                        <p class="trip-planning-modal-readonly" id="trip-planning-ganti-jam-current-time">—</p>
                    </div>

                    <div>
                        <label for="trip-planning-ganti-jam-new-time">Jam baru</label>
                        <select id="trip-planning-ganti-jam-new-time" name="new_trip_time" required data-testid="input-ganti-jam-new-time">
                            <option value="">Pilih slot...</option>
                            <option value="05:30:00">05:30</option>
                            <option value="07:00:00">07:00</option>
                            <option value="09:00:00">09:00</option>
                            <option value="13:00:00">13:00</option>
                            <option value="16:00:00">16:00</option>
                            <option value="19:00:00">19:00</option>
                        </select>
                    </div>

                    <div class="modal-actions">
                        <button type="button" class="dashboard-ghost-button" data-modal-close="trip-planning-ganti-jam-modal">Batal</button>
                        <button type="submit" class="dashboard-primary-button" id="trip-planning-ganti-jam-submit" data-testid="btn-submit-ganti-jam">
                            Ganti Jam
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div class="modal-shell" id="trip-planning-keluar-trip-modal" hidden>
            <div class="modal-backdrop" data-modal-close="trip-planning-keluar-trip-modal"></div>

            <div class="modal-card">
                <div class="modal-head">
                    <div>
                        <h3>Keluar Trip</h3>
                        <p class="trip-planning-modal-subtitle">
                            Mobil keluar dari rotasi. Pilih alasan dan pool tujuan saat kembali.
                        </p>
                    </div>
                    <button type="button" class="modal-close" data-modal-close="trip-planning-keluar-trip-modal" aria-label="Tutup">
                        &times;
                    </button>
                </div>

                <form id="trip-planning-keluar-trip-form" class="modal-form" data-testid="trip-planning-keluar-trip-form">
                    <input type="hidden" id="trip-planning-keluar-trip-trip-id" value="">

                    <div>
                        <label class="trip-planning-modal-label">Reason <span class="trip-planning-modal-required">*</span></label>
                        <div class="trip-planning-radio-group" data-testid="input-keluar-trip-reason-group">
                            <label class="trip-planning-radio-option">
                                <input type="radio" name="reason" value="dropping" required data-testid="input-keluar-trip-reason-dropping">
                                <span>Dropping</span>
                            </label>
                            <label class="trip-planning-radio-option">
                                <input type="radio" name="reason" value="rental" required data-testid="input-keluar-trip-reason-rental">
                                <span>Rental</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label class="trip-planning-modal-label">Pool tujuan <span class="trip-planning-modal-required">*</span></label>
                        <div class="trip-planning-radio-group" data-testid="input-keluar-trip-pool-group">
                            <label class="trip-planning-radio-option">
                                <input type="radio" name="pool_target" value="PKB" required data-testid="input-keluar-trip-pool-pkb">
                                <span>PKB</span>
                            </label>
                            <label class="trip-planning-radio-option">
                                <input type="radio" name="pool_target" value="ROHUL" required data-testid="input-keluar-trip-pool-rohul">
                                <span>ROHUL</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label for="trip-planning-keluar-trip-end-date" class="trip-planning-modal-label">
                            <span id="trip-planning-keluar-trip-end-date-label-text">Planned end date</span>
                            <span class="trip-planning-modal-required" id="trip-planning-keluar-trip-end-date-asterisk" hidden>*</span>
                            <span class="trip-planning-modal-hint" id="trip-planning-keluar-trip-end-date-hint">(opsional untuk dropping)</span>
                        </label>
                        <input type="date"
                               id="trip-planning-keluar-trip-end-date"
                               name="planned_end_date"
                               data-testid="input-keluar-trip-end-date">
                    </div>

                    <div>
                        <label for="trip-planning-keluar-trip-note" class="trip-planning-modal-label">Catatan <span class="trip-planning-modal-hint">(opsional, max 1000)</span></label>
                        <textarea id="trip-planning-keluar-trip-note"
                                  name="note"
                                  maxlength="1000"
                                  rows="3"
                                  data-testid="input-keluar-trip-note"></textarea>
                    </div>

                    <div class="modal-actions">
                        <button type="button" class="dashboard-ghost-button" data-modal-close="trip-planning-keluar-trip-modal">Batal</button>
                        <button type="submit" class="dashboard-primary-button" id="trip-planning-keluar-trip-submit" data-testid="btn-submit-keluar-trip">
                            Konfirmasi Keluar Trip
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
@endsection
