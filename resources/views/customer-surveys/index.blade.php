@extends('layouts.dashboard')

@section('content')
<section class="admin-users-page animate-fade-in">

    {{-- Header --}}
    <section class="admin-users-page-header">
        <div class="admin-users-page-copy">
            <h1>Survei Pelanggan</h1>
            <p>Hasil jawaban survei kepuasan pelanggan Lancang Kuning Travelindo.</p>
        </div>
        <div class="admin-users-page-actions">
            <a
                href="{{ route('survey.show') }}"
                target="_blank"
                class="admin-users-primary-button"
                style="display:inline-flex;align-items:center;gap:8px;text-decoration:none;"
            >
                <svg viewBox="0 0 24 24" fill="none" style="width:15px;height:15px;flex-shrink:0;">
                    <path d="M18 13V19C18 20.1046 17.1046 21 16 21H5C3.89543 21 3 20.1046 3 19V8C3 6.89543 3.89543 6 5 6H11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    <path d="M15 3H21V9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 14L21 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
                Buka Link Survei
            </a>
        </div>
    </section>

    {{-- Stats bar --}}
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:20px;">
        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:16px 22px;display:flex;flex-direction:column;gap:4px;min-width:140px;">
            <span style="font-size:.75rem;color:#64748b;font-weight:600;">Total Responden</span>
            <strong style="font-size:1.5rem;color:#022c22;">{{ $surveys->total() }}</strong>
        </div>
    </div>

    {{-- Table --}}
    <div class="admin-users-table-card">
        @if ($surveys->isEmpty())
            <div class="admin-users-empty">
                <svg viewBox="0 0 24 24" fill="none" style="width:40px;height:40px;color:#94a3b8;margin-bottom:12px;">
                    <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                    <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
                <p>Belum ada jawaban survei.</p>
                <p style="font-size:.8rem;color:#94a3b8;">
                    Bagikan link survei kepada pelanggan:<br>
                    <a href="{{ route('survey.show') }}" target="_blank" style="color:#059669;">{{ route('survey.show') }}</a>
                </p>
            </div>
        @else
            <div class="admin-users-table-wrap">
                <table class="admin-users-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Rating Q1–Q8</th>
                            <th>Waktu Pengisian</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($surveys as $i => $survey)
                            @php
                                $ratings = [];
                                foreach (range(1,8) as $n) {
                                    $ratings[] = $survey->{"q{$n}_answer"};
                                }
                                $ratingCounts = array_count_values($ratings);
                                arsort($ratingCounts);
                                $topRating = array_key_first($ratingCounts) ?? '-';
                            @endphp
                            <tr>
                                <td>{{ $surveys->firstItem() + $i }}</td>
                                <td>
                                    <strong>{{ $survey->name }}</strong>
                                </td>
                                <td>
                                    @php
                                        $badgeMap = [
                                            'Sangat Baik'   => 'stock-value-badge-emerald',
                                            'Baik'          => 'stock-value-badge-blue',
                                            'Cukup'         => '',
                                            'Kurang'        => 'stock-value-badge-red',
                                            'Sangat Kurang' => 'stock-value-badge-red',
                                        ];
                                    @endphp
                                    @foreach ($ratingCounts as $rating => $count)
                                        <span class="stock-value-badge {{ $badgeMap[$rating] ?? '' }}" style="margin-right:4px;margin-bottom:4px;">
                                            {{ $rating }} ({{ $count }}x)
                                        </span>
                                    @endforeach
                                </td>
                                <td>{{ $survey->created_at->translatedFormat('d M Y, H:i') }}</td>
                                <td>
                                    <a
                                        href="{{ route('customer-surveys.show', $survey) }}"
                                        class="admin-users-secondary-button"
                                        style="display:inline-flex;align-items:center;gap:6px;font-size:.8rem;padding:6px 14px;text-decoration:none;"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" style="width:14px;height:14px;">
                                            <path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8"/>
                                            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/>
                                        </svg>
                                        Detail
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            {{-- Pagination --}}
            @if ($surveys->hasPages())
                <div style="padding:16px 20px;border-top:1px solid #e2e8f0;">
                    {{ $surveys->links() }}
                </div>
            @endif
        @endif
    </div>

</section>
@endsection
