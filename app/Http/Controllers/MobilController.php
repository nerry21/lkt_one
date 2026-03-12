<?php
namespace App\Http\Controllers;
use App\Models\Mobil; use Illuminate\Http\RedirectResponse; use Illuminate\Http\Request; use Illuminate\View\View;
class MobilController extends Controller {
    public function index(Request $request): View { $search=trim((string)$request->get('search')); $items=Mobil::query()->when($search!=='', fn($q)=>$q->where('kode_mobil','like',"%{$search}%")->orWhere('jenis_mobil','like',"%{$search}%"))->latest()->paginate(10)->withQueryString(); return view('mobil.index', compact('items','search')); }
    public function create(): View { return view('mobil.form',['item'=>new Mobil()]); }
    public function store(Request $request): RedirectResponse { $validated=$request->validate(['kode_mobil'=>['required'],'jenis_mobil'=>['required']]); Mobil::create($validated); return redirect()->route('mobil.index')->with('success','Mobil berhasil ditambahkan.'); }
    public function edit(Mobil $mobil): View { return view('mobil.form',['item'=>$mobil]); }
    public function update(Request $request, Mobil $mobil): RedirectResponse { $validated=$request->validate(['kode_mobil'=>['required'],'jenis_mobil'=>['required']]); $mobil->update($validated); return redirect()->route('mobil.index')->with('success','Mobil berhasil diperbarui.'); }
    public function destroy(Mobil $mobil): RedirectResponse { $mobil->delete(); return back()->with('success','Mobil berhasil dihapus.'); }
}
