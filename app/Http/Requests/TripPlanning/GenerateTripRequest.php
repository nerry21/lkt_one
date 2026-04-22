<?php

namespace App\Http\Requests\TripPlanning;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validate POST /dashboard/trip-planning/generate payload.
 *
 * Rules:
 *   - date required, valid, >= today (no regenerate past dates — trips
 *     already exist historically; admin regenerate past = corruption risk).
 */
class GenerateTripRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'date' => ['required', 'date', 'after_or_equal:today'],
        ];
    }

    public function messages(): array
    {
        return [
            'date.after_or_equal' => 'Tanggal generate tidak boleh sebelum hari ini.',
        ];
    }
}
