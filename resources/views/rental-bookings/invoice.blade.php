@extends('layouts.dashboard')

@php
    $paidStatuses = ['Dibayar', 'Dibayar Tunai'];
    $paymentStatusBadgeClass = in_array($invoiceState['payment_status'], $paidStatuses, true)
        ? 'stock-value-badge-emerald'
        : 'stock-value-badge-blue';
@endphp

@section('content')
    <section class="regular-booking-page animate-fade-in">
        <section class="regular-booking-page-header">
            <div class="regular-booking-page-copy">
                <h1>Invoice Pemesanan Rental</h1>
                <p>Invoice ini dibuat setelah pembayaran dicatat untuk rental mobil.</p>
            </div>

            <div class="regular-booking-page-actions">
                <span class="stock-value-badge stock-value-badge-emerald">{{ $invoiceState['invoice_number'] }}</span>
            </div>
        </section>

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

        <div class="regular-booking-layout">
            <section class="regular-booking-form-card">
                <section class="regular-booking-review-status-card">
                    <div class="regular-booking-review-status-copy">
                        <h2>Invoice Rental Siap Dilihat</h2>
                        <p>Pembayaran rental mobil {{ $invoiceState['booking_code'] }} sudah dicatat. Gunakan invoice ini sebagai ringkasan transaksi resmi sebelum membuka e-ticket rental.</p>
                    </div>

                    <div class="regular-booking-review-status-meta">
                        <span class="stock-value-badge stock-value-badge-emerald">{{ $invoiceState['invoice_number'] }}</span>
                        <span class="stock-value-badge {{ $paymentStatusBadgeClass }}">{{ $invoiceState['payment_status'] }}</span>
                    </div>
                </section>

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Informasi Transaksi</h2>
                        <p>Seluruh data invoice diambil dari rental mobil yang sudah menyelesaikan tahap pembayaran.</p>
                    </div>

                    <div class="regular-booking-review-grid">
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Nomor Invoice</span>
                            <strong>{{ $invoiceState['invoice_number'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Nama</span>
                            <strong>{{ $invoiceState['passenger_name'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Metode Pembayaran</span>
                            <strong>{{ $invoiceState['payment_method'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Status Pembayaran</span>
                            <strong>{{ $invoiceState['payment_status'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Tanggal Transaksi</span>
                            <strong>{{ $invoiceState['transaction_date_label'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Jumlah Pembayaran</span>
                            <strong>{{ $invoiceState['nominal_payment_formatted'] }}</strong>
                        </div>
                    </div>
                </section>

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Informasi Rental Mobil</h2>
                        <p>Rute dan periode rental yang tercatat pada booking aktif.</p>
                    </div>

                    <div class="regular-booking-review-grid">
                        <div class="regular-booking-summary-item">
                            <span>Asal</span>
                            <strong>{{ $invoiceState['from_city'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Tujuan</span>
                            <strong>{{ $invoiceState['to_city'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Tgl. Mulai Rental</span>
                            <strong>{{ $invoiceState['trip_date'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Tgl. Selesai Rental</span>
                            <strong>{{ $rentalEndDate }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Posisi Tempat Duduk</span>
                            <strong>{{ $invoiceState['selected_seats_label'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Nomor Booking</span>
                            <strong>{{ $invoiceState['booking_code'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Referensi Pembayaran</span>
                            <strong>{{ $invoiceState['payment_reference'] }}</strong>
                        </div>
                    </div>
                </section>

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Data Pemesan</h2>
                        <p>Data pemesan yang berlaku untuk seluruh 6 kursi rental.</p>
                    </div>

                    @php $passenger = $invoiceState['passengers'][0] ?? null; @endphp

                    @if ($passenger)
                        <div class="regular-booking-passenger-list">
                            <article class="regular-booking-passenger-card">
                                <div class="regular-booking-passenger-card-head">
                                    <div>
                                        <h3>{{ $passenger['name'] }}</h3>
                                        <p>Berlaku untuk semua kursi (1A, 2A, 2B, 3A, 4A, 5A)</p>
                                    </div>

                                    <span class="stock-value-badge stock-value-badge-blue">Semua Kursi</span>
                                </div>

                                <div class="regular-booking-review-grid">
                                    <div class="regular-booking-summary-item">
                                        <span>No HP</span>
                                        <strong>{{ $passenger['phone'] }}</strong>
                                    </div>
                                </div>
                            </article>
                        </div>
                    @endif
                </section>

                <div class="regular-booking-form-actions">
                    <a href="{{ route('rental-bookings.invoice.download') }}" class="dashboard-ghost-button">Download PDF Invoice</a>
                    <a href="{{ route('rental-bookings.ticket') }}" class="dashboard-primary-button">Lihat E-ticket Rental</a>
                    <a href="{{ route('dashboard') }}" class="dashboard-ghost-button">Kembali ke Dashboard</a>
                </div>
            </section>

            <aside class="regular-booking-sidebar">
                <section class="regular-booking-summary-card">
                    <div class="regular-booking-summary-head">
                        <h2>Ringkasan Invoice</h2>
                        <p>Panel ringkas ini memudahkan verifikasi data transaksi rental.</p>
                    </div>

                    <div class="regular-booking-summary-grid">
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Nomor Invoice</span>
                            <strong>{{ $invoiceState['invoice_number'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Status Pembayaran</span>
                            <strong>{{ $invoiceState['payment_status'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Metode Pembayaran</span>
                            <strong>{{ $invoiceState['payment_method'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Kursi Rental</span>
                            <strong>{{ $invoiceState['selected_seats_label'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Total Dibayar</span>
                            <strong>{{ $invoiceState['nominal_payment_formatted'] }}</strong>
                        </div>
                    </div>
                </section>
            </aside>
        </div>
    </section>
@endsection
