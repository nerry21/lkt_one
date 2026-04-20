<?php

namespace App\Http\Requests\Booking;

use App\Services\BookingManagementService;
use App\Services\RegularBookingService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateQuickPackageBookingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $bookingService  = app(BookingManagementService::class);
        $regularService  = app(RegularBookingService::class);
        $bankAccountCodes = array_column($bookingService->transferBankAccountOptions(), 'code');

        return [
            // Bug #30 Phase 2: optimistic locking version required.
            'version'         => ['required', 'integer', 'min:0'],

            'trip_date'       => ['required', 'date'],
            'trip_time'       => ['required', 'string', Rule::in($regularService->departureScheduleValues())],
            'from_city'       => ['required', 'string', Rule::in($regularService->locations())],
            'to_city'         => ['required', 'string'],
            'armada_index'    => ['nullable', 'integer', 'min:1', 'max:10'],
            'sender_name'     => ['required', 'string', 'max:100'],
            'sender_phone'    => ['nullable', 'string', 'max:20'],
            'sender_address'  => ['required', 'string', 'min:3', 'max:255'],
            'recipient_name'  => ['required', 'string', 'max:100'],
            'recipient_phone' => ['nullable', 'string', 'max:20'],
            'recipient_address' => ['required', 'string', 'min:3', 'max:255'],
            'item_name'       => ['required', 'string', 'max:100'],
            'item_qty'        => ['required', 'integer', 'min:1', 'max:100'],
            'package_size'    => ['required', 'string', Rule::in(['Kecil', 'Sedang', 'Besar'])],
            'seat_code'       => ['nullable', 'string', 'max:10'],
            'fare_amount'     => ['required', 'integer', 'min:0'],
            'additional_fare' => ['nullable', 'integer', 'min:0'],
            'payment_method'  => ['nullable', 'string', Rule::in($bookingService->paymentMethodValues())],
            'payment_status'  => ['required', 'string', Rule::in($bookingService->paymentStatusValues())],
            'bank_account_code' => ['nullable', 'string', Rule::in($bankAccountCodes !== [] ? $bankAccountCodes : [''])],
        ];
    }

    public function attributes(): array
    {
        return [
            'version'         => 'versi data',
            'trip_date'       => 'tanggal keberangkatan',
            'trip_time'       => 'jam keberangkatan',
            'from_city'       => 'kota asal',
            'to_city'         => 'kota tujuan',
            'sender_name'     => 'nama pengirim',
            'sender_phone'    => 'no. HP pengirim',
            'sender_address'  => 'alamat pengirim',
            'recipient_name'  => 'nama penerima',
            'recipient_phone' => 'no. HP penerima',
            'recipient_address' => 'alamat penerima',
            'item_name'       => 'nama barang',
            'item_qty'        => 'jumlah barang',
            'package_size'    => 'ukuran paket',
            'fare_amount'     => 'ongkos tarif',
            'additional_fare' => 'ongkos tambahan',
            'payment_method'  => 'metode pembayaran',
            'payment_status'  => 'status pembayaran',
        ];
    }

    protected function prepareForValidation(): void
    {
        $paymentMethod = trim((string) $this->input('payment_method', ''));

        $this->merge([
            'from_city'       => trim((string) $this->input('from_city')),
            'to_city'         => trim((string) $this->input('to_city')),
            'trip_time'       => trim((string) $this->input('trip_time')),
            'sender_name'     => trim((string) $this->input('sender_name')),
            'sender_address'  => trim((string) $this->input('sender_address')),
            'recipient_name'  => trim((string) $this->input('recipient_name')),
            'recipient_address' => trim((string) $this->input('recipient_address')),
            'item_name'       => trim((string) $this->input('item_name')),
            'package_size'    => trim((string) $this->input('package_size')),
            'fare_amount'     => max(0, (int) $this->input('fare_amount', 0)),
            'additional_fare' => max(0, (int) $this->input('additional_fare', 0)),
            'item_qty'        => max(1, (int) $this->input('item_qty', 1)),
            'armada_index'    => max(1, (int) ($this->input('armada_index') ?? 1)),
            'payment_method'  => $paymentMethod !== '' ? $paymentMethod : null,
            'payment_status'  => trim((string) $this->input('payment_status', 'Belum Bayar')),
        ]);
    }
}
