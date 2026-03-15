<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-Ticket {{ $booking->booking_code }} | Lancang Kuning Travelindo</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: DejaVu Sans, Arial, Helvetica, sans-serif;
            background: #e8f5e9;
            padding: 24px;
            color: #1a237e;
        }

        .page-actions {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-bottom: 24px;
        }

        .btn-print,
        .btn-back {
            padding: 10px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            border: none;
        }

        .btn-print {
            background: #1565c0;
            color: #fff;
        }

        .btn-back {
            background: #fff;
            color: #1565c0;
            border: 2px solid #1565c0;
        }

        .ticket-wrapper {
            max-width: 900px;
            margin: 0 auto 40px;
        }

        .ticket {
            background: #fdd835;
            border: 3px solid #1a237e;
            border-radius: 8px;
            overflow: hidden;
            width: 100%;
            page-break-after: always;
        }

        .ticket:last-child {
            page-break-after: avoid;
        }

        .ticket-header {
            background: #fdd835;
            border-bottom: 3px solid #1a237e;
            display: table;
            width: 100%;
            table-layout: fixed;
            padding: 0;
        }

        .ticket-header-col {
            display: table-cell;
            vertical-align: middle;
            padding: 10px 12px;
        }

        .ticket-header-col.left,
        .ticket-header-col.right {
            width: 120px;
            text-align: center;
        }

        .ticket-header-col.center {
            text-align: center;
        }

        .ticket-logo-box {
            text-align: center;
        }

        .ticket-logo-circle,
        .ticket-logo-jp {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            border: 3px solid #1a237e;
            background: #fff;
            margin: 0 auto 6px;
            overflow: hidden;
            text-align: center;
            line-height: 66px;
        }

        .ticket-logo-jp {
            background: #fff;
        }

        .ticket-logo-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
        }

        .ticket-logo-text {
            font-size: 9px;
            font-weight: 800;
            color: #1a237e;
            text-align: center;
            line-height: 1.35;
            text-transform: uppercase;
        }

        .ticket-company-name {
            font-size: 28px;
            font-weight: 900;
            color: #1a237e;
            text-transform: uppercase;
            line-height: 1.05;
        }

        .ticket-company-sub {
            font-size: 13px;
            font-weight: 800;
            color: #1a237e;
            text-transform: uppercase;
            border: 2px solid #1a237e;
            display: inline-block;
            padding: 3px 12px;
            margin: 6px 0;
            border-radius: 3px;
        }

        .ticket-address {
            font-size: 10px;
            line-height: 1.45;
            color: #1a237e;
        }

        .ticket-phones {
            margin-top: 6px;
            text-align: center;
        }

        .ticket-phone-item {
            display: inline-block;
            margin: 0 8px;
            vertical-align: top;
        }

        .ticket-phone-city {
            font-size: 10px;
            font-weight: 700;
            color: #1a237e;
        }

        .ticket-phone-number {
            font-size: 12px;
            font-weight: 900;
            color: #1a237e;
        }

        .ticket-body {
            display: table;
            width: 100%;
            table-layout: fixed;
        }

        .ticket-left,
        .ticket-middle,
        .ticket-right {
            display: table-cell;
            vertical-align: top;
            padding: 10px 12px;
        }

        .ticket-left {
            width: 40%;
            border-right: 2.5px solid #1a237e;
        }

        .ticket-middle {
            width: 20%;
            border-right: 2.5px solid #1a237e;
            text-align: center;
        }

        .ticket-right {
            width: 40%;
        }

        .ticket-section-title {
            background: #1a237e;
            color: #fdd835;
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
            padding: 5px 10px;
            margin-bottom: 10px;
            letter-spacing: 0.03em;
        }

        .ticket-sub-title {
            font-size: 11px;
            font-weight: 800;
            color: #1a237e;
            text-transform: uppercase;
            background: rgba(26, 35, 126, 0.08);
            padding: 4px 6px;
            margin: 10px 0 6px;
            border-left: 3px solid #1a237e;
        }

        .ticket-field {
            display: table;
            width: 100%;
            margin-bottom: 5px;
        }

        .ticket-field-label,
        .ticket-field-colon,
        .ticket-field-value {
            display: table-cell;
            vertical-align: top;
            font-size: 11px;
            color: #1a237e;
        }

        .ticket-field-label {
            width: 120px;
            font-weight: 600;
        }

        .ticket-field-colon {
            width: 10px;
            font-weight: 600;
        }

        .ticket-field-value {
            font-weight: 700;
            border-bottom: 1px dotted #1a237e;
            padding-bottom: 1px;
        }

        .ticket-seat-grid {
            width: 100%;
            margin-top: 6px;
            border-collapse: separate;
            border-spacing: 5px;
        }

        .ticket-seat-grid td {
            width: 50%;
        }

        .ticket-seat-cell {
            border: 2px solid #1a237e;
            border-radius: 5px;
            padding: 8px 4px;
            text-align: center;
            font-size: 13px;
            font-weight: 800;
            color: #1a237e;
            background: rgba(255, 255, 255, 0.55);
            min-height: 36px;
        }

        .ticket-seat-cell.is-active {
            background: #1a237e;
            color: #fdd835;
        }

        .ticket-seat-cell.is-driver {
            background: rgba(26, 35, 126, 0.08);
            color: #666;
            font-size: 10px;
        }

        .ticket-purchase-date {
            font-size: 10px;
            font-weight: 700;
            color: #1a237e;
            text-align: center;
            line-height: 1.45;
            margin-top: 8px;
        }

        .ticket-pengurus {
            font-size: 11px;
            font-weight: 800;
            color: #1a237e;
            text-align: center;
            text-transform: uppercase;
            margin-top: 8px;
        }

        .ticket-sign-line {
            border-top: 1.5px solid #1a237e;
            width: 100%;
            margin: 4px 0 6px;
        }

        .ticket-asuransi {
            font-size: 10px;
            font-weight: 700;
            color: #1a237e;
            text-align: center;
            text-transform: uppercase;
            border: 2px solid #1a237e;
            padding: 4px 6px;
            border-radius: 3px;
            line-height: 1.35;
        }

        .ticket-rules {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .ticket-rules li {
            font-size: 10px;
            color: #1a237e;
            line-height: 1.45;
            margin-bottom: 5px;
            padding-left: 16px;
            position: relative;
        }

        .ticket-rules li .num {
            position: absolute;
            left: 0;
            top: 0;
            font-weight: 700;
        }

        .ticket-promo {
            margin-top: 8px;
            border-top: 1.5px dashed #1a237e;
            padding-top: 6px;
        }

        .ticket-promo-title {
            font-size: 10px;
            font-weight: 800;
            color: #1a237e;
            text-transform: uppercase;
        }

        .ticket-promo-text {
            font-size: 10px;
            color: #1a237e;
            line-height: 1.4;
            margin-top: 2px;
        }

        .ticket-tagline {
            margin-top: 10px;
            font-size: 12px;
            font-weight: 800;
            color: #1a237e;
            font-style: italic;
            text-align: right;
        }

        @media print {
            body {
                background: none;
                padding: 0;
            }

            .page-actions {
                display: none !important;
            }

            .ticket-wrapper {
                max-width: 100%;
                margin: 0 0 14px 0;
            }

            .ticket {
                border-radius: 0;
                box-shadow: none;
            }
        }
    </style>
</head>
<body>
@php
    $isPdf = isset($isPdf) ? (bool) $isPdf : false;

    $lkLogo = $isPdf
        ? public_path('images/lk_travel.png')
        : asset('images/lk_travel.png');

    $jrLogo = $isPdf
        ? public_path('images/logo_jasaraharja.jpg')
        : asset('images/logo_jasaraharja.jpg');

    $seatMap = [
        ['1A', 'SOPIR'],
        ['2A', '3A'],
        ['4A', '5A'],
    ];
@endphp

@if (! $isPdf)
    <div class="page-actions">
        <button class="btn-back" onclick="history.back()">← Kembali</button>
        <button class="btn-print" onclick="window.print()">🖨 Cetak Semua Tiket</button>
    </div>
@endif

@foreach ($tickets as $ticket)
    <div class="ticket-wrapper">
        <div class="ticket">

            <div class="ticket-header">
                <div class="ticket-header-col left">
                    <div class="ticket-logo-box">
                        <div class="ticket-logo-circle">
                            <img src="{{ $lkLogo }}" alt="LK Travel" class="ticket-logo-img">
                        </div>
                        <div class="ticket-logo-text">
                            PT. Lancang Kuning<br>Travelindo
                        </div>
                    </div>
                </div>

                <div class="ticket-header-col center">
                    <div class="ticket-company-name">Lancang Kuning Travelindo</div>
                    <div class="ticket-company-sub">Travel Pekanbaru &amp; Pasir Pengaraian</div>
                    <div class="ticket-address">
                        Alamat : Jl. Lingkar Pasir Pengaraian, Dusun Kampung Baru, Desa Koto Tinggi, Kec. Rambah, Kab. Rokan Hulu<br>
                        Alamat : Jl. Pahlawan Kerja, Kec. Marpoyan Damai, Kota Pekanbaru
                    </div>
                    <div class="ticket-phones">
                        <div class="ticket-phone-item">
                            <div class="ticket-phone-city">Pekanbaru</div>
                            <div class="ticket-phone-number">0823-6421-0642</div>
                        </div>
                        <div class="ticket-phone-item">
                            <div class="ticket-phone-city">Rokan Hulu</div>
                            <div class="ticket-phone-number">0823-1320-5885</div>
                        </div>
                    </div>
                </div>

                <div class="ticket-header-col right">
                    <div class="ticket-logo-box">
                        <div class="ticket-logo-jp">
                            <img src="{{ $jrLogo }}" alt="Jasa Raharja" class="ticket-logo-img">
                        </div>
                        <div class="ticket-logo-text">
                            Jasa Raharja<br>Protected
                        </div>
                    </div>
                </div>
            </div>

            <div class="ticket-body">
                <div class="ticket-left">
                    <div class="ticket-section-title">Tiket Penumpang</div>

                    <div class="ticket-field">
                        <div class="ticket-field-label">Nama Penumpang</div>
                        <div class="ticket-field-colon">:</div>
                        <div class="ticket-field-value">{{ $ticket['passenger_name'] ?? '-' }}</div>
                    </div>
                    <div class="ticket-field">
                        <div class="ticket-field-label">Dari</div>
                        <div class="ticket-field-colon">:</div>
                        <div class="ticket-field-value">{{ $ticket['from_city'] ?? '-' }}</div>
                    </div>
                    <div class="ticket-field">
                        <div class="ticket-field-label">Tujuan</div>
                        <div class="ticket-field-colon">:</div>
                        <div class="ticket-field-value">{{ $ticket['to_city'] ?? '-' }}</div>
                    </div>

                    <div class="ticket-sub-title">Keberangkatan</div>

                    <div class="ticket-field">
                        <div class="ticket-field-label">Tgl. Berangkat</div>
                        <div class="ticket-field-colon">:</div>
                        <div class="ticket-field-value">{{ $ticket['trip_date'] ?? '-' }}</div>
                    </div>
                    <div class="ticket-field">
                        <div class="ticket-field-label">Jam</div>
                        <div class="ticket-field-colon">:</div>
                        <div class="ticket-field-value">{{ isset($ticket['trip_time']) ? $ticket['trip_time'].' WIB' : '-' }}</div>
                    </div>
                    <div class="ticket-field">
                        <div class="ticket-field-label">Tarif</div>
                        <div class="ticket-field-colon">:</div>
                        <div class="ticket-field-value">{{ $ticket['tarif'] ?? '-' }}</div>
                    </div>
                    <div class="ticket-field">
                        <div class="ticket-field-label">Uang Muka</div>
                        <div class="ticket-field-colon">:</div>
                        <div class="ticket-field-value">{{ $ticket['uang_muka'] ?? '-' }}</div>
                    </div>
                    <div class="ticket-field">
                        <div class="ticket-field-label">Sisa</div>
                        <div class="ticket-field-colon">:</div>
                        <div class="ticket-field-value">{{ $ticket['sisa'] ?? '-' }}</div>
                    </div>
                </div>

                <div class="ticket-middle">
                    <div class="ticket-section-title">Nomor Bangku</div>

                    <table class="ticket-seat-grid">
                        @foreach ($seatMap as $row)
                            <tr>
                                @foreach ($row as $seat)
                                    <td>
                                        @if ($seat === 'SOPIR')
                                            <div class="ticket-seat-cell is-driver">SOPIR</div>
                                        @else
                                            <div class="ticket-seat-cell {{ ($ticket['seat_no'] ?? '') === $seat ? 'is-active' : '' }}">
                                                {{ str_replace('A', '', $seat) }}
                                            </div>
                                        @endif
                                    </td>
                                @endforeach
                            </tr>
                        @endforeach
                    </table>

                    <div class="ticket-purchase-date">
                        <strong>Tanggal Pembelian Tiket</strong><br>
                        Pasir Pengaraian, {{ $ticket['purchase_date'] ?? '-' }}
                    </div>

                    <div class="ticket-pengurus">Pengurus</div>
                    <div class="ticket-sign-line"></div>

                    <div class="ticket-asuransi">
                        Dilindungi Oleh<br>Asuransi Jasa Raharja
                    </div>
                </div>

                <div class="ticket-right">
                    <div class="ticket-section-title">Perhatian</div>

                    <ul class="ticket-rules">
                        <li><span class="num">1.</span> Jemput Antar Ke Alamat Dalam Batas Tertentu</li>
                        <li><span class="num">2.</span> Bagasi Free 15kg/orang, Kelebihan Dikenakan Biaya</li>
                        <li><span class="num">3.</span> Barang bawaan penumpang jika terjadi kehilangan yang sifatnya kelalaian penumpang, bukan menjadi tanggung jawab perusahaan</li>
                        <li><span class="num">4.</span> Dilarang membawa benda terlarang, hewan, atau barang bawaan yang baunya menyengat dan dapat mengganggu kenyamanan penumpang</li>
                        <li><span class="num">5.</span> Dilarang melakukan tindakan amoral atau asusila serta tindak pidana lainnya selama perjalanan</li>
                    </ul>

                    <div class="ticket-promo">
                        <div class="ticket-promo-title">Promo</div>
                        <div class="ticket-promo-text">
                            Kumpulkan 5 tiket diskon 50% / kumpulkan 10 tiket dengan nama dan no HP yang sama gratis 1x keberangkatan
                        </div>
                    </div>

                    <div class="ticket-tagline">Cepat, Aman &amp; Nyaman</div>
                </div>
            </div>

        </div>
    </div>
@endforeach

</body>
</html>