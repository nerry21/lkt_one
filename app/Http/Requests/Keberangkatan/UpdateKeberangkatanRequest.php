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
            'jam_keberangkatan' => ['sometimes', 'string', Rule::in(array_keys(Keberangkatan::JAM_KEBERANGKATAN_OPTIONS))],
            'tipe_layanan' => ['sometimes', 'string', Rule::in(Keberangkatan::TIPE_LAYANAN_OPTIONS)],
            'kode_mobil' => ['sometimes', 'string'],
            'driver_id' => ['sometimes', 'string'],
            'jumlah_penumpang' => ['sometimes', 'integer'],
            'tarif_penumpang' => ['sometimes', 'integer'],
            'jumlah_paket' => ['sometimes', 'integer'],
            'uang_paket' => ['sometimes', 'integer'],
            'jumlah_snack' => ['sometimes', 'integer', 'min:0'],
            'pengembalian_snack' => ['sometimes', 'integer', 'min:0', 'lte:jumlah_snack'],
            'jumlah_air_mineral' => ['sometimes', 'integer', 'min:0'],
            'trip_ke' => ['sometimes', 'integer'],
            'status_pembayaran' => ['sometimes', 'nullable', 'string', Rule::in(Keberangkatan::STATUSES)],
        ];
    }
}
