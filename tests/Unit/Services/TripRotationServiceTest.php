<?php

namespace Tests\Unit\Services;

use App\Exceptions\TripInvalidTransitionException;
use App\Exceptions\TripVersionConflictException;
use App\Models\Booking;
use App\Models\BookingNotificationPending;
use App\Models\Trip;
use App\Services\TripRotationService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

/**
 * Test coverage TripRotationService (Sesi 17 Fase C2).
 *
 * Reference: docs/trip-planning-design.md §5.4.
 *
 * Catatan teknis: `version` bukan bagian Trip::$fillable. Setelah
 * Trip::factory()->create(), in-memory model tidak punya `version`
 * (NULL) meskipun di DB default-nya 0. Karena itu setiap factory
 * create harus di-chain dengan ->refresh() supaya in-memory version
 * ter-hydrate dari DB (pattern yang sama dipakai TripService::insertManual).
 */
class TripRotationServiceTest extends TestCase
{
    use RefreshDatabase;

    protected TripRotationService $svc;

    private const TRIP_DATE = '2026-04-22';

    protected function setUp(): void
    {
        parent::setUp();
        Carbon::setTestNow('2026-04-21 14:00:00');
        $this->svc = $this->app->make(TripRotationService::class);
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    // ── Group 1: markBerangkat ──────────────────────────────────────────────

    public function test_markBerangkat_transitions_scheduled_to_berangkat(): void
    {
        $trip = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $result = $this->svc->markBerangkat($trip->id, $trip->version);

        $this->assertSame('berangkat', $result->status);
        $this->assertSame($trip->version + 1, $result->version);
    }

    public function test_markBerangkat_throws_when_status_not_scheduled(): void
    {
        $trip = Trip::factory()->berangkat()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $this->expectException(TripInvalidTransitionException::class);
        $this->svc->markBerangkat($trip->id, $trip->version);
    }

    public function test_markBerangkat_throws_when_trip_time_is_null(): void
    {
        $trip = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => null,
        ])->refresh();

        $this->expectException(TripInvalidTransitionException::class);
        $this->svc->markBerangkat($trip->id, $trip->version);
    }

    public function test_markBerangkat_throws_on_version_mismatch(): void
    {
        $trip = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $this->expectException(TripVersionConflictException::class);
        $this->svc->markBerangkat($trip->id, $trip->version + 99);
    }

    // ── Group 2: markTidakBerangkat ─────────────────────────────────────────

    public function test_markTidakBerangkat_transitions_scheduled_to_tidak_berangkat(): void
    {
        $trip = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $result = $this->svc->markTidakBerangkat($trip->id, $trip->version);

        $this->assertSame('tidak_berangkat', $result->status);
    }

    public function test_markTidakBerangkat_throws_when_status_not_scheduled(): void
    {
        $trip = Trip::factory()->berangkat()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $this->expectException(TripInvalidTransitionException::class);
        $this->svc->markTidakBerangkat($trip->id, $trip->version);
    }

    public function test_markTidakBerangkat_does_not_cascade_other_trips(): void
    {
        $t1 = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence'  => 1,
        ])->refresh();
        $t2 = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '07:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence'  => 2,
        ])->refresh();
        $t3 = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '09:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence'  => 3,
        ])->refresh();

        $this->svc->markTidakBerangkat($t2->id, $t2->version);

        $this->assertSame('05:30:00', $t1->fresh()->trip_time);
        $this->assertSame(1, $t1->fresh()->sequence);
        $this->assertSame('09:00:00', $t3->fresh()->trip_time);
        $this->assertSame(3, $t3->fresh()->sequence);
        $this->assertSame('scheduled', $t1->fresh()->status);
        $this->assertSame('scheduled', $t3->fresh()->status);
    }

    // ── Group 3: markTidakKeluarTrip ────────────────────────────────────────

    public function test_markTidakKeluarTrip_transitions_keluar_trip_to_tidak_keluar_trip(): void
    {
        $trip = Trip::factory()->keluarTrip('out', 'PKB')->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $result = $this->svc->markTidakKeluarTrip($trip->id, $trip->version);

        $this->assertSame('tidak_keluar_trip', $result->status);
    }

    public function test_markTidakKeluarTrip_throws_when_status_not_keluar_trip(): void
    {
        // Scheduled trip is no longer acceptable after Sesi 18 tighten.
        $trip = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $this->expectException(TripInvalidTransitionException::class);
        $this->svc->markTidakKeluarTrip($trip->id, $trip->version);
    }

    // ── Group 4: gantiJam ───────────────────────────────────────────────────

    public function test_gantiJam_changes_trip_time_and_saves_original_first_time(): void
    {
        $trip = Trip::factory()->scheduled()->create([
            'trip_date'          => self::TRIP_DATE,
            'trip_time'          => '07:00:00',
            'original_trip_time' => null,
        ])->refresh();

        $result = $this->svc->gantiJam($trip->id, '05:30:00', $trip->version);

        $this->assertSame('05:30:00', $result->trip_time);
        $this->assertSame('07:00:00', $result->original_trip_time, 'First-time change saves original');
    }

    public function test_gantiJam_preserves_original_trip_time_on_subsequent_changes(): void
    {
        // Trip already moved once: original_trip_time='07:00:00', current
        // trip_time='05:30:00'. Admin changes again to '09:00:00'.
        $trip = Trip::factory()->scheduled()->create([
            'trip_date'          => self::TRIP_DATE,
            'trip_time'          => '05:30:00',
            'original_trip_time' => '07:00:00',
        ])->refresh();

        $result = $this->svc->gantiJam($trip->id, '09:00:00', $trip->version);

        $this->assertSame('09:00:00', $result->trip_time);
        $this->assertSame('07:00:00', $result->original_trip_time, 'Subsequent changes do NOT overwrite original');
    }

    public function test_gantiJam_allows_duplicate_slot_two_mobil_one_slot(): void
    {
        // t1 at 05:30 direction=PKB_TO_ROHUL.
        Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence'  => 1,
        ])->refresh();

        // t2 currently at 07:00, admin move ke 05:30 (penumpang ramai scenario).
        $t2 = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '07:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence'  => 2,
        ])->refresh();

        $result = $this->svc->gantiJam($t2->id, '05:30:00', $t2->version);

        $this->assertSame('05:30:00', $result->trip_time);
    }

    public function test_gantiJam_noop_when_same_trip_time(): void
    {
        $trip = Trip::factory()->scheduled()->create([
            'trip_date'          => self::TRIP_DATE,
            'trip_time'          => '05:30:00',
            'original_trip_time' => null,
        ])->refresh();
        $originalVersion = $trip->version;

        $result = $this->svc->gantiJam($trip->id, '05:30:00', $trip->version);

        $this->assertSame('05:30:00', $result->trip_time);
        $this->assertNull($result->original_trip_time, 'No-op should not trigger audit save');
        $this->assertSame($originalVersion, $result->version, 'No-op should not bump version');
    }

    public function test_gantiJam_allows_null_to_promote_from_waiting_list(): void
    {
        // Trip currently NULL (waiting list). Admin promote ke slot 19:00.
        $trip = Trip::factory()->scheduled()->create([
            'trip_date'          => self::TRIP_DATE,
            'trip_time'          => null,
            'original_trip_time' => null,
        ])->refresh();

        $result = $this->svc->gantiJam($trip->id, '19:00:00', $trip->version);

        $this->assertSame('19:00:00', $result->trip_time);
        $this->assertNull($result->original_trip_time, 'NULL → value is a promotion, not a "change from original"');
    }

    public function test_gantiJam_allows_value_to_null_demote_to_waiting_list(): void
    {
        // Trip currently at slot. Admin demote ke waiting list (sanksi / mobil telat).
        $trip = Trip::factory()->scheduled()->create([
            'trip_date'          => self::TRIP_DATE,
            'trip_time'          => '07:00:00',
            'original_trip_time' => null,
        ])->refresh();

        $result = $this->svc->gantiJam($trip->id, null, $trip->version);

        $this->assertNull($result->trip_time);
        $this->assertSame('07:00:00', $result->original_trip_time, 'Demote audit saves original');
    }

    public function test_gantiJam_throws_when_newTripTime_invalid_slot(): void
    {
        $trip = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $this->expectException(TripInvalidTransitionException::class);
        $this->svc->gantiJam($trip->id, '08:00:00', $trip->version);
    }

    public function test_gantiJam_throws_when_status_not_scheduled(): void
    {
        $trip = Trip::factory()->berangkat()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
        ])->refresh();

        $this->expectException(TripInvalidTransitionException::class);
        $this->svc->gantiJam($trip->id, '07:00:00', $trip->version);
    }

    // ── Group 5: Admin manual cascade scenario (integration-style) ──────────

    public function test_admin_manual_cascade_shift_forward_scenario(): void
    {
        // Scenario: JET 05 berangkat 05:30, penumpang ramai.
        // Admin decisions:
        //   1. markBerangkat t1 (JET 05, 05:30).
        //   2. gantiJam t2 (JET 06) from 07:00 → 05:30 (dipercepat bareng JET 05).
        //   3. markBerangkat t2.
        //   4. gantiJam t3 (JET 07) from 09:00 → 07:00 (geser maju).

        $t1 = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence'  => 1,
        ])->refresh();
        $t2 = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '07:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence'  => 2,
        ])->refresh();
        $t3 = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '09:00:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence'  => 3,
        ])->refresh();

        $t1 = $this->svc->markBerangkat($t1->id, $t1->version);
        $t2 = $this->svc->gantiJam($t2->id, '05:30:00', $t2->version);
        $t2 = $this->svc->markBerangkat($t2->id, $t2->version);
        $t3 = $this->svc->gantiJam($t3->id, '07:00:00', $t3->version);

        $this->assertSame('berangkat', $t1->status);
        $this->assertSame('05:30:00', $t1->trip_time);

        $this->assertSame('berangkat', $t2->status);
        $this->assertSame('05:30:00', $t2->trip_time);
        $this->assertSame('07:00:00', $t2->original_trip_time);

        $this->assertSame('scheduled', $t3->status);
        $this->assertSame('07:00:00', $t3->trip_time);
        $this->assertSame('09:00:00', $t3->original_trip_time);
    }

    // ── Group 6: Edge ───────────────────────────────────────────────────────

    public function test_all_methods_throw_model_not_found_for_nonexistent_trip(): void
    {
        $this->expectException(ModelNotFoundException::class);
        $this->svc->markBerangkat(999999, 0);
    }

    // ── Sesi 50 PR #3: cascade trip_time + notif foundation ─────────────────

    public function test_gantiJam_cascades_trip_time_to_linked_bookings(): void
    {
        $trip = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
            'direction' => 'PKB_TO_ROHUL',
            'sequence'  => 1,
        ])->refresh();

        $booking1 = Booking::factory()->create([
            'trip_id'   => $trip->id,
            'trip_time' => '05:30:00',
            'trip_date' => self::TRIP_DATE,
        ]);
        $booking2 = Booking::factory()->create([
            'trip_id'   => $trip->id,
            'trip_time' => '05:30:00',
            'trip_date' => self::TRIP_DATE,
        ]);

        $this->svc->gantiJam($trip->id, '07:00:00', $trip->version);

        $booking1->refresh();
        $booking2->refresh();
        $this->assertSame('07:00:00', $booking1->trip_time);
        $this->assertSame('07:00:00', $booking2->trip_time);
    }

    public function test_gantiJam_creates_notification_pending_for_each_booking(): void
    {
        $trip = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
            'sequence'  => 1,
        ])->refresh();

        Booking::factory()->count(3)->create([
            'trip_id'        => $trip->id,
            'trip_time'      => '05:30:00',
            'trip_date'      => self::TRIP_DATE,
            'booking_status' => 'Diproses',
        ]);

        $this->svc->gantiJam($trip->id, '07:00:00', $trip->version);

        $records = BookingNotificationPending::query()
            ->where('event_type', 'trip_time_changed')
            ->get();
        $this->assertCount(3, $records);
        $this->assertTrue($records->every(fn ($r) => $r->old_value === '05:30:00'));
        $this->assertTrue($records->every(fn ($r) => $r->new_value === '07:00:00'));
        $this->assertTrue($records->every(fn ($r) => $r->trip_id === $trip->id));
    }

    public function test_markTidakBerangkat_creates_trip_canceled_notification(): void
    {
        $trip = Trip::factory()->scheduled()->create([
            'trip_date' => self::TRIP_DATE,
            'trip_time' => '05:30:00',
            'sequence'  => 1,
        ])->refresh();

        Booking::factory()->count(2)->create([
            'trip_id'        => $trip->id,
            'trip_time'      => '05:30:00',
            'trip_date'      => self::TRIP_DATE,
            'booking_status' => 'Diproses',
        ]);

        $result = $this->svc->markTidakBerangkat($trip->id, $trip->version);

        $this->assertSame('tidak_berangkat', $result->status);

        $records = BookingNotificationPending::query()
            ->where('event_type', 'trip_canceled')
            ->get();
        $this->assertCount(2, $records);
        $this->assertTrue($records->every(fn ($r) => str_contains((string) $r->notification_message, 'DIBATALKAN')));
    }
}
