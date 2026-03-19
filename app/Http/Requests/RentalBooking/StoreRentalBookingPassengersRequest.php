<?php

namespace App\Http\Requests\RentalBooking;

use App\Services\RentalBookingService;
use Illuminate\Foundation\Http\FormRequest;

class StoreRentalBookingPassengersRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'passenger_name'  => ['required', 'string', 'max:100'],
            'passenger_phone' => ['required', 'string', 'regex:/^08[1-9][0-9]{7,12}$/'],
        ];
    }

    public function attributes(): array
    {
        return [
            'passenger_name'  => 'nama pemesan',
            'passenger_phone' => 'nomor HP pemesan',
        ];
    }

    public function messages(): array
    {
        return [
            'passenger_name.required'  => 'Nama pemesan wajib diisi.',
            'passenger_phone.required' => 'Nomor HP pemesan wajib diisi.',
            'passenger_phone.regex'    => 'Nomor HP pemesan harus menggunakan format nomor Indonesia yang valid.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $service = app(RentalBookingService::class);

        $this->merge([
            'passenger_phone' => $service->normalizeIndonesianPhone((string) $this->input('passenger_phone', '')),
        ]);
    }
}
