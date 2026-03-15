<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-Ticket {{ $booking->booking_code }} | Lancang Kuning Travelindo</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Plus Jakarta Sans', Arial, sans-serif;
            background: #e8f5e9;
            padding: 24px;
        }

        .page-actions {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-bottom: 24px;
        }

        .btn-print, .btn-back {
            padding: 10px 24px;
            border-radius: 8px;
            font: 600 0.9rem 'Plus Jakarta Sans', sans-serif;
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

        /* ── TICKET ────────────────────────────── */
        .ticket-wrapper {
            max-width: 900px;
            margin: 0 auto 40px;
        }

        .ticket {
            background: #FDD835;
            border: 3px solid #1a237e;
            border-radius: 8px;
            overflow: hidden;
            page-break-after: always;
            width: 100%;
        }

        /* Header */
        .ticket-header {
            background: #FDD835;
            border-bottom: 3px solid #1a237e;
            display: grid;
            grid-template-columns: 110px 1fr 110px;
            align-items: center;
            padding: 10px 14px;
            gap: 10px;
        }

        .ticket-logo-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 4px;
        }

        .ticket-logo-circle {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            border: 3px solid #1a237e;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
            flex-shrink: 0;
        }

        .ticket-logo-circle svg {
            width: 50px;
            height: 50px;
        }

        .ticket-logo-text {
            font-size: 0.52rem;
            font-weight: 800;
            color: #1a237e;
            text-align: center;
            line-height: 1.3;
            text-transform: uppercase;
        }

        .ticket-header-center {
            text-align: center;
        }

        .ticket-company-name {
            font-size: 1.65rem;
            font-weight: 900;
            color: #1a237e;
            text-transform: uppercase;
            line-height: 1;
            letter-spacing: -0.5px;
            text-shadow: 1px 1px 0 rgba(0,0,0,0.1);
        }

        .ticket-company-sub {
            font-size: 0.88rem;
            font-weight: 800;
            color: #1a237e;
            text-transform: uppercase;
            border: 2.5px solid #1a237e;
            display: inline-block;
            padding: 2px 14px;
            margin: 4px 0;
            border-radius: 3px;
        }

        .ticket-address {
            font-size: 0.62rem;
            color: #1a237e;
            line-height: 1.5;
        }

        .ticket-phones {
            display: flex;
            gap: 12px;
            justify-content: center;
            margin-top: 4px;
        }

        .ticket-phone-item {
            text-align: center;
        }

        .ticket-phone-city {
            font-size: 0.62rem;
            font-weight: 700;
            color: #1a237e;
        }

        .ticket-phone-number {
            font-size: 0.75rem;
            font-weight: 900;
            color: #1a237e;
        }

        .ticket-logo-jp {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            border: 3px solid #1a237e;
            background: #1a237e;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
        }

        .ticket-logo-jp span {
            font-size: 1.4rem;
            font-weight: 900;
            color: #FDD835;
            font-style: italic;
        }

        /* Body */
        .ticket-body {
            display: grid;
            grid-template-columns: 1fr 180px 1fr;
            border-top: none;
        }

        /* Left: Tiket Penumpang */
        .ticket-left {
            border-right: 2.5px solid #1a237e;
            padding: 10px 12px;
        }

        .ticket-section-title {
            background: #1a237e;
            color: #FDD835;
            font-size: 0.78rem;
            font-weight: 800;
            text-transform: uppercase;
            padding: 4px 10px;
            margin-bottom: 10px;
            letter-spacing: 0.05em;
        }

        .ticket-field {
            display: grid;
            grid-template-columns: 120px 8px 1fr;
            align-items: baseline;
            margin-bottom: 5px;
            gap: 0;
        }

        .ticket-field-label {
            font-size: 0.72rem;
            font-weight: 600;
            color: #1a237e;
        }

        .ticket-field-colon {
            font-size: 0.72rem;
            font-weight: 600;
            color: #1a237e;
        }

        .ticket-field-value {
            font-size: 0.72rem;
            font-weight: 700;
            color: #1a237e;
            border-bottom: 1px dotted #1a237e;
            padding-bottom: 1px;
            min-height: 16px;
        }

        .ticket-sub-title {
            font-size: 0.72rem;
            font-weight: 800;
            color: #1a237e;
            text-transform: uppercase;
            background: rgba(26,35,126,0.08);
            padding: 3px 6px;
            margin: 8px 0 6px;
            border-left: 3px solid #1a237e;
        }

        /* Middle: Nomor Bangku */
        .ticket-middle {
            border-right: 2.5px solid #1a237e;
            padding: 10px 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }

        .ticket-middle .ticket-section-title {
            width: 100%;
            text-align: center;
        }

        .ticket-seat-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5px;
            width: 100%;
        }

        .ticket-seat-cell {
            border: 2px solid #1a237e;
            border-radius: 5px;
            padding: 6px 4px;
            text-align: center;
            font-size: 0.82rem;
            font-weight: 800;
            color: #1a237e;
            background: #fff8;
            min-height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .ticket-seat-cell.is-active {
            background: #1a237e;
            color: #FDD835;
            box-shadow: 0 2px 6px rgba(26,35,126,0.35);
        }

        .ticket-seat-cell.is-driver {
            background: rgba(26,35,126,0.08);
            color: #888;
            font-size: 0.68rem;
        }

        .ticket-purchase-date {
            font-size: 0.62rem;
            font-weight: 700;
            color: #1a237e;
            text-align: center;
            line-height: 1.4;
        }

        .ticket-pengurus {
            font-size: 0.7rem;
            font-weight: 800;
            color: #1a237e;
            text-align: center;
            text-transform: uppercase;
        }

        .ticket-asuransi {
            font-size: 0.6rem;
            font-weight: 700;
            color: #1a237e;
            text-align: center;
            text-transform: uppercase;
            border: 2px solid #1a237e;
            padding: 3px 6px;
            border-radius: 3px;
        }

        /* Right: Perhatian */
        .ticket-right {
            padding: 10px 12px;
        }

        .ticket-rules {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .ticket-rules li {
            font-size: 0.6rem;
            color: #1a237e;
            line-height: 1.45;
            margin-bottom: 5px;
            padding-left: 14px;
            position: relative;
        }

        .ticket-rules li::before {
            content: attr(data-no) '.';
            position: absolute;
            left: 0;
            font-weight: 700;
        }

        .ticket-promo {
            margin-top: 8px;
            border-top: 1.5px dashed #1a237e;
            padding-top: 6px;
        }

        .ticket-promo-title {
            font-size: 0.65rem;
            font-weight: 800;
            color: #1a237e;
            text-transform: uppercase;
        }

        .ticket-promo-text {
            font-size: 0.58rem;
            color: #1a237e;
            line-height: 1.4;
            margin-top: 2px;
        }

        .ticket-tagline {
            margin-top: 8px;
            font-size: 0.75rem;
            font-weight: 800;
            color: #1a237e;
            font-style: italic;
            text-align: right;
        }

        /* Print */
        @media print {
            body { background: none; padding: 0; }
            .page-actions { display: none; }
            .ticket-wrapper { max-width: 100%; margin: 0; }
            .ticket { page-break-after: always; border: 2px solid #1a237e; }
            .ticket:last-child { page-break-after: avoid; }
        }
    </style>
</head>
<body>

<div class="page-actions">
    <button class="btn-back" onclick="history.back()">← Kembali</button>
    <button class="btn-print" onclick="window.print()">🖨 Cetak Semua Tiket</button>
</div>

@foreach ($tickets as $ticket)
<div class="ticket-wrapper">
<div class="ticket">

    {{-- HEADER --}}
    <div class="ticket-header">
        {{-- Logo Kiri --}}
        <div class="ticket-logo-box">
            <div class="ticket-logo-circle">
                <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="10" y="44" width="60" height="22" rx="6" fill="#1a237e"/>
                    <rect x="18" y="36" width="44" height="14" rx="4" fill="#1565c0"/>
                    <circle cx="24" cy="66" r="7" fill="#FDD835" stroke="#1a237e" stroke-width="2"/>
                    <circle cx="56" cy="66" r="7" fill="#FDD835" stroke="#1a237e" stroke-width="2"/>
                    <ellipse cx="40" cy="28" rx="18" ry="14" fill="#1565c0"/>
                    <rect x="22" y="20" width="36" height="12" rx="3" fill="#1a237e"/>
                    <rect x="14" y="50" width="10" height="10" rx="2" fill="#FDD835"/>
                    <rect x="56" y="50" width="10" height="10" rx="2" fill="#FDD835"/>
                </svg>
            </div>
            <div class="ticket-logo-text">PT. Lancang Kuning<br>Travelindo</div>
        </div>

        {{-- Center --}}
        <div class="ticket-header-center">
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

        {{-- Logo Kanan (JP) --}}
        <div class="ticket-logo-box">
            <div class="ticket-logo-jp">
                <span>JP</span>
            </div>
            <div class="ticket-logo-text" style="color:#1a237e;">Jasa Raharja<br>Protected</div>
        </div>
    </div>

    {{-- BODY --}}
    <div class="ticket-body">

        {{-- LEFT: Tiket Penumpang --}}
        <div class="ticket-left">
            <div class="ticket-section-title">Tiket Penumpang</div>

            <div class="ticket-field">
                <span class="ticket-field-label">Nama Penumpang</span>
                <span class="ticket-field-colon">:</span>
                <span class="ticket-field-value">{{ $ticket['passenger_name'] }}</span>
            </div>
            <div class="ticket-field">
                <span class="ticket-field-label">Dari</span>
                <span class="ticket-field-colon">:</span>
                <span class="ticket-field-value">{{ $ticket['from_city'] }}</span>
            </div>
            <div class="ticket-field">
                <span class="ticket-field-label">Tujuan</span>
                <span class="ticket-field-colon">:</span>
                <span class="ticket-field-value">{{ $ticket['to_city'] }}</span>
            </div>

            <div class="ticket-sub-title">Keberangkatan</div>

            <div class="ticket-field">
                <span class="ticket-field-label">Tgl. Berangkat</span>
                <span class="ticket-field-colon">:</span>
                <span class="ticket-field-value">{{ $ticket['trip_date'] }}</span>
            </div>
            <div class="ticket-field">
                <span class="ticket-field-label">Jam</span>
                <span class="ticket-field-colon">:</span>
                <span class="ticket-field-value">{{ $ticket['trip_time'] }} WIB</span>
            </div>
            <div class="ticket-field">
                <span class="ticket-field-label">Tarif</span>
                <span class="ticket-field-colon">:</span>
                <span class="ticket-field-value">{{ $ticket['tarif'] }}</span>
            </div>
            <div class="ticket-field">
                <span class="ticket-field-label">Uang Muka</span>
                <span class="ticket-field-colon">:</span>
                <span class="ticket-field-value">{{ $ticket['uang_muka'] }}</span>
            </div>
            <div class="ticket-field">
                <span class="ticket-field-label">Sisa</span>
                <span class="ticket-field-colon">:</span>
                <span class="ticket-field-value">{{ $ticket['sisa'] }}</span>
            </div>
        </div>

        {{-- MIDDLE: Nomor Bangku --}}
        <div class="ticket-middle">
            <div class="ticket-section-title">Nomor Bangku</div>

            @php
                $seatMap = [
                    ['1A', 'SOPIR'],
                    ['2A', '3A'],
                    ['4A', '5A'],
                ];
            @endphp

            <div class="ticket-seat-grid">
                @foreach ($seatMap as $row)
                    @foreach ($row as $seat)
                        @if ($seat === 'SOPIR')
                            <div class="ticket-seat-cell is-driver">SOPIR</div>
                        @else
                            <div class="ticket-seat-cell {{ $ticket['seat_no'] === $seat ? 'is-active' : '' }}">
                                {{ Str::remove('A', $seat) }}
                            </div>
                        @endif
                    @endforeach
                @endforeach
            </div>

            <div class="ticket-purchase-date">
                <strong>Tanggal Pembelian Tiket</strong><br>
                Pasir Pengaraian, {{ $ticket['purchase_date'] }}
            </div>

            <div class="ticket-pengurus">Pengurus</div>
            <div style="border-top:1.5px solid #1a237e; width:100%; margin:2px 0;"></div>
            <div class="ticket-asuransi">Dilindungi Oleh<br>Asuransi Jasa Raharja</div>
        </div>

        {{-- RIGHT: Perhatian --}}
        <div class="ticket-right">
            <div class="ticket-section-title">Perhatian</div>

            <ul class="ticket-rules">
                <li data-no="1">Jemput Antar Ke Alamat Dalam Batas Tertentu</li>
                <li data-no="2">Bagasi Free 15kg/orang, Kelebihan Dikenakan Biaya</li>
                <li data-no="3">Barang Bawaan Penumpang Jika Terjadi Kehilangan Yang Sifat Nya Kelalaian Penumpang, Bukan Menjadi Tanggung Jawab Perusahaan</li>
                <li data-no="4">Dilarang Membawa Benda Terlarang (narkoba Dll), Hewan, Atau Barang Bawaan Yang Bau Nya Menyengat Dan Dapat Menganggu Kenyamanan Penumpang.</li>
                <li data-no="5">Dilarang Melakukan Tindakan Amoral Atau Asusila Serta Tindak Pidana Lainnya Selama Perjalanan.</li>
            </ul>

            <div class="ticket-promo">
                <div class="ticket-promo-title">Promo</div>
                <div class="ticket-promo-text">Kumpulkan 5 Tiket (discnt 50%) / Kumpulkan 10 Tiket Dengan Nama Dan No Hp Yang Sama Gratis 1x Keberangkatan</div>
            </div>

            <div class="ticket-tagline">Cepat, Aman &amp; Nyaman</div>
        </div>

    </div>
</div>
</div>
@endforeach

</body>
</html>
