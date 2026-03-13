@extends('layouts.dashboard')

@section('content')
    @include('admin.departures._styles')

    <section class="admin-departure-page">
        @if (session('success'))
            <div class="admin-departure-alert admin-departure-alert--success">{{ session('success') }}</div>
        @endif

        @if (session('error'))
            <div class="admin-departure-alert admin-departure-alert--error">{{ session('error') }}</div>
        @endif

        @if ($errors->any())
            <div class="admin-departure-alert admin-departure-alert--error">{{ implode(' ', $errors->all()) }}</div>
        @endif

        <section class="admin-departure-grid">
            <div class="admin-departure-col-8" style="display: grid; gap: 18px;">
                <article class="admin-departure-panel">
                    <div class="admin-departure-panel-body">
                        <header class="admin-departure-header" style="margin-bottom: 20px;">
                            <div>
                                <h1>Detail Keberangkatan</h1>
                                <p>{{ $departure->departure_code }} | {{ $departure->surat_jalan_number ?: '-' }}</p>
                            </div>

                            <div class="admin-departure-actions">
                                <a class="admin-departure-button admin-departure-button--success" href="{{ route('departures.surat-jalan.pdf', $departure->id) }}" target="_blank" rel="noopener noreferrer">
                                    Print E-Surat Jalan
                                </a>
                                <a class="admin-departure-button admin-departure-button--light" href="{{ route('admin.departures.index') }}">
                                    Kembali
                                </a>
                            </div>
                        </header>

                        <div class="admin-departure-grid">
                            <article class="admin-departure-card admin-departure-col-6">
                                <span>Rute</span>
                                <strong>{{ $departure->from_city }} -> {{ $departure->to_city }}</strong>
                            </article>
                            <article class="admin-departure-card admin-departure-col-3">
                                <span>Tanggal</span>
                                <strong>{{ optional($departure->trip_date)->format('d-m-Y') }}</strong>
                            </article>
                            <article class="admin-departure-card admin-departure-col-3">
                                <span>Jam</span>
                                <strong>{{ \Illuminate\Support\Str::of($departure->trip_time)->substr(0, 5) }}</strong>
                            </article>
                            <article class="admin-departure-card admin-departure-col-6">
                                <span>Driver</span>
                                <strong>{{ optional($departure->driver)->nama ?: '-' }}</strong>
                                <p class="admin-departure-muted">{{ optional($departure->driver)->phone ?: '' }}</p>
                            </article>
                            <article class="admin-departure-card admin-departure-col-6">
                                <span>Kendaraan</span>
                                <strong>{{ optional($departure->vehicle)->plate_number ?: '-' }}</strong>
                                <p class="admin-departure-muted">{{ optional($departure->vehicle)->full_name ?: '' }}</p>
                            </article>
                            <article class="admin-departure-card admin-departure-col-12">
                                <span>Nomor Surat Jalan</span>
                                <strong>{{ $departure->surat_jalan_number ?: '-' }}</strong>
                                <p class="admin-departure-muted">
                                    Diterbitkan {{ optional($departure->surat_jalan_issued_at)?->format('d-m-Y H:i') ?: '-' }}
                                </p>
                            </article>
                        </div>

                        <div style="height: 1px; margin: 24px 0; background: rgba(226, 232, 240, 0.92);"></div>

                        <h3 style="margin-bottom: 14px;">Manifest Booking</h3>

                        <div class="admin-departure-table-wrap">
                            <table class="admin-departure-table">
                                <thead>
                                    <tr>
                                        <th>Kode Booking</th>
                                        <th>Pemesan</th>
                                        <th>Seat</th>
                                        <th>Jumlah Penumpang</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse ($departure->bookings as $booking)
                                        <tr>
                                            <td>{{ $booking->booking_code }}</td>
                                            <td>
                                                <strong>{{ $booking->passenger_name }}</strong><br>
                                                <span class="admin-departure-muted">{{ $booking->passenger_phone }}</span>
                                            </td>
                                            <td>{{ implode(', ', $booking->selected_seats ?? []) }}</td>
                                            <td>{{ $booking->passenger_count }}</td>
                                            <td>
                                                <form method="POST" action="{{ route('admin.departures.remove-booking', [$departure->id, $booking->id]) }}">
                                                    @csrf
                                                    <button class="admin-departure-button admin-departure-button--danger" type="submit">
                                                        Keluarkan
                                                    </button>
                                                </form>
                                            </td>
                                        </tr>
                                    @empty
                                        <tr>
                                            <td colspan="5">
                                                <p class="admin-departure-empty">Belum ada booking di manifest ini.</p>
                                            </td>
                                        </tr>
                                    @endforelse
                                </tbody>
                            </table>
                        </div>

                        <div style="height: 1px; margin: 24px 0; background: rgba(226, 232, 240, 0.92);"></div>

                        <h3 style="margin-bottom: 14px;">Check-in Penumpang</h3>

                        <div class="admin-departure-table-wrap">
                            <table class="admin-departure-table">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Kode Booking</th>
                                        <th>Seat</th>
                                        <th>Nama</th>
                                        <th>No HP</th>
                                        <th>Ticket</th>
                                        <th>Check-in</th>
                                        <th>Waktu</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @php $manifestNo = 1; @endphp
                                    @forelse ($departure->bookings as $booking)
                                        @foreach ($booking->passengers as $passenger)
                                            <tr>
                                                <td>{{ $manifestNo++ }}</td>
                                                <td>{{ $booking->booking_code }}</td>
                                                <td>{{ $passenger->seat_no }}</td>
                                                <td>{{ $passenger->name }}</td>
                                                <td>{{ $passenger->phone ?: '-' }}</td>
                                                <td>{{ $passenger->ticket_status }}</td>
                                                <td>{{ $passenger->checkin_status ?: 'Pending' }}</td>
                                                <td>{{ optional($passenger->checked_in_at)?->format('d-m-Y H:i') ?: '-' }}</td>
                                                <td>
                                                    <div class="admin-departure-actions">
                                                        @if ($passenger->checkin_status !== 'Checked In')
                                                            <form method="POST" action="{{ route('admin.passengers.checkin', $passenger->id) }}">
                                                                @csrf
                                                                <button class="admin-departure-button admin-departure-button--success" type="submit">
                                                                    Check-in
                                                                </button>
                                                            </form>
                                                        @endif

                                                        @if ($passenger->checkin_status !== 'No Show')
                                                            <form method="POST" action="{{ route('admin.passengers.no-show', $passenger->id) }}">
                                                                @csrf
                                                                <button class="admin-departure-button admin-departure-button--danger" type="submit">
                                                                    No Show
                                                                </button>
                                                            </form>
                                                        @endif

                                                        <form method="POST" action="{{ route('admin.passengers.reset-checkin', $passenger->id) }}">
                                                            @csrf
                                                            <button class="admin-departure-button admin-departure-button--light" type="submit">
                                                                Reset
                                                            </button>
                                                        </form>
                                                    </div>
                                                </td>
                                            </tr>
                                        @endforeach
                                    @empty
                                        <tr>
                                            <td colspan="9">
                                                <p class="admin-departure-empty">Belum ada penumpang dalam manifest.</p>
                                            </td>
                                        </tr>
                                    @endforelse
                                </tbody>
                            </table>
                        </div>

                        <div style="height: 1px; margin: 24px 0; background: rgba(226, 232, 240, 0.92);"></div>

                        <h3 style="margin-bottom: 14px;">Masukkan Booking ke Manifest</h3>

                        <form method="POST" action="{{ route('admin.departures.assign-booking', $departure->id) }}">
                            @csrf

                            <div class="admin-departure-table-wrap">
                                <table class="admin-departure-table">
                                    <thead>
                                        <tr>
                                            <th width="50"></th>
                                            <th>Kode</th>
                                            <th>Pemesan</th>
                                            <th>Seat</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @forelse ($availableBookings as $booking)
                                            <tr>
                                                <td>
                                                    <input type="checkbox" name="booking_ids[]" value="{{ $booking->id }}">
                                                </td>
                                                <td>{{ $booking->booking_code }}</td>
                                                <td>{{ $booking->passenger_name }}</td>
                                                <td>{{ implode(', ', $booking->selected_seats ?? []) }}</td>
                                                <td>Rp {{ number_format((float) $booking->total_amount, 0, ',', '.') }}</td>
                                            </tr>
                                        @empty
                                            <tr>
                                                <td colspan="5">
                                                    <p class="admin-departure-empty">Tidak ada booking aktif yang cocok dengan rute, tanggal, dan jam ini.</p>
                                                </td>
                                            </tr>
                                        @endforelse
                                    </tbody>
                                </table>
                            </div>

                            @if ($availableBookings->count())
                                <div class="admin-departure-actions" style="margin-top: 18px;">
                                    <button class="admin-departure-button admin-departure-button--primary" type="submit">
                                        Tambahkan ke Manifest
                                    </button>
                                </div>
                            @endif
                        </form>
                    </div>
                </article>
            </div>

            <aside class="admin-departure-col-4" style="display: grid; gap: 18px;">
                <article class="admin-departure-panel">
                    <div class="admin-departure-panel-body">
                        <h3 style="margin-bottom: 16px;">Ringkasan</h3>
                        <div class="admin-departure-summary-row">
                            <span>Status</span>
                            <span class="admin-departure-pill">{{ $departure->status }}</span>
                        </div>
                        <div class="admin-departure-summary-row">
                            <span>No Surat Jalan</span>
                            <strong>{{ $departure->surat_jalan_number ?: '-' }}</strong>
                        </div>
                        <div class="admin-departure-summary-row">
                            <span>Total Booking</span>
                            <strong>{{ $departure->bookings->count() }}</strong>
                        </div>
                        <div class="admin-departure-summary-row">
                            <span>Total Penumpang</span>
                            <strong>{{ $departure->bookings->sum('passenger_count') }}</strong>
                        </div>
                        <div class="admin-departure-summary-row">
                            <span>Checked In</span>
                            <strong>{{ $departure->passengers->where('checkin_status', 'Checked In')->count() }}</strong>
                        </div>
                        <div class="admin-departure-summary-row">
                            <span>No Show</span>
                            <strong>{{ $departure->passengers->where('checkin_status', 'No Show')->count() }}</strong>
                        </div>
                        <div class="admin-departure-summary-row">
                            <span>Pending</span>
                            <strong>{{ $departure->passengers->where('checkin_status', 'Pending')->count() }}</strong>
                        </div>
                    </div>
                </article>
            </aside>
        </section>
    </section>
@endsection
