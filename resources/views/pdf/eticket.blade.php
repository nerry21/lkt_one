<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>E-Ticket {{ $booking->booking_code }}</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 12px; color: #222; }
        .header { background: #0f766e; color: #fff; padding: 16px; border-radius: 10px; }
        .title { font-size: 22px; font-weight: bold; margin-bottom: 4px; }
        .section { margin-top: 18px; }
        .box { border: 1px solid #ddd; border-radius: 8px; padding: 12px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; }
        th { background: #f5f5f5; text-align: left; }
        .grid td { border: none; vertical-align: top; padding: 4px 8px 4px 0; }
        .right { text-align: right; }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">E-Ticket</div>
        <div>PT Lancang Kuning Travelindo</div>
    </div>

    <div class="section box">
        <table class="grid">
            <tr>
                <td style="width: 70%;">
                    <strong>Kode Booking:</strong> {{ $booking->booking_code }}<br>
                    <strong>Rute:</strong> {{ $booking->from_city }} -> {{ $booking->to_city }}<br>
                    <strong>Tanggal:</strong> {{ optional($booking->trip_date)->format('d-m-Y') }}<br>
                    <strong>Jam:</strong> {{ \Illuminate\Support\Str::of($booking->trip_time)->substr(0, 5) }}
                </td>
                <td class="right" style="width: 30%;">
                    @isset($qrSvg)
                        <img src="data:image/svg+xml;base64,{{ $qrSvg }}" width="120" height="120">
                    @endisset
                </td>
            </tr>
        </table>
    </div>

    <div class="section box">
        <table class="grid">
            <tr>
                <td><strong>Pemesan:</strong> {{ $booking->passenger_name }}</td>
                <td><strong>No HP:</strong> {{ $booking->passenger_phone }}</td>
            </tr>
            <tr>
                <td><strong>Jemput:</strong> {{ $booking->pickup_location ?: '-' }}</td>
                <td><strong>Antar:</strong> {{ $booking->dropoff_location ?: '-' }}</td>
            </tr>
        </table>
    </div>

    <div class="section">
        <h3>Daftar Penumpang</h3>
        <table>
            <thead>
                <tr>
                    <th width="40">No</th>
                    <th width="80">Seat</th>
                    <th>Nama</th>
                    <th>No HP</th>
                    <th width="100">Ticket</th>
                    <th width="100">Check-in</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($booking->passengers as $index => $passenger)
                    <tr>
                        <td>{{ $index + 1 }}</td>
                        <td>{{ $passenger->seat_no }}</td>
                        <td>{{ $passenger->name }}</td>
                        <td>{{ $passenger->phone ?: '-' }}</td>
                        <td>{{ $passenger->ticket_status }}</td>
                        <td>{{ $passenger->checkin_status ?: 'Pending' }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    @if ($booking->departure)
        <div class="section">
            <h3>Informasi Keberangkatan</h3>
            <div class="box">
                <table class="grid">
                    <tr>
                        <td><strong>Kode Keberangkatan:</strong> {{ $booking->departure->departure_code }}</td>
                        <td><strong>Driver:</strong> {{ optional($booking->departure->driver)->nama ?: '-' }}</td>
                    </tr>
                    <tr>
                        <td><strong>Kendaraan:</strong> {{ optional($booking->departure->vehicle)->plate_number ?: '-' }}</td>
                        <td><strong>Armada:</strong> {{ optional($booking->departure->vehicle)->full_name ?: '-' }}</td>
                    </tr>
                </table>
            </div>
        </div>
    @endif

    <div class="section right">
        <div>Diterbitkan: {{ optional($booking->ticket_issued_at)?->format('d-m-Y H:i') ?: now()->format('d-m-Y H:i') }}</div>
    </div>
</body>
</html>
