<div class="admin-master-grid">
    <div class="admin-master-col-6 admin-master-field">
        <label for="plate_number">Plat Nomor</label>
        <input class="admin-master-input" type="text" id="plate_number" name="plate_number" value="{{ old('plate_number', $vehicle->plate_number ?? '') }}" required>
    </div>

    <div class="admin-master-col-6 admin-master-field">
        <label for="seat_capacity">Kapasitas Seat</label>
        <input class="admin-master-input" type="number" id="seat_capacity" name="seat_capacity" min="1" value="{{ old('seat_capacity', $vehicle->seat_capacity ?? 6) }}" required>
    </div>

    <div class="admin-master-col-6 admin-master-field">
        <label for="brand">Merek</label>
        <input class="admin-master-input" type="text" id="brand" name="brand" value="{{ old('brand', $vehicle->brand ?? '') }}">
    </div>

    <div class="admin-master-col-6 admin-master-field">
        <label for="model">Model</label>
        <input class="admin-master-input" type="text" id="model" name="model" value="{{ old('model', $vehicle->model ?? '') }}">
    </div>

    <div class="admin-master-col-6 admin-master-field">
        <label for="status">Status</label>
        <select class="admin-master-select" id="status" name="status" required>
            @foreach (['Ready', 'Maintenance', 'Inactive'] as $status)
                <option value="{{ $status }}" @selected(old('status', $vehicle->status ?? 'Ready') === $status)>{{ $status }}</option>
            @endforeach
        </select>
    </div>
</div>

<div class="admin-master-form-actions" style="margin-top: 20px;">
    <a class="admin-master-button admin-master-button--light" href="{{ route('admin.vehicles.index') }}">Kembali</a>
    <button class="admin-master-button admin-master-button--primary" type="submit">Simpan</button>
</div>
