<?php

namespace App\Services;

use App\Models\Keberangkatan;
use App\Models\Stock;
use Symfony\Component\HttpKernel\Exception\HttpException;

class StockAllocationService
{
    public const SNACK_UNIT_PRICE = 3000;

    public const AIR_UNIT_PRICE = 2000;

    public function __construct(
        protected TransportCalculationService $transportCalculationService,
    ) {
    }

    public function unitPrices(): array
    {
        return [
            'snack' => self::SNACK_UNIT_PRICE,
            'air' => self::AIR_UNIT_PRICE,
        ];
    }

    public function dateParts(string $tanggal): array
    {
        return $this->transportCalculationService->dateParts($tanggal);
    }

    public function calculateStockValues(int $totalSnack, int $totalAirMineral, int $usedSnack = 0, int $usedAirMineral = 0): array
    {
        $sisaSnack = max(0, $totalSnack - $usedSnack);
        $sisaAirMineral = max(0, $totalAirMineral - $usedAirMineral);
        $nilaiTotal = ($totalSnack * self::SNACK_UNIT_PRICE) + ($totalAirMineral * self::AIR_UNIT_PRICE);
        $sisaNilaiTotal = ($sisaSnack * self::SNACK_UNIT_PRICE) + ($sisaAirMineral * self::AIR_UNIT_PRICE);

        return [
            'terpakai_snack' => $usedSnack,
            'terpakai_air_mineral' => $usedAirMineral,
            'sisa_stock_snack' => $sisaSnack,
            'sisa_stock_air_mineral' => $sisaAirMineral,
            'nilai_total' => $nilaiTotal,
            'sisa_nilai_total' => $sisaNilaiTotal,
        ];
    }

    public function ensureStockAvailability(array $payload, ?Keberangkatan $current = null): void
    {
        $tanggal = (string) ($payload['tanggal'] ?? '');
        $jumlahSnack = max(0, (int) ($payload['jumlah_snack'] ?? 0));
        $jumlahAirMineral = max(0, (int) ($payload['jumlah_air_mineral'] ?? 0));

        if ($tanggal === '' || ($jumlahSnack === 0 && $jumlahAirMineral === 0)) {
            return;
        }

        $stock = Stock::query()->where('tanggal', $tanggal)->first();

        if (! $stock) {
            throw new HttpException(422, 'Data stok snack dan air mineral untuk tanggal ini belum tersedia');
        }

        $usageQuery = Keberangkatan::query()->where('tanggal', $tanggal);

        if ($current) {
            $usageQuery->whereKeyNot($current->getKey());
        }

        $usage = $usageQuery
            ->selectRaw('COALESCE(SUM(jumlah_snack), 0) as snack, COALESCE(SUM(jumlah_air_mineral), 0) as air')
            ->first();

        $availableSnack = max(0, (int) $stock->total_stock_snack - (int) ($usage->snack ?? 0));
        $availableAirMineral = max(0, (int) $stock->total_stock_air_mineral - (int) ($usage->air ?? 0));

        if ($jumlahSnack > $availableSnack) {
            throw new HttpException(422, "Sisa stock snack untuk tanggal {$tanggal} hanya {$availableSnack}");
        }

        if ($jumlahAirMineral > $availableAirMineral) {
            throw new HttpException(422, "Sisa stock air mineral untuk tanggal {$tanggal} hanya {$availableAirMineral}");
        }
    }

    public function ensureStockTotalsAreValid(array $payload, ?Stock $current = null): void
    {
        $tanggal = (string) ($payload['tanggal'] ?? '');
        $totalSnack = max(0, (int) ($payload['total_stock_snack'] ?? 0));
        $totalAirMineral = max(0, (int) ($payload['total_stock_air_mineral'] ?? 0));

        if ($tanggal === '') {
            return;
        }

        $usage = Keberangkatan::query()
            ->where('tanggal', $tanggal)
            ->selectRaw('COALESCE(SUM(jumlah_snack), 0) as snack, COALESCE(SUM(jumlah_air_mineral), 0) as air')
            ->first();

        $usedSnack = (int) ($usage->snack ?? 0);
        $usedAirMineral = (int) ($usage->air ?? 0);

        if ($totalSnack < $usedSnack) {
            throw new HttpException(422, "Total stock snack tidak boleh lebih kecil dari pemakaian saat ini ({$usedSnack})");
        }

        if ($totalAirMineral < $usedAirMineral) {
            throw new HttpException(422, "Total stock air mineral tidak boleh lebih kecil dari pemakaian saat ini ({$usedAirMineral})");
        }
    }

    public function syncByDate(?string $tanggal = null): void
    {
        $query = Stock::query();

        if ($tanggal !== null && $tanggal !== '') {
            $query->where('tanggal', $tanggal);
        }

        $query->get()->each(function (Stock $stock): void {
            $usage = Keberangkatan::query()
                ->where('tanggal', $stock->tanggal)
                ->selectRaw('COALESCE(SUM(jumlah_snack), 0) as snack, COALESCE(SUM(jumlah_air_mineral), 0) as air')
                ->first();

            $stock->fill(array_merge(
                $this->dateParts($stock->tanggal),
                $this->calculateStockValues(
                    (int) $stock->total_stock_snack,
                    (int) $stock->total_stock_air_mineral,
                    (int) ($usage->snack ?? 0),
                    (int) ($usage->air ?? 0),
                ),
            ));
            $stock->save();
        });
    }

    public function syncByDates(array $dates): void
    {
        collect($dates)
            ->filter(fn ($date) => filled($date))
            ->unique()
            ->each(fn ($date) => $this->syncByDate((string) $date));
    }
}
