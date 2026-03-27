<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>E-Tiket Dropping {{ $ticketState['ticket_number'] }}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: DejaVu Sans, Arial, sans-serif;
            background: #ffffff;
            color: #1a237e;
            font-size: 10px;
        }

        .ticket {
            background: #FDD835;
            border: 3px solid #1a237e;
            border-radius: 8px;
            overflow: hidden;
            width: 100%;
        }

        /* ── HEADER ── */
        .header-table {
            width: 100%;
            border-collapse: collapse;
            border-bottom: 3px solid #1a237e;
        }

        .header-table td {
            vertical-align: middle;
            padding: 8px 12px;
        }

        .logo-cell {
            width: 100px;
            text-align: center;
        }

        .logo-cell img {
            width: 80px;
            height: 80px;
        }

        .logo-text {
            font-size: 7px;
            font-weight: 700;
            color: #1a237e;
            text-transform: uppercase;
            text-align: center;
            margin-top: 3px;
            line-height: 1.3;
        }

        .center-cell {
            text-align: center;
        }

        .company-name {
            font-size: 22px;
            font-weight: 900;
            color: #1a237e;
            text-transform: uppercase;
            letter-spacing: -0.5px;
            line-height: 1;
        }

        .company-sub {
            display: inline-block;
            font-size: 10px;
            font-weight: 800;
            color: #1a237e;
            text-transform: uppercase;
            border: 2px solid #1a237e;
            padding: 2px 14px;
            margin: 4px 0;
            border-radius: 3px;
        }

        .address {
            font-size: 7.5px;
            color: #1a237e;
            line-height: 1.5;
        }

        .phones-table {
            margin: 4px auto 0;
            border-collapse: collapse;
        }

        .phones-table td {
            padding: 0 14px;
            text-align: center;
        }

        .phone-city   { font-size: 7.5px; font-weight: 700; color: #1a237e; }
        .phone-number { font-size: 9.5px;  font-weight: 900; color: #1a237e; }

        /* ── BODY ── */
        .body-table {
            width: 100%;
            border-collapse: collapse;
        }

        .body-table > tbody > tr > td {
            vertical-align: top;
            padding: 0;
        }

        .col-left   { width: 42%; border-right: 2px solid #1a237e; }
        .col-middle { width: 18%; border-right: 2px solid #1a237e; text-align: center; }
        .col-right  { width: 40%; }

        .section-title {
            background: #1a237e;
            color: #FDD835;
            font-size: 8.5px;
            font-weight: 800;
            text-transform: uppercase;
            padding: 4px 10px;
            letter-spacing: 0.05em;
        }

        .section-body {
            padding: 8px 12px;
        }

        /* ── LEFT ── */
        .field-table {
            width: 100%;
            border-collapse: collapse;
        }

        .field-table td {
            vertical-align: top;
            padding: 2px 0;
            font-size: 8px;
            color: #1a237e;
        }

        .field-label { width: 100px; font-weight: 600; white-space: nowrap; }
        .field-colon { width: 8px;  font-weight: 600; }

        .field-value {
            font-weight: 700;
            border-bottom: 1px dotted #1a237e;
            padding-bottom: 1px;
            min-height: 14px;
        }

        .sub-title {
            font-size: 8px;
            font-weight: 800;
            color: #1a237e;
            text-transform: uppercase;
            background: rgba(26,35,126,0.1);
            padding: 2px 7px;
            margin: 7px 0 5px;
            border-left: 3px solid #1a237e;
        }

        /* ── MIDDLE ── */
        .seat-grid-table {
            width: 100%;
            border-collapse: collapse;
            margin: 0 auto;
        }

        .seat-grid-table td {
            padding: 3px;
            width: 50%;
        }

        .seat-cell {
            background: #1a237e;
            color: #FDD835;
            font-size: 12px;
            font-weight: 900;
            text-align: center;
            border: 2px solid #1a237e;
            border-radius: 4px;
            padding: 7px 4px;
            min-height: 34px;
        }

        .seat-cell-driver {
            background: rgba(26,35,126,0.06);
            color: #999;
            font-size: 7px;
            font-weight: 700;
            text-align: center;
            border: 2px solid #1a237e;
            border-radius: 4px;
            padding: 7px 4px;
            min-height: 34px;
        }

        .purchase-date {
            font-size: 7px;
            font-weight: 700;
            color: #1a237e;
            text-align: center;
            line-height: 1.5;
            margin: 6px 0 4px;
        }

        .pengurus {
            font-size: 8px;
            font-weight: 800;
            color: #1a237e;
            text-align: center;
            text-transform: uppercase;
            margin-bottom: 4px;
        }

        .divider-line {
            border-top: 1.5px solid #1a237e;
            margin: 4px 0;
        }

        .asuransi {
            font-size: 7px;
            font-weight: 700;
            color: #1a237e;
            text-align: center;
            text-transform: uppercase;
            border: 2px solid #1a237e;
            padding: 3px 6px;
            border-radius: 4px;
            line-height: 1.5;
            margin: 0 auto;
            display: inline-block;
        }

        /* ── RIGHT ── */
        .rules-list {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .rules-list li {
            font-size: 7.5px;
            color: #1a237e;
            line-height: 1.45;
            margin-bottom: 5px;
            padding-left: 14px;
            position: relative;
        }

        .rules-list li .li-no {
            position: absolute;
            left: 0;
            font-weight: 700;
        }

        .tagline {
            margin-top: 10px;
            font-size: 9px;
            font-weight: 800;
            color: #1a237e;
            font-style: italic;
            text-align: right;
        }
    </style>
</head>
<body>

@php
    $ts          = $ticketState;
    $totalAmount = (float) ($ts['total_amount'] ?? 0);
    $passenger   = $ts['passengers'][0] ?? ['name' => '-', 'seat_no' => '-', 'phone' => '-'];
    $seatMap     = [['1', 'SOPIR'], ['2', '3'], ['4', '5']];
    $resolvedLogo64 = $logo64 ?? null;

    if (! $resolvedLogo64) {
        $brandLogoCandidates = [
            public_path('images/lk_travel.png'),
            public_path('images/lk_travel.PNG'),
            public_path('images/LK_TRAVEL.png'),
            public_path('images/LK_TRAVEL.PNG'),
        ];

        $brandLogoPath = collect($brandLogoCandidates)->first(fn (string $path): bool => is_file($path));

        if (is_string($brandLogoPath)) {
            $resolvedLogo64 = 'data:image/' . strtolower(pathinfo($brandLogoPath, PATHINFO_EXTENSION)) . ';base64,' . base64_encode((string) file_get_contents($brandLogoPath));
        }
    }
@endphp

<div class="ticket">

    {{-- HEADER --}}
    <table class="header-table">
        <tr>
            <td class="logo-cell">
                @if ($resolvedLogo64)
                    <img src="{{ $resolvedLogo64 }}" alt="Logo">
                @endif
                <div class="logo-text">PT. REZEKI KELUARGA<br>BERKAH BERLIMPAH</div>
            </td>
            <td class="center-cell">
                <div class="company-name">JET (JAYA EXECUTIVE TRANSPORT)</div>
                <div><span class="company-sub">Travel Pekanbaru &amp; Pasir Pengaraian</span></div>
                <div class="address">
                    Alamat : Jalan Riau, No 139, Lenggopan Kelurahan Pasirpengaraian, Kabupaten Rokan Hulu<br>
                    Alamat : Jl. Pahlawan Kerja, Kec. Marpoyan Damai, Kota Pekanbaru
                </div>
                <table class="phones-table">
                    <tr>
                        <td>
                            <div class="phone-city">Pekanbaru</div>
                            <div class="phone-number">0823-6421-0642</div>
                        </td>
                    </tr>
                </table>
            </td>
            <td class="logo-cell">
                @if ($jasaRaharja64)
                    <img src="{{ $jasaRaharja64 }}" alt="Jasa Raharja">
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
                <div class="section-title">Tiket Penumpang {{ $ticketTypeLabel ?? 'Dropping' }}</div>
                <div class="section-body">
                    <table class="field-table">
                        <tr>
                            <td class="field-label">Nama Penumpang</td>
                            <td class="field-colon">:</td>
                            <td class="field-value">{{ $passenger['name'] }}</td>
                        </tr>
                        <tr>
                            <td class="field-label">Dari</td>
                            <td class="field-colon">:</td>
                            <td class="field-value">{{ $ts['from_city'] }}</td>
                        </tr>
                        <tr>
                            <td class="field-label">Tujuan</td>
                            <td class="field-colon">:</td>
                            <td class="field-value">{{ $ts['to_city'] }}</td>
                        </tr>
                    </table>

                    <div class="sub-title">Keberangkatan</div>

                    <table class="field-table">
                        <tr>
                            <td class="field-label">Tgl. Berangkat</td>
                            <td class="field-colon">:</td>
                            <td class="field-value">{{ $ts['trip_date'] }}</td>
                        </tr>
                        <tr>
                            <td class="field-label">Jam</td>
                            <td class="field-colon">:</td>
                            <td class="field-value">{{ $ts['trip_time'] }} WIB</td>
                        </tr>
                        <tr>
                            <td class="field-label">Total Tarif</td>
                            <td class="field-colon">:</td>
                            <td class="field-value">Rp {{ number_format($totalAmount, 0, ',', '.') }}</td>
                        </tr>
                        <tr>
                            <td class="field-label">Kursi</td>
                            <td class="field-colon">:</td>
                            <td class="field-value">1A, 2A, 2B, 3A, 4A, 5A</td>
                        </tr>
                    </table>
                </div>
            </td>

            {{-- MIDDLE: Nomor Bangku --}}
            <td class="col-middle">
                <div class="section-title" style="text-align:center;">Nomor Bangku</div>
                <div class="section-body" style="padding:8px 6px;">
                    <table class="seat-grid-table">
                        @foreach ($seatMap as $row)
                        <tr>
                            @foreach ($row as $seat)
                            <td>
                                @if ($seat === 'SOPIR')
                                    <div class="seat-cell-driver">SOPIR</div>
                                @else
                                    <div class="seat-cell">{{ $seat }}</div>
                                @endif
                            </td>
                            @endforeach
                        </tr>
                        @endforeach
                    </table>

                    <div class="purchase-date">
                        <strong>Tanggal Pembelian Tiket</strong><br>
                        Pasir Pengaraian,<br>{{ $ts['purchase_date'] }}
                    </div>

                    <div class="pengurus">Pengurus</div>
                    <div class="divider-line"></div>
                    <div style="text-align:center;">
                        <span class="asuransi">Dilindungi Oleh<br>Asuransi Jasa Raharja</span>
                    </div>
                </div>
            </td>

            {{-- RIGHT: Perhatian --}}
            <td class="col-right">
                <div class="section-title">Perhatian</div>
                <div class="section-body">
                    <ul class="rules-list">
                        <li><span class="li-no">1.</span>Tiket ini merupakan pemesanan {{ strtolower($ticketTypeLabel ?? 'Dropping') }} — seluruh armada dipesan untuk {{ isset($ticketTypeLabel) && $ticketTypeLabel === 'Rental' ? 'periode yang ditentukan' : 'satu perjalanan' }}.</li>
                        <li><span class="li-no">2.</span>Bagasi Free 15kg/orang, Kelebihan Dikenakan Biaya.</li>
                        <li><span class="li-no">3.</span>Barang Bawaan Penumpang Jika Terjadi Kehilangan Yang Sifat Nya Kelalaian Penumpang, Bukan Menjadi Tanggung Jawab Perusahaan.</li>
                        <li><span class="li-no">4.</span>Dilarang Membawa Benda Terlarang (narkoba Dll), Hewan, Atau Barang Bawaan Yang Bau Nya Menyengat Dan Dapat Menganggu Kenyamanan Penumpang.</li>
                        <li><span class="li-no">5.</span>Dilarang Melakukan Tindakan Amoral Atau Asusila Serta Tindak Pidana Lainnya Selama Perjalanan.</li>
                    </ul>
                    <div class="tagline">Cepat, Aman &amp; Nyaman</div>
                </div>
            </td>

        </tr>
    </table>

</div>
</body>
</html>
