@extends('layouts.base')

@section('body')
    <div class="auth-shell">
        <section class="auth-hero">
            <div class="auth-hero-image"></div>
            <div class="auth-hero-overlay"></div>

            <div class="auth-hero-content">
                <div class="auth-brand">
                    <div class="auth-brand-mark">
                        <img src="/images/login-brand-whatsapp.jpeg" alt="JET (JAYA EXCECUTIVE TRANSPORT)">
                    </div>
                    <div>
                        <h1>JET (JAYA EXCECUTIVE TRANSPORT)</h1>
                        <p>Management System</p>
                    </div>
                </div>
                <div class="auth-hero-stats">
                    <div class="auth-stat-card">
                        <strong>100+</strong>
                        <span>Perjalanan/Bulan</span>
                    </div>
                    <div class="auth-stat-card">
                        <strong>6+</strong>
                        <span>Armada Aktif</span>
                    </div>
                    <div class="auth-stat-card">
                        <strong>98%</strong>
                        <span>Kepuasan Pelanggan</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="auth-panel">
            <div class="auth-card">
                <div class="auth-mobile-brand">
                    <div class="auth-brand-mark">
                        <img src="/images/login-brand-whatsapp.jpeg" alt="JET (JAYA EXCECUTIVE TRANSPORT)">
                    </div>
                    <div>
                        <h2>JET (JAYA EXCECUTIVE TRANSPORT)</h2>
                        <p>Management System</p>
                    </div>
                </div>

                <div class="auth-header">
                    <h3 data-auth-title>Selamat Datang!</h3>
                    <p data-auth-description>Masuk ke akun Anda untuk melanjutkan</p>
                </div>

                <form class="auth-form" id="auth-form" data-auth-mode="login">
                    <div class="auth-field" id="auth-name-field" hidden>
                        <label for="nama">Nama Lengkap</label>
                        <input id="nama" name="nama" type="text" placeholder="Masukkan nama lengkap" data-testid="register-nama-input">
                    </div>

                    <div class="auth-field">
                        <label for="email">Email</label>
                        <input id="email" name="email" type="email" placeholder="nama@email.com" required data-testid="login-email-input">
                    </div>

                    <div class="auth-field">
                        <label for="password">Password</label>
                        <div class="password-field">
                            <input id="password" name="password" type="password" placeholder="Masukkan password" required data-testid="login-password-input">
                            <button type="button" class="password-toggle" data-toggle-password data-testid="toggle-password-visibility">Lihat</button>
                        </div>
                    </div>

                    <button class="primary-button auth-submit" type="submit" id="auth-submit-button" data-testid="login-submit-btn">
                        <span data-auth-submit-text>Masuk</span>
                    </button>
                </form>

                <div class="auth-footer">
                    <p>&copy; 2026 JET (JAYA EXCECUTIVE TRANSPORT). Semua hak dilindungi.</p>
                </div>
            </div>
        </section>
    </div>
@endsection
