<?php

namespace App\Http\Requests\TripPlanning;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Validate payload untuk bulk upsert daily driver assignments.
 *
 * Payload shape:
 *   {
 *     "date": "2026-04-23",
 *     "assignments": [
 *       { "mobil_id": "018f...", "driver_id": "018g..." },
 *       { "mobil_id": "018h...", "driver_id": "018i..." }
 *     ]
 *   }
 */
class UpsertDriverAssignmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Authorization handled by middleware (`admin.role:admin`).
        return true;
    }

    public function rules(): array
    {
        return [
            'date' => ['required', 'date', 'after_or_equal:today'],
            'assignments' => ['required', 'array', 'min:1'],
            // Mobil dan Driver kedua-duanya pakai UUID PK.
            'assignments.*.mobil_id' => ['required', 'uuid', 'exists:mobil,id'],
            'assignments.*.driver_id' => ['required', 'uuid', 'exists:drivers,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'date.after_or_equal' => 'Tanggal assignment tidak boleh sebelum hari ini.',
            'assignments.required' => 'Payload assignments harus ada minimal 1 item.',
            'assignments.*.mobil_id.exists' => 'Mobil tidak ditemukan.',
            'assignments.*.driver_id.exists' => 'Driver tidak ditemukan.',
        ];
    }

    /**
     * Pastikan tidak ada mobil_id duplikat dalam payload.
     */
    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            $mobilIds = collect($this->input('assignments', []))
                ->pluck('mobil_id')
                ->filter();

            if ($mobilIds->count() !== $mobilIds->unique()->count()) {
                $validator->errors()->add(
                    'assignments',
                    'Terdapat mobil_id duplikat dalam payload. Setiap mobil hanya boleh muncul sekali per tanggal.'
                );
            }
        });
    }
}
