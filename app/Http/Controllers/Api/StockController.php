<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Stock\StoreStockRequest;
use App\Http\Requests\Stock\UpdateStockRequest;
use App\Models\Stock;
use App\Services\StockAllocationService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class StockController extends Controller
{
    public function __construct(
        protected StockAllocationService $stockAllocationService,
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        $page = max(1, (int) $request->query('page', 1));
        $limit = max(1, (int) $request->query('limit', 10));

        $items = $this->filteredQuery($request)
            ->orderByDesc('tanggal')
            ->forPage($page, $limit)
            ->get()
            ->map(fn (Stock $stock) => $this->payload($stock))
            ->values();

        return response()->json($items);
    }

    public function count(Request $request): JsonResponse
    {
        return response()->json([
            'count' => $this->filteredQuery($request)->count(),
        ]);
    }

    public function show(string $stock): JsonResponse
    {
        return response()->json($this->payload($this->findStock($stock)));
    }

    public function store(StoreStockRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $this->stockAllocationService->ensureStockTotalsAreValid($validated);

        $stock = Stock::query()->create(array_merge(
            $validated,
            $this->stockAllocationService->dateParts($validated['tanggal']),
            $this->stockAllocationService->calculateStockValues(
                (int) $validated['total_stock_snack'],
                (int) $validated['total_stock_air_mineral'],
            ),
        ));

        $this->stockAllocationService->syncByDate($validated['tanggal']);

        return response()->json($this->payload($stock->fresh()));
    }

    public function update(UpdateStockRequest $request, string $stock): JsonResponse
    {
        $item = $this->findStock($stock);
        $oldDate = $item->tanggal;
        $validated = $request->validated();

        $this->stockAllocationService->ensureStockTotalsAreValid($validated, $item);

        $item->fill(array_merge(
            $validated,
            $this->stockAllocationService->dateParts($validated['tanggal']),
        ));
        $item->save();

        $this->stockAllocationService->syncByDates([$oldDate, $validated['tanggal']]);

        return response()->json($this->payload($item->fresh()));
    }

    public function destroy(string $stock): JsonResponse
    {
        $item = $this->findStock($stock);
        $item->delete();

        return response()->json(['message' => 'Data stok berhasil dihapus']);
    }

    protected function filteredQuery(Request $request): Builder
    {
        $search = trim((string) $request->query('search', ''));

        return Stock::query()->when($search !== '', function (Builder $query) use ($search) {
            $query->where(function (Builder $subQuery) use ($search) {
                $subQuery
                    ->where('tanggal', 'like', "%{$search}%")
                    ->orWhere('hari', 'like', "%{$search}%")
                    ->orWhere('bulan', 'like', "%{$search}%")
                    ->orWhere('keterangan', 'like', "%{$search}%");
            });
        });
    }

    protected function findStock(string $id): Stock
    {
        $stock = Stock::query()->find($id);

        if (! $stock) {
            throw new HttpException(404, 'Data stok tidak ditemukan');
        }

        return $stock;
    }

    protected function payload(Stock $stock): array
    {
        $displayTotalSnack = (int) $stock->total_stock_snack + (int) $stock->pengembalian_snack;

        return [
            'id' => $stock->id,
            'tanggal' => $stock->tanggal,
            'hari' => $stock->hari,
            'bulan' => $stock->bulan,
            'tahun' => $stock->tahun,
            'total_stock_snack' => (int) $stock->total_stock_snack,
            'total_stock_snack_display' => $displayTotalSnack,
            'total_stock_air_mineral' => (int) $stock->total_stock_air_mineral,
            'terpakai_snack' => (int) $stock->terpakai_snack,
            'pengembalian_snack' => (int) $stock->pengembalian_snack,
            'terpakai_air_mineral' => (int) $stock->terpakai_air_mineral,
            'sisa_stock_snack' => (int) $stock->sisa_stock_snack,
            'sisa_stock_air_mineral' => (int) $stock->sisa_stock_air_mineral,
            'nilai_total' => (int) $stock->nilai_total,
            'sisa_nilai_total' => (int) $stock->sisa_nilai_total,
            'keterangan' => $stock->keterangan,
            'created_at' => optional($stock->created_at)?->toISOString(),
        ];
    }
}
