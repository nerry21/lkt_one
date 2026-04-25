@if ($trip->status === 'scheduled' && $trip->trip_time !== null)
    <button type="button"
            class="trip-planning-action-btn trip-planning-action-btn--success"
            data-action="berangkat"
            data-trip-id="{{ $trip->id }}"
            data-testid="btn-berangkat-{{ $trip->id }}">
        Berangkat
    </button>
@endif

@if ($trip->status === 'scheduled')
    <button type="button"
            class="trip-planning-action-btn trip-planning-action-btn--danger"
            data-action="tidak-berangkat"
            data-trip-id="{{ $trip->id }}"
            data-testid="btn-tidak-berangkat-{{ $trip->id }}">
        Tidak Berangkat
    </button>
@endif

@if ($trip->status === 'keluar_trip' && $trip->keluar_trip_substatus === 'out')
    <button type="button"
            class="trip-planning-action-btn trip-planning-action-btn--neutral"
            data-action="waiting-list"
            data-trip-id="{{ $trip->id }}"
            data-testid="btn-waiting-list-{{ $trip->id }}">
        Waiting List
    </button>
    <button type="button"
            class="trip-planning-action-btn trip-planning-action-btn--neutral"
            data-action="tidak-keluar-trip"
            data-trip-id="{{ $trip->id }}"
            data-testid="btn-tidak-keluar-trip-{{ $trip->id }}">
        Tidak Keluar Trip
    </button>
@endif

@if ($trip->status === 'keluar_trip' && $trip->keluar_trip_substatus === 'waiting_list')
    <button type="button"
            class="trip-planning-action-btn trip-planning-action-btn--success"
            data-action="returning"
            data-trip-id="{{ $trip->id }}"
            data-testid="btn-returning-{{ $trip->id }}">
        Returning
    </button>
@endif

@if ($trip->status === 'scheduled')
    <button type="button"
            class="trip-planning-action-btn trip-planning-action-btn--neutral"
            data-action="open-ganti-jam-modal"
            data-trip-id="{{ $trip->id }}"
            data-trip-time="{{ $trip->trip_time ?? '' }}"
            data-testid="btn-ganti-jam-{{ $trip->id }}">
        Ganti Jam
    </button>
    <button type="button"
            class="trip-planning-action-btn trip-planning-action-btn--danger"
            data-action="open-keluar-trip-modal"
            data-trip-id="{{ $trip->id }}"
            data-mobil-home-pool="{{ $trip->mobil->home_pool ?? '' }}"
            data-testid="btn-keluar-trip-{{ $trip->id }}">
        Keluar Trip
    </button>
    <button type="button"
            class="trip-planning-action-btn trip-planning-action-btn--neutral"
            data-action="open-edit-trip-modal"
            data-trip-id="{{ $trip->id }}"
            data-trip-version="{{ $trip->version }}"
            data-trip-date="{{ $trip->trip_date->format('Y-m-d') }}"
            data-trip-time="{{ $trip->trip_time ?? '' }}"
            data-trip-direction="{{ $trip->direction }}"
            data-trip-sequence="{{ $trip->sequence }}"
            data-mobil-id="{{ $trip->mobil_id }}"
            data-mobil-code="{{ $trip->mobil?->kode_mobil ?? '-' }}"
            data-driver-id="{{ $trip->driver_id }}"
            data-driver-name="{{ $trip->driver?->nama ?? '-' }}"
            data-testid="btn-edit-trip-{{ $trip->id }}">
        Edit
    </button>
    <button type="button"
            class="trip-planning-action-btn trip-planning-action-btn--danger"
            data-action="open-delete-trip-modal"
            data-trip-id="{{ $trip->id }}"
            data-trip-version="{{ $trip->version }}"
            data-mobil-code="{{ $trip->mobil?->kode_mobil ?? '-' }}"
            data-trip-time="{{ $trip->trip_time ?? '' }}"
            data-trip-direction="{{ $trip->direction }}"
            data-testid="btn-delete-trip-{{ $trip->id }}">
        Hapus
    </button>
@endif

@if ($trip->direction === 'ROHUL_TO_PKB'
    && in_array($trip->status, ['scheduled', 'berangkat'], true)
    && ! in_array((int) $trip->id, $pairedOriginIds, true))
    <button type="button"
            class="trip-planning-action-btn trip-planning-action-btn--neutral"
            data-action="open-same-day-return-modal"
            data-trip-id="{{ $trip->id }}"
            data-mobil-code="{{ $trip->mobil?->kode_mobil ?? '-' }}"
            data-driver-id="{{ $trip->driver_id ?? '' }}"
            data-driver-name="{{ $trip->driver?->nama ?? '-' }}"
            data-trip-time="{{ $trip->trip_time ?? '' }}"
            data-testid="btn-same-day-return-{{ $trip->id }}">
        Pulang Hari Ini
    </button>
@endif
