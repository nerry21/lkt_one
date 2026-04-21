<?php

namespace App\Services;

use App\Exceptions\TripGenerationDriverMissingException;
use App\Exceptions\TripSlotConflictException;
use App\Models\Mobil;
use App\Models\Trip;
use Illuminate\Support\Facades\DB;

/**
 * Generate jadwal trip harian (R1, R4) — design doc §5.3.
 *
 * Generate trip rows untuk 2 arah (PKB_TO_ROHUL + ROHUL_TO_PKB) pada
 * tanggal X. Trip default status='scheduled', siap untuk admin mark
 * berangkat/tidak_berangkat di hari H.
 *
 * Atomic semantics: kalau 1 arah fail (e.g. idempotency clash), rollback
 * semua via DB::transaction.
 *
 * Driver assignment (DP-A v): caller WAJIB pass mapping mobil_id => driver_id
 * untuk SEMUA mobil aktif. Mobil aktif tanpa driver di mapping →
 * throw TripGenerationDriverMissingException (DP-B a strict forward).
 * Mobil tidak aktif di mapping → silently ignored (DP-B q lenient reverse).
 *
 * Dipanggil dari:
 *   - ProcessTripCutoverJob (otomatis jam 21:00, generate H+1) — Fase D
 *   - Admin UI manual trigger ("Generate ulang jadwal") — Fase E
 */
class TripGenerationService
{
    /**
     * Slot jam keberangkatan untuk trip (HH:MM:SS format match trips.trip_time TIME column).
     *
     * Source of truth: independent dari Keberangkatan::JAM_KEBERANGKATAN_OPTIONS.
     * Di-coupled via test invariant (lihat test
     * `test_slots_constant_matches_keberangkatan_options_with_seconds_suffix`).
     *
     * Reasoning DP-C β: trip planning dan keberangkatan booking adalah domain
     * berbeda yang KEBETULAN sama sekarang. Loose coupling lebih maintainable
     * kalau diverge.
     */
    public const SLOTS = ['05:30:00', '07:00:00', '09:00:00', '13:00:00', '16:00:00', '19:00:00'];

    private const DIRECTIONS = ['PKB_TO_ROHUL', 'ROHUL_TO_PKB'];

    public function __construct(
        private readonly PoolStateService $poolState,
    ) {}

    /**
     * Generate jadwal 2 arah untuk tanggal $tripDate. Atomic via DB::transaction.
     *
     * @param  string                  $tripDate            Format 'Y-m-d'.
     * @param  array<string, string>   $driverAssignments   Map mobil_id (UUID string) => driver_id (UUID string).
     *                                                      Harus lengkap untuk semua mobil aktif (DP-A v).
     * @return array<int, array{direction: string, slots_filled: int, waiting_list_count: int, trip_ids: array<int, int>}>
     *
     * @throws TripGenerationDriverMissingException  Kalau mapping incomplete untuk mobil aktif.
     * @throws TripSlotConflictException             Kalau trip sudah ada di tanggal+arah (idempotency).
     */
    public function generateForDate(string $tripDate, array $driverAssignments): array
    {
        // Pre-flight: verify completeness of driver mapping for active mobil.
        // Dilakukan DI LUAR transaction supaya rejection tidak nyisain empty
        // transaction (throw + rollback semantically identical, tapi lebih bersih
        // kalau validation failure tidak menyentuh DB sama sekali).
        $activeMobilIds = Mobil::query()
            ->where('is_active_in_trip', true)
            ->pluck('id')
            ->all();

        $missing = array_values(array_diff($activeMobilIds, array_keys($driverAssignments)));
        if ($missing !== []) {
            throw new TripGenerationDriverMissingException($missing);
        }

        return DB::transaction(function () use ($tripDate, $driverAssignments) {
            $results = [];
            foreach (self::DIRECTIONS as $direction) {
                $results[] = $this->generateForDirection($tripDate, $direction, $driverAssignments);
            }

            return $results;
        });
    }

    /**
     * Generate untuk 1 arah saja. Public untuk Fase D admin "regenerate 1 arah" feature.
     *
     * NOT wrapped in DB::transaction (caller responsibility). Kalau dipanggil
     * standalone dari luar generateForDate, caller should wrap if atomic needed.
     *
     * @param  array<string, string>  $driverAssignments
     * @return array{direction: string, slots_filled: int, waiting_list_count: int, trip_ids: array<int, int>}
     *
     * @throws TripSlotConflictException
     */
    public function generateForDirection(string $tripDate, string $direction, array $driverAssignments): array
    {
        // Idempotency guard: tolak kalau sudah ada trip apa pun di (tanggal, arah).
        // conflictType 'slot' adalah closest existing discriminator (lihat
        // TripSlotConflictException) — semantic: semua slot di arah ini sudah
        // terisi oleh generation sebelumnya.
        $exists = Trip::query()
            ->where('trip_date', $tripDate)
            ->where('direction', $direction)
            ->exists();

        if ($exists) {
            throw new TripSlotConflictException(
                tripDate: $tripDate,
                tripTime: '00:00:00',
                direction: $direction,
                conflictType: 'slot',
                message: "Trip sudah ter-generate untuk tanggal {$tripDate} arah {$direction}",
            );
        }

        $poolOrigin = $this->poolOriginFor($direction);
        $mobils = $this->poolState->prioritizedMobilList($poolOrigin, $tripDate);

        $slotsFilled = 0;
        $waitingListCount = 0;
        $tripIds = [];
        $sequence = 0;

        foreach ($mobils->values() as $mobil) {
            // Defensive: skip mobil tanpa driver di mapping (DP-B q lenient reverse).
            // Pre-flight di generateForDate sudah catch missing forward case.
            // Kalau generateForDirection dipanggil standalone tanpa pre-flight,
            // mobil aktif tanpa driver ter-skip (silent). Nerry acknowledge sebagai
            // acceptable tradeoff untuk Fase D admin "regenerate 1 arah" yang
            // boleh partial generate.
            if (! isset($driverAssignments[$mobil->id])) {
                continue;
            }

            $tripTime = $sequence < count(self::SLOTS) ? self::SLOTS[$sequence] : null;
            if ($tripTime !== null) {
                $slotsFilled++;
            } else {
                $waitingListCount++;
            }

            $sequence++;

            $trip = Trip::create([
                'trip_date'  => $tripDate,
                'trip_time'  => $tripTime,
                'direction'  => $direction,
                'sequence'   => $sequence,
                'mobil_id'   => $mobil->id,
                'driver_id'  => $driverAssignments[$mobil->id],
                'status'     => 'scheduled',
            ]);

            $tripIds[] = $trip->id;
        }

        return [
            'direction'          => $direction,
            'slots_filled'       => $slotsFilled,
            'waiting_list_count' => $waitingListCount,
            'trip_ids'           => $tripIds,
        ];
    }

    /**
     * Map direction → pool origin city.
     */
    private function poolOriginFor(string $direction): string
    {
        return match ($direction) {
            'PKB_TO_ROHUL' => 'PKB',
            'ROHUL_TO_PKB' => 'ROHUL',
        };
    }
}
