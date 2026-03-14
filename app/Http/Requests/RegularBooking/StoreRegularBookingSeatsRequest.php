<?php

namespace App\Http\Requests\RegularBooking;

use App\Services\RegularBookingDraftService;
use App\Services\RegularBookingService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class StoreRegularBookingSeatsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $draft = app(RegularBookingDraftService::class)->get($this->session());
        $requiredSeatCount = (int) ($draft['passenger_count'] ?? 0);
        $availableSeatCodes = app(RegularBookingService::class)->availableSeatCodesForPassengerCount($requiredSeatCount);

        return [
            'seat_codes' => ['required', 'array'],
            'seat_codes.*' => [
                'required',
                'string',
                'distinct',
                Rule::in($availableSeatCodes),
            ],
        ];
    }

    public function attributes(): array
    {
        return [
            'seat_codes' => 'kursi',
            'seat_codes.*' => 'kursi',
        ];
    }

    public function messages(): array
    {
        return [
            'seat_codes.required' => 'Pilih kursi terlebih dahulu sebelum melanjutkan.',
            'seat_codes.array' => 'Data kursi yang dikirim tidak valid.',
            'seat_codes.*.distinct' => 'Setiap kursi hanya boleh dipilih satu kali.',
            'seat_codes.*.in' => 'Ada kursi yang dipilih tetapi tidak tersedia pada penampang kendaraan.',
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator): void {
                if ($validator->errors()->has('seat_codes') || $validator->errors()->has('seat_codes.*')) {
                    return;
                }

                $draft = app(RegularBookingDraftService::class)->get($this->session());
                $requiredSeatCount = (int) ($draft['passenger_count'] ?? 0);
                $service = app(RegularBookingService::class);

                if ($requiredSeatCount < 1) {
                    $validator->errors()->add('seat_codes', 'Lengkapi informasi pemesanan terlebih dahulu sebelum memilih kursi.');

                    return;
                }

                $selectedSeatCodes = $service->sortSeatCodes(
                    (array) $this->input('seat_codes', []),
                    $service->availableSeatCodesForPassengerCount($requiredSeatCount),
                );

                if (count($selectedSeatCodes) !== $requiredSeatCount) {
                    $validator->errors()->add(
                        'seat_codes',
                        "Pilih tepat {$requiredSeatCount} kursi sesuai jumlah penumpang sebelum melanjutkan."
                    );
                }
            },
        ];
    }

    protected function prepareForValidation(): void
    {
        $seatCodes = $this->input('seat_codes', []);

        if (! is_array($seatCodes)) {
            $seatCodes = [$seatCodes];
        }

        $this->merge([
            'seat_codes' => array_values(array_map(
                fn ($seatCode): string => trim((string) $seatCode),
                $seatCodes,
            )),
        ]);
    }
}
