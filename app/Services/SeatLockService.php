<?php

namespace App\Services;

use App\Exceptions\SeatConflictException;
use App\Exceptions\SeatLockReleaseNotAllowedException;
use App\Models\Booking;
use App\Models\BookingSeat;
use App\Models\User;
use App\Traits\NormalizesTripTime;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\QueryException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

/**
 * Service untuk kelola seat locking lifecycle (bug #2, #5 di docs/audit-findings.md).
 *
 * Fase 1A Section D — commit D1 (lockSeats only). Method promoteToHard(),
 * releaseSeats(), getOccupiedSeats() akan ditambahkan di commit D2 dan D3.
 *
 * Stateless — tidak ada constructor injection. Semua I/O via DB facade.
 * Resolve via container: app(SeatLockService::class).
 */
class SeatLockService
{
    use NormalizesTripTime;

    /**
     * Lock seat set untuk booking pada slot(s) yang ditentukan.
     *
     * Caller bertanggung jawab expand slots sesuai kebutuhan:
     *   - Regular/Dropping: 1 slot, N seat         → N row
     *   - Rental multi-hari: N slot (per hari), M seat → N×M row (cartesian)
     *   - Package Besar: 1 slot, 1 seat_code      → 1 row (share pool Regular)
     *
     * Flow dalam DB::transaction:
     *   1. Pre-check lockForUpdate untuk descriptive conflict error
     *   2. Batch insert via BookingSeat::insert() (atomic single statement)
     *   3. Fallback catch QueryException SQLSTATE 23000 (race antara pre-check & insert)
     *   4. Sync booking.selected_seats JSON cache
     *   5. Return Collection<BookingSeat> yang ter-lock
     *
     * @param  array<int, array{trip_date: string, trip_time: string, from_city: string, to_city: string, armada_index: int}>  $slots
     * @param  array<int, string>  $seatNumbers
     * @param  'soft'|'hard'  $lockType
     * @return Collection<int, BookingSeat>
     *
     * @throws SeatConflictException  HTTP 409 kalau ada konflik (pre-check atau race fallback)
     */
    public function lockSeats(
        Booking $booking,
        array $slots,
        array $seatNumbers,
        string $lockType = 'soft',
    ): Collection {
        // 1. Normalisasi trip_time di semua slot entries (defense-in-depth — caller
        //    juga normalisasi, tapi jaga konsistensi sebelum build WHERE clause).
        $normalizedSlots = array_map(
            fn (array $slot): array => [
                'trip_date' => $slot['trip_date'],
                'trip_time' => $this->normalizeTripTime((string) $slot['trip_time']),
                'from_city' => $slot['from_city'],
                'to_city' => $slot['to_city'],
                'armada_index' => (int) $slot['armada_index'],
            ],
            $slots,
        );

        // 2. Build candidate rows: cartesian $normalizedSlots × $seatNumbers.
        $now = now();
        $candidateRows = [];
        foreach ($normalizedSlots as $slot) {
            foreach ($seatNumbers as $seat) {
                $candidateRows[] = [
                    'booking_id' => $booking->id,
                    'trip_date' => $slot['trip_date'],
                    'trip_time' => $slot['trip_time'],
                    'from_city' => $slot['from_city'],
                    'to_city' => $slot['to_city'],
                    'armada_index' => $slot['armada_index'],
                    'seat_number' => $seat,
                    'lock_type' => $lockType,
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
            }
        }

        return DB::transaction(function () use ($booking, $candidateRows, $seatNumbers): Collection {
            // 3a. Pre-check: range-lock existing active rows yang match candidate slots+seats.
            //     lockForUpdate() acquire gap/row lock di index composite untuk serialize
            //     concurrent insert pada slot overlap (cegah race antara SELECT & INSERT).
            $existingConflicts = $this->applySlotSeatWhereClause(
                BookingSeat::query()->active()->lockForUpdate(),
                $candidateRows,
            )->get();

            // 3b. Conflict ada → throw SeatConflictException dengan detail booking_id asal.
            if ($existingConflicts->isNotEmpty()) {
                throw new SeatConflictException(
                    conflicts: $existingConflicts->map(fn (BookingSeat $s): array => [
                        'date' => $s->trip_date->toDateString(),
                        'time' => (string) $s->trip_time,
                        'seat' => (string) $s->seat_number,
                        'booking_id' => (int) $s->booking_id,
                    ])->all(),
                );
            }

            // 3c. Insert batch atomic. Kalau race condition bypass pre-check
            //     (concurrent insert di window antara SELECT dan INSERT),
            //     UNIQUE constraint `uk_booking_seats_active_slot` akan trigger
            //     SQLSTATE 23000 / MySQL 1062 — catch, re-query detail, throw.
            try {
                BookingSeat::insert($candidateRows);
            } catch (QueryException $e) {
                if ($this->isUniqueViolation($e)) {
                    $conflicts = $this->applySlotSeatWhereClause(
                        BookingSeat::query()->active(),
                        $candidateRows,
                    )->get()
                        ->map(fn (BookingSeat $s): array => [
                            'date' => $s->trip_date->toDateString(),
                            'time' => (string) $s->trip_time,
                            'seat' => (string) $s->seat_number,
                            'booking_id' => (int) $s->booking_id,
                        ])
                        ->all();
                    throw new SeatConflictException(conflicts: $conflicts, previous: $e);
                }
                throw $e;
            }

            // 3d. Re-query baru-inserted rows (::insert() return bool, tidak return Collection).
            $locked = BookingSeat::query()
                ->where('booking_id', $booking->id)
                ->whereIn('seat_number', $seatNumbers)
                ->get();

            // 3e. Sync cache selected_seats — flat list seat_number, tanpa konteks tanggal.
            //     Untuk rental multi-hari, cache = unique seat set (6 seat), tapi actual
            //     lock di booking_seats = 6 seat × N hari = cartesian. Consumer yang butuh
            //     per-date lock info query booking_seats langsung via
            //     BookingSeat::active()->where('booking_id', ...) — bukan via
            //     $booking->selected_seats yang tidak bawa konteks tanggal.
            //
            // Bug #30 internal mutator policy (design §10): use updateQuietly to
            // bypass booted() saving listener + version check. This write is a
            // cache sync from admin seat-lock action, not a competing admin edit.
            $booking->updateQuietly([
                'selected_seats' => array_values(array_unique($seatNumbers)),
            ]);

            return $locked;
        });
    }

    /**
     * Promote semua active soft-locked seat booking ini ke lock_type = 'hard'.
     *
     * Dipanggil saat payment di-konfirmasi lunas (Section F:
     * BookingController::validatePayment action='lunas'). Setelah promote,
     * admin tidak bisa release seats tersebut via releaseSeats() — butuh
     * proses refund khusus.
     *
     * Idempotent: scope softLocks() filter hanya row yang masih lock_type='soft'.
     * Row yang sudah 'hard' tidak berubah, aman dipanggil berkali-kali.
     *
     * Tidak wrap transaction — single UPDATE adalah atomic. Filter `active()`
     * skip row yang sudah di-release (lock_released_at != NULL).
     *
     * @return int Jumlah row yang di-update (0 kalau semua sudah hard / tidak ada soft lock aktif)
     */
    public function promoteToHard(Booking $booking): int
    {
        return BookingSeat::query()
            ->where('booking_id', $booking->id)
            ->active()
            ->softLocks()
            ->update(['lock_type' => 'hard']);
    }

    /**
     * Release semua soft-locked seat booking ini. Guard: cek hard lock dulu.
     *
     * Row ter-release di-update dengan:
     *   - lock_released_at = now()
     *   - lock_released_by = $releasedBy->id (UUID)
     *   - lock_release_reason = $reason
     * lock_type tidak berubah (tetap 'soft'). Generated column active_slot_key
     * auto re-compute jadi NULL (karena CASE WHEN lock_released_at IS NULL ...)
     * — effectively row tidak lagi mengunci slot untuk booking baru.
     *
     * Kalau ada >=1 row dengan lock_type='hard', throw exception — tidak ada
     * partial release. Admin wajib pakai proses refund terpisah.
     *
     * @return int Jumlah row yang di-release
     *
     * @throws SeatLockReleaseNotAllowedException  HTTP 403 kalau ada hard lock
     */
    public function releaseSeats(
        Booking $booking,
        User $releasedBy,
        string $reason,
    ): int {
        return DB::transaction(function () use ($booking, $releasedBy, $reason): int {
            // 1. Check hard locks dengan lockForUpdate untuk consistent read.
            //    Hindari race: admin A bypass guard sementara admin B promote ke hard.
            $hardLocked = BookingSeat::query()
                ->where('booking_id', $booking->id)
                ->active()
                ->hardLocks()
                ->lockForUpdate()
                ->get();

            if ($hardLocked->isNotEmpty()) {
                throw new SeatLockReleaseNotAllowedException(
                    bookingId: (int) $booking->id,
                    hardLockedSeats: $hardLocked->pluck('seat_number')->values()->all(),
                );
            }

            // 2. Update soft locks: set audit fields. lock_type biarkan 'soft'.
            $count = BookingSeat::query()
                ->where('booking_id', $booking->id)
                ->active()
                ->softLocks()
                ->update([
                    'lock_released_at' => now(),
                    'lock_released_by' => $releasedBy->id,
                    'lock_release_reason' => $reason,
                ]);

            // 3. Sync cache selected_seats ke empty — booking ini tidak punya
            //    seat aktif lagi setelah release.
            //
            // Bug #30 internal mutator policy (design §10): use updateQuietly to
            // bypass booted() saving listener + version check. Release triggered
            // by admin action already version-checked upstream (updateBooking or
            // deleteBooking); this is consequential cache cleanup, not competing edit.
            $booking->updateQuietly(['selected_seats' => []]);

            return $count;
        });
    }

    /**
     * Query seat yang masih aktif di-lock pada slot tertentu.
     *
     * Dipakai di endpoint GET /api/bookings/occupied-seats (Section F) untuk render
     * seat map di frontend — seat yang occupied di-gray-out, user pilih seat available.
     *
     * Query path memanfaatkan composite index idx_booking_seats_slot_active (Section A):
     *   WHERE trip_date=? AND trip_time=? AND from_city=? AND to_city=? AND armada_index=?
     *     AND lock_released_at IS NULL
     * Single index seek, no table scan.
     *
     * Parameter excludeBookingId untuk update flow (frontend edit booking existing —
     * seat milik booking yang sedang di-edit tidak boleh tampak "occupied" ke diri
     * sendiri, atau user tidak bisa confirm seat-nya).
     *
     * @param  array{trip_date: string, trip_time: string, from_city: string, to_city: string, armada_index: int}  $slot
     * @param  int|null  $excludeBookingId  Exclude seat milik booking ini dari hasil
     * @return Collection<int, string>  Array seat_number unique, flat 0-indexed (JSON-ready)
     */
    public function getOccupiedSeats(array $slot, ?int $excludeBookingId = null): Collection
    {
        return BookingSeat::query()
            ->active()
            ->where('trip_date', $slot['trip_date'])
            ->where('trip_time', $this->normalizeTripTime((string) $slot['trip_time']))
            ->where('from_city', $slot['from_city'])
            ->where('to_city', $slot['to_city'])
            ->where('armada_index', $slot['armada_index'])
            ->when($excludeBookingId, fn (Builder $q, int $id) => $q->where('booking_id', '!=', $id))
            ->pluck('seat_number')
            ->unique()
            ->values();
    }

    /**
     * Helper (DRY): apply WHERE clause untuk match kombinasi slot+seat di $candidateRows.
     * Dipakai di pre-check (3a) dan fallback re-query (3c).
     */
    private function applySlotSeatWhereClause(Builder $query, array $candidateRows): Builder
    {
        return $query->where(function (Builder $q) use ($candidateRows): void {
            foreach ($candidateRows as $row) {
                $q->orWhere(function (Builder $sub) use ($row): void {
                    $sub->where('trip_date', $row['trip_date'])
                        ->where('trip_time', $row['trip_time'])
                        ->where('from_city', $row['from_city'])
                        ->where('to_city', $row['to_city'])
                        ->where('armada_index', $row['armada_index'])
                        ->where('seat_number', $row['seat_number']);
                });
            }
        });
    }

    /**
     * Check QueryException apakah MySQL/MariaDB UNIQUE constraint violation.
     *
     * QueryException::getCode() return format tidak konsisten lintas PDO driver config
     * (bisa return '23000' string atau integer 1062). Pakai errorInfo array property
     * yang struktur [SQLSTATE, driver_code, driver_message] — stabil di semua config.
     */
    private function isUniqueViolation(QueryException $e): bool
    {
        $errorInfo = $e->errorInfo ?? [];
        $sqlState = $errorInfo[0] ?? null;
        $mysqlCode = $errorInfo[1] ?? null;

        return $sqlState === '23000' && $mysqlCode === 1062;
    }
}
