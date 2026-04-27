<?php

namespace App\Http\Requests\Booking;

use App\Services\BookingManagementService;
use App\Services\RegularBookingService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreQuickPackageBookingRequest extends FormRequest
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
            'trip_date'       => ['required', 'date'],
            'trip_time'       => ['required', 'string', Rule::in($regularService->departureScheduleValues())],
            'from_city'       => ['required', 'string', Rule::in($regularService->locations())],
            'to_city'         => ['required', 'string'],
            // Sesi 46 PR #58b: cluster-aware route_via untuk Package form symmetric
            // dengan Regular form (D-PR58b-2 locked). Nullable + whitelist guard
            // (backend default 'BANGKINANG' di service kalau missing).
            'route_via'       => ['nullable', 'string', Rule::in(['BANGKINANG', 'PETAPAHAN'])],
            // Sesi 47 Fix #2: driver_id + mobil_id form modal Package (symmetric Regular).
            'driver_id'       => ['nullable', 'string', 'exists:drivers,id'],
            'mobil_id'        => ['nullable', 'string', 'exists:mobil,id'],
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
            'trip_date'       => 'tanggal keberangkatan',
            'trip_time'       => 'jam keberangkatan',
            'from_city'       => 'kota asal',
            'to_city'         => 'kota tujuan',
            'route_via'       => 'jalur mobil',
            'driver_id'       => 'driver',
            'mobil_id'        => 'kode mobil',
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
            // Sesi 46 PR #58b: normalize route_via uppercase + trim
            'route_via'       => filled($this->input('route_via'))
                ? strtoupper(trim((string) $this->input('route_via')))
                : null,
            // Sesi 47 Fix #2: normalize empty string → null untuk driver/mobil.
            'driver_id'       => filled($this->input('driver_id'))
                ? trim((string) $this->input('driver_id'))
                : null,
            'mobil_id'        => filled($this->input('mobil_id'))
                ? trim((string) $this->input('mobil_id'))
                : null,
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
