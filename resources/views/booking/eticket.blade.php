@extends('layouts.base')

@php
    $tripTime = $booking->trip_time ? substr((string) $booking->trip_time, 0, 5) : '-';
    $issuedAt = optional($booking->ticket_issued_at)?->format('d-m-Y H:i') ?: '-';
@endphp

@section('body')
    <div class="eticket-shell">
        <div class="eticket-ticket">
            <section class="eticket-hero">
                <div>
                    <span class="eticket-kicker">PT Lancang Kuning Travelindo</span>
                    <h1>E-Ticket</h1>
                    <p>Tunjukkan ticket ini saat keberangkatan.</p>
                </div>

                <div class="eticket-code-block">
                    <span>Kode Booking</span>
                    <strong>{{ $booking->booking_code }}</strong>
                </div>
            </section>

            <section class="eticket-body">
                <div class="eticket-qr-grid">
                    <article class="eticket-block">
                        <span class="eticket-label">Kode Booking</span>
                        <strong style="font-size: 1.8rem;">{{ $booking->booking_code }}</strong>
                        <p style="color: #64748b; margin-top: 10px;">
                            Tunjukkan QR ini saat check-in keberangkatan.
                        </p>
                    </article>

                    <article class="eticket-block eticket-block--qr">
                        {!! \SimpleSoftwareIO\QrCode\Facades\QrCode::size(140)->generate(route('booking.eticket', $booking->id)) !!}
                    </article>
                </div>

                <div class="eticket-grid">
                    <article class="eticket-card eticket-card--wide">
                        <span>Rute</span>
                        <strong>{{ $booking->from_city }} -> {{ $booking->to_city }}</strong>
                    </article>

                    <article class="eticket-card">
                        <span>Tanggal</span>
                        <strong>{{ optional($booking->trip_date)->format('d-m-Y') }}</strong>
                    </article>

                    <article class="eticket-card">
                        <span>Jam</span>
                        <strong>{{ $tripTime }}</strong>
                    </article>
                </div>

                <div class="eticket-block">
                    <span class="eticket-label">Pemesan</span>
                    <strong>{{ $booking->passenger_name }}</strong>
                    <p>{{ $booking->passenger_phone }}</p>
                </div>

                <div class="eticket-block">
                    <div class="eticket-block-head">
                        <span class="eticket-label">Daftar Penumpang</span>
                        <span class="eticket-status">Ticket {{ $booking->ticket_status }}</span>
                    </div>

                    <div class="eticket-table-wrap">
                        <table class="eticket-table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Seat</th>
                                    <th>Nama</th>
                                    <th>No. HP</th>
                                    <th>Ticket</th>
                                    <th>Check-in</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($booking->passengers as $index => $passenger)
                                    <tr>
                                        <td>{{ $index + 1 }}</td>
                                        <td><span class="eticket-seat">{{ $passenger->seat_no }}</span></td>
                                        <td>{{ $passenger->name }}</td>
                                        <td>{{ $passenger->phone ?: '-' }}</td>
                                        <td>{{ $passenger->ticket_status }}</td>
                                        <td>{{ $passenger->checkin_status ?: 'Pending' }}</td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="eticket-grid">
                    <article class="eticket-card">
                        <span>Lokasi Jemput</span>
                        <strong>{{ $booking->pickup_location ?: '-' }}</strong>
                    </article>

                    <article class="eticket-card">
                        <span>Lokasi Antar</span>
                        <strong>{{ $booking->dropoff_location ?: '-' }}</strong>
                    </article>
                </div>

                <footer class="eticket-footer">
                    <div>
                        <span class="eticket-label">Diterbitkan</span>
                        <strong>{{ $issuedAt }}</strong>
                    </div>

                    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                        <a href="{{ route('booking.eticket.pdf', $booking->id) }}" class="eticket-print" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
                            PDF E-Ticket
                        </a>
                        <button type="button" class="eticket-print" onclick="window.print()">
                            Print E-Ticket
                        </button>
                    </div>
                </footer>
            </section>
        </div>
    </div>

    <style>
        .eticket-shell {
            min-height: 100vh;
            padding: 28px 16px 40px;
            background:
                radial-gradient(circle at top left, rgba(16, 185, 129, 0.2), transparent 28%),
                linear-gradient(150deg, #021412 0%, #083b32 55%, #041a17 100%);
        }

        .eticket-ticket {
            width: min(980px, 100%);
            margin: 0 auto;
            border-radius: 32px;
            overflow: hidden;
            background: #ffffff;
            box-shadow: 0 32px 90px rgba(2, 18, 14, 0.34);
        }

        .eticket-hero {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            gap: 24px;
            padding: 32px;
            background:
                radial-gradient(circle at top left, rgba(134, 239, 172, 0.18), transparent 34%),
                linear-gradient(135deg, #0f766e, #10b981);
            color: #ecfdf5;
        }

        .eticket-kicker,
        .eticket-label {
            display: block;
            font-size: 0.8rem;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        .eticket-hero h1 {
            margin: 10px 0 8px;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: clamp(2rem, 5vw, 3.2rem);
            letter-spacing: -0.04em;
        }

        .eticket-hero p,
        .eticket-block p {
            margin: 0;
            color: rgba(236, 253, 245, 0.82);
        }

        .eticket-code-block {
            min-width: 220px;
            padding: 18px 20px;
            border-radius: 24px;
            background: rgba(255, 255, 255, 0.14);
            backdrop-filter: blur(12px);
        }

        .eticket-code-block span {
            display: block;
            margin-bottom: 8px;
            font-size: 0.78rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
        }

        .eticket-code-block strong {
            font-family: 'JetBrains Mono', monospace;
            font-size: 1.24rem;
        }

        .eticket-body {
            display: grid;
            gap: 20px;
            padding: 28px;
            color: #0f172a;
        }

        .eticket-grid {
            display: grid;
            grid-template-columns: repeat(12, minmax(0, 1fr));
            gap: 16px;
        }

        .eticket-qr-grid {
            display: grid;
            grid-template-columns: minmax(0, 2fr) minmax(200px, 1fr);
            gap: 16px;
        }

        .eticket-card {
            grid-column: span 4;
            padding: 18px;
            border-radius: 22px;
            background: #f8fafc;
            border: 1px solid rgba(148, 163, 184, 0.18);
        }

        .eticket-card--wide {
            grid-column: span 12;
        }

        .eticket-card span {
            display: block;
            margin-bottom: 8px;
            color: #64748b;
            font-size: 0.84rem;
        }

        .eticket-card strong,
        .eticket-block strong,
        .eticket-footer strong {
            color: #052e2b;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .eticket-block {
            padding: 20px;
            border-radius: 24px;
            background: #ffffff;
            border: 1px solid rgba(148, 163, 184, 0.18);
            box-shadow: 0 18px 40px rgba(15, 23, 42, 0.04);
        }

        .eticket-block--qr {
            display: grid;
            place-items: center;
            min-height: 210px;
        }

        .eticket-block--qr svg {
            width: 140px;
            height: 140px;
        }

        .eticket-block-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
            margin-bottom: 16px;
        }

        .eticket-status,
        .eticket-seat {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 34px;
            padding: 0 12px;
            border-radius: 999px;
            background: rgba(16, 185, 129, 0.12);
            color: #047857;
            font-weight: 800;
            font-size: 0.84rem;
        }

        .eticket-table-wrap {
            overflow-x: auto;
        }

        .eticket-table {
            width: 100%;
            border-collapse: collapse;
            min-width: 640px;
        }

        .eticket-table th,
        .eticket-table td {
            padding: 14px 12px;
            text-align: left;
            border-top: 1px solid rgba(148, 163, 184, 0.16);
        }

        .eticket-table th {
            color: #64748b;
            font-size: 0.78rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
        }

        .eticket-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            padding-top: 4px;
        }

            .eticket-print {
                min-height: 48px;
                padding: 0 20px;
                border: 0;
                border-radius: 999px;
            background: linear-gradient(135deg, #0f766e, #10b981);
            color: #ecfdf5;
            font-weight: 700;
        }

        @media (max-width: 760px) {
            .eticket-hero,
            .eticket-footer {
                flex-direction: column;
                align-items: flex-start;
            }

            .eticket-qr-grid,
            .eticket-grid {
                grid-template-columns: 1fr;
            }

            .eticket-card,
            .eticket-card--wide {
                grid-column: span 1;
            }
        }

        @media print {
            body {
                background: #ffffff;
            }

            .eticket-shell {
                padding: 0;
                background: #ffffff;
            }

            .eticket-ticket {
                width: 100%;
                border-radius: 0;
                box-shadow: none;
            }

            .eticket-print {
                display: none;
            }
        }
    </style>
@endsection
