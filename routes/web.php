<?php

use App\Http\Controllers\Admin\AdminBookingValidationController;
use App\Http\Controllers\Admin\AdminDepartureController;
use App\Http\Controllers\Admin\AdminDriverController;
use App\Http\Controllers\Admin\AdminPassengerCheckinController;
use App\Http\Controllers\Admin\AdminTicketController;
use App\Http\Controllers\Admin\AdminVehicleController;
use App\Http\Controllers\BookingPageController;
use App\Http\Controllers\AdminUsers\AdminUserPageController;
use App\Http\Controllers\Dashboard\DashboardPageController;
use App\Http\Controllers\Drivers\DriverPageController;
use App\Http\Controllers\Keberangkatan\KeberangkatanPageController;
use App\Http\Controllers\Mobil\MobilPageController;
use App\Http\Controllers\PdfDocumentController;
use App\Http\Controllers\Stock\StockPageController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/dashboard');

Route::get('/booking/reguler', [BookingPageController::class, 'reguler'])->name('booking.reguler');
Route::get('/booking/{id}/review', [BookingPageController::class, 'review'])->name('booking.review');
Route::get('/booking/{id}/payment', [BookingPageController::class, 'payment'])->name('booking.payment');
Route::post('/booking/{id}/payment', [BookingPageController::class, 'submitPayment'])->name('booking.payment.submit');
Route::get('/booking/{id}/eticket', [AdminTicketController::class, 'show'])->name('booking.eticket');
Route::get('/booking/{id}/eticket/pdf', [PdfDocumentController::class, 'eticket'])->name('booking.eticket.pdf');

require __DIR__.'/auth.php';

Route::middleware(['auth', 'admin.role:admin'])->prefix('admin/bookings')->group(function () {
    Route::get('/validation', [AdminBookingValidationController::class, 'index'])->name('admin.bookings.validation.index');
    Route::get('/validation/{id}', [AdminBookingValidationController::class, 'show'])->name('admin.bookings.validation.show');
    Route::post('/validation/{id}/approve', [AdminBookingValidationController::class, 'approve'])->name('admin.bookings.validation.approve');
    Route::post('/validation/{id}/reject', [AdminBookingValidationController::class, 'reject'])->name('admin.bookings.validation.reject');
    Route::post('/{id}/issue-ticket', [AdminTicketController::class, 'issue'])->name('admin.bookings.issue-ticket');
});

Route::middleware(['auth', 'admin.role:admin'])->group(function () {
    Route::get('/departures/{id}/surat-jalan/pdf', [PdfDocumentController::class, 'suratJalan'])->name('departures.surat-jalan.pdf');

    Route::prefix('admin/drivers')->group(function () {
        Route::get('/', [AdminDriverController::class, 'index'])->name('admin.drivers.index');
        Route::get('/create', [AdminDriverController::class, 'create'])->name('admin.drivers.create');
        Route::post('/', [AdminDriverController::class, 'store'])->name('admin.drivers.store');
        Route::get('/{id}/edit', [AdminDriverController::class, 'edit'])->name('admin.drivers.edit');
        Route::put('/{id}', [AdminDriverController::class, 'update'])->name('admin.drivers.update');
        Route::delete('/{id}', [AdminDriverController::class, 'destroy'])->name('admin.drivers.destroy');
    });

    Route::prefix('admin/vehicles')->group(function () {
        Route::get('/', [AdminVehicleController::class, 'index'])->name('admin.vehicles.index');
        Route::get('/create', [AdminVehicleController::class, 'create'])->name('admin.vehicles.create');
        Route::post('/', [AdminVehicleController::class, 'store'])->name('admin.vehicles.store');
        Route::get('/{id}/edit', [AdminVehicleController::class, 'edit'])->name('admin.vehicles.edit');
        Route::put('/{id}', [AdminVehicleController::class, 'update'])->name('admin.vehicles.update');
        Route::delete('/{id}', [AdminVehicleController::class, 'destroy'])->name('admin.vehicles.destroy');
    });

    Route::prefix('admin/departures')->group(function () {
        Route::get('/', [AdminDepartureController::class, 'index'])->name('admin.departures.index');
        Route::get('/create', [AdminDepartureController::class, 'create'])->name('admin.departures.create');
        Route::post('/', [AdminDepartureController::class, 'store'])->name('admin.departures.store');
        Route::get('/{id}', [AdminDepartureController::class, 'show'])->name('admin.departures.show');
        Route::post('/{id}/assign-booking', [AdminDepartureController::class, 'assignBooking'])->name('admin.departures.assign-booking');
        Route::post('/{id}/remove-booking/{bookingId}', [AdminDepartureController::class, 'removeBooking'])->name('admin.departures.remove-booking');
    });

    Route::post('/admin/passengers/{id}/checkin', [AdminPassengerCheckinController::class, 'checkin'])->name('admin.passengers.checkin');
    Route::post('/admin/passengers/{id}/no-show', [AdminPassengerCheckinController::class, 'noShow'])->name('admin.passengers.no-show');
    Route::post('/admin/passengers/{id}/reset-checkin', [AdminPassengerCheckinController::class, 'reset'])->name('admin.passengers.reset-checkin');
});

Route::prefix('dashboard')->group(function () {
    Route::get('/', [DashboardPageController::class, 'index'])->name('dashboard');
    Route::get('/admin-users', [AdminUserPageController::class, 'index'])->name('admin-users.index');
    Route::get('/drivers', [DriverPageController::class, 'index'])->name('drivers.index');
    Route::get('/mobil', [MobilPageController::class, 'index'])->name('mobil.index');
    Route::get('/keberangkatan', [KeberangkatanPageController::class, 'index'])->name('keberangkatan.index');
    Route::get('/stock', [StockPageController::class, 'index'])->name('stock.index');
});
