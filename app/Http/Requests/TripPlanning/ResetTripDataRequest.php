<?php

namespace App\Http\Requests\TripPlanning;

use Illuminate\Foundation\Http\FormRequest;

class ResetTripDataRequest extends FormRequest
{
    public function authorize(): bool
    {
        // middleware admin.role sudah handle role check.
        return true;
    }

    public function rules(): array
    {
        // Endpoint resetToday → date required.
        // Endpoint resetAll → no body.
        // Pakai 'sometimes' supaya 1 FormRequest cover 2 endpoint.
        return [
            'date' => ['sometimes', 'required', 'date_format:Y-m-d'],
        ];
    }
}
