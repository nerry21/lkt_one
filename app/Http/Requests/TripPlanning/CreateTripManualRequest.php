<?php

namespace App\Http\Requests\TripPlanning;

use Illuminate\Foundation\Http\FormRequest;

class CreateTripManualRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // middleware admin.role:admin sudah handle
    }

    public function rules(): array
    {
        $maxDate = now()->addDays(30)->format('Y-m-d');

        return [
            'trip_date' => [
                'required',
                'date_format:Y-m-d',
                'after_or_equal:today',
                'before_or_equal:'.$maxDate,
            ],
            'trip_time' => ['required', 'date_format:H:i:s'],
            'direction' => ['required', 'in:PKB_TO_ROHUL,ROHUL_TO_PKB'],
            'mobil_id' => ['required', 'string', 'exists:mobil,id'],
            'driver_id' => ['required', 'string', 'exists:drivers,id'],
            'sequence' => ['nullable', 'integer', 'min:1'],
        ];
    }

    public function messages(): array
    {
        return [
            'trip_date.before_or_equal' => 'Tanggal trip maksimal H+30 hari dari hari ini.',
            'trip_date.after_or_equal' => 'Tanggal trip tidak boleh di masa lalu.',
            'direction.in' => 'Arah harus PKB_TO_ROHUL atau ROHUL_TO_PKB.',
        ];
    }
}
