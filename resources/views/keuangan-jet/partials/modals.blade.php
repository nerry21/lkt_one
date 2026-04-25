{{-- Modal: Edit Biaya Operasional --}}
<div id="modal-biaya-edit" class="modal-shell" hidden>
    <div class="modal-backdrop" data-modal-close></div>
    <div class="modal-panel" role="dialog" aria-labelledby="modal-biaya-title">
        <header class="modal-header">
            <h3 id="modal-biaya-title">Edit Biaya Operasional</h3>
            <button type="button" class="modal-close-btn" data-modal-close aria-label="Tutup">&times;</button>
        </header>
        <form id="form-biaya-edit" class="modal-body">
            <div class="keuangan-jet-form-field">
                <label for="biaya-uang-jalan">Uang Jalan (BBM + Makan)</label>
                <input type="number" id="biaya-uang-jalan" name="uang_jalan" min="0" step="1000" value="{{ (int) $siklus->uang_jalan }}" required />
            </div>
            <div class="keuangan-jet-form-field">
                <label for="biaya-kurir">Biaya Kurir</label>
                <input type="number" id="biaya-kurir" name="biaya_kurir" min="0" step="1000" value="{{ (int) $siklus->biaya_kurir }}" required />
            </div>
            <div class="keuangan-jet-form-field">
                <label for="biaya-cuci-mobil">Biaya Cuci Mobil</label>
                <input type="number" id="biaya-cuci-mobil" name="biaya_cuci_mobil" min="0" step="1000" value="{{ (int) $siklus->biaya_cuci_mobil }}" required />
            </div>
            <footer class="modal-footer">
                <button type="button" class="keuangan-jet-secondary-button" data-modal-close>Batal</button>
                <button type="submit" class="keuangan-jet-primary-button">Simpan</button>
            </footer>
        </form>
    </div>
</div>

{{-- Modal: Driver Override --}}
<div id="modal-driver-override" class="modal-shell" hidden>
    <div class="modal-backdrop" data-modal-close></div>
    <div class="modal-panel" role="dialog" aria-labelledby="modal-driver-title">
        <header class="modal-header">
            <h3 id="modal-driver-title">Override Driver Actual</h3>
            <button type="button" class="modal-close-btn" data-modal-close aria-label="Tutup">&times;</button>
        </header>
        <form id="form-driver-override" class="modal-body">
            <div class="keuangan-jet-form-field">
                <label for="driver-override-select">Pilih Driver Pengganti</label>
                <select id="driver-override-select" name="driver_id" required>
                    <option value="">— Pilih Driver —</option>
                    @foreach ($driverList as $driver)
                        <option value="{{ $driver->id }}" @selected($driver->id === $siklus->driver_id_actual)>{{ $driver->nama }}</option>
                    @endforeach
                </select>
            </div>
            <div class="keuangan-jet-form-field">
                <label for="driver-override-reason">Alasan (opsional)</label>
                <textarea id="driver-override-reason" name="reason" maxlength="500" rows="2" placeholder="Driver utama sakit, dst..."></textarea>
            </div>
            <footer class="modal-footer">
                <button type="button" class="keuangan-jet-secondary-button" data-modal-close>Batal</button>
                <button type="submit" class="keuangan-jet-primary-button">Update Driver</button>
            </footer>
        </form>
    </div>
</div>

{{-- Modal: Edit Keuangan JET Row --}}
<div id="modal-row-edit" class="modal-shell" hidden>
    <div class="modal-backdrop" data-modal-close></div>
    <div class="modal-panel" role="dialog" aria-labelledby="modal-row-title">
        <header class="modal-header">
            <h3 id="modal-row-title">Edit Detail Trip</h3>
            <button type="button" class="modal-close-btn" data-modal-close aria-label="Tutup">&times;</button>
        </header>
        <form id="form-row-edit" class="modal-body">
            <input type="hidden" id="row-edit-id" name="row_id" />

            <div class="keuangan-jet-form-field">
                <label for="row-jenis-layanan">Jenis Layanan</label>
                <select id="row-jenis-layanan" name="jenis_layanan" required>
                    <option value="Reguler">Reguler</option>
                    <option value="Dropping">Dropping</option>
                    <option value="Rental">Rental</option>
                </select>
            </div>

            <div class="keuangan-jet-form-field" id="row-sumber-rental-field" hidden>
                <label for="row-sumber-rental">Sumber Rental</label>
                <select id="row-sumber-rental" name="sumber_rental">
                    <option value="">— Pilih Sumber —</option>
                    <option value="loket">Loket (15%)</option>
                    <option value="driver">Driver Direct (10%)</option>
                </select>
                <small class="keuangan-jet-form-hint">Loket = admin 15%, Driver direct = admin 10%</small>
            </div>

            <div class="keuangan-jet-form-field">
                <label for="row-persen-admin">Persen Admin</label>
                <select id="row-persen-admin" name="persen_admin" required>
                    <option value="15">15% (Default Reguler/Dropping/Rental Loket)</option>
                    <option value="10">10% (Rental Driver Direct)</option>
                </select>
            </div>

            <div class="keuangan-jet-form-field">
                <label for="row-uang-snack">Uang Snack (Revenue, tidak masuk basis admin)</label>
                <input type="number" id="row-uang-snack" name="uang_snack" min="0" step="1000" value="0" required />
            </div>

            <footer class="modal-footer">
                <button type="button" class="keuangan-jet-secondary-button" data-modal-close>Batal</button>
                <button type="submit" class="keuangan-jet-primary-button">Simpan</button>
            </footer>
        </form>
    </div>
</div>

{{-- Modal: Driver Paid Confirm --}}
<div id="modal-driver-paid" class="modal-shell" hidden>
    <div class="modal-backdrop" data-modal-close></div>
    <div class="modal-panel" role="dialog" aria-labelledby="modal-driver-paid-title">
        <header class="modal-header">
            <h3 id="modal-driver-paid-title">⚠️ Konfirmasi Mark Driver Paid</h3>
            <button type="button" class="modal-close-btn" data-modal-close aria-label="Tutup">&times;</button>
        </header>
        <form id="form-driver-paid" class="modal-body">
            <p><strong>Aksi ini IRREVERSIBLE.</strong> Setelah confirm, siklus ini akan <strong>locked</strong> permanently — tidak bisa edit operasional, jenis layanan, atau driver lagi.</p>
            <p>Driver: <strong>{{ $siklus->driver_name_actual }}</strong></p>
            <p>Bagi Hasil Driver (30%): <strong>Rp {{ number_format((float) $siklus->uang_driver, 0, ',', '.') }}</strong></p>
            <div class="keuangan-jet-form-field">
                <label class="keuangan-jet-checkbox-label">
                    <input type="checkbox" name="confirm" value="1" required />
                    Saya konfirmasi driver sudah menerima pembayaran sesuai jumlah di atas.
                </label>
            </div>
            <footer class="modal-footer">
                <button type="button" class="keuangan-jet-secondary-button" data-modal-close>Batal</button>
                <button type="submit" class="keuangan-jet-primary-button">💵 Confirm & Lock Siklus</button>
            </footer>
        </form>
    </div>
</div>

{{-- Modal: Admin Paid Confirm --}}
<div id="modal-admin-paid" class="modal-shell" hidden>
    <div class="modal-backdrop" data-modal-close></div>
    <div class="modal-panel" role="dialog" aria-labelledby="modal-admin-paid-title">
        <header class="modal-header">
            <h3 id="modal-admin-paid-title">Konfirmasi Mark Admin Paid</h3>
            <button type="button" class="modal-close-btn" data-modal-close aria-label="Tutup">&times;</button>
        </header>
        <form id="form-admin-paid" class="modal-body">
            <input type="hidden" id="admin-paid-row-id" name="row_id" />
            <p>Mark uang admin untuk trip ini sebagai sudah dibayar?</p>
            <div class="keuangan-jet-form-field">
                <label class="keuangan-jet-checkbox-label">
                    <input type="checkbox" name="confirm" value="1" required />
                    Konfirmasi pembayaran admin.
                </label>
            </div>
            <footer class="modal-footer">
                <button type="button" class="keuangan-jet-secondary-button" data-modal-close>Batal</button>
                <button type="submit" class="keuangan-jet-primary-button">Confirm</button>
            </footer>
        </form>
    </div>
</div>
