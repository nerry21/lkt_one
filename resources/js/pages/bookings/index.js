import { apiRequest } from '../../services/http';
import { escapeHtml, formatCurrency, setButtonBusy, todayString } from '../../services/helpers';
import { closeModal, openModal } from '../../ui/modal';
import { toastError, toastSuccess } from '../../ui/toast';

// ─── Schedules ────────────────────────────────────────────────────────────────

const SCHEDULES = [
    { value: '05:00', label: 'Subuh', time: '05.00 WIB' },
    { value: '08:00', label: 'Pagi', time: '08.00 WIB' },
    { value: '10:00', label: 'Pagi', time: '10.00 WIB' },
    { value: '14:00', label: 'Siang', time: '14.00 WIB' },
    { value: '16:00', label: 'Sore', time: '16.00 WIB' },
    { value: '19:00', label: 'Malam', time: '19.00 WIB' },
];

// Seat rows for the car diagram (top-down view, front-to-back)
const SEAT_ROWS = [
    [{ code: '1A', label: '1A' }, { code: 'SOPIR', label: 'SOPIR', isDriver: true }],
    [{ code: '2A', label: '2A' }, { code: '3A', label: '3A' }],
    [{ code: '4A', label: '4A' }, { code: '5A', label: '5A' }],
];

const TOTAL_PASSENGER_SEATS = SEAT_ROWS.flat().filter((s) => !s.isDriver).length;

// ─── State ────────────────────────────────────────────────────────────────────

const state = {
    currentUser: null,
    date: todayString(),
    direction: 'to_pkb',
    bookings: [],
    loading: false,
    drivers: [],
    mobils: [],
    formOptions: null,
    selectedSeats: [],
    passengerDraftMap: {},
    editItem: null,
    deleteItem: null,
    slotDriverMap: {},
    slotMobilMap: {},
    occupiedSeatsForForm: [],
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

            return `
                <div class="bpg-seat-item ${stateClass}" title="${isOccupied ? passengerName : 'Tersedia'}">
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
                    <div class="bpg-passenger-actions">
                        <span class="${escapeHtml(booking.payment_status_badge_class || 'stock-value-badge stock-value-badge-blue')} bpg-status-sm">${escapeHtml(booking.payment_status || '-')}</span>
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
                </div>
                <div class="bpg-passenger-depart-row">
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

// ─── Slot Card ────────────────────────────────────────────────────────────────

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

function renderSlotCard(schedule, bookingsInSlot) {
    const seatBookingMap = buildSeatBookingMap(bookingsInSlot);
    const totalPassengers = bookingsInSlot.reduce((sum, b) => sum + (Number(b.passenger_count) || 0), 0);
    const slotKey = `${schedule.value}__${state.direction}`;
    // Pre-fill driver from first booking that has one
    if (!state.slotDriverMap[slotKey]) {
        const withDriver = bookingsInSlot.find((b) => b.driver_id);

        if (withDriver) {
            state.slotDriverMap[slotKey] = withDriver.driver_id;
        }
    }

    const selectedDriverId = state.slotDriverMap[slotKey] || '';
    const selectedMobilId = state.slotMobilMap[slotKey] || '';
    const badgeClass = 'stock-value-badge-yellow';

    const driverOptions = state.drivers.map((d) => {
        const label = d.lokasi ? `${d.nama} (${d.lokasi})` : d.nama;

        return `<option value="${escapeHtml(d.id)}" ${selectedDriverId === d.id ? 'selected' : ''}>${escapeHtml(label)}</option>`;
    }).join('');

    const mobilOptions = state.mobils.map((m) => {
        const label = `${m.kode_mobil} — ${m.jenis_mobil}`;

        return `<option value="${escapeHtml(m.id)}" ${selectedMobilId === m.id ? 'selected' : ''}>${escapeHtml(label)}</option>`;
    }).join('');

    // Collect unique service types from bookings in this slot
    const serviceTypes = [...new Set(
        bookingsInSlot.map((b) => (b.service_type || '').trim()).filter(Boolean),
    )];

    return `
        <article class="bpg-slot-card" data-slot="${escapeHtml(schedule.value)}" data-direction="${escapeHtml(state.direction)}">
            <div class="bpg-slot-head">
                <div class="bpg-slot-time-badge">
                    <span class="bpg-slot-period">${escapeHtml(schedule.label)}</span>
                    <strong class="bpg-slot-time">${escapeHtml(schedule.time)}</strong>
                </div>
                <div class="bpg-slot-service-types">
                    ${serviceTypes.length > 0
                        ? serviceTypes.map((t) => `<span class="bpg-service-badge">${escapeHtml(t)}</span>`).join('')
                        : '<span class="bpg-service-badge bpg-service-badge--empty">Belum ada layanan</span>'}
                </div>
                <div class="bpg-slot-counters">
                    <span class="stock-value-badge ${badgeClass}">${totalPassengers} / ${TOTAL_PASSENGER_SEATS} Kursi</span>
                </div>
            </div>

            ${renderCarDiagram(seatBookingMap)}

            <div class="bpg-slot-assignment">
                <div class="bpg-slot-select-group">
                    <label>
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4 20C4 17.2386 7.58172 15 12 15C16.4183 15 20 17.2386 20 20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                        Pilih Driver
                    </label>
                    <select class="bpg-slot-select" data-slot-driver="${escapeHtml(schedule.value)}">
                        <option value="">— Belum ditentukan —</option>
                        ${driverOptions}
                    </select>
                </div>
                <div class="bpg-slot-select-group">
                    <label>
                        <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;"><rect x="2" y="7" width="20" height="10" rx="3" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/><circle cx="18" cy="17" r="2" stroke="currentColor" stroke-width="1.8"/></svg>
                        Pilih Mobil
                    </label>
                    <select class="bpg-slot-select" data-slot-mobil="${escapeHtml(schedule.value)}">
                        <option value="">— Belum ditentukan —</option>
                        ${mobilOptions}
                    </select>
                </div>
            </div>

            ${renderPassengerList(bookingsInSlot)}
        </article>`;
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
    const shell = document.getElementById('bpg-slots-shell');

    if (!shell) {
        return;
    }

    // Group bookings by trip_time prefix
    const bookingsByTime = {};

    SCHEDULES.forEach((s) => { bookingsByTime[s.value] = []; });

    state.bookings.forEach((booking) => {
        const rawTime = (booking.trip_time || '').trim();
        const timeKey = rawTime.substring(0, 5);

        if (bookingsByTime[timeKey]) {
            bookingsByTime[timeKey].push(booking);
        }
    });

    const cards = SCHEDULES.map((schedule) => renderSlotCard(schedule, bookingsByTime[schedule.value] || []));

    shell.innerHTML = `<div class="bpg-slots-grid">${cards.join('')}</div>`;
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

        const bookings = await apiRequest(`/bookings?${params}`);

        state.bookings = Array.isArray(bookings) ? bookings : [];
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

function openDetailModal(booking) {
    document.getElementById('bpg-detail-title').textContent = booking.nama_pemesanan || '-';
    document.getElementById('bpg-detail-subtitle').textContent = `${booking.booking_code || '-'} · ${booking.booking_status || '-'}`;
    document.getElementById('bpg-detail-full-link').href = `/dashboard/bookings/${booking.id}`;

    const body = document.getElementById('bpg-detail-body');

    body.innerHTML = `
        <div class="bpg-detail-grid">
            <div class="bpg-detail-item">
                <span>Nama Pemesanan</span>
                <strong>${escapeHtml(booking.nama_pemesanan || '-')}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>No HP</span>
                <strong>${escapeHtml(booking.phone || '-')}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Kota Asal</span>
                <strong>${escapeHtml(booking.from_city || '-')}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Kota Tujuan</span>
                <strong>${escapeHtml(booking.to_city || '-')}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Tanggal Keberangkatan</span>
                <strong>${escapeHtml(booking.trip_date_label || '-')}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Waktu Keberangkatan</span>
                <strong>${escapeHtml(booking.trip_time || '-')}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Pilih Kursi</span>
                <strong>${escapeHtml(booking.selected_seats_label || '-')}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Jumlah Penumpang</span>
                <strong>${escapeHtml(String(booking.passenger_count || 0))} Orang</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Jenis Layanan</span>
                <strong>${escapeHtml(booking.service_type || '-')}</strong>
            </div>
            <div class="bpg-detail-item">
                <span>Biaya</span>
                <strong class="bpg-detail-price">${escapeHtml(booking.total_amount_formatted || '-')}</strong>
            </div>
            <div class="bpg-detail-item bpg-detail-item--full">
                <span>Alamat Penjemputan</span>
                <p>${escapeHtml(booking.pickup_location || '-')}</p>
            </div>
            <div class="bpg-detail-item bpg-detail-item--full">
                <span>Alamat Pengantaran</span>
                <p>${escapeHtml(booking.dropoff_location || '-')}</p>
            </div>
        </div>`;

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
    const count = passengerCount();

    return (state.formOptions?.seat_options || [])
        .filter((item) => !item.is_optional || count >= 6)
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

function resolveFare(origin, destination) {
    if (!origin || !destination || origin === destination) return null;

    const routeMatrix = state.formOptions?.route_matrix || {};
    const fare = routeMatrix?.[origin]?.[destination];

    return fare === undefined || fare === null ? null : Number(fare);
}

function updatePricing() {
    const origin = document.getElementById('booking-from-city')?.value || '';
    const destination = document.getElementById('booking-to-city')?.value || '';
    const count = passengerCount();
    const fare = resolveFare(origin, destination);
    const total = fare !== null ? fare * count : null;

    const fareInput = document.getElementById('booking-price-per-seat');
    const totalInput = document.getElementById('booking-total-amount');

    if (fareInput) fareInput.value = fare !== null ? formatCurrency(fare) : '';
    if (totalInput) totalInput.value = total !== null ? formatCurrency(total) : '';
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
    const excludeId = state.editItem?.id || '';

    if (!tripDate || !tripTime) {
        state.occupiedSeatsForForm = [];
        return;
    }

    try {
        const params = new URLSearchParams({ trip_date: tripDate, trip_time: tripTime });

        if (excludeId) params.set('exclude_id', excludeId);

        const res = await apiRequest(`/bookings/occupied-seats?${params}`);

        state.occupiedSeatsForForm = Array.isArray(res?.occupied_seats) ? res.occupied_seats : [];
    } catch {
        state.occupiedSeatsForForm = [];
    }
}

function renderSeatButtons() {
    const seatButtons = document.querySelectorAll('[data-seat-code]');
    const currentPassengerCount = passengerCount();
    const allowedCodes = allowedSeatCodes();

    // Remove occupied seats from selected if they became occupied externally
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

        // Update tooltip
        if (isOccupied) {
            button.title = 'Kursi sudah dipesan';
        } else {
            button.title = '';
        }
    });

    updateSelectedSeatsInputs();
    updateSeatSummary();
}

function resetForm() {
    const form = document.getElementById('booking-form');

    form?.reset();

    state.editItem = null;
    state.selectedSeats = [];
    state.passengerDraftMap = {};

    const todayVal = state.date || todayString();

    document.getElementById('booking-id').value = '';
    document.getElementById('booking-form-title').textContent = 'Tambah Pemesanan';
    document.getElementById('booking-form-description').textContent = 'Lengkapi data pemesanan reguler dari dashboard admin.';
    document.getElementById('booking-trip-date').value = todayVal;
    document.getElementById('booking-passenger-count').value = '1';
    document.getElementById('booking-payment-method').value = '';
    document.getElementById('booking-booking-status').value = 'Draft';
    updatePaymentFieldVisibility();
    updatePricing();
    setButtonBusy(document.getElementById('booking-submit-btn'), false, 'Menyimpan...');
    fetchOccupiedSeats().then(() => { renderSeatButtons(); renderPassengerForms(); });
}

function fillForm(item) {
    state.editItem = item;
    state.selectedSeats = sortSeatCodes(item.selected_seats || []);
    state.passengerDraftMap = Object.fromEntries((item.passengers || []).map((p) => [p.seat_no, p]));

    document.getElementById('booking-id').value = item.id;
    document.getElementById('booking-booking-for').value = item.booking_for;
    document.getElementById('booking-category').value = item.category;
    document.getElementById('booking-from-city').value = item.from_city;
    document.getElementById('booking-to-city').value = item.to_city;
    document.getElementById('booking-trip-date').value = item.trip_date_value;
    document.getElementById('booking-trip-time').value = item.trip_time_value;
    document.getElementById('booking-passenger-count').value = String(item.passenger_count);
    document.getElementById('booking-driver-name').value = item.driver_name === 'Menunggu Penetapan Driver' ? '' : (item.driver_name || '');
    document.getElementById('booking-pickup-location').value = item.pickup_location;
    document.getElementById('booking-dropoff-location').value = item.dropoff_location;
    document.getElementById('booking-payment-method').value = item.payment_method_value || '';
    updatePaymentFieldVisibility();
    document.getElementById('booking-payment-status').value = item.payment_status;
    document.getElementById('booking-booking-status').value = item.booking_status;
    document.getElementById('booking-bank-account-code').value = item.bank_account_code || '';
    document.getElementById('booking-notes').value = item.notes || '';
    document.getElementById('booking-form-title').textContent = 'Edit Pemesanan';
    document.getElementById('booking-form-description').textContent = 'Perbarui data pemesanan reguler yang dipilih.';

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
    };
}

async function openEditDialog(id) {
    fillForm(await apiRequest(`/bookings/${id}`));
    openModal('booking-form-modal');
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
    state.currentUser = user || window.transitAuthUser || null;
    state.date = todayString();

    if (!isAdminRole(state.currentUser?.role)) {
        renderAccessDenied();
        return;
    }

    // Set date picker to today
    if (datePicker) {
        datePicker.value = state.date;
        datePicker.addEventListener('change', async () => {
            state.date = datePicker.value;
            state.slotDriverMap = {};
            state.slotMobilMap = {};
            await fetchAndRender();
        });
    }

    // Route direction tabs
    routeTabs?.addEventListener('click', async (event) => {
        const tab = event.target.closest('[data-direction]');

        if (!tab) return;

        const newDirection = tab.dataset.direction;

        if (newDirection === state.direction) return;

        state.direction = newDirection;
        state.slotDriverMap = {};
        state.slotMobilMap = {};

        document.querySelectorAll('.bpg-route-tab').forEach((t) => {
            t.classList.toggle('is-active', t.dataset.direction === newDirection);
        });

        await fetchAndRender();
    });

    // Slots shell: delegate clicks and changes
    // Close all departure dropdowns
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

                // Update trigger label + color
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

                await apiRequest(`/bookings/${bookingId}/departure-status`, {
                    method: 'PATCH',
                    body: { departure_status: statusToSet },
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
                openDeleteDialog({
                    id: deleteBtn.dataset.bookingDelete,
                    nama: deleteBtn.dataset.bookingName,
                });
            }
        } catch (error) {
            toastError(error.message || 'Gagal memuat data pemesanan');
        }
    });

    // Driver / Mobil select changes per slot
    slotsShell?.addEventListener('change', async (event) => {
        const driverSelect = event.target.closest('[data-slot-driver]');
        const mobilSelect = event.target.closest('[data-slot-mobil]');

        if (driverSelect) {
            const tripTime = driverSelect.dataset.slotDriver;
            const driverId = driverSelect.value;
            const selectedOption = driverSelect.options[driverSelect.selectedIndex];
            const driverName = driverId ? (selectedOption?.text.split(' (')[0] || '') : '';
            const slotKey = `${tripTime}__${state.direction}`;

            state.slotDriverMap[slotKey] = driverId;

            try {
                await apiRequest('/bookings/slot-assign', {
                    method: 'PATCH',
                    body: {
                        trip_date: state.date,
                        trip_time: tripTime,
                        direction: state.direction,
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
            const tripTime = mobilSelect.dataset.slotMobil;
            const mobilId = mobilSelect.value;
            const slotKey = `${tripTime}__${state.direction}`;

            state.slotMobilMap[slotKey] = mobilId;
        }
    });

    // Add booking button
    addButton?.addEventListener('click', () => {
        resetForm();
        openModal('booking-form-modal');
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

    // Re-fetch occupied seats when date or time changes
    document.getElementById('booking-trip-date')?.addEventListener('change', () => {
        fetchOccupiedSeats().then(() => { renderSeatButtons(); renderPassengerForms(); });
    });
    document.getElementById('booking-trip-time')?.addEventListener('change', () => {
        fetchOccupiedSeats().then(() => { renderSeatButtons(); renderPassengerForms(); });
    });

    // Pricing
    document.getElementById('booking-from-city')?.addEventListener('change', updatePricing);
    document.getElementById('booking-to-city')?.addEventListener('change', updatePricing);

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

        setButtonBusy(submitButton, true, 'Menyimpan...');

        try {
            const payload = buildPayload();

            if (state.editItem) {
                await apiRequest(`/bookings/${state.editItem.id}`, { method: 'PUT', body: payload });
                toastSuccess('Data pemesanan berhasil diperbarui');
            } else {
                await apiRequest('/bookings', { method: 'POST', body: payload });
                toastSuccess('Data pemesanan berhasil ditambahkan');
            }

            closeModal('booking-form-modal');
            resetForm();
            await fetchAndRender();
        } catch (error) {
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
            await apiRequest(`/bookings/${state.deleteItem.id}`, { method: 'DELETE' });
            toastSuccess('Data pemesanan berhasil dihapus');
            closeModal('booking-delete-modal');
            state.deleteItem = null;
            await fetchAndRender();
        } catch (error) {
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
