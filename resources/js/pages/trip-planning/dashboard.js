import { apiRequest } from '../../services/http';
import { escapeHtml, setButtonBusy } from '../../services/helpers';
import { openModal, closeModal } from '../../ui/modal';
import { toastError, toastInfo, toastSuccess } from '../../ui/toast';

const DIRECTION_LABELS = {
    ROHUL_TO_PKB: 'ROHUL → PKB',
    PKB_TO_ROHUL: 'PKB → ROHUL',
};

const STATS_REFETCH_DEBOUNCE_MS = 500;
const SOFT_CONFIRM_WINDOW_MS = 2000;

// Slots whitelist — MUST match server-side TripGenerationService::SLOTS and
// GantiJamRequest::VALID_SLOTS. Update ketiganya bersamaan kalau slots berubah.
const GANTI_JAM_SLOTS = ['05:30:00', '07:00:00', '09:00:00', '13:00:00', '16:00:00', '19:00:00'];

const state = {
    targetDate: null,
    trips: [],
    statistics: [],
};

let statsRefetchTimer = null;
const softConfirmTimers = new Map();

function parseInitialState() {
    const element = document.getElementById('trip-planning-initial-state');
    if (!element) {
        return { target_date: null, trips: [], statistics: [] };
    }
    try {
        return JSON.parse(element.textContent || '{}');
    } catch (error) {
        return { target_date: null, trips: [], statistics: [] };
    }
}

function renderActionButtons(trip) {
    const status = trip.status;
    const substatus = trip.keluar_trip_substatus;
    const tripId = trip.id;
    const buttons = [];

    if (status === 'scheduled' && trip.trip_time) {
        buttons.push(`<button type="button" class="trip-planning-action-btn trip-planning-action-btn--success" data-action="berangkat" data-trip-id="${tripId}" data-testid="btn-berangkat-${tripId}">Berangkat</button>`);
    }
    if (status === 'scheduled') {
        buttons.push(`<button type="button" class="trip-planning-action-btn trip-planning-action-btn--danger" data-action="tidak-berangkat" data-trip-id="${tripId}" data-testid="btn-tidak-berangkat-${tripId}">Tidak Berangkat</button>`);
    }
    if (status === 'keluar_trip' && substatus === 'out') {
        buttons.push(`<button type="button" class="trip-planning-action-btn trip-planning-action-btn--neutral" data-action="waiting-list" data-trip-id="${tripId}" data-testid="btn-waiting-list-${tripId}">Waiting List</button>`);
        buttons.push(`<button type="button" class="trip-planning-action-btn trip-planning-action-btn--neutral" data-action="tidak-keluar-trip" data-trip-id="${tripId}" data-testid="btn-tidak-keluar-trip-${tripId}">Tidak Keluar Trip</button>`);
    }
    if (status === 'keluar_trip' && substatus === 'waiting_list') {
        buttons.push(`<button type="button" class="trip-planning-action-btn trip-planning-action-btn--success" data-action="returning" data-trip-id="${tripId}" data-testid="btn-returning-${tripId}">Returning</button>`);
    }
    if (status === 'scheduled') {
        const tripTimeAttr = escapeHtml(trip.trip_time ?? '');
        buttons.push(`<button type="button" class="trip-planning-action-btn trip-planning-action-btn--neutral" data-action="open-ganti-jam-modal" data-trip-id="${tripId}" data-trip-time="${tripTimeAttr}" data-testid="btn-ganti-jam-${tripId}">Ganti Jam</button>`);

        const homePool = escapeHtml(trip.mobil?.home_pool ?? '');
        buttons.push(`<button type="button" class="trip-planning-action-btn trip-planning-action-btn--danger" data-action="open-keluar-trip-modal" data-trip-id="${tripId}" data-mobil-home-pool="${homePool}" data-testid="btn-keluar-trip-${tripId}">Keluar Trip</button>`);
    }

    return buttons.join('');
}

function renderTripRowInner(trip) {
    const direction = DIRECTION_LABELS[trip.direction] || trip.direction || '';
    const directionClass = String(trip.direction || '').toLowerCase().replace(/_/g, '-');
    const mobilCode = escapeHtml(trip.mobil?.code ?? trip.mobil?.kode_mobil ?? '-');
    const driverName = escapeHtml(trip.driver?.name ?? trip.driver?.nama ?? '-');
    const tripTime = trip.trip_time ? escapeHtml(trip.trip_time) : '(waiting)';
    const status = trip.status || '';
    const substatus = trip.keluar_trip_substatus;
    const statusDisplay = substatus ? `${status} · ${substatus}` : status;

    return `
        <td>${mobilCode}</td>
        <td>${driverName}</td>
        <td>
            <span class="trip-planning-direction-badge trip-planning-direction-badge--${escapeHtml(directionClass)}">
                ${escapeHtml(direction)}
            </span>
        </td>
        <td>${tripTime}</td>
        <td>${Number(trip.sequence) || 0}</td>
        <td>
            <span class="trip-planning-status-badge trip-planning-status-badge--${escapeHtml(status)}">
                ${escapeHtml(statusDisplay)}
            </span>
        </td>
        <td class="trip-planning-actions-cell">
            <div class="trip-planning-action-group" data-trip-actions>
                ${renderActionButtons(trip)}
            </div>
        </td>
    `;
}

function updateTripRow(updatedTrip) {
    const row = document.querySelector(`tr[data-trip-id="${updatedTrip.id}"]`);
    if (!row) {
        return;
    }

    row.innerHTML = renderTripRowInner(updatedTrip);

    const pendingTimer = softConfirmTimers.get(String(updatedTrip.id));
    if (pendingTimer) {
        clearTimeout(pendingTimer);
        softConfirmTimers.delete(String(updatedTrip.id));
    }

    const idx = state.trips.findIndex((t) => String(t.id) === String(updatedTrip.id));
    if (idx !== -1) {
        state.trips[idx] = updatedTrip;
    }
}

function renderStatistics(statistics) {
    const grid = document.querySelector('[data-testid="trip-planning-stats-grid"]');
    if (!grid) {
        return;
    }

    if (!Array.isArray(statistics) || statistics.length === 0) {
        grid.innerHTML = `<div class="dashboard-empty-state dashboard-empty-state--block">Belum ada mobil aktif di sistem Trip Planning</div>`;
        return;
    }

    grid.innerHTML = statistics.map((stat) => {
        const ppFormatted = Number(stat.pp_count || 0).toFixed(1).replace('.', ',');
        const poolTag = stat.home_pool
            ? `<span class="trip-planning-pool-tag">${escapeHtml(stat.home_pool)}</span>`
            : '';

        const breakdown = stat.status_breakdown || {};
        const breakdownEntries = Object.entries(breakdown);
        const breakdownHtml = breakdownEntries.length === 0
            ? `<span class="trip-planning-status-breakdown-empty">Belum ada trip</span>`
            : breakdownEntries
                .map(([statusKey, count]) => `<span class="trip-planning-status-badge trip-planning-status-badge--${escapeHtml(statusKey)}">${escapeHtml(statusKey)}: ${Number(count) || 0}</span>`)
                .join(' ');

        return `
            <article class="dashboard-stat-card dashboard-stat-card--emerald" data-testid="mobil-stat-${escapeHtml(stat.mobil_code)}">
                <span class="dashboard-stat-orb dashboard-stat-orb--emerald" aria-hidden="true"></span>
                <div class="dashboard-stat-card-body">
                    <div class="dashboard-stat-copy">
                        <p class="dashboard-stat-label">${escapeHtml(stat.mobil_code)} ${poolTag}</p>
                        <p class="dashboard-stat-value" data-mobil-pp="${escapeHtml(stat.mobil_id)}">${ppFormatted} PP</p>
                        <div class="trip-planning-status-breakdown">${breakdownHtml}</div>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

function normalizeStatisticsFromDashboardPayload(payload) {
    // GET /api/trip-planning/dashboard mengembalikan shape D2:
    //   { date, statistics: { per_mobil: [...], total_berangkat, ... }, trips_*, assignments_tomorrow }
    // View E1 pakai shape flat per-mobil: [{mobil_id, mobil_code, home_pool, pp_count, status_breakdown}, ...]
    //
    // D2 per_mobil hanya include mobil yang punya trip hari ini, dan field `kode_mobil`
    // (bukan `mobil_code`) serta tidak ada `status_breakdown`. Fallback: kalau stat item
    // tidak punya mobil_code/status_breakdown, derive dari field yang ada.
    const statistics = payload?.statistics;
    if (!statistics) {
        return [];
    }

    if (Array.isArray(statistics)) {
        return statistics;
    }

    if (Array.isArray(statistics.per_mobil)) {
        return statistics.per_mobil.map((entry) => ({
            mobil_id: entry.mobil_id,
            mobil_code: entry.mobil_code ?? entry.kode_mobil ?? '',
            home_pool: entry.home_pool ?? null,
            pp_count: entry.pp_count ?? 0,
            status_breakdown: entry.status_breakdown ?? {},
        }));
    }

    return [];
}

function scheduleStatsRefetch() {
    if (statsRefetchTimer) {
        clearTimeout(statsRefetchTimer);
    }

    statsRefetchTimer = setTimeout(async () => {
        const date = state.targetDate;
        if (!date) {
            return;
        }

        try {
            const data = await apiRequest(`/trip-planning/dashboard?date=${encodeURIComponent(date)}`);
            const normalized = normalizeStatisticsFromDashboardPayload(data);
            state.statistics = normalized;
            renderStatistics(normalized);
        } catch (error) {
            // Stats refetch tidak kritis — user sudah dapat feedback via row update + toast action
            if (window.console) {
                console.warn('[trip-planning] Stats refetch failed:', error.message);
            }
        }
    }, STATS_REFETCH_DEBOUNCE_MS);
}

function extractErrorDisplay(error) {
    const data = error?.data || {};
    if (data.error_code === 'TRIP_VERSION_CONFLICT') {
        return 'Trip baru saja diubah oleh admin lain. Silakan refresh halaman.';
    }
    if (data.error_code === 'TRIP_INVALID_TRANSITION') {
        return data.message || 'Transisi trip tidak valid';
    }
    if (data.error_code === 'TRIP_SLOT_CONFLICT') {
        return data.message || 'Konflik slot trip';
    }
    return error?.message || 'Aksi gagal';
}

async function executeAction(tripId, action, button) {
    setButtonBusy(button, true);

    try {
        const response = await apiRequest(`/trip-planning/trips/${encodeURIComponent(tripId)}/${action}`, {
            method: 'PATCH',
        });

        if (response?.trip) {
            updateTripRow(response.trip);
            toastSuccess(response.message || 'Aksi berhasil');
            scheduleStatsRefetch();
        } else {
            setButtonBusy(button, false);
        }
    } catch (error) {
        toastError(extractErrorDisplay(error));
        setButtonBusy(button, false);
    }
}

function handleTidakBerangkatWithSoftConfirm(tripId, button) {
    const key = String(tripId);
    const existingTimer = softConfirmTimers.get(key);

    if (existingTimer) {
        clearTimeout(existingTimer);
        softConfirmTimers.delete(key);
        button.classList.remove('trip-planning-action-btn--confirming');
        // Biarkan setButtonBusy baca defaultText original sebelum set ulang teks.
        delete button.dataset.defaultText;
        button.textContent = 'Tidak Berangkat';
        executeAction(tripId, 'tidak-berangkat', button);
        return;
    }

    button.textContent = 'Klik lagi (2s)';
    button.classList.add('trip-planning-action-btn--confirming');

    const timer = setTimeout(() => {
        button.textContent = 'Tidak Berangkat';
        button.classList.remove('trip-planning-action-btn--confirming');
        softConfirmTimers.delete(key);
    }, SOFT_CONFIRM_WINDOW_MS);

    softConfirmTimers.set(key, timer);
}

function openGantiJamModal(tripId, currentTripTime) {
    const form = document.getElementById('trip-planning-ganti-jam-form');
    const tripIdInput = document.getElementById('trip-planning-ganti-jam-trip-id');
    const currentTimeDisplay = document.getElementById('trip-planning-ganti-jam-current-time');
    const select = document.getElementById('trip-planning-ganti-jam-new-time');

    if (!form || !tripIdInput || !currentTimeDisplay || !select) {
        return;
    }

    form.reset();
    tripIdInput.value = String(tripId);
    currentTimeDisplay.textContent = currentTripTime || '(waiting list)';

    if (currentTripTime && GANTI_JAM_SLOTS.includes(currentTripTime)) {
        select.value = currentTripTime;
    }

    openModal('trip-planning-ganti-jam-modal');
}

async function submitGantiJam(event) {
    event.preventDefault();

    const tripIdInput = document.getElementById('trip-planning-ganti-jam-trip-id');
    const select = document.getElementById('trip-planning-ganti-jam-new-time');
    const submitButton = document.getElementById('trip-planning-ganti-jam-submit');

    if (!tripIdInput || !select || !submitButton) {
        return;
    }

    const tripId = tripIdInput.value;
    const newTripTime = select.value;

    if (!tripId || !newTripTime) {
        toastError('Pilih slot baru terlebih dahulu');
        return;
    }

    setButtonBusy(submitButton, true);

    try {
        const response = await apiRequest(`/trip-planning/trips/${encodeURIComponent(tripId)}/ganti-jam`, {
            method: 'PATCH',
            body: { new_trip_time: newTripTime },
        });

        if (response?.trip) {
            updateTripRow(response.trip);
            toastSuccess(response.message || 'Jam trip berhasil diubah');
            scheduleStatsRefetch();
        }

        closeModal('trip-planning-ganti-jam-modal');
    } catch (error) {
        toastError(extractErrorDisplay(error));
    } finally {
        setButtonBusy(submitButton, false);
    }
}

function updateKeluarTripEndDateLabel(reason) {
    const asterisk = document.getElementById('trip-planning-keluar-trip-end-date-asterisk');
    const hint = document.getElementById('trip-planning-keluar-trip-end-date-hint');
    const dateInput = document.getElementById('trip-planning-keluar-trip-end-date');

    if (!asterisk || !hint || !dateInput) {
        return;
    }

    if (reason === 'rental') {
        asterisk.hidden = false;
        hint.textContent = '(wajib untuk rental, min 2 hari kontrak)';
        dateInput.required = true;
    } else {
        asterisk.hidden = true;
        hint.textContent = '(opsional untuk dropping)';
        dateInput.required = false;
    }
}

function openKeluarTripModal(tripId, mobilHomePool) {
    const form = document.getElementById('trip-planning-keluar-trip-form');
    const tripIdInput = document.getElementById('trip-planning-keluar-trip-trip-id');

    if (!form || !tripIdInput) {
        return;
    }

    form.reset();
    tripIdInput.value = String(tripId);

    if (mobilHomePool === 'PKB' || mobilHomePool === 'ROHUL') {
        const radio = form.querySelector(`input[name="pool_target"][value="${mobilHomePool}"]`);
        if (radio) {
            radio.checked = true;
        }
    }

    updateKeluarTripEndDateLabel(null);

    openModal('trip-planning-keluar-trip-modal');
}

async function submitKeluarTrip(event) {
    event.preventDefault();

    const form = document.getElementById('trip-planning-keluar-trip-form');
    const tripIdInput = document.getElementById('trip-planning-keluar-trip-trip-id');
    const submitButton = document.getElementById('trip-planning-keluar-trip-submit');

    if (!form || !tripIdInput || !submitButton) {
        return;
    }

    const tripId = tripIdInput.value;
    const formData = new FormData(form);
    const reason = formData.get('reason');
    const poolTarget = formData.get('pool_target');
    const plannedEndDate = (formData.get('planned_end_date') || '').trim();
    const note = (formData.get('note') || '').trim();

    if (!tripId || !reason || !poolTarget) {
        toastError('Lengkapi reason dan pool tujuan');
        return;
    }

    if (reason === 'rental' && !plannedEndDate) {
        toastError('Planned end date wajib diisi untuk rental');
        return;
    }

    const payload = {
        reason,
        pool_target: poolTarget,
    };
    if (plannedEndDate) {
        payload.planned_end_date = plannedEndDate;
    }
    if (note) {
        payload.note = note;
    }

    setButtonBusy(submitButton, true);

    try {
        const response = await apiRequest(`/trip-planning/trips/${encodeURIComponent(tripId)}/keluar-trip`, {
            method: 'PATCH',
            body: payload,
        });

        if (response?.trip) {
            updateTripRow(response.trip);
            toastSuccess(response.message || 'Trip marked as keluar trip');
            scheduleStatsRefetch();
        }

        closeModal('trip-planning-keluar-trip-modal');
    } catch (error) {
        toastError(extractErrorDisplay(error));
    } finally {
        setButtonBusy(submitButton, false);
    }
}

function handleActionClick(event) {
    const button = event.target.closest('[data-action]');
    if (!button || button.disabled) {
        return;
    }

    const action = button.dataset.action;
    if (!action) {
        return;
    }

    if (action === 'open-generate-trips-modal') {
        openModal('trip-planning-generate-trips-modal');
        return;
    }

    if (action === 'confirm-generate-trips') {
        confirmGenerateTrips(button);
        return;
    }

    const tripId = button.dataset.tripId;
    if (!tripId) {
        return;
    }

    if (action === 'tidak-berangkat') {
        handleTidakBerangkatWithSoftConfirm(tripId, button);
        return;
    }

    if (action === 'open-ganti-jam-modal') {
        const currentTripTime = button.dataset.tripTime || '';
        openGantiJamModal(tripId, currentTripTime);
        return;
    }

    if (action === 'open-keluar-trip-modal') {
        const mobilHomePool = button.dataset.mobilHomePool || '';
        openKeluarTripModal(tripId, mobilHomePool);
        return;
    }

    executeAction(tripId, action, button);
}

function extractGenerateErrorMessage(error) {
    const data = error?.data || {};

    if (data.error_code === 'TRIP_GENERATION_DRIVER_MISSING') {
        const missing = data.details?.missing_mobil_ids?.length || 0;
        return `${missing} mobil belum punya driver. Atur di halaman Assignments.`;
    }

    if (data.error === 'trip_slot_conflict' || error?.status === 409) {
        return data.message || 'Trips sudah pernah digenerate untuk tanggal ini.';
    }

    return data.message || error?.message || 'Generate trips gagal.';
}

async function confirmGenerateTrips(buttonEl) {
    const date = state.targetDate;
    if (!date) {
        toastError('Tanggal target tidak terdeteksi.');
        return;
    }

    setButtonBusy(buttonEl, true);
    toastInfo('Generating trips...');

    try {
        const response = await apiRequest('/trip-planning/generate', {
            method: 'POST',
            body: { date },
        });

        const result = Array.isArray(response?.result) ? response.result : [];
        const totalTrips = result.reduce((sum, row) => sum + (Array.isArray(row?.trip_ids) ? row.trip_ids.length : 0), 0);

        closeModal('trip-planning-generate-trips-modal');
        toastSuccess(`${totalTrips} trip berhasil digenerate.`);

        window.setTimeout(() => window.location.reload(), 1200);
    } catch (error) {
        toastError(extractGenerateErrorMessage(error));
        setButtonBusy(buttonEl, false);
    }
}

export default async function initTripPlanningDashboardPage() {
    const page = document.querySelector('[data-trip-planning-page]');
    if (!page) {
        return;
    }

    const initial = parseInitialState();
    state.targetDate = initial.target_date;
    state.trips = Array.isArray(initial.trips) ? initial.trips : [];
    state.statistics = Array.isArray(initial.statistics) ? initial.statistics : [];

    const content = document.querySelector('[data-trip-planning-content]');
    if (content) {
        content.addEventListener('click', handleActionClick);
    }

    const gantiJamForm = document.getElementById('trip-planning-ganti-jam-form');
    if (gantiJamForm) {
        gantiJamForm.addEventListener('submit', submitGantiJam);
    }

    const keluarTripForm = document.getElementById('trip-planning-keluar-trip-form');
    if (keluarTripForm) {
        keluarTripForm.addEventListener('submit', submitKeluarTrip);
        keluarTripForm.addEventListener('change', (event) => {
            if (event.target?.name === 'reason') {
                updateKeluarTripEndDateLabel(event.target.value);
            }
        });
    }
}
