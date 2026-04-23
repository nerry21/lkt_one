<?php

namespace App\Http\Requests\TripPlanning;

use App\Services\SameDayReturnService;
use Illuminate\Foundation\Http\FormRequest;

/**
 * Validate payload untuk POST .../trips/{trip}/same-day-return (Fase E5 Tahap 4).
 *
 * Field names match SameDayReturnService::createSameDayReturn $payload contract:
 *   slot (required, in VALID_SLOTS),
 *   reason (nullable string, max 64),
 *   driver_id (nullable UUID, exists drivers),
 *   note (nullable string, max 1000).
 *
 * Note: Business precondition (direction/status/already-paired) di-validate di
 * service layer via SameDayReturnConflictException (409). FormRequest hanya
 * syntactic validation (422). Defense in depth.
 */
class CreateSameDayReturnRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $validSlots = implode(',', SameDayReturnService::VALID_SLOTS);

        return [
            'slot' => ['required', 'string', 'date_format:H:i:s', 'in:'.$validSlots],
            'reason' => ['nullable', 'string', 'max:64'],
            'driver_id' => ['nullable', 'string', 'uuid', 'exists:drivers,id'],
            'note' => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'slot.required' => 'Slot jam wajib diisi.',
            'slot.date_format' => 'Slot harus format HH:MM:SS.',
            'slot.in' => 'Slot harus salah satu dari: '.implode(', ', SameDayReturnService::VALID_SLOTS).'.',
            'reason.max' => 'Reason maksimum 64 karakter.',
            'driver_id.uuid' => 'Driver ID harus format UUID yang valid.',
            'driver_id.exists' => 'Driver tidak ditemukan.',
            'note.max' => 'Note maksimum 1000 karakter.',
        ];
    }
}
