@extends('layouts.dashboard')

@section('content')
    <section class="admin-users-page animate-fade-in bookings-show-page">
        <section class="admin-users-page-header">
            <div class="admin-users-page-copy">
                <h1>Detail Pemesanan</h1>
                <p>Informasi lengkap pemesanan {{ $detail['booking_code'] }} untuk kebutuhan monitoring dan tindak lanjut admin.</p>
            </div>

            <div class="admin-users-page-actions">
                <span class="stock-value-badge stock-value-badge-blue">{{ $detail['booking_code'] }}</span>
                <span class="{{ $detail['booking_status_badge_class'] }}">{{ $detail['booking_status'] }}</span>
                <span class="{{ $detail['payment_status_badge_class'] }}">{{ $detail['payment_status'] }}</span>
            </div>
        </section>

        <div class="bookings-show-layout">
            <div class="bookings-show-main">
                <article class="dashboard-panel-card bookings-show-card">
                    <div class="dashboard-panel-head">
                        <div>
                            <h3>Informasi Pemesan</h3>
                            <p>Ringkasan identitas pemesan dan rute perjalanan yang tersimpan pada sistem.</p>
                        </div>
                    </div>

                    <div class="bookings-detail-grid">
                        <div class="admin-users-detail-item">
                            <span>Nama Pemesan</span>
                            <strong>{{ $detail['nama_pemesanan'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>No HP</span>
                            <strong>{{ $detail['phone'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Jenis Pemesanan</span>
                            <strong>{{ $detail['booking_for'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Jenis Layanan</span>
                            <strong>{{ $detail['category'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Asal</span>
                            <strong>{{ $detail['from_city'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Tujuan</span>
                            <strong>{{ $detail['to_city'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Tanggal Keberangkatan</span>
                            <strong>{{ $detail['trip_date_label'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Waktu Keberangkatan</span>
                            <strong>{{ $detail['trip_time_label'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Kursi</span>
                            <strong>{{ $detail['selected_seats_label'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Jumlah Penumpang</span>
                            <strong>{{ $detail['passenger_count'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Driver</span>
                            <strong>{{ $detail['driver_name'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Rute</span>
                            <strong>{{ $detail['route_label'] }}</strong>
                        </div>
                    </div>
                </article>

                <article class="dashboard-panel-card bookings-show-card">
                    <div class="dashboard-panel-head">
                        <div>
                            <h3>Pembayaran dan Dokumen</h3>
                            <p>Status pembayaran, nilai transaksi, dan identitas dokumen booking.</p>
                        </div>
                    </div>

                    <div class="bookings-detail-grid">
                        <div class="admin-users-detail-item">
                            <span>Biaya</span>
                            <strong>{{ $detail['total_amount_formatted'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Tarif per Kursi</span>
                            <strong>{{ $detail['price_per_seat_formatted'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Nominal Pembayaran</span>
                            <strong>{{ $detail['nominal_payment_formatted'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Metode Pembayaran</span>
                            <strong>{{ $detail['payment_method'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Status Pembayaran</span>
                            <strong>{{ $detail['payment_status'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Status Tiket</span>
                            <strong>{{ $detail['ticket_status'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Nomor Invoice</span>
                            <strong>{{ $detail['invoice_number'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Nomor Tiket</span>
                            <strong>{{ $detail['ticket_number'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Referensi Pembayaran</span>
                            <strong>{{ $detail['payment_reference'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Rekening / Kanal</span>
                            <strong>{{ $detail['payment_account_label'] }}</strong>
                        </div>
                    </div>
                </article>

                <article class="dashboard-panel-card bookings-show-card">
                    <div class="dashboard-panel-head">
                        <div>
                            <h3>Alamat Layanan</h3>
                            <p>Alamat penjemputan dan pengantaran lengkap yang digunakan pada booking.</p>
                        </div>
                    </div>

                    <div class="bookings-detail-grid">
                        <div class="admin-users-detail-item">
                            <span>Alamat Penjemputan</span>
                            <p>{{ $detail['pickup_location'] }}</p>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Alamat Pengantaran</span>
                            <p>{{ $detail['dropoff_location'] }}</p>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Dibuat</span>
                            <strong>{{ $detail['created_at_label'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Catatan</span>
                            <p>{{ $detail['notes'] !== '' ? $detail['notes'] : '-' }}</p>
                        </div>
                    </div>
                </article>

                <article class="dashboard-panel-card bookings-show-card">
                    <div class="dashboard-panel-head">
                        <div>
                            <h3>Data Penumpang</h3>
                            <p>Urutan penumpang mengikuti kursi yang tersimpan pada booking.</p>
                        </div>
                    </div>

                    <div class="bookings-passenger-grid">
                        @foreach ($detail['passengers'] as $passenger)
                            <article class="bookings-passenger-card">
                                <span class="stock-value-badge stock-value-badge-blue">{{ $passenger['seat_no'] }}</span>
                                <strong>{{ $passenger['name'] }}</strong>
                                <p>{{ $passenger['phone'] }}</p>
                            </article>
                        @endforeach
                    </div>
                </article>
            </div>

            <aside class="bookings-show-sidebar">
                <article class="dashboard-panel-card bookings-show-card">
                    <div class="dashboard-panel-head">
                        <div>
                            <h3>QR Code Tiket</h3>
                            <p>QR code akan tampil bila booking sudah memiliki metadata tiket dan loyalti.</p>
                        </div>
                    </div>

                    @if ($detail['has_qr_code'])
                        <div class="bookings-show-qr-stage">
                            <div>{!! $detail['qr_code_markup'] !!}</div>
                        </div>

                        <div class="bookings-detail-grid bookings-detail-grid--single">
                            <div class="admin-users-detail-item">
                                <span>Token QR</span>
                                <strong>{{ $detail['qr_token'] }}</strong>
                            </div>
                            <div class="admin-users-detail-item">
                                <span>Status Loyalti</span>
                                <strong>{{ $detail['discount_status_label'] }}</strong>
                            </div>
                            <div class="admin-users-detail-item">
                                <span>Scan Loyalti</span>
                                <strong>{{ $detail['loyalty_scan_label'] }}</strong>
                            </div>
                        </div>
                    @else
                        <div class="dashboard-empty-state dashboard-empty-state--block bookings-show-empty">
                            QR code belum tersedia untuk booking ini.
                        </div>
                    @endif
                </article>

                <article class="dashboard-panel-card bookings-show-card">
                    <div class="dashboard-panel-head">
                        <div>
                            <h3>Aksi Cepat</h3>
                            <p>Kembali ke halaman manajemen pemesanan untuk melanjutkan proses admin.</p>
                        </div>
                    </div>

                    <div class="bookings-show-actions">
                        <a href="{{ route('bookings.index') }}" class="admin-users-secondary-button">Kembali ke Data Pemesanan</a>
                    </div>
                </article>
            </aside>
        </div>
    </section>
@endsection
