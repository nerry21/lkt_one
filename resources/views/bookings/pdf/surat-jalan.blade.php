<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>Surat Jalan - PT. Lancang Kuning Travelindo</title>
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

        .col-no    { width: 26px;  text-align: center; }
        .col-kursi { width: 38px;  text-align: center; }
        .col-nama  { width: 150px; }
        .col-nohp  { width: 95px;  }
        .col-jemput{ width: 195px; }
        .col-tujuan{ width: 120px; }
        .col-tarif { width: 80px;  text-align: right; }

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
        }

        .footer-name {
            font-size: 10px;
            margin-top: 2px;
            margin-bottom: 44px;
            font-style: italic;
            color: #444;
        }

        .footer-sign-line {
            border-top: 1px solid #000;
            width: 150px;
            margin: 0 auto;
        }

        .footer-name-under {
            font-size: 10px;
            margin-top: 4px;
            font-weight: 600;
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
                <div class="doc-title">Surat Jalan</div>
            </td>
            <td class="header-meta-cell">
                <div class="meta-row">
                    <span class="meta-label">Kode Mobil</span>
                    <span class="meta-sep">:</span>
                    <span class="meta-value">{{ $kode_mobil }}</span>
                </div>
                <div class="meta-row">
                    <span class="meta-label">Tanggal</span>
                    <span class="meta-sep">:</span>
                    <span class="meta-value">{{ $tanggal !== '-' ? $tanggal : '' }}</span>
                </div>
                <div class="meta-row">
                    <span class="meta-label">Driver</span>
                    <span class="meta-sep">:</span>
                    <span class="meta-value">{{ $driver_name }}</span>
                </div>
            </td>
        </tr>
    </table>

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
            </tr>
        </thead>
        <tbody>
            @php $rowNum = 0; @endphp
            @foreach ($rows as $row)
                @php
                    $isEmpty = ($row['nama'] === '' && $row['jemput'] === '' && $row['tujuan'] === '');
                    if (!$isEmpty) $rowNum++;
                @endphp
                <tr class="{{ $isEmpty ? 'row-empty' : '' }}">
                    <td class="col-no td-center">{{ $isEmpty ? '' : $rowNum }}</td>
                    <td class="col-kursi td-center">{{ $row['kursi'] ?? '' }}</td>
                    <td class="col-nama">{{ $row['nama'] }}</td>
                    <td class="col-nohp">{{ $row['no_hp'] }}</td>
                    <td class="col-jemput">{{ $row['jemput'] }}</td>
                    <td class="col-tujuan">{{ $row['tujuan'] }}</td>
                    <td class="col-tarif td-right">
                        @if (!$isEmpty && isset($row['tarif']) && $row['tarif'] > 0)
                            Rp {{ number_format($row['tarif'], 0, ',', '.') }}
                        @endif
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    {{-- FOOTER --}}
    <table class="footer-table">
        <tr>
            <td class="footer-sign-cell">
                <div class="footer-role">Pengemudi</div>
                <div class="footer-name">{{ $driver_name ?: '( ........................... )' }}</div>
                <div class="footer-sign-line"></div>
                @if ($driver_name)
                    <div class="footer-name-under">{{ $driver_name }}</div>
                @endif
            </td>
            <td class="footer-sign-cell">
                <div class="footer-role">Pengurus</div>
                <div class="footer-name">&nbsp;</div>
                <div class="footer-sign-line"></div>
                <div class="footer-name-under">Zizi</div>
            </td>
        </tr>
    </table>

</body>
</html>
