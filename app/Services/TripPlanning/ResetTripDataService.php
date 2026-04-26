<?php

namespace App\Services\TripPlanning;

use App\Models\Booking;
use App\Models\DailyAssignmentPin;
use App\Models\DailyDriverAssignment;
use App\Models\KeuanganJet;
use App\Models\KeuanganJetSiklus;
use App\Models\Trip;
use App\Models\TripDataResetLog;
use Illuminate\Support\Facades\DB;

/**
 * Reset Trip Planning data — clear pins + DELETE trip status=scheduled
 * + cleanup keuangan_jet terkait.
 *
 * Trip status='berangkat' / 'keluar_trip' / 'tidak_berangkat' / 'tidak_keluar_trip'
 * TIDAK pernah dihapus (audit trail filosofi LKT One = audit system).
 *
 * KeuanganJetSiklus dengan status_siklus='complete'|'locked' juga TIDAK
 * dihapus (financial book sudah ditutup, mungkin bagi hasil sudah dibayar).
 * Hanya siklus 'berjalan' yang ikut di-reset.
 *
 * Mode:
 *   - resetForDate($date) — scoped ke tanggal tertentu (Reset Hari Ini)
 *   - resetAll() — semua tanggal (Reset Semua, super admin only, dengan
 *     JSON snapshot ke trip_data_reset_logs)
 *
 * @see PR #5 Sesi 43 — Reset Trip Data Button
 */
class ResetTripDataService
{
    /**
     * Status trip yang BOLEH dihapus saat reset.
     * 'scheduled' = belum berangkat, aman direset.
     */
    private const RESETTABLE_TRIP_STATUSES = ['scheduled'];

    /**
     * Status siklus yang BOLEH dihapus saat reset.
     * 'berjalan' = siklus baru aktif, belum ditutup → safe untuk dihapus.
     * 'complete' / 'locked' = financial book ditutup → JANGAN sentuh.
     */
    private const RESETTABLE_SIKLUS_STATUSES = ['berjalan'];

    /**
     * Reset data trip planning untuk 1 tanggal.
     *
     * Tidak ada JSON snapshot (lightweight per-tanggal).
     *
     * @return array{trips_deleted:int, assignments_pins_cleared:int, keuangan_jet_deleted:int, keuangan_jet_siklus_deleted:int, bookings_unlinked:int}
     */
    public function resetForDate(string $date, string $userId): array
    {
        return DB::transaction(function () use ($date, $userId): array {
            // 1. Resolve target trip ids untuk tanggal ini.
            $targetTripIds = Trip::query()
                ->where('trip_date', $date)
                ->whereIn('status', self::RESETTABLE_TRIP_STATUSES)
                ->pluck('id')
                ->all();

            // 2. Cleanup keuangan_jet untuk trip-trip itu.
            $keuanganJetDeleted = empty($targetTripIds) ? 0 : KeuanganJet::query()
                ->whereIn('trip_id', $targetTripIds)
                ->delete();

            // 3. NULL-out bookings.trip_id untuk trip yang akan dihapus.
            //    (FK sebenarnya nullOnDelete, tapi eksplisit untuk audit clarity.)
            $bookingsUnlinked = empty($targetTripIds) ? 0 : Booking::query()
                ->whereIn('trip_id', $targetTripIds)
                ->update(['trip_id' => null]);

            // 4. DELETE trip-trip itu.
            $tripsDeleted = empty($targetTripIds) ? 0 : Trip::query()
                ->whereIn('id', $targetTripIds)
                ->delete();

            // 5. Resolve assignment ids untuk tanggal ini.
            $assignmentIds = DailyDriverAssignment::query()
                ->where('date', $date)
                ->pluck('id')
                ->all();

            // 6. DELETE pins untuk assignment-assignment itu (clear jam+loket).
            //    NOTE: Assignment row TIDAK dihapus — admin masih punya
            //    driver-mobil mapping, cuma pins yang clear (kembali ke "Auto").
            $pinsDeleted = empty($assignmentIds) ? 0 : DailyAssignmentPin::query()
                ->whereIn('daily_driver_assignment_id', $assignmentIds)
                ->delete();

            // 7. Cleanup keuangan_jet_siklus 'berjalan' yang start di tanggal ini.
            //    Status 'complete'/'locked' di-skip (book sudah ditutup).
            $keuanganJetSiklusDeleted = KeuanganJetSiklus::query()
                ->where('tanggal_mulai', $date)
                ->whereIn('status_siklus', self::RESETTABLE_SIKLUS_STATUSES)
                ->delete();

            $summary = [
                'trips_deleted' => $tripsDeleted,
                'assignments_pins_cleared' => $pinsDeleted,
                'keuangan_jet_deleted' => $keuanganJetDeleted,
                'keuangan_jet_siklus_deleted' => $keuanganJetSiklusDeleted,
                'bookings_unlinked' => $bookingsUnlinked,
            ];

            // 8. Audit log entry (tanpa JSON snapshot untuk per-tanggal).
            TripDataResetLog::create([
                'scope' => 'today',
                'target_date' => $date,
                'user_id' => $userId,
                'snapshot' => null,
                'summary' => $summary,
            ]);

            return $summary;
        });
    }

    /**
     * Reset SEMUA data trip planning lintas tanggal.
     *
     * WAJIB Super Admin only (controller-level guard via middleware admin.role:super).
     *
     * Capture JSON snapshot SEMUA pin + trip resettable + keuangan_jet
     * sebelum dihapus, simpan ke audit log untuk fallback manual restore.
     *
     * @return array{trips_deleted:int, assignments_pins_cleared:int, keuangan_jet_deleted:int, keuangan_jet_siklus_deleted:int, bookings_unlinked:int}
     */
    public function resetAll(string $userId): array
    {
        return DB::transaction(function () use ($userId): array {
            // 1. Resolve target trip ids (semua tanggal, scheduled saja).
            $targetTripIds = Trip::query()
                ->whereIn('status', self::RESETTABLE_TRIP_STATUSES)
                ->pluck('id')
                ->all();

            // 2. JSON snapshot SEBELUM hapus.
            $snapshot = [
                'taken_at' => now()->toIso8601String(),
                'trips' => Trip::query()->whereIn('id', $targetTripIds)->get()->toArray(),
                'pins' => DailyAssignmentPin::query()->get()->toArray(),
                'assignments' => DailyDriverAssignment::query()->get()->toArray(),
                'keuangan_jet' => KeuanganJet::query()->whereIn('trip_id', $targetTripIds)->get()->toArray(),
                'keuangan_jet_siklus' => KeuanganJetSiklus::query()
                    ->whereIn('status_siklus', self::RESETTABLE_SIKLUS_STATUSES)
                    ->get()->toArray(),
                'bookings_with_trip_id' => Booking::query()
                    ->whereIn('trip_id', $targetTripIds)
                    ->get(['id', 'trip_id'])
                    ->toArray(),
            ];

            // 3. Cleanup ops sama seperti resetForDate, tapi tanpa filter date.
            $keuanganJetDeleted = empty($targetTripIds) ? 0 : KeuanganJet::query()
                ->whereIn('trip_id', $targetTripIds)
                ->delete();

            $bookingsUnlinked = empty($targetTripIds) ? 0 : Booking::query()
                ->whereIn('trip_id', $targetTripIds)
                ->update(['trip_id' => null]);

            $tripsDeleted = empty($targetTripIds) ? 0 : Trip::query()
                ->whereIn('id', $targetTripIds)
                ->delete();

            // Pins: hapus SEMUA pin (lintas tanggal).
            $pinsDeleted = DailyAssignmentPin::query()->delete();

            // KeuanganJetSiklus: hapus siklus 'berjalan' saja.
            // Status 'complete'/'locked' di-preserve (book sudah ditutup).
            $keuanganJetSiklusDeleted = KeuanganJetSiklus::query()
                ->whereIn('status_siklus', self::RESETTABLE_SIKLUS_STATUSES)
                ->delete();

            $summary = [
                'trips_deleted' => $tripsDeleted,
                'assignments_pins_cleared' => $pinsDeleted,
                'keuangan_jet_deleted' => $keuanganJetDeleted,
                'keuangan_jet_siklus_deleted' => $keuanganJetSiklusDeleted,
                'bookings_unlinked' => $bookingsUnlinked,
            ];

            // 4. Audit log entry DENGAN JSON snapshot.
            TripDataResetLog::create([
                'scope' => 'all',
                'target_date' => null,
                'user_id' => $userId,
                'snapshot' => $snapshot,
                'summary' => $summary,
            ]);

            return $summary;
        });
    }
}
