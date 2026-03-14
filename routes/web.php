<?php

use App\Http\Controllers\BuildAssetController;
use App\Http\Controllers\AdminUsers\AdminUserPageController;
use App\Http\Controllers\Bookings\BookingPageController;
use App\Http\Controllers\Dashboard\DashboardPageController;
use App\Http\Controllers\Drivers\DriverPageController;
use App\Http\Controllers\Keberangkatan\KeberangkatanPageController;
use App\Http\Controllers\Mobil\MobilPageController;
use App\Http\Controllers\RegularBookings\RegularBookingPageController;
use App\Http\Controllers\Stock\StockPageController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/dashboard');
Route::get('/build/assets/{asset}', [BuildAssetController::class, 'show'])
    ->where('asset', '.*')
    ->name('build.assets.show');

require __DIR__.'/auth.php';

Route::prefix('dashboard')->group(function () {
    Route::get('/', [DashboardPageController::class, 'index'])->name('dashboard');
    Route::get('/regular-bookings', [RegularBookingPageController::class, 'index'])->name('regular-bookings.index');
    Route::post('/regular-bookings/information', [RegularBookingPageController::class, 'storeInformation'])->name('regular-bookings.information.store');
    Route::get('/regular-bookings/seats', [RegularBookingPageController::class, 'seats'])->name('regular-bookings.seats');
    Route::post('/regular-bookings/seats', [RegularBookingPageController::class, 'storeSeats'])->name('regular-bookings.seats.store');
    Route::get('/regular-bookings/passengers', [RegularBookingPageController::class, 'passengers'])->name('regular-bookings.passengers');
    Route::post('/regular-bookings/passengers', [RegularBookingPageController::class, 'storePassengers'])->name('regular-bookings.passengers.store');
    Route::get('/regular-bookings/review', [RegularBookingPageController::class, 'review'])->name('regular-bookings.review');
    Route::post('/regular-bookings/review', [RegularBookingPageController::class, 'storeReview'])->name('regular-bookings.review.store');
    Route::get('/regular-bookings/payment', [RegularBookingPageController::class, 'payment'])->name('regular-bookings.payment');
    Route::post('/regular-bookings/payment', [RegularBookingPageController::class, 'storePayment'])->name('regular-bookings.payment.store');
    Route::get('/regular-bookings/invoice', [RegularBookingPageController::class, 'invoice'])->name('regular-bookings.invoice');
    Route::get('/regular-bookings/invoice/download', [RegularBookingPageController::class, 'downloadInvoice'])->name('regular-bookings.invoice.download');
    Route::get('/regular-bookings/e-ticket', [RegularBookingPageController::class, 'ticket'])->name('regular-bookings.ticket');
    Route::get('/regular-bookings/e-ticket/download', [RegularBookingPageController::class, 'downloadTicket'])->name('regular-bookings.ticket.download');
    Route::get('/bookings', [BookingPageController::class, 'index'])->name('bookings.index');
    Route::middleware('admin.role:admin')->group(function () {
        Route::get('/bookings/{booking}', [BookingPageController::class, 'show'])->name('bookings.show');
    });
    Route::get('/admin-users', [AdminUserPageController::class, 'index'])->name('admin-users.index');
    Route::get('/drivers', [DriverPageController::class, 'index'])->name('drivers.index');
    Route::get('/mobil', [MobilPageController::class, 'index'])->name('mobil.index');
    Route::get('/keberangkatan', [KeberangkatanPageController::class, 'index'])->name('keberangkatan.index');
    Route::get('/stock', [StockPageController::class, 'index'])->name('stock.index');
});
