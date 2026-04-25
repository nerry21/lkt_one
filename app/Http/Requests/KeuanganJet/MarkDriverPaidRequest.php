<?php

namespace App\Http\Requests\KeuanganJet;

use Illuminate\Foundation\Http\FormRequest;

class MarkDriverPaidRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'confirm' => ['required', 'boolean', 'accepted'],
        ];
    }

    public function messages(): array
    {
        return [
            'confirm.accepted' => 'Konfirmasi pembayaran wajib di-check.',
        ];
    }
}
