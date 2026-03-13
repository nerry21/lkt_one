@extends('layouts.booking')

@php
    $tripTime = $booking->trip_time ? substr((string) $booking->trip_time, 0, 5) : '-';
    $selectedSeats = $booking->selected_seats ?? [];
    $formatCurrency = static fn ($value): string => 'Rp ' . number_format((float) $value, 0, ',', '.');
@endphp

@section('page_title', 'Review Booking')
@section('page_subtitle', 'Periksa ulang data booking reguler Anda sebelum melanjutkan ke konfirmasi pembayaran.')

@section('content')
    @if (session('success'))
        <div class="booking-alert booking-alert--success">
            <p>{{ session('success') }}</p>
        </div>
    @endif

    <section class="booking-grid">
        <div class="booking-col-8">
            <article class="booking-card">
                <div class="booking-card-body">
                    <div class="booking-card-header">
                        <div>
                            <h2>Review Booking</h2>
                            <p class="booking-section-subtitle">Cek data perjalanan, penumpang, dan status booking sebelum lanjut.</p>
                        </div>

                        <span class="booking-pill">{{ $booking->booking_code }}</span>
                    </div>

                    <div class="booking-stat-grid">
                        <div class="booking-stat-card">
                            <span>Rute</span>
                            <strong>{{ $booking->from_city }} -> {{ $booking->to_city }}</strong>
                        </div>

                        <div class="booking-stat-card">
                            <span>Tanggal</span>
                            <strong>{{ optional($booking->trip_date)->format('d-m-Y') }}</strong>
                        </div>

                        <div class="booking-stat-card">
                            <span>Jam</span>
                            <strong>{{ $tripTime }}</strong>
                        </div>
                    </div>

                    <div class="booking-divider" style="margin: 24px 0;"></div>

                    <div class="booking-grid">
                        <div class="booking-col-6">
                            <div class="booking-info-card">
                                <h3 class="booking-section-title">Pemesan</h3>
                                <div class="booking-summary-list">
                                    <div class="booking-summary-row">
                                        <span>Nama</span>
                                        <strong>{{ $booking->passenger_name }}</strong>
                                    </div>
                                    <div class="booking-summary-row">
                                        <span>No. HP</span>
                                        <strong>{{ $booking->passenger_phone }}</strong>
                                    </div>
                                    <div class="booking-summary-row">
                                        <span>Booking untuk</span>
                                        <strong>{{ $booking->booking_for ?: 'self' }}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="booking-col-6">
                            <div class="booking-info-card">
                                <h3 class="booking-section-title">Status</h3>
                                <div class="booking-summary-list">
                                    <div class="booking-summary-row">
                                        <span>Status pembayaran</span>
                                        <strong>{{ $booking->payment_status }}</strong>
                                    </div>
                                    <div class="booking-summary-row">
                                        <span>Status booking</span>
                                        <strong>{{ $booking->booking_status }}</strong>
                                    </div>
                                    <div class="booking-summary-row">
                                        <span>Metode pembayaran</span>
                                        <strong>{{ $booking->payment_method ?: '-' }}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="booking-col-6">
                            <div class="booking-info-card">
                                <h3 class="booking-section-title">Lokasi Jemput</h3>
                                <p class="booking-muted">{{ $booking->pickup_location ?: '-' }}</p>
                            </div>
                        </div>

                        <div class="booking-col-6">
                            <div class="booking-info-card">
                                <h3 class="booking-section-title">Lokasi Antar</h3>
                                <p class="booking-muted">{{ $booking->dropoff_location ?: '-' }}</p>
                            </div>
                        </div>
                    </div>

                    @if (filled($booking->notes))
                        <div class="booking-divider" style="margin: 24px 0;"></div>
                        <div class="booking-note">{{ $booking->notes }}</div>
                    @endif

                    <div class="booking-divider" style="margin: 24px 0;"></div>

                    <div class="booking-card-header">
                        <div>
                            <h3>Daftar Penumpang</h3>
                            <p class="booking-section-subtitle">Kursi yang tersimpan mengikuti data booking tahap 1.</p>
                        </div>
                    </div>

                    <div class="booking-table-wrap">
                        <table class="booking-table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Seat</th>
                                    <th>Nama</th>
                                    <th>No. HP</th>
                                    <th>Status Ticket</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse ($booking->passengers as $index => $passenger)
                                    <tr>
                                        <td>{{ $index + 1 }}</td>
                                        <td><span class="booking-pill">{{ $passenger->seat_no }}</span></td>
                                        <td>{{ $passenger->name }}</td>
                                        <td>{{ $passenger->phone ?: '-' }}</td>
                                        <td>{{ $passenger->ticket_status }}</td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="5">
                                            <div class="booking-empty">Belum ada data penumpang tersimpan.</div>
                                        </td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>

                    <div class="booking-actions" style="margin-top: 24px;">
                        <a class="booking-button booking-button--light" href="{{ route('booking.reguler') }}">
                            Booking Baru
                        </a>

                        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                            @if ($booking->payment_status !== 'Lunas')
                                <a class="booking-button booking-button--primary" href="{{ route('booking.payment', $booking->id) }}">
                                    Lanjut ke Payment
                                </a>
                            @endif

                            @if ($booking->ticket_status === 'Active')
                                <a class="booking-button booking-button--ghost" href="{{ route('booking.eticket', $booking->id) }}" target="_blank" rel="noopener noreferrer">
                                    Lihat E-Ticket
                                </a>

                                <a class="booking-button booking-button--light" href="{{ route('booking.eticket.pdf', $booking->id) }}" target="_blank" rel="noopener noreferrer">
                                    PDF E-Ticket
                                </a>
                            @endif
                        </div>
                    </div>
                </div>
            </article>
        </div>

        <aside class="booking-col-4">
            <article class="booking-summary-card">
                <h3 class="booking-summary-title">Ringkasan Biaya</h3>

                <div class="booking-summary-list">
                    <div class="booking-summary-row">
                        <span>Harga per seat</span>
                        <strong>{{ $formatCurrency($booking->price_per_seat) }}</strong>
                    </div>

                    <div class="booking-summary-row">
                        <span>Jumlah penumpang</span>
                        <strong>{{ $booking->passenger_count }}</strong>
                    </div>

                    <div class="booking-summary-row">
                        <span>Seat terpilih</span>
                        <strong>{{ count($selectedSeats) ? implode(', ', $selectedSeats) : '-' }}</strong>
                    </div>
                </div>

                <div class="booking-divider"></div>

                <div class="booking-summary-row">
                    <span>Total Bayar</span>
                    <strong class="booking-money">{{ $formatCurrency($booking->total_amount) }}</strong>
                </div>
            </article>
        </aside>
    </section>
@endsection
