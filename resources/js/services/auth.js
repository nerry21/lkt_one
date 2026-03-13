import { apiRequest } from './http';
import { clearSession, getStoredUser, setPendingToast, setStoredToken, setStoredUser } from './session';

function syncText(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}

function syncRoleScopedElements(user) {
    const role = user?.role || '';

    document.querySelectorAll('[data-role-scope]').forEach((element) => {
        const scope = element.dataset.roleScope;
        const canView = scope === 'admin'
            ? ['Super Admin', 'Admin'].includes(role)
            : scope === 'super'
                ? role === 'Super Admin'
                : true;

        element.hidden = !canView;
    });
}

export function getCachedUser() {
    return getStoredUser();
}

export function applyUserIdentity(user) {
    syncRoleScopedElements(user);

    if (!user) {
        return;
    }

    const name = user.nama || 'Admin';
    const shortName = name.trim().split(/\s+/)[0] || 'Admin';
    const email = user.email || 'admin@pekanbaru.com';

    syncText('sidebar-user-name', name);
    syncText('sidebar-user-email', email);
    syncText('header-user-name', shortName);
    syncText('dropdown-user-name', name);
    syncText('dropdown-user-email', email);
}

function persistSession(payload) {
    if (typeof payload.access_token === 'string' && payload.access_token !== '') {
        setStoredToken(payload.access_token);
    }

    setStoredUser(payload.user);
    applyUserIdentity(payload.user);
    return payload;
}

export async function login(credentials) {
    const payload = await apiRequest('/auth/login', {
        method: 'POST',
        body: credentials,
        auth: false,
    });

    return persistSession(payload);
}

export async function register(data) {
    const payload = await apiRequest('/auth/register', {
        method: 'POST',
        body: data,
        auth: false,
    });

    return persistSession(payload);
}

export async function fetchCurrentUser() {
    const user = await apiRequest('/auth/me');
    setStoredUser(user);
    applyUserIdentity(user);
    return user;
}

export async function logout() {
    try {
        await apiRequest('/auth/logout', {
            method: 'POST',
        });
    } catch (error) {
        if (error?.status !== 401) {
            throw error;
        }
    }

    clearSession();
    setPendingToast({
        type: 'success',
        title: 'Logout berhasil',
        message: 'Sampai jumpa kembali!',
    });
    window.location.replace(document.body.dataset.loginUrl || '/login');
}
