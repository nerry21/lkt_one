const currencyFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat('id-ID');

export function formatCurrency(value) {
    return currencyFormatter.format(Number(value) || 0);
}

export function formatNumber(value) {
    return numberFormatter.format(Number(value) || 0);
}

export function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export function debounce(callback, delay = 300) {
    let timeoutId = null;

    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => callback(...args), delay);
    };
}

export function buildPaginationLabel(page, limit, total, currentCount) {
    if (total === 0 || currentCount === 0) {
        return 'Menampilkan 0 - 0 dari 0 data';
    }

    const start = (page - 1) * limit + 1;
    const end = start + currentCount - 1;

    return `Menampilkan ${start} - ${end} dari ${total} data`;
}

export function formatDate(value) {
    if (!value) {
        return '-';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date);
}

export function todayString() {
    return new Date().toISOString().slice(0, 10);
}

export function setButtonBusy(button, busy, busyText = 'Memproses...') {
    if (!button) {
        return;
    }

    if (!button.dataset.defaultText) {
        button.dataset.defaultText = button.textContent.trim();
    }

    button.disabled = busy;
    button.textContent = busy ? busyText : button.dataset.defaultText;
}
