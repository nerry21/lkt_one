@php
    $viteManifestPath = public_path('build/manifest.json');
    $viteManifest = file_exists($viteManifestPath)
        ? json_decode(file_get_contents($viteManifestPath), true)
        : null;

    $requestHost = request()->getHost();
    $isLocalHost = in_array($requestHost, ['localhost', '127.0.0.1', '::1'], true)
        || str_ends_with($requestHost, '.test');
    $shouldUseHotReload = app()->environment('local')
        && file_exists(public_path('hot'))
        && $isLocalHost;
@endphp

@if ($shouldUseHotReload)
    @vite(['resources/css/app.css', 'resources/js/app.js'])
@elseif (is_array($viteManifest))
    @php
        $cssAsset = $viteManifest['resources/css/app.css']['file'] ?? null;
        $jsAsset = $viteManifest['resources/js/app.js']['file'] ?? null;
    @endphp

    @if (is_string($cssAsset) && $cssAsset !== '')
        <link rel="stylesheet" href="{{ '/build/' . ltrim($cssAsset, '/') }}">
    @endif

    @if (is_string($jsAsset) && $jsAsset !== '')
        <script type="module" src="{{ '/build/' . ltrim($jsAsset, '/') }}"></script>
    @endif
@else
    @vite(['resources/css/app.css', 'resources/js/app.js'])
@endif
