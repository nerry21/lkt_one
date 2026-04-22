<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Trip Planning — Fase D4 Sesi 24: daily 21:00 WIB cutover untuk jadwal besok.
// Timezone hardcoded Asia/Jakarta (config('app.timezone')='UTC'; jangan implicit).
// withoutOverlapping 60-min lock: scheduler nggak boleh tumpang-tindih kalau
// previous run belum selesai (guard untuk worst case transient DB hang).
Schedule::command('trips:cutover')
    ->dailyAt('21:00')
    ->timezone('Asia/Jakarta')
    ->withoutOverlapping(60)
    ->runInBackground();
