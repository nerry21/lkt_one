import { apiRequest } from '../../services/http';
import { escapeHtml, setButtonBusy } from '../../services/helpers';
import { toastError, toastInfo, toastSuccess } from '../../ui/toast';

const SELECTORS = {
    container: '[data-assignments-page]',
    matrix: '[data-assignments-matrix]',
    footer: '[data-assignments-footer]',
    saveOnly: '[data-action="save-only"]',
    saveGenerate: '[data-action="save-generate"]',
};

const state = {
    date: null,
    mobils: [],
    drivers: [],
    assignments: [],
};

let rootEl = null;

function parseInitialState() {
    const scriptEl = document.getElementById('assignments-initial-state');
    if (!scriptEl) {
        return { date: null, mobils: [], drivers: [], assignments: [] };
    }
    try {
        return JSON.parse(scriptEl.textContent || '{}');
    } catch (error) {
        return { date: null, mobils: [], drivers: [], assignments: [] };
    }
}

function renderEmptyState(headline, body) {
    return `
        <div class="trip-planning-assignments-empty-state">
            <h3>${escapeHtml(headline)}</h3>
            <p>${body}</p>
        </div>
    `;
}

function renderRow(mobil, selectedDriverId) {
    const options = state.drivers
        .map((driver) => {
            const selected = String(driver.id) === String(selectedDriverId) ? ' selected' : '';
            return `<option value="${escapeHtml(driver.id)}"${selected}>${escapeHtml(driver.nama)}</option>`;
        })
        .join('');

    const poolRaw = mobil.home_pool ?? '';
    const poolClass = String(poolRaw).toLowerCase();
    const poolLabel = poolRaw || '-';

    return `
        <tr data-mobil-id="${escapeHtml(mobil.id)}" data-testid="assignments-row-${escapeHtml(mobil.kode_mobil)}">
            <td class="assignments-cell-mobil"><strong>${escapeHtml(mobil.kode_mobil)}</strong></td>
            <td class="assignments-cell-pool">
                <span class="assignments-pool-badge assignments-pool-badge--${escapeHtml(poolClass)}">${escapeHtml(poolLabel)}</span>
            </td>
            <td class="assignments-cell-driver">
                <select class="assignments-driver-select" data-driver-select data-testid="assignments-driver-select-${escapeHtml(mobil.kode_mobil)}">
                    <option value="">— Pilih Driver —</option>
                    ${options}
                </select>
            </td>
        </tr>
    `;
}

function renderMatrix() {
    const matrixEl = rootEl.querySelector(SELECTORS.matrix);
    const footerEl = rootEl.querySelector(SELECTORS.footer);
    if (!matrixEl) {
        return;
    }

    if (!Array.isArray(state.mobils) || state.mobils.length === 0) {
        matrixEl.innerHTML = renderEmptyState(
            'Belum ada mobil aktif',
            'Aktifkan mobil di <a href="/dashboard/mobil">halaman Mobil</a> untuk mulai set assignment.',
        );
        if (footerEl) {
            footerEl.hidden = true;
        }
        return;
    }

    if (!Array.isArray(state.drivers) || state.drivers.length === 0) {
        matrixEl.innerHTML = renderEmptyState(
            'Belum ada driver terdaftar',
            'Daftarkan driver di <a href="/dashboard/drivers">halaman Driver</a> dulu.',
        );
        if (footerEl) {
            footerEl.hidden = true;
        }
        return;
    }

    const assignmentsByMobilId = new Map(
        (state.assignments || []).map((assignment) => [String(assignment.mobil_id), assignment.driver_id]),
    );

    const rowsHtml = state.mobils
        .map((mobil) => renderRow(mobil, assignmentsByMobilId.get(String(mobil.id)) || ''))
        .join('');

    matrixEl.innerHTML = `
        <table class="trip-planning-assignments-table" data-testid="assignments-table">
            <thead>
                <tr>
                    <th>Mobil</th>
                    <th>Home Pool</th>
                    <th>Driver</th>
                </tr>
            </thead>
            <tbody>
                ${rowsHtml}
            </tbody>
        </table>
    `;

    if (footerEl) {
        footerEl.hidden = false;
    }
}

function collectPayload() {
    const rows = rootEl.querySelectorAll('tr[data-mobil-id]');
    const assignments = [];
    let hasMissing = false;

    rows.forEach((row) => {
        const mobilId = row.dataset.mobilId;
        const select = row.querySelector('[data-driver-select]');
        const driverId = select ? select.value : '';

        if (mobilId && driverId) {
            assignments.push({ mobil_id: mobilId, driver_id: driverId });
        } else if (mobilId) {
            hasMissing = true;
        }
    });

    return { assignments, hasMissing };
}

function extractGenerateErrorMessage(error) {
    const data = error?.data || {};

    if (data.error_code === 'TRIP_GENERATION_DRIVER_MISSING') {
        const missing = data.details?.missing_mobil_ids?.length || 0;
        return `${missing} mobil belum punya driver. Tolong periksa assignments.`;
    }

    if (data.error === 'trip_slot_conflict' || error?.status === 409) {
        return data.message || 'Trips sudah pernah digenerate untuk tanggal ini.';
    }

    return data.message || error?.message || 'Generate trips gagal.';
}

async function handleSave(alsoGenerate, buttonEl) {
    const { assignments, hasMissing } = collectPayload();

    if (assignments.length === 0) {
        toastError('Pilih minimal 1 driver untuk 1 mobil sebelum simpan.');
        return;
    }

    if (hasMissing && alsoGenerate) {
        const ok = window.confirm(
            'Ada mobil tanpa driver. Generate trips akan gagal untuk mobil aktif yang tidak lengkap. Lanjutkan hanya simpan?',
        );
        if (!ok) {
            return;
        }
        // Degrade to save-only when user keeps going.
        alsoGenerate = false;
    }

    setButtonBusy(buttonEl, true);

    try {
        const saveResp = await apiRequest('/trip-planning/assignments', {
            method: 'PUT',
            body: { date: state.date, assignments },
        });

        state.assignments = Array.isArray(saveResp?.assignments) ? saveResp.assignments : [];
        toastSuccess(`${assignments.length} assignment tersimpan.`);

        if (!alsoGenerate) {
            setButtonBusy(buttonEl, false);
            return;
        }

        toastInfo('Generating trips...');

        const genResp = await apiRequest('/trip-planning/generate', {
            method: 'POST',
            body: { date: state.date },
        });

        const result = Array.isArray(genResp?.result) ? genResp.result : [];
        const totalTrips = result.reduce((sum, row) => sum + (Array.isArray(row?.trip_ids) ? row.trip_ids.length : 0), 0);

        toastSuccess(`${totalTrips} trip berhasil digenerate. Mengalihkan ke dashboard...`);

        window.setTimeout(() => {
            window.location.href = `/dashboard/trip-planning?date=${encodeURIComponent(state.date)}`;
        }, 1500);
    } catch (error) {
        toastError(extractGenerateErrorMessage(error));
        setButtonBusy(buttonEl, false);
    }
}

function bindActions() {
    const saveOnlyBtn = rootEl.querySelector(SELECTORS.saveOnly);
    const saveGenBtn = rootEl.querySelector(SELECTORS.saveGenerate);

    if (saveOnlyBtn) {
        saveOnlyBtn.addEventListener('click', () => handleSave(false, saveOnlyBtn));
    }
    if (saveGenBtn) {
        saveGenBtn.addEventListener('click', () => handleSave(true, saveGenBtn));
    }
}

export default async function initAssignmentsPage() {
    rootEl = document.querySelector(SELECTORS.container);
    if (!rootEl) {
        return;
    }

    const initial = parseInitialState();
    state.date = initial.date || null;
    state.mobils = Array.isArray(initial.mobils) ? initial.mobils : [];
    state.drivers = Array.isArray(initial.drivers) ? initial.drivers : [];
    state.assignments = Array.isArray(initial.assignments) ? initial.assignments : [];

    renderMatrix();
    bindActions();
}
