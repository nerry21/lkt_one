import { clearSession, getStoredToken } from './session';

function extractErrorMessage(data, fallback) {
    if (!data) {
        return fallback;
    }

    if (typeof data.detail === 'string' && data.detail !== '') {
        return data.detail;
    }

    if (typeof data.message === 'string' && data.message !== '') {
        return data.message;
    }

    if (data.errors && typeof data.errors === 'object') {
        const firstError = Object.values(data.errors).flat()[0];

        if (typeof firstError === 'string' && firstError !== '') {
            return firstError;
        }
    }

    return fallback;
}

export function getApiBase() {
    return document.body.dataset.apiBase || '/api';
}

export function apiUrl(path = '') {
    const trimmedPath = String(path).replace(/^\/+/, '');
    return trimmedPath === '' ? getApiBase() : `${getApiBase()}/${trimmedPath}`;
}

export async function apiRequest(path, options = {}) {
    const {
        method = 'GET',
        body = null,
        headers = {},
        auth = true,
    } = options;

    const requestHeaders = new Headers(headers);
    requestHeaders.set('Accept', 'application/json');
    requestHeaders.set('X-Requested-With', 'XMLHttpRequest');

    let requestBody = body;

    if (body && !(body instanceof FormData) && !(body instanceof Blob)) {
        requestHeaders.set('Content-Type', 'application/json');
        requestBody = JSON.stringify(body);
    }

    if (auth) {
        const token = getStoredToken();

        if (token) {
            requestHeaders.set('Authorization', `Bearer ${token}`);
        }
    }

    if (!['GET', 'HEAD', 'OPTIONS'].includes(method.toUpperCase())) {
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        if (csrfToken) {
            requestHeaders.set('X-CSRF-TOKEN', csrfToken);
        }
    }

    const response = await fetch(apiUrl(path), {
        method,
        headers: requestHeaders,
        body: requestBody,
        credentials: 'same-origin',
    });

    let data = null;
    const contentType = response.headers.get('content-type') || '';

    if (response.status !== 204) {
        data = contentType.includes('application/json')
            ? await response.json()
            : await response.text();
    }

    if (!response.ok) {
        if (response.status === 401) {
            clearSession();

            if ((document.body.dataset.routeGuard || 'none') === 'protected') {
                window.location.replace(document.body.dataset.loginUrl || '/login');
            }
        }

        const message = extractErrorMessage(data, `Request gagal (${response.status})`);
        const error = new Error(message);
        error.status = response.status;
        error.data = data;
        throw error;
    }

    return data;
}

export async function downloadFile(path, fallbackName = 'export.csv') {
    const headers = new Headers({
        Accept: 'text/csv,application/octet-stream',
        'X-Requested-With': 'XMLHttpRequest',
    });

    const token = getStoredToken();

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(apiUrl(path), {
        method: 'GET',
        headers,
        credentials: 'same-origin',
    });

    if (!response.ok) {
        let data = null;
        const contentType = response.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {
            data = await response.json();
        }

        throw new Error(extractErrorMessage(data, 'Gagal mengunduh file'));
    }

    const blob = await response.blob();
    const disposition = response.headers.get('content-disposition') || '';
    const fileNameMatch = disposition.match(/filename="?([^"]+)"?/i);
    const filename = fileNameMatch?.[1] || fallbackName;
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(blobUrl);
}
