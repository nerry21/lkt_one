<?php

use App\Http\Controllers\Api\AdminUserController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\TicketBackupController;
use App\Http\Controllers\Api\PassengerLktController;
use App\Http\Controllers\Api\DriverController;
use App\Http\Controllers\Api\ExportController;
use App\Http\Controllers\Api\MobilController;
use App\Http\Controllers\Api\QrScanController;
use App\Http\Controllers\Api\RootController;
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
        Route::put('/bookings/quick-package/{booking}', [BookingController::class, 'quickPackageUpdate'])->name('api.bookings.quick-package.update');
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

        // ── Trip Planning API — Fase E2 Sesi 26 ───────────────────────────────
        // Mirror dari routes/web.php trip-planning group supaya dashboard Blade UI
        // bisa consume via apiRequest() (prefix /api/). Same controller methods
        // re-used (thin controller, business logic di service).
        Route::prefix('trip-planning')->group(function () {
            Route::get('/dashboard', [\App\Http\Controllers\TripPlanning\TripPlanningPageController::class, 'dashboard'])
                ->name('api.trip-planning.dashboard');

            Route::patch('/trips/{trip}/berangkat', [\App\Http\Controllers\TripPlanning\TripPlanningPageController::class, 'markBerangkat'])
                ->name('api.trip-planning.trips.berangkat');
            Route::patch('/trips/{trip}/tidak-berangkat', [\App\Http\Controllers\TripPlanning\TripPlanningPageController::class, 'markTidakBerangkat'])
                ->name('api.trip-planning.trips.tidak-berangkat');
            Route::patch('/trips/{trip}/keluar-trip', [\App\Http\Controllers\TripPlanning\TripPlanningPageController::class, 'markKeluarTrip'])
                ->name('api.trip-planning.trips.keluar-trip');
            Route::patch('/trips/{trip}/waiting-list', [\App\Http\Controllers\TripPlanning\TripPlanningPageController::class, 'markWaitingList'])
                ->name('api.trip-planning.trips.waiting-list');
            Route::patch('/trips/{trip}/returning', [\App\Http\Controllers\TripPlanning\TripPlanningPageController::class, 'markReturning'])
                ->name('api.trip-planning.trips.returning');
            Route::patch('/trips/{trip}/tidak-keluar-trip', [\App\Http\Controllers\TripPlanning\TripPlanningPageController::class, 'markTidakKeluarTrip'])
                ->name('api.trip-planning.trips.tidak-keluar-trip');
            Route::patch('/trips/{trip}/ganti-jam', [\App\Http\Controllers\TripPlanning\TripPlanningPageController::class, 'gantiJam'])
                ->name('api.trip-planning.trips.ganti-jam');

            // E4: read trips list + generate + assignments CRUD.
            Route::get('/trips', [\App\Http\Controllers\TripPlanning\TripPlanningPageController::class, 'trips'])
                ->name('api.trip-planning.trips');
            Route::post('/generate', [\App\Http\Controllers\TripPlanning\TripPlanningPageController::class, 'generate'])
                ->name('api.trip-planning.generate');
            Route::get('/assignments', [\App\Http\Controllers\TripPlanning\DailyDriverAssignmentPageController::class, 'index'])
                ->name('api.trip-planning.assignments.index');
            Route::put('/assignments', [\App\Http\Controllers\TripPlanning\DailyDriverAssignmentPageController::class, 'upsert'])
                ->name('api.trip-planning.assignments.upsert');

            // E5: same-day return mirror route.
            Route::post('/trips/{trip}/same-day-return', [\App\Http\Controllers\TripPlanning\TripPlanningPageController::class, 'createSameDayReturn'])
                ->name('api.trip-planning.trips.same-day-return');

            // E5: Trip Manual CRUD endpoints
            Route::post('/trips', [\App\Http\Controllers\TripPlanning\TripCrudController::class, 'store'])
                ->name('api.trip-planning.trips.store');
            Route::put('/trips/{trip}', [\App\Http\Controllers\TripPlanning\TripCrudController::class, 'update'])
                ->name('api.trip-planning.trips.update');
            Route::delete('/trips/{trip}', [\App\Http\Controllers\TripPlanning\TripCrudController::class, 'destroy'])
                ->name('api.trip-planning.trips.destroy');
            Route::get('/trips/{trip}/bookings-count', [\App\Http\Controllers\TripPlanning\TripCrudController::class, 'bookingsCount'])
                ->name('api.trip-planning.trips.bookings-count');

            // E5 PR #5: Reset Trip Data endpoints.
            // resetToday: parent group sudah admin.role:admin (Admin + Super Admin lolos).
            // resetAll: chain middleware admin.role:super (Super Admin only).
            Route::post('/reset/today', [\App\Http\Controllers\TripPlanning\ResetTripDataController::class, 'resetToday'])
                ->name('api.trip-planning.reset.today');
            Route::post('/reset/all', [\App\Http\Controllers\TripPlanning\ResetTripDataController::class, 'resetAll'])
                ->middleware('admin.role:super')
                ->name('api.trip-planning.reset.all');
        });
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

    Route::get('/passengers-lkt', [PassengerLktController::class, 'index'])->name('api.passengers-lkt.index');
    Route::get('/passengers-lkt/count', [PassengerLktController::class, 'count'])->name('api.passengers-lkt.count');
    Route::get('/passengers-lkt/loyalty-chart', [PassengerLktController::class, 'loyaltyChart'])->name('api.passengers-lkt.loyalty-chart');
    Route::get('/passengers-lkt/{id}', [PassengerLktController::class, 'show'])->name('api.passengers-lkt.show');
    Route::put('/passengers-lkt/{id}', [PassengerLktController::class, 'update'])->name('api.passengers-lkt.update');
    Route::delete('/passengers-lkt/{id}', [PassengerLktController::class, 'destroy'])->name('api.passengers-lkt.destroy');

    Route::get('/export/drivers/csv', [ExportController::class, 'driversCsv'])->name('api.export.drivers');
    Route::get('/export/mobil/csv', [ExportController::class, 'mobilCsv'])->name('api.export.mobil');
});

// =============================================================================
// Chatbot AI Bridge (Sesi 64 PR-CRM-6A)
// -----------------------------------------------------------------------------
// Server-to-server endpoints untuk Chatbot AI consume LKT One data.
// Auth: shared-secret X-Chatbot-Bridge-Key header.
// Tidak pakai jwt.auth karena bukan user session.
// =============================================================================
Route::middleware('chatbot.bridge')
    ->prefix('v1/chatbot-bridge')
    ->group(function () {
        Route::get('/health', [\App\Http\Controllers\Api\ChatbotBridgeController::class, 'health'])
            ->name('api.chatbot-bridge.health');

        Route::get('/customer/lookup', [\App\Http\Controllers\Api\ChatbotBridgeController::class, 'customerLookup'])
            ->name('api.chatbot-bridge.customer.lookup');

        // Sesi 67 PR-CRM-6D — read endpoints untuk Chatbot AI
        Route::get('/seat-availability', [\App\Http\Controllers\Api\ChatbotBridgeController::class, 'seatAvailability'])
            ->name('api.chatbot-bridge.seat-availability');

        Route::get('/fare', [\App\Http\Controllers\Api\ChatbotBridgeController::class, 'fareLookup'])
            ->name('api.chatbot-bridge.fare');

        Route::get('/route', [\App\Http\Controllers\Api\ChatbotBridgeController::class, 'routeList'])
            ->name('api.chatbot-bridge.route');

        Route::get('/customer/detail', [\App\Http\Controllers\Api\ChatbotBridgeController::class, 'customerDetail'])
            ->name('api.chatbot-bridge.customer.detail');

        Route::get('/departure-list', [\App\Http\Controllers\Api\ChatbotBridgeController::class, 'departureList'])
            ->name('api.chatbot-bridge.departure-list');
    });
