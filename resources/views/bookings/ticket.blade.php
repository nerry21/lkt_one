<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-Ticket {{ $booking->booking_code ?? 'Booking' }} | JET (JAYA EXECUTIVE TRANSPORT)</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Plus Jakarta Sans', Arial, sans-serif;
            background: #e8f5e9;
            padding: 24px;
        }

        /* ── Page Actions ── */
        .page-actions {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-bottom: 24px;
            flex-wrap: wrap;
        }

        .btn-print, .btn-back, .btn-download {
            padding: 10px 24px;
            border-radius: 8px;
            font: 600 0.9rem 'Plus Jakarta Sans', Arial, sans-serif;
            cursor: pointer;
            border: none;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }

        .btn-print    { background: #1565c0; color: #fff; }
        .btn-back     { background: #fff; color: #1565c0; border: 2px solid #1565c0; }
        .btn-download { background: #2e7d32; color: #fff; }

        /* ── Ticket Wrapper ── */
        .ticket-wrapper {
            max-width: 920px;
            margin: 0 auto 36px;
        }

        .ticket {
            background: #FDD835;
            border: 3px solid #1a237e;
            border-radius: 10px;
            overflow: hidden;
            page-break-after: always;
        }

        /* ── Header ── */
        .ticket-header {
            display: grid;
            grid-template-columns: 120px 1fr 120px;
            align-items: center;
            padding: 10px 16px;
            border-bottom: 3px solid #1a237e;
            gap: 12px;
        }

        .ticket-logo-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
        }

        .ticket-logo-text {
            font-size: 0.52rem;
            font-weight: 800;
            color: #1a237e;
            text-align: center;
            line-height: 1.35;
            text-transform: uppercase;
        }

        .ticket-header-center { text-align: center; }

        .ticket-company-name {
            font-size: 1.75rem;
            font-weight: 900;
            color: #1a237e;
            text-transform: uppercase;
            line-height: 1;
            letter-spacing: -0.5px;
        }

        .ticket-company-sub {
            font-size: 0.9rem;
            font-weight: 800;
            color: #1a237e;
            text-transform: uppercase;
            border: 2.5px solid #1a237e;
            display: inline-block;
            padding: 2px 16px;
            margin: 5px 0;
            border-radius: 4px;
        }

        .ticket-address {
            font-size: 0.63rem;
            color: #1a237e;
            line-height: 1.55;
        }

        .ticket-phones {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin-top: 5px;
        }

        .ticket-phone-city   { font-size: 0.65rem; font-weight: 700; color: #1a237e; }
        .ticket-phone-number { font-size: 0.8rem;  font-weight: 900; color: #1a237e; }

        /* ── Body ── */
        .ticket-body {
            display: grid;
            grid-template-columns: 1fr 190px 1fr;
        }

        .ticket-section-title {
            background: #1a237e;
            color: #FDD835;
            font-size: 0.78rem;
            font-weight: 800;
            text-transform: uppercase;
            padding: 5px 10px;
            margin-bottom: 10px;
            letter-spacing: 0.05em;
        }

        /* ── Left ── */
        .ticket-left {
            border-right: 2.5px solid #1a237e;
            padding: 10px 14px;
        }

        .ticket-field {
            display: grid;
            grid-template-columns: 115px 8px 1fr;
            align-items: baseline;
            margin-bottom: 6px;
        }

        .ticket-field-label  { font-size: 0.72rem; font-weight: 600; color: #1a237e; }
        .ticket-field-colon  { font-size: 0.72rem; font-weight: 600; color: #1a237e; }

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
            background: rgba(26,35,126,0.1);
            padding: 3px 8px;
            margin: 10px 0 7px;
            border-left: 3px solid #1a237e;
        }

        /* ── Middle ── */
        .ticket-middle {
            border-right: 2.5px solid #1a237e;
            padding: 10px 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }

        .ticket-middle .ticket-section-title { width: 100%; text-align: center; }

        /* ── QR Code ── */
        .ticket-qr-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            border: 2px solid #1a237e;
            border-radius: 6px;
            padding: 6px;
            background: rgba(255,255,255,0.6);
            width: 100%;
        }

        .ticket-qr-wrap svg {
            display: block;
            width: 110px !important;
            height: 110px !important;
        }

        .ticket-qr-token {
            font-size: 0.55rem;
            font-weight: 800;
            color: #1a237e;
            text-align: center;
            letter-spacing: 0.04em;
            font-family: monospace;
            word-break: break-all;
        }

        .ticket-qr-label {
            font-size: 0.5rem;
            font-weight: 700;
            color: #1a237e;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            opacity: 0.7;
        }

        .ticket-qr-no-qr {
            width: 100%;
            text-align: center;
            font-size: 0.6rem;
            color: #888;
            font-style: italic;
            padding: 8px 0;
        }

        .ticket-seat-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px;
            width: 100%;
        }

        .ticket-seat-cell {
            border: 2px solid #1a237e;
            border-radius: 5px;
            padding: 7px 4px;
            text-align: center;
            font-size: 0.9rem;
            font-weight: 900;
            color: #1a237e;
            background: rgba(255,255,255,0.5);
            min-height: 38px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .ticket-seat-cell.is-active {
            background: #1a237e;
            color: #FDD835;
            box-shadow: 0 3px 8px rgba(26,35,126,0.4);
        }

        .ticket-seat-cell.is-driver {
            background: rgba(26,35,126,0.06);
            color: #888;
            font-size: 0.65rem;
            font-weight: 700;
        }

        .ticket-purchase-date {
            font-size: 0.6rem;
            font-weight: 700;
            color: #1a237e;
            text-align: center;
            line-height: 1.5;
        }

        .ticket-pengurus {
            font-size: 0.72rem;
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
            padding: 3px 8px;
            border-radius: 4px;
            line-height: 1.5;
        }

        /* ── Right ── */
        .ticket-right { padding: 10px 14px; }

        .ticket-rules { list-style: none; }

        .ticket-rules li {
            font-size: 0.6rem;
            color: #1a237e;
            line-height: 1.45;
            margin-bottom: 5px;
            padding-left: 15px;
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
            line-height: 1.45;
            margin-top: 2px;
        }

        .ticket-tagline {
            margin-top: 10px;
            font-size: 0.8rem;
            font-weight: 800;
            color: #1a237e;
            font-style: italic;
            text-align: right;
        }

        /* ── Print ── */
        @media print {
            body { background: none; padding: 0; }
            .page-actions { display: none; }
            .no-print { display: none; }
            .ticket-wrapper { max-width: 100%; margin: 0 0 20px; }
            .ticket { page-break-after: always; border: 2px solid #1a237e; }
            .ticket:last-child { page-break-after: avoid; }
        }
    </style>
</head>
<body>

@php
    $brandLogoCandidates = [
        public_path('images/lk_travel.png'),
        public_path('images/lk_travel.PNG'),
        public_path('images/LK_TRAVEL.png'),
        public_path('images/LK_TRAVEL.PNG'),
    ];

    $brandLogoPath = collect($brandLogoCandidates)->first(fn (string $path): bool => is_file($path));
    $brandLogo = is_string($brandLogoPath)
        ? 'data:image/' . strtolower(pathinfo($brandLogoPath, PATHINFO_EXTENSION)) . ';base64,' . base64_encode((string) file_get_contents($brandLogoPath))
        : null;
@endphp

<div class="page-actions">
    <button class="btn-back" onclick="history.back()">← Kembali</button>
    <button class="btn-print" onclick="window.print()">🖨&nbsp; Cetak Semua Tiket</button>
</div>

@php
    $seatMap = [['1A','SOPIR'],['2A','3A'],['4A','5A']];
@endphp

@foreach ($tickets as $ticket)
<div class="ticket-wrapper">
<div class="ticket">

    {{-- HEADER --}}
    <div class="ticket-header">
        {{-- Logo Perusahaan --}}
        <div class="ticket-logo-box">
            @if ($brandLogo)
                <img src="{{ $brandLogo }}" alt="JET (JAYA EXECUTIVE TRANSPORT)"
                     style="width:90px;height:90px;object-fit:contain;display:block;">
            @endif
            <div class="ticket-logo-text">PT. REZEKI KELUARGA<br>BERKAH BERLIMPAH</div>
        </div>

        {{-- Center --}}
        <div class="ticket-header-center">
            <div class="ticket-company-name">JET (JAYA EXECUTIVE TRANSPORT)</div>
            <div class="ticket-company-sub">Travel Pekanbaru &amp; Pasir Pengaraian</div>
            <div class="ticket-address">
                Alamat : Jalan Riau, No 139, Lenggopan Kelurahan Pasirpengaraian, Kabupaten Rokan Hulu<br>
                Alamat : Jl. Pahlawan Kerja, Kec. Marpoyan Damai, Kota Pekanbaru
            </div>
            <div class="ticket-phones">
                <div>
                    <div class="ticket-phone-city">Pekanbaru</div>
                    <div class="ticket-phone-number">0823-6421-0642</div>
                </div>
            </div>
        </div>

        {{-- Logo Jasa Raharja --}}
        <div class="ticket-logo-box">
            <img src="/images/logo_jasaraharja.png" alt="Jasa Raharja"
                 style="width:90px;height:90px;object-fit:contain;display:block;">
            <div class="ticket-logo-text">Jasa Raharja<br>Protected</div>
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
                <span class="ticket-field-value">{{ $ticket['passenger_name'] ?? '-' }}</span>
            </div>
            <div class="ticket-field">
                <span class="ticket-field-label">Dari</span>
                <span class="ticket-field-colon">:</span>
                <span class="ticket-field-value">{{ $ticket['from_city'] ?? '-' }}</span>
            </div>
            <div class="ticket-field">
                <span class="ticket-field-label">Tujuan</span>
                <span class="ticket-field-colon">:</span>
                <span class="ticket-field-value">{{ $ticket['to_city'] ?? '-' }}</span>
            </div>

            <div class="ticket-sub-title">Keberangkatan</div>

            <div class="ticket-field">
                <span class="ticket-field-label">Tgl. Berangkat</span>
                <span class="ticket-field-colon">:</span>
                <span class="ticket-field-value">{{ $ticket['trip_date'] ?? '-' }}</span>
            </div>
            <div class="ticket-field">
                <span class="ticket-field-label">Jam</span>
                <span class="ticket-field-colon">:</span>
                <span class="ticket-field-value">
                    {{ isset($ticket['trip_time']) && $ticket['trip_time'] ? $ticket['trip_time'] . ' WIB' : '-' }}
                </span>
            </div>
            <div class="ticket-field">
                <span class="ticket-field-label">Tarif</span>
                <span class="ticket-field-colon">:</span>
                <span class="ticket-field-value">{{ $ticket['tarif'] ?? '-' }}</span>
            </div>
            <div class="ticket-field">
                <span class="ticket-field-label">Uang Muka</span>
                <span class="ticket-field-colon">:</span>
                <span class="ticket-field-value">{{ $ticket['uang_muka'] ?? '-' }}</span>
            </div>
            <div class="ticket-field">
                <span class="ticket-field-label">Sisa</span>
                <span class="ticket-field-colon">:</span>
                <span class="ticket-field-value">{{ $ticket['sisa'] ?? '-' }}</span>
            </div>
        </div>

        {{-- MIDDLE: QR & Nomor Bangku --}}
        <div class="ticket-middle">
            <div class="ticket-section-title">QR Loyalti &amp; Bangku</div>

            {{-- QR Code --}}
            @if (!empty($ticket['qr_svg']))
                <div class="ticket-qr-wrap">
                    {!! $ticket['qr_svg'] !!}
                    <div class="ticket-qr-token">{{ $ticket['qr_token'] }}</div>
                    <div class="ticket-qr-label">Scan untuk loyalti</div>
                </div>
            @else
                <div class="ticket-qr-no-qr">QR belum tersedia</div>
            @endif

            <div class="ticket-seat-grid">
                @foreach ($seatMap as $row)
                    @foreach ($row as $seat)
                        @if ($seat === 'SOPIR')
                            <div class="ticket-seat-cell is-driver">SOPIR</div>
                        @else
                            <div class="ticket-seat-cell {{ ($ticket['seat_no'] ?? '') === $seat ? 'is-active' : '' }}">
                                {{ Str::remove('A', $seat) }}
                            </div>
                        @endif
                    @endforeach
                @endforeach
            </div>

            <div class="ticket-purchase-date">
                <strong>Tanggal Pembelian Tiket</strong><br>
                Pasir Pengaraian, {{ $ticket['purchase_date'] ?? '-' }}
            </div>

            <div class="ticket-pengurus">Pengurus</div>
            <div style="border-top:1.5px solid #1a237e;width:100%;"></div>
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

    </div>{{-- /ticket-body --}}
</div>{{-- /ticket --}}

{{-- Per-ticket download button --}}
<div style="text-align:center;margin-top:10px;" class="no-print">
    <a href="{{ route('bookings.ticket.download.single', [$booking, $ticket['passenger_id']]) }}"
       style="display:inline-flex;align-items:center;gap:6px;background:#2e7d32;color:#fff;padding:8px 22px;border-radius:8px;font:700 0.85rem sans-serif;text-decoration:none;">
        ⬇ Download Tiket — {{ $ticket['passenger_name'] }} (Kursi {{ $ticket['seat_no'] }})
    </a>
</div>

</div>{{-- /ticket-wrapper --}}
@endforeach

</body>
</html>
