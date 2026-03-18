@extends('layouts.dashboard')

@section('content')
    <section class="regular-booking-page animate-fade-in">
        <section class="regular-booking-page-header">
            <div class="regular-booking-page-copy">
                <h1>Review Pemesanan Dropping</h1>
                <p>Periksa kembali seluruh informasi dropping sebelum dilanjutkan ke tahap pembayaran.</p>
            </div>

            <div class="regular-booking-page-actions">
                <span class="stock-value-badge stock-value-badge-emerald">Langkah 3 dari 3</span>
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

        <div class="regular-booking-layout">
            <form method="POST" action="{{ route('dropping-bookings.review.store') }}" class="regular-booking-form-card">
                @csrf

                @if ($persistedBooking)
                    <section class="regular-booking-review-status-card">
                        <div class="regular-booking-review-status-copy">
                            <h2>Draft Dropping Tersimpan</h2>
                            <p>Draft dropping ini sudah tersimpan di database dan siap dilanjutkan ke pembayaran pada tahap berikutnya.</p>
                        </div>

                        <div class="regular-booking-review-status-meta">
                            <span class="stock-value-badge stock-value-badge-emerald">{{ $persistedBooking->booking_code }}</span>
                            <span class="stock-value-badge stock-value-badge-blue">{{ $persistedBooking->booking_status }}</span>
                        </div>
                    </section>
                @endif

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Informasi Pemesanan</h2>
                        <p>Pastikan rute, jadwal, dan alamat layanan dropping sudah sesuai.</p>
                    </div>

                    <div class="regular-booking-review-grid">
                        <div class="regular-booking-summary-item">
                            <span>Jenis Pemesanan</span>
                            <strong>{{ $reviewState['booking_type'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Asal Penjemputan</span>
                            <strong>{{ $reviewState['pickup_location'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Tujuan</span>
                            <strong>{{ $reviewState['destination_location'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Tanggal Keberangkatan</span>
                            <strong>{{ \Carbon\Carbon::parse($reviewState['trip_date'])->translatedFormat('d F Y') }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Jam Keberangkatan</span>
                            <strong>{{ $reviewState['departure_time'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Jumlah Penumpang</span>
                            <strong>{{ $reviewState['passenger_count_label'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Alamat Penjemputan</span>
                            <strong>{{ $reviewState['pickup_address'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Alamat Pengantaran</span>
                            <strong>{{ $reviewState['dropoff_address'] }}</strong>
                        </div>
                    </div>
                </section>

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Kursi dan Tarif</h2>
                        <p>Seluruh 6 kursi dipesan otomatis untuk pemesanan dropping.</p>
                    </div>

                    <div class="regular-booking-review-grid">
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Kursi Dipesan</span>
                            <strong>{{ $reviewState['selected_seats_label'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Tarif Final</span>
                            <strong>{{ $reviewState['fare_amount_formatted'] }}</strong>
                        </div>
                        @if ($reviewState['additional_fare'] > 0)
                            <div class="regular-booking-summary-item">
                                <span>Tambahan Ongkos</span>
                                <strong>{{ $reviewState['additional_fare_formatted'] }}</strong>
                            </div>
                        @endif
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Total Tarif</span>
                            <strong>{{ $reviewState['total_amount_formatted'] }}</strong>
                        </div>
                    </div>
                </section>

                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Data Penumpang</h2>
                        <p>Data pemesan yang berlaku untuk seluruh 6 kursi dropping.</p>
                    </div>

                    @php $passenger = $reviewState['passengers'][0] ?? null; @endphp

                    @if ($passenger)
                        <div class="regular-booking-passenger-list">
                            <article class="regular-booking-passenger-card">
                                <div class="regular-booking-passenger-card-head">
                                    <div>
                                        <h3>Pemesan</h3>
                                        <p>Berlaku untuk semua kursi (1A, 2A, 2B, 3A, 4A, 5A).</p>
                                    </div>

                                    <span class="stock-value-badge stock-value-badge-emerald">Semua Kursi</span>
                                </div>

                                <div class="regular-booking-review-grid">
                                    <div class="regular-booking-summary-item">
                                        <span>Nama</span>
                                        <strong>{{ $passenger['name'] }}</strong>
                                    </div>
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
                    <a href="{{ route('dropping-bookings.passengers') }}" class="dashboard-ghost-button">Kembali ke Data Penumpang</a>
                    <button class="dashboard-primary-button" type="submit">Lanjut ke Pembayaran</button>
                </div>
            </form>

            <aside class="regular-booking-sidebar">
                <section class="regular-booking-summary-card">
                    <div class="regular-booking-summary-head">
                        <h2>Ringkasan Final Dropping</h2>
                        <p>Panel ini menampilkan status draft dropping yang akan dilanjutkan ke tahap pembayaran.</p>
                    </div>

                    <div class="regular-booking-summary-grid">
                        @if ($persistedBooking)
                            <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                                <span>Kode Booking Draft</span>
                                <strong>{{ $persistedBooking->booking_code }}</strong>
                            </div>
                        @endif

                        <div class="regular-booking-summary-item">
                            <span>Status Booking</span>
                            <strong>{{ $persistedBooking?->booking_status ?? 'Belum disimpan' }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Status Pembayaran</span>
                            <strong>{{ $persistedBooking?->payment_status ?? 'Belum Bayar' }}</strong>
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
