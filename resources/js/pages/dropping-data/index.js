/**
 * Data Pemesanan Dropping — Index Page
 *
 * Handles modal management for Create / Edit / Show / Delete operations.
 */

function formatRupiah(amount) {
    return 'Rp ' + Math.floor(amount).toLocaleString('id-ID');
}

function openDialog(id) {
    const el = document.getElementById(id);
    if (el) el.showModal?.() || el.setAttribute('open', '');
}

function closeDialog(id) {
    const el = document.getElementById(id);
    if (el) el.close?.() || el.removeAttribute('open');
}

function getRowData(btn) {
    const tr = btn.closest('tr[data-row]');
    if (!tr) return null;
    try { return JSON.parse(tr.dataset.row); } catch { return null; }
}

// ── SHOW MODAL ──────────────────────────────────────────────────────────────

function populateShowModal(data) {
    const grid = document.getElementById('show-detail-grid');
    if (!grid) return;

    const paymentMethodMap = { transfer: 'Transfer Bank', qris: 'QRIS', cash: 'Tunai', '': '—' };

    grid.innerHTML = `
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Kode Booking</span>
            <span class="ddrop-detail-value" style="font-family:monospace;color:#047857">${data.booking_code}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Status Pembayaran</span>
            <span class="ddrop-detail-value">${data.payment_status || '—'}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Nama Pemesan</span>
            <span class="ddrop-detail-value">${data.passenger_name}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">No HP</span>
            <span class="ddrop-detail-value">${data.passenger_phone}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Asal Penjemputan</span>
            <span class="ddrop-detail-value">${data.from_city}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Tujuan</span>
            <span class="ddrop-detail-value">${data.to_city}</span>
        </div>
        <div class="ddrop-detail-item col-span-2">
            <span class="ddrop-detail-label">Alamat Penjemputan</span>
            <span class="ddrop-detail-value">${data.pickup_location}</span>
        </div>
        <div class="ddrop-detail-item col-span-2">
            <span class="ddrop-detail-label">Alamat Pengantaran</span>
            <span class="ddrop-detail-value">${data.dropoff_location}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Tanggal Keberangkatan</span>
            <span class="ddrop-detail-value">${data.trip_date_fmt || data.trip_date}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Jam Keberangkatan</span>
            <span class="ddrop-detail-value">${data.trip_time} WIB</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Tarif Dropping</span>
            <span class="ddrop-detail-value" style="color:#047857;font-size:1.05rem">${formatRupiah(data.price_per_seat)}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Tambahan Ongkos</span>
            <span class="ddrop-detail-value">${data.additional_fare > 0 ? formatRupiah(data.additional_fare) : '—'}</span>
        </div>
        <div class="ddrop-detail-item col-span-2">
            <span class="ddrop-detail-label">Total Tarif</span>
            <span class="ddrop-detail-value" style="color:#047857;font-weight:700;font-size:1.05rem">${formatRupiah(data.total_amount)}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Metode Pembayaran</span>
            <span class="ddrop-detail-value">${(paymentMethodMap[data.payment_method] ?? data.payment_method) || '—'}</span>
        </div>
        <div class="ddrop-detail-item col-span-2">
            <span class="ddrop-detail-label">Keterangan</span>
            <span class="ddrop-detail-value">${data.notes || '—'}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Driver</span>
            <span class="ddrop-detail-value">${data.driver_name || '—'}</span>
        </div>
        <div class="ddrop-detail-item">
            <span class="ddrop-detail-label">Mobil</span>
            <span class="ddrop-detail-value">${data.kode_mobil ? data.kode_mobil + (data.jenis_mobil ? ' — ' + data.jenis_mobil : '') : '—'}</span>
        </div>
    `;
}

// ── EDIT MODAL ───────────────────────────────────────────────────────────────

function populateEditModal(data) {
    const form = document.getElementById('form-edit');
    if (!form) return;

    const BASE_URL = window.__DROPPING_DATA_UPDATE_BASE__ || '/dashboard/dropping-data';
    form.action = `${BASE_URL}/${data.id}`;

    const set = (name, value) => {
        const el = form.querySelector(`[name="${name}"]`);
        if (!el) return;
        el.value = value ?? '';
    };

    set('passenger_name',  data.passenger_name);
    set('passenger_phone', data.passenger_phone);
    set('from_city',       data.from_city);
    set('to_city',         data.to_city);
    set('pickup_location', data.pickup_location);
    set('dropoff_location',data.dropoff_location);
    set('price_per_seat',  data.price_per_seat);
    set('additional_fare', data.additional_fare);
    set('trip_date',       data.trip_date);
    set('trip_time',       data.trip_time);
    set('notes',           data.notes);
    set('payment_method',  data.payment_method);
    set('payment_status',  data.payment_status);
    set('driver_id',       data.driver_id);
    set('mobil_id',        data.mobil_id);
}

// ── DELETE MODAL ─────────────────────────────────────────────────────────────

function populateDeleteModal(data) {
    const form = document.getElementById('form-delete');
    const codeEl = document.getElementById('delete-booking-code');

    if (!form || !codeEl) return;

    const BASE_URL = window.__DROPPING_DATA_UPDATE_BASE__ || '/dashboard/dropping-data';
    form.action = `${BASE_URL}/${data.id}`;
    codeEl.textContent = data.booking_code;
}

// ── INIT ─────────────────────────────────────────────────────────────────────

export default function initDroppingDataPage() {
    // Set base URL for form actions
    window.__DROPPING_DATA_UPDATE_BASE__ = '/dashboard/dropping-data';

    // Open Create modal
    document.getElementById('btn-open-create')?.addEventListener('click', () => {
        openDialog('modal-create');
    });
    document.getElementById('btn-open-create-empty')?.addEventListener('click', () => {
        openDialog('modal-create');
    });

    // Table row action buttons
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;

        const action = btn.dataset.action;
        const data = getRowData(btn);
        if (!data) return;

        if (action === 'show') {
            populateShowModal(data);
            openDialog('modal-show');
        } else if (action === 'edit') {
            populateEditModal(data);
            openDialog('modal-edit');
        } else if (action === 'delete') {
            populateDeleteModal(data);
            openDialog('modal-delete');
        }
    });

    // Close modals — [data-close-modal] buttons
    document.querySelectorAll('[data-close-modal]').forEach((btn) => {
        btn.addEventListener('click', () => closeDialog(btn.dataset.closeModal));
    });

    // Close on backdrop click
    document.querySelectorAll('.ddrop-modal').forEach((dialog) => {
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                dialog.close?.() || dialog.removeAttribute('open');
            }
        });
    });
}
