@extends('layouts.dashboard')

@section('content')
<section class="ddrop-page animate-fade-in">

    {{-- Page Header --}}
    <section class="ddrop-header">
        <div class="ddrop-header-copy">
            <h1>Data Pemesanan Dropping</h1>
            <p>Kelola seluruh data pemesanan dropping JET (JAYA EXCECUTIVE TRANSPORT).</p>
        </div>
        <div class="ddrop-header-actions">
            <button class="ddrop-btn-primary" type="button" id="btn-open-create">
                <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Tambah Data Dropping
            </button>
        </div>
    </section>

    {{-- Flash --}}
    @if ($flashSuccess)
        <div class="ddrop-flash ddrop-flash--success">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            {{ $flashSuccess }}
        </div>
    @endif
    @if ($flashError)
        <div class="ddrop-flash ddrop-flash--error">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M12 8V13M12 16V16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            {{ $flashError }}
        </div>
    @endif
    @if ($errors->any())
        <div class="ddrop-flash ddrop-flash--error">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M12 8V13M12 16V16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            <div>
                @foreach ($errors->all() as $error)
                    <div>{{ $error }}</div>
                @endforeach
            </div>
        </div>
    @endif

    {{-- Stats --}}
    <div class="ddrop-stats">
        <div class="ddrop-stat">
            <span class="ddrop-stat-label">Total Dropping</span>
            <strong class="ddrop-stat-value">{{ $stats['total'] }}</strong>
        </div>
        <div class="ddrop-stat ddrop-stat--green">
            <span class="ddrop-stat-label">Sudah Bayar</span>
            <strong class="ddrop-stat-value">{{ $stats['paid'] }}</strong>
        </div>
        <div class="ddrop-stat ddrop-stat--orange">
            <span class="ddrop-stat-label">Belum Bayar</span>
            <strong class="ddrop-stat-value">{{ $stats['unpaid'] }}</strong>
        </div>
    </div>

    {{-- Search + Filter --}}
    <form method="GET" action="{{ route('dropping-data.index') }}" class="ddrop-filter-bar">
        <div class="ddrop-search-wrap">
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8"/><path d="M20 20L17 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
            <input type="search" name="search" value="{{ $search }}" placeholder="Cari nama, no HP, kode booking, rute…" class="ddrop-search-input">
        </div>
        <select name="status" class="ddrop-select">
            <option value="">Semua Status</option>
            <option value="Belum Bayar" @selected($filterStatus === 'Belum Bayar')>Belum Bayar</option>
            <option value="Menunggu Konfirmasi" @selected($filterStatus === 'Menunggu Konfirmasi')>Menunggu Konfirmasi</option>
            <option value="Dibayar" @selected($filterStatus === 'Dibayar')>Dibayar (Transfer/QRIS)</option>
            <option value="Dibayar Tunai" @selected($filterStatus === 'Dibayar Tunai')>Dibayar Tunai</option>
        </select>
        <button type="submit" class="ddrop-btn-filter">Filter</button>
        @if ($search !== '' || $filterStatus !== '')
            <a href="{{ route('dropping-data.index') }}" class="ddrop-btn-reset">Reset</a>
        @endif
    </form>

    {{-- Table --}}
    <div class="ddrop-table-card">
        <div class="ddrop-table-wrap">
            <table class="ddrop-table">
                <thead>
                    <tr>
                        <th class="ddrop-col-no">#</th>
                        <th>Kode / Status</th>
                        <th>Nama Pemesan</th>
                        <th>Rute</th>
                        <th>Tgl & Jam</th>
                        <th>Tarif Final</th>
                        <th>Driver</th>
                        <th>Mobil</th>
                        <th>Keterangan</th>
                        <th class="ddrop-col-aksi">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($bookings as $booking)
                        @php
                            $tripTime = substr($booking->trip_time ?? '', 0, 5);
                            $isPaid   = in_array($booking->payment_status, ['Dibayar', 'Dibayar Tunai']);
                            $badgeClass = match((string)$booking->payment_status) {
                                'Dibayar', 'Dibayar Tunai'       => 'ddrop-badge--green',
                                'Menunggu Konfirmasi'            => 'ddrop-badge--blue',
                                default                          => 'ddrop-badge--orange',
                            };
                            $pricePerSeat    = (int)($booking->price_per_seat ?? 0);
                            $totalAmt        = (int)($booking->total_amount ?? 0);
                            $additionalFare  = max(0, $totalAmt - $pricePerSeat);
                            $rowData = json_encode([
                                'id'               => $booking->id,
                                'version'          => $booking->version,
                                'booking_code'     => $booking->booking_code,
                                'passenger_name'   => $booking->passenger_name,
                                'passenger_phone'  => $booking->passenger_phone,
                                'from_city'        => $booking->from_city,
                                'to_city'          => $booking->to_city,
                                'pickup_location'  => $booking->pickup_location,
                                'dropoff_location' => $booking->dropoff_location,
                                'price_per_seat'   => $pricePerSeat,
                                'additional_fare'  => $additionalFare,
                                'total_amount'     => $totalAmt,
                                'trip_date'        => $booking->trip_date?->format('Y-m-d') ?? '',
                                'trip_date_fmt'    => $booking->trip_date?->translatedFormat('d F Y') ?? '-',
                                'trip_time'        => $tripTime,
                                'notes'            => $booking->notes ?? '',
                                'payment_method'   => $booking->payment_method ?? '',
                                'payment_status'   => $booking->payment_status ?? '',
                                'booking_status'   => $booking->booking_status ?? '',
                                'has_ticket'       => (bool)$booking->ticket_number,
                                'driver_id'        => $booking->driver_id ?? '',
                                'driver_name'      => $booking->driver?->nama ?? ($booking->driver_name ?? ''),
                                'mobil_id'         => $booking->mobil_id ?? '',
                                'kode_mobil'       => $booking->mobil?->kode_mobil ?? '',
                                'jenis_mobil'      => $booking->mobil?->jenis_mobil ?? '',
                            ], JSON_UNESCAPED_UNICODE);
                        @endphp
                        <tr class="ddrop-tr" data-row='{{ $rowData }}'>
                            <td class="ddrop-col-no ddrop-td-center">{{ $bookings->firstItem() + $loop->index }}</td>
                            <td>
                                <div class="ddrop-code">{{ $booking->booking_code }}</div>
                                <span class="ddrop-badge {{ $badgeClass }}">{{ $booking->payment_status }}</span>
                            </td>
                            <td>
                                <div class="ddrop-name">{{ $booking->passenger_name }}</div>
                                <div class="ddrop-phone">{{ $booking->passenger_phone }}</div>
                            </td>
                            <td>
                                <div class="ddrop-route">{{ $booking->from_city }} → {{ $booking->to_city }}</div>
                                <div class="ddrop-address-hint">{{ Str::limit($booking->pickup_location ?? '', 40) }}</div>
                            </td>
                            <td>
                                <div class="ddrop-date">{{ $booking->trip_date?->translatedFormat('d M Y') ?? '-' }}</div>
                                <div class="ddrop-time">{{ $tripTime }} WIB</div>
                            </td>
                            <td class="ddrop-tarif">
                                Rp {{ number_format((int)($booking->total_amount ?? 0), 0, ',', '.') }}
                            </td>
                            <td>
                                @if ($booking->driver)
                                    <div class="ddrop-name" style="font-size:0.83rem">{{ $booking->driver->nama }}</div>
                                    @if ($booking->driver->lokasi)
                                        <div class="ddrop-phone">{{ $booking->driver->lokasi }}</div>
                                    @endif
                                @else
                                    <span style="color:#cbd5e1">—</span>
                                @endif
                            </td>
                            <td>
                                @if ($booking->mobil)
                                    <div class="ddrop-name" style="font-size:0.83rem">{{ $booking->mobil->kode_mobil }}</div>
                                    <div class="ddrop-phone">{{ $booking->mobil->jenis_mobil }}</div>
                                @else
                                    <span style="color:#cbd5e1">—</span>
                                @endif
                            </td>
                            <td>
                                <div class="ddrop-notes">{{ Str::limit($booking->notes ?? '-', 50) }}</div>
                            </td>
                            <td class="ddrop-col-aksi">
                                <div class="ddrop-actions">
                                    <button type="button" class="ddrop-action-btn ddrop-action-btn--show" title="Lihat Detail" data-action="show">
                                        <svg viewBox="0 0 24 24" fill="none" width="15" height="15"><path d="M12 5C7 5 2.73 8.11 1 12.5 2.73 16.89 7 20 12 20s9.27-3.11 11-7.5C21.27 8.11 17 5 12 5Z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12.5" r="3" stroke="currentColor" stroke-width="1.8"/></svg>
                                    </button>
                                    <button type="button" class="ddrop-action-btn ddrop-action-btn--edit" title="Edit" data-action="edit">
                                        <svg viewBox="0 0 24 24" fill="none" width="15" height="15"><path d="M11 4H4C3.44772 4 3 4.44772 3 5V20C3 20.5523 3.44772 21 4 21H19C19.5523 21 20 20.5523 20 20V13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M18.5 2.5C19.3284 1.67157 20.6716 1.67157 21.5 2.5C22.3284 3.32843 22.3284 4.67157 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
                                    </button>
                                    <a href="{{ route('dl.tiket-dropping', $booking->booking_code) }}" class="ddrop-action-btn ddrop-action-btn--ticket" title="Download E-Tiket">
                                        <svg viewBox="0 0 24 24" fill="none" width="15" height="15"><path d="M12 3V15M12 15L8 11M12 15L16 11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 17V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                                    </a>
                                    <a href="{{ route('dl.surat-jalan', $booking->booking_code) }}" class="ddrop-action-btn ddrop-action-btn--sj" title="Download Surat Jalan">
                                        <svg viewBox="0 0 24 24" fill="none" width="15" height="15"><path d="M14 2H6C5.44772 2 5 2.44772 5 3V21C5 21.5523 5.44772 22 6 22H18C18.5523 22 19 21.5523 19 21V7L14 2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 2V7H19" stroke="currentColor" stroke-width="1.8"/><path d="M9 12H15M9 16H13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                                    </a>
                                    <button type="button" class="ddrop-action-btn ddrop-action-btn--delete" title="Hapus" data-action="delete">
                                        <svg viewBox="0 0 24 24" fill="none" width="15" height="15"><path d="M3 6H21M8 6V4H16V6M19 6L18 20C18 20.5523 17.5523 21 17 21H7C6.44772 21 6 20.5523 6 20L5 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="10" class="ddrop-empty">
                                <svg viewBox="0 0 24 24" fill="none" width="40" height="40"><path d="M9 17H5C3.89543 17 3 16.1046 3 15V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V15C21 16.1046 20.1046 17 19 17H15M9 17L7 21H17L15 17M9 17H15" stroke="currentColor" stroke-width="1.5"/></svg>
                                <p>Belum ada data pemesanan dropping.</p>
                                <button type="button" class="ddrop-btn-primary" id="btn-open-create-empty">Tambah Data Dropping</button>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        {{-- Pagination --}}
        @if ($bookings->hasPages())
            <div class="ddrop-pagination">
                {{ $bookings->links() }}
            </div>
        @endif
    </div>

</section>

{{-- ══════════════════════════════════════════════════════════
     MODAL: CREATE
══════════════════════════════════════════════════════════ --}}
<dialog id="modal-create" class="ddrop-modal">
    <div class="ddrop-modal-box ddrop-modal-box--lg">
        <div class="ddrop-modal-head">
            <h2>Tambah Data Dropping</h2>
            <button type="button" class="ddrop-modal-close" data-close-modal="modal-create">
                <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
        </div>
        <form method="POST" action="{{ route('dropping-data.store') }}" class="ddrop-modal-form">
            @csrf
            @include('dropping-data.partials.form-fields', ['mode' => 'create', 'booking' => null])
            <div class="ddrop-modal-actions">
                <button type="button" class="ddrop-btn-ghost" data-close-modal="modal-create">Batal</button>
                <button type="submit" class="ddrop-btn-primary">Simpan Data</button>
            </div>
        </form>
    </div>
</dialog>

{{-- ══════════════════════════════════════════════════════════
     MODAL: EDIT
══════════════════════════════════════════════════════════ --}}
<dialog id="modal-edit" class="ddrop-modal">
    <div class="ddrop-modal-box ddrop-modal-box--lg">
        <div class="ddrop-modal-head">
            <h2>Edit Data Dropping</h2>
            <button type="button" class="ddrop-modal-close" data-close-modal="modal-edit">
                <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
        </div>
        <form method="POST" id="form-edit" action="" class="ddrop-modal-form">
            @csrf
            @method('PUT')
            @include('dropping-data.partials.form-fields', ['mode' => 'edit', 'booking' => null])
            <div class="ddrop-modal-actions">
                <button type="button" class="ddrop-btn-ghost" data-close-modal="modal-edit">Batal</button>
                <button type="submit" class="ddrop-btn-primary">Simpan Perubahan</button>
            </div>
        </form>
    </div>
</dialog>

{{-- ══════════════════════════════════════════════════════════
     MODAL: SHOW
══════════════════════════════════════════════════════════ --}}
<dialog id="modal-show" class="ddrop-modal">
    <div class="ddrop-modal-box ddrop-modal-box--lg">
        <div class="ddrop-modal-head">
            <h2>Detail Pemesanan Dropping</h2>
            <button type="button" class="ddrop-modal-close" data-close-modal="modal-show">
                <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
        </div>
        <div class="ddrop-detail-grid" id="show-detail-grid">
            {{-- populated by JS --}}
        </div>
        <div class="ddrop-modal-actions">
            <button type="button" class="ddrop-btn-ghost" data-close-modal="modal-show">Tutup</button>
        </div>
    </div>
</dialog>

{{-- ══════════════════════════════════════════════════════════
     MODAL: SWAP CONFIRM (Sesi 50 PR #4)
══════════════════════════════════════════════════════════ --}}
<dialog id="modal-swap-confirm" class="ddrop-modal">
    <div class="ddrop-modal-box ddrop-modal-box--lg">
        <div class="ddrop-modal-head ddrop-modal-head--warning">
            <h2>⚠️ Konfirmasi Penyesuaian Trip Planning</h2>
            <button type="button" class="ddrop-modal-close" data-close-modal="modal-swap-confirm">
                <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
        </div>
        <div class="ddrop-swap-body">
            <div id="swap-conflict-info" class="ddrop-swap-info">
                {{-- populated by JS dari response 409 --}}
            </div>

            <div class="ddrop-form-field">
                <label>Mobil Pengganti untuk Slot Asal</label>
                <select id="swap-replacement-mobil" name="replacement_mobil_id" class="ddrop-form-select">
                    <option value="">— Tidak ada (peer ikut Trip yang Keluar Trip) —</option>
                    {{-- options populated by JS --}}
                </select>
                <small style="font-size:0.78rem;color:#64748b;margin-top:6px;display:block">
                    Penumpang reguler aktif akan otomatis dipindah ke mobil pengganti yang Anda pilih.
                </small>
            </div>
        </div>
        <div class="ddrop-modal-actions">
            <button type="button" class="ddrop-btn-ghost" data-close-modal="modal-swap-confirm">Batal</button>
            <button type="button" id="swap-confirm-btn" class="ddrop-btn-primary">Lanjutkan</button>
        </div>
    </div>
</dialog>

{{-- ══════════════════════════════════════════════════════════
     MODAL: DELETE
══════════════════════════════════════════════════════════ --}}
<dialog id="modal-delete" class="ddrop-modal">
    <div class="ddrop-modal-box">
        <div class="ddrop-modal-head ddrop-modal-head--danger">
            <h2>Hapus Data Dropping</h2>
            <button type="button" class="ddrop-modal-close" data-close-modal="modal-delete">
                <svg viewBox="0 0 24 24" fill="none" width="20" height="20"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
        </div>
        <div class="ddrop-delete-body">
            <svg viewBox="0 0 24 24" fill="none" width="48" height="48" style="color:#ef4444"><path d="M3 6H21M8 6V4H16V6M19 6L18 20C18 20.5523 17.5523 21 17 21H7C6.44772 21 6 20.5523 6 20L5 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <p>Anda yakin ingin menghapus data pemesanan dropping</p>
            <strong id="delete-booking-code">—</strong>
            <p style="color:#64748b;font-size:0.85rem;margin-top:6px">Tindakan ini tidak dapat dibatalkan. Seluruh data penumpang akan ikut terhapus.</p>
        </div>
        <form method="POST" id="form-delete" action="">
            @csrf
            @method('DELETE')
            <div class="ddrop-modal-actions">
                <button type="button" class="ddrop-btn-ghost" data-close-modal="modal-delete">Batal</button>
                <button type="submit" class="ddrop-btn-danger">Ya, Hapus</button>
            </div>
        </form>
    </div>
</dialog>

<style>
/* ── PAGE ── */
.ddrop-page { padding: 0; }

.ddrop-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 20px;
}
.ddrop-header-copy h1 { font-size: 1.45rem; font-weight: 800; color: #0f172a; margin: 0 0 4px; }
.ddrop-header-copy p  { color: #64748b; font-size: 0.9rem; margin: 0; }

/* ── FLASH ── */
.ddrop-flash {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 12px 16px;
    border-radius: 10px;
    margin-bottom: 16px;
    font-size: 0.9rem;
    font-weight: 500;
}
.ddrop-flash--success { background: #d1fae5; color: #065f46; }
.ddrop-flash--error   { background: #fee2e2; color: #991b1b; }

/* ── STATS ── */
.ddrop-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin-bottom: 20px;
}
.ddrop-stat {
    background: #fff;
    border: 1px solid rgba(148,163,184,0.3);
    border-radius: 12px;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 6px;
}
.ddrop-stat--green  { border-left: 4px solid #10b981; }
.ddrop-stat--orange { border-left: 4px solid #f59e0b; }
.ddrop-stat-label   { font-size: 0.78rem; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: .04em; }
.ddrop-stat-value   { font-size: 1.8rem; font-weight: 800; color: #0f172a; }

/* ── FILTER BAR ── */
.ddrop-filter-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 18px;
}
.ddrop-search-wrap {
    flex: 1;
    min-width: 220px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: #fff;
    border: 1px solid rgba(148,163,184,0.4);
    border-radius: 8px;
    padding: 0 14px;
    height: 40px;
    color: #94a3b8;
}
.ddrop-search-input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 0.88rem;
    background: transparent;
    color: #0f172a;
}
.ddrop-select {
    height: 40px;
    padding: 0 12px;
    border: 1px solid rgba(148,163,184,0.4);
    border-radius: 8px;
    font-size: 0.88rem;
    background: #fff;
    color: #0f172a;
    cursor: pointer;
}
.ddrop-btn-filter {
    height: 40px;
    padding: 0 18px;
    background: #047857;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
}
.ddrop-btn-reset {
    height: 40px;
    padding: 0 14px;
    color: #64748b;
    border: 1px solid rgba(148,163,184,0.4);
    border-radius: 8px;
    font-size: 0.88rem;
    font-weight: 500;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    background: #fff;
}

/* ── TABLE CARD ── */
.ddrop-table-card {
    background: #fff;
    border: 1px solid rgba(148,163,184,0.3);
    border-radius: 14px;
    overflow: hidden;
}
.ddrop-table-wrap { overflow-x: auto; }
.ddrop-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 900px;
}
.ddrop-table thead th {
    background: #f8fafc;
    color: #475569;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .04em;
    padding: 12px 14px;
    border-bottom: 1px solid rgba(148,163,184,0.25);
    white-space: nowrap;
    text-align: left;
}
.ddrop-table tbody td {
    padding: 12px 14px;
    border-bottom: 1px solid rgba(148,163,184,0.15);
    vertical-align: middle;
    font-size: 0.875rem;
    color: #1e293b;
}
.ddrop-tr:last-child td { border-bottom: none; }
.ddrop-tr:hover td { background: #f8fafc; }
.ddrop-col-no   { width: 42px; text-align: center; }
.ddrop-col-aksi { width: 180px; }
.ddrop-td-center { text-align: center; }

/* ── TABLE CELL CONTENT ── */
.ddrop-code  { font-weight: 700; color: #047857; font-size: 0.8rem; font-family: monospace; }
.ddrop-badge { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 0.7rem; font-weight: 700; margin-top: 4px; }
.ddrop-badge--green  { background: rgba(16,185,129,.12); color: #047857; }
.ddrop-badge--blue   { background: rgba(37,99,235,.1);   color: #1d4ed8; }
.ddrop-badge--orange { background: rgba(245,158,11,.12); color: #b45309; }
.ddrop-name  { font-weight: 600; color: #0f172a; }
.ddrop-phone { font-size: 0.8rem; color: #64748b; margin-top: 2px; }
.ddrop-route { font-weight: 600; color: #0f172a; font-size: 0.85rem; }
.ddrop-address-hint { font-size: 0.75rem; color: #94a3b8; margin-top: 2px; }
.ddrop-date  { font-weight: 600; color: #0f172a; font-size: 0.85rem; }
.ddrop-time  { font-size: 0.8rem; color: #64748b; }
.ddrop-tarif { font-weight: 700; color: #0f172a; white-space: nowrap; }
.ddrop-notes { font-size: 0.82rem; color: #64748b; }
.ddrop-empty {
    text-align: center;
    padding: 60px 24px;
    color: #94a3b8;
}
.ddrop-empty svg { margin: 0 auto 12px; display: block; color: #cbd5e1; }
.ddrop-empty p { margin: 0 0 16px; font-size: 0.95rem; }

/* ── ROW ACTIONS ── */
.ddrop-actions { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
.ddrop-action-btn {
    width: 32px; height: 32px;
    border-radius: 7px;
    border: 1px solid;
    display: inline-flex; align-items: center; justify-content: center;
    cursor: pointer;
    text-decoration: none;
    transition: background .15s;
}
.ddrop-action-btn--show   { border-color: rgba(16,185,129,.3);  color: #047857; background: rgba(16,185,129,.06); }
.ddrop-action-btn--edit   { border-color: rgba(37,99,235,.3);   color: #2563eb; background: rgba(37,99,235,.06); }
.ddrop-action-btn--ticket { border-color: rgba(245,158,11,.3);  color: #b45309; background: rgba(245,158,11,.06); }
.ddrop-action-btn--sj     { border-color: rgba(139,92,246,.3);  color: #7c3aed; background: rgba(139,92,246,.06); }
.ddrop-action-btn--delete { border-color: rgba(239,68,68,.3);   color: #dc2626; background: rgba(239,68,68,.06); }
.ddrop-action-btn:hover { filter: brightness(.92); }

/* ── PAGINATION ── */
.ddrop-pagination { padding: 16px 20px; border-top: 1px solid rgba(148,163,184,.2); }
.ddrop-pagination nav { display: flex; justify-content: center; }

/* ── BUTTONS ── */
.ddrop-btn-primary {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 10px 20px; background: #047857; color: #fff;
    border: none; border-radius: 9px; font-size: 0.9rem; font-weight: 700;
    cursor: pointer; text-decoration: none;
}
.ddrop-btn-ghost {
    padding: 10px 20px; background: transparent; color: #475569;
    border: 1px solid rgba(148,163,184,.4); border-radius: 9px;
    font-size: 0.9rem; font-weight: 600; cursor: pointer;
}
.ddrop-btn-danger {
    padding: 10px 20px; background: #dc2626; color: #fff;
    border: none; border-radius: 9px; font-size: 0.9rem; font-weight: 700; cursor: pointer;
}

/* ── MODAL ── */
.ddrop-modal {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(15,23,42,.55);
    border: none; padding: 0; margin: 0;
    width: 100%; height: 100%;
    display: none;
    align-items: center; justify-content: center;
}
.ddrop-modal[open] { display: flex; }
.ddrop-modal-box {
    background: #fff; border-radius: 16px;
    width: 100%; max-width: 540px;
    max-height: 90vh; overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0,0,0,.18);
    animation: ddropSlideIn .18s ease-out;
}
.ddrop-modal-box--lg { max-width: 720px; }
@keyframes ddropSlideIn {
    from { transform: translateY(-16px); opacity: 0; }
    to   { transform: translateY(0);     opacity: 1; }
}
.ddrop-modal-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 24px 16px;
    border-bottom: 1px solid rgba(148,163,184,.2);
}
.ddrop-modal-head h2 { font-size: 1.05rem; font-weight: 800; color: #0f172a; margin: 0; }
.ddrop-modal-head--danger h2 { color: #dc2626; }
.ddrop-modal-head--warning h2 { color: #b45309; }
.ddrop-swap-body {
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 14px;
}
.ddrop-swap-info {
    background: #fef3c7;
    border: 1px solid rgba(245,158,11,.4);
    border-radius: 10px;
    padding: 14px 16px;
    font-size: 0.88rem;
    color: #78350f;
    line-height: 1.55;
}
.ddrop-swap-info strong { color: #92400e; }
.ddrop-swap-info ul { margin: 8px 0 0; padding-left: 18px; }
.ddrop-swap-info li { margin-bottom: 4px; }
.ddrop-modal-close {
    width: 32px; height: 32px; border-radius: 8px; border: none;
    background: rgba(148,163,184,.12); color: #64748b; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
}
.ddrop-modal-form { padding: 20px 24px; }
.ddrop-modal-actions {
    display: flex; justify-content: flex-end; gap: 10px;
    padding: 16px 24px;
    border-top: 1px solid rgba(148,163,184,.15);
}

/* ── FORM FIELDS (in modal) ── */
.ddrop-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
}
.ddrop-form-grid--full { grid-template-columns: 1fr; }
.ddrop-form-field { display: flex; flex-direction: column; gap: 6px; }
.ddrop-form-field.col-span-2 { grid-column: span 2; }
.ddrop-form-field label { font-size: 0.8rem; font-weight: 700; color: #374151; }
.ddrop-form-field label .req { color: #dc2626; margin-left: 2px; }
.ddrop-form-input, .ddrop-form-select, .ddrop-form-textarea {
    width: 100%;
    border: 1px solid rgba(148,163,184,.45);
    border-radius: 8px;
    padding: 9px 12px;
    font-size: 0.88rem;
    color: #0f172a;
    background: #fff;
    outline: none;
    transition: border .15s;
    box-sizing: border-box;
}
.ddrop-form-input:focus, .ddrop-form-select:focus, .ddrop-form-textarea:focus {
    border-color: #059669;
    box-shadow: 0 0 0 3px rgba(5,150,105,.12);
}
.ddrop-form-textarea { resize: vertical; min-height: 70px; }
.ddrop-section-divider {
    grid-column: span 2;
    padding: 10px 0 4px;
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: .06em;
    color: #047857;
    border-bottom: 1px solid rgba(16,185,129,.2);
}

/* ── DETAIL GRID (show modal) ── */
.ddrop-detail-grid {
    padding: 20px 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
}
.ddrop-detail-item { display: flex; flex-direction: column; gap: 4px; }
.ddrop-detail-item.col-span-2 { grid-column: span 2; }
.ddrop-detail-label { font-size: 0.72rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: .04em; }
.ddrop-detail-value { font-size: 0.92rem; font-weight: 600; color: #0f172a; }

/* ── DELETE MODAL ── */
.ddrop-delete-body {
    padding: 28px 24px 20px;
    text-align: center;
    color: #0f172a;
}
.ddrop-delete-body p { margin: 8px 0 0; font-size: 0.92rem; }
.ddrop-delete-body strong { display: block; margin-top: 6px; font-size: 1rem; color: #dc2626; font-family: monospace; }
</style>
@endsection
