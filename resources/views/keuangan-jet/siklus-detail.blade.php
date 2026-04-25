@extends('layouts.dashboard')

@section('content')
    <section class="keuangan-jet-detail-page animate-fade-in" data-keuangan-jet-detail-page data-siklus-id="{{ $siklus->id }}" data-status-siklus="{{ $siklus->status_siklus }}">
        @php
            $initialState = [
                'siklus_id' => $siklus->id,
                'status_siklus' => $siklus->status_siklus,
                'driver_paid_status' => $siklus->driver_paid_status,
                'csrf_token' => csrf_token(),
                'urls' => [
                    'refresh' => route('keuangan-jet.refresh', $siklus->id),
                    'biaya' => route('keuangan-jet.update-biaya', $siklus->id),
                    'driver_paid' => route('keuangan-jet.driver-paid', $siklus->id),
                    'driver_override' => route('keuangan-jet.driver-override', $siklus->id),
                    'index' => route('keuangan-jet.index'),
                ],
                'rows' => $siklus->keuanganJets->map(fn ($r) => [
                    'id' => $r->id,
                    'admin_paid_status' => $r->admin_paid_status,
                    'jenis_layanan' => $r->jenis_layanan,
                    'sumber_rental' => $r->sumber_rental,
                    'persen_admin' => $r->persen_admin,
                    'uang_snack' => (float) $r->uang_snack,
                    'urls' => [
                        'update' => route('keuangan-jet.update-row', $r->id),
                        'admin_paid' => route('keuangan-jet.admin-paid', $r->id),
                    ],
                ])->values(),
                'drivers' => $driverList->map(fn ($d) => ['id' => $d->id, 'nama' => $d->nama])->values(),
            ];
        @endphp
        <script id="keuangan-jet-initial-state" type="application/json">{!! json_encode($initialState) !!}</script>

        <section class="keuangan-jet-page-header">
            <div class="keuangan-jet-page-copy">
                <h1>Detail Siklus #{{ $siklus->id }}</h1>
                <p>{{ $siklus->mobil_code }} — {{ \Illuminate\Support\Carbon::parse($siklus->tanggal_mulai)->format('d M Y') }}@if ($siklus->tanggal_selesai) s/d {{ \Illuminate\Support\Carbon::parse($siklus->tanggal_selesai)->format('d M Y') }}@endif</p>
            </div>
            <div class="keuangan-jet-page-actions">
                <a href="{{ route('keuangan-jet.index') }}" class="keuangan-jet-secondary-button">← Kembali ke Daftar</a>
                @if ($siklus->status_siklus !== 'locked')
                    <button type="button" class="keuangan-jet-secondary-button" data-action="refresh">
                        🔄 Refresh dari Booking
                    </button>
                @endif
            </div>
        </section>

        @if ($siklus->status_siklus === 'locked')
            <div class="keuangan-jet-info-card keuangan-jet-info-card-locked">
                🔒 <strong>Siklus locked.</strong> Driver sudah dibayar pada {{ $siklus->driver_paid_at?->format('d M Y H:i') }}. Tidak bisa edit lagi.
            </div>
        @endif

        {{-- Driver Section dengan Override Button --}}
        <section class="keuangan-jet-info-card">
            <div class="keuangan-jet-section-header">
                <h2 class="keuangan-jet-section-title">Informasi Driver & Mobil</h2>
                @if ($siklus->status_siklus !== 'locked')
                    <button type="button" class="keuangan-jet-link-button" data-action="open-driver-override">
                        ✏️ Override Driver
                    </button>
                @endif
            </div>
            <dl class="keuangan-jet-info-grid">
                <div class="keuangan-jet-info-item">
                    <dt>Mobil</dt>
                    <dd>{{ $siklus->mobil_code }} ({{ $siklus->mobil?->home_pool ?? '-' }})</dd>
                </div>
                <div class="keuangan-jet-info-item">
                    <dt>Driver yang Jalan</dt>
                    <dd id="driver-actual-display">
                        {{ $siklus->driver_name_actual }}
                        @if ($siklus->is_driver_overridden)
                            <span class="keuangan-jet-badge keuangan-jet-badge-amber">OVERRIDE</span>
                            @if ($siklus->driverPlanned)
                                <br/><small>Planned: {{ $siklus->driverPlanned->nama }}</small>
                            @endif
                        @endif
                    </dd>
                </div>
                <div class="keuangan-jet-info-item">
                    <dt>Status Siklus</dt>
                    <dd>
                        <span class="keuangan-jet-status-pill keuangan-jet-status-{{ $siklus->status_siklus }}">{{ ucfirst($siklus->status_siklus) }}</span>
                        @if ($siklus->completed_at)
                            <br/><small>Complete pada {{ $siklus->completed_at->format('d M Y H:i') }} via {{ $siklus->completed_via }}</small>
                        @endif
                    </dd>
                </div>
                <div class="keuangan-jet-info-item">
                    <dt>Pembayaran Driver</dt>
                    <dd>
                        <span class="keuangan-jet-payout-pill keuangan-jet-payout-{{ $siklus->driver_paid_status }}">
                            {{ $siklus->driver_paid_status === 'sudah' ? 'Sudah Dibayar' : 'Belum Dibayar' }}
                        </span>
                        @if ($siklus->driver_paid_at)
                            <br/><small>Dibayar {{ $siklus->driver_paid_at->format('d M Y H:i') }}</small>
                        @endif
                    </dd>
                </div>
            </dl>
        </section>

        {{-- Trip rows table dengan inline edit form --}}
        <section class="keuangan-jet-info-card">
            <h2 class="keuangan-jet-section-title">Trip Detail per Arah</h2>
            @if ($siklus->keuanganJets->isEmpty())
                <p class="keuangan-jet-empty-state-hint">Belum ada trip dalam siklus ini.</p>
            @else
                <div class="keuangan-jet-table-wrapper">
                    <table class="keuangan-jet-table">
                        <thead>
                            <tr>
                                <th>Trip ke</th>
                                <th>Jam</th>
                                <th>Arah</th>
                                <th>Jenis Layanan</th>
                                <th>Penumpang</th>
                                <th>Ongkos Penumpang</th>
                                <th>Paket</th>
                                <th>Ongkos Paket</th>
                                <th>Snack</th>
                                <th>Admin %</th>
                                <th>Uang Admin</th>
                                <th>Total Pendapatan</th>
                                <th>Bayar Admin</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($siklus->keuanganJets as $row)
                                <tr data-row-id="{{ $row->id }}">
                                    <td>{{ $row->trip_ke }}</td>
                                    <td>{{ \Illuminate\Support\Carbon::parse($row->jam)->format('H:i') }}</td>
                                    <td>
                                        <span class="keuangan-jet-direction-pill keuangan-jet-direction-{{ strtolower($row->direction) }}">{{ $row->direction }}</span>
                                    </td>
                                    <td>
                                        {{ $row->jenis_layanan }}
                                        @if ($row->sumber_rental)
                                            <br/><small>({{ $row->sumber_rental }})</small>
                                        @endif
                                    </td>
                                    <td>{{ $row->jumlah_penumpang }}</td>
                                    <td>Rp {{ number_format((float) $row->total_ongkos_penumpang, 0, ',', '.') }}</td>
                                    <td>{{ $row->jumlah_paket }}</td>
                                    <td>Rp {{ number_format((float) $row->total_ongkos_paket, 0, ',', '.') }}</td>
                                    <td>Rp {{ number_format((float) $row->uang_snack, 0, ',', '.') }}</td>
                                    <td>{{ $row->persen_admin }}%</td>
                                    <td>Rp {{ number_format((float) $row->uang_admin, 0, ',', '.') }}</td>
                                    <td><strong>Rp {{ number_format((float) $row->total_pendapatan_arah, 0, ',', '.') }}</strong></td>
                                    <td>
                                        <span class="keuangan-jet-payout-pill keuangan-jet-payout-{{ $row->admin_paid_status }}">
                                            {{ $row->admin_paid_status === 'sudah' ? 'Sudah' : 'Belum' }}
                                        </span>
                                    </td>
                                    <td class="keuangan-jet-row-actions">
                                        @if ($siklus->status_siklus !== 'locked')
                                            <button type="button" class="keuangan-jet-link-button" data-action="open-row-edit" data-row-id="{{ $row->id }}">
                                                ✏️ Edit
                                            </button>
                                            @if ($row->admin_paid_status === 'belum')
                                                <button type="button" class="keuangan-jet-link-button" data-action="open-admin-paid" data-row-id="{{ $row->id }}">
                                                    💰 Mark Paid
                                                </button>
                                            @endif
                                        @endif
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            @endif
        </section>

        {{-- Operasional & Bagi Hasil dengan Edit Form --}}
        <section class="keuangan-jet-info-card">
            <div class="keuangan-jet-section-header">
                <h2 class="keuangan-jet-section-title">Biaya Operasional & Bagi Hasil</h2>
                @if ($siklus->status_siklus !== 'locked')
                    <button type="button" class="keuangan-jet-link-button" data-action="open-biaya-edit">
                        ✏️ Edit Biaya
                    </button>
                @endif
            </div>

            @if ($siklus->status_siklus === 'berjalan')
                <div class="keuangan-jet-info-warning">
                    <strong>Menunggu kepulangan.</strong> Bagi hasil 30/70 baru dihitung saat trip kepulangan di-mark berangkat di Trip Planning.
                </div>
            @endif

            <dl class="keuangan-jet-info-grid keuangan-jet-info-grid-financial">
                <div class="keuangan-jet-info-item"><dt>Uang Jalan (BBM + Makan)</dt><dd>Rp {{ number_format((float) $siklus->uang_jalan, 0, ',', '.') }}</dd></div>
                <div class="keuangan-jet-info-item"><dt>Biaya Kurir</dt><dd>Rp {{ number_format((float) $siklus->biaya_kurir, 0, ',', '.') }}</dd></div>
                <div class="keuangan-jet-info-item"><dt>Biaya Cuci Mobil</dt><dd>Rp {{ number_format((float) $siklus->biaya_cuci_mobil, 0, ',', '.') }}</dd></div>
                <div class="keuangan-jet-info-item keuangan-jet-info-item-emphasis"><dt>Total Pendapatan Kotor</dt><dd>Rp {{ number_format((float) $siklus->total_pendapatan_kotor, 0, ',', '.') }}</dd></div>
                <div class="keuangan-jet-info-item"><dt>Total Potongan Admin</dt><dd>Rp {{ number_format((float) $siklus->total_admin_potong, 0, ',', '.') }}</dd></div>
                <div class="keuangan-jet-info-item"><dt>Total Operasional</dt><dd>Rp {{ number_format((float) $siklus->total_operasional, 0, ',', '.') }}</dd></div>
                <div class="keuangan-jet-info-item keuangan-jet-info-item-emphasis"><dt>Total Pendapatan Bersih</dt><dd>Rp {{ number_format((float) $siklus->total_pendapatan_bersih, 0, ',', '.') }}</dd></div>
                <div class="keuangan-jet-info-item keuangan-jet-info-item-driver"><dt>Bagi Hasil Driver (30%)</dt><dd>Rp {{ number_format((float) $siklus->uang_driver, 0, ',', '.') }}</dd></div>
                <div class="keuangan-jet-info-item keuangan-jet-info-item-mobil"><dt>Bagi Hasil Mobil (70%)</dt><dd>Rp {{ number_format((float) $siklus->uang_mobil, 0, ',', '.') }}</dd></div>
            </dl>
        </section>

        {{-- Driver Paid Action --}}
        @if ($siklus->status_siklus === 'complete' && $siklus->driver_paid_status === 'belum')
            <section class="keuangan-jet-info-card keuangan-jet-info-card-action">
                <h2 class="keuangan-jet-section-title">Pembayaran Driver</h2>
                <p>Bagi hasil sudah computed. Mark driver sebagai "sudah dibayar" akan <strong>lock</strong> siklus ini permanently.</p>
                <button type="button" class="keuangan-jet-primary-button" data-action="open-driver-paid">
                    💵 Mark Driver Paid (Lock Siklus)
                </button>
            </section>
        @endif

        {{-- Modals --}}
        @include('keuangan-jet.partials.modals')
    </section>
@endsection
