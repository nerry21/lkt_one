<?php

namespace App\Http\Controllers\TripPlanning;

use App\Http\Controllers\Controller;
use App\Models\DailyDriverAssignment;
use App\Models\Driver;
use App\Models\Mobil;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\View\View;

/**
 * Render Blade view untuk page /dashboard/trip-planning/assignments (Fase E4).
 *
 * Hydrate initial state (assignments + mobil aktif + all drivers) ke inline
 * JSON script tag supaya JS module tidak perlu XHR tambahan saat page load.
 *
 * Default target date = besok (scheduler cutover 21:00 WIB = generate H+1).
 * Admin bisa override via query ?date=YYYY-MM-DD asal tanggal >= hari ini.
 */
class AssignmentsDashboardViewController extends Controller
{
    public function show(Request $request): View
    {
        $targetDate = $this->resolveTargetDate($request->query('date'));

        $mobils = Mobil::query()
            ->where('is_active_in_trip', true)
            ->orderBy('home_pool')
            ->orderBy('kode_mobil')
            ->get(['id', 'kode_mobil', 'home_pool']);

        $drivers = Driver::query()
            ->orderBy('nama')
            ->get(['id', 'nama']);

        $assignments = DailyDriverAssignment::query()
            ->where('date', $targetDate->toDateString())
            ->with([
                'mobil:id,kode_mobil,home_pool',
                'driver:id,nama',
                'pins:id,daily_driver_assignment_id,direction,trip_time',
            ])
            ->get();

        $state = [
            'date' => $targetDate->toDateString(),
            'mobils' => $mobils,
            'drivers' => $drivers,
            'assignments' => $assignments,
        ];

        return view('trip-planning.assignments', [
            'pageTitle' => 'Atur Assignments | JET (JAYA EXCECUTIVE TRANSPORT)',
            'pageScript' => 'trip-planning/assignments',
            'guardMode' => 'protected',
            'pageHeading' => 'Trip Planning',
            'pageDescription' => 'Atur pairing mobil dan driver untuk trip harian',
            'targetDate' => $targetDate,
            'state' => $state,
        ]);
    }

    private function resolveTargetDate(?string $input): Carbon
    {
        if ($input) {
            try {
                $parsed = Carbon::parse($input)->startOfDay();
                if ($parsed->gte(Carbon::today())) {
                    return $parsed;
                }
            } catch (\Throwable) {
                // fall through to default
            }
        }

        return Carbon::tomorrow();
    }
}
