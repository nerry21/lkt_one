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
                <h1>Invoice Pemesanan</h1>
                <p>Invoice ini dibuat setelah pembayaran dicatat dan menjadi dasar untuk proses e-ticket pada tahap berikutnya.</p>
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
                        <h2>Invoice Siap Dilihat</h2>
                        <p>Pembayaran booking {{ $invoiceState['booking_code'] }} sudah dicatat. Gunakan invoice ini sebagai ringkasan transaksi resmi sebelum membuka e-ticket.</p>
                    </div>

                    <div class="regular-booking-review-status-meta">
                        <span class="stock-value-badge stock-value-badge-emerald">{{ $invoiceState['invoice_number'] }}</span>
                        <span class="stock-value-badge {{ $paymentStatusBadgeClass }}">{{ $invoiceState['payment_status'] }}</span>
                    </div>
                </section>

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Informasi Transaksi</h2>
                        <p>Seluruh data invoice diambil dari booking yang sudah menyelesaikan tahap pembayaran.</p>
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
                        <h2>Informasi Perjalanan</h2>
                        <p>Rute, driver, dan posisi tempat duduk yang tercatat pada booking aktif.</p>
                    </div>

                    <div class="regular-booking-review-grid">
                        <div class="regular-booking-summary-item">
                            <span>Berangkat</span>
                            <strong>{{ $invoiceState['from_city'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Tujuan</span>
                            <strong>{{ $invoiceState['to_city'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Nama Driver</span>
                            <strong>{{ $invoiceState['driver_name'] }}</strong>
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
                        <div class="regular-booking-summary-item">
                            <span>Jadwal Keberangkatan</span>
                            <strong>{{ $invoiceState['trip_date'] }} | {{ $invoiceState['trip_time'] }}</strong>
                        </div>
                    </div>
                </section>

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Data Penumpang</h2>
                        <p>Invoice ini tetap menampilkan penumpang yang terhubung dengan booking aktif.</p>
                    </div>

                    <div class="regular-booking-passenger-list">
                        @foreach ($invoiceState['passengers'] as $passenger)
                            <article class="regular-booking-passenger-card">
                                <div class="regular-booking-passenger-card-head">
                                    <div>
                                        <h3>{{ $passenger['name'] }}</h3>
                                        <p>Kursi {{ $passenger['seat_no'] }}</p>
                                    </div>

                                    <span class="stock-value-badge stock-value-badge-blue">{{ $passenger['seat_no'] }}</span>
                                </div>

                                <div class="regular-booking-review-grid">
                                    <div class="regular-booking-summary-item">
                                        <span>No HP</span>
                                        <strong>{{ $passenger['phone'] }}</strong>
                                    </div>
                                    <div class="regular-booking-summary-item">
                                        <span>Metode Pembayaran</span>
                                        <strong>{{ $invoiceState['payment_method'] }}</strong>
                                    </div>
                                </div>
                            </article>
                        @endforeach
                    </div>
                </section>

                <div class="regular-booking-form-actions">
                    <a href="{{ route('regular-bookings.invoice.download') }}" class="dashboard-ghost-button">Download PDF Invoice</a>
                    <a href="{{ route('regular-bookings.ticket') }}" class="dashboard-primary-button">Lihat E-ticket</a>
                    <a href="{{ route('dashboard') }}" class="dashboard-ghost-button">Kembali ke Dashboard</a>
                </div>
            </section>

            <aside class="regular-booking-sidebar">
                <section class="regular-booking-summary-card">
                    <div class="regular-booking-summary-head">
                        <h2>Ringkasan Invoice</h2>
                        <p>Panel ringkas ini memudahkan verifikasi data transaksi utama.</p>
                    </div>

                    <div class="regular-booking-summary-grid">
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Nomor Invoice</span>
                            <strong>{{ $invoiceState['invoice_number'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Nama Driver</span>
                            <strong>{{ $invoiceState['driver_name'] }}</strong>
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
                            <span>Posisi Tempat Duduk</span>
                            <strong>{{ $invoiceState['selected_seats_label'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Kanal Pembayaran</span>
                            <strong>{{ $invoiceState['payment_account_label'] }}</strong>
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
