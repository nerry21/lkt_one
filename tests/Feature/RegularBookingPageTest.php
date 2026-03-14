<?php

namespace Tests\Feature;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegularBookingPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_regular_booking_page_shows_initial_form_fields(): void
    {
        $this->actingAs(User::factory()->create());

        $this->get('/dashboard/regular-bookings')
            ->assertOk()
            ->assertSee('Pemesanan Reguler')
            ->assertSee('Untuk Diri Sendiri')
            ->assertSee('Untuk Orang Lain')
            ->assertSee('Asal Penjemputan')
            ->assertSee('Tujuan')
            ->assertSee('Ongkos / Tarif per Penumpang')
            ->assertSee('Jam Keberangkatan')
            ->assertSee('Jumlah Penumpang')
            ->assertSee('Alamat Penjemputan')
            ->assertSee('Alamat Pengantaran')
            ->assertSee('Selanjutnya');
    }

    public function test_regular_booking_information_is_saved_to_session_and_redirects_to_seat_step(): void
    {
        $this->actingAs(User::factory()->create());

        $response = $this->post('/dashboard/regular-bookings/information', [
            'booking_type' => 'self',
            'pickup_location' => 'SKPD',
            'destination_location' => 'Pekanbaru',
            'departure_time' => '08:00',
            'passenger_count' => 3,
            'pickup_address' => 'Jl. Tuanku Tambusai No. 12 Pekanbaru',
            'dropoff_address' => 'Jl. Sudirman No. 8 Pekanbaru',
        ]);

        $response->assertRedirect('/dashboard/regular-bookings/seats');
        $response->assertSessionHas('regular_booking.information.booking_type', 'self');
        $response->assertSessionHas('regular_booking.information.pickup_location', 'SKPD');
        $response->assertSessionHas('regular_booking.information.destination_location', 'Pekanbaru');
        $response->assertSessionHas('regular_booking.information.departure_time', '08:00');
        $response->assertSessionHas('regular_booking.information.passenger_count', 3);
        $response->assertSessionHas('regular_booking.information.pickup_address', 'Jl. Tuanku Tambusai No. 12 Pekanbaru');
        $response->assertSessionHas('regular_booking.information.dropoff_address', 'Jl. Sudirman No. 8 Pekanbaru');
        $response->assertSessionHas('regular_booking.information.fare_amount', 150000);
        $response->assertSessionHas('regular_booking.information', function (array $draft): bool {
            return array_keys($draft) === [
                'booking_type',
                'pickup_location',
                'destination_location',
                'departure_time',
                'passenger_count',
                'pickup_address',
                'dropoff_address',
                'fare_amount',
                'selected_seats',
                'passengers',
            ];
        });
    }

    public function test_regular_booking_rejects_same_origin_and_destination(): void
    {
        $this->actingAs(User::factory()->create());

        $this->from('/dashboard/regular-bookings')
            ->post('/dashboard/regular-bookings/information', [
                'booking_type' => 'self',
                'pickup_location' => 'SKPD',
                'destination_location' => 'SKPD',
                'departure_time' => '08:00',
                'passenger_count' => 2,
                'pickup_address' => 'Jl. Tuanku Tambusai No. 12 Pekanbaru',
                'dropoff_address' => 'Jl. Sudirman No. 8 Pekanbaru',
            ])
            ->assertRedirect('/dashboard/regular-bookings')
            ->assertSessionHasErrors([
                'destination_location' => 'Tujuan harus berbeda dengan asal penjemputan.',
            ]);
    }

    public function test_regular_booking_rejects_unavailable_route_combination(): void
    {
        $this->actingAs(User::factory()->create());

        $this->from('/dashboard/regular-bookings')
            ->post('/dashboard/regular-bookings/information', [
                'booking_type' => 'other',
                'pickup_location' => 'Kabun',
                'destination_location' => 'Tandun',
                'departure_time' => '16:00',
                'passenger_count' => 1,
                'pickup_address' => 'Jl. Raya Kabun Blok A Nomor 10',
                'dropoff_address' => 'Jl. Tandun Permai Nomor 20',
            ])
            ->assertRedirect('/dashboard/regular-bookings')
            ->assertSessionHasErrors([
                'destination_location' => 'Rute yang Anda pilih saat ini belum tersedia. Silakan pilih kombinasi asal dan tujuan lain.',
            ]);
    }

    public function test_regular_booking_seat_step_requires_saved_information(): void
    {
        $this->actingAs(User::factory()->create());

        $this->get('/dashboard/regular-bookings/seats')
            ->assertRedirect('/dashboard/regular-bookings');
    }

    public function test_regular_booking_seat_page_shows_vehicle_seat_layout(): void
    {
        $this->actingAs(User::factory()->create());

        $this->withSession([
            'regular_booking.information' => $this->makeDraft([
                'passenger_count' => 4,
            ]),
        ])->get('/dashboard/regular-bookings/seats')
            ->assertOk()
            ->assertSee('Penampang Kursi Mobil')
            ->assertSee('Supir')
            ->assertSee('1A')
            ->assertSee('2A')
            ->assertSee('3A')
            ->assertSee('4A')
            ->assertSee('5A')
            ->assertDontSee('data-seat-code="2B"', false)
            ->assertSee('Lanjut ke Data Penumpang');
    }

    public function test_regular_booking_seat_page_only_shows_2b_for_six_passengers(): void
    {
        $this->actingAs(User::factory()->create());

        $this->withSession([
            'regular_booking.information' => $this->makeDraft([
                'passenger_count' => 6,
            ]),
        ])->get('/dashboard/regular-bookings/seats')
            ->assertOk()
            ->assertSee('data-seat-code="2B"', false)
            ->assertSee('Opsional');
    }

    public function test_regular_booking_seat_selection_is_saved_to_session_and_redirects_to_passenger_step(): void
    {
        $this->actingAs(User::factory()->create());

        $response = $this->withSession([
            'regular_booking.information' => $this->makeDraft([
                'passenger_count' => 3,
            ]),
        ])->post('/dashboard/regular-bookings/seats', [
            'seat_codes' => ['1A', '2A', '3A'],
        ]);

        $response->assertRedirect('/dashboard/regular-bookings/passengers');
        $response->assertSessionHas('regular_booking.information.selected_seats', ['1A', '2A', '3A']);
    }

    public function test_regular_booking_rejects_seat_selection_that_does_not_match_passenger_count(): void
    {
        $this->actingAs(User::factory()->create());

        $this->from('/dashboard/regular-bookings/seats')
            ->withSession([
                'regular_booking.information' => $this->makeDraft([
                    'passenger_count' => 4,
                ]),
            ])->post('/dashboard/regular-bookings/seats', [
                'seat_codes' => ['1A', '2A', '3A'],
            ])
            ->assertRedirect('/dashboard/regular-bookings/seats')
            ->assertSessionHasErrors([
                'seat_codes' => 'Pilih tepat 4 kursi sesuai jumlah penumpang sebelum melanjutkan.',
            ]);
    }

    public function test_regular_booking_rejects_2b_selection_when_passenger_count_is_below_six(): void
    {
        $this->actingAs(User::factory()->create());

        $this->from('/dashboard/regular-bookings/seats')
            ->withSession([
                'regular_booking.information' => $this->makeDraft([
                    'passenger_count' => 5,
                ]),
            ])->post('/dashboard/regular-bookings/seats', [
                'seat_codes' => ['1A', '2A', '2B', '3A', '4A'],
            ])
            ->assertRedirect('/dashboard/regular-bookings/seats')
            ->assertSessionHasErrors([
                'seat_codes.2' => 'Ada kursi yang dipilih tetapi tidak tersedia pada penampang kendaraan.',
            ]);
    }

    public function test_regular_booking_passenger_step_requires_complete_seat_selection(): void
    {
        $this->actingAs(User::factory()->create());

        $this->withSession([
            'regular_booking.information' => $this->makeDraft([
                'passenger_count' => 4,
                'selected_seats' => ['1A', '2A', '3A'],
            ]),
        ])->get('/dashboard/regular-bookings/passengers')
            ->assertRedirect('/dashboard/regular-bookings/seats');
    }

    public function test_regular_booking_passenger_page_shows_form_per_selected_seat(): void
    {
        $this->actingAs(User::factory()->create());

        $this->withSession([
            'regular_booking.information' => $this->makeDraft([
                'passenger_count' => 3,
                'selected_seats' => ['1A', '2A', '3A'],
            ]),
        ])->get('/dashboard/regular-bookings/passengers')
            ->assertOk()
            ->assertSee('Form Penumpang')
            ->assertSee('Penumpang 1')
            ->assertSee('Penumpang 2')
            ->assertSee('Penumpang 3')
            ->assertSee('1A')
            ->assertSee('2A')
            ->assertSee('3A')
            ->assertSee('Nama Penumpang')
            ->assertSee('No HP')
            ->assertSee('Lanjut ke Review Pemesanan');
    }

    public function test_regular_booking_passenger_data_is_saved_to_session(): void
    {
        $this->actingAs(User::factory()->create());

        $response = $this->withSession([
            'regular_booking.information' => $this->makeDraft([
                'passenger_count' => 2,
                'selected_seats' => ['1A', '2A'],
            ]),
        ])->post('/dashboard/regular-bookings/passengers', [
            'passengers' => [
                [
                    'seat_no' => '1A',
                    'name' => 'Budi Santoso',
                    'phone' => '+62 812-3456-7890',
                ],
                [
                    'seat_no' => '2A',
                    'name' => 'Siti Aminah',
                    'phone' => '0813 2222 3333',
                ],
            ],
        ]);

        $response->assertRedirect('/dashboard/regular-bookings/review');
        $response->assertSessionHas('regular_booking.information.passengers', [
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
        ]);
    }

    public function test_regular_booking_rejects_incomplete_passenger_data(): void
    {
        $this->actingAs(User::factory()->create());

        $this->from('/dashboard/regular-bookings/passengers')
            ->withSession([
                'regular_booking.information' => $this->makeDraft([
                    'passenger_count' => 2,
                    'selected_seats' => ['1A', '2A'],
                ]),
            ])->post('/dashboard/regular-bookings/passengers', [
                'passengers' => [
                    [
                        'seat_no' => '1A',
                        'name' => 'Budi Santoso',
                        'phone' => '081234567890',
                    ],
                    [
                        'seat_no' => '2A',
                        'name' => '',
                        'phone' => '12345',
                    ],
                ],
            ])
            ->assertRedirect('/dashboard/regular-bookings/passengers')
            ->assertSessionHasErrors([
                'passengers.1.name' => 'Nama penumpang wajib diisi.',
                'passengers.1.phone' => 'Nomor HP penumpang harus menggunakan format nomor Indonesia yang valid.',
            ]);
    }

    public function test_regular_booking_review_step_requires_complete_passenger_data(): void
    {
        $this->actingAs(User::factory()->create());

        $this->withSession([
            'regular_booking.information' => $this->makeDraft([
                'passenger_count' => 2,
                'selected_seats' => ['1A', '2A'],
                'passengers' => [
                    [
                        'seat_no' => '1A',
                        'name' => 'Budi Santoso',
                        'phone' => '081234567890',
                    ],
                ],
            ]),
        ])->get('/dashboard/regular-bookings/review')
            ->assertRedirect('/dashboard/regular-bookings/passengers');
    }

    public function test_regular_booking_review_page_shows_complete_summary(): void
    {
        $this->actingAs(User::factory()->create());

        $this->withSession([
            'regular_booking.information' => $this->makeDraft([
                'booking_type' => 'other',
                'passenger_count' => 2,
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
            ]),
        ])->get('/dashboard/regular-bookings/review')
            ->assertOk()
            ->assertSee('Review Pemesanan')
            ->assertSee('Untuk Orang Lain')
            ->assertSee('SKPD')
            ->assertSee('Pekanbaru')
            ->assertSee('Pagi - 08.00 WIB')
            ->assertSee('Jl. Tuanku Tambusai No. 12 Pekanbaru')
            ->assertSee('Jl. Sudirman No. 8 Pekanbaru')
            ->assertSee('Rp 150.000')
            ->assertSee('Rp 300.000')
            ->assertSee('1A, 2A')
            ->assertSee('Budi Santoso')
            ->assertSee('081234567890')
            ->assertSee('Siti Aminah')
            ->assertSee('081322223333')
            ->assertSee('Lanjut ke Pembayaran');
    }

    public function test_regular_booking_review_save_persists_booking_as_draft(): void
    {
        $this->actingAs(User::factory()->create());

        $response = $this->withSession([
            'regular_booking.information' => $this->makeDraft([
                'booking_type' => 'self',
                'passenger_count' => 2,
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
            ]),
        ])->post('/dashboard/regular-bookings/review');

        $response->assertRedirect('/dashboard/regular-bookings/payment');

        $booking = Booking::query()
            ->with('passengers')
            ->first();

        $this->assertNotNull($booking);
        $this->assertStringStartsWith('RBK-', $booking->booking_code);
        $this->assertSame('Reguler', $booking->category);
        $this->assertSame('SKPD', $booking->from_city);
        $this->assertSame('Pekanbaru', $booking->to_city);
        $this->assertSame('Untuk Diri Sendiri', $booking->booking_for);
        $this->assertSame('Budi Santoso', $booking->passenger_name);
        $this->assertSame('081234567890', $booking->passenger_phone);
        $this->assertSame(2, $booking->passenger_count);
        $this->assertSame('Jl. Tuanku Tambusai No. 12 Pekanbaru', $booking->pickup_location);
        $this->assertSame('Jl. Sudirman No. 8 Pekanbaru', $booking->dropoff_location);
        $this->assertSame(['1A', '2A'], $booking->selected_seats);
        $this->assertSame('150000.00', $booking->price_per_seat);
        $this->assertSame('300000.00', $booking->total_amount);
        $this->assertSame('SKPD - Pekanbaru', $booking->route_label);
        $this->assertSame('Belum Bayar', $booking->payment_status);
        $this->assertSame('Draft', $booking->booking_status);
        $this->assertSame('Draft', $booking->ticket_status);
        $this->assertCount(2, $booking->passengers);
        $this->assertNotNull($booking->passengers->firstWhere('seat_no', '1A'));
        $this->assertNotNull($booking->passengers->firstWhere('seat_no', '2A'));

        $response->assertSessionHas('regular_booking.persisted_booking_id', $booking->id);
    }

    public function test_regular_booking_payment_step_requires_persisted_review_draft(): void
    {
        $this->actingAs(User::factory()->create());

        $this->withSession([
            'regular_booking.information' => $this->makeDraft([
                'passenger_count' => 2,
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
            ]),
        ])->get('/dashboard/regular-bookings/payment')
            ->assertRedirect('/dashboard/regular-bookings/review');
    }

    public function test_regular_booking_payment_page_shows_methods_and_bank_accounts(): void
    {
        $this->actingAs(User::factory()->create());

        $booking = $this->createPersistedBooking();

        $this->withSession([
            'regular_booking.information' => $this->makeDraft([
                'passenger_count' => 2,
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
            ]),
            'regular_booking.persisted_booking_id' => $booking->id,
        ])->get('/dashboard/regular-bookings/payment')
            ->assertOk()
            ->assertSee('Pembayaran')
            ->assertSee('Transfer')
            ->assertSee('QRIS')
            ->assertSee('Cash')
            ->assertSee('Daftar Rekening Bank')
            ->assertSee('Bank BCA')
            ->assertSee('Bank BNI')
            ->assertSee('Bank Mandiri')
            ->assertSee($booking->booking_code)
            ->assertSee('Simpan Metode Pembayaran');
    }

    public function test_regular_booking_payment_selection_is_saved_to_booking(): void
    {
        $this->actingAs(User::factory()->create());

        $booking = $this->createPersistedBooking();

        $response = $this->withSession([
            'regular_booking.information' => $this->makeDraft([
                'passenger_count' => 2,
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
            ]),
            'regular_booking.persisted_booking_id' => $booking->id,
        ])->post('/dashboard/regular-bookings/payment', [
            'payment_method' => 'transfer',
            'bank_account_code' => 'bca_operasional',
        ]);

        $response->assertRedirect('/dashboard/regular-bookings/payment');

        $booking->refresh();

        $this->assertSame('transfer', $booking->payment_method);
        $this->assertSame('Bank BCA', $booking->payment_account_bank);
        $this->assertSame('PT Lancang Kuning Travelindo', $booking->payment_account_name);
        $this->assertSame('1110 0022 2333', $booking->payment_account_number);
        $this->assertSame('300000.00', $booking->nominal_payment);
        $this->assertSame('Menunggu Pembayaran', $booking->payment_status);
        $this->assertSame('Menunggu Pembayaran', $booking->booking_status);
        $this->assertNull($booking->paid_at);
    }

    public function test_regular_booking_cash_payment_is_marked_as_paid_immediately(): void
    {
        $this->actingAs(User::factory()->create());

        $booking = $this->createPersistedBooking();

        $response = $this->withSession([
            'regular_booking.information' => $this->makeDraft([
                'passenger_count' => 2,
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
            ]),
            'regular_booking.persisted_booking_id' => $booking->id,
        ])->post('/dashboard/regular-bookings/payment', [
            'payment_method' => 'cash',
        ]);

        $response->assertRedirect('/dashboard/regular-bookings/payment');

        $booking->refresh();

        $this->assertSame('cash', $booking->payment_method);
        $this->assertNull($booking->payment_account_bank);
        $this->assertNull($booking->payment_account_name);
        $this->assertNull($booking->payment_account_number);
        $this->assertSame('300000.00', $booking->nominal_payment);
        $this->assertSame('Lunas', $booking->payment_status);
        $this->assertSame('Diproses', $booking->booking_status);
        $this->assertNotNull($booking->paid_at);
    }

    private function makeDraft(array $overrides = []): array
    {
        return array_merge([
            'booking_type' => 'self',
            'pickup_location' => 'SKPD',
            'destination_location' => 'Pekanbaru',
            'departure_time' => '08:00',
            'passenger_count' => 3,
            'pickup_address' => 'Jl. Tuanku Tambusai No. 12 Pekanbaru',
            'dropoff_address' => 'Jl. Sudirman No. 8 Pekanbaru',
            'fare_amount' => 150000,
            'selected_seats' => [],
            'passengers' => [],
        ], $overrides);
    }

    private function createPersistedBooking(array $overrides = []): Booking
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
            'notes' => 'Draft regular booking untuk test.',
        ], $overrides));
    }
}
