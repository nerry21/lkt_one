<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PassengerLktController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $search = trim((string) $request->input('search', ''));
        $page   = max(1, (int) $request->input('page', 1));
        $limit  = max(1, min(100, (int) $request->input('limit', 15)));
        $offset = ($page - 1) * $limit;

        $query = DB::table('booking_passengers as bp')
            ->join('bookings as b', 'b.id', '=', 'bp.booking_id')
            ->whereNotNull('bp.qr_token')   // hanya yang e-tiket/barcode-nya sudah terbentuk
            ->select([
                'bp.id',
                'bp.name as passenger_name',
                'bp.phone',
                'bp.seat_no',
                'b.from_city',
                'b.to_city',
                'b.trip_date',
                'b.trip_time',
                'b.total_amount',
                'b.passenger_count',
                'b.booking_code',
                'b.created_at',
            ])
            ->orderBy('b.trip_date', 'desc')
            ->orderBy('b.created_at', 'desc');

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('bp.name', 'like', '%' . $search . '%')
                  ->orWhere('bp.phone', 'like', '%' . $search . '%')
                  ->orWhere('b.from_city', 'like', '%' . $search . '%')
                  ->orWhere('b.to_city', 'like', '%' . $search . '%')
                  ->orWhere('b.booking_code', 'like', '%' . $search . '%');
            });
        }

        $rows = (clone $query)->offset($offset)->limit($limit)->get();

        $data = $rows->map(function ($row) {
            $passengerCount = max(1, (int) ($row->passenger_count ?? 1));
            $tarif = round((float) ($row->total_amount ?? 0) / $passengerCount);

            return [
                'id'             => $row->id,
                'passenger_name' => $row->passenger_name,
                'phone'          => $row->phone ?? '-',
                'seat_no'        => $row->seat_no ?? '-',
                'from_city'      => $row->from_city ?? '-',
                'to_city'        => $row->to_city ?? '-',
                'trip_date'      => $row->trip_date
                    ? \Carbon\Carbon::parse($row->trip_date)->locale('id')->translatedFormat('d M Y')
                    : '-',
                'trip_time'      => $row->trip_time
                    ? substr((string) $row->trip_time, 0, 5)
                    : '-',
                'tarif'          => 'Rp ' . number_format($tarif, 0, ',', '.'),
                'booking_code'   => $row->booking_code,
            ];
        });

        return response()->json($data);
    }

    public function count(Request $request): JsonResponse
    {
        $search = trim((string) $request->input('search', ''));

        $query = DB::table('booking_passengers as bp')
            ->join('bookings as b', 'b.id', '=', 'bp.booking_id')
            ->whereNotNull('bp.qr_token');  // hanya yang e-tiket/barcode-nya sudah terbentuk

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('bp.name', 'like', '%' . $search . '%')
                  ->orWhere('bp.phone', 'like', '%' . $search . '%')
                  ->orWhere('b.from_city', 'like', '%' . $search . '%')
                  ->orWhere('b.to_city', 'like', '%' . $search . '%')
                  ->orWhere('b.booking_code', 'like', '%' . $search . '%');
            });
        }

        return response()->json(['count' => $query->count()]);
    }

    public function loyaltyChart(Request $request): JsonResponse
    {
        $limit = max(5, min(50, (int) $request->input('limit', 15)));

        $rows = DB::table('booking_passengers as bp')
            ->join('bookings as b', 'b.id', '=', 'bp.booking_id')
            ->select([
                DB::raw('UPPER(TRIM(bp.name)) as passenger_name'),
                DB::raw('TRIM(bp.phone) as phone'),
                DB::raw('COUNT(*) as booking_count'),
            ])
            ->whereNotNull('bp.qr_token')   // hanya yang e-tiket/barcode-nya sudah terbentuk
            ->whereNotNull('bp.name')
            ->where('bp.name', '!=', '')
            ->groupBy(DB::raw('UPPER(TRIM(bp.name))'), DB::raw('TRIM(bp.phone)'))
            ->orderByDesc('booking_count')
            ->orderBy(DB::raw('UPPER(TRIM(bp.name))'))
            ->limit($limit)
            ->get();

        return response()->json($rows->map(fn ($r) => [
            'passenger_name' => $r->passenger_name,
            'phone'          => $r->phone ?? '-',
            'booking_count'  => (int) $r->booking_count,
        ])->values());
    }
}
