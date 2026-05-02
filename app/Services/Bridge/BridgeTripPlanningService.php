<?php

declare(strict_types=1);

namespace App\Services\Bridge;

use App\Models\DailyAssignmentPin;
use App\Models\DailyDriverAssignment;
use App\Models\Driver;
use App\Models\Mobil;
use App\Models\Trip;
use App\Models\TripCutoverLog;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

/**
 * Sesi 74 PR-CRM-6K1 — Bridge Trip Planning service.
 *
 * Handle setup trip planning H-1 dari Chatbot:
 *   1. Upsert DailyDriverAssignment per mobil (mobil_id, driver_id, date)
 *   2. Optional: create DailyAssignmentPin kalau Bu Bos override pool start
 *   3. Skip mobil yang ditandai is_skipped=true
 *
 * Existing scheduler `trips:cutover` jam 21:00 WIB AUTO-JALAN setelah ini
 * untuk generate Trip rows pakai DailyDriverAssignment yang sudah di-set.
 */
class BridgeTripPlanningService
{
    /**
     * @param  array<int, array{
     *     mobil_id: string,
     *     driver_id?: string|null,
     *     pool_override?: 'PKB'|'ROHUL'|null,
     *     is_skipped?: bool
     * }>  $assignments
     *
     * @return array{
     *     date: string,
     *     assignments_count: int,
     *     skipped_count: int,
     *     pins_count: int,
     *     active_mobil_count: int
     * }
     */
    public function setup(string $targetDate, array $assignments, string $userId): array
    {
        try {
            $date = Carbon::parse($targetDate)->toDateString();
        } catch (\Throwable) {
            throw new InvalidArgumentException("Invalid target_date: {$targetDate}");
        }

        $activeMobilCount = Mobil::query()->where('is_active_in_trip', true)->count();

        return DB::transaction(function () use ($date, $assignments, $userId, $activeMobilCount): array {
            $assignmentsCount = 0;
            $skippedCount = 0;
            $pinsCount = 0;

            foreach ($assignments as $a) {
                $mobilId = (string) $a['mobil_id'];
                $isSkipped = (bool) ($a['is_skipped'] ?? false);

                if ($isSkipped) {
                    DailyDriverAssignment::query()
                        ->where('date', $date)
                        ->where('mobil_id', $mobilId)
                        ->delete();
                    $skippedCount++;
                    continue;
                }

                $driverId = $a['driver_id'] ?? null;
                if (! $driverId) {
                    throw new InvalidArgumentException(
                        "Mobil {$mobilId}: driver_id required when not skipped",
                    );
                }

                $assignment = DailyDriverAssignment::query()->updateOrCreate(
                    ['date' => $date, 'mobil_id' => $mobilId],
                    [
                        'driver_id' => $driverId,
                        'created_by' => $userId,
                        'updated_by' => $userId,
                    ],
                );
                $assignmentsCount++;

                $poolOverride = $a['pool_override'] ?? null;
                if ($poolOverride !== null && in_array($poolOverride, ['PKB', 'ROHUL'], true)) {
                    $direction = $poolOverride === 'ROHUL' ? 'ROHUL_TO_PKB' : 'PKB_TO_ROHUL';

                    DailyAssignmentPin::query()->updateOrCreate(
                        [
                            'daily_driver_assignment_id' => $assignment->id,
                            'direction' => $direction,
                            'trip_time' => '05:30:00',
                        ],
                        [
                            'loket_origin' => $poolOverride,
                            'created_by' => $userId,
                            'updated_by' => $userId,
                        ],
                    );
                    $pinsCount++;
                }
            }

            return [
                'date' => $date,
                'assignments_count' => $assignmentsCount,
                'skipped_count' => $skippedCount,
                'pins_count' => $pinsCount,
                'active_mobil_count' => $activeMobilCount,
            ];
        });
    }

    /**
     * @return array{
     *     date: string,
     *     assignments_count: int,
     *     trips_count: int,
     *     cutover_status: string|null,
     *     cutover_finished_at: string|null,
     *     trips: array<int, array<string, mixed>>
     * }
     */
    public function status(string $targetDate): array
    {
        try {
            $date = Carbon::parse($targetDate)->toDateString();
        } catch (\Throwable) {
            throw new InvalidArgumentException("Invalid target_date: {$targetDate}");
        }

        $assignmentsCount = DailyDriverAssignment::query()->where('date', $date)->count();

        $trips = Trip::query()
            ->where('trip_date', $date)
            ->with(['mobil', 'driver'])
            ->orderBy('direction')
            ->orderBy('sequence')
            ->get();

        $cutoverLog = TripCutoverLog::query()
            ->where('target_date', $date)
            ->orderByDesc('id')
            ->first();

        return [
            'date' => $date,
            'assignments_count' => $assignmentsCount,
            'trips_count' => $trips->count(),
            'cutover_status' => $cutoverLog?->status,
            'cutover_finished_at' => optional($cutoverLog?->finished_at)->toIso8601String(),
            'trips' => $trips->map(function (Trip $t) {
                return [
                    'id' => $t->id,
                    'trip_date' => optional($t->trip_date)->toDateString(),
                    'trip_time' => $t->trip_time,
                    'direction' => $t->direction,
                    'direction_label' => $t->direction === 'ROHUL_TO_PKB' ? 'Keberangkatan' : 'Kepulangan',
                    'sequence' => $t->sequence,
                    'status' => $t->status,
                    'mobil_kode' => optional($t->mobil)->kode_mobil,
                    'driver_name' => optional($t->driver)->nama,
                ];
            })->all(),
        ];
    }

    /**
     * @return array{
     *     mobil: array<int, array{id: string, kode_mobil: string, home_pool: string|null}>,
     *     driver: array<int, array{id: string, nama: string, lokasi: string|null}>
     * }
     */
    public function getActiveMobilAndDriverList(): array
    {
        $mobil = Mobil::query()
            ->where('is_active_in_trip', true)
            ->orderBy('kode_mobil')
            ->get(['id', 'kode_mobil', 'home_pool'])
            ->map(fn (Mobil $m) => [
                'id' => (string) $m->id,
                'kode_mobil' => $m->kode_mobil,
                'home_pool' => $m->home_pool,
            ])
            ->all();

        $driver = Driver::query()
            ->where('status', 'Active')
            ->orderBy('nama')
            ->get(['id', 'nama', 'lokasi'])
            ->map(fn (Driver $d) => [
                'id' => (string) $d->id,
                'nama' => $d->nama,
                'lokasi' => $d->lokasi,
            ])
            ->all();

        return [
            'mobil' => $mobil,
            'driver' => $driver,
        ];
    }
}
