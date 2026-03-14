<?php

namespace App\Services;

use App\Models\Booking;
use Illuminate\Http\Request;

class RegularBookingPaymentService
{
    public function paymentMethods(): array
    {
        return [
            [
                'value' => 'transfer',
                'label' => 'Transfer',
                'description' => 'Pembayaran dilakukan melalui rekening bank yang tersedia pada sistem.',
            ],
            [
                'value' => 'qris',
                'label' => 'QRIS',
                'description' => 'Pembayaran akan dilanjutkan melalui kode QRIS pada tahap berikutnya.',
            ],
            [
                'value' => 'cash',
                'label' => 'Cash',
                'description' => 'Pembayaran dilakukan secara tunai saat proses transaksi dilanjutkan.',
            ],
        ];
    }

    public function paymentMethodValues(): array
    {
        return array_column($this->paymentMethods(), 'value');
    }

    public function paymentMethodLabel(?string $value): string
    {
        $paymentMethod = collect($this->paymentMethods())
            ->firstWhere('value', $this->normalizePaymentMethod($value));

        return is_array($paymentMethod) ? $paymentMethod['label'] : 'Belum dipilih';
    }

    public function bankAccounts(): array
    {
        return [
            [
                'code' => 'bca_operasional',
                'bank_name' => 'Bank BCA',
                'account_number' => '1110 0022 2333',
                'account_holder' => 'PT Lancang Kuning Travelindo',
            ],
            [
                'code' => 'bni_operasional',
                'bank_name' => 'Bank BNI',
                'account_number' => '2200 3344 5566',
                'account_holder' => 'PT Lancang Kuning Travelindo',
            ],
            [
                'code' => 'mandiri_operasional',
                'bank_name' => 'Bank Mandiri',
                'account_number' => '3300 4455 6677',
                'account_holder' => 'PT Lancang Kuning Travelindo',
            ],
        ];
    }

    public function bankAccountCodes(): array
    {
        return array_column($this->bankAccounts(), 'code');
    }

    public function bankAccountByCode(?string $code): ?array
    {
        return collect($this->bankAccounts())
            ->firstWhere('code', trim((string) $code));
    }

    public function bankAccountLabel(?string $code): string
    {
        $account = $this->bankAccountByCode($code);

        if (! $account) {
            return 'Belum dipilih';
        }

        return $account['bank_name'] . ' - ' . $account['account_number'];
    }

    public function pendingPaymentStatus(): string
    {
        return 'Menunggu Pembayaran';
    }

    public function buildFormState(Request $request, Booking $booking): array
    {
        $selectedMethod = $this->normalizePaymentMethod($request->old('payment_method', $booking->payment_method ?? ''));
        $selectedBankCode = trim((string) $request->old('bank_account_code', $this->resolveBankAccountCode($booking)));

        return [
            'payment_method' => $selectedMethod,
            'bank_account_code' => $selectedMethod === 'transfer' ? $selectedBankCode : '',
            'payment_method_label' => $this->paymentMethodLabel($selectedMethod),
            'bank_account_label' => $selectedMethod === 'transfer'
                ? $this->bankAccountLabel($selectedBankCode)
                : 'Tidak diperlukan',
            'nominal_payment' => (int) round((float) ($booking->total_amount ?? 0)),
        ];
    }

    private function resolveBankAccountCode(Booking $booking): string
    {
        $bankName = trim((string) ($booking->payment_account_bank ?? ''));
        $accountNumber = trim((string) ($booking->payment_account_number ?? ''));

        if ($bankName === '' || $accountNumber === '') {
            return '';
        }

        $account = collect($this->bankAccounts())
            ->first(fn (array $item): bool => $item['bank_name'] === $bankName && $item['account_number'] === $accountNumber);

        return $account['code'] ?? '';
    }

    private function normalizePaymentMethod(?string $value): string
    {
        return match (strtolower(trim((string) $value))) {
            'transfer' => 'transfer',
            'qris' => 'qris',
            'cash' => 'cash',
            default => '',
        };
    }
}
