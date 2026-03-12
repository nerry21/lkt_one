<?php

namespace App\Http\Requests\Stock;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreStockRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tanggal' => ['required', 'date', Rule::unique('stock', 'tanggal')],
            'total_stock_snack' => ['required', 'integer', 'min:0'],
            'total_stock_air_mineral' => ['required', 'integer', 'min:0'],
            'keterangan' => ['nullable', 'string'],
        ];
    }
}
