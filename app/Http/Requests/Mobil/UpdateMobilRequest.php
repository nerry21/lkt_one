<?php

namespace App\Http\Requests\Mobil;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMobilRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'kode_mobil' => ['sometimes', 'string'],
            'jenis_mobil' => ['sometimes', 'string'],
            'home_pool' => ['sometimes', 'nullable', 'in:PKB,ROHUL'],
            'is_active_in_trip' => ['sometimes', 'boolean'],
        ];
    }
}
