@extends('layouts.dashboard')

@section('content')
    <section class="regular-booking-page animate-fade-in" data-package-booking-page>

        <section class="regular-booking-page-header">
            <div class="regular-booking-page-copy">
                <h1>Pengantaran Paket</h1>
                <p>Lengkapi informasi pengirim, penerima, rute, jadwal, dan detail barang sebelum melanjutkan ke langkah berikutnya.</p>
            </div>

            <div class="regular-booking-page-actions">
                <span class="stock-value-badge stock-value-badge-emerald">Langkah 1 dari 4</span>
            </div>
        </section>

        @include('package-bookings.partials.stepper', ['steps' => $steps])

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
                    <p>Masih ada data yang perlu diperbaiki sebelum dapat melanjutkan ke langkah berikutnya.</p>
                </div>
            </section>
        @endif

        <div class="regular-booking-layout">
            <form method="POST" action="{{ route('package-bookings.information.store') }}" class="regular-booking-form-card">
                @csrf

                {{-- Rute & Jadwal --}}
                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Rute & Jadwal Pengiriman</h2>
                        <p>Pilih lokasi asal, tujuan, tanggal, dan jam keberangkatan paket.</p>
                    </div>

                    <div class="regular-booking-grid">
                        <div class="regular-booking-field">
                            <label for="pkg-pickup-city">Lokasi Asal</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none"><path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"/></svg>
                                </span>
                                <select id="pkg-pickup-city" name="pickup_city" required>
                                    <option value="">Pilih lokasi asal</option>
                                    @foreach ($locations as $location)
                                        <option value="{{ $location }}" @selected($formState['pickup_city'] === $location)>{{ $location }}</option>
                                    @endforeach
                                </select>
                            </div>
                            @error('pickup_city')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="regular-booking-field">
                            <label for="pkg-destination-city">Tujuan</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none"><path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"/></svg>
                                </span>
                                <select id="pkg-destination-city" name="destination_city" required>
                                    <option value="">Pilih tujuan</option>
                                    @foreach ($locations as $location)
                                        <option value="{{ $location }}" @selected($formState['destination_city'] === $location)>{{ $location }}</option>
                                    @endforeach
                                </select>
                            </div>
                            @error('destination_city')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="regular-booking-field">
                            <label for="pkg-trip-date">Tanggal Keberangkatan</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.8"/><path d="M3 9H21" stroke="currentColor" stroke-width="1.8"/><path d="M8 2V5M16 2V5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                                </span>
                                <input id="pkg-trip-date" type="date" name="trip_date" value="{{ $formState['trip_date'] }}" min="{{ now()->toDateString() }}" required>
                            </div>
                            @error('trip_date')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="regular-booking-field">
                            <label for="pkg-departure-time">Jam Keberangkatan</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8"/><path d="M12 8V12L15 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </span>
                                <select id="pkg-departure-time" name="departure_time" required>
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
                    </div>
                </section>

                {{-- Data Pengirim --}}
                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Data Pengirim</h2>
                        <p>Isi nama, nomor HP, dan alamat pengirim paket.</p>
                    </div>

                    <div class="regular-booking-grid">
                        <div class="regular-booking-field">
                            <label for="pkg-sender-name">Nama Pengirim</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none"><path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/></svg>
                                </span>
                                <input id="pkg-sender-name" type="text" name="sender_name" value="{{ $formState['sender_name'] }}" placeholder="Nama lengkap pengirim" required>
                            </div>
                            @error('sender_name')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="regular-booking-field">
                            <label for="pkg-sender-phone">No. HP Pengirim</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none"><path d="M6.015 4.875c.386-.386.964-.45 1.42-.155l2.08 1.352a1.25 1.25 0 0 1 .47 1.503L8.84 9.433a.75.75 0 0 0 .196.839l4.692 4.692a.75.75 0 0 0 .839.196l1.858-1.145a1.25 1.25 0 0 1 1.503.47l1.352 2.08c.295.456.231 1.034-.155 1.42l-1.028 1.028c-1.14 1.14-2.913 1.424-4.29.56-2.26-1.42-4.39-3.084-6.303-4.997C5.587 12.667 3.923 10.537 2.503 8.277c-.863-1.377-.58-3.15.56-4.29L6.015 4.875Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
                                </span>
                                <input id="pkg-sender-phone" type="text" name="sender_phone" value="{{ $formState['sender_phone'] }}" placeholder="Contoh: 08123456789">
                            </div>
                            @error('sender_phone')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>

                    <div class="regular-booking-grid regular-booking-grid--single" style="margin-top: 1rem;">
                        <div class="regular-booking-field">
                            <label for="pkg-sender-address">Alamat Pengirim</label>
                            <div class="regular-booking-input-shell regular-booking-input-shell--textarea">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none"><path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"/></svg>
                                </span>
                                <textarea id="pkg-sender-address" name="sender_address" minlength="5" maxlength="255" placeholder="Alamat lengkap pengirim" required>{{ $formState['sender_address'] }}</textarea>
                            </div>
                            @error('sender_address')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>
                </section>

                {{-- Data Penerima --}}
                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Data Penerima</h2>
                        <p>Isi nama, nomor HP, dan alamat penerima paket.</p>
                    </div>

                    <div class="regular-booking-grid">
                        <div class="regular-booking-field">
                            <label for="pkg-recipient-name">Nama Penerima</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none"><path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/></svg>
                                </span>
                                <input id="pkg-recipient-name" type="text" name="recipient_name" value="{{ $formState['recipient_name'] }}" placeholder="Nama lengkap penerima" required>
                            </div>
                            @error('recipient_name')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="regular-booking-field">
                            <label for="pkg-recipient-phone">No. HP Penerima</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none"><path d="M6.015 4.875c.386-.386.964-.45 1.42-.155l2.08 1.352a1.25 1.25 0 0 1 .47 1.503L8.84 9.433a.75.75 0 0 0 .196.839l4.692 4.692a.75.75 0 0 0 .839.196l1.858-1.145a1.25 1.25 0 0 1 1.503.47l1.352 2.08c.295.456.231 1.034-.155 1.42l-1.028 1.028c-1.14 1.14-2.913 1.424-4.29.56-2.26-1.42-4.39-3.084-6.303-4.997C5.587 12.667 3.923 10.537 2.503 8.277c-.863-1.377-.58-3.15.56-4.29L6.015 4.875Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
                                </span>
                                <input id="pkg-recipient-phone" type="text" name="recipient_phone" value="{{ $formState['recipient_phone'] }}" placeholder="Contoh: 08123456789">
                            </div>
                            @error('recipient_phone')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>

                    <div class="regular-booking-grid regular-booking-grid--single" style="margin-top: 1rem;">
                        <div class="regular-booking-field">
                            <label for="pkg-recipient-address">Alamat Penerima</label>
                            <div class="regular-booking-input-shell regular-booking-input-shell--textarea">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none"><path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"/></svg>
                                </span>
                                <textarea id="pkg-recipient-address" name="recipient_address" minlength="5" maxlength="255" placeholder="Alamat lengkap penerima" required>{{ $formState['recipient_address'] }}</textarea>
                            </div>
                            @error('recipient_address')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>
                </section>

                {{-- Detail Barang & Ongkos --}}
                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Detail Barang & Ongkos</h2>
                        <p>Isi nama barang, jumlah, dan ongkos tarif pengiriman secara manual.</p>
                    </div>

                    <div class="regular-booking-grid">
                        <div class="regular-booking-field">
                            <label for="pkg-item-name">Nama Barang</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none"><path d="M12 3L19 7V17L12 21L5 17V7L12 3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 12L19 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 12L5 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 12V21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                                </span>
                                <input id="pkg-item-name" type="text" name="item_name" value="{{ $formState['item_name'] }}" placeholder="Contoh: Lemari, Kardus Pakaian" required>
                            </div>
                            @error('item_name')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="regular-booking-field">
                            <label for="pkg-item-qty">Jumlah Barang</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.8"/><path d="M12 8V16M8 12H16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                                </span>
                                <input id="pkg-item-qty" type="number" name="item_qty" value="{{ $formState['item_qty'] }}" min="1" max="999" required>
                            </div>
                            @error('item_qty')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="regular-booking-field">
                            <label for="pkg-fare-amount">Ongkos / Tarif per Paket (Rp)</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none"><path d="M12 2V22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M17 6.5C17 4.567 14.7614 3 12 3C9.23858 3 7 4.567 7 6.5C7 8.433 9.23858 10 12 10C14.7614 10 17 11.567 17 13.5C17 15.433 14.7614 17 12 17C9.23858 17 7 15.433 7 13.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                                </span>
                                <input id="pkg-fare-amount" type="number" name="fare_amount" value="{{ $formState['fare_amount'] > 0 ? $formState['fare_amount'] : '' }}" placeholder="Masukkan ongkos tarif" min="1000" step="1000" required>
                            </div>
                            <p class="regular-booking-field-note">Isi ongkos tarif pengiriman secara manual sesuai kesepakatan.</p>
                            @error('fare_amount')
                                <p class="regular-booking-field-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="regular-booking-field">
                            <label for="pkg-additional-fare">Ongkos Tambahan (Rp)</label>
                            <div class="regular-booking-input-shell">
                                <span class="regular-booking-input-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none"><path d="M12 2V22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M17 6.5C17 4.567 14.7614 3 12 3C9.23858 3 7 4.567 7 6.5C7 8.433 9.23858 10 12 10C14.7614 10 17 11.567 17 13.5C17 15.433 14.7614 17 12 17C9.23858 17 7 15.433 7 13.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M12 6V18M9 12H15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                                </span>
                                <input id="pkg-additional-fare" type="number" name="additional_fare" value="{{ $formState['additional_fare'] > 0 ? $formState['additional_fare'] : '' }}" placeholder="0" min="0" step="1000">
                            </div>
                            <p class="regular-booking-field-note">Isi jika ada ongkos tambahan. Kosongkan jika tidak ada.</p>
                            @error('additional_fare')
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
                        <h2>Ringkasan Sementara</h2>
                        <p>Ringkasan ini akan dibawa ke langkah pilih ukuran paket.</p>
                    </div>

                    <div class="regular-booking-summary-grid">
                        <div class="regular-booking-summary-item">
                            <span>Rute</span>
                            <strong>{{ $draftSummary['route'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Jam Keberangkatan</span>
                            <strong>{{ $draftSummary['departure_time'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Pengirim</span>
                            <strong>{{ $draftSummary['sender_name'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Penerima</span>
                            <strong>{{ $draftSummary['recipient_name'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Nama Barang</span>
                            <strong>{{ $draftSummary['item_name'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Ongkos Tarif</span>
                            <strong>{{ $draftSummary['fare_amount'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Ongkos Tambahan</span>
                            <strong>{{ $draftSummary['additional_fare'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Total Ongkos</span>
                            <strong>{{ $draftSummary['total_amount'] }}</strong>
                        </div>
                    </div>
                </section>

                <section class="regular-booking-note-card">
                    <div class="regular-booking-note-head">
                        <h2>Catatan Pengiriman</h2>
                        <p>Pastikan data pengirim dan penerima sudah benar sebelum melanjutkan.</p>
                    </div>

                    <ul class="regular-booking-note-list">
                        <li>Ongkos tarif diisi secara manual sesuai kesepakatan.</li>
                        <li>Jam keberangkatan sama dengan jadwal reguler (Subuh sampai Malam).</li>
                        <li>Ukuran paket dipilih pada langkah berikutnya.</li>
                    </ul>
                </section>
            </aside>
        </div>
    </section>
@endsection
