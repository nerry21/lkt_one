<?php

namespace App\Http\Requests\PackageBooking;

use App\Services\RegularBookingPaymentService;
use Illuminate\Foundation\Http\FormRequest;

class StorePackageBookingPaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $payments = app(RegularBookingPaymentService::class);
        $paymentMethod = $this->input('payment_method', '');

        $rules = [
            'payment_method' => ['required', 'in:' . implode(',', $payments->paymentMethodValues())],
        ];

        if ($paymentMethod === 'transfer') {
            $rules['bank_account_code'] = ['required', 'string', 'in:' . implode(',', $payments->bankAccountCodes())];
        }

        return $rules;
    }
}
