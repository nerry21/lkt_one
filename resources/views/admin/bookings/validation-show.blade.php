@extends('layouts.dashboard')

@php
    $tripTime = $booking->trip_time ? substr((string) $booking->trip_time, 0, 5) : '-';
    $formatCurrency = static fn ($value): string => 'Rp ' . number_format((float) $value, 0, ',', '.');
    $statusPillClass = static function (?string $status): string {
        return match ($status) {
            'Menunggu Validasi' => 'admin-booking-pill admin-booking-pill--pending',
            'Lunas', 'Active' => 'admin-booking-pill admin-booking-pill--success',
            'Ditolak' => 'admin-booking-pill admin-booking-pill--danger',
            default => 'admin-booking-pill admin-booking-pill--neutral',
        };
    };
@endphp

@section('content')
    @include('admin.bookings._styles')

    <section class="admin-booking-page">
        @if (session('success'))
            <div class="admin-booking-alert admin-booking-alert--success">{{ session('success') }}</div>
        @endif

        @if (session('error'))
            <div class="admin-booking-alert admin-booking-alert--error">{{ session('error') }}</div>
        @endif

        @if ($errors->any())
            <div class="admin-booking-alert admin-booking-alert--error">{{ implode(' ', $errors->all()) }}</div>
        @endif

        <section class="admin-booking-grid">
            <div class="admin-booking-col-8" style="display: grid; gap: 18px;">
                <article class="admin-booking-panel">
                    <div class="admin-booking-panel-body">
                        <div class="admin-booking-header" style="margin-bottom: 20px;">
                            <div>
                                <h1>Detail Validasi Booking</h1>
                                <p>{{ $booking->booking_code }}</p>
                            </div>

                            <a class="admin-booking-button admin-booking-button--light" href="{{ route('admin.bookings.validation.index') }}">
                                Kembali
                            </a>
                        </div>

                        <div class="admin-booking-grid">
                            <article class="admin-booking-card admin-booking-col-6">
                                <span>Rute</span>
                                <strong>{{ $booking->from_city }} -> {{ $booking->to_city }}</strong>
                            </article>
                            <article class="admin-booking-card admin-booking-col-3">
                                <span>Tanggal</span>
                                <strong>{{ optional($booking->trip_date)->format('d-m-Y') }}</strong>
                            </article>
                            <article class="admin-booking-card admin-booking-col-3">
                                <span>Jam</span>
                                <strong>{{ $tripTime }}</strong>
                            </article>
                        </div>

                        <div style="height: 1px; margin: 24px 0; background: rgba(226, 232, 240, 0.92);"></div>

                        <h3 style="margin-bottom: 14px;">Data Penumpang</h3>
                        <div class="admin-booking-table-wrap">
                            <table class="admin-booking-table">
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
                                    @foreach ($booking->passengers as $index => $passenger)
                                        <tr>
                                            <td>{{ $index + 1 }}</td>
                                            <td>{{ $passenger->seat_no }}</td>
                                            <td>{{ $passenger->name }}</td>
                                            <td>{{ $passenger->phone ?: '-' }}</td>
                                            <td>{{ $passenger->ticket_status }}</td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>

                        <div style="height: 1px; margin: 24px 0; background: rgba(226, 232, 240, 0.92);"></div>

                        <h3 style="margin-bottom: 14px;">Informasi Pembayaran</h3>

                        <div class="admin-booking-grid">
                            <article class="admin-booking-card admin-booking-col-6">
                                <span>Metode Pembayaran</span>
                                <strong>{{ $booking->payment_method ?: '-' }}</strong>
                            </article>
                            <article class="admin-booking-card admin-booking-col-6">
                                <span>Status Pembayaran</span>
                                <strong>{{ $booking->payment_status }}</strong>
                            </article>
                            <article class="admin-booking-card admin-booking-col-12">
                                <span>Bukti Transfer</span>
                                @if ($booking->payment_proof_url)
                                    <div class="admin-booking-header-actions">
                                        <a class="admin-booking-proof-link" href="{{ $booking->payment_proof_url }}" target="_blank" rel="noopener noreferrer">
                                            Lihat Bukti Transfer
                                        </a>
                                        <p class="admin-booking-proof-note">{{ basename((string) $booking->payment_proof_path) }}</p>
                                    </div>
                                @else
                                    <p class="admin-booking-muted">Belum ada file bukti transfer.</p>
                                @endif
                            </article>
                            <article class="admin-booking-card admin-booking-col-12">
                                <span>Catatan / Notes</span>
                                <pre class="admin-booking-note">{{ $booking->notes ?: '-' }}</pre>
                            </article>
                            <article class="admin-booking-card admin-booking-col-12">
                                <span>Catatan Validasi</span>
                                <pre class="admin-booking-note">{{ $booking->validation_notes ?: '-' }}</pre>
                            </article>
                        </div>

                        @if ($booking->payment_status === 'Menunggu Validasi')
                            <div style="height: 1px; margin: 24px 0; background: rgba(226, 232, 240, 0.92);"></div>

                            <div class="admin-booking-grid">
                                <article class="admin-booking-panel admin-booking-col-6">
                                    <div class="admin-booking-panel-body">
                                        <h3 style="margin-bottom: 12px;">Approve Pembayaran</h3>
                                        <form method="POST" action="{{ route('admin.bookings.validation.approve', $booking->id) }}" class="admin-booking-form">
                                            @csrf
                                            <textarea name="validation_notes" placeholder="Catatan approve (opsional)">{{ old('validation_notes') }}</textarea>
                                            <button class="admin-booking-button admin-booking-button--success" type="submit">
                                                Approve
                                            </button>
                                        </form>
                                    </div>
                                </article>

                                <article class="admin-booking-panel admin-booking-col-6">
                                    <div class="admin-booking-panel-body">
                                        <h3 style="margin-bottom: 12px;">Reject Pembayaran</h3>
                                        <form method="POST" action="{{ route('admin.bookings.validation.reject', $booking->id) }}" class="admin-booking-form">
                                            @csrf
                                            <textarea name="validation_notes" placeholder="Alasan reject wajib diisi" required>{{ old('validation_notes') }}</textarea>
                                            <button class="admin-booking-button admin-booking-button--danger" type="submit">
                                                Reject
                                            </button>
                                        </form>
                                    </div>
                                </article>
                            </div>
                        @endif

                        @if ($booking->payment_status === 'Lunas')
                            <div style="height: 1px; margin: 24px 0; background: rgba(226, 232, 240, 0.92);"></div>

                            <article class="admin-booking-panel">
                                <div class="admin-booking-panel-body">
                                    <div class="admin-booking-ticket-row">
                                        <div>
                                            <h3>Terbitkan E-Ticket</h3>
                                            <p class="admin-booking-muted">Status ticket saat ini: <strong>{{ $booking->ticket_status }}</strong></p>
                                        </div>

                                        <div class="admin-booking-action-row">
                                            @if ($booking->ticket_status !== 'Active')
                                                <form method="POST" action="{{ route('admin.bookings.issue-ticket', $booking->id) }}">
                                                    @csrf
                                                    <button class="admin-booking-button admin-booking-button--primary" type="submit">
                                                        Terbitkan E-Ticket
                                                    </button>
                                                </form>
                                            @endif

                                            @if ($booking->ticket_status === 'Active')
                                                <a class="admin-booking-button admin-booking-button--success" href="{{ route('booking.eticket', $booking->id) }}" target="_blank" rel="noopener noreferrer">
                                                    Lihat E-Ticket
                                                </a>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            </article>
                        @endif
                    </div>
                </article>
            </div>

            <aside class="admin-booking-col-4" style="display: grid; gap: 18px;">
                <article class="admin-booking-panel">
                    <div class="admin-booking-panel-body">
                        <h3 style="margin-bottom: 16px;">Ringkasan</h3>
                        <div class="admin-booking-summary">
                            <div class="admin-booking-summary-row">
                                <span>Total</span>
                                <strong>{{ $formatCurrency($booking->total_amount) }}</strong>
                            </div>
                            <div class="admin-booking-summary-row">
                                <span>Status Bayar</span>
                                <span class="{{ $statusPillClass($booking->payment_status) }}">{{ $booking->payment_status }}</span>
                            </div>
                            <div class="admin-booking-summary-row">
                                <span>Status Ticket</span>
                                <span class="{{ $statusPillClass($booking->ticket_status) }}">{{ $booking->ticket_status }}</span>
                            </div>
                            <div class="admin-booking-summary-row">
                                <span>Validator</span>
                                <strong>{{ optional($booking->validator)->name ?: '-' }}</strong>
                            </div>
                            <div class="admin-booking-summary-row">
                                <span>Validasi Pada</span>
                                <strong>{{ optional($booking->validated_at)?->format('d-m-Y H:i') ?: '-' }}</strong>
                            </div>
                            <div class="admin-booking-summary-row">
                                <span>Dibayar Pada</span>
                                <strong>{{ optional($booking->paid_at)?->format('d-m-Y H:i') ?: '-' }}</strong>
                            </div>
                            <div class="admin-booking-summary-row">
                                <span>Ticket Diterbitkan</span>
                                <strong>{{ optional($booking->ticket_issued_at)?->format('d-m-Y H:i') ?: '-' }}</strong>
                            </div>
                        </div>
                    </div>
                </article>
            </aside>
        </section>
    </section>
@endsection
