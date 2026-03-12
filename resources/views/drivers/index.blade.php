@extends('layouts.dashboard')

@section('content')
    <section class="drivers-page animate-fade-in" data-drivers-page>
        <section class="drivers-page-header">
            <div class="drivers-page-copy">
                <h1>Data Driver</h1>
                <p>Kelola data driver armada</p>
            </div>

            <div class="drivers-page-actions">
                <button
                    class="drivers-secondary-button"
                    type="button"
                    id="drivers-export-btn"
                    data-testid="export-drivers-btn"
                >
                    <span class="drivers-button-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M12 3V15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5 19H19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </span>
                    <span>Export CSV</span>
                </button>

                <button
                    class="drivers-primary-button"
                    type="button"
                    id="drivers-add-btn"
                    data-testid="add-driver-btn"
                >
                    <span class="drivers-button-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M12 5V19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M5 12H19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </span>
                    <span>Tambah Driver</span>
                </button>
            </div>
        </section>

        <section class="drivers-search-card">
            <div class="drivers-search-field">
                <span class="drivers-search-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8"/>
                        <path d="M20 20L17 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    </svg>
                </span>
                <input
                    id="drivers-search-input"
                    type="search"
                    placeholder="Cari nama atau lokasi driver..."
                    autocomplete="off"
                    data-testid="search-drivers-input"
                >
            </div>
        </section>

        <section class="drivers-table-card">
            <div class="drivers-table-wrap">
                <table class="drivers-table">
                    <thead>
                        <tr>
                            <th class="drivers-col-index">#</th>
                            <th>Nama Driver</th>
                            <th>Lokasi Tempat Tinggal</th>
                            <th class="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="drivers-table-body">
                        <tr>
                            <td colspan="4" class="drivers-table-state">
                                <div class="drivers-loading-inline">
                                    <span class="drivers-loading-inline-spinner" aria-hidden="true"></span>
                                    <span>Memuat data...</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="drivers-pagination" id="drivers-pagination-shell" hidden>
                <p class="drivers-pagination-copy" id="drivers-pagination-info">Menampilkan 0 - 0 dari 0 data</p>

                <div class="drivers-pagination-controls">
                    <button
                        class="drivers-pagination-button"
                        id="drivers-prev-page-btn"
                        type="button"
                        data-testid="prev-page-btn"
                        aria-label="Halaman sebelumnya"
                    >
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <span class="drivers-pagination-page" id="drivers-pagination-page">1 / 1</span>

                    <button
                        class="drivers-pagination-button"
                        id="drivers-next-page-btn"
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

        <div class="modal-shell" id="driver-form-modal" hidden>
            <div class="modal-backdrop" data-modal-close="driver-form-modal"></div>

            <div class="modal-card drivers-dialog-card">
                <div class="drivers-dialog-head">
                    <div>
                        <h3 id="driver-form-title">Tambah Driver Baru</h3>
                        <p id="driver-form-description">Isi form di bawah untuk menambahkan data driver</p>
                    </div>
                    <button type="button" class="drivers-dialog-close" data-modal-close="driver-form-modal" aria-label="Tutup">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>

                <form id="driver-form" class="drivers-form">
                    <input type="hidden" name="id" id="driver-id">

                    <div class="drivers-form-group">
                        <label for="driver-nama">Nama Driver</label>
                        <div class="drivers-input-shell">
                            <span class="drivers-input-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M20 21C20 17.6863 16.4183 15 12 15C7.58172 15 4 17.6863 4 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                    <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/>
                                </svg>
                            </span>
                            <input
                                id="driver-nama"
                                name="nama"
                                type="text"
                                placeholder="Masukkan nama driver"
                                required
                                data-testid="input-driver-nama"
                            >
                        </div>
                    </div>

                    <div class="drivers-form-group">
                        <label for="driver-lokasi">Lokasi Tempat Tinggal</label>
                        <div class="drivers-input-shell">
                            <span class="drivers-input-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <path d="M12 21C15 17.4 18 14.4 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 14.4 9 17.4 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                    <circle cx="12" cy="10.5" r="2.25" stroke="currentColor" stroke-width="1.8"/>
                                </svg>
                            </span>
                            <input
                                id="driver-lokasi"
                                name="lokasi"
                                type="text"
                                placeholder="Contoh: Pekanbaru, Duri, Dumai"
                                required
                                data-testid="input-driver-lokasi"
                            >
                        </div>
                    </div>

                    <div class="drivers-dialog-actions">
                        <button class="drivers-secondary-button" type="button" data-modal-close="driver-form-modal">Batal</button>
                        <button class="drivers-primary-button" type="submit" id="driver-submit-btn" data-testid="submit-driver-btn">Simpan</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="modal-shell" id="driver-delete-modal" hidden>
            <div class="modal-backdrop" data-modal-close="driver-delete-modal"></div>

            <div class="modal-card drivers-dialog-card drivers-delete-dialog-card">
                <div class="drivers-dialog-head">
                    <div>
                        <h3 class="drivers-delete-title">Hapus Driver</h3>
                        <p class="drivers-delete-description" id="driver-delete-copy">
                            Apakah Anda yakin ingin menghapus driver <strong>-</strong>? Tindakan ini tidak dapat dibatalkan.
                        </p>
                    </div>
                    <button type="button" class="drivers-dialog-close" data-modal-close="driver-delete-modal" aria-label="Tutup">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>

                <div class="drivers-dialog-actions">
                    <button class="drivers-secondary-button" type="button" data-modal-close="driver-delete-modal">Batal</button>
                    <button class="drivers-danger-button" type="button" id="driver-delete-confirm-btn" data-testid="confirm-delete-driver-btn">Hapus</button>
                </div>
            </div>
        </div>
    </section>
@endsection
