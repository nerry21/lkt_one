import { apiRequest } from '../../services/http';
import { escapeHtml, setButtonBusy } from '../../services/helpers';
import { openModal, closeModal } from '../../ui/modal';
import { toastError, toastInfo, toastSuccess } from '../../ui/toast';

const STATS_REFETCH_DEBOUNCE_MS = 500;
const SOFT_CONFIRM_WINDOW_MS = 2000;

// Slots whitelist — MUST match server-side TripGenerationService::SLOTS and
// GantiJamRequest::VALID_SLOTS. Update ketiganya bersamaan kalau slots berubah.
const GANTI_JAM_SLOTS = ['05:30:00', '07:00:00', '09:00:00', '13:00:00', '16:00:00', '19:00:00'];

// Same-day return slots — MUST match SameDayReturnService::VALID_SLOTS.
// Hardcoded di 4 tempat total (TripGenerationService, GantiJamRequest,
// SameDayReturnService, dashboard.js). Update semuanya bersamaan.
const SAME_DAY_RETURN_SLOTS = ['05:30:00', '07:00:00', '09:00:00', '13:00:00', '16:00:00', '19:00:00'];

const state = {
    targetDate: null,
    trips: [],
    statistics: [],
    drivers: [],
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

    // Pulang Hari Ini — available untuk origin trip ROHUL→PKB yang scheduled
    // atau berangkat, dan belum punya SDR pair. Admin Zizi use case utama:
    // mobil sudah berangkat pagi, siang putuskan pulang.
    if (
        trip.direction === 'ROHUL_TO_PKB'
        && (status === 'scheduled' || status === 'berangkat')
        && !trip.has_same_day_return_pair
    ) {
        const mobilCode = escapeHtml(trip.mobil?.code ?? trip.mobil?.kode_mobil ?? '-');
        const driverId = escapeHtml(trip.driver_id ?? trip.driver?.id ?? '');
        const driverName = escapeHtml(trip.driver?.name ?? trip.driver?.nama ?? '-');
        const tripTimeAttr = escapeHtml(trip.trip_time ?? '');
        buttons.push(`<button type="button" class="trip-planning-action-btn trip-planning-action-btn--neutral" data-action="open-same-day-return-modal" data-trip-id="${tripId}" data-mobil-code="${mobilCode}" data-driver-id="${driverId}" data-driver-name="${driverName}" data-trip-time="${tripTimeAttr}" data-testid="btn-same-day-return-${tripId}">Pulang Hari Ini</button>`);
    }

    return buttons.join('');
}

function renderTripRowInner(trip) {
    const mobilCode = escapeHtml(trip.mobil?.code ?? trip.mobil?.kode_mobil ?? '-');
    const driverName = escapeHtml(trip.driver?.name ?? trip.driver?.nama ?? '-');
    const tripTime = trip.trip_time ? escapeHtml(trip.trip_time) : '(waiting)';
    const status = trip.status || '';
    const substatus = trip.keluar_trip_substatus;
    const statusDisplay = substatus ? `${status} · ${substatus}` : status;

    return `
        <td>${mobilCode}</td>
        <td>${driverName}</td>
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
    // GET /api/trip-planning/dashboard mengembalikan shape:
    //   { date, statistics: { per_mobil: [...], total_berangkat, ... }, trips_*, assignments_tomorrow }
    // View pakai shape flat per-mobil: [{mobil_id, mobil_code, home_pool, pp_count, status_breakdown}, ...]
    //
    // Backend sekarang (Fase E5d Sesi 32) konsisten return shape flat per_mobil via
    // TripStatsService — include semua mobil aktif, selalu carry mobil_code +
    // home_pool + status_breakdown. Fallback di bawah tetap defensive untuk compat
    // kalau future deployment lag antara backend/frontend (edge case).
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

function populateSameDayReturnDriverOptions(preselectedDriverId) {
    const select = document.getElementById('trip-planning-sdr-driver');
    if (!select) {
        return;
    }

    // Rebuild options: keep placeholder, then append drivers from state.
    select.innerHTML = '<option value="">— Pakai sopir trip asal —</option>';

    const drivers = Array.isArray(state.drivers) ? state.drivers : [];
    drivers.forEach((driver) => {
        const option = document.createElement('option');
        option.value = driver.id;
        option.textContent = driver.nama ?? driver.name ?? '(tanpa nama)';
        if (preselectedDriverId && String(driver.id) === String(preselectedDriverId)) {
            option.selected = true;
        }
        select.appendChild(option);
    });
}

function openSameDayReturnModal(tripId, meta) {
    const form = document.getElementById('trip-planning-same-day-return-form');
    const tripIdInput = document.getElementById('trip-planning-sdr-trip-id');
    const originDisplay = document.getElementById('trip-planning-sdr-origin-display');
    const slotSelect = document.getElementById('trip-planning-sdr-slot');

    if (!form || !tripIdInput || !originDisplay || !slotSelect) {
        return;
    }

    form.reset();
    tripIdInput.value = String(tripId);

    const mobilCode = meta.mobilCode || '-';
    const driverName = meta.driverName || '-';
    const tripTime = meta.tripTime || '(waiting)';
    originDisplay.textContent = `${mobilCode} — ${driverName} — ${tripTime}`;

    // Populate driver dropdown dengan pre-select driver asal (nullable).
    populateSameDayReturnDriverOptions(meta.driverId);

    openModal('trip-planning-same-day-return-modal');
}

function updateTripCounter(count) {
    const counter = document.querySelector('[data-testid="trip-planning-trip-counter"]');
    if (counter) {
        counter.textContent = String(count);
    }
}

function rebuildTripsTable(trips) {
    if (!Array.isArray(trips)) {
        window.location.reload();
        return;
    }

    updateTripCounter(trips.length);

    const sortByTimeNullLast = (a, b) => {
        const timeA = a.trip_time || '99:99:99';
        const timeB = b.trip_time || '99:99:99';
        if (timeA < timeB) return -1;
        if (timeA > timeB) return 1;
        return (Number(a.sequence) || 0) - (Number(b.sequence) || 0);
    };

    const keberangkatanTrips = trips
        .filter((trip) => trip.direction === 'ROHUL_TO_PKB')
        .sort(sortByTimeNullLast);

    const kepulanganTrips = trips
        .filter((trip) => trip.direction === 'PKB_TO_ROHUL')
        .sort(sortByTimeNullLast);

    rebuildDirectionColumn('keberangkatan', keberangkatanTrips);
    rebuildDirectionColumn('kepulangan', kepulanganTrips);
}

function rebuildDirectionColumn(directionKey, directionTrips) {
    const column = document.querySelector(`[data-testid="trip-planning-column-${directionKey}"]`);
    if (!column) {
        window.location.reload();
        return;
    }

    const existingTable = column.querySelector(`[data-testid="trip-planning-trips-table-${directionKey}"]`);
    const existingEmpty = column.querySelector(`[data-testid="empty-state-${directionKey}"]`);

    if (directionTrips.length === 0) {
        if (existingTable) {
            existingTable.closest('.trip-planning-trips-table-wrap').remove();
        }
        if (!existingEmpty) {
            const emptyLabel = directionKey === 'keberangkatan' ? 'Keberangkatan' : 'Kepulangan';
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'dashboard-empty-state dashboard-empty-state--block';
            emptyDiv.setAttribute('data-testid', `empty-state-${directionKey}`);
            emptyDiv.textContent = `Belum ada trip ${emptyLabel}`;
            column.appendChild(emptyDiv);
        }
        return;
    }

    if (existingEmpty) {
        existingEmpty.remove();
    }

    let tbody;
    if (existingTable) {
        tbody = existingTable.querySelector('tbody');
    } else {
        const wrap = document.createElement('div');
        wrap.className = 'trip-planning-trips-table-wrap';
        wrap.innerHTML = `
            <table class="trip-planning-trips-table" data-testid="trip-planning-trips-table-${directionKey}">
                <thead>
                    <tr>
                        <th>Mobil</th>
                        <th>Driver</th>
                        <th>Jam</th>
                        <th>Seq</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `;
        column.appendChild(wrap);
        tbody = wrap.querySelector('tbody');
    }

    tbody.innerHTML = directionTrips.map((trip) => `
        <tr data-trip-id="${escapeHtml(trip.id)}" data-testid="trip-row-${escapeHtml(trip.id)}">
            ${renderTripRowInner(trip)}
        </tr>
    `).join('');
}

async function reloadDashboardData() {
    const date = state.targetDate;
    if (!date) {
        // Fallback: hard reload kalau tidak bisa determine tanggal.
        window.location.reload();
        return;
    }

    try {
        const data = await apiRequest(`/trip-planning/dashboard?date=${encodeURIComponent(date)}`);

        // Dashboard GET response shape: { date, statistics, trips_pkb_to_rohul, trips_rohul_to_pkb, assignments_tomorrow }.
        const normalizedStats = normalizeStatisticsFromDashboardPayload(data);
        state.statistics = normalizedStats;
        renderStatistics(normalizedStats);

        // Trips table: merge dari 2 kategori directional + re-render.
        if (Array.isArray(data?.trips_pkb_to_rohul) || Array.isArray(data?.trips_rohul_to_pkb)) {
            const merged = []
                .concat(data.trips_pkb_to_rohul || [])
                .concat(data.trips_rohul_to_pkb || []);
            state.trips = merged;
            rebuildTripsTable(merged);
        } else if (Array.isArray(data?.trips)) {
            state.trips = data.trips;
            rebuildTripsTable(data.trips);
        } else {
            // Shape unknown — hard reload sebagai safety net.
            window.location.reload();
        }
    } catch (error) {
        // Refetch gagal — hard reload supaya user tetap lihat data baru.
        if (window.console) {
            console.warn('[trip-planning] Dashboard refetch failed, falling back to reload:', error.message);
        }
        window.location.reload();
    }
}

function extractSameDayReturnErrorDisplay(error) {
    const data = error?.data || {};
    if (data.error === 'same_day_return_conflict') {
        // Backend sudah provide pesan Indonesian per conflict_type.
        return data.message || 'Tidak bisa buat trip pulang untuk trip asal ini.';
    }
    if (data.errors) {
        // 422 validation — ambil error pertama.
        const firstKey = Object.keys(data.errors)[0];
        const firstErr = firstKey ? data.errors[firstKey]?.[0] : null;
        return firstErr || data.message || 'Input tidak valid.';
    }
    return extractErrorDisplay(error);
}

async function submitSameDayReturn(event) {
    event.preventDefault();

    const tripIdInput = document.getElementById('trip-planning-sdr-trip-id');
    const slotSelect = document.getElementById('trip-planning-sdr-slot');
    const driverSelect = document.getElementById('trip-planning-sdr-driver');
    const reasonInput = document.getElementById('trip-planning-sdr-reason');
    const noteTextarea = document.getElementById('trip-planning-sdr-note');
    const submitButton = document.getElementById('trip-planning-sdr-submit');

    if (!tripIdInput || !slotSelect || !submitButton) {
        return;
    }

    const tripId = tripIdInput.value;
    const slot = slotSelect.value;
    const driverId = (driverSelect?.value || '').trim();
    const reason = (reasonInput?.value || '').trim();
    const note = (noteTextarea?.value || '').trim();

    if (!tripId || !slot) {
        toastError('Pilih slot jam pulang terlebih dahulu');
        return;
    }

    if (!SAME_DAY_RETURN_SLOTS.includes(slot)) {
        toastError('Slot tidak valid');
        return;
    }

    const payload = { slot };
    if (driverId) {
        payload.driver_id = driverId;
    }
    if (reason) {
        payload.reason = reason;
    }
    if (note) {
        payload.note = note;
    }

    setButtonBusy(submitButton, true);

    try {
        const response = await apiRequest(`/trip-planning/trips/${encodeURIComponent(tripId)}/same-day-return`, {
            method: 'POST',
            body: payload,
        });

        closeModal('trip-planning-same-day-return-modal');
        toastSuccess(response?.message || 'Trip pulang berhasil dibuat');

        // Refetch dashboard supaya trip baru muncul di tabel + stats ter-update.
        await reloadDashboardData();
    } catch (error) {
        toastError(extractSameDayReturnErrorDisplay(error));
    } finally {
        setButtonBusy(submitButton, false);
    }
}

// ── E5 PR #2: Edit Trip Modal ───────────────────────────────────────────────

function openEditTripModal(meta) {
    const form = document.getElementById('trip-planning-edit-trip-form');
    if (!form) return;

    form.reset();

    document.getElementById('trip-planning-edit-trip-id').value = String(meta.tripId);
    document.getElementById('trip-planning-edit-trip-version').value = String(meta.version);

    const subtitle = document.getElementById('trip-planning-edit-trip-subtitle');
    if (subtitle) {
        subtitle.textContent = `${meta.mobilCode} — ${meta.tripTime || '(waiting list)'} (${meta.direction})`;
    }

    document.getElementById('trip-planning-edit-trip-time').value = meta.tripTime || '';
    document.getElementById('trip-planning-edit-trip-mobil').value = meta.mobilId || '';
    document.getElementById('trip-planning-edit-trip-driver').value = meta.driverId || '';

    document.getElementById('trip-planning-edit-trip-date').value = meta.tripDate || '';
    document.getElementById('trip-planning-edit-trip-direction').value = meta.direction || 'PKB_TO_ROHUL';
    document.getElementById('trip-planning-edit-trip-sequence').value = meta.sequence || 1;

    // Reset advanced toggle ke collapsed setiap modal dibuka
    const toggle = document.getElementById('trip-planning-edit-trip-advanced-toggle');
    const advFields = document.getElementById('trip-planning-edit-trip-advanced-fields');
    if (toggle) {
        toggle.dataset.expanded = 'false';
        const icon = toggle.querySelector('.trip-planning-advanced-toggle-icon');
        const label = toggle.querySelector('.trip-planning-advanced-toggle-label');
        if (icon) icon.textContent = '▶'; // ▶
        if (label) label.textContent = 'Tampilkan opsi lanjutan';
    }
    if (advFields) advFields.hidden = true;

    openModal('trip-planning-edit-trip-modal');
}

function toggleEditTripAdvanced() {
    const toggle = document.getElementById('trip-planning-edit-trip-advanced-toggle');
    const advFields = document.getElementById('trip-planning-edit-trip-advanced-fields');
    if (!toggle || !advFields) return;

    const isExpanded = toggle.dataset.expanded === 'true';
    const newExpanded = !isExpanded;

    toggle.dataset.expanded = String(newExpanded);
    advFields.hidden = !newExpanded;

    const icon = toggle.querySelector('.trip-planning-advanced-toggle-icon');
    const label = toggle.querySelector('.trip-planning-advanced-toggle-label');
    if (icon) icon.textContent = newExpanded ? '▼' : '▶'; // ▼ / ▶
    if (label) label.textContent = newExpanded ? 'Sembunyikan opsi lanjutan' : 'Tampilkan opsi lanjutan';
}

async function submitEditTrip(event) {
    event.preventDefault();

    const tripId = document.getElementById('trip-planning-edit-trip-id').value;
    const version = parseInt(document.getElementById('trip-planning-edit-trip-version').value, 10);
    const submitButton = document.getElementById('trip-planning-edit-trip-submit');

    const tripTime = document.getElementById('trip-planning-edit-trip-time').value;
    const mobilId = document.getElementById('trip-planning-edit-trip-mobil').value;
    const driverId = document.getElementById('trip-planning-edit-trip-driver').value;

    const advExpanded = document.getElementById('trip-planning-edit-trip-advanced-toggle')?.dataset.expanded === 'true';

    if (!tripId || !tripTime || !mobilId || !driverId) {
        toastError('Lengkapi field jam, mobil, dan driver.');
        return;
    }

    const payload = {
        version,
        trip_time: tripTime,
        mobil_id: mobilId,
        driver_id: driverId,
    };

    if (advExpanded) {
        const tripDate = document.getElementById('trip-planning-edit-trip-date').value;
        const direction = document.getElementById('trip-planning-edit-trip-direction').value;
        const sequenceStr = document.getElementById('trip-planning-edit-trip-sequence').value;

        if (tripDate) payload.trip_date = tripDate;
        if (direction) payload.direction = direction;
        if (sequenceStr) payload.sequence = parseInt(sequenceStr, 10);
    }

    setButtonBusy(submitButton, true);

    try {
        const response = await apiRequest(`/trip-planning/trips/${encodeURIComponent(tripId)}`, {
            method: 'PUT',
            body: payload,
        });

        if (response?.data) {
            toastSuccess(response.message || 'Trip berhasil diupdate');
            closeModal('trip-planning-edit-trip-modal');
            await reloadDashboardData();
        }
    } catch (error) {
        toastError(extractErrorDisplay(error));
    } finally {
        setButtonBusy(submitButton, false);
    }
}

// ── E5 PR #2: Delete Trip Modal ─────────────────────────────────────────────

async function openDeleteTripModal(meta) {
    const form = document.getElementById('trip-planning-delete-trip-form');
    if (!form) return;

    form.reset();

    document.getElementById('trip-planning-delete-trip-id').value = String(meta.tripId);
    document.getElementById('trip-planning-delete-trip-version').value = String(meta.version);

    const detail = document.getElementById('trip-planning-delete-trip-detail');
    if (detail) {
        detail.textContent = `${meta.mobilCode} — ${meta.tripTime || '(waiting list)'} (${meta.direction})`;
    }

    const warnInfo = document.getElementById('trip-planning-delete-trip-bookings-info');
    const noBookingsInfo = document.getElementById('trip-planning-delete-trip-no-bookings-info');
    if (warnInfo) warnInfo.hidden = true;
    if (noBookingsInfo) noBookingsInfo.hidden = true;

    openModal('trip-planning-delete-trip-modal');

    try {
        const response = await apiRequest(`/trip-planning/trips/${encodeURIComponent(meta.tripId)}/bookings-count`);
        const count = Number(response?.bookings_count ?? 0);

        if (count > 0) {
            const countEl = document.getElementById('trip-planning-delete-trip-bookings-count');
            if (countEl) countEl.textContent = String(count);
            if (warnInfo) warnInfo.hidden = false;
        } else if (noBookingsInfo) {
            noBookingsInfo.hidden = false;
        }
    } catch (error) {
        toastError('Gagal cek jumlah booking — periksa koneksi.');
    }
}

async function submitDeleteTrip(event) {
    event.preventDefault();

    const tripId = document.getElementById('trip-planning-delete-trip-id').value;
    const version = parseInt(document.getElementById('trip-planning-delete-trip-version').value, 10);
    const submitButton = document.getElementById('trip-planning-delete-trip-submit');

    if (!tripId) {
        toastError('Trip ID tidak valid.');
        return;
    }

    setButtonBusy(submitButton, true);

    try {
        const response = await apiRequest(`/trip-planning/trips/${encodeURIComponent(tripId)}?version=${version}`, {
            method: 'DELETE',
        });

        if (response?.success) {
            toastSuccess(response.message || 'Trip berhasil dihapus');
            closeModal('trip-planning-delete-trip-modal');
            await reloadDashboardData();
        }
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

    if (action === 'open-same-day-return-modal') {
        const meta = {
            mobilCode: button.dataset.mobilCode || '-',
            driverId: button.dataset.driverId || '',
            driverName: button.dataset.driverName || '-',
            tripTime: button.dataset.tripTime || '',
        };
        openSameDayReturnModal(tripId, meta);
        return;
    }

    // E5 PR #2: Edit trip handler
    if (action === 'open-edit-trip-modal') {
        openEditTripModal({
            tripId,
            version: parseInt(button.dataset.tripVersion, 10),
            tripDate: button.dataset.tripDate,
            tripTime: button.dataset.tripTime,
            direction: button.dataset.tripDirection,
            sequence: parseInt(button.dataset.tripSequence, 10),
            mobilId: button.dataset.mobilId,
            mobilCode: button.dataset.mobilCode,
            driverId: button.dataset.driverId,
            driverName: button.dataset.driverName,
        });
        return;
    }

    // E5 PR #2: Delete trip handler
    if (action === 'open-delete-trip-modal') {
        openDeleteTripModal({
            tripId,
            version: parseInt(button.dataset.tripVersion, 10),
            mobilCode: button.dataset.mobilCode,
            tripTime: button.dataset.tripTime,
            direction: button.dataset.tripDirection,
        });
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
    state.drivers = Array.isArray(initial.drivers) ? initial.drivers : [];

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

    const sameDayReturnForm = document.getElementById('trip-planning-same-day-return-form');
    if (sameDayReturnForm) {
        sameDayReturnForm.addEventListener('submit', submitSameDayReturn);
    }

    // E5 PR #2: Edit + Delete trip form listeners
    const editTripForm = document.getElementById('trip-planning-edit-trip-form');
    if (editTripForm) {
        editTripForm.addEventListener('submit', submitEditTrip);
    }

    const editTripAdvancedToggle = document.getElementById('trip-planning-edit-trip-advanced-toggle');
    if (editTripAdvancedToggle) {
        editTripAdvancedToggle.addEventListener('click', toggleEditTripAdvanced);
    }

    const deleteTripForm = document.getElementById('trip-planning-delete-trip-form');
    if (deleteTripForm) {
        deleteTripForm.addEventListener('submit', submitDeleteTrip);
    }
}
