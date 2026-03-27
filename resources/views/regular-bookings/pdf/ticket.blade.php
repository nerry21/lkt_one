<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>{{ $ticketState['ticket_number'] }}</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            color: #0f172a;
            font-size: 12px;
            line-height: 1.55;
            margin: 24px;
        }

        .ticket-shell {
            border: 1px solid rgba(148, 163, 184, 0.4);
            border-radius: 18px;
            overflow: hidden;
        }

        .ticket-header {
            padding: 24px 28px 18px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.4);
        }

        .ticket-brand {
            font-size: 20px;
            font-weight: 700;
            color: #047857;
            margin: 0 0 4px;
        }

        .ticket-subtitle {
            margin: 0;
            color: #64748b;
        }

        .ticket-badges {
            margin-top: 14px;
        }

        .badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 700;
            margin-right: 8px;
        }

        .badge-primary {
            background: rgba(16, 185, 129, 0.14);
            color: #047857;
        }

        .badge-secondary {
            background: rgba(37, 99, 235, 0.12);
            color: #2563eb;
        }

        .ticket-section {
            padding: 20px 28px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.28);
        }

        .ticket-section:last-child {
            border-bottom: 0;
        }

        .section-title {
            margin: 0 0 12px;
            font-size: 14px;
            font-weight: 700;
            color: #064e3b;
        }

        .meta-grid {
            width: 100%;
            border-collapse: collapse;
        }

        .meta-grid td {
            width: 50%;
            vertical-align: top;
            padding: 8px 12px 8px 0;
        }

        .meta-label {
            display: block;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            color: #64748b;
            margin-bottom: 4px;
        }

        .meta-value {
            font-size: 13px;
            font-weight: 700;
            color: #0f172a;
        }

        .qr-panel {
            text-align: center;
            border: 1px solid rgba(148, 163, 184, 0.3);
            border-radius: 16px;
            padding: 18px;
            margin-top: 8px;
        }

        .qr-panel svg {
            width: 180px;
            height: 180px;
        }

        .helper-text {
            color: #64748b;
            font-size: 11px;
            margin-top: 10px;
        }

        .passenger-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 6px;
        }

        .passenger-table th,
        .passenger-table td {
            padding: 10px 12px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.3);
            text-align: left;
        }

        .passenger-table th {
            font-size: 11px;
            font-weight: 700;
            color: #64748b;
        }

        .passenger-table td {
            font-size: 12px;
            color: #0f172a;
        }
    </style>
</head>
<body>
    <div class="ticket-shell">
        <section class="ticket-header">
            <h1 class="ticket-brand">E-ticket JET (JAYA EXECUTIVE TRANSPORT)</h1>
            <p class="ticket-subtitle">Dokumen tiket elektronik untuk perjalanan reguler yang sudah tercatat pada sistem.</p>

            <div class="ticket-badges">
                <span class="badge badge-primary">{{ $ticketState['ticket_number'] }}</span>
                <span class="badge badge-secondary">{{ $ticketState['ticket_status'] }}</span>
            </div>
        </section>

        <section class="ticket-section">
            <h2 class="section-title">Informasi Tiket</h2>

            <table class="meta-grid">
                <tr>
                    <td>
                        <span class="meta-label">Nomor Tiket</span>
                        <span class="meta-value">{{ $ticketState['ticket_number'] }}</span>
                    </td>
                    <td>
                        <span class="meta-label">Nama</span>
                        <span class="meta-value">{{ $ticketState['passenger_name'] }}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="meta-label">Berangkat</span>
                        <span class="meta-value">{{ $ticketState['from_city'] }}</span>
                    </td>
                    <td>
                        <span class="meta-label">Tujuan</span>
                        <span class="meta-value">{{ $ticketState['to_city'] }}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="meta-label">Posisi Tempat Duduk</span>
                        <span class="meta-value">{{ $ticketState['selected_seats_label'] }}</span>
                    </td>
                    <td>
                        <span class="meta-label">Tanggal dan Jam</span>
                        <span class="meta-value">{{ $ticketState['trip_date'] }} | {{ $ticketState['trip_time'] }}</span>
                    </td>
                </tr>
            </table>
        </section>

        <section class="ticket-section">
            <h2 class="section-title">QR Code Loyalti</h2>

            <div class="qr-panel">
                {!! $ticketState['qr_code_markup'] !!}
                <div class="helper-text">QR ini digunakan untuk program loyalti. Setelah 5 scan, diskon 50% akan aktif.</div>
                <div class="helper-text">Token QR: {{ $ticketState['qr_token'] }}</div>
            </div>
        </section>

        <section class="ticket-section">
            <h2 class="section-title">Status Loyalti</h2>

            <table class="meta-grid">
                <tr>
                    <td>
                        <span class="meta-label">Scan Loyalti</span>
                        <span class="meta-value">{{ $ticketState['scan_count'] }} / {{ $ticketState['loyalty_target'] }}</span>
                    </td>
                    <td>
                        <span class="meta-label">Status Diskon</span>
                        <span class="meta-value">{{ $ticketState['discount_status_label'] }}</span>
                    </td>
                </tr>
            </table>
        </section>

        <section class="ticket-section">
            <h2 class="section-title">Penumpang Terdaftar</h2>

            <table class="passenger-table">
                <thead>
                    <tr>
                        <th>Kursi</th>
                        <th>Nama</th>
                        <th>No HP</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($ticketState['passengers'] as $passenger)
                        <tr>
                            <td>{{ $passenger['seat_no'] }}</td>
                            <td>{{ $passenger['name'] }}</td>
                            <td>{{ $passenger['phone'] }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </section>
    </div>
</body>
</html>
