<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\HttpException;

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
            ->whereNotNull('bp.qr_token')
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
                // Jumlah perjalanan valid berdasarkan customer_id (jika tersedia),
                // fallback ke nama+HP untuk data lama yang belum di-backfill.
                DB::raw('(
                    CASE
                      WHEN bp.customer_id IS NOT NULL THEN (
                        SELECT COUNT(*) FROM bookings b2
                        WHERE b2.customer_id = bp.customer_id
                          AND b2.booking_status NOT IN (\'Draft\',\'Batal\',\'Cancelled\')
                      )
                      ELSE (
                        SELECT COUNT(*) FROM booking_passengers bp2
                        WHERE UPPER(TRIM(bp2.name)) = UPPER(TRIM(bp.name))
                          AND TRIM(COALESCE(bp2.phone,\'\')) = TRIM(COALESCE(bp.phone,\'\'))
                          AND bp2.qr_token IS NOT NULL
                      )
                    END
                ) as booking_count'),
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
                'id'            => $row->id,
                'passenger_name'=> $row->passenger_name,
                'phone'         => $row->phone ?? '',
                'seat_no'       => $row->seat_no ?? '-',
                'from_city'     => $row->from_city ?? '-',
                'to_city'       => $row->to_city ?? '-',
                'trip_date'     => $row->trip_date
                    ? \Carbon\Carbon::parse($row->trip_date)->locale('id')->translatedFormat('d M Y')
                    : '-',
                'trip_time'     => $row->trip_time
                    ? substr((string) $row->trip_time, 0, 5)
                    : '-',
                'tarif'         => 'Rp ' . number_format($tarif, 0, ',', '.'),
                'booking_code'  => $row->booking_code,
                'booking_count' => (int) ($row->booking_count ?? 1),
            ];
        });

        return response()->json($data);
    }

    public function count(Request $request): JsonResponse
    {
        $search = trim((string) $request->input('search', ''));

        $query = DB::table('booking_passengers as bp')
            ->join('bookings as b', 'b.id', '=', 'bp.booking_id')
            ->whereNotNull('bp.qr_token');

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

    public function show(int $id): JsonResponse
    {
        $row = DB::table('booking_passengers')->where('id', $id)->first(['id', 'name', 'phone', 'seat_no']);

        if (! $row) {
            throw new HttpException(404, 'Data penumpang tidak ditemukan');
        }

        return response()->json([
            'id'    => $row->id,
            'name'  => $row->name,
            'phone' => $row->phone ?? '',
        ]);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $row = DB::table('booking_passengers')->where('id', $id)->first(['id', 'qr_token']);

        if (! $row) {
            throw new HttpException(404, 'Data penumpang tidak ditemukan');
        }

        $name  = trim((string) $request->input('name', ''));
        $phone = trim((string) $request->input('phone', ''));

        if ($name === '') {
            throw new HttpException(422, 'Nama penumpang tidak boleh kosong');
        }

        DB::table('booking_passengers')->where('id', $id)->update([
            'name'  => $name,
            'phone' => $phone,
        ]);

        return response()->json(['success' => true, 'message' => 'Data penumpang berhasil diperbarui']);
    }

    public function destroy(int $id): JsonResponse
    {
        $row = DB::table('booking_passengers')->where('id', $id)->first(['id']);

        if (! $row) {
            throw new HttpException(404, 'Data penumpang tidak ditemukan');
        }

        DB::table('booking_passengers')->where('id', $id)->delete();

        return response()->json(['success' => true, 'message' => 'Data penumpang berhasil dihapus']);
    }

    public function loyaltyChart(Request $request): JsonResponse
    {
        $limit = max(5, min(50, (int) $request->input('limit', 10)));

        // ── Pelanggan dengan customer_id (data modern) ──────────────────────
        // Group by customer_id → hitung booking valid dari tabel bookings
        $withCustomer = DB::table('customers as c')
            ->select([
                'c.id as customer_id',
                'c.display_name as passenger_name',
                'c.phone_normalized as phone',
                DB::raw('(
                    SELECT COUNT(*) FROM bookings b2
                    WHERE b2.customer_id = c.id
                      AND b2.booking_status NOT IN (\'Draft\',\'Batal\',\'Cancelled\')
                ) as booking_count'),
            ])
            ->where('c.status', 'active')
            ->whereNull('c.merged_into_id')
            ->whereNull('c.deleted_at')
            ->having('booking_count', '>', 0)
            ->orderByDesc('booking_count')
            ->orderBy('c.display_name')
            ->limit($limit)
            ->get();

        if ($withCustomer->count() >= $limit) {
            // Cukup data dari tabel customers — gunakan langsung
            return response()->json($withCustomer->map(fn ($r) => [
                'passenger_name' => $r->passenger_name,
                'phone'          => $r->phone ?? '-',
                'booking_count'  => (int) $r->booking_count,
            ])->values());
        }

        // ── Fallback: data lama tanpa customer_id (legacy) ─────────────────
        // Masih pakai name-based grouping untuk booking_passengers
        // yang belum di-backfill. Digabung dengan hasil customer di atas.
        $legacy = DB::table('booking_passengers as bp')
            ->join('bookings as b', 'b.id', '=', 'bp.booking_id')
            ->select([
                DB::raw('UPPER(TRIM(bp.name)) as passenger_name'),
                DB::raw('TRIM(bp.phone) as phone'),
                DB::raw('COUNT(*) as booking_count'),
            ])
            ->whereNull('bp.customer_id')
            ->whereNotNull('bp.qr_token')
            ->whereNotNull('bp.name')
            ->where('bp.name', '!=', '')
            ->groupBy(DB::raw('UPPER(TRIM(bp.name))'), DB::raw('TRIM(bp.phone)'))
            ->orderByDesc('booking_count')
            ->limit($limit)
            ->get();

        // Merge: customer-based rows dulu, lalu legacy — buang duplikat nama
        $merged = $withCustomer->map(fn ($r) => [
            'passenger_name' => $r->passenger_name,
            'phone'          => $r->phone ?? '-',
            'booking_count'  => (int) $r->booking_count,
        ])->concat($legacy->map(fn ($r) => [
            'passenger_name' => $r->passenger_name,
            'phone'          => $r->phone ?? '-',
            'booking_count'  => (int) $r->booking_count,
        ]))->sortByDesc('booking_count')->unique('passenger_name')->values()->take($limit);

        return response()->json($merged);
    }
}
