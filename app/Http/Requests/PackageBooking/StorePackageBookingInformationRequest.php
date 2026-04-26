<?php

namespace App\Http\Requests\PackageBooking;

use App\Services\PackageBookingService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class StorePackageBookingInformationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $service = app(PackageBookingService::class);
        $locations = $service->locations();
        $scheduleValues = $service->departureScheduleValues();

        return [
            'trip_date' => ['required', 'date', 'after_or_equal:today'],
            'departure_time' => ['required', 'in:' . implode(',', $scheduleValues)],
            'pickup_city' => ['required', 'in:' . implode(',', $locations)],
            'destination_city' => ['required', 'in:' . implode(',', $locations), 'different:pickup_city'],
            'sender_name' => ['required', 'string', 'min:3', 'max:100'],
            'sender_phone' => ['required', 'string', 'min:8', 'max:20'],
            'sender_address' => ['required', 'string', 'min:5', 'max:255'],
            'recipient_name' => ['required', 'string', 'min:3', 'max:100'],
            'recipient_phone' => ['required', 'string', 'min:8', 'max:20'],
            'recipient_address' => ['required', 'string', 'min:5', 'max:255'],
            'item_name' => ['required', 'string', 'min:2', 'max:150'],
            'item_qty' => ['required', 'integer', 'min:1', 'max:999'],
            'fare_amount' => ['required', 'integer', 'min:1000'],
            'additional_fare' => ['nullable', 'integer', 'min:0'],
            // Sesi 44D PR #1D: jalur mobil. Wajib (validated di after()) kalau
            // rute ambigu, optional kalau rute fixed.
            'route_via' => ['nullable', 'string', \Illuminate\Validation\Rule::in(['BANGKINANG', 'PETAPAHAN'])],
        ];
    }

    public function attributes(): array
    {
        return [
            'route_via' => 'jalur mobil',
        ];
    }

    public function messages(): array
    {
        return [
            'trip_date.after_or_equal' => 'Tanggal keberangkatan tidak boleh kurang dari hari ini.',
            'pickup_city.different' => 'Lokasi asal dan tujuan tidak boleh sama.',
            'destination_city.different' => 'Lokasi asal dan tujuan tidak boleh sama.',
            'fare_amount.min' => 'Ongkos tarif minimal Rp 1.000.',
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator): void {
                if ($validator->errors()->has('pickup_city') || $validator->errors()->has('destination_city')) {
                    return;
                }

                $origin = (string) $this->input('pickup_city');
                $destination = (string) $this->input('destination_city');

                $clusterService = app(\App\Services\BookingClusterService::class);

                // Sesi 44D PR #1D: forbidden route check (defense layer 1).
                if ($clusterService->isForbiddenRoute($origin, $destination)) {
                    $validator->errors()->add(
                        'destination_city',
                        sprintf('Rute %s ↔ %s tidak tersedia karena cabang fisik berbeda.', $origin, $destination),
                    );

                    return;
                }

                // Sesi 44D PR #1D: route_via wajib kalau rute ambigu.
                $fromCluster = $clusterService->clusterForLocation($origin);
                $toCluster = $clusterService->clusterForLocation($destination);
                $needsExplicitRouteVia = ($fromCluster === null && $toCluster === null)
                    || ($fromCluster === \App\Services\BookingClusterService::CLUSTER_HUB && $toCluster === null)
                    || ($toCluster === \App\Services\BookingClusterService::CLUSTER_HUB && $fromCluster === null);

                if ($needsExplicitRouteVia && empty(trim((string) $this->input('route_via')))) {
                    $validator->errors()->add('route_via', 'Jalur mobil wajib dipilih untuk rute ini.');
                }
            },
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'route_via' => filled($this->input('route_via'))
                ? strtoupper(trim((string) $this->input('route_via')))
                : null,
        ]);
    }
}
