<?php

namespace App\Http\Requests\TripPlanning;

use Illuminate\Foundation\Http\FormRequest;

class EditTripManualRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'version' => ['required', 'integer', 'min:0'],
            'trip_date' => ['sometimes', 'date_format:Y-m-d'],
            'trip_time' => ['sometimes', 'date_format:H:i:s'],
            'direction' => ['sometimes', 'in:PKB_TO_ROHUL,ROHUL_TO_PKB'],
            'mobil_id' => ['sometimes', 'string', 'exists:mobil,id'],
            'driver_id' => ['sometimes', 'string', 'exists:drivers,id'],
            'sequence' => ['sometimes', 'integer', 'min:1'],
        ];
    }

    public function messages(): array
    {
        return [
            'version.required' => 'Field version wajib diisi untuk optimistic locking.',
        ];
    }
}
