<div class="admin-master-grid">
    <div class="admin-master-col-12 admin-master-field">
        <label for="name">Nama Driver</label>
        <input class="admin-master-input" type="text" id="name" name="name" value="{{ old('name', $driver->name ?? '') }}" required>
    </div>

    <div class="admin-master-col-6 admin-master-field">
        <label for="phone">No HP</label>
        <input class="admin-master-input" type="text" id="phone" name="phone" value="{{ old('phone', $driver->phone ?? '') }}">
    </div>

    <div class="admin-master-col-6 admin-master-field">
        <label for="license_number">Nomor SIM</label>
        <input class="admin-master-input" type="text" id="license_number" name="license_number" value="{{ old('license_number', $driver->license_number ?? '') }}">
    </div>

    <div class="admin-master-col-6 admin-master-field">
        <label for="status">Status</label>
        <select class="admin-master-select" id="status" name="status" required>
            @foreach (['Active', 'Inactive'] as $status)
                <option value="{{ $status }}" @selected(old('status', $driver->status ?? 'Active') === $status)>{{ $status }}</option>
            @endforeach
        </select>
    </div>
</div>

<div class="admin-master-form-actions" style="margin-top: 20px;">
    <a class="admin-master-button admin-master-button--light" href="{{ route('admin.drivers.index') }}">Kembali</a>
    <button class="admin-master-button admin-master-button--primary" type="submit">Simpan</button>
</div>
