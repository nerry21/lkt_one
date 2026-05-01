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

// Sesi 66 PR-CRM-6C — queue worker scheduler (Hostinger shared hosting).
// Hostinger tidak punya supervisor; pakai scheduler-based worker yang spawn
// tiap menit, drain queue, lalu exit. --stop-when-empty supaya cepat dispose
// memory. --max-time guard hard timeout (di bawah 1 menit interval scheduler).
// withoutOverlapping mencegah duplikasi kalau previous run masih jalan.
Schedule::command('queue:work --stop-when-empty --max-time=50 --tries=3 --sleep=1')
    ->everyMinute()
    ->withoutOverlapping(2)
    ->runInBackground()
    ->name('lkt-queue-worker');
