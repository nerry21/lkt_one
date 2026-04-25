<?php

namespace App\Services;

use App\Exceptions\TripGenerationDriverMissingException;
use App\Exceptions\TripSlotConflictException;
use App\Models\DailyAssignmentPin;
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
     * Source of truth: const SLOTS array (independent legacy schedule).
     */
    public const SLOTS = ['05:30:00', '07:00:00', '09:00:00', '13:00:00', '16:00:00', '19:00:00'];

    private const DIRECTIONS = ['PKB_TO_ROHUL', 'ROHUL_TO_PKB'];

    public function __construct(
        private readonly PoolStateService $poolState,
        private readonly KeuanganJetSyncService $keuanganJetSync,
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
     * Algoritma 2-pass (Phase E4 DP-7):
     *   Pass 1 — pinned trips dari daily_assignment_pins di (date, direction),
     *            pakai trip_time eksplisit dari pin. Sequence start dari 1,
     *            order by trip_time ASC. Multi-mobil di slot pinned yang sama
     *            diizinkan (DP-2: penumpang ramai). Pin di-skip kalau mobil
     *            inactive, salah pool, atau driver mapping miss.
     *   Pass 2 — auto-fill mobil sisa (yang tidak pinned) pakai
     *            prioritizedMobilList. Slot diambil dari SLOTS minus slot yang
     *            sudah dipakai pinned (kalau pinned slot nyangkut di SLOTS).
     *            Pin custom yang bukan member SLOTS tidak mempengaruhi
     *            availability standar slots.
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

        $slotsFilled = 0;
        $waitingListCount = 0;
        $tripIds = [];
        $sequence = 0;

        // ── Pass 1: pinned trips ────────────────────────────────────────────
        $pins = DailyAssignmentPin::query()
            ->where('direction', $direction)
            ->whereHas('assignment', fn ($q) => $q->where('date', $tripDate))
            ->with('assignment.mobil')
            ->orderBy('trip_time')
            ->get()
            ->filter(function (DailyAssignmentPin $pin) use ($poolOrigin, $driverAssignments): bool {
                $mobil = $pin->assignment?->mobil;
                if ($mobil === null) {
                    return false;
                }

                return $mobil->is_active_in_trip
                    && $mobil->home_pool === $poolOrigin
                    && isset($driverAssignments[$mobil->id]);
            });

        $pinnedMobilIds = [];
        $pinnedSlots = [];

        foreach ($pins as $pin) {
            $mobilId = $pin->assignment->mobil_id;
            $sequence++;
            $slotsFilled++;

            $trip = Trip::create([
                'trip_date'  => $tripDate,
                'trip_time'  => $pin->trip_time,
                'direction'  => $direction,
                'sequence'   => $sequence,
                'mobil_id'   => $mobilId,
                'driver_id'  => $driverAssignments[$mobilId],
                'status'     => 'scheduled',
            ]);

            // Hook: auto-sync ke Keuangan JET (Sesi 38 PR #2)
            $this->keuanganJetSync->syncTripToKeuanganJet($trip);

            $tripIds[] = $trip->id;
            $pinnedMobilIds[] = $mobilId;
            $pinnedSlots[] = $pin->trip_time;
        }

        // ── Pass 2: auto-fill sisa mobil ────────────────────────────────────
        $allMobils = $this->poolState->prioritizedMobilList($poolOrigin, $tripDate);
        $remainingMobils = $allMobils->reject(fn (Mobil $m): bool => in_array($m->id, $pinnedMobilIds, true));

        // Slot custom (bukan member SLOTS) tidak ngurangin availability standar.
        $availableSlots = array_values(array_diff(self::SLOTS, $pinnedSlots));

        foreach ($remainingMobils->values() as $mobil) {
            // Defensive: skip mobil tanpa driver di mapping (DP-B q lenient reverse).
            // Pre-flight di generateForDate sudah catch missing forward case.
            if (! isset($driverAssignments[$mobil->id])) {
                continue;
            }

            $tripTime = array_shift($availableSlots) ?? null;
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

            // Hook: auto-sync ke Keuangan JET (Sesi 38 PR #2)
            $this->keuanganJetSync->syncTripToKeuanganJet($trip);

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
