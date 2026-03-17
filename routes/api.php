<?php

use App\Http\Controllers\Api\AdminUserController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\TicketBackupController;
use App\Http\Controllers\Api\PassengerLktController;
use App\Http\Controllers\Api\DriverController;
use App\Http\Controllers\Api\ExportController;
use App\Http\Controllers\Api\KeberangkatanController;
use App\Http\Controllers\Api\MobilController;
use App\Http\Controllers\Api\QrScanController;
use App\Http\Controllers\Api\RootController;
use App\Http\Controllers\Api\StockController;
use App\Http\Controllers\Api\StatisticsController;
use Illuminate\Support\Facades\Route;

Route::get('/', RootController::class)->name('api.root');

Route::middleware(['web', 'jwt.auth'])->group(function () {
    Route::post('/scan-qr', [QrScanController::class, 'scan'])->name('api.scan-qr');

    Route::middleware('admin.role:admin')->group(function () {
        // ── Customers ──────────────────────────────────────────────────────────
        // PERHATIAN: route statis (/search, /duplicates) harus dideklarasikan
        // SEBELUM route dengan parameter ({customer}) agar tidak bertabrakan.
        Route::get('/customers/search', [CustomerController::class, 'search'])->name('api.customers.search');
        Route::get('/customers/duplicates', [CustomerController::class, 'duplicates'])->name('api.customers.duplicates');
        Route::get('/customers', [CustomerController::class, 'index'])->name('api.customers.index');
        Route::get('/customers/{customer}', [CustomerController::class, 'show'])->name('api.customers.show');
        Route::get('/customers/{customer}/merge-preview', [CustomerController::class, 'mergePreview'])->name('api.customers.merge-preview');
        Route::post('/customers/{customer}/merge', [CustomerController::class, 'merge'])->name('api.customers.merge');

        // ── Bookings ───────────────────────────────────────────────────────────
        Route::get('/bookings', [BookingController::class, 'index'])->name('api.bookings.index');
        Route::post('/bookings', [BookingController::class, 'store'])->name('api.bookings.store');
        Route::get('/bookings/count', [BookingController::class, 'count'])->name('api.bookings.count');
        Route::get('/bookings/occupied-seats', [BookingController::class, 'occupiedSeats'])->name('api.bookings.occupied-seats');
        Route::get('/bookings/armada-extras', [BookingController::class, 'armadaExtras'])->name('api.bookings.armada-extras');
        Route::post('/bookings/armada-extras', [BookingController::class, 'upsertArmadaExtra'])->name('api.bookings.armada-extras.upsert');
        Route::patch('/bookings/slot-assign', [BookingController::class, 'slotAssign'])->name('api.bookings.slot-assign');
        Route::post('/bookings/quick-package', [BookingController::class, 'quickPackageStore'])->name('api.bookings.quick-package');
        Route::patch('/bookings/{booking}/validate-payment', [BookingController::class, 'validatePayment'])->name('api.bookings.validate-payment');
        Route::patch('/bookings/{booking}/departure-status', [BookingController::class, 'updateDepartureStatus'])->name('api.bookings.departure-status');
        Route::get('/bookings/{booking}/surat-bukti', [BookingController::class, 'downloadPackageInvoiceById'])->name('api.bookings.surat-bukti');
        Route::get('/bookings/{booking}', [BookingController::class, 'show'])->name('api.bookings.show');
        Route::put('/bookings/{booking}', [BookingController::class, 'update'])->name('api.bookings.update');
        Route::delete('/bookings/{booking}', [BookingController::class, 'destroy'])->name('api.bookings.destroy');

        // ── Ticket Backups ─────────────────────────────────────────────────────
        // PERHATIAN: route statis (latest/download) harus sebelum route {backup}
        Route::get('/bookings/{booking}/ticket-backups', [TicketBackupController::class, 'index'])->name('api.ticket-backups.index');
        Route::post('/bookings/{booking}/ticket-backups', [TicketBackupController::class, 'store'])->name('api.ticket-backups.store');
        Route::get('/bookings/{booking}/ticket-backups/latest/download', [TicketBackupController::class, 'downloadLatest'])->name('api.ticket-backups.latest.download');
        Route::get('/bookings/{booking}/ticket-backups/{backup}/download', [TicketBackupController::class, 'download'])->name('api.ticket-backups.download');
        Route::get('/bookings/{booking}/ticket-backups/{backup}/verify', [TicketBackupController::class, 'verify'])->name('api.ticket-backups.verify');
        Route::get('/admin-users', [AdminUserController::class, 'index'])->name('api.admin-users.index');
        Route::post('/admin-users', [AdminUserController::class, 'store'])->name('api.admin-users.store');
        Route::get('/admin-users/count', [AdminUserController::class, 'count'])->name('api.admin-users.count');
        Route::get('/admin-users/{adminUser}', [AdminUserController::class, 'show'])->name('api.admin-users.show');
        Route::put('/admin-users/{adminUser}', [AdminUserController::class, 'update'])->name('api.admin-users.update');
        Route::delete('/admin-users/{adminUser}', [AdminUserController::class, 'destroy'])->name('api.admin-users.destroy');
    });

    Route::get('/drivers', [DriverController::class, 'index'])->name('api.drivers.index');
    Route::post('/drivers', [DriverController::class, 'store'])->name('api.drivers.store');
    Route::get('/drivers/all', [DriverController::class, 'all'])->name('api.drivers.all');
    Route::get('/drivers/count', [DriverController::class, 'count'])->name('api.drivers.count');
    Route::get('/drivers/{driver}', [DriverController::class, 'show'])->name('api.drivers.show');
    Route::put('/drivers/{driver}', [DriverController::class, 'update'])->name('api.drivers.update');
    Route::delete('/drivers/{driver}', [DriverController::class, 'destroy'])->name('api.drivers.destroy');

    Route::get('/mobil', [MobilController::class, 'index'])->name('api.mobil.index');
    Route::post('/mobil', [MobilController::class, 'store'])->name('api.mobil.store');
    Route::get('/mobil/all', [MobilController::class, 'all'])->name('api.mobil.all');
    Route::get('/mobil/count', [MobilController::class, 'count'])->name('api.mobil.count');
    Route::get('/mobil/{mobil}', [MobilController::class, 'show'])->name('api.mobil.show');
    Route::put('/mobil/{mobil}', [MobilController::class, 'update'])->name('api.mobil.update');
    Route::delete('/mobil/{mobil}', [MobilController::class, 'destroy'])->name('api.mobil.destroy');

    Route::get('/keberangkatan', [KeberangkatanController::class, 'index'])->name('api.keberangkatan.index');
    Route::post('/keberangkatan', [KeberangkatanController::class, 'store'])->name('api.keberangkatan.store');
    Route::get('/keberangkatan/count', [KeberangkatanController::class, 'count'])->name('api.keberangkatan.count');
    Route::get('/keberangkatan/{keberangkatan}', [KeberangkatanController::class, 'show'])->name('api.keberangkatan.show');
    Route::put('/keberangkatan/{keberangkatan}', [KeberangkatanController::class, 'update'])->name('api.keberangkatan.update');
    Route::delete('/keberangkatan/{keberangkatan}', [KeberangkatanController::class, 'destroy'])->name('api.keberangkatan.destroy');

    Route::get('/stock', [StockController::class, 'index'])->name('api.stock.index');
    Route::post('/stock', [StockController::class, 'store'])->name('api.stock.store');
    Route::get('/stock/count', [StockController::class, 'count'])->name('api.stock.count');
    Route::get('/stock/{stock}', [StockController::class, 'show'])->name('api.stock.show');
    Route::put('/stock/{stock}', [StockController::class, 'update'])->name('api.stock.update');
    Route::delete('/stock/{stock}', [StockController::class, 'destroy'])->name('api.stock.destroy');

    Route::get('/passengers-lkt', [PassengerLktController::class, 'index'])->name('api.passengers-lkt.index');
    Route::get('/passengers-lkt/count', [PassengerLktController::class, 'count'])->name('api.passengers-lkt.count');
    Route::get('/passengers-lkt/loyalty-chart', [PassengerLktController::class, 'loyaltyChart'])->name('api.passengers-lkt.loyalty-chart');
    Route::get('/passengers-lkt/{id}', [PassengerLktController::class, 'show'])->name('api.passengers-lkt.show');
    Route::put('/passengers-lkt/{id}', [PassengerLktController::class, 'update'])->name('api.passengers-lkt.update');
    Route::delete('/passengers-lkt/{id}', [PassengerLktController::class, 'destroy'])->name('api.passengers-lkt.destroy');

    Route::get('/statistics/dashboard', [StatisticsController::class, 'dashboard'])->name('api.statistics.dashboard');
    Route::get('/statistics/revenue-chart', [StatisticsController::class, 'revenueChart'])->name('api.statistics.revenue-chart');
    Route::get('/statistics/mobil-revenue', [StatisticsController::class, 'mobilRevenue'])->name('api.statistics.mobil-revenue');

    Route::get('/export/keberangkatan/csv', [ExportController::class, 'keberangkatanCsv'])->name('api.export.keberangkatan');
    Route::get('/export/drivers/csv', [ExportController::class, 'driversCsv'])->name('api.export.drivers');
    Route::get('/export/mobil/csv', [ExportController::class, 'mobilCsv'])->name('api.export.mobil');
});
