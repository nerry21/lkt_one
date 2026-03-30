@extends('layouts.dashboard')

@section('content')
    <section class="plkt-page animate-fade-in" data-plkt-page>

        {{-- Header --}}
        <section class="plkt-page-header">
            <div class="plkt-page-copy">
                <h1>Data Penumpang JET (JAYA EXCECUTIVE TRANSPORT)</h1>
                <p>Riwayat seluruh penumpang dan frekuensi pemesanan</p>
            </div>
            <div class="plkt-page-actions">
                <button class="plkt-secondary-button" type="button" id="plkt-export-btn">
                    <span class="plkt-button-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M12 3V15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5 19H19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </span>
                    <span>Export CSV</span>
                </button>
            </div>
        </section>

        {{-- Loyalty Chart Card --}}
        <section class="plkt-chart-card">
            <div class="plkt-chart-head">
                <div>
                    <h2>Frekuensi Pemesanan Penumpang</h2>
                    <p>10 penumpang paling sering memesan (berdasarkan nama &amp; nomor HP)</p>
                </div>
                <div class="plkt-chart-limit-wrap">
                    <label for="plkt-chart-limit" class="plkt-chart-limit-label">Tampilkan</label>
                    <select id="plkt-chart-limit" class="plkt-chart-limit-select">
                        <option value="10" selected>10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                </div>
            </div>
            <div class="plkt-chart-wrap">
                <canvas id="plkt-loyalty-chart" height="260"></canvas>
            </div>
            <p class="plkt-chart-empty" id="plkt-chart-empty" hidden>Belum ada data penumpang.</p>
        </section>

        {{-- Search --}}
        <section class="plkt-search-card">
            <div class="plkt-search-field">
                <span class="plkt-search-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8"/>
                        <path d="M20 20L17 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    </svg>
                </span>
                <input
                    id="plkt-search-input"
                    type="search"
                    placeholder="Cari nama, No HP, rute, atau kode booking..."
                    autocomplete="off"
                >
            </div>
        </section>

        {{-- Table --}}
        <section class="plkt-table-card">
            <div class="plkt-table-wrap">
                <table class="plkt-table">
                    <thead>
                        <tr>
                            <th class="plkt-col-index">#</th>
                            <th>Nama Penumpang</th>
                            <th>No HP</th>
                            <th>Dari</th>
                            <th>Tujuan</th>
                            <th>Tanggal Berangkat</th>
                            <th>Jam</th>
                            <th>Tarif</th>
                            <th class="plkt-col-count">Kali Memesan</th>
                            <th class="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="plkt-table-body">
                        <tr>
                            <td colspan="10" class="plkt-table-state">
                                <div class="plkt-loading-inline">
                                    <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
                                    <span>Memuat data...</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="plkt-pagination" id="plkt-pagination-shell" hidden>
                <p class="plkt-pagination-copy" id="plkt-pagination-info">Menampilkan 0 - 0 dari 0 data</p>
                <div class="plkt-pagination-controls">
                    <button class="plkt-pagination-button" id="plkt-prev-page-btn" type="button" aria-label="Halaman sebelumnya">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <span class="plkt-pagination-page" id="plkt-pagination-page">1 / 1</span>
                    <button class="plkt-pagination-button" id="plkt-next-page-btn" type="button" aria-label="Halaman berikutnya">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </section>

    </section>

    {{-- Edit Modal --}}
    <div class="modal-shell" id="plkt-edit-modal" hidden>
        <div class="modal-backdrop" data-modal-close="plkt-edit-modal"></div>
        <div class="modal-card plkt-dialog-card">
            <div class="plkt-dialog-head">
                <div>
                    <h3>Edit Data Penumpang</h3>
                    <p>Perbarui nama dan nomor HP penumpang</p>
                </div>
                <button type="button" class="plkt-dialog-close" data-modal-close="plkt-edit-modal" aria-label="Tutup">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
            <form id="plkt-edit-form" class="plkt-form">
                <input type="hidden" id="plkt-edit-id">
                <div class="plkt-form-group">
                    <label for="plkt-edit-name">Nama Penumpang</label>
                    <input id="plkt-edit-name" type="text" placeholder="Masukkan nama penumpang" required>
                </div>
                <div class="plkt-form-group">
                    <label for="plkt-edit-phone">Nomor HP</label>
                    <input id="plkt-edit-phone" type="text" placeholder="Contoh: 08117599804">
                </div>
                <div class="plkt-dialog-actions">
                    <button class="plkt-secondary-button" type="button" data-modal-close="plkt-edit-modal">Batal</button>
                    <button class="plkt-primary-button" type="submit" id="plkt-edit-submit-btn">Simpan</button>
                </div>
            </form>
        </div>
    </div>

    {{-- Delete Modal --}}
    <div class="modal-shell" id="plkt-delete-modal" hidden>
        <div class="modal-backdrop" data-modal-close="plkt-delete-modal"></div>
        <div class="modal-card plkt-dialog-card plkt-delete-dialog-card">
            <div class="plkt-dialog-head">
                <div>
                    <h3>Hapus Data Penumpang</h3>
                    <p id="plkt-delete-copy">Apakah Anda yakin ingin menghapus penumpang <strong>-</strong>? Tindakan ini tidak dapat dibatalkan.</p>
                </div>
                <button type="button" class="plkt-dialog-close" data-modal-close="plkt-delete-modal" aria-label="Tutup">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
            <div class="plkt-dialog-actions">
                <button class="plkt-secondary-button" type="button" data-modal-close="plkt-delete-modal">Batal</button>
                <button class="plkt-danger-button" type="button" id="plkt-delete-confirm-btn">Hapus</button>
            </div>
        </div>
    </div>
@endsection
