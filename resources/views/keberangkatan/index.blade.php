@extends('layouts.dashboard')

@section('content')
    <section class="keberangkatan-page animate-fade-in" data-keberangkatan-page>
        <section class="keberangkatan-page-header">
            <div class="keberangkatan-page-copy">
                <h1>Data Keberangkatan</h1>
                <p>Kelola data keberangkatan Pekanbaru</p>
            </div>

            <div class="keberangkatan-page-actions">
                <button
                    class="keberangkatan-secondary-button"
                    type="button"
                    id="keberangkatan-export-btn"
                    data-testid="export-keberangkatan-btn"
                >
                    <span class="keberangkatan-button-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M12 3V15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5 19H19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </span>
                    <span>Export CSV</span>
                </button>

                <button
                    class="keberangkatan-primary-button"
                    type="button"
                    id="keberangkatan-add-btn"
                    data-testid="add-keberangkatan-btn"
                >
                    <span class="keberangkatan-button-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M12 5V19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M5 12H19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </span>
                    <span>Tambah Data</span>
                </button>
            </div>
        </section>

        <section class="keberangkatan-search-card">
            <div class="keberangkatan-search-field">
                <span class="keberangkatan-search-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8"/>
                        <path d="M20 20L17 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    </svg>
                </span>
                <input
                    id="keberangkatan-search-input"
                    type="search"
                    placeholder="Cari kode mobil, driver, atau status..."
                    autocomplete="off"
                    data-testid="search-keberangkatan-input"
                >
            </div>
        </section>

        <section class="keberangkatan-table-card">
            <div class="keberangkatan-table-wrap">
                <table class="keberangkatan-table">
                    <thead>
                        <tr>
                            <th>Hari</th>
                            <th>Tanggal</th>
                            <th>Kode Mobil</th>
                            <th>Driver</th>
                            <th class="text-right">Penumpang</th>
                            <th class="text-right">Uang Penumpang</th>
                            <th class="text-right">Paket</th>
                            <th class="text-right">Uang Paket</th>
                            <th class="text-right">Snack</th>
                            <th class="text-right">Air Mineral</th>
                            <th class="text-right">Uang PC (15%)</th>
                            <th class="text-right">Uang Bersih</th>
                            <th class="text-center">Validasi</th>
                            <th class="text-center">Trip</th>
                            <th class="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="keberangkatan-table-body">
                        <tr>
                            <td colspan="15" class="keberangkatan-table-state">
                                <div class="keberangkatan-loading-inline">
                                    <span class="keberangkatan-loading-inline-spinner" aria-hidden="true"></span>
                                    <span>Memuat data...</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="keberangkatan-mobile-list" id="keberangkatan-mobile-list" hidden></div>

            <div class="keberangkatan-pagination" id="keberangkatan-pagination-shell" hidden>
                <p class="keberangkatan-pagination-copy" id="keberangkatan-pagination-info">Menampilkan 0 - 0 dari 0 data</p>

                <div class="keberangkatan-pagination-controls">
                    <button
                        class="keberangkatan-pagination-button"
                        id="keberangkatan-prev-page-btn"
                        type="button"
                        data-testid="prev-page-btn"
                        aria-label="Halaman sebelumnya"
                    >
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <span class="keberangkatan-pagination-page" id="keberangkatan-pagination-page">1 / 1</span>

                    <button
                        class="keberangkatan-pagination-button"
                        id="keberangkatan-next-page-btn"
                        type="button"
                        data-testid="next-page-btn"
                        aria-label="Halaman berikutnya"
                    >
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </section>

        <div class="modal-shell" id="keberangkatan-form-modal" hidden>
            <div class="modal-backdrop" data-modal-close="keberangkatan-form-modal"></div>

            <div class="modal-card keberangkatan-dialog-card keberangkatan-dialog-card-large">
                <div class="keberangkatan-dialog-head">
                    <div>
                        <h3 id="keberangkatan-form-title">Tambah Data Keberangkatan</h3>
                        <p id="keberangkatan-form-description">Isi form di bawah untuk menambahkan data keberangkatan</p>
                    </div>
                    <button type="button" class="keberangkatan-dialog-close" data-modal-close="keberangkatan-form-modal" aria-label="Tutup">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>

                <form id="keberangkatan-form" class="keberangkatan-form">
                    <input type="hidden" name="id" id="keberangkatan-id">

                    <div class="keberangkatan-form-section">
                        <div class="keberangkatan-form-section-head">
                            <h4>Informasi Keberangkatan</h4>
                            <p>Tentukan tanggal, armada, driver, dan trip yang berjalan.</p>
                        </div>

                        <div class="keberangkatan-form-grid">
                            <div class="keberangkatan-form-group">
                                <label for="keberangkatan-tanggal">Tanggal</label>
                                <div class="keberangkatan-input-shell">
                                    <span class="keberangkatan-input-icon" aria-hidden="true">
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <rect x="4" y="5" width="16" height="15" rx="3" stroke="currentColor" stroke-width="1.8"/>
                                            <path d="M8 3V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                            <path d="M16 3V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                            <path d="M4 10H20" stroke="currentColor" stroke-width="1.8"/>
                                        </svg>
                                    </span>
                                    <input
                                        id="keberangkatan-tanggal"
                                        type="date"
                                        name="tanggal"
                                        required
                                        data-testid="date-picker-trigger"
                                    >
                                </div>
                            </div>

                            <div class="keberangkatan-form-group">
                                <label for="keberangkatan-kode-mobil">Kode Mobil</label>
                                <div class="keberangkatan-select-shell">
                                    <select id="keberangkatan-kode-mobil" name="kode_mobil" required data-testid="select-kode-mobil">
                                        <option value="">Pilih mobil</option>
                                    </select>
                                    <span class="keberangkatan-select-chevron" aria-hidden="true">
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <div class="keberangkatan-form-group">
                                <label for="keberangkatan-driver-id">Driver</label>
                                <div class="keberangkatan-select-shell">
                                    <select id="keberangkatan-driver-id" name="driver_id" required data-testid="select-driver">
                                        <option value="">Pilih driver</option>
                                    </select>
                                    <span class="keberangkatan-select-chevron" aria-hidden="true">
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <div class="keberangkatan-form-group">
                                <label for="keberangkatan-trip-ke">Trip Ke</label>
                                <div class="keberangkatan-input-shell">
                                    <input
                                        id="keberangkatan-trip-ke"
                                        type="number"
                                        min="1"
                                        name="trip_ke"
                                        value="1"
                                        required
                                        data-testid="input-trip-ke"
                                    >
                                </div>
                            </div>

                            <div class="keberangkatan-form-group">
                                <label for="keberangkatan-status-pembayaran">Validasi Pembayaran</label>
                                <div class="keberangkatan-select-shell">
                                    <select
                                        id="keberangkatan-status-pembayaran"
                                        name="status_pembayaran"
                                        required
                                        data-testid="select-status-pembayaran"
                                    >
                                        <option value="Belum Lunas">Belum Lunas</option>
                                        <option value="Lunas">Lunas</option>
                                    </select>
                                    <span class="keberangkatan-select-chevron" aria-hidden="true">
                                        <svg viewBox="0 0 24 24" fill="none">
                                            <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="keberangkatan-form-section">
                        <div class="keberangkatan-form-section-head">
                            <h4>Penumpang dan Paket</h4>
                            <p>Isi jumlah penumpang, tarif, dan paket untuk hitungan pendapatan.</p>
                        </div>

                        <div class="keberangkatan-form-grid">
                            <div class="keberangkatan-form-group">
                                <label for="keberangkatan-jumlah-penumpang">Jumlah Penumpang</label>
                                <div class="keberangkatan-input-shell">
                                    <input
                                        id="keberangkatan-jumlah-penumpang"
                                        type="number"
                                        min="0"
                                        name="jumlah_penumpang"
                                        value="0"
                                        required
                                        data-testid="input-jumlah-penumpang"
                                    >
                                </div>
                            </div>

                            <div class="keberangkatan-form-group">
                                <label for="keberangkatan-tarif-penumpang">Tarif per Penumpang (Rp)</label>
                                <div class="keberangkatan-input-shell">
                                    <input
                                        id="keberangkatan-tarif-penumpang"
                                        type="number"
                                        min="0"
                                        step="1000"
                                        name="tarif_penumpang"
                                        value="150000"
                                        required
                                        data-testid="input-tarif-penumpang"
                                    >
                                </div>
                            </div>

                            <div class="keberangkatan-form-group">
                                <label for="keberangkatan-jumlah-paket">Jumlah Paket</label>
                                <div class="keberangkatan-input-shell">
                                    <input
                                        id="keberangkatan-jumlah-paket"
                                        type="number"
                                        min="0"
                                        name="jumlah_paket"
                                        value="0"
                                        required
                                        data-testid="input-jumlah-paket"
                                    >
                                </div>
                            </div>

                            <div class="keberangkatan-form-group">
                                <label for="keberangkatan-uang-paket">Total Uang Paket (Rp)</label>
                                <div class="keberangkatan-input-shell">
                                    <input
                                        id="keberangkatan-uang-paket"
                                        type="number"
                                        min="0"
                                        step="1000"
                                        name="uang_paket"
                                        value="0"
                                        required
                                        data-testid="input-uang-paket"
                                    >
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="keberangkatan-form-section">
                        <div class="keberangkatan-form-section-head">
                            <h4>Konsumsi Perjalanan</h4>
                            <p>Catat penggunaan snack dan air mineral agar stok harian ikut terpotong otomatis.</p>
                        </div>

                        <div class="keberangkatan-form-grid keberangkatan-form-grid--compact">
                            <div class="keberangkatan-form-group">
                                <label for="keberangkatan-jumlah-snack">Jumlah Snack</label>
                                <div class="keberangkatan-input-shell">
                                    <input
                                        id="keberangkatan-jumlah-snack"
                                        type="number"
                                        min="0"
                                        name="jumlah_snack"
                                        value="0"
                                        required
                                        data-testid="input-jumlah-snack"
                                    >
                                </div>
                            </div>

                            <div class="keberangkatan-form-group">
                                <label for="keberangkatan-jumlah-air-mineral">Jumlah Air Mineral</label>
                                <div class="keberangkatan-input-shell">
                                    <input
                                        id="keberangkatan-jumlah-air-mineral"
                                        type="number"
                                        min="0"
                                        name="jumlah_air_mineral"
                                        value="0"
                                        required
                                        data-testid="input-jumlah-air-mineral"
                                    >
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="keberangkatan-preview-card">
                        <h4>Preview Perhitungan:</h4>
                        <div class="keberangkatan-preview-grid">
                            <div class="keberangkatan-preview-row">
                                <span>Uang Penumpang:</span>
                                <strong data-calc="jumlah_uang_penumpang">Rp0</strong>
                            </div>
                            <div class="keberangkatan-preview-row">
                                <span>Uang Paket:</span>
                                <strong data-calc="uang_paket">Rp0</strong>
                            </div>
                            <div class="keberangkatan-preview-row">
                                <span>Total:</span>
                                <strong data-calc="total">Rp0</strong>
                            </div>
                            <div class="keberangkatan-preview-row is-amber">
                                <span>Uang PC (15%):</span>
                                <strong data-calc="uang_pc">Rp0</strong>
                            </div>
                            <div class="keberangkatan-preview-row is-emerald">
                                <span>Uang Bersih (85%):</span>
                                <strong data-calc="uang_bersih">Rp0</strong>
                            </div>
                            <div class="keberangkatan-preview-row">
                                <span>Snack Digunakan:</span>
                                <strong data-calc="jumlah_snack">0 item</strong>
                            </div>
                            <div class="keberangkatan-preview-row">
                                <span>Air Mineral Digunakan:</span>
                                <strong data-calc="jumlah_air_mineral">0 botol</strong>
                            </div>
                        </div>
                    </div>

                    <p class="keberangkatan-stock-note">
                        Jumlah snack dan air mineral akan otomatis mengurangi stok pada tanggal keberangkatan yang sama.
                    </p>

                    <div class="keberangkatan-dialog-actions">
                        <button class="keberangkatan-secondary-button" type="button" data-modal-close="keberangkatan-form-modal">Batal</button>
                        <button class="keberangkatan-primary-button" type="submit" id="keberangkatan-submit-btn" data-testid="submit-keberangkatan-btn">Simpan</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="modal-shell" id="keberangkatan-delete-modal" hidden>
            <div class="modal-backdrop" data-modal-close="keberangkatan-delete-modal"></div>

            <div class="modal-card keberangkatan-dialog-card keberangkatan-delete-dialog-card">
                <div class="keberangkatan-dialog-head">
                    <div>
                        <h3 class="keberangkatan-delete-title">Hapus Data Keberangkatan</h3>
                        <p class="keberangkatan-delete-description" id="keberangkatan-delete-copy">
                            Apakah Anda yakin ingin menghapus data keberangkatan ini? Tindakan ini tidak dapat dibatalkan.
                        </p>
                    </div>
                    <button type="button" class="keberangkatan-dialog-close" data-modal-close="keberangkatan-delete-modal" aria-label="Tutup">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>

                <div class="keberangkatan-dialog-actions">
                    <button class="keberangkatan-secondary-button" type="button" data-modal-close="keberangkatan-delete-modal">Batal</button>
                    <button class="keberangkatan-danger-button" type="button" id="keberangkatan-delete-confirm-btn" data-testid="confirm-delete-btn">Hapus</button>
                </div>
            </div>
        </div>
    </section>
@endsection
