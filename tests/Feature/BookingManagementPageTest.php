<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\PaymentAccount;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookingManagementPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_booking_management_page_shows_admin_table_structure(): void
    {
        $this->actingAs(User::factory()->create([
            'role' => 'Admin',
        ]));

        $this->get('/dashboard/bookings')
            ->assertOk()
            ->assertSee('Data Pemesanan')
            ->assertSee('Nama Pemesanan')
            ->assertSee('No HP')
            ->assertSee('Kota Asal')
            ->assertSee('Kota Tujuan')
            ->assertSee('Tanggal Keberangkatan')
            ->assertSee('Waktu Keberangkatan')
            ->assertSee('Pilih Kursi')
            ->assertSee('Jumlah Penumpang')
            ->assertSee('Jenis Layanan')
            ->assertSee('Biaya')
            ->assertSee('Alamat')
            ->assertSee('Aksi')
            ->assertSee('Tambah Pemesanan');
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
