<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Auth\AuthPageController;
use Illuminate\Support\Facades\Route;

Route::get('/login', [AuthPageController::class, 'show'])->name('login');

Route::prefix('api/auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->name('api.auth.login');
    Route::post('/register', [AuthController::class, 'register'])->name('api.auth.register');

    Route::middleware('jwt.auth')->group(function () {
        Route::get('/me', [AuthController::class, 'me'])->name('api.auth.me');
        Route::post('/logout', [AuthController::class, 'logout'])->name('api.auth.logout');
    });
});
