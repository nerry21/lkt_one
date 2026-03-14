@extends('layouts.dashboard')

@section('content')
    <section class="regular-booking-page animate-fade-in">
        <section class="regular-booking-page-header">
            <div class="regular-booking-page-copy">
                <h1>E-ticket Pemesanan</h1>
                <p>E-ticket ini menampilkan identitas booking yang sudah tercatat setelah tahap pembayaran selesai.</p>
            </div>

            <div class="regular-booking-page-actions">
                <span class="stock-value-badge stock-value-badge-emerald">{{ $ticketState['ticket_number'] }}</span>
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
                        <h2>E-ticket Siap Ditinjau</h2>
                        <p>E-ticket ini menjadi identitas perjalanan untuk booking {{ $ticketState['booking_code'] }} dan siap diperkaya pada tahap berikutnya.</p>
                    </div>

                    <div class="regular-booking-review-status-meta">
                        <span class="stock-value-badge stock-value-badge-emerald">{{ $ticketState['ticket_number'] }}</span>
                        <span class="stock-value-badge stock-value-badge-blue">{{ $ticketState['ticket_status'] }}</span>
                    </div>
                </section>

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Informasi Tiket</h2>
                        <p>Data tiket diambil dari booking dan penumpang yang sudah menyelesaikan tahap pembayaran.</p>
                    </div>

                    <div class="regular-booking-review-grid">
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Nomor Tiket</span>
                            <strong>{{ $ticketState['ticket_number'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Nama</span>
                            <strong>{{ $ticketState['passenger_name'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Berangkat</span>
                            <strong>{{ $ticketState['from_city'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Tujuan</span>
                            <strong>{{ $ticketState['to_city'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Posisi Tempat Duduk</span>
                            <strong>{{ $ticketState['selected_seats_label'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Tanggal Keberangkatan</span>
                            <strong>{{ $ticketState['trip_date'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Jam Keberangkatan</span>
                            <strong>{{ $ticketState['trip_time'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Status Tiket</span>
                            <strong>{{ $ticketState['ticket_status'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Status Pembayaran</span>
                            <strong>{{ $ticketState['payment_status'] }}</strong>
                        </div>
                    </div>
                </section>

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>QR Code Tiket</h2>
                        <p>QR code ini disiapkan untuk program loyalti. Setelah 5 scan, booking akan eligible diskon 50%.</p>
                    </div>

                    <article class="regular-booking-passenger-card">
                        <div class="regular-booking-passenger-card-head">
                            <div>
                                <h3>QR Code Loyalti</h3>
                                <p>Token {{ $ticketState['qr_token'] }}</p>
                            </div>

                            <span class="stock-value-badge {{ $ticketState['eligible_discount'] ? 'stock-value-badge-emerald' : 'stock-value-badge-blue' }}">
                                {{ $ticketState['discount_status_label'] }}
                            </span>
                        </div>

                        <div class="regular-booking-review-grid">
                            <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                                <span>QR Code</span>
                                <div>{!! $ticketState['qr_code_markup'] !!}</div>
                            </div>
                            <div class="regular-booking-summary-item">
                                <span>Scan Loyalti</span>
                                <strong>{{ $ticketState['scan_count'] }} / {{ $ticketState['loyalty_target'] }}</strong>
                            </div>
                            <div class="regular-booking-summary-item">
                                <span>Loyalti Trip</span>
                                <strong>{{ $ticketState['loyalty_trip_count'] }}</strong>
                            </div>
                            <div class="regular-booking-summary-item">
                                <span>Sisa Menuju Diskon</span>
                                <strong>{{ $ticketState['remaining_loyalty_steps'] }}</strong>
                            </div>
                        </div>
                    </article>
                </section>

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Penumpang Terdaftar</h2>
                        <p>Urutan penumpang tetap mengikuti kursi yang tersimpan pada booking.</p>
                    </div>

                    <div class="regular-booking-passenger-list">
                        @foreach ($ticketState['passengers'] as $passenger)
                            <article class="regular-booking-passenger-card">
                                <div class="regular-booking-passenger-card-head">
                                    <div>
                                        <h3>{{ $passenger['name'] }}</h3>
                                        <p>No HP {{ $passenger['phone'] }}</p>
                                    </div>

                                    <span class="stock-value-badge stock-value-badge-emerald">{{ $passenger['seat_no'] }}</span>
                                </div>
                            </article>
                        @endforeach
                    </div>
                </section>

                <div class="regular-booking-form-actions">
                    <a href="{{ route('regular-bookings.invoice') }}" class="dashboard-ghost-button">Kembali ke Invoice</a>
                    <a href="{{ route('regular-bookings.ticket.download') }}" class="dashboard-primary-button">Download PDF E-ticket</a>
                </div>
            </section>

            <aside class="regular-booking-sidebar">
                <section class="regular-booking-summary-card">
                    <div class="regular-booking-summary-head">
                        <h2>Ringkasan E-ticket</h2>
                        <p>Panel ini memuat identitas perjalanan yang paling penting untuk tahap lanjutan.</p>
                    </div>

                    <div class="regular-booking-summary-grid">
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Nomor Tiket</span>
                            <strong>{{ $ticketState['ticket_number'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Status Tiket</span>
                            <strong>{{ $ticketState['ticket_status'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Status Pembayaran</span>
                            <strong>{{ $ticketState['payment_status'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Rute</span>
                            <strong>{{ $ticketState['route_label'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Token QR</span>
                            <strong>{{ $ticketState['qr_token'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Scan Loyalti</span>
                            <strong>{{ $ticketState['scan_count'] }} / {{ $ticketState['loyalty_target'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Status Diskon</span>
                            <strong>{{ $ticketState['discount_status_label'] }}</strong>
                        </div>
                    </div>
                </section>
            </aside>
        </div>
    </section>
@endsection
