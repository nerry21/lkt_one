@php
    $viteBuildDirectories = [
        public_path('build'),
        base_path('../build'),
        base_path('build'),
    ];

    $viteBuild = collect($viteBuildDirectories)
        ->map(function (string $directory): ?array {
            $manifestPath = $directory . DIRECTORY_SEPARATOR . 'manifest.json';

            if (! file_exists($manifestPath)) {
                return null;
            }

            $manifest = json_decode(file_get_contents($manifestPath), true);

            if (! is_array($manifest)) {
                return null;
            }

            $cssAsset = $manifest['resources/css/app.css']['file'] ?? null;
            $jsAsset = $manifest['resources/js/app.js']['file'] ?? null;

            if (! is_string($cssAsset) || ! is_string($jsAsset)) {
                return null;
            }

            if (! file_exists($directory . DIRECTORY_SEPARATOR . ltrim($cssAsset, '/'))) {
                return null;
            }

            if (! file_exists($directory . DIRECTORY_SEPARATOR . ltrim($jsAsset, '/'))) {
                return null;
            }

            return [
                'css' => $cssAsset,
                'js' => $jsAsset,
            ];
        })
        ->first(fn (?array $build): bool => is_array($build));

    $cssAsset = is_array($viteBuild) ? ($viteBuild['css'] ?? null) : null;
    $jsAsset = is_array($viteBuild) ? ($viteBuild['js'] ?? null) : null;
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
