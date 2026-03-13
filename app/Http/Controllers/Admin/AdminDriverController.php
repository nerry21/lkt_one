<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Driver;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AdminDriverController extends Controller
{
    public function index(): View
    {
        return view('admin.drivers.index', [
            'drivers' => Driver::query()->orderBy('nama')->paginate(15),
            'pageTitle' => 'Master Driver | Lancang Kuning Travelindo',
            'guardMode' => 'protected',
            'pageHeading' => 'Master Driver',
            'pageDescription' => 'Kelola data driver operasional untuk manifest dan keberangkatan',
        ]);
    }

    public function create(): View
    {
        return view('admin.drivers.create', [
            'pageTitle' => 'Tambah Driver | Lancang Kuning Travelindo',
            'guardMode' => 'protected',
            'pageHeading' => 'Tambah Driver',
            'pageDescription' => 'Tambahkan driver baru ke master data operasional',
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'phone' => ['nullable', 'string', 'max:30'],
            'license_number' => ['nullable', 'string', 'max:100'],
            'status' => ['required', 'string', Rule::in(['Active', 'Inactive'])],
        ]);

        Driver::query()->create([
            'nama' => trim($validated['name']),
            'phone' => $validated['phone'] ? trim($validated['phone']) : null,
            'license_number' => $validated['license_number'] ? trim($validated['license_number']) : null,
            'status' => $validated['status'],
        ]);

        return redirect()
            ->route('admin.drivers.index')
            ->with('success', 'Driver berhasil ditambahkan.');
    }

    public function edit(string $id): View
    {
        return view('admin.drivers.edit', [
            'driver' => Driver::query()->findOrFail($id),
            'pageTitle' => 'Edit Driver | Lancang Kuning Travelindo',
            'guardMode' => 'protected',
            'pageHeading' => 'Edit Driver',
            'pageDescription' => 'Perbarui data driver operasional',
        ]);
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'phone' => ['nullable', 'string', 'max:30'],
            'license_number' => ['nullable', 'string', 'max:100'],
            'status' => ['required', 'string', Rule::in(['Active', 'Inactive'])],
        ]);

        $driver = Driver::query()->findOrFail($id);
        $driver->update([
            'nama' => trim($validated['name']),
            'phone' => $validated['phone'] ? trim($validated['phone']) : null,
            'license_number' => $validated['license_number'] ? trim($validated['license_number']) : null,
            'status' => $validated['status'],
        ]);

        return redirect()
            ->route('admin.drivers.index')
            ->with('success', 'Driver berhasil diperbarui.');
    }

    public function destroy(string $id): RedirectResponse
    {
        $driver = Driver::query()->findOrFail($id);

        if ($driver->departures()->exists() || $driver->keberangkatan()->exists()) {
            return redirect()
                ->route('admin.drivers.index')
                ->with('error', 'Driver masih terhubung ke data keberangkatan dan tidak bisa dihapus.');
        }

        $driver->delete();

        return redirect()
            ->route('admin.drivers.index')
            ->with('success', 'Driver berhasil dihapus.');
    }
}
