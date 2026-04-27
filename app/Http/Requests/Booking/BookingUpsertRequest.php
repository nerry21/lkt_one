<?php

namespace App\Http\Requests\Booking;

use App\Models\Booking;
use App\Models\User;
use App\Services\BookingManagementService;
use App\Services\RegularBookingService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

abstract class BookingUpsertRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $bookingService = app(BookingManagementService::class);
        $regularBookingService = app(RegularBookingService::class);
        $bankAccountCodes = array_column($bookingService->transferBankAccountOptions(), 'code');

        return [
            'booking_for' => ['required', 'string', Rule::in($bookingService->bookingForValues())],
            'from_city' => ['required', 'string', Rule::in($regularBookingService->locations())],
            'to_city' => ['required', 'string', Rule::in($regularBookingService->locations())],
            'trip_date' => ['required', 'date'],
            'trip_time' => ['required', 'string', Rule::in($regularBookingService->departureScheduleValues())],
            'passenger_count' => ['required', 'integer', 'between:1,6'],
            'pickup_location' => ['required', 'string', 'min:10', 'max:255'],
            'dropoff_location' => ['required', 'string', 'min:10', 'max:255'],
            'selected_seats' => ['required', 'array'],
            'selected_seats.*' => ['required', 'string', 'distinct', Rule::in($regularBookingService->selectableSeatCodes())],
            'passengers' => ['required', 'array'],
            'passengers.*.seat_no' => ['required', 'string', 'distinct', Rule::in($regularBookingService->selectableSeatCodes())],
            'passengers.*.name' => ['required', 'string', 'max:100'],
            'passengers.*.phone' => ['required', 'string', 'regex:/^08[1-9][0-9]{7,12}$/'],
            'category' => ['required', 'string', Rule::in($bookingService->serviceTypeValues())],
            'additional_fare_per_passenger' => ['nullable', 'integer', 'min:0'],
            'driver_name' => ['nullable', 'string', 'max:100'],
            // Sesi 47 Fix #2: driver_id + mobil_id nullable, exists check di DB.
            // Source: form modal dropdown (replace text input driver_name legacy).
            'driver_id' => ['nullable', 'string', 'exists:drivers,id'],
            'mobil_id' => ['nullable', 'string', 'exists:mobil,id'],
            'payment_method' => ['nullable', 'string', Rule::in($bookingService->paymentMethodValues())],
            'payment_status' => ['required', 'string', Rule::in($bookingService->paymentStatusValues())],
            'booking_status' => ['required', 'string', Rule::in($bookingService->bookingStatusValues())],
            'bank_account_code' => ['nullable', 'string', Rule::in($bankAccountCodes !== [] ? $bankAccountCodes : [''])],
            'notes' => ['nullable', 'string', 'max:500'],
            'armada_index' => ['nullable', 'integer', 'min:1', 'max:10'],
            'route_via' => ['nullable', 'string', Rule::in(['BANGKINANG', 'PETAPAHAN'])],
        ];
    }

    public function attributes(): array
    {
        return [
            'booking_for' => 'jenis pemesanan',
            'from_city' => 'kota asal',
            'to_city' => 'kota tujuan',
            'trip_date' => 'tanggal keberangkatan',
            'trip_time' => 'waktu keberangkatan',
            'passenger_count' => 'jumlah penumpang',
            'pickup_location' => 'alamat penjemputan',
            'dropoff_location' => 'alamat pengantaran',
            'selected_seats' => 'kursi terpilih',
            'selected_seats.*' => 'kursi terpilih',
            'passengers' => 'data penumpang',
            'passengers.*.seat_no' => 'kursi penumpang',
            'passengers.*.name' => 'nama penumpang',
            'passengers.*.phone' => 'nomor HP penumpang',
            'category' => 'jenis layanan',
            'driver_name' => 'nama driver',
            'driver_id' => 'driver',
            'mobil_id' => 'kode mobil',
            'payment_method' => 'metode pembayaran',
            'payment_status' => 'status pembayaran',
            'booking_status' => 'status booking',
            'bank_account_code' => 'rekening transfer',
            'notes' => 'catatan',
            'route_via' => 'jalur mobil',
        ];
    }

    public function messages(): array
    {
        return [
            'pickup_location.min' => 'Alamat penjemputan minimal 10 karakter.',
            'dropoff_location.min' => 'Alamat pengantaran minimal 10 karakter.',
            'selected_seats.required' => 'Pilih kursi terlebih dahulu.',
            'selected_seats.array' => 'Format kursi terpilih tidak valid.',
            'selected_seats.*.distinct' => 'Setiap kursi hanya boleh dipilih satu kali.',
            'passengers.required' => 'Lengkapi data penumpang terlebih dahulu.',
            'passengers.*.seat_no.distinct' => 'Data kursi penumpang tidak boleh duplikat.',
            'passengers.*.name.required' => 'Nama penumpang wajib diisi.',
            'passengers.*.phone.required' => 'Nomor HP penumpang wajib diisi.',
            'passengers.*.phone.regex' => 'Nomor HP penumpang harus menggunakan format nomor Indonesia yang valid.',
        ];
    }

    public function after(): array
    {
        return [
            function (Validator $validator): void {
                // Priority 1: role-based 2B access guard. Non-admin yang
                // mengirim 2B di selected_seats atau passengers.*.seat_no
                // ditolak dengan pesan role-eksplisit, sebelum guard
                // errors->isNotEmpty() existing supaya pesan ini tidak
                // tertelan error lain di payload yang sama.
                $actor = $this->user();
                $isAdmin = $actor instanceof User && $actor->isAdmin();

                if (! $isAdmin) {
                    $rawSelectedSeats = (array) $this->input('selected_seats', []);
                    $rawPassengerSeats = array_column((array) $this->input('passengers', []), 'seat_no');

                    if (in_array('2B', $rawSelectedSeats, true) || in_array('2B', $rawPassengerSeats, true)) {
                        $validator->errors()->add(
                            'selected_seats',
                            'Kursi 2B hanya dapat dipilih oleh Admin atau Super Admin.'
                        );

                        return;
                    }
                }

                if ($validator->errors()->isNotEmpty()) {
                    return;
                }

                $bookingService = app(BookingManagementService::class);
                $regularBookingService = app(RegularBookingService::class);
                $origin = (string) $this->input('from_city');
                $destination = (string) $this->input('to_city');
                $passengerCount = (int) $this->input('passenger_count');
                $paymentMethod = (string) ($this->input('payment_method') ?? '');
                $paymentStatus = (string) $this->input('payment_status');
                $selectedSeats = $regularBookingService->sortSeatCodes(
                    (array) $this->input('selected_seats', []),
                    $regularBookingService->availableSeatCodesForPassengerCount($passengerCount, $isAdmin),
                );
                $passengers = (array) $this->input('passengers', []);
                $passengerSeatCodes = $regularBookingService->sortSeatCodes(
                    array_column($passengers, 'seat_no'),
                    $regularBookingService->availableSeatCodesForPassengerCount($passengerCount, $isAdmin),
                );

                if ($origin === $destination) {
                    $validator->errors()->add('to_city', 'Kota tujuan harus berbeda dengan kota asal.');

                    return;
                }

                // Sesi 44C PR #1C: forbidden route check (defense layer 1 of 2).
                // Service layer juga throw ForbiddenRouteException sebagai defense
                // layer 2 kalau ada bypass FormRequest.
                $clusterService = app(\App\Services\BookingClusterService::class);

                if ($clusterService->isForbiddenRoute($origin, $destination)) {
                    $validator->errors()->add(
                        'to_city',
                        sprintf(
                            'Rute %s ↔ %s tidak tersedia karena cabang fisik berbeda.',
                            $origin,
                            $destination,
                        ),
                    );

                    return;
                }

                // Sesi 44D PR #1D: kalau rute butuh jalur eksplisit (kedua sisi
                // ambigu, atau salah satu HUB dan sisi lain ambigu), route_via
                // wajib dipilih oleh user. Untuk rute fixed (mis. Aliantan↔PKB)
                // cluster ter-resolve dari lokasi, route_via informational only.
                $fromCluster = $clusterService->clusterForLocation($origin);
                $toCluster = $clusterService->clusterForLocation($destination);
                $needsExplicitRouteVia = ($fromCluster === null && $toCluster === null)
                    || ($fromCluster === \App\Services\BookingClusterService::CLUSTER_HUB && $toCluster === null)
                    || ($toCluster === \App\Services\BookingClusterService::CLUSTER_HUB && $fromCluster === null);

                if ($needsExplicitRouteVia && empty(trim((string) $this->input('route_via')))) {
                    $validator->errors()->add('route_via', 'Jalur mobil wajib dipilih untuk rute ini.');

                    return;
                }

                // Sesi 44D PR #1D: NO LONGER block kalau resolveFare null —
                // admin bisa save dengan tarif Rp 0, banner UI sudah notify.

                if (count($selectedSeats) !== $passengerCount) {
                    $validator->errors()->add('selected_seats', 'Jumlah kursi yang dipilih harus sama dengan jumlah penumpang.');
                }

                if (count($passengers) !== $passengerCount) {
                    $validator->errors()->add('passengers', 'Jumlah data penumpang harus sama dengan jumlah kursi yang dipilih.');
                }

                if ($selectedSeats !== $passengerSeatCodes) {
                    $validator->errors()->add('passengers', 'Data penumpang harus mengikuti seluruh kursi yang dipilih.');
                }

                if ($paymentMethod === 'transfer' && ! filled($this->input('bank_account_code'))) {
                    $validator->errors()->add('bank_account_code', 'Pilih rekening transfer yang tersedia.');
                }

                if (! in_array($paymentStatus, $bookingService->paymentStatusAllowedForMethod($paymentMethod), true)) {
                    $validator->errors()->add('payment_status', 'Status pembayaran tidak sesuai dengan metode pembayaran yang dipilih.');
                }

                // Seat conflict check: same trip_date + trip_time + armada_index + direction
                $tripDate = (string) $this->input('trip_date');
                $tripTime = (string) $this->input('trip_time');
                $armadaIndex = max(1, (int) ($this->input('armada_index') ?? 1));
                $fromCity = (string) ($this->input('from_city') ?? '');
                $toCity = (string) ($this->input('to_city') ?? '');
                $excludeId = $this->route('booking') ? (string) $this->route('booking') : null;
                $timePrefix = strlen($tripTime) >= 5 ? substr($tripTime, 0, 5) : $tripTime;

                $occupiedSeats = Booking::query()
                    ->where('trip_date', $tripDate)
                    ->where('trip_time', 'like', $timePrefix . '%')
                    ->where(function ($q) use ($armadaIndex): void {
                        $q->where('armada_index', $armadaIndex);
                        if ($armadaIndex === 1) {
                            $q->orWhereNull('armada_index');
                        }
                    })
                    ->when($fromCity !== '', fn ($q) => $q->where('from_city', $fromCity))
                    ->when($toCity !== '', fn ($q) => $q->where('to_city', $toCity))
                    ->when($excludeId, fn ($q) => $q->where('id', '!=', $excludeId))
                    ->get()
                    ->flatMap(fn (Booking $b) => (array) ($b->selected_seats ?? []))
                    ->unique()
                    ->values()
                    ->all();

                $conflictSeats = array_intersect($selectedSeats, $occupiedSeats);

                if (! empty($conflictSeats)) {
                    $validator->errors()->add(
                        'selected_seats',
                        'Kursi ' . implode(', ', $conflictSeats) . ' sudah dipesan pada jadwal ' . $tripDate . ' pukul ' . $tripTime . '.',
                    );
                }
            },
        ];
    }

    protected function prepareForValidation(): void
    {
        $regularBookingService = app(RegularBookingService::class);
        $selectedSeats = $this->input('selected_seats', []);
        $passengers = $this->input('passengers', []);
        $paymentMethod = trim((string) $this->input('payment_method', ''));
        $bankAccountCode = trim((string) $this->input('bank_account_code', ''));

        $this->merge([
            'booking_for' => trim((string) $this->input('booking_for')),
            'from_city' => trim((string) $this->input('from_city')),
            'to_city' => trim((string) $this->input('to_city')),
            'trip_time' => trim((string) $this->input('trip_time')),
            'pickup_location' => trim((string) $this->input('pickup_location')),
            'dropoff_location' => trim((string) $this->input('dropoff_location')),
            'selected_seats' => collect(is_array($selectedSeats) ? $selectedSeats : [$selectedSeats])
                ->map(fn ($seatCode): string => trim((string) $seatCode))
                ->filter(fn (string $seatCode): bool => $seatCode !== '')
                ->values()
                ->all(),
            'passengers' => collect(is_array($passengers) ? $passengers : [])
                ->map(fn ($passenger): array => [
                    'seat_no' => trim((string) data_get($passenger, 'seat_no', '')),
                    'name' => trim((string) data_get($passenger, 'name', '')),
                    'phone' => $regularBookingService->normalizeIndonesianPhone((string) data_get($passenger, 'phone', '')),
                ])
                ->values()
                ->all(),
            'category' => trim((string) $this->input('category')),
            'driver_name' => trim((string) $this->input('driver_name')),
            'payment_method' => $paymentMethod !== '' ? $paymentMethod : null,
            'payment_status' => trim((string) $this->input('payment_status')),
            'booking_status' => trim((string) $this->input('booking_status')),
            'bank_account_code' => $paymentMethod === 'transfer' && $bankAccountCode !== ''
                ? $bankAccountCode
                : null,
            'additional_fare_per_passenger' => max(0, (int) ($this->input('additional_fare_per_passenger') ?? 0)),
            'notes' => trim((string) $this->input('notes')),
            'armada_index' => max(1, (int) ($this->input('armada_index') ?? 1)),
            // Sesi 44D PR #1D: UI dropdown sudah ready. Tidak default ke
            // BANGKINANG — biarkan null supaya validasi ambigu bisa trigger.
            // Untuk rute fixed (Aliantan↔PKB), cluster di-resolve dari lokasi
            // di service layer, route_via cuma informational.
            'route_via' => filled($this->input('route_via'))
                ? strtoupper(trim((string) $this->input('route_via')))
                : null,
            // Sesi 47 Fix #2: normalize empty string → null supaya exists rule
            // tidak fail untuk driver/mobil yang sengaja kosong (Belum ditentukan).
            'driver_id' => filled($this->input('driver_id'))
                ? trim((string) $this->input('driver_id'))
                : null,
            'mobil_id' => filled($this->input('mobil_id'))
                ? trim((string) $this->input('mobil_id'))
                : null,
        ]);
    }
}
