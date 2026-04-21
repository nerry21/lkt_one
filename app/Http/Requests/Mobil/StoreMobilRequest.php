<?php

namespace App\Http\Requests\Mobil;

use Illuminate\Foundation\Http\FormRequest;

class StoreMobilRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'kode_mobil' => ['required', 'string'],
            'jenis_mobil' => ['required', 'string'],
            'home_pool' => ['nullable', 'in:PKB,ROHUL'],
            'is_active_in_trip' => ['sometimes', 'boolean'],
        ];
    }
}
