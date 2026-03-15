<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\PaymentAccount;
use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

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

    public function transferBankAccounts(): array
    {
        return PaymentAccount::query()
            ->active()
            ->where('channel_type', 'transfer')
            ->orderBy('sort_order')
            ->get()
            ->map(fn (PaymentAccount $account): array => [
                'code' => $account->code,
                'bank_name' => $account->provider_name,
                'account_number' => (string) $account->account_number,
                'account_holder' => (string) $account->account_holder,
                'notes' => (string) ($account->notes ?? ''),
            ])
            ->all();
    }

    public function qrisAccount(): ?array
    {
        $account = PaymentAccount::query()
            ->active()
            ->where('channel_type', 'qris')
            ->orderBy('sort_order')
            ->first();

        if (! $account) {
            return null;
        }

        return [
            'code' => $account->code,
            'provider_name' => $account->provider_name,
            'account_number' => (string) $account->account_number,
            'account_holder' => (string) $account->account_holder,
            'qr_content' => (string) ($account->qr_content ?? ''),
            'notes' => (string) ($account->notes ?? ''),
        ];
    }

    public function bankAccountCodes(): array
    {
        return array_column($this->transferBankAccounts(), 'code');
    }

    public function bankAccountByCode(?string $code): ?array
    {
        return collect($this->transferBankAccounts())
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

    public function waitingVerificationPaymentStatus(): string
    {
        return 'Menunggu Verifikasi';
    }

    public function paidPaymentStatus(): string
    {
        return 'Dibayar';
    }

    public function cashPaymentStatus(): string
    {
        return 'Dibayar Tunai';
    }

    public function bookingStatusForPaymentMethod(string $paymentMethod): string
    {
        return match ($this->normalizePaymentMethod($paymentMethod)) {
            'transfer' => 'Menunggu Verifikasi Pembayaran',
            'qris', 'cash' => 'Diproses',
            default => 'Draft',
        };
    }

    public function paymentStatusForMethod(string $paymentMethod): string
    {
        return match ($this->normalizePaymentMethod($paymentMethod)) {
            'transfer' => $this->waitingVerificationPaymentStatus(),
            'qris' => $this->paidPaymentStatus(),
            'cash' => $this->cashPaymentStatus(),
            default => $this->pendingPaymentStatus(),
        };
    }

    public function marksPaymentAsPaid(string $paymentMethod): bool
    {
        return in_array($this->normalizePaymentMethod($paymentMethod), ['qris', 'cash'], true);
    }

    public function hasRecordedPayment(?Booking $booking): bool
    {
        if (! $booking instanceof Booking) {
            return false;
        }

        return $this->normalizePaymentMethod($booking->payment_method) !== ''
            && trim((string) ($booking->payment_status ?? '')) !== ''
            && trim((string) ($booking->payment_reference ?? '')) !== '';
    }

    public function ticketStatusForPaymentMethod(string $paymentMethod): string
    {
        return $this->normalizePaymentMethod($paymentMethod) === 'transfer'
            ? 'Menunggu Verifikasi Pembayaran'
            : 'Siap Terbit';
    }

    public function buildFormState(Request $request, Booking $booking): array
    {
        $selectedMethod = $this->normalizePaymentMethod($request->old('payment_method', $booking->payment_method ?? ''));
        $selectedBankCode = trim((string) $request->old('bank_account_code', $this->resolveBankAccountCode($booking)));
        $qrisAccount = $this->qrisAccount();

        return [
            'payment_method' => $selectedMethod,
            'bank_account_code' => $selectedMethod === 'transfer' ? $selectedBankCode : '',
            'payment_method_label' => $this->paymentMethodLabel($selectedMethod),
            'bank_account_label' => $selectedMethod === 'transfer'
                ? $this->bankAccountLabel($selectedBankCode)
                : 'Tidak diperlukan',
            'nominal_payment' => (int) round((float) ($booking->total_amount ?? 0)),
            'shows_transfer_accounts' => $selectedMethod === 'transfer',
            'shows_qris_account' => $selectedMethod === 'qris' && is_array($qrisAccount),
            'shows_cash_note' => $selectedMethod === 'cash',
            'qris_account' => $qrisAccount,
            'cash_note' => 'Pembayaran tunai akan dikonfirmasi langsung saat proses transaksi dilanjutkan.',
        ];
    }

    public function buildInvoiceState(Booking $booking, RegularBookingService $service): array
    {
        $booking->loadMissing('passengers');
        $driverName = trim((string) ($booking->driver_name ?? ''));
        $transactionDate = $booking->paid_at ?? $booking->updated_at ?? $booking->created_at;

        return [
            'booking_code' => $booking->booking_code,
            'invoice_number' => $booking->invoice_number ?: '-',
            'payment_reference' => $booking->payment_reference ?: '-',
            'payment_method' => $this->paymentMethodLabel($booking->payment_method),
            'payment_status' => (string) $booking->payment_status,
            'booking_status' => (string) $booking->booking_status,
            'route_label' => (string) $booking->route_label,
            'from_city' => (string) $booking->from_city,
            'to_city' => (string) $booking->to_city,
            'trip_date' => $booking->trip_date?->format('d M Y') ?? '-',
            'trip_time' => $booking->time ?? '-',
            'passenger_name' => (string) $booking->passenger_name,
            'passenger_phone' => (string) $booking->passenger_phone,
            'driver_name' => $driverName !== '' ? $driverName : 'Menunggu Penetapan Driver',
            'selected_seats_label' => $service->selectedSeatLabels((array) ($booking->selected_seats ?? [])),
            'payment_account_label' => $booking->payment_account_bank && $booking->payment_account_number
                ? $booking->payment_account_bank . ' - ' . $booking->payment_account_number
                : 'Tidak diperlukan',
            'nominal_payment_formatted' => $service->formatCurrency((int) round((float) ($booking->nominal_payment ?? 0))),
            'paid_at_label' => $booking->paid_at?->format('d M Y H:i') ?? 'Belum dicatat',
            'transaction_date_label' => $transactionDate?->format('d M Y H:i') ?? '-',
            'passengers' => $booking->passengers->map(fn ($passenger): array => [
                'seat_no' => (string) $passenger->seat_no,
                'name' => (string) $passenger->name,
                'phone' => (string) $passenger->phone,
            ])->all(),
        ];
    }

    public function buildTicketState(Booking $booking, RegularBookingService $service): array
    {
        $booking->loadMissing('passengers');
        $scanCount = max((int) ($booking->scan_count ?? 0), 0);
        $loyaltyTripCount = max((int) ($booking->loyalty_trip_count ?? 0), 0);
        $loyaltyCount = max((int) ($booking->loyalty_count ?? 0), $scanCount, $loyaltyTripCount);
        $discountEligible = (bool) ($booking->eligible_discount ?? $booking->discount_eligible ?? false) || $loyaltyCount >= 5;
        $qrCodeValue = trim((string) ($booking->qr_code_value ?? ''));
        $qrCodeMarkup = $qrCodeValue !== ''
            ? QrCode::format('svg')->size(220)->margin(1)->generate($qrCodeValue)
            : '';

        return [
            'booking_code' => $booking->booking_code,
            'ticket_number' => $booking->ticket_number ?: '-',
            'payment_status' => (string) $booking->payment_status,
            'ticket_status' => (string) $booking->ticket_status,
            'route_label' => (string) $booking->route_label,
            'from_city' => (string) $booking->from_city,
            'to_city' => (string) $booking->to_city,
            'trip_date' => $booking->trip_date?->format('d M Y') ?? '-',
            'trip_time' => $booking->time ?? '-',
            'passenger_name' => (string) $booking->passenger_name,
            'passenger_phone' => (string) $booking->passenger_phone,
            'selected_seats_label' => $service->selectedSeatLabels((array) ($booking->selected_seats ?? [])),
            'qr_token' => $booking->qr_token ?: '-',
            'qr_code_value' => $qrCodeValue,
            'qr_code_markup' => $qrCodeMarkup,
            'loyalty_trip_count' => $loyaltyTripCount,
            'scan_count' => $scanCount,
            'loyalty_count' => $loyaltyCount,
            'loyalty_target' => 5,
            'discount_percentage' => 50,
            'eligible_discount' => $discountEligible,
            'discount_status_label' => $discountEligible ? 'Eligible Diskon 50%' : 'Belum Eligible Diskon',
            'remaining_loyalty_steps' => max(5 - $loyaltyCount, 0),
            'price_per_seat' => (float) ($booking->price_per_seat ?? 0),
            'total_amount' => (float) ($booking->total_amount ?? 0),
            'nominal_payment' => (float) ($booking->nominal_payment ?? 0),
            'passenger_count' => max(1, (int) ($booking->passenger_count ?? 1)),
            'purchase_date' => $booking->created_at?->format('d F Y') ?? '-',
            'passengers' => $booking->passengers->map(fn ($passenger): array => [
                'seat_no' => (string) $passenger->seat_no,
                'name' => (string) $passenger->name,
                'phone' => (string) $passenger->phone,
            ])->all(),
        ];
    }

    private function resolveBankAccountCode(Booking $booking): string
    {
        $bankName = trim((string) ($booking->payment_account_bank ?? ''));
        $accountNumber = trim((string) ($booking->payment_account_number ?? ''));

        if ($bankName === '' || $accountNumber === '') {
            return '';
        }

        $account = collect($this->transferBankAccounts())
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
