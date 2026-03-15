@extends('layouts.dashboard')

@section('content')
    <section
        class="stock-page animate-fade-in"
        data-stock-page
        data-stock-snack-price="{{ $stockPrices['snack'] }}"
        data-stock-air-price="{{ $stockPrices['air'] }}"
    >
        <section class="stock-page-header">
            <div class="stock-page-copy">
                <h1>Stok Snack & Air Mineral</h1>
                <p>Kelola stok harian dan pantau pemakaian dari data keberangkatan</p>
            </div>

            <div class="stock-page-actions">
                <button
                    class="stock-primary-button"
                    type="button"
                    id="stock-add-btn"
                    data-testid="add-stock-btn"
                >
                    <span class="stock-button-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M12 5V19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M5 12H19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </span>
                    <span>Tambah Stok</span>
                </button>
            </div>
        </section>

        <section class="stock-search-card">
            <div class="stock-search-field">
                <span class="stock-search-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8"/>
                        <path d="M20 20L17 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    </svg>
                </span>
                <input
                    id="stock-search-input"
                    type="search"
                    placeholder="Cari tanggal, hari, bulan, atau keterangan..."
                    autocomplete="off"
                    data-testid="search-stock-input"
                >
            </div>
        </section>

        <section class="stock-table-card">
            <div class="stock-table-wrap">
                <table class="stock-table">
                    <thead>
                        <tr>
                            <th>Hari</th>
                            <th>Tanggal</th>
                            <th>Bulan</th>
                            <th class="text-right">Total Snack</th>
                            <th class="text-right">Total Air Mineral</th>
                            <th class="text-right">Pengembalian Snack</th>
                            <th class="text-right">Terpakai Snack</th>
                            <th class="text-right">Terpakai Air Mineral</th>
                            <th class="text-right">Sisa Snack</th>
                            <th class="text-right">Sisa Air Mineral</th>
                            <th class="text-right">Nilai Total</th>
                            <th class="text-right">Sisa Nilai Total</th>
                            <th>Keterangan</th>
                            <th class="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="stock-table-body">
                        <tr>
                            <td colspan="14" class="stock-table-state">
                                <div class="stock-loading-inline">
                                    <span class="stock-loading-inline-spinner" aria-hidden="true"></span>
                                    <span>Memuat data...</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="stock-mobile-list" id="stock-mobile-list" hidden></div>

            <div class="stock-pagination" id="stock-pagination-shell" hidden>
                <p class="stock-pagination-copy" id="stock-pagination-info">Menampilkan 0 - 0 dari 0 data</p>

                <div class="stock-pagination-controls">
                    <button
                        class="stock-pagination-button"
                        id="stock-prev-page-btn"
                        type="button"
                        data-testid="prev-stock-page-btn"
                        aria-label="Halaman sebelumnya"
                    >
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <span class="stock-pagination-page" id="stock-pagination-page">1 / 1</span>

                    <button
                        class="stock-pagination-button"
                        id="stock-next-page-btn"
                        type="button"
                        data-testid="next-stock-page-btn"
                        aria-label="Halaman berikutnya"
                    >
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </section>

        <div class="modal-shell" id="stock-form-modal" hidden>
            <div class="modal-backdrop" data-modal-close="stock-form-modal"></div>

            <div class="modal-card stock-dialog-card stock-form-dialog-card">
                <div class="stock-dialog-head">
                    <div>
                        <h3 id="stock-form-title">Tambah Stok Baru</h3>
                        <p id="stock-form-description">Isi form di bawah untuk menambahkan stok snack dan air mineral</p>
                    </div>
                    <button type="button" class="stock-dialog-close" data-modal-close="stock-form-modal" aria-label="Tutup">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>

                <form id="stock-form" class="stock-form">
                    <input type="hidden" id="stock-id" name="id">

                    <div class="stock-form-grid">
                        <div class="stock-form-group">
                            <label for="stock-tanggal">Tanggal</label>
                            <div class="stock-input-shell">
                                <input id="stock-tanggal" type="date" name="tanggal" required data-testid="stock-tanggal">
                            </div>
                        </div>

                        <div class="stock-form-group">
                            <label for="stock-total-snack">Total Stock Snack Awal</label>
                            <div class="stock-input-shell">
                                <input id="stock-total-snack" type="number" min="0" name="total_stock_snack" value="0" required data-testid="stock-total-snack">
                            </div>
                        </div>

                        <div class="stock-form-group">
                            <label for="stock-total-air">Total Stock Air Mineral</label>
                            <div class="stock-input-shell">
                                <input id="stock-total-air" type="number" min="0" name="total_stock_air_mineral" value="0" required data-testid="stock-total-air">
                            </div>
                        </div>

                        <div class="stock-form-group stock-form-group--full">
                            <label for="stock-keterangan">Keterangan</label>
                            <div class="stock-input-shell">
                                <input id="stock-keterangan" type="text" name="keterangan" placeholder="Contoh: Stock untuk keberangkatan pagi" data-testid="stock-keterangan">
                            </div>
                        </div>
                    </div>

                    <div class="stock-preview-card">
                        <h4>Preview Nilai Total</h4>
                        <div class="stock-preview-grid">
                            <div class="stock-preview-row">
                                <span>Harga Snack / item</span>
                                <strong id="stock-snack-price-label">Rp 0</strong>
                            </div>
                            <div class="stock-preview-row">
                                <span>Harga Air Mineral / botol</span>
                                <strong id="stock-air-price-label">Rp 0</strong>
                            </div>
                            <div class="stock-preview-row is-emerald">
                                <span>Nilai Total Stock</span>
                                <strong data-stock-calc="nilai_total">Rp 0</strong>
                            </div>
                        </div>
                    </div>

                    <p class="stock-note">
                        Total snack pada tabel sudah termasuk pengembalian snack otomatis dari data keberangkatan pada tanggal yang sama.
                    </p>

                    <div class="stock-dialog-actions">
                        <button class="stock-secondary-button" type="button" data-modal-close="stock-form-modal">Batal</button>
                        <button class="stock-primary-button" type="submit" id="stock-submit-btn" data-testid="submit-stock-btn">Simpan</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="modal-shell" id="stock-delete-modal" hidden>
            <div class="modal-backdrop" data-modal-close="stock-delete-modal"></div>

            <div class="modal-card stock-dialog-card stock-delete-dialog-card">
                <div class="stock-dialog-head">
                    <div>
                        <h3>Hapus Data Stok</h3>
                        <p id="stock-delete-copy">Apakah Anda yakin ingin menghapus data stok ini? Tindakan ini tidak dapat dibatalkan.</p>
                    </div>
                    <button type="button" class="stock-dialog-close" data-modal-close="stock-delete-modal" aria-label="Tutup">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>

                <div class="stock-dialog-actions">
                    <button class="stock-secondary-button" type="button" data-modal-close="stock-delete-modal">Batal</button>
                    <button class="stock-danger-button" type="button" id="stock-delete-confirm-btn" data-testid="confirm-delete-stock-btn">Hapus</button>
                </div>
            </div>
        </div>
    </section>
@endsection
