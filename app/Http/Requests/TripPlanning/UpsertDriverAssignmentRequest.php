<?php

namespace App\Http\Requests\TripPlanning;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Validate payload untuk bulk upsert daily driver assignments.
 *
 * Payload shape (Phase E4: pins[] optional per assignment):
 *   {
 *     "date": "2026-04-26",
 *     "assignments": [
 *       {
 *         "mobil_id": "018f...",
 *         "driver_id": "018g...",
 *         "pins": [
 *           { "direction": "ROHUL_TO_PKB", "trip_time": "05:00:00" },
 *           { "direction": "PKB_TO_ROHUL", "trip_time": "13:00:00" }
 *         ]
 *       },
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
            'assignments.*.pins' => ['sometimes', 'array', 'max:2'],
            'assignments.*.pins.*.direction' => ['required_with:assignments.*.pins', 'in:PKB_TO_ROHUL,ROHUL_TO_PKB'],
            'assignments.*.pins.*.trip_time' => ['required_with:assignments.*.pins', 'regex:/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/'],
        ];
    }

    public function messages(): array
    {
        return [
            'date.after_or_equal' => 'Tanggal assignment tidak boleh sebelum hari ini.',
            'assignments.required' => 'Payload assignments harus ada minimal 1 item.',
            'assignments.*.mobil_id.exists' => 'Mobil tidak ditemukan.',
            'assignments.*.driver_id.exists' => 'Driver tidak ditemukan.',
            'assignments.*.pins.max' => 'Setiap mobil maksimal 2 pin (1 per arah).',
            'assignments.*.pins.*.direction.in' => 'Direction pin tidak valid.',
            'assignments.*.pins.*.trip_time.regex' => 'Format trip_time pin harus HH:MM atau HH:MM:SS.',
        ];
    }

    /**
     * Pastikan tidak ada mobil_id duplikat dalam payload, dan tidak ada
     * direction pin duplikat di 1 mobil (DP-3: 1 mobil max 1 pin per arah).
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

            foreach ($this->input('assignments', []) as $idx => $assignment) {
                $pins = $assignment['pins'] ?? [];
                if (count($pins) > 1) {
                    $directions = array_column($pins, 'direction');
                    if (count($directions) !== count(array_unique($directions))) {
                        $validator->errors()->add(
                            "assignments.{$idx}.pins",
                            'Pin direction harus unik (1 mobil maksimal 1 pin per arah).'
                        );
                    }
                }
            }
        });
    }
}
