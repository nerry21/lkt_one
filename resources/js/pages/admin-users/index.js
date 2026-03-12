import { apiRequest } from '../../services/http';
import { buildPaginationLabel, debounce, escapeHtml, formatDate, setButtonBusy } from '../../services/helpers';
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
    defaultRole: 'User',
};

function isAdminRole(role) {
    return ['Super Admin', 'Admin'].includes(role);
}

function isSuperAdminRole(role) {
    return role === 'Super Admin';
}

function userIcon() {
    return `
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"></circle>
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

function getRoleOptions() {
    return isSuperAdminRole(state.currentUser?.role)
        ? ['Super Admin', 'Admin', 'User']
        : ['Admin', 'User'];
}

function setSubmitting(busy) {
    setButtonBusy(document.getElementById('admin-user-submit-btn'), busy, 'Menyimpan...');
}

function roleBadgeClass(role) {
    if (role === 'Super Admin') {
        return 'admin-users-role-badge admin-users-role-badge-super';
    }

    if (role === 'Admin') {
        return 'admin-users-role-badge admin-users-role-badge-admin';
    }

    return 'admin-users-role-badge admin-users-role-badge-user';
}

function renderLoadingState() {
    const tbody = document.getElementById('admin-users-table-body');

    if (!tbody) {
        return;
    }

    tbody.innerHTML = `
        <tr>
            <td colspan="6" class="admin-users-table-state">
                <div class="admin-users-loading-inline">
                    <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>
    `;
}

function renderEmptyState(copy = 'Belum ada akun admin atau user.') {
    const tbody = document.getElementById('admin-users-table-body');

    if (!tbody) {
        return;
    }

    tbody.innerHTML = `
        <tr>
            <td colspan="6" class="admin-users-table-state admin-users-empty-copy">${escapeHtml(copy)}</td>
        </tr>
    `;
}

function renderRows() {
    const tbody = document.getElementById('admin-users-table-body');

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
        <tr class="admin-users-row" data-testid="admin-user-row-${item.id}">
            <td>
                <div class="admin-users-name-cell">
                    <span class="admin-users-avatar" aria-hidden="true">${userIcon()}</span>
                    <div>
                        <span class="admin-users-name">${escapeHtml(item.nama)}</span>
                        <span class="admin-users-name-meta">${item.is_current_user ? 'Akun yang sedang login' : 'Akun dashboard aktif'}</span>
                    </div>
                </div>
            </td>
            <td><span class="admin-users-username">@${escapeHtml(item.username)}</span></td>
            <td><span class="admin-users-email">${escapeHtml(item.email)}</span></td>
            <td>
                <div class="admin-users-password-cell">
                    <span class="admin-users-password-mask">${escapeHtml(item.password_mask)}</span>
                    <span class="admin-users-password-copy">Terenkripsi</span>
                </div>
            </td>
            <td><span class="${roleBadgeClass(item.role)}">${escapeHtml(item.role)}</span></td>
            <td>
                <div class="admin-users-action-row">
                    <button class="admin-users-icon-button" type="button" data-admin-user-show="${item.id}" data-testid="show-admin-user-${item.id}" aria-label="Lihat detail akun ${escapeHtml(item.nama)}">
                        ${eyeIcon()}
                    </button>
                    <button class="admin-users-icon-button" type="button" data-admin-user-edit="${item.id}" data-testid="edit-admin-user-${item.id}" aria-label="Edit akun ${escapeHtml(item.nama)}" ${item.can_edit ? '' : 'disabled'}>
                        ${editIcon()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-admin-user-delete="${item.id}" data-admin-user-name="${escapeHtml(item.nama)}" data-testid="delete-admin-user-${item.id}" aria-label="Hapus akun ${escapeHtml(item.nama)}" ${item.can_delete ? '' : 'disabled'}>
                        ${trashIcon()}
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderPagination() {
    const shell = document.getElementById('admin-users-pagination-shell');
    const info = document.getElementById('admin-users-pagination-info');
    const pageLabel = document.getElementById('admin-users-pagination-page');
    const prevButton = document.getElementById('admin-users-prev-page-btn');
    const nextButton = document.getElementById('admin-users-next-page-btn');
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
        const searchQuery = state.search ? `?search=${encodeURIComponent(state.search)}` : '';
        const pageQuery = `?page=${state.page}&limit=${limit}${state.search ? `&search=${encodeURIComponent(state.search)}` : ''}`;
        const [items, count] = await Promise.all([
            apiRequest(`/admin-users${pageQuery}`),
            apiRequest(`/admin-users/count${searchQuery}`),
        ]);

        state.data = Array.isArray(items) ? items : [];
        state.totalCount = Number(count.count || 0);
    } finally {
        state.loading = false;
        renderRows();
        renderPagination();
    }
}

function populateRoleOptions(selectedRole = 'User') {
    const select = document.getElementById('admin-user-role');

    if (!select) {
        return;
    }

    const roles = getRoleOptions();
    const fallbackRole = roles.includes(selectedRole) ? selectedRole : roles[0];

    select.innerHTML = roles.map((role) => `
        <option value="${escapeHtml(role)}" ${role === fallbackRole ? 'selected' : ''}>${escapeHtml(role)}</option>
    `).join('');
}

function setPasswordNote(isEdit) {
    const input = document.getElementById('admin-user-password');
    const note = document.getElementById('admin-user-password-note');

    if (input) {
        input.required = !isEdit;
        input.placeholder = isEdit ? 'Kosongkan jika tidak ingin mengubah password' : 'Masukkan password';
        input.value = '';
    }

    if (note) {
        note.textContent = isEdit
            ? 'Kosongkan password jika tidak ingin mengubah password akun ini.'
            : 'Password minimal 6 karakter dan akan disimpan dalam bentuk terenkripsi.';
    }
}

function resetForm(defaultRole = 'User') {
    const form = document.getElementById('admin-user-form');
    const title = document.getElementById('admin-user-form-title');
    const description = document.getElementById('admin-user-form-description');
    const hiddenId = document.getElementById('admin-user-id');

    form?.reset();

    if (hiddenId) {
        hiddenId.value = '';
    }

    populateRoleOptions(defaultRole);
    setPasswordNote(false);

    if (title) {
        title.textContent = defaultRole === 'Admin' ? 'Tambah Admin Baru' : 'Tambah User Baru';
    }

    if (description) {
        description.textContent = defaultRole === 'Admin'
            ? 'Lengkapi data akun untuk menambahkan admin baru'
            : 'Lengkapi data akun untuk menambahkan user baru';
    }

    state.defaultRole = defaultRole;
    state.editItem = null;
    setSubmitting(false);
}

function fillForm(item) {
    state.editItem = item;

    document.getElementById('admin-user-id').value = item.id;
    document.getElementById('admin-user-nama').value = item.nama;
    document.getElementById('admin-user-username').value = item.username;
    document.getElementById('admin-user-email').value = item.email;

    populateRoleOptions(item.role);
    setPasswordNote(true);

    document.getElementById('admin-user-form-title').textContent = 'Edit Akun';
    document.getElementById('admin-user-form-description').textContent = 'Perbarui informasi akun admin atau user di bawah ini';
    setSubmitting(false);
}

function renderDetail(item) {
    const container = document.getElementById('admin-user-detail-list');

    if (!container) {
        return;
    }

    container.innerHTML = `
        <div class="admin-users-detail-item">
            <span>Nama</span>
            <strong>${escapeHtml(item.nama)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Username</span>
            <strong>@${escapeHtml(item.username)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Email</span>
            <strong>${escapeHtml(item.email)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Password</span>
            <strong>${escapeHtml(item.password_mask)}</strong>
            <p>${escapeHtml(item.password_note)}</p>
        </div>
        <div class="admin-users-detail-item">
            <span>Role</span>
            <strong>${escapeHtml(item.role)}</strong>
        </div>
        <div class="admin-users-detail-item">
            <span>Dibuat</span>
            <strong>${escapeHtml(formatDate(item.created_at))}</strong>
        </div>
    `;
}

async function openShowDialog(id) {
    renderDetail(await apiRequest(`/admin-users/${id}`));
    openModal('admin-user-show-modal');
}

async function openEditDialog(id) {
    fillForm(await apiRequest(`/admin-users/${id}`));
    openModal('admin-user-form-modal');
}

function openDeleteDialog(item) {
    state.deleteItem = item;
    document.getElementById('admin-user-delete-copy').innerHTML = `Apakah Anda yakin ingin menghapus akun <strong>${escapeHtml(item.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`;
    openModal('admin-user-delete-modal');
}

function renderAccessDenied() {
    const note = document.getElementById('admin-users-access-note');
    const searchInput = document.getElementById('admin-users-search-input');
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
    renderEmptyState('Anda tidak memiliki akses untuk mengelola data admin dan user.');
    renderPagination();
}

export default function initAdminUsersPage({ user } = {}) {
    const addAdminButton = document.getElementById('admin-users-add-admin-btn');
    const addUserButton = document.getElementById('admin-users-add-user-btn');
    const searchInput = document.getElementById('admin-users-search-input');
    const form = document.getElementById('admin-user-form');
    const tbody = document.getElementById('admin-users-table-body');
    const deleteButton = document.getElementById('admin-user-delete-confirm-btn');
    const prevButton = document.getElementById('admin-users-prev-page-btn');
    const nextButton = document.getElementById('admin-users-next-page-btn');

    if (!addAdminButton || !addUserButton || !form || !tbody) {
        return;
    }

    state.currentUser = user || window.transitAuthUser || null;

    if (!isAdminRole(state.currentUser?.role)) {
        renderAccessDenied();
        return;
    }

    addAdminButton.addEventListener('click', () => {
        resetForm('Admin');
        openModal('admin-user-form-modal');
    });

    addUserButton.addEventListener('click', () => {
        resetForm('User');
        openModal('admin-user-form-modal');
    });

    searchInput?.addEventListener('input', debounce(async (event) => {
        state.search = event.target.value.trim();
        state.page = 1;

        try {
            await fetchData();
        } catch (error) {
            toastError(error.message || 'Gagal memuat data akun');
        }
    }));

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const payload = {
            nama: document.getElementById('admin-user-nama')?.value.trim() || '',
            username: document.getElementById('admin-user-username')?.value.trim() || '',
            email: document.getElementById('admin-user-email')?.value.trim() || '',
            password: document.getElementById('admin-user-password')?.value || '',
            role: document.getElementById('admin-user-role')?.value || 'User',
        };

        setSubmitting(true);

        try {
            if (state.editItem) {
                await apiRequest(`/admin-users/${state.editItem.id}`, {
                    method: 'PUT',
                    body: payload,
                });
                toastSuccess('Akun berhasil diperbarui');
            } else {
                await apiRequest('/admin-users', {
                    method: 'POST',
                    body: payload,
                });
                toastSuccess(payload.role === 'Admin' ? 'Admin berhasil ditambahkan' : 'User berhasil ditambahkan');
            }

            closeModal('admin-user-form-modal');
            resetForm(state.defaultRole);
            await fetchData();
        } catch (error) {
            toastError(error.message || 'Silakan periksa kembali data yang diinput', 'Gagal menyimpan akun');
        } finally {
            setSubmitting(false);
        }
    });

    tbody.addEventListener('click', async (event) => {
        const showButton = event.target.closest('[data-admin-user-show]');
        const editButton = event.target.closest('[data-admin-user-edit]');
        const deleteButtonTrigger = event.target.closest('[data-admin-user-delete]');

        try {
            if (showButton) {
                await openShowDialog(showButton.dataset.adminUserShow);
                return;
            }

            if (editButton) {
                await openEditDialog(editButton.dataset.adminUserEdit);
                return;
            }

            if (deleteButtonTrigger) {
                openDeleteDialog({
                    id: deleteButtonTrigger.dataset.adminUserDelete,
                    nama: deleteButtonTrigger.dataset.adminUserName,
                });
            }
        } catch (error) {
            toastError(error.message || 'Gagal memuat detail akun');
        }
    });

    deleteButton?.addEventListener('click', async () => {
        if (!state.deleteItem) {
            return;
        }

        try {
            await apiRequest(`/admin-users/${state.deleteItem.id}`, { method: 'DELETE' });
            toastSuccess('Akun berhasil dihapus');
            closeModal('admin-user-delete-modal');

            if ((state.page - 1) * limit >= state.totalCount - 1 && state.page > 1) {
                state.page -= 1;
            }

            state.deleteItem = null;
            await fetchData();
        } catch (error) {
            toastError(error.message || 'Gagal menghapus akun');
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
            toastError(error.message || 'Gagal memuat data akun');
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
            toastError(error.message || 'Gagal memuat data akun');
        }
    });

    return fetchData().catch((error) => {
        if (error.status === 403) {
            renderAccessDenied();
            return;
        }

        toastError(error.message || 'Gagal memuat data akun');
    });
}
