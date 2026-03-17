<?php

namespace App\Http\Requests\Customer;

use Illuminate\Foundation\Http\FormRequest;

/**
 * MergeCustomerRequest
 *
 * Validasi input untuk endpoint merge customer duplikat.
 *
 * POST /api/customers/{customer}/merge
 * Body: { "target_id": 5, "reason": "..." }
 */
class MergeCustomerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Akses dikontrol via middleware jwt.auth + admin.role
    }

    public function rules(): array
    {
        return [
            'target_id' => ['required', 'integer', 'exists:customers,id'],
            'reason'    => ['nullable', 'string', 'max:500'],
        ];
    }

    public function attributes(): array
    {
        return [
            'target_id' => 'customer target',
            'reason'    => 'alasan merge',
        ];
    }

    public function messages(): array
    {
        return [
            'target_id.required' => 'Customer target wajib dipilih.',
            'target_id.exists'   => 'Customer target tidak ditemukan.',
            'reason.max'         => 'Alasan merge maksimal 500 karakter.',
        ];
    }
}
