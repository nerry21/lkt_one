import './bootstrap';
import { enforceRouteGuard, finishRouteGuard } from './boot/page-guard';
import { applyUserIdentity, getCachedUser } from './services/auth';
import { initDashboardShell } from './layouts/dashboard-shell';
import { consumePendingToast } from './services/session';
import { toastError, toastSuccess, toastInfo } from './ui/toast';
import { setupModalBindings } from './ui/modal';

import initAuthPage from './pages/auth/login';
import initDashboardPage from './pages/dashboard/index';
import initDriversPage from './pages/drivers/index';
import initMobilPage from './pages/mobil/index';
import initKeberangkatanPage from './pages/keberangkatan/index';
import initStockPage from './pages/stock/index';
import initAdminUsersPage from './pages/admin-users/index';
import initBookingsPage from './pages/bookings/index';
import initRegularBookingsPage from './pages/regular-bookings/index';
import initRegularBookingSeatsPage from './pages/regular-bookings/seats';
import initQrScanPage from './pages/qr-scan/index';
import initPassengerLktPage from './pages/passengers-lkt/index';
import initCustomersPage from './pages/customers/index';

const pageModules = {
    'admin-users/index': initAdminUsersPage,
    'auth/login': initAuthPage,
    'bookings/index': initBookingsPage,
    'dashboard/index': initDashboardPage,
    'drivers/index': initDriversPage,
    'mobil/index': initMobilPage,
    'keberangkatan/index': initKeberangkatanPage,
    'regular-bookings/index': initRegularBookingsPage,
    'regular-bookings/seats': initRegularBookingSeatsPage,
    'stock/index': initStockPage,
    'qr-scan/index': initQrScanPage,
    'passengers-lkt/index': initPassengerLktPage,
    'customers/index': initCustomersPage,
};

document.addEventListener('DOMContentLoaded', async () => {
    setupModalBindings();
    initDashboardShell();
    applyUserIdentity(getCachedUser());

    const pendingToast = consumePendingToast();

    if (pendingToast) {
        if (pendingToast.type === 'success') {
            toastSuccess(pendingToast.message, pendingToast.title);
        } else if (pendingToast.type === 'info') {
            toastInfo(pendingToast.message, pendingToast.title);
        } else {
            toastError(pendingToast.message, pendingToast.title);
        }
    }

    try {
        const { user } = await enforceRouteGuard();

        if (user) {
            applyUserIdentity(user);
        }

        const pageScript = document.body.dataset.pageScript;
        const initPage = pageModules[pageScript];

        if (typeof initPage === 'function') {
            await initPage({ user });
        }
    } catch (error) {
        console.error(error);
        toastError(error.message || 'Terjadi kesalahan saat memuat halaman');
    } finally {
        finishRouteGuard();
    }
});
