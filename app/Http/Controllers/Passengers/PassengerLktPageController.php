<?php

namespace App\Http\Controllers\Passengers;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\View\View;

class PassengerLktPageController extends Controller
{
    public function index(): View
    {
        return view('passengers-lkt.index', [
            'pageTitle'       => 'Data Penumpang | JET (JAYA EXCECUTIVE TRANSPORT)',
            'pageScript'      => 'passengers-lkt/index',
            'guardMode'       => 'protected',
            'pageHeading'     => 'Data Penumpang JET (JAYA EXCECUTIVE TRANSPORT)',
            'pageDescription' => 'Riwayat seluruh penumpang dan frekuensi pemesanan di JET (JAYA EXCECUTIVE TRANSPORT)',
        ]);
    }
}
