@extends('layouts.dashboard')

@section('content')
    <section
        class="regular-booking-page animate-fade-in"
        data-package-size-page
        x-data="{
            packageSize: '{{ $packageSelectionState['package_size'] }}',
            requiresSeat: {{ $packageSelectionState['requires_seat'] ? 'true' : 'false' }},
            selectedSeats: {{ json_encode($packageSelectionState['selected_seats']) }},
            selectPackage(size, requiresSeat) {
                this.packageSize = size;
                this.requiresSeat = requiresSeat;
                if (!requiresSeat) {
                    this.selectedSeats = [];
                }
            },
            toggleSeat(code, occupied) {
                if (occupied) return;
                if (this.selectedSeats.includes(code)) {
                    this.selectedSeats = this.selectedSeats.filter(s => s !== code);
                } else if (this.selectedSeats.length < 1) {
                    this.selectedSeats = [code];
                }
            },
            isSeatSelected(code) {
                return this.selectedSeats.includes(code);
            },
            canContinue() {
                if (!this.packageSize) return false;
                if (this.requiresSeat) return this.selectedSeats.length === 1;
                return true;
            }
        }"
    >
        <section class="regular-booking-page-header">
            <div class="regular-booking-page-copy">
                <h1>Ukuran Paket</h1>
                <p>Pilih ukuran paket yang akan dikirim. Paket Besar memerlukan satu tempat duduk di kendaraan.</p>
            </div>

            <div class="regular-booking-page-actions">
                <span class="stock-value-badge stock-value-badge-emerald">Langkah 2 dari 4</span>
            </div>
        </section>

        @include('package-bookings.partials.stepper', ['steps' => $steps])

        @if ($flashSuccess)
            <section class="regular-booking-feedback-card">
                <div class="regular-booking-feedback-copy">
                    <span class="stock-value-badge stock-value-badge-emerald">Berhasil</span>
                    <p>{{ $flashSuccess }}</p>
                </div>
            </section>
        @endif

        @if ($flashNotice)
            <section class="regular-booking-feedback-card">
                <div class="regular-booking-feedback-copy">
                    <span class="stock-value-badge stock-value-badge-blue">Informasi</span>
                    <p>{{ $flashNotice }}</p>
                </div>
            </section>
        @endif

        @if ($errors->any())
            <section class="regular-booking-feedback-card regular-booking-feedback-card--error">
                <div class="regular-booking-feedback-copy">
                    <span class="regular-booking-feedback-label">Periksa Pilihan</span>
                    <p>Pilih ukuran paket terlebih dahulu. Paket Besar wajib memilih 1 kursi.</p>
                </div>
            </section>
        @endif

        <div class="regular-booking-layout">
            <form method="POST" action="{{ route('package-bookings.package.store') }}" class="regular-booking-form-card" x-ref="packageForm">
                @csrf

                {{-- Hidden fields --}}
                <input type="hidden" name="package_size" :value="packageSize">
                <template x-for="seat in selectedSeats" :key="seat">
                    <input type="hidden" name="seat_codes[]" :value="seat">
                </template>

                {{-- Package Size Selection --}}
                <section class="regular-booking-section">
                    <div class="regular-booking-section-head">
                        <h2>Pilih Ukuran Paket</h2>
                        <p>Paket Kecil dan Sedang tidak memerlukan tempat duduk. Paket Besar memerlukan 1 tempat duduk di kendaraan.</p>
                    </div>

                    <div class="regular-booking-options">
                        @foreach ($packageSizes as $size)
                            <label
                                class="regular-booking-radio"
                                :class="{ 'is-selected': packageSize === '{{ $size['value'] }}' }"
                                @click="selectPackage('{{ $size['value'] }}', {{ $size['requires_seat'] ? 'true' : 'false' }})"
                            >
                                <input
                                    type="radio"
                                    name="_package_size_display"
                                    value="{{ $size['value'] }}"
                                    x-bind:checked="packageSize === '{{ $size['value'] }}'"
                                    style="display:none"
                                >
                                <span class="regular-booking-radio-marker" aria-hidden="true"></span>
                                <span class="regular-booking-radio-copy">
                                    <strong>{{ $size['label'] }}</strong>
                                    <span>{{ $size['description'] }}</span>
                                </span>
                            </label>
                        @endforeach
                    </div>

                    @error('package_size')
                        <p class="regular-booking-field-error">{{ $message }}</p>
                    @enderror
                </section>

                {{-- Seat Selection (only for Paket Besar) --}}
                <section class="regular-booking-section" x-show="requiresSeat" x-transition>
                    <div class="regular-booking-section-head">
                        <h2>Pilih Tempat Duduk untuk Paket Besar</h2>
                        <p>Pilih 1 kursi yang akan ditempati oleh paket besar Anda di kendaraan.</p>
                    </div>

                    <div class="regular-booking-seat-legend" aria-label="Status kursi">
                        <div class="regular-booking-seat-legend-item">
                            <span class="regular-booking-seat-legend-chip"></span>
                            <span>Tersedia</span>
                        </div>
                        <div class="regular-booking-seat-legend-item">
                            <span class="regular-booking-seat-legend-chip is-selected"></span>
                            <span>Dipilih</span>
                        </div>
                        <div class="regular-booking-seat-legend-item">
                            <span class="regular-booking-seat-legend-chip is-occupied"></span>
                            <span>Sudah Terisi</span>
                        </div>
                    </div>

                    <div class="regular-booking-seat-stage">
                        <div class="regular-booking-vehicle-shell">
                            <div class="regular-booking-vehicle-head">
                                <span>Arah depan kendaraan</span>
                                <span>Kursi penumpang</span>
                            </div>

                            <div class="regular-booking-vehicle-layout" role="group" aria-label="Pilihan kursi untuk paket besar">
                                @foreach ($seatLayout as $seat)
                                    @if ($seat['kind'] === 'driver')
                                        <article class="regular-booking-driver-panel" data-area="{{ $seat['area'] }}">
                                            <span class="regular-booking-driver-shell" aria-hidden="true">
                                                <svg viewBox="0 0 80 90" fill="none">
                                                    <path d="M24 18C24 12.4772 28.4772 8 34 8H46C51.5228 8 56 12.4772 56 18V27H58C63.5228 27 68 31.4772 68 37V58C68 69.0457 59.0457 78 48 78H32C20.9543 78 12 69.0457 12 58V37C12 31.4772 16.4772 27 22 27H24V18Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
                                                    <path d="M31 58V64C31 68.4183 34.5817 72 39 72H41C45.4183 72 49 68.4183 49 64V58" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </span>
                                            <div class="regular-booking-driver-wheel" aria-hidden="true">
                                                <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="7" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="2.2" stroke="currentColor" stroke-width="1.8"/><path d="M12 5V9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M6 13H9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M15 13H18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                                            </div>
                                            <span class="regular-booking-driver-label">{{ $seat['label'] }}</span>
                                        </article>
                                    @elseif ($seat['is_visible'] ?? true)
                                        @php
                                            $isOccupied = $seat['is_occupied'] ?? false;
                                        @endphp
                                        <label
                                            class="regular-booking-seat-card"
                                            :class="{
                                                'is-selected': isSeatSelected('{{ $seat['code'] }}'),
                                                'is-occupied': {{ $isOccupied ? 'true' : 'false' }}
                                            }"
                                            data-seat-area="{{ $seat['area'] }}"
                                            @click.prevent="toggleSeat('{{ $seat['code'] }}', {{ $isOccupied ? 'true' : 'false' }})"
                                            style="cursor: {{ $isOccupied ? 'not-allowed' : 'pointer' }}"
                                        >
                                            <span class="regular-booking-seat-card-shell" aria-hidden="true">
                                                <svg viewBox="0 0 80 90" fill="none">
                                                    <path d="M24 18C24 12.4772 28.4772 8 34 8H46C51.5228 8 56 12.4772 56 18V27H58C63.5228 27 68 31.4772 68 37V58C68 69.0457 59.0457 78 48 78H32C20.9543 78 12 69.0457 12 58V37C12 31.4772 16.4772 27 22 27H24V18Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
                                                    <path d="M31 58V64C31 68.4183 34.5817 72 39 72H41C45.4183 72 49 68.4183 49 64V58" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </svg>
                                            </span>
                                            <span class="regular-booking-seat-card-inner">
                                                <strong>{{ $seat['label'] }}</strong>
                                            </span>
                                        </label>
                                    @endif
                                @endforeach
                            </div>
                        </div>
                    </div>

                    <div class="regular-booking-seat-feedback" aria-live="polite">
                        <div class="regular-booking-seat-feedback-copy">
                            <strong x-text="selectedSeats.length === 1 ? 'Kursi terpilih: ' + selectedSeats.join(', ') : 'Pilih 1 kursi untuk paket besar'"></strong>
                            <p>Paket besar memerlukan 1 kursi di kendaraan.</p>
                        </div>
                    </div>

                    @error('seat_codes')
                        <p class="regular-booking-field-error">{{ $message }}</p>
                    @enderror
                </section>

                <div class="regular-booking-form-actions">
                    <a href="{{ route('package-bookings.index') }}" class="dashboard-ghost-button">Kembali</a>
                    <button
                        class="dashboard-primary-button"
                        type="submit"
                        :disabled="!canContinue()"
                        x-bind:class="{ 'opacity-50 cursor-not-allowed': !canContinue() }"
                    >
                        Lanjut ke Review
                    </button>
                </div>
            </form>

            <aside class="regular-booking-sidebar">
                <section class="regular-booking-summary-card">
                    <div class="regular-booking-summary-head">
                        <h2>Ringkasan Paket</h2>
                        <p>Ringkasan pengiriman paket yang sedang disiapkan.</p>
                    </div>

                    <div class="regular-booking-summary-grid">
                        <div class="regular-booking-summary-item">
                            <span>Rute</span>
                            <strong>{{ $draftSummary['route'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Jam Keberangkatan</span>
                            <strong>{{ $draftSummary['departure_time'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Pengirim</span>
                            <strong>{{ $draftSummary['sender_name'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Penerima</span>
                            <strong>{{ $draftSummary['recipient_name'] }}</strong>
                        </div>
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Ukuran Paket</span>
                            <strong x-text="packageSize ? packageSize : 'Belum dipilih'"></strong>
                        </div>
                        <div class="regular-booking-summary-item">
                            <span>Kursi Terpilih</span>
                            <strong x-text="selectedSeats.length > 0 ? selectedSeats.join(', ') : '-'"></strong>
                        </div>
                        <div class="regular-booking-summary-item regular-booking-summary-item--highlight">
                            <span>Total Ongkos</span>
                            <strong>{{ $draftSummary['total_amount'] }}</strong>
                        </div>
                    </div>
                </section>

                <section class="regular-booking-note-card">
                    <div class="regular-booking-note-head">
                        <h2>Ketentuan Ukuran Paket</h2>
                    </div>
                    <ul class="regular-booking-note-list">
                        <li><strong>Paket Kecil</strong>: Dokumen, makanan, barang kecil. Tidak menggunakan kursi.</li>
                        <li><strong>Paket Sedang</strong>: Tas, koper kecil, barang sedang. Tidak menggunakan kursi.</li>
                        <li><strong>Paket Besar</strong>: Barang berukuran besar yang memerlukan 1 kursi di kendaraan.</li>
                    </ul>
                </section>
            </aside>
        </div>
    </section>
@endsection
