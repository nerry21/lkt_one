<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Keberangkatan\StoreKeberangkatanRequest;
use App\Http\Requests\Keberangkatan\UpdateKeberangkatanRequest;
use App\Models\Driver;
use App\Models\Keberangkatan;
use App\Services\StockAllocationService;
use App\Services\TransportCalculationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Symfony\Component\HttpKernel\Exception\HttpException;

class KeberangkatanController extends Controller
{
    public function __construct(
        protected TransportCalculationService $calculationService,
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
            ->map(fn (Keberangkatan $item) => $this->payload($item))
            ->values();

        return response()->json($items);
    }

    public function count(Request $request): JsonResponse
    {
        $count = $this->filteredQuery($request)->count();

        return response()->json(['count' => $count]);
    }

    public function show(string $keberangkatan): JsonResponse
    {
        return response()->json($this->payload($this->findKeberangkatan($keberangkatan)));
    }

    public function store(StoreKeberangkatanRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $this->stockAllocationService->ensureStockAvailability($validated);
        $driver = $this->findDriver($validated['driver_id']);
        $derived = array_merge(
            $this->calculationService->dateParts($validated['tanggal']),
            $this->calculationService->calculate(
                $validated['jumlah_penumpang'],
                $validated['tarif_penumpang'],
                $validated['uang_paket'],
            ),
        );

        $item = Keberangkatan::query()->create(array_merge($validated, $derived, [
            'driver_nama' => $driver->nama,
            'status_pembayaran' => $validated['status_pembayaran'] ?? Keberangkatan::STATUS_BELUM_LUNAS,
        ]));
        $this->stockAllocationService->syncByDate($validated['tanggal']);

        return response()->json($this->payload($item));
    }

    public function update(UpdateKeberangkatanRequest $request, string $keberangkatan): JsonResponse
    {
        $item = $this->findKeberangkatan($keberangkatan);
        $oldDate = $item->tanggal;
        $validated = array_merge($this->payload($item), $request->validated());
        $this->stockAllocationService->ensureStockAvailability($validated, $item);
        $derived = array_merge(
            $this->calculationService->dateParts($validated['tanggal']),
            $this->calculationService->calculate(
                (int) $validated['jumlah_penumpang'],
                (int) $validated['tarif_penumpang'],
                (int) $validated['uang_paket'],
            ),
        );

        $driverName = $item->driver_nama;

        if (array_key_exists('driver_id', $request->validated())) {
            $driver = Driver::query()->find($validated['driver_id']);

            if ($driver) {
                $driverName = $driver->nama;
            }
        }

        $item->fill(array_merge($request->validated(), $derived, [
            'driver_nama' => $driverName,
        ]));
        $item->save();
        $this->stockAllocationService->syncByDates([$oldDate, $item->tanggal]);

        return response()->json($this->payload($item->fresh()));
    }

    public function destroy(string $keberangkatan): JsonResponse
    {
        $item = $this->findKeberangkatan($keberangkatan);
        $tanggal = $item->tanggal;
        $item->delete();
        $this->stockAllocationService->syncByDate($tanggal);

        return response()->json(['message' => 'Data keberangkatan berhasil dihapus']);
    }

    protected function findDriver(string $id): Driver
    {
        $driver = Driver::query()->find($id);

        if (! $driver) {
            throw new HttpException(404, 'Driver tidak ditemukan');
        }

        return $driver;
    }

    protected function findKeberangkatan(string $id): Keberangkatan
    {
        $item = Keberangkatan::query()->find($id);

        if (! $item) {
            throw new HttpException(404, 'Data keberangkatan tidak ditemukan');
        }

        return $item;
    }

    protected function payload(Keberangkatan $item): array
    {
        return [
            'id' => $item->id,
            'tanggal' => $item->tanggal,
            'hari' => $item->hari,
            'bulan' => $item->bulan,
            'tahun' => $item->tahun,
            'kode_mobil' => $item->kode_mobil,
            'driver_id' => $item->driver_id,
            'driver_nama' => $item->driver_nama,
            'jumlah_penumpang' => (int) $item->jumlah_penumpang,
            'tarif_penumpang' => (int) $item->tarif_penumpang,
            'jumlah_uang_penumpang' => (int) $item->jumlah_uang_penumpang,
            'jumlah_paket' => (int) $item->jumlah_paket,
            'uang_paket' => (int) $item->uang_paket,
            'jumlah_snack' => (int) $item->jumlah_snack,
            'jumlah_air_mineral' => (int) $item->jumlah_air_mineral,
            'uang_pc' => (float) $item->uang_pc,
            'uang_bersih' => (float) $item->uang_bersih,
            'trip_ke' => (int) $item->trip_ke,
            'status_pembayaran' => $item->status_pembayaran ?: Keberangkatan::STATUS_BELUM_LUNAS,
            'created_at' => optional($item->created_at)?->toISOString(),
        ];
    }

    protected function filteredQuery(Request $request): Builder
    {
        $search = (string) $request->query('search', '');
        $kodeMobil = (string) $request->query('kode_mobil', '');
        $driverId = (string) $request->query('driver_id', '');
        $startDate = (string) $request->query('start_date', '');
        $endDate = (string) $request->query('end_date', '');

        return Keberangkatan::query()
            ->when($search !== '', function (Builder $query) use ($search) {
                $query->where(function (Builder $subQuery) use ($search) {
                    $subQuery
                        ->where('kode_mobil', 'like', "%{$search}%")
                        ->orWhere('driver_nama', 'like', "%{$search}%")
                        ->orWhere('status_pembayaran', 'like', "%{$search}%");
                });
            })
            ->when($kodeMobil !== '', fn (Builder $query) => $query->where('kode_mobil', $kodeMobil))
            ->when($driverId !== '', fn (Builder $query) => $query->where('driver_id', $driverId))
            ->when($startDate !== '' && $endDate !== '', fn (Builder $query) => $query->whereBetween('tanggal', [$startDate, $endDate]))
            ->when($startDate !== '' && $endDate === '', fn (Builder $query) => $query->where('tanggal', '>=', $startDate))
            ->when($startDate === '' && $endDate !== '', fn (Builder $query) => $query->where('tanggal', '<=', $endDate));
    }
}
