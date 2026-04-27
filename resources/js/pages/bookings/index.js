import { apiRequest } from '../../services/http';
import { escapeHtml, formatCurrency, setButtonBusy, todayString } from '../../services/helpers';
import { closeModal, openModal } from '../../ui/modal';
import { handleVersionConflict, toastError, toastSuccess } from '../../ui/toast';

// ─── Schedules ────────────────────────────────────────────────────────────────

const SCHEDULES = [
    { value: '05:30', label: 'Subuh', time: '05.30 WIB' },
    { value: '07:00', label: 'Pagi', time: '07.00 WIB' },
    { value: '09:00', label: 'Pagi', time: '09.00 WIB' },
    { value: '13:00', label: 'Siang', time: '13.00 WIB' },
    { value: '16:00', label: 'Sore', time: '16.00 WIB' },
    { value: '19:00', label: 'Malam', time: '19.00 WIB' },
];

// Seat rows for the car diagram (top-down view, front-to-back).
// 2B = kursi tambahan opsional (admin-only policy) dengan badge visual.
const SEAT_ROWS = [
    [{ code: '1A', label: '1A' }, { code: 'SOPIR', label: 'SOPIR', isDriver: true }],
    [{ code: '2A', label: '2A' }, { code: '2B', label: '2B', isOptional: true }, { code: '3A', label: '3A' }],
    [{ code: '4A', label: '4A' }, { code: '5A', label: '5A' }],
];

const TOTAL_PASSENGER_SEATS = SEAT_ROWS.flat().filter((s) => !s.isDriver).length;

// ─── State ────────────────────────────────────────────────────────────────────

const state = {
    currentUser: null,
    date: todayString(),
    direction: 'from_pkb',
    // Sesi 46 PR #58a: cluster-aware state.
    // null = tampil semua cluster (default D2-A locked di Sesi 46).
    // 'BANGKINANG' atau 'PETAPAHAN' = filter aktif (di-set saat user pilih
    // tab cluster di PR #58b nanti, atau via auto-prefill saat klik
    // "Tambah Pemesanan" di panel cluster tertentu).
    routeVia: null,
    bookings: [],
    loading: false,
    drivers: [],
    mobils: [],
    formOptions: null,
    selectedSeats: [],
    passengerDraftMap: {},
    editItem: null,
    editPackageItem: null,
    deleteItem: null,
    slotDriverMap: {},
    slotMobilMap: {},
    occupiedSeatsForForm: [],
    occupiedSeatsForPackageForm: [],
    // Extra armadas added client-side per slot key (persists across renders until page reload)
    // Sesi 46 PR #58a: composite key now includes cluster dimension.
    // Format: 'HH:MM__direction__CLUSTER': maxArmadaIndex
    slotExtraArmadas: {},
    // Context for the currently open booking form
    currentFormArmadaIndex: 1,
    // Pending choice for type-choice modal
    _pendingChoiceArmada: 1,
    _pendingChoiceTime: '',
    // Sesi 46 PR #58b: cluster context untuk auto-prefill form modal.
    // null = no context (top-level button), value = cluster panel asal.
    _pendingChoiceCluster: null,
};

// ─── Parsers ──────────────────────────────────────────────────────────────────

function parseJsonScript(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    try { return JSON.parse(el.textContent || '{}'); } catch { return null; }
}

function isAdminRole(role) {
    return ['Super Admin', 'Admin'].includes(role);
}

// Sesi 46 PR #58a: resolve cluster per booking untuk render slot composite key.
// Source of truth: booking.route_via dari API response (sudah ada di DB sejak PR #1A
// Sesi 44A, di-expose via listPayload di Sesi 46 — kalau missing/null fallback ke
// 'BANGKINANG' default sesuai pola backfill PR #1A).
function clusterFromBooking(booking) {
    const cluster = (booking?.route_via || '').toUpperCase().trim();
    return ['BANGKINANG', 'PETAPAHAN'].includes(cluster) ? cluster : 'BANGKINANG';
}

// Sesi 47 Fix #1: filter dropdown city options berdasarkan cluster context.
// Saat user buka form dari panel BANGKINANG, lokasi PETAPAHAN-fixed (Petapahan,
// Suram, Kasikan) di-hide. Saat dari panel PETAPAHAN, lokasi BANGKINANG-fixed
// (Bangkinang, Aliantan, Kabun, Kuok, Silam) di-hide. HUB (Pekanbaru) + AMBIGU
// (12 lokasi) selalu visible.
//
// Implementation: DOM mutation hidden attribute + display none. Tidak destroy
// option element supaya restoreAllCityOptions() bisa restore tanpa re-render.
//
// Cluster context source: state._pendingChoiceCluster (saat klik "+ Tambah
// Pemesanan" dari panel cluster) atau dropdown route_via (saat user manual
// override di form).
//
// Edge: cluster=null → show semua (top-level "Tambah Pemesanan" tidak ada
// cluster context, admin pilih bebas).
function filterCityOptionsByCluster(cluster) {
    const clusterMap = state.formOptions?.cluster_map || {};
    const fromCityEl = document.getElementById('booking-from-city');
    const toCityEl = document.getElementById('booking-to-city');
    const pkgFromCityEl = document.getElementById('pkg-from-city');
    const pkgToCityEl = document.getElementById('pkg-to-city');

    // Resolve target cluster. Empty/null = no filter (show all).
    const targetCluster = (cluster || '').toUpperCase().trim();
    const isFiltering = ['BANGKINANG', 'PETAPAHAN'].includes(targetCluster);

    // Apply ke 4 dropdown city (Regular form 2 + Package form 2)
    [fromCityEl, toCityEl, pkgFromCityEl, pkgToCityEl].forEach((selectEl) => {
        if (!selectEl) return;

        Array.from(selectEl.options).forEach((option) => {
            const value = option.value;

            // Skip placeholder option (value="")
            if (value === '') {
                option.hidden = false;
                option.disabled = false;
                return;
            }

            if (!isFiltering) {
                // No cluster context → show all
                option.hidden = false;
                option.disabled = false;
                return;
            }

            const locCluster = clusterMap[value] ?? null;

            // HUB (Pekanbaru) + AMBIGU (null) selalu visible
            if (locCluster === 'HUB' || locCluster === null) {
                option.hidden = false;
                option.disabled = false;
                return;
            }

            // Fixed cluster yang beda dengan target → hide
            if (locCluster !== targetCluster) {
                option.hidden = true;
                option.disabled = true; // Defense: ada browser yang ignore [hidden]
            } else {
                option.hidden = false;
                option.disabled = false;
            }
        });

        // Kalau current value sekarang di-hide (e.g. user switch cluster
        // setelah pilih city), reset ke empty supaya placeholder tampil.
        const currentOption = selectEl.options[selectEl.selectedIndex];
        if (currentOption && currentOption.hidden) {
            selectEl.value = '';
        }
    });
}

// Sesi 47 Fix #1: restore semua city options visible.
// Dipakai saat fillForm/fillPackageForm (edit mode) supaya option yang ada
// di booking lama tidak ke-hide kalau cluster-nya beda dengan default.
function restoreAllCityOptions() {
    filterCityOptionsByCluster(null);
}

// Sesi 47 Fix #2: populate dropdown Driver + Mobil dari state.drivers + state.mobils.
// Dipanggil saat init + saat reset form. Label informatif:
//   Driver: "Pak Budi (Pasir)" — nama + lokasi
//   Mobil:  "JET 01 — Avanza (Basecamp ROHUL)" — kode + jenis + home_pool
//
// D-Fix2-2 locked: Show all (no cluster filter), karena JET cuma punya
// 5 mobil + few drivers. Filter strict berisiko UX kosong. Admin pilih bebas.
function populateDriverMobilDropdowns() {
    const driverSelectIds = ['booking-driver-id', 'pkg-driver-id'];
    const mobilSelectIds = ['booking-mobil-id', 'pkg-mobil-id'];

    driverSelectIds.forEach((selId) => {
        const sel = document.getElementById(selId);
        if (!sel) return;

        const placeholder = sel.querySelector('option[value=""]');
        sel.innerHTML = '';
        if (placeholder) sel.appendChild(placeholder);

        state.drivers.forEach((d) => {
            const opt = document.createElement('option');
            opt.value = d.id;
            opt.textContent = d.lokasi ? `${d.nama} (${d.lokasi})` : d.nama;
            sel.appendChild(opt);
        });
    });

    mobilSelectIds.forEach((selId) => {
        const sel = document.getElementById(selId);
        if (!sel) return;

        const placeholder = sel.querySelector('option[value=""]');
        sel.innerHTML = '';
        if (placeholder) sel.appendChild(placeholder);

        state.mobils.forEach((m) => {
            const opt = document.createElement('option');
            opt.value = m.id;
            const homePoolLabel = m.home_pool ? ` (Basecamp ${m.home_pool})` : '';
            opt.textContent = `${m.kode_mobil} — ${m.jenis_mobil}${homePoolLabel}`;
            sel.appendChild(opt);
        });
    });
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function passengerSeatSvg(occupied) {
    const color = occupied ? '#dc2626' : '#166534';
    const stroke = occupied ? '#991b1b' : '#14532d';
    return `
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="2" width="30" height="20" rx="8" fill="${color}" stroke="${stroke}" stroke-width="1.5"/>
            <rect x="5" y="18" width="40" height="28" rx="9" fill="${color}" stroke="${stroke}" stroke-width="1.5"/>
            <rect x="7" y="44" width="36" height="14" rx="7" fill="${color}" stroke="${stroke}" stroke-width="1.5" opacity="0.8"/>
            <rect x="2" y="22" width="5" height="18" rx="2.5" fill="${color}" opacity="0.6"/>
            <rect x="43" y="22" width="5" height="18" rx="2.5" fill="${color}" opacity="0.6"/>
        </svg>`;
}

function driverSeatSvg() {
    return `
        <svg viewBox="0 0 50 62" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="25" cy="30" r="18" stroke="rgba(148,163,184,0.5)" stroke-width="2.5"/>
            <circle cx="25" cy="30" r="6" fill="rgba(148,163,184,0.4)"/>
            <line x1="25" y1="12" x2="25" y2="24" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="7" y1="30" x2="19" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
            <line x1="31" y1="30" x2="43" y2="30" stroke="rgba(148,163,184,0.5)" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`;
}

function editIcon() {
    return `<svg viewBox="0 0 24 24" fill="none"><path d="M4 20H8L18.5 9.5C19.3284 8.67157 19.3284 7.32843 18.5 6.5C17.6716 5.67157 16.3284 5.67157 15.5 6.5L5 17V20Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path><path d="M13.5 8.5L16.5 11.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>`;
}

function trashIcon() {
    return `<svg viewBox="0 0 24 24" fill="none"><path d="M4 7H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M10 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M14 11V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M6 7L7 19C7.08964 20.0768 7.98946 20.9 9.07 20.9H14.93C16.0105 20.9 16.9104 20.0768 17 19L18 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path><path d="M9 7V5.5C9 4.67157 9.67157 4 10.5 4H13.5C14.3284 4 15 4.67157 15 5.5V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path></svg>`;
}

function plusIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><path d="M12 5V19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
}

function truckIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><rect x="2" y="7" width="15" height="10" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M17 10H20L22 13V17H17V10Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="6" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="18" r="1.5" stroke="currentColor" stroke-width="1.5"/></svg>`;
}

function documentIcon() {
    return `<svg viewBox="0 0 24 24" fill="none" style="width:12px;height:12px;flex-shrink:0;"><path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 2V8H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 13H16M8 17H13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
}

// ─── Car Seat Diagram ─────────────────────────────────────────────────────────

function renderCarDiagram(seatBookingMap) {
    const rows = SEAT_ROWS.map((row) => {
        const cols = row.map((seat) => {
            if (seat.isDriver) {
                return `
                    <div class="bpg-seat-item bpg-seat-driver" title="Sopir / Pengemudi">
                        <div class="bpg-seat-icon">${driverSeatSvg()}</div>
                        <span class="bpg-seat-label">SOPIR</span>
                    </div>`;
            }

            const booking = seatBookingMap[seat.code];
            const isOccupied = !!booking;
            const stateClass = isOccupied ? 'bpg-seat-occupied' : 'bpg-seat-available';
            const passengerName = isOccupied
                ? escapeHtml(booking.nama_pemesanan || '-')
                : '';
            const optionalBadge = seat.isOptional
                ? '<span class="bpg-seat-optional-badge">OPSIONAL</span>'
                : '';

            return `
                <div class="bpg-seat-item ${stateClass}" title="${isOccupied ? passengerName : 'Tersedia'}">
                    ${optionalBadge}
                    <div class="bpg-seat-icon">${passengerSeatSvg(isOccupied)}</div>
                    <span class="bpg-seat-label">${seat.label}</span>
                    ${isOccupied ? `<span class="bpg-seat-name">${passengerName}</span>` : ''}
                </div>`;
        });

        return `<div class="bpg-seat-row">${cols.join('')}</div>`;
    });

    return `
        <div class="bpg-car-diagram">
            <div class="bpg-car-legend">
                <span class="bpg-legend-item">
                    <span class="bpg-legend-dot bpg-legend-dot--available"></span> Tersedia
                </span>
                <span class="bpg-legend-item">
                    <span class="bpg-legend-dot bpg-legend-dot--occupied"></span> Terisi
                </span>
                <span class="bpg-legend-item">
                    <span class="bpg-legend-dot bpg-legend-dot--driver"></span> Sopir
                </span>
            </div>
            <div class="bpg-car-body">
                <div class="bpg-car-direction-label">
                    <svg viewBox="0 0 16 16" fill="none" style="width:14px;height:14px;"><path d="M8 2L8 14M3 7L8 2L13 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    Arah depan kendaraan
                </div>
                <div class="bpg-car-inner">
                    ${rows.join('')}
                </div>
            </div>
        </div>`;
}

// ─── Passenger List ───────────────────────────────────────────────────────────

function renderPassengerList(bookingsInSlot) {
    if (bookingsInSlot.length === 0) {
        return `
            <div class="bpg-empty-slot">
                <svg viewBox="0 0 24 24" fill="none" style="width:32px;height:32px;opacity:0.3;">
                    <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.8"/>
                    <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    <path d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
                <p>Belum ada penumpang pada jadwal ini</p>
            </div>`;
    }

    const DEPARTURE_STATUSES = [
        { value: 'Berangkat', label: 'Berangkat', cls: 'bpg-depart-opt--go' },
        { value: 'Tidak Berangkat', label: 'Tidak Berangkat', cls: 'bpg-depart-opt--no' },
        { value: 'Di Oper', label: 'Di Oper', cls: 'bpg-depart-opt--oper' },
    ];

    function departureStatusMeta(status) {
        if (status === 'Berangkat') return { label: 'Berangkat', cls: 'bpg-depart-trigger--go' };
        if (status === 'Tidak Berangkat') return { label: 'Tidak Berangkat', cls: 'bpg-depart-trigger--no' };
        if (status === 'Di Oper') return { label: 'Di Oper', cls: 'bpg-depart-trigger--oper' };

        return { label: 'Status', cls: '' };
    }

    const rows = bookingsInSlot.map((booking) => {
        const seats = (booking.selected_seats_label || '-');
        const currentDeparture = booking.departure_status || '';
        const meta = departureStatusMeta(currentDeparture);

        const dropdownItems = DEPARTURE_STATUSES.map((s) => {
            const isActive = currentDeparture === s.value;

            return `<button class="bpg-depart-opt ${s.cls}${isActive ? ' is-active' : ''}" type="button"
                data-departure-status="${escapeHtml(s.value)}"
                data-booking-departure="${escapeHtml(String(booking.id))}">${escapeHtml(s.label)}</button>`;
        }).join('');

        return `
            <div class="bpg-passenger-item" data-booking-id="${escapeHtml(String(booking.id))}">
                <div class="bpg-passenger-item-row">
                    <div class="bpg-passenger-seats">
                        ${seats.split(',').map((s) => `<span class="stock-value-badge stock-value-badge-blue">${escapeHtml(s.trim())}</span>`).join('')}
                    </div>
                    <div class="bpg-passenger-info">
                        <span class="bpg-passenger-name">${escapeHtml(booking.nama_pemesanan || '-')}</span>
                        <span class="bpg-passenger-phone">${escapeHtml(booking.phone || '-')}</span>
                    </div>
                </div>
                <div class="bpg-passenger-item-actions-row">
                    <span class="${escapeHtml(booking.payment_status_badge_class || 'stock-value-badge stock-value-badge-blue')} bpg-status-sm">${escapeHtml(booking.payment_status || '-')}</span>
                    <div class="bpg-depart-dropdown" data-depart-dropdown="${escapeHtml(String(booking.id))}">
                        <button class="bpg-depart-trigger ${meta.cls}" type="button" data-depart-toggle="${escapeHtml(String(booking.id))}">
                            <svg viewBox="0 0 24 24" fill="none" style="width:11px;height:11px;flex-shrink:0;"><circle cx="12" cy="12" r="2.5" fill="currentColor"/><circle cx="12" cy="5" r="2" fill="currentColor"/><circle cx="12" cy="19" r="2" fill="currentColor"/></svg>
                            ${escapeHtml(meta.label)}
                            <svg viewBox="0 0 24 24" fill="none" style="width:10px;height:10px;flex-shrink:0;"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </button>
                        <div class="bpg-depart-menu" hidden>
                            ${dropdownItems}
                        </div>
                    </div>
                    <div style="flex:1;"></div>
                    <button class="bpg-lihat-btn" type="button" data-booking-lihat="${escapeHtml(String(booking.id))}" aria-label="Lihat detail ${escapeHtml(booking.nama_pemesanan)}">
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/></svg>
                        Lihat
                    </button>
                    <button class="admin-users-icon-button" type="button" data-booking-edit="${escapeHtml(String(booking.id))}" title="Edit pemesanan">
                        ${editIcon()}
                    </button>
                    <button class="admin-users-icon-button admin-users-icon-button-danger" type="button" data-booking-delete="${escapeHtml(String(booking.id))}" data-booking-name="${escapeHtml(booking.nama_pemesanan)}" title="Hapus pemesanan">
                        ${trashIcon()}
                    </button>
                </div>
            </div>`;
    });

    return `
        <div class="bpg-passenger-list">
            <div class="bpg-passenger-list-head">
                <svg viewBox="0 0 24 24" fill="none" style="width:15px;height:15px;"><path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.8"/></svg>
                <span>Daftar Penumpang</span>
            </div>
            ${rows.join('')}
        </div>`;
}

// ─── Slot Card (single armada) ────────────────────────────────────────────────

function buildSeatBookingMap(bookingsInSlot) {
    const map = {};

    bookingsInSlot.forEach((booking) => {
        const seats = Array.isArray(booking.selected_seats) ? booking.selected_seats : [];

        seats.forEach((seatCode) => {
            if (!map[seatCode]) {
                map[seatCode] = booking;
            }
        });
    });

    return map;
}

function renderArmadaCard(schedule, armadaIndex, bookingsInArmada, totalArmadas, cluster = 'BANGKINANG') {
    const seatBookingMap = buildSeatBookingMap(bookingsInArmada);
    const totalPassengers = bookingsInArmada.reduce((sum, b) => sum + (Number(b.passenger_count) || 0), 0);
    const isFull = totalPassengers >= TOTAL_PASSENGER_SEATS;
    // Sesi 46 PR #58a: slotArmadaKey 4 dimensi (date implicit via state.date).
    // Pattern: HH:MM__direction__CLUSTER__armadaIndex
    // Cluster = parameter dari renderSlotGroup, default 'BANGKINANG' untuk safety.
    const slotArmadaKey = `${schedule.value}__${state.direction}__${cluster}__${armadaIndex}`;

    if (!state.slotDriverMap[slotArmadaKey]) {
        const withDriver = bookingsInArmada.find((b) => b.driver_id);
        if (withDriver) {
            state.slotDriverMap[slotArmadaKey] = withDriver.driver_id;
        }
    }

    const selectedDriverId = state.slotDriverMap[slotArmadaKey] || '';
    const selectedMobilId = state.slotMobilMap[slotArmadaKey] || '';
    const badgeClass = isFull ? 'stock-value-badge-red' : 'stock-value-badge-yellow';

    const driverOptions = state.drivers.map((d) => {
        const label = d.lokasi ? `${d.nama} (${d.lokasi})` : d.nama;
        return `<option value="${escapeHtml(d.id)}" ${selectedDriverId === d.id ? 'selected' : ''}>${escapeHtml(label)}</option>`;
    }).join('');

    const mobilOptions = state.mobils.map((m) => {
        const label = `${m.kode_mobil} — ${m.jenis_mobil}`;
        return `<option value="${escapeHtml(m.id)}" ${selectedMobilId === m.id ? 'selected' : ''}>${escapeHtml(label)}</option>`;
    }).join('');

    const serviceTypes = [...new Set(
        bookingsInArmada.map((b) => (b.service_type || '').trim()).filter(Boolean),
    )];

    // Show armada badge when there are multiple armadas for this slot
    const armadaBadge = totalArmadas > 1
        ? `<span class="bpg-armada-badge">${truckIcon()} Armada ${armadaIndex}</span>`
        : '';

    // Show "Tambah Armada" when this armada is full and it's the last one
    const addArmadaBtn = isFull
        ? `<button class="bpg-add-armada-btn" type="button"
                data-add-armada="${escapeHtml(schedule.value)}"
                data-armada-index="${armadaIndex}"
                title="Tambah armada ke-${armadaIndex + 1} untuk jadwal ${escapeHtml(schedule.time)}">
                ${plusIcon()}
                Tambah Armada
            </button>`
        : '';

    return `
        <article class="bpg-slot-card" data-slot="${escapeHtml(schedule.value)}" data-direction="${escapeHtml(state.direction)}" data-armada="${armadaIndex}">
            <div class="bpg-slot-head">
                <div class="bpg-slot-head-row">
                    <div class="bpg-slot-time-badge">
                        <span class="bpg-slot-period">${escapeHtml(schedule.label)}</span>
                        <strong class="bpg-slot-time">${escapeHtml(schedule.time)}</strong>
                    </div>
                    <div class="bpg-slot-head-meta">
                        ${armadaBadge}
                        <div class="bpg-slot-service-types">
                            ${serviceTypes.length > 0
                                ? serviceTypes.map((t) => `<span class="bpg-service-badge">${escapeHtml(t)}</span>`).join('')
                                : '<span class="bpg-service-badge bpg-service-badge--empty">Belum ada layanan</span>'}
                        </div>
                        <span class="stock-value-badge ${badgeClass}">${totalPassengers} / ${TOTAL_PASSENGER_SEATS} Kursi</span>
                    </div>
                </div>
                ${addArmadaBtn ? `<div class="bpg-slot-head-row">${addArmadaBtn}</div>` : ''}
            </div>

            ${renderCarDiagram(seatBookingMap)}

            <div class="bpg-slot-assignment">
                <div class="bpg-slot-select-group">
                    <label>
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4 20C4 17.2386 7.58172 15 12 15C16.4183 15 20 17.2386 20 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                        Pilih Driver
                    </label>
                    <select class="bpg-slot-select" data-slot-driver="${escapeHtml(schedule.value)}__${armadaIndex}">
                        <option value="">— Belum ditentukan —</option>
                        ${driverOptions}
                    </select>
                </div>
                <div class="bpg-slot-select-group">
                    <label>
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><rect x="2" y="7" width="20" height="10" rx="3" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/></svg>
                        Pilih Mobil
                    </label>
                    <select class="bpg-slot-select" data-slot-mobil="${escapeHtml(schedule.value)}__${armadaIndex}">
                        <option value="">— Belum ditentukan —</option>
                        ${mobilOptions}
                    </select>
                </div>
            </div>

            ${renderPassengerList(bookingsInArmada)}

            <button class="bpg-slot-book-btn" type="button"
                data-slot-book="${escapeHtml(schedule.value)}"
                data-slot-armada="${armadaIndex}"
                title="Tambah pemesanan untuk Armada ${armadaIndex}, jadwal ${escapeHtml(schedule.time)}">
                ${plusIcon()}
                Tambah Pemesanan Armada ${armadaIndex}
            </button>
            <button class="bpg-surat-jalan-btn" type="button"
                data-surat-jalan="${escapeHtml(schedule.value)}"
                data-surat-jalan-armada="${armadaIndex}"
                title="Buat Surat Jalan Armada ${armadaIndex}, jadwal ${escapeHtml(schedule.time)}">
                ${documentIcon()}
                Surat Jalan
            </button>
        </article>`;
}

// ─── Slot Group (all armadas for one schedule) ────────────────────────────────

function renderSlotGroup(schedule, bookingsInSlot, cluster = 'BANGKINANG') {
    // Sesi 46 PR #58a: cluster-aware slot group.
    // bookingsInSlot di-pre-filter di caller (renderSlots) sehingga semua
    // booking di sini sudah cluster yang sama. Cluster di-pass eksplisit
    // sebagai parameter untuk slotKey + slotArmadaKey composite.

    // Group bookings by armada_index
    const armadaBookings = {};

    bookingsInSlot.forEach((b) => {
        const armada = b.armada_index || 1;
        if (!armadaBookings[armada]) armadaBookings[armada] = [];
        armadaBookings[armada].push(b);
    });

    // Sesi 46 PR #58a: slotKey 3 dimensi (date implicit via state.date).
    // Pattern: HH:MM__direction__CLUSTER
    const slotKey = `${schedule.value}__${state.direction}__${cluster}`;
    const maxFromBookings = bookingsInSlot.length > 0
        ? Math.max(...Object.keys(armadaBookings).map(Number))
        : 1;
    const maxFromExtras = state.slotExtraArmadas[slotKey] || 1;
    const maxArmada = Math.max(maxFromBookings, maxFromExtras);

    const cards = [];
    for (let i = 1; i <= maxArmada; i++) {
        cards.push(renderArmadaCard(schedule, i, armadaBookings[i] || [], maxArmada, cluster));
    }

    return `<div class="bpg-slot-group" data-slot-group="${escapeHtml(schedule.value)}" data-cluster="${escapeHtml(cluster)}">${cards.join('')}</div>`;
}

// ─── Slots Rendering ──────────────────────────────────────────────────────────

function renderSlotsLoading() {
    const shell = document.getElementById('bpg-slots-shell');

    if (shell) {
        shell.innerHTML = `
            <div class="admin-users-loading-inline" style="padding:40px 0;">
                <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                <span>Memuat data penumpang...</span>
            </div>`;
    }
}

function renderSlots() {
    // Sesi 46 PR #58b: render 2-panel layout cluster-aware.
    // Desktop (>860px): kedua panel BANGKINANG + PETAPAHAN berdampingan (D2-A).
    // Mobile (≤860px): tab switch BANGKINANG↔PETAPAHAN (D1-A).
    //   state.routeVia null = default tampil cluster aktif (BANGKINANG default).
    //
    // Internal grouping: per (time, cluster). Bookings di filter cluster
    // via clusterFromBooking() — booking PETAPAHAN dan BANGKINANG render
    // di panel terpisah (Skenario X armada independen per cluster).
    const shell = document.getElementById('bpg-slots-shell');

    if (!shell) {
        return;
    }

    // bookingsByTimeCluster[time][cluster] = [bookings]
    const bookingsByTimeCluster = {};
    const CLUSTERS = ['BANGKINANG', 'PETAPAHAN'];

    SCHEDULES.forEach((s) => {
        bookingsByTimeCluster[s.value] = {};
        CLUSTERS.forEach((c) => {
            bookingsByTimeCluster[s.value][c] = [];
        });
    });

    state.bookings.forEach((booking) => {
        const rawTime = (booking.trip_time || '').trim();
        const timeKey = rawTime.substring(0, 5);
        const cluster = clusterFromBooking(booking);

        if (bookingsByTimeCluster[timeKey] && bookingsByTimeCluster[timeKey][cluster]) {
            bookingsByTimeCluster[timeKey][cluster].push(booking);
        }
    });

    // Active cluster untuk mobile: state.routeVia atau default 'BANGKINANG'.
    // Desktop tetap render 2 panel; CSS handle visibility based on viewport.
    const activeMobileCluster = state.routeVia || 'BANGKINANG';

    // Render: 2-panel container, masing-masing panel = 6 schedule × armada cards.
    const panels = CLUSTERS.map((cluster) => {
        const isActiveOnMobile = cluster === activeMobileCluster;
        const clusterLabel = cluster === 'BANGKINANG' ? 'Bangkinang' : 'Petapahan';
        const clusterRoute = cluster === 'BANGKINANG'
            ? 'Pasir → Ujung Batu → Tandun → Bangkinang → Pekanbaru'
            : 'Pasir → Ujung Batu → Tandun → Petapahan → Pekanbaru';

        // Render slot groups untuk schedule × cluster ini.
        // Strategy: render minimal 1 slot per schedule per cluster untuk maintain
        // consistent layout (admin expect 6 jadwal × 2 cluster = 12 slot empty/filled).
        const slotGroups = [];
        SCHEDULES.forEach((schedule) => {
            const bookingsInCluster = bookingsByTimeCluster[schedule.value]?.[cluster] || [];
            slotGroups.push(renderSlotGroup(schedule, bookingsInCluster, cluster));
        });

        const activeClass = isActiveOnMobile ? ' is-active' : '';
        return `
            <section class="bpg-cluster-panel${activeClass}" data-cluster="${escapeHtml(cluster)}">
                <header class="bpg-cluster-panel-header" data-cluster="${escapeHtml(cluster)}">
                    <div>
                        <div class="bpg-cluster-panel-title">${escapeHtml(clusterLabel)}</div>
                        <div class="bpg-cluster-panel-subtitle">${escapeHtml(clusterRoute)}</div>
                    </div>
                </header>
                <div class="bpg-cluster-panel-body">
                    ${slotGroups.join('')}
                </div>
            </section>`;
    });

    shell.innerHTML = `<div class="bpg-clusters-row">${panels.join('')}</div>`;

    // Update mobile cluster tabs active state
    const clusterTabs = document.getElementById('bpg-cluster-tabs');
    if (clusterTabs) {
        clusterTabs.querySelectorAll('.bpg-cluster-tab').forEach((tab) => {
            tab.classList.toggle('is-active', tab.dataset.cluster === activeMobileCluster);
        });
    }
}

// ─── Fetch ────────────────────────────────────────────────────────────────────

async function fetchAndRender() {
    state.loading = true;
    renderSlotsLoading();

    try {
        const params = new URLSearchParams({
            date: state.date,
            direction: state.direction,
            limit: 200,
            page: 1,
        });

        const [bookings, armadaExtras] = await Promise.all([
            apiRequest(`/bookings?${params}`),
            apiRequest(`/bookings/armada-extras?date=${state.date}`).catch(() => ({})),
        ]);

        state.bookings = Array.isArray(bookings) ? bookings : [];

        // Seed slotExtraArmadas from persisted backend data so extra armada
        // cards survive page reloads.
        // Sesi 46 PR #58a: backend response sekarang composite key flat
        // format { "HH:MM__direction__CLUSTER": max_armada_index } sejak
        // PR #57 (D-PR57-2). Parse direction filter di JS supaya hanya
        // load extra armadas yang match state.direction current tab.
        if (armadaExtras && typeof armadaExtras === 'object') {
            Object.entries(armadaExtras).forEach(([compositeKey, maxIdx]) => {
                // Parse: "HH:MM__direction__CLUSTER"
                const parts = compositeKey.split('__');
                if (parts.length !== 3) {
                    // Backwards-compat: kalau response masih format lama
                    // (pre-PR #57, key cuma "HH:MM"), fallback default
                    // direction='to_pkb' cluster='BANGKINANG'.
                    const tripTime = compositeKey;
                    const slotKey = `${tripTime}__${state.direction}__BANGKINANG`;
                    state.slotExtraArmadas[slotKey] = Math.max(
                        state.slotExtraArmadas[slotKey] || 1,
                        Number(maxIdx) || 1,
                    );
                    return;
                }

                const [tripTime, dir, cluster] = parts;

                // Filter: hanya seed extra armadas yang match direction
                // current tab. Cluster mana saja diterima (state.routeVia
                // di-handle di renderSlots, bukan di fetch).
                if (dir !== state.direction) return;

                const slotKey = `${tripTime}__${dir}__${cluster.toUpperCase()}`;
                state.slotExtraArmadas[slotKey] = Math.max(
                    state.slotExtraArmadas[slotKey] || 1,
                    Number(maxIdx) || 1,
                );
            });
        }
    } catch (error) {
        state.bookings = [];

        if (error.status !== 403) {
            toastError(error.message || 'Gagal memuat data penumpang');
        }
    } finally {
        state.loading = false;
        renderSlots();
    }
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────

function bookingStatusBadge(status) {
    const map = {
        'Aktif':    'green',
        'Selesai':  'green',
        'Dibayar':  'green',
        'Dibayar Tunai': 'green',
        'Draft':    'gray',
        'Belum Bayar': 'orange',
        'Menunggu Pembayaran': 'blue',
        'Menunggu Verifikasi': 'blue',
        'Menunggu Konfirmasi': 'blue',
        'Batal':    'red',
        'Reguler':  'purple',
        'Paket':    'blue',
    };
    return map[status] || 'gray';
}

function openDetailModal(booking) {
    document.getElementById('bpg-detail-title').textContent = booking.nama_pemesanan || '-';
    document.getElementById('bpg-detail-subtitle').textContent = booking.booking_code || '-';
    document.getElementById('bpg-detail-full-link').href = `/dashboard/bookings/${booking.id}`;

    const isPackageBooking = booking.category === 'Paket';
    const ticketLink = document.getElementById('bpg-detail-ticket-link');
    const suratLink  = document.getElementById('bpg-detail-surat-link');
    if (isPackageBooking) {
        ticketLink.hidden = true;
        suratLink.hidden  = false;
        suratLink.href    = `/dashboard/bookings/${booking.id}/surat-bukti`;
    } else {
        ticketLink.hidden = false;
        ticketLink.href   = `/unduh/tiket-reguler/${booking.booking_code}`;
        suratLink.hidden  = true;
    }

    const bookingStatus   = booking.booking_status || '';
    const paymentStatus   = booking.payment_status || '';
    const serviceType     = booking.service_type || '';
    const hasPickup       = (booking.pickup_location || '').trim() !== '';
    const hasDropoff      = (booking.dropoff_location || '').trim() !== '';

    const body = document.getElementById('bpg-detail-body');

    body.innerHTML = `
        <!-- Status Badges -->
        <div class="bpg-dv-status-bar">
            ${bookingStatus ? `<span class="bpg-dv-badge bpg-dv-badge--${bookingStatusBadge(bookingStatus)}">${escapeHtml(bookingStatus)}</span>` : ''}
            ${paymentStatus ? `<span class="bpg-dv-badge bpg-dv-badge--${bookingStatusBadge(paymentStatus)}">${escapeHtml(paymentStatus)}</span>` : ''}
            ${serviceType ? `<span class="bpg-dv-badge bpg-dv-badge--purple">${escapeHtml(serviceType)}</span>` : ''}
        </div>

        <!-- Rute Perjalanan -->
        <div class="bpg-dv-section">
            <div class="bpg-dv-section-head">
                <svg viewBox="0 0 24 24" fill="none"><path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span class="bpg-dv-section-title">Rute Perjalanan</span>
            </div>
            <div class="bpg-dv-rows">
                <div class="bpg-dv-row bpg-dv-row--full">
                    <div class="bpg-dv-label">Rute</div>
                    <div class="bpg-dv-route">
                        <span class="bpg-dv-route-city">${escapeHtml(booking.from_city || '-')}</span>
                        <span class="bpg-dv-route-arrow">→</span>
                        <span class="bpg-dv-route-city">${escapeHtml(booking.to_city || '-')}</span>
                    </div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Tanggal</div>
                    <div class="bpg-dv-value">${escapeHtml(booking.trip_date_label || '-')}</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Waktu</div>
                    <div class="bpg-dv-value">${escapeHtml(booking.trip_time || '-')} WIB</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Armada</div>
                    <div class="bpg-dv-value">Armada ${escapeHtml(String(booking.armada_index || 1))}</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Jenis Layanan</div>
                    <div class="bpg-dv-value">${escapeHtml(serviceType || '-')}</div>
                </div>
            </div>
        </div>

        <!-- Data Penumpang -->
        <div class="bpg-dv-section">
            <div class="bpg-dv-section-head">
                <svg viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/></svg>
                <span class="bpg-dv-section-title">Data Penumpang</span>
            </div>
            <div class="bpg-dv-rows">
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Nama Pemesan</div>
                    <div class="bpg-dv-value">${escapeHtml(booking.nama_pemesanan || '-')}</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">No HP</div>
                    <div class="bpg-dv-value bpg-dv-value--mono">${escapeHtml(booking.phone || '-')}</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Kursi</div>
                    <div class="bpg-dv-value">${escapeHtml(booking.selected_seats_label || '-')}</div>
                </div>
                <div class="bpg-dv-row">
                    <div class="bpg-dv-label">Jumlah Penumpang</div>
                    <div class="bpg-dv-value">${escapeHtml(String(booking.passenger_count || 0))} Orang</div>
                </div>
            </div>
        </div>

        <!-- Alamat -->
        ${hasPickup || hasDropoff ? `
        <div class="bpg-dv-section">
            <div class="bpg-dv-section-head">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="2"/></svg>
                <span class="bpg-dv-section-title">Alamat</span>
            </div>
            <div class="bpg-dv-rows">
                ${hasPickup ? `
                <div class="bpg-dv-row bpg-dv-row--full">
                    <div class="bpg-dv-label">Alamat Penjemputan</div>
                    <div class="bpg-dv-value">${escapeHtml(booking.pickup_location)}</div>
                </div>` : ''}
                ${hasDropoff ? `
                <div class="bpg-dv-row bpg-dv-row--full">
                    <div class="bpg-dv-label">Alamat Pengantaran</div>
                    <div class="bpg-dv-value">${escapeHtml(booking.dropoff_location)}</div>
                </div>` : ''}
            </div>
        </div>` : ''}

        <!-- Biaya -->
        <div class="bpg-dv-section" style="margin-bottom:12px">
            <div class="bpg-dv-section-head">
                <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="14" rx="3" stroke="currentColor" stroke-width="2"/><path d="M2 10h20" stroke="currentColor" stroke-width="2"/></svg>
                <span class="bpg-dv-section-title">Pembayaran</span>
            </div>
            <div class="bpg-dv-rows">
                <div class="bpg-dv-row bpg-dv-row--full">
                    <div class="bpg-dv-label">Total Biaya</div>
                    <div class="bpg-dv-value bpg-dv-value--price">${escapeHtml(booking.total_amount_formatted || '-')}</div>
                </div>
            </div>
        </div>
    `;

    openModal('bpg-detail-modal');
}

// ─── Form (Add / Edit Booking) ────────────────────────────────────────────────

function seatOrder() {
    return (state.formOptions?.seat_options || []).map((item) => item.code);
}

function sortSeatCodes(seatCodes) {
    const orderMap = new Map(seatOrder().map((code, index) => [code, index]));

    return Array.from(new Set((seatCodes || []).map((code) => String(code).trim()).filter((code) => orderMap.has(code))))
        .sort((left, right) => (orderMap.get(left) ?? 999) - (orderMap.get(right) ?? 999));
}

function passengerCount() {
    return Number(document.getElementById('booking-passenger-count')?.value || 0);
}

function allowedSeatCodes() {
    // Role-based 2B policy (Sesi 37): admin/super admin selalu boleh pilih 2B
    // (kursi opsional), terlepas dari passenger_count. window.transitAuthUser
    // sudah di-pass di base.blade.php untuk semua halaman dashboard.
    const role = window.transitAuthUser?.role ?? null;
    const isAdmin = ['Super Admin', 'Admin'].includes(role);

    return (state.formOptions?.seat_options || [])
        .filter((item) => !item.is_optional || isAdmin)
        .map((item) => item.code);
}

function paymentStatusOptions() {
    return state.formOptions?.payment_status_options || [];
}

function allowedPaymentStatusValues(method) {
    if (method === 'transfer') return ['Belum Bayar', 'Menunggu Pembayaran', 'Menunggu Verifikasi', 'Dibayar'];
    if (method === 'qris') return ['Belum Bayar', 'Menunggu Pembayaran', 'Dibayar'];
    if (method === 'cash') return ['Belum Bayar', 'Dibayar Tunai'];

    return ['Belum Bayar'];
}

function defaultPaymentStatus(method) {
    if (method === 'transfer') return 'Menunggu Pembayaran';
    if (method === 'qris') return 'Dibayar';
    if (method === 'cash') return 'Dibayar Tunai';

    return 'Belum Bayar';
}

function defaultBookingStatus(method) {
    if (method === 'transfer') return 'Menunggu Verifikasi Pembayaran';
    if (method === 'qris' || method === 'cash') return 'Diproses';

    return 'Draft';
}

// Sesi 44D PR #1D: return struct so caller can show "tarif tidak terdaftar"
// banner kalau rute valid tapi belum ada di route_matrix.
function resolveFare(origin, destination) {
    if (!origin || !destination || origin === destination) {
        return { fare: null, isListed: false };
    }

    const routeMatrix = state.formOptions?.route_matrix || {};
    const fare = routeMatrix?.[origin]?.[destination];

    if (fare === undefined || fare === null) {
        return { fare: null, isListed: false };
    }

    return { fare: Number(fare), isListed: true };
}

function additionalFareValue() {
    return Math.max(0, parseInt(document.getElementById('booking-additional-fare')?.value || '0', 10) || 0);
}

function updatePricing() {
    const origin = document.getElementById('booking-from-city')?.value || '';
    const destination = document.getElementById('booking-to-city')?.value || '';
    const count = passengerCount();
    const fareResult = resolveFare(origin, destination);
    const additionalFare = additionalFareValue();
    // Sesi 44D PR #1D: kalau tarif null, treat sebagai 0 — admin bisa save
    // dengan ongkos tambahan saja. Banner UI sudah notify.
    const fareValue = fareResult.fare !== null ? fareResult.fare : 0;
    const effectiveFare = fareValue + additionalFare;
    const showTotal = origin && destination && origin !== destination;
    const total = showTotal ? effectiveFare * count : null;

    const fareInput = document.getElementById('booking-price-per-seat');
    const totalInput = document.getElementById('booking-total-amount');
    const banner = document.querySelector('[data-fare-not-listed-banner]');

    if (fareInput) {
        fareInput.value = showTotal ? formatCurrency(fareValue) : '';
    }
    if (totalInput) {
        totalInput.value = total !== null ? formatCurrency(total) : '';
    }

    if (banner) {
        const showBanner = origin && destination && origin !== destination && !fareResult.isListed;
        banner.hidden = !showBanner;
    }
}

// Sesi 44D PR #1D: auto-resolve dropdown jalur mobil dari cluster_map.
// Rute fixed (Aliantan↔PKB) → auto-set BANGKINANG/PETAPAHAN.
// Rute ambigu (Pasir↔PKB) → kosongkan, helper text muncul, user wajib pilih.
function updateRouteViaDropdown() {
    const origin = document.getElementById('booking-from-city')?.value || '';
    const destination = document.getElementById('booking-to-city')?.value || '';
    const select = document.getElementById('booking-route-via');
    const helper = document.querySelector('[data-route-via-helper]');

    if (!select) return;

    const clusterMap = state.formOptions?.cluster_map || {};
    const fromCluster = clusterMap[origin] ?? null;
    const toCluster = clusterMap[destination] ?? null;

    let resolvedCluster = null;
    if (fromCluster && fromCluster !== 'HUB') {
        resolvedCluster = fromCluster;
    } else if (toCluster && toCluster !== 'HUB') {
        resolvedCluster = toCluster;
    }

    const userTouched = select.dataset.userTouched === '1';

    if (resolvedCluster) {
        if (!userTouched || select.value === '') {
            select.value = resolvedCluster;
        }
    } else if (!userTouched) {
        select.value = '';
    }

    if (helper) {
        // Sesi 47 Fix #2: helper text "wajib pilih jalur mobil" hanya muncul
        // KALAU rute ambigu DAN dropdown route_via masih kosong. Kalau sudah
        // pre-filled dari panel context (D3-B Sesi 46 PR #58b) atau user sudah
        // pilih manual, helper text di-hide karena ambiguity sudah resolved.
        const isAmbiguous = !resolvedCluster && origin && destination && origin !== destination;
        const dropdownEmpty = !select.value;
        helper.hidden = !(isAmbiguous && dropdownEmpty);
    }
}

function updatePaymentFieldVisibility() {
    const paymentMethod = document.getElementById('booking-payment-method')?.value || '';
    const paymentStatusSelect = document.getElementById('booking-payment-status');
    const bookingStatusSelect = document.getElementById('booking-booking-status');
    const bankGroup = document.getElementById('booking-bank-account-group');
    const bankSelect = document.getElementById('booking-bank-account-code');
    const allowedStatuses = allowedPaymentStatusValues(paymentMethod);
    const currentPaymentStatus = paymentStatusSelect?.value || '';

    if (bankGroup) bankGroup.hidden = paymentMethod !== 'transfer';
    if (bankSelect && paymentMethod !== 'transfer') bankSelect.value = '';

    if (paymentStatusSelect) {
        paymentStatusSelect.innerHTML = paymentStatusOptions()
            .filter((option) => allowedStatuses.includes(option.value))
            .map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`)
            .join('');
        paymentStatusSelect.value = allowedStatuses.includes(currentPaymentStatus)
            ? currentPaymentStatus
            : defaultPaymentStatus(paymentMethod);
    }

    if (bookingStatusSelect) bookingStatusSelect.value = defaultBookingStatus(paymentMethod);
}

function updateSelectedSeatsInputs() {
    const container = document.getElementById('booking-selected-seats-inputs');

    if (container) {
        container.innerHTML = state.selectedSeats.map((seatCode) => `<input type="hidden" name="selected_seats[]" value="${escapeHtml(seatCode)}">`).join('');
    }
}

function updateSeatSummary() {
    const countEl = document.getElementById('booking-selected-seat-count');
    const labelEl = document.getElementById('booking-selected-seat-label');

    if (countEl) countEl.textContent = String(state.selectedSeats.length);
    if (labelEl) labelEl.textContent = state.selectedSeats.length > 0 ? state.selectedSeats.join(', ') : 'Belum dipilih';
}

function syncPassengerDraftMapFromDom() {
    document.querySelectorAll('[data-passenger-seat]').forEach((row) => {
        const seat = row.dataset.passengerSeat;

        if (seat) {
            state.passengerDraftMap[seat] = {
                seat_no: seat,
                name: row.querySelector('[data-passenger-name]')?.value.trim() || '',
                phone: row.querySelector('[data-passenger-phone]')?.value.trim() || '',
            };
        }
    });
}

function renderPassengerForms(seedPassengers = null) {
    const container = document.getElementById('booking-passenger-editor');

    if (!container) return;

    if (seedPassengers) {
        state.passengerDraftMap = Object.fromEntries(seedPassengers.map((p) => [p.seat_no, p]));
    }

    if (state.selectedSeats.length === 0) {
        container.innerHTML = `<div class="dashboard-empty-state dashboard-empty-state--block bookings-passenger-empty">Pilih kursi terlebih dahulu untuk menampilkan form data penumpang.</div>`;
        return;
    }

    container.innerHTML = `
        <div class="bookings-passenger-grid bookings-passenger-grid--editor">
            ${state.selectedSeats.map((seatCode, index) => {
                const passenger = state.passengerDraftMap[seatCode] || { name: '', phone: '' };

                return `
                    <article class="bookings-passenger-card bookings-passenger-card--editor" data-passenger-seat="${escapeHtml(seatCode)}">
                        <div class="bookings-passenger-form-head">
                            <span class="stock-value-badge stock-value-badge-blue">${escapeHtml(seatCode)}</span>
                            <strong>Penumpang ${index + 1}</strong>
                            <p>${index === 0 ? 'Menjadi nama pemesanan utama.' : 'Data penumpang tambahan.'}</p>
                        </div>
                        <div class="bookings-passenger-form-grid">
                            <div class="admin-users-form-group">
                                <label>Nama</label>
                                <div class="admin-users-input-shell">
                                    <input type="text" value="${escapeHtml(passenger.name || '')}" placeholder="Masukkan nama penumpang" data-passenger-name>
                                </div>
                            </div>
                            <div class="admin-users-form-group">
                                <label>No HP</label>
                                <div class="admin-users-input-shell">
                                    <input type="text" value="${escapeHtml(passenger.phone || '')}" placeholder="08xxxxxxxxxx" data-passenger-phone>
                                </div>
                            </div>
                        </div>
                    </article>`;
            }).join('')}
        </div>`;
}

async function fetchOccupiedSeats() {
    const tripDate = document.getElementById('booking-trip-date')?.value || '';
    const tripTime = document.getElementById('booking-trip-time')?.value || '';
    const fromCity = document.getElementById('booking-from-city')?.value || '';
    const toCity = document.getElementById('booking-to-city')?.value || '';
    const excludeId = state.editItem?.id || '';
    const armadaIndex = state.currentFormArmadaIndex || 1;

    // Bug #47b: skip API call kalau route belum lengkap. Backend agregat
    // semua booking lintas rute saat from/to kosong, menyebabkan seat
    // dari rute lain salah ditampilkan TERISI di modal.
    if (!tripDate || !tripTime || !fromCity || !toCity) {
        state.occupiedSeatsForForm = [];
        return;
    }

    try {
        const params = new URLSearchParams({
            trip_date: tripDate,
            trip_time: tripTime,
            armada_index: armadaIndex,
            from_city: fromCity,
            to_city: toCity,
        });

        if (excludeId) params.set('exclude_id', excludeId);

        const res = await apiRequest(`/bookings/occupied-seats?${params}`);

        state.occupiedSeatsForForm = Array.isArray(res?.occupied_seats) ? res.occupied_seats : [];
    } catch {
        state.occupiedSeatsForForm = [];
    }
}

async function fetchOccupiedSeatsForPackage() {
    const tripDate    = document.getElementById('pkg-trip-date')?.value || '';
    const tripTime    = document.getElementById('pkg-trip-time')?.value || '';
    const fromCity    = document.getElementById('pkg-from-city')?.value || '';
    const toCity      = document.getElementById('pkg-to-city')?.value || '';
    const armadaIndex = parseInt(document.getElementById('package-armada-index')?.value || '1', 10);

    // Bug #47b: skip API call kalau route belum lengkap (sama dengan fetchOccupiedSeats).
    if (!tripDate || !tripTime || !fromCity || !toCity) {
        state.occupiedSeatsForPackageForm = [];
        renderPackageSeatOptions();
        return;
    }

    try {
        const params = new URLSearchParams({
            trip_date: tripDate,
            trip_time: tripTime,
            armada_index: armadaIndex,
            from_city: fromCity,
            to_city: toCity,
        });

        const res = await apiRequest(`/bookings/occupied-seats?${params}`);
        state.occupiedSeatsForPackageForm = Array.isArray(res?.occupied_seats) ? res.occupied_seats : [];
    } catch {
        state.occupiedSeatsForPackageForm = [];
    }

    renderPackageSeatOptions();
}

function renderPackageSeatOptions() {
    const seatSelect = document.getElementById('pkg-seat-code');
    if (!seatSelect) return;

    const allSeats  = (state.formOptions?.seat_options || []).filter((s) => !s.is_optional);
    const occupied  = state.occupiedSeatsForPackageForm || [];
    const prevValue = seatSelect.value;

    seatSelect.innerHTML = '<option value="">Pilih kursi</option>' +
        allSeats.map((seat) => {
            const isOccupied = occupied.includes(seat.code);
            return `<option value="${escapeHtml(seat.code)}"${isOccupied ? ' disabled' : ''}>${escapeHtml(seat.label)}${isOccupied ? ' — Sudah dipesan' : ''}</option>`;
        }).join('');

    if (prevValue && !occupied.includes(prevValue)) {
        seatSelect.value = prevValue;
    }
}

function renderSeatButtons() {
    const seatButtons = document.querySelectorAll('[data-seat-code]');
    const currentPassengerCount = passengerCount();
    const allowedCodes = allowedSeatCodes();

    state.selectedSeats = sortSeatCodes(
        state.selectedSeats.filter((code) => allowedCodes.includes(code) && !state.occupiedSeatsForForm.includes(code)),
    );

    seatButtons.forEach((button) => {
        const code = button.dataset.seatCode;
        const visible = allowedCodes.includes(code);
        const isOccupied = state.occupiedSeatsForForm.includes(code);
        const isSelected = state.selectedSeats.includes(code);
        const disableUnselected = state.selectedSeats.length >= currentPassengerCount && !isSelected;

        button.hidden = !visible;
        button.classList.toggle('is-selected', isSelected);
        button.classList.toggle('is-occupied', isOccupied);
        button.classList.toggle('is-disabled', !isOccupied && disableUnselected);
        button.disabled = !visible || isOccupied || (!isSelected && disableUnselected);

        if (isOccupied) {
            button.title = 'Kursi sudah dipesan';
        } else {
            button.title = '';
        }
    });

    updateSelectedSeatsInputs();
    updateSeatSummary();
}

function resetForm(armadaIndex = 1, tripTime = '', cluster = null) {
    const form = document.getElementById('booking-form');

    form?.reset();

    state.editItem = null;
    state.selectedSeats = [];
    state.passengerDraftMap = {};
    state.currentFormArmadaIndex = armadaIndex;

    const todayVal = state.date || todayString();

    document.getElementById('booking-id').value = '';
    document.getElementById('booking-armada-index').value = String(armadaIndex);
    document.getElementById('booking-form-title').textContent = 'Tambah Pemesanan';

    const armadaLabel = armadaIndex > 1 ? ` (Armada ${armadaIndex})` : '';
    document.getElementById('booking-form-description').textContent = `Lengkapi data pemesanan reguler dari dashboard admin${armadaLabel}.`;

    document.getElementById('booking-trip-date').value = todayVal;
    document.getElementById('booking-trip-time').value = tripTime || '';

    // Explicitly reset city selects to empty — form.reset() alone is unreliable
    // on mobile browsers (Android/iOS) which may restore previously selected values
    const fromCityEl = document.getElementById('booking-from-city');
    const toCityEl = document.getElementById('booking-to-city');
    if (fromCityEl) fromCityEl.value = '';
    if (toCityEl) toCityEl.value = '';

    // Sesi 44D PR #1D: reset jalur mobil dropdown + clear user-touch flag.
    // Sesi 46 PR #58b: auto-prefill cluster dari panel asal (D3-B).
    // Cluster prefilled sebagai user-touched=1 supaya tidak ke-overwrite oleh
    // auto-resolve cluster_map saat user pilih from/to city. Admin tetap
    // bisa override manual.
    const routeViaEl = document.getElementById('booking-route-via');
    if (routeViaEl) {
        routeViaEl.value = cluster || '';
        routeViaEl.dataset.userTouched = cluster ? '1' : '0';
    }

    document.getElementById('booking-passenger-count').value = '1';
    document.getElementById('booking-additional-fare').value = '0';
    document.getElementById('booking-payment-method').value = '';
    document.getElementById('booking-booking-status').value = 'Draft';
    updatePaymentFieldVisibility();
    updateRouteViaDropdown();
    updatePricing();

    // Sesi 47 Fix #1: filter city dropdown berdasarkan cluster context (D3-B).
    // null cluster (top-level Add) → show all. Cluster value → filter strict.
    filterCityOptionsByCluster(cluster);

    // Sesi 47 Fix #2: pre-fill driver/mobil dari slot map kalau ada.
    // Source: state.slotDriverMap[slotArmadaKey] + state.slotMobilMap[slotArmadaKey].
    // slotArmadaKey: HH:MM__direction__CLUSTER__armadaIndex (Sesi 46 PR #58a).
    // Default kosong kalau slot belum punya driver/mobil assigned.
    const driverSelect = document.getElementById('booking-driver-id');
    const mobilSelect = document.getElementById('booking-mobil-id');
    const driverNameHidden = document.getElementById('booking-driver-name');

    if (driverSelect) driverSelect.value = '';
    if (mobilSelect) mobilSelect.value = '';
    if (driverNameHidden) driverNameHidden.value = '';

    if (cluster && tripTime) {
        const slotArmadaKey = `${tripTime}__${state.direction}__${cluster}__${armadaIndex}`;
        const slotDriverId = state.slotDriverMap[slotArmadaKey] || '';
        const slotMobilId = state.slotMobilMap[slotArmadaKey] || '';

        if (driverSelect && slotDriverId) {
            driverSelect.value = slotDriverId;
            const driverObj = state.drivers.find((d) => String(d.id) === String(slotDriverId));
            if (driverNameHidden && driverObj) {
                driverNameHidden.value = driverObj.nama;
            }
        }
        if (mobilSelect && slotMobilId) {
            mobilSelect.value = slotMobilId;
        }
    }

    setButtonBusy(document.getElementById('booking-submit-btn'), false, 'Menyimpan...');
    fetchOccupiedSeats().then(() => { renderSeatButtons(); renderPassengerForms(); });
}

function fillForm(item) {
    // Sesi 47 Fix #1: restore semua city options (data lama mungkin punya
    // city dari cluster lain, jangan auto-hide saat edit).
    restoreAllCityOptions();

    state.editItem = item;
    state.selectedSeats = sortSeatCodes(item.selected_seats || []);
    state.passengerDraftMap = Object.fromEntries((item.passengers || []).map((p) => [p.seat_no, p]));
    state.currentFormArmadaIndex = item.armada_index || 1;

    document.getElementById('booking-id').value = item.id;
    document.getElementById('booking-armada-index').value = String(item.armada_index || 1);
    document.getElementById('booking-booking-for').value = item.booking_for;
    document.getElementById('booking-category').value = item.category;
    document.getElementById('booking-from-city').value = item.from_city;
    document.getElementById('booking-to-city').value = item.to_city;
    document.getElementById('booking-trip-date').value = item.trip_date_value;
    document.getElementById('booking-trip-time').value = item.trip_time_value;
    document.getElementById('booking-passenger-count').value = String(item.passenger_count);
    // Sesi 47 Fix #2: load driver/mobil dari item di edit mode.
    // booking-driver-name sekarang hidden field, sync via dropdown driver-id.
    const driverNameHidden = document.getElementById('booking-driver-name');
    if (driverNameHidden) {
        driverNameHidden.value = item.driver_name === 'Menunggu Penetapan Driver' ? '' : (item.driver_name || '');
    }

    const driverIdEl = document.getElementById('booking-driver-id');
    if (driverIdEl) driverIdEl.value = item.driver_id || '';

    const mobilIdEl = document.getElementById('booking-mobil-id');
    if (mobilIdEl) mobilIdEl.value = item.mobil_id || '';
    document.getElementById('booking-additional-fare').value = String(item.additional_fare_per_passenger || 0);
    document.getElementById('booking-pickup-location').value = item.pickup_location;
    document.getElementById('booking-dropoff-location').value = item.dropoff_location;
    document.getElementById('booking-payment-method').value = item.payment_method_value || '';
    updatePaymentFieldVisibility();
    document.getElementById('booking-payment-status').value = item.payment_status;
    document.getElementById('booking-booking-status').value = item.booking_status;
    document.getElementById('booking-bank-account-code').value = item.bank_account_code || '';
    document.getElementById('booking-notes').value = item.notes || '';

    // Sesi 44D PR #1D: load route_via dari item, treat sebagai user-touched
    // supaya tidak ke-overwrite oleh auto-resolve cluster_map.
    const routeViaEl = document.getElementById('booking-route-via');
    if (routeViaEl) {
        routeViaEl.value = item.route_via || '';
        routeViaEl.dataset.userTouched = item.route_via ? '1' : '0';
    }

    const armadaLabel = (item.armada_index || 1) > 1 ? ` (Armada ${item.armada_index})` : '';
    document.getElementById('booking-form-title').textContent = 'Edit Pemesanan';
    document.getElementById('booking-form-description').textContent = `Perbarui data pemesanan reguler yang dipilih${armadaLabel}.`;

    updateRouteViaDropdown();
    updatePricing();
    setButtonBusy(document.getElementById('booking-submit-btn'), false, 'Menyimpan...');
    fetchOccupiedSeats().then(() => { renderSeatButtons(); renderPassengerForms(item.passengers || []); });
}

function buildPayload() {
    syncPassengerDraftMapFromDom();

    return {
        booking_for: document.getElementById('booking-booking-for')?.value || '',
        category: document.getElementById('booking-category')?.value || 'Reguler',
        from_city: document.getElementById('booking-from-city')?.value || '',
        to_city: document.getElementById('booking-to-city')?.value || '',
        trip_date: document.getElementById('booking-trip-date')?.value || '',
        trip_time: document.getElementById('booking-trip-time')?.value || '',
        passenger_count: Number(document.getElementById('booking-passenger-count')?.value || 0),
        driver_name: document.getElementById('booking-driver-name')?.value.trim() || '',
        // Sesi 47 Fix #2: driver_id + mobil_id from form modal dropdown.
        driver_id: document.getElementById('booking-driver-id')?.value || null,
        mobil_id: document.getElementById('booking-mobil-id')?.value || null,
        additional_fare_per_passenger: additionalFareValue(),
        pickup_location: document.getElementById('booking-pickup-location')?.value.trim() || '',
        dropoff_location: document.getElementById('booking-dropoff-location')?.value.trim() || '',
        selected_seats: state.selectedSeats,
        passengers: state.selectedSeats.map((seatCode) => ({
            seat_no: seatCode,
            name: state.passengerDraftMap?.[seatCode]?.name || '',
            phone: state.passengerDraftMap?.[seatCode]?.phone || '',
        })),
        payment_method: document.getElementById('booking-payment-method')?.value || '',
        payment_status: document.getElementById('booking-payment-status')?.value || 'Belum Bayar',
        booking_status: document.getElementById('booking-booking-status')?.value || 'Draft',
        bank_account_code: document.getElementById('booking-bank-account-code')?.value || '',
        notes: document.getElementById('booking-notes')?.value.trim() || '',
        armada_index: state.currentFormArmadaIndex || 1,
        route_via: document.getElementById('booking-route-via')?.value || '',
    };
}

// Bug #49: module-level ref assigned inside initBookingsPage so top-level
// openEditDialog can dispatch to the nested fillPackageForm helper.
let fillPackageFormImpl = null;

async function openEditDialog(id) {
    const item = await apiRequest(`/bookings/${id}`);

    // Bug #49: dispatch by category. Paket uses separate form/API; others use regular flow.
    if (item.category === 'Paket' && fillPackageFormImpl) {
        fillPackageFormImpl(item);
        openModal('package-form-modal');
    } else {
        fillForm(item);
        openModal('booking-form-modal');
    }
}

function openDeleteDialog(item) {
    state.deleteItem = item;
    document.getElementById('booking-delete-copy').innerHTML = `Apakah Anda yakin ingin menghapus data pemesanan <strong>${escapeHtml(item.nama)}</strong>? Tindakan ini tidak dapat dibatalkan.`;
    openModal('booking-delete-modal');
}

// ─── Access Denied ────────────────────────────────────────────────────────────

function renderAccessDenied() {
    const note = document.getElementById('bookings-access-note');
    const tabs = document.getElementById('bpg-route-tabs');
    const shell = document.getElementById('bpg-slots-shell');

    if (note) { note.hidden = false; }
    if (tabs) { tabs.hidden = true; }
    if (shell) { shell.hidden = true; }
}

// ─── Departure status helper (used in slotsShell click handler) ───────────────

function departureStatusMeta(status) {
    if (status === 'Berangkat') return { label: 'Berangkat', cls: 'bpg-depart-trigger--go' };
    if (status === 'Tidak Berangkat') return { label: 'Tidak Berangkat', cls: 'bpg-depart-trigger--no' };
    if (status === 'Di Oper') return { label: 'Di Oper', cls: 'bpg-depart-trigger--oper' };

    return { label: 'Status', cls: '' };
}

// ─── Init ─────────────────────────────────────────────────────────────────────

export default function initBookingsPage({ user } = {}) {
    const addButton = document.getElementById('bookings-add-btn');
    const datePicker = document.getElementById('bookings-date-picker');
    const routeTabs = document.getElementById('bpg-route-tabs');
    const slotsShell = document.getElementById('bpg-slots-shell');
    const form = document.getElementById('booking-form');
    const deleteButton = document.getElementById('booking-delete-confirm-btn');
    const seatGrid = document.getElementById('booking-seat-grid');
    const passengerEditor = document.getElementById('booking-passenger-editor');
    const paymentMethodSelect = document.getElementById('booking-payment-method');

    state.formOptions = parseJsonScript('bookings-form-options');
    state.drivers = parseJsonScript('bookings-drivers-data') || [];
    state.mobils = parseJsonScript('bookings-mobils-data') || [];

    // Sesi 47 Fix #2: populate dropdown Driver + Mobil di form modal (Regular + Package).
    populateDriverMobilDropdowns();
    state.currentUser = user || window.transitAuthUser || null;
    state.date = todayString();

    if (!isAdminRole(state.currentUser?.role)) {
        renderAccessDenied();
        return;
    }

    const routeTabsEl = document.getElementById('bpg-route-tabs');
    if (routeTabsEl) { routeTabsEl.hidden = false; }
    if (slotsShell) { slotsShell.hidden = false; }
    const accessNote = document.getElementById('bookings-access-note');
    if (accessNote) { accessNote.hidden = true; }

    if (datePicker) {
        datePicker.value = state.date;
        datePicker.addEventListener('change', async () => {
            state.date = datePicker.value;
            state.slotDriverMap = {};
            state.slotMobilMap = {};
            state.slotExtraArmadas = {};
            await fetchAndRender();
        });
    }

    // Sesi 46 PR #58b: Cluster sub-tabs (mobile). Click switch state.routeVia
    // → re-render. Desktop tab hidden via CSS, click no-op.
    const clusterTabs = document.getElementById('bpg-cluster-tabs');
    clusterTabs?.addEventListener('click', (event) => {
        const tab = event.target.closest('[data-cluster]');
        if (!tab) return;

        const newCluster = tab.dataset.cluster;
        if (state.routeVia === newCluster) return;

        state.routeVia = newCluster;

        // Re-render slots dengan cluster filter aktif (mobile only effect)
        renderSlots();
    });

    // Route direction tabs
    routeTabs?.addEventListener('click', async (event) => {
        const tab = event.target.closest('[data-direction]');

        if (!tab) return;

        const newDirection = tab.dataset.direction;

        if (newDirection === state.direction) return;

        state.direction = newDirection;
        // Sesi 46 PR #58a: reset cluster-aware state map saat ganti direction.
        // slotDriverMap + slotMobilMap + slotExtraArmadas pakai composite key
        // include direction, jadi reset perlu dilakukan supaya stale state
        // dari direction lama tidak leak ke render direction baru.
        state.slotDriverMap = {};
        state.slotMobilMap = {};
        state.slotExtraArmadas = {};

        document.querySelectorAll('.bpg-route-tab').forEach((t) => {
            t.classList.toggle('is-active', t.dataset.direction === newDirection);
        });

        await fetchAndRender();
    });

    // Slots shell: delegate clicks and changes
    function closeAllDepartureMenus(exceptId = null) {
        slotsShell?.querySelectorAll('[data-depart-dropdown]').forEach((dd) => {
            if (String(dd.dataset.departDropdown) === String(exceptId)) return;
            dd.querySelector('.bpg-depart-menu')?.removeAttribute('hidden');
            dd.querySelector('.bpg-depart-menu')?.setAttribute('hidden', '');
        });
    }

    document.addEventListener('click', (e) => {
        if (!e.target.closest('[data-depart-dropdown]')) {
            closeAllDepartureMenus();
        }
    });

    slotsShell?.addEventListener('click', async (event) => {
        const toggleBtn = event.target.closest('[data-depart-toggle]');
        const departureBtn = event.target.closest('[data-booking-departure]');
        const lihatBtn = event.target.closest('[data-booking-lihat]');
        const editBtn = event.target.closest('[data-booking-edit]');
        const deleteBtn = event.target.closest('[data-booking-delete]');
        const addArmadaBtn = event.target.closest('[data-add-armada]');
        const slotBookBtn = event.target.closest('[data-slot-book]');
        const suratJalanBtn = event.target.closest('[data-surat-jalan]');

        try {
            if (toggleBtn) {
                const bookingId = toggleBtn.dataset.departToggle;
                const dropdown = slotsShell.querySelector(`[data-depart-dropdown="${CSS.escape(bookingId)}"]`);
                const menu = dropdown?.querySelector('.bpg-depart-menu');

                if (!menu) return;

                const isHidden = menu.hasAttribute('hidden');

                closeAllDepartureMenus(bookingId);
                menu.toggleAttribute('hidden', !isHidden);

                return;
            }

            if (departureBtn) {
                const bookingId = departureBtn.dataset.bookingDeparture;
                const newStatus = departureBtn.dataset.departureStatus;
                const booking = state.bookings.find((b) => String(b.id) === String(bookingId));

                if (!booking) return;

                const statusToSet = booking.departure_status === newStatus ? '' : newStatus;

                booking.departure_status = statusToSet;

                const dropdown = slotsShell.querySelector(`[data-depart-dropdown="${CSS.escape(bookingId)}"]`);

                if (dropdown) {
                    const trigger = dropdown.querySelector('.bpg-depart-trigger');
                    const meta = departureStatusMeta(statusToSet);

                    trigger.className = `bpg-depart-trigger ${meta.cls}`;
                    trigger.childNodes.forEach((n) => { if (n.nodeType === 3) n.textContent = meta.label; });

                    dropdown.querySelectorAll('[data-booking-departure]').forEach((btn) => {
                        btn.classList.toggle('is-active', btn.dataset.departureStatus === statusToSet);
                    });

                    dropdown.querySelector('.bpg-depart-menu')?.setAttribute('hidden', '');
                }

                // Bug #30: include version for optimistic lock (design §7.4).
                const deptBooking = state.bookings.find((b) => String(b.id) === String(bookingId));
                await apiRequest(`/bookings/${bookingId}/departure-status`, {
                    method: 'PATCH',
                    body: { departure_status: statusToSet, version: deptBooking?.version ?? 0 },
                });

                return;
            }

            if (lihatBtn) {
                const bookingId = lihatBtn.dataset.bookingLihat;
                const booking = state.bookings.find((b) => String(b.id) === String(bookingId));

                if (booking) {
                    openDetailModal(booking);
                }

                return;
            }

            if (editBtn) {
                await openEditDialog(editBtn.dataset.bookingEdit);
                return;
            }

            if (deleteBtn) {
                // Bug #46 hotfix: lookup version from state.bookings (mirror line 1185+1209 pattern).
                // Without version, DELETE request omits ?version=N query string → 422 from backend.
                const delBookingId = deleteBtn.dataset.bookingDelete;
                const delBooking = state.bookings.find((b) => String(b.id) === String(delBookingId));
                openDeleteDialog({
                    id: delBookingId,
                    nama: deleteBtn.dataset.bookingName,
                    version: delBooking?.version ?? 0,
                });
                return;
            }

            // "Tambah Armada" button: expand extra armada for this slot and show choice modal
            if (addArmadaBtn) {
                const tripTime = addArmadaBtn.dataset.addArmada;
                const currentArmadaIndex = parseInt(addArmadaBtn.dataset.armadaIndex || '1');
                const newArmadaIndex = currentArmadaIndex + 1;
                // Sesi 46 PR #58a: cluster-aware slotKey.
                // Cluster di-resolve dari clicked button context (data-cluster
                // attribute akan di-add di PR #58b). Untuk PR #58a (data integrity
                // only, no UI change), default ke 'BANGKINANG' supaya backwards-
                // compat dengan behavior pre-PR #58a (single cluster default).
                const cluster = 'BANGKINANG';
                const slotKey = `${tripTime}__${state.direction}__${cluster}`;

                // Record that this slot now shows an extra armada (client-side)
                state.slotExtraArmadas[slotKey] = Math.max(
                    state.slotExtraArmadas[slotKey] || 1,
                    newArmadaIndex,
                );

                // Persist the extra armada to the backend so it survives page reloads
                // Sesi 46 PR #58a: kirim direction + route_via supaya backend
                // PR #57 simpan di row composite cluster-aware.
                apiRequest('/bookings/armada-extras', {
                    method: 'POST',
                    body: {
                        trip_date: state.date,
                        trip_time: tripTime,
                        direction: state.direction,
                        route_via: cluster,
                        armada_index: newArmadaIndex,
                    },
                }).catch(() => {});

                // Re-render slots to show new armada card
                renderSlots();

                // Show choice modal
                // Sesi 46 PR #58b: cluster context dari clicked button ancestor.
                state._pendingChoiceArmada = newArmadaIndex;
                state._pendingChoiceTime = tripTime;
                state._pendingChoiceCluster = cluster; // cluster sudah di-resolve di atas (Step 9.2 PR #58a)
                openModal('booking-type-choice-modal');

                return;
            }

            // Per-armada "Tambah Pemesanan" button within a card — show choice modal
            if (slotBookBtn) {
                const tripTime = slotBookBtn.dataset.slotBook;
                const armadaIndex = parseInt(slotBookBtn.dataset.slotArmada || '1');

                // Sesi 46 PR #58b: auto-prefill cluster (D3-B locked).
                // Resolve cluster dari closest .bpg-slot-group ancestor data-cluster.
                const slotGroupEl = slotBookBtn.closest('[data-slot-group]');
                const cluster = slotGroupEl?.dataset.cluster || 'BANGKINANG';

                state._pendingChoiceArmada = armadaIndex;
                state._pendingChoiceTime = tripTime;
                state._pendingChoiceCluster = cluster;
                openModal('booking-type-choice-modal');

                return;
            }

            // "Surat Jalan" button: open PDF in new tab
            if (suratJalanBtn) {
                const tripTime = suratJalanBtn.dataset.suratJalan;
                const armadaIndex = parseInt(suratJalanBtn.dataset.suratJalanArmada || '1');
                // Sesi 46 PR #58a: cluster-aware slotArmadaKey.
                // Read cluster dari closest .bpg-slot-group ancestor data-cluster
                // attribute (di-set di renderSlotGroup Step 6).
                const slotGroupEl = event.target.closest('[data-slot-group]');
                const cluster = slotGroupEl?.dataset.cluster || 'BANGKINANG';
                const slotArmadaKey = `${tripTime}__${state.direction}__${cluster}__${armadaIndex}`;

                const driverId = state.slotDriverMap[slotArmadaKey] || '';
                const mobilId = state.slotMobilMap[slotArmadaKey] || '';

                const driverObj = driverId ? state.drivers.find((d) => String(d.id) === String(driverId)) : null;
                const mobilObj = mobilId ? state.mobils.find((m) => String(m.id) === String(mobilId)) : null;

                const params = new URLSearchParams({
                    date: state.date,
                    trip_time: tripTime,
                    armada_index: String(armadaIndex),
                    direction: state.direction,
                });

                if (driverObj) params.set('driver_name', driverObj.nama);
                if (mobilObj) params.set('no_pol', mobilObj.kode_mobil);

                window.open(`/dashboard/bookings/surat-jalan?${params}`, '_blank');

                return;
            }
        } catch (error) {
            // Bug #30: intercept 409 version conflict (departure-status path) before generic toast.
            if (handleVersionConflict(error)) return;
            toastError(error.message || 'Gagal memuat data pemesanan');
        }
    });

    // Driver / Mobil select changes per slot+armada
    slotsShell?.addEventListener('change', async (event) => {
        const driverSelect = event.target.closest('[data-slot-driver]');
        const mobilSelect = event.target.closest('[data-slot-mobil]');

        if (driverSelect) {
            // data-slot-driver format: "HH:MM__armadaIndex"
            const [tripTime, armadaIdxStr] = driverSelect.dataset.slotDriver.split('__');
            const armadaIndex = parseInt(armadaIdxStr || '1');
            const driverId = driverSelect.value;
            const selectedOption = driverSelect.options[driverSelect.selectedIndex];
            const driverName = driverId ? (selectedOption?.text.split(' (')[0] || '') : '';
            // Sesi 46 PR #58a: cluster-aware slotArmadaKey.
            const slotGroupEl = event.target.closest('[data-slot-group]');
            const cluster = slotGroupEl?.dataset.cluster || 'BANGKINANG';
            const slotArmadaKey = `${tripTime}__${state.direction}__${cluster}__${armadaIndex}`;

            state.slotDriverMap[slotArmadaKey] = driverId;

            try {
                await apiRequest('/bookings/slot-assign', {
                    method: 'PATCH',
                    body: {
                        trip_date: state.date,
                        trip_time: tripTime,
                        direction: state.direction,
                        armada_index: armadaIndex,
                        driver_id: driverId || null,
                        driver_name: driverName,
                    },
                });
                toastSuccess('Driver berhasil diperbarui');
            } catch (err) {
                toastError(err.message || 'Gagal memperbarui driver');
            }
        }

        if (mobilSelect) {
            const [tripTime, armadaIdxStr] = mobilSelect.dataset.slotMobil.split('__');
            const armadaIndex = parseInt(armadaIdxStr || '1');
            const mobilId = mobilSelect.value;
            // Sesi 46 PR #58a: cluster-aware slotArmadaKey.
            const slotGroupEl = event.target.closest('[data-slot-group]');
            const cluster = slotGroupEl?.dataset.cluster || 'BANGKINANG';
            const slotArmadaKey = `${tripTime}__${state.direction}__${cluster}__${armadaIndex}`;

            state.slotMobilMap[slotArmadaKey] = mobilId;
        }
    });

    // ─── Package booking form logic ───────────────────────────────────────────

    function resetPackageForm(armadaIndex = 1, tripTime = '', cluster = null) {
        // Bug #49: clear edit state on fresh create (submit will POST not PUT)
        state.editPackageItem = null;

        const form = document.getElementById('package-form');
        if (form) form.reset();
        const armadaInput = document.getElementById('package-armada-index');
        if (armadaInput) armadaInput.value = String(armadaIndex);
        const dateInput = document.getElementById('pkg-trip-date');
        if (dateInput) dateInput.value = state.date;
        const timeSelect = document.getElementById('pkg-trip-time');
        if (timeSelect && tripTime) timeSelect.value = tripTime;
        const bankGroup = document.getElementById('pkg-bank-account-group');
        if (bankGroup) bankGroup.hidden = true;
        const seatGroup = document.getElementById('pkg-seat-group');
        if (seatGroup) seatGroup.hidden = true;
        const banner = document.getElementById('package-form-success-banner');
        if (banner) banner.hidden = true;

        // Bug #49: reset title + description for CREATE mode (overrides any EDIT-mode text)
        const titleEl = document.querySelector('#package-form-modal .admin-users-dialog-head h3');
        if (titleEl) titleEl.textContent = 'Pengirim Paket';
        const descEl = document.getElementById('package-form-description');
        if (descEl) descEl.textContent = 'Lengkapi data pengiriman paket. Surat Bukti Pengiriman tersedia setelah disimpan.';

        // Sesi 46 PR #58b: auto-prefill cluster route_via di Package form (D-PR58b-2).
        const pkgRouteViaEl = document.getElementById('pkg-route-via');
        if (pkgRouteViaEl) {
            pkgRouteViaEl.value = cluster || '';
            pkgRouteViaEl.dataset.userTouched = cluster ? '1' : '0';
        }

        // Sesi 47 Fix #1: filter city dropdown berdasarkan cluster context.
        filterCityOptionsByCluster(cluster);

        // Sesi 47 Fix #2: pre-fill driver/mobil dari slot map (symmetric Regular form).
        const pkgDriverSelect = document.getElementById('pkg-driver-id');
        const pkgMobilSelect = document.getElementById('pkg-mobil-id');

        if (pkgDriverSelect) pkgDriverSelect.value = '';
        if (pkgMobilSelect) pkgMobilSelect.value = '';

        if (cluster && tripTime) {
            const slotArmadaKey = `${tripTime}__${state.direction}__${cluster}__${armadaIndex}`;
            const slotDriverId = state.slotDriverMap[slotArmadaKey] || '';
            const slotMobilId = state.slotMobilMap[slotArmadaKey] || '';

            if (pkgDriverSelect && slotDriverId) pkgDriverSelect.value = slotDriverId;
            if (pkgMobilSelect && slotMobilId) pkgMobilSelect.value = slotMobilId;
        }

        updatePackageTotal();
        fetchOccupiedSeatsForPackage();
    }

    // Bug #49: populate package form from API booking payload for EDIT flow.
    // Reads notes JSON for recipient/item_* fields (stored as JSON at create time).
    function fillPackageForm(item) {
        // Sesi 47 Fix #1: restore semua city options (data lama mungkin punya
        // city dari cluster lain, jangan auto-hide saat edit).
        restoreAllCityOptions();

        // Parse notes JSON for recipient/item fields (stored as JSON string at create time)
        let packageNotes = {};
        try {
            packageNotes = item.notes ? JSON.parse(item.notes) : {};
        } catch (e) {
            console.warn('Failed to parse package notes JSON:', e);
            packageNotes = {};
        }

        // Store edit context for submit handler
        state.editPackageItem = {
            id: item.id,
            booking_code: item.booking_code,
            version: item.version || 0,
        };

        // Reset first (ensures no stale data from previous create)
        const form = document.getElementById('package-form');
        if (form) form.reset();

        // Armada
        const armadaInput = document.getElementById('package-armada-index');
        if (armadaInput) armadaInput.value = String(item.armada_index || 1);

        // Helper for simple setValue (inline since no shared helper in this file)
        const setVal = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.value = value;
        };

        // Trip info
        setVal('pkg-trip-date', item.trip_date_value || item.trip_date || '');
        setVal('pkg-trip-time', item.trip_time_value || item.trip_time || '');
        setVal('pkg-from-city', item.from_city || '');
        setVal('pkg-to-city', item.to_city || '');

        // Sesi 46 PR #58b: load route_via untuk Package form edit.
        const pkgRouteViaEl = document.getElementById('pkg-route-via');
        if (pkgRouteViaEl) {
            pkgRouteViaEl.value = item.route_via || '';
            pkgRouteViaEl.dataset.userTouched = item.route_via ? '1' : '0';
        }

        // Sesi 47 Fix #2: load driver/mobil di Package form edit mode.
        const pkgDriverIdEl = document.getElementById('pkg-driver-id');
        if (pkgDriverIdEl) pkgDriverIdEl.value = item.driver_id || '';

        const pkgMobilIdEl = document.getElementById('pkg-mobil-id');
        if (pkgMobilIdEl) pkgMobilIdEl.value = item.mobil_id || '';

        // Sender (from booking.passenger_* + pickup_location)
        setVal('pkg-sender-name', item.nama_pemesanan || '');
        setVal('pkg-sender-phone', item.phone || '');
        setVal('pkg-sender-address', item.pickup_location || '');

        // Recipient (from notes JSON)
        setVal('pkg-recipient-name', packageNotes.recipient_name || '');
        setVal('pkg-recipient-phone', packageNotes.recipient_phone || '');
        setVal('pkg-recipient-address', item.dropoff_location || '');

        // Item (notes JSON; fall back to booking_for for package_size)
        setVal('pkg-item-name', packageNotes.item_name || '');
        setVal('pkg-item-qty', String(packageNotes.item_qty || item.passenger_count || 1));
        const packageSize = packageNotes.package_size || item.booking_for || 'Kecil';
        setVal('pkg-package-size', packageSize);

        // Seat code (only relevant if package_size === 'Besar')
        const seatCode = Array.isArray(item.selected_seats) && item.selected_seats.length > 0
            ? item.selected_seats[0]
            : '';
        setVal('pkg-seat-code', seatCode);

        // Show/hide seat group based on package_size
        const seatGroup = document.getElementById('pkg-seat-group');
        if (seatGroup) seatGroup.hidden = packageSize !== 'Besar';

        // Pricing
        setVal('pkg-fare-amount', String(item.price_per_seat || 0));
        // additional_fare = (total / qty) - fare_amount
        const qty = Math.max(1, parseInt(packageNotes.item_qty || item.passenger_count || 1, 10));
        const fare = parseInt(item.price_per_seat || 0, 10) || 0;
        const total = parseInt(item.total_amount || 0, 10) || 0;
        const additionalFare = Math.max(0, Math.round(total / qty) - fare);
        setVal('pkg-additional-fare', String(additionalFare));

        // Payment
        const pm = item.payment_method_value || '';
        setVal('pkg-payment-method', pm);
        setVal('pkg-payment-status', item.payment_status || 'Belum Bayar');
        setVal('pkg-bank-account-code', item.bank_account_code || '');

        // Show/hide bank group based on payment method
        const bankGroup = document.getElementById('pkg-bank-account-group');
        if (bankGroup) bankGroup.hidden = pm !== 'transfer';

        // Hide success banner (from previous create session)
        const banner = document.getElementById('package-form-success-banner');
        if (banner) banner.hidden = true;

        // Update title + description for EDIT mode
        const titleEl = document.querySelector('#package-form-modal .admin-users-dialog-head h3');
        if (titleEl) titleEl.textContent = 'Edit Pengiriman Paket';
        const descEl = document.getElementById('package-form-description');
        if (descEl) descEl.textContent = `Perbarui data pengiriman paket untuk booking ${item.booking_code || ''}.`;

        updatePackageTotal();
        fetchOccupiedSeatsForPackage();
    }

    // Bug #49: expose nested fillPackageForm to top-level openEditDialog via module ref.
    fillPackageFormImpl = fillPackageForm;

    function updatePackageTotal() {
        const fare = parseInt(document.getElementById('pkg-fare-amount')?.value || '0', 10) || 0;
        const extra = parseInt(document.getElementById('pkg-additional-fare')?.value || '0', 10) || 0;
        const qty = parseInt(document.getElementById('pkg-item-qty')?.value || '1', 10) || 1;
        const total = (fare + extra) * qty;
        const display = document.getElementById('pkg-total-display');
        if (display) {
            display.value = total > 0 ? 'Rp ' + total.toLocaleString('id-ID') : '';
        }
    }

    document.getElementById('pkg-fare-amount')?.addEventListener('input', updatePackageTotal);
    document.getElementById('pkg-additional-fare')?.addEventListener('input', updatePackageTotal);
    document.getElementById('pkg-item-qty')?.addEventListener('input', updatePackageTotal);

    document.getElementById('pkg-payment-method')?.addEventListener('change', (e) => {
        const bankGroup = document.getElementById('pkg-bank-account-group');
        if (bankGroup) bankGroup.hidden = e.target.value !== 'transfer';
    });

    document.getElementById('pkg-package-size')?.addEventListener('change', (e) => {
        const seatGroup = document.getElementById('pkg-seat-group');
        if (seatGroup) seatGroup.hidden = e.target.value !== 'Besar';
        const seatSelect = document.getElementById('pkg-seat-code');
        if (seatSelect && e.target.value !== 'Besar') seatSelect.value = '';
    });

    document.getElementById('pkg-trip-date')?.addEventListener('change', () => { fetchOccupiedSeatsForPackage(); });
    document.getElementById('pkg-trip-time')?.addEventListener('change', () => { fetchOccupiedSeatsForPackage(); });
    document.getElementById('pkg-from-city')?.addEventListener('change', () => { fetchOccupiedSeatsForPackage(); });
    document.getElementById('pkg-to-city')?.addEventListener('change',   () => { fetchOccupiedSeatsForPackage(); });

    document.getElementById('package-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('package-submit-btn');
        setButtonBusy(submitBtn, true, 'Menyimpan...');

        try {
            const fare = parseInt(document.getElementById('pkg-fare-amount')?.value || '0', 10) || 0;
            const extra = parseInt(document.getElementById('pkg-additional-fare')?.value || '0', 10) || 0;
            const qty = parseInt(document.getElementById('pkg-item-qty')?.value || '1', 10) || 1;
            const paymentMethod = document.getElementById('pkg-payment-method')?.value || '';
            const payload = {
                armada_index: parseInt(document.getElementById('package-armada-index')?.value || '1', 10),
                trip_date: document.getElementById('pkg-trip-date')?.value || '',
                trip_time: document.getElementById('pkg-trip-time')?.value || '',
                from_city: document.getElementById('pkg-from-city')?.value || '',
                to_city: document.getElementById('pkg-to-city')?.value || '',
                // Sesi 46 PR #58b: cluster picker (D-PR58b-2 symmetric)
                route_via: document.getElementById('pkg-route-via')?.value || '',
                // Sesi 47 Fix #2: driver_id + mobil_id Package form.
                driver_id: document.getElementById('pkg-driver-id')?.value || null,
                mobil_id: document.getElementById('pkg-mobil-id')?.value || null,
                sender_name: document.getElementById('pkg-sender-name')?.value.trim() || '',
                sender_phone: document.getElementById('pkg-sender-phone')?.value.trim() || '',
                sender_address: document.getElementById('pkg-sender-address')?.value.trim() || '',
                recipient_name: document.getElementById('pkg-recipient-name')?.value.trim() || '',
                recipient_phone: document.getElementById('pkg-recipient-phone')?.value.trim() || '',
                recipient_address: document.getElementById('pkg-recipient-address')?.value.trim() || '',
                item_name: document.getElementById('pkg-item-name')?.value.trim() || '',
                item_qty: qty,
                package_size: document.getElementById('pkg-package-size')?.value || '',
                seat_code: document.getElementById('pkg-package-size')?.value === 'Besar'
                    ? (document.getElementById('pkg-seat-code')?.value || '')
                    : '',
                fare_amount: fare,
                additional_fare: extra,
                payment_method: paymentMethod || null,
                payment_status: document.getElementById('pkg-payment-status')?.value || 'Belum Bayar',
                bank_account_code: paymentMethod === 'transfer'
                    ? (document.getElementById('pkg-bank-account-code')?.value || '')
                    : '',
            };

            // Bug #49: branch by edit mode (state.editPackageItem set when entering edit flow)
            const isEdit = !!state.editPackageItem;
            let res;
            if (isEdit) {
                // EDIT: include version for Phase 2 optimistic locking; send PUT to quick-package/{id}
                payload.version = state.editPackageItem.version;
                res = await apiRequest(
                    `/bookings/quick-package/${state.editPackageItem.id}`,
                    { method: 'PUT', body: payload }
                );
            } else {
                res = await apiRequest('/bookings/quick-package', { method: 'POST', body: payload });
            }

            // Show success banner with download link
            const banner = document.getElementById('package-form-success-banner');
            const codeEl = document.getElementById('package-form-booking-code');
            const link = document.getElementById('package-form-download-link');
            if (banner) banner.hidden = false;
            if (codeEl) codeEl.textContent = (isEdit ? 'Paket diperbarui: ' : 'Kode Booking: ')
                + res.booking_code
                + (res.invoice_number && res.invoice_number !== '-' ? ' | No. Surat: ' + res.invoice_number : '');
            if (link) link.href = res.invoice_download_url;

            toastSuccess((isEdit ? 'Paket diperbarui: ' : 'Paket berhasil disimpan: ') + res.booking_code);
            await fetchAndRender();

            // Clear edit state for next interaction
            state.editPackageItem = null;
        } catch (error) {
            // Bug #30 Phase 2 pattern: intercept 409 version conflict before generic toast
            if (handleVersionConflict(error)) return;
            toastError(
                error.message || 'Silakan periksa kembali data yang diinput',
                state.editPackageItem ? 'Gagal memperbarui paket' : 'Gagal menyimpan paket'
            );
        } finally {
            setButtonBusy(submitBtn, false, 'Menyimpan...');
        }
    });

    // Choice modal buttons
    document.getElementById('choice-passenger-btn')?.addEventListener('click', () => {
        closeModal('booking-type-choice-modal');
        // Sesi 46 PR #58b: pass cluster context ke resetForm (D3-B auto-prefill).
        resetForm(
            state._pendingChoiceArmada || 1,
            state._pendingChoiceTime || '',
            state._pendingChoiceCluster || null,
        );
        openModal('booking-form-modal');
        // Re-run after the browser has rendered the modal — handles cases where mobile
        // browsers restore previously selected values after form.reset()
        requestAnimationFrame(() => updatePricing());
    });

    document.getElementById('choice-package-btn')?.addEventListener('click', () => {
        closeModal('booking-type-choice-modal');
        // Sesi 46 PR #58b: pass cluster context ke resetPackageForm (D-PR58b-2).
        resetPackageForm(
            state._pendingChoiceArmada || 1,
            state._pendingChoiceTime || '',
            state._pendingChoiceCluster || null,
        );
        openModal('package-form-modal');
    });

    // ─── End package booking form logic ───────────────────────────────────────

    // Add booking button (top-level, defaults to armada 1)
    addButton?.addEventListener('click', () => {
        state._pendingChoiceArmada = 1;
        state._pendingChoiceTime = '';
        // Sesi 46 PR #58b: top-level Add tidak ada cluster context.
        // User harus pilih manual di form dropdown route_via.
        state._pendingChoiceCluster = null;
        openModal('booking-type-choice-modal');
    });

    // Booking form: seat grid clicks
    seatGrid?.addEventListener('click', (event) => {
        const button = event.target.closest('[data-seat-code]');

        if (!button || button.disabled) return;

        syncPassengerDraftMapFromDom();

        const seatCode = button.dataset.seatCode;

        if (state.selectedSeats.includes(seatCode)) {
            state.selectedSeats = state.selectedSeats.filter((code) => code !== seatCode);
        } else if (state.selectedSeats.length < passengerCount()) {
            state.selectedSeats = sortSeatCodes([...state.selectedSeats, seatCode]);
        }

        renderSeatButtons();
        renderPassengerForms();
    });

    // Passenger count change
    document.getElementById('booking-passenger-count')?.addEventListener('change', () => {
        syncPassengerDraftMapFromDom();
        renderSeatButtons();
        renderPassengerForms();
        updatePricing();
    });

    // Additional fare change → recalculate total
    document.getElementById('booking-additional-fare')?.addEventListener('input', updatePricing);

    // Re-fetch occupied seats when date or time changes
    document.getElementById('booking-trip-date')?.addEventListener('change', () => {
        fetchOccupiedSeats().then(() => { renderSeatButtons(); renderPassengerForms(); });
    });
    document.getElementById('booking-trip-time')?.addEventListener('change', () => {
        fetchOccupiedSeats().then(() => { renderSeatButtons(); renderPassengerForms(); });
    });

    // Pricing + re-fetch occupied seats when route changes.
    // Listen to both 'change' and 'input' because some mobile browsers (Android Chrome)
    // fire 'input' instead of 'change' when autofill fills a <select>.
    let _cityChangePending = false;
    function handleCityChange() {
        // Sesi 44D PR #1D: reset route_via user-touched flag saat from/to berubah
        // supaya auto-resolve cluster_map aktif lagi untuk rute baru.
        const routeViaEl = document.getElementById('booking-route-via');
        if (routeViaEl) routeViaEl.dataset.userTouched = '0';
        updateRouteViaDropdown();
        updatePricing();
        if (_cityChangePending) return;
        _cityChangePending = true;
        setTimeout(() => {
            _cityChangePending = false;
            fetchOccupiedSeats().then(() => { renderSeatButtons(); renderPassengerForms(); });
        }, 50);
    }
    ['change', 'input'].forEach((evt) => {
        document.getElementById('booking-from-city')?.addEventListener(evt, handleCityChange);
        document.getElementById('booking-to-city')?.addEventListener(evt, handleCityChange);
    });

    // Sesi 47 Fix #2: sync hidden driver_name saat user pilih dropdown driver.
    // Backend BookingUpsertRequest legacy validate driver_name, jadi hidden field
    // harus konsisten dengan driver_id dropdown selection.
    document.getElementById('booking-driver-id')?.addEventListener('change', (event) => {
        const driverId = event.target.value;
        const driverNameHidden = document.getElementById('booking-driver-name');
        if (!driverNameHidden) return;

        if (!driverId) {
            driverNameHidden.value = '';
            return;
        }

        const driverObj = state.drivers.find((d) => String(d.id) === String(driverId));
        driverNameHidden.value = driverObj ? driverObj.nama : '';
    });

    // Sesi 44D PR #1D: track user manual change pada dropdown route_via supaya
    // auto-resolve tidak overwrite pilihan user (untuk rute ambigu).
    // Sesi 47 Fix #1: re-filter city dropdown saat user manual override
    // dropdown route_via di form. Reactive — kalau user pindah cluster di
    // tengah pengisian form, city options auto-update strict.
    document.getElementById('booking-route-via')?.addEventListener('change', (event) => {
        event.target.dataset.userTouched = '1';
        const newCluster = event.target.value || null;
        filterCityOptionsByCluster(newCluster);
    });

    // Sesi 47 Fix #1: re-filter city dropdown Package form saat user manual
    // override pkg-route-via di form (parity dengan Regular form).
    document.getElementById('pkg-route-via')?.addEventListener('change', (event) => {
        const newCluster = event.target.value || null;
        filterCityOptionsByCluster(newCluster);
    });

    // Payment method
    paymentMethodSelect?.addEventListener('change', updatePaymentFieldVisibility);

    // Passenger editor input
    passengerEditor?.addEventListener('input', (event) => {
        const row = event.target.closest('[data-passenger-seat]');

        if (!row) return;

        const seatCode = row.dataset.passengerSeat;

        state.passengerDraftMap[seatCode] = {
            seat_no: seatCode,
            name: row.querySelector('[data-passenger-name]')?.value.trim() || '',
            phone: row.querySelector('[data-passenger-phone]')?.value.trim() || '',
        };
    });

    // Booking form submit
    form?.addEventListener('submit', async (event) => {
        event.preventDefault();

        const submitButton = document.getElementById('booking-submit-btn');

        // Sesi 44D PR #1D: warning kalau mark Dibayar/Dibayar Tunai dengan
        // tarif total Rp 0 (tarif rute null + tidak ada ongkos tambahan).
        // Build payload sebelum setButtonBusy supaya dialog cancel tidak
        // meninggalkan tombol stuck di state busy.
        const payload = buildPayload();
        const fareResult = resolveFare(payload.from_city, payload.to_city);
        const fareValue = fareResult.fare !== null ? fareResult.fare : 0;
        const additionalFareNum = parseInt(payload.additional_fare_per_passenger || 0, 10) || 0;
        const totalPerSeat = fareValue + additionalFareNum;
        const isPaidStatus = ['Dibayar', 'Dibayar Tunai'].includes(payload.payment_status);

        if (isPaidStatus && totalPerSeat === 0) {
            const confirmed = window.confirm(
                'Status pembayaran "' + payload.payment_status + '" akan disimpan dengan tarif Rp 0. Lanjutkan?\n\n'
                + 'OK untuk lanjut, Cancel untuk kembali edit.'
            );
            if (!confirmed) return;
        }

        setButtonBusy(submitButton, true, 'Menyimpan...');

        try {
            if (state.editItem) {
                // Bug #30: include version for optimistic lock (design §9.2).
                const editPayload = { ...payload, version: state.editItem.version };
                await apiRequest(`/bookings/${state.editItem.id}`, { method: 'PUT', body: editPayload });
                toastSuccess('Data pemesanan berhasil diperbarui');
            } else {
                await apiRequest('/bookings', { method: 'POST', body: payload });
                toastSuccess('Data pemesanan berhasil ditambahkan');
            }

            closeModal('booking-form-modal');
            resetForm();
            await fetchAndRender();
        } catch (error) {
            // Bug #30: intercept 409 version conflict before generic toast.
            if (handleVersionConflict(error)) return;
            toastError(error.message || 'Silakan periksa kembali data yang diinput', 'Gagal menyimpan data pemesanan');
        } finally {
            setButtonBusy(submitButton, false, 'Menyimpan...');
        }
    });

    // Delete confirm
    deleteButton?.addEventListener('click', async () => {
        if (!state.deleteItem) return;

        setButtonBusy(deleteButton, true, 'Menghapus...');

        try {
            // Bug #30: version in query string per design §7.3 Q2 decision.
            await apiRequest(`/bookings/${state.deleteItem.id}?version=${state.deleteItem.version}`, { method: 'DELETE' });
            toastSuccess('Data pemesanan berhasil dihapus');
            closeModal('booking-delete-modal');
            state.deleteItem = null;
            await fetchAndRender();
        } catch (error) {
            // Bug #30: intercept 409 version conflict before generic toast.
            if (handleVersionConflict(error)) return;
            toastError(error.message || 'Gagal menghapus data pemesanan');
        } finally {
            setButtonBusy(deleteButton, false, 'Menghapus...');
        }
    });

    resetForm();

    return fetchAndRender().catch((error) => {
        if (error.status === 403) {
            renderAccessDenied();
            return;
        }

        toastError(error.message || 'Gagal memuat data penumpang');
    });
}
