<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

/**
 * E2E HTTP tests for optimistic locking conflict (bug #30 phase 2).
 *
 * Cover all 4 admin mutation endpoints when client submits stale version:
 *   1. PUT    /api/bookings/{id}                       (body: version)
 *   2. DELETE /api/bookings/{id}?version=N             (query string)
 *   3. PATCH  /api/bookings/{id}/validate-payment      (body: version)
 *   4. PATCH  /api/bookings/{id}/departure-status      (body: version)
 *
 * Stale-version simulation: out-of-band DB::table()->update() bumps version
 * column, mimicking concurrent admin who already saved (version: 0 → 5).
 * Client request still carries old version (0) → atomic pre-check fails →
 * BookingVersionConflictException → 409 JSON response.
 *
 * Each test verifies:
 *   - HTTP 409 status code
 *   - JSON body shape (error key, booking_id, expected_version, message)
 *   - DB unchanged atomicity (no partial mutation despite 409 path)
 *
 * First 409 HTTP precedent in tests/Feature/. Also first HTTP coverage
 * for departure-status endpoint (closes prior test gap).
 *
 * Sibling unit tests:
 *   - tests/Unit/Models/BookingTest.php (updateWithVersionCheck atomicity)
 *   - tests/Unit/Exceptions/BookingVersionConflictExceptionTest.php (render)
 *
 * Reference: docs/bug-30-design.md §6 + §11
 */
class BookingVersionConflictHttpTest extends TestCase
{
    use RefreshDatabase;

    /**
     * PUT /api/bookings/{id} with stale body.version returns 409 + leaves booking unmodified.
     */
    public function test_put_update_returns_409_with_conflict_body_when_version_stale(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $booking = $this->makeBooking();
        $staleVersion = $booking->version; // 0 from factory

        // Out-of-band concurrent bump simulating another admin already saved.
        DB::table('bookings')->where('id', $booking->id)->update(['version' => 5]);

        $payload = $this->basePutPayload([
            'version' => $staleVersion,
            'booking_for' => 'Untuk Orang Lain', // attempt to mutate
            // Note: keeping route SKPD→Pekanbaru since that's the validated route.
            // Mutation proof comes from booking_for flip attempt + version check rejection.
        ]);

        $response = $this->actingAs($admin)
            ->putJson('/api/bookings/' . $booking->id, $payload);

        $response->assertStatus(409)
            ->assertJson([
                'error' => 'booking_version_conflict',
                'booking_id' => $booking->id,
                'expected_version' => $staleVersion,
            ])
            ->assertJsonStructure(['error', 'message', 'booking_id', 'expected_version']);

        // DB-unchanged proof: booking_for and to_city must NOT have mutated.
        $fresh = $booking->fresh();
        $this->assertSame('Untuk Diri Sendiri', $fresh->booking_for, 'booking_for must remain pre-409 value');
        $this->assertSame('Pekanbaru', $fresh->to_city, 'to_city must remain pre-409 value');
        $this->assertSame(5, $fresh->version, 'version must remain at out-of-band bump (no further change)');
    }

    /**
     * DELETE /api/bookings/{id}?version=N with stale query returns 409 + booking still exists.
     */
    public function test_delete_returns_409_when_query_version_stale(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $booking = $this->makeBooking();
        $staleVersion = $booking->version; // 0

        DB::table('bookings')->where('id', $booking->id)->update(['version' => 5]);

        $response = $this->actingAs($admin)
            ->deleteJson('/api/bookings/' . $booking->id . '?version=' . $staleVersion);

        $response->assertStatus(409)
            ->assertJson([
                'error' => 'booking_version_conflict',
                'booking_id' => $booking->id,
                'expected_version' => $staleVersion,
            ])
            ->assertJsonStructure(['error', 'message', 'booking_id', 'expected_version']);

        // DB-unchanged proof: booking row still exists.
        $this->assertDatabaseHas('bookings', ['id' => $booking->id]);
    }

    /**
     * PATCH /api/bookings/{id}/validate-payment with stale body.version returns 409 +
     * payment_status / payment_validated_at unchanged.
     */
    public function test_validate_payment_returns_409_when_body_version_stale(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $booking = $this->makeBooking([
            'payment_method' => 'transfer',
            'payment_status' => 'Belum Dibayar',
        ]);
        $staleVersion = $booking->version;

        DB::table('bookings')->where('id', $booking->id)->update(['version' => 5]);

        $response = $this->actingAs($admin)
            ->patchJson('/api/bookings/' . $booking->id . '/validate-payment', [
                'action' => 'lunas',
                'version' => $staleVersion,
            ]);

        $response->assertStatus(409)
            ->assertJson([
                'error' => 'booking_version_conflict',
                'booking_id' => $booking->id,
                'expected_version' => $staleVersion,
            ])
            ->assertJsonStructure(['error', 'message', 'booking_id', 'expected_version']);

        // DB-unchanged proof: payment_status must not have flipped to 'Dibayar'.
        $fresh = $booking->fresh();
        $this->assertSame('Belum Dibayar', $fresh->payment_status, 'payment_status must remain unchanged');
        $this->assertNull($fresh->payment_validated_at, 'payment_validated_at must remain null');
    }

    /**
     * PATCH /api/bookings/{id}/departure-status with stale body.version returns 409 +
     * booking_status unchanged. Also first HTTP coverage for this endpoint.
     */
    public function test_departure_status_returns_409_when_body_version_stale(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $booking = $this->makeBooking([
            'booking_status' => 'Diproses',
        ]);
        $staleVersion = $booking->version;

        DB::table('bookings')->where('id', $booking->id)->update(['version' => 5]);

        $response = $this->actingAs($admin)
            ->patchJson('/api/bookings/' . $booking->id . '/departure-status', [
                'booking_status' => 'Berangkat',
                'version' => $staleVersion,
            ]);

        $response->assertStatus(409)
            ->assertJson([
                'error' => 'booking_version_conflict',
                'booking_id' => $booking->id,
                'expected_version' => $staleVersion,
            ])
            ->assertJsonStructure(['error', 'message', 'booking_id', 'expected_version']);

        // DB-unchanged proof: booking_status must remain 'Diproses', not flip to 'Berangkat'.
        $fresh = $booking->fresh();
        $this->assertSame('Diproses', $fresh->booking_status, 'booking_status must remain unchanged');
    }

    /**
     * Minimal Booking factory wrapper. Defaults match BookingFactory::definition()
     * with optional override merge. Returns booking with version=0 (refreshed
     * via afterCreating hook).
     */

    /**
     * Regression guard for bug #46: DELETE without version query string returns 422.
     *
     * Scenario: frontend openDeleteDialog caller forgot to lookup version from
     * state.bookings (line 1235 index.js missed version field at Step 12 wiring).
     * Result: client DELETE request URL omits ?version=N → BookingUpsertRequest
     * version validation rule fires → 422 Unprocessable Entity.
     *
     * This test guards against frontend regression by asserting backend correctly
     * rejects version-less DELETE with explicit 422 error.
     */
    public function test_delete_without_version_query_returns_422(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $booking = $this->makeBooking();

        $response = $this->actingAs($admin)
            ->deleteJson('/api/bookings/' . $booking->id);

        $response->assertStatus(422);

        // DB-unchanged proof: booking row still exists.
        $this->assertDatabaseHas('bookings', ['id' => $booking->id]);
    }

    private function makeBooking(array $overrides = []): Booking
    {
        return Booking::factory()->create(array_merge([
            'booking_for' => 'Untuk Diri Sendiri',
            'from_city' => 'SKPD',
            'to_city' => 'Pekanbaru',
            'trip_date' => now()->addDay()->toDateString(),
            'trip_time' => '07:00:00',
            'pickup_location' => 'Jl. Tuanku Tambusai No. 12 Pekanbaru',
            'dropoff_location' => 'Jl. Sudirman No. 8 Pekanbaru',
            'passenger_count' => 2,
            'selected_seats' => ['1A', '2A'],
        ], $overrides));
    }

    /**
     * Minimal PUT payload — only fields strictly required by UpdateBookingRequest
     * to reach the version-check codepath. Override merges last.
     *
     * Mirrors shape from BookingManagementPageTest::bookingPayload() but trimmed
     * since this test only proves 409 path, not full update semantics.
     */
    private function basePutPayload(array $overrides = []): array
    {
        return array_merge([
            'booking_for' => 'Untuk Diri Sendiri',
            'category' => 'Reguler',
            'from_city' => 'SKPD',
            'to_city' => 'Pekanbaru',
            'trip_date' => now()->addDay()->toDateString(),
            'trip_time' => '07:00',
            'passenger_count' => 2,
            'driver_name' => '',
            'pickup_location' => 'Jl. Tuanku Tambusai No. 12 Pekanbaru',
            'dropoff_location' => 'Jl. Sudirman No. 8 Pekanbaru',
            'selected_seats' => ['1A', '2A'],
            'passengers' => [
                [
                    'seat_no' => '1A',
                    'name' => 'Budi Santoso',
                    'phone' => '081234567890',
                ],
                [
                    'seat_no' => '2A',
                    'name' => 'Siti Aminah',
                    'phone' => '081322223333',
                ],
            ],
            'payment_method' => '',
            'payment_status' => 'Belum Bayar',
            'booking_status' => 'Draft',
            'bank_account_code' => '',
            'notes' => 'Booking dibuat dari dashboard admin.',
            'version' => 0,
            // Sesi 44D PR #1D: SKPD↔PKB butuh route_via eksplisit (HUB + ambigu).
            'route_via' => 'BANGKINANG',
        ], $overrides);
    }
}
