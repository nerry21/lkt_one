<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\View\View;

class AuthPageController extends Controller
{
    public function show(): View
    {
        return view('auth.login', [
            'pageTitle' => 'JET (JAYA EXCECUTIVE TRANSPORT) | Login',
            'pageScript' => 'auth/login',
            'guardMode' => 'public',
        ]);
    }
}
