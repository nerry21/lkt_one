<div class="ddrop-form-grid">

    {{-- Bug #38: hidden version untuk optimistic lock. Di-set via JS populateEditModal. --}}
    <input type="hidden" name="version" value="{{ $booking?->version ?? 0 }}">

    <div class="ddrop-section-divider">Data Pemesan</div>

    <div class="ddrop-form-field">
        <label>Nama Pemesan <span class="req">*</span></label>
        <input type="text" name="passenger_name" class="ddrop-form-input"
            value="{{ old('passenger_name', $booking?->passenger_name ?? '') }}"
            placeholder="Nama lengkap pemesan" required>
    </div>

    <div class="ddrop-form-field">
        <label>No HP <span class="req">*</span></label>
        <input type="tel" name="passenger_phone" class="ddrop-form-input"
            value="{{ old('passenger_phone', $booking?->passenger_phone ?? '') }}"
            placeholder="08xxxxxxxxxx" inputmode="numeric" required>
    </div>

    <div class="ddrop-section-divider">Rute Dropping</div>

    <div class="ddrop-form-field">
        <label>Asal Penjemputan <span class="req">*</span></label>
        <input type="text" name="from_city" class="ddrop-form-input"
            value="{{ old('from_city', $booking?->from_city ?? '') }}"
            placeholder="Kota / lokasi asal" required>
    </div>

    <div class="ddrop-form-field">
        <label>Tujuan <span class="req">*</span></label>
        <input type="text" name="to_city" class="ddrop-form-input"
            value="{{ old('to_city', $booking?->to_city ?? '') }}"
            placeholder="Kota / lokasi tujuan" required>
    </div>

    <div class="ddrop-form-field col-span-2">
        <label>Alamat Penjemputan <span class="req">*</span></label>
        <textarea name="pickup_location" class="ddrop-form-textarea"
            placeholder="Alamat lengkap lokasi penjemputan (min. 5 karakter)" required
        >{{ old('pickup_location', $booking?->pickup_location ?? '') }}</textarea>
    </div>

    <div class="ddrop-form-field col-span-2">
        <label>Alamat Pengantaran <span class="req">*</span></label>
        <textarea name="dropoff_location" class="ddrop-form-textarea"
            placeholder="Alamat lengkap lokasi pengantaran (min. 5 karakter)" required
        >{{ old('dropoff_location', $booking?->dropoff_location ?? '') }}</textarea>
    </div>

    <div class="ddrop-section-divider">Jadwal & Tarif</div>

    <div class="ddrop-form-field">
        <label>Tanggal Keberangkatan <span class="req">*</span></label>
        <input type="date" name="trip_date" class="ddrop-form-input"
            value="{{ old('trip_date', $booking?->trip_date?->format('Y-m-d') ?? '') }}" required>
    </div>

    <div class="ddrop-form-field">
        <label>Jam Keberangkatan <span class="req">*</span></label>
        <input type="time" name="trip_time" class="ddrop-form-input"
            value="{{ old('trip_time', isset($booking) ? substr($booking->trip_time ?? '', 0, 5) : '') }}" required>
    </div>

    <div class="ddrop-form-field">
        <label>Tarif Dropping (Rp) <span class="req">*</span></label>
        <input type="number" name="price_per_seat" class="ddrop-form-input"
            value="{{ old('price_per_seat', isset($booking) ? (int)($booking->price_per_seat ?? 0) : '') }}"
            placeholder="Tarif dropping" min="0" step="1000" required>
    </div>

    <div class="ddrop-form-field">
        <label>Tambahan Ongkos Dropping (Rp)</label>
        <input type="number" name="additional_fare" class="ddrop-form-input"
            value="{{ old('additional_fare', isset($booking) ? max(0, (int)($booking->total_amount ?? 0) - (int)($booking->price_per_seat ?? 0)) : '') }}"
            placeholder="Tambahan ongkos (opsional)" min="0" step="1000">
    </div>

    <div class="ddrop-section-divider">Pembayaran & Keterangan</div>

    <div class="ddrop-form-field">
        <label>Metode Pembayaran</label>
        <select name="payment_method" class="ddrop-form-select">
            <option value="">— Pilih Metode —</option>
            <option value="transfer" @selected(old('payment_method', $booking?->payment_method) === 'transfer')>Transfer Bank</option>
            <option value="qris"     @selected(old('payment_method', $booking?->payment_method) === 'qris')>QRIS</option>
            <option value="cash"     @selected(old('payment_method', $booking?->payment_method) === 'cash')>Tunai</option>
        </select>
    </div>

    <div class="ddrop-form-field">
        <label>Status Pembayaran</label>
        <select name="payment_status" class="ddrop-form-select">
            <option value="Belum Bayar"           @selected(old('payment_status', $booking?->payment_status ?? 'Belum Bayar') === 'Belum Bayar')>Belum Bayar</option>
            <option value="Menunggu Konfirmasi"   @selected(old('payment_status', $booking?->payment_status) === 'Menunggu Konfirmasi')>Menunggu Konfirmasi</option>
            <option value="Dibayar"               @selected(old('payment_status', $booking?->payment_status) === 'Dibayar')>Dibayar (Transfer/QRIS)</option>
            <option value="Dibayar Tunai"         @selected(old('payment_status', $booking?->payment_status) === 'Dibayar Tunai')>Dibayar Tunai</option>
        </select>
    </div>

    <div class="ddrop-form-field col-span-2">
        <label>Keterangan</label>
        <textarea name="notes" class="ddrop-form-textarea"
            placeholder="Catatan tambahan (opsional)"
        >{{ old('notes', $booking?->notes ?? '') }}</textarea>
    </div>

    <div class="ddrop-section-divider">Data Driver & Armada</div>

    <div class="ddrop-form-field">
        <label>Driver</label>
        <select name="driver_id" class="ddrop-form-select">
            <option value="">— Pilih Driver —</option>
            @foreach ($drivers ?? [] as $driver)
                <option value="{{ $driver->id }}"
                    @selected(old('driver_id', $booking?->driver_id) === (string) $driver->id)>
                    {{ $driver->nama }}{{ $driver->lokasi ? ' — ' . $driver->lokasi : '' }}
                </option>
            @endforeach
        </select>
    </div>

    <div class="ddrop-form-field">
        <label>Mobil</label>
        <select name="mobil_id" class="ddrop-form-select">
            <option value="">— Pilih Mobil —</option>
            @foreach ($mobils ?? [] as $mobil)
                <option value="{{ $mobil->id }}"
                    @selected(old('mobil_id', $booking?->mobil_id) === (string) $mobil->id)>
                    {{ $mobil->kode_mobil }} — {{ $mobil->jenis_mobil }}
                </option>
            @endforeach
        </select>
    </div>

    <div class="ddrop-form-field">
        <label>Pool Tujuan Akhir <span class="req">*</span></label>
        <select name="dropping_pool_target" class="ddrop-form-select" required>
            <option value="ROHUL" @selected(old('dropping_pool_target', $booking?->dropping_pool_target ?? 'ROHUL') === 'ROHUL')>Rokan Hulu</option>
            <option value="PKB"   @selected(old('dropping_pool_target', $booking?->dropping_pool_target) === 'PKB')>Pekanbaru</option>
        </select>
    </div>

</div>
