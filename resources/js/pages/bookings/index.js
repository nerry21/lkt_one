import { apiRequest } from '../../services/http';
import { buildPaginationLabel, debounce, escapeHtml, formatCurrency, formatNumber, setButtonBusy, todayString } from '../../services/helpers';
import { closeModal, openModal } from '../../ui/modal';
import { toastError, toastSuccess } from '../../ui/toast';

const limit = 10;

const state = {
    currentUser: null,
    data: [],
    loading: true,
    totalCount: 0,
    page: 1,
    search: '',
    editItem: null,
    deleteItem: null,
    formOptions: null,
    selectedSeats: [],
    passengerDraftMap: {},
};

function parseFormOptions() {
    const element = document.getElementById('bookings-form-options');

    if (!element) {
        return null;
    }

    try {
        return JSON.parse(element.textContent || '{}');
    } catch (error) {
        return null;
    }
}

function isAdminRole(role) {
    return ['Super Admin', 'Admin'].includes(role);
}

function busIcon() {
    return `
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M8 4H16C18.7614 4 21 6.23858 21 9V15C21 16.1046 20.1046 17 19 17H5C3.89543 17 3 16.1046 3 15V9C3 6.23858 5.23858 4 8 4Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M7 17L6 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M17 17L18 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M7 13H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
            <path d="M17 13H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
            <path d="M6 9H18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `;
}

function eyeIcon() {
    return `
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `;
}

function editIcon() {
    return `
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `;
}

function trashIcon() {
    return `
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
        </svg>
    `;
}

function seatOrder() {
    return (state.formOptions?.seat_options || []).map((item) => item.code);
}

function sortSeatCodes(seatCodes) {
    const orderMap = new Map(seatOrder().map((code, index) => [code, index]));

    return Array.from(new Set((seatCodes || []).map((code) => String(code).trim()).filter((code) => orderMap.has(code))))
        .sort((left, right) => (orderMap.get(left) ?? 999) - (orderMap.get(right) ?? 999));
}

function paymentStatusOptions() {
    return state.formOptions?.payment_status_options || [];
}

function allowedPaymentStatusValues(method) {
    if (method === 'transfer') {
        return ['Belum Bayar', 'Menunggu Pembayaran', 'Menunggu Verifikasi', 'Dibayar'];
    }

    if (method === 'qris') {
        return ['Belum Bayar', 'Menunggu Pembayaran', 'Dibayar'];
    }

    if (method === 'cash') {
        return ['Belum Bayar', 'Dibayar Tunai'];
    }

    return ['Belum Bayar'];
}

function defaultPaymentStatus(method) {
    if (method === 'transfer') {
        return 'Menunggu Pembayaran';
    }

    if (method === 'qris') {
        return 'Dibayar';
    }

    if (method === 'cash') {
        return 'Dibayar Tunai';
    }

    return 'Belum Bayar';
}

function defaultBookingStatus(method) {
    if (method === 'transfer') {
        return 'Menunggu Verifikasi Pembayaran';
    }

    if (method === 'qris' || method === 'cash') {
        return 'Diproses';
    }

    return 'Draft';
}

function resolveFare(origin, destination) {
    if (!origin || !destination || origin === destination) {
        return null;
    }

    const routeMatrix = state.formOptions?.route_matrix || {};
    const fare = routeMatrix?.[origin]?.[destination];

    return fare === undefined || fare === null ? null : Number(fare);
}

function passengerCount() {
    return Number(document.getElementById('booking-passenger-count')?.value || 0);
}

function allowedSeatCodes() {
    const count = passengerCount();

    return (state.formOptions?.seat_options || [])
        .filter((item) => !item.is_optional || count >= 6)
        .map((item) => item.code);
}

function renderLoadingState() {
    const tbody = document.getElementById('bookings-table-body');

    if (!tbody) {
        return;
    }

    tbody.innerHTML = `
        <tr>
            <td colspan="12" class="admin-users-table-state">
                <div class="admin-users-loading-inline">
                    <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `;
}

function renderEmptyState(copy = 'Belum ada data pemesanan.') {
    const tbody = document.getElementById('bookings-table-body');

    if (!tbody) {
        return;
    }

    tbody.innerHTML = `
        <tr>
            <td colspan="12" class="admin-users-table-state admin-users-empty-copy">${escapeHtml(copy)}</td>
        </tr>
    `;
}

function updateTotalBadge() {
    const badge = document.getElementById('bookings-total-badge');

    if (!badge) {
        return;
    }

    badge.textContent = `${formatNumber(state.totalCount)} Data`;
}

function renderRows() {
    const tbody = document.getElementById('bookings-table-body');

    if (!tbody) {
        return;
    }

    if (state.loading) {
        renderLoadingState();
        return;
    }

    if (state.data.length === 0) {
        renderEmptyState();
        return;
    }

    tbody.innerHTML = state.data.map((item) => `
        <tr class="admin-users-row" data-testid="booking-row-${item.id}">
            <td>
                <div class="admin-users-name-cell">
                    <span class="admin-users-avatar" aria-hidden="true">${busIcon()}</span>
                    <div>
                        <span class="admin-users-name">${escapeHtml(item.nama_pemesanan)}</span>
                        <span class="admin-users-name-meta">${escapeHtml(item.booking_code)}</span>
                        <div class="bookings-status-row">
                            <span class="${escapeHtml(item.booking_status_badge_class)}">${escapeHtml(item.booking_status)}</span>
                            <span class="${escapeHtml(item.payment_status_badge_class)}">${escapeHtml(item.payment_status)}</span>
                        </div>
                    </div>
                </div>
            </td>
            <td><span class="admin-users-email">${escapeHtml(item.phone)}</span></td>
            <td><span class="admin-users-email">${escapeHtml(item.from_city)}</span></td>
            <td><span class="admin-users-email">${escapeHtml(item.to_city)}</span></td>
            <td><span class="admin-users-email">${escapeHtml(item.trip_date_label)}</span></td>
            <td><span class="admin-users-email">${escapeHtml(item.trip_time)}</span></td>
            <td><span class="admin-users-email">${escapeHtml(item.selected_seats_label)}</span></td>
            <td class="text-right"><span class="admin-users-email">${escapeHtml(String(item.passenger_count))}</span></td>
            <td><span class="stock-value-badge stock-value-badge-blue">${escapeHtml(item.service_type)}</span></td>
            <td class="text-right">
                <div class="bookings-amount-cell">
                    <strong>${escapeHtml(item.total_amount_formatted)}</strong>
                </div>
            </td>
            <td><span class="bookings-address-copy">${escapeHtml(item.address_summary)}</span></td>
            <td>
                <div class="admin-users-action-row">
                    <a class="admin-users-icon-button" href="/dashboard/bookings/${item.id}" data-testid="show-booking-${item.id}" aria-label="Lihat detail pemesanan ${escapeHtml(item.nama_pemesanan)}">
                        ${eyeIcon()}
                    </a>
                    <button class="admin-users-icon-button" type="button" data-booking-edit="${item.id}" data-testid="edit-booking-${item.id}" aria-label="Edit pemesanan ${escapeHtml(item.nama_pemesanan)}" ${item.can_edit ? '' : 'disabled'}>
                        ${editIcon()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-booking-delete="${item.id}" data-booking-name="${escapeHtml(item.nama_pemesanan)}" data-testid="delete-booking-${item.id}" aria-label="Hapus pemesanan ${escapeHtml(item.nama_pemesanan)}" ${item.can_delete ? '' : 'disabled'}>
                        ${trashIcon()}
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderPagination() {
    const shell = document.getElementById('bookings-pagination-shell');
    const info = document.getElementById('bookings-pagination-info');
    const pageLabel = document.getElementById('bookings-pagination-page');
    const prevButton = document.getElementById('bookings-prev-page-btn');
    const nextButton = document.getElementById('bookings-next-page-btn');
    const totalPages = Math.max(1, Math.ceil(state.totalCount / limit));

    if (shell) {
        shell.hidden = totalPages <= 1;
    }

    if (info) {
        info.textContent = buildPaginationLabel(state.page, limit, state.totalCount, state.data.length);
    }

    if (pageLabel) {
        pageLabel.textContent = `${state.page} / ${totalPages}`;
    }

    if (prevButton) {
        prevButton.disabled = state.page === 1;
    }

    if (nextButton) {
        nextButton.disabled = state.page >= totalPages;
    }
}

function syncPassengerDraftMapFromDom() {
    const rows = document.querySelectorAll('[data-passenger-seat]');

    rows.forEach((row) => {
        const seat = row.dataset.passengerSeat;

        if (!seat) {
            return;
        }

        state.passengerDraftMap[seat] = {
            seat_no: seat,
            name: row.querySelector('[data-passenger-name]')?.value.trim() || '',
            phone: row.querySelector('[data-passenger-phone]')?.value.trim() || '',
        };
    });
}

function updateSelectedSeatsInputs() {
    const container = document.getElementById('booking-selected-seats-inputs');

    if (!container) {
        return;
    }

    container.innerHTML = state.selectedSeats.map((seatCode) => `
        <input type="hidden" name="selected_seats[]" value="${escapeHtml(seatCode)}">
    `).join('');
}

function updateSeatSummary() {
    const countElement = document.getElementById('booking-selected-seat-count');
    const labelElement = document.getElementById('booking-selected-seat-label');

    if (countElement) {
        countElement.textContent = String(state.selectedSeats.length);
    }

    if (labelElement) {
        labelElement.textContent = state.selectedSeats.length > 0 ? state.selectedSeats.join(', ') : 'Belum dipilih';
    }
}

function renderPassengerForms(seedPassengers = null) {
    const container = document.getElementById('booking-passenger-editor');

    if (!container) {
        return;
    }

    if (seedPassengers) {
        state.passengerDraftMap = Object.fromEntries(seedPassengers.map((passenger) => [passenger.seat_no, passenger]));
    }

    if (state.selectedSeats.length === 0) {
        container.innerHTML = `
            <div class="dashboard-empty-state dashboard-empty-state--block bookings-passenger-empty">
                Pilih kursi terlebih dahulu untuk menampilkan form data penumpang.
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="bookings-passenger-grid bookings-passenger-grid--editor">
            ${state.selectedSeats.map((seatCode, index) => {
                const passenger = state.passengerDraftMap[seatCode] || { name: '', phone: '' };

                return `
                    <article class="bookings-passenger-card bookings-passenger-card--editor" data-passenger-seat="${escapeHtml(seatCode)}">
                        <div class="bookings-passenger-form-head">
                            <span class="stock-value-badge stock-value-badge-blue">${escapeHtml(seatCode)}</span>
                            <strong>Penumpang ${index + 1}</strong>
                            <p>${index === 0 ? 'Menjadi nama pemesanan utama pada tabel.' : 'Data penumpang tambahan.'}</p>
                        </div>

                        <div class="bookings-passenger-form-grid">
                            <div class="admin-users-form-group">
                                <label>Nama</label>
                                <div class="admin-users-input-shell">
                                    <input type="text" value="${escapeHtml(passenger.name || '')}" placeholder="Masukkan nama penumpang" data-passenger-name>
                                </div>
                            </div>

                            <div class="admin-users-form-group">
                                <label>No HP</label>
                                <div class="admin-users-input-shell">
                                    <input type="text" value="${escapeHtml(passenger.phone || '')}" placeholder="08xxxxxxxxxx" data-passenger-phone>
                                </div>
                            </div>
                        </div>
                    </article>
                `;
            }).join('')}
        </div>
    `;
}

function renderSeatButtons() {
    const seatButtons = document.querySelectorAll('[data-seat-code]');
    const currentPassengerCount = passengerCount();
    const allowedCodes = allowedSeatCodes();

    state.selectedSeats = sortSeatCodes(state.selectedSeats.filter((code) => allowedCodes.includes(code)));

    seatButtons.forEach((button) => {
        const code = button.dataset.seatCode;
        const visible = allowedCodes.includes(code);
        const isSelected = state.selectedSeats.includes(code);
        const disableUnselected = state.selectedSeats.length >= currentPassengerCount && !isSelected;

        button.hidden = !visible;
        button.classList.toggle('is-selected', isSelected);
        button.classList.toggle('is-disabled', disableUnselected);
        button.disabled = !visible || disableUnselected;
    });

    updateSelectedSeatsInputs();
    updateSeatSummary();
}

function updatePricing() {
    const origin = document.getElementById('booking-from-city')?.value || '';
    const destination = document.getElementById('booking-to-city')?.value || '';
    const count = passengerCount();
    const fare = resolveFare(origin, destination);
    const total = fare !== null ? fare * count : null;
    const fareInput = document.getElementById('booking-price-per-seat');
    const totalInput = document.getElementById('booking-total-amount');

    if (fareInput) {
        fareInput.value = fare !== null ? formatCurrency(fare) : '';
    }

    if (totalInput) {
        totalInput.value = total !== null ? formatCurrency(total) : '';
    }
}

function updatePaymentFieldVisibility() {
    const paymentMethod = document.getElementById('booking-payment-method')?.value || '';
    const paymentStatusSelect = document.getElementById('booking-payment-status');
    const bookingStatusSelect = document.getElementById('booking-booking-status');
    const bankGroup = document.getElementById('booking-bank-account-group');
    const bankSelect = document.getElementById('booking-bank-account-code');
    const allowedStatuses = allowedPaymentStatusValues(paymentMethod);
    const currentPaymentStatus = paymentStatusSelect?.value || '';

    if (bankGroup) {
        bankGroup.hidden = paymentMethod !== 'transfer';
    }

    if (bankSelect && paymentMethod !== 'transfer') {
        bankSelect.value = '';
    }

    if (paymentStatusSelect) {
        paymentStatusSelect.innerHTML = paymentStatusOptions()
            .filter((option) => allowedStatuses.includes(option.value))
            .map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`)
            .join('');

        paymentStatusSelect.value = allowedStatuses.includes(currentPaymentStatus)
            ? currentPaymentStatus
            : defaultPaymentStatus(paymentMethod);
    }

    if (bookingStatusSelect) {
        bookingStatusSelect.value = defaultBookingStatus(paymentMethod);
    }
}

function resetForm() {
    const form = document.getElementById('booking-form');

    form?.reset();

    state.editItem = null;
    state.selectedSeats = [];
    state.passengerDraftMap = {};

    document.getElementById('booking-id').value = '';
    document.getElementById('booking-form-title').textContent = 'Tambah Pemesanan';
    document.getElementById('booking-form-description').textContent = 'Lengkapi data pemesanan reguler dari dashboard admin.';
    document.getElementById('booking-trip-date').value = todayString();
    document.getElementById('booking-passenger-count').value = '1';
    document.getElementById('booking-payment-method').value = '';
    document.getElementById('booking-booking-status').value = 'Draft';
    updatePaymentFieldVisibility();
    renderSeatButtons();
    renderPassengerForms();
    updatePricing();
    setButtonBusy(document.getElementById('booking-submit-btn'), false, 'Menyimpan...');
}

function fillForm(item) {
    state.editItem = item;
    state.selectedSeats = sortSeatCodes(item.selected_seats || []);
    state.passengerDraftMap = Object.fromEntries((item.passengers || []).map((passenger) => [passenger.seat_no, passenger]));

    document.getElementById('booking-id').value = item.id;
    document.getElementById('booking-booking-for').value = item.booking_for;
    document.getElementById('booking-category').value = item.category;
    document.getElementById('booking-from-city').value = item.from_city;
    document.getElementById('booking-to-city').value = item.to_city;
    document.getElementById('booking-trip-date').value = item.trip_date_value;
    document.getElementById('booking-trip-time').value = item.trip_time_value;
    document.getElementById('booking-passenger-count').value = String(item.passenger_count);
    document.getElementById('booking-driver-name').value = item.driver_name === 'Menunggu Penetapan Driver' ? '' : item.driver_name;
    document.getElementById('booking-pickup-location').value = item.pickup_location;
    document.getElementById('booking-dropoff-location').value = item.dropoff_location;
    document.getElementById('booking-payment-method').value = item.payment_method_value || '';
    updatePaymentFieldVisibility();
    document.getElementById('booking-payment-status').value = item.payment_status;
    document.getElementById('booking-booking-status').value = item.booking_status;
    document.getElementById('booking-bank-account-code').value = item.bank_account_code || '';
    document.getElementById('booking-notes').value = item.notes || '';
    document.getElementById('booking-form-title').textContent = 'Edit Pemesanan';
    document.getElementById('booking-form-description').textContent = 'Perbarui data pemesanan reguler yang dipilih.';

    renderSeatButtons();
    renderPassengerForms(item.passengers || []);
    updatePricing();
    setButtonBusy(document.getElementById('booking-submit-btn'), false, 'Menyimpan...');
}

function buildPayload() {
    syncPassengerDraftMapFromDom();

    return {
        booking_for: document.getElementById('booking-booking-for')?.value || '',
        category: document.getElementById('booking-category')?.value || 'Reguler',
        from_city: document.getElementById('booking-from-city')?.value || '',
        to_city: document.getElementById('booking-to-city')?.value || '',
        trip_date: document.getElementById('booking-trip-date')?.value || '',
        trip_time: document.getElementById('booking-trip-time')?.value || '',
        passenger_count: Number(document.getElementById('booking-passenger-count')?.value || 0),
        driver_name: document.getElementById('booking-driver-name')?.value.trim() || '',
        pickup_location: document.getElementById('booking-pickup-location')?.value.trim() || '',
        dropoff_location: document.getElementById('booking-dropoff-location')?.value.trim() || '',
        selected_seats: state.selectedSeats,
        passengers: state.selectedSeats.map((seatCode) => ({
            seat_no: seatCode,
            name: state.passengerDraftMap?.[seatCode]?.name || '',
            phone: state.passengerDraftMap?.[seatCode]?.phone || '',
        })),
        payment_method: document.getElementById('booking-payment-method')?.value || '',
        payment_status: document.getElementById('booking-payment-status')?.value || 'Belum Bayar',
        booking_status: document.getElementById('booking-booking-status')?.value || 'Draft',
        bank_account_code: document.getElementById('booking-bank-account-code')?.value || '',
        notes: document.getElementById('booking-notes')?.value.trim() || '',
    };
}

async function fetchData() {
    state.loading = true;
    renderRows();
    renderPagination();

    try {
        const searchQuery = state.search ? `?search=${encodeURIComponent(state.search)}` : '';
        const pageQuery = `?page=${state.page}&limit=${limit}${state.search ? `&search=${encodeURIComponent(state.search)}` : ''}`;
        const [items, count] = await Promise.all([
            apiRequest(`/bookings${pageQuery}`),
            apiRequest(`/bookings/count${searchQuery}`),
        ]);

        state.data = Array.isArray(items) ? items : [];
        state.totalCount = Number(count.count || 0);
    } finally {
        state.loading = false;
        updateTotalBadge();
        renderRows();
        renderPagination();
    }
}

async function openEditDialog(id) {
    fillForm(await apiRequest(`/bookings/${id}`));
    openModal('booking-form-modal');
}

function openDeleteDialog(item) {
    state.deleteItem = item;
    document.getElementById('booking-delete-copy').innerHTML = `Apakah Anda yakin ingin menghapus data pemesanan <strong>${escapeHtml(item.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`;
    openModal('booking-delete-modal');
}

function renderAccessDenied() {
    const note = document.getElementById('bookings-access-note');
    const searchInput = document.getElementById('bookings-search-input');
    const actions = document.querySelector('.admin-users-page-actions');

    if (note) {
        note.hidden = false;
        note.textContent = 'Halaman ini hanya dapat diakses oleh Admin atau Super Admin.';
    }

    if (searchInput) {
        searchInput.disabled = true;
    }

    if (actions) {
        actions.hidden = true;
    }

    state.loading = false;
    state.data = [];
    state.totalCount = 0;
    updateTotalBadge();
    renderEmptyState('Anda tidak memiliki akses untuk mengelola data pemesanan.');
    renderPagination();
}

export default function initBookingsPage({ user } = {}) {
    const addButton = document.getElementById('bookings-add-btn');
    const searchInput = document.getElementById('bookings-search-input');
    const form = document.getElementById('booking-form');
    const tbody = document.getElementById('bookings-table-body');
    const deleteButton = document.getElementById('booking-delete-confirm-btn');
    const prevButton = document.getElementById('bookings-prev-page-btn');
    const nextButton = document.getElementById('bookings-next-page-btn');
    const seatGrid = document.getElementById('booking-seat-grid');
    const passengerEditor = document.getElementById('booking-passenger-editor');
    const paymentMethodSelect = document.getElementById('booking-payment-method');

    if (!addButton || !searchInput || !form || !tbody) {
        return;
    }

    state.formOptions = parseFormOptions();
    state.currentUser = user || window.transitAuthUser || null;

    if (!isAdminRole(state.currentUser?.role)) {
        renderAccessDenied();
        return;
    }

    resetForm();

    addButton.addEventListener('click', () => {
        resetForm();
        openModal('booking-form-modal');
    });

    searchInput.addEventListener('input', debounce(async (event) => {
        state.search = event.target.value.trim();
        state.page = 1;

        try {
            await fetchData();
        } catch (error) {
            toastError(error.message || 'Gagal memuat data pemesanan');
        }
    }));

    document.getElementById('booking-from-city')?.addEventListener('change', updatePricing);
    document.getElementById('booking-to-city')?.addEventListener('change', updatePricing);
    document.getElementById('booking-passenger-count')?.addEventListener('change', () => {
        syncPassengerDraftMapFromDom();
        renderSeatButtons();
        renderPassengerForms();
        updatePricing();
    });

    paymentMethodSelect?.addEventListener('change', () => {
        updatePaymentFieldVisibility();
    });

    seatGrid?.addEventListener('click', (event) => {
        const button = event.target.closest('[data-seat-code]');

        if (!button || button.disabled) {
            return;
        }

        syncPassengerDraftMapFromDom();

        const seatCode = button.dataset.seatCode;

        if (state.selectedSeats.includes(seatCode)) {
            state.selectedSeats = state.selectedSeats.filter((code) => code !== seatCode);
        } else if (state.selectedSeats.length < passengerCount()) {
            state.selectedSeats = sortSeatCodes([...state.selectedSeats, seatCode]);
        }

        renderSeatButtons();
        renderPassengerForms();
    });

    passengerEditor?.addEventListener('input', (event) => {
        const row = event.target.closest('[data-passenger-seat]');

        if (!row) {
            return;
        }

        const seatCode = row.dataset.passengerSeat;

        state.passengerDraftMap[seatCode] = {
            seat_no: seatCode,
            name: row.querySelector('[data-passenger-name]')?.value.trim() || '',
            phone: row.querySelector('[data-passenger-phone]')?.value.trim() || '',
        };
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const submitButton = document.getElementById('booking-submit-btn');

        setButtonBusy(submitButton, true, 'Menyimpan...');

        try {
            const payload = buildPayload();

            if (state.editItem) {
                await apiRequest(`/bookings/${state.editItem.id}`, {
                    method: 'PUT',
                    body: payload,
                });
                toastSuccess('Data pemesanan berhasil diperbarui');
            } else {
                await apiRequest('/bookings', {
                    method: 'POST',
                    body: payload,
                });
                toastSuccess('Data pemesanan berhasil ditambahkan');
            }

            closeModal('booking-form-modal');
            resetForm();
            await fetchData();
        } catch (error) {
            toastError(error.message || 'Silakan periksa kembali data pemesanan yang diinput', 'Gagal menyimpan data pemesanan');
        } finally {
            setButtonBusy(submitButton, false, 'Menyimpan...');
        }
    });

    tbody.addEventListener('click', async (event) => {
        const editButton = event.target.closest('[data-booking-edit]');
        const deleteButtonTrigger = event.target.closest('[data-booking-delete]');

        try {
            if (editButton) {
                await openEditDialog(editButton.dataset.bookingEdit);
                return;
            }

            if (deleteButtonTrigger) {
                openDeleteDialog({
                    id: deleteButtonTrigger.dataset.bookingDelete,
                    nama: deleteButtonTrigger.dataset.bookingName,
                });
            }
        } catch (error) {
            toastError(error.message || 'Gagal memuat data pemesanan');
        }
    });

    deleteButton?.addEventListener('click', async () => {
        if (!state.deleteItem) {
            return;
        }

        setButtonBusy(deleteButton, true, 'Menghapus...');

        try {
            await apiRequest(`/bookings/${state.deleteItem.id}`, { method: 'DELETE' });
            toastSuccess('Data pemesanan berhasil dihapus');
            closeModal('booking-delete-modal');

            if ((state.page - 1) * limit >= state.totalCount - 1 && state.page > 1) {
                state.page -= 1;
            }

            state.deleteItem = null;
            await fetchData();
        } catch (error) {
            toastError(error.message || 'Gagal menghapus data pemesanan');
        } finally {
            setButtonBusy(deleteButton, false, 'Menghapus...');
        }
    });

    prevButton?.addEventListener('click', async () => {
        if (state.page <= 1) {
            return;
        }

        state.page -= 1;

        try {
            await fetchData();
        } catch (error) {
            toastError(error.message || 'Gagal memuat data pemesanan');
        }
    });

    nextButton?.addEventListener('click', async () => {
        const totalPages = Math.max(1, Math.ceil(state.totalCount / limit));

        if (state.page >= totalPages) {
            return;
        }

        state.page += 1;

        try {
            await fetchData();
        } catch (error) {
            toastError(error.message || 'Gagal memuat data pemesanan');
        }
    });

    return fetchData().catch((error) => {
        if (error.status === 403) {
            renderAccessDenied();
            return;
        }

        toastError(error.message || 'Gagal memuat data pemesanan');
    });
}
