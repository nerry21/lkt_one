@php
    $viteManifestCandidates = [
        public_path('build/manifest.json'),
        base_path('../build/manifest.json'),
        base_path('build/manifest.json'),
    ];

    $viteManifestPath = collect($viteManifestCandidates)
        ->first(fn (string $path): bool => file_exists($path));

    $viteManifest = is_string($viteManifestPath) && $viteManifestPath !== ''
        ? json_decode(file_get_contents($viteManifestPath), true)
        : null;

    $cssAsset = is_array($viteManifest)
        ? ($viteManifest['resources/css/app.css']['file'] ?? null)
        : null;

    $jsAsset = is_array($viteManifest)
        ? ($viteManifest['resources/js/app.js']['file'] ?? null)
        : null;
@endphp

@if (file_exists(public_path('hot')))
    @vite(['resources/css/app.css', 'resources/js/app.js'])
@else
    @if (is_string($cssAsset) && $cssAsset !== '')
        <link rel="stylesheet" href="{{ asset('build/' . ltrim($cssAsset, '/')) }}">
    @endif

    @if (is_string($jsAsset) && $jsAsset !== '')
        <script type="module" src="{{ asset('build/' . ltrim($jsAsset, '/')) }}"></script>
    @endif
@endif
