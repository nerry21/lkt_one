<?php

namespace App\Http\Requests\RegularBooking;

use App\Services\RegularBookingPaymentService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRegularBookingPaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $payments = app(RegularBookingPaymentService::class);

        return [
            'payment_method' => ['required', 'string', Rule::in($payments->paymentMethodValues())],
            'bank_account_code' => [
                'nullable',
                'string',
                Rule::requiredIf(fn (): bool => $this->input('payment_method') === 'transfer'),
                Rule::in($payments->bankAccountCodes()),
            ],
        ];
    }

    public function attributes(): array
    {
        return [
            'payment_method' => 'metode pembayaran',
            'bank_account_code' => 'rekening tujuan transfer',
        ];
    }

    public function messages(): array
    {
        return [
            'payment_method.required' => 'Pilih metode pembayaran terlebih dahulu.',
            'bank_account_code.required' => 'Pilih rekening tujuan transfer terlebih dahulu.',
            'bank_account_code.in' => 'Rekening tujuan transfer yang dipilih tidak tersedia pada sistem.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $bankAccountCode = trim((string) $this->input('bank_account_code'));

        $this->merge([
            'payment_method' => trim((string) $this->input('payment_method')),
            'bank_account_code' => $bankAccountCode === '' ? null : $bankAccountCode,
        ]);
    }
}
