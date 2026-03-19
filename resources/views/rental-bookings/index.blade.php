@extends('layouts.dashboard')

@section('content')
    <section class="regular-booking-page animate-fade-in" data-rental-booking-page>

        <section class="regular-booking-page-header">
            <div class="regular-booking-page-copy">
                <h1>Pemesanan Rental Mobil</h1>
                <p>Isi informasi perjalanan rental. Seluruh 6 kursi kendaraan akan otomatis dipesan.</p>
            </div>

            <div class="regular-booking-page-actions">
                <span class="stock-value-badge stock-value-badge-emerald">Langkah 1 dari 4</span>
            </div>
        </section>

        @include('rental-bookings.partials.stepper', ['steps' => $steps])

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
                    <p>Masih ada data yang perlu diperbaiki sebelum Anda dapat melanjutkan ke langkah data pemesan.</p>
                </div>
            </section>
        @endif

        <div class="regular-booking-layout">
            <form method="POST" action="{{ route('rental-bookings.information.store') }}" class="regular-booking-form-card">
                @csrf

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Jenis Pemesanan</h2>
                        <p>Pilih jenis pemesanan sesuai kebutuhan rental mobil.</p>
                    </div>

                    <div class="regular-booking-options">
                        @foreach ($bookingTypes as $bookingType)
                            <label class="regular-booking-radio {{ $formState['booking_type'] === $bookingType['value'] ? 'is-selected' : '' }}">
                                <input
                                    type="radio"
                                    name="booking_type"
                                    value="{{ $bookingType['value'] }}"
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
                        <h2>Rute dan Periode Rental</h2>
                        <p>Isi asal, tujuan, tanggal mulai dan selesai rental sesuai kebutuhan.</p>
                    </div>

                    <div class="regular-booking-grid">
                        <div class="regular-booking-field">
                            <label for="rental-pickup-location">Asal Penjemputan</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                        <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"/>
                                    </svg>
                                </span>
                                <input
                                    id="rental-pickup-location"
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
                            <label for="rental-destination-location">Tujuan</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                        <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"/>
                                    </svg>
                                </span>
                                <input
                                    id="rental-destination-location"
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
                            <label for="rental-start-date">Tanggal Mulai Rental</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.8"/>
                                        <path d="M3 9H21" stroke="currentColor" stroke-width="1.8"/>
                                        <path d="M8 2V5M16 2V5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                    </svg>
                                </span>
                                <input
                                    id="rental-start-date"
                                    type="date"
                                    name="rental_start_date"
                                    value="{{ $formState['rental_start_date'] }}"
                                    min="{{ now()->toDateString() }}"
                                    required
                                >
                            </div>
                            @error('rental_start_date')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="regular-booking-field">
                            <label for="rental-end-date">Tanggal Selesai Rental</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.8"/>
                                        <path d="M3 9H21" stroke="currentColor" stroke-width="1.8"/>
                                        <path d="M8 2V5M16 2V5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                    </svg>
                                </span>
                                <input
                                    id="rental-end-date"
                                    type="date"
                                    name="rental_end_date"
                                    value="{{ $formState['rental_end_date'] }}"
                                    min="{{ now()->toDateString() }}"
                                    required
                                >
                            </div>
                            <p class="regular-booking-field-note">Tanggal selesai harus sama atau setelah tanggal mulai rental.</p>
                            @error('rental_end_date')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="regular-booking-field">
                            <label for="rental-fare-amount">Tarif Rental (Rp)</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2V22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                        <path d="M17 6.5C17 4.567 14.7614 3 12 3C9.23858 3 7 4.567 7 6.5C7 8.433 9.23858 10 12 10C14.7614 10 17 11.567 17 13.5C17 15.433 14.7614 17 12 17C9.23858 17 7 15.433 7 13.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                    </svg>
                                </span>
                                <input
                                    id="rental-fare-amount"
                                    type="number"
                                    name="fare_amount"
                                    value="{{ $formState['fare_amount'] > 0 ? $formState['fare_amount'] : '' }}"
                                    placeholder="Masukkan tarif rental"
                                    min="0"
                                    step="1000"
                                    data-fare-input
                                    required
                                >
                            </div>
                            <p class="regular-booking-field-note">Tarif diisi sesuai kesepakatan untuk seluruh periode rental.</p>
                            @error('fare_amount')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="regular-booking-field">
                            <label for="rental-additional-fare">Tambahan Ongkos</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2V22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                        <path d="M17 6.5C17 4.567 14.7614 3 12 3C9.23858 3 7 4.567 7 6.5C7 8.433 9.23858 10 12 10C14.7614 10 17 11.567 17 13.5C17 15.433 14.7614 17 12 17C9.23858 17 7 15.433 7 13.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                    </svg>
                                </span>
                                <input
                                    id="rental-additional-fare"
                                    type="number"
                                    name="additional_fare"
                                    value="{{ $formState['additional_fare'] > 0 ? $formState['additional_fare'] : '' }}"
                                    placeholder="0"
                                    min="0"
                                    step="1000"
                                    data-additional-fare-input
                                >
                            </div>
                            <p class="regular-booking-field-note">Kosongkan jika tidak ada tambahan ongkos.</p>
                            @error('additional_fare')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="regular-booking-field">
                            <label for="rental-estimated-total">Estimasi Total</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M12 2V22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                        <path d="M17 6.5C17 4.567 14.7614 3 12 3C9.23858 3 7 4.567 7 6.5C7 8.433 9.23858 10 12 10C14.7614 10 17 11.567 17 13.5C17 15.433 14.7614 17 12 17C9.23858 17 7 15.433 7 13.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                    </svg>
                                </span>
                                <input
                                    id="rental-estimated-total"
                                    type="text"
                                    value="{{ $formState['estimated_total_formatted'] }}"
                                    placeholder="Total akan terhitung otomatis"
                                    readonly
                                    data-estimated-total-input
                                >
                            </div>
                            <p class="regular-booking-field-note">Total = tarif rental + tambahan ongkos.</p>
                        </div>
                    </div>
                </section>

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Alamat Layanan</h2>
                        <p>Isi alamat lengkap penjemputan dan pengantaran untuk proses rental.</p>
                    </div>

                    <div class="regular-booking-grid regular-booking-grid--single">
                        <div class="regular-booking-field">
                            <label for="rental-pickup-address">Alamat Penjemputan</label>
                            <div class="regular-booking-input-shell regular-booking-input-shell--textarea">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                        <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"/>
                                    </svg>
                                </span>
                                <textarea
                                    id="rental-pickup-address"
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
                            <label for="rental-dropoff-address">Alamat Pengantaran</label>
                            <div class="regular-booking-input-shell regular-booking-input-shell--textarea">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                        <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"/>
                                    </svg>
                                </span>
                                <textarea
                                    id="rental-dropoff-address"
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
                        <h2>Ringkasan Rental</h2>
                        <p>Seluruh 6 kursi dipesan otomatis untuk pemesanan rental mobil.</p>
                    </div>

                    <div class="regular-booking-summary-grid">
                        <div class="regular-booking-summary-item">
                            <span>Jenis Pemesanan</span>
                            <strong>{{ $draftSummary['booking_type'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Rute</span>
                            <strong>{{ $draftSummary['route'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Tgl. Mulai Rental</span>
                            <strong>{{ $draftSummary['rental_start_date'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Tgl. Selesai Rental</span>
                            <strong>{{ $draftSummary['rental_end_date'] }}</strong>
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
                            <span>Tarif Rental</span>
                            <strong>{{ $draftSummary['fare_amount'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Tambahan Ongkos</span>
                            <strong>{{ $draftSummary['additional_fare'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Estimasi Total</span>
                            <strong>{{ $draftSummary['estimated_total'] }}</strong>
                        </div>
                    </div>
                </section>

                <section class="regular-booking-note-card">
                    <div class="regular-booking-note-head">
                        <h2>Catatan Rental</h2>
                        <p>Pemesanan rental memesan seluruh armada untuk periode yang ditentukan.</p>
                    </div>

                    <ul class="regular-booking-note-list">
                        <li>Asal dan tujuan diisi bebas sesuai kesepakatan rental.</li>
                        <li>Tentukan tanggal mulai dan tanggal selesai periode rental.</li>
                        <li>Seluruh 6 kursi (1A, 2A, 2B, 3A, 4A, 5A) akan otomatis dipesan.</li>
                        <li>Tarif diisi manual sesuai negosiasi untuk keseluruhan periode rental.</li>
                    </ul>
                </section>
            </aside>
        </div>
    </section>
@endsection
