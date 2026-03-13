@extends('layouts.base')

@php
    $dashboardMenuItems = [
        [
            'route' => 'dashboard',
            'label' => 'Dashboard',
            'testid' => 'nav-dashboard',
            'icon' => 'dashboard',
            'active_patterns' => ['dashboard'],
        ],
        [
            'route' => 'admin-users.index',
            'label' => 'Admin & User',
            'testid' => 'nav-admin-users',
            'icon' => 'users',
            'requires_admin' => true,
            'active_patterns' => ['admin-users.*'],
        ],
        [
            'route' => 'keberangkatan.index',
            'label' => 'Data Keberangkatan',
            'testid' => 'nav-data-keberangkatan',
            'icon' => 'bus',
            'active_patterns' => ['keberangkatan.*'],
        ],
        [
            'route' => 'drivers.index',
            'label' => 'Data Driver',
            'testid' => 'nav-data-driver',
            'icon' => 'users',
            'active_patterns' => ['drivers.*'],
        ],
        [
            'route' => 'mobil.index',
            'label' => 'Data Mobil',
            'testid' => 'nav-data-mobil',
            'icon' => 'car',
            'active_patterns' => ['mobil.*'],
        ],
        [
            'route' => 'stock.index',
            'label' => 'Stok Snack & Air Mineral',
            'testid' => 'nav-stock-snack-air',
            'icon' => 'package',
            'active_patterns' => ['stock.*'],
        ],
        [
            'route' => 'admin.bookings.validation.index',
            'label' => 'Validasi Booking',
            'testid' => 'nav-booking-validation',
            'icon' => 'package',
            'requires_admin' => true,
            'active_patterns' => ['admin.bookings.validation.*'],
        ],
        [
            'route' => 'admin.drivers.index',
            'label' => 'Master Driver',
            'testid' => 'nav-master-driver',
            'icon' => 'users',
            'requires_admin' => true,
            'active_patterns' => ['admin.drivers.*'],
        ],
        [
            'route' => 'admin.vehicles.index',
            'label' => 'Master Kendaraan',
            'testid' => 'nav-master-vehicles',
            'icon' => 'car',
            'requires_admin' => true,
            'active_patterns' => ['admin.vehicles.*'],
        ],
        [
            'route' => 'admin.departures.index',
            'label' => 'Manifest Driver',
            'testid' => 'nav-departures-manifest',
            'icon' => 'bus',
            'requires_admin' => true,
            'active_patterns' => ['admin.departures.*'],
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
