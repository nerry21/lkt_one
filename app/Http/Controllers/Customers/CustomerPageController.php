<?php

namespace App\Http\Controllers\Customers;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\View\View;

class CustomerPageController extends Controller
{
    public function index(): View
    {
        return view('customers.index', [
            'pageTitle'       => 'Data Pelanggan | Lancang Kuning Travelindo',
            'pageScript'      => 'customers/index',
            'guardMode'       => 'protected',
            'pageHeading'     => 'Data Pelanggan',
            'pageDescription' => 'Kelola identitas pelanggan, riwayat perjalanan, dan program loyalitas',
        ]);
    }
}
