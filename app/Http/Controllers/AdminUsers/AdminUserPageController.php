<?php

namespace App\Http\Controllers\AdminUsers;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\View\View;

class AdminUserPageController extends Controller
{
    public function index(): View
    {
        return view('admin-users.index', [
            'pageTitle' => 'Admin & User | JET (JAYA EXCECUTIVE TRANSPORT)',
            'pageScript' => 'admin-users/index',
            'guardMode' => 'protected',
            'pageHeading' => 'Admin & User',
            'pageDescription' => 'Kelola akun admin dan user yang dapat mengakses dashboard',
        ]);
    }
}
