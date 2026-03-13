<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Mobil;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AdminVehicleController extends Controller
{
    public function index(): View
    {
        return view('admin.vehicles.index', [
            'vehicles' => Mobil::query()->orderBy('kode_mobil')->paginate(15),
            'pageTitle' => 'Master Kendaraan | Lancang Kuning Travelindo',
            'guardMode' => 'protected',
            'pageHeading' => 'Master Kendaraan',
            'pageDescription' => 'Kelola data armada untuk keberangkatan dan surat jalan',
        ]);
    }

    public function create(): View
    {
        return view('admin.vehicles.create', [
            'pageTitle' => 'Tambah Kendaraan | Lancang Kuning Travelindo',
            'guardMode' => 'protected',
            'pageHeading' => 'Tambah Kendaraan',
            'pageDescription' => 'Tambahkan armada baru ke master kendaraan',
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'plate_number' => ['required', 'string', 'max:50', 'unique:mobil,kode_mobil'],
            'brand' => ['nullable', 'string', 'max:100'],
            'model' => ['nullable', 'string', 'max:100'],
            'seat_capacity' => ['required', 'integer', 'min:1', 'max:100'],
            'status' => ['required', 'string', Rule::in(['Ready', 'Maintenance', 'Inactive'])],
        ]);

        Mobil::query()->create([
            'kode_mobil' => trim($validated['plate_number']),
            'jenis_mobil' => trim(implode(' ', array_filter([
                $validated['brand'] ?? null,
                $validated['model'] ?? null,
            ]))) ?: 'Armada Travel',
            'brand' => $validated['brand'] ? trim($validated['brand']) : null,
            'model' => $validated['model'] ? trim($validated['model']) : null,
            'seat_capacity' => $validated['seat_capacity'],
            'status' => $validated['status'],
        ]);

        return redirect()
            ->route('admin.vehicles.index')
            ->with('success', 'Kendaraan berhasil ditambahkan.');
    }

    public function edit(string $id): View
    {
        return view('admin.vehicles.edit', [
            'vehicle' => Mobil::query()->findOrFail($id),
            'pageTitle' => 'Edit Kendaraan | Lancang Kuning Travelindo',
            'guardMode' => 'protected',
            'pageHeading' => 'Edit Kendaraan',
            'pageDescription' => 'Perbarui detail armada operasional',
        ]);
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $vehicle = Mobil::query()->findOrFail($id);

        $validated = $request->validate([
            'plate_number' => ['required', 'string', 'max:50', Rule::unique('mobil', 'kode_mobil')->ignore($vehicle->id)],
            'brand' => ['nullable', 'string', 'max:100'],
            'model' => ['nullable', 'string', 'max:100'],
            'seat_capacity' => ['required', 'integer', 'min:1', 'max:100'],
            'status' => ['required', 'string', Rule::in(['Ready', 'Maintenance', 'Inactive'])],
        ]);

        $vehicle->update([
            'kode_mobil' => trim($validated['plate_number']),
            'jenis_mobil' => trim(implode(' ', array_filter([
                $validated['brand'] ?? null,
                $validated['model'] ?? null,
            ]))) ?: ($vehicle->jenis_mobil ?: 'Armada Travel'),
            'brand' => $validated['brand'] ? trim($validated['brand']) : null,
            'model' => $validated['model'] ? trim($validated['model']) : null,
            'seat_capacity' => $validated['seat_capacity'],
            'status' => $validated['status'],
        ]);

        return redirect()
            ->route('admin.vehicles.index')
            ->with('success', 'Kendaraan berhasil diperbarui.');
    }

    public function destroy(string $id): RedirectResponse
    {
        $vehicle = Mobil::query()->findOrFail($id);

        if ($vehicle->departures()->exists() || $vehicle->keberangkatan()->exists()) {
            return redirect()
                ->route('admin.vehicles.index')
                ->with('error', 'Kendaraan masih terhubung ke data keberangkatan dan tidak bisa dihapus.');
        }

        $vehicle->delete();

        return redirect()
            ->route('admin.vehicles.index')
            ->with('success', 'Kendaraan berhasil dihapus.');
    }
}
