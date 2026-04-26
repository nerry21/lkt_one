<?php

namespace App\Http\Requests\RegularBooking;

use App\Services\RegularBookingService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class StoreRegularBookingInformationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $service = app(RegularBookingService::class);

        return [
            'trip_date' => ['required', 'date', 'after_or_equal:today'],
            'booking_type' => ['required', 'string', Rule::in($service->bookingTypeValues())],
            'pickup_location' => ['required', 'string', Rule::in($service->locations())],
            'destination_location' => ['required', 'string', Rule::in($service->locations())],
            'departure_time' => ['required', 'string', Rule::in($service->departureScheduleValues())],
            'passenger_count' => ['required', 'integer', 'between:1,6'],
            'additional_fare_per_passenger' => ['nullable', 'integer', 'min:0'],
            'pickup_address' => ['required', 'string', 'min:10', 'max:255'],
            'dropoff_address' => ['required', 'string', 'min:10', 'max:255'],
            // Sesi 44D PR #1D: jalur mobil. Wajib (validated di after()) kalau
            // rute ambigu, optional kalau rute fixed.
            'route_via' => ['nullable', 'string', Rule::in(['BANGKINANG', 'PETAPAHAN'])],
        ];
    }

    public function attributes(): array
    {
        return [
            'trip_date' => 'tanggal keberangkatan',
            'booking_type' => 'jenis pemesanan',
            'pickup_location' => 'asal penjemputan',
            'destination_location' => 'tujuan',
            'departure_time' => 'jam keberangkatan',
            'passenger_count' => 'jumlah penumpang',
            'additional_fare_per_passenger' => 'ongkos tambahan per penumpang',
            'pickup_address' => 'alamat penjemputan',
            'dropoff_address' => 'alamat pengantaran',
            'route_via' => 'jalur mobil',
        ];
    }

    public function messages(): array
    {
        return [
            'pickup_address.min' => 'Alamat penjemputan minimal 10 karakter.',
            'dropoff_address.min' => 'Alamat pengantaran minimal 10 karakter.',
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator): void {
                if ($validator->errors()->has('pickup_location') || $validator->errors()->has('destination_location')) {
                    return;
                }

                $origin = (string) $this->input('pickup_location');
                $destination = (string) $this->input('destination_location');

                if ($origin === $destination) {
                    $validator->errors()->add('destination_location', 'Tujuan harus berbeda dengan asal penjemputan.');

                    return;
                }

                // Sesi 44D PR #1D: forbidden route check (defense layer 1).
                $clusterService = app(\App\Services\BookingClusterService::class);

                if ($clusterService->isForbiddenRoute($origin, $destination)) {
                    $validator->errors()->add(
                        'destination_location',
                        sprintf('Rute %s ↔ %s tidak tersedia karena cabang fisik berbeda.', $origin, $destination),
                    );

                    return;
                }

                // Sesi 44D PR #1D: route_via wajib kalau rute ambigu (kedua sisi
                // ambigu, atau salah satu HUB dan sisi lain ambigu).
                $fromCluster = $clusterService->clusterForLocation($origin);
                $toCluster = $clusterService->clusterForLocation($destination);
                $needsExplicitRouteVia = ($fromCluster === null && $toCluster === null)
                    || ($fromCluster === \App\Services\BookingClusterService::CLUSTER_HUB && $toCluster === null)
                    || ($toCluster === \App\Services\BookingClusterService::CLUSTER_HUB && $fromCluster === null);

                if ($needsExplicitRouteVia && empty(trim((string) $this->input('route_via')))) {
                    $validator->errors()->add('route_via', 'Jalur mobil wajib dipilih untuk rute ini.');
                }

                // Sesi 44D PR #1D: NO LONGER block kalau resolveFare null —
                // customer/admin bisa save dengan tarif Rp 0, banner UI sudah
                // notify. Service akan persist price_per_seat=0.
            },
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'trip_date' => trim((string) $this->input('trip_date')),
            'booking_type' => trim((string) $this->input('booking_type')),
            'pickup_location' => trim((string) $this->input('pickup_location')),
            'destination_location' => trim((string) $this->input('destination_location')),
            'departure_time' => trim((string) $this->input('departure_time')),
            'additional_fare_per_passenger' => max((int) $this->input('additional_fare_per_passenger', 0), 0),
            'pickup_address' => trim((string) $this->input('pickup_address')),
            'dropoff_address' => trim((string) $this->input('dropoff_address')),
            'route_via' => filled($this->input('route_via'))
                ? strtoupper(trim((string) $this->input('route_via')))
                : null,
        ]);
    }
}
