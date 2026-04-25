<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Driver;
use App\Models\Mobil;
use Closure;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ExportController extends Controller
{
    public function driversCsv(): StreamedResponse
    {
        return $this->streamCsv(
            'drivers.csv',
            ['Nama Driver', 'Lokasi'],
            function ($handle): void {
                foreach (Driver::query()->orderBy('created_at')->cursor() as $item) {
                    fputcsv($handle, [$item->nama, $item->lokasi]);
                }
            },
        );
    }

    public function mobilCsv(): StreamedResponse
    {
        return $this->streamCsv(
            'mobil.csv',
            ['Kode Mobil', 'Jenis Mobil'],
            function ($handle): void {
                foreach (Mobil::query()->orderBy('created_at')->cursor() as $item) {
                    fputcsv($handle, [$item->kode_mobil, $item->jenis_mobil]);
                }
            },
        );
    }

    protected function streamCsv(string $filename, array $header, Closure $writer): StreamedResponse
    {
        return response()->streamDownload(function () use ($header, $writer) {
            $handle = fopen('php://output', 'w');

            fputcsv($handle, $header);
            $writer($handle);

            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }
}
