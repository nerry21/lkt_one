import { apiRequest } from '../../services/http';
import { toastError, toastSuccess } from '../../ui/toast';
import { escapeHtml } from '../../services/helpers';

// ─── State ────────────────────────────────────────────────────────────────────

let scanner     = null;
let isScanning  = false;
let lastToken   = '';
let cooldownMs  = 3000;
let lastScanAt  = 0;
const history   = [];

// ─── DOM refs ─────────────────────────────────────────────────────────────────

const $ = (id) => document.getElementById(id);

// ─── Process scan result ──────────────────────────────────────────────────────

async function processScan(qrToken) {
    const token = qrToken.trim();
    if (! token) return;

    // cooldown – cegah scan duplikat dalam satu frame kamera (3 detik)
    const now = Date.now();
    if (token === lastToken && now - lastScanAt < cooldownMs) return;

    lastToken  = token;
    lastScanAt = now;
    setStatusText('Memproses scan…');

    try {
        const data = await apiRequest('/scan-qr', {
            method: 'POST',
            body: { qr_token: token },
        });

        showResult(data);
        addHistory(data);

        if (data.already_scanned) {
            toastError(data.message, 'Tiket Sudah Pernah Di-Scan');
        } else if (data.is_newly_eligible) {
            toastSuccess(data.message, '🎉 Eligible Diskon!');
        } else {
            toastSuccess(data.message, 'Scan Berhasil');
        }
    } catch (err) {
        showError(err.message || 'Scan gagal');
        toastError(err.message || 'Scan gagal', 'Scan Gagal');
    } finally {
        setStatusText(isScanning ? 'Kamera aktif — arahkan ke QR code.' : '');
    }
}

// ─── Show result ──────────────────────────────────────────────────────────────

function showResult(data) {
    $('qrscan-result-idle').hidden = true;
    $('qrscan-result-card').hidden = false;

    const booking   = data.booking  || {};
    const passenger = data.passenger || {};
    const count     = data.loyalty_count;
    const target    = data.loyalty_target;
    const eligible  = data.discount_eligible;
    const pct       = Math.min(Math.round((count / target) * 100), 100);

    // Header
    const headerState = data.already_scanned ? 'warn' : (data.success ? 'success' : 'error');
    $('qrscan-result-header').className = 'qrscan-result-header qrscan-result-header--' + headerState;
    $('qrscan-result-icon').innerHTML   = data.already_scanned ? iconWarn() : (data.success ? iconCheck() : iconX());
    $('qrscan-result-title').textContent    = booking.booking_code || '-';
    $('qrscan-result-subtitle').textContent = data.message;

    // Fields — gunakan data penumpang individual untuk nama & kursi
    $('qr-res-name').textContent     = passenger.name          || booking.nama_pemesanan || '-';
    $('qr-res-code').textContent     = booking.booking_code    || '-';
    $('qr-res-route').textContent    = booking.route_label     || '-';
    $('qr-res-datetime').textContent = (booking.trip_date || '-') + ' ' + (booking.trip_time || '');
    $('qr-res-seats').textContent    = passenger.seat_no       || booking.selected_seats  || '-';
    $('qr-res-pax').textContent      = (booking.passenger_count || 0) + ' Orang';

    // Loyalty bar
    $('qr-res-loyalty-label').textContent = count + ' / ' + target;
    $('qr-res-loyalty-fill').style.width  = pct + '%';
    $('qr-res-loyalty-fill').className    = 'qrscan-loyalty-fill' + (eligible ? ' qrscan-loyalty-fill--done' : '');
    $('qr-res-loyalty-note').textContent  = eligible
        ? '✅ Eligible diskon ' + (data.discount_percentage || 50) + '%'
        : 'Perlu ' + Math.max(target - count, 0) + ' perjalanan lagi untuk diskon.';
}

function showError(message) {
    $('qrscan-result-idle').hidden = true;
    $('qrscan-result-card').hidden = false;

    $('qrscan-result-header').className = 'qrscan-result-header qrscan-result-header--error';
    $('qrscan-result-icon').innerHTML   = iconX();
    $('qrscan-result-title').textContent    = 'Scan Gagal';
    $('qrscan-result-subtitle').textContent = message;

    ['qr-res-name','qr-res-code','qr-res-route','qr-res-datetime','qr-res-seats','qr-res-pax'].forEach((id) => {
        $(id).textContent = '-';
    });
    $('qr-res-loyalty-label').textContent = '– / –';
    $('qr-res-loyalty-fill').style.width  = '0%';
    $('qr-res-loyalty-note').textContent  = '';
}

// ─── History ──────────────────────────────────────────────────────────────────

function addHistory(data) {
    const booking = data.booking;
    const time    = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const passenger = data.passenger || {};
    history.unshift({ booking, passenger, time, success: data.success, already_scanned: data.already_scanned, message: data.message });
    renderHistory();
}

function renderHistory() {
    const list = $('qrscan-history-list');

    if (history.length === 0) {
        list.innerHTML = '<p class="qrscan-history-empty">Belum ada scan dalam sesi ini.</p>';
        return;
    }

    list.innerHTML = history.map((item) => {
        const stateClass = item.already_scanned ? 'warn' : (item.success ? 'ok' : 'err');
        const nameDisplay = (item.passenger && item.passenger.name)
            ? item.passenger.name + (item.passenger.seat_no ? ' (' + item.passenger.seat_no + ')' : '')
            : (item.booking.nama_pemesanan || '-');
        return `
        <div class="qrscan-history-item qrscan-history-item--${stateClass}">
            <div class="qrscan-history-dot"></div>
            <div class="qrscan-history-body">
                <strong>${escapeHtml(item.booking.booking_code || '-')}</strong>
                <span>${escapeHtml(nameDisplay)}</span>
            </div>
            <span class="qrscan-history-time">${item.time}</span>
        </div>`;
    }).join('');
}

// ─── Camera scanner ───────────────────────────────────────────────────────────

function startScanner() {
    if (! window.Html5Qrcode) {
        toastError('Library scanner tidak tersedia. Coba muat ulang halaman.', 'Error');
        return;
    }

    $('qrscan-placeholder').hidden = true;
    $('qrscan-frame').hidden       = false;
    $('qrscan-btn-start').hidden   = true;
    $('qrscan-btn-stop').hidden    = false;
    isScanning = true;
    setStatusText('Menginisialisasi kamera…');

    scanner = new window.Html5Qrcode('qrscan-reader');

    scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 240, height: 240 } },
        (decodedText) => {
            let token = decodedText.trim();

            // jika QR value adalah JSON, ambil qr_token-nya
            try {
                const parsed = JSON.parse(decodedText);
                if (parsed && parsed.qr_token) {
                    token = parsed.qr_token;
                }
            } catch (_) {
                // bukan JSON, gunakan nilai langsung
            }

            processScan(token);
        },
        () => { /* scan ongoing, ignore */ },
    ).then(() => {
        setStatusText('Kamera aktif — arahkan ke QR code.');
    }).catch((err) => {
        isScanning = false;
        $('qrscan-placeholder').hidden = false;
        $('qrscan-frame').hidden       = true;
        $('qrscan-btn-start').hidden   = false;
        $('qrscan-btn-stop').hidden    = true;
        setStatusText('Gagal mengakses kamera. Pastikan izin kamera sudah diberikan.');
        toastError(String(err), 'Kamera Error');
    });
}

function stopScanner() {
    if (scanner) {
        scanner.stop().catch(() => {}).finally(() => {
            scanner = null;
        });
    }
    isScanning = false;
    $('qrscan-placeholder').hidden = false;
    $('qrscan-frame').hidden       = true;
    $('qrscan-btn-start').hidden   = false;
    $('qrscan-btn-stop').hidden    = true;
    setStatusText('Kamera dihentikan.');
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function setStatusText(text) {
    $('qrscan-status-text').textContent = text;
}

function iconCheck() {
    return `<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M8 12l3 3 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
}

function iconX() {
    return `<svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/>
        <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`;
}

function iconWarn() {
    return `<svg viewBox="0 0 24 24" fill="none">
        <path d="M12 9v4M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </svg>`;
}

// ─── Init ─────────────────────────────────────────────────────────────────────

export default function initQrScanPage() {
    $('qrscan-btn-start').addEventListener('click', startScanner);
    $('qrscan-btn-stop').addEventListener('click', stopScanner);

    $('qrscan-clear-history').addEventListener('click', () => {
        history.length = 0;
        renderHistory();
    });

    $('qrscan-manual-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const val = $('qrscan-manual-input').value.trim();
        if (! val) return;
        processScan(val);
        $('qrscan-manual-input').value = '';
    });
}
