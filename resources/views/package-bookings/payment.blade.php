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
                <p>Pilih metode pembayaran untuk pengiriman paket yang sudah direview.</p>
            </div>

            <div class="regular-booking-page-actions">
                <span class="stock-value-badge stock-value-badge-emerald">Langkah 4 dari 4</span>
            </div>
        </section>

        @include('package-bookings.partials.stepper', ['steps' => $steps])

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
                    <p>Masih ada data metode pembayaran yang perlu diperbaiki.</p>
                </div>
            </section>
        @endif

        <div class="regular-booking-layout">
            <form method="POST" action="{{ route('package-bookings.payment.store') }}" class="regular-booking-form-card"
                x-data="{
                    paymentMethod: '{{ $selectedPaymentMethod }}',
                    bankAccountCode: '{{ $selectedBankAccountCode }}',
                    setMethod(method) { this.paymentMethod = method; this.bankAccountCode = ''; }
                }">
                @csrf

                <section class="regular-booking-review-status-card">
                    <div class="regular-booking-review-status-copy">
                        <h2>Paket Siap Dibayar</h2>
                        <p>Booking {{ $persistedBooking->booking_code }} sudah tersimpan. Tahap ini mencatat pembayaran dan meneruskan ke surat bukti pengiriman.</p>
                    </div>

                    <div class="regular-booking-review-status-meta">
                        <span class="stock-value-badge stock-value-badge-emerald">{{ $persistedBooking->booking_code }}</span>
                        <span class="stock-value-badge {{ $paymentStatusBadgeClass }}">{{ $persistedBooking->payment_status }}</span>
                    </div>
                </section>

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Metode Pembayaran</h2>
                        <p>Pilih metode pembayaran yang akan dipakai untuk pengiriman paket.</p>
                    </div>

                    <div class="regular-booking-options">
                        @foreach ($paymentMethods as $paymentMethod)
                            <label class="regular-booking-radio" :class="{ 'is-selected': paymentMethod === '{{ $paymentMethod['value'] }}' }">
                                <input
                                    type="radio"
                                    name="payment_method"
                                    value="{{ $paymentMethod['value'] }}"
                                    x-bind:checked="paymentMethod === '{{ $paymentMethod['value'] }}'"
                                    @change="setMethod('{{ $paymentMethod['value'] }}')"
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

                {{-- Transfer bank accounts --}}
                <section class="regular-booking-section" x-show="paymentMethod === 'transfer'" x-transition>
                    <div class="regular-booking-section-head">
                        <h2>Pilih Rekening Tujuan Transfer</h2>
                    </div>

                    <div class="regular-booking-options">
                        @foreach ($bankAccounts as $bankAccount)
                            <label class="regular-booking-radio" :class="{ 'is-selected': bankAccountCode === '{{ $bankAccount['code'] }}' }">
                                <input
                                    type="radio"
                                    name="bank_account_code"
                                    value="{{ $bankAccount['code'] }}"
                                    x-bind:checked="bankAccountCode === '{{ $bankAccount['code'] }}'"
                                    @change="bankAccountCode = '{{ $bankAccount['code'] }}'"
                                >
                                <span class="regular-booking-radio-marker" aria-hidden="true"></span>
                                <span class="regular-booking-radio-copy">
                                    <strong>{{ $bankAccount['bank_name'] }}</strong>
                                    <span>{{ $bankAccount['account_number'] }} a.n. {{ $bankAccount['account_holder'] }}</span>
                                </span>
                            </label>
                        @endforeach
                    </div>

                    @error('bank_account_code')
                        <p class="regular-booking-field-error">{{ $message }}</p>
                    @enderror
                </section>

                {{-- QRIS --}}
                @if ($paymentFormState['qris_account'])
                    <section class="regular-booking-section" x-show="paymentMethod === 'qris'" x-transition>
                        <div class="regular-booking-section-head">
                            <h2>Pembayaran QRIS</h2>
                        </div>
                        <p class="regular-booking-field-note">Scan QRIS untuk melakukan pembayaran. Pembayaran akan langsung ditandai sebagai Dibayar.</p>
                    </section>
                @endif

                {{-- Cash --}}
                <section class="regular-booking-section" x-show="paymentMethod === 'cash'" x-transition>
                    <div class="regular-booking-section-head">
                        <h2>Pembayaran Tunai</h2>
                    </div>
                    <p class="regular-booking-field-note">Pembayaran tunai langsung ditandai sebagai Dibayar Tunai.</p>
                </section>

                {{-- Ringkasan --}}
                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Ringkasan Ongkos</h2>
                    </div>

                    <div class="regular-booking-review-grid">
                        <div class="regular-booking-summary-item">
                            <span>Pengirim</span>
                            <strong>{{ $reviewState['sender_name'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Penerima</span>
                            <strong>{{ $reviewState['recipient_name'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Rute</span>
                            <strong>{{ $reviewState['route_label'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Nama Barang</span>
                            <strong>{{ $reviewState['item_name'] }} ({{ $reviewState['item_qty'] }})</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Ukuran Paket</span>
                            <strong>{{ $reviewState['package_size_label'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Total Ongkos</span>
                            <strong>{{ $reviewState['total_amount_formatted'] }}</strong>
                        </div>
                    </div>
                </section>

                <div class="regular-booking-form-actions">
                    <a href="{{ route('package-bookings.review') }}" class="dashboard-ghost-button">Kembali ke Review</a>
                    <button class="dashboard-primary-button" type="submit">Simpan Pembayaran</button>
                </div>
            </form>

            <aside class="regular-booking-sidebar">
                <section class="regular-booking-summary-card">
                    <div class="regular-booking-summary-head">
                        <h2>Ringkasan Pembayaran</h2>
                    </div>

                    <div class="regular-booking-summary-grid">
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Kode Booking</span>
                            <strong>{{ $persistedBooking->booking_code }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Pengirim</span>
                            <strong>{{ $reviewState['sender_name'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Rute</span>
                            <strong>{{ $reviewState['route_label'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Ukuran Paket</span>
                            <strong>{{ $reviewState['package_size_label'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Total Ongkos</span>
                            <strong>{{ $reviewState['total_amount_formatted'] }}</strong>
                        </div>
                    </div>
                </section>
            </aside>
        </div>
    </section>
@endsection
