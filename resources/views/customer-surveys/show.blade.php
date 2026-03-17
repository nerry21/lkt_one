@extends('layouts.dashboard')

@php
    $ratingBadgeMap = [
        'Sangat Baik'   => 'stock-value-badge-emerald',
        'Baik'          => 'stock-value-badge-blue',
        'Cukup'         => '',
        'Kurang'        => 'stock-value-badge-red',
        'Sangat Kurang' => 'stock-value-badge-red',
    ];
@endphp

@section('content')
<section class="admin-users-page animate-fade-in">

    {{-- Header --}}
    <section class="admin-users-page-header">
        <div class="admin-users-page-copy">
            <h1>Detail Survei</h1>
            <p>Jawaban lengkap survei kepuasan pelanggan oleh <strong>{{ $survey->name }}</strong>.</p>
        </div>
        <div class="admin-users-page-actions">
            <a href="{{ route('customer-surveys.index') }}" class="admin-users-secondary-button" style="display:inline-flex;align-items:center;gap:6px;text-decoration:none;">
                <svg viewBox="0 0 24 24" fill="none" style="width:15px;height:15px;">
                    <path d="M19 12H5M11 6L5 12L11 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Kembali
            </a>
        </div>
    </section>

    {{-- Meta info card --}}
    <div class="regular-booking-form-card" style="margin-bottom:16px;">
        <div class="regular-booking-section">
            <div class="regular-booking-section-head">
                <h2>Identitas Pengisi</h2>
            </div>
            <div class="regular-booking-review-grid">
                <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                    <span>Nama</span>
                    <strong>{{ $survey->name }}</strong>
                </div>
                <div class="regular-booking-summary-item">
                    <span>Waktu Pengisian</span>
                    <strong>{{ $survey->created_at->translatedFormat('d F Y, H:i') }} WIB</strong>
                </div>
                <div class="regular-booking-summary-item">
                    <span>Driver</span>
                    <strong>{{ $survey->driver?->nama ?? '—' }}</strong>
                </div>
                <div class="regular-booking-summary-item">
                    <span>Kode Mobil</span>
                    <strong>{{ $survey->kode_mobil ?? '—' }}</strong>
                </div>
            </div>
        </div>
    </div>

    {{-- Q1–Q8 --}}
    <div class="regular-booking-form-card" style="margin-bottom:16px;">
        <div class="regular-booking-section">
            <div class="regular-booking-section-head">
                <h2>Penilaian (Pertanyaan 1 – 8)</h2>
                <p>Jawaban menggunakan skala: Sangat Baik, Baik, Cukup, Kurang, Sangat Kurang.</p>
            </div>

            @foreach (range(1, 8) as $n)
                @php
                    $answer     = $survey->{"q{$n}_answer"};
                    $suggestion = $survey->{"q{$n}_suggestion"};
                    $badgeClass = $ratingBadgeMap[$answer] ?? '';
                @endphp
                <div style="border:1px solid #e2e8f0;border-radius:12px;padding:18px 20px;margin-bottom:12px;">
                    <div style="display:flex;align-items:flex-start;gap:12px;flex-wrap:wrap;">
                        <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:#022c22;color:#fff;font-weight:700;font-size:.75rem;flex-shrink:0;">{{ $n }}</span>
                        <div style="flex:1;min-width:200px;">
                            <p style="margin:0 0 10px;font-size:.875rem;font-weight:600;color:#0f172a;line-height:1.5;">{{ $questions[$n] }}</p>
                            <span class="stock-value-badge {{ $badgeClass }}">{{ $answer }}</span>
                            @if ($suggestion)
                                <p style="margin:10px 0 0;font-size:.85rem;color:#475569;background:#f8fafc;border-radius:8px;padding:10px 12px;border:1px solid #e2e8f0;">
                                    <strong style="display:block;font-size:.75rem;color:#94a3b8;margin-bottom:4px;">Saran & Masukan:</strong>
                                    {{ $suggestion }}
                                </p>
                            @endif
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>

    {{-- Q9–Q10 --}}
    <div class="regular-booking-form-card">
        <div class="regular-booking-section">
            <div class="regular-booking-section-head">
                <h2>Masukan Terbuka (Pertanyaan 9 – 10)</h2>
            </div>

            @foreach ([9, 10] as $n)
                @php
                    $answer     = $survey->{"q{$n}_answer"};
                    $suggestion = $survey->{"q{$n}_suggestion"};
                @endphp
                <div style="border:1px solid #e2e8f0;border-radius:12px;padding:18px 20px;margin-bottom:12px;">
                    <div style="display:flex;align-items:flex-start;gap:12px;">
                        <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:#022c22;color:#fff;font-weight:700;font-size:.75rem;flex-shrink:0;">{{ $n }}</span>
                        <div style="flex:1;">
                            <p style="margin:0 0 10px;font-size:.875rem;font-weight:600;color:#0f172a;line-height:1.5;">{{ $questions[$n] }}</p>
                            <p style="margin:0;font-size:.875rem;color:#0f172a;background:#f0fdf4;border-radius:8px;padding:12px 14px;border:1px solid #d1fae5;line-height:1.6;">
                                {{ $answer }}
                            </p>
                            @if ($suggestion)
                                <p style="margin:10px 0 0;font-size:.85rem;color:#475569;background:#f8fafc;border-radius:8px;padding:10px 12px;border:1px solid #e2e8f0;">
                                    <strong style="display:block;font-size:.75rem;color:#94a3b8;margin-bottom:4px;">Saran & Masukan:</strong>
                                    {{ $suggestion }}
                                </p>
                            @endif
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>

</section>
@endsection
