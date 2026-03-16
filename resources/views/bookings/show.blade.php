@extends('layouts.dashboard')

@section('content')
    <section class="admin-users-page animate-fade-in bookings-show-page">
        <section class="admin-users-page-header">
            <div class="admin-users-page-copy">
                <h1>Detail Pemesanan</h1>
                <p>Informasi lengkap pemesanan {{ $detail['booking_code'] }} untuk kebutuhan monitoring dan tindak lanjut admin.</p>
            </div>

            <div class="admin-users-page-actions">
                <span class="stock-value-badge stock-value-badge-blue">{{ $detail['booking_code'] }}</span>
                <span id="bkg-status-badge" class="{{ $detail['booking_status_badge_class'] }}">{{ $detail['booking_status'] }}</span>
                <span id="pay-status-badge" class="{{ $detail['payment_status_badge_class'] }}">{{ $detail['payment_status'] }}</span>
            </div>
        </section>

        <div class="bookings-show-layout">
            <div class="bookings-show-main">
                <article class="dashboard-panel-card bookings-show-card">
                    <div class="dashboard-panel-head">
                        <div>
                            <h3>Informasi Pemesan</h3>
                            <p>Ringkasan identitas pemesan dan rute perjalanan yang tersimpan pada sistem.</p>
                        </div>
                    </div>

                    <div class="bookings-detail-grid">
                        <div class="admin-users-detail-item">
                            <span>Nama Pemesan</span>
                            <strong>{{ $detail['nama_pemesanan'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>No HP</span>
                            <strong>{{ $detail['phone'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Jenis Pemesanan</span>
                            <strong>{{ $detail['booking_for'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Jenis Layanan</span>
                            <strong>{{ $detail['category'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Asal</span>
                            <strong>{{ $detail['from_city'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Tujuan</span>
                            <strong>{{ $detail['to_city'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Tanggal Keberangkatan</span>
                            <strong>{{ $detail['trip_date_label'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Waktu Keberangkatan</span>
                            <strong>{{ $detail['trip_time_label'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Kursi</span>
                            <strong>{{ $detail['selected_seats_label'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Jumlah Penumpang</span>
                            <strong>{{ $detail['passenger_count'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Driver</span>
                            <strong>{{ $detail['driver_name'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Rute</span>
                            <strong>{{ $detail['route_label'] }}</strong>
                        </div>
                    </div>
                </article>

                <article class="dashboard-panel-card bookings-show-card">
                    <div class="dashboard-panel-head">
                        <div>
                            <h3>Pembayaran dan Dokumen</h3>
                            <p>Status pembayaran, nilai transaksi, dan identitas dokumen booking.</p>
                        </div>
                    </div>

                    <div class="bookings-detail-grid">
                        <div class="admin-users-detail-item">
                            <span>Biaya</span>
                            <strong>{{ $detail['total_amount_formatted'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Tarif per Kursi</span>
                            <strong>{{ $detail['price_per_seat_formatted'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Nominal Pembayaran</span>
                            <strong>{{ $detail['nominal_payment_formatted'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Metode Pembayaran</span>
                            <strong>{{ $detail['payment_method'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Status Pembayaran</span>
                            <strong>{{ $detail['payment_status'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Status Tiket</span>
                            <strong>{{ $detail['ticket_status'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Nomor Invoice</span>
                            <strong>{{ $detail['invoice_number'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Nomor Tiket</span>
                            <strong>{{ $detail['ticket_number'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Referensi Pembayaran</span>
                            <strong>{{ $detail['payment_reference'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Rekening / Kanal</span>
                            <strong>{{ $detail['payment_account_label'] }}</strong>
                        </div>
                    </div>
                </article>

                <article class="dashboard-panel-card bookings-show-card">
                    <div class="dashboard-panel-head">
                        <div>
                            <h3>Alamat Layanan</h3>
                            <p>Alamat penjemputan dan pengantaran lengkap yang digunakan pada booking.</p>
                        </div>
                    </div>

                    <div class="bookings-detail-grid">
                        <div class="admin-users-detail-item">
                            <span>Alamat Penjemputan</span>
                            <p>{{ $detail['pickup_location'] }}</p>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Alamat Pengantaran</span>
                            <p>{{ $detail['dropoff_location'] }}</p>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Dibuat</span>
                            <strong>{{ $detail['created_at_label'] }}</strong>
                        </div>
                        <div class="admin-users-detail-item">
                            <span>Catatan</span>
                            <p>{{ $detail['notes'] !== '' ? $detail['notes'] : '-' }}</p>
                        </div>
                    </div>
                </article>

                <article class="dashboard-panel-card bookings-show-card">
                    <div class="dashboard-panel-head">
                        <div>
                            <h3>Data Penumpang</h3>
                            <p>Urutan penumpang mengikuti kursi yang tersimpan pada booking.</p>
                        </div>
                    </div>

                    <div class="bookings-passenger-grid">
                        @foreach ($detail['passengers'] as $passenger)
                            <article class="bookings-passenger-card">
                                <span class="stock-value-badge stock-value-badge-blue">{{ $passenger['seat_no'] }}</span>
                                <strong>{{ $passenger['name'] }}</strong>
                                <p>{{ $passenger['phone'] }}</p>
                            </article>
                        @endforeach
                    </div>
                </article>
            </div>

            <aside class="bookings-show-sidebar">
                <article class="dashboard-panel-card bookings-show-card">
                    <div class="dashboard-panel-head">
                        <div>
                            <h3>QR Code Tiket</h3>
                            <p>QR code akan tampil bila booking sudah memiliki metadata tiket dan loyalti.</p>
                        </div>
                    </div>

                    @if ($detail['has_qr_code'])
                        <div class="bookings-show-qr-stage">
                            <div>{!! $detail['qr_code_markup'] !!}</div>
                        </div>

                        <div class="bookings-detail-grid bookings-detail-grid--single">
                            <div class="admin-users-detail-item">
                                <span>Token QR</span>
                                <strong>{{ $detail['qr_token'] }}</strong>
                            </div>
                            <div class="admin-users-detail-item">
                                <span>Status Loyalti</span>
                                <strong>{{ $detail['discount_status_label'] }}</strong>
                            </div>
                            <div class="admin-users-detail-item">
                                <span>Scan Loyalti</span>
                                <strong>{{ $detail['loyalty_scan_label'] }}</strong>
                            </div>
                        </div>
                    @else
                        <div class="dashboard-empty-state dashboard-empty-state--block bookings-show-empty">
                            QR code belum tersedia untuk booking ini.
                        </div>
                    @endif
                </article>

                <article class="dashboard-panel-card bookings-show-card">
                    <div class="dashboard-panel-head">
                        <div>
                            <h3>Validasi Pembayaran</h3>
                            <p>Konfirmasi, kembalikan, atau tolak pembayaran untuk booking ini.</p>
                        </div>
                    </div>

                    @if ($detail['payment_proof_url'])
                        <div class="pay-proof-wrap">
                            <span class="pay-proof-label">Bukti Pembayaran</span>
                            <a href="{{ $detail['payment_proof_url'] }}" target="_blank" class="pay-proof-link">
                                <img src="{{ $detail['payment_proof_url'] }}" alt="Bukti Pembayaran" class="pay-proof-img">
                            </a>
                        </div>
                    @endif

                    @if ($detail['validated_at_label'])
                        <div class="pay-validated-info">
                            <span>Tervalidasi pada {{ $detail['validated_at_label'] }}</span>
                            @if ($detail['validation_notes'] !== '')
                                <p>{{ $detail['validation_notes'] }}</p>
                            @endif
                        </div>
                    @endif

                    <div id="pay-validate-form" data-booking-id="{{ $detail['id'] }}">
                        <div id="pay-validate-actions" class="pay-validate-actions">
                            <button type="button" class="pay-validate-btn pay-validate-btn--lunas" data-action="lunas">
                                Lunas
                            </button>
                            <button type="button" class="pay-validate-btn pay-validate-btn--belum" data-action="belum_lunas">
                                Belum Lunas
                            </button>
                            <button type="button" class="pay-validate-btn pay-validate-btn--tolak" data-action="ditolak">
                                Tolak
                            </button>
                        </div>

                        <div id="pay-validate-confirm" class="pay-validate-confirm" style="display:none;">
                            <p id="pay-validate-confirm-text" class="pay-validate-confirm-text"></p>
                            <textarea id="pay-validate-notes" class="pay-validate-notes" placeholder="Catatan validasi (opsional)..." rows="3"></textarea>
                            <div class="pay-validate-confirm-actions">
                                <button type="button" id="pay-validate-submit" class="pay-validate-submit">Konfirmasi</button>
                                <button type="button" id="pay-validate-cancel" class="pay-validate-cancel">Batal</button>
                            </div>
                        </div>

                        <div id="pay-validate-result" style="display:none;"></div>
                    </div>
                </article>

                <article class="dashboard-panel-card bookings-show-card">
                    <div class="dashboard-panel-head">
                        <div>
                            <h3>Aksi Cepat</h3>
                            <p>Kembali ke halaman manajemen pemesanan untuk melanjutkan proses admin.</p>
                        </div>
                    </div>

                    <div class="bookings-show-actions">
                        <a href="{{ route('bookings.index') }}" class="admin-users-secondary-button">Kembali ke Data Pemesanan</a>
                    </div>
                </article>
            </aside>
        </div>
    </section>

    <script>
    (function () {
        var form      = document.getElementById('pay-validate-form');
        if (! form) return;

        var bookingId = form.dataset.bookingId;
        var token     = localStorage.getItem('transit_token') || '';

        var actionsEl  = document.getElementById('pay-validate-actions');
        var confirmEl  = document.getElementById('pay-validate-confirm');
        var confirmTxt = document.getElementById('pay-validate-confirm-text');
        var notesEl    = document.getElementById('pay-validate-notes');
        var submitBtn  = document.getElementById('pay-validate-submit');
        var cancelBtn  = document.getElementById('pay-validate-cancel');
        var resultEl   = document.getElementById('pay-validate-result');

        var pendingAction = null;

        var actionLabels = {
            lunas:       'Konfirmasi pembayaran sebagai <strong>Lunas</strong>?',
            belum_lunas: 'Kembalikan status ke <strong>Belum Bayar</strong>?',
            ditolak:     'Tolak pembayaran ini? Status akan menjadi <strong>Ditolak</strong>.'
        };

        var badgeClassMap = {
            'Lunas':     'stock-value-badge stock-value-badge-emerald',
            'Ditolak':   'stock-value-badge stock-value-badge-red',
            'Diproses':  'stock-value-badge stock-value-badge-emerald',
            'Draft':     'stock-value-badge stock-value-badge-blue',
            'Belum Bayar': 'stock-value-badge stock-value-badge-blue'
        };

        document.querySelectorAll('.pay-validate-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                pendingAction = btn.dataset.action;
                confirmTxt.innerHTML = actionLabels[pendingAction] || pendingAction;
                notesEl.value = '';
                actionsEl.style.display = 'none';
                confirmEl.style.display = 'block';
                resultEl.style.display  = 'none';
            });
        });

        cancelBtn.addEventListener('click', function () {
            pendingAction = null;
            confirmEl.style.display = 'none';
            actionsEl.style.display = 'flex';
        });

        submitBtn.addEventListener('click', async function () {
            if (! pendingAction) return;

            var notes = notesEl.value.trim();
            submitBtn.disabled    = true;
            submitBtn.textContent = 'Memproses...';

            try {
                var csrfMeta = document.querySelector('meta[name="csrf-token"]');
                var res = await fetch('/api/bookings/' + bookingId + '/validate-payment', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + token,
                        'X-CSRF-TOKEN': csrfMeta ? csrfMeta.content : ''
                    },
                    body: JSON.stringify({ action: pendingAction, validation_notes: notes })
                });

                var data = await res.json();

                if (res.ok) {
                    var payBadge = document.getElementById('pay-status-badge');
                    var bkgBadge = document.getElementById('bkg-status-badge');

                    if (payBadge) {
                        payBadge.textContent = data.payment_status;
                        payBadge.className   = badgeClassMap[data.payment_status] || 'stock-value-badge stock-value-badge-blue';
                    }
                    if (bkgBadge) {
                        bkgBadge.textContent = data.booking_status;
                        bkgBadge.className   = badgeClassMap[data.booking_status] || 'stock-value-badge stock-value-badge-blue';
                    }

                    confirmEl.style.display = 'none';
                    resultEl.innerHTML      = '<div class="pay-validate-success">' + data.message + '</div>';
                    resultEl.style.display  = 'block';

                    setTimeout(function () {
                        resultEl.style.display  = 'none';
                        actionsEl.style.display = 'flex';
                    }, 3000);
                } else {
                    alert(data.message || 'Terjadi kesalahan');
                    submitBtn.disabled    = false;
                    submitBtn.textContent = 'Konfirmasi';
                }
            } catch (e) {
                alert('Gagal terhubung ke server');
                submitBtn.disabled    = false;
                submitBtn.textContent = 'Konfirmasi';
            }

            pendingAction = null;
        });
    })();
    </script>
@endsection
