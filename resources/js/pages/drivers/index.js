import { apiRequest, downloadFile } from '../../services/http';
import { buildPaginationLabel, debounce, escapeHtml } from '../../services/helpers';
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
};

const limit = 10;

function userAvatarIcon() {
    return `
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `;
}

function mapPinIcon() {
    return `
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"></circle>
        </svg>
    `;
}

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

function setSubmitting(busy) {
    const submitButton = document.getElementById('driver-submit-btn');

    state.isSubmitting = busy;

    if (!submitButton) {
        return;
    }

    submitButton.disabled = busy;
    submitButton.textContent = busy ? 'Menyimpan...' : (state.editItem ? 'Perbarui' : 'Simpan');
}

function renderLoadingState() {
    const tbody = document.getElementById('drivers-table-body');

    if (!tbody) {
        return;
    }

    tbody.innerHTML = `
        <tr>
            <td colspan="4" class="drivers-table-state">
                <div class="drivers-loading-inline">
                    <span class="drivers-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `;
}

function renderEmptyState() {
    const tbody = document.getElementById('drivers-table-body');

    if (!tbody) {
        return;
    }

    tbody.innerHTML = `
        <tr>
            <td colspan="4" class="drivers-table-state drivers-empty-copy">
                Belum ada data driver
            </td>
        </tr>
    `;
}

function renderRows() {
    const tbody = document.getElementById('drivers-table-body');

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

    tbody.innerHTML = state.data.map((item, index) => `
        <tr class="drivers-row" data-testid="driver-row-${item.id}">
            <td class="drivers-index-cell">${((state.page - 1) * limit) + index + 1}</td>
            <td>
                <div class="drivers-user-cell">
                    <span class="drivers-user-avatar" aria-hidden="true">
                        ${userAvatarIcon()}
                    </span>
                    <span class="drivers-user-name">${escapeHtml(item.nama)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-location-cell">
                    <span class="drivers-location-icon" aria-hidden="true">${mapPinIcon()}</span>
                    <span>${escapeHtml(item.lokasi)}</span>
                </div>
            </td>
            <td>
                <div class="drivers-action-row">
                    <button
                        class="drivers-icon-button"
                        type="button"
                        data-driver-edit="${item.id}"
                        data-testid="edit-driver-${item.id}"
                        aria-label="Edit driver ${escapeHtml(item.nama)}"
                    >
                        ${editIcon()}
                    </button>
                    <button
                        class="drivers-icon-button drivers-icon-button-danger"
                        type="button"
                        data-driver-delete="${item.id}"
                        data-driver-name="${escapeHtml(item.nama)}"
                        data-testid="delete-driver-${item.id}"
                        aria-label="Hapus driver ${escapeHtml(item.nama)}"
                    >
                        ${trashIcon()}
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderPagination() {
    const shell = document.getElementById('drivers-pagination-shell');
    const info = document.getElementById('drivers-pagination-info');
    const pageLabel = document.getElementById('drivers-pagination-page');
    const prevButton = document.getElementById('drivers-prev-page-btn');
    const nextButton = document.getElementById('drivers-next-page-btn');
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
        const [driversRes, countRes] = await Promise.all([
            apiRequest(`/drivers?page=${state.page}&limit=${limit}${state.search ? `&search=${encodeURIComponent(state.search)}` : ''}`),
            apiRequest(`/drivers/count${state.search ? `?search=${encodeURIComponent(state.search)}` : ''}`),
        ]);

        state.data = Array.isArray(driversRes) ? driversRes : [];
        state.totalCount = Number(countRes.count || 0);
    } finally {
        state.loading = false;
        renderRows();
        renderPagination();
    }
}

function resetForm() {
    const form = document.getElementById('driver-form');
    const title = document.getElementById('driver-form-title');
    const description = document.getElementById('driver-form-description');
    const hiddenId = document.getElementById('driver-id');
    const nama = document.getElementById('driver-nama');
    const lokasi = document.getElementById('driver-lokasi');

    form?.reset();

    if (hiddenId) {
        hiddenId.value = '';
    }

    if (nama) {
        nama.value = '';
    }

    if (lokasi) {
        lokasi.value = '';
    }

    if (title) {
        title.textContent = 'Tambah Driver Baru';
    }

    if (description) {
        description.textContent = 'Isi form di bawah untuk menambahkan data driver';
    }

    state.editItem = null;
    setSubmitting(false);
}

function fillForm(item) {
    const title = document.getElementById('driver-form-title');
    const description = document.getElementById('driver-form-description');
    const hiddenId = document.getElementById('driver-id');
    const nama = document.getElementById('driver-nama');
    const lokasi = document.getElementById('driver-lokasi');

    state.editItem = item;

    if (hiddenId) {
        hiddenId.value = item.id;
    }

    if (nama) {
        nama.value = item.nama;
    }

    if (lokasi) {
        lokasi.value = item.lokasi;
    }

    if (title) {
        title.textContent = 'Edit Data Driver';
    }

    if (description) {
        description.textContent = 'Isi form di bawah untuk memperbarui data driver';
    }

    setSubmitting(false);
}

async function openEditDialog(id) {
    const item = await apiRequest(`/drivers/${id}`);
    fillForm(item);
    openModal('driver-form-modal');
}

function openDeleteDialog(item) {
    const copy = document.getElementById('driver-delete-copy');

    state.deleteItem = item;

    if (copy) {
        copy.innerHTML = `Apakah Anda yakin ingin menghapus driver <strong>${escapeHtml(item.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`;
    }

    openModal('driver-delete-modal');
}

export default function initDriversPage() {
    const addButton = document.getElementById('drivers-add-btn');
    const exportButton = document.getElementById('drivers-export-btn');
    const searchInput = document.getElementById('drivers-search-input');
    const form = document.getElementById('driver-form');
    const tbody = document.getElementById('drivers-table-body');
    const deleteButton = document.getElementById('driver-delete-confirm-btn');
    const prevButton = document.getElementById('drivers-prev-page-btn');
    const nextButton = document.getElementById('drivers-next-page-btn');

    if (!addButton || !form || !tbody) {
        return;
    }

    addButton.addEventListener('click', () => {
        resetForm();
        openModal('driver-form-modal');
    });

    exportButton?.addEventListener('click', () => {
        downloadFile('/export/drivers/csv', 'drivers.csv').catch(() => {
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

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const payload = {
            nama: document.getElementById('driver-nama')?.value.trim() || '',
            lokasi: document.getElementById('driver-lokasi')?.value.trim() || '',
        };

        setSubmitting(true);

        try {
            if (state.editItem) {
                await apiRequest(`/drivers/${state.editItem.id}`, {
                    method: 'PUT',
                    body: payload,
                });
                toastSuccess('Data driver berhasil diperbarui');
            } else {
                await apiRequest('/drivers', {
                    method: 'POST',
                    body: payload,
                });
                toastSuccess('Driver berhasil ditambahkan');
            }

            closeModal('driver-form-modal');
            resetForm();
            await fetchData();
        } catch (error) {
            toastError(error.message || 'Silakan periksa input Anda', 'Gagal menyimpan data');
        } finally {
            setSubmitting(false);
        }
    });

    tbody.addEventListener('click', async (event) => {
        const editButton = event.target.closest('[data-driver-edit]');
        const deleteButtonTrigger = event.target.closest('[data-driver-delete]');

        try {
            if (editButton) {
                await openEditDialog(editButton.dataset.driverEdit);
                return;
            }

            if (deleteButtonTrigger) {
                openDeleteDialog({
                    id: deleteButtonTrigger.dataset.driverDelete,
                    nama: deleteButtonTrigger.dataset.driverName,
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
            await apiRequest(`/drivers/${state.deleteItem.id}`, { method: 'DELETE' });
            toastSuccess('Driver berhasil dihapus');
            closeModal('driver-delete-modal');

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
