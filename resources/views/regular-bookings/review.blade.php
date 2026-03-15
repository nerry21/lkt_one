@extends('layouts.dashboard')

@section('content')
    <section class="regular-booking-page animate-fade-in">
        <section class="regular-booking-page-header">
            <div class="regular-booking-page-copy">
                <h1>Review Pemesanan</h1>
                <p>Periksa kembali seluruh informasi pemesanan reguler sebelum dilanjutkan ke tahap pembayaran atau konfirmasi final.</p>
            </div>

            <div class="regular-booking-page-actions">
                <span class="stock-value-badge stock-value-badge-emerald">Langkah 4 dari 4</span>
            </div>
        </section>

        @include('regular-bookings.partials.stepper', ['steps' => $steps])

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
            <form method="POST" action="{{ route('regular-bookings.review.store') }}" class="regular-booking-form-card">
                @csrf

                @if ($persistedBooking)
                    <section class="regular-booking-review-status-card">
                        <div class="regular-booking-review-status-copy">
                            <h2>Draft Booking Tersimpan</h2>
                            <p>Draft booking ini sudah tersimpan di database dan siap dilanjutkan ke pembayaran pada tahap berikutnya.</p>
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
                        <p>Pastikan jenis pemesanan, rute, jadwal, dan alamat layanan sudah sesuai.</p>
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
                        <p>Ringkasan kursi dan tarif mengikuti logika bisnis yang sedang dipakai pada booking draft.</p>
                    </div>

                    <div class="regular-booking-review-grid">
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Daftar Kursi Terpilih</span>
                            <strong>{{ $reviewState['selected_seats_label'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Tarif per Kursi</span>
                            <strong>{{ $reviewState['fare_amount_formatted'] }}</strong>
                        </div>
                        @if ($reviewState['additional_fare_per_passenger'] > 0)
                            <div class="regular-booking-summary-item">
                                <span>Ongkos Tambahan per Penumpang</span>
                                <strong>{{ $reviewState['additional_fare_per_passenger_formatted'] }}</strong>
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
                        <p>Urutan penumpang mengikuti urutan kursi yang sudah dipilih pada tahap sebelumnya.</p>
                    </div>

                    <div class="regular-booking-passenger-list">
                        @foreach ($reviewState['passengers'] as $passenger)
                            <article class="regular-booking-passenger-card">
                                <div class="regular-booking-passenger-card-head">
                                    <div>
                                        <h3>{{ $passenger['seat_no'] }}</h3>
                                        <p>Data penumpang untuk kursi {{ $passenger['seat_no'] }}.</p>
                                    </div>

                                    <span class="stock-value-badge stock-value-badge-emerald">Penumpang {{ $loop->iteration }}</span>
                                </div>

                                <div class="regular-booking-review-grid">
                                    <div class="regular-booking-summary-item">
                                        <span>Kursi</span>
                                        <strong>{{ $passenger['seat_no'] }}</strong>
                                    </div>
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
                        @endforeach
                    </div>
                </section>

                <div class="regular-booking-form-actions">
                    <a href="{{ route('regular-bookings.passengers') }}" class="dashboard-ghost-button">Kembali ke Data Penumpang</a>
                    <button class="dashboard-primary-button" type="submit">Lanjut ke Pembayaran</button>
                </div>
            </form>

            <aside class="regular-booking-sidebar">
                <section class="regular-booking-summary-card">
                    <div class="regular-booking-summary-head">
                        <h2>Ringkasan Final Draft</h2>
                        <p>Panel ini menampilkan status draft yang akan dipakai untuk melanjutkan ke tahap pembayaran berikutnya.</p>
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
                            <span>Status Tiket</span>
                            <strong>{{ $persistedBooking?->ticket_status ?? 'Draft' }}</strong>
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

                <section class="regular-booking-note-card">
                    <div class="regular-booking-note-head">
                        <h2>Catatan Tahap Review</h2>
                        <p>Setelah disimpan sebagai draft, booking ini siap dilanjutkan ke tahap pembayaran dan e-ticket berikutnya.</p>
                    </div>

                    <ul class="regular-booking-note-list">
                        <li>Seluruh data pada halaman ini diambil dari booking draft session yang sudah tersimpan pada tahap sebelumnya.</li>
                        <li>Jika ada data yang perlu diperbaiki, gunakan tombol kembali untuk mengubah detail penumpang terlebih dahulu.</li>
                        <li>Penyimpanan tahap ini membuat entri awal booking dengan status `Draft`, lalu meneruskan user ke halaman pembayaran.</li>
                    </ul>
                </section>
            </aside>
        </div>
    </section>
@endsection
