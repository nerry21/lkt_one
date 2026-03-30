<?php

namespace App\Http\Controllers\Drivers;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\View\View;

class DriverPageController extends Controller
{
    public function index(): View
    {
        return view('drivers.index', [
            'pageTitle' => 'Data Driver | JET (JAYA EXCECUTIVE TRANSPORT)',
            'pageScript' => 'drivers/index',
            'guardMode' => 'protected',
            'pageHeading' => 'Data Driver',
            'pageDescription' => 'Kelola data driver armada',
        ]);
    }
}
