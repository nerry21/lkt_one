<?php

namespace Tests\Feature;

use App\Models\Driver;
use App\Models\Keberangkatan;
use App\Models\Mobil;
use App\Models\Stock;
use App\Models\User;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StockKeberangkatanFlowTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutMiddleware(VerifyCsrfToken::class);
    }

    public function test_creating_keberangkatan_reduces_stock_usage_and_remaining_value(): void
    {
        $this->actingAs(User::factory()->create());

        $driver = Driver::query()->create([
            'nama' => 'Driver Stock',
            'lokasi' => 'Pekanbaru',
        ]);

        $mobil = Mobil::query()->create([
            'kode_mobil' => 'BM-1001-PT',
            'jenis_mobil' => 'Hiace',
        ]);

        Stock::query()->create([
            'tanggal' => '2026-04-01',
            'hari' => 'Rabu',
            'bulan' => 'April',
            'tahun' => '2026',
            'total_stock_snack' => 10,
            'total_stock_air_mineral' => 8,
            'terpakai_snack' => 0,
            'terpakai_air_mineral' => 0,
            'sisa_stock_snack' => 10,
            'sisa_stock_air_mineral' => 8,
            'nilai_total' => 46000,
            'sisa_nilai_total' => 46000,
            'keterangan' => 'Stock pagi',
        ]);

        $response = $this->postJson('/api/keberangkatan', [
            'tanggal' => '2026-04-01',
            'jam_keberangkatan' => Keberangkatan::DEFAULT_JAM_KEBERANGKATAN,
            'tipe_layanan' => Keberangkatan::DEFAULT_TIPE_LAYANAN,
            'kode_mobil' => $mobil->kode_mobil,
            'driver_id' => $driver->id,
            'jumlah_penumpang' => 6,
            'tarif_penumpang' => 150000,
            'jumlah_paket' => 1,
            'uang_paket' => 50000,
            'jumlah_snack' => 3,
            'jumlah_air_mineral' => 2,
            'trip_ke' => 1,
        ]);

        $response->assertOk()
            ->assertJson([
                'jam_keberangkatan' => Keberangkatan::DEFAULT_JAM_KEBERANGKATAN,
                'tipe_layanan' => Keberangkatan::DEFAULT_TIPE_LAYANAN,
                'jumlah_snack' => 3,
                'jumlah_air_mineral' => 2,
            ]);

        $this->assertDatabaseHas('stock', [
            'tanggal' => '2026-04-01',
            'terpakai_snack' => 3,
            'terpakai_air_mineral' => 2,
            'sisa_stock_snack' => 7,
            'sisa_stock_air_mineral' => 6,
            'sisa_nilai_total' => 33000,
        ]);
    }

    public function test_updating_and_deleting_keberangkatan_resyncs_stock(): void
    {
        $this->actingAs(User::factory()->create());

        $driver = Driver::query()->create([
            'nama' => 'Driver Sinkron',
            'lokasi' => 'Pekanbaru',
        ]);

        $mobil = Mobil::query()->create([
            'kode_mobil' => 'BM-2002-PT',
            'jenis_mobil' => 'Reborn',
        ]);

        Stock::query()->create([
            'tanggal' => '2026-04-02',
            'hari' => 'Kamis',
            'bulan' => 'April',
            'tahun' => '2026',
            'total_stock_snack' => 12,
            'total_stock_air_mineral' => 10,
            'terpakai_snack' => 0,
            'terpakai_air_mineral' => 0,
            'sisa_stock_snack' => 12,
            'sisa_stock_air_mineral' => 10,
            'nilai_total' => 56000,
            'sisa_nilai_total' => 56000,
            'keterangan' => 'Stock sore',
        ]);

        $createResponse = $this->postJson('/api/keberangkatan', [
            'tanggal' => '2026-04-02',
            'jam_keberangkatan' => Keberangkatan::DEFAULT_JAM_KEBERANGKATAN,
            'tipe_layanan' => Keberangkatan::DEFAULT_TIPE_LAYANAN,
            'kode_mobil' => $mobil->kode_mobil,
            'driver_id' => $driver->id,
            'jumlah_penumpang' => 4,
            'tarif_penumpang' => 150000,
            'jumlah_paket' => 0,
            'uang_paket' => 0,
            'jumlah_snack' => 4,
            'jumlah_air_mineral' => 3,
            'trip_ke' => 1,
        ]);

        $keberangkatanId = (string) $createResponse->json('id');

        $this->assertDatabaseHas('stock', [
            'tanggal' => '2026-04-02',
            'terpakai_snack' => 4,
            'terpakai_air_mineral' => 3,
            'sisa_stock_snack' => 8,
            'sisa_stock_air_mineral' => 7,
            'sisa_nilai_total' => 38000,
        ]);

        $this->putJson("/api/keberangkatan/{$keberangkatanId}", [
            'jumlah_snack' => 2,
            'jumlah_air_mineral' => 1,
            'tanggal' => '2026-04-02',
            'jam_keberangkatan' => '16:00',
            'tipe_layanan' => 'Dropping',
            'kode_mobil' => $mobil->kode_mobil,
            'driver_id' => $driver->id,
            'jumlah_penumpang' => 4,
            'tarif_penumpang' => 150000,
            'jumlah_paket' => 0,
            'uang_paket' => 0,
            'trip_ke' => 1,
        ])->assertOk();

        $this->assertDatabaseHas('stock', [
            'tanggal' => '2026-04-02',
            'terpakai_snack' => 2,
            'terpakai_air_mineral' => 1,
            'sisa_stock_snack' => 10,
            'sisa_stock_air_mineral' => 9,
            'sisa_nilai_total' => 48000,
        ]);

        $this->deleteJson("/api/keberangkatan/{$keberangkatanId}")
            ->assertOk();

        $this->assertDatabaseHas('stock', [
            'tanggal' => '2026-04-02',
            'terpakai_snack' => 0,
            'terpakai_air_mineral' => 0,
            'sisa_stock_snack' => 12,
            'sisa_stock_air_mineral' => 10,
            'sisa_nilai_total' => 56000,
        ]);
    }

    public function test_keberangkatan_is_rejected_when_stock_is_not_enough(): void
    {
        $this->actingAs(User::factory()->create());

        $driver = Driver::query()->create([
            'nama' => 'Driver Limit',
            'lokasi' => 'Pekanbaru',
        ]);

        $mobil = Mobil::query()->create([
            'kode_mobil' => 'BM-3003-PT',
            'jenis_mobil' => 'Hiace',
        ]);

        Stock::query()->create([
            'tanggal' => '2026-04-03',
            'hari' => 'Jumat',
            'bulan' => 'April',
            'tahun' => '2026',
            'total_stock_snack' => 2,
            'total_stock_air_mineral' => 1,
            'terpakai_snack' => 0,
            'terpakai_air_mineral' => 0,
            'sisa_stock_snack' => 2,
            'sisa_stock_air_mineral' => 1,
            'nilai_total' => 8000,
            'sisa_nilai_total' => 8000,
            'keterangan' => 'Stock terbatas',
        ]);

        $response = $this->postJson('/api/keberangkatan', [
            'tanggal' => '2026-04-03',
            'jam_keberangkatan' => Keberangkatan::DEFAULT_JAM_KEBERANGKATAN,
            'tipe_layanan' => Keberangkatan::DEFAULT_TIPE_LAYANAN,
            'kode_mobil' => $mobil->kode_mobil,
            'driver_id' => $driver->id,
            'jumlah_penumpang' => 4,
            'tarif_penumpang' => 150000,
            'jumlah_paket' => 0,
            'uang_paket' => 0,
            'jumlah_snack' => 3,
            'jumlah_air_mineral' => 1,
            'trip_ke' => 1,
        ]);

        $response->assertStatus(422)
            ->assertJsonFragment([
                'message' => 'Sisa stock snack untuk tanggal 2026-04-03 hanya 2',
            ]);

        $this->assertDatabaseMissing('keberangkatan', [
            'tanggal' => '2026-04-03',
            'kode_mobil' => $mobil->kode_mobil,
        ]);
    }
}
