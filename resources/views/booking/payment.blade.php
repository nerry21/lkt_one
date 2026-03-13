@extends('layouts.booking')

@php
    $tripTime = $booking->trip_time ? substr((string) $booking->trip_time, 0, 5) : '-';
    $selectedSeats = $booking->selected_seats ?? [];
    $formatCurrency = static fn ($value): string => 'Rp ' . number_format((float) $value, 0, ',', '.');
@endphp

@section('page_title', 'Payment Booking')
@section('page_subtitle', 'Pilih metode pembayaran, kirim konfirmasi, dan ubah status booking menjadi menunggu validasi.')

@section('content')
    <section class="booking-grid">
        <div class="booking-col-7">
            <article class="booking-card">
                <div class="booking-card-body">
                    <div class="booking-card-header">
                        <div>
                            <h2>Konfirmasi Pembayaran</h2>
                            <p class="booking-section-subtitle">Data payment ini langsung tersimpan ke booking tahap 1 yang sudah dibuat.</p>
                        </div>

                        <span class="booking-pill">{{ $booking->booking_code }}</span>
                    </div>

                    @if ($errors->any())
                        <div class="booking-alert booking-alert--danger">
                            <p>{{ implode(' ', $errors->all()) }}</p>
                        </div>
                    @endif

                    <form method="POST" action="{{ route('booking.payment.submit', $booking->id) }}" enctype="multipart/form-data">
                        @csrf

                        <div class="booking-grid">
                            <div class="booking-col-12 booking-field">
                                <label>Kode Booking</label>
                                <input class="booking-input" type="text" value="{{ $booking->booking_code }}" readonly>
                            </div>

                            <div class="booking-col-12 booking-field">
                                <label for="payment_method">Metode Pembayaran</label>
                                <select class="booking-select" id="payment_method" name="payment_method" required>
                                    <option value="">Pilih metode pembayaran</option>
                                    @foreach ($paymentMethods as $paymentMethod)
                                        <option value="{{ $paymentMethod }}" @selected(old('payment_method') === $paymentMethod)>
                                            {{ $paymentMethod }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>

                            <div class="booking-col-6 booking-field">
                                <label for="sender_name">Nama Pengirim</label>
                                <input class="booking-input" type="text" id="sender_name" name="sender_name" value="{{ old('sender_name') }}" placeholder="Nama pengirim / pemilik rekening">
                            </div>

                            <div class="booking-col-6 booking-field">
                                <label for="sender_bank">Bank Pengirim</label>
                                <input class="booking-input" type="text" id="sender_bank" name="sender_bank" value="{{ old('sender_bank') }}" placeholder="Contoh: BCA / BRI / Mandiri">
                            </div>

                            <div class="booking-col-12 booking-field">
                                <label for="payment_proof">Upload Bukti Transfer</label>
                                <input class="booking-input" type="file" id="payment_proof" name="payment_proof" accept=".jpg,.jpeg,.png,.pdf">
                                <span class="booking-muted">Format: JPG, JPEG, PNG, PDF. Maksimal 4 MB.</span>

                                @if ($booking->payment_proof_url)
                                    <a class="booking-button booking-button--ghost" href="{{ $booking->payment_proof_url }}" target="_blank" rel="noopener noreferrer">
                                        Lihat Bukti Saat Ini
                                    </a>
                                @endif
                            </div>

                            <div class="booking-col-12 booking-field">
                                <label for="notes">Catatan</label>
                                <textarea class="booking-textarea" id="notes" name="notes" rows="5" placeholder="Tambahkan catatan pembayaran jika diperlukan">{{ old('notes') }}</textarea>
                            </div>
                        </div>

                        <div class="booking-alert booking-alert--warning" style="margin-top: 24px; margin-bottom: 0;">
                            <p>Setelah dikirim, <strong>payment status</strong> dan <strong>booking status</strong> akan berubah menjadi <strong>Menunggu Validasi</strong>.</p>
                        </div>

                        <div class="booking-actions" style="margin-top: 24px;">
                            <a class="booking-button booking-button--light" href="{{ route('booking.review', $booking->id) }}">
                                Kembali ke Review
                            </a>

                            <button class="booking-button booking-button--primary" type="submit">
                                Kirim Pembayaran
                            </button>
                        </div>
                    </form>
                </div>
            </article>
        </div>

        <aside class="booking-col-5">
            <article class="booking-summary-card">
                <h3 class="booking-summary-title">Detail Booking</h3>

                <div class="booking-summary-list">
                    <div class="booking-summary-row">
                        <span>Rute</span>
                        <strong>{{ $booking->from_city }} -> {{ $booking->to_city }}</strong>
                    </div>

                    <div class="booking-summary-row">
                        <span>Tanggal</span>
                        <strong>{{ optional($booking->trip_date)->format('d-m-Y') }}</strong>
                    </div>

                    <div class="booking-summary-row">
                        <span>Jam</span>
                        <strong>{{ $tripTime }}</strong>
                    </div>

                    <div class="booking-summary-row">
                        <span>Seat</span>
                        <strong>{{ count($selectedSeats) ? implode(', ', $selectedSeats) : '-' }}</strong>
                    </div>

                    <div class="booking-summary-row">
                        <span>Status saat ini</span>
                        <strong>{{ $booking->payment_status }}</strong>
                    </div>
                </div>

                <div class="booking-divider"></div>

                <div class="booking-summary-row">
                    <span>Total Bayar</span>
                    <strong class="booking-money">{{ $formatCurrency($booking->total_amount) }}</strong>
                </div>
            </article>

            <article class="booking-card">
                <div class="booking-card-body">
                    <div class="booking-card-header">
                        <div>
                            <h3>Informasi Rekening</h3>
                            <p class="booking-section-subtitle">Gunakan salah satu metode berikut untuk pembayaran.</p>
                        </div>
                    </div>

                    <div class="booking-passenger-stack">
                        <div class="booking-info-card">
                            <div class="booking-summary-row">
                                <span>BCA</span>
                                <strong>1234567890</strong>
                            </div>
                            <p class="booking-muted">a.n. PT Lancang Kuning Travelindo</p>
                        </div>

                        <div class="booking-info-card">
                            <div class="booking-summary-row">
                                <span>BRI</span>
                                <strong>9876543210</strong>
                            </div>
                            <p class="booking-muted">a.n. PT Lancang Kuning Travelindo</p>
                        </div>

                        <div class="booking-info-card">
                            <div class="booking-summary-row">
                                <span>QRIS</span>
                                <strong>Tahap berikutnya</strong>
                            </div>
                            <p class="booking-muted">Scan QR akan ditambahkan pada paket selanjutnya.</p>
                        </div>
                    </div>
                </div>
            </article>
        </aside>
    </section>
@endsection
