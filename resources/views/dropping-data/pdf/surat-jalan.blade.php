<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>Surat Jalan Dropping - {{ $booking->booking_code }}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: DejaVu Sans, Arial, sans-serif;
            background: #ffffff;
            color: #000000;
            font-size: 10.5px;
            padding: 16px 20px;
        }

        /* ── HEADER ── */
        .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }

        .header-logo-cell {
            width: 88px;
            vertical-align: middle;
            text-align: center;
        }

        .header-logo-cell img {
            width: 78px;
            height: 78px;
        }

        .header-center-cell {
            vertical-align: middle;
            text-align: center;
        }

        .company-name {
            font-size: 21px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 1px;
            line-height: 1.2;
        }

        .doc-title {
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-top: 4px;
        }

        .doc-subtitle {
            font-size: 10px;
            font-weight: 600;
            color: #555;
            margin-top: 3px;
        }

        .header-meta-cell {
            width: 220px;
            vertical-align: middle;
            padding-left: 12px;
        }

        .meta-row {
            display: table;
            width: 100%;
            margin-bottom: 5px;
        }

        .meta-label {
            display: table-cell;
            width: 80px;
            font-size: 10px;
            font-weight: 600;
            white-space: nowrap;
        }

        .meta-sep {
            display: table-cell;
            width: 10px;
            font-size: 10px;
            font-weight: 600;
        }

        .meta-value {
            display: table-cell;
            font-size: 10px;
            border-bottom: 1px solid #000;
            min-width: 110px;
            padding-bottom: 1px;
        }

        .divider {
            border-top: 2px solid #000;
            margin: 8px 0;
        }

        /* ── INFO SECTION ── */
        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 8px;
        }

        .info-table td {
            padding: 4px 6px;
            font-size: 10px;
            vertical-align: top;
            width: 50%;
        }

        .info-label {
            font-weight: 700;
            width: 110px;
        }

        .info-sep { width: 10px; }

        .info-val {
            border-bottom: 1px solid #999;
            padding-bottom: 2px;
        }

        /* ── DATA TABLE ── */
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
        }

        .data-table th,
        .data-table td {
            border: 1.5px solid #000;
            padding: 5px 6px;
            vertical-align: middle;
        }

        .data-table th {
            background: #f0f0f0;
            font-weight: 700;
            font-size: 10px;
            text-align: center;
            white-space: nowrap;
        }

        .data-table td {
            font-size: 10px;
            vertical-align: top;
        }

        .col-no      { width: 28px;  text-align: center; }
        .col-nama    { width: 145px; }
        .col-nohp    { width: 95px;  }
        .col-jemput  { width: 155px; }
        .col-tujuan  { width: 130px; }
        .col-tarif   { width: 90px;  text-align: right; }
        .col-ket     { }

        .td-center { text-align: center; }
        .td-right  { text-align: right; }

        /* ── FOOTER ── */
        .footer-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 24px;
        }

        .footer-sign-cell {
            width: 50%;
            text-align: center;
            padding-top: 4px;
        }

        .footer-role {
            font-size: 11px;
            font-weight: 700;
            margin-bottom: 52px;
        }

        .footer-name-under {
            font-size: 10.5px;
            font-weight: 700;
        }

        .footer-date {
            font-size: 10px;
            margin-bottom: 6px;
        }

        .badge-dropping {
            display: inline-block;
            background: #fff3cd;
            border: 1px solid #ffc107;
            color: #856404;
            font-size: 9px;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 4px;
            text-transform: uppercase;
            letter-spacing: .04em;
        }
    </style>
</head>
<body>

    {{-- HEADER --}}
    <table class="header-table">
        <tr>
            <td class="header-logo-cell">
                @if ($logo_base64)
                    <img src="{{ $logo_base64 }}" alt="Logo LK Travelindo">
                @endif
            </td>
            <td class="header-center-cell">
                <div class="company-name">PT. Lancang Kuning Travelindo</div>
                <div class="doc-title">Surat Jalan Dropping</div>
                <div class="doc-subtitle">
                    <span class="badge-dropping">Dropping Booking</span>
                    &nbsp;{{ $booking->booking_code }}
                </div>
            </td>
            <td class="header-meta-cell">
                <div class="meta-row">
                    <span class="meta-label">Tanggal</span>
                    <span class="meta-sep">:</span>
                    <span class="meta-value">{{ $tanggal }}</span>
                </div>
                <div class="meta-row">
                    <span class="meta-label">Jam</span>
                    <span class="meta-sep">:</span>
                    <span class="meta-value">{{ substr($booking->trip_time ?? '', 0, 5) }} WIB</span>
                </div>
                <div class="meta-row">
                    <span class="meta-label">Driver</span>
                    <span class="meta-sep">:</span>
                    <span class="meta-value">{{ $driver_name ?: '—' }}</span>
                </div>
            </td>
        </tr>
    </table>

    <div class="divider"></div>

    {{-- TRIP INFO ── --}}
    <table class="info-table">
        <tr>
            <td>
                <table style="width:100%;border-collapse:collapse;">
                    <tr>
                        <td class="info-label">Asal Penjemputan</td>
                        <td class="info-sep">:</td>
                        <td class="info-val">{{ $booking->from_city }}</td>
                    </tr>
                    <tr><td colspan="3" style="height:4px;"></td></tr>
                    <tr>
                        <td class="info-label">Tujuan</td>
                        <td class="info-sep">:</td>
                        <td class="info-val">{{ $booking->to_city }}</td>
                    </tr>
                    <tr><td colspan="3" style="height:4px;"></td></tr>
                    <tr>
                        <td class="info-label">Alamat Jemput</td>
                        <td class="info-sep">:</td>
                        <td class="info-val">{{ $booking->pickup_location }}</td>
                    </tr>
                </table>
            </td>
            <td>
                <table style="width:100%;border-collapse:collapse;padding-left:10px;">
                    <tr>
                        <td class="info-label">Alamat Antar</td>
                        <td class="info-sep">:</td>
                        <td class="info-val">{{ $booking->dropoff_location }}</td>
                    </tr>
                    <tr><td colspan="3" style="height:4px;"></td></tr>
                    <tr>
                        <td class="info-label">Jenis Pemesanan</td>
                        <td class="info-sep">:</td>
                        <td class="info-val">Dropping — Seluruh Armada</td>
                    </tr>
                    <tr><td colspan="3" style="height:4px;"></td></tr>
                    <tr>
                        <td class="info-label">Keterangan</td>
                        <td class="info-sep">:</td>
                        <td class="info-val">{{ $booking->notes ?: '—' }}</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    {{-- DATA TABLE --}}
    <table class="data-table">
        <thead>
            <tr>
                <th class="col-no">NO.</th>
                <th class="col-nama">NAMA PEMESAN</th>
                <th class="col-nohp">NOMOR HP</th>
                <th class="col-jemput">ASAL PENJEMPUTAN</th>
                <th class="col-tujuan">TUJUAN</th>
                <th class="col-tarif">TARIF FINAL</th>
                <th class="col-ket">KETERANGAN</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="col-no td-center">1</td>
                <td class="col-nama">{{ $booking->passenger_name }}</td>
                <td class="col-nohp">{{ $booking->passenger_phone }}</td>
                <td class="col-jemput">{{ $booking->from_city }}</td>
                <td class="col-tujuan">{{ $booking->to_city }}</td>
                <td class="col-tarif td-right">
                    Rp {{ number_format((int)($booking->total_amount ?? 0), 0, ',', '.') }}
                </td>
                <td class="col-ket">Dropping — Seluruh 6 Kursi (1A,2A,2B,3A,4A,5A)</td>
            </tr>
            {{-- Empty rows for spacing --}}
            @for ($i = 0; $i < 5; $i++)
                <tr style="height:22px;">
                    <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                </tr>
            @endfor
        </tbody>
    </table>

    {{-- FOOTER --}}
    <table class="footer-table">
        <tr>
            <td class="footer-sign-cell">
                <div class="footer-date">Pasir Pengaraian, {{ $tanggal }}</div>
                <div class="footer-role">Pengemudi</div>
                <div class="footer-name-under">{{ $driver_name ?: '________________' }}</div>
            </td>
            <td class="footer-sign-cell">
                <div class="footer-date">&nbsp;</div>
                <div class="footer-role">Pengurus</div>
                <div class="footer-name-under">Zizi</div>
            </td>
        </tr>
    </table>

</body>
</html>
