<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\HttpException;

class QrScanController extends Controller
{
    public function scan(Request $request): JsonResponse
    {
        $qrToken = trim((string) $request->input('qr_token', ''));

        if ($qrToken === '') {
            throw new HttpException(422, 'QR token tidak boleh kosong');
        }

        $booking = Booking::query()->where('qr_token', $qrToken)->first();

        if (! $booking) {
            throw new HttpException(404, 'QR code tidak valid atau pemesanan tidak ditemukan');
        }

        if (blank($booking->qr_code_value)) {
            throw new HttpException(422, 'Pemesanan ini belum memiliki QR code aktif');
        }

        $loyaltyTarget     = 5;
        $previousScanCount = (int) ($booking->scan_count ?? 0);
        $newScanCount      = $previousScanCount + 1;
        $justCompletedCycle = $newScanCount >= $loyaltyTarget;

        if ($justCompletedCycle) {
            // Siklus selesai: beri diskon, reset untuk siklus berikutnya
            // Gunakan DB::table() agar tidak di-override oleh saving hook model
            DB::table('bookings')->where('id', $booking->id)->update([
                'scan_count'         => 0,
                'loyalty_count'      => 0,
                'loyalty_trip_count' => DB::raw('COALESCE(loyalty_trip_count, 0) + 1'),
                'discount_eligible'  => true,
                'eligible_discount'  => true,
            ]);

            $loyaltyCountDisplay = $loyaltyTarget; // tampilkan 5/5 di layar saat ini
            $discountEligible    = true;
        } else {
            // Scan normal: increment, reset eligible ke false (belum 5)
            DB::table('bookings')->where('id', $booking->id)->update([
                'scan_count'        => $newScanCount,
                'loyalty_count'     => $newScanCount,
                'discount_eligible' => false,
                'eligible_discount' => false,
            ]);

            $loyaltyCountDisplay = $newScanCount;
            $discountEligible    = false;
        }

        $booking->refresh();

        $isNewlyEligible = $justCompletedCycle;

        return response()->json([
            'success'             => true,
            'message'             => $isNewlyEligible
                ? 'Selamat! Penumpang kini eligible diskon 50%'
                : 'QR berhasil di-scan',
            'scan_count'          => (int) $booking->scan_count,
            'loyalty_count'       => $loyaltyCountDisplay,
            'loyalty_target'      => $loyaltyTarget,
            'discount_eligible'   => $discountEligible,
            'discount_percentage' => 50,
            'is_newly_eligible'   => $isNewlyEligible,
            'booking'             => [
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
            ],
        ]);
    }
}
