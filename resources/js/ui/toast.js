function createToast(title, message, type) {
    const root = document.getElementById('transit-toast-root');

    if (!root) {
        return;
    }

    const element = document.createElement('div');
    element.className = `transit-toast ${type === 'error' ? 'is-error' : ''} ${type === 'info' ? 'is-info' : ''}`.trim();
    element.innerHTML = `
        <div>
            <strong>${title}</strong>
            <p>${message}</p>
        </div>
    `;

    root.appendChild(element);

    window.requestAnimationFrame(() => {
        element.classList.add('is-visible');
    });

    window.setTimeout(() => {
        element.classList.remove('is-visible');
        window.setTimeout(() => element.remove(), 180);
    }, 3600);
}

export function toastSuccess(message, title = 'Berhasil') {
    createToast(title, message, 'success');
}

export function toastError(message, title = 'Gagal') {
    createToast(title, message, 'error');
}

// Bug #30: Centralized 409 version-conflict handler for admin booking mutations
// (design §9.3). MVP scope — toast + auto-reload. Future upgrade to modal UX
// deferred to bug #44 or similar. Returns true if handled (caller should early-return).
export function handleVersionConflict(error) {
    if (error?.status === 409 && error?.data?.error === 'booking_version_conflict') {
        toastError(
            'Booking diubah oleh admin lain. Halaman akan refresh otomatis dalam 3 detik...',
            'Perubahan Terdeteksi'
        );
        setTimeout(function () { window.location.reload(); }, 3000);
        return true;
    }
    return false;
}

export function toastInfo(message, title = 'Info') {
    createToast(title, message, 'info');
}
