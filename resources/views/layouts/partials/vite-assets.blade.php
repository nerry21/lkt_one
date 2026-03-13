@php
    $viteManifestPath = public_path('build/manifest.json');
    $viteManifest = file_exists($viteManifestPath)
        ? json_decode(file_get_contents($viteManifestPath), true)
        : null;

    $cssAsset = is_array($viteManifest)
        ? ($viteManifest['resources/css/app.css']['file'] ?? null)
        : null;

    $jsAsset = is_array($viteManifest)
        ? ($viteManifest['resources/js/app.js']['file'] ?? null)
        : null;
@endphp

@if (is_string($cssAsset) && $cssAsset !== '')
    <link rel="stylesheet" href="{{ asset('build/' . ltrim($cssAsset, '/')) }}">
@endif

@if (is_string($jsAsset) && $jsAsset !== '')
    <script type="module" src="{{ asset('build/' . ltrim($jsAsset, '/')) }}"></script>
@endif
