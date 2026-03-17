<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BookingPassenger;
use App\Models\Customer;
use App\Services\CustomerLoyaltyService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\HttpException;

class QrScanController extends Controller
{
    public function __construct(
        private readonly CustomerLoyaltyService $loyaltyService,
    ) {}

    public function scan(Request $request): JsonResponse
    {
        $qrToken = trim((string) $request->input('qr_token', ''));

        if ($qrToken === '') {
            throw new HttpException(422, 'QR token tidak boleh kosong');
        }

        // Cari penumpang berdasarkan passenger-level qr_token
        $passenger = BookingPassenger::query()
            ->with('booking')
            ->where('qr_token', $qrToken)
            ->first();

        if (! $passenger) {
            throw new HttpException(404, 'QR code tidak valid atau penumpang tidak ditemukan');
        }

        if (blank($passenger->qr_code_value)) {
            throw new HttpException(422, 'Tiket penumpang ini belum memiliki QR code aktif');
        }

        $booking       = $passenger->booking;
        $loyaltyTarget = 5;

        // Cek apakah tiket penumpang ini sudah pernah di-scan (1 tiket = 1x loyalty)
        $alreadyScanned = $passenger->last_scanned_at !== null;

        if ($alreadyScanned) {
            return response()->json([
                'success'             => true,
                'already_scanned'     => true,
                'message'             => 'Tiket ini sudah pernah di-scan. Loyalty tidak ditambahkan.',
                'scan_count'          => (int) $passenger->scan_count,
                'loyalty_count'       => (int) $passenger->scan_count,
                'loyalty_target'      => $loyaltyTarget,
                'discount_eligible'   => (bool) $passenger->discount_eligible,
                'discount_percentage' => 50,
                'is_newly_eligible'   => false,
                'passenger'           => $this->passengerPayload($passenger, $booking),
                'booking'             => $this->bookingPayload($booking),
            ]);
        }

        // Scan valid: hitung sebagai perjalanan baru untuk penumpang ini
        $previousScanCount  = (int) ($passenger->scan_count ?? 0);
        $newScanCount       = $previousScanCount + 1;
        $justCompletedCycle = $newScanCount >= $loyaltyTarget;

        if ($justCompletedCycle) {
            // Siklus selesai: beri diskon, reset untuk siklus berikutnya
            DB::table('booking_passengers')->where('id', $passenger->id)->update([
                'scan_count'        => 0,
                'loyalty_count'     => 0,
                'loyalty_trip_count' => DB::raw('COALESCE(loyalty_trip_count, 0) + 1'),
                'discount_eligible' => true,
                'eligible_discount' => true,
                'last_scanned_at'   => now(),
            ]);

            $loyaltyCountDisplay = $loyaltyTarget;
            $discountEligible    = true;
        } else {
            DB::table('booking_passengers')->where('id', $passenger->id)->update([
                'scan_count'        => $newScanCount,
                'loyalty_count'     => $newScanCount,
                'discount_eligible' => false,
                'eligible_discount' => false,
                'last_scanned_at'   => now(),
            ]);

            $loyaltyCountDisplay = $newScanCount;
            $discountEligible    = false;
        }

        $passenger->refresh();

        // Perbarui lifetime_scan_count + total_trip_count customer jika ada
        $this->applyCustomerLoyalty($passenger);

        return response()->json([
            'success'             => true,
            'already_scanned'     => false,
            'message'             => $justCompletedCycle
                ? 'Selamat! Penumpang kini eligible diskon 50%'
                : 'QR berhasil di-scan',
            'scan_count'          => (int) $passenger->scan_count,
            'loyalty_count'       => $loyaltyCountDisplay,
            'loyalty_target'      => $loyaltyTarget,
            'discount_eligible'   => $discountEligible,
            'discount_percentage' => 50,
            'is_newly_eligible'   => $justCompletedCycle,
            'passenger'           => $this->passengerPayload($passenger, $booking),
            'booking'             => $this->bookingPayload($booking),
        ]);
    }

    /**
     * Perbarui customer loyalty setelah scan berhasil.
     * - Tambah lifetime_scan_count
     * - Hitung ulang total_trip_count (booking-based, bukan scan-based)
     *
     * Error diabaikan dengan silent log — scan tidak boleh gagal karena ini.
     */
    private function applyCustomerLoyalty(BookingPassenger $passenger): void
    {
        if (! $passenger->customer_id) {
            return;
        }

        try {
            $customer = Customer::query()->find($passenger->customer_id);

            if ($customer instanceof Customer) {
                $this->loyaltyService->applyScanToCustomer($customer);
                $this->loyaltyService->recalculateForCustomer($customer);
            }
        } catch (\Throwable $e) {
            report($e);
        }
    }

    private function passengerPayload(BookingPassenger $passenger, $booking): array
    {
        return [
            'id'        => $passenger->id,
            'name'      => (string) $passenger->name,
            'phone'     => (string) ($passenger->phone ?? ''),
            'seat_no'   => (string) ($passenger->seat_no ?? ''),
        ];
    }

    private function bookingPayload($booking): array
    {
        if (! $booking) {
            return [];
        }

        return [
            'id'              => $booking->id,
            'booking_code'    => $booking->booking_code,
            'nama_pemesanan'  => $booking->passenger_name,
            'phone'           => $booking->passenger_phone,
            'from_city'       => $booking->from_city,
            'to_city'         => $booking->to_city,
            'trip_date'       => $booking->trip_date?->translatedFormat('d F Y') ?? '-',
            'trip_time'       => substr((string) ($booking->trip_time ?? ''), 0, 5),
            'route_label'     => $booking->route_label
                ?? ($booking->from_city . ' – ' . $booking->to_city),
            'passenger_count' => (int) ($booking->passenger_count ?? 0),
            'selected_seats'  => implode(', ', (array) ($booking->selected_seats ?? [])),
            'category'        => $booking->category ?? '-',
        ];
    }
}
