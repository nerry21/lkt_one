<?php

namespace App\Http\Requests\TripPlanning;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validate payload untuk PATCH .../trips/{trip}/ganti-jam.
 *
 * new_trip_time wajib + format HH:MM:SS + salah satu slot valid.
 * Service signature menerima ?string (null = pindah ke waiting list), tapi HTTP
 * endpoint ini semantik-nya "ubah jam" → wajib beri jam baru. Admin yang ingin
 * clear slot pakai action lain (markTidakBerangkat, dst).
 */
class GantiJamRequest extends FormRequest
{
    private const VALID_SLOTS = '05:30:00,07:00:00,09:00:00,13:00:00,16:00:00,19:00:00';

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'new_trip_time' => ['required', 'date_format:H:i:s', 'in:'.self::VALID_SLOTS],
        ];
    }

    public function messages(): array
    {
        return [
            'new_trip_time.date_format' => 'Format jam tidak valid (HH:MM:SS).',
            'new_trip_time.in' => 'Jam baru harus salah satu slot: '.self::VALID_SLOTS.'.',
        ];
    }
}
