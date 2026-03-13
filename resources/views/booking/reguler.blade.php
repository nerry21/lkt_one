@extends('layouts.booking')

@section('page_title', 'Booking Reguler')
@section('page_subtitle', 'Pilih rute, tanggal, jam, kursi, lalu isi data penumpang untuk membuat booking reguler.')

@section('content')
    <section class="booking-grid">
        <div class="booking-col-8">
            <article class="booking-card">
                <div class="booking-card-body">
                    <div class="booking-card-header">
                        <div>
                            <h2>Form Perjalanan</h2>
                            <p class="booking-section-subtitle">Lengkapi detail perjalanan sebelum memuat kursi yang tersedia.</p>
                        </div>

                        <span class="booking-pill">Tahap 1 dari 3</span>
                    </div>

                    <div id="bookingAlertBox"></div>

                    <form id="bookingForm" novalidate>
                        <div class="booking-grid">
                            <div class="booking-col-6 booking-field">
                                <label for="from">Dari</label>
                                <select class="booking-select" id="from" name="from" required>
                                    <option value="">Pilih asal</option>
                                </select>
                            </div>

                            <div class="booking-col-6 booking-field">
                                <label for="to">Ke</label>
                                <select class="booking-select" id="to" name="to" required>
                                    <option value="">Pilih tujuan</option>
                                </select>
                            </div>

                            <div class="booking-col-6 booking-field">
                                <label for="date">Tanggal Berangkat</label>
                                <input class="booking-input" type="date" id="date" name="date" required>
                            </div>

                            <div class="booking-col-6 booking-field">
                                <label for="time">Jam Berangkat</label>
                                <input class="booking-input" type="time" id="time" name="time" value="08:00" required>
                            </div>

                            <div class="booking-col-6 booking-field">
                                <label for="bookingFor">Booking Untuk</label>
                                <select class="booking-select" id="bookingFor" name="bookingFor">
                                    <option value="self">Diri Sendiri</option>
                                    <option value="other">Orang Lain</option>
                                </select>
                            </div>

                            <div class="booking-col-6 booking-field">
                                <label for="passengerCount">Jumlah Penumpang</label>
                                <input class="booking-input" type="number" min="1" max="6" id="passengerCount" name="passengerCount" value="1" required>
                            </div>

                            <div class="booking-col-6 booking-field">
                                <label for="passengerName">Nama Pemesan</label>
                                <input class="booking-input" type="text" id="passengerName" name="passengerName" required>
                            </div>

                            <div class="booking-col-6 booking-field">
                                <label for="passengerPhone">No. HP Pemesan</label>
                                <input class="booking-input" type="text" id="passengerPhone" name="passengerPhone" required>
                            </div>

                            <div class="booking-col-6 booking-field">
                                <label for="pickupLocation">Lokasi Jemput</label>
                                <input class="booking-input" type="text" id="pickupLocation" name="pickupLocation" placeholder="Contoh: Ujung Batu">
                            </div>

                            <div class="booking-col-6 booking-field">
                                <label for="dropoffLocation">Lokasi Antar</label>
                                <input class="booking-input" type="text" id="dropoffLocation" name="dropoffLocation" placeholder="Contoh: Panam">
                            </div>
                        </div>

                        <div class="booking-divider" style="margin: 28px 0;"></div>

                        <div class="booking-card-header">
                            <div>
                                <h3>Pilih Kursi</h3>
                                <p class="booking-section-subtitle">Klik cek kursi untuk memuat posisi yang masih tersedia.</p>
                            </div>

                            <button class="booking-button booking-button--primary" type="button" id="loadSeatsBtn">
                                Cek Kursi
                            </button>
                        </div>

                        <div id="seatGrid" class="booking-seat-grid">
                            @foreach (['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as $seat)
                                <button type="button" class="booking-seat-card is-idle" data-seat="{{ $seat }}" disabled>
                                    <span class="booking-seat-icon" aria-hidden="true">
                                        <svg viewBox="0 0 64 64" fill="none">
                                            <path d="M20 14C20 9.58172 23.5817 6 28 6H36C40.4183 6 44 9.58172 44 14V24C44 28.4183 40.4183 32 36 32H28C23.5817 32 20 28.4183 20 24V14Z" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="2.5"/>
                                            <path d="M16 38C16 34.6863 18.6863 32 22 32H42C45.3137 32 48 34.6863 48 38V52C48 53.1046 47.1046 54 46 54H18C16.8954 54 16 53.1046 16 52V38Z" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="2.5"/>
                                            <path d="M22 54V60" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                                            <path d="M42 54V60" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                                            <path d="M22 40H42" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                                        </svg>
                                    </span>
                                    <span>Kursi</span>
                                    <strong>{{ $seat }}</strong>
                                    <small>Isi rute dulu</small>
                                </button>
                            @endforeach
                        </div>

                        <div class="booking-seat-legend">
                            <span class="booking-seat-legend-item">
                                <span class="booking-seat-legend-swatch"></span>
                                Tersedia
                            </span>
                            <span class="booking-seat-legend-item">
                                <span class="booking-seat-legend-swatch is-selected"></span>
                                Dipilih
                            </span>
                            <span class="booking-seat-legend-item">
                                <span class="booking-seat-legend-swatch is-booked"></span>
                                Sudah dibooking
                            </span>
                        </div>

                        <div class="booking-divider" style="margin: 28px 0;"></div>

                        <div class="booking-quote-card">
                            <div class="booking-card-header" style="margin-bottom: 0;">
                                <div>
                                    <h3>Ringkasan Tarif</h3>
                                    <p class="booking-section-subtitle" id="quoteInfo">Belum dihitung</p>
                                </div>

                                <button class="booking-button booking-button--ghost" type="button" id="quoteBtn">
                                    Hitung Total
                                </button>
                            </div>

                            <div id="quoteResult" class="booking-empty">
                                Belum ada estimasi biaya. Pilih kursi lalu klik hitung total.
                            </div>
                        </div>

                        <div class="booking-divider" style="margin: 28px 0;"></div>

                        <div class="booking-card-header">
                            <div>
                                <h3>Data Penumpang</h3>
                                <p class="booking-section-subtitle">Jumlah form penumpang mengikuti kursi yang Anda pilih.</p>
                            </div>
                        </div>

                        <div id="passengerFields" class="booking-passenger-stack">
                            <div class="booking-empty">Pilih kursi terlebih dahulu.</div>
                        </div>

                        <div class="booking-actions" style="margin-top: 28px;">
                            <span class="booking-muted">Setelah disimpan, Anda akan diarahkan ke halaman review booking.</span>

                            <button class="booking-button booking-button--primary" type="submit" id="submitBookingBtn">
                                Simpan Booking
                            </button>
                        </div>
                    </form>
                </div>
            </article>
        </div>

        <aside class="booking-col-4">
            <article class="booking-summary-card">
                <h3 class="booking-summary-title">Alur Booking</h3>

                <div class="booking-detail-list">
                    <div class="booking-detail-item">
                        <span>1. Isi perjalanan</span>
                        <strong>Rute, tanggal, jam</strong>
                    </div>

                    <div class="booking-detail-item">
                        <span>2. Pilih kursi</span>
                        <strong>Maksimal 6 seat</strong>
                    </div>

                    <div class="booking-detail-item">
                        <span>3. Simpan booking</span>
                        <strong>Lanjut review</strong>
                    </div>

                    <div class="booking-detail-item">
                        <span>4. Kirim payment</span>
                        <strong>Menunggu validasi</strong>
                    </div>
                </div>

                <div class="booking-divider"></div>

                <div class="booking-summary-list">
                    <div class="booking-summary-row">
                        <span>Kapasitas seat</span>
                        <strong>6 kursi</strong>
                    </div>

                    <div class="booking-summary-row">
                        <span>Kategori</span>
                        <strong>Reguler</strong>
                    </div>

                    <div class="booking-summary-row">
                        <span>Status awal</span>
                        <strong>Belum Bayar</strong>
                    </div>
                </div>
            </article>
        </aside>
    </section>
@endsection

@push('scripts')
    <script>
        function initRegulerBookingPage() {
            const apiBase = document.body.dataset.apiBase || '/api';
            const form = document.getElementById('bookingForm');

            if (!form) {
                return;
            }

            const fromEl = document.getElementById('from');
            const toEl = document.getElementById('to');
            const dateEl = document.getElementById('date');
            const timeEl = document.getElementById('time');
            const bookingForEl = document.getElementById('bookingFor');
            const passengerCountEl = document.getElementById('passengerCount');
            const passengerNameEl = document.getElementById('passengerName');
            const passengerPhoneEl = document.getElementById('passengerPhone');
            const pickupLocationEl = document.getElementById('pickupLocation');
            const dropoffLocationEl = document.getElementById('dropoffLocation');
            const seatGrid = document.getElementById('seatGrid');
            const passengerFields = document.getElementById('passengerFields');
            const alertBox = document.getElementById('bookingAlertBox');
            const quoteInfo = document.getElementById('quoteInfo');
            const quoteResult = document.getElementById('quoteResult');
            const loadSeatsBtn = document.getElementById('loadSeatsBtn');
            const quoteBtn = document.getElementById('quoteBtn');
            const submitBookingBtn = document.getElementById('submitBookingBtn');

            const selectedSeats = new Set();
            const passengerState = new Map();
            const seatBlueprint = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
            let latestSeatItems = [];

            const todayValue = new Date().toISOString().split('T')[0];

            dateEl.min = todayValue;

            if (!dateEl.value) {
                dateEl.value = todayValue;
            }

            function showAlert(type, message) {
                alertBox.innerHTML = `
                    <div class="booking-alert booking-alert--${type}">
                        <p>${message}</p>
                        <button class="booking-button booking-button--light" type="button" data-close-alert>Tutup</button>
                    </div>
                `;

                const closeButton = alertBox.querySelector('[data-close-alert]');

                if (closeButton) {
                    closeButton.addEventListener('click', function () {
                        alertBox.innerHTML = '';
                    });
                }
            }

            function clearAlert() {
                alertBox.innerHTML = '';
            }

            function formatRupiah(number) {
                return new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    maximumFractionDigits: 0,
                }).format(Number(number || 0));
            }

            function resolveErrorMessage(data, fallback) {
                if (data && typeof data.message === 'string' && data.message !== '') {
                    return data.message;
                }

                if (data && typeof data.errors === 'object' && data.errors) {
                    return Object.values(data.errors).flat().join(' ');
                }

                return fallback;
            }

            function currentSeatList() {
                return Array.from(selectedSeats);
            }

            function preservePassengerDrafts() {
                passengerFields.querySelectorAll('[data-passenger-seat]').forEach(function (card) {
                    const seat = card.dataset.passengerSeat;

                    if (!seat) {
                        return;
                    }

                    passengerState.set(seat, {
                        name: card.querySelector('.passenger-name')?.value || '',
                        phone: card.querySelector('.passenger-phone')?.value || '',
                    });
                });

                Array.from(passengerState.keys()).forEach(function (seat) {
                    if (!selectedSeats.has(seat)) {
                        passengerState.delete(seat);
                    }
                });
            }

            function renderPassengerFields() {
                preservePassengerDrafts();

                const seats = currentSeatList();
                passengerFields.innerHTML = '';

                if (!seats.length) {
                    passengerFields.innerHTML = '<div class="booking-empty">Pilih kursi terlebih dahulu.</div>';
                    return;
                }

                seats.forEach(function (seat, index) {
                    const draft = passengerState.get(seat) || {};
                    const defaultName = index === 0 && draft.name === '' ? passengerNameEl.value : draft.name || '';
                    const defaultPhone = index === 0 && draft.phone === '' ? passengerPhoneEl.value : draft.phone || '';

                    passengerFields.insertAdjacentHTML('beforeend', `
                        <article class="booking-passenger-card" data-passenger-seat="${seat}">
                            <div class="booking-passenger-header">
                                <div>
                                    <h3 class="booking-section-title">Penumpang ${index + 1}</h3>
                                    <p class="booking-section-subtitle">Seat ${seat}</p>
                                </div>

                                <span class="booking-pill">Seat ${seat}</span>
                            </div>

                            <div class="booking-grid">
                                <div class="booking-col-2 booking-field">
                                    <label>Seat</label>
                                    <input class="booking-input passenger-seat" type="text" value="${seat}" readonly>
                                </div>

                                <div class="booking-col-5 booking-field">
                                    <label>Nama</label>
                                    <input class="booking-input passenger-name" type="text" value="${defaultName}" placeholder="Nama penumpang" required>
                                </div>

                                <div class="booking-col-5 booking-field">
                                    <label>No. HP</label>
                                    <input class="booking-input passenger-phone" type="text" value="${defaultPhone}" placeholder="Nomor telepon penumpang">
                                </div>
                            </div>
                        </article>
                    `);
                });
            }

            function resetQuote() {
                quoteInfo.textContent = 'Belum dihitung';
                quoteResult.className = 'booking-empty';
                quoteResult.innerHTML = 'Belum ada estimasi biaya. Pilih kursi lalu klik hitung total.';
            }

            function seatIconMarkup() {
                return `
                    <span class="booking-seat-icon" aria-hidden="true">
                        <svg viewBox="0 0 64 64" fill="none">
                            <path d="M20 14C20 9.58172 23.5817 6 28 6H36C40.4183 6 44 9.58172 44 14V24C44 28.4183 40.4183 32 36 32H28C23.5817 32 20 28.4183 20 24V14Z" fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="2.5"/>
                            <path d="M16 38C16 34.6863 18.6863 32 22 32H42C45.3137 32 48 34.6863 48 38V52C48 53.1046 47.1046 54 46 54H18C16.8954 54 16 53.1046 16 52V38Z" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="2.5"/>
                            <path d="M22 54V60" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                            <path d="M42 54V60" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                            <path d="M22 40H42" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                        </svg>
                    </span>
                `;
            }

            function normalizedSeatItems(items = []) {
                if (items.length) {
                    return items;
                }

                return seatBlueprint.map(function (seat) {
                    return {
                        id: seat,
                        seat: seat,
                        label: seat,
                        available: false,
                        status: 'idle',
                    };
                });
            }

            function renderSeatGrid(items = []) {
                const normalizedItems = normalizedSeatItems(items);
                seatGrid.innerHTML = '';

                normalizedItems.forEach(function (item) {
                    const button = document.createElement('button');
                    const isIdle = item.status === 'idle';
                    const isAvailable = Boolean(item.available) && !isIdle;
                    const seat = item.seat;
                    const statusText = isIdle
                        ? 'Isi rute dulu'
                        : isAvailable
                            ? 'Tersedia'
                            : 'Sudah dibooking';

                    button.type = 'button';
                    button.className = `booking-seat-card ${isIdle ? 'is-idle' : isAvailable ? '' : 'is-booked'}`.trim();
                    button.dataset.seat = seat;
                    button.disabled = !isAvailable;
                    button.innerHTML = `
                        ${seatIconMarkup()}
                        <span>Kursi</span>
                        <strong>${item.label}</strong>
                        <small>${statusText}</small>
                    `;

                    if (isAvailable) {
                        if (selectedSeats.has(seat)) {
                            button.classList.add('is-selected');
                        }

                        button.addEventListener('click', function () {
                            clearAlert();

                            const maxPassenger = Number(passengerCountEl.value || 1);

                            if (selectedSeats.has(seat)) {
                                selectedSeats.delete(seat);
                                button.classList.remove('is-selected');
                            } else {
                                if (selectedSeats.size >= maxPassenger) {
                                    showAlert('warning', `Jumlah kursi maksimal ${maxPassenger} sesuai jumlah penumpang.`);
                                    return;
                                }

                                selectedSeats.add(seat);
                                button.classList.add('is-selected');
                            }

                            renderPassengerFields();
                            resetQuote();
                        });
                    }

                    seatGrid.appendChild(button);
                });
            }

            function getFormBase() {
                return {
                    category: 'Reguler',
                    from: fromEl.value,
                    to: toEl.value,
                    date: dateEl.value,
                    time: timeEl.value,
                    passengerCount: Number(passengerCountEl.value || 1),
                    selectedSeats: currentSeatList(),
                };
            }

            async function fetchJson(url, options) {
                const response = await fetch(url, options);
                const data = await response.json().catch(function () {
                    return {};
                });

                return { response, data };
            }

            async function loadStops() {
                try {
                    const { response, data } = await fetchJson(`${apiBase}/reguler/stops`, {
                        headers: {
                            Accept: 'application/json',
                        },
                    });

                    if (!response.ok || !Array.isArray(data)) {
                        throw new Error(resolveErrorMessage(data, 'Gagal memuat daftar pemberhentian.'));
                    }

                    data.forEach(function (item) {
                        const optionFrom = document.createElement('option');
                        optionFrom.value = item.key;
                        optionFrom.textContent = item.label;
                        fromEl.appendChild(optionFrom);

                        const optionTo = document.createElement('option');
                        optionTo.value = item.key;
                        optionTo.textContent = item.label;
                        toEl.appendChild(optionTo);
                    });
                } catch (error) {
                    showAlert('danger', error.message || 'Gagal memuat daftar pemberhentian.');
                }
            }

            async function loadSeats() {
                clearAlert();
                preservePassengerDrafts();

                if (!fromEl.value || !toEl.value || !dateEl.value || !timeEl.value) {
                    showAlert('warning', 'Silakan isi asal, tujuan, tanggal, dan jam terlebih dahulu.');
                    return;
                }

                if (fromEl.value === toEl.value) {
                    showAlert('warning', 'Asal dan tujuan tidak boleh sama.');
                    return;
                }

                loadSeatsBtn.disabled = true;
                loadSeatsBtn.textContent = 'Memuat Kursi...';

                selectedSeats.clear();
                passengerState.clear();
                latestSeatItems = [];
                renderSeatGrid();
                renderPassengerFields();
                resetQuote();

                const params = new URLSearchParams({
                    from: fromEl.value,
                    to: toEl.value,
                    date: dateEl.value,
                    time: timeEl.value,
                });

                try {
                    const { response, data } = await fetchJson(`${apiBase}/reguler/seats?${params.toString()}`, {
                        headers: {
                            Accept: 'application/json',
                        },
                    });

                    if (!response.ok || !Array.isArray(data)) {
                        throw new Error(resolveErrorMessage(data, 'Gagal memuat kursi.'));
                    }

                    latestSeatItems = data;
                    renderSeatGrid(latestSeatItems);
                } catch (error) {
                    latestSeatItems = [];
                    renderSeatGrid();
                    showAlert('danger', error.message || 'Gagal memuat kursi.');
                } finally {
                    loadSeatsBtn.disabled = false;
                    loadSeatsBtn.textContent = 'Cek Kursi';
                }
            }

            async function calculateQuote() {
                clearAlert();

                if (!selectedSeats.size) {
                    showAlert('warning', 'Pilih kursi terlebih dahulu.');
                    return;
                }

                quoteBtn.disabled = true;
                quoteBtn.textContent = 'Menghitung...';

                try {
                    const { response, data } = await fetchJson(`${apiBase}/reguler/quote`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                        body: JSON.stringify(getFormBase()),
                    });

                    if (!response.ok) {
                        throw new Error(resolveErrorMessage(data, 'Gagal menghitung tarif.'));
                    }

                    quoteInfo.textContent = `${data.route} | ${data.passengerCount} penumpang`;
                    quoteResult.className = '';
                    quoteResult.innerHTML = `
                        <div class="booking-stat-grid">
                            <div class="booking-stat-card">
                                <span>Harga per seat</span>
                                <strong>${formatRupiah(data.pricePerSeat)}</strong>
                            </div>
                            <div class="booking-stat-card">
                                <span>Jumlah seat</span>
                                <strong>${data.passengerCount}</strong>
                            </div>
                            <div class="booking-stat-card">
                                <span>Total</span>
                                <strong class="booking-money">${formatRupiah(data.total)}</strong>
                            </div>
                        </div>
                    `;
                } catch (error) {
                    resetQuote();
                    showAlert('danger', error.message || 'Gagal menghitung tarif.');
                } finally {
                    quoteBtn.disabled = false;
                    quoteBtn.textContent = 'Hitung Total';
                }
            }

            function collectPassengers() {
                preservePassengerDrafts();

                return currentSeatList().map(function (seat) {
                    const draft = passengerState.get(seat) || {};

                    return {
                        seat: seat,
                        name: (draft.name || '').trim(),
                        phone: (draft.phone || '').trim(),
                    };
                });
            }

            async function submitBooking(event) {
                event.preventDefault();
                clearAlert();

                if (!selectedSeats.size) {
                    showAlert('warning', 'Silakan pilih minimal 1 kursi.');
                    return;
                }

                if (selectedSeats.size !== Number(passengerCountEl.value || 1)) {
                    showAlert('warning', 'Jumlah kursi terpilih harus sama dengan jumlah penumpang.');
                    return;
                }

                const passengers = collectPassengers();
                const invalidPassenger = passengers.find(function (passenger) {
                    return passenger.seat === '' || passenger.name === '';
                });

                if (invalidPassenger) {
                    showAlert('warning', 'Semua nama penumpang wajib diisi.');
                    return;
                }

                submitBookingBtn.disabled = true;
                submitBookingBtn.textContent = 'Menyimpan...';

                const payload = {
                    ...getFormBase(),
                    bookingFor: bookingForEl.value,
                    passengerName: passengerNameEl.value.trim(),
                    passengerPhone: passengerPhoneEl.value.trim(),
                    pickupLocation: pickupLocationEl.value.trim(),
                    dropoffLocation: dropoffLocationEl.value.trim(),
                    passengers: passengers,
                };

                try {
                    const { response, data } = await fetchJson(`${apiBase}/reguler/bookings`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                        body: JSON.stringify(payload),
                    });

                    if (!response.ok) {
                        throw new Error(resolveErrorMessage(data, 'Gagal menyimpan booking.'));
                    }

                    window.location.href = `/booking/${data.bookingId}/review`;
                } catch (error) {
                    showAlert('danger', error.message || 'Terjadi kesalahan saat menyimpan booking.');
                } finally {
                    submitBookingBtn.disabled = false;
                    submitBookingBtn.textContent = 'Simpan Booking';
                }
            }

            function resetSeatSelection(keepSeatInventory = false) {
                selectedSeats.clear();
                passengerState.clear();
                renderPassengerFields();
                resetQuote();
                clearAlert();
                renderSeatGrid(keepSeatInventory ? latestSeatItems : []);
            }

            passengerCountEl.addEventListener('change', function () {
                resetSeatSelection(true);
            });

            [fromEl, toEl, dateEl, timeEl].forEach(function (element) {
                element.addEventListener('change', function () {
                    latestSeatItems = [];
                    resetSeatSelection(false);
                });
            });

            loadSeatsBtn.addEventListener('click', loadSeats);
            quoteBtn.addEventListener('click', calculateQuote);
            form.addEventListener('submit', submitBooking);

            loadStops();
            renderSeatGrid();
            renderPassengerFields();
            resetQuote();
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initRegulerBookingPage, { once: true });
        } else {
            initRegulerBookingPage();
        }
    </script>
@endpush
