<?php
namespace App\Http\Controllers;
use App\Models\Stock; use App\Services\TransportService; use Illuminate\Http\RedirectResponse; use Illuminate\Http\Request; use Illuminate\View\View;
class StockController extends Controller {
    public function index(Request $request, TransportService $service): View { $service->sinkronkanStock(); $search=trim((string)$request->get('search')); $items=Stock::query()->when($search!=='', fn($q)=>$q->whereDate('tanggal',$search)->orWhere('keterangan','like',"%{$search}%"))->latest('tanggal')->paginate(10)->withQueryString(); return view('stock.index', compact('items','search')); }
    public function create(): View { return view('stock.form',['item'=>new Stock(['harga_snack'=>3000,'harga_air_mineral'=>2000])]); }
    public function store(Request $request, TransportService $service): RedirectResponse { $validated=$this->validateData($request); Stock::create(array_merge($validated,$service->tanggalMeta($validated['tanggal']))); $service->sinkronkanStock($validated['tanggal']); return redirect()->route('stock.index')->with('success','Stock berhasil ditambahkan.'); }
    public function edit(Stock $stock): View { return view('stock.form',['item'=>$stock]); }
    public function update(Request $request, Stock $stock, TransportService $service): RedirectResponse { $validated=$this->validateData($request); $stock->update(array_merge($validated,$service->tanggalMeta($validated['tanggal']))); $service->sinkronkanStock($validated['tanggal']); return redirect()->route('stock.index')->with('success','Stock berhasil diperbarui.'); }
    public function destroy(Stock $stock): RedirectResponse { $stock->delete(); return back()->with('success','Stock berhasil dihapus.'); }
    protected function validateData(Request $request): array { return $request->validate(['tanggal'=>['required','date'],'total_stock_snack'=>['required','integer','min:0'],'total_stock_air_mineral'=>['required','integer','min:0'],'harga_snack'=>['required','integer','min:0'],'harga_air_mineral'=>['required','integer','min:0'],'keterangan'=>['nullable','string']]); }
}
