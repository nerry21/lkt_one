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

    set('version',         data.version);
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
    // Bug #38: append ?version=N so destroy() reads it from query string.
    form.action = `${BASE_URL}/${data.id}?version=${encodeURIComponent(data.version ?? 0)}`;
    codeEl.textContent = data.booking_code;
}

// ── SWAP CONFIRM MODAL (Sesi 50 PR #4) ───────────────────────────────────────

let pendingFormForSwap = null;

function populateSwapModal(data) {
    const info = document.getElementById('swap-conflict-info');
    const select = document.getElementById('swap-replacement-mobil');
    if (!info || !select) return;

    const mobilKode = data.mobil_kode || '—';
    const peerCount = data.peer_count ?? 0;
    const tripDate  = data.trip_date  || '—';
    const tripTime  = data.trip_time  || '—';

    info.innerHTML = `
        <div>
            Anda memilih mobil <strong>${mobilKode}</strong> tanggal <strong>${tripDate}</strong>
            jam <strong>${tripTime}</strong> untuk Dropping ini.
        </div>
        <div style="margin-top:8px">
            Saat ini mobil <strong>${mobilKode}</strong> sudah ada <strong>${peerCount} penumpang reguler aktif</strong>
            di trip planning slot tersebut.
        </div>
        <div style="margin-top:8px">Sistem akan otomatis:</div>
        <ul>
            <li>Trip <strong>${mobilKode}</strong> → Keluar Trip Dropping (link ke Booking ini)</li>
            <li>Penumpang reguler ikut <em>mobil pengganti</em> yang Anda pilih (jika ada)</li>
            <li>E-Tiket peer bookings auto-update dengan mobil baru</li>
        </ul>
    `;

    select.innerHTML = '<option value="">— Tidak ada (peer ikut Trip yang Keluar Trip) —</option>';
    (data.available_replacement_mobils || []).forEach((m) => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = `${m.kode_mobil} — ${m.jenis_mobil}`;
        select.appendChild(opt);
    });
}

function submitFormWithSwapConfirm(form, replacementMobilId) {
    const ensureHidden = (name, value) => {
        let input = form.querySelector(`input[name="${name}"]`);
        if (!input) {
            input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            form.appendChild(input);
        }
        input.value = value;
    };

    ensureHidden('confirm_swap', '1');
    ensureHidden('replacement_mobil_id', replacementMobilId || '');

    form.submit();
}

async function handleDroppingFormSubmit(e) {
    const form = e.target;
    if (!form.matches('form.ddrop-modal-form')) return;

    const dialog = form.closest('dialog.ddrop-modal');
    if (!dialog || !['modal-create', 'modal-edit'].includes(dialog.id)) return;

    e.preventDefault();
    pendingFormForSwap = form;

    const fd = new FormData(form);
    fd.delete('confirm_swap');
    fd.delete('replacement_mobil_id');

    let res;
    try {
        res = await fetch(form.action, {
            method: form.method?.toUpperCase() || 'POST',
            body: fd,
            headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        });
    } catch (err) {
        form.submit();
        return;
    }

    if (res.status === 409) {
        let data = null;
        try { data = await res.json(); } catch { data = null; }

        if (data && data.conflict_type === 'mobil_double_assign') {
            populateSwapModal(data);
            openDialog('modal-swap-confirm');
            return;
        }
    }

    form.submit();
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

    // Sesi 50 PR #4: intercept Create/Edit form submit untuk handle konflik mobil.
    document.querySelectorAll('#modal-create form, #modal-edit form').forEach((form) => {
        form.addEventListener('submit', handleDroppingFormSubmit);
    });

    // Swap confirm button: re-submit form dengan flag confirm_swap.
    document.getElementById('swap-confirm-btn')?.addEventListener('click', () => {
        const select = document.getElementById('swap-replacement-mobil');
        const replacementId = select?.value || '';
        const form = pendingFormForSwap;
        closeDialog('modal-swap-confirm');
        if (form) {
            submitFormWithSwapConfirm(form, replacementId);
            pendingFormForSwap = null;
        }
    });
}
