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

const STANDARD_SLOTS = ['05:30', '07:00', '09:00', '13:00', '16:00', '19:00'];

const DIRECTIONS = {
    OUTBOUND: 'ROHUL_TO_PKB',
    RETURN: 'PKB_TO_ROHUL',
};

const PIN_VALUE_AUTO = '';
const PIN_VALUE_CUSTOM = '__custom__';

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

/**
 * Normalize trip_time dari API (HH:MM:SS) ke HH:MM.
 */
function timeToSlotValue(time) {
    if (!time) return '';
    return String(time).slice(0, 5);
}

/**
 * Cari pin direction tertentu di assignment.
 * Returns 'HH:MM' atau null.
 */
function findPinTime(assignment, direction) {
    if (!assignment || !Array.isArray(assignment.pins)) return null;
    const pin = assignment.pins.find((p) => p.direction === direction);
    return pin ? timeToSlotValue(pin.trip_time) : null;
}

/**
 * E5 PR #4: Cari loket_origin pin direction tertentu di assignment.
 * Returns 'PKB' | 'ROHUL' | null.
 */
function findPinLoket(assignment, direction) {
    if (!assignment || !Array.isArray(assignment.pins)) return null;
    const pin = assignment.pins.find((p) => p.direction === direction);
    return pin?.loket_origin ?? null;
}

/**
 * Render 1 cell pin (Outbound atau Return).
 * - currentTime null → "— Auto —" selected
 * - currentTime ∈ STANDARD_SLOTS → slot tsb selected
 * - currentTime selain itu → "Custom" selected, input time visible
 *
 * E5 PR #4: tambah dropdown loket override (Otomatis/PKB/ROHUL) di stack
 * yang sama. Loket override hanya bermakna kalau pin jam aktif (lihat
 * collectPinsForRow — di-skip kalau jam Auto).
 */
function renderPinCell(mobilKode, direction, currentTime, currentLoket) {
    const isStandard = currentTime !== null && STANDARD_SLOTS.includes(currentTime);
    const isCustom = currentTime !== null && !isStandard;

    let selectedValue = PIN_VALUE_AUTO;
    if (isStandard) selectedValue = currentTime;
    else if (isCustom) selectedValue = PIN_VALUE_CUSTOM;

    const slotOptions = STANDARD_SLOTS.map((slot) => {
        const sel = slot === selectedValue ? ' selected' : '';
        return `<option value="${slot}"${sel}>${slot}</option>`;
    }).join('');

    const autoSel = selectedValue === PIN_VALUE_AUTO ? ' selected' : '';
    const customSel = selectedValue === PIN_VALUE_CUSTOM ? ' selected' : '';

    const customInputValue = isCustom ? escapeHtml(currentTime) : '';
    const customInputHidden = isCustom ? '' : ' hidden';

    const directionAttr = escapeHtml(direction);
    const directionSlug = direction === DIRECTIONS.OUTBOUND ? 'outbound' : 'return';
    const testIdSelect = `assignments-pin-${directionSlug}-${escapeHtml(mobilKode)}`;
    const testIdCustom = `${testIdSelect}-custom`;
    const testIdLoket = `assignments-loket-${directionSlug}-${escapeHtml(mobilKode)}`;

    // E5 PR #4: dropdown loket override.
    const loketOptions = [
        { value: '', label: '— Otomatis —' },
        { value: 'PKB', label: 'PKB' },
        { value: 'ROHUL', label: 'ROHUL' },
    ];
    const loketSelectHtml = loketOptions.map((o) => {
        const sel = String(currentLoket || '') === o.value ? ' selected' : '';
        return `<option value="${o.value}"${sel}>${escapeHtml(o.label)}</option>`;
    }).join('');

    return `
        <td class="assignments-cell-pin" data-pin-cell data-direction="${directionAttr}">
            <div class="assignments-pin-stack">
                <select class="assignments-pin-select" data-pin-select data-testid="${testIdSelect}">
                    <option value="${PIN_VALUE_AUTO}"${autoSel}>— Auto —</option>
                    ${slotOptions}
                    <option value="${PIN_VALUE_CUSTOM}"${customSel}>Custom...</option>
                </select>
                <input
                    type="time"
                    class="assignments-pin-custom-input"
                    data-pin-custom-input
                    data-testid="${testIdCustom}"
                    value="${customInputValue}"${customInputHidden}
                />
                <select class="assignments-loket-select" data-pin-loket data-testid="${testIdLoket}">
                    ${loketSelectHtml}
                </select>
            </div>
        </td>
    `;
}

function renderRow(mobil, assignment) {
    const selectedDriverId = assignment ? assignment.driver_id : '';

    const driverOptions = state.drivers
        .map((driver) => {
            const selected = String(driver.id) === String(selectedDriverId) ? ' selected' : '';
            return `<option value="${escapeHtml(driver.id)}"${selected}>${escapeHtml(driver.nama)}</option>`;
        })
        .join('');

    const poolRaw = mobil.home_pool ?? '';
    const poolClass = String(poolRaw).toLowerCase();
    const poolLabel = poolRaw || '-';

    const pinOutbound = findPinTime(assignment, DIRECTIONS.OUTBOUND);
    const pinReturn = findPinTime(assignment, DIRECTIONS.RETURN);
    // E5 PR #4: loket override per pin direction.
    const loketOutbound = findPinLoket(assignment, DIRECTIONS.OUTBOUND);
    const loketReturn = findPinLoket(assignment, DIRECTIONS.RETURN);

    return `
        <tr data-mobil-id="${escapeHtml(mobil.id)}" data-testid="assignments-row-${escapeHtml(mobil.kode_mobil)}">
            <td class="assignments-cell-mobil"><strong>${escapeHtml(mobil.kode_mobil)}</strong></td>
            <td class="assignments-cell-pool">
                <span class="assignments-pool-badge assignments-pool-badge--${escapeHtml(poolClass)}">${escapeHtml(poolLabel)}</span>
            </td>
            <td class="assignments-cell-driver">
                <select class="assignments-driver-select" data-driver-select data-testid="assignments-driver-select-${escapeHtml(mobil.kode_mobil)}">
                    <option value="">— Pilih Driver —</option>
                    ${driverOptions}
                </select>
            </td>
            ${renderPinCell(mobil.kode_mobil, DIRECTIONS.OUTBOUND, pinOutbound, loketOutbound)}
            ${renderPinCell(mobil.kode_mobil, DIRECTIONS.RETURN, pinReturn, loketReturn)}
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
        if (footerEl) footerEl.hidden = true;
        return;
    }

    if (!Array.isArray(state.drivers) || state.drivers.length === 0) {
        matrixEl.innerHTML = renderEmptyState(
            'Belum ada driver terdaftar',
            'Daftarkan driver di <a href="/dashboard/drivers">halaman Driver</a> dulu.',
        );
        if (footerEl) footerEl.hidden = true;
        return;
    }

    const assignmentsByMobilId = new Map(
        (state.assignments || []).map((assignment) => [String(assignment.mobil_id), assignment]),
    );

    const rowsHtml = state.mobils
        .map((mobil) => renderRow(mobil, assignmentsByMobilId.get(String(mobil.id)) || null))
        .join('');

    matrixEl.innerHTML = `
        <table class="trip-planning-assignments-table" data-testid="assignments-table">
            <thead>
                <tr>
                    <th>Mobil</th>
                    <th>Home Pool</th>
                    <th>Driver</th>
                    <th>Pin Outbound<small>ROHUL → PKB</small></th>
                    <th>Pin Return<small>PKB → ROHUL</small></th>
                </tr>
            </thead>
            <tbody>
                ${rowsHtml}
            </tbody>
        </table>
    `;

    bindPinCellEvents();

    if (footerEl) footerEl.hidden = false;
}

/**
 * Toggle visibility custom time input saat dropdown change.
 */
function bindPinCellEvents() {
    rootEl.querySelectorAll('[data-pin-cell]').forEach((cell) => {
        const select = cell.querySelector('[data-pin-select]');
        const customInput = cell.querySelector('[data-pin-custom-input]');
        if (!select || !customInput) return;

        select.addEventListener('change', () => {
            if (select.value === PIN_VALUE_CUSTOM) {
                customInput.hidden = false;
                customInput.focus();
            } else {
                customInput.hidden = true;
                customInput.value = '';
            }
        });
    });
}

/**
 * Build pins[] untuk 1 row dari 2 cell pin.
 * Returns array of {direction, trip_time} — 0 sampai 2 entries.
 * Throws Error kalau Custom dipilih tapi input time kosong/invalid.
 */
function collectPinsForRow(rowEl, mobilKode) {
    const pins = [];

    rowEl.querySelectorAll('[data-pin-cell]').forEach((cell) => {
        const direction = cell.dataset.direction;
        const select = cell.querySelector('[data-pin-select]');
        const customInput = cell.querySelector('[data-pin-custom-input]');
        const loketSelect = cell.querySelector('[data-pin-loket]');

        if (!select) return;
        const value = select.value;

        // E5 PR #4: kalau jam Auto, loket override DI-IGNORE — loket meaningful
        // hanya kalau pin aktif. Pass 2 (auto-fill) tidak baca loket field.
        if (value === PIN_VALUE_AUTO) {
            return;
        }

        let tripTime;
        if (value === PIN_VALUE_CUSTOM) {
            const customVal = (customInput?.value || '').trim();
            if (!customVal) {
                throw new Error(`Mobil ${mobilKode}: Pin custom dipilih tapi jam belum diisi.`);
            }
            tripTime = customVal;
        } else {
            tripTime = value;
        }

        const pin = { direction, trip_time: tripTime };

        // E5 PR #4: loket override (PKB/ROHUL). Empty string = "— Otomatis —" → omit field.
        const loketValue = loketSelect?.value || '';
        if (loketValue) {
            pin.loket_origin = loketValue;
        }

        pins.push(pin);
    });

    return pins;
}

function collectPayload() {
    const rows = rootEl.querySelectorAll('tr[data-mobil-id]');
    const assignments = [];
    let hasMissing = false;
    const collectErrors = [];

    rows.forEach((row) => {
        const mobilId = row.dataset.mobilId;
        const select = row.querySelector('[data-driver-select]');
        const driverId = select ? select.value : '';
        const mobilKode = row.dataset.testid?.replace('assignments-row-', '') || mobilId;

        if (mobilId && driverId) {
            try {
                const pins = collectPinsForRow(row, mobilKode);
                const item = { mobil_id: mobilId, driver_id: driverId };
                if (pins.length > 0) {
                    item.pins = pins;
                }
                assignments.push(item);
            } catch (err) {
                collectErrors.push(err.message);
            }
        } else if (mobilId) {
            hasMissing = true;
        }
    });

    return { assignments, hasMissing, collectErrors };
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

    if (error?.status === 422 && data.errors) {
        const firstField = Object.keys(data.errors)[0];
        if (firstField && firstField.includes('pins')) {
            return data.errors[firstField][0] || 'Validasi pin gagal.';
        }
    }

    return data.message || error?.message || 'Generate trips gagal.';
}

async function handleSave(alsoGenerate, buttonEl) {
    const { assignments, hasMissing, collectErrors } = collectPayload();

    if (collectErrors.length > 0) {
        toastError(collectErrors[0]);
        return;
    }

    if (assignments.length === 0) {
        toastError('Pilih minimal 1 driver untuk 1 mobil sebelum simpan.');
        return;
    }

    if (hasMissing && alsoGenerate) {
        const ok = window.confirm(
            'Ada mobil tanpa driver. Generate trips akan gagal untuk mobil aktif yang tidak lengkap. Lanjutkan hanya simpan?',
        );
        if (!ok) return;
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
            renderMatrix();
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
    if (!rootEl) return;

    const initial = parseInitialState();
    state.date = initial.date || null;
    state.mobils = Array.isArray(initial.mobils) ? initial.mobils : [];
    state.drivers = Array.isArray(initial.drivers) ? initial.drivers : [];
    state.assignments = Array.isArray(initial.assignments) ? initial.assignments : [];

    renderMatrix();
    bindActions();
}
