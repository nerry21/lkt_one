<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
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

        $previousScanCount = (int) ($booking->scan_count ?? 0);
        $booking->scan_count = $previousScanCount + 1;
        $booking->save();

        $loyaltyCount   = (int) $booking->loyalty_count;
        $loyaltyTarget  = 5;
        $discountEligible = (bool) $booking->discount_eligible;

        $isNewlyEligible = ! (bool) ($previousScanCount >= $loyaltyTarget)
            && $discountEligible;

        return response()->json([
            'success'           => true,
            'message'           => $isNewlyEligible
                ? 'Selamat! Penumpang kini eligible diskon 50%'
                : 'QR berhasil di-scan',
            'scan_count'        => $booking->scan_count,
            'loyalty_count'     => $loyaltyCount,
            'loyalty_target'    => $loyaltyTarget,
            'discount_eligible' => $discountEligible,
            'is_newly_eligible' => $isNewlyEligible,
            'booking'           => [
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
