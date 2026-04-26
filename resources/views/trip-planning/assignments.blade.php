@extends('layouts.dashboard')

@section('content')
    <section class="dashboard-page animate-fade-in" data-assignments-page>
        <script id="assignments-initial-state" type="application/json">@json($state)</script>

        <div data-assignments-content>
            <section class="dashboard-page-header">
                <div class="dashboard-page-copy">
                    <h1>Atur Assignments</h1>
                    <p>Pasangan mobil dan driver untuk {{ $targetDate->translatedFormat('l, d F Y') }}. Scheduler 21:00 WIB akan generate trips otomatis berdasarkan data ini.</p>
                </div>

                <div class="dashboard-page-actions">
                    <form method="GET" action="{{ route('trip-planning.assignments.view') }}" class="dashboard-inline-form">
                        <label for="assignments-date-picker" class="sr-only">Tanggal</label>
                        <input
                            type="date"
                            id="assignments-date-picker"
                            name="date"
                            value="{{ $targetDate->toDateString() }}"
                            class="dashboard-date-input"
                            min="{{ \Carbon\Carbon::today()->toDateString() }}"
                            data-testid="assignments-date-picker"
                        />
                        <button type="submit" class="dashboard-ghost-button" data-testid="assignments-filter-btn">
                            <span>Pilih</span>
                        </button>
                    </form>
                    <a href="{{ route('trip-planning.dashboard.view') }}" class="dashboard-ghost-button" data-testid="assignments-back-btn">
                        Kembali ke Dashboard
                    </a>
                </div>
            </section>

            <aside class="trip-planning-assignments-info" data-testid="assignments-info-banner">
                <p>
                    <strong>Pin Manual:</strong> Kosongkan (— Auto —) supaya scheduler atur otomatis.
                    Pilih jam atau Custom untuk override. Pin Outbound = trip dari Rohul,
                    Pin Return = trip dari Pekanbaru. Multi-mobil di slot yang sama diizinkan.
                </p>
                <p>
                    <strong>Loket Override:</strong> Dropdown di samping pin = dari mana mobil
                    berangkat hari ini. Kosong (— Otomatis —) = ikuti pool aktual mobil.
                    Override kalau mobil mau dipindah lokasinya untuk hari ini saja.
                </p>
            </aside>

            <section class="trip-planning-assignments-matrix" data-assignments-matrix data-testid="assignments-matrix">
                {{-- Rendered via JS dari initial state --}}
            </section>

            <section class="trip-planning-assignments-footer" data-assignments-footer hidden>
                <button type="button" class="dashboard-ghost-button" data-action="save-only" data-testid="btn-save-assignments">
                    Simpan
                </button>
                <button type="button" class="dashboard-primary-button" data-action="save-generate" data-testid="btn-save-generate-assignments">
                    Simpan &amp; Generate Trips
                </button>
            </section>
        </div>
    </section>
@endsection
