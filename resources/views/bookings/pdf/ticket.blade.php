<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>E-Ticket {{ $booking->booking_code ?? 'Booking' }}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: DejaVu Sans, Arial, sans-serif;
            background: #ffffff;
            padding: 16px;
            color: #1a237e;
        }

        .ticket-wrapper {
            margin-bottom: 24px;
            page-break-after: always;
        }

        .ticket-wrapper:last-child {
            page-break-after: avoid;
        }

        .ticket {
            width: 100%;
            background: #FDD835;
            border: 3px solid #1a237e;
            border-radius: 8px;
        }

        /* ── HEADER ── */
        .ticket-header {
            width: 100%;
            border-bottom: 3px solid #1a237e;
        }

        .ticket-header-table {
            width: 100%;
            border-collapse: collapse;
        }

        .header-col-logo {
            width: 110px;
            padding: 10px 12px;
            text-align: center;
            vertical-align: middle;
        }

        .header-col-center {
            padding: 10px 8px;
            text-align: center;
            vertical-align: middle;
        }

        .logo-img {
            width: 80px;
            height: 80px;
            object-fit: contain;
            display: block;
            margin: 0 auto 4px auto;
        }

        .logo-text {
            font-size: 8px;
            font-weight: 700;
            text-transform: uppercase;
            color: #1a237e;
            line-height: 1.4;
        }

        .company-name {
            font-size: 22px;
            font-weight: 900;
            text-transform: uppercase;
            color: #1a237e;
            line-height: 1;
        }

        .company-sub {
            display: inline-block;
            margin: 5px 0;
            padding: 2px 12px;
            border: 2px solid #1a237e;
            border-radius: 3px;
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            color: #1a237e;
        }

        .company-address {
            font-size: 8px;
            line-height: 1.5;
            color: #1a237e;
        }

        .company-phones {
            margin-top: 5px;
        }

        .phone-item {
            display: inline-block;
            margin: 0 8px;
            text-align: center;
        }

        .phone-city {
            font-size: 8px;
            font-weight: 700;
            color: #1a237e;
        }

        .phone-number {
            font-size: 10px;
            font-weight: 900;
            color: #1a237e;
        }

        /* ── BODY ── */
        .ticket-body-table {
            width: 100%;
            border-collapse: collapse;
        }

        .col-left {
            width: 38%;
            padding: 10px 12px;
            vertical-align: top;
            border-right: 2px solid #1a237e;
        }

        .col-middle {
            width: 22%;
            padding: 10px 10px;
            vertical-align: top;
            border-right: 2px solid #1a237e;
            text-align: center;
        }

        .col-right {
            width: 40%;
            padding: 10px 12px;
            vertical-align: top;
        }

        .section-title {
            background: #1a237e;
            color: #FDD835;
            font-size: 9px;
            font-weight: 900;
            text-transform: uppercase;
            padding: 4px 8px;
            margin-bottom: 8px;
            letter-spacing: 0.05em;
        }

        .sub-title {
            background: rgba(26,35,126,0.1);
            border-left: 3px solid #1a237e;
            font-size: 9px;
            font-weight: 900;
            text-transform: uppercase;
            padding: 3px 6px;
            margin: 8px 0 6px 0;
            color: #1a237e;
        }

        /* Fields */
        .fields-table {
            width: 100%;
            border-collapse: collapse;
        }

        .field-label {
            width: 95px;
            font-size: 9px;
            font-weight: 600;
            color: #1a237e;
            vertical-align: top;
            padding-bottom: 5px;
        }

        .field-colon {
            width: 8px;
            font-size: 9px;
            font-weight: 700;
            color: #1a237e;
            vertical-align: top;
            padding-bottom: 5px;
        }

        .field-value {
            font-size: 9px;
            font-weight: 700;
            color: #1a237e;
            vertical-align: top;
            padding-bottom: 5px;
            border-bottom: 1px dotted #1a237e;
        }

        /* Seats */
        .seat-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 4px;
            margin-top: 2px;
        }

        .seat-cell {
            border: 2px solid #1a237e;
            border-radius: 4px;
            background: rgba(255,255,255,0.5);
            color: #1a237e;
            font-size: 11px;
            font-weight: 900;
            text-align: center;
            padding: 7px 4px;
        }

        .seat-cell-active {
            background: #1a237e;
            color: #FDD835;
            border: 2px solid #1a237e;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 900;
            text-align: center;
            padding: 7px 4px;
        }

        .seat-cell-driver {
            border: 2px solid #1a237e;
            border-radius: 4px;
            background: rgba(26,35,126,0.06);
            color: #888;
            font-size: 7px;
            font-weight: 700;
            text-align: center;
            padding: 7px 4px;
        }

        .purchase-date {
            font-size: 8px;
            font-weight: 700;
            color: #1a237e;
            text-align: center;
            line-height: 1.5;
            margin-top: 6px;
        }

        .pengurus-label {
            font-size: 9px;
            font-weight: 900;
            text-transform: uppercase;
            color: #1a237e;
            margin-top: 6px;
        }

        .sign-line {
            width: 100%;
            border-top: 1.5px solid #1a237e;
            margin: 5px 0;
        }

        .asuransi-box {
            display: inline-block;
            border: 2px solid #1a237e;
            border-radius: 3px;
            padding: 4px 8px;
            font-size: 8px;
            font-weight: 900;
            text-transform: uppercase;
            color: #1a237e;
            line-height: 1.4;
        }

        /* Rules */
        .rules-table {
            width: 100%;
            border-collapse: collapse;
        }

        .rule-no {
            width: 14px;
            font-size: 8px;
            font-weight: 900;
            color: #1a237e;
            vertical-align: top;
            padding-bottom: 5px;
        }

        .rule-text {
            font-size: 8px;
            color: #1a237e;
            line-height: 1.4;
            vertical-align: top;
            padding-bottom: 5px;
        }

        .promo-divider {
            border-top: 1px dashed #1a237e;
            margin: 6px 0;
        }

        .promo-title {
            font-size: 8px;
            font-weight: 900;
            text-transform: uppercase;
            color: #1a237e;
        }

        .promo-text {
            font-size: 7.5px;
            color: #1a237e;
            line-height: 1.4;
            margin-top: 2px;
        }

        .tagline {
            font-size: 10px;
            font-weight: 900;
            font-style: italic;
            color: #1a237e;
            text-align: right;
            margin-top: 8px;
        }
    </style>
</head>
<body>

@php
    $lkLogoFile = public_path('images/lk_travel.png');
    $jrLogoFile = public_path('images/logo_jasaraharja.jpg');

    $lkLogo = file_exists($lkLogoFile)
        ? 'data:image/png;base64,' . base64_encode(file_get_contents($lkLogoFile))
        : null;

    $jrLogo = file_exists($jrLogoFile)
        ? 'data:image/jpeg;base64,' . base64_encode(file_get_contents($jrLogoFile))
        : null;

    $seatMap = [
        ['1A', 'SOPIR'],
        ['2A', '3A'],
        ['4A', '5A'],
    ];
@endphp

@foreach ($tickets as $ticket)
<div class="ticket-wrapper">
<div class="ticket">

    {{-- HEADER --}}
    <div class="ticket-header">
        <table class="ticket-header-table">
            <tr>
                <td class="header-col-logo">
                    @if ($lkLogo)
                        <img src="{{ $lkLogo }}" alt="LK" class="logo-img">
                    @else
                        <div style="width:80px;height:80px;border-radius:50%;border:2px solid #1a237e;margin:0 auto 4px auto;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:900;color:#1a237e;">LK</div>
                    @endif
                    <div class="logo-text">PT. Lancang Kuning<br>Travelindo</div>
                </td>
                <td class="header-col-center">
                    <div class="company-name">Lancang Kuning Travelindo</div>
                    <div><span class="company-sub">Travel Pekanbaru &amp; Pasir Pengaraian</span></div>
                    <div class="company-address">
                        Alamat : Jl. Lingkar Pasir Pengaraian, Dusun Kampung Baru, Desa Koto Tinggi, Kec. Rambah, Kab. Rokan Hulu<br>
                        Alamat : Jl. Pahlawan Kerja, Kec. Marpoyan Damai, Kota Pekanbaru
                    </div>
                    <div class="company-phones">
                        <div class="phone-item">
                            <div class="phone-city">Pekanbaru</div>
                            <div class="phone-number">0823-6421-0642</div>
                        </div>
                        <div class="phone-item">
                            <div class="phone-city">Rokan Hulu</div>
                            <div class="phone-number">0823-1320-5885</div>
                        </div>
                    </div>
                </td>
                <td class="header-col-logo">
                    @if ($jrLogo)
                        <img src="{{ $jrLogo }}" alt="Jasa Raharja" class="logo-img">
                    @else
                        <div style="width:80px;height:80px;border-radius:50%;border:2px solid #1a237e;margin:0 auto 4px auto;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:900;color:#1a237e;">JR</div>
                    @endif
                    <div class="logo-text">Jasa Raharja<br>Protected</div>
                </td>
            </tr>
        </table>
    </div>

    {{-- BODY --}}
    <table class="ticket-body-table">
        <tr>
            {{-- LEFT --}}
            <td class="col-left">
                <div class="section-title">Tiket Penumpang</div>
                <table class="fields-table">
                    <tr>
                        <td class="field-label">Nama Penumpang</td>
                        <td class="field-colon">:</td>
                        <td class="field-value">{{ $ticket['passenger_name'] ?? '-' }}</td>
                    </tr>
                    <tr>
                        <td class="field-label">Dari</td>
                        <td class="field-colon">:</td>
                        <td class="field-value">{{ $ticket['from_city'] ?? '-' }}</td>
                    </tr>
                    <tr>
                        <td class="field-label">Tujuan</td>
                        <td class="field-colon">:</td>
                        <td class="field-value">{{ $ticket['to_city'] ?? '-' }}</td>
                    </tr>
                </table>
                <div class="sub-title">Keberangkatan</div>
                <table class="fields-table">
                    <tr>
                        <td class="field-label">Tgl. Berangkat</td>
                        <td class="field-colon">:</td>
                        <td class="field-value">{{ $ticket['trip_date'] ?? '-' }}</td>
                    </tr>
                    <tr>
                        <td class="field-label">Jam</td>
                        <td class="field-colon">:</td>
                        <td class="field-value">
                            {{ isset($ticket['trip_time']) && $ticket['trip_time'] ? $ticket['trip_time'] . ' WIB' : '-' }}
                        </td>
                    </tr>
                    <tr>
                        <td class="field-label">Tarif</td>
                        <td class="field-colon">:</td>
                        <td class="field-value">{{ $ticket['tarif'] ?? '-' }}</td>
                    </tr>
                    <tr>
                        <td class="field-label">Uang Muka</td>
                        <td class="field-colon">:</td>
                        <td class="field-value">{{ $ticket['uang_muka'] ?? '-' }}</td>
                    </tr>
                    <tr>
                        <td class="field-label">Sisa</td>
                        <td class="field-colon">:</td>
                        <td class="field-value">{{ $ticket['sisa'] ?? '-' }}</td>
                    </tr>
                </table>
            </td>

            {{-- MIDDLE --}}
            <td class="col-middle">
                <div class="section-title">Nomor Bangku</div>
                <table class="seat-table">
                    @foreach ($seatMap as $row)
                    <tr>
                        @foreach ($row as $seat)
                        <td>
                            @if ($seat === 'SOPIR')
                                <div class="seat-cell-driver">SOPIR</div>
                            @elseif (($ticket['seat_no'] ?? '') === $seat)
                                <div class="seat-cell-active">{{ str_replace('A', '', $seat) }}</div>
                            @else
                                <div class="seat-cell">{{ str_replace('A', '', $seat) }}</div>
                            @endif
                        </td>
                        @endforeach
                    </tr>
                    @endforeach
                </table>
                <div class="purchase-date">
                    <strong>Tanggal Pembelian Tiket</strong><br>
                    Pasir Pengaraian, {{ $ticket['purchase_date'] ?? '-' }}
                </div>
                <div class="pengurus-label">Pengurus</div>
                <div class="sign-line"></div>
                <div class="asuransi-box">Dilindungi Oleh<br>Asuransi Jasa Raharja</div>
            </td>

            {{-- RIGHT --}}
            <td class="col-right">
                <div class="section-title">Perhatian</div>
                <table class="rules-table">
                    <tr>
                        <td class="rule-no">1.</td>
                        <td class="rule-text">Jemput Antar Ke Alamat Dalam Batas Tertentu</td>
                    </tr>
                    <tr>
                        <td class="rule-no">2.</td>
                        <td class="rule-text">Bagasi Free 15kg/orang, Kelebihan Dikenakan Biaya</td>
                    </tr>
                    <tr>
                        <td class="rule-no">3.</td>
                        <td class="rule-text">Barang Bawaan Penumpang Jika Terjadi Kehilangan Yang Sifat Nya Kelalaian Penumpang, Bukan Menjadi Tanggung Jawab Perusahaan</td>
                    </tr>
                    <tr>
                        <td class="rule-no">4.</td>
                        <td class="rule-text">Dilarang Membawa Benda Terlarang (narkoba Dll), Hewan, Atau Barang Bawaan Yang Bau Nya Menyengat Dan Dapat Menganggu Kenyamanan Penumpang.</td>
                    </tr>
                    <tr>
                        <td class="rule-no">5.</td>
                        <td class="rule-text">Dilarang Melakukan Tindakan Amoral Atau Asusila Serta Tindak Pidana Lainnya Selama Perjalanan.</td>
                    </tr>
                </table>
                <div class="promo-divider"></div>
                <div class="promo-title">Promo</div>
                <div class="promo-text">Kumpulkan 5 Tiket (discnt 50%) / Kumpulkan 10 Tiket Dengan Nama Dan No Hp Yang Sama Gratis 1x Keberangkatan</div>
                <div class="tagline">Cepat, Aman &amp; Nyaman</div>
            </td>
        </tr>
    </table>

</div>{{-- /ticket --}}
</div>{{-- /ticket-wrapper --}}
@endforeach

</body>
</html>
