import { closeModal, openModal } from '../../ui/modal';
import { toastError, toastSuccess } from '../../ui/toast';

const state = {
    siklusId: null,
    statusSiklus: null,
    csrfToken: null,
    urls: {},
    rows: [],
    drivers: [],
};

function parseInitialState() {
    const element = document.getElementById('keuangan-jet-initial-state');
    if (!element) return null;
    try {
        return JSON.parse(element.textContent || '{}');
    } catch (error) {
        return null;
    }
}

function findRow(rowId) {
    return state.rows.find((r) => Number(r.id) === Number(rowId));
}

/**
 * POST helper for absolute web URLs (route() helper output, not /api prefixed).
 * Sends JSON body + CSRF token from meta tag. Returns parsed JSON or throws.
 */
async function postJson(url, body = {}) {
    const headers = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    });

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfToken) {
        headers.set('X-CSRF-TOKEN', csrfToken);
    }

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
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
        const message = (data && (data.message || data.detail))
            || (data && data.errors && Object.values(data.errors).flat()[0])
            || `Request gagal (${response.status})`;
        const error = new Error(message);
        error.status = response.status;
        error.data = data;
        throw error;
    }

    return data;
}

// ── Action: Refresh from Booking ──
async function handleRefresh() {
    if (!window.confirm('Refresh akan re-pull data dari Bookings dan recompute formula. Lanjut?')) {
        return;
    }
    try {
        await postJson(state.urls.refresh);
        toastSuccess('Data refreshed dari Bookings.');
        setTimeout(() => window.location.reload(), 800);
    } catch (error) {
        toastError(error.message || 'Refresh gagal.');
    }
}

// ── Action: Open Biaya Edit Modal ──
function openBiayaModal() {
    openModal('modal-biaya-edit');
}

async function handleBiayaSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const body = {
        uang_jalan: Number(formData.get('uang_jalan')),
        biaya_kurir: Number(formData.get('biaya_kurir')),
        biaya_cuci_mobil: Number(formData.get('biaya_cuci_mobil')),
    };
    try {
        await postJson(state.urls.biaya, body);
        toastSuccess('Biaya operasional updated.');
        closeModal('modal-biaya-edit');
        setTimeout(() => window.location.reload(), 600);
    } catch (error) {
        toastError(error.message || 'Update biaya gagal.');
    }
}

// ── Action: Driver Override ──
function openDriverOverrideModal() {
    openModal('modal-driver-override');
}

async function handleDriverOverrideSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const body = {
        driver_id: formData.get('driver_id'),
        reason: formData.get('reason') || null,
    };
    try {
        await postJson(state.urls.driver_override, body);
        toastSuccess('Driver actual updated.');
        closeModal('modal-driver-override');
        setTimeout(() => window.location.reload(), 600);
    } catch (error) {
        toastError(error.message || 'Override driver gagal.');
    }
}

// ── Action: Edit Row Detail ──
function openRowEditModal(rowId) {
    const row = findRow(rowId);
    if (!row) return;

    document.getElementById('row-edit-id').value = row.id;
    document.getElementById('row-jenis-layanan').value = row.jenis_layanan;
    document.getElementById('row-sumber-rental').value = row.sumber_rental || '';
    document.getElementById('row-persen-admin').value = row.persen_admin;
    document.getElementById('row-uang-snack').value = Math.round(row.uang_snack);

    toggleSumberRentalField(row.jenis_layanan);
    openModal('modal-row-edit');
}

function toggleSumberRentalField(jenisLayanan) {
    const field = document.getElementById('row-sumber-rental-field');
    const select = document.getElementById('row-sumber-rental');
    if (jenisLayanan === 'Rental') {
        field.hidden = false;
        select.required = true;
    } else {
        field.hidden = true;
        select.required = false;
        select.value = '';
    }
}

function autoUpdatePersenFromSumber(sumber) {
    const persenSelect = document.getElementById('row-persen-admin');
    if (sumber === 'loket') {
        persenSelect.value = '15';
    } else if (sumber === 'driver') {
        persenSelect.value = '10';
    }
}

async function handleRowEditSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const rowId = formData.get('row_id');
    const row = findRow(rowId);
    if (!row) {
        toastError('Row tidak ditemukan.');
        return;
    }

    const body = {
        jenis_layanan: formData.get('jenis_layanan'),
        sumber_rental: formData.get('sumber_rental') || null,
        persen_admin: Number(formData.get('persen_admin')),
        uang_snack: Number(formData.get('uang_snack')),
    };
    try {
        await postJson(row.urls.update, body);
        toastSuccess('Row updated + formula recomputed.');
        closeModal('modal-row-edit');
        setTimeout(() => window.location.reload(), 600);
    } catch (error) {
        toastError(error.message || 'Update row gagal.');
    }
}

// ── Action: Mark Driver Paid (irreversible) ──
function openDriverPaidModal() {
    openModal('modal-driver-paid');
}

async function handleDriverPaidSubmit(event) {
    event.preventDefault();
    try {
        await postJson(state.urls.driver_paid, { confirm: true });
        toastSuccess('Driver marked paid. Siklus locked.');
        closeModal('modal-driver-paid');
        setTimeout(() => window.location.reload(), 800);
    } catch (error) {
        toastError(error.message || 'Mark driver paid gagal.');
    }
}

// ── Action: Mark Admin Paid (per row) ──
function openAdminPaidModal(rowId) {
    document.getElementById('admin-paid-row-id').value = rowId;
    openModal('modal-admin-paid');
}

async function handleAdminPaidSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const rowId = formData.get('row_id');
    const row = findRow(rowId);
    if (!row) {
        toastError('Row tidak ditemukan.');
        return;
    }
    try {
        await postJson(row.urls.admin_paid, { confirm: true });
        toastSuccess('Admin marked paid.');
        closeModal('modal-admin-paid');
        setTimeout(() => window.location.reload(), 600);
    } catch (error) {
        toastError(error.message || 'Mark admin paid gagal.');
    }
}

// ── Bind handlers ──
function bindHandlers() {
    document.querySelectorAll('[data-action]').forEach((el) => {
        const action = el.dataset.action;
        el.addEventListener('click', (event) => {
            event.preventDefault();
            switch (action) {
                case 'refresh':
                    handleRefresh();
                    break;
                case 'open-biaya-edit':
                    openBiayaModal();
                    break;
                case 'open-driver-override':
                    openDriverOverrideModal();
                    break;
                case 'open-row-edit':
                    openRowEditModal(el.dataset.rowId);
                    break;
                case 'open-driver-paid':
                    openDriverPaidModal();
                    break;
                case 'open-admin-paid':
                    openAdminPaidModal(el.dataset.rowId);
                    break;
                default:
                    break;
            }
        });
    });

    document.getElementById('form-biaya-edit')?.addEventListener('submit', handleBiayaSubmit);
    document.getElementById('form-driver-override')?.addEventListener('submit', handleDriverOverrideSubmit);
    document.getElementById('form-row-edit')?.addEventListener('submit', handleRowEditSubmit);
    document.getElementById('form-driver-paid')?.addEventListener('submit', handleDriverPaidSubmit);
    document.getElementById('form-admin-paid')?.addEventListener('submit', handleAdminPaidSubmit);

    document.getElementById('row-jenis-layanan')?.addEventListener('change', (event) => {
        toggleSumberRentalField(event.target.value);
    });
    document.getElementById('row-sumber-rental')?.addEventListener('change', (event) => {
        autoUpdatePersenFromSumber(event.target.value);
    });
}

export default async function initKeuanganJetSiklusDetailPage() {
    const initial = parseInitialState();
    if (!initial) return;
    state.siklusId = initial.siklus_id;
    state.statusSiklus = initial.status_siklus;
    state.csrfToken = initial.csrf_token;
    state.urls = initial.urls || {};
    state.rows = initial.rows || [];
    state.drivers = initial.drivers || [];

    bindHandlers();
}
