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

export function toastInfo(message, title = 'Info') {
    createToast(title, message, 'info');
}
