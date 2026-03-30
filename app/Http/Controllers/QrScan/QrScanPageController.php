<?php

namespace App\Http\Controllers\QrScan;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\View\View;

class QrScanPageController extends Controller
{
    public function index(): View
    {
        return view('qr-scan.index', [
            'pageTitle'       => 'Scan QR Tiket | JET (JAYA EXCECUTIVE TRANSPORT)',
            'pageScript'      => 'qr-scan/index',
            'guardMode'       => 'protected',
            'pageHeading'     => 'Scan QR Tiket',
            'pageDescription' => 'Pindai QR code tiket penumpang untuk verifikasi loyalti',
        ]);
    }
}
