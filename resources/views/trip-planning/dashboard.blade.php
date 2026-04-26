@extends('layouts.dashboard')

@php
    $formatPp = static fn ($value): string => number_format((float) $value, 1, ',', '.');
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
                            class="dashboard-ghost-button"
                            data-action="open-create-trip-modal"
                            data-testid="trip-planning-create-trip-btn">
                        Buat Trip
                    </button>
                    <button type="button"
                            class="dashboard-primary-button"
                            data-action="open-generate-trips-modal"
                            data-testid="trip-planning-generate-trips-btn">
                        Generate Trips
                    </button>

                    {{-- E5 PR #5: Reset Data dropdown trigger (Admin + Super Admin) --}}
                    <div class="trip-planning-reset-wrapper" data-testid="trip-planning-reset-wrapper">
                        <button type="button"
                                class="dashboard-ghost-button dashboard-ghost-button--danger"
                                data-action="open-reset-menu"
                                id="trip-planning-reset-trigger"
                                data-testid="trip-planning-reset-btn">
                            Reset Data &#9662;
                        </button>
                        <div class="trip-planning-reset-menu" id="trip-planning-reset-menu" hidden>
                            <button type="button" class="trip-planning-reset-menu-item" data-action="open-reset-today-modal" data-testid="trip-planning-reset-today-btn">
                                Reset Hari Ini
                            </button>
                            @auth
                                @if (auth()->user()->isSuperAdmin())
                                    <button type="button" class="trip-planning-reset-menu-item trip-planning-reset-menu-item--danger" data-action="open-reset-all-modal" data-testid="trip-planning-reset-all-btn">
                                        Reset Semua
                                    </button>
                                @endif
                            @endauth
                        </div>
                    </div>
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
                        <p><span data-testid="trip-planning-trip-counter">{{ count($trips) }}</span> trip terjadwal untuk {{ $targetDate->format('d M Y') }}</p>
                    </div>
                </div>

                <div class="trip-planning-two-column-grid">
                    {{-- KOLOM KIRI — KEBERANGKATAN (ROHUL → PKB) --}}
                    <div class="trip-planning-direction-column" data-testid="trip-planning-column-keberangkatan">
                        <div class="trip-planning-direction-column-head">
                            <h4>Keberangkatan</h4>
                            <p class="trip-planning-direction-column-subtitle">ROHUL → PKB</p>
                        </div>

                        @php
                            $keberangkatanTrips = $trips
                                ->where('direction', 'ROHUL_TO_PKB')
                                ->sortBy(fn ($trip) => $trip->trip_time ?? '99:99:99')
                                ->values();
                        @endphp

                        @if ($keberangkatanTrips->isEmpty())
                            <div class="dashboard-empty-state dashboard-empty-state--block" data-testid="empty-state-keberangkatan">
                                Belum ada trip Keberangkatan
                            </div>
                        @else
                            <div class="trip-planning-trips-table-wrap">
                                <table class="trip-planning-trips-table" data-testid="trip-planning-trips-table-keberangkatan">
                                    <thead>
                                        <tr>
                                            <th>Mobil</th>
                                            <th>Driver</th>
                                            <th>Jam</th>
                                            <th>Seq</th>
                                            <th>Status</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($keberangkatanTrips as $trip)
                                            <tr data-trip-id="{{ $trip->id }}" data-testid="trip-row-{{ $trip->id }}">
                                                <td>{{ $trip->mobil?->kode_mobil ?? '-' }}</td>
                                                <td>{{ $trip->driver?->nama ?? '-' }}</td>
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
                                                        @include('trip-planning.partials._trip-action-buttons', ['trip' => $trip, 'pairedOriginIds' => $pairedOriginIds])
                                                    </div>
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                        @endif
                    </div>

                    {{-- KOLOM KANAN — KEPULANGAN (PKB → ROHUL) --}}
                    <div class="trip-planning-direction-column" data-testid="trip-planning-column-kepulangan">
                        <div class="trip-planning-direction-column-head">
                            <h4>Kepulangan</h4>
                            <p class="trip-planning-direction-column-subtitle">PKB → ROHUL</p>
                        </div>

                        @php
                            $kepulanganTrips = $trips
                                ->where('direction', 'PKB_TO_ROHUL')
                                ->sortBy(fn ($trip) => $trip->trip_time ?? '99:99:99')
                                ->values();
                        @endphp

                        @if ($kepulanganTrips->isEmpty())
                            <div class="dashboard-empty-state dashboard-empty-state--block" data-testid="empty-state-kepulangan">
                                Belum ada trip Kepulangan
                            </div>
                        @else
                            <div class="trip-planning-trips-table-wrap">
                                <table class="trip-planning-trips-table" data-testid="trip-planning-trips-table-kepulangan">
                                    <thead>
                                        <tr>
                                            <th>Mobil</th>
                                            <th>Driver</th>
                                            <th>Jam</th>
                                            <th>Seq</th>
                                            <th>Status</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach ($kepulanganTrips as $trip)
                                            <tr data-trip-id="{{ $trip->id }}" data-testid="trip-row-{{ $trip->id }}">
                                                <td>{{ $trip->mobil?->kode_mobil ?? '-' }}</td>
                                                <td>{{ $trip->driver?->nama ?? '-' }}</td>
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
                                                        @include('trip-planning.partials._trip-action-buttons', ['trip' => $trip, 'pairedOriginIds' => $pairedOriginIds])
                                                    </div>
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                        @endif
                    </div>
                </div>
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

        <div class="modal-shell" id="trip-planning-same-day-return-modal" hidden>
            <div class="modal-backdrop" data-modal-close="trip-planning-same-day-return-modal"></div>

            <div class="modal-card">
                <div class="modal-head">
                    <div>
                        <h3>Pulang Hari Ini</h3>
                        <p class="trip-planning-modal-subtitle">
                            Buat trip pulang PKB → ROHUL di hari yang sama untuk mobil ini.
                        </p>
                    </div>
                    <button type="button" class="modal-close" data-modal-close="trip-planning-same-day-return-modal" aria-label="Tutup">
                        &times;
                    </button>
                </div>

                <form id="trip-planning-same-day-return-form" class="modal-form" data-testid="trip-planning-same-day-return-form">
                    <input type="hidden" id="trip-planning-sdr-trip-id" value="">

                    <div>
                        <label class="trip-planning-modal-label">Trip asal</label>
                        <p class="trip-planning-modal-readonly" id="trip-planning-sdr-origin-display">—</p>
                    </div>

                    <div>
                        <label for="trip-planning-sdr-slot" class="trip-planning-modal-label">
                            Jam pulang <span class="trip-planning-modal-required">*</span>
                        </label>
                        <select id="trip-planning-sdr-slot" name="slot" required data-testid="input-sdr-slot">
                            <option value="">Pilih slot jam pulang...</option>
                            <option value="05:30:00">05:30</option>
                            <option value="07:00:00">07:00</option>
                            <option value="09:00:00">09:00</option>
                            <option value="13:00:00">13:00</option>
                            <option value="16:00:00">16:00</option>
                            <option value="19:00:00">19:00</option>
                        </select>
                    </div>

                    <div>
                        <label for="trip-planning-sdr-driver" class="trip-planning-modal-label">
                            Sopir pulang <span class="trip-planning-modal-hint">(default: sopir trip asal)</span>
                        </label>
                        <select id="trip-planning-sdr-driver" name="driver_id" data-testid="input-sdr-driver">
                            <option value="">— Pakai sopir trip asal —</option>
                            {{-- Options di-populate via JS dari dashboardState.drivers --}}
                        </select>
                    </div>

                    <div>
                        <label for="trip-planning-sdr-reason" class="trip-planning-modal-label">
                            Alasan <span class="trip-planning-modal-hint">(opsional, max 64 karakter)</span>
                        </label>
                        <input type="text"
                               id="trip-planning-sdr-reason"
                               name="reason"
                               maxlength="64"
                               list="trip-planning-sdr-reason-suggestions"
                               placeholder="Contoh: coverage_gap, load_balance, ..."
                               data-testid="input-sdr-reason">
                        <datalist id="trip-planning-sdr-reason-suggestions">
                            <option value="coverage_gap">
                            <option value="load_balance">
                            <option value="customer_request">
                            <option value="other">
                        </datalist>
                    </div>

                    <div>
                        <label for="trip-planning-sdr-note" class="trip-planning-modal-label">
                            Catatan <span class="trip-planning-modal-hint">(opsional, max 1000 karakter)</span>
                        </label>
                        <textarea id="trip-planning-sdr-note"
                                  name="note"
                                  maxlength="1000"
                                  rows="3"
                                  data-testid="input-sdr-note"></textarea>
                    </div>

                    <div class="modal-actions">
                        <button type="button" class="dashboard-ghost-button" data-modal-close="trip-planning-same-day-return-modal">Batal</button>
                        <button type="submit" class="dashboard-primary-button" id="trip-planning-sdr-submit" data-testid="btn-submit-sdr">
                            Buat Trip Pulang
                        </button>
                    </div>
                </form>
            </div>
        </div>

        {{-- E5 PR #2: Modal Edit Trip (hybrid — minimal default + advanced toggle) --}}
        <div class="modal-shell" id="trip-planning-edit-trip-modal" hidden>
            <div class="modal-backdrop" data-modal-close="trip-planning-edit-trip-modal"></div>

            <div class="modal-card">
                <div class="modal-head">
                    <div>
                        <h3>Edit Trip</h3>
                        <p class="trip-planning-modal-subtitle" id="trip-planning-edit-trip-subtitle">
                            Ubah data trip ini.
                        </p>
                    </div>
                    <button type="button" class="modal-close" data-modal-close="trip-planning-edit-trip-modal" aria-label="Tutup">
                        &times;
                    </button>
                </div>

                <form id="trip-planning-edit-trip-form" class="modal-form" data-testid="trip-planning-edit-trip-form">
                    <input type="hidden" id="trip-planning-edit-trip-id" value="">
                    <input type="hidden" id="trip-planning-edit-trip-version" value="">

                    <div>
                        <label for="trip-planning-edit-trip-time">Jam Keberangkatan</label>
                        <input type="time" id="trip-planning-edit-trip-time" name="trip_time" step="1" required data-testid="input-edit-trip-time">
                        <small class="trip-planning-modal-hint-block">Format HH:MM:SS</small>
                    </div>

                    <div>
                        <label for="trip-planning-edit-trip-mobil">Mobil</label>
                        <select id="trip-planning-edit-trip-mobil" name="mobil_id" required data-testid="input-edit-trip-mobil">
                            <option value="">Pilih mobil...</option>
                            @foreach ($mobilList ?? [] as $mobil)
                                <option value="{{ $mobil->id }}">{{ $mobil->kode_mobil }}</option>
                            @endforeach
                        </select>
                    </div>

                    <div>
                        <label for="trip-planning-edit-trip-driver">Driver</label>
                        <select id="trip-planning-edit-trip-driver" name="driver_id" required data-testid="input-edit-trip-driver">
                            <option value="">Pilih driver...</option>
                            @foreach ($driverList ?? [] as $driver)
                                <option value="{{ $driver->id }}">{{ $driver->nama }}</option>
                            @endforeach
                        </select>
                    </div>

                    <button type="button"
                            class="trip-planning-advanced-toggle"
                            id="trip-planning-edit-trip-advanced-toggle"
                            data-expanded="false"
                            data-testid="btn-edit-trip-advanced-toggle">
                        <span class="trip-planning-advanced-toggle-icon" aria-hidden="true">&#9654;</span>
                        <span class="trip-planning-advanced-toggle-label">Tampilkan opsi lanjutan</span>
                    </button>

                    <div id="trip-planning-edit-trip-advanced-fields" hidden>
                        <div>
                            <label for="trip-planning-edit-trip-date">Tanggal</label>
                            <input type="date" id="trip-planning-edit-trip-date" name="trip_date" data-testid="input-edit-trip-date">
                        </div>

                        <div>
                            <label for="trip-planning-edit-trip-direction">Arah</label>
                            <select id="trip-planning-edit-trip-direction" name="direction" data-testid="input-edit-trip-direction">
                                <option value="PKB_TO_ROHUL">PKB &rarr; ROHUL</option>
                                <option value="ROHUL_TO_PKB">ROHUL &rarr; PKB</option>
                            </select>
                        </div>

                        <div>
                            <label for="trip-planning-edit-trip-sequence">Sequence</label>
                            <input type="number" id="trip-planning-edit-trip-sequence" name="sequence" min="1" data-testid="input-edit-trip-sequence">
                            <small class="trip-planning-modal-hint-block">Urutan trip di slot. Edit manual TIDAK auto-shift sequence trip lain.</small>
                        </div>
                    </div>

                    <div class="modal-actions">
                        <button type="button" class="dashboard-ghost-button" data-modal-close="trip-planning-edit-trip-modal">Batal</button>
                        <button type="submit" class="dashboard-primary-button" id="trip-planning-edit-trip-submit" data-testid="btn-submit-edit-trip">
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>

        {{-- E5 PR #2: Modal Delete Trip (warn bookings count) --}}
        <div class="modal-shell" id="trip-planning-delete-trip-modal" hidden>
            <div class="modal-backdrop" data-modal-close="trip-planning-delete-trip-modal"></div>

            <div class="modal-card">
                <div class="modal-head">
                    <div>
                        <h3>Hapus Trip</h3>
                        <p class="trip-planning-modal-subtitle" id="trip-planning-delete-trip-subtitle">
                            Konfirmasi penghapusan trip.
                        </p>
                    </div>
                    <button type="button" class="modal-close" data-modal-close="trip-planning-delete-trip-modal" aria-label="Tutup">
                        &times;
                    </button>
                </div>

                <form id="trip-planning-delete-trip-form" class="modal-form" data-testid="trip-planning-delete-trip-form">
                    <input type="hidden" id="trip-planning-delete-trip-id" value="">
                    <input type="hidden" id="trip-planning-delete-trip-version" value="">

                    <div>
                        <label>Detail Trip</label>
                        <p class="trip-planning-modal-readonly" id="trip-planning-delete-trip-detail">&mdash;</p>
                    </div>

                    <div id="trip-planning-delete-trip-bookings-info" class="trip-planning-modal-warning" hidden data-testid="delete-trip-bookings-info">
                        <strong>&#9888; Trip ini punya <span id="trip-planning-delete-trip-bookings-count">0</span> booking aktif.</strong>
                        <p>Booking akan kehilangan link ke trip ini (jadi orphan dengan trip_id=NULL). Lanjutkan?</p>
                    </div>

                    <div id="trip-planning-delete-trip-no-bookings-info" hidden>
                        <p class="trip-planning-modal-readonly">Tidak ada booking ter-link ke trip ini.</p>
                    </div>

                    <div class="modal-actions">
                        <button type="button" class="dashboard-ghost-button" data-modal-close="trip-planning-delete-trip-modal">Batal</button>
                        <button type="submit" class="dashboard-primary-button dashboard-primary-button--danger" id="trip-planning-delete-trip-submit" data-testid="btn-submit-delete-trip">
                            Hapus Trip
                        </button>
                    </div>
                </form>
            </div>
        </div>

        {{-- E5 PR #3: Modal Create Trip Manual (form lengkap 6 field) --}}
        <div class="modal-shell" id="trip-planning-create-trip-modal" hidden>
            <div class="modal-backdrop" data-modal-close="trip-planning-create-trip-modal"></div>

            <div class="modal-card">
                <div class="modal-head">
                    <div>
                        <h3>Buat Trip Manual</h3>
                        <p class="trip-planning-modal-subtitle">
                            Tambah trip ad-hoc di luar generate otomatis. Maksimal H+30 hari dari hari ini.
                        </p>
                    </div>
                    <button type="button" class="modal-close" data-modal-close="trip-planning-create-trip-modal" aria-label="Tutup">
                        &times;
                    </button>
                </div>

                <form id="trip-planning-create-trip-form" class="modal-form" data-testid="trip-planning-create-trip-form">
                    <div>
                        <label for="trip-planning-create-trip-date">Tanggal</label>
                        <input type="date" id="trip-planning-create-trip-date" name="trip_date" required data-testid="input-create-trip-date">
                        <small class="trip-planning-modal-hint-block">Default: tanggal dashboard. Maksimal H+30 hari.</small>
                    </div>

                    <div>
                        <label for="trip-planning-create-trip-time">Jam Keberangkatan</label>
                        <input type="time" id="trip-planning-create-trip-time" name="trip_time" step="1" required data-testid="input-create-trip-time">
                        <small class="trip-planning-modal-hint-block">Format HH:MM:SS</small>
                    </div>

                    <div>
                        <label for="trip-planning-create-trip-direction">Arah</label>
                        <select id="trip-planning-create-trip-direction" name="direction" required data-testid="input-create-trip-direction">
                            <option value="PKB_TO_ROHUL">PKB &rarr; ROHUL</option>
                            <option value="ROHUL_TO_PKB">ROHUL &rarr; PKB</option>
                        </select>
                    </div>

                    <div>
                        <label for="trip-planning-create-trip-mobil">Mobil</label>
                        <select id="trip-planning-create-trip-mobil" name="mobil_id" required data-testid="input-create-trip-mobil">
                            <option value="">Pilih mobil...</option>
                            @foreach ($mobilList ?? [] as $mobil)
                                <option value="{{ $mobil->id }}">{{ $mobil->kode_mobil }}</option>
                            @endforeach
                        </select>
                    </div>

                    <div>
                        <label for="trip-planning-create-trip-driver">Driver</label>
                        <select id="trip-planning-create-trip-driver" name="driver_id" required data-testid="input-create-trip-driver">
                            <option value="">Pilih driver...</option>
                            @foreach ($driverList ?? [] as $driver)
                                <option value="{{ $driver->id }}">{{ $driver->nama }}</option>
                            @endforeach
                        </select>
                    </div>

                    <div>
                        <label for="trip-planning-create-trip-sequence">Sequence (opsional)</label>
                        <input type="number" id="trip-planning-create-trip-sequence" name="sequence" min="1" placeholder="Kosongkan untuk auto-assign" data-testid="input-create-trip-sequence">
                        <small class="trip-planning-modal-hint-block">Kosongkan untuk auto-assign next sequence di slot direction.</small>
                    </div>

                    <div class="modal-actions">
                        <button type="button" class="dashboard-ghost-button" data-modal-close="trip-planning-create-trip-modal">Batal</button>
                        <button type="submit" class="dashboard-primary-button" id="trip-planning-create-trip-submit" data-testid="btn-submit-create-trip">
                            Buat Trip
                        </button>
                    </div>
                </form>
            </div>
        </div>

        {{-- E5 PR #5: Modal Reset Hari Ini --}}
        <div class="modal-shell" id="trip-planning-reset-today-modal" hidden>
            <div class="modal-backdrop" data-modal-close="trip-planning-reset-today-modal"></div>
            <div class="modal-card">
                <div class="modal-head">
                    <div>
                        <h3>Reset Data Hari Ini</h3>
                        <p class="trip-planning-modal-subtitle">
                            Semua pin (jam + loket) dan trip status "scheduled" untuk tanggal ini akan dihapus.
                            Trip yang sudah berangkat / keluar trip TIDAK terpengaruh.
                        </p>
                    </div>
                    <button type="button" class="modal-close" data-modal-close="trip-planning-reset-today-modal" aria-label="Tutup">&times;</button>
                </div>
                <div class="modal-form">
                    <div class="trip-planning-modal-warning">
                        <strong>&#9888; Yakin mau reset?</strong>
                        <p>Aksi ini tidak bisa di-undo. Tapi trip historis (status berangkat) tetap aman.</p>
                    </div>
                    <div class="modal-actions">
                        <button type="button" class="dashboard-ghost-button" data-modal-close="trip-planning-reset-today-modal">Batal</button>
                        <button type="button" class="dashboard-primary-button dashboard-primary-button--danger" id="trip-planning-reset-today-submit" data-testid="btn-submit-reset-today">
                            Reset Sekarang
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {{-- E5 PR #5: Modal Reset Semua (Super Admin only) --}}
        @auth
            @if (auth()->user()->isSuperAdmin())
                <div class="modal-shell" id="trip-planning-reset-all-modal" hidden>
                    <div class="modal-backdrop" data-modal-close="trip-planning-reset-all-modal"></div>
                    <div class="modal-card">
                        <div class="modal-head">
                            <div>
                                <h3>Reset Semua Data Trip Planning</h3>
                                <p class="trip-planning-modal-subtitle">
                                    SEMUA pin lintas tanggal dan trip status "scheduled" akan dihapus.
                                    Trip historis (berangkat) tetap aman.
                                </p>
                            </div>
                            <button type="button" class="modal-close" data-modal-close="trip-planning-reset-all-modal" aria-label="Tutup">&times;</button>
                        </div>
                        <div class="modal-form">
                            <div class="trip-planning-modal-warning">
                                <strong>&#9888; Aksi destructive global</strong>
                                <p>JSON snapshot otomatis disimpan ke audit log sebelum reset. Lanjutkan?</p>
                            </div>
                            <div class="modal-actions">
                                <button type="button" class="dashboard-ghost-button" data-modal-close="trip-planning-reset-all-modal">Batal</button>
                                <button type="button" class="dashboard-primary-button dashboard-primary-button--danger" id="trip-planning-reset-all-submit" data-testid="btn-submit-reset-all">
                                    Reset Semua
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            @endif
        @endauth
    </section>
@endsection
