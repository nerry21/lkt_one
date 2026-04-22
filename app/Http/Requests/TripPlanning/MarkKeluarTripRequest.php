<?php

namespace App\Http\Requests\TripPlanning;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validate payload untuk PATCH .../trips/{trip}/keluar-trip.
 *
 * Field names match KeluarTripService::markKeluarTrip $payload array contract:
 *   reason, pool_target, note?, planned_end_date?
 */
class MarkKeluarTripRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'reason' => ['required', 'string', 'in:dropping,rental'],
            'pool_target' => ['required', 'string', 'in:PKB,ROHUL'],
            'note' => ['nullable', 'string', 'max:1000'],
            'planned_end_date' => ['nullable', 'date', 'after_or_equal:today'],
        ];
    }

    public function messages(): array
    {
        return [
            'reason.in' => 'Reason harus dropping atau rental.',
            'pool_target.in' => 'Pool target harus PKB atau ROHUL.',
            'planned_end_date.after_or_equal' => 'Planned end date tidak boleh sebelum hari ini.',
        ];
    }
}
