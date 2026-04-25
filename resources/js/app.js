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
import initAdminUsersPage from './pages/admin-users/index';
import initBookingsPage from './pages/bookings/index';
import initRegularBookingsPage from './pages/regular-bookings/index';
import initRegularBookingSeatsPage from './pages/regular-bookings/seats';
import initQrScanPage from './pages/qr-scan/index';
import initPassengerLktPage from './pages/passengers-lkt/index';
import initCustomersPage from './pages/customers/index';
import initDroppingBookingsPage from './pages/dropping-bookings/index';
import initDroppingDataPage from './pages/dropping-data/index';
import initTripPlanningDashboardPage from './pages/trip-planning/dashboard';
import initAssignmentsPage from './pages/trip-planning/assignments';
import initKeuanganJetSiklusDetailPage from './pages/keuangan-jet/siklus-detail';

const pageModules = {
    'admin-users/index': initAdminUsersPage,
    'auth/login': initAuthPage,
    'bookings/index': initBookingsPage,
    'dashboard/index': initDashboardPage,
    'drivers/index': initDriversPage,
    'mobil/index': initMobilPage,
    'regular-bookings/index': initRegularBookingsPage,
    'regular-bookings/seats': initRegularBookingSeatsPage,
    'qr-scan/index': initQrScanPage,
    'passengers-lkt/index': initPassengerLktPage,
    'customers/index': initCustomersPage,
    'dropping-bookings/index': initDroppingBookingsPage,
    'dropping-data/index': initDroppingDataPage,
    'trip-planning/dashboard': initTripPlanningDashboardPage,
    'trip-planning/assignments': initAssignmentsPage,
    'keuangan-jet/siklus-detail': initKeuanganJetSiklusDetailPage,
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
