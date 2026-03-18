@extends('layouts.dashboard')

@section('content')
    <section class="regular-booking-page animate-fade-in">
        <section class="regular-booking-page-header">
            <div class="regular-booking-page-copy">
                <h1>Data Penumpang</h1>
                <p>Masukkan nama dan nomor HP pemesan. Data ini akan digunakan untuk seluruh 6 kursi dropping.</p>
            </div>

            <div class="regular-booking-page-actions">
                <span class="stock-value-badge stock-value-badge-emerald">Langkah 2 dari 3</span>
            </div>
        </section>

        @include('dropping-bookings.partials.stepper', ['steps' => $steps])

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
                    <span class="regular-booking-feedback-label">Periksa Data Penumpang</span>
                    <p>Nama dan nomor HP wajib dilengkapi.</p>
                </div>
            </section>
        @endif

        <div class="regular-booking-layout">
            <form method="POST" action="{{ route('dropping-bookings.passengers.store') }}" class="regular-booking-form-card">
                @csrf

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Data Pemesan Dropping</h2>
                        <p>Cukup isi satu data pemesan. Nama dan nomor HP ini akan dicatat untuk seluruh 6 kursi (1A, 2A, 2B, 3A, 4A, 5A).</p>
                    </div>

                    <div class="regular-booking-passenger-list">
                        <section class="regular-booking-passenger-card">
                            <div class="regular-booking-passenger-card-head">
                                <div>
                                    <h3>Pemesan</h3>
                                    <p>Data ini akan dipakai pada tahap review pemesanan dropping.</p>
                                </div>

                                <span class="stock-value-badge stock-value-badge-emerald">Semua Kursi (1A – 5A)</span>
                            </div>

                            <div class="regular-booking-grid">
                                <div class="regular-booking-field">
                                    <label for="dropping-passenger-name">Nama Penumpang</label>
                                    <div class="regular-booking-input-shell">
                                        <span class="regular-booking-input-icon" aria-hidden="true">
                                            <svg viewBox="0 0 24 24" fill="none">
                                                <path d="M16 21V19C16 17.3431 14.6569 16 13 16H7C5.34315 16 4 17.3431 4 19V21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                                <circle cx="10" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/>
                                                <path d="M20 21V19C20 17.5978 19.0344 16.4215 17.7324 16.0996" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                                <path d="M14.5 4.23408C15.9658 4.86569 17 6.32446 17 8.02487C17 9.72529 15.9658 11.1841 14.5 11.8157" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                            </svg>
                                        </span>
                                        <input
                                            id="dropping-passenger-name"
                                            type="text"
                                            name="passenger_name"
                                            value="{{ $passengerFormState['name'] }}"
                                            placeholder="Masukkan nama penumpang"
                                            required
                                        >
                                    </div>

                                    @error('passenger_name')
                                        <p class="regular-booking-field-error">{{ $message }}</p>
                                    @enderror
                                </div>

                                <div class="regular-booking-field">
                                    <label for="dropping-passenger-phone">No HP</label>
                                    <div class="regular-booking-input-shell">
                                        <span class="regular-booking-input-icon" aria-hidden="true">
                                            <svg viewBox="0 0 24 24" fill="none">
                                                <path d="M6.6 10.8C8.28 14.1 10.9 16.72 14.2 18.4L16.76 15.84C17.08 15.52 17.56 15.42 17.98 15.58C19.34 16.03 20.8 16.28 22.3 16.28C22.8 16.28 23.2 16.68 23.2 17.18V21.2C23.2 21.7 22.8 22.1 22.3 22.1C10.2 22.1 0.5 12.4 0.5 0.3C0.5 -0.2 0.9 -0.6 1.4 -0.6H5.42C5.92 -0.6 6.32 -0.2 6.32 0.3C6.32 1.8 6.57 3.26 7.02 4.62C7.18 5.04 7.08 5.52 6.76 5.84L4.2 8.4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" transform="translate(0.15 1.25)"/>
                                            </svg>
                                        </span>
                                        <input
                                            id="dropping-passenger-phone"
                                            type="tel"
                                            name="passenger_phone"
                                            value="{{ $passengerFormState['phone'] }}"
                                            placeholder="Contoh: 081234567890"
                                            inputmode="numeric"
                                            required
                                        >
                                    </div>
                                    <p class="regular-booking-field-note">Nomor HP akan disimpan dalam format nomor Indonesia yang rapi.</p>

                                    @error('passenger_phone')
                                        <p class="regular-booking-field-error">{{ $message }}</p>
                                    @enderror
                                </div>
                            </div>
                        </section>
                    </div>
                </section>

                <div class="regular-booking-form-actions">
                    <a href="{{ route('dropping-bookings.index') }}" class="dashboard-ghost-button">Kembali</a>
                    <button class="dashboard-primary-button" type="submit">Lanjut ke Review Pemesanan</button>
                </div>
            </form>

            <aside class="regular-booking-sidebar">
                <section class="regular-booking-summary-card">
                    <div class="regular-booking-summary-head">
                        <h2>Ringkasan Dropping</h2>
                        <p>Pastikan data pemesan sudah benar sebelum lanjut ke tahap review.</p>
                    </div>

                    <div class="regular-booking-summary-grid">
                        <div class="regular-booking-summary-item">
                            <span>Jumlah Kursi</span>
                            <strong>{{ $passengerFormState['required_count'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Kursi Dipesan</span>
                            <strong>{{ $draftSummary['selected_seats'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Rute</span>
                            <strong>{{ $draftSummary['route'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Jam Keberangkatan</span>
                            <strong>{{ $draftSummary['departure_time'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Tarif Final</span>
                            <strong>{{ $draftSummary['fare_amount'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Estimasi Total</span>
                            <strong>{{ $draftSummary['estimated_total'] }}</strong>
                        </div>
                    </div>
                </section>
            </aside>
        </div>
    </section>
@endsection
