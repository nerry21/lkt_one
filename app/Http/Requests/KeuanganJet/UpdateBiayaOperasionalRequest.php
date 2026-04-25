<?php

namespace App\Http\Requests\KeuanganJet;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validate update biaya operasional siklus (uang_jalan, biaya_kurir, biaya_cuci_mobil).
 */
class UpdateBiayaOperasionalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // role guard via middleware admin.role:admin
    }

    public function rules(): array
    {
        return [
            'uang_jalan' => ['required', 'numeric', 'min:0', 'max:99999999.99'],
            'biaya_kurir' => ['required', 'numeric', 'min:0', 'max:99999999.99'],
            'biaya_cuci_mobil' => ['required', 'numeric', 'min:0', 'max:99999999.99'],
        ];
    }

    public function messages(): array
    {
        return [
            'uang_jalan.required' => 'Uang jalan wajib diisi.',
            'uang_jalan.numeric' => 'Uang jalan harus angka.',
            'uang_jalan.min' => 'Uang jalan tidak boleh negatif.',
            'biaya_kurir.required' => 'Biaya kurir wajib diisi.',
            'biaya_kurir.min' => 'Biaya kurir tidak boleh negatif.',
            'biaya_cuci_mobil.required' => 'Biaya cuci mobil wajib diisi.',
            'biaya_cuci_mobil.min' => 'Biaya cuci mobil tidak boleh negatif.',
        ];
    }
}
