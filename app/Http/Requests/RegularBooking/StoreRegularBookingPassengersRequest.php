<?php

namespace App\Http\Requests\RegularBooking;

use App\Services\RegularBookingDraftService;
use App\Services\RegularBookingService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class StoreRegularBookingPassengersRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $draft = app(RegularBookingDraftService::class)->get($this->session());
        $selectedSeatCodes = app(RegularBookingService::class)->sortSeatCodes($draft['selected_seats'] ?? []);
        $selectedSeatCount = count($selectedSeatCodes);

        return [
            'passengers' => ['required', 'array', "size:{$selectedSeatCount}"],
            'passengers.*.seat_no' => ['required', 'string', 'distinct', Rule::in($selectedSeatCodes)],
            'passengers.*.name' => ['required', 'string', 'max:100'],
            'passengers.*.phone' => ['required', 'string', 'regex:/^08[1-9][0-9]{7,12}$/'],
        ];
    }

    public function attributes(): array
    {
        return [
            'passengers' => 'data penumpang',
            'passengers.*.seat_no' => 'kursi penumpang',
            'passengers.*.name' => 'nama penumpang',
            'passengers.*.phone' => 'nomor HP penumpang',
        ];
    }

    public function messages(): array
    {
        return [
            'passengers.required' => 'Lengkapi data penumpang terlebih dahulu.',
            'passengers.array' => 'Format data penumpang tidak valid.',
            'passengers.size' => 'Jumlah data penumpang harus sama dengan jumlah kursi yang dipilih.',
            'passengers.*.seat_no.distinct' => 'Setiap kursi hanya boleh memiliki satu data penumpang.',
            'passengers.*.seat_no.in' => 'Ada kursi penumpang yang tidak sesuai dengan kursi terpilih.',
            'passengers.*.name.required' => 'Nama penumpang wajib diisi.',
            'passengers.*.phone.required' => 'Nomor HP penumpang wajib diisi.',
            'passengers.*.phone.regex' => 'Nomor HP penumpang harus menggunakan format nomor Indonesia yang valid.',
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator): void {
                if ($validator->errors()->isNotEmpty()) {
                    return;
                }

                $draft = app(RegularBookingDraftService::class)->get($this->session());
                $service = app(RegularBookingService::class);
                $expectedSeatCodes = $service->sortSeatCodes($draft['selected_seats'] ?? []);
                $submittedSeatCodes = $service->sortSeatCodes(array_column((array) $this->input('passengers', []), 'seat_no'));

                if ($expectedSeatCodes === []) {
                    $validator->errors()->add('passengers', 'Pilih kursi terlebih dahulu sebelum mengisi data penumpang.');

                    return;
                }

                if ($submittedSeatCodes !== $expectedSeatCodes) {
                    $validator->errors()->add('passengers', 'Data penumpang harus sesuai dengan seluruh kursi yang telah dipilih.');
                }
            },
        ];
    }

    protected function prepareForValidation(): void
    {
        $service = app(RegularBookingService::class);
        $passengers = $this->input('passengers', []);

        if (! is_array($passengers)) {
            $passengers = [];
        }

        $this->merge([
            'passengers' => collect($passengers)
                ->map(fn ($passenger): array => [
                    'seat_no' => trim((string) data_get($passenger, 'seat_no', '')),
                    'name' => trim((string) data_get($passenger, 'name', '')),
                    'phone' => $service->normalizeIndonesianPhone((string) data_get($passenger, 'phone', '')),
                ])
                ->values()
                ->all(),
        ]);
    }
}
