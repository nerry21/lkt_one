<?php

namespace App\Http\Controllers\Mobil;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\View\View;

class MobilPageController extends Controller
{
    public function index(): View
    {
        return view('mobil.index', [
            'pageTitle' => 'Data Mobil | Lancang Kuning Travelindo',
            'pageScript' => 'mobil/index',
            'guardMode' => 'protected',
            'pageHeading' => 'Data Mobil',
            'pageDescription' => 'Kelola data armada mobil',
        ]);
    }
}
