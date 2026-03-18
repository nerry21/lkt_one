<div class="ddrop-form-grid">

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

    <div class="ddrop-form-field col-span-2">
        <label>Tarif Final (Rp) <span class="req">*</span></label>
        <input type="number" name="total_amount" class="ddrop-form-input"
            value="{{ old('total_amount', isset($booking) ? (int)($booking->total_amount ?? 0) : '') }}"
            placeholder="Masukkan total tarif dropping" min="0" step="1000" required>
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

</div>
