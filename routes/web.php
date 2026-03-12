<?php

use App\Http\Controllers\AdminUsers\AdminUserPageController;
use App\Http\Controllers\Dashboard\DashboardPageController;
use App\Http\Controllers\Drivers\DriverPageController;
use App\Http\Controllers\Keberangkatan\KeberangkatanPageController;
use App\Http\Controllers\Mobil\MobilPageController;
use App\Http\Controllers\Stock\StockPageController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/dashboard');

require __DIR__.'/auth.php';

Route::prefix('dashboard')->group(function () {
    Route::get('/', [DashboardPageController::class, 'index'])->name('dashboard');
    Route::get('/admin-users', [AdminUserPageController::class, 'index'])->name('admin-users.index');
    Route::get('/drivers', [DriverPageController::class, 'index'])->name('drivers.index');
    Route::get('/mobil', [MobilPageController::class, 'index'])->name('mobil.index');
    Route::get('/keberangkatan', [KeberangkatanPageController::class, 'index'])->name('keberangkatan.index');
    Route::get('/stock', [StockPageController::class, 'index'])->name('stock.index');
});
