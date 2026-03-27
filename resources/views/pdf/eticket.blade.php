<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>E-Ticket {{ $booking->ticket_number ?? $booking->booking_code }}</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            color: #0f172a;
            font-size: 12px;
            line-height: 1.55;
            margin: 20px;
        }

        .ticket-shell {
            border: 1px solid rgba(148, 163, 184, 0.4);
            border-radius: 14px;
            overflow: hidden;
        }

        .ticket-header {
            background: #064e3b;
            padding: 20px 24px 16px;
            color: #fff;
        }

        .ticket-brand {
            font-size: 18px;
            font-weight: 700;
            margin: 0 0 4px;
        }

        .ticket-subtitle {
            margin: 0;
            font-size: 11px;
            color: rgba(255,255,255,0.75);
        }

        .ticket-meta-row {
            display: flex;
            margin-top: 12px;
        }

        .badge {
            display: inline-block;
            padding: 5px 12px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 700;
            margin-right: 8px;
        }

        .badge-white {
            background: rgba(255,255,255,0.18);
            color: #fff;
        }

        .badge-green {
            background: rgba(16, 185, 129, 0.20);
            color: #d1fae5;
        }

        .ticket-section {
            padding: 16px 24px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.24);
        }

        .ticket-section:last-child {
            border-bottom: 0;
        }

        .section-title {
            margin: 0 0 10px;
            font-size: 13px;
            font-weight: 700;
            color: #064e3b;
            border-left: 3px solid #10b981;
            padding-left: 8px;
        }

        .meta-grid {
            width: 100%;
            border-collapse: collapse;
        }

        .meta-grid td {
            width: 50%;
            vertical-align: top;
            padding: 6px 10px 6px 0;
        }

        .meta-label {
            display: block;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            color: #64748b;
            margin-bottom: 3px;
        }

        .meta-value {
            font-size: 12px;
            font-weight: 700;
            color: #0f172a;
        }

        .route-display {
            background: #f0fdf4;
            border-radius: 10px;
            padding: 12px 16px;
            margin-bottom: 10px;
        }

        .route-from-to {
            font-size: 16px;
            font-weight: 700;
            color: #064e3b;
            letter-spacing: 0.01em;
        }

        .route-arrow {
            color: #10b981;
            margin: 0 8px;
        }

        .route-date {
            font-size: 11px;
            color: #475569;
            margin-top: 4px;
        }

        .qr-panel {
            text-align: center;
            border: 1px solid rgba(148, 163, 184, 0.28);
            border-radius: 12px;
            padding: 14px;
        }

        .qr-panel svg {
            width: 160px;
            height: 160px;
        }

        .qr-note {
            color: #64748b;
            font-size: 10px;
            margin-top: 8px;
        }

        .passenger-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 6px;
        }

        .passenger-table th,
        .passenger-table td {
            padding: 8px 10px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.24);
            text-align: left;
        }

        .passenger-table th {
            font-size: 10px;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
        }

        .passenger-table td {
            font-size: 11px;
            color: #0f172a;
        }

        .footer-note {
            background: #f8fafc;
            padding: 12px 24px;
            font-size: 10px;
            color: #94a3b8;
            border-top: 1px solid rgba(148, 163, 184, 0.20);
        }
    </style>
</head>
<body>
    <div class="ticket-shell">

        {{-- Header --}}
        <section class="ticket-header">
            <h1 class="ticket-brand">E-Ticket JET (JAYA EXECUTIVE TRANSPORT)</h1>
            <p class="ticket-subtitle">Dokumen tiket elektronik resmi. Harap ditunjukkan saat keberangkatan.</p>
            <div>
                <span class="badge badge-white">{{ $booking->ticket_number ?? $booking->booking_code }}</span>
                <span class="badge badge-green">{{ $booking->ticket_status ?? 'Draft' }}</span>
            </div>
        </section>

        {{-- Rute & Jadwal --}}
        <section class="ticket-section">
            <h2 class="section-title">Rute &amp; Jadwal</h2>

            <div class="route-display">
                <div class="route-from-to">
                    {{ $booking->from_city }}
                    <span class="route-arrow">→</span>
                    {{ $booking->to_city }}
                </div>
                <div class="route-date">
                    {{ $booking->trip_date?->translatedFormat('l, d F Y') ?? '-' }}
                    &nbsp;|&nbsp;
                    Pukul {{ substr((string)($booking->trip_time ?? ''), 0, 5) }}
                </div>
            </div>

            <table class="meta-grid">
                <tr>
                    <td>
                        <span class="meta-label">Kode Booking</span>
                        <span class="meta-value">{{ $booking->booking_code }}</span>
                    </td>
                    <td>
                        <span class="meta-label">Nomor Invoice</span>
                        <span class="meta-value">{{ $booking->invoice_number ?? '-' }}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="meta-label">Jemput</span>
                        <span class="meta-value">{{ $booking->pickup_location ?? '-' }}</span>
                    </td>
                    <td>
                        <span class="meta-label">Antar</span>
                        <span class="meta-value">{{ $booking->dropoff_location ?? '-' }}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="meta-label">Driver</span>
                        <span class="meta-value">{{ $booking->driver_name ?? 'Menunggu Penetapan' }}</span>
                    </td>
                    <td>
                        <span class="meta-label">Armada</span>
                        <span class="meta-value">
                            @if(($booking->armada_index ?? 1) > 1)
                                Armada {{ $booking->armada_index }}
                            @else
                                Armada Utama
                            @endif
                        </span>
                    </td>
                </tr>
            </table>
        </section>

        {{-- QR Code Loyalti --}}
        @if(filled($booking->qr_code_value))
        <section class="ticket-section">
            <h2 class="section-title">QR Code &amp; Loyalti</h2>

            <div class="qr-panel">
                {!! \SimpleSoftwareIO\QrCode\Facades\QrCode::format('svg')
                    ->size(160)
                    ->errorCorrection('M')
                    ->generate($booking->qr_code_value) !!}

                <div class="qr-note">
                    Scan QR ini untuk program loyalti. Setelah 5 scan, Anda mendapat diskon 50%.
                </div>
                <div class="qr-note">
                    Token: {{ $booking->qr_token ?? '-' }}
                </div>
                <div class="qr-note">
                    Progress Loyalti: {{ $booking->loyalty_count ?? 0 }} / 5
                    @if($booking->lifetime_discount_eligible ?? ($booking->eligible_discount ?? false))
                        &nbsp;— <strong>DISKON AKTIF!</strong>
                    @endif
                </div>
            </div>
        </section>
        @endif

        {{-- Daftar Penumpang --}}
        <section class="ticket-section">
            <h2 class="section-title">Penumpang Terdaftar ({{ $booking->passenger_count ?? $passengers->count() }} orang)</h2>

            <table class="passenger-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Kursi</th>
                        <th>Nama</th>
                        <th>No HP</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($passengers as $i => $passenger)
                    <tr>
                        <td>{{ $i + 1 }}</td>
                        <td>{{ $passenger->seat_no ?? '-' }}</td>
                        <td>{{ $passenger->name }}</td>
                        <td>{{ $passenger->phone ?? '-' }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </section>

        {{-- Informasi Pembayaran --}}
        <section class="ticket-section">
            <h2 class="section-title">Informasi Pembayaran</h2>

            <table class="meta-grid">
                <tr>
                    <td>
                        <span class="meta-label">Metode Pembayaran</span>
                        <span class="meta-value">{{ strtoupper($booking->payment_method ?? '-') }}</span>
                    </td>
                    <td>
                        <span class="meta-label">Status Pembayaran</span>
                        <span class="meta-value">{{ $booking->payment_status ?? '-' }}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="meta-label">Total Pembayaran</span>
                        <span class="meta-value">Rp {{ number_format((float)($booking->total_amount ?? 0), 0, ',', '.') }}</span>
                    </td>
                    <td>
                        <span class="meta-label">Dibayar Pada</span>
                        <span class="meta-value">{{ $booking->paid_at?->format('d/m/Y H:i') ?? '-' }}</span>
                    </td>
                </tr>
            </table>
        </section>

        {{-- Footer --}}
        <div class="footer-note">
            Dicetak oleh sistem JET (JAYA EXECUTIVE TRANSPORT) &mdash; {{ $generated_at }}
            &nbsp;|&nbsp; Tiket ini sah sebagai bukti pemesanan resmi.
        </div>

    </div>
</body>
</html>
