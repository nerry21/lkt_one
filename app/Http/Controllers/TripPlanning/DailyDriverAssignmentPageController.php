<?php

namespace App\Http\Controllers\TripPlanning;

use App\Http\Controllers\Controller;
use App\Http\Requests\TripPlanning\UpsertDriverAssignmentRequest;
use App\Models\DailyAssignmentPin;
use App\Models\DailyDriverAssignment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * CRUD admin daily driver-to-mobil assignment sebelum scheduler cutover 21:00.
 *
 * Endpoints:
 *   GET  /dashboard/trip-planning/assignments?date=YYYY-MM-DD
 *   PUT  /dashboard/trip-planning/assignments               (body: {date, assignments[]})
 *
 * Middleware: jwt.auth + admin.role:admin (Admin OR Super Admin).
 */
class DailyDriverAssignmentPageController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'date' => ['required', 'date'],
        ]);

        $assignments = DailyDriverAssignment::query()
            ->where('date', $validated['date'])
            ->with([
                'mobil:id,kode_mobil,home_pool',
                'driver:id,nama',
                'pins:id,daily_driver_assignment_id,direction,trip_time',
            ])
            ->get();

        return response()->json([
            'date' => $validated['date'],
            'assignments' => $assignments,
        ]);
    }

    /**
     * Bulk upsert assignment per (date, mobil_id) — last write wins.
     *
     * Pakai cek-eksis-eksplisit (bukan updateOrCreate) supaya `created_by` hanya
     * di-set saat insert dan tidak ke-overwrite saat update. updateOrCreate tidak
     * membedakan insert vs update di second-arg values, jadi pendekatan ini lebih
     * eksplisit & mudah dibaca.
     *
     * Pin strategy (Phase E4): delete-and-recreate per assignment per submit.
     * Atomic via DB::transaction yang sudah wrap upsert. Audit pin tetap di
     * parent assignment (created_by/updated_by).
     */
    public function upsert(UpsertDriverAssignmentRequest $request): JsonResponse
    {
        $userId = $request->user()->id;
        $date = $request->input('date');
        $payload = $request->input('assignments');

        DB::transaction(function () use ($date, $payload, $userId) {
            foreach ($payload as $row) {
                $existing = DailyDriverAssignment::query()
                    ->where('date', $date)
                    ->where('mobil_id', $row['mobil_id'])
                    ->first();

                if ($existing) {
                    $existing->update([
                        'driver_id' => $row['driver_id'],
                        'updated_by' => $userId,
                    ]);
                    $assignmentRecord = $existing;
                } else {
                    $assignmentRecord = DailyDriverAssignment::create([
                        'date' => $date,
                        'mobil_id' => $row['mobil_id'],
                        'driver_id' => $row['driver_id'],
                        'created_by' => $userId,
                        'updated_by' => $userId,
                    ]);
                }

                DailyAssignmentPin::where('daily_driver_assignment_id', $assignmentRecord->id)->delete();

                foreach ($row['pins'] ?? [] as $pin) {
                    $tripTime = $pin['trip_time'];
                    if (preg_match('/^\d{2}:\d{2}$/', $tripTime)) {
                        $tripTime .= ':00';
                    }

                    DailyAssignmentPin::create([
                        'daily_driver_assignment_id' => $assignmentRecord->id,
                        'direction' => $pin['direction'],
                        'trip_time' => $tripTime,
                        'created_by' => $userId,
                        'updated_by' => $userId,
                    ]);
                }
            }
        });

        $saved = DailyDriverAssignment::query()
            ->where('date', $date)
            ->with([
                'mobil:id,kode_mobil,home_pool',
                'driver:id,nama',
                'pins:id,daily_driver_assignment_id,direction,trip_time',
            ])
            ->get();

        return response()->json([
            'date' => $date,
            'assignments' => $saved,
            'count' => $saved->count(),
        ]);
    }
}
