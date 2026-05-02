<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\SuratJalanPdfService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Sesi 73 PR-CRM-6J — Public surat jalan download via signed URL.
 *
 * Route: GET /surat-jalan/{trip_date}/{trip_time}/{from_city_slug}/download (signed)
 * Auth: signed URL Laravel (24h TTL)
 */
class SuratJalanDownloadController extends Controller
{
    public function __construct(
        private readonly SuratJalanPdfService $pdfService,
    ) {}

    public function download(Request $request, string $tripDate, string $tripTime, string $fromCitySlug): Response
    {
        try {
            $date = Carbon::parse($tripDate)->toDateString();
        } catch (\Throwable) {
            return response()->json(['error' => 'invalid_trip_date'], 400);
        }

        if (! preg_match('/^\d{2}-\d{2}$/', $tripTime)) {
            return response()->json(['error' => 'invalid_trip_time'], 400);
        }

        $fromCity = $this->slugToCity($fromCitySlug);
        $tripTimeNormal = str_replace('-', ':', $tripTime) . ':00';

        $content = $this->pdfService->streamContent($date, $tripTimeNormal, $fromCity);
        $filename = sprintf('surat-jalan-%s-%s-%s.pdf', $date, $tripTime, $fromCitySlug);

        return response($content, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => sprintf('inline; filename="%s"', $filename),
            'Cache-Control' => 'private, max-age=3600',
        ]);
    }

    private function slugToCity(string $slug): string
    {
        return match (strtolower($slug)) {
            'pasirpengaraian' => 'Pasirpengaraian',
            'pekanbaru' => 'Pekanbaru',
            default => ucfirst($slug),
        };
    }
}
