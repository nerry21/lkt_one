@extends('layouts.dashboard')

@section('content')
    <section class="cust-page animate-fade-in" data-cust-page>

        {{-- Header --}}
        <section class="plkt-page-header">
            <div class="plkt-page-copy">
                <h1>Data Pelanggan</h1>
                <p>Kelola identitas pelanggan, riwayat perjalanan, dan program loyalitas</p>
            </div>
            <div class="plkt-page-actions">
                <button class="plkt-secondary-button" type="button" id="cust-duplicates-btn">
                    <span class="plkt-button-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none">
                            <circle cx="9" cy="8" r="3.5" stroke="currentColor" stroke-width="1.8"/>
                            <circle cx="15" cy="8" r="3.5" stroke="currentColor" stroke-width="1.8"/>
                            <path d="M3 20C3 16.686 5.686 14 9 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M15 14c3.314 0 6 2.686 6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </span>
                    <span>Duplikasi</span>
                </button>
            </div>
        </section>

        {{-- Stats --}}
        <section class="cust-stats-row" id="cust-stats-row">
            <div class="cust-stat-card">
                <span class="cust-stat-label">Total Pelanggan</span>
                <strong class="cust-stat-value" id="cust-stat-total">—</strong>
            </div>
            <div class="cust-stat-card cust-stat-card--green">
                <span class="cust-stat-label">Eligible Diskon</span>
                <strong class="cust-stat-value" id="cust-stat-eligible">—</strong>
            </div>
            <div class="cust-stat-card">
                <span class="cust-stat-label">Dengan Nomor HP</span>
                <strong class="cust-stat-value" id="cust-stat-with-phone">—</strong>
            </div>
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
                    id="cust-search-input"
                    type="search"
                    placeholder="Cari nama, nomor HP, kode pelanggan, atau email..."
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
                            <th>Kode</th>
                            <th>Nama Pelanggan</th>
                            <th>No HP</th>
                            <th class="text-center">Total Trip</th>
                            <th class="text-center">Diskon</th>
                            <th class="text-center">Status</th>
                            <th class="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="cust-table-body">
                        <tr>
                            <td colspan="8" class="plkt-table-state">
                                <div class="plkt-loading-inline">
                                    <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
                                    <span>Memuat data...</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="plkt-pagination" id="cust-pagination-shell" hidden>
                <p class="plkt-pagination-copy" id="cust-pagination-info">Menampilkan 0 - 0 dari 0 data</p>
                <div class="plkt-pagination-controls">
                    <button class="plkt-pagination-button" id="cust-prev-page-btn" type="button" aria-label="Halaman sebelumnya">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <span class="plkt-pagination-page" id="cust-pagination-page">1 / 1</span>
                    <button class="plkt-pagination-button" id="cust-next-page-btn" type="button" aria-label="Halaman berikutnya">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </section>

    </section>

    {{-- Detail Modal --}}
    <div class="modal-shell" id="cust-detail-modal" hidden>
        <div class="modal-backdrop" data-modal-close="cust-detail-modal"></div>
        <div class="modal-card plkt-dialog-card" style="max-width:560px">
            <div class="plkt-dialog-head">
                <div>
                    <h3 id="cust-detail-name">Detail Pelanggan</h3>
                    <p id="cust-detail-code" class="cust-detail-code"></p>
                </div>
                <button type="button" class="plkt-dialog-close" data-modal-close="cust-detail-modal" aria-label="Tutup">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        <path d="M6 6L18 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>

            <div class="cust-detail-body" id="cust-detail-body">
                <div class="plkt-loading-inline">
                    <span class="plkt-loading-inline-spinner" aria-hidden="true"></span>
                    <span>Memuat detail...</span>
                </div>
            </div>
        </div>
    </div>
@endsection
