@extends('layouts.dashboard')

@section('content')
    @include('admin.departures._styles')

    <section class="admin-departure-page">
        @if ($errors->any())
            <div class="admin-departure-alert admin-departure-alert--error">{{ implode(' ', $errors->all()) }}</div>
        @endif

        <article class="admin-departure-panel">
            <div class="admin-departure-panel-body">
                <header class="admin-departure-header" style="margin-bottom: 20px;">
                    <div>
                        <h1>Buat Keberangkatan</h1>
                        <p>Tetapkan jadwal, driver, armada, dan status manifest.</p>
                    </div>

                    <a class="admin-departure-button admin-departure-button--light" href="{{ route('admin.departures.index') }}">
                        Kembali
                    </a>
                </header>

                <form method="POST" action="{{ route('admin.departures.store') }}" class="admin-departure-form">
                    @csrf

                    <div class="admin-departure-grid">
                        <div class="admin-departure-col-6 admin-departure-field">
                            <label for="trip_date">Tanggal</label>
                            <input class="admin-departure-input" type="date" id="trip_date" name="trip_date" value="{{ old('trip_date') }}" required>
                        </div>

                        <div class="admin-departure-col-6 admin-departure-field">
                            <label for="trip_time">Jam</label>
                            <input class="admin-departure-input" type="time" id="trip_time" name="trip_time" value="{{ old('trip_time', '08:00') }}" required>
                        </div>

                        <div class="admin-departure-col-6 admin-departure-field">
                            <label for="from_city">Dari</label>
                            <input class="admin-departure-input" type="text" id="from_city" name="from_city" value="{{ old('from_city') }}" required>
                        </div>

                        <div class="admin-departure-col-6 admin-departure-field">
                            <label for="to_city">Ke</label>
                            <input class="admin-departure-input" type="text" id="to_city" name="to_city" value="{{ old('to_city') }}" required>
                        </div>

                        <div class="admin-departure-col-6 admin-departure-field">
                            <label for="driver_id">Driver</label>
                            <select class="admin-departure-select" id="driver_id" name="driver_id" required>
                                <option value="">Pilih driver</option>
                                @foreach ($drivers as $driver)
                                    <option value="{{ $driver->id }}" @selected(old('driver_id') == $driver->id)>
                                        {{ $driver->nama }}{{ $driver->phone ? ' - ' . $driver->phone : '' }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        <div class="admin-departure-col-6 admin-departure-field">
                            <label for="mobil_id">Kendaraan</label>
                            <select class="admin-departure-select" id="mobil_id" name="mobil_id" required>
                                <option value="">Pilih kendaraan</option>
                                @foreach ($vehicles as $vehicle)
                                    <option value="{{ $vehicle->id }}" @selected(old('mobil_id') == $vehicle->id)>
                                        {{ $vehicle->plate_number }} - {{ $vehicle->full_name }}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        <div class="admin-departure-col-6 admin-departure-field">
                            <label for="status">Status</label>
                            <select class="admin-departure-select" id="status" name="status" required>
                                @foreach (['Draft', 'Ready', 'On Trip', 'Completed', 'Cancelled'] as $status)
                                    <option value="{{ $status }}" @selected(old('status', 'Draft') === $status)>{{ $status }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="admin-departure-col-12 admin-departure-field">
                            <label for="notes">Catatan</label>
                            <textarea class="admin-departure-textarea" id="notes" name="notes" rows="4">{{ old('notes') }}</textarea>
                        </div>
                    </div>

                    <div class="admin-departure-actions">
                        <button class="admin-departure-button admin-departure-button--primary" type="submit">
                            Simpan Keberangkatan
                        </button>
                    </div>
                </form>
            </div>
        </article>
    </section>
@endsection
