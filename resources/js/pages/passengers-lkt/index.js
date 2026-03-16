import { apiRequest } from '../../services/http';
import { buildPaginationLabel, debounce, escapeHtml } from '../../services/helpers';
import { toastError } from '../../ui/toast';

// ─── State ────────────────────────────────────────────────────────────────────

const state = {
    data: [],
    loading: true,
    totalCount: 0,
    page: 1,
    search: '',
    chartLimit: 15,
};

let chartInstance = null;
const limit = 15;

// ─── Table ────────────────────────────────────────────────────────────────────

function renderLoadingState() {
    const tbody = document.getElementById('plkt-table-body');
    if (!tbody) return;
    tbody.innerHTML = `
        <tr>
            <td colspan="8" class="plkt-table-state">
                <div class="plkt-loading-inline">
                    <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat data...</span>
                </div>
            </td>
        </tr>`;
}

function renderEmptyState() {
    const tbody = document.getElementById('plkt-table-body');
    if (!tbody) return;
    tbody.innerHTML = `
        <tr>
            <td colspan="8" class="plkt-table-state plkt-empty-copy">
                Belum ada data penumpang.
            </td>
        </tr>`;
}

function renderRows() {
    const tbody = document.getElementById('plkt-table-body');
    if (!tbody) return;

    if (state.loading) { renderLoadingState(); return; }
    if (state.data.length === 0) { renderEmptyState(); return; }

    tbody.innerHTML = state.data.map((item, index) => `
        <tr class="plkt-row">
            <td class="plkt-index-cell">${((state.page - 1) * limit) + index + 1}</td>
            <td>
                <div class="plkt-user-cell">
                    <span class="plkt-user-avatar" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/>
                        </svg>
                    </span>
                    <div>
                        <span class="plkt-user-name">${escapeHtml(item.passenger_name || '-')}</span>
                        <span class="plkt-user-seat">Kursi ${escapeHtml(item.seat_no || '-')}</span>
                    </div>
                </div>
            </td>
            <td class="plkt-phone-cell">${escapeHtml(item.phone || '-')}</td>
            <td>${escapeHtml(item.from_city || '-')}</td>
            <td>${escapeHtml(item.to_city || '-')}</td>
            <td class="plkt-date-cell">${escapeHtml(item.trip_date || '-')}</td>
            <td class="plkt-time-cell">${escapeHtml(item.trip_time || '-')}</td>
            <td class="plkt-tarif-cell">${escapeHtml(item.tarif || '-')}</td>
        </tr>`).join('');
}

function renderPagination() {
    const shell     = document.getElementById('plkt-pagination-shell');
    const info      = document.getElementById('plkt-pagination-info');
    const pageLabel = document.getElementById('plkt-pagination-page');
    const prevBtn   = document.getElementById('plkt-prev-page-btn');
    const nextBtn   = document.getElementById('plkt-next-page-btn');
    const totalPages = Math.max(1, Math.ceil(state.totalCount / limit));

    if (shell) shell.hidden = totalPages <= 1;
    if (info)  info.textContent = buildPaginationLabel(state.page, limit, state.totalCount, state.data.length);
    if (pageLabel) pageLabel.textContent = `${state.page} / ${totalPages}`;
    if (prevBtn) prevBtn.disabled = state.page === 1;
    if (nextBtn) nextBtn.disabled = state.page >= totalPages;
}

async function fetchData() {
    state.loading = true;
    renderRows();
    renderPagination();

    try {
        const [dataRes, countRes] = await Promise.all([
            apiRequest(`/passengers-lkt?page=${state.page}&limit=${limit}${state.search ? `&search=${encodeURIComponent(state.search)}` : ''}`),
            apiRequest(`/passengers-lkt/count${state.search ? `?search=${encodeURIComponent(state.search)}` : ''}`),
        ]);

        state.data       = Array.isArray(dataRes) ? dataRes : [];
        state.totalCount = Number(countRes?.count || 0);
    } catch (err) {
        toastError(err.message || 'Gagal memuat data', 'Error');
        state.data       = [];
        state.totalCount = 0;
    } finally {
        state.loading = false;
        renderRows();
        renderPagination();
    }
}

// ─── Chart ────────────────────────────────────────────────────────────────────

async function fetchAndRenderChart() {
    const canvas = document.getElementById('plkt-loyalty-chart');
    const emptyEl = document.getElementById('plkt-chart-empty');
    if (!canvas) return;

    try {
        const rows = await apiRequest(`/passengers-lkt/loyalty-chart?limit=${state.chartLimit}`);

        if (!Array.isArray(rows) || rows.length === 0) {
            canvas.hidden = true;
            if (emptyEl) emptyEl.hidden = false;
            return;
        }

        canvas.hidden = false;
        if (emptyEl) emptyEl.hidden = true;

        const labels = rows.map(r => r.passenger_name + (r.phone && r.phone !== '-' ? ` (${r.phone})` : ''));
        const values = rows.map(r => r.booking_count);

        // Color gradient based on count
        const maxCount = Math.max(...values, 1);
        const bgColors = values.map(v => {
            const ratio = v / maxCount;
            const r = Math.round(26 + (ratio * 30));
            const g = Math.round(35 + (ratio * 80));
            const b = Math.round(126 + (ratio * 50));
            return `rgba(${r}, ${g}, ${b}, 0.85)`;
        });

        if (chartInstance) {
            chartInstance.destroy();
            chartInstance = null;
        }

        chartInstance = new window.Chart(canvas, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Jumlah Pemesanan',
                    data: values,
                    backgroundColor: bgColors,
                    borderRadius: 6,
                    borderSkipped: false,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            title: (items) => items[0].label,
                            label: (item) => ` ${item.raw} kali pemesanan`,
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            maxRotation: 35,
                            font: { size: 11 },
                            color: '#374151',
                        },
                        grid: { display: false },
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            color: '#374151',
                            font: { size: 11 },
                        },
                        grid: { color: 'rgba(0,0,0,0.06)' },
                    },
                },
            },
        });
    } catch (err) {
        if (emptyEl) emptyEl.hidden = false;
    }
}

// ─── Export CSV ───────────────────────────────────────────────────────────────

function exportCsv() {
    if (state.data.length === 0) {
        toastError('Tidak ada data untuk diekspor.');
        return;
    }

    const headers = ['No', 'Nama Penumpang', 'No HP', 'Dari', 'Tujuan', 'Tanggal Berangkat', 'Jam', 'Tarif'];
    const rows = state.data.map((item, i) => [
        ((state.page - 1) * limit) + i + 1,
        item.passenger_name || '-',
        item.phone || '-',
        item.from_city || '-',
        item.to_city || '-',
        item.trip_date || '-',
        item.trip_time || '-',
        item.tarif || '-',
    ]);

    const csvContent = [headers, ...rows]
        .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        .join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'data-penumpang-lkt.csv';
    a.click();
    URL.revokeObjectURL(url);
}

// ─── Init ─────────────────────────────────────────────────────────────────────

export default function initPassengerLktPage() {
    const searchInput  = document.getElementById('plkt-search-input');
    const prevBtn      = document.getElementById('plkt-prev-page-btn');
    const nextBtn      = document.getElementById('plkt-next-page-btn');
    const exportBtn    = document.getElementById('plkt-export-btn');
    const chartLimit   = document.getElementById('plkt-chart-limit');

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

    exportBtn?.addEventListener('click', exportCsv);

    chartLimit?.addEventListener('change', async (e) => {
        state.chartLimit = parseInt(e.target.value, 10) || 15;
        await fetchAndRenderChart().catch(() => {});
    });

    fetchData().catch(() => toastError('Gagal memuat data'));
    fetchAndRenderChart().catch(() => {});
}
