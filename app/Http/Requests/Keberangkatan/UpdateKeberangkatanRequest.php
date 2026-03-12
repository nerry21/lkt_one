<?php

namespace App\Http\Requests\Keberangkatan;

use App\Models\Keberangkatan;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateKeberangkatanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tanggal' => ['sometimes', 'date'],
            'kode_mobil' => ['sometimes', 'string'],
            'driver_id' => ['sometimes', 'string'],
            'jumlah_penumpang' => ['sometimes', 'integer'],
            'tarif_penumpang' => ['sometimes', 'integer'],
            'jumlah_paket' => ['sometimes', 'integer'],
            'uang_paket' => ['sometimes', 'integer'],
            'jumlah_snack' => ['sometimes', 'integer', 'min:0'],
            'jumlah_air_mineral' => ['sometimes', 'integer', 'min:0'],
            'trip_ke' => ['sometimes', 'integer'],
            'status_pembayaran' => ['sometimes', 'nullable', 'string', Rule::in(Keberangkatan::STATUSES)],
        ];
    }
}
