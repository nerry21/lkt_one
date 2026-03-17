<?php

namespace App\Http\Requests\PackageBooking;

use App\Services\PackageBookingService;
use Illuminate\Foundation\Http\FormRequest;

class StorePackageBookingInformationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $service = app(PackageBookingService::class);
        $locations = $service->locations();
        $scheduleValues = $service->departureScheduleValues();

        return [
            'trip_date' => ['required', 'date', 'after_or_equal:today'],
            'departure_time' => ['required', 'in:' . implode(',', $scheduleValues)],
            'pickup_city' => ['required', 'in:' . implode(',', $locations)],
            'destination_city' => ['required', 'in:' . implode(',', $locations), 'different:pickup_city'],
            'sender_name' => ['required', 'string', 'min:3', 'max:100'],
            'sender_phone' => ['required', 'string', 'min:8', 'max:20'],
            'sender_address' => ['required', 'string', 'min:5', 'max:255'],
            'recipient_name' => ['required', 'string', 'min:3', 'max:100'],
            'recipient_phone' => ['required', 'string', 'min:8', 'max:20'],
            'recipient_address' => ['required', 'string', 'min:5', 'max:255'],
            'item_name' => ['required', 'string', 'min:2', 'max:150'],
            'item_qty' => ['required', 'integer', 'min:1', 'max:999'],
            'fare_amount' => ['required', 'integer', 'min:1000'],
            'additional_fare' => ['nullable', 'integer', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'trip_date.after_or_equal' => 'Tanggal keberangkatan tidak boleh kurang dari hari ini.',
            'pickup_city.different' => 'Lokasi asal dan tujuan tidak boleh sama.',
            'destination_city.different' => 'Lokasi asal dan tujuan tidak boleh sama.',
            'fare_amount.min' => 'Ongkos tarif minimal Rp 1.000.',
        ];
    }
}
