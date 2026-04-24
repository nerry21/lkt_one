@extends('layouts.dashboard')

@section('content')
    <section
        class="regular-booking-page animate-fade-in"
        data-regular-booking-seat-page
        data-required-seat-count="{{ $seatSelectionState['required_seat_count'] }}"
    >
        <section class="regular-booking-page-header">
            <div class="regular-booking-page-copy">
                <h1>Pilih Kursi</h1>
                <p>Pilih kursi sesuai jumlah penumpang pada booking draft sebelum melanjutkan ke data penumpang.</p>
            </div>

            <div class="regular-booking-page-actions">
                <span class="stock-value-badge stock-value-badge-emerald">Langkah 2 dari 4</span>
            </div>
        </section>

        @include('regular-bookings.partials.stepper', ['steps' => $steps])

        @if ($flashSuccess)
            <section class="regular-booking-feedback-card">
                <div class="regular-booking-feedback-copy">
                    <span class="stock-value-badge stock-value-badge-emerald">Berhasil</span>
                    <p>{{ $flashSuccess }}</p>
                </div>
            </section>
        @endif

        @if ($flashNotice)
            <section class="regular-booking-feedback-card">
                <div class="regular-booking-feedback-copy">
                    <span class="stock-value-badge stock-value-badge-blue">Informasi</span>
                    <p>{{ $flashNotice }}</p>
                </div>
            </section>
        @endif

        @if ($errors->any())
            <section class="regular-booking-feedback-card regular-booking-feedback-card--error">
                <div class="regular-booking-feedback-copy">
                    <span class="regular-booking-feedback-label">Periksa Pilihan Kursi</span>
                    <p>Jumlah kursi yang dipilih harus sesuai dengan jumlah penumpang pada langkah informasi pemesanan.</p>
                </div>
            </section>
        @endif

        <div class="regular-booking-layout">
            <form method="POST" action="{{ route('regular-bookings.seats.store') }}" class="regular-booking-form-card">
                @csrf

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Penampang Kursi Mobil</h2>
                        <p>Pilih tepat {{ $seatSelectionState['required_seat_count'] }} kursi. Kursi 2B (opsional) hanya bisa dipilih oleh Admin atau Super Admin.</p>
                    </div>

                    <article class="regular-booking-seat-trip-card">
                        <div class="regular-booking-seat-trip-card-head">
                            <div class="regular-booking-seat-trip-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M5 14L6.4 8.9C6.76 7.59 7.95 6.67 9.31 6.67H14.69C16.05 6.67 17.24 7.59 17.6 8.9L19 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4.75 14H19.25C19.66 14 20 14.34 20 14.75V16.75C20 17.16 19.66 17.5 19.25 17.5H18.5V18.25C18.5 18.66 18.16 19 17.75 19H16.75C16.34 19 16 18.66 16 18.25V17.5H8V18.25C8 18.66 7.66 19 7.25 19H6.25C5.84 19 5.5 18.66 5.5 18.25V17.5H4.75C4.34 17.5 4 17.16 4 16.75V14.75C4 14.34 4.34 14 4.75 14Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                                    <circle cx="7.5" cy="15.75" r="1" fill="currentColor"/>
                                    <circle cx="16.5" cy="15.75" r="1" fill="currentColor"/>
                                </svg>
                            </div>

                            <div class="regular-booking-seat-trip-copy">
                                <div class="regular-booking-seat-trip-title-row">
                                    <h3>Armada Reguler</h3>
                                    <strong>{{ $draftSummary['fare_amount'] }}</strong>
                                </div>

                                <div class="regular-booking-seat-trip-meta">
                                    <span>{{ $draftSummary['departure_time'] }}</span>
                                    <span>{{ $draftSummary['passenger_count'] }}</span>
                                    <span>{{ $draftSummary['route'] }}</span>
                                </div>
                            </div>
                        </div>

                        <p class="regular-booking-seat-trip-route">
                            {{ $draft['pickup_address'] }} - {{ $draft['dropoff_address'] }}
                        </p>
                    </article>

                    <div class="regular-booking-seat-legend" aria-label="Status kursi">
                        <div class="regular-booking-seat-legend-item">
                            <span class="regular-booking-seat-legend-chip"></span>
                            <span>Tersedia</span>
                        </div>
                        <div class="regular-booking-seat-legend-item">
                            <span class="regular-booking-seat-legend-chip is-selected"></span>
                            <span>Dipilih</span>
                        </div>
                        <div class="regular-booking-seat-legend-item">
                            <span class="regular-booking-seat-legend-chip is-occupied"></span>
                            <span>Sudah Terisi</span>
                        </div>
                        <div class="regular-booking-seat-legend-item">
                            <span class="regular-booking-seat-legend-chip is-disabled"></span>
                            <span>Tidak tersedia</span>
                        </div>
                    </div>

                    <div class="regular-booking-seat-stage">
                        <div class="regular-booking-vehicle-shell">
                            <div class="regular-booking-vehicle-head">
                                <span>Arah depan kendaraan</span>
                                <span>Kursi penumpang</span>
                            </div>

                            <div class="regular-booking-vehicle-layout" role="group" aria-label="Pilihan kursi reguler">
                                @foreach ($seatLayout as $seat)
                                    @if ($seat['kind'] === 'driver')
                                        <article class="regular-booking-driver-panel" data-area="{{ $seat['area'] }}">
                                            <span class="regular-booking-driver-shell" aria-hidden="true">
                                                <svg viewBox="0 0 80 90" fill="none">
                                                    <path d="M24 18C24 12.4772 28.4772 8 34 8H46C51.5228 8 56 12.4772 56 18V27H58C63.5228 27 68 31.4772 68 37V58C68 69.0457 59.0457 78 48 78H32C20.9543 78 12 69.0457 12 58V37C12 31.4772 16.4772 27 22 27H24V18Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
                                                    <path d="M31 58V64C31 68.4183 34.5817 72 39 72H41C45.4183 72 49 68.4183 49 64V58" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </span>

                                            <div class="regular-booking-driver-wheel" aria-hidden="true">
                                                <svg viewBox="0 0 24 24" fill="none">
                                                    <circle cx="12" cy="12" r="7" stroke="currentColor" stroke-width="1.8"/>
                                                    <circle cx="12" cy="12" r="2.2" stroke="currentColor" stroke-width="1.8"/>
                                                    <path d="M12 5V9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                                    <path d="M6 13H9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                                    <path d="M15 13H18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                                </svg>
                                            </div>
                                            <span class="regular-booking-driver-label">{{ $seat['label'] }}</span>
                                        </article>
                                    @elseif ($seat['code'] === '2B')
                                        @php
                                            $isLocked = ! ($isAdmin ?? false);
                                        @endphp
                                        <label
                                            class="regular-booking-seat-card{{ $seat['is_selected'] ? ' is-selected' : '' }}{{ ($seat['is_occupied'] ?? false) ? ' is-occupied' : '' }} is-optional{{ $isLocked ? ' is-admin-only-locked' : '' }}"
                                            data-seat-card
                                            data-seat-area="{{ $seat['area'] }}"
                                            data-seat-code="{{ $seat['code'] }}"
                                        >
                                            <input
                                                type="checkbox"
                                                name="seat_codes[]"
                                                value="{{ $seat['code'] }}"
                                                data-seat-input
                                                @checked($seat['is_selected'])
                                                @disabled(($seat['is_occupied'] ?? false) || $isLocked)
                                            >

                                            <span class="regular-booking-seat-admin-badge" data-role-level="{{ $isLocked ? 'locked' : 'admin' }}">ADMIN</span>

                                            <span class="regular-booking-seat-card-shell" aria-hidden="true">
                                                <svg viewBox="0 0 80 90" fill="none">
                                                    <path d="M24 18C24 12.4772 28.4772 8 34 8H46C51.5228 8 56 12.4772 56 18V27H58C63.5228 27 68 31.4772 68 37V58C68 69.0457 59.0457 78 48 78H32C20.9543 78 12 69.0457 12 58V37C12 31.4772 16.4772 27 22 27H24V18Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
                                                    <path d="M31 58V64C31 68.4183 34.5817 72 39 72H41C45.4183 72 49 68.4183 49 64V58" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </span>

                                            <span class="regular-booking-seat-card-inner">
                                                <strong>{{ $seat['label'] }}</strong>
                                                <span class="regular-booking-seat-card-tag">Opsional</span>
                                            </span>
                                        </label>
                                    @elseif ($seat['is_visible'] ?? true)
                                        <label
                                            class="regular-booking-seat-card{{ $seat['is_selected'] ? ' is-selected' : '' }}{{ ($seat['is_occupied'] ?? false) ? ' is-occupied' : '' }}{{ $seat['is_optional'] ? ' is-optional' : '' }}"
                                            data-seat-card
                                            data-seat-area="{{ $seat['area'] }}"
                                            data-seat-code="{{ $seat['code'] }}"
                                        >
                                            <input
                                                type="checkbox"
                                                name="seat_codes[]"
                                                value="{{ $seat['code'] }}"
                                                data-seat-input
                                                @checked($seat['is_selected'])
                                                @disabled($seat['is_occupied'] ?? false)
                                            >

                                            <span class="regular-booking-seat-card-shell" aria-hidden="true">
                                                <svg viewBox="0 0 80 90" fill="none">
                                                    <path d="M24 18C24 12.4772 28.4772 8 34 8H46C51.5228 8 56 12.4772 56 18V27H58C63.5228 27 68 31.4772 68 37V58C68 69.0457 59.0457 78 48 78H32C20.9543 78 12 69.0457 12 58V37C12 31.4772 16.4772 27 22 27H24V18Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
                                                    <path d="M31 58V64C31 68.4183 34.5817 72 39 72H41C45.4183 72 49 68.4183 49 64V58" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </span>

                                            <span class="regular-booking-seat-card-inner">
                                                <strong>{{ $seat['label'] }}</strong>

                                                @if ($seat['is_optional'])
                                                    <span class="regular-booking-seat-card-tag">Opsional</span>
                                                @endif
                                            </span>
                                        </label>
                                    @endif
                                @endforeach
                            </div>
                        </div>
                    </div>

                    <div class="regular-booking-seat-feedback" data-seat-feedback data-state="idle" aria-live="polite">
                        <div class="regular-booking-seat-feedback-copy">
                            <strong data-seat-feedback-title>Pilih kursi sesuai jumlah penumpang</strong>
                            <p data-seat-feedback-text>Jumlah kursi yang dipilih harus sama dengan jumlah penumpang pada booking draft.</p>
                        </div>
                    </div>

                    @error('seat_codes')
                        <p class="regular-booking-field-error">{{ $message }}</p>
                    @enderror

                    @if (! $errors->has('seat_codes') && $errors->has('seat_codes.*'))
                        <p class="regular-booking-field-error">{{ $errors->first('seat_codes.*') }}</p>
                    @endif
                </section>

                <div class="regular-booking-form-actions">
                    <a href="{{ route('regular-bookings.index') }}" class="dashboard-ghost-button">Kembali</a>
                    <button class="dashboard-primary-button" type="submit" data-seat-submit @disabled(! $seatSelectionState['can_continue'])>
                        Lanjut ke Data Penumpang
                    </button>
                </div>
            </form>

            <aside class="regular-booking-sidebar">
                <section class="regular-booking-summary-card">
                    <div class="regular-booking-summary-head">
                        <h2>Ringkasan Kursi</h2>
                        <p>Ringkasan ini diperbarui otomatis mengikuti kursi yang Anda pilih.</p>
                    </div>

                    <div class="regular-booking-summary-grid">
                        <div class="regular-booking-summary-item">
                            <span>Jumlah Penumpang</span>
                            <strong>{{ $draftSummary['passenger_count'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Jumlah Kursi Dipilih</span>
                            <strong data-seat-summary-count>{{ $seatSelectionState['selected_count'] }} dari {{ $seatSelectionState['required_seat_count'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Kursi Terpilih</span>
                            <strong data-seat-summary-list>{{ $seatSelectionState['selected_seats_label'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Sisa Kursi Wajib Dipilih</span>
                            <strong data-seat-summary-remaining>{{ $seatSelectionState['remaining_seat_count'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Rute</span>
                            <strong>{{ $draftSummary['route'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Tarif per Penumpang</span>
                            <strong>{{ $draftSummary['fare_amount'] }}</strong>
                        </div>
                    </div>
                </section>

                <section class="regular-booking-note-card">
                    <div class="regular-booking-note-head">
                        <h2>Catatan Pemilihan Kursi</h2>
                        <p>Aturan kursi mengikuti jumlah penumpang dari langkah informasi pemesanan.</p>
                    </div>

                    <ul class="regular-booking-note-list">
                        <li>Kursi 1A berada di sebelah supir.</li>
                        <li>Kursi 2B (opsional) diposisikan di tengah antara 2A dan 3A dan hanya dapat dipilih oleh Admin atau Super Admin.</li>
                        <li>Ketika jumlah kursi yang dipilih sudah penuh, kursi lain akan dinonaktifkan sementara sampai ada kursi yang dibatalkan.</li>
                    </ul>
                </section>
            </aside>
        </div>
    </section>
@endsection
