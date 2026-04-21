<?php
namespace App\Http\Controllers;
use App\Models\Driver; use App\Models\Keberangkatan; use App\Models\Mobil; use App\Services\TransportService; use Illuminate\Http\RedirectResponse; use Illuminate\Http\Request; use Illuminate\View\View;
class KeberangkatanController extends Controller {
    public function index(Request $request): View {
        $search=trim((string)$request->get('search'));
        $items=Keberangkatan::query()->when($search!=='', function($q) use($search){ $q->where('driver_nama','like',"%{$search}%")->orWhere('kode_mobil','like',"%{$search}%")->orWhere('tipe_layanan','like',"%{$search}%")->orWhereDate('tanggal',$search); })->latest('tanggal')->paginate(10)->withQueryString();
        return view('keberangkatan.index', compact('items','search'));
    }
    public function create(): View { return view('keberangkatan.form',['item'=>new Keberangkatan(['jam_keberangkatan'=>'07:00','jam_label'=>'Jam Pagi 07:00 WIB','tipe_layanan'=>'Reguler']),'drivers'=>Driver::orderBy('nama')->get(),'mobil'=>Mobil::orderBy('kode_mobil')->get()]); }
    public function store(Request $request, TransportService $service): RedirectResponse {
        $validated=$this->validateData($request); $driver=Driver::findOrFail($validated['driver_id']); $validated['driver_nama']=$driver->nama; $validated=array_merge($validated,$service->tanggalMeta($validated['tanggal']),$service->hitungKeuangan($validated)); Keberangkatan::create($validated); $service->sinkronkanStock($validated['tanggal']); return redirect()->route('keberangkatan.index')->with('success','Keberangkatan berhasil ditambahkan.');
    }
    public function edit(Keberangkatan $keberangkatan): View { return view('keberangkatan.form',['item'=>$keberangkatan,'drivers'=>Driver::orderBy('nama')->get(),'mobil'=>Mobil::orderBy('kode_mobil')->get()]); }
    public function update(Request $request, Keberangkatan $keberangkatan, TransportService $service): RedirectResponse {
        $validated=$this->validateData($request); $driver=Driver::findOrFail($validated['driver_id']); $validated['driver_nama']=$driver->nama; $validated=array_merge($validated,$service->tanggalMeta($validated['tanggal']),$service->hitungKeuangan($validated)); $old=optional($keberangkatan->tanggal)->format('Y-m-d'); $keberangkatan->update($validated); $service->sinkronkanStock($validated['tanggal']); if($old && $old!==$validated['tanggal']) $service->sinkronkanStock($old); return redirect()->route('keberangkatan.index')->with('success','Keberangkatan berhasil diperbarui.');
    }
    public function destroy(Keberangkatan $keberangkatan, TransportService $service): RedirectResponse { $tgl=optional($keberangkatan->tanggal)->format('Y-m-d'); $keberangkatan->delete(); if($tgl) $service->sinkronkanStock($tgl); return back()->with('success','Keberangkatan berhasil dihapus.'); }
    protected function validateData(Request $request): array { return $request->validate(['tanggal'=>['required','date'],'jam_keberangkatan'=>['required'],'jam_label'=>['required'],'tipe_layanan'=>['required'],'kode_mobil'=>['required'],'driver_id'=>['required','exists:drivers,id'],'jumlah_penumpang'=>['required','integer','min:0'],'tarif_penumpang'=>['required','integer','min:0'],'jumlah_paket'=>['required','integer','min:0'],'uang_paket'=>['required','integer','min:0'],'jumlah_snack'=>['nullable','integer','min:0'],'jumlah_air_mineral'=>['nullable','integer','min:0'],'trip_ke'=>['required','integer','min:1']]); }
}
