import { apiRequest, downloadFile } from '../../services/http';
import { buildPaginationLabel, debounce, escapeHtml, formatCurrency, formatNumber, todayString } from '../../services/helpers';
import { closeModal, openModal } from '../../ui/modal';
import { toastError, toastSuccess } from '../../ui/toast';

const state = {
    data: [],
    drivers: [],
    mobilList: [],
    loading: true,
    totalCount: 0,
    page: 1,
    search: '',
    editItem: null,
    deleteItem: null,
    isSubmitting: false,
};

const limit = 10;
const departureTimeOptions = {
    '05:00': 'Subuh (05.00 WIB)',
    '08:00': 'Pagi (08.00 WIB)',
    '10:00': 'Pagi (10.00 WIB)',
    '14:00': 'Siang (14.00 WIB)',
    '16:00': 'Sore (16.00 WIB)',
    '19:00': 'Malam (19.00 WIB)',
};
const defaultDepartureTime = '08:00';
const serviceTypeOptions = ['Reguler', 'Dropping', 'Rental'];
const defaultServiceType = 'Reguler';

function editIcon() {
    return `
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5V6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
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

function paymentStatusLabel(status) {
    return status === 'Lunas' ? 'Lunas' : 'Belum Lunas';
}

function paymentStatusBadge(status) {
    const label = paymentStatusLabel(status);
    const modifier = label === 'Lunas' ? 'is-paid' : 'is-unpaid';

    return `<span class="keberangkatan-payment-badge ${modifier}">${escapeHtml(label)}</span>`;
}

function departureTimeLabel(value) {
    return departureTimeOptions[value] || departureTimeOptions[defaultDepartureTime];
}

function serviceTypeLabel(value) {
    return serviceTypeOptions.includes(value) ? value : defaultServiceType;
}

function calculatePreviewValues() {
    const tarifPenumpang = Number(document.getElementById('keberangkatan-tarif-penumpang')?.value || 0);
    const uangPaket = Number(document.getElementById('keberangkatan-uang-paket')?.value || 0);
    const jumlahSnack = Number(document.getElementById('keberangkatan-jumlah-snack')?.value || 0);
    const jumlahAirMineral = Number(document.getElementById('keberangkatan-jumlah-air-mineral')?.value || 0);
    const jumlahUangPenumpang = tarifPenumpang;
    const total = jumlahUangPenumpang + uangPaket;
    const uangPc = total * 0.15;
    const uangBersih = total * 0.85;

    return {
        jumlah_uang_penumpang: jumlahUangPenumpang,
        uang_paket: uangPaket,
        total,
        uang_pc: uangPc,
        uang_bersih: uangBersih,
        jumlah_snack: jumlahSnack,
        jumlah_air_mineral: jumlahAirMineral,
    };
}

function syncCalculationPreview() {
    const values = calculatePreviewValues();

    Object.entries(values).forEach(([key, value]) => {
        const element = document.querySelector(`[data-calc="${key}"]`);

        if (element) {
            if (key === 'jumlah_snack') {
                element.textContent = `${formatNumber(value)} item`;
                return;
            }

            if (key === 'jumlah_air_mineral') {
                element.textContent = `${formatNumber(value)} botol`;
                return;
            }

            element.textContent = formatCurrency(value);
        }
    });
}

function populateSelect(selectId, items, valueKey, labelBuilder, selectedValue = '') {
    const select = document.getElementById(selectId);

    if (!select) {
        return;
    }

    const defaultLabel = selectId === 'keberangkatan-kode-mobil' ? 'Pilih mobil' : 'Pilih driver';

    select.innerHTML = `
        <option value="">${defaultLabel}</option>
        ${items.map((item) => `
            <option value="${item[valueKey]}" ${String(item[valueKey]) === String(selectedValue) ? 'selected' : ''}>
                ${escapeHtml(labelBuilder(item))}
            </option>
        `).join('')}
    `;
}

function setSubmitting(busy) {
    const submitButton = document.getElementById('keberangkatan-submit-btn');

    state.isSubmitting = busy;

    if (!submitButton) {
        return;
    }

    submitButton.disabled = busy;
    submitButton.textContent = busy ? 'Menyimpan...' : (state.editItem ? 'Perbarui' : 'Simpan');
}

function renderLoadingState() {
    const tbody = document.getElementById('keberangkatan-table-body');
    const mobileList = document.getElementById('keberangkatan-mobile-list');

    if (!tbody) {
        return;
    }

    tbody.innerHTML = `
        <tr>
            <td colspan="17" class="keberangkatan-table-state">
                <div class="keberangkatan-loading-inline">
                    <span class="keberangkatan-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `;

    if (mobileList) {
        mobileList.hidden = false;
        mobileList.innerHTML = `
            <div class="keberangkatan-mobile-state">
                <div class="keberangkatan-loading-inline">
                    <span class="keberangkatan-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </div>
        `;
    }
}

function renderEmptyState() {
    const tbody = document.getElementById('keberangkatan-table-body');
    const mobileList = document.getElementById('keberangkatan-mobile-list');

    if (!tbody) {
        return;
    }

    tbody.innerHTML = `
        <tr>
            <td colspan="17" class="keberangkatan-table-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </td>
        </tr>
    `;

    if (mobileList) {
        mobileList.hidden = false;
        mobileList.innerHTML = `
            <div class="keberangkatan-mobile-state keberangkatan-empty-copy">
                Belum ada data keberangkatan
            </div>
        `;
    }
}

function renderRows() {
    const tbody = document.getElementById('keberangkatan-table-body');
    const mobileList = document.getElementById('keberangkatan-mobile-list');

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
        <tr class="keberangkatan-row" data-testid="keberangkatan-row-${item.id}">
            <td class="keberangkatan-hari-cell">${escapeHtml(item.hari)}</td>
            <td>${escapeHtml(item.tanggal)}</td>
            <td>${escapeHtml(item.jam_keberangkatan_label || departureTimeLabel(item.jam_keberangkatan))}</td>
            <td>${escapeHtml(serviceTypeLabel(item.tipe_layanan))}</td>
            <td>
                <span class="keberangkatan-kode-badge">${escapeHtml(item.kode_mobil)}</span>
            </td>
            <td>${escapeHtml(item.driver_nama)}</td>
            <td class="text-right">${formatNumber(item.jumlah_penumpang)}</td>
            <td class="text-right keberangkatan-money-cell">${formatCurrency(item.jumlah_uang_penumpang)}</td>
            <td class="text-right">${formatNumber(item.jumlah_paket)}</td>
            <td class="text-right keberangkatan-money-cell">${formatCurrency(item.uang_paket)}</td>
            <td class="text-right"><span class="keberangkatan-stock-badge">${formatNumber(item.jumlah_snack)}</span></td>
            <td class="text-right"><span class="keberangkatan-stock-badge keberangkatan-stock-badge-blue">${formatNumber(item.jumlah_air_mineral)}</span></td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-amber">${formatCurrency(item.uang_pc)}</td>
            <td class="text-right keberangkatan-money-cell keberangkatan-money-cell-emerald">${formatCurrency(item.uang_bersih)}</td>
            <td class="text-center">${paymentStatusBadge(item.status_pembayaran)}</td>
            <td class="text-center">
                <span class="keberangkatan-trip-badge">#${formatNumber(item.trip_ke)}</span>
            </td>
            <td>
                <div class="keberangkatan-action-row">
                    <button
                        class="keberangkatan-icon-button"
                        type="button"
                        data-keberangkatan-edit="${item.id}"
                        data-testid="edit-keberangkatan-${item.id}"
                        aria-label="Edit data keberangkatan ${escapeHtml(item.kode_mobil)}"
                    >
                        ${editIcon()}
                    </button>
                    <button
                        class="keberangkatan-icon-button keberangkatan-icon-button-danger"
                        type="button"
                        data-keberangkatan-delete="${item.id}"
                        data-testid="delete-keberangkatan-${item.id}"
                        aria-label="Hapus data keberangkatan ${escapeHtml(item.kode_mobil)}"
                    >
                        ${trashIcon()}
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    if (mobileList) {
        mobileList.hidden = false;
        mobileList.innerHTML = state.data.map((item) => `
            <article class="keberangkatan-mobile-card" data-testid="keberangkatan-card-${item.id}">
                <div class="keberangkatan-mobile-card-head">
                    <div>
                        <p class="keberangkatan-mobile-day">${escapeHtml(item.hari)}</p>
                        <h3 class="keberangkatan-mobile-date">${escapeHtml(item.tanggal)}</h3>
                        <p>${escapeHtml(item.jam_keberangkatan_label || departureTimeLabel(item.jam_keberangkatan))}</p>
                    </div>
                    <div class="keberangkatan-mobile-head-side">
                        <span class="keberangkatan-kode-badge">${escapeHtml(item.kode_mobil)}</span>
                        <span class="keberangkatan-trip-badge">#${formatNumber(item.trip_ke)}</span>
                    </div>
                </div>

                <div class="keberangkatan-mobile-driver">
                    <span>Driver</span>
                    <strong>${escapeHtml(item.driver_nama)}</strong>
                </div>

                <div class="keberangkatan-mobile-grid">
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-status">
                        <span>Validasi</span>
                        ${paymentStatusBadge(item.status_pembayaran)}
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Layanan</span>
                        <strong>${escapeHtml(serviceTypeLabel(item.tipe_layanan))}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Penumpang</span>
                        <strong>${formatNumber(item.jumlah_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Paket</span>
                        <strong>${formatNumber(item.jumlah_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Snack</span>
                        <strong>${formatNumber(item.jumlah_snack)} item</strong>
                    </div>
                    <div class="keberangkatan-mobile-item">
                        <span>Air Mineral</span>
                        <strong>${formatNumber(item.jumlah_air_mineral)} botol</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Uang Penumpang</span>
                        <strong>${formatCurrency(item.jumlah_uang_penumpang)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-full">
                        <span>Uang Paket</span>
                        <strong>${formatCurrency(item.uang_paket)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-accent">
                        <span>Uang PC (15%)</span>
                        <strong>${formatCurrency(item.uang_pc)}</strong>
                    </div>
                    <div class="keberangkatan-mobile-item keberangkatan-mobile-item-emerald">
                        <span>Uang Bersih</span>
                        <strong>${formatCurrency(item.uang_bersih)}</strong>
                    </div>
                </div>

                <div class="keberangkatan-mobile-actions">
                    <button
                        class="keberangkatan-secondary-button"
                        type="button"
                        data-keberangkatan-edit="${item.id}"
                        data-testid="edit-keberangkatan-mobile-${item.id}"
                    >
                        Edit
                    </button>
                    <button
                        class="keberangkatan-danger-button"
                        type="button"
                        data-keberangkatan-delete="${item.id}"
                        data-testid="delete-keberangkatan-mobile-${item.id}"
                    >
                        Hapus
                    </button>
                </div>
            </article>
        `).join('');
    }
}

function renderPagination() {
    const shell = document.getElementById('keberangkatan-pagination-shell');
    const info = document.getElementById('keberangkatan-pagination-info');
    const pageLabel = document.getElementById('keberangkatan-pagination-page');
    const prevButton = document.getElementById('keberangkatan-prev-page-btn');
    const nextButton = document.getElementById('keberangkatan-next-page-btn');
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

async function fetchData() {
    state.loading = true;
    renderRows();
    renderPagination();

    try {
        const [keberangkatanRes, countRes, driversRes, mobilRes] = await Promise.all([
            apiRequest(`/keberangkatan?page=${state.page}&limit=${limit}${state.search ? `&search=${encodeURIComponent(state.search)}` : ''}`),
            apiRequest(`/keberangkatan/count${state.search ? `?search=${encodeURIComponent(state.search)}` : ''}`),
            apiRequest('/drivers/all'),
            apiRequest('/mobil/all'),
        ]);

        state.data = Array.isArray(keberangkatanRes) ? keberangkatanRes : [];
        state.totalCount = Number(countRes.count || 0);
        state.drivers = Array.isArray(driversRes) ? driversRes : [];
        state.mobilList = Array.isArray(mobilRes) ? mobilRes : [];
    } finally {
        state.loading = false;
        renderRows();
        renderPagination();
    }
}

function resetFormScroll() {
    document.getElementById('keberangkatan-form')?.scrollTo({
        top: 0,
        behavior: 'auto',
    });
}

function resetForm() {
    const form = document.getElementById('keberangkatan-form');
    const title = document.getElementById('keberangkatan-form-title');
    const description = document.getElementById('keberangkatan-form-description');
    const tanggal = document.getElementById('keberangkatan-tanggal');
    const jamKeberangkatan = document.getElementById('keberangkatan-jam-keberangkatan');
    const tripKe = document.getElementById('keberangkatan-trip-ke');
    const tipeLayanan = document.getElementById('keberangkatan-tipe-layanan');
    const jumlahPenumpang = document.getElementById('keberangkatan-jumlah-penumpang');
    const tarifPenumpang = document.getElementById('keberangkatan-tarif-penumpang');
    const jumlahPaket = document.getElementById('keberangkatan-jumlah-paket');
    const uangPaket = document.getElementById('keberangkatan-uang-paket');
    const jumlahSnack = document.getElementById('keberangkatan-jumlah-snack');
    const jumlahAirMineral = document.getElementById('keberangkatan-jumlah-air-mineral');
    const statusPembayaran = document.getElementById('keberangkatan-status-pembayaran');

    form?.reset();
    state.editItem = null;

    document.getElementById('keberangkatan-id').value = '';

    if (title) {
        title.textContent = 'Tambah Data Keberangkatan';
    }

    if (description) {
        description.textContent = 'Isi form di bawah untuk menambahkan data keberangkatan';
    }

    if (tanggal) {
        tanggal.value = todayString();
    }

    if (jamKeberangkatan) {
        jamKeberangkatan.value = defaultDepartureTime;
    }

    populateSelect(
        'keberangkatan-kode-mobil',
        state.mobilList,
        'kode_mobil',
        (item) => `${item.kode_mobil} - ${item.jenis_mobil}`,
        state.mobilList[0]?.kode_mobil || '',
    );

    populateSelect(
        'keberangkatan-driver-id',
        state.drivers,
        'id',
        (item) => `${item.nama} - ${item.lokasi}`,
        state.drivers[0]?.id || '',
    );

    if (tripKe) {
        tripKe.value = '1';
    }

    if (tipeLayanan) {
        tipeLayanan.value = defaultServiceType;
    }

    if (jumlahPenumpang) {
        jumlahPenumpang.value = '0';
    }

    if (tarifPenumpang) {
        tarifPenumpang.value = '0';
    }

    if (jumlahPaket) {
        jumlahPaket.value = '0';
    }

    if (uangPaket) {
        uangPaket.value = '0';
    }

    if (jumlahSnack) {
        jumlahSnack.value = '0';
    }

    if (jumlahAirMineral) {
        jumlahAirMineral.value = '0';
    }

    if (statusPembayaran) {
        statusPembayaran.value = 'Belum Lunas';
    }

    setSubmitting(false);
    syncCalculationPreview();
    resetFormScroll();
}

async function openEditDialog(id) {
    const item = await apiRequest(`/keberangkatan/${id}`);
    const title = document.getElementById('keberangkatan-form-title');
    const description = document.getElementById('keberangkatan-form-description');

    state.editItem = item;
    document.getElementById('keberangkatan-id').value = item.id;
    document.getElementById('keberangkatan-tanggal').value = item.tanggal;
    document.getElementById('keberangkatan-jam-keberangkatan').value = item.jam_keberangkatan || defaultDepartureTime;
    document.getElementById('keberangkatan-trip-ke').value = item.trip_ke;
    document.getElementById('keberangkatan-tipe-layanan').value = serviceTypeLabel(item.tipe_layanan);
    document.getElementById('keberangkatan-jumlah-penumpang').value = item.jumlah_penumpang;
    document.getElementById('keberangkatan-tarif-penumpang').value = item.tarif_penumpang;
    document.getElementById('keberangkatan-jumlah-paket').value = item.jumlah_paket;
    document.getElementById('keberangkatan-uang-paket').value = item.uang_paket;
    document.getElementById('keberangkatan-jumlah-snack').value = item.jumlah_snack;
    document.getElementById('keberangkatan-jumlah-air-mineral').value = item.jumlah_air_mineral;
    document.getElementById('keberangkatan-status-pembayaran').value = paymentStatusLabel(item.status_pembayaran);

    populateSelect(
        'keberangkatan-kode-mobil',
        state.mobilList,
        'kode_mobil',
        (mobil) => `${mobil.kode_mobil} - ${mobil.jenis_mobil}`,
        item.kode_mobil,
    );

    populateSelect(
        'keberangkatan-driver-id',
        state.drivers,
        'id',
        (driver) => `${driver.nama} - ${driver.lokasi}`,
        item.driver_id,
    );

    if (title) {
        title.textContent = 'Edit Data Keberangkatan';
    }

    if (description) {
        description.textContent = 'Isi form di bawah untuk memperbarui data keberangkatan';
    }

    setSubmitting(false);
    syncCalculationPreview();
    resetFormScroll();
    openModal('keberangkatan-form-modal');
}

function openDeleteDialog(item) {
    state.deleteItem = item;
    openModal('keberangkatan-delete-modal');
}

export default function initKeberangkatanPage() {
    const addButton = document.getElementById('keberangkatan-add-btn');
    const exportButton = document.getElementById('keberangkatan-export-btn');
    const searchInput = document.getElementById('keberangkatan-search-input');
    const form = document.getElementById('keberangkatan-form');
    const tbody = document.getElementById('keberangkatan-table-body');
    const mobileList = document.getElementById('keberangkatan-mobile-list');
    const deleteButton = document.getElementById('keberangkatan-delete-confirm-btn');
    const prevButton = document.getElementById('keberangkatan-prev-page-btn');
    const nextButton = document.getElementById('keberangkatan-next-page-btn');

    if (!addButton || !form || !tbody) {
        return;
    }

    addButton.addEventListener('click', () => {
        resetForm();
        openModal('keberangkatan-form-modal');
    });

    exportButton?.addEventListener('click', () => {
        downloadFile('/export/keberangkatan/csv', 'keberangkatan.csv').catch(() => {
            toastError('Gagal mengunduh file');
        });
    });

    searchInput?.addEventListener('input', debounce(async (event) => {
        state.search = event.target.value.trim();
        state.page = 1;

        try {
            await fetchData();
        } catch (error) {
            toastError('Gagal memuat data');
        }
    }));

    form.addEventListener('input', (event) => {
        if ([
            'keberangkatan-jumlah-penumpang',
            'keberangkatan-tarif-penumpang',
            'keberangkatan-uang-paket',
            'keberangkatan-jumlah-snack',
            'keberangkatan-jumlah-air-mineral',
        ].includes(event.target.id)) {
            syncCalculationPreview();
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const payload = {
            tanggal: document.getElementById('keberangkatan-tanggal')?.value || '',
            jam_keberangkatan: document.getElementById('keberangkatan-jam-keberangkatan')?.value || defaultDepartureTime,
            tipe_layanan: serviceTypeLabel(document.getElementById('keberangkatan-tipe-layanan')?.value || defaultServiceType),
            kode_mobil: document.getElementById('keberangkatan-kode-mobil')?.value || '',
            driver_id: document.getElementById('keberangkatan-driver-id')?.value || '',
            jumlah_penumpang: Number(document.getElementById('keberangkatan-jumlah-penumpang')?.value || 0),
            tarif_penumpang: Number(document.getElementById('keberangkatan-tarif-penumpang')?.value || 0),
            jumlah_paket: Number(document.getElementById('keberangkatan-jumlah-paket')?.value || 0),
            uang_paket: Number(document.getElementById('keberangkatan-uang-paket')?.value || 0),
            jumlah_snack: Number(document.getElementById('keberangkatan-jumlah-snack')?.value || 0),
            jumlah_air_mineral: Number(document.getElementById('keberangkatan-jumlah-air-mineral')?.value || 0),
            trip_ke: Number(document.getElementById('keberangkatan-trip-ke')?.value || 1),
            status_pembayaran: paymentStatusLabel(document.getElementById('keberangkatan-status-pembayaran')?.value || ''),
        };

        setSubmitting(true);

        try {
            if (state.editItem) {
                await apiRequest(`/keberangkatan/${state.editItem.id}`, {
                    method: 'PUT',
                    body: payload,
                });
                toastSuccess('Data berhasil diperbarui');
            } else {
                await apiRequest('/keberangkatan', {
                    method: 'POST',
                    body: payload,
                });
                toastSuccess('Data berhasil ditambahkan');
            }

            closeModal('keberangkatan-form-modal');
            resetForm();
            await fetchData();
        } catch (error) {
            toastError(error.message || 'Silakan periksa input Anda', 'Gagal menyimpan data');
        } finally {
            setSubmitting(false);
        }
    });

    tbody.addEventListener('click', async (event) => {
        const editButton = event.target.closest('[data-keberangkatan-edit]');
        const deleteButtonTrigger = event.target.closest('[data-keberangkatan-delete]');

        try {
            if (editButton) {
                await openEditDialog(editButton.dataset.keberangkatanEdit);
                return;
            }

            if (deleteButtonTrigger) {
                openDeleteDialog({
                    id: deleteButtonTrigger.dataset.keberangkatanDelete,
                });
            }
        } catch (error) {
            toastError('Gagal memuat data');
        }
    });

    mobileList?.addEventListener('click', async (event) => {
        const editButton = event.target.closest('[data-keberangkatan-edit]');
        const deleteButtonTrigger = event.target.closest('[data-keberangkatan-delete]');

        try {
            if (editButton) {
                await openEditDialog(editButton.dataset.keberangkatanEdit);
                return;
            }

            if (deleteButtonTrigger) {
                openDeleteDialog({
                    id: deleteButtonTrigger.dataset.keberangkatanDelete,
                });
            }
        } catch (error) {
            toastError('Gagal memuat data');
        }
    });

    deleteButton?.addEventListener('click', async () => {
        if (!state.deleteItem) {
            return;
        }

        try {
            await apiRequest(`/keberangkatan/${state.deleteItem.id}`, { method: 'DELETE' });
            toastSuccess('Data berhasil dihapus');
            closeModal('keberangkatan-delete-modal');

            if ((state.page - 1) * limit >= state.totalCount - 1 && state.page > 1) {
                state.page -= 1;
            }

            state.deleteItem = null;
            await fetchData();
        } catch (error) {
            toastError('Gagal menghapus data');
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
            toastError('Gagal memuat data');
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
            toastError('Gagal memuat data');
        }
    });

    return fetchData()
        .then(() => {
            resetForm();
        })
        .catch(() => {
            toastError('Gagal memuat data');
        });
}
