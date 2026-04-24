<?php

namespace Tests\Unit\Models;

use App\Models\BookingLevelBackup;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Unit tests untuk BookingLevelBackup model foundation (bug #42 Sesi A).
 *
 * Coverage:
 * - Casts `snapshot` array round-trip (JSON serialize → array hydrate)
 * - Casts `passengers_snapshot` array round-trip when present
 * - `passengers_snapshot` nullable path (rental booking tidak punya passengers)
 * - Relation `deletedByUser` resolves BelongsTo ke users (UUID FK)
 *
 * Out of scope (Sesi B): snapshot capture logic, integrasi DELETE flow, restore.
 */
class BookingLevelBackupTest extends TestCase
{
    use RefreshDatabase;

    public function test_snapshot_is_cast_to_array_automatically(): void
    {
        $backup = BookingLevelBackup::create([
            'booking_id' => 123,
            'booking_code' => 'DBK-260424-TEST',
            'final_version' => 5,
            'snapshot' => ['id' => 123, 'status' => 'Dibayar', 'amount' => 150000],
            'deleted_at' => now(),
        ]);

        $fresh = $backup->fresh();

        $this->assertIsArray($fresh->snapshot);
        $this->assertSame(123, $fresh->snapshot['id']);
        $this->assertSame('Dibayar', $fresh->snapshot['status']);
        $this->assertSame(150000, $fresh->snapshot['amount']);
    }

    public function test_passengers_snapshot_cast_to_array_when_present(): void
    {
        $backup = BookingLevelBackup::create([
            'booking_id' => 124,
            'booking_code' => 'RBK-260424-TEST',
            'final_version' => 3,
            'snapshot' => ['id' => 124],
            'passengers_snapshot' => [
                ['name' => 'Passenger A', 'seat' => '1A'],
                ['name' => 'Passenger B', 'seat' => '1B'],
            ],
            'deleted_at' => now(),
        ]);

        $fresh = $backup->fresh();

        $this->assertIsArray($fresh->passengers_snapshot);
        $this->assertCount(2, $fresh->passengers_snapshot);
        $this->assertSame('Passenger A', $fresh->passengers_snapshot[0]['name']);
    }

    public function test_passengers_snapshot_is_null_when_not_set(): void
    {
        // Rental booking tidak punya passengers — passengers_snapshot nullable.
        $backup = BookingLevelBackup::create([
            'booking_id' => 125,
            'booking_code' => 'RNT-260424-TEST',
            'final_version' => 1,
            'snapshot' => ['id' => 125],
            // passengers_snapshot omitted intentionally
            'deleted_at' => now(),
        ]);

        $fresh = $backup->fresh();

        $this->assertNull($fresh->passengers_snapshot);
    }

    public function test_deleted_by_user_relation_resolves_when_user_exists(): void
    {
        $admin = User::factory()->create(['role' => 'Admin']);

        $backup = BookingLevelBackup::create([
            'booking_id' => 126,
            'booking_code' => 'DBK-260424-REL',
            'final_version' => 2,
            'snapshot' => ['id' => 126],
            'deleted_by' => $admin->id,
            'deleted_at' => now(),
        ]);

        $resolved = $backup->deletedByUser;

        $this->assertNotNull($resolved);
        $this->assertSame($admin->id, $resolved->id);
        $this->assertSame('Admin', $resolved->role);
    }
}
