@php
    $transitAuthUser = auth()->user()
        ? [
            'id' => auth()->user()->id,
            'email' => auth()->user()->email,
            'nama' => auth()->user()->nama,
            'username' => auth()->user()->username,
            'role' => auth()->user()->role,
            'created_at' => auth()->user()?->created_at?->toISOString(),
        ]
        : null;
@endphp

<!doctype html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $pageTitle ?? 'Lancang Kuning Travelindo' }}</title>
    <meta name="theme-color" content="#022c22">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        window.transitAuthUser = @json($transitAuthUser);
    </script>
    @include('layouts.partials.vite-assets')
</head>
<body
    class="transit-body"
    data-page-script="{{ $pageScript ?? '' }}"
    data-route-guard="{{ $guardMode ?? 'none' }}"
    data-api-base="{{ url('/api') }}"
    data-login-url="{{ route('login') }}"
    data-dashboard-url="{{ route('dashboard') }}"
>
    <div id="transit-toast-root" class="transit-toast-root" aria-live="polite" aria-atomic="true"></div>
    @yield('body')
</body>
</html>
