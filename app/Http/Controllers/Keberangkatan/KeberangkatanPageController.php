<?php

namespace App\Http\Controllers\Keberangkatan;

use App\Http\Controllers\Controller;
use App\Models\Keberangkatan;
use Illuminate\Contracts\View\View;

class KeberangkatanPageController extends Controller
{
    public function index(): View
    {
        return view('keberangkatan.index', [
            'pageTitle' => 'Data Keberangkatan | Lancang Kuning Travelindo',
            'pageScript' => 'keberangkatan/index',
            'guardMode' => 'protected',
            'pageHeading' => 'Data Keberangkatan',
            'pageDescription' => 'Kelola data keberangkatan Pekanbaru',
            'jamKeberangkatanOptions' => Keberangkatan::JAM_KEBERANGKATAN_OPTIONS,
            'tipeLayananOptions' => Keberangkatan::TIPE_LAYANAN_OPTIONS,
        ]);
    }
}
