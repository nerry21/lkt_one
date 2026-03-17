<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CustomerSurvey extends Model
{
    protected $fillable = [
        'name',
        'driver_id',
        'kode_mobil',
        'q1_answer', 'q1_suggestion',
        'q2_answer', 'q2_suggestion',
        'q3_answer', 'q3_suggestion',
        'q4_answer', 'q4_suggestion',
        'q5_answer', 'q5_suggestion',
        'q6_answer', 'q6_suggestion',
        'q7_answer', 'q7_suggestion',
        'q8_answer', 'q8_suggestion',
        'q9_answer', 'q9_suggestion',
        'q10_answer', 'q10_suggestion',
    ];

    public function driver(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Driver::class, 'driver_id');
    }

    public function mobil(): BelongsTo
    {
        return $this->belongsTo(\App\Models\Mobil::class, 'kode_mobil', 'kode_mobil');
    }

    /**
     * Pilihan rating untuk Q1–Q8.
     */
    public static function ratingOptions(): array
    {
        return ['Sangat Baik', 'Baik', 'Cukup', 'Kurang', 'Sangat Kurang'];
    }

    /**
     * Daftar pertanyaan survei.
     */
    public static function questions(): array
    {
        return [
            1  => 'Bagaimana pendapat Anda tentang kemudahan proses pemesanan travel kami?',
            2  => 'Bagaimana pendapat Anda tentang keramahan dan kecepatan pelayanan admin/customer service kami?',
            3  => 'Bagaimana pendapat Anda tentang ketepatan waktu penjemputan dan keberangkatan travel kami?',
            4  => 'Bagaimana pendapat Anda tentang kenyamanan kendaraan yang Anda gunakan selama perjalanan?',
            5  => 'Bagaimana pendapat Anda tentang kebersihan mobil kami?',
            6  => 'Bagaimana pendapat Anda tentang keramahan, sikap, dan pelayanan sopir kami?',
            7  => 'Bagaimana pendapat Anda tentang cara mengemudi sopir kami dari segi keamanan dan kenyamanan?',
            8  => 'Bagaimana pendapat Anda tentang kesesuaian harga travel dengan pelayanan yang Anda terima?',
            9  => 'Fasilitas atau pelayanan apa yang menurut Anda perlu kami tambah atau perbaiki?',
            10 => 'Secara keseluruhan, apa yang harus kami tingkatkan agar Anda lebih puas menggunakan layanan travel kami?',
        ];
    }

    /**
     * Badge warna berdasarkan rating.
     */
    public function ratingBadgeClass(string $rating): string
    {
        return match ($rating) {
            'Sangat Baik'   => 'stock-value-badge-emerald',
            'Baik'          => 'stock-value-badge-blue',
            'Cukup'         => 'stock-value-badge-yellow',
            'Kurang'        => 'stock-value-badge-orange',
            'Sangat Kurang' => 'stock-value-badge-red',
            default         => '',
        };
    }
}
