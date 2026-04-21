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
    filterJenis: '',
    editItem: null,
    deleteItem: null,
    isSubmitting: false,
};

const limit = 10;

function carIcon() {
    return `
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 14L6.6 9.2C6.8728 8.3816 7.6387 7.83 8.5014 7.83H15.4986C16.3613 7.83 17.1272 8.3816 17.4 9.2L19 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M4 14H20V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V14Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <path d="M7 16H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
            <path d="M17 16H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
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

function tagIcon() {
    return `
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 13L11 22L2 13V4H11L20 13Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
            <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor"></circle>
        </svg>
    `;
}

function setSubmitting(busy) {
    const submitButton = document.getElementById('mobil-submit-btn');

    state.isSubmitting = busy;

    if (!submitButton) {
        return;
    }

    submitButton.disabled = busy;
    submitButton.textContent = busy ? 'Menyimpan...' : (state.editItem ? 'Perbarui' : 'Simpan');
}

function getJenisBadgeClass(jenis) {
    return jenis === 'Hiace'
        ? 'mobil-jenis-badge mobil-jenis-badge-hiace'
        : 'mobil-jenis-badge mobil-jenis-badge-reborn';
}

function renderLoadingState() {
    const tbody = document.getElementById('mobil-table-body');

    if (!tbody) {
        return;
    }

    tbody.innerHTML = `
        <tr>
            <td colspan="4" class="mobil-table-state">
                <div class="mobil-loading-inline">
                    <span class="mobil-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `;
}

function renderEmptyState() {
    const tbody = document.getElementById('mobil-table-body');

    if (!tbody) {
        return;
    }

    tbody.innerHTML = `
        <tr>
            <td colspan="4" class="mobil-table-state mobil-empty-copy">
                Belum ada data mobil
            </td>
        </tr>
    `;
}

function renderRows() {
    const tbody = document.getElementById('mobil-table-body');

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
        <tr class="mobil-row" data-testid="mobil-row-${item.id}">
            <td class="mobil-index-cell">${((state.page - 1) * limit) + index + 1}</td>
            <td>
                <div class="mobil-code-cell">
                    <span class="mobil-code-avatar" aria-hidden="true">
                        ${carIcon()}
                    </span>
                    <span class="mobil-code-text">${escapeHtml(item.kode_mobil)}</span>
                </div>
            </td>
            <td>
                <span class="${getJenisBadgeClass(item.jenis_mobil)}">
                    <span class="mobil-jenis-icon" aria-hidden="true">${tagIcon()}</span>
                    <span>${escapeHtml(item.jenis_mobil)}</span>
                </span>
            </td>
            <td>
                <div class="mobil-action-row">
                    <button
                        class="mobil-icon-button"
                        type="button"
                        data-mobil-edit="${item.id}"
                        data-testid="edit-mobil-${item.id}"
                        aria-label="Edit mobil ${escapeHtml(item.kode_mobil)}"
                    >
                        ${editIcon()}
                    </button>
                    <button
                        class="mobil-icon-button mobil-icon-button-danger"
                        type="button"
                        data-mobil-delete="${item.id}"
                        data-mobil-name="${escapeHtml(item.kode_mobil)}"
                        data-testid="delete-mobil-${item.id}"
                        aria-label="Hapus mobil ${escapeHtml(item.kode_mobil)}"
                    >
                        ${trashIcon()}
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderPagination() {
    const shell = document.getElementById('mobil-pagination-shell');
    const info = document.getElementById('mobil-pagination-info');
    const pageLabel = document.getElementById('mobil-pagination-page');
    const prevButton = document.getElementById('mobil-prev-page-btn');
    const nextButton = document.getElementById('mobil-next-page-btn');
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
        const [mobilRes, countRes] = await Promise.all([
            apiRequest(`/mobil?page=${state.page}&limit=${limit}${state.search ? `&search=${encodeURIComponent(state.search)}` : ''}${state.filterJenis ? `&jenis=${encodeURIComponent(state.filterJenis)}` : ''}`),
            apiRequest(`/mobil/count${state.search || state.filterJenis ? '?' : ''}${[
                state.search ? `search=${encodeURIComponent(state.search)}` : '',
                state.filterJenis ? `jenis=${encodeURIComponent(state.filterJenis)}` : '',
            ].filter(Boolean).join('&')}`),
        ]);

        state.data = Array.isArray(mobilRes) ? mobilRes : [];
        state.totalCount = Number(countRes.count || 0);
    } finally {
        state.loading = false;
        renderRows();
        renderPagination();
    }
}

function resetForm() {
    const form = document.getElementById('mobil-form');
    const title = document.getElementById('mobil-form-title');
    const description = document.getElementById('mobil-form-description');
    const hiddenId = document.getElementById('mobil-id');
    const kode = document.getElementById('mobil-kode');
    const jenis = document.getElementById('mobil-jenis');
    const homePool = document.getElementById('mobil-home-pool');
    const isActive = document.getElementById('mobil-is-active-in-trip');

    form?.reset();

    if (hiddenId) {
        hiddenId.value = '';
    }

    if (kode) {
        kode.value = '';
    }

    if (jenis) {
        jenis.value = 'Hiace';
    }

    if (homePool) {
        homePool.value = '';
    }

    if (isActive) {
        // Default true untuk mobil baru (match DB default + design §3.5)
        isActive.checked = true;
    }

    if (title) {
        title.textContent = 'Tambah Mobil Baru';
    }

    if (description) {
        description.textContent = 'Isi form di bawah untuk menambahkan data mobil';
    }

    state.editItem = null;
    setSubmitting(false);
}

function fillForm(item) {
    const title = document.getElementById('mobil-form-title');
    const description = document.getElementById('mobil-form-description');
    const hiddenId = document.getElementById('mobil-id');
    const kode = document.getElementById('mobil-kode');
    const jenis = document.getElementById('mobil-jenis');
    const homePool = document.getElementById('mobil-home-pool');
    const isActive = document.getElementById('mobil-is-active-in-trip');

    state.editItem = item;

    if (hiddenId) {
        hiddenId.value = item.id;
    }

    if (kode) {
        kode.value = item.kode_mobil;
    }

    if (jenis) {
        jenis.value = item.jenis_mobil;
    }

    if (homePool) {
        homePool.value = item.home_pool ?? '';
    }

    if (isActive) {
        // Default true untuk mobil baru; existing item pakai value dari payload
        isActive.checked = item.is_active_in_trip !== false;
    }

    if (title) {
        title.textContent = 'Edit Data Mobil';
    }

    if (description) {
        description.textContent = 'Isi form di bawah untuk memperbarui data mobil';
    }

    setSubmitting(false);
}

async function openEditDialog(id) {
    const item = await apiRequest(`/mobil/${id}`);
    fillForm(item);
    openModal('mobil-form-modal');
}

function openDeleteDialog(item) {
    const copy = document.getElementById('mobil-delete-copy');

    state.deleteItem = item;

    if (copy) {
        copy.innerHTML = `Apakah Anda yakin ingin menghapus mobil <strong>${escapeHtml(item.kode_mobil)}</strong>? Tindakan ini tidak dapat dibatalkan.`;
    }

    openModal('mobil-delete-modal');
}

export default function initMobilPage() {
    const addButton = document.getElementById('mobil-add-btn');
    const exportButton = document.getElementById('mobil-export-btn');
    const searchInput = document.getElementById('mobil-search-input');
    const filterInput = document.getElementById('mobil-filter-jenis');
    const form = document.getElementById('mobil-form');
    const tbody = document.getElementById('mobil-table-body');
    const deleteButton = document.getElementById('mobil-delete-confirm-btn');
    const prevButton = document.getElementById('mobil-prev-page-btn');
    const nextButton = document.getElementById('mobil-next-page-btn');
    const kodeInput = document.getElementById('mobil-kode');

    if (!addButton || !form || !tbody) {
        return;
    }

    addButton.addEventListener('click', () => {
        resetForm();
        openModal('mobil-form-modal');
    });

    exportButton?.addEventListener('click', () => {
        downloadFile('/export/mobil/csv', 'mobil.csv').catch(() => {
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

    filterInput?.addEventListener('change', async (event) => {
        state.filterJenis = event.target.value;
        state.page = 1;

        try {
            await fetchData();
        } catch (error) {
            toastError('Gagal memuat data');
        }
    });

    kodeInput?.addEventListener('input', (event) => {
        event.target.value = event.target.value.toUpperCase();
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const homePoolValue = document.getElementById('mobil-home-pool')?.value || '';

        const payload = {
            kode_mobil: document.getElementById('mobil-kode')?.value.trim().toUpperCase() || '',
            jenis_mobil: document.getElementById('mobil-jenis')?.value || 'Hiace',
            home_pool: homePoolValue === '' ? null : homePoolValue,
            is_active_in_trip: document.getElementById('mobil-is-active-in-trip')?.checked ?? true,
        };

        setSubmitting(true);

        try {
            if (state.editItem) {
                await apiRequest(`/mobil/${state.editItem.id}`, {
                    method: 'PUT',
                    body: payload,
                });
                toastSuccess('Data mobil berhasil diperbarui');
            } else {
                await apiRequest('/mobil', {
                    method: 'POST',
                    body: payload,
                });
                toastSuccess('Mobil berhasil ditambahkan');
            }

            closeModal('mobil-form-modal');
            resetForm();
            await fetchData();
        } catch (error) {
            toastError(error.message || 'Silakan periksa input Anda', 'Gagal menyimpan data');
        } finally {
            setSubmitting(false);
        }
    });

    tbody.addEventListener('click', async (event) => {
        const editButton = event.target.closest('[data-mobil-edit]');
        const deleteButtonTrigger = event.target.closest('[data-mobil-delete]');

        try {
            if (editButton) {
                await openEditDialog(editButton.dataset.mobilEdit);
                return;
            }

            if (deleteButtonTrigger) {
                openDeleteDialog({
                    id: deleteButtonTrigger.dataset.mobilDelete,
                    kode_mobil: deleteButtonTrigger.dataset.mobilName,
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
            await apiRequest(`/mobil/${state.deleteItem.id}`, { method: 'DELETE' });
            toastSuccess('Mobil berhasil dihapus');
            closeModal('mobil-delete-modal');

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
