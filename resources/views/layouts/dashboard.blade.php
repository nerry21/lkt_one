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
            'route' => 'regular-bookings.index',
            'label' => 'Pemesanan Reguler',
            'testid' => 'nav-regular-bookings',
            'icon' => 'bus',
            'active_patterns' => ['regular-bookings.*'],
        ],
        [
            'route' => 'bookings.index',
            'label' => 'Data Pemesanan',
            'testid' => 'nav-bookings',
            'icon' => 'bus',
            'requires_admin' => true,
            'active_patterns' => ['bookings.*'],
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
            'route' => 'scan-qr.index',
            'label' => 'Scan QR Tiket',
            'testid' => 'nav-scan-qr',
            'icon' => 'qrcode',
            'requires_admin' => true,
            'active_patterns' => ['scan-qr.*'],
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
