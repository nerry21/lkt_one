@extends('layouts.base')

@section('body')
<style>
    *, *::before, *::after { box-sizing: border-box; }

    .sv-shell {
        min-height: 100dvh;
        background: #f0fdf4;
        font-family: 'Plus Jakarta Sans', sans-serif;
        padding: 0 0 60px;
    }

    /* ── Header ── */
    .sv-header {
        background: #022c22;
        color: #fff;
        padding: 28px 24px 24px;
        text-align: center;
    }
    .sv-header-brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 14px;
        margin-bottom: 18px;
    }
    .sv-header-brand img {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid rgba(255,255,255,.25);
    }
    .sv-header-brand-text h1 {
        font-size: 1.1rem;
        font-weight: 700;
        margin: 0;
        line-height: 1.2;
    }
    .sv-header-brand-text p {
        font-size: 0.78rem;
        margin: 2px 0 0;
        opacity: .75;
    }
    .sv-header-title {
        font-size: 1.45rem;
        font-weight: 800;
        margin: 0 0 6px;
        letter-spacing: -.01em;
    }
    .sv-header-subtitle {
        font-size: 0.875rem;
        opacity: .8;
        margin: 0;
        max-width: 480px;
        margin-inline: auto;
    }

    /* ── Container ── */
    .sv-container {
        max-width: 720px;
        margin: 0 auto;
        padding: 0 16px;
    }

    /* ── Name card ── */
    .sv-name-card {
        background: #fff;
        border-radius: 16px;
        padding: 24px;
        margin-top: 28px;
        box-shadow: 0 1px 4px rgba(0,0,0,.08);
        border: 1px solid #d1fae5;
    }
    .sv-name-card label {
        display: block;
        font-weight: 700;
        font-size: .9rem;
        color: #022c22;
        margin-bottom: 8px;
    }
    .sv-name-card input {
        width: 100%;
        border: 1.5px solid #d1fae5;
        border-radius: 10px;
        padding: 12px 14px;
        font-size: .95rem;
        font-family: inherit;
        color: #0f172a;
        background: #f0fdf4;
        outline: none;
        transition: border-color .15s;
    }
    .sv-name-card input:focus {
        border-color: #059669;
        background: #fff;
    }

    /* ── Error card ── */
    .sv-errors {
        background: #fef2f2;
        border: 1.5px solid #fca5a5;
        border-radius: 12px;
        padding: 16px 20px;
        margin-top: 20px;
    }
    .sv-errors strong {
        display: block;
        color: #991b1b;
        font-size: .875rem;
        margin-bottom: 8px;
    }
    .sv-errors ul {
        margin: 0;
        padding-left: 18px;
        color: #991b1b;
        font-size: .85rem;
    }

    /* ── Question card ── */
    .sv-question-card {
        background: #fff;
        border-radius: 16px;
        padding: 24px;
        margin-top: 16px;
        box-shadow: 0 1px 4px rgba(0,0,0,.08);
        border: 1px solid #e2e8f0;
    }
    .sv-question-number {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #022c22;
        color: #fff;
        font-weight: 700;
        font-size: .8rem;
        margin-bottom: 10px;
        flex-shrink: 0;
    }
    .sv-question-text {
        font-size: .95rem;
        font-weight: 600;
        color: #0f172a;
        margin: 0 0 16px;
        line-height: 1.5;
    }

    /* ── Rating options ── */
    .sv-rating-group {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 16px;
    }
    .sv-rating-label {
        cursor: pointer;
    }
    .sv-rating-label input[type="radio"] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }
    .sv-rating-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 14px;
        border-radius: 999px;
        border: 1.5px solid #e2e8f0;
        font-size: .82rem;
        font-weight: 600;
        color: #475569;
        background: #f8fafc;
        transition: all .15s;
        white-space: nowrap;
    }
    .sv-rating-label input:checked + .sv-rating-chip {
        border-color: #059669;
        background: #022c22;
        color: #fff;
    }
    .sv-rating-label:hover .sv-rating-chip {
        border-color: #059669;
        color: #022c22;
    }
    .sv-rating-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: currentColor;
        opacity: .5;
    }

    /* ── Suggestion textarea ── */
    .sv-suggestion-label {
        display: block;
        font-size: .8rem;
        font-weight: 600;
        color: #64748b;
        margin-bottom: 6px;
        margin-top: 4px;
    }
    .sv-textarea {
        width: 100%;
        border: 1.5px solid #e2e8f0;
        border-radius: 10px;
        padding: 10px 14px;
        font-size: .875rem;
        font-family: inherit;
        color: #0f172a;
        resize: vertical;
        outline: none;
        transition: border-color .15s;
        min-height: 80px;
        background: #f8fafc;
    }
    .sv-textarea:focus {
        border-color: #059669;
        background: #fff;
    }

    /* Q9/Q10 main answer textarea */
    .sv-main-textarea {
        min-height: 100px;
        margin-bottom: 12px;
    }

    /* ── Submit ── */
    .sv-submit-wrap {
        margin-top: 28px;
        text-align: center;
    }
    .sv-submit-btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: #022c22;
        color: #fff;
        border: none;
        border-radius: 12px;
        padding: 16px 48px;
        font-size: 1rem;
        font-weight: 700;
        font-family: inherit;
        cursor: pointer;
        transition: background .15s, transform .1s;
        box-shadow: 0 4px 12px rgba(2,44,34,.3);
    }
    .sv-submit-btn:hover { background: #034d3b; }
    .sv-submit-btn:active { transform: scale(.98); }
    .sv-submit-note {
        margin-top: 10px;
        font-size: .8rem;
        color: #64748b;
    }

    /* ── Field error ── */
    .sv-field-error {
        color: #dc2626;
        font-size: .8rem;
        margin-top: 6px;
    }
</style>

<div class="sv-shell">
    {{-- Header --}}
    <header class="sv-header">
        <div class="sv-header-brand">
            <img src="/images/login-brand-whatsapp.jpeg" alt="Lancang Kuning Travelindo">
            <div class="sv-header-brand-text">
                <h1>Lancang Kuning Travelindo</h1>
                <p>Pekanbaru – Pasirpengaraian</p>
            </div>
        </div>
        <h2 class="sv-header-title">Survei Kepuasan Pelanggan</h2>
        <p class="sv-header-subtitle">
            Terima kasih telah menggunakan layanan kami. Pendapat Anda sangat berarti untuk peningkatan kualitas pelayanan Lancang Kuning Travelindo.
        </p>
    </header>

    <div class="sv-container">

        @if ($errors->any())
            <div class="sv-errors">
                <strong>Mohon perbaiki kesalahan berikut:</strong>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form method="POST" action="{{ route('survey.store') }}">
            @csrf

            {{-- Nama --}}
            <div class="sv-name-card">
                <label for="sv-name">Nama Lengkap <span style="color:#dc2626;">*</span></label>
                <input
                    type="text"
                    id="sv-name"
                    name="name"
                    value="{{ old('name') }}"
                    placeholder="Masukkan nama Anda"
                    required
                    autocomplete="name"
                >
                @error('name')
                    <p class="sv-field-error">{{ $message }}</p>
                @enderror
            </div>

            {{-- Q1–Q8: Rating + Saran --}}
            @foreach (range(1, 8) as $n)
                @php
                    $answerKey     = "q{$n}_answer";
                    $suggestionKey = "q{$n}_suggestion";
                @endphp
                <div class="sv-question-card">
                    <span class="sv-question-number">{{ $n }}</span>
                    <p class="sv-question-text">{{ $questions[$n] }}</p>

                    <div class="sv-rating-group" role="radiogroup" aria-label="Pilihan jawaban pertanyaan {{ $n }}">
                        @foreach ($ratingOptions as $option)
                            <label class="sv-rating-label">
                                <input
                                    type="radio"
                                    name="{{ $answerKey }}"
                                    value="{{ $option }}"
                                    {{ old($answerKey) === $option ? 'checked' : '' }}
                                    required
                                >
                                <span class="sv-rating-chip">
                                    <span class="sv-rating-dot"></span>
                                    {{ $option }}
                                </span>
                            </label>
                        @endforeach
                    </div>
                    @error($answerKey)
                        <p class="sv-field-error">{{ $message }}</p>
                    @enderror

                    <label class="sv-suggestion-label" for="{{ $suggestionKey }}">Saran dan masukan (opsional)</label>
                    <textarea
                        class="sv-textarea"
                        id="{{ $suggestionKey }}"
                        name="{{ $suggestionKey }}"
                        placeholder="Tuliskan saran atau masukan Anda..."
                        rows="3"
                    >{{ old($suggestionKey) }}</textarea>
                </div>
            @endforeach

            {{-- Q9–Q10: Textarea jawaban + Saran --}}
            @foreach ([9, 10] as $n)
                @php
                    $answerKey     = "q{$n}_answer";
                    $suggestionKey = "q{$n}_suggestion";
                @endphp
                <div class="sv-question-card">
                    <span class="sv-question-number">{{ $n }}</span>
                    <p class="sv-question-text">{{ $questions[$n] }}</p>

                    <label class="sv-suggestion-label" for="{{ $answerKey }}">Jawaban Anda <span style="color:#dc2626;">*</span></label>
                    <textarea
                        class="sv-textarea sv-main-textarea"
                        id="{{ $answerKey }}"
                        name="{{ $answerKey }}"
                        placeholder="Tuliskan jawaban Anda..."
                        rows="4"
                        required
                    >{{ old($answerKey) }}</textarea>
                    @error($answerKey)
                        <p class="sv-field-error">{{ $message }}</p>
                    @enderror

                    <label class="sv-suggestion-label" for="{{ $suggestionKey }}">Saran dan masukan (opsional)</label>
                    <textarea
                        class="sv-textarea"
                        id="{{ $suggestionKey }}"
                        name="{{ $suggestionKey }}"
                        placeholder="Tuliskan saran atau masukan tambahan..."
                        rows="3"
                    >{{ old($suggestionKey) }}</textarea>
                </div>
            @endforeach

            {{-- Submit --}}
            <div class="sv-submit-wrap">
                <button type="submit" class="sv-submit-btn">
                    <svg viewBox="0 0 24 24" fill="none" style="width:18px;height:18px;flex-shrink:0;">
                        <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Kirim Survei
                </button>
                <p class="sv-submit-note">Semua jawaban yang bertanda * wajib diisi.</p>
            </div>
        </form>
    </div>
</div>
@endsection
