<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>{{ $invoiceState['invoice_number'] }} — Dropping</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            color: #0f172a;
            font-size: 12px;
            line-height: 1.55;
            margin: 24px;
        }

        .invoice-shell {
            border: 1px solid rgba(148, 163, 184, 0.4);
            border-radius: 18px;
            overflow: hidden;
        }

        .invoice-header {
            padding: 24px 28px 18px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.4);
        }

        .invoice-brand {
            font-size: 20px;
            font-weight: 700;
            color: #047857;
            margin: 0 0 4px;
        }

        .invoice-subtitle {
            margin: 0;
            color: #64748b;
        }

        .invoice-badges {
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

        .badge-dropping {
            background: rgba(245, 158, 11, 0.14);
            color: #b45309;
        }

        .invoice-section {
            padding: 20px 28px;
            border-bottom: 1px solid rgba(148, 163, 184, 0.28);
        }

        .invoice-section:last-child {
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

        .invoice-footer {
            padding: 18px 28px 24px;
            color: #64748b;
            font-size: 11px;
        }
    </style>
</head>
<body>
    <div class="invoice-shell">
        <section class="invoice-header">
            <h1 class="invoice-brand">Invoice Lancang Kuning Travelindo</h1>
            <p class="invoice-subtitle">Dokumen ini diterbitkan dari sistem dashboard untuk pemesanan dropping.</p>

            <div class="invoice-badges">
                <span class="badge badge-primary">{{ $invoiceState['invoice_number'] }}</span>
                <span class="badge badge-secondary">{{ $invoiceState['payment_status'] }}</span>
                <span class="badge badge-dropping">Dropping Booking</span>
            </div>
        </section>

        <section class="invoice-section">
            <h2 class="section-title">Ringkasan Transaksi</h2>

            <table class="meta-grid">
                <tr>
                    <td>
                        <span class="meta-label">Nomor Invoice</span>
                        <span class="meta-value">{{ $invoiceState['invoice_number'] }}</span>
                    </td>
                    <td>
                        <span class="meta-label">Tanggal Transaksi</span>
                        <span class="meta-value">{{ $invoiceState['transaction_date_label'] }}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="meta-label">Nama</span>
                        <span class="meta-value">{{ $invoiceState['passenger_name'] }}</span>
                    </td>
                    <td>
                        <span class="meta-label">Nomor HP</span>
                        <span class="meta-value">{{ $invoiceState['passenger_phone'] }}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="meta-label">Metode Pembayaran</span>
                        <span class="meta-value">{{ $invoiceState['payment_method'] }}</span>
                    </td>
                    <td>
                        <span class="meta-label">Status Pembayaran</span>
                        <span class="meta-value">{{ $invoiceState['payment_status'] }}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="meta-label">Jumlah Pembayaran</span>
                        <span class="meta-value">{{ $invoiceState['nominal_payment_formatted'] }}</span>
                    </td>
                    <td>
                        <span class="meta-label">Referensi Pembayaran</span>
                        <span class="meta-value">{{ $invoiceState['payment_reference'] }}</span>
                    </td>
                </tr>
            </table>
        </section>

        <section class="invoice-section">
            <h2 class="section-title">Informasi Perjalanan Dropping</h2>

            <table class="meta-grid">
                <tr>
                    <td>
                        <span class="meta-label">Berangkat</span>
                        <span class="meta-value">{{ $invoiceState['from_city'] }}</span>
                    </td>
                    <td>
                        <span class="meta-label">Tujuan</span>
                        <span class="meta-value">{{ $invoiceState['to_city'] }}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="meta-label">Posisi Tempat Duduk</span>
                        <span class="meta-value">{{ $invoiceState['selected_seats_label'] }}</span>
                    </td>
                    <td>
                        <span class="meta-label">Jadwal</span>
                        <span class="meta-value">{{ $invoiceState['trip_date'] }} | {{ $invoiceState['trip_time'] }}</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span class="meta-label">Nomor Booking</span>
                        <span class="meta-value">{{ $invoiceState['booking_code'] }}</span>
                    </td>
                </tr>
            </table>
        </section>

        <section class="invoice-section">
            <h2 class="section-title">Data Penumpang Dropping</h2>

            <table class="passenger-table">
                <thead>
                    <tr>
                        <th>Kursi</th>
                        <th>Nama</th>
                        <th>No HP</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($invoiceState['passengers'] as $passenger)
                        <tr>
                            <td>{{ $passenger['seat_no'] }}</td>
                            <td>{{ $passenger['name'] }}</td>
                            <td>{{ $passenger['phone'] }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </section>

        <section class="invoice-footer">
            Invoice ini dihasilkan secara otomatis oleh sistem untuk kebutuhan verifikasi transaksi pemesanan dropping. Seluruh 6 kursi dipesan dalam satu paket dropping.
        </section>
    </div>
</body>
</html>
