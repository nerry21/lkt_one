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
use App\Http\Controllers\RentalBookings\RentalBookingPageController;
use App\Http\Controllers\RegularBookings\RegularBookingPageController;
use App\Http\Controllers\Stock\StockPageController;
use App\Http\Controllers\Survey\PublicSurveyController;
use App\Http\Controllers\Survey\CustomerSurveyDashboardController;
use App\Http\Controllers\DroppingData\DroppingBookingDataPageController;
use App\Http\Controllers\RentalData\RentalDataPageController;
use App\Http\Controllers\PublicDownloadController;
use Illuminate\Support\Facades\Route;

// ── Public PDF Downloads (no auth, use booking_code) ──────────────────────
Route::get('/unduh/sj/{code}', [PublicDownloadController::class, 'suratJalan'])->name('dl.surat-jalan');
Route::get('/unduh/tiket/{code}', [PublicDownloadController::class, 'tiketDropping'])->name('dl.tiket-dropping');
Route::get('/unduh/tiket-reguler/{code}', [PublicDownloadController::class, 'tiketReguler'])->name('dl.tiket-reguler');

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
    Route::get('/bookings/{booking}/ticket/download/{passengerId}', [BookingPageController::class, 'downloadSingleTicket'])->name('bookings.ticket.download.single');
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

    Route::get('/rental-bookings', [RentalBookingPageController::class, 'index'])->name('rental-bookings.index');
    Route::post('/rental-bookings/information', [RentalBookingPageController::class, 'storeInformation'])->name('rental-bookings.information.store');
    Route::get('/rental-bookings/passengers', [RentalBookingPageController::class, 'passengers'])->name('rental-bookings.passengers');
    Route::post('/rental-bookings/passengers', [RentalBookingPageController::class, 'storePassengers'])->name('rental-bookings.passengers.store');
    Route::get('/rental-bookings/review', [RentalBookingPageController::class, 'review'])->name('rental-bookings.review');
    Route::post('/rental-bookings/review', [RentalBookingPageController::class, 'storeReview'])->name('rental-bookings.review.store');
    Route::get('/rental-bookings/payment', [RentalBookingPageController::class, 'payment'])->name('rental-bookings.payment');
    Route::post('/rental-bookings/payment', [RentalBookingPageController::class, 'storePayment'])->name('rental-bookings.payment.store');
    Route::get('/rental-bookings/invoice', [RentalBookingPageController::class, 'invoice'])->name('rental-bookings.invoice');
    Route::get('/rental-bookings/invoice/download', [RentalBookingPageController::class, 'downloadInvoice'])->name('rental-bookings.invoice.download');
    Route::get('/rental-bookings/e-ticket', [RentalBookingPageController::class, 'ticket'])->name('rental-bookings.ticket');
    Route::get('/rental-bookings/e-ticket/download', [RentalBookingPageController::class, 'downloadTicket'])->name('rental-bookings.ticket.download');
    Route::get('/dropping-data', [DroppingBookingDataPageController::class, 'index'])->name('dropping-data.index');
    Route::post('/dropping-data', [DroppingBookingDataPageController::class, 'store'])->name('dropping-data.store');
    Route::put('/dropping-data/{booking}', [DroppingBookingDataPageController::class, 'update'])->name('dropping-data.update');
    Route::delete('/dropping-data/{booking}', [DroppingBookingDataPageController::class, 'destroy'])->name('dropping-data.destroy');
    Route::get('/dropping-data/{booking}/ticket', [DroppingBookingDataPageController::class, 'showTicket'])->name('dropping-data.ticket');
    Route::get('/dropping-data/{booking}/ticket/download', [DroppingBookingDataPageController::class, 'downloadTicket'])->name('dropping-data.ticket.download');
    Route::get('/dropping-data/{booking}/surat-jalan', [DroppingBookingDataPageController::class, 'downloadSuratJalan'])->name('dropping-data.surat-jalan');
    Route::get('/rental-data', [RentalDataPageController::class, 'index'])->name('rental-data.index');
    Route::post('/rental-data', [RentalDataPageController::class, 'store'])->name('rental-data.store');
    Route::put('/rental-data/{booking}', [RentalDataPageController::class, 'update'])->name('rental-data.update');
    Route::delete('/rental-data/{booking}', [RentalDataPageController::class, 'destroy'])->name('rental-data.destroy');
    Route::get('/rental-data/{booking}/ticket/download', [RentalDataPageController::class, 'downloadTicket'])->name('rental-data.ticket.download');
    Route::get('/rental-data/{booking}/surat-jalan', [RentalDataPageController::class, 'downloadSuratJalan'])->name('rental-data.surat-jalan');

    // Trip Planning — Fase D Sesi 21 (DailyDriverAssignment CRUD foundation).
    Route::middleware(['jwt.auth', 'admin.role:admin'])->prefix('trip-planning')->group(function () {
        Route::get('/assignments', [\App\Http\Controllers\TripPlanning\DailyDriverAssignmentPageController::class, 'index'])
            ->name('trip-planning.assignments.index');
        Route::put('/assignments', [\App\Http\Controllers\TripPlanning\DailyDriverAssignmentPageController::class, 'upsert'])
            ->name('trip-planning.assignments.upsert');

        // Trip Planning — Fase D Sesi 22 (dashboard read endpoints + manual generate).
        Route::get('/dashboard', [\App\Http\Controllers\TripPlanning\TripPlanningPageController::class, 'dashboard'])
            ->name('trip-planning.dashboard');
        Route::get('/trips', [\App\Http\Controllers\TripPlanning\TripPlanningPageController::class, 'trips'])
            ->name('trip-planning.trips');
        Route::post('/generate', [\App\Http\Controllers\TripPlanning\TripPlanningPageController::class, 'generate'])
            ->name('trip-planning.generate');

        // Trip Planning — Fase D Sesi 23 (7 PATCH action endpoints).
        Route::patch('/trips/{trip}/berangkat', [\App\Http\Controllers\TripPlanning\TripPlanningPageController::class, 'markBerangkat'])
            ->name('trip-planning.trips.berangkat');
        Route::patch('/trips/{trip}/tidak-berangkat', [\App\Http\Controllers\TripPlanning\TripPlanningPageController::class, 'markTidakBerangkat'])
            ->name('trip-planning.trips.tidak-berangkat');
        Route::patch('/trips/{trip}/keluar-trip', [\App\Http\Controllers\TripPlanning\TripPlanningPageController::class, 'markKeluarTrip'])
            ->name('trip-planning.trips.keluar-trip');
        Route::patch('/trips/{trip}/waiting-list', [\App\Http\Controllers\TripPlanning\TripPlanningPageController::class, 'markWaitingList'])
            ->name('trip-planning.trips.waiting-list');
        Route::patch('/trips/{trip}/returning', [\App\Http\Controllers\TripPlanning\TripPlanningPageController::class, 'markReturning'])
            ->name('trip-planning.trips.returning');
        Route::patch('/trips/{trip}/tidak-keluar-trip', [\App\Http\Controllers\TripPlanning\TripPlanningPageController::class, 'markTidakKeluarTrip'])
            ->name('trip-planning.trips.tidak-keluar-trip');
        Route::patch('/trips/{trip}/ganti-jam', [\App\Http\Controllers\TripPlanning\TripPlanningPageController::class, 'gantiJam'])
            ->name('trip-planning.trips.ganti-jam');
    });
});
