<?php

namespace App\Services;

use App\Helpers\KeuanganJetDirectionMapper;
use App\Models\Booking;
use App\Models\KeuanganJet;
use App\Models\KeuanganJetSiklus;
use App\Models\Trip;
use Illuminate\Support\Facades\DB;

/**
 * Service auto-populate Data Keuangan JET dari Trip Planning + Bookings.
 *
 * Flow integrasi:
 *   1. Trip generated → syncTripToKeuanganJet() → create row keuangan_jet
 *      + assign ke siklus yang sesuai (createOrFindSiklus).
 *   2. Trip markBerangkat → syncTripToKeuanganJet() → update trip_status
 *      + refreshFromBookings() pull data booking real-time + recomputeFormula().
 *      + KALAU direction=Kepulangan → completeSiklus() trigger compute bagi hasil.
 *   3. SameDayReturn createSameDayReturn → syncTripToKeuanganJet() → create row baru
 *      pair ke siklus existing (siklus tanggal_mulai = origin trip date).
 *
 * Siklus matching logic (createOrFindSiklus):
 *   - Trip direction=Keberangkatan (ROHUL_TO_PKB):
 *     Cari siklus di mobil_id yang status='berjalan' DAN belum ada keuangan_jet
 *     direction='Keberangkatan'. Kalau tidak ketemu → create siklus baru
 *     dengan tanggal_mulai = trip.trip_date.
 *   - Trip direction=Kepulangan (PKB_TO_ROHUL):
 *     Cari siklus di mobil_id yang status='berjalan' DAN ada keuangan_jet
 *     direction='Keberangkatan' tapi belum ada direction='Kepulangan'. Kalau
 *     tidak ketemu (orphan trip kepulangan tanpa keberangkatan), create siklus
 *     baru dengan tanggal_mulai = trip.trip_date (degenerate single-direction
 *     siklus, status tetap 'berjalan' selamanya kecuali admin force complete
 *     manual di PR #3).
 *
 * Refresh logic (refreshFromBookings):
 *   - Pull booking WHERE trip_id = $row->trip_id
 *   - jumlah_penumpang = COUNT(category='Reguler')
 *   - total_ongkos_penumpang = SUM(total_amount WHERE category='Reguler')
 *   - jumlah_paket = COUNT(category='Paket')
 *   - total_ongkos_paket = SUM(total_amount WHERE category='Paket')
 *
 * Formula recompute (recomputeFormula):
 *   - basis_admin = total_ongkos_penumpang + total_ongkos_paket
 *   - trigger_admin = (penumpang>=420k OR paket>=420k OR basis>=420k)
 *   - uang_admin = trigger_admin ? basis_admin * persen_admin/100 : 0
 *   - total_pendapatan_arah = basis_admin + uang_snack
 *
 * Aggregate logic (aggregateSiklus):
 *   - total_revenue_kbg = SUM(total_pendapatan_arah WHERE direction='Keberangkatan')
 *   - total_revenue_kpl = SUM(total_pendapatan_arah WHERE direction='Kepulangan')
 *   - total_uang_admin_kbg/kpl, total_pendapatan_kotor, total_admin_potong,
 *     total_operasional, total_pendapatan_bersih, uang_driver (30%), uang_mobil (70%)
 *
 * Idempotent — semua method aman di-call berkali-kali dengan input sama
 * (uses upsert pattern via UNIQUE(trip_id) + status checks).
 *
 * THRESHOLD_ADMIN = 420_000 (locked Sesi 38).
 *
 * Reference: docs/keuangan-jet-design.md (TBD created PR #3 docs).
 */
class KeuanganJetSyncService
{
    public const THRESHOLD_ADMIN = 420_000;
    public const PERCENT_DRIVER_SHARE = 30;
    public const PERCENT_MOBIL_SHARE = 70;

    /**
     * Create atau find siklus yang sesuai untuk Trip given.
     *
     * Returns: KeuanganJetSiklus row (existing atau baru).
     */
    public function createOrFindSiklus(Trip $trip): KeuanganJetSiklus
    {
        $trip->loadMissing(['mobil', 'driver']);

        if (KeuanganJetDirectionMapper::isKeberangkatan($trip->direction)) {
            // Cari siklus berjalan tanpa direction=Keberangkatan
            $siklus = KeuanganJetSiklus::query()
                ->where('mobil_id', $trip->mobil_id)
                ->where('status_siklus', 'berjalan')
                ->whereDoesntHave('keuanganJets', function ($q) {
                    $q->where('direction', 'Keberangkatan');
                })
                ->first();

            if ($siklus !== null) {
                return $siklus;
            }
        } else {
            // Kepulangan — cari siklus berjalan yang punya keberangkatan tapi belum ada kepulangan
            $siklus = KeuanganJetSiklus::query()
                ->where('mobil_id', $trip->mobil_id)
                ->where('status_siklus', 'berjalan')
                ->whereHas('keuanganJets', function ($q) {
                    $q->where('direction', 'Keberangkatan');
                })
                ->whereDoesntHave('keuanganJets', function ($q) {
                    $q->where('direction', 'Kepulangan');
                })
                ->first();

            if ($siklus !== null) {
                return $siklus;
            }
        }

        // Create siklus baru
        return KeuanganJetSiklus::create([
            'tanggal_mulai' => $trip->trip_date,
            'mobil_id' => $trip->mobil_id,
            'mobil_code' => $trip->mobil?->kode_mobil ?? 'UNKNOWN',
            'driver_id_planned' => $trip->driver_id,
            'driver_id_actual' => $trip->driver_id,
            'driver_name_actual' => $trip->driver?->nama ?? 'UNKNOWN',
            'status_siklus' => 'berjalan',
            'driver_paid_status' => 'belum',
        ]);
    }

    /**
     * Sync Trip → KeuanganJet row. Idempotent via UNIQUE(trip_id).
     *
     * Auto-default jenis_layanan + persen_admin berdasarkan booking yang ada.
     *
     * Returns: KeuanganJet row.
     */
    public function syncTripToKeuanganJet(Trip $trip): KeuanganJet
    {
        $trip->loadMissing(['mobil', 'driver']);

        return DB::transaction(function () use ($trip) {
            // Idempotency check FIRST — avoid creating orphan siklus on re-sync
            $existingRow = KeuanganJet::where('trip_id', $trip->id)->first();

            if ($existingRow !== null) {
                // Update path: refresh trip_status + jam (kalau gantiJam terjadi)
                $existingRow->update([
                    'trip_status' => $trip->status,
                    'jam' => $trip->trip_time ?? '00:00:00',
                ]);
                return $existingRow;
            }

            $siklus = $this->createOrFindSiklus($trip);

            // Sesi 50 PR #6 — pool_target override saat trip status=keluar_trip.
            // Filosofi Nerry K-4+K-5:
            //   pool_target = ROHUL → trip dianggap Kepulangan (siklus close)
            //   pool_target = PKB   → trip dianggap Keberangkatan (siklus tetap)
            // Backward compat: trip non-keluar_trip pakai $trip->direction asli.
            if ($trip->status === 'keluar_trip' && filled($trip->keluar_trip_pool_target)) {
                $direction = $trip->keluar_trip_pool_target === 'ROHUL'
                    ? 'Kepulangan'
                    : 'Keberangkatan';
            } else {
                $direction = KeuanganJetDirectionMapper::fromTripDirection($trip->direction);
            }

            // Compute trip_ke = count rows dengan jam < current + 1
            $tripKe = KeuanganJet::where('keuangan_jet_siklus_id', $siklus->id)
                ->where('jam', '<', $trip->trip_time ?? '23:59:59')
                ->count() + 1;

            $defaultJenis = $this->autoDetectJenisLayanan($trip);
            $defaultPersen = 15;

            $row = KeuanganJet::create([
                'keuangan_jet_siklus_id' => $siklus->id,
                'trip_id' => $trip->id,
                'trip_date' => $trip->trip_date,
                'mobil_id' => $trip->mobil_id,
                'mobil_code' => $trip->mobil?->kode_mobil ?? 'UNKNOWN',
                'direction' => $direction,
                'trip_ke' => $tripKe,
                'jam' => $trip->trip_time ?? '00:00:00',
                'trip_status' => $trip->status,
                'jenis_layanan' => $defaultJenis,
                'persen_admin' => $defaultPersen,
            ]);

            $this->refreshFromBookings($row);

            return $row->fresh();
        });
    }

    /**
     * Pull data dari Bookings WHERE trip_id = row->trip_id, hitung agregat,
     * lalu recompute formula. Preserve manual entry (uang_snack, persen_admin
     * override) — tidak overwrite.
     *
     * Sesi 50 PR #6 — Aggregate 4 category:
     *   - Reguler  → count + total_amount
     *   - Paket    → count + total_amount
     *   - Dropping → count + total_amount (full amount masuk total_ongkos_penumpang)
     *   - Rental   → split berdasarkan $row->direction:
     *       Keberangkatan → rental_keberangkatan_amount
     *       Kepulangan    → rental_kepulangan_amount
     *
     * Skip booking_status = 'Cancelled' supaya cancel realtime menurunkan total
     * (sesuai filosofi Nerry K-2).
     */
    public function refreshFromBookings(KeuanganJet $row): KeuanganJet
    {
        if ($row->trip_id === null) {
            $row->update(['last_refreshed_at' => now()]);
            return $row;
        }

        // Sesi 50 PR #6 — column rental ditentukan oleh $row->direction.
        // Aman dari SQL injection: $rentalColumn cuma 2 nilai whitelist.
        $rentalColumn = $row->direction === 'Keberangkatan'
            ? 'rental_keberangkatan_amount'
            : 'rental_kepulangan_amount';

        $aggregates = Booking::query()
            ->where('trip_id', $row->trip_id)
            ->whereNotIn('booking_status', ['Cancelled'])
            ->selectRaw("
                SUM(CASE WHEN category = 'Reguler' THEN 1 ELSE 0 END) as count_reguler,
                SUM(CASE WHEN category = 'Reguler' THEN total_amount ELSE 0 END) as sum_reguler,
                SUM(CASE WHEN category = 'Paket' THEN 1 ELSE 0 END) as count_paket,
                SUM(CASE WHEN category = 'Paket' THEN total_amount ELSE 0 END) as sum_paket,
                SUM(CASE WHEN category = 'Dropping' THEN 1 ELSE 0 END) as count_dropping,
                SUM(CASE WHEN category = 'Dropping' THEN total_amount ELSE 0 END) as sum_dropping,
                SUM(CASE WHEN category = 'Rental' THEN 1 ELSE 0 END) as count_rental,
                SUM(CASE WHEN category = 'Rental' THEN COALESCE({$rentalColumn}, 0) ELSE 0 END) as sum_rental
            ")
            ->first();

        $jumlahPenumpang = (int) (
            ($aggregates->count_reguler ?? 0)
            + ($aggregates->count_dropping ?? 0)
            + ($aggregates->count_rental ?? 0)
        );

        $totalOngkosPenumpang = (float) (
            ($aggregates->sum_reguler ?? 0)
            + ($aggregates->sum_dropping ?? 0)
            + ($aggregates->sum_rental ?? 0)
        );

        $row->update([
            'jumlah_penumpang' => $jumlahPenumpang,
            'total_ongkos_penumpang' => $totalOngkosPenumpang,
            'jumlah_paket' => (int) ($aggregates->count_paket ?? 0),
            'total_ongkos_paket' => (float) ($aggregates->sum_paket ?? 0),
            'last_refreshed_at' => now(),
        ]);

        return $this->recomputeFormula($row->fresh());
    }

    /**
     * Recompute formula computed-only fields:
     *   basis_admin, trigger_admin, uang_admin, total_pendapatan_arah.
     *
     * Preserve manual entry (uang_snack, persen_admin override).
     */
    public function recomputeFormula(KeuanganJet $row): KeuanganJet
    {
        $ongkosPenumpang = (float) $row->total_ongkos_penumpang;
        $ongkosPaket = (float) $row->total_ongkos_paket;
        $basisAdmin = $ongkosPenumpang + $ongkosPaket;

        $triggerAdmin = ($ongkosPenumpang >= self::THRESHOLD_ADMIN)
            || ($ongkosPaket >= self::THRESHOLD_ADMIN)
            || ($basisAdmin >= self::THRESHOLD_ADMIN);

        $uangAdmin = $triggerAdmin
            ? round($basisAdmin * ($row->persen_admin / 100), 2)
            : 0.00;

        $totalPendapatanArah = $basisAdmin + (float) $row->uang_snack;

        $row->update([
            'basis_admin' => $basisAdmin,
            'trigger_admin' => $triggerAdmin,
            'uang_admin' => $uangAdmin,
            'total_pendapatan_arah' => $totalPendapatanArah,
        ]);

        return $row->fresh();
    }

    /**
     * Trigger siklus complete + compute bagi hasil.
     *
     * Pre-condition: status_siklus = 'berjalan' (idempotent: kalau sudah complete,
     * tidak re-compute kecuali force=true).
     *
     * @param  'regular_return'|'same_day_return'|'manual'  $via
     */
    public function completeSiklus(KeuanganJetSiklus $siklus, string $via, ?string $userId = null): KeuanganJetSiklus
    {
        if ($siklus->status_siklus === 'locked') {
            return $siklus;
        }

        if ($siklus->status_siklus === 'complete' && $via !== 'manual') {
            return $siklus;
        }

        $siklus->update([
            'status_siklus' => 'complete',
            'completed_at' => now(),
            'completed_by' => $userId,
            'completed_via' => $via,
            'tanggal_selesai' => now()->toDateString(),
        ]);

        return $this->aggregateSiklus($siklus->fresh());
    }

    /**
     * Aggregate semua keuangan_jet rows ke parent siklus + compute bagi hasil
     * 30/70.
     *
     * Computed fields di siklus diupdate. Manual entry (uang_jalan, biaya_kurir,
     * biaya_cuci_mobil) preserved.
     *
     * Cuma run kalau status_siklus = 'complete'. Kalau 'berjalan' → reset
     * computed fields ke 0 (siklus belum kepulangan).
     */
    public function aggregateSiklus(KeuanganJetSiklus $siklus): KeuanganJetSiklus
    {
        if ($siklus->status_siklus === 'berjalan') {
            $siklus->update([
                'total_revenue_kbg' => 0,
                'total_revenue_kpl' => 0,
                'total_uang_admin_kbg' => 0,
                'total_uang_admin_kpl' => 0,
                'total_pendapatan_kotor' => 0,
                'total_admin_potong' => 0,
                'total_operasional' => 0,
                'total_pendapatan_bersih' => 0,
                'uang_driver' => 0,
                'uang_mobil' => 0,
                'last_refreshed_at' => now(),
            ]);
            return $siklus->fresh();
        }

        $rows = $siklus->keuanganJets()->get();

        $revenueKbg = (float) $rows->where('direction', 'Keberangkatan')->sum('total_pendapatan_arah');
        $revenueKpl = (float) $rows->where('direction', 'Kepulangan')->sum('total_pendapatan_arah');
        $adminKbg = (float) $rows->where('direction', 'Keberangkatan')->sum('uang_admin');
        $adminKpl = (float) $rows->where('direction', 'Kepulangan')->sum('uang_admin');

        $totalKotor = $revenueKbg + $revenueKpl;
        $totalAdminPotong = $adminKbg + $adminKpl;
        $totalOperasional = (float) $siklus->uang_jalan
            + (float) $siklus->biaya_kurir
            + (float) $siklus->biaya_cuci_mobil;

        $totalBersih = $totalKotor - $totalAdminPotong - $totalOperasional;

        $uangDriver = round($totalBersih * (self::PERCENT_DRIVER_SHARE / 100), 2);
        $uangMobil = round($totalBersih * (self::PERCENT_MOBIL_SHARE / 100), 2);

        $siklus->update([
            'total_revenue_kbg' => $revenueKbg,
            'total_revenue_kpl' => $revenueKpl,
            'total_uang_admin_kbg' => $adminKbg,
            'total_uang_admin_kpl' => $adminKpl,
            'total_pendapatan_kotor' => $totalKotor,
            'total_admin_potong' => $totalAdminPotong,
            'total_operasional' => $totalOperasional,
            'total_pendapatan_bersih' => $totalBersih,
            'uang_driver' => $uangDriver,
            'uang_mobil' => $uangMobil,
            'last_refreshed_at' => now(),
        ]);

        return $siklus->fresh();
    }

    /**
     * Auto-detect jenis_layanan dominan dari bookings di trip.
     * Priority: Dropping > Rental > Reguler (default fallback).
     */
    private function autoDetectJenisLayanan(Trip $trip): string
    {
        $categories = Booking::where('trip_id', $trip->id)
            ->distinct()
            ->pluck('category')
            ->toArray();

        if (in_array('Dropping', $categories, true)) {
            return 'Dropping';
        }
        if (in_array('Rental', $categories, true)) {
            return 'Rental';
        }
        return 'Reguler';
    }
}
