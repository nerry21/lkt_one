@extends('layouts.dashboard')

@section('content')
    @include('admin.departures._styles')

    <section class="admin-departure-page">
        @if (session('success'))
            <div class="admin-departure-alert admin-departure-alert--success">{{ session('success') }}</div>
        @endif

        <header class="admin-departure-header">
            <div>
                <h1>Data Keberangkatan / Manifest Driver</h1>
                <p>Kelola jadwal berangkat, driver, armada, dan manifest penumpang.</p>
            </div>

            <a class="admin-departure-button admin-departure-button--primary" href="{{ route('admin.departures.create') }}">
                Buat Keberangkatan
            </a>
        </header>

        <article class="admin-departure-panel">
            <div class="admin-departure-panel-body">
                <div class="admin-departure-table-wrap">
                    <table class="admin-departure-table">
                        <thead>
                            <tr>
                                <th>Kode</th>
                                <th>Rute</th>
                                <th>Tanggal</th>
                                <th>Driver</th>
                                <th>Armada</th>
                                <th>Status</th>
                                <th>Manifest</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse ($departures as $departure)
                                <tr>
                                    <td>
                                        <strong>{{ $departure->departure_code }}</strong><br>
                                        <span class="admin-departure-muted">{{ $departure->surat_jalan_number ?: '-' }}</span>
                                    </td>
                                    <td>{{ $departure->from_city }} -> {{ $departure->to_city }}</td>
                                    <td>{{ optional($departure->trip_date)->format('d-m-Y') }} {{ \Illuminate\Support\Str::of($departure->trip_time)->substr(0, 5) }}</td>
                                    <td>{{ optional($departure->driver)->nama ?: '-' }}</td>
                                    <td>{{ optional($departure->vehicle)->plate_number ?: '-' }}</td>
                                    <td>{{ $departure->status }}</td>
                                    <td>{{ $departure->bookings_count }}</td>
                                    <td>
                                        <a class="admin-departure-button admin-departure-button--primary" href="{{ route('admin.departures.show', $departure->id) }}">
                                            Detail
                                        </a>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="8">
                                        <p class="admin-departure-empty">Belum ada data keberangkatan.</p>
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>

                <div style="margin-top: 20px;">
                    {{ $departures->links() }}
                </div>
            </div>
        </article>
    </section>
@endsection
