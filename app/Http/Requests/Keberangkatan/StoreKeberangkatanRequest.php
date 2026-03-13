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
            'jam_keberangkatan' => ['required', 'string', Rule::in(array_keys(Keberangkatan::JAM_KEBERANGKATAN_OPTIONS))],
            'tipe_layanan' => ['required', 'string', Rule::in(Keberangkatan::TIPE_LAYANAN_OPTIONS)],
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
