<?php

namespace App\Http\Requests\KeuanganJet;

use Illuminate\Foundation\Http\FormRequest;

class OverrideDriverRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'driver_id' => ['required', 'string', 'uuid', 'exists:drivers,id'],
            'reason' => ['nullable', 'string', 'max:500'],
        ];
    }

    public function messages(): array
    {
        return [
            'driver_id.required' => 'Driver pengganti wajib dipilih.',
            'driver_id.uuid' => 'Driver ID format tidak valid.',
            'driver_id.exists' => 'Driver tidak ditemukan.',
        ];
    }
}
