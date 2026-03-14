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
                        <p>Pilih tepat {{ $seatSelectionState['required_seat_count'] }} kursi. Kursi 2B ditandai sebagai kursi opsional untuk penumpang ke-6.</p>
                    </div>

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
                            <span class="regular-booking-seat-legend-chip is-disabled"></span>
                            <span>Tidak tersedia sementara</span>
                        </div>
                    </div>

                    <div class="regular-booking-vehicle-shell">
                        <div class="regular-booking-vehicle-head">
                            <span>Arah depan kendaraan</span>
                            <span>Posisi kursi penumpang</span>
                        </div>

                        <div class="regular-booking-vehicle-layout" role="group" aria-label="Pilihan kursi reguler">
                            @foreach ($seatLayout as $seat)
                                @if ($seat['kind'] === 'driver')
                                    <article class="regular-booking-driver-panel" data-area="{{ $seat['area'] }}">
                                        <div class="regular-booking-driver-wheel" aria-hidden="true">
                                            <svg viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="7" stroke="currentColor" stroke-width="1.8"/>
                                                <circle cx="12" cy="12" r="2.2" stroke="currentColor" stroke-width="1.8"/>
                                                <path d="M12 5V9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                                <path d="M6 13H9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                                <path d="M15 13H18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                            </svg>
                                        </div>
                                        <strong>{{ $seat['label'] }}</strong>
                                        <span>{{ $seat['description'] }}</span>
                                    </article>
                                @else
                                    <label
                                        class="regular-booking-seat-card{{ $seat['is_selected'] ? ' is-selected' : '' }}{{ $seat['is_optional'] ? ' is-optional' : '' }}"
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
                                        >

                                        <span class="regular-booking-seat-card-inner">
                                            <span class="regular-booking-seat-card-head">
                                                <strong>{{ $seat['label'] }}</strong>

                                                @if ($seat['is_optional'])
                                                    <span class="stock-value-badge stock-value-badge-blue">Opsional</span>
                                                @endif
                                            </span>
                                            <span class="regular-booking-seat-card-copy">{{ $seat['description'] }}</span>
                                        </span>
                                    </label>
                                @endif
                            @endforeach
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
                        <li>Kursi 2B disediakan sebagai kursi opsional dan akan otomatis ikut terpakai saat jumlah penumpang mencapai 6 orang.</li>
                        <li>Ketika jumlah kursi yang dipilih sudah penuh, kursi lain akan dinonaktifkan sementara sampai ada kursi yang dibatalkan.</li>
                    </ul>
                </section>
            </aside>
        </div>
    </section>
@endsection
