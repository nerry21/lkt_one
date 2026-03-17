import { apiRequest } from '../../services/http';
import { buildPaginationLabel, debounce, escapeHtml } from '../../services/helpers';
import { openModal, closeModal } from '../../ui/modal';
import { toastError, toastSuccess } from '../../ui/toast';

// ─── State ────────────────────────────────────────────────────────────────────

const state = {
    data: [],
    loading: true,
    totalCount: 0,
    page: 1,
    search: '',
    detailItem: null,
    isLoadingDetail: false,
};

const limit = 20;

// ─── Icons ────────────────────────────────────────────────────────────────────

const eyeIcon = () => `<svg viewBox="0 0 24 24" fill="none">
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/>
</svg>`;

// ─── Render helpers ───────────────────────────────────────────────────────────

function confidenceBadge(confidence) {
    const map = {
        high:   ['badge-emerald', 'Tinggi'],
        medium: ['badge-blue',    'Sedang'],
        low:    ['badge-yellow',  'Rendah'],
    };
    const [cls, label] = map[confidence] ?? ['badge-gray', confidence ?? '-'];
    return `<span class="stock-value-badge ${cls}">${escapeHtml(label)}</span>`;
}

function statusBadge(status) {
    const map = {
        active:   ['stock-value-badge-emerald', 'Aktif'],
        merged:   ['stock-value-badge-blue',    'Digabung'],
        inactive: ['stock-value-badge-red',     'Nonaktif'],
    };
    const [cls, label] = map[status] ?? ['stock-value-badge-blue', status ?? '-'];
    return `<span class="stock-value-badge ${cls}">${escapeHtml(label)}</span>`;
}

function discountBadge(eligible) {
    return eligible
        ? `<span class="stock-value-badge stock-value-badge-emerald">✓ Eligible</span>`
        : `<span class="stock-value-badge stock-value-badge-blue">—</span>`;
}

// ─── Table ────────────────────────────────────────────────────────────────────

function renderLoadingState() {
    const tbody = document.getElementById('cust-table-body');
    if (!tbody) return;
    tbody.innerHTML = `
        <tr><td colspan="8" class="plkt-table-state">
            <div class="plkt-loading-inline">
                <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data...</span>
            </div>
        </td></tr>`;
}

function renderEmptyState() {
    const tbody = document.getElementById('cust-table-body');
    if (!tbody) return;
    tbody.innerHTML = `<tr><td colspan="8" class="plkt-table-state plkt-empty-copy">Belum ada data pelanggan.</td></tr>`;
}

function renderRows() {
    const tbody = document.getElementById('cust-table-body');
    if (!tbody) return;
    if (state.loading) { renderLoadingState(); return; }
    if (state.data.length === 0) { renderEmptyState(); return; }

    tbody.innerHTML = state.data.map((item, index) => `
        <tr class="plkt-row">
            <td class="plkt-index-cell">${((state.page - 1) * limit) + index + 1}</td>
            <td>
                <span class="plkt-booking-code-badge">${escapeHtml(item.customer_code || '-')}</span>
            </td>
            <td>
                <div class="plkt-user-cell">
                    <span class="plkt-user-avatar" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/>
                        </svg>
                    </span>
                    <div>
                        <span class="plkt-user-name">${escapeHtml(item.display_name || '-')}</span>
                        <span class="plkt-user-seat">${confidenceBadge(item.identity_confidence)}</span>
                    </div>
                </div>
            </td>
            <td class="plkt-phone-cell">${escapeHtml(item.phone_normalized || item.phone_original || '-')}</td>
            <td class="text-center">
                <strong>${item.total_trip_count ?? 0}</strong>
                <span style="color:var(--color-text-muted);font-size:.75rem"> / 5</span>
            </td>
            <td class="text-center">${discountBadge(item.discount_eligible)}</td>
            <td class="text-center">${statusBadge(item.status)}</td>
            <td class="text-center">
                <button class="plkt-icon-button" type="button"
                    data-cust-detail="${item.id}"
                    aria-label="Detail pelanggan ${escapeHtml(item.display_name || '')}">
                    ${eyeIcon()}
                </button>
            </td>
        </tr>`).join('');
}

function renderPagination() {
    const shell      = document.getElementById('cust-pagination-shell');
    const info       = document.getElementById('cust-pagination-info');
    const pageLabel  = document.getElementById('cust-pagination-page');
    const prevBtn    = document.getElementById('cust-prev-page-btn');
    const nextBtn    = document.getElementById('cust-next-page-btn');
    const totalPages = Math.max(1, Math.ceil(state.totalCount / limit));

    if (shell)     shell.hidden = false;
    if (info)      info.textContent = buildPaginationLabel(state.page, limit, state.totalCount, state.data.length);
    if (pageLabel) pageLabel.textContent = `${state.page} / ${totalPages}`;
    if (prevBtn)   prevBtn.disabled = state.page === 1;
    if (nextBtn)   nextBtn.disabled = state.page >= totalPages;
}

// ─── Stats ────────────────────────────────────────────────────────────────────

async function fetchStats() {
    try {
        const [allRes, eligibleRes, phoneRes] = await Promise.all([
            apiRequest('/customers?limit=1'),
            apiRequest('/customers?limit=1&discount_eligible=1'),
            apiRequest('/customers?limit=1&has_phone=1'),
        ]);

        const totalEl    = document.getElementById('cust-stat-total');
        const eligibleEl = document.getElementById('cust-stat-eligible');
        const phoneEl    = document.getElementById('cust-stat-with-phone');

        if (totalEl)    totalEl.textContent    = (allRes?.total ?? 0).toLocaleString('id-ID');
        if (eligibleEl) eligibleEl.textContent = (eligibleRes?.total ?? 0).toLocaleString('id-ID');
        if (phoneEl)    phoneEl.textContent    = (phoneRes?.total ?? 0).toLocaleString('id-ID');
    } catch (_) {
        // Stats tidak kritis — diam saja jika gagal
    }
}

// ─── Fetch ────────────────────────────────────────────────────────────────────

async function fetchData() {
    state.loading = true;
    renderRows();

    try {
        const params = new URLSearchParams({ page: state.page, limit });
        if (state.search) params.set('search', state.search);

        const res = await apiRequest(`/customers?${params.toString()}`);

        state.data       = Array.isArray(res?.data) ? res.data : [];
        state.totalCount = Number(res?.total ?? 0);
    } catch (err) {
        toastError(err.message || 'Gagal memuat data pelanggan', 'Error');
        state.data       = [];
        state.totalCount = 0;
    } finally {
        state.loading = false;
        renderRows();
        renderPagination();
    }
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────

async function openDetailModal(id) {
    const nameEl  = document.getElementById('cust-detail-name');
    const codeEl  = document.getElementById('cust-detail-code');
    const bodyEl  = document.getElementById('cust-detail-body');

    if (nameEl)  nameEl.textContent = 'Detail Pelanggan';
    if (codeEl)  codeEl.textContent = '';
    if (bodyEl)  bodyEl.innerHTML = `
        <div class="plkt-loading-inline">
            <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
            <span>Memuat detail...</span>
        </div>`;

    openModal('cust-detail-modal');

    try {
        const c = await apiRequest(`/customers/${id}`);

        if (nameEl) nameEl.textContent = c.display_name || '-';
        if (codeEl) codeEl.textContent = c.customer_code || '';

        const trips = c.recent_bookings?.length
            ? c.recent_bookings.map(b => `
                <tr>
                    <td>${escapeHtml(b.booking_code || '-')}</td>
                    <td>${escapeHtml(b.trip_date || '-')}</td>
                    <td>${escapeHtml(b.from_city || '-')} → ${escapeHtml(b.to_city || '-')}</td>
                    <td>${escapeHtml(b.booking_status || '-')}</td>
                </tr>`).join('')
            : `<tr><td colspan="4" class="plkt-table-state plkt-empty-copy">Belum ada riwayat perjalanan.</td></tr>`;

        if (bodyEl) bodyEl.innerHTML = `
            <dl class="cust-detail-dl">
                <dt>Nama</dt>
                <dd>${escapeHtml(c.display_name || '-')}</dd>
                <dt>Nomor HP</dt>
                <dd>${escapeHtml(c.phone_normalized || c.phone_original || '-')}</dd>
                <dt>Email</dt>
                <dd>${escapeHtml(c.email || '-')}</dd>
                <dt>Status</dt>
                <dd>${statusBadge(c.status)}</dd>
                <dt>Kepercayaan Data</dt>
                <dd>${confidenceBadge(c.identity_confidence)}</dd>
                <dt>Total Perjalanan</dt>
                <dd><strong>${c.total_trip_count ?? 0}</strong> / 5</dd>
                <dt>Eligible Diskon</dt>
                <dd>${discountBadge(c.discount_eligible)}</dd>
                <dt>Scan Seumur Hidup</dt>
                <dd>${c.lifetime_scan_count ?? 0}×</dd>
            </dl>

            <h4 class="cust-detail-section-title">Riwayat Perjalanan Terbaru</h4>
            <div class="plkt-table-wrap" style="margin-top:.75rem">
                <table class="plkt-table">
                    <thead>
                        <tr>
                            <th>Kode Booking</th>
                            <th>Tanggal</th>
                            <th>Rute</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>${trips}</tbody>
                </table>
            </div>`;
    } catch (err) {
        if (bodyEl) bodyEl.innerHTML = `<p class="plkt-empty-copy">Gagal memuat detail: ${escapeHtml(err.message || 'Terjadi kesalahan')}</p>`;
    }
}

// ─── Duplicates ───────────────────────────────────────────────────────────────

async function openDuplicatesInfo() {
    try {
        const res = await apiRequest('/customers/duplicates?limit=5');
        const count = res?.total ?? 0;

        if (count === 0) {
            toastSuccess('Tidak ada duplikasi pelanggan terdeteksi.', 'Tidak Ada Duplikasi');
        } else {
            toastError(
                `Terdeteksi ${count} pasang pelanggan berpotensi duplikat. Gunakan API untuk merge.`,
                `${count} Duplikasi Ditemukan`,
            );
        }
    } catch (err) {
        toastError(err.message || 'Gagal memeriksa duplikasi', 'Error');
    }
}

// ─── Init ─────────────────────────────────────────────────────────────────────

export default function initCustomersPage() {
    const searchInput = document.getElementById('cust-search-input');
    const prevBtn     = document.getElementById('cust-prev-page-btn');
    const nextBtn     = document.getElementById('cust-next-page-btn');
    const tbody       = document.getElementById('cust-table-body');
    const dupBtn      = document.getElementById('cust-duplicates-btn');

    searchInput?.addEventListener('input', debounce(async (e) => {
        state.search = e.target.value.trim();
        state.page   = 1;
        await fetchData().catch(() => toastError('Gagal memuat data'));
    }, 400));

    prevBtn?.addEventListener('click', async () => {
        if (state.page <= 1) return;
        state.page -= 1;
        await fetchData().catch(() => toastError('Gagal memuat data'));
    });

    nextBtn?.addEventListener('click', async () => {
        const totalPages = Math.max(1, Math.ceil(state.totalCount / limit));
        if (state.page >= totalPages) return;
        state.page += 1;
        await fetchData().catch(() => toastError('Gagal memuat data'));
    });

    dupBtn?.addEventListener('click', openDuplicatesInfo);

    tbody?.addEventListener('click', async (e) => {
        const detailBtn = e.target.closest('[data-cust-detail]');
        if (detailBtn) await openDetailModal(detailBtn.dataset.custDetail);
    });

    fetchData().catch(() => toastError('Gagal memuat data'));
    fetchStats().catch(() => {});
}
