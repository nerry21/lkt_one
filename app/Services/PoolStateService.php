<?php

namespace App\Services;

use App\Models\Mobil;
use App\Models\Trip;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use InvalidArgumentException;

/**
 * Stateless read-only service untuk derive pool state dari trip history.
 *
 * Convention: pool state BUKAN disimpan di tabel — derived dari trip terakhir
 * setiap mobil (design doc §2.1, §5.6).
 *
 * Gap note: Method `prioritizedMobilList` dan `findDualPoolViolations` bergantung
 * pada keluar_trip sub-status lifecycle (out → waiting_list → returning) yang
 * transition-nya baru di-implement di Fase C (KeluarTripService + ProcessTripCutoverJob).
 * Di Fase B ini, logic sudah complete tapi semantic test coverage partial.
 */
class PoolStateService
{
    /**
     * Pool yang valid — sumber truth untuk validasi input prioritizedMobilList.
     * Enum mirror dari kolom mobil.home_pool dan trip.keluar_trip_pool_target.
     */
    private const VALID_POOLS = ['PKB', 'ROHUL'];

    /**
     * Derive kota (pool) di mana mobil sedang berada pada tanggal yang diminta.
     *
     * Algoritma (design doc §5.6):
     *   1. Cari trip terakhir (trip_date ≤ $date, order trip_date DESC, sequence
     *      DESC) milik mobil dengan status yang men-"final"-kan posisi pool:
     *        - berangkat                       → mobil pindah ke kota tujuan
     *        - tidak_keluar_trip               → mobil tetap di kota asal
     *        - keluar_trip + substatus=returning → mobil di keluar_trip_pool_target
     *   2. Kalau tidak ada trip yang match, fallback ke mobil.home_pool.
     *   3. Kalau home_pool null juga, return null (mobil belum di-assign pool manapun).
     *
     * @return 'PKB'|'ROHUL'|null
     *
     * @see docs/trip-planning-design.md §5.6
     */
    public function poolForMobil(string $mobilId, string $date): ?string
    {
        $trip = Trip::query()
            ->where('mobil_id', $mobilId)
            ->where('trip_date', '<=', $date)
            ->where(function ($q): void {
                $q->whereIn('status', ['berangkat', 'tidak_keluar_trip'])
                    ->orWhere(function ($q2): void {
                        $q2->where('status', 'keluar_trip')
                            ->where('keluar_trip_substatus', 'returning');
                    });
            })
            ->orderByDesc('trip_date')
            ->orderByDesc('sequence')
            ->first();

        if ($trip !== null) {
            return match ($trip->status) {
                'berangkat'         => $this->directionToCity($trip->direction, toDestination: true),
                'tidak_keluar_trip' => $this->directionToCity($trip->direction, toDestination: false),
                'keluar_trip'       => $trip->keluar_trip_pool_target,
                default             => null,
            };
        }

        /** @var Mobil|null $mobil */
        $mobil = Mobil::query()->find($mobilId);

        return $mobil?->home_pool;
    }

    /**
     * List mobil aktif di pool tertentu, sorted by R4 priority (design doc §5.6).
     *
     * Priority ranks:
     *   1. Standby — mobil di pool ≥1 hari tanpa aktivitas trip kemarin.
     *   2. Waiting list — kemarin keluar_trip substatus=waiting_list.
     *   3. Returning — kemarin keluar_trip substatus=returning.
     *
     * Tiebreak stabil by kode_mobil ASC.
     *
     * Gap note: priority tier 2/3 baru muncul setelah KeluarTripService (Fase C)
     * mem-populate substatus 'waiting_list' / 'returning'. Di Fase B semua mobil
     * aktif akan rank=1, sehingga ordering praktis jadi kode_mobil ASC murni.
     *
     * Setiap Mobil di collection di-tag dengan transient attribute
     * `pool_priority_rank` (1/2/3) untuk introspection downstream (UI chip, debug).
     *
     * @return Collection<int, Mobil>
     *
     * @throws InvalidArgumentException  Kalau $pool bukan 'PKB' atau 'ROHUL'.
     *
     * @see docs/trip-planning-design.md §5.6
     */
    public function prioritizedMobilList(string $pool, string $date): Collection
    {
        if (! in_array($pool, self::VALID_POOLS, true)) {
            throw new InvalidArgumentException(
                "Invalid pool: {$pool}. Must be 'PKB' or 'ROHUL'."
            );
        }

        $yesterday = Carbon::parse($date)->subDay()->toDateString();

        return Mobil::query()
            ->where('is_active_in_trip', true)
            ->get()
            ->filter(fn (Mobil $mobil): bool => $this->poolForMobil($mobil->id, $date) === $pool)
            ->each(function (Mobil $mobil) use ($yesterday): void {
                $mobil->setAttribute(
                    'pool_priority_rank',
                    $this->computePriorityRank($mobil->id, $yesterday),
                );
            })
            ->sortBy([
                ['pool_priority_rank', 'asc'],
                ['kode_mobil', 'asc'],
            ])
            ->values();
    }

    /**
     * Diagnostik: cari mobil dengan 2+ trip aktif di tanggal yang sama yang
     * mengimplikasikan dual-pool occupancy.
     *
     * Konflik dideteksi kalau:
     *   - 2 trip mobil yang sama punya direction berlawanan (PKB_TO_ROHUL +
     *     ROHUL_TO_PKB) di tanggal yang sama, ATAU
     *   - mobil yang sama punya 'berangkat' + 'keluar_trip' unresolved di
     *     tanggal yang sama (satu trip mestinya non-aktif setelah eksekusi
     *     trip lain).
     *
     * Status yang di-scan: scheduled/berangkat/keluar_trip. Status
     * tidak_berangkat / tidak_keluar_trip / ganti_jam di-skip karena dianggap
     * tidak occupy slot pool.
     *
     * Ekspektasi: return empty collection di state sehat. Method ini berguna
     * sebagai integrity check setelah Fase C rotation logic landing.
     *
     * @return Collection<int, array{mobil_id: string, trip_ids: array<int, int>}>
     *
     * @see docs/trip-planning-design.md §5.6
     */
    public function findDualPoolViolations(string $date): Collection
    {
        $trips = Trip::query()
            ->where('trip_date', $date)
            ->whereIn('status', ['scheduled', 'berangkat', 'keluar_trip'])
            ->get();

        return $trips
            ->groupBy('mobil_id')
            ->filter(fn (Collection $group): bool => $group->count() >= 2)
            ->map(function (Collection $group, string $mobilId): ?array {
                $distinctDirections = $group->pluck('direction')->unique()->count();
                $hasBerangkat = $group->contains(fn (Trip $t): bool => $t->status === 'berangkat');
                $hasKeluarTrip = $group->contains(fn (Trip $t): bool => $t->status === 'keluar_trip');

                $conflict = $distinctDirections >= 2 || ($hasBerangkat && $hasKeluarTrip);

                if (! $conflict) {
                    return null;
                }

                return [
                    'mobil_id' => $mobilId,
                    'trip_ids' => $group->pluck('id')->map(fn ($id): int => (int) $id)->all(),
                ];
            })
            ->filter()
            ->values();
    }

    /**
     * Map (direction, position) → kota.
     *
     * toDestination=true  → kota tujuan arah
     * toDestination=false → kota asal arah
     *
     * Dipakai untuk map status 'berangkat' (ke destination) dan
     * 'tidak_keluar_trip' (tetap di origin) ke pool value.
     *
     * @return 'PKB'|'ROHUL'
     */
    private function directionToCity(string $direction, bool $toDestination): string
    {
        return match ($direction) {
            'PKB_TO_ROHUL' => $toDestination ? 'ROHUL' : 'PKB',
            'ROHUL_TO_PKB' => $toDestination ? 'PKB' : 'ROHUL',
        };
    }

    /**
     * Hitung priority_rank mobil berdasarkan trip terakhirnya di $yesterday.
     *
     *   1 = standby (tidak ada trip, atau trip kemarin sudah finalized
     *       regular: berangkat / tidak_keluar_trip / tidak_berangkat / dsb.)
     *   2 = waiting_list (kemarin keluar_trip substatus=waiting_list)
     *   3 = returning    (kemarin keluar_trip substatus=returning)
     */
    private function computePriorityRank(string $mobilId, string $yesterday): int
    {
        $trip = Trip::query()
            ->where('mobil_id', $mobilId)
            ->where('trip_date', $yesterday)
            ->orderByDesc('sequence')
            ->first();

        if ($trip === null || $trip->status !== 'keluar_trip') {
            return 1;
        }

        return match ($trip->keluar_trip_substatus) {
            'waiting_list' => 2,
            'returning'    => 3,
            default        => 1,
        };
    }
}
