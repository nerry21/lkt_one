<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Driver;
use App\Models\Keberangkatan;
use App\Models\Mobil;
use Closure;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ExportController extends Controller
{
    public function keberangkatanCsv(): StreamedResponse
    {
        return $this->streamCsv(
            'keberangkatan.csv',
            [
                'Hari',
                'Tanggal',
                'Jam Keberangkatan',
                'Layanan',
                'Tahun',
                'Kode Mobil',
                'Driver',
                'Jumlah Penumpang',
                'Jumlah Tarif',
                'Total Tarif',
                'Jumlah Paket',
                'Uang Paket',
                'Jumlah Snack',
                'Jumlah Air Mineral',
                'Uang PC',
                'Uang Bersih',
                'Trip Ke',
                'Status Pembayaran',
            ],
            function ($handle): void {
                foreach (Keberangkatan::query()->orderBy('created_at')->cursor() as $item) {
                    fputcsv($handle, [
                        $item->hari,
                        $item->tanggal,
                        Keberangkatan::jamKeberangkatanLabel($item->jam_keberangkatan),
                        $item->tipe_layanan ?: Keberangkatan::DEFAULT_TIPE_LAYANAN,
                        $item->tahun,
                        $item->kode_mobil,
                        $item->driver_nama,
                        $item->jumlah_penumpang,
                        $item->tarif_penumpang,
                        $item->jumlah_uang_penumpang,
                        $item->jumlah_paket,
                        $item->uang_paket,
                        $item->jumlah_snack,
                        $item->jumlah_air_mineral,
                        $item->uang_pc,
                        $item->uang_bersih,
                        $item->trip_ke,
                        $item->status_pembayaran ?: Keberangkatan::STATUS_BELUM_LUNAS,
                    ]);
                }
            },
        );
    }

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
