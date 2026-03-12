@extends('layouts.dashboard')

@section('content')
    <section class="mobil-page animate-fade-in" data-mobil-page>
        <section class="mobil-page-header">
            <div class="mobil-page-copy">
                <h1>Data Mobil</h1>
                <p>Kelola data armada mobil</p>
            </div>

            <div class="mobil-page-actions">
                <button
                    class="mobil-secondary-button"
                    type="button"
                    id="mobil-export-btn"
                    data-testid="export-mobil-btn"
                >
                    <span class="mobil-button-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M12 3V15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5 19H19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </span>
                    <span>Export CSV</span>
                </button>

                <button
                    class="mobil-primary-button"
                    type="button"
                    id="mobil-add-btn"
                    data-testid="add-mobil-btn"
                >
                    <span class="mobil-button-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M12 5V19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M5 12H19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </span>
                    <span>Tambah Mobil</span>
                </button>
            </div>
        </section>

        <section class="mobil-search-card">
            <div class="mobil-search-grid">
                <div class="mobil-search-field">
                    <span class="mobil-search-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8"/>
                            <path d="M20 20L17 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </span>
                    <input
                        id="mobil-search-input"
                        type="search"
                        placeholder="Cari kode mobil..."
                        autocomplete="off"
                        data-testid="search-mobil-input"
                    >
                </div>

                <div class="mobil-filter-shell">
                    <select id="mobil-filter-jenis" data-testid="filter-jenis-mobil">
                        <option value="">Semua Jenis</option>
                        <option value="Hiace">Hiace</option>
                        <option value="Reborn">Reborn</option>
                    </select>
                    <span class="mobil-filter-chevron" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                </div>
            </div>
        </section>

        <section class="mobil-table-card">
            <div class="mobil-table-wrap">
                <table class="mobil-table">
                    <thead>
                        <tr>
                            <th class="mobil-col-index">#</th>
                            <th>Kode Mobil</th>
                            <th>Jenis Mobil</th>
                            <th class="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="mobil-table-body">
                        <tr>
                            <td colspan="4" class="mobil-table-state">
                                <div class="mobil-loading-inline">
                                    <span class="mobil-loading-inline-spinner" aria-hidden="true"></span>
                                    <span>Memuat data...</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mobil-pagination" id="mobil-pagination-shell" hidden>
                <p class="mobil-pagination-copy" id="mobil-pagination-info">Menampilkan 0 - 0 dari 0 data</p>

                <div class="mobil-pagination-controls">
                    <button
                        class="mobil-pagination-button"
                        id="mobil-prev-page-btn"
                        type="button"
                        data-testid="prev-page-btn"
                        aria-label="Halaman sebelumnya"
                    >
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <span class="mobil-pagination-page" id="mobil-pagination-page">1 / 1</span>

                    <button
                        class="mobil-pagination-button"
                        id="mobil-next-page-btn"
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

        <div class="modal-shell" id="mobil-form-modal" hidden>
            <div class="modal-backdrop" data-modal-close="mobil-form-modal"></div>

            <div class="modal-card mobil-dialog-card">
                <div class="mobil-dialog-head">
                    <div>
                        <h3 id="mobil-form-title">Tambah Mobil Baru</h3>
                        <p id="mobil-form-description">Isi form di bawah untuk menambahkan data mobil</p>
                    </div>
                    <button type="button" class="mobil-dialog-close" data-modal-close="mobil-form-modal" aria-label="Tutup">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>

                <form id="mobil-form" class="mobil-form">
                    <input type="hidden" name="id" id="mobil-id">

                    <div class="mobil-form-group">
                        <label for="mobil-kode">Kode Mobil</label>
                        <div class="mobil-input-shell">
                            <span class="mobil-input-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M5 14L6.6 9.2C6.8728 8.3816 7.6387 7.83 8.5014 7.83H15.4986C16.3613 7.83 17.1272 8.3816 17.4 9.2L19 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M4 14H20V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V14Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                                    <path d="M7 16H7.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
                                    <path d="M17 16H17.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
                                </svg>
                            </span>
                            <input
                                id="mobil-kode"
                                name="kode_mobil"
                                type="text"
                                placeholder="Contoh: PB-001"
                                required
                                data-testid="input-kode-mobil"
                            >
                        </div>
                    </div>

                    <div class="mobil-form-group">
                        <label for="mobil-jenis">Jenis Mobil</label>
                        <div class="mobil-filter-shell mobil-filter-shell-form">
                            <select id="mobil-jenis" name="jenis_mobil" data-testid="select-jenis-mobil">
                                <option value="Hiace">Hiace</option>
                                <option value="Reborn">Reborn</option>
                            </select>
                            <span class="mobil-filter-chevron" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div class="mobil-dialog-actions">
                        <button class="mobil-secondary-button" type="button" data-modal-close="mobil-form-modal">Batal</button>
                        <button class="mobil-primary-button" type="submit" id="mobil-submit-btn" data-testid="submit-mobil-btn">Simpan</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="modal-shell" id="mobil-delete-modal" hidden>
            <div class="modal-backdrop" data-modal-close="mobil-delete-modal"></div>

            <div class="modal-card mobil-dialog-card mobil-delete-dialog-card">
                <div class="mobil-dialog-head">
                    <div>
                        <h3 class="mobil-delete-title">Hapus Mobil</h3>
                        <p class="mobil-delete-description" id="mobil-delete-copy">
                            Apakah Anda yakin ingin menghapus mobil <strong>-</strong>? Tindakan ini tidak dapat dibatalkan.
                        </p>
                    </div>
                    <button type="button" class="mobil-dialog-close" data-modal-close="mobil-delete-modal" aria-label="Tutup">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>

                <div class="mobil-dialog-actions">
                    <button class="mobil-secondary-button" type="button" data-modal-close="mobil-delete-modal">Batal</button>
                    <button class="mobil-danger-button" type="button" id="mobil-delete-confirm-btn" data-testid="confirm-delete-mobil-btn">Hapus</button>
                </div>
            </div>
        </div>
    </section>
@endsection
