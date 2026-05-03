@extends('layouts.dashboard')

@section('content')
    <section class="dashboard-page animate-fade-in" data-dashboard-page>
        <section class="dashboard-page-header">
            <div class="dashboard-page-copy">
                <h1>{{ $pageHeading }}</h1>
                <p>{{ $pageDescription }}</p>
            </div>
        </section>

        {{-- Sesi 77 PR-CRM-6K4 — System health widgets --}}
        @include('dashboard.partials.system-health-widgets')

        {{-- Sesi 77 PR-CRM-6K4 — Trend 7 hari --}}
        @include('dashboard.partials.trend-7d-chart')

        {{-- Sesi 39 PR #5C — Widget Keuangan JET sebagai sole source statistik --}}
        @include('dashboard.partials.keuangan-jet-widgets')
    </section>
@endsection
