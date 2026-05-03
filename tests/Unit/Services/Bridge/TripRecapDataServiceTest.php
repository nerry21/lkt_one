<?php

declare(strict_types=1);

namespace Tests\Unit\Services\Bridge;

use App\Models\Booking;
use App\Models\BookingSource;
use App\Models\Trip;
use App\Services\Bridge\TripRecapDataService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use RuntimeException;
use Tests\TestCase;

class TripRecapDataServiceTest extends TestCase
{
    use RefreshDatabase;

    private function makeService(): TripRecapDataService
    {
        return new TripRecapDataService();
    }

    private function makeTrip(array $overrides = []): Trip
    {
        return Trip::factory()->create($overrides);
    }

    private function makeBooking(int $tripId, array $overrides = []): Booking
    {
        return Booking::factory()->create(array_merge([
            'trip_id' => $tripId,
            'booking_status' => 'Dibayar',
            'payment_status' => 'Dibayar',
            'payment_method' => 'cash',
            'total_amount' => 130000,
        ], $overrides));
    }

    public function test_returns_recap_data_for_normal_trip(): void
    {
        $trip = $this->makeTrip(['status' => 'berangkat', 'direction' => 'PKB_TO_ROHUL']);
        $this->makeBooking($trip->id, ['payment_method' => 'cash', 'total_amount' => 100000]);
        $this->makeBooking($trip->id, ['payment_method' => 'transfer', 'total_amount' => 130000]);

        $data = $this->makeService()->getRecapData($trip->id);

        $this->assertSame($trip->id, $data['trip_id']);
        $this->assertSame('PKB_TO_ROHUL', $data['direction']);
        $this->assertSame('PKB', $data['cluster']);
        $this->assertFalse($data['is_cancelled']);
        $this->assertSame(2, $data['passenger_count_berangkat']);
        $this->assertSame(0, $data['passenger_count_cancelled']);
        $this->assertSame(100000, $data['revenue_cash']);
        $this->assertSame(130000, $data['revenue_transfer']);
        $this->assertSame(230000, $data['revenue_total']);
    }

    public function test_returns_recap_data_with_is_cancelled_true_for_tidak_berangkat_trip(): void
    {
        $trip = $this->makeTrip(['status' => 'tidak_berangkat']);
        $this->makeBooking($trip->id, [
            'booking_status' => 'Dibatalkan',
            'cancellation_reason' => 'cancelled_by_admin',
        ]);

        $data = $this->makeService()->getRecapData($trip->id);

        $this->assertTrue($data['is_cancelled']);
        $this->assertSame(0, $data['passenger_count_berangkat']);
        $this->assertSame(1, $data['passenger_count_cancelled']);
    }

    public function test_resolves_cluster_rohul_for_rohul_to_pkb_direction(): void
    {
        $trip = $this->makeTrip(['direction' => 'ROHUL_TO_PKB']);

        $data = $this->makeService()->getRecapData($trip->id);

        $this->assertSame('ROHUL', $data['cluster']);
    }

    public function test_resolves_cluster_pkb_for_pkb_to_rohul_direction(): void
    {
        $trip = $this->makeTrip(['direction' => 'PKB_TO_ROHUL']);

        $data = $this->makeService()->getRecapData($trip->id);

        $this->assertSame('PKB', $data['cluster']);
    }

    public function test_counts_walk_in_passengers_via_source_meta_flag(): void
    {
        $trip = $this->makeTrip();
        $reguler = $this->makeBooking($trip->id);
        $walkIn = $this->makeBooking($trip->id);

        BookingSource::create([
            'booking_id' => $reguler->id,
            'source' => BookingSource::SOURCE_CHATBOT,
            'source_meta' => ['walk_in' => false],
        ]);
        BookingSource::create([
            'booking_id' => $walkIn->id,
            'source' => BookingSource::SOURCE_CHATBOT,
            'source_meta' => ['walk_in' => true],
        ]);

        $data = $this->makeService()->getRecapData($trip->id);

        $this->assertSame(1, $data['walk_in_count']);
    }

    public function test_includes_passengers_array_in_detail_data(): void
    {
        $trip = $this->makeTrip();
        $this->makeBooking($trip->id, ['passenger_name' => 'Pak Andi', 'selected_seats' => ['1A']]);
        $this->makeBooking($trip->id, ['passenger_name' => 'Bu Ina', 'selected_seats' => ['2B']]);

        $data = $this->makeService()->getDetailData($trip->id);

        $this->assertCount(2, $data['passengers']);
        $this->assertSame('Pak Andi', $data['passengers'][0]['name']);
        $this->assertSame('1A', $data['passengers'][0]['seat']);
    }

    public function test_separates_cash_and_transfer_revenue(): void
    {
        $trip = $this->makeTrip();
        $this->makeBooking($trip->id, [
            'payment_method' => 'cash',
            'total_amount' => 50000,
        ]);
        $this->makeBooking($trip->id, [
            'payment_method' => 'cash',
            'total_amount' => 75000,
        ]);
        $this->makeBooking($trip->id, [
            'payment_method' => 'transfer',
            'total_amount' => 200000,
        ]);

        $data = $this->makeService()->getRecapData($trip->id);

        $this->assertSame(125000, $data['revenue_cash']);
        $this->assertSame(200000, $data['revenue_transfer']);
        $this->assertSame(325000, $data['revenue_total']);
    }

    public function test_throws_when_trip_id_not_found(): void
    {
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('Trip dengan id 99999 tidak ditemukan.');

        $this->makeService()->getRecapData(99999);
    }

    public function test_detail_data_marks_walk_in_passengers(): void
    {
        $trip = $this->makeTrip();
        $reguler = $this->makeBooking($trip->id, ['passenger_name' => 'Reguler']);
        $walkIn = $this->makeBooking($trip->id, ['passenger_name' => 'Walk-in']);

        BookingSource::create([
            'booking_id' => $walkIn->id,
            'source' => BookingSource::SOURCE_CHATBOT,
            'source_meta' => ['walk_in' => true],
        ]);

        $data = $this->makeService()->getDetailData($trip->id);

        $byName = collect($data['passengers'])->keyBy('name');
        $this->assertFalse($byName['Reguler']['is_walk_in']);
        $this->assertTrue($byName['Walk-in']['is_walk_in']);
    }
}
