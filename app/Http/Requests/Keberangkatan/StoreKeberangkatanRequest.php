<?php

namespace App\Http\Requests\Keberangkatan;

use App\Models\Keberangkatan;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreKeberangkatanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tanggal' => ['required', 'date'],
            'kode_mobil' => ['required', 'string'],
            'driver_id' => ['required', 'string'],
            'jumlah_penumpang' => ['required', 'integer'],
            'tarif_penumpang' => ['required', 'integer'],
            'jumlah_paket' => ['required', 'integer'],
            'uang_paket' => ['required', 'integer'],
            'jumlah_snack' => ['required', 'integer', 'min:0'],
            'jumlah_air_mineral' => ['required', 'integer', 'min:0'],
            'trip_ke' => ['required', 'integer'],
            'status_pembayaran' => ['nullable', 'string', Rule::in(Keberangkatan::STATUSES)],
        ];
    }
}
