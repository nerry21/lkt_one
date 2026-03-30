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
            width: 210px;
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
            width: 72px;
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

        /* ── TABLE ── */
        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 4px;
        }

        .data-table th,
        .data-table td {
            border: 1.5px solid #000;
            padding: 5px 5px;
            vertical-align: middle;
        }

        .data-table th {
            background: #ffffff;
            font-weight: 700;
            font-size: 10px;
            text-align: center;
            white-space: nowrap;
        }

        .data-table td {
            font-size: 9.5px;
            vertical-align: top;
        }

        .col-no    { width: 24px;  text-align: center; }
        .col-kursi { width: 68px;  text-align: center; }
        .col-nama  { width: 115px; }
        .col-nohp  { width: 88px;  }
        .col-jemput{ width: 140px; }
        .col-tujuan{ width: 95px;  }
        .col-tarif { width: 72px;  text-align: right; }
        .col-ket   { width: 115px; word-wrap: break-word; overflow: hidden; }

        .td-center { text-align: center; }
        .td-right  { text-align: right; }

        .row-empty td { height: 22px; }

        /* ── FOOTER ── */
        .footer-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
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
                <div class="company-name">PT. JET (JAYA EXCECUTIVE TRANSPORT)</div>
                <div class="doc-title">Surat Jalan</div>
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

    @php
        $userNotes = $booking->notes ?? '';
        // Filter out auto-generated wizard notes
        if (str_starts_with($userNotes, 'Draft dropping booking')) {
            $userNotes = '';
        }
    @endphp

    {{-- DATA TABLE --}}
    <table class="data-table">
        <thead>
            <tr>
                <th class="col-no">NO.</th>
                <th class="col-kursi">KURSI</th>
                <th class="col-nama">NAMA</th>
                <th class="col-nohp">NOMOR HP</th>
                <th class="col-jemput">JEMPUT</th>
                <th class="col-tujuan">TUJUAN</th>
                <th class="col-tarif">TARIF</th>
                <th class="col-ket">KETERANGAN</th>
            </tr>
        </thead>
        <tbody>
            {{-- Single pemesan row --}}
            <tr>
                <td class="col-no td-center">1</td>
                <td class="col-kursi td-center">1A, 2A, 2B, 3A, 4A, 5A</td>
                <td class="col-nama">{{ $booking->passenger_name }}</td>
                <td class="col-nohp">{{ $booking->passenger_phone }}</td>
                <td class="col-jemput">{{ $booking->pickup_location }}</td>
                <td class="col-tujuan">{{ $booking->to_city }}</td>
                <td class="col-tarif td-right">
                    Rp {{ number_format((int)($booking->total_amount ?? 0), 0, ',', '.') }}
                </td>
                <td class="col-ket">Dropping — Seluruh Armada{{ $userNotes ? '. ' . $userNotes : '' }}</td>
            </tr>
            {{-- Empty rows for spacing --}}
            @for ($i = 0; $i < 7; $i++)
                <tr class="row-empty">
                    <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                </tr>
            @endfor
        </tbody>
    </table>

    {{-- FOOTER --}}
    <table class="footer-table">
        <tr>
            <td class="footer-sign-cell">
                <div class="footer-role">Pengemudi</div>
                <div class="footer-name-under">{{ $driver_name ?: '' }}</div>
            </td>
            <td class="footer-sign-cell">
                <div class="footer-role">Pengurus</div>
                <div class="footer-name-under">Zizi</div>
            </td>
        </tr>
    </table>

</body>
</html>
