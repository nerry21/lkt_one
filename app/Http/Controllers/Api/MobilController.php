<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Mobil\StoreMobilRequest;
use App\Http\Requests\Mobil\UpdateMobilRequest;
use App\Models\Mobil;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class MobilController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $search = (string) $request->query('search', '');
        $jenis = (string) $request->query('jenis', '');
        $page = max(1, (int) $request->query('page', 1));
        $limit = max(1, (int) $request->query('limit', 10));

        $items = Mobil::query()
            ->when($search !== '', fn ($query) => $query->where('kode_mobil', 'like', "%{$search}%"))
            ->when($jenis !== '', fn ($query) => $query->where('jenis_mobil', $jenis))
            ->orderBy('created_at')
            ->forPage($page, $limit)
            ->get()
            ->map(fn (Mobil $mobil) => $this->payload($mobil))
            ->values();

        return response()->json($items);
    }

    public function all(): JsonResponse
    {
        $items = Mobil::query()
            ->orderBy('created_at')
            ->get()
            ->map(fn (Mobil $mobil) => $this->payload($mobil))
            ->values();

        return response()->json($items);
    }

    public function count(Request $request): JsonResponse
    {
        $search = (string) $request->query('search', '');
        $jenis = (string) $request->query('jenis', '');

        $count = Mobil::query()
            ->when($search !== '', fn ($query) => $query->where('kode_mobil', 'like', "%{$search}%"))
            ->when($jenis !== '', fn ($query) => $query->where('jenis_mobil', $jenis))
            ->count();

        return response()->json(['count' => $count]);
    }

    public function show(string $mobil): JsonResponse
    {
        return response()->json($this->payload($this->findMobil($mobil)));
    }

    public function store(StoreMobilRequest $request): JsonResponse
    {
        $mobil = Mobil::query()->create($request->validated());

        return response()->json($this->payload($mobil));
    }

    public function update(UpdateMobilRequest $request, string $mobil): JsonResponse
    {
        $item = $this->findMobil($mobil);
        $item->fill($request->validated());
        $item->save();

        return response()->json($this->payload($item->fresh()));
    }

    public function destroy(string $mobil): JsonResponse
    {
        $item = $this->findMobil($mobil);
        $item->delete();

        return response()->json(['message' => 'Mobil berhasil dihapus']);
    }

    protected function findMobil(string $id): Mobil
    {
        $mobil = Mobil::query()->find($id);

        if (! $mobil) {
            throw new HttpException(404, 'Mobil tidak ditemukan');
        }

        return $mobil;
    }

    protected function payload(Mobil $mobil): array
    {
        return [
            'id' => $mobil->id,
            'kode_mobil' => $mobil->kode_mobil,
            'jenis_mobil' => $mobil->jenis_mobil,
            'home_pool' => $mobil->home_pool,
            'is_active_in_trip' => (bool) $mobil->is_active_in_trip,
            'created_at' => optional($mobil->created_at)?->toISOString(),
        ];
    }
}
