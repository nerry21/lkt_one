@extends('layouts.base')

@php
    $dashboardMenuItems = [
        [
            'route' => 'dashboard',
            'label' => 'Dashboard',
            'testid' => 'nav-dashboard',
            'icon' => 'dashboard',
        ],
        [
            'route' => 'admin-users.index',
            'label' => 'Admin & User',
            'testid' => 'nav-admin-users',
            'icon' => 'users',
            'requires_admin' => true,
        ],
        [
            'route' => 'keberangkatan.index',
            'label' => 'Data Keberangkatan',
            'testid' => 'nav-data-keberangkatan',
            'icon' => 'bus',
        ],
        [
            'route' => 'drivers.index',
            'label' => 'Data Driver',
            'testid' => 'nav-data-driver',
            'icon' => 'users',
        ],
        [
            'route' => 'mobil.index',
            'label' => 'Data Mobil',
            'testid' => 'nav-data-mobil',
            'icon' => 'car',
        ],
        [
            'route' => 'stock.index',
            'label' => 'Stok Snack & Air Mineral',
            'testid' => 'nav-stock-snack-air',
            'icon' => 'package',
        ],
    ];
@endphp

@section('body')
    <div class="dashboard-shell" data-dashboard-shell>
        <div class="dashboard-overlay" data-sidebar-overlay hidden></div>

        @include('layouts.partials.dashboard-sidebar', [
            'menuItems' => $dashboardMenuItems,
        ])

        <div class="dashboard-content-wrap">
            @include('layouts.partials.dashboard-header', [
                'pageHeading' => $pageHeading ?? 'Dashboard',
                'pageDescription' => $pageDescription ?? 'Kelola armada dan keberangkatan dengan mudah',
            ])

            <main class="dashboard-main">
                @yield('content')
            </main>

            @include('layouts.partials.dashboard-footer')
        </div>
    </div>
@endsection
