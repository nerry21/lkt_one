# Transit Pekanbaru → Laravel Patch

Patch ini mengubah proyek React + FastAPI + MongoDB menjadi versi **Laravel + Blade + MySQL** dengan modul yang tetap dipertahankan:

- Login & register
- Dashboard statistik + chart
- CRUD Driver
- CRUD Mobil
- CRUD Keberangkatan
- CRUD Stock Snack & Air Mineral
- CRUD Admin & User
- Export CSV
- Seed data dummy

## Struktur tempel
Salin folder berikut ke project Laravel Anda:

- `app/Models`
- `app/Services`
- `app/Http/Controllers`
- `app/Http/Middleware/EnsureAdminRole.php`
- `database/migrations`
- `resources/views`
- `routes/web.php`

## Langkah instalasi
1. Buat project Laravel baru atau gunakan project Laravel yang ada.
2. Pastikan autentikasi session aktif (`web`).
3. Tempel semua file dari patch ini.
4. Di `app/Http/Kernel.php`, daftarkan middleware alias:
   ```php
   'role' => \\App\\Http\\Middleware\\EnsureAdminRole::class,
   ```
5. Jalankan:
   ```bash
   php artisan migrate
   php artisan db:seed --class=Database\\Seeders\\DatabaseSeeder
   ```
6. Jalankan server:
   ```bash
   php artisan serve
   ```

## Catatan
- Auth memakai **session Laravel native** agar cocok untuk Blade.
- Perhitungan uang PC dan uang bersih tetap mengikuti logika proyek asli.
- UI mempertahankan modul dan alur yang sama, namun implementasi komponen React/shadcn dipindahkan ke Blade + Tailwind CDN.
