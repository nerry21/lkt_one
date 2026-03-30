@extends('layouts.dashboard')

@section('content')
<section class="admin-users-page animate-fade-in">

    {{-- Header --}}
    <section class="admin-users-page-header">
        <div class="admin-users-page-copy">
            <h1>Survei Pelanggan</h1>
            <p>Hasil jawaban survei kepuasan pelanggan JET (JAYA EXCECUTIVE TRANSPORT).</p>
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

    {{-- Flash message --}}
    @if (session('success'))
        <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:12px 18px;margin-bottom:16px;color:#166534;font-size:.875rem;font-weight:500;">
            {{ session('success') }}
        </div>
    @endif

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
                            <th>Driver</th>
                            <th>Kode Mobil</th>
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
                                    @if ($survey->driver)
                                        {{ $survey->driver->nama }}
                                    @else
                                        <span style="color:#94a3b8;font-size:.8rem;">—</span>
                                    @endif
                                </td>
                                <td>
                                    @if ($survey->kode_mobil)
                                        <span class="stock-value-badge">{{ $survey->kode_mobil }}</span>
                                    @else
                                        <span style="color:#94a3b8;font-size:.8rem;">—</span>
                                    @endif
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
                                    <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                                        {{-- Detail --}}
                                        <a
                                            href="{{ route('customer-surveys.show', $survey) }}"
                                            class="admin-users-secondary-button"
                                            style="display:inline-flex;align-items:center;gap:6px;font-size:.8rem;padding:6px 12px;text-decoration:none;"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;">
                                                <path d="M2.5 12C4.4 8.2 8 6 12 6C16 6 19.6 8.2 21.5 12C19.6 15.8 16 18 12 18C8 18 4.4 15.8 2.5 12Z" stroke="currentColor" stroke-width="1.8"/>
                                                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/>
                                            </svg>
                                            Detail
                                        </a>

                                        {{-- Edit --}}
                                        <button
                                            type="button"
                                            class="admin-users-secondary-button"
                                            style="display:inline-flex;align-items:center;gap:6px;font-size:.8rem;padding:6px 12px;cursor:pointer;border:none;background:none;"
                                            onclick="openEditModal({{ $survey->id }}, '{{ addslashes($survey->driver_id ?? '') }}', '{{ addslashes($survey->kode_mobil ?? '') }}')"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;">
                                                <path d="M11 4H4C3.44772 4 3 4.44772 3 5V20C3 20.5523 3.44772 21 4 21H19C19.5523 21 20 20.5523 20 19V12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                                <path d="M18.5 2.5C19.3284 1.67157 20.6716 1.67157 21.5 2.5C22.3284 3.32843 22.3284 4.67157 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            Edit
                                        </button>

                                        {{-- Delete --}}
                                        <button
                                            type="button"
                                            style="display:inline-flex;align-items:center;gap:6px;font-size:.8rem;padding:6px 12px;cursor:pointer;border:1px solid #fecaca;border-radius:8px;background:#fff5f5;color:#dc2626;"
                                            onclick="openDeleteModal({{ $survey->id }}, '{{ addslashes($survey->name) }}')"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" style="width:13px;height:13px;">
                                                <path d="M3 6H21M8 6V4H16V6M19 6L18.1 19.1C18.0 20.2 17.1 21 16 21H8C6.9 21 6.0 20.2 5.9 19.1L5 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            Hapus
                                        </button>
                                    </div>
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

{{-- ===== Edit Modal ===== --}}
<div id="editModal" style="display:none;position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.45);align-items:center;justify-content:center;">
    <div style="background:#fff;border-radius:16px;padding:28px 32px;width:100%;max-width:460px;box-shadow:0 20px 60px rgba(0,0,0,.2);">
        <h2 style="margin:0 0 4px;font-size:1.1rem;color:#022c22;">Edit Data Survei</h2>
        <p style="margin:0 0 20px;font-size:.85rem;color:#64748b;">Perbarui driver dan kode mobil untuk survei ini.</p>

        <form id="editForm" method="POST">
            @csrf
            @method('PATCH')

            <div style="margin-bottom:16px;">
                <label style="display:block;font-size:.8rem;font-weight:600;color:#374151;margin-bottom:6px;">Driver</label>
                <select name="driver_id" id="editDriverId" style="width:100%;padding:10px 12px;border:1px solid #d1d5db;border-radius:8px;font-size:.875rem;color:#0f172a;background:#fff;outline:none;">
                    <option value="">— Pilih Driver —</option>
                    @foreach ($drivers as $driver)
                        <option value="{{ $driver->id }}">{{ $driver->nama }}</option>
                    @endforeach
                </select>
            </div>

            <div style="margin-bottom:24px;">
                <label style="display:block;font-size:.8rem;font-weight:600;color:#374151;margin-bottom:6px;">Kode Mobil</label>
                <select name="kode_mobil" id="editKodeMobil" style="width:100%;padding:10px 12px;border:1px solid #d1d5db;border-radius:8px;font-size:.875rem;color:#0f172a;background:#fff;outline:none;">
                    <option value="">— Pilih Kode Mobil —</option>
                    @foreach ($mobils as $mobil)
                        <option value="{{ $mobil->kode_mobil }}">{{ $mobil->kode_mobil }} ({{ $mobil->jenis_mobil }})</option>
                    @endforeach
                </select>
            </div>

            <div style="display:flex;gap:10px;justify-content:flex-end;">
                <button type="button" onclick="closeEditModal()" style="padding:9px 18px;border:1px solid #d1d5db;border-radius:8px;background:#fff;font-size:.875rem;color:#374151;cursor:pointer;">
                    Batal
                </button>
                <button type="submit" class="admin-users-primary-button" style="padding:9px 20px;font-size:.875rem;">
                    Simpan
                </button>
            </div>
        </form>
    </div>
</div>

{{-- ===== Delete Modal ===== --}}
<div id="deleteModal" style="display:none;position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.45);align-items:center;justify-content:center;">
    <div style="background:#fff;border-radius:16px;padding:28px 32px;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(0,0,0,.2);">
        <h2 style="margin:0 0 4px;font-size:1.1rem;color:#dc2626;">Hapus Survei</h2>
        <p style="margin:0 0 20px;font-size:.875rem;color:#374151;">
            Yakin ingin menghapus survei dari <strong id="deleteModalName"></strong>? Tindakan ini tidak dapat dibatalkan.
        </p>

        <form id="deleteForm" method="POST">
            @csrf
            @method('DELETE')
            <div style="display:flex;gap:10px;justify-content:flex-end;">
                <button type="button" onclick="closeDeleteModal()" style="padding:9px 18px;border:1px solid #d1d5db;border-radius:8px;background:#fff;font-size:.875rem;color:#374151;cursor:pointer;">
                    Batal
                </button>
                <button type="submit" style="padding:9px 20px;border:none;border-radius:8px;background:#dc2626;color:#fff;font-size:.875rem;font-weight:600;cursor:pointer;">
                    Ya, Hapus
                </button>
            </div>
        </form>
    </div>
</div>

<script>
(function () {
    var baseUrl = '{{ url('/dashboard/customer-surveys') }}';

    window.openEditModal = function (id, driverId, kodeMobil) {
        document.getElementById('editForm').action = baseUrl + '/' + id;
        var driverSel = document.getElementById('editDriverId');
        var mobilSel  = document.getElementById('editKodeMobil');
        for (var i = 0; i < driverSel.options.length; i++) {
            driverSel.options[i].selected = (driverSel.options[i].value === driverId);
        }
        for (var j = 0; j < mobilSel.options.length; j++) {
            mobilSel.options[j].selected = (mobilSel.options[j].value === kodeMobil);
        }
        document.getElementById('editModal').style.display = 'flex';
    };

    window.closeEditModal = function () {
        document.getElementById('editModal').style.display = 'none';
    };

    window.openDeleteModal = function (id, name) {
        document.getElementById('deleteForm').action = baseUrl + '/' + id;
        document.getElementById('deleteModalName').textContent = name;
        document.getElementById('deleteModal').style.display = 'flex';
    };

    window.closeDeleteModal = function () {
        document.getElementById('deleteModal').style.display = 'none';
    };

    // Close modals on backdrop click
    document.getElementById('editModal').addEventListener('click', function (e) {
        if (e.target === this) closeEditModal();
    });
    document.getElementById('deleteModal').addEventListener('click', function (e) {
        if (e.target === this) closeDeleteModal();
    });
})();
</script>
@endsection
