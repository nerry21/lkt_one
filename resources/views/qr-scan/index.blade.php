@extends('layouts.dashboard')

@section('content')
<section class="admin-users-page animate-fade-in qrscan-page">

    <section class="admin-users-page-header">
        <div class="admin-users-page-copy">
            <h1>Scan QR Tiket</h1>
            <p>Pindai QR code tiket penumpang untuk mencatat perjalanan dan program loyalti.</p>
        </div>
    </section>

    <div class="qrscan-layout">

        {{-- ── Scanner Panel ─────────────────────────────────────────────── --}}
        <div class="qrscan-left">
            <article class="dashboard-panel-card qrscan-card">
                <div class="dashboard-panel-head">
                    <div>
                        <h3>Kamera Scanner</h3>
                        <p>Arahkan kamera ke QR code pada tiket penumpang.</p>
                    </div>
                </div>

                <div class="qrscan-viewfinder" id="qrscan-viewfinder">
                    <div class="qrscan-placeholder" id="qrscan-placeholder">
                        <svg viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.8"/>
                            <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.8"/>
                            <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.8"/>
                            <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.8"/>
                        </svg>
                        <p>Kamera belum aktif</p>
                    </div>
                    <div id="qrscan-reader"></div>
                    <div class="qrscan-frame" id="qrscan-frame" hidden>
                        <span class="qrscan-corner qrscan-corner--tl"></span>
                        <span class="qrscan-corner qrscan-corner--tr"></span>
                        <span class="qrscan-corner qrscan-corner--bl"></span>
                        <span class="qrscan-corner qrscan-corner--br"></span>
                        <div class="qrscan-scanline"></div>
                    </div>
                </div>

                <div class="qrscan-controls">
                    <button class="admin-users-primary-button qrscan-btn-start" id="qrscan-btn-start" type="button">
                        <svg viewBox="0 0 24 24" fill="none" style="width:18px;height:18px;">
                            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/>
                            <path d="M6.3 6.3A8 8 0 1 0 17.7 17.7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                        Mulai Scan
                    </button>
                    <button class="admin-users-secondary-button qrscan-btn-stop" id="qrscan-btn-stop" type="button" hidden>
                        <svg viewBox="0 0 24 24" fill="none" style="width:18px;height:18px;">
                            <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.8"/>
                        </svg>
                        Hentikan
                    </button>
                </div>

                <p class="qrscan-hint" id="qrscan-status-text">Tekan "Mulai Scan" untuk mengaktifkan kamera.</p>
            </article>

            {{-- Manual Input --}}
            <article class="dashboard-panel-card qrscan-card">
                <div class="dashboard-panel-head">
                    <div>
                        <h3>Input Manual</h3>
                        <p>Masukkan QR Token secara manual jika kamera tidak tersedia.</p>
                    </div>
                </div>
                <form id="qrscan-manual-form" class="qrscan-manual-form">
                    <div class="qrscan-manual-row">
                        <input
                            type="text"
                            id="qrscan-manual-input"
                            class="qrscan-manual-input"
                            placeholder="Contoh: QRT-260316-ABCXYZ"
                            autocomplete="off"
                            spellcheck="false"
                        >
                        <button type="submit" class="admin-users-primary-button" id="qrscan-manual-btn">
                            Verifikasi
                        </button>
                    </div>
                </form>
            </article>
        </div>

        {{-- ── Result Panel ──────────────────────────────────────────────── --}}
        <div class="qrscan-right">

            {{-- Idle state --}}
            <article class="dashboard-panel-card qrscan-card qrscan-result-idle" id="qrscan-result-idle">
                <div class="qrscan-idle-body">
                    <svg viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.6"/>
                        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.6"/>
                        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.6"/>
                        <path d="M14 14h3v3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21 14v.01M14 21h.01M17 21h4M21 17v4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                    </svg>
                    <p>Hasil scan akan muncul di sini</p>
                </div>
            </article>

            {{-- Result card (hidden until scan) --}}
            <article class="dashboard-panel-card qrscan-card qrscan-result-card" id="qrscan-result-card" hidden>
                <div class="qrscan-result-header" id="qrscan-result-header">
                    <div class="qrscan-result-icon" id="qrscan-result-icon"></div>
                    <div>
                        <h3 id="qrscan-result-title">–</h3>
                        <p id="qrscan-result-subtitle">–</p>
                    </div>
                </div>

                <div class="qrscan-result-grid">
                    <div class="qrscan-result-item">
                        <span>Nama Penumpang</span>
                        <strong id="qr-res-name">–</strong>
                    </div>
                    <div class="qrscan-result-item">
                        <span>Kode Booking</span>
                        <strong id="qr-res-code">–</strong>
                    </div>
                    <div class="qrscan-result-item">
                        <span>Rute</span>
                        <strong id="qr-res-route">–</strong>
                    </div>
                    <div class="qrscan-result-item">
                        <span>Tanggal & Waktu</span>
                        <strong id="qr-res-datetime">–</strong>
                    </div>
                    <div class="qrscan-result-item">
                        <span>Kursi</span>
                        <strong id="qr-res-seats">–</strong>
                    </div>
                    <div class="qrscan-result-item">
                        <span>Jumlah Penumpang</span>
                        <strong id="qr-res-pax">–</strong>
                    </div>
                </div>

                {{-- Loyalty bar --}}
                <div class="qrscan-loyalty">
                    <div class="qrscan-loyalty-head">
                        <span>Loyalti Perjalanan</span>
                        <span id="qr-res-loyalty-label">0 / 5</span>
                    </div>
                    <div class="qrscan-loyalty-bar">
                        <div class="qrscan-loyalty-fill" id="qr-res-loyalty-fill" style="width:0%"></div>
                    </div>
                    <p class="qrscan-loyalty-note" id="qr-res-loyalty-note">–</p>
                </div>
            </article>

            {{-- Recent scans --}}
            <article class="dashboard-panel-card qrscan-card">
                <div class="dashboard-panel-head">
                    <div>
                        <h3>Riwayat Scan</h3>
                        <p>Daftar scan yang dilakukan dalam sesi ini.</p>
                    </div>
                    <button class="admin-users-secondary-button" id="qrscan-clear-history" type="button"
                        style="min-height:36px;padding:0 12px;font-size:0.8rem;">
                        Hapus
                    </button>
                </div>
                <div id="qrscan-history-list" class="qrscan-history-list">
                    <p class="qrscan-history-empty">Belum ada scan dalam sesi ini.</p>
                </div>
            </article>
        </div>

    </div>
</section>

{{-- Load html5-qrcode library --}}
<script src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js"></script>
@endsection
