<?php

namespace App\Http\Controllers\Bookings;

use App\Http\Controllers\Controller;
use App\Services\BookingManagementService;
use Illuminate\Contracts\View\View;

class BookingPageController extends Controller
{
    public function index(BookingManagementService $service): View
    {
        return view('bookings.index', [
            'pageTitle' => 'Data Pemesanan | Lancang Kuning Travelindo',
            'pageScript' => 'bookings/index',
            'guardMode' => 'protected',
            'pageHeading' => 'Data Pemesanan',
            'pageDescription' => 'Kelola dan pantau seluruh data pemesanan dari dashboard admin',
            'formOptions' => $service->formOptions(),
        ]);
    }
}
