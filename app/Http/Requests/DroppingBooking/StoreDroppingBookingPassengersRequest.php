<?php

namespace App\Http\Requests\DroppingBooking;

use App\Services\DroppingBookingService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class StoreDroppingBookingPassengersRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $allSeatCodes = app(DroppingBookingService::class)->allSeatCodes();

        return [
            'passengers'           => ['required', 'array', 'size:6'],
            'passengers.*.seat_no' => ['required', 'string', 'distinct', Rule::in($allSeatCodes)],
            'passengers.*.name'    => ['required', 'string', 'max:100'],
            'passengers.*.phone'   => ['required', 'string', 'regex:/^08[1-9][0-9]{7,12}$/'],
        ];
    }

    public function attributes(): array
    {
        return [
            'passengers'           => 'data penumpang',
            'passengers.*.seat_no' => 'kursi penumpang',
            'passengers.*.name'    => 'nama penumpang',
            'passengers.*.phone'   => 'nomor HP penumpang',
        ];
    }

    public function messages(): array
    {
        return [
            'passengers.required'          => 'Lengkapi data penumpang terlebih dahulu.',
            'passengers.array'             => 'Format data penumpang tidak valid.',
            'passengers.size'              => 'Data penumpang dropping harus tepat 6 orang (satu per kursi).',
            'passengers.*.seat_no.distinct'=> 'Setiap kursi hanya boleh memiliki satu data penumpang.',
            'passengers.*.seat_no.in'      => 'Nomor kursi tidak valid untuk pemesanan dropping.',
            'passengers.*.name.required'   => 'Nama penumpang wajib diisi.',
            'passengers.*.phone.required'  => 'Nomor HP penumpang wajib diisi.',
            'passengers.*.phone.regex'     => 'Nomor HP penumpang harus menggunakan format nomor Indonesia yang valid.',
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator): void {
                if ($validator->errors()->isNotEmpty()) {
                    return;
                }

                $service = app(DroppingBookingService::class);
                $allSeatCodes = $service->allSeatCodes();
                sort($allSeatCodes);

                $submitted = array_column((array) $this->input('passengers', []), 'seat_no');
                sort($submitted);

                if ($submitted !== $allSeatCodes) {
                    $validator->errors()->add('passengers', 'Data penumpang harus mencakup seluruh kursi dropping (1A, 2A, 2B, 3A, 4A, 5A).');
                }
            },
        ];
    }

    protected function prepareForValidation(): void
    {
        $service = app(DroppingBookingService::class);
        $passengers = $this->input('passengers', []);

        if (! is_array($passengers)) {
            $passengers = [];
        }

        $this->merge([
            'passengers' => collect($passengers)
                ->map(fn ($p): array => [
                    'seat_no' => trim((string) data_get($p, 'seat_no', '')),
                    'name'    => trim((string) data_get($p, 'name', '')),
                    'phone'   => $service->normalizeIndonesianPhone((string) data_get($p, 'phone', '')),
                ])
                ->values()
                ->all(),
        ]);
    }
}
