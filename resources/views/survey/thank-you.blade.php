@extends('layouts.base')

@section('body')
<style>
    *, *::before, *::after { box-sizing: border-box; }

    .sv-ty-shell {
        min-height: 100dvh;
        background: #022c22;
        font-family: 'Plus Jakarta Sans', sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px 16px;
    }

    .sv-ty-card {
        background: #fff;
        border-radius: 24px;
        padding: 48px 40px;
        max-width: 480px;
        width: 100%;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0,0,0,.3);
    }

    .sv-ty-icon {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: #d1fae5;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 24px;
    }
    .sv-ty-icon svg {
        width: 40px;
        height: 40px;
        color: #059669;
    }

    .sv-ty-brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-bottom: 24px;
    }
    .sv-ty-brand img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        object-fit: cover;
    }
    .sv-ty-brand span {
        font-size: .85rem;
        font-weight: 700;
        color: #022c22;
    }

    .sv-ty-title {
        font-size: 1.6rem;
        font-weight: 800;
        color: #022c22;
        margin: 0 0 12px;
    }
    .sv-ty-desc {
        font-size: .95rem;
        color: #475569;
        line-height: 1.6;
        margin: 0 0 32px;
    }

    .sv-ty-divider {
        height: 1px;
        background: #e2e8f0;
        margin: 0 0 24px;
    }

    .sv-ty-note {
        font-size: .8rem;
        color: #94a3b8;
        margin: 0 0 24px;
        line-height: 1.5;
    }

    .sv-ty-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: #022c22;
        color: #fff;
        text-decoration: none;
        border-radius: 10px;
        padding: 12px 28px;
        font-size: .875rem;
        font-weight: 700;
        font-family: inherit;
        transition: background .15s;
    }
    .sv-ty-btn:hover { background: #034d3b; }
</style>

<div class="sv-ty-shell">
    <div class="sv-ty-card">
        <div class="sv-ty-brand">
            <img src="/images/login-brand-whatsapp.jpeg" alt="Lancang Kuning Travelindo">
            <span>Lancang Kuning Travelindo</span>
        </div>

        <div class="sv-ty-icon">
            <svg viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>

        <h1 class="sv-ty-title">Terima Kasih!</h1>
        <p class="sv-ty-desc">
            Jawaban survei Anda telah berhasil kami terima.<br>
            Masukan Anda sangat berarti bagi kami untuk terus meningkatkan kualitas layanan <strong>Lancang Kuning Travelindo</strong>.
        </p>

        <div class="sv-ty-divider"></div>

        <p class="sv-ty-note">
            Kami berkomitmen untuk memberikan pelayanan terbaik bagi setiap pelanggan setia kami.
        </p>

        <a href="{{ route('survey.show') }}" class="sv-ty-btn">
            <svg viewBox="0 0 24 24" fill="none" style="width:15px;height:15px;">
                <path d="M19 12H5M11 6L5 12L11 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Isi Survei Lagi
        </a>
    </div>
</div>
@endsection
