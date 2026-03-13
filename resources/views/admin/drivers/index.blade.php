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
                <h1>Master Driver</h1>
                <p>Kelola data driver operasional.</p>
            </div>

            <a class="admin-master-button admin-master-button--primary" href="{{ route('admin.drivers.create') }}">
                Tambah Driver
            </a>
        </header>

        <article class="admin-master-panel">
            <div class="admin-master-panel-body">
                <div class="admin-master-table-wrap">
                    <table class="admin-master-table">
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>No HP</th>
                                <th>SIM</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse ($drivers as $driver)
                                <tr>
                                    <td>{{ $driver->name }}</td>
                                    <td>{{ $driver->phone ?: '-' }}</td>
                                    <td>{{ $driver->license_number ?: '-' }}</td>
                                    <td><span class="admin-master-pill">{{ $driver->status }}</span></td>
                                    <td>
                                        <div class="admin-master-actions">
                                            <a class="admin-master-button admin-master-button--primary" href="{{ route('admin.drivers.edit', $driver->id) }}">
                                                Edit
                                            </a>
                                            <form method="POST" action="{{ route('admin.drivers.destroy', $driver->id) }}" onsubmit="return confirm('Hapus driver ini?')">
                                                @csrf
                                                @method('DELETE')
                                                <button class="admin-master-button admin-master-button--danger" type="submit">Hapus</button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="5"><p class="admin-master-empty">Belum ada driver.</p></td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>

                <div style="margin-top: 20px;">
                    {{ $drivers->links() }}
                </div>
            </div>
        </article>
    </section>
@endsection
