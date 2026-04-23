<?php

namespace App\Services;

use App\Exceptions\TripDeleteNotAllowedException;
use App\Exceptions\TripSlotConflictException;
use App\Exceptions\TripVersionConflictException;
use App\Models\Trip;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

/**
 * Service untuk mutasi trip — insert manual, delete + recompact, swap atomic,
 * dan atomic check-and-set version.
 *
 * Invariants yang di-enforce (docs/trip-planning-design.md §3.4):
 *   I1 — Slot (trip_date, trip_time, direction) unik di antara trip yang masih
 *        "occupy" slot (status NOT IN EXCLUDED_STATUSES).
 *   I2 — Mobil tidak boleh double-assigned di (trip_date, direction) yang sama
 *        (status NOT IN EXCLUDED_STATUSES).
 *
 * Optimistic lock: pakai pattern Bug #30 — atomic UPDATE dengan WHERE version=?,
 * mirror Booking::updateWithVersionCheck. Bedanya service ini throw exception
 * daripada return bool supaya caller (TripController, TripRotationService)
 * dapat info versi current untuk UI "refresh & retry" hint.
 *
 * Stateless service — aman di-share antar request (singleton via container).
 */
class TripService
{
    /**
     * Status yang dianggap "freed" untuk slot/mobil occupancy check (DP-6).
     *
     * tidak_berangkat = trip regular dibatalkan → slot lepas, boleh re-insert.
     * tidak_keluar_trip = keluar_trip dibatalkan → mobil lepas, boleh re-assign.
     *
     * ganti_jam dan keluar_trip TIDAK masuk di sini — masih dianggap occupy
     * (default safe: jangan sampai admin dobel-assign tanpa sadar).
     */
    private const EXCLUDED_STATUSES = ['tidak_berangkat', 'tidak_keluar_trip'];

    /**
     * Status yang TIDAK boleh di-delete langsung (harus lewat flow khusus).
     *
     * berangkat = sudah eksekusi, delete = data loss.
     * keluar_trip = sedang dalam mode dropping/rental → harus tutup via menu
     *               Keluar Trip (flow "returning" → "tidak_keluar_trip").
     */
    private const UNDELETABLE_STATUSES = ['berangkat', 'keluar_trip'];

    /**
     * Reason mapping untuk TripDeleteNotAllowedException — pesan Indonesian
     * untuk UI admin.
     */
    private const DELETE_BLOCKED_REASONS = [
        'berangkat' => 'trip sudah berangkat',
        'keluar_trip' => 'trip sedang dalam mode keluar trip (close dulu via menu Keluar Trip)',
    ];

    /**
     * Trip status yang dianggap "aktif" untuk statistics & PP calculation.
     *
     * - berangkat   : mobil sudah berangkat, trip kena hitung.
     * - keluar_trip : mobil keluar rotasi (dropping/rental/other), tetap kena
     *                 untuk audit PP.
     *
     * Status tidak_berangkat / tidak_keluar_trip / scheduled / ganti_jam tidak
     * dihitung (belum jalan atau batal).
     *
     * Fase E5c refactor Sesi 30: single source of truth — sebelumnya duplicate
     * di TripPlanningPageController + TripPlanningDashboardViewController.
     */
    public const ACTIVE_STATUSES = ['berangkat', 'keluar_trip'];

    /**
     * Hitung PP (pulang-pergi) count untuk satu mobil pada snapshot trip collection.
     *
     * Formula:
     *   0.5 × count(ROHUL_TO_PKB active)
     *   + 0.5 × count(PKB_TO_ROHUL active)
     *     — hanya ditambahkan kalau ada ROHUL_TO_PKB active di collection
     *       (guard: trip PKB→ROHUL standalone tanpa pair ROHUL→PKB tidak
     *       di-count sebagai pergi-pulang).
     *
     * Same-day return trip (same_day_return=true) otomatis terhitung sebagai
     * PKB_TO_ROHUL biasa (0.5 PP) via filter direction — tidak butuh
     * special-case logic.
     *
     * Fase E5c refactor Sesi 30: sebelumnya duplicate di
     * TripPlanningPageController::buildStatistics dan
     * TripPlanningDashboardViewController::computePp. Sekarang single source
     * of truth di service.
     *
     * @param  Collection<int, Trip>  $mobilTrips  Collection trip yang sudah di-filter per mobil.
     */
    public function computePpForMobil(Collection $mobilTrips): float
    {
        $activeRohulDeparture = $mobilTrips
            ->where('direction', 'ROHUL_TO_PKB')
            ->whereIn('status', self::ACTIVE_STATUSES);

        $activePkbReturn = $mobilTrips
            ->where('direction', 'PKB_TO_ROHUL')
            ->whereIn('status', self::ACTIVE_STATUSES);

        $pp = 0.5 * $activeRohulDeparture->count();

        if ($activeRohulDeparture->isNotEmpty()) {
            $pp += 0.5 * $activePkbReturn->count();
        }

        return $pp;
    }

    /**
     * Atomic check-and-set update dengan guard version.
     *
     * Pattern Bug #30 (lihat Booking::updateWithVersionCheck). Single UPDATE
     * dengan WHERE id=? AND version=?, bump version di statement yang sama.
     * Kalau affected_rows = 0 → fetch current version untuk hint user, throw.
     *
     * Caller wajib panggil ini di dalam DB::transaction kalau butuh atomicity
     * gabungan dengan operasi lain (mis. update trip + insert audit log).
     *
     * @param  array<string, mixed>  $fields  Kolom yang mau di-update (selain version).
     * @throws TripVersionConflictException   Kalau version tidak match current.
     */
    public function updateWithVersionCheck(int $tripId, int $expectedVersion, array $fields): Trip
    {
        $affected = Trip::query()
            ->where('id', $tripId)
            ->where('version', $expectedVersion)
            ->update(array_merge($fields, ['version' => DB::raw('version + 1')]));

        if ($affected === 0) {
            $currentVersion = Trip::query()->whereKey($tripId)->value('version');

            throw new TripVersionConflictException(
                tripId: $tripId,
                expectedVersion: $expectedVersion,
                currentVersion: $currentVersion,
            );
        }

        return Trip::findOrFail($tripId);
    }

    /**
     * Invariant I1 — slot (trip_date, trip_time, direction) wajib unik di antara
     * trip yang masih occupy slot.
     *
     * WAJIB dipanggil di dalam DB::transaction supaya lockForUpdate efektif
     * mencegah race dengan insert concurrent.
     *
     * @param  int|null  $excludeTripId  Trip ID yang dikecualikan dari check
     *                                   (berguna saat update trip existing —
     *                                   row diri sendiri tidak boleh dianggap
     *                                   conflict dengan dirinya).
     * @throws TripSlotConflictException
     */
    public function assertSlotAvailable(
        string $tripDate,
        string $tripTime,
        string $direction,
        ?int $excludeTripId = null,
    ): void {
        $query = Trip::query()
            ->where('trip_date', $tripDate)
            ->where('trip_time', $tripTime)
            ->where('direction', $direction)
            ->whereNotIn('status', self::EXCLUDED_STATUSES)
            ->lockForUpdate();

        if ($excludeTripId !== null) {
            $query->where('id', '!=', $excludeTripId);
        }

        if ($query->exists()) {
            throw new TripSlotConflictException(
                tripDate: $tripDate,
                tripTime: $tripTime,
                direction: $direction,
                conflictType: 'slot',
            );
        }
    }

    /**
     * Invariant I2 — mobil tidak boleh double-assigned di (trip_date, direction)
     * yang sama.
     *
     * WAJIB dipanggil di dalam DB::transaction. tripTime tidak relevan untuk
     * invariant ini (mobil yang sama tidak boleh dijadwalkan dua kali di arah
     * yang sama di tanggal yang sama, apa pun jamnya).
     *
     * @param  int|null  $excludeTripId  Trip ID yang dikecualikan (pattern sama
     *                                   seperti assertSlotAvailable).
     * @throws TripSlotConflictException  conflictType='mobil'
     */
    public function assertMobilNotDoubleAssigned(
        string $mobilId,
        string $tripDate,
        string $direction,
        ?int $excludeTripId = null,
    ): void {
        $query = Trip::query()
            ->where('mobil_id', $mobilId)
            ->where('trip_date', $tripDate)
            ->where('direction', $direction)
            ->whereNotIn('status', self::EXCLUDED_STATUSES)
            ->lockForUpdate();

        if ($excludeTripId !== null) {
            $query->where('id', '!=', $excludeTripId);
        }

        if ($query->exists()) {
            throw new TripSlotConflictException(
                tripDate: $tripDate,
                // tripTime tidak relevant untuk mobil conflict — placeholder.
                tripTime: '00:00:00',
                direction: $direction,
                conflictType: 'mobil',
                mobilId: $mobilId,
            );
        }
    }

    /**
     * O2 — insert trip secara manual (admin add trip baru di board) dengan
     * invariant guard I1 + I2.
     *
     * Required keys di $fields: trip_date, trip_time, direction, sequence,
     * mobil_id, driver_id. Optional: created_by, updated_by.
     *
     * Field `status` dipaksa 'scheduled' (trip baru belum bisa langsung
     * berangkat). Field `version` dipaksa 0 via forceFill karena tidak ada di
     * $fillable Trip (guard optimistic lock hanya via service).
     *
     * @param  array<string, mixed>  $fields
     * @throws TripSlotConflictException
     */
    public function insertManual(array $fields): Trip
    {
        return DB::transaction(function () use ($fields): Trip {
            $this->assertSlotAvailable(
                $fields['trip_date'],
                $fields['trip_time'],
                $fields['direction'],
            );

            $this->assertMobilNotDoubleAssigned(
                $fields['mobil_id'],
                $fields['trip_date'],
                $fields['direction'],
            );

            $trip = new Trip();
            $trip->forceFill(array_merge($fields, [
                'status' => 'scheduled',
                'version' => 0,
            ]));
            $trip->save();

            return $trip->refresh();
        });
    }

    /**
     * O3 — delete trip + recompact sequence dalam 1 transaction.
     *
     * Guard:
     *   - version match (optimistic lock via pattern Bug #30)
     *   - status bukan berangkat/keluar_trip
     *
     * Setelah delete, recompact sequence (1,2,3,...) untuk sisa trip di
     * (trip_date, direction) yang sama supaya tidak ada gap.
     *
     * @throws TripVersionConflictException
     * @throws TripDeleteNotAllowedException
     */
    public function delete(int $tripId, int $expectedVersion): void
    {
        DB::transaction(function () use ($tripId, $expectedVersion): void {
            /** @var Trip $trip */
            $trip = Trip::query()->lockForUpdate()->findOrFail($tripId);

            if ($trip->version !== $expectedVersion) {
                throw new TripVersionConflictException(
                    tripId: $tripId,
                    expectedVersion: $expectedVersion,
                    currentVersion: $trip->version,
                );
            }

            if (in_array($trip->status, self::UNDELETABLE_STATUSES, true)) {
                throw new TripDeleteNotAllowedException(
                    tripId: $tripId,
                    currentStatus: $trip->status,
                    reason: self::DELETE_BLOCKED_REASONS[$trip->status],
                );
            }

            $tripDate = $trip->trip_date->toDateString();
            $direction = $trip->direction;

            $trip->delete();

            $this->recompactSequence($tripDate, $direction);
        });
    }

    /**
     * O1 — atomic swap mobil_id + driver_id antara 2 trip di slot yang sudah
     * ada (slot tetap, asset rotated).
     *
     * Lock order deterministik (ascending id) untuk hindari deadlock saat 2
     * request swap reciprocal.
     *
     * Double-sided version check: kalau salah satu sudah di-update oleh admin
     * lain, throw sesuai trip yang conflict (first-wins atomicity).
     *
     * @throws TripVersionConflictException
     */
    public function swap(int $tripAId, int $tripBId, int $versionA, int $versionB): void
    {
        DB::transaction(function () use ($tripAId, $tripBId, $versionA, $versionB): void {
            // Lock deterministik by ascending id — prevent deadlock.
            [$firstId, $secondId] = $tripAId < $tripBId
                ? [$tripAId, $tripBId]
                : [$tripBId, $tripAId];

            [$firstVersion, $secondVersion] = $tripAId < $tripBId
                ? [$versionA, $versionB]
                : [$versionB, $versionA];

            /** @var Trip $first */
            $first = Trip::query()->lockForUpdate()->findOrFail($firstId);
            /** @var Trip $second */
            $second = Trip::query()->lockForUpdate()->findOrFail($secondId);

            if ($first->version !== $firstVersion) {
                throw new TripVersionConflictException(
                    tripId: $firstId,
                    expectedVersion: $firstVersion,
                    currentVersion: $first->version,
                );
            }

            if ($second->version !== $secondVersion) {
                throw new TripVersionConflictException(
                    tripId: $secondId,
                    expectedVersion: $secondVersion,
                    currentVersion: $second->version,
                );
            }

            $newMobilFirst = $second->mobil_id;
            $newDriverFirst = $second->driver_id;
            $newMobilSecond = $first->mobil_id;
            $newDriverSecond = $first->driver_id;

            // Pakai query builder update (bukan model update) supaya field
            // `version` tidak di-drop oleh mass assignment (version tidak ada
            // di Trip $fillable by design — optimistic lock hanya via service).
            Trip::query()->whereKey($first->id)->update([
                'mobil_id' => $newMobilFirst,
                'driver_id' => $newDriverFirst,
                'version' => DB::raw('version + 1'),
            ]);

            Trip::query()->whereKey($second->id)->update([
                'mobil_id' => $newMobilSecond,
                'driver_id' => $newDriverSecond,
                'version' => DB::raw('version + 1'),
            ]);
        });
    }

    /**
     * System-internal recompaction setelah delete — renumber sequence jadi
     * 1,2,3,... tanpa gap.
     *
     * Tradeoff: bypass version check intentionally. Alasannya operasi ini
     * system-internal (executed di transaction yang sama dengan delete),
     * bukan admin-initiated mutation → tidak ada risiko race antar admin.
     * Menerapkan version check di sini justru akan menggagalkan delete yang
     * sah setiap kali ada sibling trip.
     *
     * Loop di app layer (DP-2 decision di design doc) — query MySQL update
     * via CTE/window function lebih rumit dan kurang portable untuk volume
     * kecil (<20 trip per hari per direction).
     */
    private function recompactSequence(string $tripDate, string $direction): void
    {
        $siblings = Trip::query()
            ->where('trip_date', $tripDate)
            ->where('direction', $direction)
            ->orderBy('sequence')
            ->lockForUpdate()
            ->get();

        $expectedSeq = 1;
        foreach ($siblings as $sibling) {
            if ($sibling->sequence !== $expectedSeq) {
                $sibling->update(['sequence' => $expectedSeq]);
            }
            $expectedSeq++;
        }
    }
}
