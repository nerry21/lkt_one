<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Booking;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

/**
 * Sesi 73 PR-CRM-6J — Surat Jalan PDF generator.
 *
 * Generate manifest 1 halaman per trip (gabungan tanggal + jam + cluster).
 * Berbeda dengan ETicketPdfService yang per-booking individual.
 *
 * Trip key format: "YYYY-MM-DD_HH-MM_<from_city_slug>"
 * Storage path: surat-jalan/{year}/{month}/sj-{trip_key}.pdf
 */
class SuratJalanPdfService
{
    public function generateAndStore(string $tripDate, string $tripTime, string $fromCity): string
    {
        $tripKey = $this->buildTripKey($tripDate, $tripTime, $fromCity);
        $path = $this->buildPdfPath($tripKey, $tripDate);

        $pdfContent = $this->renderPdf($tripDate, $tripTime, $fromCity);

        Storage::put($path, $pdfContent);

        return $path;
    }

    public function streamContent(string $tripDate, string $tripTime, string $fromCity): string
    {
        $tripKey = $this->buildTripKey($tripDate, $tripTime, $fromCity);
        $path = $this->buildPdfPath($tripKey, $tripDate);

        if (! Storage::exists($path)) {
            $this->generateAndStore($tripDate, $tripTime, $fromCity);
        }

        return Storage::get($path) ?? '';
    }

    public function exists(string $tripDate, string $tripTime, string $fromCity): bool
    {
        $tripKey = $this->buildTripKey($tripDate, $tripTime, $fromCity);
        $path = $this->buildPdfPath($tripKey, $tripDate);

        return Storage::exists($path);
    }

    public function buildTripKey(string $tripDate, string $tripTime, string $fromCity): string
    {
        $citySlug = strtolower(str_replace(' ', '-', trim($fromCity)));
        $timeKey = str_replace(':', '-', substr($tripTime, 0, 5));
        return sprintf('%s_%s_%s', $tripDate, $timeKey, $citySlug);
    }

    public function renderPdf(string $tripDate, string $tripTime, string $fromCity): string
    {
        $bookings = $this->fetchBookings($tripDate, $tripTime, $fromCity);

        $first = $bookings->first();
        $mobilKode = optional(optional($first)->mobil)->kode_mobil;
        $driverName = optional($first)->driver_name ?? optional(optional($first)->driver)->nama ?? null;

        $passengers = $bookings->map(function (Booking $b) {
            $seats = is_array($b->selected_seats) ? $b->selected_seats : [];
            return [
                'passenger_name' => $b->passenger_name,
                'passenger_phone' => $b->passenger_phone,
                'seat_label' => implode(',', $seats) ?: '-',
                'pickup_location' => $b->pickup_location,
                'dropoff_location' => $b->dropoff_location,
                'payment_status_label' => $this->formatPaymentLabel($b->payment_method, $b->payment_status),
            ];
        })->all();

        $totalRevenue = (int) $bookings->sum('total_amount');

        $tripKey = $this->buildTripKey($tripDate, $tripTime, $fromCity);
        $tripDateLabel = Carbon::parse($tripDate)->locale('id')->translatedFormat('l, j F Y');
        $toCity = optional($first)->to_city ?? '-';

        $pdf = Pdf::loadView('pdf.surat-jalan', [
            'trip_date_label' => $tripDateLabel,
            'trip_time' => substr($tripTime, 0, 5),
            'from_city' => $fromCity,
            'to_city' => $toCity,
            'mobil_kode' => $mobilKode,
            'driver_name' => $driverName,
            'passengers' => $passengers,
            'total_revenue' => $totalRevenue,
            'trip_key' => $tripKey,
            'trip_label' => sprintf('%s %s', $tripDate, substr($tripTime, 0, 5)),
            'generated_at' => now()->format('d/m/Y H:i'),
        ])
        ->setPaper('a4', 'portrait')
        ->setOption('defaultFont', 'sans-serif')
        ->setOption('isHtml5ParserEnabled', true)
        ->setOption('isRemoteEnabled', false);

        return $pdf->output();
    }

    private function buildPdfPath(string $tripKey, string $tripDate): string
    {
        $date = Carbon::parse($tripDate);
        return sprintf(
            'surat-jalan/%s/%s/sj-%s.pdf',
            $date->format('Y'),
            $date->format('m'),
            $tripKey,
        );
    }

    private function fetchBookings(string $tripDate, string $tripTime, string $fromCity): Collection
    {
        return Booking::query()
            ->where('trip_date', $tripDate)
            ->where('trip_time', 'like', substr($tripTime, 0, 5) . '%')
            ->where('from_city', $fromCity)
            ->whereIn('booking_status', ['Diproses', 'Dibayar'])
            ->with(['mobil', 'driver'])
            ->orderBy('created_at')
            ->get();
    }

    private function formatPaymentLabel(?string $method, ?string $status): string
    {
        $methodLabel = match ($method) {
            'cash' => 'Cash',
            'transfer' => 'Transfer',
            default => '-',
        };

        $statusLabel = match (strtolower((string) $status)) {
            'paid', 'lunas' => 'Lunas',
            'pending', 'unpaid', 'belum bayar' => 'Pending',
            default => $status ?? '-',
        };

        return $methodLabel . ' (' . $statusLabel . ')';
    }
}
