<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Surat Bukti Pengiriman Barang - {{ $invoiceState['invoice_number'] }}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11px;
            color: #1e293b;
            background: #fff;
        }

        .page {
            width: 100%;
            padding: 12px;
        }

        /* ===== HEADER ===== */
        .header {
            display: table;
            width: 100%;
            background: #0ea5e9;
            border-radius: 8px 8px 0 0;
            padding: 10px 14px;
        }

        .header-left {
            display: table-cell;
            width: 80px;
            vertical-align: middle;
        }

        .header-logo-circle {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border: 3px solid #fff;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            text-align: center;
            padding: 6px;
        }

        .header-logo-text {
            font-size: 7px;
            font-weight: 800;
            color: #0ea5e9;
            text-align: center;
            line-height: 1.2;
        }

        .header-center {
            display: table-cell;
            vertical-align: middle;
            text-align: center;
            padding: 0 10px;
        }

        .header-company-name {
            font-size: 22px;
            font-weight: 900;
            color: #fff;
            letter-spacing: 1px;
            font-style: italic;
            text-transform: uppercase;
        }

        .header-tagline-box {
            background: #facc15;
            border-radius: 4px;
            padding: 3px 12px;
            display: inline-block;
            margin-top: 4px;
        }

        .header-tagline {
            font-size: 11px;
            font-weight: 800;
            color: #1e293b;
            letter-spacing: 0.5px;
        }

        .header-address {
            font-size: 8.5px;
            color: #e0f2fe;
            margin-top: 4px;
            line-height: 1.5;
        }

        .header-right {
            display: table-cell;
            width: 80px;
            vertical-align: middle;
            text-align: right;
        }

        .header-logo-dp {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: 3px solid #fff;
            background: #fff;
            display: inline-block;
            text-align: center;
            line-height: 54px;
            font-weight: 900;
            font-size: 16px;
            color: #0ea5e9;
        }

        /* ===== ROUTE BANNER ===== */
        .route-banner {
            background: #0284c7;
            color: #fff;
            text-align: center;
            font-size: 16px;
            font-weight: 900;
            padding: 6px 0;
            letter-spacing: 2px;
        }

        /* ===== BODY ===== */
        .body-table {
            display: table;
            width: 100%;
            margin-top: 0;
        }

        /* ===== LEFT PANEL ===== */
        .left-panel {
            display: table-cell;
            width: 52%;
            padding: 14px 10px 10px 10px;
            vertical-align: top;
            border-right: 2px solid #e2e8f0;
        }

        .doc-title {
            font-size: 13px;
            font-weight: 900;
            color: #0ea5e9;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 12px;
            border-bottom: 2px solid #0ea5e9;
            padding-bottom: 4px;
        }

        .field-row {
            display: table;
            width: 100%;
            margin-bottom: 10px;
        }

        .field-label {
            display: table-cell;
            width: 80px;
            font-weight: 700;
            color: #0ea5e9;
            font-size: 11px;
            vertical-align: top;
            padding-top: 2px;
        }

        .field-colon {
            display: table-cell;
            width: 12px;
            font-weight: 700;
            font-size: 11px;
            vertical-align: top;
            padding-top: 2px;
        }

        .field-value {
            display: table-cell;
            font-size: 11px;
            vertical-align: top;
            padding-top: 2px;
            border-bottom: 1px dotted #94a3b8;
            padding-bottom: 3px;
            min-height: 20px;
        }

        /* ===== SIGNATURE AREA ===== */
        .sig-area {
            display: table;
            width: 100%;
            margin-top: 18px;
        }

        .sig-cell {
            display: table-cell;
            width: 33.33%;
            text-align: center;
            font-size: 10px;
            font-weight: 700;
            color: #0ea5e9;
            padding: 0 4px;
        }

        .sig-space {
            height: 40px;
            border-bottom: 1px solid #94a3b8;
            margin: 4px 0;
        }

        .sig-bracket {
            font-size: 9.5px;
            color: #64748b;
            margin-top: 3px;
        }

        /* ===== RIGHT PANEL ===== */
        .right-panel {
            display: table-cell;
            width: 48%;
            vertical-align: top;
            padding: 10px;
        }

        /* Items Table */
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 12px;
        }

        .items-table th {
            background: #0ea5e9;
            color: #fff;
            font-size: 10.5px;
            font-weight: 700;
            padding: 7px 8px;
            border: 1px solid #0284c7;
        }

        .items-table td {
            padding: 8px;
            border: 1px solid #cbd5e1;
            font-size: 10.5px;
        }

        .items-table .text-center { text-align: center; }
        .items-table .text-right { text-align: right; }

        .items-table .total-row td {
            font-weight: 700;
            background: #f0f9ff;
        }

        /* Contact info */
        .contact-box {
            margin-bottom: 8px;
        }

        .contact-city {
            background: #facc15;
            color: #1e293b;
            font-size: 9.5px;
            font-weight: 800;
            padding: 3px 8px;
            border-radius: 3px;
            display: inline-block;
            margin-bottom: 3px;
        }

        .contact-phone {
            background: #0ea5e9;
            color: #fff;
            font-size: 13px;
            font-weight: 900;
            padding: 4px 10px;
            border-radius: 4px;
            display: block;
        }

        .contact-icon {
            font-size: 12px;
            margin-right: 4px;
        }

        .kritik-box {
            background: #0ea5e9;
            color: #fff;
            border-radius: 6px;
            padding: 8px 10px;
            margin-top: 10px;
            text-align: center;
        }

        .kritik-title {
            font-size: 11px;
            font-weight: 800;
            color: #facc15;
        }

        .kritik-phone {
            font-size: 10px;
            font-weight: 700;
            margin-top: 3px;
        }

        /* ===== FOOTER ===== */
        .footer {
            background: #0ea5e9;
            color: #fff;
            text-align: center;
            font-size: 8px;
            padding: 4px;
            border-radius: 0 0 8px 8px;
            margin-top: 0;
        }
    </style>
</head>
<body>
<div class="page">

    {{-- HEADER --}}
    <div style="background:#0ea5e9; border-radius:8px 8px 0 0; padding:10px 14px;">
        <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td width="80" valign="middle">
                    <div style="width:68px; height:68px; border-radius:50%; border:3px solid #fff; background:#fff; overflow:hidden; text-align:center; line-height:68px;">
                        <img src="{{ public_path('images/lk_travel.png') }}" style="width:64px; height:64px; object-fit:contain; vertical-align:middle; border-radius:50%;" alt="LKT Logo">
                    </div>
                </td>
                <td valign="middle" style="text-align:center; padding:0 10px;">
                    <div style="font-size:22px; font-weight:900; color:#fff; letter-spacing:1px; font-style:italic; text-transform:uppercase;">
                        LANCANG KUNING TRAVELINDO
                    </div>
                    <div style="display:inline-block; background:#facc15; border-radius:4px; padding:3px 14px; margin-top:4px;">
                        <span style="font-size:11px; font-weight:800; color:#1e293b; letter-spacing:0.5px;">
                            TRAVEL PEKANBARU &amp; PASIR PENGARAIAN
                        </span>
                    </div>
                    <div style="font-size:8px; color:#e0f2fe; margin-top:5px; line-height:1.6;">
                        Alamat : Jl. Lingkat Pasir Pengaraian Dusun Kampung Baru Desa Koto Tinggi Kec. Rambah Kab. Rokan Hulu<br>
                        Alamat : Jl. Pahlawan Kerja Kec. Marpoyan Damai Kota Pekanbaru
                    </div>
                </td>
                <td width="75" valign="middle" style="text-align:right;">
                    <div style="width:65px; height:65px; border-radius:50%; border:3px solid #fff; background:#fff; display:inline-block; overflow:hidden; text-align:center; line-height:65px;">
                        <img src="{{ public_path('images/logo_jasaraharja.png') }}" style="width:61px; height:61px; object-fit:contain; vertical-align:middle; border-radius:50%;" alt="Jasa Raharja Logo">
                    </div>
                </td>
            </tr>
        </table>
    </div>

    {{-- ROUTE BANNER --}}
    <div style="background:#0284c7; color:#fff; text-align:center; font-size:15px; font-weight:900; padding:6px 0; letter-spacing:2px;">
        {{ strtoupper($invoiceState['from_city']) }} &ndash; {{ strtoupper($invoiceState['to_city']) }}
    </div>

    {{-- BODY --}}
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #cbd5e1; border-top:none;">
        <tr>
            {{-- LEFT: SURAT BUKTI --}}
            <td width="52%" valign="top" style="padding:14px 12px; border-right:2px solid #e2e8f0;">

                <div style="font-size:13px; font-weight:900; color:#0ea5e9; text-transform:uppercase; letter-spacing:1px; border-bottom:2px solid #0ea5e9; padding-bottom:5px; margin-bottom:14px;">
                    SURAT BUKTI PENGIRIMAN BARANG
                </div>

                {{-- Pengirim --}}
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
                    <tr>
                        <td width="80" style="font-weight:700; color:#0ea5e9; font-size:11px; vertical-align:top; padding-top:2px;">Pengirim</td>
                        <td width="10" style="font-weight:700; vertical-align:top; padding-top:2px;">:</td>
                        <td style="font-size:11px; vertical-align:top; border-bottom:1px dotted #94a3b8; padding-bottom:3px;">
                            {{ $invoiceState['sender_name'] }}
                            @if($invoiceState['sender_phone']) <span style="color:#64748b; font-size:9.5px;">({{ $invoiceState['sender_phone'] }})</span> @endif
                        </td>
                    </tr>
                </table>

                {{-- Alamat Pengirim --}}
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
                    <tr>
                        <td width="80" style="font-weight:700; color:#0ea5e9; font-size:11px; vertical-align:top; padding-top:2px;">Alamat</td>
                        <td width="10" style="font-weight:700; vertical-align:top; padding-top:2px;">:</td>
                        <td style="font-size:11px; vertical-align:top; border-bottom:1px dotted #94a3b8; padding-bottom:3px;">
                            {{ $invoiceState['sender_address'] }}
                        </td>
                    </tr>
                </table>

                {{-- Kepada --}}
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
                    <tr>
                        <td width="80" style="font-weight:700; color:#0ea5e9; font-size:11px; vertical-align:top; padding-top:2px;">Kepada</td>
                        <td width="10" style="font-weight:700; vertical-align:top; padding-top:2px;">:</td>
                        <td style="font-size:11px; vertical-align:top; border-bottom:1px dotted #94a3b8; padding-bottom:3px;">
                            {{ $invoiceState['recipient_name'] }}
                            @if($invoiceState['recipient_phone']) <span style="color:#64748b; font-size:9.5px;">({{ $invoiceState['recipient_phone'] }})</span> @endif
                        </td>
                    </tr>
                </table>

                {{-- Alamat Penerima --}}
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                    <tr>
                        <td width="80" style="font-weight:700; color:#0ea5e9; font-size:11px; vertical-align:top; padding-top:2px;">Alamat</td>
                        <td width="10" style="font-weight:700; vertical-align:top; padding-top:2px;">:</td>
                        <td style="font-size:11px; vertical-align:top; border-bottom:1px dotted #94a3b8; padding-bottom:3px;">
                            {{ $invoiceState['recipient_address'] }}
                        </td>
                    </tr>
                </table>

                {{-- Signature Row --}}
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px;">
                    <tr>
                        <td width="33%" style="text-align:center; font-size:10.5px; font-weight:700; color:#0ea5e9; padding:0 4px;">
                            Penerima
                        </td>
                        <td width="34%" style="text-align:center; font-size:10.5px; font-weight:700; color:#0ea5e9; padding:0 4px;">
                            Pengurus
                        </td>
                        <td width="33%" style="text-align:center; font-size:10.5px; font-weight:700; color:#0ea5e9; padding:0 4px;">
                            Pengirim
                        </td>
                    </tr>
                    <tr>
                        <td height="38"></td>
                        <td height="38"></td>
                        <td height="38"></td>
                    </tr>
                    <tr>
                        <td style="text-align:center; font-size:10px; font-weight:600; color:#1e293b; padding-top:4px;">
                            ( {{ $invoiceState['recipient_name'] }} )
                        </td>
                        <td style="text-align:center; font-size:10px; font-weight:600; color:#1e293b; padding-top:4px;">
                            ( Zizi )
                        </td>
                        <td style="text-align:center; font-size:10px; font-weight:600; color:#1e293b; padding-top:4px;">
                            ( {{ $invoiceState['sender_name'] }} )
                        </td>
                    </tr>
                </table>

            </td>

            {{-- RIGHT: TABLE + CONTACT --}}
            <td width="48%" valign="top" style="padding:12px 10px;">

                {{-- Items Table --}}
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin-bottom:12px;">
                    <thead>
                        <tr>
                            <th style="background:#0ea5e9; color:#fff; font-size:10.5px; font-weight:700; padding:7px 8px; border:1px solid #0284c7; text-align:center; width:50px;">Jumlah</th>
                            <th style="background:#0ea5e9; color:#fff; font-size:10.5px; font-weight:700; padding:7px 8px; border:1px solid #0284c7; text-align:left;">Nama Barang</th>
                            <th style="background:#0ea5e9; color:#fff; font-size:10.5px; font-weight:700; padding:7px 8px; border:1px solid #0284c7; text-align:right; width:80px;">Biaya</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:8px; border:1px solid #cbd5e1; text-align:center; font-size:10.5px;">{{ $invoiceState['item_qty'] }}</td>
                            <td style="padding:8px; border:1px solid #cbd5e1; font-size:10.5px;">{{ $invoiceState['item_name'] }}<br><span style="font-size:9px; color:#64748b;">{{ $invoiceState['package_size_label'] }}</span></td>
                            <td style="padding:8px; border:1px solid #cbd5e1; text-align:right; font-size:10.5px;">{{ $invoiceState['fare_amount_formatted'] }}</td>
                        </tr>
                        {{-- Empty rows for space --}}
                        <tr><td style="height:24px; border:1px solid #cbd5e1;"></td><td style="border:1px solid #cbd5e1;"></td><td style="border:1px solid #cbd5e1;"></td></tr>
                        <tr>
                            <td colspan="2" style="padding:6px 8px; border:1px solid #cbd5e1; text-align:right; font-weight:700; font-size:10px; background:#f0f9ff;">Ongkos Tambahan</td>
                            <td style="padding:6px 8px; border:1px solid #cbd5e1; text-align:right; font-size:10.5px; background:#f0f9ff;">
                                @if($invoiceState['total_amount_formatted'] !== $invoiceState['fare_amount_formatted'])
                                    {{ $invoiceState['total_amount_formatted'] }}
                                @else
                                    -
                                @endif
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="padding:7px 8px; border:1px solid #0284c7; text-align:right; font-weight:800; font-size:11px; background:#e0f2fe; color:#0284c7;">TOTAL</td>
                            <td style="padding:7px 8px; border:1px solid #0284c7; text-align:right; font-weight:800; font-size:11px; background:#e0f2fe; color:#0284c7;">{{ $invoiceState['nominal_payment_formatted'] }}</td>
                        </tr>
                    </tbody>
                </table>

                {{-- Kantor info --}}
                <div style="font-size:9.5px; font-weight:700; color:#0ea5e9; margin-bottom:6px;">Kantor Pusat Pasir Pengaraian :</div>

                {{-- Pekanbaru --}}
                <div style="margin-bottom:6px;">
                    <div style="display:inline-block; background:#facc15; color:#1e293b; font-size:9px; font-weight:800; padding:2px 8px; border-radius:3px; margin-bottom:3px;">PEKANBARU</div><br>
                    <div style="background:#0ea5e9; color:#fff; font-size:13px; font-weight:900; padding:4px 10px; border-radius:4px; display:inline-block;">
                        0823-6421-0642
                    </div>
                </div>

                {{-- Rohul --}}
                <div style="margin-bottom:10px;">
                    <div style="display:inline-block; background:#facc15; color:#1e293b; font-size:9px; font-weight:800; padding:2px 8px; border-radius:3px; margin-bottom:3px;">ROHUL</div><br>
                    <div style="background:#0ea5e9; color:#fff; font-size:13px; font-weight:900; padding:4px 10px; border-radius:4px; display:inline-block;">
                        0823-1320-5885
                    </div>
                </div>

                {{-- Kritik & Saran --}}
                <div style="background:#0ea5e9; color:#fff; border-radius:6px; padding:8px 10px; text-align:center;">
                    <div style="font-size:11px; font-weight:800; color:#facc15;">Kritik &amp; Saran</div>
                    <div style="font-size:10px; font-weight:700; margin-top:3px;">0811 7598 804</div>
                    <div style="font-size:10px; font-weight:700;">0822 833 73811</div>
                </div>

                {{-- Invoice Info --}}
                <div style="margin-top:10px; font-size:8.5px; color:#64748b; line-height:1.6; border-top:1px solid #e2e8f0; padding-top:6px;">
                    <strong style="color:#0ea5e9;">No. Surat:</strong> {{ $invoiceState['invoice_number'] }}<br>
                    <strong style="color:#0ea5e9;">Tgl:</strong> {{ $invoiceState['trip_date'] }} | {{ $invoiceState['trip_time'] }}<br>
                    <strong style="color:#0ea5e9;">Bayar:</strong> {{ $invoiceState['payment_method'] }} &mdash; {{ $invoiceState['payment_status'] }}<br>
                    <strong style="color:#0ea5e9;">Ref:</strong> {{ $invoiceState['payment_reference'] }}
                </div>

            </td>
        </tr>
    </table>

    {{-- FOOTER --}}
    <div style="background:#0ea5e9; color:#fff; text-align:center; font-size:8px; padding:4px; border-radius:0 0 8px 8px; margin-top:0;">
        Lancang Kuning Travelindo &mdash; Travel Pekanbaru &amp; Pasir Pengaraian &mdash; Terima kasih telah mempercayai kami
    </div>

</div>
</body>
</html>
