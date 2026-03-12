@extends('layouts.dashboard')

@section('content')
    <section class="admin-users-page animate-fade-in" data-admin-users-page>
        <section class="admin-users-page-header">
            <div class="admin-users-page-copy">
                <h1>Admin &amp; User</h1>
                <p>Kelola akun dashboard beserta role aksesnya</p>
            </div>

            <div class="admin-users-page-actions">
                <button class="admin-users-secondary-button" type="button" id="admin-users-add-admin-btn" data-testid="add-admin-btn">
                    <span class="admin-users-button-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M12 5V19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M5 12H19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </span>
                    <span>Tambah Admin</span>
                </button>

                <button class="admin-users-primary-button" type="button" id="admin-users-add-user-btn" data-testid="add-user-btn">
                    <span class="admin-users-button-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M12 5V19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M5 12H19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </span>
                    <span>Tambah User</span>
                </button>
            </div>
        </section>

        <p class="admin-users-access-note" id="admin-users-access-note" hidden></p>

        <section class="admin-users-search-card">
            <div class="admin-users-search-field">
                <span class="admin-users-search-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8"/>
                        <path d="M20 20L17 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    </svg>
                </span>
                <input id="admin-users-search-input" type="search" placeholder="Cari nama, username, email, atau role..." autocomplete="off" data-testid="search-admin-users-input">
            </div>
        </section>

        <section class="admin-users-table-card">
            <div class="admin-users-table-wrap">
                <table class="admin-users-table">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th class="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="admin-users-table-body">
                        <tr>
                            <td colspan="6" class="admin-users-table-state">
                                <div class="admin-users-loading-inline">
                                    <span class="admin-users-loading-inline-spinner" aria-hidden="true"></span>
                                    <span>Memuat data...</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="admin-users-pagination" id="admin-users-pagination-shell" hidden>
                <p class="admin-users-pagination-copy" id="admin-users-pagination-info">Menampilkan 0 - 0 dari 0 data</p>

                <div class="admin-users-pagination-controls">
                    <button class="admin-users-pagination-button" id="admin-users-prev-page-btn" type="button" data-testid="prev-admin-users-page-btn" aria-label="Halaman sebelumnya">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <span class="admin-users-pagination-page" id="admin-users-pagination-page">1 / 1</span>

                    <button class="admin-users-pagination-button" id="admin-users-next-page-btn" type="button" data-testid="next-admin-users-page-btn" aria-label="Halaman berikutnya">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </section>

        <div class="modal-shell" id="admin-user-form-modal" hidden>
            <div class="modal-backdrop" data-modal-close="admin-user-form-modal"></div>

            <div class="modal-card admin-users-dialog-card">
                <div class="admin-users-dialog-head">
                    <div>
                        <h3 id="admin-user-form-title">Tambah User Baru</h3>
                        <p id="admin-user-form-description">Lengkapi data akun untuk menambahkan user baru</p>
                    </div>
                    <button type="button" class="admin-users-dialog-close" data-modal-close="admin-user-form-modal" aria-label="Tutup">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>

                <form id="admin-user-form" class="admin-users-form">
                    <input type="hidden" id="admin-user-id" name="id">

                    <div class="admin-users-form-grid">
                        <div class="admin-users-form-group">
                            <label for="admin-user-nama">Nama</label>
                            <div class="admin-users-input-shell">
                                <input id="admin-user-nama" name="nama" type="text" placeholder="Masukkan nama lengkap" required data-testid="input-admin-user-nama">
                            </div>
                        </div>

                        <div class="admin-users-form-group">
                            <label for="admin-user-username">Username</label>
                            <div class="admin-users-input-shell">
                                <input id="admin-user-username" name="username" type="text" placeholder="Contoh: admin.pekanbaru" required data-testid="input-admin-user-username">
                            </div>
                        </div>

                        <div class="admin-users-form-group admin-users-form-group--full">
                            <label for="admin-user-email">Email</label>
                            <div class="admin-users-input-shell">
                                <input id="admin-user-email" name="email" type="email" placeholder="nama@email.com" required data-testid="input-admin-user-email">
                            </div>
                        </div>

                        <div class="admin-users-form-group">
                            <label for="admin-user-password">Password</label>
                            <div class="admin-users-input-shell">
                                <input id="admin-user-password" name="password" type="password" placeholder="Masukkan password" data-testid="input-admin-user-password">
                            </div>
                        </div>

                        <div class="admin-users-form-group">
                            <label for="admin-user-role">Role</label>
                            <div class="admin-users-input-shell">
                                <select id="admin-user-role" name="role" required data-testid="input-admin-user-role"></select>
                            </div>
                        </div>
                    </div>

                    <p class="admin-users-form-note" id="admin-user-password-note">
                        Password minimal 6 karakter dan akan disimpan dalam bentuk terenkripsi.
                    </p>

                    <div class="admin-users-dialog-actions">
                        <button class="admin-users-secondary-button" type="button" data-modal-close="admin-user-form-modal">Batal</button>
                        <button class="admin-users-primary-button" type="submit" id="admin-user-submit-btn" data-testid="submit-admin-user-btn">Simpan</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="modal-shell" id="admin-user-show-modal" hidden>
            <div class="modal-backdrop" data-modal-close="admin-user-show-modal"></div>

            <div class="modal-card admin-users-dialog-card admin-users-show-dialog-card">
                <div class="admin-users-dialog-head">
                    <div>
                        <h3>Detail Admin &amp; User</h3>
                        <p>Informasi lengkap akun yang dipilih</p>
                    </div>
                    <button type="button" class="admin-users-dialog-close" data-modal-close="admin-user-show-modal" aria-label="Tutup">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>

                <div class="admin-users-detail-list" id="admin-user-detail-list"></div>

                <div class="admin-users-dialog-actions">
                    <button class="admin-users-secondary-button" type="button" data-modal-close="admin-user-show-modal">Tutup</button>
                </div>
            </div>
        </div>

        <div class="modal-shell" id="admin-user-delete-modal" hidden>
            <div class="modal-backdrop" data-modal-close="admin-user-delete-modal"></div>

            <div class="modal-card admin-users-dialog-card admin-users-delete-dialog-card">
                <div class="admin-users-dialog-head">
                    <div>
                        <h3>Hapus Akun</h3>
                        <p id="admin-user-delete-copy">Apakah Anda yakin ingin menghapus akun ini? Tindakan ini tidak dapat dibatalkan.</p>
                    </div>
                    <button type="button" class="admin-users-dialog-close" data-modal-close="admin-user-delete-modal" aria-label="Tutup">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>

                <div class="admin-users-dialog-actions">
                    <button class="admin-users-secondary-button" type="button" data-modal-close="admin-user-delete-modal">Batal</button>
                    <button class="admin-users-danger-button" type="button" id="admin-user-delete-confirm-btn" data-testid="confirm-delete-admin-user-btn">Hapus</button>
                </div>
            </div>
        </div>
    </section>
@endsection
