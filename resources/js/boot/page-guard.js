import { fetchCurrentUser, getCachedUser } from '../services/auth';
import { clearSession, getStoredToken } from '../services/session';

function redirect(url) {
    window.location.replace(url);
}

export async function enforceRouteGuard() {
    const mode = document.body.dataset.routeGuard || 'none';
    const loginUrl = document.body.dataset.loginUrl || '/login';
    const dashboardUrl = document.body.dataset.dashboardUrl || '/dashboard';
    const cachedUser = getCachedUser();

    if (mode === 'public') {
        try {
            const user = await fetchCurrentUser();
            redirect(dashboardUrl);
            return { user };
        } catch (error) {
            if (cachedUser || getStoredToken()) {
                clearSession();
            }
        }

        return { user: null };
    }

    if (mode === 'protected') {
        try {
            const user = await fetchCurrentUser();
            return { user };
        } catch (error) {
            clearSession();
            redirect(loginUrl);
            return { user: null };
        }
    }

    return { user: cachedUser };
}

export function finishRouteGuard() {
    return undefined;
}
