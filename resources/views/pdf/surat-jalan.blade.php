<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <title>E-Surat Jalan {{ $departure->departure_code }}</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; font-size: 12px; color: #222; }
        .title { text-align: center; margin-bottom: 16px; }
        .title h1 { margin: 0; font-size: 20px; }
        .title p { margin: 4px 0 0; }
        .box { border: 1px solid #ddd; border-radius: 8px; padding: 12px; margin-bottom: 16px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 7px; }
        th { background: #f5f5f5; text-align: left; }
        .grid td { border: none; padding: 4px 6px 4px 0; vertical-align: top; }
        .sign { margin-top: 50px; width: 100%; }
        .sign td { border: none; text-align: center; width: 50%; }
    </style>
</head>
<body>
    <div class="title">
        <h1>SURAT JALAN</h1>
        <p>PT Lancang Kuning Travelindo</p>
        <p><strong>Nomor:</strong> {{ $departure->surat_jalan_number ?: '-' }}</p>
        <p><strong>Tanggal Terbit:</strong> {{ optional($departure->surat_jalan_issued_at)?->format('d-m-Y H:i') ?: '-' }}</p>
    </div>

    <div class="box">
        <table class="grid">
            <tr>
                <td><strong>Kode Keberangkatan:</strong> {{ $departure->departure_code }}</td>
                <td><strong>Tanggal:</strong> {{ optional($departure->trip_date)->format('d-m-Y') }}</td>
            </tr>
            <tr>
                <td><strong>Rute:</strong> {{ $departure->from_city }} -> {{ $departure->to_city }}</td>
                <td><strong>Jam:</strong> {{ \Illuminate\Support\Str::of($departure->trip_time)->substr(0, 5) }}</td>
            </tr>
            <tr>
                <td><strong>Driver:</strong> {{ optional($departure->driver)->nama ?: '-' }}</td>
                <td><strong>No HP Driver:</strong> {{ optional($departure->driver)->phone ?: '-' }}</td>
            </tr>
            <tr>
                <td><strong>Kendaraan:</strong> {{ optional($departure->vehicle)->full_name ?: '-' }}</td>
                <td><strong>Plat Nomor:</strong> {{ optional($departure->vehicle)->plate_number ?: '-' }}</td>
            </tr>
            <tr>
                <td colspan="2"><strong>Catatan:</strong> {{ $departure->notes ?: '-' }}</td>
            </tr>
        </table>
    </div>

    <h3>Manifest Penumpang</h3>
    <table>
        <thead>
            <tr>
                <th width="35">No</th>
                <th width="110">Kode Booking</th>
                <th width="70">Seat</th>
                <th>Nama Penumpang</th>
                <th width="130">No HP</th>
                <th>Jemput</th>
                <th>Antar</th>
                <th width="90">Status</th>
            </tr>
        </thead>
        <tbody>
            @php $no = 1; @endphp
            @forelse ($departure->bookings as $booking)
                @foreach ($booking->passengers as $passenger)
                    <tr>
                        <td>{{ $no++ }}</td>
                        <td>{{ $booking->booking_code }}</td>
                        <td>{{ $passenger->seat_no }}</td>
                        <td>{{ $passenger->name }}</td>
                        <td>{{ $passenger->phone ?: '-' }}</td>
                        <td>{{ $booking->pickup_location ?: '-' }}</td>
                        <td>{{ $booking->dropoff_location ?: '-' }}</td>
                        <td>{{ $passenger->checkin_status ?: 'Pending' }}</td>
                    </tr>
                @endforeach
            @empty
                <tr>
                    <td colspan="8" style="text-align: center;">Belum ada manifest penumpang.</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <table class="sign">
        <tr>
            <td>
                Mengetahui,<br><br><br><br>
                _____________________
            </td>
            <td>
                Driver,<br><br><br><br>
                {{ optional($departure->driver)->nama ?: '_____________________' }}
            </td>
        </tr>
    </table>
</body>
</html>
