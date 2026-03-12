import { apiRequest } from '../../services/http';
import { buildPaginationLabel, debounce, escapeHtml, formatCurrency, formatNumber, todayString } from '../../services/helpers';
import { closeModal, openModal } from '../../ui/modal';
import { toastError, toastSuccess } from '../../ui/toast';

const state = {
    data: [],
    loading: true,
    totalCount: 0,
    page: 1,
    search: '',
    editItem: null,
    deleteItem: null,
    isSubmitting: false,
    prices: {
        snack: 0,
        air: 0,
    },
};

const limit = 10;

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

function getNumericValue(id) {
    return Number(document.getElementById(id)?.value || 0);
}

function syncPreview() {
    const totalSnack = getNumericValue('stock-total-snack');
    const totalAir = getNumericValue('stock-total-air');
    const nilaiTotal = (totalSnack * state.prices.snack) + (totalAir * state.prices.air);
    const totalLabel = document.querySelector('[data-stock-calc="nilai_total"]');
    const snackPrice = document.getElementById('stock-snack-price-label');
    const airPrice = document.getElementById('stock-air-price-label');

    if (snackPrice) {
        snackPrice.textContent = formatCurrency(state.prices.snack);
    }

    if (airPrice) {
        airPrice.textContent = formatCurrency(state.prices.air);
    }

    if (totalLabel) {
        totalLabel.textContent = formatCurrency(nilaiTotal);
    }
}

function setSubmitting(busy) {
    const submitButton = document.getElementById('stock-submit-btn');

    state.isSubmitting = busy;

    if (!submitButton) {
        return;
    }

    submitButton.disabled = busy;
    submitButton.textContent = busy ? 'Menyimpan...' : (state.editItem ? 'Perbarui' : 'Simpan');
}

function renderLoadingState() {
    const tbody = document.getElementById('stock-table-body');
    const mobileList = document.getElementById('stock-mobile-list');

    if (!tbody) {
        return;
    }

    tbody.innerHTML = `
        <tr>
            <td colspan="13" class="stock-table-state">
                <div class="stock-loading-inline">
                    <span class="stock-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `;

    if (mobileList) {
        mobileList.hidden = false;
        mobileList.innerHTML = `
            <div class="stock-mobile-state">
                <div class="stock-loading-inline">
                    <span class="stock-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </div>
        `;
    }
}

function renderEmptyState() {
    const tbody = document.getElementById('stock-table-body');
    const mobileList = document.getElementById('stock-mobile-list');

    if (!tbody) {
        return;
    }

    tbody.innerHTML = `
        <tr>
            <td colspan="13" class="stock-table-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </td>
        </tr>
    `;

    if (mobileList) {
        mobileList.hidden = false;
        mobileList.innerHTML = `
            <div class="stock-mobile-state stock-empty-copy">
                Belum ada data stok snack dan air mineral
            </div>
        `;
    }
}

function renderRows() {
    const tbody = document.getElementById('stock-table-body');
    const mobileList = document.getElementById('stock-mobile-list');

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
        <tr class="stock-row" data-testid="stock-row-${item.id}">
            <td class="stock-day-cell">${escapeHtml(item.hari)}</td>
            <td>${escapeHtml(item.tanggal)}</td>
            <td>${escapeHtml(item.bulan)}</td>
            <td class="text-right">${formatNumber(item.total_stock_snack)}</td>
            <td class="text-right">${formatNumber(item.total_stock_air_mineral)}</td>
            <td class="text-right">${formatNumber(item.terpakai_snack)}</td>
            <td class="text-right">${formatNumber(item.terpakai_air_mineral)}</td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-emerald">${formatNumber(item.sisa_stock_snack)}</span></td>
            <td class="text-right"><span class="stock-value-badge stock-value-badge-blue">${formatNumber(item.sisa_stock_air_mineral)}</span></td>
            <td class="text-right stock-money-cell">${formatCurrency(item.nilai_total)}</td>
            <td class="text-right stock-money-cell stock-money-cell-emerald">${formatCurrency(item.sisa_nilai_total)}</td>
            <td>${escapeHtml(item.keterangan || '-')}</td>
            <td>
                <div class="stock-action-row">
                    <button
                        class="stock-icon-button"
                        type="button"
                        data-stock-edit="${item.id}"
                        data-testid="edit-stock-${item.id}"
                        aria-label="Edit data stok ${escapeHtml(item.tanggal)}"
                    >
                        ${editIcon()}
                    </button>
                    <button
                        class="stock-icon-button stock-icon-button-danger"
                        type="button"
                        data-stock-delete="${item.id}"
                        data-stock-date="${escapeHtml(item.tanggal)}"
                        data-testid="delete-stock-${item.id}"
                        aria-label="Hapus data stok ${escapeHtml(item.tanggal)}"
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
            <article class="stock-mobile-card" data-testid="stock-card-${item.id}">
                <div class="stock-mobile-card-head">
                    <div>
                        <p class="stock-mobile-day">${escapeHtml(item.hari)}</p>
                        <h3 class="stock-mobile-date">${escapeHtml(item.tanggal)}</h3>
                    </div>
                    <span class="stock-mobile-month">${escapeHtml(item.bulan)}</span>
                </div>

                <div class="stock-mobile-grid">
                    <div class="stock-mobile-item">
                        <span>Total Snack</span>
                        <strong>${formatNumber(item.total_stock_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Total Air Mineral</span>
                        <strong>${formatNumber(item.total_stock_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Terpakai Snack</span>
                        <strong>${formatNumber(item.terpakai_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Terpakai Air Mineral</span>
                        <strong>${formatNumber(item.terpakai_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Sisa Snack</span>
                        <strong>${formatNumber(item.sisa_stock_snack)}</strong>
                    </div>
                    <div class="stock-mobile-item">
                        <span>Sisa Air Mineral</span>
                        <strong>${formatNumber(item.sisa_stock_air_mineral)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full">
                        <span>Nilai Total</span>
                        <strong>${formatCurrency(item.nilai_total)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full stock-mobile-item-emerald">
                        <span>Sisa Nilai Total</span>
                        <strong>${formatCurrency(item.sisa_nilai_total)}</strong>
                    </div>
                    <div class="stock-mobile-item stock-mobile-item-full">
                        <span>Keterangan</span>
                        <strong>${escapeHtml(item.keterangan || '-')}</strong>
                    </div>
                </div>

                <div class="stock-mobile-actions">
                    <button
                        class="stock-secondary-button"
                        type="button"
                        data-stock-edit="${item.id}"
                        data-testid="edit-stock-mobile-${item.id}"
                    >
                        Edit
                    </button>
                    <button
                        class="stock-danger-button"
                        type="button"
                        data-stock-delete="${item.id}"
                        data-stock-date="${escapeHtml(item.tanggal)}"
                        data-testid="delete-stock-mobile-${item.id}"
                    >
                        Hapus
                    </button>
                </div>
            </article>
        `).join('');
    }
}

function renderPagination() {
    const shell = document.getElementById('stock-pagination-shell');
    const info = document.getElementById('stock-pagination-info');
    const pageLabel = document.getElementById('stock-pagination-page');
    const prevButton = document.getElementById('stock-prev-page-btn');
    const nextButton = document.getElementById('stock-next-page-btn');
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
        const [stockRes, countRes] = await Promise.all([
            apiRequest(`/stock?page=${state.page}&limit=${limit}${state.search ? `&search=${encodeURIComponent(state.search)}` : ''}`),
            apiRequest(`/stock/count${state.search ? `?search=${encodeURIComponent(state.search)}` : ''}`),
        ]);

        state.data = Array.isArray(stockRes) ? stockRes : [];
        state.totalCount = Number(countRes.count || 0);
    } finally {
        state.loading = false;
        renderRows();
        renderPagination();
    }
}

function resetForm() {
    const form = document.getElementById('stock-form');
    const title = document.getElementById('stock-form-title');
    const description = document.getElementById('stock-form-description');

    form?.reset();
    state.editItem = null;

    document.getElementById('stock-id').value = '';
    document.getElementById('stock-tanggal').value = todayString();
    document.getElementById('stock-total-snack').value = '0';
    document.getElementById('stock-total-air').value = '0';
    document.getElementById('stock-keterangan').value = '';

    if (title) {
        title.textContent = 'Tambah Stok Baru';
    }

    if (description) {
        description.textContent = 'Isi form di bawah untuk menambahkan stok snack dan air mineral';
    }

    setSubmitting(false);
    syncPreview();
}

function fillForm(item) {
    const title = document.getElementById('stock-form-title');
    const description = document.getElementById('stock-form-description');

    state.editItem = item;
    document.getElementById('stock-id').value = item.id;
    document.getElementById('stock-tanggal').value = item.tanggal;
    document.getElementById('stock-total-snack').value = item.total_stock_snack;
    document.getElementById('stock-total-air').value = item.total_stock_air_mineral;
    document.getElementById('stock-keterangan').value = item.keterangan || '';

    if (title) {
        title.textContent = 'Edit Data Stok';
    }

    if (description) {
        description.textContent = 'Isi form di bawah untuk memperbarui stok snack dan air mineral';
    }

    setSubmitting(false);
    syncPreview();
}

async function openEditDialog(id) {
    const item = await apiRequest(`/stock/${id}`);
    fillForm(item);
    openModal('stock-form-modal');
}

function openDeleteDialog(item) {
    const copy = document.getElementById('stock-delete-copy');

    state.deleteItem = item;

    if (copy) {
        copy.innerHTML = `Apakah Anda yakin ingin menghapus data stok tanggal <strong>${escapeHtml(item.tanggal)}</strong>? Tindakan ini tidak dapat dibatalkan.`;
    }

    openModal('stock-delete-modal');
}

export default function initStockPage() {
    const section = document.querySelector('[data-stock-page]');
    const addButton = document.getElementById('stock-add-btn');
    const searchInput = document.getElementById('stock-search-input');
    const form = document.getElementById('stock-form');
    const tbody = document.getElementById('stock-table-body');
    const mobileList = document.getElementById('stock-mobile-list');
    const deleteButton = document.getElementById('stock-delete-confirm-btn');
    const prevButton = document.getElementById('stock-prev-page-btn');
    const nextButton = document.getElementById('stock-next-page-btn');

    if (!section || !addButton || !form || !tbody) {
        return;
    }

    state.prices.snack = Number(section.dataset.stockSnackPrice || 0);
    state.prices.air = Number(section.dataset.stockAirPrice || 0);
    syncPreview();

    addButton.addEventListener('click', () => {
        resetForm();
        openModal('stock-form-modal');
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
        if (['stock-total-snack', 'stock-total-air'].includes(event.target.id)) {
            syncPreview();
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const payload = {
            tanggal: document.getElementById('stock-tanggal')?.value || '',
            total_stock_snack: getNumericValue('stock-total-snack'),
            total_stock_air_mineral: getNumericValue('stock-total-air'),
            keterangan: document.getElementById('stock-keterangan')?.value.trim() || '',
        };

        setSubmitting(true);

        try {
            if (state.editItem) {
                await apiRequest(`/stock/${state.editItem.id}`, {
                    method: 'PUT',
                    body: payload,
                });
                toastSuccess('Data stok berhasil diperbarui');
            } else {
                await apiRequest('/stock', {
                    method: 'POST',
                    body: payload,
                });
                toastSuccess('Data stok berhasil ditambahkan');
            }

            closeModal('stock-form-modal');
            resetForm();
            await fetchData();
        } catch (error) {
            toastError(error.message || 'Silakan periksa input Anda', 'Gagal menyimpan data');
        } finally {
            setSubmitting(false);
        }
    });

    tbody.addEventListener('click', async (event) => {
        const editButton = event.target.closest('[data-stock-edit]');
        const deleteButtonTrigger = event.target.closest('[data-stock-delete]');

        try {
            if (editButton) {
                await openEditDialog(editButton.dataset.stockEdit);
                return;
            }

            if (deleteButtonTrigger) {
                openDeleteDialog({
                    id: deleteButtonTrigger.dataset.stockDelete,
                    tanggal: deleteButtonTrigger.dataset.stockDate,
                });
            }
        } catch (error) {
            toastError('Gagal memuat data');
        }
    });

    mobileList?.addEventListener('click', async (event) => {
        const editButton = event.target.closest('[data-stock-edit]');
        const deleteButtonTrigger = event.target.closest('[data-stock-delete]');

        try {
            if (editButton) {
                await openEditDialog(editButton.dataset.stockEdit);
                return;
            }

            if (deleteButtonTrigger) {
                openDeleteDialog({
                    id: deleteButtonTrigger.dataset.stockDelete,
                    tanggal: deleteButtonTrigger.dataset.stockDate,
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
            await apiRequest(`/stock/${state.deleteItem.id}`, { method: 'DELETE' });
            toastSuccess('Data stok berhasil dihapus');
            closeModal('stock-delete-modal');

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

    return fetchData().catch(() => {
        toastError('Gagal memuat data');
    });
}
