<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Surat Jalan — {{ $trip_label }}</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; color: #222; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 12px; }
        .header h1 { margin: 0; font-size: 18px; }
        .header p { margin: 2px 0; font-size: 11px; }
        .trip-info { margin-bottom: 14px; }
        .trip-info table { width: 100%; }
        .trip-info td { padding: 3px 6px; }
        .trip-info td:first-child { width: 130px; font-weight: bold; }
        .pax-table { width: 100%; border-collapse: collapse; margin-bottom: 14px; }
        .pax-table th, .pax-table td { border: 1px solid #999; padding: 5px 6px; text-align: left; }
        .pax-table th { background: #f0f0f0; }
        .summary { margin-top: 14px; font-weight: bold; }
        .footer { margin-top: 30px; font-size: 10px; color: #666; border-top: 1px solid #ccc; padding-top: 6px; }
        .signature { margin-top: 40px; display: table; width: 100%; }
        .signature-cell { display: table-cell; text-align: center; width: 33%; }
        .signature-line { border-top: 1px solid #000; margin-top: 50px; padding-top: 4px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>SURAT JALAN — JET TRAVEL</h1>
        <p>Pekanbaru &harr; Pasirpengaraian (Rokan Hulu)</p>
    </div>

    <div class="trip-info">
        <table>
            <tr><td>Tanggal</td><td>: {{ $trip_date_label }}</td></tr>
            <tr><td>Jam Berangkat</td><td>: {{ $trip_time }}</td></tr>
            <tr><td>Rute</td><td>: {{ $from_city }} &rarr; {{ $to_city }}</td></tr>
            <tr><td>Mobil</td><td>: {{ $mobil_kode ?? '-' }}</td></tr>
            <tr><td>Driver</td><td>: {{ $driver_name ?? '-' }}</td></tr>
        </table>
    </div>

    <table class="pax-table">
        <thead>
            <tr>
                <th style="width: 30px;">No</th>
                <th>Nama Penumpang</th>
                <th>No HP</th>
                <th style="width: 60px;">Kursi</th>
                <th>Pickup</th>
                <th>Drop-off</th>
                <th style="width: 80px;">Bayar</th>
            </tr>
        </thead>
        <tbody>
            @foreach($passengers as $i => $pax)
                <tr>
                    <td>{{ $i + 1 }}</td>
                    <td>{{ $pax['passenger_name'] }}</td>
                    <td>{{ $pax['passenger_phone'] }}</td>
                    <td>{{ $pax['seat_label'] }}</td>
                    <td>{{ $pax['pickup_location'] ?? '-' }}</td>
                    <td>{{ $pax['dropoff_location'] ?? '-' }}</td>
                    <td>{{ $pax['payment_status_label'] }}</td>
                </tr>
            @endforeach
            @if(count($passengers) === 0)
                <tr><td colspan="7" style="text-align: center; padding: 18px;">&mdash; Tidak ada penumpang confirmed &mdash;</td></tr>
            @endif
        </tbody>
    </table>

    <div class="summary">
        <p>Total Penumpang: {{ count($passengers) }}</p>
        <p>Total Revenue: Rp {{ number_format($total_revenue, 0, ',', '.') }}</p>
    </div>

    <div class="signature">
        <div class="signature-cell">
            <div class="signature-line">Driver</div>
        </div>
        <div class="signature-cell">
            <div class="signature-line">Admin Pemberangkatan</div>
        </div>
        <div class="signature-cell">
            <div class="signature-line">Mengetahui</div>
        </div>
    </div>

    <div class="footer">
        Dicetak: {{ $generated_at }} &mdash; Surat Jalan ID: {{ $trip_key }}
    </div>
</body>
</html>
