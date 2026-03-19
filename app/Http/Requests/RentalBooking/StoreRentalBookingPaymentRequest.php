<?php

namespace App\Http\Requests\RentalBooking;

use App\Services\RegularBookingPaymentService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRentalBookingPaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $payments = app(RegularBookingPaymentService::class);

        return [
            'payment_method'    => ['required', 'string', Rule::in($payments->paymentMethodValues())],
            'bank_account_code' => [
                Rule::requiredIf(fn () => $this->input('payment_method') === 'transfer'),
                'nullable',
                'string',
                Rule::in($payments->bankAccountCodes()),
            ],
        ];
    }

    public function attributes(): array
    {
        return [
            'payment_method'    => 'metode pembayaran',
            'bank_account_code' => 'rekening bank tujuan',
        ];
    }

    public function messages(): array
    {
        return [
            'payment_method.required'           => 'Pilih metode pembayaran terlebih dahulu.',
            'payment_method.in'                 => 'Metode pembayaran yang dipilih tidak valid.',
            'bank_account_code.required_if'     => 'Pilih rekening bank tujuan untuk pembayaran transfer.',
            'bank_account_code.in'              => 'Rekening bank yang dipilih tidak tersedia pada sistem.',
        ];
    }
}
