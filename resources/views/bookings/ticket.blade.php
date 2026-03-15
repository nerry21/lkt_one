<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-Ticket {{ $booking->booking_code ?? 'Booking' }} | Lancang Kuning Travelindo</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: DejaVu Sans, Arial, Helvetica, sans-serif;
            background: #dfe9df;
            padding: 24px;
            color: #1a237e;
        }

        .page-actions {
            display: flex;
            gap: 12px;
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
            color: #ffffff;
        }

        .btn-back {
            background: #ffffff;
            color: #1565c0;
            border: 2px solid #1565c0;
        }

        .ticket-wrapper {
            max-width: 920px;
            margin: 0 auto 36px auto;
        }

        .ticket {
            width: 100%;
            background: #f7d533;
            border: 3px solid #152a90;
            border-radius: 14px;
            overflow: hidden;
            page-break-after: always;
        }

        .ticket:last-child {
            page-break-after: avoid;
        }

        .ticket-header {
            width: 100%;
            border-bottom: 3px solid #152a90;
            display: table;
            table-layout: fixed;
        }

        .ticket-header-col {
            display: table-cell;
            vertical-align: top;
            padding: 14px 14px 10px 14px;
        }

        .ticket-header-col.left,
        .ticket-header-col.right {
            width: 140px;
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
            width: 76px;
            height: 76px;
            margin: 2px auto 8px auto;
            border-radius: 50%;
            border: 3px solid #152a90;
            background: #ffffff;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .ticket-logo-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            display: block;
        }

        .ticket-logo-fallback {
            font-size: 22px;
            font-weight: 900;
            color: #152a90;
            line-height: 1;
        }

        .ticket-logo-text {
            font-size: 10px;
            font-weight: 800;
            line-height: 1.3;
            text-transform: uppercase;
            color: #152a90;
        }

        .ticket-company-name {
            font-size: 28px;
            font-weight: 900;
            text-transform: uppercase;
            line-height: 1.05;
            color: #152a90;
        }

        .ticket-company-sub {
            display: inline-block;
            margin-top: 6px;
            margin-bottom: 8px;
            padding: 4px 14px;
            border: 2px solid #152a90;
            border-radius: 4px;
            font-size: 13px;
            font-weight: 800;
            text-transform: uppercase;
            color: #152a90;
        }

        .ticket-address {
            font-size: 10px;
            line-height: 1.45;
            color: #152a90;
        }

        .ticket-phones {
            margin-top: 8px;
        }

        .ticket-phone-item {
            display: inline-block;
            margin: 0 10px;
            text-align: center;
            vertical-align: top;
        }

        .ticket-phone-city {
            font-size: 10px;
            font-weight: 700;
            color: #152a90;
        }

        .ticket-phone-number {
            font-size: 12px;
            font-weight: 900;
            color: #152a90;
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
            padding: 10px 14px 12px 14px;
        }

        .ticket-left {
            width: 40%;
            border-right: 2px solid #152a90;
        }

        .ticket-middle {
            width: 21%;
            border-right: 2px solid #152a90;
            text-align: center;
        }

        .ticket-right {
            width: 39%;
        }

        .ticket-section-title {
            background: #152a90;
            color: #f7d533;
            font-size: 12px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: .03em;
            padding: 6px 10px;
            margin-bottom: 10px;
        }

        .ticket-sub-title {
            background: rgba(21, 42, 144, 0.12);
            color: #152a90;
            border-left: 4px solid #152a90;
            font-size: 11px;
            font-weight: 900;
            text-transform: uppercase;
            padding: 5px 8px;
            margin: 10px 0 8px 0;
        }

        .ticket-field {
            display: table;
            width: 100%;
            margin-bottom: 6px;
        }

        .ticket-field-label,
        .ticket-field-colon,
        .ticket-field-value {
            display: table-cell;
            vertical-align: top;
            font-size: 11px;
            color: #152a90;
        }

        .ticket-field-label {
            width: 118px;
            font-weight: 600;
        }

        .ticket-field-colon {
            width: 10px;
            font-weight: 700;
        }

        .ticket-field-value {
            font-weight: 700;
            border-bottom: 1px dotted #152a90;
            padding-bottom: 1px;
        }

        .ticket-seat-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 6px;
            margin-top: 2px;
        }

        .ticket-seat-cell {
            border: 2px solid #152a90;
            border-radius: 6px;
            background: rgba(255, 255, 255, 0.45);
            color: #152a90;
            font-size: 14px;
            font-weight: 900;
            text-align: center;
            padding: 9px 4px;
            min-height: 40px;
        }

        .ticket-seat-cell.is-active {
            background: #152a90;
            color: #f7d533;
        }

        .ticket-seat-cell.is-driver {
            font-size: 10px;
            font-weight: 700;
            color: #8b8b8b;
            background: rgba(21, 42, 144, 0.08);
        }

        .ticket-purchase-date {
            margin-top: 8px;
            font-size: 10px;
            font-weight: 700;
            line-height: 1.45;
            color: #152a90;
        }

        .ticket-pengurus {
            margin-top: 8px;
            font-size: 11px;
            font-weight: 900;
            text-transform: uppercase;
            color: #152a90;
        }

        .ticket-sign-line {
            width: 100%;
            border-top: 1.5px solid #152a90;
            margin: 6px 0 8px 0;
        }

        .ticket-asuransi {
            display: inline-block;
            border: 2px solid #152a90;
            border-radius: 4px;
            padding: 6px 10px;
            font-size: 10px;
            font-weight: 900;
            line-height: 1.3;
            text-transform: uppercase;
            color: #152a90;
        }

        .ticket-rules {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .ticket-rules li {
            position: relative;
            padding-left: 16px;
            margin-bottom: 6px;
            font-size: 10px;
            line-height: 1.45;
            color: #152a90;
        }

        .ticket-rules li .num {
            position: absolute;
            left: 0;
            top: 0;
            font-weight: 900;
        }

        .ticket-promo {
            margin-top: 10px;
            padding-top: 8px;
            border-top: 1px dashed #152a90;
        }

        .ticket-promo-title {
            font-size: 10px;
            font-weight: 900;
            text-transform: uppercase;
            color: #152a90;
            margin-bottom: 2px;
        }

        .ticket-promo-text {
            font-size: 10px;
            line-height: 1.45;
            color: #152a90;
        }

        .ticket-tagline {
            margin-top: 12px;
            text-align: right;
            font-size: 12px;
            font-weight: 900;
            font-style: italic;
            color: #152a90;
        }

        @media print {
            body {
                background: #ffffff;
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
            }
        }
    </style>
</head>
<body>
@php
    $isPdf = isset($isPdf) ? (bool) $isPdf : false;

    $lkLogoFile = public_path('images/lk_travel.png');
    $jrLogoFile = public_path('images/logo_jasaraharja.jpg');

    if ($isPdf) {
        $lkLogo = file_exists($lkLogoFile)
            ? 'data:image/png;base64,' . base64_encode(file_get_contents($lkLogoFile))
            : null;

        $jrLogo = file_exists($jrLogoFile)
            ? 'data:image/jpeg;base64,' . base64_encode(file_get_contents($jrLogoFile))
            : null;
    } else {
        $lkLogo = file_exists($lkLogoFile) ? asset('images/lk_travel.png') : null;
        $jrLogo = file_exists($jrLogoFile) ? asset('images/logo_jasaraharja.jpg') : null;
    }

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
                            @if ($lkLogo)
                                <img src="{{ $lkLogo }}" alt="Lancang Kuning Travelindo" class="ticket-logo-img">
                            @else
                                <div class="ticket-logo-fallback">LK</div>
                            @endif
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
                            @if ($jrLogo)
                                <img src="{{ $jrLogo }}" alt="Jasa Raharja" class="ticket-logo-img">
                            @else
                                <div class="ticket-logo-fallback">JR</div>
                            @endif
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
                        <div class="ticket-field-value">
                            {{ isset($ticket['trip_time']) && $ticket['trip_time'] ? $ticket['trip_time'] . ' WIB' : '-' }}
                        </div>
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

                    <table class="ticket-seat-table">
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
                        <li><span class="num">1.</span> Jemput antar ke alamat dalam batas tertentu.</li>
                        <li><span class="num">2.</span> Bagasi free 15 kg/orang, kelebihan dikenakan biaya.</li>
                        <li><span class="num">3.</span> Barang bawaan penumpang jika terjadi kehilangan yang sifatnya kelalaian penumpang, bukan menjadi tanggung jawab perusahaan.</li>
                        <li><span class="num">4.</span> Dilarang membawa benda terlarang, hewan, atau barang bawaan yang baunya menyengat dan dapat mengganggu kenyamanan penumpang.</li>
                        <li><span class="num">5.</span> Dilarang melakukan tindakan amoral atau asusila serta tindak pidana lainnya selama perjalanan.</li>
                    </ul>

                    <div class="ticket-promo">
                        <div class="ticket-promo-title">Promo</div>
                        <div class="ticket-promo-text">
                            Kumpulkan 5 tiket diskon 50% / kumpulkan 10 tiket dengan nama dan no. HP yang sama gratis 1x keberangkatan.
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