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
                <h1>Surat Bukti Pengiriman Barang</h1>
                <p>Bukti resmi pengiriman paket melalui Lancang Kuning Travelindo.</p>
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
                        <h2>Surat Bukti Pengiriman Siap</h2>
                        <p>Pengiriman paket {{ $invoiceState['booking_code'] }} sudah dicatat. Gunakan surat ini sebagai bukti resmi pengiriman barang.</p>
                    </div>

                    <div class="regular-booking-review-status-meta">
                        <span class="stock-value-badge stock-value-badge-emerald">{{ $invoiceState['invoice_number'] }}</span>
                        <span class="stock-value-badge {{ $paymentStatusBadgeClass }}">{{ $invoiceState['payment_status'] }}</span>
                    </div>
                </section>

                {{-- Informasi Pengiriman --}}
                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Informasi Pengiriman</h2>
                    </div>

                    <div class="regular-booking-review-grid">
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>No. Surat</span>
                            <strong>{{ $invoiceState['invoice_number'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Kode Booking</span>
                            <strong>{{ $invoiceState['booking_code'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Rute</span>
                            <strong>{{ $invoiceState['from_city'] }} → {{ $invoiceState['to_city'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Jadwal Keberangkatan</span>
                            <strong>{{ $invoiceState['trip_date'] }} | {{ $invoiceState['trip_time'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Ukuran Paket</span>
                            <strong>{{ $invoiceState['package_size_label'] }}</strong>
                        </div>
                        @if ($invoiceState['selected_seats_label'] !== 'Belum dipilih' && $invoiceState['selected_seats_label'] !== '')
                            <div class="regular-booking-summary-item">
                                <span>Kursi Paket</span>
                                <strong>{{ $invoiceState['selected_seats_label'] }}</strong>
                            </div>
                        @endif
                        <div class="regular-booking-summary-item">
                            <span>Tanggal Transaksi</span>
                            <strong>{{ $invoiceState['transaction_date_label'] }}</strong>
                        </div>
                    </div>
                </section>

                {{-- Pengirim & Penerima --}}
                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Pengirim & Penerima</h2>
                    </div>

                    <div class="regular-booking-review-grid">
                        <div class="regular-booking-summary-item">
                            <span>Pengirim</span>
                            <strong>{{ $invoiceState['sender_name'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>No. HP Pengirim</span>
                            <strong>{{ $invoiceState['sender_phone'] ?: '-' }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Alamat Pengirim</span>
                            <strong>{{ $invoiceState['sender_address'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Penerima</span>
                            <strong>{{ $invoiceState['recipient_name'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>No. HP Penerima</span>
                            <strong>{{ $invoiceState['recipient_phone'] ?: '-' }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Alamat Penerima</span>
                            <strong>{{ $invoiceState['recipient_address'] }}</strong>
                        </div>
                    </div>
                </section>

                {{-- Detail Barang --}}
                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Detail Barang & Ongkos</h2>
                    </div>

                    <div style="overflow-x: auto;">
                        <table style="width:100%; border-collapse:collapse; margin-top:0.5rem;">
                            <thead>
                                <tr style="background:#0ea5e9; color:white;">
                                    <th style="padding:10px 14px; text-align:center; border:1px solid #0284c7; font-size:0.875rem;">Jumlah</th>
                                    <th style="padding:10px 14px; text-align:left; border:1px solid #0284c7; font-size:0.875rem;">Nama Barang</th>
                                    <th style="padding:10px 14px; text-align:right; border:1px solid #0284c7; font-size:0.875rem;">Biaya</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="padding:10px 14px; text-align:center; border:1px solid #e2e8f0;">{{ $invoiceState['item_qty'] }}</td>
                                    <td style="padding:10px 14px; border:1px solid #e2e8f0;">{{ $invoiceState['item_name'] }}</td>
                                    <td style="padding:10px 14px; text-align:right; border:1px solid #e2e8f0;">{{ $invoiceState['fare_amount_formatted'] }}</td>
                                </tr>
                                <tr style="background:#f8fafc;">
                                    <td colspan="2" style="padding:10px 14px; text-align:right; border:1px solid #e2e8f0; font-weight:600;">Total Ongkos</td>
                                    <td style="padding:10px 14px; text-align:right; border:1px solid #e2e8f0; font-weight:700; color:#0ea5e9;">{{ $invoiceState['total_amount_formatted'] }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {{-- Pembayaran --}}
                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Informasi Pembayaran</h2>
                    </div>

                    <div class="regular-booking-review-grid">
                        <div class="regular-booking-summary-item">
                            <span>Metode Pembayaran</span>
                            <strong>{{ $invoiceState['payment_method'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Status Pembayaran</span>
                            <strong>{{ $invoiceState['payment_status'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Referensi</span>
                            <strong>{{ $invoiceState['payment_reference'] }}</strong>
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

                {{-- Tanda Tangan --}}
                <section class="regular-booking-section">
                    <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:1.5rem; margin-top:1rem; text-align:center;">
                        <div style="border:1px solid #e2e8f0; border-radius:8px; padding:1rem;">
                            <p style="font-weight:600; margin-bottom:3rem;">Penerima</p>
                            <p style="border-top:1px solid #94a3b8; padding-top:0.5rem; font-size:0.8rem; color:#64748b;">(...........................)</p>
                        </div>
                        <div style="border:1px solid #e2e8f0; border-radius:8px; padding:1rem;">
                            <p style="font-weight:600; margin-bottom:3rem;">Pengurus</p>
                            <p style="border-top:1px solid #94a3b8; padding-top:0.5rem; font-size:0.8rem; color:#64748b;">(...........................)</p>
                        </div>
                        <div style="border:1px solid #e2e8f0; border-radius:8px; padding:1rem;">
                            <p style="font-weight:600; margin-bottom:3rem;">Pengirim</p>
                            <p style="border-top:1px solid #94a3b8; padding-top:0.5rem; font-size:0.8rem; color:#64748b;">(...........................)</p>
                        </div>
                    </div>
                </section>

                <div class="regular-booking-form-actions">
                    <a href="{{ route('package-bookings.invoice.download') }}" class="dashboard-ghost-button">Download PDF Surat</a>
                    <a href="{{ route('dashboard') }}" class="dashboard-ghost-button">Kembali ke Dashboard</a>
                    <a href="{{ route('package-bookings.index') }}" class="dashboard-primary-button">Input Paket Baru</a>
                </div>
            </section>

            <aside class="regular-booking-sidebar">
                <section class="regular-booking-summary-card">
                    <div class="regular-booking-summary-head">
                        <h2>Ringkasan Surat</h2>
                    </div>

                    <div class="regular-booking-summary-grid">
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>No. Surat</span>
                            <strong>{{ $invoiceState['invoice_number'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Pengirim</span>
                            <strong>{{ $invoiceState['sender_name'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Penerima</span>
                            <strong>{{ $invoiceState['recipient_name'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Rute</span>
                            <strong>{{ $invoiceState['from_city'] }} → {{ $invoiceState['to_city'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Ukuran</span>
                            <strong>{{ $invoiceState['package_size_label'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Status</span>
                            <strong>{{ $invoiceState['payment_status'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Total Ongkos</span>
                            <strong>{{ $invoiceState['total_amount_formatted'] }}</strong>
                        </div>
                    </div>
                </section>
            </aside>
        </div>
    </section>
@endsection
