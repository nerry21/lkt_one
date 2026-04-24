<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\Driver;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Bug #37 — pessimistic batch lock untuk BookingController::slotAssign.
 *
 * slotAssign mutate N booking dalam satu panggilan berdasarkan filter
 * (trip_date + trip_time prefix + armada_index + optional direction).
 * Sebelum fix: bulk $query->update() tanpa transaction/lock — last write
 * wins saat 2 admin concurrent. Fix wrap dalam DB::transaction dengan
 * lockForUpdate() pada SELECT.
 *
 * Race test real (pcntl_fork) tidak feasible di PHPUnit standard. Coverage
 * di sini behavior-level: happy path, empty match, direction filter. Atomic
 * transaction verified lewat inline comment + production DB lock wait
 * observation.
 */
class SlotAssignBulkRaceTest extends TestCase
{
    use RefreshDatabase;

    public function test_slot_assign_happy_path_updates_all_matching_bookings(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $driver = Driver::factory()->create(['nama' => 'Pak Sopir Baru']);

        $this->seedMatchingBooking('RBK-BUG37-001');
        $this->seedMatchingBooking('RBK-BUG37-002');
        $this->seedMatchingBooking('RBK-BUG37-003');

        $response = $this->actingAs($admin)->patchJson('/api/bookings/slot-assign', [
            'trip_date' => '2026-04-20',
            'trip_time' => '05:00',
            'armada_index' => 1,
            'direction' => '',
            'driver_name' => 'Pak Sopir Baru',
            'driver_id' => $driver->id,
        ]);

        $response->assertOk();
        $response->assertJsonFragment([
            'message' => 'Driver berhasil diperbarui pada slot keberangkatan',
            'updated_count' => 3,
        ]);

        $this->assertSame(
            3,
            Booking::query()
                ->where('driver_id', $driver->id)
                ->where('driver_name', 'Pak Sopir Baru')
                ->count(),
            '3 booking matching slot harus ter-assign ke driver baru.',
        );
    }

    public function test_slot_assign_returns_zero_when_no_match(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $driver = Driver::factory()->create();

        // Seed 1 booking at different date, should NOT match filter below.
        $this->seedMatchingBooking('RBK-BUG37-NOM', ['trip_date' => '2026-05-01']);

        $response = $this->actingAs($admin)->patchJson('/api/bookings/slot-assign', [
            'trip_date' => '2026-04-20',
            'trip_time' => '05:00',
            'armada_index' => 1,
            'direction' => '',
            'driver_name' => $driver->nama,
            'driver_id' => $driver->id,
        ]);

        $response->assertOk();
        $response->assertJsonFragment(['updated_count' => 0]);

        // Booking di date lain tidak boleh ikut ter-mutate.
        $this->assertDatabaseHas('bookings', [
            'booking_code' => 'RBK-BUG37-NOM',
            'driver_id' => null,
        ]);
    }

    public function test_slot_assign_respects_direction_filter_to_pkb(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $driver = Driver::factory()->create(['nama' => 'Pak Arah PKB']);

        // 2 booking arah ke Pekanbaru (match direction=to_pkb).
        $this->seedMatchingBooking('RBK-BUG37-TO1', [
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Pekanbaru',
        ]);
        $this->seedMatchingBooking('RBK-BUG37-TO2', [
            'from_city' => 'Pasirpengaraian',
            'to_city' => 'Pekanbaru',
        ]);

        // 1 booking arah dari Pekanbaru (harus DI-SKIP oleh filter to_pkb).
        $this->seedMatchingBooking('RBK-BUG37-FROM1', [
            'from_city' => 'Pekanbaru',
            'to_city' => 'Pasirpengaraian',
        ]);

        $response = $this->actingAs($admin)->patchJson('/api/bookings/slot-assign', [
            'trip_date' => '2026-04-20',
            'trip_time' => '05:00',
            'armada_index' => 1,
            'direction' => 'to_pkb',
            'driver_name' => 'Pak Arah PKB',
            'driver_id' => $driver->id,
        ]);

        $response->assertOk();
        $response->assertJsonFragment(['updated_count' => 2]);

        // from_pkb booking tetap unassigned.
        $this->assertDatabaseHas('bookings', [
            'booking_code' => 'RBK-BUG37-FROM1',
            'driver_id' => null,
        ]);
    }

    private function seedMatchingBooking(string $bookingCode, array $overrides = []): Booking
    {
        return Booking::factory()->create(array_merge([
            'booking_code' => $bookingCode,
            'trip_date' => '2026-04-20',
            'trip_time' => '05:00:00',
            'armada_index' => 1,
            'from_city' => 'Pekanbaru',
            'to_city' => 'Pasirpengaraian',
            'driver_id' => null,
            'driver_name' => null,
        ], $overrides));
    }
}
