<?php

namespace App\Http\Requests\PackageBooking;

use App\Services\PackageBookingService;
use Illuminate\Foundation\Http\FormRequest;

class StorePackageBookingPackageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $service = app(PackageBookingService::class);
        $packageSize = $this->input('package_size', '');
        $requiresSeat = $service->isSeatRequired((string) $packageSize);
        $seatCodes = $service->selectableSeatCodes();

        $rules = [
            'package_size' => ['required', 'in:' . implode(',', $service->packageSizeValues())],
        ];

        if ($requiresSeat) {
            $rules['seat_codes'] = ['required', 'array', 'size:1'];
            $rules['seat_codes.*'] = ['required', 'string', 'in:' . implode(',', $seatCodes)];
        } else {
            $rules['seat_codes'] = ['nullable', 'array'];
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'seat_codes.size' => 'Paket Besar hanya membutuhkan 1 kursi.',
            'seat_codes.required' => 'Pilih 1 kursi untuk Paket Besar.',
        ];
    }
}
