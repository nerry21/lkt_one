<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\BookingSeat;
use App\Models\PaymentAccount;
use App\Models\User;
use App\Services\SeatLockService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookingManagementPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_booking_management_page_shows_admin_table_structure(): void
    {
        // Column headers populated dynamically via JS/API (bookings-table rendered
        // client-side), jadi test hanya verify page-load accessibility + stable
        // structural markers yang exist di blade source.
        $this->actingAs(User::factory()->create([
            'role' => 'Admin',
        ]));

        $this->get('/dashboard/bookings')
            ->assertOk()
            ->assertSee('Data Pemesanan')
            ->assertSee('Tambah Pemesanan')
            ->assertSee('add-booking-btn', false);
    }

    public function test_admin_can_view_booking_detail_page(): void
    {
        $admin = User::factory()->create([
            'role' => 'Admin',
        ]);

        $booking = $this->createBooking([
            'booking_code' => 'RBK-260314-DET2',
            'invoice_number' => 'INV-260314-DET2',
            'ticket_number' => 'ETK-260314-DET2',
            'qr_token' => 'QRT-260314-DET2',
            'qr_code_value' => json_encode([
                'type' => 'regular_booking_ticket',
                'booking_code' => 'RBK-260314-DET2',
                'ticket_number' => 'ETK-260314-DET2',
                'qr_token' => 'QRT-260314-DET2',
            ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
            'driver_name' => null,
            'payment_method' => 'cash',
            'payment_reference' => 'CSH-260314-DET2',
            'payment_status' => 'Dibayar Tunai',
            'booking_status' => 'Diproses',
            'ticket_status' => 'Siap Terbit',
            'nominal_payment' => 300000,
        ]);

        $booking->passengers()->createMany([
            [
                'seat_no' => '1A',
                'name' => 'Budi Santoso',
                'phone' => '081234567890',
                'ticket_status' => 'Siap Terbit',
            ],
            [
                'seat_no' => '2A',
                'name' => 'Siti Aminah',
                'phone' => '081322223333',
                'ticket_status' => 'Siap Terbit',
            ],
        ]);

        $this->actingAs($admin)
            ->get('/dashboard/bookings/' . $booking->id)
            ->assertOk()
            ->assertSee('Detail Pemesanan')
            ->assertSee('Budi Santoso')
            ->assertSee('081234567890')
            ->assertSee('SKPD')
            ->assertSee('Pekanbaru')
            ->assertSee('1A, 2A')
            ->assertSee('2')
            ->assertSee('Reguler')
            ->assertSee('Rp 300.000')
            ->assertSee('Jl. Tuanku Tambusai No. 12 Pekanbaru')
            ->assertSee('Jl. Sudirman No. 8 Pekanbaru')
            ->assertSee('Cash')
            ->assertSee('Dibayar Tunai')
            ->assertSee('INV-260314-DET2')
            ->assertSee('ETK-260314-DET2')
            ->assertSee('Menunggu Penetapan Driver')
            ->assertSee('QR Code Tiket')
            ->assertSee('QRT-260314-DET2');
    }

    public function test_admin_can_fetch_booking_management_list(): void
    {
        $admin = User::factory()->create([
            'role' => 'Admin',
        ]);

        $booking = $this->createBooking([
            'booking_code' => 'RBK-260314-BOOK',
            'passenger_name' => 'Budi Santoso',
            'passenger_phone' => '081234567890',
            'from_city' => 'SKPD',
            'to_city' => 'Pekanbaru',
            'trip_time' => '08:00:00',
            'selected_seats' => ['1A', '2A'],
            'category' => 'Reguler',
            'total_amount' => 300000,
            'booking_status' => 'Diproses',
            'payment_status' => 'Dibayar Tunai',
        ]);

        $response = $this->actingAs($admin)->getJson('/api/bookings');

        $response->assertOk()
            ->assertJsonFragment([
                'id' => $booking->id,
                'booking_code' => 'RBK-260314-BOOK',
                'nama_pemesanan' => 'Budi Santoso',
                'phone' => '081234567890',
                'from_city' => 'SKPD',
                'to_city' => 'Pekanbaru',
                'selected_seats_label' => '1A, 2A',
                'service_type' => 'Reguler',
                'booking_status' => 'Diproses',
                'payment_status' => 'Dibayar Tunai',
            ]);
    }

    public function test_admin_can_fetch_booking_management_count_with_search(): void
    {
        $admin = User::factory()->create([
            'role' => 'Admin',
        ]);

        $this->createBooking([
            'passenger_name' => 'Budi Santoso',
            'booking_code' => 'RBK-260314-A001',
        ]);

        $this->createBooking([
            'passenger_name' => 'Siti Aminah',
            'booking_code' => 'RBK-260314-A002',
        ]);

        $this->actingAs($admin)
            ->getJson('/api/bookings/count?search=Budi')
            ->assertOk()
            ->assertJson([
                'count' => 1,
            ]);
    }

    public function test_admin_can_view_booking_detail_payload(): void
    {
        $admin = User::factory()->create([
            'role' => 'Admin',
        ]);

        $booking = $this->createBooking([
            'booking_code' => 'RBK-260314-DET1',
            'invoice_number' => 'INV-260314-DET1',
            'ticket_number' => 'ETK-260314-DET1',
            'passenger_name' => 'Budi Santoso',
            'passenger_phone' => '081234567890',
            'pickup_location' => 'Jl. Tuanku Tambusai No. 12 Pekanbaru',
            'dropoff_location' => 'Jl. Sudirman No. 8 Pekanbaru',
            'driver_name' => null,
            'payment_method' => 'cash',
            'payment_reference' => 'CSH-260314-DET1',
            'payment_status' => 'Dibayar Tunai',
            'booking_status' => 'Diproses',
        ]);

        $booking->passengers()->createMany([
            [
                'seat_no' => '1A',
                'name' => 'Budi Santoso',
                'phone' => '081234567890',
                'ticket_status' => 'Siap Terbit',
            ],
            [
                'seat_no' => '2A',
                'name' => 'Siti Aminah',
                'phone' => '081322223333',
                'ticket_status' => 'Siap Terbit',
            ],
        ]);

        $this->actingAs($admin)
            ->getJson('/api/bookings/' . $booking->id)
            ->assertOk()
            ->assertJsonFragment([
                'id' => $booking->id,
                'invoice_number' => 'INV-260314-DET1',
                'ticket_number' => 'ETK-260314-DET1',
                'driver_name' => 'Menunggu Penetapan Driver',
                'payment_method' => 'Cash',
                'pickup_location' => 'Jl. Tuanku Tambusai No. 12 Pekanbaru',
                'dropoff_location' => 'Jl. Sudirman No. 8 Pekanbaru',
            ])
            ->assertJsonFragment([
                'seat_no' => '1A',
                'name' => 'Budi Santoso',
                'phone' => '081234567890',
            ])
            ->assertJsonFragment([
                'seat_no' => '2A',
                'name' => 'Siti Aminah',
                'phone' => '081322223333',
            ]);
    }

    public function test_admin_can_create_booking_from_booking_management(): void
    {
        $admin = User::factory()->create([
            'role' => 'Admin',
        ]);

        $payload = $this->bookingPayload();

        $response = $this->actingAs($admin)->postJson('/api/bookings', $payload);

        $response->assertCreated()
            ->assertJsonFragment([
                'booking_for' => 'Untuk Diri Sendiri',
                'from_city' => 'SKPD',
                'to_city' => 'Pekanbaru',
                'payment_status' => 'Belum Bayar',
                'booking_status' => 'Draft',
            ])
            ->assertJsonFragment([
                'seat_no' => '1A',
                'name' => 'Budi Santoso',
                'phone' => '081234567890',
            ]);

        $this->assertDatabaseHas('bookings', [
            'booking_for' => 'Untuk Diri Sendiri',
            'passenger_name' => 'Budi Santoso',
            'passenger_phone' => '081234567890',
            'from_city' => 'SKPD',
            'to_city' => 'Pekanbaru',
            'payment_status' => 'Belum Bayar',
            'booking_status' => 'Draft',
        ]);

        $this->assertDatabaseHas('booking_passengers', [
            'seat_no' => '1A',
            'name' => 'Budi Santoso',
            'phone' => '081234567890',
        ]);
    }

    public function test_admin_can_update_booking_from_booking_management(): void
    {
        $admin = User::factory()->create([
            'role' => 'Admin',
        ]);

        $booking = $this->createBooking([
            'payment_method' => null,
            'payment_status' => 'Belum Bayar',
            'booking_status' => 'Draft',
        ]);

        $booking->passengers()->createMany([
            [
                'seat_no' => '1A',
                'name' => 'Budi Santoso',
                'phone' => '081234567890',
                'ticket_status' => 'Draft',
            ],
            [
                'seat_no' => '2A',
                'name' => 'Siti Aminah',
                'phone' => '081322223333',
                'ticket_status' => 'Draft',
            ],
        ]);

        $payload = $this->bookingPayload([
            'booking_for' => 'Untuk Orang Lain',
            'to_city' => 'Kabun',
            'passenger_count' => 3,
            'selected_seats' => ['1A', '2A', '3A'],
            'passengers' => [
                [
                    'seat_no' => '1A',
                    'name' => 'Rudi Hartono',
                    'phone' => '081200001111',
                ],
                [
                    'seat_no' => '2A',
                    'name' => 'Sari Wulandari',
                    'phone' => '081200002222',
                ],
                [
                    'seat_no' => '3A',
                    'name' => 'Dina Permata',
                    'phone' => '081200003333',
                ],
            ],
            'payment_method' => 'cash',
            'payment_status' => 'Dibayar Tunai',
            'booking_status' => 'Diproses',
        ]);

        $response = $this->actingAs($admin)->putJson('/api/bookings/' . $booking->id, $payload);

        $response->assertOk()
            ->assertJsonFragment([
                'id' => $booking->id,
                'booking_for' => 'Untuk Orang Lain',
                'to_city' => 'Kabun',
                'payment_status' => 'Dibayar Tunai',
                'booking_status' => 'Diproses',
                'selected_seats_label' => '1A, 2A, 3A',
            ]);

        $booking->refresh();

        $this->assertSame('Rudi Hartono', $booking->passenger_name);
        $this->assertSame('081200001111', $booking->passenger_phone);
        $this->assertSame('cash', $booking->payment_method);
        $this->assertNotNull($booking->invoice_number);
        $this->assertNotNull($booking->ticket_number);
        $this->assertNotNull($booking->payment_reference);

        $this->assertDatabaseHas('booking_passengers', [
            'booking_id' => $booking->id,
            'seat_no' => '3A',
            'name' => 'Dina Permata',
            'phone' => '081200003333',
        ]);
    }

    public function test_admin_can_delete_booking_from_booking_management(): void
    {
        $admin = User::factory()->create([
            'role' => 'Admin',
        ]);

        $booking = $this->createBooking();

        $booking->passengers()->create([
            'seat_no' => '1A',
            'name' => 'Budi Santoso',
            'phone' => '081234567890',
            'ticket_status' => 'Draft',
        ]);

        $this->actingAs($admin)
            ->deleteJson('/api/bookings/' . $booking->id)
            ->assertOk()
            ->assertJson([
                'message' => 'Data pemesanan berhasil dihapus',
            ]);

        $this->assertDatabaseMissing('bookings', [
            'id' => $booking->id,
        ]);

        $this->assertDatabaseMissing('booking_passengers', [
            'booking_id' => $booking->id,
        ]);
    }

    public function test_admin_cannot_create_booking_with_invalid_seat_count(): void
    {
        $admin = User::factory()->create([
            'role' => 'Admin',
        ]);

        $payload = $this->bookingPayload([
            'selected_seats' => ['1A'],
            'passengers' => [
                [
                    'seat_no' => '1A',
                    'name' => 'Budi Santoso',
                    'phone' => '081234567890',
                ],
            ],
        ]);

        $this->actingAs($admin)
            ->postJson('/api/bookings', $payload)
            ->assertStatus(422)
            ->assertJsonValidationErrors(['selected_seats']);
    }

    public function test_non_admin_cannot_access_booking_management_api(): void
    {
        $user = User::factory()->create([
            'role' => 'User',
        ]);

        $this->actingAs($user)
            ->getJson('/api/bookings')
            ->assertForbidden();

        $this->actingAs($user)
            ->postJson('/api/bookings', $this->bookingPayload())
            ->assertForbidden();

        $this->actingAs($user)
            ->get('/dashboard/bookings')
            ->assertOk()
            ->assertSee('Data Pemesanan')
            ->assertSee('Halaman ini hanya dapat diakses oleh Admin atau Super Admin.');
    }

    public function test_non_admin_cannot_access_booking_detail_page(): void
    {
        $user = User::factory()->create([
            'role' => 'User',
        ]);

        $booking = $this->createBooking();

        $this->actingAs($user)
            ->get('/dashboard/bookings/' . $booking->id)
            ->assertForbidden();
    }

    public function test_validatePayment_action_lunas_writes_Dibayar_not_Lunas(): void
    {
        // Bug #35 fix regression guard: admin validatePayment action='lunas' harus write
        // payment_status='Dibayar' (canonical) — BUKAN 'Lunas' (legacy, retired).
        // Plus bundled bug #31 regression: action='lunas' branch trigger promoteToHard.
        $admin = User::factory()->create(['role' => 'Admin']);

        $booking = $this->createBooking([
            'booking_code' => 'RBK-260418-LUN1',
            'payment_method' => 'transfer',
            'payment_status' => 'Menunggu Verifikasi',
            'booking_status' => 'Menunggu Verifikasi Pembayaran',
            'selected_seats' => ['1A', '2A'],
            'trip_date' => '2026-04-20',
            'trip_time' => '08:00:00',
        ]);

        $lockSvc = $this->app->make(SeatLockService::class);
        $slot = [
            'trip_date' => '2026-04-20',
            'trip_time' => '08:00:00',
            'from_city' => 'SKPD',
            'to_city' => 'Pekanbaru',
            'armada_index' => 1,
        ];
        $lockSvc->lockSeats($booking, [$slot], ['1A', '2A'], 'soft');

        $this->assertSame(
            2,
            BookingSeat::query()->where('booking_id', $booking->id)->active()->softLocks()->count(),
            'Pre-condition: 2 soft seat locks must exist before admin validation.',
        );

        $this->actingAs($admin)
            ->patchJson('/api/bookings/' . $booking->id . '/validate-payment', [
                'action' => 'lunas',
            ])
            ->assertOk()
            ->assertJsonFragment([
                'payment_status' => 'Dibayar',
                'booking_status' => 'Diproses',
            ]);

        // Bug #35 assertion: payment_status persisted as 'Dibayar' (canonical, NOT 'Lunas')
        $booking->refresh();
        $this->assertSame('Dibayar', $booking->payment_status);
        $this->assertNotSame('Lunas', $booking->payment_status);

        // Bug #31 assertion: seats promoted ke hard setelah admin konfirmasi lunas
        $hardCount = BookingSeat::query()->where('booking_id', $booking->id)->active()->hardLocks()->count();
        $this->assertSame(2, $hardCount, 'All 2 active seats must be promoted to hard post-validation (bug #31 regression).');
        $this->assertSame(0, BookingSeat::query()->where('booking_id', $booking->id)->active()->softLocks()->count());
    }

    private function bookingPayload(array $overrides = []): array
    {
        $transferAccount = PaymentAccount::query()
            ->where('channel_type', 'transfer')
            ->orderBy('sort_order')
            ->first();

        return array_merge([
            'booking_for' => 'Untuk Diri Sendiri',
            'category' => 'Reguler',
            'from_city' => 'SKPD',
            'to_city' => 'Pekanbaru',
            'trip_date' => now()->addDay()->toDateString(),
            'trip_time' => '08:00',
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
            'bank_account_code' => $transferAccount?->code ?? '',
            'notes' => 'Booking dibuat dari dashboard admin.',
        ], $overrides);
    }

    private function createBooking(array $overrides = []): Booking
    {
        return Booking::query()->create(array_merge([
            'booking_code' => 'RBK-260314-TEST',
            'category' => 'Reguler',
            'from_city' => 'SKPD',
            'to_city' => 'Pekanbaru',
            'trip_date' => now()->toDateString(),
            'trip_time' => '08:00:00',
            'booking_for' => 'Untuk Diri Sendiri',
            'passenger_name' => 'Budi Santoso',
            'passenger_phone' => '081234567890',
            'passenger_count' => 2,
            'pickup_location' => 'Jl. Tuanku Tambusai No. 12 Pekanbaru',
            'dropoff_location' => 'Jl. Sudirman No. 8 Pekanbaru',
            'selected_seats' => ['1A', '2A'],
            'price_per_seat' => 150000,
            'total_amount' => 300000,
            'route_label' => 'SKPD - Pekanbaru',
            'payment_status' => 'Belum Bayar',
            'booking_status' => 'Draft',
            'ticket_status' => 'Draft',
            'notes' => 'Booking test untuk manajemen pemesanan.',
        ], $overrides));
    }
}
