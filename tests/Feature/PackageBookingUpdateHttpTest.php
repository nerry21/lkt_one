<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

/**
 * E2E HTTP tests for PUT /api/bookings/quick-package/{booking} (bug #49).
 *
 * Covers 5 paths:
 *   1. Happy update — 200 + fields mutated + version incremented
 *   2. Missing version field — 422 validation error
 *   3. Stale version — 409 conflict (bug #30 Phase 2 pattern)
 *   4. Non-Paket category guard — 422 reject Reguler bookings
 *   5. Invalid input — 422 validation (sender_name missing)
 *
 * Reuses pattern from BookingVersionConflictHttpTest (existing Phase 2 sibling).
 *
 * Reference: docs/audit-findings.md bug #49
 */
class PackageBookingUpdateHttpTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Happy path: admin can update Paket booking, version increments,
     * fields mutated correctly, notes JSON re-encoded.
     */
    public function test_admin_can_update_package_booking_happy_path(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $booking = $this->makePackageBooking();

        $payload = $this->basePutPayload([
            'version' => $booking->version,
            'sender_name' => 'Budi Updated',
            'recipient_name' => 'Penerima Updated',
            'item_name' => 'Dokumen Updated',
            'item_qty' => 3,
            'fare_amount' => 200000,
        ]);

        $response = $this->actingAs($admin)
            ->putJson('/api/bookings/quick-package/' . $booking->id, $payload);

        $response->assertStatus(200)
            ->assertJsonStructure(['id', 'booking_code', 'invoice_number', 'invoice_download_url', 'version']);

        $fresh = $booking->fresh();
        $this->assertSame('Budi Updated', $fresh->passenger_name, 'passenger_name (sender) should mutate');
        $this->assertSame(200000, (int) $fresh->price_per_seat, 'price_per_seat should reflect new fare_amount');
        $this->assertSame(600000, (int) $fresh->total_amount, 'total_amount = 200000 * 3');
        $this->assertGreaterThan($booking->version, $fresh->version, 'version must increment');

        // notes JSON re-encoded with new recipient + item
        $notes = json_decode((string) $fresh->notes, true);
        $this->assertSame('Penerima Updated', $notes['recipient_name']);
        $this->assertSame('Dokumen Updated', $notes['item_name']);
        $this->assertSame(3, $notes['item_qty']);
    }

    /**
     * Missing version field in request body returns 422 validation error.
     */
    public function test_update_requires_version_field(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $booking = $this->makePackageBooking();

        $payload = $this->basePutPayload();
        unset($payload['version']);

        $response = $this->actingAs($admin)
            ->putJson('/api/bookings/quick-package/' . $booking->id, $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['version']);

        $this->assertSame($booking->passenger_name, $booking->fresh()->passenger_name, 'booking must not mutate');
    }

    /**
     * Stale version returns 409 conflict + leaves booking unmodified (bug #30 pattern).
     */
    public function test_update_rejects_stale_version_with_409(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $booking = $this->makePackageBooking();
        $staleVersion = $booking->version;

        // Out-of-band concurrent bump simulating another admin already saved.
        DB::table('bookings')->where('id', $booking->id)->update(['version' => 7]);

        $payload = $this->basePutPayload([
            'version' => $staleVersion,
            'sender_name' => 'Attempted Mutation',
        ]);

        $response = $this->actingAs($admin)
            ->putJson('/api/bookings/quick-package/' . $booking->id, $payload);

        $response->assertStatus(409)
            ->assertJson([
                'error' => 'booking_version_conflict',
                'booking_id' => $booking->id,
                'expected_version' => $staleVersion,
            ]);

        // DB-unchanged proof
        $fresh = $booking->fresh();
        $this->assertSame($booking->passenger_name, $fresh->passenger_name, 'passenger_name must not mutate on 409');
        $this->assertSame(7, (int) $fresh->version, 'version should remain at out-of-band bump');
    }

    /**
     * Non-Paket category (Reguler) returns 422 with category guard message.
     */
    public function test_update_rejects_non_paket_category(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        // Factory default is 'Reguler' - no override for this test
        $regularBooking = Booking::factory()->create([
            'passenger_name' => 'Reguler Passenger',
            'trip_time' => '08:00',
        ]);

        $payload = $this->basePutPayload([
            'version' => $regularBooking->version,
        ]);

        $response = $this->actingAs($admin)
            ->putJson('/api/bookings/quick-package/' . $regularBooking->id, $payload);

        $response->assertStatus(422);
        $this->assertStringContainsString('Paket', $response->json('message'), 'response should mention Paket category');

        // DB-unchanged proof
        $this->assertSame('Reguler Passenger', $regularBooking->fresh()->passenger_name);
    }

    /**
     * Missing required field (sender_name) returns 422 validation error.
     */
    public function test_update_rejects_invalid_input(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);
        $booking = $this->makePackageBooking();

        $payload = $this->basePutPayload([
            'version' => $booking->version,
            'sender_name' => '',  // required field — empty triggers validation
        ]);

        $response = $this->actingAs($admin)
            ->putJson('/api/bookings/quick-package/' . $booking->id, $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['sender_name']);
    }

    /**
     * Helper: create a Paket booking with realistic notes JSON.
     */
    private function makePackageBooking(array $overrides = []): Booking
    {
        $notes = json_encode([
            'recipient_name' => 'Budi Penerima',
            'recipient_phone' => '081234567890',
            'item_name' => 'Dokumen Awal',
            'item_qty' => 1,
            'package_size' => 'Kecil',
        ], JSON_UNESCAPED_UNICODE);

        return Booking::factory()->create(array_merge([
            'category' => 'Paket',
            'booking_for' => 'Kecil',
            'passenger_name' => 'Pengirim Awal',
            'passenger_phone' => '081299999999',
            'pickup_location' => 'Jl. Pengirim 123',
            'dropoff_location' => 'Jl. Penerima 456',
            'from_city' => 'Pekanbaru',
            'to_city' => 'Pasirpengaraian',
            'trip_date' => '2026-04-25',
            'trip_time' => '08:00',
            'price_per_seat' => 100000,
            'total_amount' => 100000,
            'passenger_count' => 1,
            'selected_seats' => [],
            'notes' => $notes,
        ], $overrides));
    }

    /**
     * Minimal PUT payload for /bookings/quick-package/{id}.
     */
    private function basePutPayload(array $overrides = []): array
    {
        return array_merge([
            'version' => 0,
            'trip_date' => '2026-04-25',
            'trip_time' => '08:00',
            'from_city' => 'Pekanbaru',
            'to_city' => 'Pasirpengaraian',
            'armada_index' => 1,
            'sender_name' => 'Pengirim Default',
            'sender_phone' => '081299999999',
            'sender_address' => 'Jl. Pengirim 123',
            'recipient_name' => 'Penerima Default',
            'recipient_phone' => '081234567890',
            'recipient_address' => 'Jl. Penerima 456',
            'item_name' => 'Dokumen',
            'item_qty' => 1,
            'package_size' => 'Kecil',
            'seat_code' => '',
            'fare_amount' => 100000,
            'additional_fare' => 0,
            'payment_method' => null,
            'payment_status' => 'Belum Bayar',
            'bank_account_code' => '',
        ], $overrides);
    }
}
