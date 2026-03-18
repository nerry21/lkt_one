<?php

use App\Http\Controllers\BuildAssetController;
use App\Http\Controllers\AdminUsers\AdminUserPageController;
use App\Http\Controllers\Bookings\BookingPageController;
use App\Http\Controllers\Customers\CustomerPageController;
use App\Http\Controllers\Passengers\PassengerLktPageController;
use App\Http\Controllers\QrScan\QrScanPageController;
use App\Http\Controllers\Dashboard\DashboardPageController;
use App\Http\Controllers\Drivers\DriverPageController;
use App\Http\Controllers\Keberangkatan\KeberangkatanPageController;
use App\Http\Controllers\Mobil\MobilPageController;
use App\Http\Controllers\PackageBookings\PackageBookingPageController;
use App\Http\Controllers\DroppingBookings\DroppingBookingPageController;
use App\Http\Controllers\RegularBookings\RegularBookingPageController;
use App\Http\Controllers\Stock\StockPageController;
use App\Http\Controllers\Survey\PublicSurveyController;
use App\Http\Controllers\Survey\CustomerSurveyDashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/survey/kepuasan-pelanggan', [PublicSurveyController::class, 'show'])->name('survey.show');
Route::post('/survey/kepuasan-pelanggan', [PublicSurveyController::class, 'store'])->name('survey.store');
Route::get('/survey/kepuasan-pelanggan/thank-you', [PublicSurveyController::class, 'thankYou'])->name('survey.thank-you');

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
    Route::get('/dropping-bookings', [DroppingBookingPageController::class, 'index'])->name('dropping-bookings.index');
    Route::post('/dropping-bookings/information', [DroppingBookingPageController::class, 'storeInformation'])->name('dropping-bookings.information.store');
    Route::get('/dropping-bookings/passengers', [DroppingBookingPageController::class, 'passengers'])->name('dropping-bookings.passengers');
    Route::post('/dropping-bookings/passengers', [DroppingBookingPageController::class, 'storePassengers'])->name('dropping-bookings.passengers.store');
    Route::get('/dropping-bookings/review', [DroppingBookingPageController::class, 'review'])->name('dropping-bookings.review');
    Route::post('/dropping-bookings/review', [DroppingBookingPageController::class, 'storeReview'])->name('dropping-bookings.review.store');
    Route::get('/dropping-bookings/payment', [DroppingBookingPageController::class, 'payment'])->name('dropping-bookings.payment');
    Route::post('/dropping-bookings/payment', [DroppingBookingPageController::class, 'storePayment'])->name('dropping-bookings.payment.store');
    Route::get('/dropping-bookings/invoice', [DroppingBookingPageController::class, 'invoice'])->name('dropping-bookings.invoice');
    Route::get('/dropping-bookings/invoice/download', [DroppingBookingPageController::class, 'downloadInvoice'])->name('dropping-bookings.invoice.download');
    Route::get('/dropping-bookings/e-ticket', [DroppingBookingPageController::class, 'ticket'])->name('dropping-bookings.ticket');
    Route::get('/dropping-bookings/e-ticket/download', [DroppingBookingPageController::class, 'downloadTicket'])->name('dropping-bookings.ticket.download');
    Route::get('/package-bookings', [PackageBookingPageController::class, 'index'])->name('package-bookings.index');
    Route::post('/package-bookings/information', [PackageBookingPageController::class, 'storeInformation'])->name('package-bookings.information.store');
    Route::get('/package-bookings/package', [PackageBookingPageController::class, 'package'])->name('package-bookings.package');
    Route::post('/package-bookings/package', [PackageBookingPageController::class, 'storePackage'])->name('package-bookings.package.store');
    Route::get('/package-bookings/review', [PackageBookingPageController::class, 'review'])->name('package-bookings.review');
    Route::post('/package-bookings/review', [PackageBookingPageController::class, 'storeReview'])->name('package-bookings.review.store');
    Route::get('/package-bookings/payment', [PackageBookingPageController::class, 'payment'])->name('package-bookings.payment');
    Route::post('/package-bookings/payment', [PackageBookingPageController::class, 'storePayment'])->name('package-bookings.payment.store');
    Route::get('/package-bookings/invoice', [PackageBookingPageController::class, 'invoice'])->name('package-bookings.invoice');
    Route::get('/package-bookings/invoice/download', [PackageBookingPageController::class, 'downloadInvoice'])->name('package-bookings.invoice.download');
    Route::get('/bookings', [BookingPageController::class, 'index'])->name('bookings.index');
    Route::get('/bookings/surat-jalan', [BookingPageController::class, 'suratJalan'])->name('bookings.surat-jalan');
    Route::get('/bookings/{booking}/surat-bukti', [BookingPageController::class, 'downloadSuratBukti'])->name('bookings.surat-bukti');
    Route::middleware(['jwt.auth', 'admin.role:admin'])->group(function () {
        Route::get('/bookings/{booking}', [BookingPageController::class, 'show'])->name('bookings.show');
    });
    Route::get('/bookings/{booking}/ticket', [BookingPageController::class, 'ticket'])->name('bookings.ticket');
    Route::get('/bookings/{booking}/ticket/download', [BookingPageController::class, 'downloadTicket'])->name('bookings.ticket.download');
    Route::get('/admin-users', [AdminUserPageController::class, 'index'])->name('admin-users.index');
    Route::get('/drivers', [DriverPageController::class, 'index'])->name('drivers.index');
    Route::get('/mobil', [MobilPageController::class, 'index'])->name('mobil.index');
    Route::get('/keberangkatan', [KeberangkatanPageController::class, 'index'])->name('keberangkatan.index');
    Route::get('/stock', [StockPageController::class, 'index'])->name('stock.index');
    Route::get('/scan-qr', [QrScanPageController::class, 'index'])->name('scan-qr.index');
    Route::get('/passengers-lkt', [PassengerLktPageController::class, 'index'])->name('passengers-lkt.index');
    Route::get('/customers', [CustomerPageController::class, 'index'])->name('customers.index');
    Route::get('/customer-surveys', [CustomerSurveyDashboardController::class, 'index'])->name('customer-surveys.index');
    Route::get('/customer-surveys/{customerSurvey}', [CustomerSurveyDashboardController::class, 'show'])->name('customer-surveys.show');
    Route::patch('/customer-surveys/{customerSurvey}', [CustomerSurveyDashboardController::class, 'update'])->name('customer-surveys.update');
    Route::delete('/customer-surveys/{customerSurvey}', [CustomerSurveyDashboardController::class, 'destroy'])->name('customer-surveys.destroy');
});
