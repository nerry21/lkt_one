@extends('layouts.dashboard')

@section('content')
    @include('admin.masters._styles')

    <section class="admin-master-page">
        @if (session('success'))
            <div class="admin-master-alert admin-master-alert--success">{{ session('success') }}</div>
        @endif

        @if (session('error'))
            <div class="admin-master-alert admin-master-alert--error">{{ session('error') }}</div>
        @endif

        <header class="admin-master-header">
            <div>
                <h1>Master Kendaraan</h1>
                <p>Kelola data armada operasional.</p>
            </div>

            <a class="admin-master-button admin-master-button--primary" href="{{ route('admin.vehicles.create') }}">
                Tambah Kendaraan
            </a>
        </header>

        <article class="admin-master-panel">
            <div class="admin-master-panel-body">
                <div class="admin-master-table-wrap">
                    <table class="admin-master-table">
                        <thead>
                            <tr>
                                <th>Plat Nomor</th>
                                <th>Merek</th>
                                <th>Model</th>
                                <th>Kapasitas</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse ($vehicles as $vehicle)
                                <tr>
                                    <td>{{ $vehicle->plate_number }}</td>
                                    <td>{{ $vehicle->brand ?: '-' }}</td>
                                    <td>{{ $vehicle->model ?: '-' }}</td>
                                    <td>{{ $vehicle->seat_capacity }}</td>
                                    <td><span class="admin-master-pill">{{ $vehicle->status }}</span></td>
                                    <td>
                                        <div class="admin-master-actions">
                                            <a class="admin-master-button admin-master-button--primary" href="{{ route('admin.vehicles.edit', $vehicle->id) }}">
                                                Edit
                                            </a>
                                            <form method="POST" action="{{ route('admin.vehicles.destroy', $vehicle->id) }}" onsubmit="return confirm('Hapus kendaraan ini?')">
                                                @csrf
                                                @method('DELETE')
                                                <button class="admin-master-button admin-master-button--danger" type="submit">Hapus</button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="6"><p class="admin-master-empty">Belum ada kendaraan.</p></td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>

                <div style="margin-top: 20px;">
                    {{ $vehicles->links() }}
                </div>
            </div>
        </article>
    </section>
@endsection
