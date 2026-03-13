<?php

namespace App\Models;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Keberangkatan extends Model
{
    use HasFactory;
    use HasUuids;

    public const DEFAULT_JAM_KEBERANGKATAN = '08:00';

    public const JAM_KEBERANGKATAN_OPTIONS = [
        '05:00' => 'Subuh (05.00 WIB)',
        '08:00' => 'Pagi (08.00 WIB)',
        '10:00' => 'Pagi (10.00 WIB)',
        '14:00' => 'Siang (14.00 WIB)',
        '16:00' => 'Sore (16.00 WIB)',
        '19:00' => 'Malam (19.00 WIB)',
    ];

    public const DEFAULT_TIPE_LAYANAN = 'Reguler';

    public const TIPE_LAYANAN_OPTIONS = [
        'Reguler',
        'Dropping',
        'Rental',
    ];

    public const STATUS_LUNAS = 'Lunas';

    public const STATUS_BELUM_LUNAS = 'Belum Lunas';

    public const STATUSES = [
        self::STATUS_LUNAS,
        self::STATUS_BELUM_LUNAS,
    ];

    public const UPDATED_AT = null;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $table = 'keberangkatan';

    protected $fillable = [
        'tanggal',
        'jam_keberangkatan',
        'tipe_layanan',
        'hari',
        'bulan',
        'tahun',
        'kode_mobil',
        'driver_id',
        'driver_nama',
        'jumlah_penumpang',
        'tarif_penumpang',
        'jumlah_uang_penumpang',
        'jumlah_paket',
        'uang_paket',
        'jumlah_snack',
        'jumlah_air_mineral',
        'uang_pc',
        'uang_bersih',
        'trip_ke',
        'status_pembayaran',
        'created_at',
    ];

    protected function casts(): array
    {
        return [
            'jumlah_penumpang' => 'integer',
            'tarif_penumpang' => 'integer',
            'jumlah_uang_penumpang' => 'integer',
            'jumlah_paket' => 'integer',
            'uang_paket' => 'integer',
            'jumlah_snack' => 'integer',
            'jumlah_air_mineral' => 'integer',
            'uang_pc' => 'float',
            'uang_bersih' => 'float',
            'trip_ke' => 'integer',
            'created_at' => 'immutable_datetime',
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (self $keberangkatan): void {
            $jamKeberangkatan = (string) ($keberangkatan->jam_keberangkatan ?? '');
            $keberangkatan->jam_keberangkatan = array_key_exists($jamKeberangkatan, self::JAM_KEBERANGKATAN_OPTIONS)
                ? $jamKeberangkatan
                : self::DEFAULT_JAM_KEBERANGKATAN;

            $tipeLayanan = (string) ($keberangkatan->tipe_layanan ?? '');
            $keberangkatan->tipe_layanan = in_array($tipeLayanan, self::TIPE_LAYANAN_OPTIONS, true)
                ? $tipeLayanan
                : self::DEFAULT_TIPE_LAYANAN;

            if ($keberangkatan->tanggal) {
                $date = CarbonImmutable::parse($keberangkatan->tanggal);
                $keberangkatan->hari = self::dayName($date);
                $keberangkatan->bulan = self::monthName($date->month);
                $keberangkatan->tahun = (string) $date->year;
            }

            $jumlahPenumpang = (int) ($keberangkatan->jumlah_penumpang ?? 0);
            $tarifPenumpang = (int) ($keberangkatan->tarif_penumpang ?? 0);
            $uangPaket = (int) ($keberangkatan->uang_paket ?? 0);
            $keberangkatan->jumlah_snack = max(0, (int) ($keberangkatan->jumlah_snack ?? 0));
            $keberangkatan->jumlah_air_mineral = max(0, (int) ($keberangkatan->jumlah_air_mineral ?? 0));
            $jumlahUangPenumpang = $jumlahPenumpang * $tarifPenumpang;
            $total = $jumlahUangPenumpang + $uangPaket;

            $keberangkatan->jumlah_uang_penumpang = $jumlahUangPenumpang;
            $keberangkatan->uang_pc = $total * 0.15;
            $keberangkatan->uang_bersih = $total * 0.85;
            $keberangkatan->status_pembayaran = in_array(
                $keberangkatan->status_pembayaran,
                self::STATUSES,
                true,
            )
                ? $keberangkatan->status_pembayaran
                : self::STATUS_BELUM_LUNAS;

            if ($keberangkatan->driver_id) {
                $driver = Driver::query()->find($keberangkatan->driver_id);

                if ($driver) {
                    $keberangkatan->driver_nama = $driver->nama;
                }
            }
        });
    }

    public function driver(): BelongsTo
    {
        return $this->belongsTo(Driver::class, 'driver_id', 'id');
    }

    public function mobil(): BelongsTo
    {
        return $this->belongsTo(Mobil::class, 'kode_mobil', 'kode_mobil');
    }

    public function stock(): BelongsTo
    {
        return $this->belongsTo(Stock::class, 'tanggal', 'tanggal');
    }

    protected static function dayName(CarbonImmutable $date): string
    {
        return ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'][$date->dayOfWeekIso - 1];
    }

    protected static function monthName(int $month): string
    {
        return ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'][$month - 1];
    }

    public static function jamKeberangkatanLabel(?string $jamKeberangkatan): string
    {
        $value = is_string($jamKeberangkatan) && array_key_exists($jamKeberangkatan, self::JAM_KEBERANGKATAN_OPTIONS)
            ? $jamKeberangkatan
            : self::DEFAULT_JAM_KEBERANGKATAN;

        return self::JAM_KEBERANGKATAN_OPTIONS[$value];
    }
}
