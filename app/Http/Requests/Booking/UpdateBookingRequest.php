<?php

namespace App\Http\Requests\Booking;

class UpdateBookingRequest extends BookingUpsertRequest
{
    /**
     * Merge parent rules with version field required for optimistic locking.
     *
     * Version is read-only on model ($fillable exclusion), but required on
     * UPDATE payload to detect stale edits per bug #30 design §8.1.
     *
     * @return array
     */
    public function rules(): array
    {
        return array_merge(parent::rules(), [
            'version' => ['required', 'integer', 'min:0'],
        ]);
    }
}
