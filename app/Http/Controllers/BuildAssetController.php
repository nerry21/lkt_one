<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\BinaryFileResponse;

class BuildAssetController extends Controller
{
    public function show(string $asset): BinaryFileResponse
    {
        abort_if(str_contains($asset, '..'), 404);

        $asset = ltrim($asset, '/');

        foreach ($this->buildAssetDirectories() as $directory) {
            $exactPath = $directory.DIRECTORY_SEPARATOR.$asset;

            if (is_file($exactPath)) {
                return $this->fileResponse($exactPath);
            }
        }

        $fallbackPath = $this->fallbackPath($asset);

        abort_if(! is_string($fallbackPath) || ! is_file($fallbackPath), 404);

        return $this->fileResponse($fallbackPath);
    }

    protected function buildAssetDirectories(): array
    {
        return [
            public_path('build/assets'),
            base_path('../build/assets'),
            base_path('build/assets'),
        ];
    }

    protected function fallbackPath(string $asset): ?string
    {
        $filename = basename($asset);

        if (! preg_match('/^app.*\.(css|js)$/i', $filename, $matches)) {
            return null;
        }

        $extension = strtolower((string) ($matches[1] ?? ''));

        foreach ($this->buildAssetDirectories() as $directory) {
            $candidates = glob($directory.DIRECTORY_SEPARATOR."app*.{$extension}") ?: [];

            if ($candidates === []) {
                continue;
            }

            rsort($candidates, SORT_STRING);

            return $candidates[0];
        }

        return null;
    }

    protected function fileResponse(string $path): BinaryFileResponse
    {
        $extension = strtolower(pathinfo($path, PATHINFO_EXTENSION));
        $contentType = match ($extension) {
            'css' => 'text/css; charset=UTF-8',
            'js' => 'application/javascript; charset=UTF-8',
            default => null,
        };

        return response()->file($path, array_filter([
            'Content-Type' => $contentType,
            'Cache-Control' => 'public, max-age=300',
        ]));
    }
}
