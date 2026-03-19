<?php

namespace App\Http\Requests\RentalBooking;

use App\Services\RentalBookingService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class StoreRentalBookingInformationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $service = app(RentalBookingService::class);

        return [
            'rental_start_date'    => ['required', 'date', 'after_or_equal:today'],
            'rental_end_date'      => ['required', 'date', 'after_or_equal:rental_start_date'],
            'booking_type'         => ['required', 'string', Rule::in($service->bookingTypeValues())],
            'pickup_location'      => ['required', 'string', 'min:2', 'max:255'],
            'destination_location' => ['required', 'string', 'min:2', 'max:255'],
            'fare_amount'          => ['required', 'integer', 'min:0'],
            'additional_fare'      => ['nullable', 'integer', 'min:0'],
            'pickup_address'       => ['required', 'string', 'min:10', 'max:255'],
            'dropoff_address'      => ['required', 'string', 'min:10', 'max:255'],
        ];
    }

    public function attributes(): array
    {
        return [
            'rental_start_date'    => 'tanggal mulai rental',
            'rental_end_date'      => 'tanggal selesai rental',
            'booking_type'         => 'jenis pemesanan',
            'pickup_location'      => 'asal penjemputan',
            'destination_location' => 'tujuan',
            'fare_amount'          => 'tarif rental',
            'additional_fare'      => 'tambahan ongkos',
            'pickup_address'       => 'alamat penjemputan',
            'dropoff_address'      => 'alamat pengantaran',
        ];
    }

    public function messages(): array
    {
        return [
            'rental_start_date.after_or_equal' => 'Tanggal mulai rental tidak boleh sebelum hari ini.',
            'rental_end_date.after_or_equal'   => 'Tanggal selesai rental harus sama atau setelah tanggal mulai rental.',
            'pickup_address.min'               => 'Alamat penjemputan minimal 10 karakter.',
            'dropoff_address.min'              => 'Alamat pengantaran minimal 10 karakter.',
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator): void {
                if ($validator->errors()->has('pickup_location') || $validator->errors()->has('destination_location')) {
                    return;
                }

                $origin      = trim((string) $this->input('pickup_location'));
                $destination = trim((string) $this->input('destination_location'));

                if (strtolower($origin) === strtolower($destination)) {
                    $validator->errors()->add('destination_location', 'Tujuan harus berbeda dengan asal penjemputan.');
                }
            },
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'rental_start_date'    => trim((string) $this->input('rental_start_date')),
            'rental_end_date'      => trim((string) $this->input('rental_end_date')),
            'booking_type'         => trim((string) $this->input('booking_type')),
            'pickup_location'      => trim((string) $this->input('pickup_location')),
            'destination_location' => trim((string) $this->input('destination_location')),
            'fare_amount'          => max((int) $this->input('fare_amount', 0), 0),
            'additional_fare'      => max((int) $this->input('additional_fare', 0), 0),
            'pickup_address'       => trim((string) $this->input('pickup_address')),
            'dropoff_address'      => trim((string) $this->input('dropoff_address')),
        ]);
    }
}
