@extends('layouts.dashboard')

@section('content')
    <section class="regular-booking-page animate-fade-in" data-regular-booking-page>
        <script id="regular-booking-route-matrix" type="application/json">@json($routeMatrix)</script>

        <section class="regular-booking-page-header">
            <div class="regular-booking-page-copy">
                <h1>Pemesanan Reguler</h1>
                <p>Lengkapi informasi awal perjalanan reguler sebelum melanjutkan ke langkah pilih kursi.</p>
            </div>

            <div class="regular-booking-page-actions">
                <span class="stock-value-badge stock-value-badge-emerald">Langkah 1 dari 4</span>
            </div>
        </section>

        @include('regular-bookings.partials.stepper', ['steps' => $steps])

        @if ($flashNotice)
            <section class="regular-booking-feedback-card">
                <div class="regular-booking-feedback-copy">
                    <span class="stock-value-badge stock-value-badge-emerald">Informasi</span>
                    <p>{{ $flashNotice }}</p>
                </div>
            </section>
        @endif

        @if ($errors->any())
            <section class="regular-booking-feedback-card regular-booking-feedback-card--error">
                <div class="regular-booking-feedback-copy">
                    <span class="regular-booking-feedback-label">Periksa Form</span>
                    <p>Masih ada data yang perlu diperbaiki sebelum Anda dapat melanjutkan ke langkah pilih kursi.</p>
                </div>
            </section>
        @endif

        <div class="regular-booking-layout">
            <form method="POST" action="{{ route('regular-bookings.information.store') }}" class="regular-booking-form-card">
                @csrf

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Jenis Pemesanan</h2>
                        <p>Pilih jenis pemesanan sesuai kebutuhan perjalanan.</p>
                    </div>

                    <div class="regular-booking-options">
                        @foreach ($bookingTypes as $bookingType)
                            <label class="regular-booking-radio {{ $formState['booking_type'] === $bookingType['value'] ? 'is-selected' : '' }}">
                                <input
                                    type="radio"
                                    name="booking_type"
                                    value="{{ $bookingType['value'] }}"
                                    data-booking-type
                                    data-label="{{ $bookingType['label'] }}"
                                    @checked($formState['booking_type'] === $bookingType['value'])
                                    required
                                >
                                <span class="regular-booking-radio-marker" aria-hidden="true"></span>
                                <span class="regular-booking-radio-copy">
                                    <strong>{{ $bookingType['label'] }}</strong>
                                    <span>{{ $bookingType['description'] }}</span>
                                </span>
                            </label>
                        @endforeach
                    </div>

                    @error('booking_type')
                        <p class="regular-booking-field-error">{{ $message }}</p>
                    @enderror
                </section>

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Rute dan Jadwal</h2>
                        <p>Tarif akan terisi otomatis berdasarkan kombinasi rute dua arah yang tersedia.</p>
                    </div>

                    <div class="regular-booking-grid">
                        <div class="regular-booking-field">
                            <label for="regular-booking-pickup-location">Asal Penjemputan</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                        <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"/>
                                    </svg>
                                </span>
                                <select id="regular-booking-pickup-location" name="pickup_location" data-booking-origin required>
                                    <option value="">Pilih asal penjemputan</option>
                                    @foreach ($locations as $location)
                                        <option value="{{ $location }}" @selected($formState['pickup_location'] === $location)>{{ $location }}</option>
                                    @endforeach
                                </select>
                            </div>
                            @error('pickup_location')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="regular-booking-field">
                            <label for="regular-booking-destination-location">Tujuan</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                        <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"/>
                                    </svg>
                                </span>
                                <select id="regular-booking-destination-location" name="destination_location" data-booking-destination required>
                                    <option value="">Pilih tujuan</option>
                                    @foreach ($locations as $location)
                                        <option value="{{ $location }}" @selected($formState['destination_location'] === $location)>{{ $location }}</option>
                                    @endforeach
                                </select>
                            </div>
                            @error('destination_location')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="regular-booking-field">
                            <label for="regular-booking-fare-amount">Ongkos / Tarif per Penumpang</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2V22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                        <path d="M17 6.5C17 4.567 14.7614 3 12 3C9.23858 3 7 4.567 7 6.5C7 8.433 9.23858 10 12 10C14.7614 10 17 11.567 17 13.5C17 15.433 14.7614 17 12 17C9.23858 17 7 15.433 7 13.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                    </svg>
                                </span>
                                <input
                                    id="regular-booking-fare-amount"
                                    type="text"
                                    value="{{ $formState['fare_amount_formatted'] }}"
                                    placeholder="Tarif akan tampil otomatis"
                                    readonly
                                    data-route-fare-input
                                >
                            </div>
                            <p class="regular-booking-field-note">Tarif otomatis mengikuti rute dua arah yang tersedia pada sistem.</p>
                        </div>

                        <div class="regular-booking-field">
                            <label for="regular-booking-trip-date">Tanggal Keberangkatan</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.8"/>
                                        <path d="M3 9H21" stroke="currentColor" stroke-width="1.8"/>
                                        <path d="M8 2V5M16 2V5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                    </svg>
                                </span>
                                <input
                                    id="regular-booking-trip-date"
                                    type="date"
                                    name="trip_date"
                                    value="{{ $formState['trip_date'] }}"
                                    min="{{ now()->toDateString() }}"
                                    required
                                >
                            </div>
                            @error('trip_date')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="regular-booking-field">
                            <label for="regular-booking-departure-time">Jam Keberangkatan</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8"/>
                                        <path d="M12 8V12L15 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                                <select id="regular-booking-departure-time" name="departure_time" data-booking-schedule required>
                                    <option value="">Pilih jam keberangkatan</option>
                                    @foreach ($departureSchedules as $schedule)
                                        <option value="{{ $schedule['value'] }}" @selected($formState['departure_time'] === $schedule['value'])>{{ $schedule['label'] }}</option>
                                    @endforeach
                                </select>
                            </div>
                            @error('departure_time')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="regular-booking-field">
                            <label for="regular-booking-passenger-count">Jumlah Penumpang</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M16 21V19C16 17.3431 14.6569 16 13 16H7C5.34315 16 4 17.3431 4 19V21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                        <circle cx="10" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/>
                                        <path d="M20 21V19C20 17.5978 19.0344 16.4215 17.7324 16.0996" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                        <path d="M14.5 4.23408C15.9658 4.86569 17 6.32446 17 8.02487C17 9.72529 15.9658 11.1841 14.5 11.8157" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                    </svg>
                                </span>
                                <select id="regular-booking-passenger-count" name="passenger_count" data-booking-passengers required>
                                    @foreach ($passengerCounts as $count)
                                        <option value="{{ $count['value'] }}" @selected($formState['passenger_count'] === $count['value'])>
                                            {{ $count['value'] === 6 ? $count['label'] . ' (Opsional tambahan)' : $count['label'] }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                            <p class="regular-booking-field-note">Jumlah penumpang minimal 1 dan maksimal 6. Pilihan 6 penumpang diperlakukan sebagai opsi tambahan.</p>
                            @error('passenger_count')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="regular-booking-field">
                            <label for="regular-booking-estimated-total">Estimasi Total</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2V22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                        <path d="M17 6.5C17 4.567 14.7614 3 12 3C9.23858 3 7 4.567 7 6.5C7 8.433 9.23858 10 12 10C14.7614 10 17 11.567 17 13.5C17 15.433 14.7614 17 12 17C9.23858 17 7 15.433 7 13.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                    </svg>
                                </span>
                                <input
                                    id="regular-booking-estimated-total"
                                    type="text"
                                    value="{{ $formState['estimated_total_formatted'] }}"
                                    placeholder="Total akan terhitung otomatis"
                                    readonly
                                    data-estimated-total-input
                                >
                            </div>
                            <p class="regular-booking-field-note">Estimasi total dihitung dari tarif per penumpang dikali jumlah penumpang.</p>
                        </div>
                    </div>

                    <div class="regular-booking-route-feedback" data-route-feedback data-state="idle" aria-live="polite">
                        <div class="regular-booking-route-feedback-copy">
                            <strong data-route-feedback-title>Tarif akan ditampilkan otomatis</strong>
                            <p data-route-feedback-text>Pilih asal dan tujuan untuk melihat tarif perjalanan reguler.</p>
                        </div>
                    </div>
                </section>

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Alamat Layanan</h2>
                        <p>Isi alamat lengkap agar proses penjemputan dan pengantaran lebih jelas.</p>
                    </div>

                    <div class="regular-booking-grid regular-booking-grid--single">
                        <div class="regular-booking-field">
                            <label for="regular-booking-pickup-address">Alamat Penjemputan</label>
                            <div class="regular-booking-input-shell regular-booking-input-shell--textarea">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                        <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"/>
                                    </svg>
                                </span>
                                <textarea
                                    id="regular-booking-pickup-address"
                                    name="pickup_address"
                                    minlength="10"
                                    maxlength="255"
                                    placeholder="Masukkan alamat penjemputan secara lengkap"
                                    required
                                >{{ $formState['pickup_address'] }}</textarea>
                            </div>
                            @error('pickup_address')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="regular-booking-field">
                            <label for="regular-booking-dropoff-address">Alamat Pengantaran</label>
                            <div class="regular-booking-input-shell regular-booking-input-shell--textarea">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                        <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"/>
                                    </svg>
                                </span>
                                <textarea
                                    id="regular-booking-dropoff-address"
                                    name="dropoff_address"
                                    minlength="10"
                                    maxlength="255"
                                    placeholder="Masukkan alamat pengantaran secara lengkap"
                                    required
                                >{{ $formState['dropoff_address'] }}</textarea>
                            </div>
                            @error('dropoff_address')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>
                </section>

                <div class="regular-booking-form-actions">
                    <a href="{{ route('dashboard') }}" class="dashboard-ghost-button">Kembali</a>
                    <button class="dashboard-primary-button" type="submit" data-booking-submit>Selanjutnya</button>
                </div>
            </form>

            <aside class="regular-booking-sidebar">
                <section class="regular-booking-summary-card">
                    <div class="regular-booking-summary-head">
                        <h2>Ringkasan Sementara</h2>
                        <p>Ringkasan ini diperbarui otomatis dan akan dibawa ke langkah pilih kursi.</p>
                    </div>

                    <div class="regular-booking-summary-grid">
                        <div class="regular-booking-summary-item">
                            <span>Jenis Pemesanan</span>
                            <strong data-summary-booking-for>{{ $draftSummary['booking_type'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Rute</span>
                            <strong data-summary-route>{{ $draftSummary['route'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Jam Keberangkatan</span>
                            <strong data-summary-schedule>{{ $draftSummary['departure_time'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Jumlah Penumpang</span>
                            <strong data-summary-passengers>{{ $draftSummary['passenger_count'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Tarif per Penumpang</span>
                            <strong data-summary-fare>{{ $draftSummary['fare_amount'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Estimasi Total</span>
                            <strong data-summary-total>{{ $draftSummary['estimated_total'] }}</strong>
                        </div>
                    </div>
                </section>

                <section class="regular-booking-note-card">
                    <div class="regular-booking-note-head">
                        <h2>Catatan Tarif</h2>
                        <p>Tarif berlaku dua arah. Kombinasi rute yang tidak tersedia akan ditolak secara otomatis.</p>
                    </div>

                    <ul class="regular-booking-note-list">
                        <li>Asal dan tujuan wajib dipilih dan tidak boleh sama.</li>
                        <li>Pilihan 6 penumpang disediakan sebagai opsi tambahan sesuai kebutuhan bisnis.</li>
                        <li>Data langkah 1 disimpan sebagai booking draft di session agar siap dipakai pada langkah kursi.</li>
                    </ul>
                </section>
            </aside>
        </div>
    </section>
@endsection
