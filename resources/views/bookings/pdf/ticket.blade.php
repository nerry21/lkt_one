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
            padding: 12px;
            color: #1a237e;
        }

        .ticket-wrapper {
            margin-bottom: 20px;
            page-break-after: always;
        }

        .ticket-wrapper:last-child {
            page-break-after: avoid;
        }

        .ticket {
            width: 100%;
            background: #FDD835;
            border: 3px solid #1a237e;
        }

        /* ── HEADER ── */
        .header-table {
            width: 100%;
            border-collapse: collapse;
            border-bottom: 3px solid #1a237e;
        }

        .header-logo-col {
            width: 105px;
            padding: 10px 10px;
            text-align: center;
            vertical-align: middle;
        }

        .header-center-col {
            padding: 8px 6px;
            text-align: center;
            vertical-align: middle;
        }

        .logo-img {
            width: 80px;
            height: 80px;
            display: block;
            margin: 0 auto 3px auto;
        }

        .logo-text {
            font-size: 7.5px;
            font-weight: 700;
            text-transform: uppercase;
            color: #1a237e;
            line-height: 1.4;
        }

        .company-name {
            font-size: 20px;
            font-weight: 900;
            text-transform: uppercase;
            color: #1a237e;
            line-height: 1.1;
        }

        .company-sub {
            display: inline-block;
            margin: 4px 0;
            padding: 2px 10px;
            border: 2px solid #1a237e;
            font-size: 9px;
            font-weight: 800;
            text-transform: uppercase;
            color: #1a237e;
        }

        .company-address {
            font-size: 7.5px;
            line-height: 1.5;
            color: #1a237e;
        }

        .phones-table {
            margin: 4px auto 0 auto;
        }

        .phone-city {
            font-size: 7.5px;
            font-weight: 700;
            color: #1a237e;
            padding: 0 10px;
            text-align: center;
        }

        .phone-number {
            font-size: 9.5px;
            font-weight: 900;
            color: #1a237e;
            padding: 0 10px;
            text-align: center;
        }

        /* ── BODY ── */
        .body-table {
            width: 100%;
            border-collapse: collapse;
        }

        .col-left {
            width: 37%;
            padding: 8px 10px;
            vertical-align: top;
            border-right: 2px solid #1a237e;
        }

        .col-middle {
            width: 23%;
            padding: 8px 8px;
            vertical-align: top;
            border-right: 2px solid #1a237e;
            text-align: center;
        }

        .col-right {
            width: 40%;
            padding: 8px 10px;
            vertical-align: top;
        }

        .section-title {
            background: #1a237e;
            color: #FDD835;
            font-size: 8.5px;
            font-weight: 900;
            text-transform: uppercase;
            padding: 4px 8px;
            margin-bottom: 7px;
            letter-spacing: 0.04em;
        }

        .sub-title {
            background: rgba(26,35,126,0.1);
            border-left: 3px solid #1a237e;
            font-size: 8px;
            font-weight: 900;
            text-transform: uppercase;
            padding: 3px 6px;
            margin: 7px 0 5px 0;
            color: #1a237e;
        }

        /* Fields */
        .fields-table {
            width: 100%;
            border-collapse: collapse;
        }

        .field-label {
            width: 88px;
            font-size: 8.5px;
            font-weight: 600;
            color: #1a237e;
            vertical-align: top;
            padding-bottom: 5px;
        }

        .field-colon {
            width: 8px;
            font-size: 8.5px;
            font-weight: 700;
            color: #1a237e;
            vertical-align: top;
            padding-bottom: 5px;
        }

        .field-value {
            font-size: 8.5px;
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
            margin: 0 auto;
        }

        .seat-cell {
            border: 2px solid #1a237e;
            border-radius: 4px;
            background: rgba(255,255,255,0.5);
            color: #1a237e;
            font-size: 12px;
            font-weight: 900;
            text-align: center;
            padding: 7px 3px;
            width: 50%;
        }

        .seat-active {
            background: #1a237e;
            color: #FDD835;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 900;
            text-align: center;
            padding: 7px 3px;
            width: 50%;
        }

        .seat-driver {
            background: rgba(26,35,126,0.06);
            color: #888;
            border: 2px solid #1a237e;
            border-radius: 4px;
            font-size: 7px;
            font-weight: 700;
            text-align: center;
            padding: 7px 3px;
            width: 50%;
        }

        .purchase-date {
            font-size: 8px;
            font-weight: 700;
            color: #1a237e;
            text-align: center;
            line-height: 1.5;
            margin-top: 7px;
        }

        .pengurus-label {
            font-size: 9px;
            font-weight: 900;
            text-transform: uppercase;
            color: #1a237e;
            text-align: center;
            margin-top: 7px;
            margin-bottom: 4px;
        }

        .sign-line {
            width: 100%;
            border-top: 1.5px solid #1a237e;
            margin-bottom: 7px;
        }

        .asuransi-box {
            border: 2px solid #1a237e;
            padding: 4px 6px;
            font-size: 8px;
            font-weight: 900;
            text-transform: uppercase;
            color: #1a237e;
            line-height: 1.5;
            display: inline-block;
        }

        /* Rules */
        .rules-table {
            width: 100%;
            border-collapse: collapse;
        }

        .rule-no {
            width: 13px;
            font-size: 7.5px;
            font-weight: 900;
            color: #1a237e;
            vertical-align: top;
            padding-bottom: 5px;
        }

        .rule-text {
            font-size: 7.5px;
            color: #1a237e;
            line-height: 1.45;
            vertical-align: top;
            padding-bottom: 5px;
        }

        .promo-divider {
            border-top: 1px dashed #1a237e;
            margin: 5px 0;
        }

        .promo-title {
            font-size: 8px;
            font-weight: 900;
            text-transform: uppercase;
            color: #1a237e;
        }

        .promo-text {
            font-size: 7px;
            color: #1a237e;
            line-height: 1.45;
            margin-top: 2px;
        }

        .tagline {
            font-size: 9.5px;
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

    // PNG: base64 langsung
    $lkLogo = file_exists($lkLogoFile)
        ? 'data:image/png;base64,' . base64_encode(file_get_contents($lkLogoFile))
        : null;

    // JPEG: konversi ke PNG dulu agar DomPDF bisa render dengan benar
    if (file_exists($jrLogoFile) && function_exists('imagecreatefromjpeg')) {
        $img = imagecreatefromjpeg($jrLogoFile);
        ob_start();
        imagepng($img);
        $jrPng = ob_get_clean();
        imagedestroy($img);
        $jrLogo = 'data:image/png;base64,' . base64_encode($jrPng);
    } elseif (file_exists($jrLogoFile)) {
        $jrLogo = 'data:image/jpeg;base64,' . base64_encode(file_get_contents($jrLogoFile));
    } else {
        $jrLogo = null;
    }

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
    <table class="header-table">
        <tr>
            <td class="header-logo-col">
                @if ($lkLogo)
                    <img src="{{ $lkLogo }}" alt="LK" class="logo-img">
                @endif
                <div class="logo-text">PT. Lancang Kuning<br>Travelindo</div>
            </td>
            <td class="header-center-col">
                <div class="company-name">Lancang Kuning Travelindo</div>
                <div><span class="company-sub">Travel Pekanbaru &amp; Pasir Pengaraian</span></div>
                <div class="company-address">
                    Alamat : Jl. Lingkar Pasir Pengaraian, Dusun Kampung Baru, Desa Koto Tinggi, Kec. Rambah, Kab. Rokan Hulu<br>
                    Alamat : Jl. Pahlawan Kerja, Kec. Marpoyan Damai, Kota Pekanbaru
                </div>
                <table class="phones-table">
                    <tr>
                        <td class="phone-city">Pekanbaru</td>
                        <td class="phone-city">Rokan Hulu</td>
                    </tr>
                    <tr>
                        <td class="phone-number">0823-6421-0642</td>
                        <td class="phone-number">0823-1320-5885</td>
                    </tr>
                </table>
            </td>
            <td class="header-logo-col">
                @if ($jrLogo)
                    <img src="{{ $jrLogo }}" alt="Jasa Raharja" class="logo-img">
                @endif
                <div class="logo-text">Jasa Raharja<br>Protected</div>
            </td>
        </tr>
    </table>

    {{-- BODY --}}
    <table class="body-table">
        <tr>

            {{-- LEFT: Tiket Penumpang --}}
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

            {{-- MIDDLE: Nomor Bangku --}}
            <td class="col-middle">
                <div class="section-title">Nomor Bangku</div>
                <table class="seat-table">
                    @foreach ($seatMap as $row)
                    <tr>
                        @foreach ($row as $seat)
                        <td>
                            @if ($seat === 'SOPIR')
                                <div class="seat-driver">SOPIR</div>
                            @elseif (($ticket['seat_no'] ?? '') === $seat)
                                <div class="seat-active">{{ str_replace('A', '', $seat) }}</div>
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

            {{-- RIGHT: Perhatian --}}
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

</div>
</div>
@endforeach

</body>
</html>
