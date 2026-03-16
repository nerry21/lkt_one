@extends('layouts.dashboard')

@php
    $canManageBookings = $canManageBookings ?? false;
    $bookingForOptions = $formOptions['booking_for_options'] ?? [];
    $locationOptions = $formOptions['location_options'] ?? [];
    $departureTimeOptions = $formOptions['departure_time_options'] ?? [];
    $passengerCountOptions = $formOptions['passenger_count_options'] ?? [];
    $seatOptions = $formOptions['seat_options'] ?? [];
    $paymentMethodOptions = $formOptions['payment_method_options'] ?? [];
    $paymentStatusOptions = $formOptions['payment_status_options'] ?? [];
    $bookingStatusOptions = $formOptions['booking_status_options'] ?? [];
    $serviceTypeOptions = $formOptions['service_type_options'] ?? [];
    $transferBankAccountOptions = $formOptions['transfer_bank_account_options'] ?? [];
@endphp

@section('content')
    <style>
        /* Warna teks di dalam modal detail pemesanan */
        .bpg-detail-dialog-card .bpg-detail-item strong,
        .bpg-detail-dialog-card .bpg-detail-item p {
            color: #0f172a !important;
        }
        .bpg-detail-dialog-card .bpg-detail-item span {
            color: #475569 !important;
        }
        .bpg-detail-dialog-card .admin-users-dialog-head h3,
        .bpg-detail-dialog-card .bpg-detail-subtitle {
            color: #0f172a !important;
        }
        #bpg-detail-full-link,
        #bpg-detail-full-link * {
            color: #000000 !important;
        }
    </style>
    <section class="admin-users-page animate-fade-in" data-bookings-page>
        <script id="bookings-form-options" type="application/json">@json($formOptions)</script>
        <script id="bookings-drivers-data" type="application/json">@json($drivers ?? [])</script>
        <script id="bookings-mobils-data" type="application/json">@json($mobils ?? [])</script>

        <section class="admin-users-page-header">
            <div class="admin-users-page-copy">
                <h1>Data Penumpang</h1>
                <p>Pantau dan kelola penumpang per jadwal keberangkatan.</p>
            </div>

            <div class="bpg-header-actions" @if (! $canManageBookings) hidden @endif>
                <div class="bpg-date-wrapper">
                    <label class="bpg-date-label" for="bookings-date-picker">
                        <svg viewBox="0 0 24 24" fill="none" style="width:15px;height:15px;flex-shrink:0;">
                            <rect x="3" y="4" width="18" height="18" rx="4" stroke="currentColor" stroke-width="1.8"/>
                            <path d="M3 9H21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M8 2V5M16 2V5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                        Tanggal
                    </label>
                    <input type="date" id="bookings-date-picker" class="bpg-date-input" data-testid="bookings-date-picker">
                </div>
                <button class="admin-users-primary-button" type="button" id="bookings-add-btn" data-testid="add-booking-btn">
                    <span class="admin-users-button-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M12 5V19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M5 12H19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </span>
                    <span>Tambah Pemesanan</span>
                </button>
            </div>
        </section>

        <p class="admin-users-access-note" id="bookings-access-note" @if ($canManageBookings) hidden @endif>
            Halaman ini hanya dapat diakses oleh Admin atau Super Admin.
        </p>

        {{-- Route Direction Tabs --}}
        <div class="bpg-route-tabs" id="bpg-route-tabs" @if (! $canManageBookings) hidden @endif>
            <button class="bpg-route-tab is-active" type="button" data-direction="to_pkb" data-testid="tab-to-pkb">
                <svg viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Rokan Hulu → Pekanbaru
            </button>
            <button class="bpg-route-tab" type="button" data-direction="from_pkb" data-testid="tab-from-pkb">
                <svg viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Pekanbaru → Pasir
            </button>
        </div>

        {{-- Slots Container --}}
        <div class="bpg-slots-shell" id="bpg-slots-shell" @if (! $canManageBookings) hidden @endif>
            <div class="admin-users-loading-inline">
                <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data penumpang...</span>
            </div>
        </div>

        {{-- Lihat Detail Modal --}}
        <div class="modal-shell" id="bpg-detail-modal" hidden>
            <div class="modal-backdrop" data-modal-close="bpg-detail-modal"></div>
            <div class="modal-card admin-users-dialog-card bpg-detail-dialog-card">
                <div class="admin-users-dialog-head">
                    <div>
                        <h3 id="bpg-detail-title">Detail Penumpang</h3>
                        <p id="bpg-detail-subtitle" class="bpg-detail-subtitle">-</p>
                    </div>
                    <button type="button" class="admin-users-dialog-close" data-modal-close="bpg-detail-modal" aria-label="Tutup">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
                <div id="bpg-detail-body" class="bpg-detail-body">
                    {{-- Rendered by JS --}}
                </div>
                <div class="admin-users-dialog-actions">
                    <button class="admin-users-secondary-button" type="button" data-modal-close="bpg-detail-modal">Tutup</button>
                    <a class="admin-users-secondary-button" id="bpg-detail-ticket-link" href="#" target="_blank" style="display:inline-flex;align-items:center;gap:6px;">
                        <svg viewBox="0 0 24 24" fill="none" style="width:16px;height:16px;">
                            <path d="M6 2H18C19.1046 2 20 2.89543 20 4V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4C4 2.89543 4.89543 2 6 2Z" stroke="currentColor" stroke-width="1.8"/>
                            <path d="M9 7H15M9 11H15M9 15H12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                        Cetak Tiket
                    </a>
                    <a class="admin-users-primary-button" id="bpg-detail-full-link" href="#" target="_blank" style="color:#000;">
                        <svg viewBox="0 0 24 24" fill="none" style="width:16px;height:16px;margin-right:6px;">
                            <path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/>
                        </svg>
                        Lihat Halaman Lengkap
                    </a>
                </div>
            </div>
        </div>

        {{-- Add/Edit Booking Modal --}}
        <div class="modal-shell" id="booking-form-modal" hidden>
            <div class="modal-backdrop" data-modal-close="booking-form-modal"></div>

            <div class="modal-card admin-users-dialog-card bookings-form-dialog-card">
                <div class="admin-users-dialog-head">
                    <div>
                        <h3 id="booking-form-title">Tambah Pemesanan</h3>
                        <p id="booking-form-description">Lengkapi data pemesanan reguler dari dashboard admin.</p>
                    </div>
                    <button type="button" class="admin-users-dialog-close" data-modal-close="booking-form-modal" aria-label="Tutup">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>

                <form id="booking-form" class="admin-users-form bookings-form">
                    <input type="hidden" id="booking-id" name="id">

                    <div class="bookings-form-section">
                        <div class="bookings-form-section-head">
                            <h4>Informasi Perjalanan</h4>
                            <p>Data ini mengikuti struktur alur regular booking yang sudah berjalan pada sistem.</p>
                        </div>

                        <div class="admin-users-form-grid">
                            <div class="admin-users-form-group">
                                <label for="booking-booking-for">Jenis Pemesanan</label>
                                <div class="admin-users-input-shell">
                                    <select id="booking-booking-for" name="booking_for" required data-testid="input-booking-booking-for">
                                        @foreach ($bookingForOptions as $option)
                                            <option value="{{ $option['value'] }}">{{ $option['label'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="admin-users-form-group">
                                <label for="booking-category">Jenis Layanan</label>
                                <div class="admin-users-input-shell">
                                    <select id="booking-category" name="category" required data-testid="input-booking-category">
                                        @foreach ($serviceTypeOptions as $option)
                                            <option value="{{ $option['value'] }}">{{ $option['label'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="admin-users-form-group">
                                <label for="booking-from-city">Kota Asal</label>
                                <div class="admin-users-input-shell">
                                    <select id="booking-from-city" name="from_city" required data-testid="input-booking-from-city">
                                        <option value="">Pilih kota asal</option>
                                        @foreach ($locationOptions as $location)
                                            <option value="{{ $location }}">{{ $location }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="admin-users-form-group">
                                <label for="booking-to-city">Kota Tujuan</label>
                                <div class="admin-users-input-shell">
                                    <select id="booking-to-city" name="to_city" required data-testid="input-booking-to-city">
                                        <option value="">Pilih kota tujuan</option>
                                        @foreach ($locationOptions as $location)
                                            <option value="{{ $location }}">{{ $location }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="admin-users-form-group">
                                <label for="booking-trip-date">Tanggal Keberangkatan</label>
                                <div class="admin-users-input-shell">
                                    <input id="booking-trip-date" name="trip_date" type="date" required data-testid="input-booking-trip-date">
                                </div>
                            </div>

                            <div class="admin-users-form-group">
                                <label for="booking-trip-time">Waktu Keberangkatan</label>
                                <div class="admin-users-input-shell">
                                    <select id="booking-trip-time" name="trip_time" required data-testid="input-booking-trip-time">
                                        <option value="">Pilih waktu keberangkatan</option>
                                        @foreach ($departureTimeOptions as $option)
                                            <option value="{{ $option['value'] }}">{{ $option['label'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="admin-users-form-group">
                                <label for="booking-passenger-count">Jumlah Penumpang</label>
                                <div class="admin-users-input-shell">
                                    <select id="booking-passenger-count" name="passenger_count" required data-testid="input-booking-passenger-count">
                                        @foreach ($passengerCountOptions as $option)
                                            <option value="{{ $option['value'] }}">{{ $option['label'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="admin-users-form-group">
                                <label for="booking-driver-name">Nama Driver</label>
                                <div class="admin-users-input-shell">
                                    <input id="booking-driver-name" name="driver_name" type="text" placeholder="Kosongkan jika belum ditentukan" data-testid="input-booking-driver-name">
                                </div>
                            </div>

                            <div class="admin-users-form-group">
                                <label for="booking-price-per-seat">Tarif per Kursi</label>
                                <div class="admin-users-input-shell">
                                    <input id="booking-price-per-seat" type="text" readonly placeholder="Tarif akan dihitung otomatis" data-booking-price-per-seat>
                                </div>
                            </div>

                            <div class="admin-users-form-group">
                                <label for="booking-total-amount">Total Biaya</label>
                                <div class="admin-users-input-shell">
                                    <input id="booking-total-amount" type="text" readonly placeholder="Total biaya akan dihitung otomatis" data-booking-total-amount>
                                </div>
                            </div>

                            <div class="admin-users-form-group admin-users-form-group--full">
                                <label for="booking-pickup-location">Alamat Penjemputan</label>
                                <div class="admin-users-input-shell">
                                    <textarea id="booking-pickup-location" name="pickup_location" rows="3" placeholder="Masukkan alamat penjemputan secara lengkap" required data-testid="input-booking-pickup-location"></textarea>
                                </div>
                            </div>

                            <div class="admin-users-form-group admin-users-form-group--full">
                                <label for="booking-dropoff-location">Alamat Pengantaran</label>
                                <div class="admin-users-input-shell">
                                    <textarea id="booking-dropoff-location" name="dropoff_location" rows="3" placeholder="Masukkan alamat pengantaran secara lengkap" required data-testid="input-booking-dropoff-location"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bookings-form-section">
                        <div class="bookings-form-section-head">
                            <h4>Kursi dan Penumpang</h4>
                            <p>Pilih kursi sesuai jumlah penumpang. Data penumpang otomatis mengikuti urutan kursi yang dipilih.</p>
                        </div>

                        <div class="bookings-seat-panel">
                            <div class="bookings-seat-grid" id="booking-seat-grid">
                                @foreach ($seatOptions as $seat)
                                    <button
                                        class="bookings-seat-button"
                                        type="button"
                                        data-seat-code="{{ $seat['code'] }}"
                                        data-seat-optional="{{ $seat['is_optional'] ? '1' : '0' }}"
                                        data-testid="seat-option-{{ strtolower($seat['code']) }}"
                                    >
                                        <strong>{{ $seat['label'] }}</strong>
                                        <span>{{ $seat['description'] }}</span>
                                    </button>
                                @endforeach
                            </div>

                            <div class="bookings-seat-summary">
                                <div class="bookings-seat-summary-item">
                                    <span>Jumlah Kursi Dipilih</span>
                                    <strong id="booking-selected-seat-count">0</strong>
                                </div>
                                <div class="bookings-seat-summary-item">
                                    <span>Kursi Terpilih</span>
                                    <strong id="booking-selected-seat-label">Belum dipilih</strong>
                                </div>
                            </div>
                        </div>

                        <div id="booking-selected-seats-inputs"></div>

                        <p class="admin-users-form-note bookings-form-note">
                            Nama pemesanan dan nomor HP utama pada tabel akan diambil dari penumpang pertama berdasarkan urutan kursi terpilih.
                        </p>

                        <div class="bookings-passenger-editor" id="booking-passenger-editor"></div>
                    </div>

                    <div class="bookings-form-section">
                        <div class="bookings-form-section-head">
                            <h4>Status dan Pembayaran</h4>
                            <p>Gunakan status pembayaran dan status booking sesuai kondisi transaksi yang sedang berjalan.</p>
                        </div>

                        <div class="admin-users-form-grid">
                            <div class="admin-users-form-group">
                                <label for="booking-payment-method">Metode Pembayaran</label>
                                <div class="admin-users-input-shell">
                                    <select id="booking-payment-method" name="payment_method" data-testid="input-booking-payment-method">
                                        <option value="">Belum dipilih</option>
                                        @foreach ($paymentMethodOptions as $option)
                                            <option value="{{ $option['value'] }}">{{ $option['label'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="admin-users-form-group" id="booking-bank-account-group" hidden>
                                <label for="booking-bank-account-code">Rekening Transfer</label>
                                <div class="admin-users-input-shell">
                                    <select id="booking-bank-account-code" name="bank_account_code" data-testid="input-booking-bank-account">
                                        <option value="">Pilih rekening transfer</option>
                                        @foreach ($transferBankAccountOptions as $option)
                                            <option value="{{ $option['code'] }}">{{ $option['bank_name'] }} - {{ $option['account_number'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="admin-users-form-group">
                                <label for="booking-payment-status">Status Pembayaran</label>
                                <div class="admin-users-input-shell">
                                    <select id="booking-payment-status" name="payment_status" required data-testid="input-booking-payment-status">
                                        @foreach ($paymentStatusOptions as $option)
                                            <option value="{{ $option['value'] }}">{{ $option['label'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="admin-users-form-group">
                                <label for="booking-booking-status">Status Booking</label>
                                <div class="admin-users-input-shell">
                                    <select id="booking-booking-status" name="booking_status" required data-testid="input-booking-booking-status">
                                        @foreach ($bookingStatusOptions as $option)
                                            <option value="{{ $option['value'] }}">{{ $option['label'] }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="admin-users-form-group admin-users-form-group--full">
                                <label for="booking-notes">Catatan</label>
                                <div class="admin-users-input-shell">
                                    <textarea id="booking-notes" name="notes" rows="3" placeholder="Tambahkan catatan internal jika diperlukan" data-testid="input-booking-notes"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="admin-users-dialog-actions">
                        <button class="admin-users-secondary-button" type="button" data-modal-close="booking-form-modal">Batal</button>
                        <button class="admin-users-primary-button" type="submit" id="booking-submit-btn" data-testid="submit-booking-btn">Simpan</button>
                    </div>
                </form>
            </div>
        </div>

        {{-- Delete Booking Modal --}}
        <div class="modal-shell" id="booking-delete-modal" hidden>
            <div class="modal-backdrop" data-modal-close="booking-delete-modal"></div>

            <div class="modal-card admin-users-dialog-card admin-users-delete-dialog-card">
                <div class="admin-users-dialog-head">
                    <div>
                        <h3>Hapus Pemesanan</h3>
                        <p id="booking-delete-copy">Apakah Anda yakin ingin menghapus data pemesanan ini? Tindakan ini tidak dapat dibatalkan.</p>
                    </div>
                    <button type="button" class="admin-users-dialog-close" data-modal-close="booking-delete-modal" aria-label="Tutup">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>

                <div class="admin-users-dialog-actions">
                    <button class="admin-users-secondary-button" type="button" data-modal-close="booking-delete-modal">Batal</button>
                    <button class="admin-users-danger-button" type="button" id="booking-delete-confirm-btn" data-testid="confirm-delete-booking-btn">Hapus</button>
                </div>
            </div>
        </div>
    </section>
@endsection
