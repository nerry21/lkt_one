const USER_KEY = 'transit_user';
const TOKEN_KEY = 'transit_token';
const TOAST_KEY = 'transit_pending_toast';

function canUseLocalStorage() {
    try {
        return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
    } catch (error) {
        return false;
    }
}

function canUseSessionStorage() {
    try {
        return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';
    } catch (error) {
        return false;
    }
}

export function getStoredUser() {
    if (window.transitAuthUser) {
        return window.transitAuthUser;
    }

    if (!canUseLocalStorage()) {
        return null;
    }

    const raw = window.localStorage.getItem(USER_KEY);

    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw);
    } catch (error) {
        clearSession();
        return null;
    }
}

export function setStoredUser(user) {
    if (!canUseLocalStorage()) {
        window.transitAuthUser = user;
        return;
    }

    window.transitAuthUser = user;
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
    if (!canUseLocalStorage()) {
        window.transitAuthUser = null;
        return;
    }

    window.transitAuthUser = null;
    window.localStorage.removeItem(USER_KEY);
}

export function getStoredToken() {
    if (typeof window !== 'undefined' && typeof window.transitAuthToken === 'string' && window.transitAuthToken !== '') {
        return window.transitAuthToken;
    }

    if (!canUseLocalStorage()) {
        return null;
    }

    return window.localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token) {
    const normalizedToken = typeof token === 'string' ? token : '';

    if (!canUseLocalStorage()) {
        window.transitAuthToken = normalizedToken || null;
        return;
    }

    window.transitAuthToken = normalizedToken || null;

    if (normalizedToken === '') {
        window.localStorage.removeItem(TOKEN_KEY);
        document.cookie = TOKEN_KEY + '=; path=/; max-age=0; samesite=lax';
        return;
    }

    window.localStorage.setItem(TOKEN_KEY, normalizedToken);
    document.cookie = TOKEN_KEY + '=' + normalizedToken + '; path=/; max-age=86400; samesite=lax';
}

export function clearStoredToken() {
    if (!canUseLocalStorage()) {
        window.transitAuthToken = null;
        document.cookie = TOKEN_KEY + '=; path=/; max-age=0; samesite=lax';
        return;
    }

    window.transitAuthToken = null;
    window.localStorage.removeItem(TOKEN_KEY);
    document.cookie = TOKEN_KEY + '=; path=/; max-age=0; samesite=lax';
}

export function setPendingToast(toast) {
    if (!canUseSessionStorage()) {
        return;
    }

    window.sessionStorage.setItem(TOAST_KEY, JSON.stringify(toast));
}

export function consumePendingToast() {
    if (!canUseSessionStorage()) {
        return null;
    }

    const raw = window.sessionStorage.getItem(TOAST_KEY);

    if (!raw) {
        return null;
    }

    window.sessionStorage.removeItem(TOAST_KEY);

    try {
        return JSON.parse(raw);
    } catch (error) {
        return null;
    }
}

export function clearSession() {
    clearStoredUser();
    clearStoredToken();
}
