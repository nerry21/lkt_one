@extends('layouts.dashboard')

@php
    $selectedPaymentMethod = $paymentFormState['payment_method'] ?? '';
    $selectedBankAccountCode = $paymentFormState['bank_account_code'] ?? '';
    $paidStatuses = ['Dibayar', 'Dibayar Tunai'];
    $paymentStatusBadgeClass = in_array($persistedBooking->payment_status, $paidStatuses, true)
        ? 'stock-value-badge-emerald'
        : 'stock-value-badge-blue';
@endphp

@section('content')
    <section class="regular-booking-page animate-fade-in">
        <section class="regular-booking-page-header">
            <div class="regular-booking-page-copy">
                <h1>Pembayaran</h1>
                <p>Pilih metode pembayaran untuk dropping booking yang sudah direview dan disimpan sebagai draft.</p>
            </div>

            <div class="regular-booking-page-actions">
                <span class="stock-value-badge stock-value-badge-emerald">Tahap Lanjutan</span>
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
                    <span class="regular-booking-feedback-label">Periksa Pembayaran</span>
                    <p>Masih ada data metode pembayaran yang perlu diperbaiki sebelum dapat disimpan.</p>
                </div>
            </section>
        @endif

        <div class="regular-booking-layout">
            <form method="POST" action="{{ route('dropping-bookings.payment.store') }}" class="regular-booking-form-card">
                @csrf

                <section class="regular-booking-review-status-card">
                    <div class="regular-booking-review-status-copy">
                        <h2>Dropping Booking Siap Dibayar</h2>
                        <p>Booking {{ $persistedBooking->booking_code }} sudah tersimpan. Tahap ini mencatat pembayaran, memperbarui status booking, dan meneruskan Anda ke invoice serta e-ticket dropping.</p>
                    </div>

                    <div class="regular-booking-review-status-meta">
                        <span class="stock-value-badge stock-value-badge-emerald">{{ $persistedBooking->booking_code }}</span>
                        <span class="stock-value-badge {{ $paymentStatusBadgeClass }}">{{ $persistedBooking->payment_status }}</span>
                    </div>
                </section>

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Metode Pembayaran</h2>
                        <p>Pilih metode pembayaran yang akan dipakai untuk melanjutkan proses dropping booking.</p>
                    </div>

                    <div class="regular-booking-options">
                        @foreach ($paymentMethods as $paymentMethod)
                            <label class="regular-booking-radio {{ $selectedPaymentMethod === $paymentMethod['value'] ? 'is-selected' : '' }}">
                                <input
                                    type="radio"
                                    name="payment_method"
                                    value="{{ $paymentMethod['value'] }}"
                                    @checked($selectedPaymentMethod === $paymentMethod['value'])
                                    required
                                >
                                <span class="regular-booking-radio-marker" aria-hidden="true"></span>
                                <span class="regular-booking-radio-copy">
                                    <strong>{{ $paymentMethod['label'] }}</strong>
                                    <span>{{ $paymentMethod['description'] }}</span>
                                </span>
                            </label>
                        @endforeach
                    </div>

                    @error('payment_method')
                        <p class="regular-booking-field-error">{{ $message }}</p>
                    @enderror
                </section>

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Daftar Rekening Bank</h2>
                        <p>Daftar rekening berikut disiapkan sebagai tujuan pembayaran ketika metode transfer dipilih.</p>
                    </div>

                    <div class="regular-booking-options">
                        @foreach ($bankAccounts as $bankAccount)
                            <label class="regular-booking-radio {{ $selectedBankAccountCode === $bankAccount['code'] ? 'is-selected' : '' }}">
                                <input
                                    type="radio"
                                    name="bank_account_code"
                                    value="{{ $bankAccount['code'] }}"
                                    @checked($selectedBankAccountCode === $bankAccount['code'])
                                >
                                <span class="regular-booking-radio-marker" aria-hidden="true"></span>
                                <span class="regular-booking-radio-copy">
                                    <strong>{{ $bankAccount['bank_name'] }} - {{ $bankAccount['account_number'] }}</strong>
                                    <span>{{ $bankAccount['account_holder'] }}</span>
                                </span>
                            </label>
                        @endforeach
                    </div>

                    <p class="regular-booking-field-note">Jika Anda memilih QRIS atau Cash, rekening tujuan transfer tidak wajib dipilih.</p>

                    @error('bank_account_code')
                        <p class="regular-booking-field-error">{{ $message }}</p>
                    @enderror
                </section>

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Detail Metode Pembayaran</h2>
                        <p>Detail kanal pembayaran ditampilkan mengikuti metode yang sedang dipilih.</p>
                    </div>

                    @if ($paymentFormState['shows_transfer_accounts'])
                        <div class="regular-booking-review-grid">
                            <div class="regular-booking-summary-item">
                                <span>Metode Aktif</span>
                                <strong>Transfer</strong>
                            </div>
                            <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                                <span>Rekening Tujuan</span>
                                <strong>{{ $paymentFormState['bank_account_label'] }}</strong>
                            </div>
                        </div>
                    @elseif ($paymentFormState['shows_qris_account'] && $paymentFormState['qris_account'])
                        <div class="regular-booking-review-grid">
                            <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                                <span>Nama QRIS</span>
                                <strong>{{ $paymentFormState['qris_account']['provider_name'] }}</strong>
                            </div>
                            <div class="regular-booking-summary-item">
                                <span>Kode QRIS</span>
                                <strong>{{ $paymentFormState['qris_account']['account_number'] }}</strong>
                            </div>
                            <div class="regular-booking-summary-item">
                                <span>Atas Nama</span>
                                <strong>{{ $paymentFormState['qris_account']['account_holder'] }}</strong>
                            </div>
                        </div>
                    @elseif ($paymentFormState['shows_cash_note'])
                        <div class="regular-booking-review-grid">
                            <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                                <span>Metode Aktif</span>
                                <strong>Cash</strong>
                            </div>
                            <div class="regular-booking-summary-item">
                                <span>Keterangan</span>
                                <strong>{{ $paymentFormState['cash_note'] }}</strong>
                            </div>
                        </div>
                    @else
                        <div class="dashboard-empty-state dashboard-empty-state--block">
                            Pilih metode pembayaran terlebih dahulu untuk melihat detail kanal transfer, QRIS, atau pembayaran tunai.
                        </div>
                    @endif
                </section>

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Ringkasan Pembayaran</h2>
                        <p>Nominal pembayaran mengikuti total tarif dari draft dropping booking.</p>
                    </div>

                    <div class="regular-booking-review-grid">
                        <div class="regular-booking-summary-item">
                            <span>Nomor Booking</span>
                            <strong>{{ $persistedBooking->booking_code }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Metode Dipilih</span>
                            <strong>{{ $paymentFormState['payment_method_label'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Nominal Pembayaran</span>
                            <strong>{{ $draftSummary['estimated_total'] }}</strong>
                        </div>
                    </div>
                </section>

                <div class="regular-booking-form-actions">
                    <a href="{{ route('dropping-bookings.review') }}" class="dashboard-ghost-button">Kembali ke Review</a>
                    <button class="dashboard-primary-button" type="submit">Selesaikan Pembayaran</button>
                </div>
            </form>

            <aside class="regular-booking-sidebar">
                <section class="regular-booking-summary-card">
                    <div class="regular-booking-summary-head">
                        <h2>Ringkasan Pembayaran</h2>
                        <p>Panel ini merangkum dropping booking yang akan dilanjutkan ke invoice dan e-ticket.</p>
                    </div>

                    <div class="regular-booking-summary-grid">
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Kode Booking</span>
                            <strong>{{ $persistedBooking->booking_code }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Status Booking</span>
                            <strong>{{ $persistedBooking->booking_status }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Status Pembayaran</span>
                            <strong>{{ $persistedBooking->payment_status }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Metode Pembayaran</span>
                            <strong>{{ $paymentFormState['payment_method_label'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Rute</span>
                            <strong>{{ $reviewState['route_label'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Kursi</span>
                            <strong>{{ $reviewState['selected_seats_label'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Total Tarif</span>
                            <strong>{{ $reviewState['total_amount_formatted'] }}</strong>
                        </div>
                    </div>
                </section>
            </aside>
        </div>
    </section>
@endsection
