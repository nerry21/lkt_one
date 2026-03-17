@extends('layouts.dashboard')

@section('content')
    <section class="regular-booking-page animate-fade-in">
        <section class="regular-booking-page-header">
            <div class="regular-booking-page-copy">
                <h1>Review Pengiriman Paket</h1>
                <p>Periksa kembali seluruh informasi pengiriman paket sebelum dilanjutkan ke tahap pembayaran.</p>
            </div>

            <div class="regular-booking-page-actions">
                <span class="stock-value-badge stock-value-badge-emerald">Langkah 3 dari 4</span>
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

        <div class="regular-booking-layout">
            <form method="POST" action="{{ route('package-bookings.review.store') }}" class="regular-booking-form-card">
                @csrf

                @if ($persistedBooking)
                    <section class="regular-booking-review-status-card">
                        <div class="regular-booking-review-status-copy">
                            <h2>Draft Pengiriman Tersimpan</h2>
                            <p>Draft pengiriman ini sudah tersimpan dan siap dilanjutkan ke tahap pembayaran.</p>
                        </div>

                        <div class="regular-booking-review-status-meta">
                            <span class="stock-value-badge stock-value-badge-emerald">{{ $persistedBooking->booking_code }}</span>
                            <span class="stock-value-badge stock-value-badge-blue">{{ $persistedBooking->booking_status }}</span>
                        </div>
                    </section>
                @endif

                {{-- Informasi Pengiriman --}}
                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Informasi Pengiriman</h2>
                        <p>Rute, jadwal, dan ukuran paket yang akan dikirim.</p>
                    </div>

                    <div class="regular-booking-review-grid">
                        <div class="regular-booking-summary-item">
                            <span>Asal</span>
                            <strong>{{ $reviewState['pickup_city'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Tujuan</span>
                            <strong>{{ $reviewState['destination_city'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Tanggal Keberangkatan</span>
                            <strong>{{ \Carbon\Carbon::parse($reviewState['trip_date'])->translatedFormat('d F Y') }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Jam Keberangkatan</span>
                            <strong>{{ $reviewState['departure_time'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Ukuran Paket</span>
                            <strong>{{ $reviewState['package_size_label'] }}</strong>
                        </div>
                        @if ($reviewState['requires_seat'])
                            <div class="regular-booking-summary-item">
                                <span>Kursi Terpilih</span>
                                <strong>{{ $reviewState['selected_seats_label'] }}</strong>
                            </div>
                        @endif
                    </div>
                </section>

                {{-- Data Pengirim & Penerima --}}
                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Data Pengirim & Penerima</h2>
                    </div>

                    <div class="regular-booking-review-grid">
                        <div class="regular-booking-summary-item">
                            <span>Pengirim</span>
                            <strong>{{ $reviewState['sender_name'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>No. HP Pengirim</span>
                            <strong>{{ $reviewState['sender_phone'] ?: '-' }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Alamat Pengirim</span>
                            <strong>{{ $reviewState['sender_address'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Penerima</span>
                            <strong>{{ $reviewState['recipient_name'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>No. HP Penerima</span>
                            <strong>{{ $reviewState['recipient_phone'] ?: '-' }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Alamat Penerima</span>
                            <strong>{{ $reviewState['recipient_address'] }}</strong>
                        </div>
                    </div>
                </section>

                {{-- Detail Barang & Ongkos --}}
                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Detail Barang & Ongkos</h2>
                    </div>

                    <div class="regular-booking-review-grid">
                        <div class="regular-booking-summary-item">
                            <span>Nama Barang</span>
                            <strong>{{ $reviewState['item_name'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Jumlah</span>
                            <strong>{{ $reviewState['item_qty'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Ongkos Tarif</span>
                            <strong>{{ $reviewState['fare_amount_formatted'] }}</strong>
                        </div>
                        @if ($reviewState['additional_fare'] > 0)
                            <div class="regular-booking-summary-item">
                                <span>Ongkos Tambahan</span>
                                <strong>{{ $reviewState['additional_fare_formatted'] }}</strong>
                            </div>
                        @endif
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Total Ongkos</span>
                            <strong>{{ $reviewState['total_amount_formatted'] }}</strong>
                        </div>
                    </div>
                </section>

                <div class="regular-booking-form-actions">
                    <a href="{{ route('package-bookings.package') }}" class="dashboard-ghost-button">Kembali ke Ukuran Paket</a>
                    <button class="dashboard-primary-button" type="submit">Lanjut ke Pembayaran</button>
                </div>
            </form>

            <aside class="regular-booking-sidebar">
                <section class="regular-booking-summary-card">
                    <div class="regular-booking-summary-head">
                        <h2>Ringkasan Final</h2>
                    </div>

                    <div class="regular-booking-summary-grid">
                        @if ($persistedBooking)
                            <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                                <span>Kode Booking</span>
                                <strong>{{ $persistedBooking->booking_code }}</strong>
                            </div>
                        @endif

                        <div class="regular-booking-summary-item">
                            <span>Rute</span>
                            <strong>{{ $reviewState['route_label'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Ukuran Paket</span>
                            <strong>{{ $reviewState['package_size_label'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Nama Barang</span>
                            <strong>{{ $reviewState['item_name'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Status</span>
                            <strong>{{ $persistedBooking?->booking_status ?? 'Belum disimpan' }}</strong>
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
