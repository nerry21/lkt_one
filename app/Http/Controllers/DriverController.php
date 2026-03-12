<?php
namespace App\Http\Controllers;
use App\Models\Driver; use Illuminate\Http\RedirectResponse; use Illuminate\Http\Request; use Illuminate\View\View;
class DriverController extends Controller {
    public function index(Request $request): View { $search=trim((string)$request->get('search')); $items=Driver::query()->when($search!=='', fn($q)=>$q->where('nama','like',"%{$search}%")->orWhere('lokasi','like',"%{$search}%"))->latest()->paginate(10)->withQueryString(); return view('drivers.index', compact('items','search')); }
    public function create(): View { return view('drivers.form',['item'=>new Driver()]); }
    public function store(Request $request): RedirectResponse { $validated=$request->validate(['nama'=>['required'],'lokasi'=>['required']]); Driver::create($validated); return redirect()->route('drivers.index')->with('success','Driver berhasil ditambahkan.'); }
    public function edit(Driver $driver): View { return view('drivers.form',['item'=>$driver]); }
    public function update(Request $request, Driver $driver): RedirectResponse { $validated=$request->validate(['nama'=>['required'],'lokasi'=>['required']]); $driver->update($validated); return redirect()->route('drivers.index')->with('success','Driver berhasil diperbarui.'); }
    public function destroy(Driver $driver): RedirectResponse { $driver->delete(); return back()->with('success','Driver berhasil dihapus.'); }
}
