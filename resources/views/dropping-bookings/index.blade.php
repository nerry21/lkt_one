@extends('layouts.dashboard')

@section('content')
    <section class="regular-booking-page animate-fade-in" data-dropping-booking-page>

        <section class="regular-booking-page-header">
            <div class="regular-booking-page-copy">
                <h1>Pemesanan Dropping</h1>
                <p>Isi informasi perjalanan dropping. Seluruh 6 kursi kendaraan akan otomatis dipesan.</p>
            </div>

            <div class="regular-booking-page-actions">
                <span class="stock-value-badge stock-value-badge-emerald">Langkah 1 dari 3</span>
            </div>
        </section>

        @include('dropping-bookings.partials.stepper', ['steps' => $steps])

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
                    <p>Masih ada data yang perlu diperbaiki sebelum Anda dapat melanjutkan ke langkah data penumpang.</p>
                </div>
            </section>
        @endif

        <div class="regular-booking-layout">
            <form method="POST" action="{{ route('dropping-bookings.information.store') }}" class="regular-booking-form-card">
                @csrf

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Jenis Pemesanan</h2>
                        <p>Pilih jenis pemesanan sesuai kebutuhan perjalanan dropping.</p>
                    </div>

                    <div class="regular-booking-options">
                        @foreach ($bookingTypes as $bookingType)
                            <label class="regular-booking-radio {{ $formState['booking_type'] === $bookingType['value'] ? 'is-selected' : '' }}">
                                <input
                                    type="radio"
                                    name="booking_type"
                                    value="{{ $bookingType['value'] }}"
                                    data-booking-type
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
                        <p>Isi asal, tujuan, dan jam keberangkatan secara bebas sesuai kebutuhan dropping.</p>
                    </div>

                    <div class="regular-booking-grid">
                        <div class="regular-booking-field">
                            <label for="dropping-pickup-location">Asal Penjemputan</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                        <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"/>
                                    </svg>
                                </span>
                                <input
                                    id="dropping-pickup-location"
                                    type="text"
                                    name="pickup_location"
                                    value="{{ $formState['pickup_location'] }}"
                                    placeholder="Contoh: Pekanbaru, Jl. Sudirman"
                                    required
                                >
                            </div>
                            @error('pickup_location')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="regular-booking-field">
                            <label for="dropping-destination-location">Tujuan</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                        <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"/>
                                    </svg>
                                </span>
                                <input
                                    id="dropping-destination-location"
                                    type="text"
                                    name="destination_location"
                                    value="{{ $formState['destination_location'] }}"
                                    placeholder="Contoh: Pasir Pengaraian, Kantor Dinas"
                                    required
                                >
                            </div>
                            @error('destination_location')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="regular-booking-field">
                            <label for="dropping-fare-amount">Tarif per Penumpang (Rp)</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2V22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                        <path d="M17 6.5C17 4.567 14.7614 3 12 3C9.23858 3 7 4.567 7 6.5C7 8.433 9.23858 10 12 10C14.7614 10 17 11.567 17 13.5C17 15.433 14.7614 17 12 17C9.23858 17 7 15.433 7 13.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                    </svg>
                                </span>
                                <input
                                    id="dropping-fare-amount"
                                    type="number"
                                    name="fare_amount"
                                    value="{{ $formState['fare_amount'] > 0 ? $formState['fare_amount'] : '' }}"
                                    placeholder="Masukkan tarif per penumpang"
                                    min="0"
                                    step="1000"
                                    data-fare-input
                                    required
                                >
                            </div>
                            <p class="regular-booking-field-note">Tarif diisi secara manual sesuai kesepakatan. Total = (tarif + ongkos tambahan) × 6 penumpang.</p>
                            @error('fare_amount')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="regular-booking-field">
                            <label for="dropping-additional-fare">Ongkos Tambahan per Penumpang</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2V22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                        <path d="M17 6.5C17 4.567 14.7614 3 12 3C9.23858 3 7 4.567 7 6.5C7 8.433 9.23858 10 12 10C14.7614 10 17 11.567 17 13.5C17 15.433 14.7614 17 12 17C9.23858 17 7 15.433 7 13.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                    </svg>
                                </span>
                                <input
                                    id="dropping-additional-fare"
                                    type="number"
                                    name="additional_fare_per_passenger"
                                    value="{{ $formState['additional_fare_per_passenger'] > 0 ? $formState['additional_fare_per_passenger'] : '' }}"
                                    placeholder="0"
                                    min="0"
                                    step="1000"
                                    data-additional-fare-input
                                >
                            </div>
                            <p class="regular-booking-field-note">Kosongkan jika tidak ada ongkos tambahan.</p>
                            @error('additional_fare_per_passenger')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="regular-booking-field">
                            <label for="dropping-trip-date">Tanggal Keberangkatan</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.8"/>
                                        <path d="M3 9H21" stroke="currentColor" stroke-width="1.8"/>
                                        <path d="M8 2V5M16 2V5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                    </svg>
                                </span>
                                <input
                                    id="dropping-trip-date"
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
                            <label for="dropping-departure-time">Jam Keberangkatan</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8"/>
                                        <path d="M12 8V12L15 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                                <input
                                    id="dropping-departure-time"
                                    type="time"
                                    name="departure_time"
                                    value="{{ $formState['departure_time'] }}"
                                    required
                                >
                            </div>
                            <p class="regular-booking-field-note">Pilih jam keberangkatan bebas sesuai kebutuhan dropping.</p>
                            @error('departure_time')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="regular-booking-field">
                            <label for="dropping-estimated-total">Estimasi Total</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2V22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                        <path d="M17 6.5C17 4.567 14.7614 3 12 3C9.23858 3 7 4.567 7 6.5C7 8.433 9.23858 10 12 10C14.7614 10 17 11.567 17 13.5C17 15.433 14.7614 17 12 17C9.23858 17 7 15.433 7 13.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                    </svg>
                                </span>
                                <input
                                    id="dropping-estimated-total"
                                    type="text"
                                    value="{{ $formState['estimated_total_formatted'] }}"
                                    placeholder="Total akan terhitung otomatis"
                                    readonly
                                    data-estimated-total-input
                                >
                            </div>
                            <p class="regular-booking-field-note">Estimasi total = (tarif + ongkos tambahan) per penumpang × 6 penumpang.</p>
                        </div>
                    </div>
                </section>

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Alamat Layanan</h2>
                        <p>Isi alamat lengkap penjemputan dan pengantaran untuk proses dropping.</p>
                    </div>

                    <div class="regular-booking-grid regular-booking-grid--single">
                        <div class="regular-booking-field">
                            <label for="dropping-pickup-address">Alamat Penjemputan</label>
                            <div class="regular-booking-input-shell regular-booking-input-shell--textarea">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                        <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"/>
                                    </svg>
                                </span>
                                <textarea
                                    id="dropping-pickup-address"
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
                            <label for="dropping-dropoff-address">Alamat Pengantaran</label>
                            <div class="regular-booking-input-shell regular-booking-input-shell--textarea">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                        <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"/>
                                    </svg>
                                </span>
                                <textarea
                                    id="dropping-dropoff-address"
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
                    <button class="dashboard-primary-button" type="submit">Selanjutnya</button>
                </div>
            </form>

            <aside class="regular-booking-sidebar">
                <section class="regular-booking-summary-card">
                    <div class="regular-booking-summary-head">
                        <h2>Ringkasan Dropping</h2>
                        <p>Seluruh 6 kursi dipesan otomatis untuk pemesanan dropping.</p>
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
                            <strong>{{ $draftSummary['passenger_count'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Kursi Dipesan</span>
                            <strong>{{ $draftSummary['selected_seats'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Tarif per Penumpang</span>
                            <strong data-summary-fare>{{ $draftSummary['fare_amount'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Ongkos Tambahan/Penumpang</span>
                            <strong data-summary-additional-fare>{{ $draftSummary['additional_fare_per_passenger'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Estimasi Total</span>
                            <strong data-summary-total>{{ $draftSummary['estimated_total'] }}</strong>
                        </div>
                    </div>
                </section>

                <section class="regular-booking-note-card">
                    <div class="regular-booking-note-head">
                        <h2>Catatan Dropping</h2>
                        <p>Pemesanan dropping memesan seluruh armada untuk satu perjalanan.</p>
                    </div>

                    <ul class="regular-booking-note-list">
                        <li>Asal dan tujuan diisi bebas sesuai kesepakatan, tidak terikat rute reguler.</li>
                        <li>Jam keberangkatan dapat dipilih kapan saja sesuai kebutuhan.</li>
                        <li>Seluruh 6 kursi (1A, 2A, 2B, 3A, 4A, 5A) akan otomatis dipesan.</li>
                        <li>Tarif diisi manual sesuai negosiasi untuk perjalanan dropping.</li>
                    </ul>
                </section>
            </aside>
        </div>
    </section>
@endsection
