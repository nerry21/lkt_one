<?php

namespace App\Http\Requests\DroppingBooking;

use App\Services\DroppingBookingService;
use Illuminate\Foundation\Http\FormRequest;

class StoreDroppingBookingPassengersRequest extends FormRequest
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
            'passenger_name'  => 'nama penumpang',
            'passenger_phone' => 'nomor HP penumpang',
        ];
    }

    public function messages(): array
    {
        return [
            'passenger_name.required'  => 'Nama penumpang wajib diisi.',
            'passenger_phone.required' => 'Nomor HP penumpang wajib diisi.',
            'passenger_phone.regex'    => 'Nomor HP penumpang harus menggunakan format nomor Indonesia yang valid.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $service = app(DroppingBookingService::class);

        $this->merge([
            'passenger_phone' => $service->normalizeIndonesianPhone((string) $this->input('passenger_phone', '')),
        ]);
    }
}
