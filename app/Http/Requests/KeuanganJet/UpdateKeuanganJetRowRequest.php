<?php

namespace App\Http\Requests\KeuanganJet;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Validate update keuangan_jet row detail (jenis_layanan, sumber_rental,
 * persen_admin, uang_snack).
 *
 * Conditional rule: kalau jenis_layanan='Rental', sumber_rental wajib.
 * Auto-default persen_admin saat sumber_rental berubah (handled di JS, server
 * tetap validate value yang masuk).
 */
class UpdateKeuanganJetRowRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'jenis_layanan' => ['required', 'string', 'in:Reguler,Dropping,Rental'],
            'sumber_rental' => ['nullable', 'string', 'in:loket,driver'],
            'persen_admin' => ['required', 'integer', 'in:10,15'],
            'uang_snack' => ['required', 'numeric', 'min:0', 'max:99999999.99'],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $v) {
            $jenis = $this->input('jenis_layanan');
            $sumber = $this->input('sumber_rental');

            if ($jenis === 'Rental' && empty($sumber)) {
                $v->errors()->add('sumber_rental', 'Sumber rental wajib dipilih untuk jenis layanan Rental.');
            }

            if ($jenis !== 'Rental' && ! empty($sumber)) {
                $v->errors()->add('sumber_rental', 'Sumber rental hanya untuk jenis layanan Rental.');
            }
        });
    }

    public function messages(): array
    {
        return [
            'jenis_layanan.required' => 'Jenis layanan wajib dipilih.',
            'jenis_layanan.in' => 'Jenis layanan harus salah satu: Reguler, Dropping, Rental.',
            'persen_admin.required' => 'Persen admin wajib dipilih.',
            'persen_admin.in' => 'Persen admin hanya 10 atau 15.',
            'uang_snack.required' => 'Uang snack wajib diisi.',
            'uang_snack.min' => 'Uang snack tidak boleh negatif.',
        ];
    }
}
