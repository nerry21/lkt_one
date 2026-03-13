@extends('layouts.dashboard')

@php
    $formatCurrency = static fn ($value): string => 'Rp ' . number_format((float) $value, 0, ',', '.');
    $statusPillClass = static function (?string $status): string {
        return match ($status) {
            'Menunggu Validasi' => 'admin-booking-pill admin-booking-pill--pending',
            'Lunas' => 'admin-booking-pill admin-booking-pill--success',
            'Ditolak' => 'admin-booking-pill admin-booking-pill--danger',
            default => 'admin-booking-pill admin-booking-pill--neutral',
        };
    };
@endphp

@section('content')
    @include('admin.bookings._styles')

    <section class="admin-booking-page">
        <header class="admin-booking-header">
            <div>
                <h1>Validasi Pembayaran Booking</h1>
                <p>Approve atau reject pembayaran booking reguler yang sudah dikirim user.</p>
            </div>
        </header>

        <article class="admin-booking-panel">
            <div class="admin-booking-panel-body">
                <div class="admin-booking-filter-row" style="margin-bottom: 20px;">
                    <a href="{{ route('admin.bookings.validation.index') }}" class="admin-booking-chip {{ $status === '' ? 'is-active' : '' }}">
                        Semua
                    </a>
                    <a href="{{ route('admin.bookings.validation.index', ['status' => 'Menunggu Validasi']) }}" class="admin-booking-chip {{ $status === 'Menunggu Validasi' ? 'is-active' : '' }}">
                        Menunggu Validasi
                    </a>
                    <a href="{{ route('admin.bookings.validation.index', ['status' => 'Lunas']) }}" class="admin-booking-chip {{ $status === 'Lunas' ? 'is-active' : '' }}">
                        Lunas
                    </a>
                    <a href="{{ route('admin.bookings.validation.index', ['status' => 'Ditolak']) }}" class="admin-booking-chip {{ $status === 'Ditolak' ? 'is-active' : '' }}">
                        Ditolak
                    </a>
                </div>

                <div class="admin-booking-table-wrap">
                    <table class="admin-booking-table">
                        <thead>
                            <tr>
                                <th>Kode</th>
                                <th>Rute</th>
                                <th>Tanggal</th>
                                <th>Pemesan</th>
                                <th>Total</th>
                                <th>Status Bayar</th>
                                <th>Status Ticket</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse ($bookings as $booking)
                                <tr>
                                    <td>
                                        <strong>{{ $booking->booking_code }}</strong>
                                    </td>
                                    <td>{{ $booking->from_city }} -> {{ $booking->to_city }}</td>
                                    <td>{{ optional($booking->trip_date)->format('d-m-Y') }}</td>
                                    <td>
                                        <strong>{{ $booking->passenger_name }}</strong><br>
                                        <span class="admin-booking-muted">{{ $booking->passenger_phone }}</span>
                                    </td>
                                    <td>{{ $formatCurrency($booking->total_amount) }}</td>
                                    <td>
                                        <span class="{{ $statusPillClass($booking->payment_status) }}">
                                            {{ $booking->payment_status }}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="{{ $statusPillClass($booking->ticket_status === 'Active' ? 'Lunas' : null) }}">
                                            {{ $booking->ticket_status }}
                                        </span>
                                    </td>
                                    <td>
                                        <a class="admin-booking-button admin-booking-button--primary" href="{{ route('admin.bookings.validation.show', $booking->id) }}">
                                            Detail
                                        </a>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="8">
                                        <p class="admin-booking-empty">Belum ada data booking.</p>
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>

                <div style="margin-top: 20px;">
                    {{ $bookings->links() }}
                </div>
            </div>
        </article>
    </section>
@endsection
