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
            'pickup_address' => ['required', 'string', 'min:10', 'max:255'],
            'dropoff_address' => ['required', 'string', 'min:10', 'max:255'],
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
            'pickup_address' => 'alamat penjemputan',
            'dropoff_address' => 'alamat pengantaran',
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

                $fare = app(RegularBookingService::class)->resolveFare($origin, $destination);

                if ($fare === null) {
                    $validator->errors()->add('destination_location', 'Rute yang Anda pilih saat ini belum tersedia. Silakan pilih kombinasi asal dan tujuan lain.');
                }
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
            'pickup_address' => trim((string) $this->input('pickup_address')),
            'dropoff_address' => trim((string) $this->input('dropoff_address')),
        ]);
    }
}
