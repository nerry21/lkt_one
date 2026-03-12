<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Driver\StoreDriverRequest;
use App\Http\Requests\Driver\UpdateDriverRequest;
use App\Models\Driver;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class DriverController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $search = (string) $request->query('search', '');
        $page = max(1, (int) $request->query('page', 1));
        $limit = max(1, (int) $request->query('limit', 10));

        $items = Driver::query()
            ->when($search !== '', fn ($query) => $query
                ->where('nama', 'like', "%{$search}%")
                ->orWhere('lokasi', 'like', "%{$search}%"))
            ->orderBy('created_at')
            ->forPage($page, $limit)
            ->get()
            ->map(fn (Driver $driver) => $this->payload($driver))
            ->values();

        return response()->json($items);
    }

    public function all(): JsonResponse
    {
        $items = Driver::query()
            ->orderBy('created_at')
            ->get()
            ->map(fn (Driver $driver) => $this->payload($driver))
            ->values();

        return response()->json($items);
    }

    public function count(Request $request): JsonResponse
    {
        $search = (string) $request->query('search', '');

        $count = Driver::query()
            ->when($search !== '', fn ($query) => $query
                ->where('nama', 'like', "%{$search}%")
                ->orWhere('lokasi', 'like', "%{$search}%"))
            ->count();

        return response()->json(['count' => $count]);
    }

    public function show(string $driver): JsonResponse
    {
        return response()->json($this->payload($this->findDriver($driver)));
    }

    public function store(StoreDriverRequest $request): JsonResponse
    {
        $driver = Driver::query()->create($request->validated());

        return response()->json($this->payload($driver));
    }

    public function update(UpdateDriverRequest $request, string $driver): JsonResponse
    {
        $item = $this->findDriver($driver);
        $item->fill($request->validated());
        $item->save();

        return response()->json($this->payload($item->fresh()));
    }

    public function destroy(string $driver): JsonResponse
    {
        $item = $this->findDriver($driver);
        $item->delete();

        return response()->json(['message' => 'Driver berhasil dihapus']);
    }

    protected function findDriver(string $id): Driver
    {
        $driver = Driver::query()->find($id);

        if (! $driver) {
            throw new HttpException(404, 'Driver tidak ditemukan');
        }

        return $driver;
    }

    protected function payload(Driver $driver): array
    {
        return [
            'id' => $driver->id,
            'nama' => $driver->nama,
            'lokasi' => $driver->lokasi,
            'created_at' => optional($driver->created_at)?->toISOString(),
        ];
    }
}
